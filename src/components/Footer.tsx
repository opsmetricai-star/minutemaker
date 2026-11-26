import Link from "next/link";
import { Logo } from "./Logo";

const cols: { h: string; links: [string, string][] }[] = [
  { h: "Product", links: [["Pricing", "/pricing"], ["Enterprise", "/enterprise"], ["Sign up", "/signup"], ["Log in", "/login"]] },
  { h: "Use cases", links: [["Sales", "/use-cases/sales"], ["Education and training", "/use-cases/education"], ["Media and production", "/use-cases/media"]] },
  { h: "Company", links: [["About", "/about"], ["Help", "/help"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid grid-cols-1 max-w-[1280px] gap-10 px-5 py-14 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            The AI engine that turns business conversations into decisions, owners and action.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="mb-4 text-sm font-bold text-ink">{c.h}</h4>
            <ul className="space-y-2.5">
              {c.links.map(([t, h]) => (
                <li key={t}><Link href={h} className="text-sm text-muted hover:text-brand-700">{t}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1280px] px-5 py-6 text-xs text-muted lg:px-8">
          © {new Date().getFullYear()} MinuteMaker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
