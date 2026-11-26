"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DeleteMeeting({ id, path }: { id: string; path: string | null }) {
  const router = useRouter();
  async function del() {
    if (!confirm("Permanently delete this meeting and its recording? This cannot be undone.")) return;
    const sb = createClient();
    if (path) await sb.storage.from("recordings").remove([path]);
    const { error } = await sb.from("meetings").delete().eq("id", id);
    if (error) return alert("Could not delete: " + error.message);
    router.replace("/dashboard/meetings"); router.refresh();
  }
  return <button onClick={del} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Delete</button>;
}
