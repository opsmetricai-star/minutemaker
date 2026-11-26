import { GoogleGenerativeAI, type Part } from "@google/generative-ai";
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

// Preferred model first, then fallbacks used when a model is overloaded (503/429) or retired (404).
const MODELS = () =>
  [...new Set([process.env.GEMINI_MODEL, "gemini-3.5-flash", "gemini-3-flash-preview", "gemini-3.5-flash-lite"].filter(Boolean))] as string[];

function client() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured on the server.");
  return new GoogleGenerativeAI(key);
}

async function generate(parts: (string | Part)[], opts: { json?: boolean; system?: string }): Promise<string> {
  const ai = client();
  let lastErr: unknown;
  for (const name of MODELS()) {
    try {
      const model = ai.getGenerativeModel(
        {
          model: name,
          systemInstruction: opts.system,
          generationConfig: opts.json ? { responseMimeType: "application/json", temperature: 0.2 } : undefined,
        },
        { timeout: 90_000 },
      );
      const res = await model.generateContent(parts);
      return res.response.text();
    } catch (e) {
      lastErr = e; // try next model
    }
  }
  throw new Error(`AI service unavailable right now. Please retry shortly. (${lastErr instanceof Error ? lastErr.message.slice(0, 160) : "unknown error"})`);
}

const INSTRUCTIONS = `You are a meeting-notes engine. Return ONLY JSON with keys:
transcript (full verbatim transcript; label speakers "Speaker 1:", "Speaker 2:" when distinguishable; if the input is already a transcript, return it cleaned),
summary (3-6 sentence overview),
key_points (array of short strings),
action_items (array of {task, owner|null, due|null}). Only include owners/dates that were actually stated; never invent them.
duration_seconds (estimated audio length in seconds, or omit for text input).`;

export async function analyzeMeeting(input: { text: string } | { audioBase64: string; mimeType: string }): Promise<Analysis> {
  const parts: (string | Part)[] =
    "text" in input
      ? [`${INSTRUCTIONS}\n\nTRANSCRIPT INPUT:\n${input.text}`]
      : [INSTRUCTIONS, { inlineData: { data: input.audioBase64, mimeType: input.mimeType } }];
  const raw = await generate(parts, { json: true });
  let json: unknown;
  try { json = JSON.parse(raw); } catch { throw new Error("The AI returned an unreadable response. Please retry."); }
  const parsed = analysisSchema.safeParse(json);
  if (!parsed.success) throw new Error("The AI response was incomplete. Please retry.");
  return parsed.data;
}

export async function answerQuestion(context: string, question: string): Promise<string> {
  return generate([`MEETING MATERIAL:\n${context}\n\nQUESTION: ${question}`], {
    system: "You answer questions about the user's meetings using ONLY the provided meeting material. If the answer is not in the material, say so. Be concise. Draft emails or reports when asked.",
  });
}
