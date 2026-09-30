"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  FileClock,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/papers", label: "Paper Library", icon: FileClock },
  { href: "/practice", label: "Practice Mode", icon: Sparkles },
  { href: "/exam", label: "Full Exam Mode", icon: GraduationCap },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/ai-coach", label: "AI Coach", icon: BrainCircuit },
  { href: "/profile", label: "Profile", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/80 p-6 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300">O-Level</p>
              <h2 className="text-lg font-bold text-white">Coach AI</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-500/30" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Student</p>
            <p className="mt-2 text-lg font-bold text-white">Ayesha Rahman</p>
            <button className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Academic support</p>
              <h1 className="mt-1 text-2xl font-bold text-white">O-Level Exam Coach AI</h1>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                74% overall progress
              </span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
