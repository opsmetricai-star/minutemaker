import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Meetings({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const sb = await createClient();
  let query = sb.from("meetings").select("id, title, status, duration_seconds, created_at, summary").order("created_at", { ascending: false });
  if (q) {
    const term = q.replace(/[%,()]/g, " ").trim();
    if (term) query = query.or(`title.ilike.%${term}%,transcript.ilike.%${term}%,summary.ilike.%${term}%`);
  }
  const { data } = await query;
  return (
    <div>
      <h1 className="display text-4xl">Meetings</h1>
      <form className="mt-6"><input name="q" defaultValue={q} placeholder="Search titles, summaries and transcripts" className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand-600" /></form>
      <div className="mt-6 divide-y divide-line rounded-2xl bg-white">
        {(data ?? []).length === 0 && <p className="p-8 text-center text-muted">{q ? "No meetings match your search." : "No meetings yet. Upload a recording or paste a transcript to run your first analysis."}</p>}
        {(data ?? []).map((m) => (
          <Link key={m.id} href={`/dashboard/meetings/${m.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-brand-50/50">
            <div className="min-w-0"><p className="truncate font-semibold">{m.title}</p><p className="truncate text-sm text-muted">{m.summary ?? "Awaiting analysis"}</p></div>
            <div className="shrink-0 text-right text-xs text-muted"><p>{m.status}</p><p>{Math.ceil(m.duration_seconds / 60)} min · {new Date(m.created_at).toLocaleDateString()}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
