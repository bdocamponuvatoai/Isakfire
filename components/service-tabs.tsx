"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { cx } from "@/components/ui";
import { serviceGroups, services, type ServiceGroup } from "@/lib/content";

const slug = (group: ServiceGroup) => group.toLowerCase().replace(/\s+/g, "-");

/** ARIA tabs: arrow keys, Home and End move between groups. */
export function ServiceTabs() {
  const [active, setActive] = useState<ServiceGroup>(serviceGroups[0]!);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent, index: number) {
    const last = serviceGroups.length - 1;
    const target =
      event.key === "ArrowRight"
        ? (index + 1) % serviceGroups.length
        : event.key === "ArrowLeft"
          ? (index - 1 + serviceGroups.length) % serviceGroups.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (target === null) return;
    event.preventDefault();
    setActive(serviceGroups[target]!);
    tabs.current[target]?.focus();
  }

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Service groups" className="flex gap-1 overflow-x-auto border-b-2 border-navy">
        {serviceGroups.map((group, i) => {
          const selected = group === active;
          return (
            <button
              key={group}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${slug(group)}`}
              aria-controls={`panel-${slug(group)}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(group)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={cx(
                "-mb-0.5 min-h-12 shrink-0 border-b-4 px-2.5 font-display text-[1.0625rem] font-bold whitespace-nowrap uppercase transition-colors sm:px-6 sm:text-[1.25rem]",
                selected ? "border-red text-navy" : "border-transparent text-steel hover:text-navy",
              )}
            >
              {group}
              <span className="ml-2 font-mono text-[0.75rem] font-medium">
                {services.filter((s) => s.group === group).length}
              </span>
            </button>
          );
        })}
      </div>

      {serviceGroups.map((group) => (
        <div
          key={group}
          role="tabpanel"
          id={`panel-${slug(group)}`}
          aria-labelledby={`tab-${slug(group)}`}
          hidden={group !== active}
        >
          <ul>
            {services
              .filter((s) => s.group === group)
              .map((s) => (
                <li key={s.slug} className="border-b rule">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[minmax(0,16rem)_1fr_auto] sm:items-center"
                  >
                    <span className="font-display text-[1.75rem] leading-none font-bold uppercase transition-colors group-hover:text-red">
                      {s.name}
                    </span>
                    <span className="text-steel">
                      {s.description}
                      {s.standard ? (
                        <span className="ml-2 mono-label whitespace-nowrap text-blue">{s.standard}</span>
                      ) : null}
                    </span>
                    <ArrowRight className="hidden text-2xl text-red transition-transform group-hover:translate-x-1 sm:block" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
