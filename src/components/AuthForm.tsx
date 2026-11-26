"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "./Logo";
import { TranscriptMock } from "./ProductMock";

type Mode = "login" | "signup" | "forgot" | "reset";
const copy = {
  login: { h: "Welcome back", b: "Log in", alt: ["New here?", "Create an account", "/signup"] },
  signup: { h: "Start for free", b: "Create account", alt: ["Already have an account?", "Log in", "/login"] },
  forgot: { h: "Reset your password", b: "Send reset link", alt: ["Remembered it?", "Log in", "/login"] },
  reset: { h: "Choose a new password", b: "Update password", alt: ["", "", ""] },
} as const;

function Inner({ mode }: { mode: Mode }) {
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/dashboard";
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const c = copy[mode];
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    const sb = createClient();
    const origin = window.location.origin;
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace(next.startsWith("/") ? next : "/dashboard"); router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: String(f.get("name") ?? "") }, emailRedirectTo: `${origin}/auth/callback` } });
        if (error) throw error;
        if (data.session) { router.replace("/dashboard"); router.refresh(); }
        else setMsg({ ok: true, t: "Check your inbox to confirm your email, then log in." });
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error;
        setMsg({ ok: true, t: "If that email has an account, a reset link is on its way." });
      } else {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/dashboard");
      }
    } catch (err) {
      setMsg({ ok: false, t: err instanceof Error ? err.message : "Something went wrong." });
    } finally { setBusy(false); }
  }

  const input = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200";
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <div className="mb-10"><Logo /></div>
        <h1 className="display text-4xl">{c.h}</h1>
        {!configured && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.</p>}
        <form onSubmit={submit} className="mt-8 max-w-sm space-y-4">
          {mode === "signup" && <input name="name" required placeholder="Full name" className={input} />}
          {mode !== "reset" && <input name="email" type="email" required placeholder="Email" autoComplete="email" className={input} />}
          {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder={mode === "reset" ? "New password" : "Password (8+ characters)"} autoComplete={mode === "login" ? "current-password" : "new-password"} className={input} />}
          {msg && <p className={`text-sm ${msg.ok ? "text-brand-700" : "text-red-600"}`}>{msg.t}</p>}
          <button disabled={busy} className="w-full rounded-2xl bg-brand-600 py-3.5 font-bold text-white hover:bg-brand-700 disabled:opacity-60">{busy ? "Please wait…" : c.b}</button>
        </form>
        {mode === "login" && <Link href="/forgot-password" className="mt-4 text-sm font-semibold text-brand-700">Forgot password?</Link>}
        {c.alt[0] && <p className="mt-6 text-sm text-muted">{c.alt[0]} <Link href={c.alt[2]} className="font-semibold text-brand-700">{c.alt[1]}</Link></p>}
      </div>
      <div className="blob-card hidden items-center justify-center p-12 lg:flex"><TranscriptMock className="w-full max-w-md" /></div>
    </div>
  );
}

export function AuthForm({ mode }: { mode: Mode }) {
  return <Suspense><Inner mode={mode} /></Suspense>;
}
