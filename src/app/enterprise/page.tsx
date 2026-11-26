import { PublicShell, Btn } from "@/components/PublicShell";
import { ShieldCheck, Lock, Users, BarChart3, Workflow, Headphones } from "lucide-react";

export const metadata = { title: "Enterprise — MinuteMaker" };

const items = [
  [ShieldCheck, "Security first", "Private storage, row-level isolation between accounts, and server-side handling of every credential."],
  [Lock, "Data control", "Configurable retention and deletion so recordings live only as long as your policy requires."],
  [Users, "Team administration", "Central workspace, shared folders and role-based access for every department."],
  [BarChart3, "Usage analytics", "See minutes, meetings and adoption by team to plan capacity."],
  [Workflow, "Custom workflows", "Automations that route summaries and action items into the systems you use."],
  [Headphones, "Dedicated support", "Onboarding, a named success manager and priority response times."],
] as const;

export default function Enterprise() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[1100px] px-5 py-20 text-center lg:px-8">
        <h1 className="display text-5xl text-brand-600 sm:text-7xl">Meeting intelligence for the whole organization</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg">Give every team accurate records, searchable knowledge and automated follow-through, with the controls your security team expects.</p>
        <div className="mt-8"><Btn href="/contact?topic=enterprise">Talk to sales</Btn></div>
      </section>
      <section id="security" className="bg-panel/50 py-16">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {items.map(([I, t, d]) => (
            <div key={t} className="rounded-2xl bg-white p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><I className="h-5 w-5" /></span><h3 className="mt-4 text-xl font-semibold">{t}</h3><p className="mt-2 text-sm text-muted">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="deep-section py-16 text-center text-white">
        <h2 className="display text-4xl">Let&apos;s plan your rollout</h2>
        <div className="mt-6"><Btn href="/contact?topic=enterprise" variant="white">Schedule a demo</Btn></div>
      </section>
    </PublicShell>
  );
}
