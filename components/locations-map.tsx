import type { CSSProperties } from "react";
import { cx } from "@/components/ui";
import { locations } from "@/lib/site";

// Equirectangular projection centred on the region, plotted from each office's
// city coordinates. There's no coastline data: it's a plot, not a basemap.
const bounds = { north: 44.4, south: 39.1, west: -88.6, east: -78.6 };
const scaleX = Math.cos((((bounds.north + bounds.south) / 2) * Math.PI) / 180);
const width = (bounds.east - bounds.west) * scaleX;
const height = bounds.north - bounds.south;

function position([lat, lon]: readonly [number, number]) {
  return {
    x: (((lon - bounds.west) * scaleX) / width) * 100,
    y: ((bounds.north - lat) / height) * 100,
  };
}

const plotted = locations.map((l) => ({ ...l, ...position(l.coords) }));
const hq = plotted[0]!;

// Labels sit to the side with the most room.
const labelSide: Record<string, "left" | "right"> = {
  chicago: "left",
  milwaukee: "right",
  indianapolis: "left",
  dayton: "right",
  detroit: "right",
  toronto: "left",
};

export function LocationsMap({ className }: { className?: string }) {
  return (
    <figure className={cx("relative", className)}>
      <div className="relative" style={{ aspectRatio: `${width} / ${height}` }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 size-full overflow-visible"
        >
          {[40, 41, 42, 43, 44].map((lat) => {
            const y = ((bounds.north - lat) / height) * 100;
            return (
              <line
                key={lat}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.14"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {plotted.slice(1).map((l) => (
            <line
              key={l.slug}
              x1={hq.x}
              y1={hq.y}
              x2={l.x}
              y2={l.y}
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <ul>
          {plotted.map((l) => (
            <li key={l.slug} className="absolute" style={{ left: `${l.x}%`, top: `${l.y}%` } as CSSProperties}>
              <span
                aria-hidden="true"
                className={cx(
                  "absolute -translate-1/2 rounded-full ring-4 ring-paper",
                  l.slug === "chicago" ? "size-4 bg-red" : "size-3 bg-navy",
                )}
              />
              <span
                className={cx(
                  "absolute top-0 -translate-y-1/2 leading-tight whitespace-nowrap",
                  labelSide[l.slug] === "left" ? "right-3 text-right" : "left-3",
                )}
              >
                <span className="block font-display text-[1rem] font-bold uppercase sm:text-[1.25rem]">{l.city}</span>
                <span className="block font-mono text-[0.625rem] font-medium text-steel uppercase sm:text-[0.6875rem]">
                  {l.abbr}
                  {l.slug === "chicago" ? " · HQ" : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-4 mono-label text-steel">Offices plotted by city coordinates · 40°N to 44°N</figcaption>
    </figure>
  );
}
