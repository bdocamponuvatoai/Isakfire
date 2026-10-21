import type { Metadata } from "next";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { InsightList } from "@/components/insight-list";

export const metadata: Metadata = {
  title: "News & insights",
  description:
    "Isak Fire Protection articles on NFPA 13, NFPA 25, NFPA 72, NFPA 20, IFC adoptions, kitchen suppression, backflow and emergency lighting.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        stamp="News & insights"
        title="Code changes, explained."
        lede="Articles from the Isak team on standards updates, state code adoptions and keeping systems in service. Full articles open on isakfire.com."
      />
      <section aria-label="Articles" className="shell pb-24">
        <InsightList />
      </section>
      <ClosingCta />
    </>
  );
}
