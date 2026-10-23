import { Check } from "@/components/icons";
import { cx } from "@/components/ui";
import { steps } from "@/lib/quote";

/** Progress through the planner. The current step carries `aria-current="step"`. */
export function StepIndicator({ current }: { current: number }) {
  return (
    <ol aria-label="Steps" className="grid grid-cols-4 gap-1 lg:grid-cols-1 lg:gap-0 lg:border-t-2 lg:border-navy">
      {steps.map((s, i) => (
        <li
          key={s.title}
          aria-current={i === current ? "step" : undefined}
          className={cx(
            "border-t-4 pt-2 text-[0.8125rem] lg:flex lg:items-center lg:gap-4 lg:border-t-0 lg:border-b lg:rule lg:py-4 lg:text-base",
            i === current ? "border-red font-semibold" : i < current ? "border-navy" : "border-concrete-300 text-steel",
          )}
        >
          <span className="block mono-label lg:w-6">
            {i < current ? (
              <>
                <Check className="text-base text-red" />
                <span className="sr-only">Completed: </span>
              </>
            ) : (
              String(i + 1).padStart(2, "0")
            )}
          </span>
          <span className="max-lg:sr-only">{s.title}</span>
        </li>
      ))}
    </ol>
  );
}
