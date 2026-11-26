import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { answerQuestion } from "@/lib/gemini";
import { getProfileAndUsage } from "@/lib/usage";

const body = z.object({ meetingId: z.string().uuid().nullable().optional(), question: z.string().trim().min(2).max(1000) });
const FREE_Q_PER_MEETING = 3;

export async function POST(req: Request) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Ask a question (2–1000 characters)." }, { status: 400 });
  const { meetingId = null, question } = parsed.data;
  const { plan } = await getProfileAndUsage(sb, user.id);

  if (plan.id === "basic") {
    if (!meetingId) return NextResponse.json({ error: "Asking across all meetings is a Pro feature. Upgrade in Billing." }, { status: 402 });
    const { count } = await sb.from("chat_messages").select("id", { count: "exact", head: true }).eq("meeting_id", meetingId).eq("role", "user");
    if ((count ?? 0) >= FREE_Q_PER_MEETING) return NextResponse.json({ error: `Basic includes ${FREE_Q_PER_MEETING} questions per meeting. Upgrade for unlimited chat.` }, { status: 402 });
  }

  let q = sb.from("meetings").select("title, summary, transcript, created_at").eq("status", "ready").order("created_at", { ascending: false });
  q = meetingId ? q.eq("id", meetingId) : q.limit(8);
  const { data: meetings } = await q;
  if (!meetings?.length) return NextResponse.json({ error: "No processed meetings to search yet." }, { status: 404 });
  const context = meetings.map((m) => `## ${m.title} (${m.created_at.slice(0, 10)})\nSummary: ${m.summary}\nTranscript:\n${(m.transcript ?? "").slice(0, meetingId ? 120_000 : 20_000)}`).join("\n\n");

  try {
    const answer = await answerQuestion(context, question);
    await sb.from("chat_messages").insert([
      { user_id: user.id, meeting_id: meetingId, role: "user", content: question },
      { user_id: user.id, meeting_id: meetingId, role: "assistant", content: answer },
    ]);
    return NextResponse.json({ answer });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "The AI request failed." }, { status: 502 });
  }
}
