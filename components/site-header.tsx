"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/images/isak-logo.png";
import { ArrowRight, ArrowUpRight, Close, Phone } from "@/components/icons";
import { buttonClass, ButtonArrow, cx } from "@/components/ui";
import { business, navigation, secondaryNavigation } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => event.matches && menuRef.current?.close();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cx(
        "sticky top-0 z-40 bg-paper transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_rgb(0_48_74/0.12),0_12px_30px_-20px_rgb(0_48_74/0.4)]",
      )}
    >
      <div className="hidden bg-navy text-sky-100 lg:block">
        <div className="shell flex h-9 items-center justify-between text-[0.8125rem]">
          <p>
            {business.hours.days}, {business.hours.time}
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <a href={business.tollFree.href} className="hover:text-white">
                Toll free {business.tollFree.display}
              </a>
            </li>
            {secondaryNavigation.slice(2).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={business.payUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white"
              >
                Pay an invoice <ArrowUpRight />
                <span className="sr-only">(opens Stripe in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-3 rounded-sm" aria-label="Isak Fire Protection home">
          <Image src={logo} alt="" loading="eager" sizes="72px" className="h-12 w-auto lg:h-14" />
          <span className="hidden font-display text-[1.375rem] leading-[0.9] font-extrabold tracking-[0.01em] uppercase xs:block">
            Isak <span className="block text-[0.8125rem] font-bold tracking-[0.12em] text-steel">Fire Protection</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cx(
                      "relative inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] font-medium transition-colors hover:text-red",
                      "after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:bg-red after:transition-transform",
                      current ? "after:scale-x-100" : "after:scale-x-0",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={business.phone.href}
            className="hidden min-h-11 items-center gap-2 text-[0.9375rem] font-semibold tabular-nums md:inline-flex"
          >
            <Phone className="text-base text-red" />
            {business.phone.display}
          </a>
          <Link href="/quote" className={buttonClass("red", "min-h-11 px-5 text-sm max-sm:hidden")}>
            Request a quote
          </Link>
          <button
            type="button"
            onClick={() => menuRef.current?.showModal()}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="-mr-2 grid size-11 place-items-center rounded-[3px] hover:bg-concrete-100 lg:hidden"
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-3/5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="sheet bg-paper text-navy lg:hidden"
        onClick={(event) => {
          // Links dismiss the menu once they've acted; so does the backdrop.
          if (event.target === event.currentTarget || (event.target as HTMLElement).closest("a")) {
            menuRef.current?.close();
          }
        }}
      >
        <div className="shell flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex h-18 items-center justify-between">
            <Image src={logo} alt="Isak Fire Protection" sizes="72px" className="h-12 w-auto" />
            <button
              type="button"
              onClick={() => menuRef.current?.close()}
              aria-label="Close menu"
              className="-mr-2 grid size-11 place-items-center rounded-[3px] text-2xl hover:bg-concrete-100"
            >
              <Close />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6">
            <ul className="border-t rule">
              {[{ href: "/", label: "Home" }, ...navigation].map((item) => (
                <li key={item.href} className="border-b rule">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-15 items-center justify-between font-display text-[2rem] leading-none font-extrabold uppercase aria-[current=page]:text-red"
                  >
                    {item.label}
                    <ArrowRight className="text-xl text-steel" />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 text-[0.9375rem]">
              {secondaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={business.payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-1 font-medium"
                >
                  Pay an invoice <ArrowUpRight />
                  <span className="sr-only">(opens Stripe in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-8">
            <a href={business.phone.href} className={buttonClass("ghost-dark", "w-full")}>
              <Phone className="text-lg" /> Call {business.phone.display}
            </a>
            <Link href="/quote" className={buttonClass("red", "w-full")}>
              Request a quote <ButtonArrow icon={<ArrowRight />} />
            </Link>
          </div>
        </div>
      </dialog>
    </header>
  );
}
