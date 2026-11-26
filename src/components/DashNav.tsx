"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Mic, Plus, MessageSquare, Settings, CreditCard, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/dashboard", label: "Home", I: Home },
  { href: "/dashboard/meetings", label: "Meetings", I: Mic },
  { href: "/dashboard/new", label: "New meeting", I: Plus },
  { href: "/dashboard/ask", label: "Ask AI", I: MessageSquare },
  { href: "/dashboard/billing", label: "Billing", I: CreditCard },
  { href: "/dashboard/settings", label: "Settings", I: Settings },
];

export function DashNav() {
  const path = usePathname();
  const router = useRouter();
  async function logout() {
    await createClient().auth.signOut();
    router.replace("/login"); router.refresh();
  }
  return (
    <nav className="flex flex-wrap gap-1 p-3 lg:flex-col">
      {links.map(({ href, label, I }) => {
        const active = href === "/dashboard" ? path === href : path.startsWith(href);
        return (
          <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${active ? "bg-brand-100 text-brand-800" : "text-ink/70 hover:bg-brand-50"}`}>
            <I className="h-4 w-4" />{label}
          </Link>
        );
      })}
      <button onClick={logout} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink/70 hover:bg-red-50 hover:text-red-700 lg:mt-4">
        <LogOut className="h-4 w-4" />Log out
      </button>
    </nav>
  );
}
