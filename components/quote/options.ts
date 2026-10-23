import { services } from "@/lib/content";
import type { QuoteOptions } from "@/lib/quote";
import { locations } from "@/lib/site";

/** Services and regions the planner offers, derived from the single source of truth. */
export const quoteOptions: QuoteOptions = {
  services: services.map(({ slug, name }) => ({ slug, name })),
  regions: locations.map(({ abbr, region }) => ({ abbr, region })),
};
