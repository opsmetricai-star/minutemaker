import { createClient } from "@/lib/supabase/server";
import { getProfileAndUsage } from "@/lib/usage";
import { PLANS } from "@/lib/config";
import { BillingClaim } from "@/components/BillingClaim";

export default async function Billing() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { profile, plan, usedMinutes } = await getProfileAndUsage(sb, user!.id);
  const { data: claims } = await sb.from("payment_claims").select("id, plan, reference, status, created_at").order("created_at", { ascending: false });
  const pct = Math.min(100, Math.round((usedMinutes / plan.minutesPerMonth) * 100));

  return (
    <div>
      <h1 className="display text-4xl">Billing</h1>
      <div className="mt-6 rounded-2xl bg-white p-6">
        <p className="text-sm text-muted">Current plan</p>
        <p className="text-3xl font-semibold text-brand-700">{plan.name}</p>
        {profile?.plan_expires_at && plan.id !== "basic" && <p className="text-sm text-muted">Active until {new Date(profile.plan_expires_at).toLocaleDateString()}</p>}
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-panel"><div className="h-full bg-brand-600" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-sm">{usedMinutes} of {plan.minutesPerMonth.toLocaleString()} minutes used this month</p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Upgrade</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {PLANS.filter((p) => p.external).map((p) => (
          <div key={p.id} className="rounded-2xl bg-white p-5"><p className="font-semibold">{p.name}</p><p className="text-2xl font-semibold">${p.price}<span className="text-sm font-normal text-muted">/mo</span></p><p className="mt-1 text-sm text-muted">{p.minutesPerMonth.toLocaleString()} min/month</p>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-4 block rounded-xl bg-brand-600 py-2.5 text-center text-sm font-bold text-white hover:bg-brand-700">Pay for {p.name}</a></div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold">I&apos;ve paid</h2>
      <p className="mt-1 text-sm text-muted">After checkout, enter the reference from your receipt. Access is granted only after the payment is verified — completing checkout alone does not upgrade your account.</p>
      <BillingClaim />

      {(claims ?? []).length > 0 && (
        <div className="mt-8 divide-y divide-line rounded-2xl bg-white">
          {claims!.map((c) => <div key={c.id} className="flex justify-between p-4 text-sm"><span>{c.plan} · {c.reference}</span><span className="font-semibold">{c.status}</span></div>)}
        </div>
      )}
    </div>
  );
}
