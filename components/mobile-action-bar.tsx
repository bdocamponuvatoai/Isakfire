"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "@/components/icons";
import { cx } from "@/components/ui";
import { business } from "@/lib/site";

/** Thumb-reach contact bar for phones, shown once the first screen is behind you. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);
  // The quote page already is the request; a second CTA would only cover its buttons.
  const visible = scrolledPast && pathname !== "/quote";

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-theme="dark"
      data-testid="mobile-action-bar"
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity,visibility] duration-500 ease-(--ease-out-expo) lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-full opacity-0",
      )}
      inert={!visible}
    >
      <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-1.5 rounded-[4px] bg-navy p-1.5 shadow-[0_20px_50px_-12px_rgb(0_26_41/0.6)]">
        <a
          href={business.phone.href}
          className="inline-flex min-h-12 items-center gap-2 rounded-[3px] px-5 text-[0.9375rem] font-semibold text-white"
        >
          <Phone className="text-lg text-sky" /> Call
        </a>
        <Link
          href="/quote"
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[3px] bg-red px-5 text-[0.9375rem] font-semibold text-white"
        >
          Request a quote <ArrowRight className="text-lg" />
        </Link>
      </div>
    </div>
  );
}
