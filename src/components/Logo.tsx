import Link from "next/link";

export function LogoMark({ className = "h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 24" className={className} aria-hidden>
      <rect x="0" y="4" width="9" height="16" rx="4.5" className="fill-brand-600" />
      <rect x="12" y="0" width="9" height="24" rx="4.5" className="fill-brand-600" />
      <rect x="24" y="6" width="9" height="12" rx="4.5" className="fill-brand-600" />
      <rect x="36" y="9" width="6" height="6" rx="3" className="fill-brand-600" />
      <rect x="45" y="9" width="6" height="6" rx="3" className="fill-brand-400" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="MinuteMaker home">
      <LogoMark />
      <span className={`text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>MinuteMaker</span>
    </Link>
  );
}
