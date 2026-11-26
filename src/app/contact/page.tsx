"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PublicShell } from "@/components/PublicShell";

function Form() {
  const topic = useSearchParams().get("topic") ?? "general";
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) setState("done");
    else { setErr(j.error ?? "Something went wrong."); setState("error"); }
  }
  if (state === "done") return <p className="rounded-2xl bg-brand-50 p-6 font-semibold text-brand-800">Thanks — we received your message and will reply by email.</p>;
  const input = "w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200";
  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="name" required placeholder="Your name" className={input} />
      <input name="email" type="email" required placeholder="Work email" className={input} />
      <select name="topic" defaultValue={topic} className={input}>
        <option value="general">General question</option><option value="demo">Schedule a demo</option><option value="enterprise">Enterprise / sales</option><option value="support">Support</option>
      </select>
      <textarea name="message" required minLength={10} rows={5} placeholder="How can we help?" className={input} />
      {state === "error" && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={state === "sending"} className="rounded-2xl bg-brand-600 px-7 py-3.5 font-bold text-white hover:bg-brand-700 disabled:opacity-60">{state === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}

export default function Contact() {
  return (
    <PublicShell>
      <section className="mx-auto grid max-w-[1100px] gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="display text-5xl text-brand-600 sm:text-6xl">Talk to a human</h1>
          <p className="mt-5 text-lg">Ask a question, book a demo or tell us what you need. We usually reply within one business day.</p>
        </div>
        <Suspense><Form /></Suspense>
      </section>
    </PublicShell>
  );
}
