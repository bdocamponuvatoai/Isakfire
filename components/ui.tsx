import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "red" | "navy" | "ghost-light" | "ghost-dark";

/** Shared button styling so links and buttons look identical. */
export function buttonClass(variant: ButtonVariant = "red", className?: string) {
  return cx(
    "group/button inline-flex min-h-12 items-center justify-center gap-3 rounded-[3px] px-6 text-[0.9375rem] font-semibold whitespace-nowrap",
    "transition-[background-color,color,box-shadow] duration-200",
    variant === "red" && "bg-red text-white hover:bg-red-700",
    variant === "navy" && "bg-navy text-white hover:bg-navy-700",
    variant === "ghost-light" && "text-white ring-1 ring-sky/60 ring-inset hover:bg-white hover:text-navy",
    variant === "ghost-dark" && "text-navy ring-1 ring-navy/35 ring-inset hover:bg-navy hover:text-white",
    className,
  );
}

/** Arrow that nudges on hover of the parent `group/button`. */
export function ButtonArrow({ icon }: { icon: ReactNode }) {
  return (
    <span className="-mr-1 inline-flex text-lg transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-1">
      {icon}
    </span>
  );
}

/** Inline text link with an arrow, for secondary actions. */
export function textLinkClass(className?: string) {
  return cx(
    "group/button inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-current/30 underline-offset-[0.3em] transition-colors hover:decoration-current",
    className,
  );
}

/**
 * Generated images carry a visible label so nobody mistakes them for Isak's
 * own people, vehicles or projects.
 */
export function IllustrativeImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <figure className={cx("relative overflow-hidden bg-concrete-200", className)} data-reveal="image">
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        placeholder="blur"
        className={cx("size-full object-cover", imageClassName)}
      />
      <figcaption className="absolute bottom-3 left-3 rounded-[2px] bg-navy-950/85 px-2 py-1 mono-label text-[0.6875rem] text-white">
        Illustrative image
      </figcaption>
    </figure>
  );
}

/** Mono record stamp, e.g. “01 / Plan”. Used sparingly, not above every heading. */
export function Stamp({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("mono-label", className)}>{children}</p>;
}
