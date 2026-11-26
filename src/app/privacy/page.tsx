import { PublicShell } from "@/components/PublicShell";

export const metadata = { title: "Privacy | MinuteMaker" };

const sections: [string, string][] = [
  ["Information we collect", "We collect the account details you provide (name and email address), the recordings and transcripts you upload, and the outputs generated from them: transcripts, summaries, key points, action items and chat history. We also record usage totals such as transcription minutes consumed."],
  ["How we use it", "We use this information to operate MinuteMaker: to authenticate you, to analyze your meetings, to answer your questions about them, to enforce plan limits and to process upgrades. We do not sell your data and we do not use your recordings to advertise to you."],
  ["AI processing", "To produce transcripts, summaries and answers, the content of your recordings and transcripts is sent to a third-party AI provider through its API. It is sent only for the request you initiated."],
  ["Storage and isolation", "Recordings are stored in a private bucket and every record is protected by database-level access rules so that each account can read only its own data."],
  ["Retention and deletion", "Your meetings are kept until you delete them. Deleting a meeting removes its record and its original recording permanently."],
  ["Recording consent", "You are responsible for informing participants and obtaining any consent that the law requires before you record or upload a conversation."],
  ["Changes", "We may update this policy as the product evolves. The current version is always published on this page."],
];

export default function Privacy() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[800px] px-5 py-16 lg:px-8">
        <h1 className="display text-5xl text-brand-600">Privacy</h1>
        <div className="mt-10 space-y-8">
          {sections.map(([h, p]) => <div key={h}><h2 className="text-xl font-semibold">{h}</h2><p className="mt-2 text-muted">{p}</p></div>)}
        </div>
      </section>
    </PublicShell>
  );
}
