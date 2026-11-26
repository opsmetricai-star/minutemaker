import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChatBox } from "@/components/ChatBox";
import { DeleteMeeting } from "@/components/DeleteMeeting";

interface Item { task: string; owner?: string | null; due?: string | null }

export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const sb = await createClient();
  const { data: m } = await sb.from("meetings").select("*").eq("id", id).single();
  if (!m) notFound();
  const { data: chat } = await sb.from("chat_messages").select("role, content").eq("meeting_id", id).order("created_at");
  const items = (m.action_items ?? []) as Item[];
  const points = (m.key_points ?? []) as string[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h1 className="display text-4xl">{m.title}</h1><p className="mt-1 text-sm text-muted">{new Date(m.created_at).toLocaleString()} · {Math.ceil(m.duration_seconds / 60)} min · {m.status}</p></div>
        <DeleteMeeting id={m.id} path={m.audio_path} />
      </div>
      {m.status === "failed" && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">Processing failed: {m.error}. Failed meetings don&apos;t use your minutes.</p>}
      {m.status === "processing" && <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Still processing — refresh in a moment.</p>}
      {m.summary && (
        <section className="rounded-2xl bg-white p-6"><h2 className="font-semibold text-brand-800">Summary</h2><p className="mt-2 leading-relaxed">{m.summary}</p>
          {points.length > 0 && <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">{points.map((p, i) => <li key={i}>{p}</li>)}</ul>}</section>
      )}
      {items.length > 0 && (
        <section className="rounded-2xl bg-brand-50 p-6"><h2 className="font-semibold text-brand-800">Action items</h2>
          <ul className="mt-3 space-y-2">{items.map((a, i) => <li key={i} className="text-sm">☐ {a.task}{a.owner ? <span className="text-muted"> — {a.owner}</span> : null}{a.due ? <span className="text-muted"> (due {a.due})</span> : null}</li>)}</ul></section>
      )}
      {m.status === "ready" && <section><h2 className="mb-3 font-semibold">Ask about this meeting</h2><ChatBox meetingId={m.id} initial={(chat ?? []) as { role: "user" | "assistant"; content: string }[]} /></section>}
      {m.transcript && <section className="rounded-2xl bg-white p-6"><h2 className="font-semibold">Transcript</h2><pre className="mt-3 max-h-[500px] overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed">{m.transcript}</pre></section>}
    </div>
  );
}
