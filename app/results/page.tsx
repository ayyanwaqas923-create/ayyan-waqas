"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";

interface StoredResult {
  title: string;
  percentage: number;
  marksObtained: number;
  totalMarks: number;
  timeUsed: string;
  result: {
    marksAwarded: number;
    maximumMarks: number;
    whyMarksWereAwarded: string;
    missingPoints: string[];
    strengths: string[];
    fullMarkRequirements: string[];
    improvementAdvice: string[];
    confidence: number;
    status: string;
  };
}

export default function ResultsPage() {
  const [result] = useState<StoredResult | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const stored = window.localStorage.getItem("examCoachResult");
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored) as StoredResult;
    } catch {
      return null;
    }
  });

  if (!result) {
    return (
      <AppShell>
        <div className="card-surface rounded-3xl p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Results</p>
          <h2 className="mt-3 text-3xl font-bold text-white">No result available yet</h2>
          <p className="mt-3 text-slate-400">Submit an answer in Practice or Full Exam mode to see detailed marking feedback.</p>
        </div>
      </AppShell>
    );
  }

  const feedback = result.result;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="card-surface rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Results</p>
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">{result.title}</h2>
              <p className="mt-2 text-slate-300">Time used: {result.timeUsed}</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Your score</p>
              <p className="mt-2 text-3xl font-black text-white">{result.marksObtained} / {result.totalMarks}</p>
              <p className="text-sm text-slate-200">{result.percentage}%</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card-surface rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white">Why you received these marks</h3>
            <p className="mt-4 leading-7 text-slate-300">{feedback.whyMarksWereAwarded}</p>
          </div>

          <div className="card-surface rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white">What was missing</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              {feedback.missingPoints.map((item) => (
                <li key={item} className="list-disc pl-5 leading-7">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card-surface rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white">What you needed for full marks</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              {feedback.fullMarkRequirements.map((item) => (
                <li key={item} className="list-disc pl-5 leading-7">{item}</li>
              ))}
            </ul>
          </div>

          <div className="card-surface rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white">How to improve</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              {feedback.improvementAdvice.map((item) => (
                <li key={item} className="list-disc pl-5 leading-7">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-surface rounded-3xl p-6">
          <h3 className="text-xl font-bold text-white">Strengths and weaknesses</h3>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-emerald-300">Strengths</p>
              <ul className="space-y-3 text-slate-300">
                {feedback.strengths.map((item) => (
                  <li key={item} className="list-disc pl-5 leading-7">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-amber-300">Weaknesses</p>
              <ul className="space-y-3 text-slate-300">
                {feedback.missingPoints.map((item) => (
                  <li key={item} className="list-disc pl-5 leading-7">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
