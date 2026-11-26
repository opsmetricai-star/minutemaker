"use client";
import { useRef, useState } from "react";

export interface Msg { role: "user" | "assistant"; content: string }

export function ChatBox({ meetingId, initial = [] }: { meetingId: string | null; initial?: Msg[] }) {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const end = useRef<HTMLDivElement>(null);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const question = String(new FormData(form).get("q") ?? "").trim();
    if (question.length < 2) return;
    setBusy(true); setErr("");
    setMsgs((m) => [...m, { role: "user", content: question }]);
    form.reset();
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ meetingId, question }) });
    const j = await res.json().catch(() => ({}));
    if (res.ok) setMsgs((m) => [...m, { role: "assistant", content: j.answer }]);
    else { setErr(j.error ?? "Request failed."); setMsgs((m) => m.slice(0, -1)); }
    setBusy(false);
    setTimeout(() => end.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="rounded-2xl bg-white p-5">
      <div className="max-h-96 space-y-4 overflow-y-auto">
        {msgs.length === 0 && <p className="text-sm text-muted">Ask for a client follow-up, the decisions made, open risks, or anything stated in the meeting.</p>}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <p className={`inline-block max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-left text-sm ${m.role === "user" ? "bg-brand-600 text-white" : "bg-panel"}`}>{m.content}</p>
          </div>
        ))}
        {busy && <p className="text-sm text-muted">Analyzing the record</p>}
        <div ref={end} />
      </div>
      {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input name="q" required placeholder="Ask MinuteMaker AI" className="min-w-0 flex-1 rounded-full border border-line px-5 py-3 text-sm outline-none focus:border-brand-600" />
        <button disabled={busy} className="rounded-full bg-brand-600 px-6 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60">Ask</button>
      </form>
    </div>
  );
}
