import { NextResponse } from "next/server";
import { z } from "zod";
import { timingSafeEqual } from "node:crypto";
import { createAdmin } from "@/lib/supabase/server";

const body = z.object({
  claimId: z.string().uuid(),
  decision: z.enum(["approve", "reject"]),
  days: z.number().int().min(1).max(366).default(31),
});

function authorized(req: Request) {
  const secret = process.env.ADMIN_SECRET;
  const given = req.headers.get("x-admin-secret") ?? "";
  if (!secret || secret.length < 16) return false;
  const a = Buffer.from(secret), b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Trusted administrative activation. After you verify a payment in your Selar dashboard:
 *   curl -X POST $SITE/api/admin/activate -H "x-admin-secret: $ADMIN_SECRET" -H "content-type: application/json" \
 *        -d '{"claimId":"<uuid from payment_claims>","decision":"approve","days":31}'
 */
export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const { claimId, decision, days } = parsed.data;
  const admin = createAdmin();
  const { data: claim } = await admin.from("payment_claims").select("*").eq("id", claimId).single();
  if (!claim || claim.status !== "pending") return NextResponse.json({ error: "Claim not found or already handled" }, { status: 404 });

  if (decision === "approve") {
    const expires = new Date(Date.now() + days * 86400_000).toISOString();
    await admin.from("profiles").update({ plan: claim.plan, plan_expires_at: expires }).eq("id", claim.user_id);
    await admin.from("notifications").insert({ user_id: claim.user_id, title: "Plan activated", body: `Your ${claim.plan} plan is active for ${days} days.` });
  } else {
    await admin.from("notifications").insert({ user_id: claim.user_id, title: "Payment not verified", body: "We could not verify that payment reference. Contact support." });
  }
  await admin.from("payment_claims").update({ status: decision === "approve" ? "approved" : "rejected" }).eq("id", claimId);
  return NextResponse.json({ ok: true });
}
