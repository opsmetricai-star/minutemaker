// Single source of truth for plans. Payment URLs are the checkout links supplied by the owner.
// The mapping of checkout links to plan names is an assumption: edit here if it differs.
export type PlanId = "basic" | "pro" | "business" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  href: string;
  external?: boolean;
  minutesPerMonth: number;
  features: string[];
  best?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Evaluate the AI engine with your team",
    price: 0,
    href: "/signup",
    minutesPerMonth: 300,
    features: [
      "300 transcription minutes per month",
      "Recordings up to 30 minutes",
      "AI summary, decisions and action items",
      "3 AI questions per meeting",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For small teams running weekly pipelines",
    price: 47,
    href: "https://selar.com/47plan?currency=USD",
    external: true,
    minutesPerMonth: 1200,
    features: [
      "1,200 transcription minutes per month",
      "Unlimited AI questions per meeting",
      "Cross-meeting AI search",
      "Full commitments register with owners and deadlines",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For teams with daily meeting volume",
    price: 57,
    badge: "Best value",
    href: "https://selar.com/57plan?currency=USD",
    external: true,
    minutesPerMonth: 6000,
    best: true,
    features: [
      "6,000 transcription minutes per month",
      "Unlimited AI questions per meeting",
      "Cross-meeting AI search",
      "Capacity for multi-team operations",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For organizations with high meeting volume",
    price: 97,
    href: "https://selar.com/97plan?currency=USD",
    external: true,
    minutesPerMonth: 30000,
    features: [
      "30,000 transcription minutes per month",
      "Unlimited AI questions per meeting",
      "Cross-meeting AI search",
      "Capacity for organization-wide rollout",
    ],
  },
];

export const planById = (id: string | null | undefined) => PLANS.find((p) => p.id === id) ?? PLANS[0];
export const MAX_FREE_RECORDING_MIN = 30;
