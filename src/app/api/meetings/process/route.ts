import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { analyzeMeeting } from "@/lib/gemini";
import { getProfileAndUsage } from "@/lib/usage";
import { MAX_FREE_RECORDING_MIN } from "@/lib/config";

export const maxDuration = 300;
const MAX_BYTES = 20 * 1024 * 1024;

const body = z.object({
  title: z.string().trim().min(1).max(160),
  source: z.enum(["upload", "paste"]),
  path: z.string().optional(),
  transcript: z.string().max(200_000).optional(),
  durationSeconds: z.number().int().min(0).max(60 * 60 * 8).default(0),
});

export async function POST(req: Request) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const b = parsed.data;
  if (b.source === "upload" && (!b.path || !b.path.startsWith(`${user.id}/`))) return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
  if (b.source === "paste" && !b.transcript?.trim()) return NextResponse.json({ error: "Paste some transcript text." }, { status: 400 });

  const { plan, remaining } = await getProfileAndUsage(sb, user.id);
  const estMinutes = b.source === "paste" ? 0 : Math.max(1, Math.ceil(b.durationSeconds / 60));
  if (estMinutes > remaining)
    return NextResponse.json({ error: `Not enough minutes left this month (${remaining} remaining on ${plan.name}). Upgrade in Billing.` }, { status: 402 });
  if (plan.id === "basic" && estMinutes > MAX_FREE_RECORDING_MIN)
    return NextResponse.json({ error: `Basic plan recordings are limited to ${MAX_FREE_RECORDING_MIN} minutes.` }, { status: 402 });

  const { data: row, error: insErr } = await sb.from("meetings").insert({
    user_id: user.id, title: b.title, source: b.source, audio_path: b.path ?? null, duration_seconds: b.durationSeconds, status: "processing",
  }).select("id").single();
  if (insErr || !row) return NextResponse.json({ error: "Could not create the meeting." }, { status: 500 });

  try {
    let result;
    if (b.source === "paste") {
      result = await analyzeMeeting({ text: b.transcript! });
    } else {
      const { data: blob, error } = await sb.storage.from("recordings").download(b.path!);
      if (error || !blob) throw new Error("Could not read the uploaded file.");
      if (blob.size > MAX_BYTES) throw new Error("File is larger than 20 MB.");
      const buf = Buffer.from(await blob.arrayBuffer());
      result = await analyzeMeeting({ audioBase64: buf.toString("base64"), mimeType: blob.type || "audio/mpeg" });
    }
    await sb.from("meetings").update({
      status: "ready", transcript: result.transcript, summary: result.summary, key_points: result.key_points, action_items: result.action_items,
      duration_seconds: b.durationSeconds || result.duration_seconds || 0,
    }).eq("id", row.id);
    await sb.from("notifications").insert({ user_id: user.id, title: "Meeting ready", body: `“${b.title}” has been transcribed and summarized.` });
    return NextResponse.json({ id: row.id });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Processing failed.";
    await sb.from("meetings").update({ status: "failed", error: message }).eq("id", row.id);
    return NextResponse.json({ error: message, id: row.id }, { status: 502 });
  }
}
