import Link from "next/link";
import { Logo } from "./Logo";

const cols: { h: string; links: [string, string][] }[] = [
  { h: "Product", links: [["Pricing", "/pricing"], ["Enterprise", "/enterprise"], ["Download", "/download"], ["Start for free", "/signup"], ["Log in", "/login"]] },
  { h: "Use cases", links: [["Sales", "/use-cases/sales"], ["Education", "/use-cases/education"], ["Media", "/use-cases/media"]] },
  { h: "Resources", links: [["Blog & guides", "/resources"], ["Help center", "/help"], ["Schedule demo", "/contact?topic=demo"]] },
  { h: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Security", "/enterprise#security"], ["Privacy policy", "/about#privacy"], ["Terms of service", "/about#terms"]] },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 md:grid-cols-6 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Your meetings, captured and made searchable. MinuteMaker writes the notes so you can run the conversation.
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
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} MinuteMaker. All rights reserved.</span>
          <span>Built with care for people who live in meetings.</span>
        </div>
      </div>
    </footer>
  );
}
