"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/app-shell";
import { progressChartData } from "@/lib/demo-data";

const subjectData = progressChartData.map((item) => ({
  subject: item.subject,
  percentage: item.score,
  previous: item.previous,
}));

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Progress</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Performance and improvement tracking</h2>
        </div>

        <div className="card-surface rounded-3xl p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Subject performance</h3>
            <span className="text-sm text-slate-400">Current progress</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                <XAxis dataKey="subject" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="percentage" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card-surface rounded-3xl p-5">
            <h3 className="text-xl font-bold text-white">Strong areas</h3>
            <ul className="mt-5 space-y-3 text-slate-300">
              <li className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-3">English: strong analysis and structured answers</li>
              <li className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-3">Islamiyat: strong recall and explanation</li>
              <li className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-3">Mathematics: improving techniques and accuracy</li>
            </ul>
          </div>

          <div className="card-surface rounded-3xl p-5">
            <h3 className="text-xl font-bold text-white">Weak areas</h3>
            <ul className="mt-5 space-y-3 text-slate-300">
              <li className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-rose-200">Probability and graphs in Mathematics</li>
              <li className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-rose-200">Databases and networks in Computer Science</li>
              <li className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-rose-200">Adjustments and calculations in Accounting</li>
            </ul>
          </div>
        </div>

        <div className="card-surface rounded-3xl p-5">
          <h3 className="text-xl font-bold text-white">Recommended revision</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              "Revise Probability and confidence intervals",
              "Practise answer structure for evaluation questions",
              "Review financial statement adjustments",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
