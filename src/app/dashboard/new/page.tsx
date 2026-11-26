"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const MAX = 20 * 1024 * 1024;

function audioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const a = document.createElement("audio");
    a.preload = "metadata";
    a.src = URL.createObjectURL(file);
    a.onloadedmetadata = () => { resolve(Math.round(a.duration) || 0); URL.revokeObjectURL(a.src); };
    a.onerror = () => resolve(0);
  });
}

export default function NewMeeting() {
  const router = useRouter();
  const [tab, setTab] = useState<"upload" | "paste">("upload");
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr("");
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    try {
      let payload: Record<string, unknown>;
      if (tab === "upload") {
        const file = f.get("file") as File;
        if (!file || !file.size) throw new Error("Choose an audio file.");
        if (file.size > MAX) throw new Error("File is larger than 20 MB.");
        setBusy("Uploading recording");
        const sb = createClient();
        const { data: { user } } = await sb.auth.getUser();
        if (!user) throw new Error("Please log in again.");
        const path = `${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
        const { error } = await sb.storage.from("recordings").upload(path, file, { contentType: file.type || "audio/mpeg" });
        if (error) throw new Error(error.message);
        payload = { title, source: "upload", path, durationSeconds: await audioDuration(file) };
      } else {
        payload = { title, source: "paste", transcript: String(f.get("transcript") ?? "") };
      }
      setBusy("The AI is transcribing and analyzing your meeting. This can take a minute or two.");
      const res = await fetch("/api/meetings/process", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error ?? "Processing failed.");
      router.push(`/dashboard/meetings/${j.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong."); setBusy("");
    }
  }

  const input = "w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand-600";
  return (
    <div className="max-w-2xl">
      <h1 className="display text-4xl">New meeting</h1>
      <div className="mt-6 inline-flex rounded-full bg-white p-1 text-sm font-semibold">
        {(["upload", "paste"] as const).map((t) => <button key={t} type="button" onClick={() => setTab(t)} className={`rounded-full px-5 py-2 ${tab === t ? "bg-brand-600 text-white" : "text-muted"}`}>{t === "upload" ? "Upload audio" : "Paste transcript"}</button>)}
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input name="title" required maxLength={160} placeholder="Meeting title" className={input} />
        {tab === "upload"
          ? <input name="file" type="file" accept="audio/*,video/webm,video/mp4" className={`${input} file:mr-4 file:rounded-lg file:border-0 file:bg-brand-100 file:px-4 file:py-2 file:font-semibold file:text-brand-800`} />
          : <textarea name="transcript" rows={10} required placeholder="Paste the meeting transcript or raw notes" className={input} />}
        {err && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</p>}
        {busy && <p className="rounded-xl bg-brand-50 p-3 text-sm text-brand-800">{busy}</p>}
        <button disabled={!!busy} className="rounded-2xl bg-brand-600 px-8 py-3.5 font-bold text-white hover:bg-brand-700 disabled:opacity-60">Process meeting</button>
        <p className="text-xs text-muted">Audio up to 20 MB (MP3, M4A, WAV, OGG, FLAC, WebM). Pasted transcripts don&apos;t use transcription minutes.</p>
      </form>
    </div>
  );
}
