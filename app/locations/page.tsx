import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/closing-cta";
import { ArrowRight, Phone } from "@/components/icons";
import { LocationsMap } from "@/components/locations-map";
import { PageHero } from "@/components/page-hero";
import { buttonClass, textLinkClass } from "@/components/ui";
import { business, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Isak Fire Protection offices in Chicago, Toronto, Detroit, Dayton, Indianapolis and Milwaukee, serving Illinois, Ontario, Michigan, Ohio, Indiana and Wisconsin.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        stamp="Locations"
        title="Six locations. One standard."
        lede={
          <>
            Call the office serving your building. For projects outside these regions, call headquarters to discuss
            coverage.
          </>
        }
      >
        <a href={business.phone.href} className={buttonClass("navy")}>
          <Phone className="text-lg" /> Headquarters {business.phone.display}
        </a>
      </PageHero>

      <section aria-label="Office map" className="shell pb-20">
        <div className="mx-auto max-w-4xl px-16 sm:px-24">
          <LocationsMap />
        </div>
      </section>

      <section aria-label="Offices" className="shell pb-24">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((l) => (
            <li
              key={l.slug}
              id={l.slug}
              className="flex scroll-mt-28 flex-col border-t-2 border-navy bg-white p-6 sm:p-8"
            >
              <p className="flex justify-between gap-4 mono-label">
                <span className={l.label === "Regional" ? "text-blue" : "text-red"}>{l.label}</span>
                <span className="text-steel">{l.abbr}</span>
              </p>
              <h2 className="mt-5 font-display text-[2.5rem] leading-none font-extrabold uppercase">{l.city}</h2>
              <p className="mt-3 text-steel">
                {l.address ? (
                  <>
                    {l.address.street}
                    <br />
                    {l.address.locality}
                  </>
                ) : (
                  l.area
                )}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <a href={l.phone.href} className="font-display text-[1.75rem] font-bold tabular-nums hover:text-red">
                  {l.phone.display}
                </a>
                <Link href={`/quote?region=${l.abbr}`} className={textLinkClass("text-red")}>
                  Plan a request <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[0.9375rem] text-steel">
          Office hours {business.hours.days}, {business.hours.time}. Service availability and scheduling are confirmed
          by the team for each property.
        </p>
      </section>

      <ClosingCta />
    </>
  );
}
