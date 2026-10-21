import type { Metadata } from "next";
import { ClosingCta } from "@/components/closing-cta";
import { FaqExplorer } from "@/components/faq-explorer";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Questions & answers",
  description:
    "Answers on inspections, NFPA 25, deficiencies, installation schedules, permits, kitchen suppression, recurring programs and paying an invoice.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        stamp="Resources"
        title="Straight answers."
        lede="Common questions about working with Isak, planning a project and keeping systems inspected."
      />
      <section aria-label="Questions and answers" className="shell pb-16">
        <FaqExplorer />
      </section>
      <p className="shell pb-24 text-[0.9375rem] text-steel">
        Requirements depend on your system, the codes your jurisdiction has adopted and your local authority. Confirm
        what applies to your property with a qualified professional.
      </p>
      <ClosingCta />
    </>
  );
}
