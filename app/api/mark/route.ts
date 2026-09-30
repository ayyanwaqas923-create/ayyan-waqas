import { NextResponse } from "next/server";
import { z } from "zod";
import { evaluateAnswer } from "@/lib/ai";

const payloadSchema = z.object({
  subject: z.string(),
  topic: z.string(),
  questionText: z.string(),
  commandWord: z.string(),
  maximumMarks: z.number().min(1),
  markingGuidance: z.string(),
  studentAnswer: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = payloadSchema.parse(body);

    const result = await evaluateAnswer(parsed);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Answer marking failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "The answer could not be marked. Please check the input and try again.",
      },
      { status: 400 },
    );
  }
}
