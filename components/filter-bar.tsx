"use client";

import { cx } from "@/components/ui";

export const ALL = "All";

/** Toggle buttons for narrowing a list. `aria-pressed` carries the selected state. */
export function FilterBar({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cx("flex flex-wrap gap-2", className)}>
      {[ALL, ...options].map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className={cx(
            "min-h-11 rounded-[3px] px-4 text-[0.9375rem] font-medium ring-1 transition-colors ring-inset",
            value === option ? "bg-navy text-white ring-navy" : "bg-white text-navy ring-concrete-300 hover:ring-navy",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Announces the filtered count to screen readers and shows it on screen. */
export function ResultCount({ shown, total, noun }: { shown: number; total: number; noun: string }) {
  return (
    <p role="status" className="text-[0.9375rem] text-steel">
      Showing {shown} of {total} {noun}
    </p>
  );
}
