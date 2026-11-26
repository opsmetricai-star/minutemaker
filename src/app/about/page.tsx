import { PublicShell } from "@/components/PublicShell";

export const metadata = { title: "About — MinuteMaker" };

export default function About() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[900px] px-5 py-20 lg:px-8">
        <h1 className="display text-5xl text-brand-600 sm:text-6xl">We make meetings worth remembering</h1>
        <p className="mt-6 text-lg">MinuteMaker exists because the best ideas in a company are spoken once and lost. We capture them, organise them and put them to work.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[["Accuracy", "Every summary points back to the transcript."], ["Privacy", "Your recordings are yours alone."], ["Simplicity", "Notes in minutes, not setup in weeks."]].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-brand-50 p-6"><h3 className="text-xl font-semibold text-brand-800">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div>
          ))}
        </div>
        <h2 id="privacy" className="display mt-16 text-3xl">Privacy policy</h2>
        <p className="mt-3 text-muted">We store the recordings, transcripts and account details you provide in order to run the service. Data is isolated per account, never sold, and can be deleted on request. Audio is sent to our AI provider solely to produce your transcript and summary. This summary is a placeholder and must be replaced with your reviewed legal policy before launch.</p>
        <h2 id="terms" className="display mt-12 text-3xl">Terms of service</h2>
        <p className="mt-3 text-muted">You are responsible for obtaining consent from everyone you record. Paid plans renew until cancelled. This summary is a placeholder and must be replaced with your reviewed legal terms before launch.</p>
      </section>
    </PublicShell>
  );
}
