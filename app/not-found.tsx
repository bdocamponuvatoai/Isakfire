import Link from "next/link";
import { ArrowRight, Phone } from "@/components/icons";
import { buttonClass, ButtonArrow } from "@/components/ui";
import { business } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="mono-label text-red">Error 404</p>
      <h1 className="mt-5 max-w-[14ch] text-display">This page isn’t on the plans.</h1>
      <p className="mt-6 max-w-[44ch] text-lede text-steel">
        The page you were looking for doesn’t exist or has moved. Head home, or call {business.phone.display} and the
        team will help.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={buttonClass("navy")}>
          Back to home <ButtonArrow icon={<ArrowRight />} />
        </Link>
        <Link href="/services" className={buttonClass("ghost-dark")}>
          Browse services
        </Link>
        <a href={business.phone.href} className={buttonClass("ghost-dark")}>
          <Phone className="text-lg" /> {business.phone.display}
        </a>
      </div>
    </section>
  );
}
