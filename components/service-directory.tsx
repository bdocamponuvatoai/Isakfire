"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL, FilterBar, ResultCount } from "@/components/filter-bar";
import { ArrowRight } from "@/components/icons";
import { serviceGroups, services } from "@/lib/content";

export function ServiceDirectory() {
  const [group, setGroup] = useState(ALL);
  const shown = services.filter((s) => group === ALL || s.group === group);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterBar label="Filter services" options={serviceGroups} value={group} onChange={setGroup} />
        <ResultCount shown={shown.length} total={services.length} noun="services" />
      </div>
      <ul className="mt-8 border-t-2 border-navy">
        {shown.map((s) => (
          <li key={s.slug} className="border-b rule">
            <Link
              href={`/services/${s.slug}`}
              className="group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[4rem_minmax(0,20rem)_1fr_auto] md:items-baseline"
            >
              <span className="mono-label text-steel">{String(services.indexOf(s) + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-[2rem] leading-none font-bold uppercase transition-colors group-hover:text-red">
                  {s.name}
                </span>
                <span className="mt-2 block mono-label text-blue">
                  {s.group}
                  {s.standard ? ` · ${s.standard}` : ""}
                </span>
              </span>
              <span className="max-w-[48ch] text-steel">{s.description}</span>
              <ArrowRight className="hidden text-2xl text-red transition-transform group-hover:translate-x-1 md:block" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
