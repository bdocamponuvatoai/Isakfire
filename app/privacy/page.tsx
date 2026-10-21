import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this website handles the information you enter in the quote planner.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "What this website collects",
    body: [
      "Nothing is stored or sent by this website. The quote planner keeps what you type in your browser tab only. When you choose “Open email draft”, your own email app opens a message addressed to the sales team; nothing reaches Isak until you send it from there.",
      "Closing or reloading the page clears the planner.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: [
      "This website sets no cookies and runs no analytics, advertising or third-party tracking scripts. Fonts and images are served from this website’s own domain.",
    ],
  },
  {
    title: "Links to other services",
    body: [
      "“Pay an invoice” opens Isak’s payment page on Stripe, and some articles and listings open on isakfire.com. Those services have their own privacy terms.",
    ],
  },
  {
    title: "Emails you send to Isak",
    body: [
      `Information you email to ${business.email.sales}, ${business.email.office} or ${business.email.careers} is handled by ${business.legalName}. To ask about or correct it, contact the office.`,
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        stamp="Privacy"
        title="Your details stay with you."
        lede="This website doesn’t store what you type, set cookies or track visits."
      />
      <section aria-label="Privacy details" className="shell pb-24">
        <div className="max-w-3xl border-t-2 border-navy">
          {sections.map((s) => (
            <div key={s.title} className="grid gap-3 border-b rule py-8 md:grid-cols-[14rem_1fr] md:gap-8">
              <h2 className="font-display text-[1.5rem] leading-none font-bold uppercase">{s.title}</h2>
              <div className="grid gap-3 text-steel">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[0.9375rem] text-steel">
          Questions:{" "}
          <a href={`mailto:${business.email.office}`} className="font-semibold text-navy underline underline-offset-4">
            {business.email.office}
          </a>{" "}
          or {business.phone.display}.
        </p>
      </section>
    </>
  );
}
