import type { CSSProperties, ReactNode } from "react";
import { cx, Stamp } from "@/components/ui";

/** Opening block for inner pages: a record stamp, the page's only h1, and a lede. */
export function PageHero({
  stamp,
  title,
  lede,
  children,
  className,
}: {
  stamp: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("shell pt-12 pb-14 md:pt-20 md:pb-20", className)}>
      <Stamp className="intro-rise text-red">{stamp}</Stamp>
      <h1 className="intro-rise mt-5 max-w-[16ch] text-display" style={{ "--delay": "60ms" } as CSSProperties}>
        {title}
      </h1>
      <div
        className="intro-rise mt-8 grid gap-8 border-t-2 border-navy pt-8 md:grid-cols-[minmax(0,40rem)_auto] md:items-end md:justify-between"
        style={{ "--delay": "120ms" } as CSSProperties}
      >
        <div className="text-lede text-steel">{lede}</div>
        {children ? <div className="flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
