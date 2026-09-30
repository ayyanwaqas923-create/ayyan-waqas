import Link from "next/link";
import { ArrowRight, BrainCircuit, BookOpen, ChartNoAxesCombined, Clock3, GraduationCap, ShieldCheck } from "lucide-react";

const subjects = [
  "Mathematics",
  "Computer Science",
  "Accounting",
  "Economics",
  "Pakistan Studies",
  "Islamiyat",
  "Urdu",
  "English",
];

const features = [
  "Practice O-Level questions with exam-style structure",
  "Take timed practice and full paper assessments",
  "Submit typed answers, handwritten images, and PDFs",
  "Get AI-assisted marking with examiner-style feedback",
  "Understand lost marks and target weak topics",
  "Track growth across papers and subjects",
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">O-Level</p>
            <h1 className="text-lg font-bold text-white">Exam Coach AI</h1>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/subjects">Subjects</Link>
          <Link href="/papers">Paper Library</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/ai-coach">AI Coach</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-white">
            Login
          </Link>
          <Link href="/signup" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Sign Up
          </Link>
        </div>
      </header>

      <section className="grid-pattern relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Cambridge exam readiness
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Practice Like a Real O-Level Exam.
              <span className="mt-2 block text-cyan-300">Improve Like an Examiner Is Guiding You.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Build confidence with exam-style questions, timed papers, AI-assisted marking, and practical feedback that shows exactly why marks were gained or lost.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Start Practising <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/subjects" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-200">
                Explore Subjects
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 text-sm text-slate-300">
              {features.map((feature) => (
                <span key={feature} className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="card-surface rounded-3xl p-6">
            <div className="rounded-2xl bg-slate-950/80 p-5 ring-1 ring-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Current focus</p>
                  <h3 className="mt-1 text-2xl font-bold text-white">Mathematics</h3>
                </div>
                <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Progress</p>
                  <p className="text-xl font-bold text-emerald-300">76%</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Algebra", value: 82 },
                  { label: "Geometry", value: 68 },
                  { label: "Trigonometry", value: 74 },
                  { label: "Probability", value: 59 },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                      <span>{metric.label}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${metric.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <BookOpen className="h-5 w-5 text-cyan-300" />
                  <p className="mt-3 text-2xl font-bold text-white">18</p>
                  <p className="text-sm text-slate-400">Questions practised</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <ChartNoAxesCombined className="h-5 w-5 text-violet-300" />
                  <p className="mt-3 text-2xl font-bold text-white">68%</p>
                  <p className="text-sm text-slate-400">Average score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">What students can do</p>
          <h3 className="mt-3 text-3xl font-bold text-white">Everything needed to revise, practice, and improve</h3>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: BrainCircuit, title: "AI marking", text: "Use Google Gemini to estimate marks and explain where rubric points were lost." },
            { icon: Clock3, title: "Timed exam mode", text: "Run full papers under realistic timing and automatic submission when time expires." },
            { icon: ShieldCheck, title: "Clear guidance", text: "See strengths, missing points, and what to revise before the next attempt." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-surface rounded-2xl p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600/10 text-cyan-300 ring-1 ring-cyan-500/30">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-5 text-xl font-bold text-white">{title}</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="card-surface rounded-3xl p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Subject coverage</p>
              <h3 className="mt-2 text-3xl font-bold text-white">Built for the full O-Level journey</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <span key={subject} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-slate-200">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
