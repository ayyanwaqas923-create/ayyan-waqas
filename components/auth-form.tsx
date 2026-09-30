"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("student@demo.com");
  const [password, setPassword] = useState("student123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const payload = mode === "signup" ? { name, email, password } : { email, password };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Authentication failed.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-surface mx-auto max-w-md rounded-3xl p-6 md:p-8">
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Student account</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "signup" && (
          <label className="block text-sm text-slate-300">
            Full name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none ring-0 transition focus:border-cyan-400"
              placeholder="Ayesha Rahman"
            />
          </label>
        )}

        <label className="block text-sm text-slate-300">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="student@example.com"
          />
        </label>

        <label className="block text-sm text-slate-300">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            placeholder="••••••••"
          />
        </label>

        {error ? <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-400">
        {mode === "login" ? "Need an account?" : "Already have an account?"} {" "}
        <Link href={mode === "login" ? "/signup" : "/login"} className="font-semibold text-cyan-300 hover:text-cyan-200">
          {mode === "login" ? "Sign up" : "Login"}
        </Link>
      </p>
    </div>
  );
}
