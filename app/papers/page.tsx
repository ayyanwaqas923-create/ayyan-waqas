import { AppShell } from "@/components/app-shell";
import { papers } from "@/lib/demo-data";

export default function PapersPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Paper library</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Browse demo papers</h2>
          </div>
          <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200">
            Demo / Sample Material
          </div>
        </div>

        <div className="card-surface rounded-3xl p-5">
          <div className="grid gap-4 md:grid-cols-5">
            <select className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-200">
              <option>Subject</option>
              <option>Mathematics</option>
              <option>Computer Science</option>
            </select>
            <select className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-200">
              <option>Year</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-200">
              <option>Session</option>
              <option>May/June</option>
              <option>October/November</option>
            </select>
            <select className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-200">
              <option>Paper</option>
              <option>Paper 1</option>
              <option>Paper 2</option>
            </select>
            <select className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-sm text-slate-200">
              <option>Topic</option>
              <option>Algebra</option>
              <option>Algorithms</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {papers.map((paper) => (
            <div key={paper.id} className="card-surface rounded-3xl p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{paper.subject}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">{paper.title}</h3>
                </div>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-xs text-amber-200">
                  {paper.demoLabel}
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-400">Year</p>
                  <p className="mt-1 font-semibold text-white">{paper.year}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-400">Session</p>
                  <p className="mt-1 font-semibold text-white">{paper.session}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-slate-400">Duration</p>
                  <p className="mt-1 font-semibold text-white">{paper.duration} mins</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Instructions</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {paper.instructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ul>
              </div>

              <button className="mt-6 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Open paper
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
