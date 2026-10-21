import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { LocationsMap } from "@/components/locations-map";
import { textLinkClass } from "@/components/ui";
import { locations } from "@/lib/site";

export function Locations() {
  return (
    <section aria-labelledby="locations-title" className="border-y rule bg-white">
      <div className="shell grid gap-14 section-y lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-20">
        <div>
          <h2 id="locations-title" data-reveal className="text-display">
            Six locations. One standard.
          </h2>
          <p data-reveal className="mt-6 max-w-[40ch] text-lede text-steel">
            Headquarters in Chicago, an office in Toronto and regional teams across the Great Lakes. Call the one
            nearest your building.
          </p>
          <ul className="mt-10 border-t-2 border-navy">
            {locations.map((l) => (
              <li key={l.slug} className="flex items-baseline justify-between gap-4 border-b rule py-3.5">
                <span>
                  <span className="font-semibold">{l.city}</span>
                  <span className="text-steel">, {l.abbr}</span>
                </span>
                <a href={l.phone.href} className="font-medium tabular-nums underline-offset-4 hover:underline">
                  {l.phone.display}
                </a>
              </li>
            ))}
          </ul>
          <Link href="/locations" className={textLinkClass("mt-8 text-red")}>
            Office details <ArrowRight className="transition-transform group-hover/button:translate-x-1" />
          </Link>
        </div>
        <div data-reveal className="self-center px-14 sm:px-20">
          <LocationsMap />
        </div>
      </div>
    </section>
  );
}
