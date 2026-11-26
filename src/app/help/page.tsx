import { PublicShell } from "@/components/PublicShell";

export const metadata = { title: "Help | MinuteMaker" };

const qa = [
  ["How do I analyze my first meeting?", "Sign in, open New meeting, and either upload an audio file or paste a transcript. Select Process meeting. The transcript, summary and commitments appear on the meeting page."],
  ["Which audio formats are supported?", "MP3, M4A, WAV, OGG, FLAC and WebM, up to 20 MB per file."],
  ["What does a failed meeting mean?", "If analysis cannot complete, the meeting shows the reason and the minutes are not charged to your allowance. Upload the file again to retry."],
  ["How are usage limits calculated?", "Uploaded audio counts against your monthly allowance of transcription minutes. Pasted transcripts do not. Your current usage is shown in the dashboard and in Billing."],
  ["How do I upgrade my plan?", "Complete checkout from Pricing or Billing, then enter your payment reference in Dashboard, Billing. The plan is activated once the payment has been verified."],
  ["How do I delete a meeting?", "Open the meeting and select Delete. The meeting and its original recording are removed permanently."],
  ["How do I reset my password?", "Select Log in, then Forgot password, and enter your email address. A reset link is sent to that address."],
];

export default function Help() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[900px] px-5 py-16 lg:px-8">
        <h1 className="display text-5xl text-brand-600">Help</h1>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {qa.map(([q, a]) => <div key={q} className="py-5"><h2 className="font-semibold">{q}</h2><p className="mt-1 text-muted">{a}</p></div>)}
        </div>
      </section>
    </PublicShell>
  );
}
