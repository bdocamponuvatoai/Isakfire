import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { InsightCard } from "@/components/insight-card";
import { textLinkClass } from "@/components/ui";
import { insights } from "@/lib/content";

export function Journal() {
  return (
    <section aria-labelledby="journal-title" className="shell section-y">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="journal-title" data-reveal className="max-w-[14ch] text-display">
          Code changes, explained.
        </h2>
        <Link href="/insights" className={textLinkClass("text-red")}>
          All {insights.length} articles{" "}
          <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
        </Link>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {insights.slice(0, 3).map((insight) => (
          <li key={insight.title}>
            <InsightCard insight={insight} />
          </li>
        ))}
      </ul>
    </section>
  );
}
