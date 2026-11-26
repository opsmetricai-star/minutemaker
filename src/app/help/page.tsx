import { PublicShell } from "@/components/PublicShell";
import Link from "next/link";

export const metadata = { title: "Help center — MinuteMaker" };

const qa = [
  ["How do I get my first transcript?", "Sign in, choose New meeting, upload an audio file (MP3, M4A, WAV, WebM) or paste a transcript, and press Process. Results appear on the meeting page."],
  ["Which audio formats work?", "MP3, M4A/AAC, WAV, OGG, FLAC and WebM up to 20 MB per file."],
  ["Why is my meeting stuck on processing?", "Processing usually takes under two minutes. If it fails, the meeting shows the reason and the minutes are not charged."],
  ["How do I upgrade my plan?", "Open Billing, pick a plan, pay via the checkout link, then submit your payment reference. We activate the plan after verifying it."],
  ["How do I delete my data?", "Delete any meeting from its page. To remove your account entirely, contact support."],
];

export default function Help() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[900px] px-5 py-16 lg:px-8">
        <h1 className="display text-5xl text-brand-600">Help center</h1>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {qa.map(([q, a]) => <div key={q} className="py-5"><h2 className="font-semibold">{q}</h2><p className="mt-1 text-muted">{a}</p></div>)}
        </div>
        <p className="mt-8">Still stuck? <Link className="font-semibold text-brand-700 underline" href="/contact">Contact us</Link>.</p>
      </section>
    </PublicShell>
  );
}
