import type { Metadata } from "next";
import Link from "next/link";
import building from "@/assets/images/commercial-building.webp";
import { ClosingCta } from "@/components/closing-cta";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { IllustrativeImage, textLinkClass } from "@/components/ui";
import { lifecycle, sectors } from "@/lib/content";
import { locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our company",
  description:
    "Isak Fire Protection is a long-term fire protection partner for single buildings and multi-site portfolios across five states and Ontario.",
  alternates: { canonical: "/about" },
};

const clients = [
  {
    title: "Property and facility managers",
    body: "Portfolio-wide reporting, consolidated invoicing and a dedicated account contact across every site.",
  },
  {
    title: "Architects and general contractors",
    body: "Design-build, retrofits and tenant improvements, as a coordinated trade or the prime fire protection contractor.",
  },
  {
    title: "Building owners",
    body: "One team for the systems, the inspection schedule and the records your insurer and local authority ask for.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        stamp="Our company"
        title="Not just a vendor."
        lede="Isak Fire Protection stays with a building through every inspection cycle, every code amendment and every regulatory change, from the first drawing to the next certificate."
      />

      <div className="shell">
        <IllustrativeImage
          src={building}
          alt="A modern commercial office building with a tall glass atrium and a stone plaza"
          sizes="(min-width: 90rem) 82rem, 92vw"
          className="aspect-[16/10] md:aspect-[21/9]"
          imageClassName="object-[50%_60%]"
        />
      </div>

      <section
        aria-labelledby="who-title"
        className="shell grid gap-12 section-y lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20"
      >
        <div>
          <h2 id="who-title" data-reveal className="text-display">
            Who we work with
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Sectors">
            {sectors.map((sector) => (
              <li key={sector} className="rounded-[3px] bg-concrete-100 px-3 py-1.5 text-[0.875rem] font-medium">
                {sector}
              </li>
            ))}
          </ul>
        </div>
        <ul className="border-t-2 border-navy">
          {clients.map((c) => (
            <li
              key={c.title}
              data-reveal
              className="grid gap-2 border-b rule py-7 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-8"
            >
              <h3 className="font-display text-[1.75rem] leading-none font-bold uppercase">{c.title}</h3>
              <p className="text-steel">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how-title" className="bg-concrete-100">
        <div className="shell section-y">
          <h2 id="how-title" data-reveal className="max-w-[16ch] text-display">
            How a project runs
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {lifecycle.map((item) => (
              <li key={item.step} data-reveal className="border-t-2 border-navy bg-paper p-6">
                <p className="mono-label text-red">{item.step}</p>
                <h3 className="mt-4 font-display text-[2rem] leading-none font-bold uppercase">{item.title}</h3>
                <p className="mt-3 text-steel">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="where-title"
        className="shell grid gap-8 section-y md:grid-cols-[1fr_auto] md:items-end"
      >
        <div>
          <h2 id="where-title" data-reveal className="max-w-[18ch] text-display">
            Chicago headquarters. Six offices.
          </h2>
          <p data-reveal className="mt-6 max-w-[52ch] text-lede text-steel">
            {locations
              .map((l) => l.city)
              .join(", ")
              .replace(/, ([^,]*)$/, " and $1")}
            , serving{" "}
            {locations
              .map((l) => l.region)
              .join(", ")
              .replace(/, ([^,]*)$/, " and $1")}
            .
          </p>
        </div>
        <Link href="/locations" className={textLinkClass("text-red")}>
          Find your office <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
        </Link>
      </section>

      <ClosingCta />
    </>
  );
}
