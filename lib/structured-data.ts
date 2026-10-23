// schema.org data for search engines, built only from lib/site.ts and
// lib/content.ts. Relative imports keep the `.ts` extension so `node --test`
// can run this file directly.
import { services } from "./content.ts";
import { business, locations } from "./site.ts";

export function businessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.legalName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/og.jpg`,
    telephone: business.phone.e164,
    email: business.email.office,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:00",
    },
    areaServed: locations.map((l) => ({
      "@type": l.country === "CA" ? "AdministrativeArea" : "State",
      name: l.region,
    })),
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
  };
}

/** JSON for an inline `<script type="application/ld+json">`. `<` is escaped so the data can't close the tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
