import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

export const analysisSchema = z.object({
  transcript: z.string().min(1),
  summary: z.string().min(1),
  key_points: z.array(z.string()).default([]),
  action_items: z
    .array(z.object({ task: z.string(), owner: z.string().nullable().optional(), due: z.string().nullable().optional() }))
    .default([]),
  duration_seconds: z.number().nonnegative().optional(),
});
export type Analysis = z.infer<typeof analysisSchema>;

const MODEL = () => process.env.GEMINI_MODEL || "gemini-2.5-flash";
function client() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured on the server.");
  return new GoogleGenerativeAI(key);
}

const INSTRUCTIONS = `You are a meeting-notes engine. Return ONLY JSON with keys:
transcript (full verbatim transcript; label speakers "Speaker 1:", "Speaker 2:" when distinguishable; if the input is already a transcript, return it cleaned),
summary (3-6 sentence overview),
key_points (array of short strings),
action_items (array of {task, owner|null, due|null}). Only include owners/dates that were actually stated; never invent them.
duration_seconds (estimated audio length in seconds, or omit for text input).`;

export async function analyzeMeeting(input: { text: string } | { audioBase64: string; mimeType: string }): Promise<Analysis> {
  const model = client().getGenerativeModel({ model: MODEL(), generationConfig: { responseMimeType: "application/json", temperature: 0.2 } });
  const parts = "text" in input
    ? [{ text: `${INSTRUCTIONS}\n\nTRANSCRIPT INPUT:\n${input.text}` }]
    : [{ text: INSTRUCTIONS }, { inlineData: { data: input.audioBase64, mimeType: input.mimeType } }];
  const res = await model.generateContent(parts);
  const raw = res.response.text();
  let json: unknown;
  try { json = JSON.parse(raw); } catch { throw new Error("The AI returned an unreadable response. Please retry."); }
  const parsed = analysisSchema.safeParse(json);
  if (!parsed.success) throw new Error("The AI response was incomplete. Please retry.");
  return parsed.data;
}

export async function answerQuestion(context: string, question: string): Promise<string> {
  const model = client().getGenerativeModel({
    model: MODEL(),
    systemInstruction: "You answer questions about the user's meetings using ONLY the provided meeting material. If the answer is not in the material, say so. Be concise. Draft emails or reports when asked.",
  });
  const res = await model.generateContent(`MEETING MATERIAL:\n${context}\n\nQUESTION: ${question}`);
  return res.response.text();
}
