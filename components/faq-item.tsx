import { Plus } from "@/components/icons";
import type { Faq } from "@/lib/content";

/** Native disclosure: works without JavaScript and is keyboard accessible by default. */
export function FaqItem({ faq }: { faq: Faq }) {
  return (
    <details className="group border-b rule">
      <summary className="flex min-h-16 items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold">
        {faq.q}
        <Plus className="shrink-0 text-xl text-red transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <p className="max-w-[62ch] pb-6 text-steel">{faq.a}</p>
    </details>
  );
}
