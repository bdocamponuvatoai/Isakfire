import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { buttonClass, ButtonArrow, textLinkClass } from "@/components/ui";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call Isak Fire Protection on ${business.phone.display}, toll free ${business.tollFree.display}, or email ${business.email.office}. Office hours ${business.hours.short}.`,
  alternates: { canonical: "/contact" },
};

const emails = [
  { label: "General enquiries", address: business.email.office },
  { label: "Quotes and estimates", address: business.email.sales },
  { label: "Careers", address: business.email.careers },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        stamp="Contact"
        title="Tell us what you’re working on."
        lede="A new project, an inspection question or a whole portfolio. Call during office hours, or email the right team."
      />

      <section aria-label="Contact details" className="shell grid gap-6 pb-24 lg:grid-cols-12">
        <div className="border-t-2 border-navy bg-white p-6 sm:p-10 lg:col-span-7">
          <h2 className="mono-label text-red">Headquarters, Chicago</h2>
          <a
            href={business.phone.href}
            className="mt-5 inline-flex items-center gap-4 font-display text-[clamp(2.75rem,2rem+4vw,5rem)] leading-none font-extrabold tabular-nums hover:text-red"
          >
            <Phone className="text-[0.6em] text-red" />
            {business.phone.display}
          </a>
          <p className="mt-3 text-lede text-steel">
            Toll free{" "}
            <a href={business.tollFree.href} className="font-semibold text-navy underline underline-offset-4">
              {business.tollFree.display}
            </a>
          </p>

          <dl className="mt-10 grid gap-8 border-t rule pt-8 sm:grid-cols-2">
            <div>
              <dt className="mono-label text-steel">Address</dt>
              <dd className="mt-2">
                <address className="not-italic">
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.region} {business.address.postalCode}
                </address>
              </dd>
            </div>
            <div>
              <dt className="mono-label text-steel">Office hours</dt>
              <dd className="mt-2">
                {business.hours.days}
                <br />
                {business.hours.time}
              </dd>
            </div>
          </dl>

          <ul className="mt-10 border-t-2 border-navy">
            {emails.map((e) => (
              <li
                key={e.address}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b rule py-4"
              >
                <span className="text-steel">{e.label}</span>
                <a href={`mailto:${e.address}`} className="inline-flex items-center gap-2 font-semibold hover:text-red">
                  <Mail className="text-red" /> {e.address}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <aside data-theme="dark" className="flex flex-col bg-navy p-6 text-white sm:p-10 lg:col-span-5">
          <h2 className="text-title">Planning a project?</h2>
          <p className="mt-4 text-sky-100">
            The quote planner collects the services, the property and your details in four short steps, then opens it
            all as an email to the sales team. You review and send it yourself.
          </p>
          <Link href="/quote" className={buttonClass("red", "mt-8 self-start")}>
            Plan a quote request <ButtonArrow icon={<ArrowRight />} />
          </Link>
          <div className="mt-auto border-t border-sky/25 pt-8">
            <p className="text-sky-100">Already a client?</p>
            <div className="mt-2 flex flex-wrap gap-x-6">
              <Link href="/locations" className={textLinkClass("text-white")}>
                Find your local office
              </Link>
              <a
                href={business.payUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={textLinkClass("text-white")}
              >
                Pay an invoice <ArrowUpRight />
                <span className="sr-only">(opens Stripe in a new tab)</span>
              </a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
