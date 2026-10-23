// Business facts confirmed from isakfire.com (reviewed 2026-10-22).
// See docs/content-sources.md before adding any new claim.

export type Phone = { href: string; display: string; e164: string };

function phone(e164: string, display: string): Phone {
  return { href: `tel:${e164}`, display, e164 };
}

export const business = {
  name: "Isak Fire Protection",
  legalName: "Isak Fire Protection, Inc.",
  tagline: "Protecting lives & property",
  phone: phone("+13124457787", "(312) 445-7787"),
  tollFree: phone("+18333068200", "(833) 306-8200"),
  email: { office: "office@isakfire.com", sales: "sales@isakfire.com", careers: "careers@isakfire.com" },
  hours: { days: "Monday–Friday", time: "8:00 AM–4:00 PM", short: "Mon–Fri, 8 AM–4 PM" },
  address: {
    street: "875 N Michigan Ave, Suite 3100",
    city: "Chicago",
    region: "IL",
    postalCode: "60610",
    country: "US",
  },
  payUrl: "https://buy.stripe.com/eVa4iy7Qqbsk5CUeUV",
  currentSite: "https://isakfire.com/",
  newsUrl: "https://isakfire.com/news.html",
  careersUrl: "https://isakfire.com/careers.html",
  portalUrl: "https://isakfire.com/portal.html",
  partnersUrl: "https://isakfire.com/partners.html",
} as const;

/** Footer credits shared across Isak Global Ventures sites. */
export const credits = {
  studio: { name: "Nuvato AI", url: "https://nuvato.ai/" },
  parent: { name: "Isak Global Ventures", url: "https://isakglobalventures.com/" },
} as const;

export type Location = {
  slug: string;
  city: string;
  region: string;
  abbr: string;
  country: "US" | "CA";
  label: string;
  area: string;
  address?: { street: string; locality: string };
  phone: Phone;
  /** Latitude and longitude of the city centre, used only to plot the map. */
  coords: readonly [number, number];
};

export const locations: readonly Location[] = [
  {
    slug: "chicago",
    city: "Chicago",
    region: "Illinois",
    abbr: "IL",
    country: "US",
    label: "Headquarters",
    area: "Chicago & Illinois",
    address: { street: "875 N Michigan Ave, Suite 3100", locality: "Chicago, IL 60610" },
    phone: phone("+13124457787", "(312) 445-7787"),
    coords: [41.8781, -87.6298],
  },
  {
    slug: "toronto",
    city: "Toronto",
    region: "Ontario",
    abbr: "ON",
    country: "CA",
    label: "Canadian office",
    area: "Toronto & Ontario",
    address: { street: "36 Toronto St, Suite 850", locality: "Toronto, ON M5C, Canada" },
    phone: phone("+14372957500", "(437) 295-7500"),
    coords: [43.6532, -79.3832],
  },
  {
    slug: "detroit",
    city: "Detroit",
    region: "Michigan",
    abbr: "MI",
    country: "US",
    label: "Regional",
    area: "Metro Detroit & Southeast Michigan",
    phone: phone("+13137268300", "(313) 726-8300"),
    coords: [42.3314, -83.0458],
  },
  {
    slug: "dayton",
    city: "Dayton",
    region: "Ohio",
    abbr: "OH",
    country: "US",
    label: "Regional",
    area: "Dayton & Southwest Ohio",
    phone: phone("+13802357200", "(380) 235-7200"),
    coords: [39.7589, -84.1916],
  },
  {
    slug: "indianapolis",
    city: "Indianapolis",
    region: "Indiana",
    abbr: "IN",
    country: "US",
    label: "Regional",
    area: "Indianapolis & Central Indiana",
    phone: phone("+14632133800", "(463) 213-3800"),
    coords: [39.7684, -86.1581],
  },
  {
    slug: "milwaukee",
    city: "Milwaukee",
    region: "Wisconsin",
    abbr: "WI",
    country: "US",
    label: "Regional",
    area: "Milwaukee & Southeast Wisconsin",
    phone: phone("+12622458600", "(262) 245-8600"),
    coords: [43.0389, -87.9065],
  },
];

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "Company" },
  { href: "/locations", label: "Locations" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const secondaryNavigation = [
  { href: "/insights", label: "News & insights" },
  { href: "/careers", label: "Careers" },
  { href: "/client-portal", label: "Client access" },
  { href: "/partners", label: "Partner access" },
] as const;
