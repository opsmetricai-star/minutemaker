"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function BillingClaim() {
  const router = useRouter();
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/billing/claim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fd) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) { setMsg({ ok: true, t: "Received. Your plan will activate once we verify the payment." }); form.reset(); router.refresh(); }
    else setMsg({ ok: false, t: j.error ?? "Failed." });
  }
  const input = "rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand-600";
  return (
    <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
      <select name="plan" className={input}><option value="pro">Pro</option><option value="business">Business</option><option value="scale">Scale</option></select>
      <input name="reference" required placeholder="Payment reference / order ID from your receipt" className={input} />
      <button className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Submit</button>
      {msg && <p className={`text-sm sm:col-span-3 ${msg.ok ? "text-brand-700" : "text-red-600"}`}>{msg.t}</p>}
    </form>
  );
}
