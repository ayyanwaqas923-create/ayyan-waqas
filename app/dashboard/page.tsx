"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/app-shell";
import { dashboardSummary, progressChartData, recentAttempts } from "@/lib/demo-data";

const chartData = [
  { name: "Jan", score: 55 },
  { name: "Mar", score: 62 },
  { name: "May", score: 68 },
  { name: "Jul", score: 74 },
  { name: "Sep", score: 76 },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Dashboard</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Welcome back, Ayesha.</h2>
          </div>
          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">
            Overall percentage: {dashboardSummary.overallPercentage}%
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Overall percentage", value: `${dashboardSummary.overallPercentage}%` },
            { label: "Exams completed", value: `${dashboardSummary.examsCompleted}` },
            { label: "Average score", value: `${dashboardSummary.averageScore}%` },
            { label: "Trend", value: "+12%" },
          ].map((metric) => (
            <div key={metric.label} className="card-surface rounded-2xl p-5">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="card-surface rounded-3xl p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Progress chart</h3>
              <span className="text-sm text-slate-400">Last 5 months</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="scoreFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#scoreFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-surface rounded-3xl p-5">
            <h3 className="text-xl font-bold text-white">Strongest topics</h3>
            <ul className="mt-5 space-y-3">
              {dashboardSummary.strongestTopics.map((topic) => (
                <li key={topic} className="rounded-2xl border border-slate-800 bg-slate-900/70 px-3 py-3 text-sm text-slate-200">
                  {topic}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-xl font-bold text-white">Weakest topics</h3>
            <ul className="mt-5 space-y-3">
              {dashboardSummary.weakestTopics.map((topic) => (
                <li key={topic} className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-sm text-rose-200">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="card-surface rounded-3xl p-5">
            <h3 className="text-xl font-bold text-white">Recent attempts</h3>
            <div className="mt-5 space-y-3">
              {recentAttempts.map((attempt) => (
                <div key={`${attempt.title}-${attempt.date}`} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{attempt.title}</p>
                    <p className="text-sm text-slate-400">{attempt.subject} · {attempt.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-cyan-300">{attempt.score}</p>
                    <p className="text-sm text-slate-400">{attempt.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-3xl p-5">
            <h3 className="text-xl font-bold text-white">Recommended practice</h3>
            <div className="mt-5 space-y-3">
              {progressChartData.slice(0, 3).map((item) => (
                <div key={item.subject} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="font-semibold text-white">{item.subject}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    You need more practice with <span className="text-cyan-300">{item.subject === "Mathematics" ? "Algebra" : "Reasoning"}</span>.
                  </p>
                  <button className="mt-3 rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950">
                    Practice {item.subject === "Mathematics" ? "Algebra" : "This topic"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
