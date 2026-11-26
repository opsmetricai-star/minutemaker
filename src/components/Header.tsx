"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const useCases = [
  { href: "/use-cases/sales", t: "Sales", d: "Capture every buyer commitment and automate the follow-up.", c: "from-orange-300 to-pink-500" },
  { href: "/use-cases/education", t: "Education and training", d: "Turn instruction and workshops into structured, searchable records.", c: "from-emerald-300 to-teal-700" },
  { href: "/use-cases/media", t: "Media and production", d: "Convert interviews and editorial meetings into usable assets.", c: "from-sky-200 to-fuchsia-300" },
];

function UseCases() {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold text-ink group-hover:bg-brand-50 group-hover:text-brand-700 group-focus-within:bg-brand-50">
        Use Cases
        <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-[400px] rounded-2xl border border-line bg-white p-5 shadow-xl">
          <p className="mb-4 text-[17px] text-ink">Built for every operating team</p>
          <ul className="space-y-4">
            {useCases.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="flex items-start gap-3">
                  <span className={`mt-0.5 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br ${i.c}`} />
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

const plain = "rounded-lg px-3 py-2 text-[15px] font-semibold text-ink/70 hover:text-brand-700";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <div className="bg-[#14201b] px-4 py-2 text-center text-[13px] font-semibold text-white">
        The AI-native meeting intelligence platform for revenue, operations and delivery teams.
      </div>
      <header className="sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-7">
            <Logo />
            <nav className="hidden items-center lg:flex">
              <UseCases />
              <Link href="/enterprise" className={plain}>Enterprise</Link>
              <Link href="/pricing" className={plain}>Pricing</Link>
              <Link href="/help" className={plain}>Help</Link>
            </nav>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/login" className="text-[15px] font-semibold text-ink hover:text-brand-700">Log in</Link>
            <span className="h-6 w-px bg-line" />
            <Link href="/signup" className="rounded-2xl bg-brand-600 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-brand-700">Sign up</Link>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="max-h-[80vh] overflow-auto border-t border-line bg-white px-5 pb-6 lg:hidden">
            <div className="border-b border-line py-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Use cases</p>
              {useCases.map((i) => <Link key={i.href} href={i.href} onClick={close} className="block py-1.5 font-semibold">{i.t}</Link>)}
            </div>
            <Link href="/enterprise" onClick={close} className="block py-3 font-semibold">Enterprise</Link>
            <Link href="/pricing" onClick={close} className="block py-3 font-semibold">Pricing</Link>
            <Link href="/help" onClick={close} className="block py-3 font-semibold">Help</Link>
            <Link href="/login" onClick={close} className="block py-3 font-semibold">Log in</Link>
            <Link href="/signup" onClick={close} className="mt-2 block rounded-2xl bg-brand-600 py-3 text-center font-bold text-white">Sign up</Link>
          </div>
        )}
      </header>
    </>
  );
}
