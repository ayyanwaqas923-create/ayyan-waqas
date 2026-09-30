import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { subjects } from "@/lib/demo-data";

export default function SubjectsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Browse all subjects</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Subject library</h2>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">8 subjects</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="card-surface rounded-3xl p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{subject.name}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{subject.progress}%</h3>
                </div>
                <div className="rounded-xl bg-cyan-500/10 px-3 py-2 text-right ring-1 ring-cyan-500/20">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Avg</p>
                  <p className="text-lg font-bold text-cyan-200">{subject.averageScore}%</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">{subject.description}</p>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Weak topics</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {subject.weakTopics.map((weakTopic) => (
                    <span key={weakTopic} className="rounded-full border border-slate-700 bg-slate-900/70 px-2 py-1 text-xs text-slate-200">
                      {weakTopic}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/practice"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Practice {subject.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
