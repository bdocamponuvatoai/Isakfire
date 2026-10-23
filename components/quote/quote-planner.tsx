"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Copy } from "@/components/icons";
import { buttonClass, ButtonArrow, cx } from "@/components/ui";
import {
  contactPreferences,
  emptyDraft,
  HELP_DECIDE,
  LAST_STEP,
  mailtoHref,
  OTHER_REGION,
  presetsFromSearch,
  propertyTypes,
  quoteMessage,
  SALES_EMAIL,
  stageOptions,
  steps,
  validateStep,
  type QuoteDraft,
  type QuoteErrors,
  type QuoteField,
} from "@/lib/quote";
import { business } from "@/lib/site";
import { errorId, FieldError, fieldId, SelectField, TextAreaField, TextField } from "./fields";
import { quoteOptions } from "./options";
import { ReviewStep } from "./review-step";
import { StepIndicator } from "./step-indicator";

type TextKey = Exclude<QuoteField, "services">;

const regionOptions = [
  ...quoteOptions.regions.map((r) => ({ value: r.abbr, label: r.region })),
  { value: OTHER_REGION, label: "Other / discuss coverage" },
];

/**
 * Four-step quote planner. All logic lives in lib/quote.ts; this component
 * holds the draft, moves focus between steps and renders the fields.
 */
function QuotePlanner({ presets }: { presets?: Partial<QuoteDraft> }) {
  const [draft, setDraft] = useState<QuoteDraft>(() => ({ ...emptyDraft(), ...presets }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const formId = useId();

  // Move focus to the new step's heading, but not on first render.
  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus();
  }, [step]);

  function update<K extends QuoteField>(field: K, value: QuoteDraft[K]) {
    setDraft((d) => ({ ...d, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  /** Props shared by every text and select field. */
  const bind = (field: TextKey) => ({ field, errors, value: draft[field], onValue: (v: string) => update(field, v) });

  function goTo(next: number) {
    moved.current = true;
    setErrors({});
    setStatus("");
    setStep(next);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateStep(step, draft);
    const first = (steps[step]?.fields as readonly QuoteField[] | undefined)?.find((f) => found[f]);
    if (!first) {
      goTo(step + 1);
      return;
    }
    // Commit the error state first so the field is announced with its message.
    flushSync(() => setErrors(found));
    const target =
      first === "services"
        ? document.querySelector<HTMLInputElement>(`#${CSS.escape(formId)} input[name="services"]`)
        : document.getElementById(fieldId(first));
    target?.focus();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(quoteMessage(draft, quoteOptions));
      setStatus(`Copied. Paste it into an email to ${SALES_EMAIL}.`);
    } catch {
      setStatus("Your browser didn’t allow copying. Use “Open email draft”, or select the summary and copy it.");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <StepIndicator current={step} />
        <div className="mt-10 hidden border-t rule pt-6 text-[0.9375rem] lg:block">
          <p className="text-steel">Rather talk it through?</p>
          <p className="mt-2">
            <a href={business.phone.href} className="font-display text-[1.75rem] font-bold tabular-nums hover:text-red">
              {business.phone.display}
            </a>
          </p>
          <a href={`mailto:${SALES_EMAIL}`} className="font-semibold underline underline-offset-4">
            {SALES_EMAIL}
          </a>
        </div>
      </aside>

      <form id={formId} noValidate onSubmit={onSubmit} className="min-w-0" aria-labelledby={`${formId}-heading`}>
        <p className="mono-label text-red">
          Step {String(step + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
        </p>
        <h2 id={`${formId}-heading`} ref={heading} tabIndex={-1} className="mt-3 text-title focus:outline-none">
          {steps[step]?.heading}
        </h2>

        <div className="mt-8 border-t-2 border-navy pt-8">
          {step === 0 ? (
            <div className="grid gap-8">
              <ServicePicker
                selected={draft.services}
                invalid={Boolean(errors.services)}
                errors={errors}
                onChange={(services) => update("services", services)}
              />
              <SelectField {...bind("stage")} label="Project stage" options={stageOptions} />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <SelectField
                {...bind("propertyType")}
                label="Property type"
                options={propertyTypes}
                placeholder="Select a property type"
              />
              <SelectField
                {...bind("region")}
                label="State or province"
                options={regionOptions}
                placeholder="Select a location"
              />
              <TextField
                {...bind("address")}
                label="Property address"
                optional
                autoComplete="street-address"
                className="sm:col-span-2"
              />
              <TextField {...bind("size")} label="Approximate square footage" optional inputMode="numeric" />
              <TextField {...bind("floors")} label="Number of floors" optional inputMode="numeric" />
              <TextAreaField
                {...bind("message")}
                label="Anything else we should know?"
                optional
                hint="Scope, target dates or service questions. You can attach photos and drawings to the email."
                rows={5}
                maxLength={2000}
                className="sm:col-span-2"
              />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField {...bind("firstName")} label="First name" autoComplete="given-name" maxLength={80} />
              <TextField {...bind("lastName")} label="Last name" autoComplete="family-name" maxLength={80} />
              <TextField
                {...bind("company")}
                label="Company or organisation"
                optional
                autoComplete="organization"
                maxLength={120}
                className="sm:col-span-2"
              />
              <TextField {...bind("email")} label="Email" type="email" autoComplete="email" maxLength={150} />
              <TextField {...bind("phone")} label="Phone" type="tel" autoComplete="tel" maxLength={30} />
              <SelectField {...bind("preferred")} label="Preferred contact" options={contactPreferences} />
            </div>
          ) : null}

          {step === LAST_STEP ? <ReviewStep draft={draft} /> : null}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t rule pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonClass("ghost-dark")}>
              <ArrowLeft className="text-lg" /> Back
            </button>
          ) : null}
          {step < LAST_STEP ? (
            <button type="submit" className={buttonClass("red", "sm:ml-auto")}>
              Continue <ButtonArrow icon={<ArrowRight />} />
            </button>
          ) : (
            <>
              <button type="button" onClick={copy} className={buttonClass("ghost-dark", "sm:ml-auto")}>
                <Copy className="text-lg" /> Copy request
              </button>
              <a
                href={mailtoHref(draft, quoteOptions)}
                onClick={() =>
                  setStatus("Your email app should open with the draft. Nothing is sent until you press send there.")
                }
                className={buttonClass("red")}
              >
                Open email draft <ArrowUpRight className="text-lg" />
              </a>
            </>
          )}
        </div>
        <p role="status" className="mt-4 min-h-6 text-[0.9375rem] font-medium">
          {status}
        </p>
      </form>
    </div>
  );
}

/** Checkbox group for step one. Errors are announced through the fieldset's description. */
function ServicePicker({
  selected,
  invalid,
  errors,
  onChange,
}: {
  selected: readonly string[];
  invalid: boolean;
  errors: QuoteErrors;
  onChange: (services: string[]) => void;
}) {
  const choices = [...quoteOptions.services, { slug: HELP_DECIDE, name: "Help me decide" }];
  return (
    <fieldset aria-describedby={invalid ? errorId("services") : undefined}>
      <legend className="font-semibold">Services to discuss</legend>
      <p className="mt-1 text-[0.875rem] text-steel">Select all that apply.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {choices.map((s) => {
          const checked = selected.includes(s.slug);
          return (
            <label
              key={s.slug}
              className={cx(
                "flex min-h-13 items-center gap-3 rounded-[3px] bg-white px-4 py-3 ring-1 transition-colors ring-inset",
                checked ? "ring-2 ring-navy" : invalid ? "ring-red" : "ring-concrete-300 hover:ring-navy",
              )}
            >
              <input
                type="checkbox"
                name="services"
                value={s.slug}
                checked={checked}
                aria-invalid={invalid || undefined}
                onChange={(event) =>
                  onChange(event.target.checked ? [...selected, s.slug] : selected.filter((x) => x !== s.slug))
                }
                className="size-5 shrink-0 accent-navy"
              />
              <span className="font-medium">{s.name}</span>
            </label>
          );
        })}
      </div>
      <div className="mt-3">
        <FieldError field="services" errors={errors} />
      </div>
    </fieldset>
  );
}

/** Reads `?service=` and `?region=` presets; rendered inside a Suspense boundary. */
export function QuotePlannerFromUrl() {
  const params = useSearchParams();
  const query = params.toString();
  const presets = useMemo(() => presetsFromSearch(new URLSearchParams(query), quoteOptions), [query]);
  return <QuotePlanner key={query} presets={presets} />;
}
