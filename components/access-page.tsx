import { ArrowUpRight, Check, Mail, Phone } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

/**
 * Isak's portals are listed as "coming soon" on the current site, so this page
 * states that plainly and offers real contact routes. No sign-in is collected.
 */
export function AccessPage({
  stamp,
  title,
  lede,
  features,
  statusUrl,
}: {
  stamp: string;
  title: string;
  lede: string;
  features: readonly { title: string; body: string }[];
  statusUrl: string;
}) {
  return (
    <>
      <PageHero stamp={stamp} title={title} lede={lede} />
      <section aria-label="Portal status" className="shell grid gap-6 pb-24 lg:grid-cols-12">
        <div data-theme="dark" className="bg-navy p-6 text-white sm:p-10 lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-[2px] bg-tag px-2.5 py-1 mono-label text-navy">
            Coming soon
          </p>
          <h2 className="mt-6 text-title">The portal isn’t open yet.</h2>
          <p className="mt-4 text-sky-100">
            Until it is, the team can send reports, schedules and account details directly. This page doesn’t ask for a
            password or collect sign-in details.
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a href={business.phone.href} className={buttonClass("red")}>
              <Phone className="text-lg" /> {business.phone.display}
            </a>
            <a href={`mailto:${business.email.office}`} className={buttonClass("ghost-light")}>
              <Mail className="text-lg" /> {business.email.office}
            </a>
          </div>
        </div>
        <div className="border-t-2 border-navy bg-white p-6 sm:p-10 lg:col-span-7">
          <h2 className="text-title">Planned features</h2>
          <ul className="mt-6">
            {features.map((f) => (
              <li key={f.title} className="flex gap-4 border-b rule py-5 last:border-b-0">
                <Check className="mt-1 shrink-0 text-xl text-red" />
                <span>
                  <span className="block font-semibold">{f.title}</span>
                  <span className="mt-1 block text-steel">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <a
            href={statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4"
          >
            Portal status on isakfire.com <ArrowUpRight />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </section>
    </>
  );
}
