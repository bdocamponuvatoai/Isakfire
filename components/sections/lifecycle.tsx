import type { CSSProperties } from "react";
import { InspectionTag } from "@/components/inspection-tag";
import { lifecycle } from "@/lib/content";

export function Lifecycle() {
  return (
    <section aria-labelledby="lifecycle-title" className="shell section-y">
      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-center lg:gap-24">
        <div>
          <h2 id="lifecycle-title" data-reveal className="max-w-[12ch] text-display">
            Every visit leaves a record.
          </h2>
          <p data-reveal className="mt-6 max-w-[44ch] text-lede text-steel">
            A system is only as good as its last inspection. Isak plans it, builds it, then keeps the paperwork as
            current as the equipment: a signed certificate and an itemised report after every visit.
          </p>
          <ol className="mt-12 border-t-2 border-navy">
            {lifecycle.map((item, i) => (
              <li
                key={item.step}
                data-reveal
                style={{ "--delay": `${i * 90}ms` } as CSSProperties}
                className="grid gap-2 border-b rule py-7 sm:grid-cols-[5rem_12rem_1fr] sm:gap-6"
              >
                <span className="mono-label text-red">{item.step}</span>
                <h3 className="font-display text-[1.75rem] leading-none font-bold uppercase">{item.title}</h3>
                <p className="text-steel">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <InspectionTag />
      </div>
    </section>
  );
}
