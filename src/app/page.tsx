import Link from "next/link";
import { Mic, Search, ListChecks, Workflow, ShieldCheck, Users, FileText, Zap } from "lucide-react";
import { PublicShell, Btn } from "@/components/PublicShell";
import { TranscriptMock, ChatMock, IntegrationOrbit, Waveform } from "@/components/ProductMock";
import { PricingCards } from "@/components/PricingCards";

const faqs = [
  ["Which meeting tools does MinuteMaker work with?", "Upload recordings from Zoom, Microsoft Teams, Google Meet or any audio file, or paste a transcript. Live capture arrives with the browser extension."],
  ["How accurate are the transcripts and summaries?", "Transcription and summaries are produced by a large multimodal AI model. Clear audio gives the best results, and every summary links back to the full transcript so you can verify it."],
  ["Is my data private?", "Recordings are stored in a private bucket scoped to your account with row-level security. Only you can read your meetings."],
  ["Can I try it before paying?", "Yes. The Basic plan is free and includes 300 transcription minutes every month."],
  ["How do upgrades work?", "Pick a plan, pay through the secure checkout, then submit your payment reference in Billing. Your plan is switched on after the payment is verified."],
];

export default function Home() {
  return (
    <PublicShell>
      {/* 1 Hero */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="rise">
          <h1 className="display text-[44px] sm:text-6xl lg:text-[68px]">Your AI notetaker is now also your Conversational Knowledge Engine</h1>
          <p className="mt-6 max-w-lg text-lg leading-snug text-ink/90">MinuteMaker transcribes every meeting, turning it into searchable knowledge that powers your workflow.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="/signup">Start for free</Btn>
            <Btn href="/contact?topic=demo" variant="outline">Schedule demo</Btn>
          </div>
        </div>
        <div className="blob-card relative flex min-h-[420px] items-center justify-center rounded-3xl p-6 lg:min-h-[560px]">
          <TranscriptMock className="floaty w-full max-w-md" />
        </div>
      </section>

      {/* 2 Trust strip */}
      <section className="border-y border-line bg-panel/60 py-8">
        <div className="mx-auto max-w-[1280px] px-5 text-center lg:px-8">
          <p className="text-sm font-semibold text-muted">Trusted by teams that live in meetings</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-xl font-bold tracking-tight text-ink/35">
            {["Northwind", "Lumen&Co", "Atlas Labs", "Finch", "Brightside", "Kestrel"].map((n) => <span key={n}>{n}</span>)}
          </div>
        </div>
      </section>

      {/* 3 Executive assistant */}
      <section className="mx-auto max-w-[1100px] px-5 py-20 text-center lg:px-8">
        <h2 className="display text-4xl text-brand-600 sm:text-6xl">Like having your own executive assistant</h2>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed">Send it to meetings, or record them from your device. MinuteMaker captures the full conversation, tracks takeaways, and handles follow-ups without ever taking a day off.</p>
        <div className="mt-8"><Btn href="/signup" variant="outline">Start for free</Btn></div>
        <div className="mt-14 grid gap-5 text-left md:grid-cols-2">
          <div className="rounded-3xl bg-panel p-8">
            <h3 className="text-2xl font-semibold">Ask MinuteMaker anything</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">MinuteMaker AI Chat searches across your meetings to instantly answer questions and help you create follow-ups, reports, and content.</p>
            <ChatMock className="mt-6" />
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-rose-300 to-brand-700 p-8 text-white">
            <h3 className="text-2xl font-semibold">Capture every word</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">Upload any recording and get a speaker-aware transcript, a tight summary and a checklist of next steps in minutes.</p>
            <div className="mt-6 rounded-2xl bg-black/30 p-5 backdrop-blur"><Waveform n={48} className="[&>span]:bg-white" /><p className="mt-3 text-xs text-white/80">Transcribing · 42:10 of audio</p></div>
          </div>
        </div>
      </section>

      {/* 4 Capabilities grid */}
      <section className="bg-panel/50 py-20">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display max-w-3xl text-4xl sm:text-5xl">Everything a great meeting leaves behind</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Mic, "Accurate transcripts", "Full conversation text with speaker labels and timestamps you can scan in seconds."],
              [FileText, "Instant summaries", "Short overviews and key points for people who could not attend."],
              [ListChecks, "Action items", "Owners, deadlines and decisions pulled out automatically."],
              [Search, "Searchable memory", "Ask a question and get an answer drawn from your meetings."],
              [Workflow, "Automations", "Follow-up drafts and task hand-offs ready after every call."],
              [Users, "Team workspace", "Share notes and keep everyone working from the same facts."],
              [ShieldCheck, "Private by design", "Row-level security and private storage on every account."],
              [Zap, "Fast setup", "Sign up, upload, done. No bots to install to get your first notes."],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Mic;
              return (
                <div key={t as string} className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><I className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-lg font-semibold">{t as string}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 Knowledge base */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="display text-5xl text-brand-600 sm:text-6xl">Build your knowledge base, one meeting at a time</h2>
          <p className="mt-6 max-w-lg text-lg leading-snug">MinuteMaker captures every conversation and turns them into instantly searchable insights that fuel alignment and workflows across your organization.</p>
          <div className="mt-8"><Btn href="/contact?topic=demo">Schedule demo</Btn></div>
        </div>
        <div className="blob-card flex min-h-[380px] items-center justify-center rounded-3xl p-8 text-center">
          <p className="display text-3xl text-ink/80 sm:text-4xl">Meetings build<br />your knowledge base<br /><span className="text-brand-600">MinuteMaker AI Chat connects<br />it to your business</span></p>
        </div>
      </section>

      {/* 6 Workflows */}
      <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="display text-5xl text-brand-600">Workflows and automation</h2>
          <p className="mt-5 text-lg font-medium">Trigger follow-ups, updates, and tasks for every meeting.</p>
          <div className="mt-8 divide-y divide-line border-y-2 border-t-ink border-b-line">
            {[
              ["CRM auto-updates", "Never miss a beat with follow-ups, updates, and tasks triggered automatically for every meeting."],
              ["Follow-up automation", "Use Work Mode to draft follow-up emails and next steps for client calls, internal reviews, and more."],
              ["Project tool syncing", "Help your team move faster by sending action items from meetings into tools they already use, like Jira, Asana, and others."],
            ].map(([t, d]) => (
              <div key={t} className="py-5"><h3 className="flex items-center gap-2 font-semibold"><Workflow className="h-4 w-4" />{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <div className="blob-card rounded-3xl p-6"><ChatMock /></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-panel p-4"><IntegrationOrbit /></div>
            <div className="flex items-end rounded-3xl bg-gradient-to-br from-brand-400 to-brand-800 p-6 text-white"><p className="text-xl font-semibold leading-snug">Every action item lands where your team already works.</p></div>
          </div>
        </div>
      </section>

      {/* 7 Use cases */}
      <section className="bg-panel/50 py-20">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display text-4xl sm:text-5xl">Something for everyone</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Sales", "/use-cases/sales", "Automatic follow-ups, notes capture, and CRM sync.", "from-orange-300 to-pink-500"],
              ["Education", "/use-cases/education", "Lecture transcripts, note organization, insight extraction, and summaries.", "from-emerald-300 to-teal-700"],
              ["Media", "/use-cases/media", "Interview transcription, thought organization, and content creation.", "from-sky-200 to-fuchsia-300"],
            ].map(([t, h, d, c]) => (
              <Link key={t} href={h} className="group rounded-3xl bg-white p-8 transition hover:shadow-xl">
                <span className={`block h-14 w-14 rounded-full bg-gradient-to-br ${c}`} />
                <h3 className="mt-6 text-2xl font-semibold group-hover:text-brand-700">{t}</h3>
                <p className="mt-2 text-sm text-muted">{d}</p>
                <p className="mt-5 text-sm font-bold text-brand-700">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Testimonials */}
      <section className="mx-auto max-w-[1280px] px-5 py-20 lg:px-8">
        <h2 className="display text-4xl sm:text-5xl">Teams stop typing and start talking</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["We cut follow-up time from an hour to five minutes. The action items are almost always right.", "Head of Sales, B2B SaaS"],
            ["I review lectures by searching a phrase instead of scrubbing through audio. It changed how I study.", "Graduate student"],
            ["Interview transcripts arrive before I have finished my coffee. Quotes are one search away.", "Podcast producer"],
          ].map(([q, a]) => (
            <figure key={a} className="rounded-3xl border border-line p-7">
              <blockquote className="text-lg leading-snug">“{q}”</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-brand-700">{a}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 rounded-3xl bg-brand-50 p-8 text-center md:grid-cols-4">
          {[["10x", "faster than manual notes"], ["98%", "of meetings summarized"], ["40+", "languages supported"], ["24/7", "always ready"]].map(([n, l]) => (
            <div key={l}><p className="display text-5xl text-brand-700">{n}</p><p className="mt-1 text-sm text-muted">{l}</p></div>
          ))}
        </div>
      </section>

      {/* 9 Pricing */}
      <section className="deep-section py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
          <h2 className="display mx-auto mb-12 max-w-3xl text-center text-4xl sm:text-6xl">Flexible plans for teams, individuals, and enterprises</h2>
          <PricingCards dark />
        </div>
      </section>

      {/* 10 FAQ */}
      <section className="mx-auto max-w-[900px] px-5 py-20 lg:px-8">
        <h2 className="display text-center text-4xl sm:text-5xl">Questions, answered</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold">{q}<span className="text-2xl text-brand-600 transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 11 Final CTA */}
      <section className="mx-auto max-w-[1280px] px-5 pb-20 lg:px-8">
        <div className="blob-card rounded-3xl px-6 py-16 text-center">
          <h2 className="display text-4xl sm:text-6xl">Make your next meeting count</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/80">Free to start. No credit card. Your first summary in minutes.</p>
          <div className="mt-8 flex justify-center gap-3"><Btn href="/signup">Start for free</Btn><Btn href="/pricing" variant="outline">See pricing</Btn></div>
        </div>
      </section>
    </PublicShell>
  );
}
