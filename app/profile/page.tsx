import { AppShell } from "@/components/app-shell";
import { profileSettings } from "@/lib/demo-data";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Profile</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Student settings</h2>
        </div>

        <div className="card-surface rounded-3xl p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm text-slate-300">
              Full name
              <input defaultValue={profileSettings.name} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <input defaultValue={profileSettings.email} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
            <label className="block text-sm text-slate-300">
              Target grade
              <input defaultValue={profileSettings.targetGrade} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
            <label className="block text-sm text-slate-300">
              Revision hours per week
              <input defaultValue={profileSettings.revisionHours} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-cyan-400" />
            </label>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Preferred subjects</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profileSettings.preferredSubjects.map((subject) => (
                <span key={subject} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-200">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <button className="mt-6 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
            Save settings
          </button>
        </div>
      </div>
    </AppShell>
  );
}
