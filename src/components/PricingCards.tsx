import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/config";

export function PricingCards({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <p className={`mb-3 text-xs ${dark ? "text-white/70" : "text-muted"}`}>Prices in USD, billed monthly</p>
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-white text-ink md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => {
          const cta = `inline-flex justify-center rounded-2xl border px-5 py-3 text-center text-sm font-bold transition ${p.best ? "border-brand-600 bg-brand-600 text-white hover:bg-brand-700" : "border-line hover:border-brand-600 hover:text-brand-700"}`;
          return (
            <div key={p.id} className={`relative flex flex-col border-line p-7 lg:border-r last:border-r-0 ${p.best ? "bg-gradient-to-b from-brand-50 to-white" : ""}`}>
              {p.best && <span className="absolute inset-x-0 top-0 h-2 bg-brand-600" />}
              <h3 className="flex items-center gap-2 text-2xl font-semibold">
                {p.name}
                {p.badge && <span className="rounded border border-brand-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">{p.badge}</span>}
              </h3>
              <p className="mt-1 min-h-10 text-sm text-muted">{p.tagline}</p>
              <p className="mt-5 text-3xl font-semibold">
                {p.price === 0 ? "Free" : <>${p.price}<span className="ml-1 text-sm font-normal text-muted">/month</span></>}
              </p>
              <div className="mt-6">
                {p.external ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${cta} w-full`}>Sign up</a>
                ) : (
                  <Link href={p.href} className={`${cta} w-full`}>Sign up</Link>
                )}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{f}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      {dark && <p className="mt-4 text-center text-sm text-white/80">After checkout, confirm your payment reference in Dashboard, Billing. Your plan activates once the payment is verified.</p>}
    </div>
  );
}
