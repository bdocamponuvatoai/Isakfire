import Link from "next/link";
import technician from "@/assets/images/technician.webp";
import { ArrowRight, Check } from "@/components/icons";
import { IllustrativeImage, textLinkClass } from "@/components/ui";

const commitments = [
  "Commercial, industrial and residential buildings",
  "New construction, retrofits and tenant improvements",
  "Permits, plan review and authority coordination",
  "Portfolio reporting and consolidated invoicing",
];

export function Partner() {
  return (
    <section aria-labelledby="partner-title" className="bg-concrete-100">
      <div className="shell grid gap-12 section-y lg:grid-cols-12 lg:gap-16">
        <IllustrativeImage
          src={technician}
          alt="A technician in a white hard hat and safety glasses checks a tablet beside red sprinkler riser pipes"
          sizes="(min-width: 64rem) 40vw, 100vw"
          className="aspect-[4/5] lg:col-span-5"
        />
        <div className="lg:col-span-7 lg:pt-8">
          <h2 id="partner-title" data-reveal className="max-w-[13ch] text-display">
            Not just a vendor. A long-term safety partner.
          </h2>
          <div data-reveal className="mt-8 grid max-w-[40rem] gap-5 text-lede text-steel">
            <p>
              Isak doesn’t install a system and disappear. The team stays with you through every inspection cycle, every
              code amendment and every regulatory change, with deep NFPA knowledge and local expertise with each
              authority having jurisdiction.
            </p>
            <p>
              Whether you manage a single building or a multi-site portfolio, Isak works as your dedicated fire
              protection team.
            </p>
          </div>
          <ul data-reveal className="mt-10 grid gap-x-8 border-t-2 border-navy sm:grid-cols-2">
            {commitments.map((item) => (
              <li key={item} className="flex gap-3 border-b rule py-4 font-medium">
                <Check className="mt-0.5 shrink-0 text-xl text-red" />
                {item}
              </li>
            ))}
          </ul>
          <blockquote data-reveal className="mt-12 max-w-[36rem] border-l-4 border-red pl-6">
            <p className="font-display text-[1.75rem] leading-[1.05] font-bold uppercase">
              “The system we install today might save a life we’ll never know about. That’s enough reason to do it right
              every time.”
            </p>
            <footer className="mt-4 text-[0.9375rem] text-steel">The Isak Fire Protection team</footer>
          </blockquote>
          <Link href="/about" className={textLinkClass("mt-10 text-red")}>
            About the company <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
