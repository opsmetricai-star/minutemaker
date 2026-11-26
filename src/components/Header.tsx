"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const useCases = [
  { href: "/use-cases/sales", t: "Sales", d: "Automatic follow-ups, notes capture, and CRM sync.", c: "from-orange-300 to-pink-500" },
  { href: "/use-cases/education", t: "Education", d: "Lecture transcripts, note organization, insight extraction, and summaries.", c: "from-emerald-300 to-teal-700" },
  { href: "/use-cases/media", t: "Media", d: "Interview transcription, thought organization, and content creation.", c: "from-sky-200 to-fuchsia-300" },
];
const resources = [
  { href: "/resources", t: "Blog & guides", d: "Playbooks for better meetings." },
  { href: "/help", t: "Help center", d: "Answers, setup and troubleshooting." },
  { href: "/about", t: "About MinuteMaker", d: "Who we are and why we build." },
  { href: "/contact", t: "Contact", d: "Talk to a human." },
];
const downloads = [
  { href: "/download#web", t: "Web app", d: "Works in any modern browser." },
  { href: "/download#ios", t: "iOS", d: "Capture meetings on the go." },
  { href: "/download#android", t: "Android", d: "Record and review anywhere." },
  { href: "/download#chrome", t: "Chrome extension", d: "Notes inside your browser meetings." },
];

function Drop({ label, items, wide }: { label: string; items: { href: string; t: string; d: string; c?: string }[]; wide?: boolean }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold text-ink group-hover:bg-brand-50 group-hover:text-brand-700 group-focus-within:bg-brand-50">
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className={`rounded-2xl border border-line bg-white p-5 shadow-xl ${wide ? "w-[400px]" : "w-[300px]"}`}>
          {wide && <p className="mb-4 text-[17px] text-ink">Something for everyone</p>}
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="flex items-start gap-3">
                  {i.c && <span className={`mt-0.5 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br ${i.c}`} />}
                  <span>
                    <span className="block text-[15px] font-semibold text-brand-700 hover:underline">{i.t}</span>
                    <span className="block text-[13px] leading-snug text-muted">{i.d}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-[#14201b] px-4 py-2 text-center text-[13px] font-semibold text-white">
        Work Mode and Live Assist are here. Get more from every meeting.{" "}
        <Link href="/pricing" className="underline underline-offset-4">Learn more</Link>
      </div>
      <header className="sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-7">
            <Logo />
            <nav className="hidden items-center lg:flex">
              <Drop label="Use Cases" items={useCases} wide />
              <Drop label="Resources" items={resources} />
              <Drop label="Download" items={downloads} />
              <Link href="/enterprise" className="rounded-lg px-3 py-2 text-[15px] font-semibold text-ink/70 hover:text-brand-700">Enterprise</Link>
              <Link href="/pricing" className="rounded-lg px-3 py-2 text-[15px] font-semibold text-ink/70 hover:text-brand-700">Pricing</Link>
            </nav>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/contact?topic=demo" className="text-[15px] font-semibold text-ink hover:text-brand-700">Schedule demo</Link>
            <Link href="/login" className="text-[15px] font-semibold text-ink hover:text-brand-700">Log in</Link>
            <span className="h-6 w-px bg-line" />
            <Link href="/signup" className="rounded-2xl bg-brand-600 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-brand-700">Start for free</Link>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="max-h-[80vh] overflow-auto border-t border-line bg-white px-5 pb-6 lg:hidden">
            {[["Use cases", useCases], ["Resources", resources], ["Download", downloads]].map(([label, items]) => (
              <div key={label as string} className="border-b border-line py-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">{label as string}</p>
                {(items as typeof useCases).map((i) => (
                  <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="block py-1.5 font-semibold">{i.t}</Link>
                ))}
              </div>
            ))}
            <Link href="/enterprise" onClick={() => setOpen(false)} className="block py-3 font-semibold">Enterprise</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="block py-3 font-semibold">Pricing</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="block py-3 font-semibold">Log in</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl bg-brand-600 py-3 text-center font-bold text-white">Start for free</Link>
          </div>
        )}
      </header>
    </>
  );
}
