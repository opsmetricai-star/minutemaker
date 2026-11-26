import { PublicShell, Btn } from "@/components/PublicShell";
import { PricingCards } from "@/components/PricingCards";

export const metadata = { title: "Pricing | MinuteMaker" };

const Y = "Included";
const N = "Not included";
const rows: string[][] = [
  ["Transcription minutes per month", "300", "1,200", "6,000", "30,000"],
  ["Recording length", "Up to 30 minutes", "Up to the 20 MB upload limit", "Up to the 20 MB upload limit", "Up to the 20 MB upload limit"],
  ["Transcript, summary and key points", Y, Y, Y, Y],
  ["Decisions and action items with owners", Y, Y, Y, Y],
  ["AI questions per meeting", "3", "Unlimited", "Unlimited", "Unlimited"],
  ["Cross-meeting AI search", N, Y, Y, Y],
];
const faq = [
  ["How does an upgrade work?", "Complete checkout for your plan, then enter your payment reference in Dashboard, Billing. The plan is activated once the payment has been verified."],
  ["What happens when the monthly allowance is used?", "New recordings pause until the allowance resets or you move to a higher plan. Existing meetings stay fully available. Pasted transcripts never consume minutes."],
  ["Can the plan be changed or ended?", "Paid plans run for the period you purchased. When the period ends, the account returns to Basic with all meetings intact."],
];

export default function Pricing() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <h1 className="display text-center text-5xl text-brand-600 sm:text-6xl">Pricing that scales with your meeting volume</h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg">Every plan runs the same AI engine. You choose the capacity.</p>
        <div className="mt-12 rounded-3xl bg-brand-800 p-6"><PricingCards dark /></div>

        <h2 className="display mt-24 text-4xl">Compare plans</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-panel"><tr>{["Capability", "Basic", "Pro", "Business", "Scale"].map((h) => <th key={h} className="px-5 py-4 font-bold">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r) => <tr key={r[0]} className="border-t border-line">{r.map((c, i) => <td key={i} className={`px-5 py-3.5 ${i === 0 ? "font-semibold" : "text-muted"}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>

        <h2 className="display mt-24 text-4xl">Pricing questions</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faq.map(([q, a]) => <div key={q} className="py-5"><h3 className="font-semibold">{q}</h3><p className="mt-1 text-muted">{a}</p></div>)}
        </div>
        <div className="mt-16 rounded-3xl bg-brand-50 p-10 text-center">
          <h2 className="display text-3xl">Start with the free plan</h2>
          <p className="mt-2 text-muted">Analyze your first meetings at no cost, then scale capacity as volume grows.</p>
          <div className="mt-6 flex justify-center gap-3"><Btn href="/signup">Sign up</Btn><Btn href="/login" variant="outline">Log in</Btn></div>
        </div>
      </section>
    </PublicShell>
  );
}
