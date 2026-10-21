import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/closing-cta";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ServiceDirectory } from "@/components/service-directory";
import { buttonClass, ButtonArrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fire sprinklers, alarms and detection, kitchen and special hazard suppression, extinguishers, monitoring, fire pumps, backflow devices and emergency lighting.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        stamp="Services"
        title="Every system. Every stage."
        lede="Nine disciplines, from the sprinkler riser to the exit sign, and the inspection, testing and maintenance that keep each of them current."
      >
        <Link href="/quote" className={buttonClass("red")}>
          Discuss your building <ButtonArrow icon={<ArrowRight />} />
        </Link>
      </PageHero>
      <section aria-label="Service directory" className="shell pb-24">
        <ServiceDirectory />
      </section>
      <ClosingCta />
    </>
  );
}
