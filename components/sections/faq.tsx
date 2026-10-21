import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { FaqItem } from "@/components/faq-item";
import { textLinkClass } from "@/components/ui";
import { faqs } from "@/lib/content";

const featured = [0, 1, 4, 9, 16].map((i) => faqs[i]!);

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-concrete-100">
      <div className="shell grid gap-12 section-y lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
        <div>
          <h2 id="faq-title" data-reveal className="text-display">
            Straight answers.
          </h2>
          <Link href="/resources" className={textLinkClass("mt-8 text-red")}>
            All {faqs.length} questions <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
        <div className="border-t-2 border-navy">
          {featured.map((faq) => (
            <FaqItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
