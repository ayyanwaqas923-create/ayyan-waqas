import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import type { ExamAnswerPayload, MarkingResult } from "@/lib/types";

const markingSchema = z.object({
  marksAwarded: z.number().min(0),
  maximumMarks: z.number().min(1),
  whyMarksWereAwarded: z.string(),
  missingPoints: z.array(z.string()),
  strengths: z.array(z.string()),
  fullMarkRequirements: z.array(z.string()),
  improvementAdvice: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  status: z.string().optional(),
});

function clampMarks(value: number, maximumMarks: number) {
  return Math.min(Math.max(Math.round(value), 0), maximumMarks);
}

function getCommandWordKeywords(commandWord: string) {
  const normalized = commandWord.toUpperCase();
  const mapping: Record<string, string[]> = {
    DESCRIBE: ["describe", "features", "for example", "such as", "shows"],
    EXPLAIN: ["because", "therefore", "this means", "leads to", "due to"],
    ANALYSE: ["because", "however", "therefore", "impact", "relationship", "consequence"],
    EVALUATE: ["overall", "however", "judgement", "benefits", "drawbacks", "therefore"],
    MATHEMATICS: ["equation", "method", "working", "calculate", "answer", "therefore"],
    CALCULATE: ["calculate", "sum", "total", "formula", "answer"],
    SOLVE: ["solve", "equation", "substituting", "method", "answer"],
  };

  return mapping[normalized] || ["because", "therefore", "answer", "explain"];
}

function heuristicMark(payload: ExamAnswerPayload): MarkingResult {
  const answer = payload.studentAnswer.trim();
  const normalized = answer.toLowerCase();
  const keywords = getCommandWordKeywords(payload.commandWord);
  const keywordMatches = keywords.filter((keyword) => normalized.includes(keyword)).length;
  const lengthScore = Math.min(answer.split(/\s+/).filter(Boolean).length / 35, 1);
  const rawScore = payload.maximumMarks * (0.18 + 0.42 * Math.min(keywordMatches / Math.max(keywords.length, 1), 1) + 0.4 * lengthScore);
  const marksAwarded = clampMarks(rawScore, payload.maximumMarks);
  const confidence = marksAwarded / payload.maximumMarks > 0.8 ? 0.88 : 0.69;

  const strengths = [
    `Used relevant subject knowledge in ${payload.topic.toLowerCase()}.`,
    `Attempted a structured response using the command word ${payload.commandWord.toLowerCase()}.`,
  ];

  const missingPoints = [
    "Add the key points required by the command word and the mark scheme guidance.",
    "Include a clearer explanation of the method, reasoning, or evidence expected.",
  ];

  const fullMarkRequirements = [
    `Address the complete requirements in ${payload.topic}.`,
    "Support claims with precise reasoning or calculations.",
    "Make sure the final answer is explicit and fully justified.",
  ];

  const improvementAdvice = [
    "Revise the key topic area and use a model answer to compare structure and content.",
    "Practise similar command-word questions to improve clarity and depth.",
  ];

  return {
    marksAwarded,
    maximumMarks: payload.maximumMarks,
    whyMarksWereAwarded: `The response shows some relevant understanding and attempted application. It would score more if the explanation or calculations were more complete and precise.`,
    missingPoints,
    strengths,
    fullMarkRequirements,
    improvementAdvice,
    confidence,
    status: "AI-assisted estimate",
  };
}

export async function evaluateAnswer(payload: ExamAnswerPayload): Promise<MarkingResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return heuristicMark(payload);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert O-Level examiner. Grade the student's answer using the subject, topic, command word, maximum marks, marking guidance, and answer provided.

Return valid JSON only with these fields:
{
  "marksAwarded": number,
  "maximumMarks": number,
  "whyMarksWereAwarded": "...",
  "missingPoints": ["..."],
  "strengths": ["..."],
  "fullMarkRequirements": ["..."],
  "improvementAdvice": ["..."],
  "confidence": 0.9,
  "status": "AI-assisted estimate"
}

Do not award more than the maximum marks. Never invent official Cambridge marking rules. If marking guidance is weak or unavailable, keep the status set to \"AI-assisted estimate\". 

Subject: ${payload.subject}
Topic: ${payload.topic}
Command word: ${payload.commandWord}
Maximum marks: ${payload.maximumMarks}
Marking guidance: ${payload.markingGuidance}
Student answer: ${payload.studentAnswer}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleaned);
    const parsed = markingSchema.parse({ ...json, maximumMarks: payload.maximumMarks });
    const safeMarks = clampMarks(parsed.marksAwarded, payload.maximumMarks);

    return {
      ...parsed,
      marksAwarded: safeMarks,
      maximumMarks: payload.maximumMarks,
      status: parsed.status || "AI-assisted estimate",
    };
  } catch (error) {
    console.error("Gemini marking failed, using local heuristic:", error);
    return heuristicMark(payload);
  }
}
