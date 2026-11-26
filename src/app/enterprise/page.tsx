import { PublicShell, Btn } from "@/components/PublicShell";
import { ShieldCheck, Lock, Trash2, Gauge, FileText, Layers } from "lucide-react";

export const metadata = { title: "Enterprise | MinuteMaker" };

const items = [
  [Layers, "Capacity at scale", "The Scale plan provides 30,000 transcription minutes per month for organizations running meetings across many teams."],
  [ShieldCheck, "Database-level isolation", "Every meeting, transcript and summary is protected by row-level security. Accounts can only read their own records."],
  [Lock, "Private recording storage", "Recordings are held in a private storage bucket, accessible only to the account that uploaded them."],
  [Trash2, "Permanent deletion", "Any meeting can be deleted along with its original recording, giving you direct control over retention."],
  [FileText, "A complete record per meeting", "Transcript, summary, key points and the commitments register are stored together and stay verifiable at the source."],
  [Gauge, "Usage visibility", "Live tracking shows minutes consumed against the monthly allowance so capacity is planned, not discovered."],
] as const;

export default function Enterprise() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[1100px] px-5 py-20 text-center lg:px-8">
        <h1 className="display text-5xl text-brand-600 sm:text-6xl">Meeting intelligence at organizational scale</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg">Give every team an AI engine that records decisions, assigns ownership and keeps a searchable record, with the data controls a security review expects.</p>
        <div className="mt-8 flex justify-center gap-3"><Btn href="/signup">Sign up</Btn><Btn href="/login" variant="outline">Log in</Btn></div>
      </section>
      <section id="security" className="bg-panel/50 py-16">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display mb-10 text-4xl">Security and control</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(([I, t, d]) => (
              <div key={t} className="rounded-2xl bg-white p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><I className="h-5 w-5" /></span><h3 className="mt-4 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="deep-section py-16 text-center text-white">
        <h2 className="display mx-auto max-w-2xl px-5 text-4xl">Run every meeting through one AI engine</h2>
        <div className="mt-6"><Btn href="/signup" variant="white">Sign up</Btn></div>
      </section>
    </PublicShell>
  );
}
