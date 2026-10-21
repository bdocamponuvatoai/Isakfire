import type { Metadata } from "next";
import technician from "@/assets/images/technician.webp";
import { ArrowUpRight, Mail, Plus } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { buttonClass, IllustrativeImage } from "@/components/ui";
import { careers } from "@/lib/content";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Field roles at Isak Fire Protection: sprinkler fitter, fire alarm technician, kitchen suppression technician and NFPA 25 inspector.",
  alternates: { canonical: "/careers" },
};

function applyHref(title: string) {
  return `mailto:${business.email.careers}?subject=${encodeURIComponent(`Application: ${title}`)}`;
}

export default function CareersPage() {
  return (
    <>
      <PageHero
        stamp="Careers"
        title="Work that protects people."
        lede="Full-time field roles in installation, service and inspection. Isak supports preparation for NICET and other industry certifications, covers exam fees and promotes from within."
      >
        <a href={`mailto:${business.email.careers}`} className={buttonClass("red")}>
          <Mail className="text-lg" /> Email your résumé
        </a>
      </PageHero>

      <section aria-labelledby="roles-title" className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <IllustrativeImage
          src={technician}
          alt="A technician in a hard hat and safety glasses works from a tablet beside red riser pipes"
          sizes="(min-width: 64rem) 35vw, 100vw"
          className="aspect-[4/5] lg:col-span-4 lg:self-start"
        />
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="roles-title" className="text-title">
              Listed roles
            </h2>
            <p className="text-[0.9375rem] text-steel">Full-time · Field. Contact the team to confirm availability.</p>
          </div>
          <div className="mt-6 border-t-2 border-navy">
            {careers.map((role) => (
              <details key={role.title} className="group border-b rule">
                <summary className="flex min-h-20 items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block font-display text-[1.75rem] leading-none font-bold uppercase">
                      {role.title}
                    </span>
                    <span className="mt-2 block text-steel">{role.location}</span>
                  </span>
                  <Plus className="shrink-0 text-2xl text-red transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <div className="grid gap-8 pb-8 md:grid-cols-2">
                  <div>
                    <h3 className="mono-label text-red">The work</h3>
                    <ul className="mt-3 grid list-disc gap-2 pl-5 text-steel marker:text-red">
                      {role.duties.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mono-label text-red">What you bring</h3>
                    <ul className="mt-3 grid list-disc gap-2 pl-5 text-steel marker:text-red">
                      {role.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 md:col-span-2">
                    <a href={applyHref(role.title)} className={buttonClass("navy")}>
                      Apply for this role
                    </a>
                    <a
                      href={business.careersUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4"
                    >
                      Full listing on isakfire.com <ArrowUpRight />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
