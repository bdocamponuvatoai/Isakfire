import { ArrowUpRight } from "@/components/icons";
import type { Insight } from "@/lib/content";
import { business } from "@/lib/site";

/** Article summary. Full articles live on the current Isak website. */
export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="flex h-full flex-col border-t-2 border-navy bg-white p-6">
      <p className="flex justify-between gap-4 mono-label text-steel">
        <span className={insight.category === "Code update" ? "text-red" : "text-blue"}>{insight.category}</span>
        <span>{insight.date}</span>
      </p>
      <h3 className="mt-5 text-[1.1875rem] leading-snug font-semibold">{insight.title}</h3>
      <a
        href={business.newsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-6 font-semibold text-red underline decoration-red/30 underline-offset-[0.3em] hover:decoration-red"
      >
        Read on isakfire.com <ArrowUpRight />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </article>
  );
}
