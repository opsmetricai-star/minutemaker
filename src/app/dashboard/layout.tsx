import { redirect } from "next/navigation";
import { Bell } from "lucide-react";
import { Logo } from "@/components/Logo";
import { DashNav } from "@/components/DashNav";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { getProfileAndUsage } from "@/lib/usage";

export const dynamic = "force-dynamic";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured()) redirect("/login");
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const { plan, usedMinutes } = await getProfileAndUsage(sb, user.id);
  const { data: notes } = await sb.from("notifications").select("id, title, body, read, created_at").order("created_at", { ascending: false }).limit(5);
  const unread = (notes ?? []).filter((n) => !n.read).length;
  const pct = Math.min(100, Math.round((usedMinutes / plan.minutesPerMonth) * 100));

  return (
    <div className="min-h-screen bg-panel/60 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-line bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 pt-5 lg:block"><Logo /></div>
        <DashNav />
        <div className="m-4 hidden rounded-2xl bg-brand-50 p-4 lg:block">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-700">{plan.name} plan</p>
          <p className="mt-1 text-sm font-semibold">{usedMinutes} / {plan.minutesPerMonth.toLocaleString()} min</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} /></div>
        </div>
      </aside>
      <div>
        <header className="flex items-center justify-end gap-3 border-b border-line bg-white px-6 py-3">
          <details className="relative">
            <summary className="relative flex cursor-pointer list-none items-center rounded-full p-2 hover:bg-brand-50" aria-label="Notifications">
              <Bell className="h-5 w-5" />{unread > 0 && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-brand-600" />}
            </summary>
            <div className="absolute right-0 z-30 mt-2 w-80 rounded-2xl border border-line bg-white p-4 shadow-xl">
              <p className="mb-2 text-sm font-bold">Notifications</p>
              {(notes ?? []).length === 0 && <p className="text-sm text-muted">Nothing yet.</p>}
              {(notes ?? []).map((n) => <div key={n.id} className="border-t border-line py-2 first:border-0"><p className="text-sm font-semibold">{n.title}</p><p className="text-xs text-muted">{n.body}</p></div>)}
            </div>
          </details>
          <span className="text-sm text-muted">{user.email}</span>
        </header>
        <main className="mx-auto max-w-5xl p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
