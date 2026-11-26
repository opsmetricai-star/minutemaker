# MinuteMaker

AI meeting notes: upload a recording (or paste a transcript) and get a transcript, summary, key points, action items and a chat that answers questions about your meetings. Next.js 16 · React · TypeScript · Tailwind v4 · Supabase · Gemini. Brand palette: green.

## Setup
1. `npm install`
2. Create a Supabase project, run `supabase/schema.sql` in the SQL editor (tables, RLS, storage bucket, signup trigger).
3. In Supabase Auth → URL configuration add your site URL and `<site>/auth/callback` as redirect URLs.
4. `cp .env.example .env.local` and fill in values (never commit `.env.local`).
5. `npm run dev`

## Environment variables (also set in Vercel)
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only: contact form, admin plan activation |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Server-only AI processing and chat |
| `ADMIN_SECRET` | 16+ char secret guarding `/api/admin/activate` |

## Payments
Plan links (Selar) live in `src/lib/config.ts`. **Assumption:** `47plan`→Pro ($47), `57plan`→Business ($57), `97plan`→Scale ($97) — edit if wrong.
A redirect never grants access. Users submit a payment reference in Dashboard → Billing (creates a `pending` row in `payment_claims`). After you verify the payment in Selar, activate it:

```
curl -X POST https://<site>/api/admin/activate -H "x-admin-secret: $ADMIN_SECRET" -H "content-type: application/json" \
  -d '{"claimId":"<payment_claims.id>","decision":"approve","days":31}'
```
Automatic activation would need Selar webhook details, which have not been provided.

## Known limitations
- Audio is limited to 20 MB (inline to Gemini). Duration is read client-side for usage tracking.
- Live meeting bots, mobile apps, Chrome extension, CRM/Jira/Slack integrations and team workspaces are shown as marketing/roadmap only and are not implemented.
- Privacy/terms text and blog posts are placeholders.
- Requires real Supabase/Gemini credentials to exercise auth and AI; these were not available when this was built, so those flows are untested end-to-end.
