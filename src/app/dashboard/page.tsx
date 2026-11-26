import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProfileAndUsage } from "@/lib/usage";

export default async function DashHome() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { profile, plan, usedMinutes, remaining } = await getProfileAndUsage(sb, user!.id);
  const { data: meetings } = await sb.from("meetings").select("id, title, status, duration_seconds, created_at, summary").order("created_at", { ascending: false }).limit(5);
  const { count: total } = await sb.from("meetings").select("id", { count: "exact", head: true });
  const { data: openItems } = await sb.from("meetings").select("action_items").eq("status", "ready");
  const actions = (openItems ?? []).reduce((s, m) => s + ((m.action_items as unknown[])?.length ?? 0), 0);

  const stats = [["Meetings", String(total ?? 0)], ["Minutes used", `${usedMinutes}`], ["Minutes left", remaining.toLocaleString()], ["Action items", String(actions)]];
  return (
    <div>
      <h1 className="display text-4xl">{profile?.full_name ? `Welcome back, ${profile.full_name.split(" ")[0]}` : "Welcome back"}</h1>
      <p className="mt-1 text-muted">Current plan: {plan.name}.</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([l, v]) => <div key={l} className="rounded-2xl bg-white p-5"><p className="text-sm text-muted">{l}</p><p className="mt-1 text-3xl font-semibold text-brand-700">{v}</p></div>)}
      </div>
      <div className="mt-8 flex items-center justify-between"><h2 className="text-xl font-semibold">Recent meetings</h2><Link href="/dashboard/new" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">New meeting</Link></div>
      <div className="mt-4 divide-y divide-line rounded-2xl bg-white">
        {(meetings ?? []).length === 0 && <p className="p-8 text-center text-muted">No meetings yet. Upload a recording or paste a transcript to run your first analysis.</p>}
        {(meetings ?? []).map((m) => (
          <Link key={m.id} href={`/dashboard/meetings/${m.id}`} className="flex items-center justify-between gap-4 p-5 hover:bg-brand-50/50">
            <div className="min-w-0"><p className="truncate font-semibold">{m.title}</p><p className="truncate text-sm text-muted">{m.summary ?? "Awaiting analysis"}</p></div>
            <div className="shrink-0 text-right text-xs text-muted"><span className={`rounded-full px-2 py-0.5 font-bold ${m.status === "ready" ? "bg-brand-100 text-brand-800" : m.status === "failed" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>{m.status}</span><p className="mt-1">{new Date(m.created_at).toLocaleDateString()}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
