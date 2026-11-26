import { notFound } from "next/navigation";
import { PublicShell, Btn } from "@/components/PublicShell";
import { TranscriptMock } from "@/components/ProductMock";
import { Check } from "lucide-react";

interface UC { title: string; hero: string; sub: string; grad: string; points: [string, string][]; steps: string[]; outcome: string }

const DATA: Record<string, UC> = {
  sales: {
    title: "Sales",
    hero: "Turn every buyer conversation into pipeline intelligence",
    sub: "MinuteMaker analyzes discovery calls, demos and negotiations, extracts every commitment with an owner and a date, and drafts the follow-up that keeps deals moving.",
    grad: "from-orange-300 to-pink-500",
    points: [
      ["Commitments captured at the source", "Next steps, pricing discussions and buyer objections are extracted from the transcript the moment the call ends."],
      ["Follow-ups drafted by the AI", "Request a client recap or an internal deal update and receive a draft grounded in what was actually said."],
      ["Deal history on demand", "Ask what a prospect said about budget, timeline or competitors across every call on record."],
      ["Consistent records across the team", "Every rep produces the same structured summary, so managers review deals without sitting in on calls."],
    ],
    steps: ["Upload the call recording or transcript", "Review the summary and commitments", "Generate the follow-up and brief your team"],
    outcome: "Revenue leaders get a reliable record of every buyer commitment, and reps reclaim the hours spent writing recaps.",
  },
  education: {
    title: "Education and training",
    hero: "Convert instruction and workshops into structured, searchable records",
    sub: "Training providers, learning teams and institutions use MinuteMaker to turn sessions, workshops and program meetings into transcripts, summaries and tracked actions.",
    grad: "from-emerald-300 to-teal-700",
    points: [
      ["Complete session transcripts", "Every workshop, briefing and review is preserved as searchable text with speakers separated."],
      ["Structured summaries", "Executive summaries and key points are produced per session for programs, faculty and sponsors."],
      ["Action tracking", "Decisions and follow-ups from curriculum, compliance and program meetings are captured with owners."],
      ["Program-wide search", "Ask what was covered, decided or promised across sessions and receive an answer from the record."],
    ],
    steps: ["Record the session or workshop", "Upload it for AI analysis", "Query summaries and decisions across the program"],
    outcome: "Program leaders gain an auditable record of what was taught and decided, without manual minute-taking.",
  },
  media: {
    title: "Media and production",
    hero: "Convert interviews and editorial meetings into publishable assets",
    sub: "Production companies, newsrooms and content teams use MinuteMaker to transcribe interviews, structure editorial decisions and draft content from what was said.",
    grad: "from-sky-200 to-fuchsia-300",
    points: [
      ["Interview transcription", "Speaker-separated transcripts that let producers verify and quote accurately."],
      ["Editorial decisions on record", "Story assignments, deadlines and approvals from editorial meetings are extracted with owners."],
      ["Content drafts from the source", "Ask the AI for show notes, an article outline or a client brief grounded in the transcript."],
      ["Quote retrieval", "Search the record for the exact statement and the context around it."],
    ],
    steps: ["Upload the interview or editorial meeting", "Review the transcript and key points", "Generate outlines, notes and briefs"],
    outcome: "Production teams ship faster because every interview and editorial decision is searchable on day one.",
  },
};

export function generateStaticParams() { return Object.keys(DATA).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = DATA[(await params).slug];
  return { title: d ? `${d.title} | MinuteMaker` : "MinuteMaker" };
}

export default async function UseCase({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DATA[slug];
  if (!d) notFound();
  return (
    <PublicShell>
      <section className="mx-auto grid grid-cols-1 max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <span className={`mb-5 block h-12 w-12 rounded-full bg-gradient-to-br ${d.grad}`} />
          <p className="text-sm font-bold uppercase tracking-wider text-brand-700">MinuteMaker for {d.title.toLowerCase()}</p>
          <h1 className="display mt-3 text-4xl text-brand-600 sm:text-5xl">{d.hero}</h1>
          <p className="mt-5 max-w-lg text-lg">{d.sub}</p>
          <div className="mt-8 flex gap-3"><Btn href="/signup">Sign up</Btn><Btn href="/login" variant="outline">Log in</Btn></div>
        </div>
        <div className="blob-card flex items-center justify-center rounded-3xl p-8"><TranscriptMock className="w-full max-w-md" /></div>
      </section>
      <section className="bg-panel/50 py-16">
        <div className="mx-auto grid grid-cols-1 max-w-[1280px] gap-5 px-5 sm:grid-cols-2 lg:px-8">
          {d.points.map(([t, p]) => (
            <div key={t} className="rounded-2xl bg-white p-7"><h3 className="flex items-start gap-2 text-xl font-semibold"><Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" />{t}</h3><p className="mt-2 text-muted">{p}</p></div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8">
        <h2 className="display text-4xl">How it works</h2>
        <ol className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {d.steps.map((s, i) => <li key={s} className="rounded-2xl border border-line p-6"><span className="display text-5xl text-brand-500">{i + 1}</span><p className="mt-2 font-semibold">{s}</p></li>)}
        </ol>
        <div className="mt-14 rounded-3xl bg-brand-800 p-10 text-white"><p className="text-sm font-bold uppercase tracking-wider text-brand-200">The outcome</p><p className="display mt-3 text-3xl">{d.outcome}</p></div>
      </section>
    </PublicShell>
  );
}
