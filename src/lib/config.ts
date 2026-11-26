// Single source of truth for plans. Payment URLs are the Selar links supplied by the owner.
// NOTE: the mapping of Selar links to plan names is an assumption — edit here if it differs.
export type PlanId = "basic" | "pro" | "business" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number | null;
  was?: number;
  blurb?: string;
  cta: string;
  href: string; // payment or signup URL
  external?: boolean;
  minutesPerMonth: number;
  features: string[];
  best?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "For those who want to give it a try",
    price: 0,
    cta: "Get started",
    href: "/signup",
    minutesPerMonth: 300,
    features: [
      "Works with Zoom, Teams and Google Meet recordings",
      "300 transcription minutes per month",
      "30-minute limit per recording",
      "AI summary and action items",
      "3 AI chat questions per meeting",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For individuals and small teams",
    price: 47,
    cta: "Buy now",
    href: "https://selar.com/47plan?currency=USD",
    external: true,
    minutesPerMonth: 1200,
    features: [
      "1,200 transcription minutes per month",
      "4-hour limit per recording",
      "Unlimited AI chat across your meetings",
      "Custom vocabulary and speaker labels",
      "Export to text, Markdown and JSON",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For medium-sized teams",
    price: 57,
    blurb: "Best value",
    cta: "Buy now",
    href: "https://selar.com/57plan?currency=USD",
    external: true,
    minutesPerMonth: 6000,
    best: true,
    features: [
      "Unlimited meetings, 6,000 minutes per month",
      "Shared team workspace and folders",
      "Workflow automations and follow-up drafts",
      "Usage analytics and admin controls",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For large teams and companies",
    price: 97,
    cta: "Buy now",
    href: "https://selar.com/97plan?currency=USD",
    external: true,
    minutesPerMonth: 30000,
    features: [
      "30,000 transcription minutes per month",
      "Unlimited custom AI workflows",
      "SSO-ready security review",
      "Dedicated onboarding and success manager",
      "Custom data retention",
    ],
  },
];

export const planById = (id: string | null | undefined) => PLANS.find((p) => p.id === id) ?? PLANS[0];
export const MAX_FREE_RECORDING_MIN = 30;
