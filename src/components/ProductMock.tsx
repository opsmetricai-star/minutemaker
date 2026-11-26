// Pure CSS/SVG product visuals (original artwork) used in hero and feature sections.
export function Waveform({ n = 28, className = "" }: { n?: number; className?: string }) {
  return (
    <div className={`flex h-10 items-center gap-[3px] ${className}`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="w-[3px] rounded-full bg-brand-500" style={{ height: `${20 + ((i * 37) % 80)}%`, opacity: 0.45 + ((i * 13) % 55) / 100 }} />
      ))}
    </div>
  );
}

export function TranscriptMock({ className = "" }: { className?: string }) {
  const rows = [
    ["Dana", "bg-amber-200", "Let's lock the launch date for the 14th and confirm legal sign-off by Thursday."],
    ["Marcus", "bg-sky-200", "I'll send the revised pricing deck to the client before end of day."],
    ["Priya", "bg-rose-200", "Support needs the onboarding checklist — can we get it in the shared folder?"],
  ];
  return (
    <div className={`rounded-2xl border border-line bg-white p-5 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">Q3 Launch Planning</p>
          <p className="text-xs text-muted">Today · 42 min · 3 speakers</p>
        </div>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">● Recording</span>
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
        <p className="font-bold text-brand-800">Action items</p>
        <p className="mt-1 text-ink/80">☐ Marcus — send pricing deck (today)</p>
        <p className="text-ink/80">☐ Priya — share onboarding checklist</p>
      </div>
    </div>
  );
}

export function ChatMock({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-xl ${className}`}>
      <div className="space-y-3 text-[13px]">
        <div><p className="text-[11px] text-muted"><b className="text-ink">Amanda</b> 9:14am</p><p>Hey MinuteMaker, can you write up a follow-up email?</p></div>
        <div><p className="text-[11px] text-muted"><b className="text-ink">MinuteMaker</b> 9:15am</p><p>Sure thing, Amanda.</p><p className="mt-1 text-xs font-semibold text-brand-700">✦ Writing email…</p></div>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-full border border-line px-4 py-2 text-xs text-muted">
        Ask anything about your conversations… <span className="h-6 w-6 rounded-full bg-brand-100 text-center leading-6 text-brand-700">↑</span>
      </div>
    </div>
  );
}

export function IntegrationOrbit() {
  const dots = ["Slack", "HubSpot", "Jira", "Asana", "Notion", "Zoom"];
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center">
      <div className="absolute h-40 w-40 rounded-full border border-dashed border-brand-300" />
      <div className="absolute h-64 w-64 rounded-full border border-dashed border-brand-200" />
      <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"><span className="text-xl font-black text-brand-600">M</span></div>
      {dots.map((d, i) => {
        const a = (i / dots.length) * Math.PI * 2;
        return (
          <span key={d} className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white text-[10px] font-bold shadow-md" style={{ transform: `translate(${Math.cos(a) * 105}px, ${Math.sin(a) * 105}px)` }}>{d}</span>
        );
      })}
    </div>
  );
}
