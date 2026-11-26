import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function saveName(formData: FormData) {
  "use server";
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return;
  await sb.from("profiles").update({ full_name: name }).eq("id", user.id);
  revalidatePath("/dashboard", "layout");
}

export default async function Settings() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data: p } = await sb.from("profiles").select("full_name, email, created_at").eq("id", user!.id).single();
  return (
    <div className="max-w-xl">
      <h1 className="display text-4xl">Settings</h1>
      <form action={saveName} className="mt-8 space-y-4 rounded-2xl bg-white p-6">
        <label className="block text-sm font-semibold">Full name<input name="name" defaultValue={p?.full_name ?? ""} className="mt-1 w-full rounded-xl border border-line px-4 py-3 font-normal outline-none focus:border-brand-600" /></label>
        <label className="block text-sm font-semibold">Email<input disabled value={p?.email ?? user!.email ?? ""} className="mt-1 w-full rounded-xl border border-line bg-panel px-4 py-3 font-normal" /></label>
        <button className="rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Save</button>
      </form>
      <p className="mt-6 text-sm text-muted">To change your password, select Forgot password on the log in page.</p>
    </div>
  );
}
