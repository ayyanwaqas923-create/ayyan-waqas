import { AppShell } from "@/components/app-shell";
import { aiCoachPrompts } from "@/lib/demo-data";

export default function AICoachPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">AI coach</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Ask for targeted support</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <div className="card-surface rounded-3xl p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Suggested prompts</p>
            <div className="mt-5 space-y-3">
              {aiCoachPrompts.map((prompt) => (
                <button key={prompt} className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-200">
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-3xl p-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">AI coach response</p>
              <h3 className="mt-4 text-2xl font-bold text-white">Why did I lose marks?</h3>
              <p className="mt-4 leading-7 text-slate-300">
                Your recent Algebra response shows relevant method, but several marks were lost because the explanation did not clearly show why the final value satisfied both equations. You also missed a full statement of the final answer and a clearer step-by-step development. For full marks, you should show the substitution or elimination process, align method with the command word, and clearly justify the final values.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Based on your actual results</p>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="list-disc pl-5">You are strongest in English analysis and Algebra recall.</li>
                <li className="list-disc pl-5">Your weakest trend is Probability and network-based reasoning.</li>
                <li className="list-disc pl-5">The best next step is targeted practice with short exam-style explanations.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
