import Link from "next/link";
import { Mic, Search, ListChecks, FileText, ShieldCheck, Gauge } from "lucide-react";
import { PublicShell, Btn } from "@/components/PublicShell";
import { TranscriptMock, ChatMock, Waveform } from "@/components/ProductMock";
import { PricingCards } from "@/components/PricingCards";

const faqs = [
  ["What does MinuteMaker analyze?", "Audio recordings and written transcripts. The AI produces a speaker-labeled transcript, an executive summary, key points, and a register of decisions and action items with owners and deadlines where they were stated."],
  ["How accurate is the output?", "Every summary and commitment is generated from the full transcript, which stays attached to the meeting so any statement can be verified at the source. The AI records owners and dates only when they were actually said."],
  ["How is our data protected?", "Recordings sit in a private storage bucket and every record is isolated at the database level by row security. Only the account that created a meeting can read it, and any meeting can be deleted permanently with its recording."],
  ["How do usage limits work?", "Each plan includes a monthly allowance of transcription minutes, tracked live in the dashboard. Pasted transcripts do not consume minutes."],
  ["How does an upgrade take effect?", "Complete checkout, then enter your payment reference in Billing. The plan is activated once the payment has been verified."],
];

export default function Home() {
  return (
    <PublicShell>
      {/* 1 Hero */}
      <section className="mx-auto grid grid-cols-1 max-w-[1280px] items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="rise">
          <h1 className="display text-[44px] sm:text-6xl lg:text-[64px]">The AI engine that turns every meeting into decisions</h1>
          <p className="mt-6 max-w-lg text-lg leading-snug text-ink/90">
            MinuteMaker analyzes every conversation across your organization, extracts commitments with owners and deadlines, and automates the follow-through. Revenue, delivery and risk stop depending on memory.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="/signup">Sign up</Btn>
            <Btn href="/login" variant="outline">Log in</Btn>
          </div>
        </div>
        <div className="blob-card relative flex min-h-[420px] items-center justify-center rounded-3xl p-6 lg:min-h-[560px]">
          <TranscriptMock className="floaty w-full max-w-md" />
        </div>
      </section>

      {/* 2 Outcomes */}
      <section className="border-y border-line bg-panel/60 py-12">
        <div className="mx-auto grid grid-cols-1 max-w-[1280px] gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            ["Revenue", "Every buyer commitment is captured with an owner and a date, so deals stop stalling after the call."],
            ["Cost", "Manual note-taking and recap work is removed from every meeting your team runs."],
            ["Speed", "Transcript, summary and action register are produced in a single AI pass."],
            ["Risk", "Decisions and obligations live in a searchable record instead of individual memory."],
          ].map(([h, d]) => (
            <div key={h}><p className="text-sm font-bold uppercase tracking-wider text-brand-700">{h}</p><p className="mt-2 text-[15px] leading-snug">{d}</p></div>
          ))}
        </div>
      </section>

      {/* 3 AI at the core */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 text-center lg:px-8">
        <h2 className="display text-4xl text-brand-600 sm:text-6xl">An AI engine at the core, not a note-taker bolted on</h2>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed">
          MinuteMaker is built around one capability: understanding business conversations. The same AI that transcribes a call also decides what mattered, assigns who owns it, and answers questions about it across your entire meeting record.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-5 text-left md:grid-cols-2">
          <div className="rounded-3xl bg-panel p-8">
            <h3 className="text-2xl font-semibold">Interrogate your meeting record</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">MinuteMaker AI searches your analyzed meetings to answer operational questions and draft client follow-ups, status reports and internal briefs.</p>
            <ChatMock className="mt-6" />
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-rose-300 to-brand-700 p-8 text-white">
            <h3 className="text-2xl font-semibold">Analysis in a single pass</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">Upload a recording and the AI returns a speaker-labeled transcript, an executive summary and a register of decisions and commitments.</p>
            <div className="mt-6 rounded-2xl bg-black/30 p-5 backdrop-blur"><Waveform n={48} className="[&>span]:bg-white" /><p className="mt-3 text-xs text-white/80">42 minutes of audio analyzed</p></div>
          </div>
        </div>
      </section>

      {/* 4 How the engine works */}
      <section className="bg-panel/50 py-20">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display max-w-3xl text-4xl sm:text-5xl">How the engine turns conversation into execution</h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Capture", "Upload a recording or paste a transcript from any meeting platform."],
              ["02", "Analyze", "The AI transcribes, separates speakers and writes an executive summary."],
              ["03", "Decide", "It extracts decisions and commitments, assigning owners and deadlines only where stated."],
              ["04", "Automate", "It drafts follow-ups and answers questions across every meeting on record."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="display text-5xl text-brand-500">{n}</p>
                <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Capabilities */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <h2 className="display max-w-3xl text-4xl sm:text-5xl">Capabilities built for operating teams</h2>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [Mic, "Speaker-aware transcription", "Full conversation text with speakers separated, ready to verify any statement at the source."],
            [FileText, "Executive summaries", "A concise brief and key points for stakeholders who were not in the room."],
            [ListChecks, "Commitments register", "Decisions, owners and deadlines extracted automatically and kept per meeting."],
            [Search, "Cross-meeting AI search", "Ask a question once and get an answer grounded in your meeting record."],
            [Gauge, "Usage control", "Live tracking of transcription minutes against your plan allowance."],
            [ShieldCheck, "Isolated by design", "Private storage and database-level row security on every account."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Mic;
            return (
              <div key={t as string} className="rounded-2xl border border-line bg-white p-6 transition hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><I className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-semibold">{t as string}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6 Institutional memory */}
      <section className="mx-auto grid grid-cols-1 max-w-[1280px] items-center gap-10 px-5 py-10 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h2 className="display text-5xl text-brand-600 sm:text-6xl">Build institutional memory, one meeting at a time</h2>
          <p className="mt-6 max-w-lg text-lg leading-snug">Every analyzed conversation becomes a permanent, searchable asset. New hires, account owners and executives can query what was decided and why, without scheduling another call.</p>
          <div className="mt-8"><Btn href="/signup">Sign up</Btn></div>
        </div>
        <div className="blob-card flex min-h-[380px] items-center justify-center rounded-3xl p-8 text-center">
          <p className="display text-3xl text-ink/80 sm:text-4xl">Meetings produce the data<br /><span className="text-brand-600">MinuteMaker AI turns it<br />into operational knowledge</span></p>
        </div>
      </section>

      {/* 7 Automated follow-through */}
      <section className="mx-auto grid grid-cols-1 max-w-[1280px] gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="display text-5xl text-brand-600">Automated follow-through</h2>
          <p className="mt-5 text-lg font-medium">Close the gap between what was agreed and what gets done.</p>
          <div className="mt-8 divide-y divide-line border-y-2 border-t-ink border-b-line">
            {[
              ["Commitment capture", "Every action item is extracted with its owner and deadline, so accountability is visible the moment the meeting ends."],
              ["Follow-up drafting", "Ask the AI for a client recap, a status update or a leadership brief and receive a draft grounded in what was actually said."],
              ["Open-risk detection", "Ask which decisions are unresolved or which items lack an owner, and the AI answers from the transcript."],
            ].map(([t, d]) => (
              <div key={t} className="py-5"><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div>
            ))}
          </div>
        </div>
        <div className="blob-card flex items-center rounded-3xl p-6"><ChatMock className="w-full" /></div>
      </section>

      {/* 8 Use cases */}
      <section className="bg-panel/50 py-20">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display text-4xl sm:text-5xl">Built for every operating team</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              ["Sales", "/use-cases/sales", "Capture every buyer commitment and automate the follow-up that moves deals forward.", "from-orange-300 to-pink-500"],
              ["Education and training", "/use-cases/education", "Turn instruction, workshops and programs into structured, searchable records.", "from-emerald-300 to-teal-700"],
              ["Media and production", "/use-cases/media", "Convert interviews and editorial meetings into transcripts, briefs and publishable assets.", "from-sky-200 to-fuchsia-300"],
            ].map(([t, h, d, c]) => (
              <Link key={t} href={h} className="group rounded-3xl bg-white p-8 transition hover:shadow-xl">
                <span className={`block h-14 w-14 rounded-full bg-gradient-to-br ${c}`} />
                <h3 className="mt-6 text-2xl font-semibold group-hover:text-brand-700">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Pricing */}
      <section className="deep-section py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display mx-auto mb-12 max-w-3xl text-center text-4xl sm:text-6xl">Pricing that scales with your meeting volume</h2>
          <PricingCards dark />
        </div>
      </section>

      {/* 10 FAQ */}
      <section className="mx-auto max-w-[900px] px-5 py-20 lg:px-8">
        <h2 className="display text-center text-4xl sm:text-5xl">Questions from operators and buyers</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">{q}<span className="text-2xl text-brand-600 transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 11 Final CTA */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 lg:px-8">
        <div className="blob-card rounded-3xl px-6 py-16 text-center">
          <h2 className="display text-4xl sm:text-6xl">Put an AI engine behind every meeting</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/80">Start on the free plan and analyze your first meeting in minutes.</p>
          <div className="mt-8 flex justify-center gap-3"><Btn href="/signup">Sign up</Btn><Btn href="/login" variant="outline">Log in</Btn></div>
        </div>
      </section>
    </PublicShell>
  );
}
