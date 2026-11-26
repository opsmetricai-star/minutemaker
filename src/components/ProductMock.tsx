import { ArrowUp } from "lucide-react";

// Pure CSS/SVG product visuals (original artwork) used in hero and feature sections.
export function Waveform({ n = 28, className = "" }: { n?: number; className?: string }) {
  return (
    <div className={`flex h-10 items-center gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="w-[3px] rounded-full bg-brand-500" style={{ height: `${20 + ((i * 37) % 80)}%`, opacity: 0.45 + ((i * 13) % 55) / 100 }} />
      ))}
    </div>
  );
}

const Box = () => <span className="mr-2 inline-block h-3 w-3 rounded-[3px] border border-brand-600 align-[-1px]" />;

export function TranscriptMock({ className = "" }: { className?: string }) {
  const rows = [
    ["Dana", "bg-amber-200", "Lock the launch date for the 14th and confirm legal sign-off by Thursday."],
    ["Marcus", "bg-sky-200", "I will send the revised pricing proposal to the client before end of day."],
    ["Priya", "bg-rose-200", "Support needs the onboarding checklist in the shared folder this week."],
  ];
  return (
    <div className={`rounded-2xl border border-line bg-white p-5 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">Q3 launch planning</p>
          <p className="text-xs text-muted">42 min, 3 speakers</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
          <span className="h-2 w-2 rounded-full bg-brand-600" />Analyzed
        </span>
      </div>
      <Waveform className="mt-4" n={40} />
      <div className="mt-4 space-y-3">
        {rows.map(([n, c, t]) => (
          <div key={n} className="flex gap-3">
            <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c}`}>{n[0]}</span>
            <p className="text-[13px] leading-snug"><b>{n}</b> <span className="text-muted">{t}</span></p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-brand-50 p-3 text-[13px]">
        <p className="font-bold text-brand-800">Commitments extracted</p>
        <p className="mt-1 text-ink/80"><Box />Marcus: send pricing proposal, due today</p>
        <p className="text-ink/80"><Box />Priya: share onboarding checklist, due this week</p>
      </div>
    </div>
  );
}

export function ChatMock({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-xl ${className}`}>
      <div className="space-y-3 text-[13px]">
        <div><p className="text-[11px] text-muted"><b className="text-ink">Account director</b></p><p>Draft the client follow-up with the agreed next steps.</p></div>
        <div><p className="text-[11px] text-muted"><b className="text-ink">MinuteMaker AI</b></p><p>Drafting from the 42-minute call. Three commitments, two owners, one open risk on legal sign-off.</p></div>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-full border border-line px-4 py-2 text-xs text-muted">
        Ask across every meeting
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-700"><ArrowUp className="h-3.5 w-3.5" /></span>
      </div>
    </div>
  );
}
