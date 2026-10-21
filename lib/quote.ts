// Pure quote-planner logic. No imports, so `node --test` runs it directly and
// the page component only has to wire state to these functions.

export const SALES_EMAIL = "sales@isakfire.com";
export const HELP_DECIDE = "help-decide";

export type QuoteDraft = {
  services: string[];
  stage: string;
  propertyType: string;
  region: string;
  address: string;
  size: string;
  floors: string;
  message: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  preferred: string;
};

export type QuoteField = keyof QuoteDraft;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export type QuoteOptions = {
  services: readonly { slug: string; name: string }[];
  regions: readonly { abbr: string; region: string }[];
};

export const OTHER_REGION = "Other";

export const stageOptions = [
  "Existing system: inspection or service",
  "New installation",
  "Retrofit or upgrade",
  "Repair",
  "Not sure yet",
] as const;

export const propertyTypes = ["Commercial", "Industrial", "Residential", "Multiple properties"] as const;
export const contactPreferences = ["Email", "Phone call", "Either"] as const;

export const steps = [
  { title: "Your project", fields: ["services"] },
  { title: "Your property", fields: ["propertyType", "region", "floors"] },
  { title: "Your details", fields: ["firstName", "lastName", "email", "phone"] },
  { title: "Review & email", fields: [] },
] as const satisfies readonly { title: string; fields: readonly QuoteField[] }[];

export function emptyDraft(): QuoteDraft {
  return {
    services: [],
    stage: stageOptions[0],
    propertyType: "",
    region: "",
    address: "",
    size: "",
    floors: "",
    message: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    preferred: contactPreferences[0],
  };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS = /^[0-9+().\-\s]+$/;

/** Errors for one step, keyed by field, in on-screen order. */
export function validateStep(step: number, draft: QuoteDraft): QuoteErrors {
  const errors: QuoteErrors = {};
  const blank = (value: string) => value.trim() === "";

  if (step === 0 && draft.services.length === 0) {
    errors.services = "Select at least one service, or choose “Help me decide”.";
  }

  if (step === 1) {
    if (blank(draft.propertyType)) errors.propertyType = "Select a property type.";
    if (blank(draft.region)) errors.region = "Select the state or province.";
    const floors = draft.floors.trim();
    if (floors && !(/^\d+$/.test(floors) && Number(floors) >= 1 && Number(floors) <= 300)) {
      errors.floors = "Enter a whole number of floors from 1 to 300, or leave it blank.";
    }
  }

  if (step === 2) {
    if (blank(draft.firstName)) errors.firstName = "Enter your first name.";
    if (blank(draft.lastName)) errors.lastName = "Enter your last name.";
    if (!EMAIL.test(draft.email.trim())) errors.email = "Enter a valid email address, like name@company.com.";
    const phone = draft.phone.trim();
    const digits = phone.replace(/\D/g, "").length;
    if (!PHONE_CHARS.test(phone) || digits < 10 || digits > 15) {
      errors.phone = "Enter a phone number with area code.";
    }
  }

  return errors;
}

/** Presets from `?service=` and `?region=`, accepted only when they match a known option. */
export function presetsFromSearch(params: URLSearchParams, options: QuoteOptions): Partial<QuoteDraft> {
  const presets: Partial<QuoteDraft> = {};
  const service = params.get("service");
  const region = params.get("region");
  if (service && options.services.some((s) => s.slug === service)) presets.services = [service];
  if (region && options.regions.some((r) => r.abbr === region)) presets.region = region;
  return presets;
}

function serviceNames(draft: QuoteDraft, options: QuoteOptions) {
  return draft.services
    .map((slug) =>
      slug === HELP_DECIDE ? "Help me decide" : (options.services.find((s) => s.slug === slug)?.name ?? slug),
    )
    .join(", ");
}

function regionName(draft: QuoteDraft, options: QuoteOptions) {
  if (draft.region === OTHER_REGION) return "Other / discuss coverage";
  return options.regions.find((r) => r.abbr === draft.region)?.region ?? draft.region;
}

export type ReviewGroup = { title: string; entries: [label: string, value: string][] };

/** The summary shown on the review step, with empty fields left out. */
export function reviewGroups(draft: QuoteDraft, options: QuoteOptions): ReviewGroup[] {
  const name = [draft.firstName, draft.lastName].map((part) => part.trim()).join(" ");
  const groups: ReviewGroup[] = [
    {
      title: "Your project",
      entries: [
        ["Services", serviceNames(draft, options)],
        ["Project stage", draft.stage],
      ],
    },
    {
      title: "Your property",
      entries: [
        ["Property type", draft.propertyType],
        ["Location", regionName(draft, options)],
        ["Address", draft.address],
        ["Square footage", draft.size],
        ["Floors", draft.floors],
        ["Details", draft.message],
      ],
    },
    {
      title: "Your details",
      entries: [
        ["Name", name],
        ["Company", draft.company],
        ["Email", draft.email],
        ["Phone", draft.phone],
        ["Preferred contact", draft.preferred],
      ],
    },
  ];
  return groups.map((group) => ({
    ...group,
    entries: group.entries
      .map(([label, value]) => [label, value.trim()] as [string, string])
      .filter(([, value]) => value !== ""),
  }));
}

/** Plain-text brief. Asks to discuss the project; never implies anything is booked. */
export function quoteMessage(draft: QuoteDraft, options: QuoteOptions): string {
  const lines = ["Hello Isak Fire Protection,", "", "I would like to discuss the following project.", ""];
  for (const group of reviewGroups(draft, options)) {
    lines.push(group.title.toUpperCase());
    for (const [label, value] of group.entries) lines.push(`${label}: ${value}`);
    lines.push("");
  }
  lines.push("I can attach photos or drawings to this email if they help.", "", "Thank you.");
  return lines.join("\r\n");
}

export function quoteSubject(draft: QuoteDraft) {
  const who = draft.company.trim() || [draft.firstName, draft.lastName].map((part) => part.trim()).join(" ");
  return `Fire protection inquiry: ${who}`;
}

export function mailtoHref(draft: QuoteDraft, options: QuoteOptions): string {
  const subject = encodeURIComponent(quoteSubject(draft));
  const body = encodeURIComponent(quoteMessage(draft, options));
  return `mailto:${SALES_EMAIL}?subject=${subject}&body=${body}`;
}
