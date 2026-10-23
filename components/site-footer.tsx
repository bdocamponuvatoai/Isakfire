import Image from "next/image";
import Link from "next/link";
import igvLogo from "@/assets/images/igv-logo-on-ink.webp";
import logo from "@/assets/images/isak-logo.png";
import { ArrowUpRight } from "@/components/icons";
import { services } from "@/lib/content";
import { business, navigation, secondaryNavigation } from "@/lib/site";

const linkClass = "inline-flex min-h-10 items-center text-sky-100 transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="bg-navy-950 pb-24 text-sky-100 lg:pb-0">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          {/* The badge's navy lettering needs a light ground to stay legible. */}
          <Link href="/" className="inline-block rounded-[3px] bg-paper p-3" aria-label="Isak Fire Protection home">
            <Image src={logo} alt="" sizes="96px" className="h-16 w-auto" />
          </Link>
          <p className="mt-6 max-w-[30ch] text-[0.9375rem]">
            Fire protection systems, inspection and service across five states and Ontario.
          </p>
          <p className="mt-4 max-w-[34ch] text-[0.8125rem] text-sky">
            Images marked “Illustrative image” are not photographs of Isak staff, vehicles or projects.
          </p>
        </div>

        <nav aria-label="Services">
          <h2 className="mono-label text-sky">Services</h2>
          <ul className="mt-4 text-[0.9375rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="mono-label text-sky">Company</h2>
          <ul className="mt-4 text-[0.9375rem]">
            {[...navigation.filter((n) => n.href !== "/services"), ...secondaryNavigation].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mono-label text-sky">Headquarters</h2>
          <address className="mt-4 text-[0.9375rem] not-italic">
            <p>
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </p>
            <p className="mt-4">
              <a href={business.phone.href} className="font-display text-[1.75rem] font-bold text-white tabular-nums">
                {business.phone.display}
              </a>
              <br />
              <a href={business.tollFree.href} className={linkClass}>
                Toll free {business.tollFree.display}
              </a>
              <br />
              <a href={`mailto:${business.email.office}`} className={linkClass}>
                {business.email.office}
              </a>
            </p>
            <p className="mt-2">{business.hours.short}</p>
          </address>
          <a
            href={business.payUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline decoration-sky/50 underline-offset-4 hover:decoration-white"
          >
            Pay an invoice <ArrowUpRight />
            <span className="sr-only">(opens Stripe in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="shell pb-8 lg:pb-12">
        {/* Studio credit, shared across Isak Global Ventures sites. */}
        <div className="flex flex-col items-center gap-3 border-t border-sky/20 pt-8 text-center text-[0.6875rem] tracking-[0.2em] text-sky uppercase md:flex-row md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} {business.legalName}
          </p>
          <p>{business.tagline}.</p>
          <p>
            Website design &amp; development by{" "}
            <a
              href="https://nuvato.ai/"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-1 text-white underline underline-offset-4 transition-opacity hover:opacity-75"
            >
              Nuvato AI
              <ArrowUpRight className="text-[0.875rem]" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </div>

        {/* Parent-company badge. The logo is decorative: the caption names the company. */}
        <div className="mt-6 flex justify-center border-t border-sky/20 pt-8">
          <a
            href="https://isakglobalventures.com/"
            target="_blank"
            rel="noopener"
            className="group inline-flex min-h-11 flex-col items-center gap-4 rounded-2xl px-4 py-2 text-[0.8125rem] tracking-[0.02em] text-sky transition-colors hover:text-white sm:flex-row sm:gap-8"
          >
            <span>Proudly part of Isak Global Ventures</span>
            <Image
              src={igvLogo}
              alt=""
              sizes="102px"
              className="h-8 w-auto opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
