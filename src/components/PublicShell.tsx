import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

export function Btn({ href, children, variant = "solid", className = "" }: { href: string; children: React.ReactNode; variant?: "solid" | "outline" | "white"; className?: string }) {
  const v = {
    solid: "bg-brand-600 text-white hover:bg-brand-700 border border-brand-600",
    outline: "border border-brand-600 text-brand-700 hover:bg-brand-50 bg-white",
    white: "bg-white text-brand-800 hover:bg-brand-50 border border-white",
  }[variant];
  return (
    <Link href={href} className={`inline-flex items-center justify-center rounded-2xl px-7 py-3.5 text-[15px] font-bold transition ${v} ${className}`}>
      {children}
    </Link>
  );
}
