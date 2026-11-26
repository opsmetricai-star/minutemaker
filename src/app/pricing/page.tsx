import { PublicShell, Btn } from "@/components/PublicShell";
import { PricingCards } from "@/components/PricingCards";

export const metadata = { title: "Pricing — MinuteMaker" };

const rows: [string, string, string, string, string][] = [
  ["Transcription minutes / month", "300", "1,200", "6,000", "30,000"],
  ["Max recording length", "30 min", "4 hours", "4 hours", "8 hours"],
  ["AI summary & action items", "✓", "✓", "✓", "✓"],
  ["AI chat across meetings", "3 per meeting", "Unlimited", "Unlimited", "Unlimited"],
  ["Export (text, Markdown, JSON)", "—", "✓", "✓", "✓"],
  ["Team workspace", "—", "—", "✓", "✓"],
  ["Workflow automations", "—", "—", "✓", "Unlimited"],
  ["Priority support", "—", "—", "✓", "Dedicated"],
];
const faq = [
  ["How do I upgrade?", "Choose a plan and complete checkout. Then open Dashboard → Billing, submit your payment reference, and your plan is activated once we verify the payment."],
  ["What happens if I run out of minutes?", "New uploads pause until your monthly allowance resets or you upgrade. Existing meetings stay available."],
  ["Can I cancel?", "Yes. Stop renewing at any time and you will fall back to Basic when the paid period ends."],
];

export default function Pricing() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <h1 className="display text-center text-5xl text-brand-600 sm:text-6xl">Choose the plan that&apos;s right for you</h1>
        <div className="mt-12 rounded-3xl bg-brand-800 p-6"><PricingCards dark /></div>

        <h2 className="display mt-24 text-4xl">Compare plans</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-panel"><tr>{["Feature", "Basic", "Pro", "Business", "Scale"].map((h) => <th key={h} className="px-5 py-4 font-bold">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r) => <tr key={r[0]} className="border-t border-line">{r.map((c, i) => <td key={i} className={`px-5 py-3.5 ${i === 0 ? "font-semibold" : "text-muted"}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        <h2 className="display mt-24 text-4xl">Pricing questions</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faq.map(([q, a]) => <div key={q} className="py-5"><h3 className="font-semibold">{q}</h3><p className="mt-1 text-muted">{a}</p></div>)}
        </div>
        <div className="mt-16 rounded-3xl bg-brand-50 p-10 text-center">
          <h2 className="display text-3xl">Need something bigger?</h2>
          <p className="mt-2 text-muted">We&apos;ll tailor limits, retention and security to your organization.</p>
          <div className="mt-6"><Btn href="/contact?topic=enterprise">Talk to sales</Btn></div>
        </div>
      </section>
    </PublicShell>
  );
}
