"use client";

import { useEffect } from "react";
import { Phone } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { business } from "@/lib/site";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="mono-label text-red">Something went wrong</p>
      <h1 className="mt-5 max-w-[14ch] text-display">This page didn’t load.</h1>
      <p className="mt-6 max-w-[44ch] text-lede text-steel">
        Try again, or call {business.phone.display} and the team will help directly.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonClass("navy")}>
          Try again
        </button>
        <a href={business.phone.href} className={buttonClass("ghost-dark")}>
          <Phone className="text-lg" /> {business.phone.display}
        </a>
      </div>
    </section>
  );
}
