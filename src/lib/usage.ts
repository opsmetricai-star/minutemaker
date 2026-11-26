import type { SupabaseClient } from "@supabase/supabase-js";
import { planById } from "./config";

export async function getProfileAndUsage(sb: SupabaseClient, userId: string) {
  const { data: profile } = await sb.from("profiles").select("plan, plan_expires_at, full_name, email").eq("id", userId).single();
  let planId = profile?.plan ?? "basic";
  if (profile?.plan_expires_at && new Date(profile.plan_expires_at) < new Date()) planId = "basic";
  const plan = planById(planId);
  const start = new Date(); start.setUTCDate(1); start.setUTCHours(0, 0, 0, 0);
  const { data: rows } = await sb.from("meetings").select("duration_seconds").eq("user_id", userId).neq("status", "failed").gte("created_at", start.toISOString());
  const usedMinutes = Math.ceil((rows ?? []).reduce((s, r) => s + (r.duration_seconds ?? 0), 0) / 60);
  return { profile, plan, usedMinutes, remaining: Math.max(0, plan.minutesPerMonth - usedMinutes) };
}
