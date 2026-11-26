import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const body = z.object({ plan: z.enum(["pro", "business", "scale"]), reference: z.string().trim().min(3).max(200) });

// Records a payment claim. It does NOT grant access: an administrator verifies the payment and activates the plan.
export async function POST(req: Request) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Choose a plan and enter your payment reference." }, { status: 400 });
  const { error } = await sb.from("payment_claims").insert({ user_id: user.id, ...parsed.data });
  if (error) return NextResponse.json({ error: "Could not save your claim." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
