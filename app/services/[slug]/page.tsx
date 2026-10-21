import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import riserValve from "@/assets/images/riser-valve.webp";
import technician from "@/assets/images/technician.webp";
import { ClosingCta } from "@/components/closing-cta";
import { ArrowRight, Check, Phone } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { buttonClass, ButtonArrow, IllustrativeImage, textLinkClass } from "@/components/ui";
import { getService, services } from "@/lib/content";
import { business } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const related = services.filter((s) => s.group === service.group && s.slug !== service.slug).slice(0, 3);
  const suppression = service.group === "Suppression";

  return (
    <>
      <nav aria-label="Breadcrumb" className="shell pt-8 text-[0.875rem] text-steel">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/services" className="underline underline-offset-4 hover:text-navy">
              Services
            </Link>
            <span aria-hidden="true" className="ml-2">
              /
            </span>
          </li>
          <li aria-current="page">{service.name}</li>
        </ol>
      </nav>
      <PageHero
        className="md:pt-12"
        stamp={`${service.group}${service.standard ? ` · ${service.standard}` : ""}`}
        title={service.name}
        lede={service.intro}
      >
        <Link href={`/quote?service=${service.slug}`} className={buttonClass("red")}>
          Request a quote <ButtonArrow icon={<ArrowRight />} />
        </Link>
        <a href={business.phone.href} className={buttonClass("ghost-dark")}>
          <Phone className="text-lg" /> {business.phone.display}
        </a>
      </PageHero>

      <section aria-labelledby="scope-title" className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <IllustrativeImage
          src={suppression ? riserValve : technician}
          alt={
            suppression
              ? "A red fire protection valve assembly with a pressure gauge and handwheel"
              : "A technician in a hard hat checks a tablet beside red sprinkler riser pipes"
          }
          sizes="(min-width: 64rem) 45vw, 100vw"
          className="aspect-[4/3] lg:col-span-6"
          imageClassName={suppression ? "object-[60%_50%]" : "object-[50%_30%]"}
        />
        <div className="lg:col-span-6">
          <p className="text-lede">{service.detail}</p>
          <h2 id="scope-title" className="mt-12 text-title">
            What’s in scope
          </h2>
          <ul className="mt-5 border-t-2 border-navy">
            {service.scope.map((item) => (
              <li key={item} className="flex gap-3 border-b rule py-4 font-medium">
                <Check className="mt-0.5 shrink-0 text-xl text-red" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.9375rem] text-steel">
            System suitability, availability in your area and the requirements that apply are confirmed for each
            property.
          </p>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="border-t rule bg-white">
          <div className="shell py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-title" className="text-title">
                More {service.group.toLowerCase()}
              </h2>
              <Link href="/services" className={textLinkClass("text-red")}>
                All services <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col border-t-2 border-navy bg-paper p-6 transition-colors hover:bg-concrete-100"
                  >
                    <span className="font-display text-[1.75rem] leading-none font-bold uppercase group-hover:text-red">
                      {s.name}
                    </span>
                    <span className="mt-3 text-steel">{s.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ClosingCta />
    </>
  );
}
