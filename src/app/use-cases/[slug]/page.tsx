import { notFound } from "next/navigation";
import { PublicShell, Btn } from "@/components/PublicShell";
import { TranscriptMock } from "@/components/ProductMock";
import { Check } from "lucide-react";

const DATA: Record<string, { title: string; hero: string; sub: string; grad: string; points: [string, string][]; steps: string[]; quote: [string, string] }> = {
  sales: {
    title: "Sales",
    hero: "Close more deals, type fewer notes",
    sub: "MinuteMaker captures every discovery call and demo, drafts the follow-up, and keeps your pipeline notes current.",
    grad: "from-orange-300 to-pink-500",
    points: [
      ["Automatic follow-ups", "Draft a recap email with next steps while the call is still fresh."],
      ["Notes capture", "Pain points, budget, objections and timelines pulled into a clean summary."],
      ["CRM sync-ready notes", "Structured output you can paste or pipe into your CRM."],
      ["Deal search", "Ask “what did Acme say about pricing?” across every call."],
    ],
    steps: ["Upload or paste the call", "Review summary and action items", "Send the generated follow-up"],
    quote: ["Reps spend their time selling instead of writing recaps.", "VP Sales, mid-market SaaS"],
  },
  education: {
    title: "Education",
    hero: "Never miss a word of the lecture",
    sub: "Turn lectures, seminars and study groups into organised transcripts, summaries and key insights.",
    grad: "from-emerald-300 to-teal-700",
    points: [
      ["Lecture transcripts", "Complete, searchable text for every class you record."],
      ["Note organization", "Titles, summaries and key points arranged per session."],
      ["Insight extraction", "Definitions, deadlines and exam hints surfaced automatically."],
      ["Study Q&A", "Ask questions about a lecture and get answers grounded in it."],
    ],
    steps: ["Record the lecture", "Upload to MinuteMaker", "Study from summaries and chat"],
    quote: ["I search my lectures like I search the web.", "Graduate student"],
  },
  media: {
    title: "Media",
    hero: "From raw interview to finished story",
    sub: "Transcribe interviews and podcasts, organise your thinking, and draft content from what was actually said.",
    grad: "from-sky-200 to-fuchsia-300",
    points: [
      ["Interview transcription", "Fast transcripts with speaker labels for quoting accurately."],
      ["Thought organization", "Key points and themes grouped so structure appears quickly."],
      ["Content creation", "Ask for show notes, article outlines or social posts from a recording."],
      ["Quote finder", "Search for the exact line you remember someone saying."],
    ],
    steps: ["Upload the interview", "Skim the key points", "Generate show notes or an outline"],
    quote: ["Show notes used to take an evening. Now it is a prompt.", "Podcast producer"],
  },
};

export function generateStaticParams() { return Object.keys(DATA).map((slug) => ({ slug })); }

export default async function UseCase({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DATA[slug];
  if (!d) notFound();
  return (
    <PublicShell>
      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <span className={`mb-5 block h-12 w-12 rounded-full bg-gradient-to-br ${d.grad}`} />
          <p className="text-sm font-bold uppercase tracking-wider text-brand-700">MinuteMaker for {d.title}</p>
          <h1 className="display mt-3 text-5xl text-brand-600 sm:text-6xl">{d.hero}</h1>
          <p className="mt-5 max-w-lg text-lg">{d.sub}</p>
          <div className="mt-8 flex gap-3"><Btn href="/signup">Start for free</Btn><Btn href="/contact?topic=demo" variant="outline">Schedule demo</Btn></div>
        </div>
        <div className="blob-card flex items-center justify-center rounded-3xl p-8"><TranscriptMock className="w-full max-w-md" /></div>
      </section>
      <section className="bg-panel/50 py-16">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:grid-cols-2 lg:px-8">
          {d.points.map(([t, p]) => (
            <div key={t} className="rounded-2xl bg-white p-7"><h3 className="flex items-center gap-2 text-xl font-semibold"><Check className="h-5 w-5 text-brand-600" />{t}</h3><p className="mt-2 text-muted">{p}</p></div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8">
        <h2 className="display text-4xl">How it works</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {d.steps.map((s, i) => <li key={s} className="rounded-2xl border border-line p-6"><span className="display text-5xl text-brand-500">{i + 1}</span><p className="mt-2 font-semibold">{s}</p></li>)}
        </ol>
        <figure className="mt-14 rounded-3xl bg-brand-800 p-10 text-white"><blockquote className="display text-3xl">“{d.quote[0]}”</blockquote><figcaption className="mt-4 text-brand-200">{d.quote[1]}</figcaption></figure>
      </section>
    </PublicShell>
  );
}
