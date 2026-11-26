import { PublicShell, Btn } from "@/components/PublicShell";

export const metadata = { title: "About | MinuteMaker" };

export default function About() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[900px] px-5 py-20 lg:px-8">
        <h1 className="display text-5xl text-brand-600 sm:text-6xl">Every business decision is spoken once</h1>
        <p className="mt-6 text-lg">Most of what an organization decides is said in a meeting and lost by the next day. MinuteMaker exists to end that loss. We build the AI engine that captures every conversation, extracts the decisions and commitments inside it, and keeps them searchable for the whole company.</p>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            ["Accuracy", "Every summary and commitment traces back to the transcript."],
            ["Accountability", "Owners and deadlines are recorded only when they were stated."],
            ["Control", "Customers own their recordings and can delete them at any time."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-brand-50 p-6"><h2 className="text-xl font-semibold text-brand-800">{t}</h2><p className="mt-1 text-sm text-muted">{d}</p></div>
          ))}
        </div>
        <div className="mt-12 flex gap-3"><Btn href="/signup">Sign up</Btn><Btn href="/login" variant="outline">Log in</Btn></div>
      </section>
    </PublicShell>
  );
}
