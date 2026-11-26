"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "./Logo";
import { TranscriptMock } from "./ProductMock";

type Mode = "login" | "signup" | "forgot" | "reset";
const copy = {
  login: { h: "Log in to MinuteMaker", s: "Pick up where your teams left off.", b: "Log in", alt: ["New to MinuteMaker?", "Sign up", "/signup"] },
  signup: { h: "Create your MinuteMaker account", s: "Analyze your first meeting on the free plan.", b: "Create account", alt: ["Already have an account?", "Log in", "/login"] },
  forgot: { h: "Reset your password", s: "Enter your work email and we will send a reset link.", b: "Reset password", alt: ["Remembered it?", "Log in", "/login"] },
  reset: { h: "Choose a new password", s: "Use at least 8 characters.", b: "Update password", alt: ["", "", ""] },
} as const;

// Email links must point at the live site, never localhost. Set NEXT_PUBLIC_SITE_URL in production.
const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, "");

function Inner({ mode }: { mode: Mode }) {
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/dashboard";
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const c = copy[mode];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    const sb = createClient();
    const origin = siteUrl();
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace(next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard"); router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: String(f.get("name") ?? "").trim() }, emailRedirectTo: `${origin}/auth/callback` } });
        if (error) throw error;
        if (data.session) { router.replace("/dashboard"); router.refresh(); }
        else setMsg({ ok: true, t: "Confirm your email address using the link we just sent, then log in." });
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error;
        setMsg({ ok: true, t: "If an account exists for that address, a reset link is on its way." });
      } else {
        if (password.length < 8) throw new Error("Password must be at least 8 characters.");
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/dashboard"); router.refresh();
      }
    } catch (err) {
      setMsg({ ok: false, t: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally { setBusy(false); }
  }

  const input = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200";
  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <div className="mb-10"><Logo /></div>
        <h1 className="display text-4xl">{c.h}</h1>
        <p className="mt-2 text-muted">{c.s}</p>
        <form onSubmit={submit} className="mt-8 max-w-sm space-y-4">
          {mode === "signup" && <input name="name" required placeholder="Full name" autoComplete="name" className={input} />}
          {mode !== "reset" && <input name="email" type="email" required placeholder="Work email" autoComplete="email" className={input} />}
          {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder={mode === "reset" ? "New password" : "Password (8+ characters)"} autoComplete={mode === "login" ? "current-password" : "new-password"} className={input} />}
          {msg && <p role="status" className={`text-sm ${msg.ok ? "text-brand-700" : "text-red-600"}`}>{msg.t}</p>}
          <button disabled={busy} className="w-full rounded-2xl bg-brand-600 py-3.5 font-bold text-white hover:bg-brand-700 disabled:opacity-60">{busy ? "Please wait" : c.b}</button>
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
