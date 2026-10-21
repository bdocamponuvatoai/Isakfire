import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import teamHero from "@/assets/images/team-hero.webp";
import { ArrowRight, Phone } from "@/components/icons";
import { buttonClass, ButtonArrow } from "@/components/ui";
import { services } from "@/lib/content";
import { business, locations } from "@/lib/site";

const facts = [
  { value: String(services.length).padStart(2, "0"), label: "Service disciplines" },
  { value: String(locations.length).padStart(2, "0"), label: "Offices" },
  { value: "5 + 1", label: "States and Ontario" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-navy-950 text-white" data-theme="dark">
      <div className="relative grid lg:min-h-[max(38rem,calc(100vh-7.25rem))] lg:grid-cols-12 supports-[height:100svh]:lg:min-h-[max(38rem,calc(100svh-7.25rem))]">
        {/* Phones get the headline first, then the photo, so text never sits on faces. */}
        <div className="relative order-2 aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:order-none lg:aspect-auto">
          <Image
            src={teamHero}
            alt="Six people in Isak-branded work shirts, polos and office shirts standing in front of a white Isak Fire Protection service van"
            sizes="100vw"
            placeholder="blur"
            preload
            className="size-full object-cover object-[78%_50%] lg:object-[0%_50%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(0_26_41/0.97)_0%,rgb(0_26_41/0.9)_30%,rgb(0_26_41/0.35)_44%,transparent_58%)] lg:block"
          />
          <p className="absolute right-3 bottom-3 rounded-[2px] bg-navy-950/85 px-2 py-1 mono-label text-[0.6875rem] text-white lg:right-6 lg:bottom-6">
            Illustrative image · not Isak staff
          </p>
        </div>

        <div className="relative order-1 shell flex flex-col justify-center pt-12 pb-12 lg:order-none lg:col-span-12 lg:mx-0 lg:max-w-none lg:py-24">
          <p className="intro-rise mono-label text-sky">Illinois · Michigan · Ohio · Indiana · Wisconsin · Ontario</p>
          <h1
            id="hero-title"
            className="intro-rise mt-6 max-w-[9ch] text-display-xl"
            style={{ "--delay": "80ms" } as CSSProperties}
          >
            Fire protection, <span className="text-red-400">kept current.</span>
          </h1>
          <p
            className="intro-rise mt-7 max-w-[34rem] text-lede text-sky-100"
            style={{ "--delay": "160ms" } as CSSProperties}
          >
            Sprinklers, alarms, suppression and the inspections that follow. Designed, installed and maintained for
            commercial, industrial and residential buildings, by one accountable team.
          </p>
          <div className="intro-rise mt-9 flex flex-wrap gap-3" style={{ "--delay": "240ms" } as CSSProperties}>
            <Link href="/quote" className={buttonClass("red")}>
              Request a quote <ButtonArrow icon={<ArrowRight />} />
            </Link>
            <a href={business.phone.href} className={buttonClass("ghost-light")}>
              <Phone className="text-lg" /> {business.phone.display}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-sky/20 bg-navy">
        <dl className="shell grid grid-cols-3 divide-x divide-sky/20">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse gap-1.5 py-5 pr-3 pl-3 first:pl-0 sm:py-6 sm:pl-6">
              <dt className="text-[0.8125rem] leading-snug text-sky-100 sm:text-[0.9375rem]">{fact.label}</dt>
              <dd className="font-display text-[2rem] leading-none font-extrabold tabular-nums sm:text-[2.75rem]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
