import type { CSSProperties } from "react";
import { cx } from "@/components/ui";

const work = ["Inspected", "Tested", "Serviced", "Report issued"] as const;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const years = ["26", "27", "28", "29"] as const;

function Cell({ label, punch, i }: { label: string; punch?: boolean; i?: number }) {
  return (
    <span className="relative grid min-h-9 place-items-center border border-navy/70 px-2 font-mono text-[0.6875rem] font-medium uppercase">
      {label}
      {/* Punched in the corner, as on a real tag, so the label stays legible. */}
      {punch ? (
        <span
          className="tag-punch absolute top-0.5 right-0.5 size-2.5 rounded-full bg-navy-950 shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]"
          style={{ "--i": i } as CSSProperties}
        />
      ) : null}
    </span>
  );
}

/**
 * The service tag hung on a riser after each visit, drawn as a sample.
 * Punches animate in once the tag scrolls into view (see globals.css).
 */
export function InspectionTag({ className }: { className?: string }) {
  return (
    <figure data-reveal="tag" className={cx("mx-auto w-full max-w-[22rem]", className)}>
      <div
        role="img"
        aria-label="Sample inspection tag punched for inspected, tested, serviced and report issued."
        className="relative rotate-[-2.5deg] bg-tag px-6 pt-16 pb-7 text-navy shadow-[0_30px_60px_-30px_rgb(0_26_41/0.55)] [clip-path:polygon(18%_0,82%_0,100%_9%,100%_100%,0_100%,0_9%)]"
      >
        <span
          aria-hidden="true"
          className="absolute top-5 left-1/2 size-6 -translate-x-1/2 rounded-full bg-paper ring-4 ring-navy/80"
        />
        <div aria-hidden="true">
          <p className="text-center font-display text-[1.75rem] leading-none font-extrabold uppercase">Do not remove</p>
          <p className="mt-1 text-center font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase">
            Isak Fire Protection · Service record
          </p>

          <p className="mt-5 font-mono text-[0.6875rem] font-medium uppercase">Work performed</p>
          <div className="mt-1.5 grid grid-cols-2 gap-1">
            {work.map((label, i) => (
              <Cell key={label} label={label} punch i={i} />
            ))}
          </div>

          <p className="mt-4 font-mono text-[0.6875rem] font-medium uppercase">Month</p>
          <div className="mt-1.5 grid grid-cols-6 gap-1">
            {months.map((label) => (
              <Cell key={label} label={label} punch={label === "Oct"} i={4} />
            ))}
          </div>

          <p className="mt-4 font-mono text-[0.6875rem] font-medium uppercase">Year</p>
          <div className="mt-1.5 grid grid-cols-4 gap-1">
            {years.map((label) => (
              <Cell key={label} label={label} punch={label === "26"} i={5} />
            ))}
          </div>

          <div className="mt-5 grid gap-2 border-t-2 border-navy pt-3 font-mono text-[0.6875rem] font-medium uppercase">
            <p className="flex justify-between gap-4">
              <span>Deficiencies</span>
              <span>Documented · plan issued</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Technician</span>
              <span className="w-24 border-b border-navy" />
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-6 text-center mono-label text-steel">Sample tag, for illustration</figcaption>
    </figure>
  );
}
