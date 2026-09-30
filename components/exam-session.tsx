"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, Clock3, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Paper, Question } from "@/lib/types";

interface ExamSessionProps {
  mode: "practice" | "exam";
  paper?: Paper;
  questions: Question[];
  title?: string;
}

export function ExamSession({ mode, paper, questions, title }: ExamSessionProps) {
  const router = useRouter();
  const targetQuestions = useMemo(() => questions, [questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState((paper?.duration ?? 60) * 60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = targetQuestions[currentIndex] ?? targetQuestions[0];

  const saveAnswer = (questionId: string, value: string) => {
    setAnswers((previous) => ({ ...previous, [questionId]: value }));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("exam-coach-answers", JSON.stringify({ ...answers, [questionId]: value }));
    }
  };

  const submitResponses = useCallback(
    async (isTimedOut = false) => {
      if (loading) return;
      setLoading(true);
      setError("");

      try {
        if (mode === "practice") {
          const payload = {
            subject: currentQuestion.subject,
            topic: currentQuestion.topic,
            questionText: currentQuestion.questionText,
            commandWord: currentQuestion.commandWord,
            maximumMarks: currentQuestion.maximumMarks,
            markingGuidance: currentQuestion.markingGuidance,
            studentAnswer: answers[currentQuestion.id] || "No answer provided.",
          };

          const response = await fetch("/api/mark", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (!response.ok || !data.ok) {
            throw new Error(data.message || "Submission failed.");
          }

          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "examCoachResult",
              JSON.stringify({
                title: title || "Practice question",
                percentage: Math.round((data.result.marksAwarded / data.result.maximumMarks) * 100),
                marksObtained: data.result.marksAwarded,
                totalMarks: data.result.maximumMarks,
                result: data.result,
                timeUsed: "Time not tracked for practice mode",
              }),
            );
          }

          router.push("/results");
          return;
        }

        const payloads = targetQuestions.map((question) => ({
          subject: question.subject,
          topic: question.topic,
          questionText: question.questionText,
          commandWord: question.commandWord,
          maximumMarks: question.maximumMarks,
          markingGuidance: question.markingGuidance,
          studentAnswer: answers[question.id] || "No answer provided.",
        }));

        const results = await Promise.all(
          payloads.map(async (payload) => {
            const response = await fetch("/api/mark", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok || !data.ok) {
              throw new Error(data.message || "Marking failed.");
            }
            return data.result;
          }),
        );

        const totalMarks = results.reduce((sum, item) => sum + item.maximumMarks, 0);
        const awarded = results.reduce((sum, item) => sum + item.marksAwarded, 0);
        const percentage = totalMarks ? Math.round((awarded / totalMarks) * 100) : 0;
        const remainingSeconds = Math.max((paper?.duration ?? 60) * 60 - secondsLeft, 0);

        const payload = {
          title: title || paper?.title || "O-Level exam",
          percentage,
          marksObtained: awarded,
          totalMarks,
          timeUsed: `${Math.floor(remainingSeconds / 60)} min ${remainingSeconds % 60} sec`,
          result: {
            marksAwarded: awarded,
            maximumMarks: totalMarks,
            whyMarksWereAwarded: results.map((item) => item.whyMarksWereAwarded).join(" "),
            missingPoints: results.flatMap((item) => item.missingPoints),
            strengths: results.flatMap((item) => item.strengths),
            fullMarkRequirements: results.flatMap((item) => item.fullMarkRequirements),
            improvementAdvice: results.flatMap((item) => item.improvementAdvice),
            confidence: results.reduce((sum, item) => sum + item.confidence, 0) / Math.max(results.length, 1),
            status: isTimedOut ? "Auto-submitted on timer expiry" : "Submitted successfully",
          },
        };

        if (typeof window !== "undefined") {
          window.localStorage.setItem("examCoachResult", JSON.stringify(payload));
        }

        router.push("/results");
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : "Unable to submit your answer.");
      } finally {
        setLoading(false);
      }
    },
    [answers, currentQuestion, loading, mode, paper, router, secondsLeft, targetQuestions, title],
  );

  useEffect(() => {
    if (mode !== "exam") return;

    const interval = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(interval);
          void submitResponses(true);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [mode, submitResponses]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  if (!currentQuestion) {
    return <div className="text-center text-slate-300">No question selected yet.</div>;
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : null}

      {mode === "exam" && paper ? (
        <div className="card-surface rounded-3xl p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{paper.title}</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{paper.topic}</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-200">
              <Clock3 className="h-4 w-4" />
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
        {mode === "exam" && targetQuestions.length > 1 ? (
          <div className="card-surface rounded-3xl p-4">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-slate-400">Question navigation</p>
            <div className="grid gap-2">
              {targetQuestions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                    index === currentIndex
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-100"
                      : "border-slate-700 bg-slate-900/70 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  Question {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="card-surface rounded-3xl p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{currentQuestion.subject}</p>
              <h4 className="mt-2 text-2xl font-bold text-white">{currentQuestion.title}</h4>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-sm text-slate-200">
              {currentQuestion.maximumMarks} marks
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Command word</span>
              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-200">{currentQuestion.commandWord}</span>
            </div>
            <p className="text-lg leading-8 text-slate-100">{currentQuestion.questionText}</p>
          </div>

          <label className="mt-6 block text-sm text-slate-300">
            Answer
            <textarea
              value={answers[currentQuestion.id] || ""}
              onChange={(event) => saveAnswer(currentQuestion.id, event.target.value)}
              rows={12}
              placeholder="Type your answer here..."
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-4 text-slate-50 outline-none transition focus:border-cyan-400"
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 hover:border-slate-500">
              Upload handwritten image (.jpg, .png)
              <input type="file" accept="image/png,image/jpeg" className="hidden" />
            </label>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 hover:border-slate-500">
              Upload PDF
              <input type="file" accept="application/pdf" className="hidden" />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setCurrentIndex((previous) => Math.max(previous - 1, 0))}
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm text-slate-200"
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => (mode === "exam" && currentIndex < targetQuestions.length - 1 ? setCurrentIndex((previous) => previous + 1) : void submitResponses(false))}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {mode === "exam" && currentIndex < targetQuestions.length - 1 ? "Next question" : "Submit answer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
