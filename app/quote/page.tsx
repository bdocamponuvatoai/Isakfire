import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { QuotePlannerFromUrl } from "@/components/quote/quote-planner";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan a quote request",
  description:
    "Put your fire protection project details together in four steps, then send them to the Isak sales team from your own email.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        stamp="Quote planner"
        title="Plan your request."
        lede={
          <>
            Four short steps: the services, the property, your details, then a summary that opens as an email to{" "}
            <a href={`mailto:${business.email.sales}`} className="font-semibold text-navy underline underline-offset-4">
              {business.email.sales}
            </a>
            .
          </>
        }
      />
      <section aria-label="Quote planner" className="shell pb-24">
        <noscript>
          <p className="mb-8 border-l-4 border-red bg-white p-5">
            The planner needs JavaScript. You can still call{" "}
            <a href={business.phone.href} className="font-semibold underline">
              {business.phone.display}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${business.email.sales}`} className="font-semibold underline">
              {business.email.sales}
            </a>
            .
          </p>
        </noscript>
        {/* The prerendered fallback is a placeholder, not a copy of the form: an
            unhydrated form would submit natively and put entries in the URL. */}
        <Suspense
          fallback={
            <div aria-hidden="true" className="min-h-[40rem] animate-pulse border-t-2 border-navy bg-concrete-100/60" />
          }
        >
          <QuotePlannerFromUrl />
        </Suspense>
      </section>
    </>
  );
}
