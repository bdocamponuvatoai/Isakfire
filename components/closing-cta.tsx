import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "@/components/icons";
import { buttonClass, ButtonArrow } from "@/components/ui";
import { business } from "@/lib/site";

export function ClosingCta({
  title = "Tell us about the building.",
  body = "A new project, an inspection that’s coming due, or a portfolio that needs one point of contact. Start with a call or put the details together in the quote planner.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section data-theme="dark" className="bg-navy text-white" aria-labelledby="closing-title">
      <div className="shell grid gap-10 section-y lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <h2 id="closing-title" data-reveal className="max-w-[14ch] text-display">
          {title}
        </h2>
        <div data-reveal style={{ "--delay": "100ms" } as CSSProperties}>
          <p className="max-w-[46ch] text-lede text-sky-100">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className={buttonClass("red")}>
              Plan a quote request <ButtonArrow icon={<ArrowRight />} />
            </Link>
            <a href={business.phone.href} className={buttonClass("ghost-light")}>
              <Phone className="text-lg" /> {business.phone.display}
            </a>
          </div>
          <p className="mt-6 text-[0.9375rem] text-sky-100">
            Office hours {business.hours.short}. Toll free{" "}
            <a href={business.tollFree.href} className="font-semibold text-white underline underline-offset-4">
              {business.tollFree.display}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
