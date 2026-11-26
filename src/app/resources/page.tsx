import { PublicShell } from "@/components/PublicShell";

export const metadata = { title: "Resources — MinuteMaker" };

const posts = [
  ["Playbook", "How to run a meeting people actually want to attend", "Agendas, owners and the five-minute recap that keeps everyone aligned."],
  ["Sales", "The follow-up email that gets a reply", "Turn call notes into a clear next step within an hour."],
  ["Education", "Study smarter from recorded lectures", "Search, summarise and quiz yourself from your own transcripts."],
  ["Media", "From interview to article outline in ten minutes", "A repeatable workflow for producers and writers."],
  ["Teams", "Build a searchable memory for your company", "Why meeting knowledge should not disappear in a calendar."],
  ["Privacy", "Recording meetings responsibly", "Consent, retention and how to tell attendees what happens to the audio."],
];

export default function Resources() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <h1 className="display text-5xl text-brand-600 sm:text-6xl">Blog &amp; guides</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(([tag, t, d], i) => (
            <article key={t} className="overflow-hidden rounded-3xl border border-line">
              <div className="h-40 blob-card" style={{ filter: `hue-rotate(${i * 12}deg)` }} />
              <div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-brand-700">{tag}</p><h2 className="mt-2 text-xl font-semibold">{t}</h2><p className="mt-2 text-sm text-muted">{d}</p></div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">Full articles are being written; these are the upcoming topics.</p>
      </section>
    </PublicShell>
  );
}
