import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdmin } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  topic: z.string().max(40).optional(),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please complete all fields with a valid email." }, { status: 400 });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL)
    return NextResponse.json({ error: "Contact form is not configured yet (missing Supabase credentials)." }, { status: 503 });
  const { error } = await createAdmin().from("contact_messages").insert(parsed.data);
  if (error) return NextResponse.json({ error: "Could not save your message. Please try again." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
