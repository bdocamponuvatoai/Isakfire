import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { ServiceTabs } from "@/components/service-tabs";
import { textLinkClass } from "@/components/ui";
import { sectors, services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="shell section-y">
      <h2 id="services-title" data-reveal className="max-w-[20ch] text-display">
        {services.length} disciplines. One accountable team.
      </h2>
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        <div data-reveal>
          <p className="max-w-[40ch] text-lede text-steel">
            Start with the system you need, or let the team look at the whole building. Each one is designed, installed,
            inspected and maintained under the same roof.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Sectors">
            {sectors.map((sector) => (
              <li key={sector} className="rounded-[3px] bg-concrete-100 px-3 py-1.5 text-[0.875rem] font-medium">
                {sector}
              </li>
            ))}
          </ul>
          <Link href="/services" className={textLinkClass("mt-8 text-red")}>
            All services <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
        <ServiceTabs />
      </div>
    </section>
  );
}
