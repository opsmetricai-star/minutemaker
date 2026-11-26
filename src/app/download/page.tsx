import { PublicShell, Btn } from "@/components/PublicShell";

export const metadata = { title: "Download — MinuteMaker" };

const items = [
  ["web", "Web app", "Available now. Upload recordings, read transcripts and chat with your meetings from any browser.", "Open web app", "/signup", true],
  ["ios", "iOS app", "Coming soon. Record in person and sync to your account.", "", "", false],
  ["android", "Android app", "Coming soon. Capture and review meetings anywhere.", "", "", false],
  ["chrome", "Chrome extension", "Coming soon. Capture notes inside browser-based meetings.", "", "", false],
] as const;

export default function Download() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-[1100px] px-5 py-20 lg:px-8">
        <h1 className="display text-5xl text-brand-600 sm:text-6xl">MinuteMaker, wherever you work</h1>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map(([id, t, d, c, h, live]) => (
            <div id={id} key={id} className="rounded-3xl border border-line p-8">
              <h2 className="text-2xl font-semibold">{t}</h2>
              <p className="mt-2 text-muted">{d}</p>
              <div className="mt-5">{live ? <Btn href={h}>{c}</Btn> : <span className="rounded-full bg-panel px-4 py-2 text-sm font-semibold text-muted">Coming soon</span>}</div>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
