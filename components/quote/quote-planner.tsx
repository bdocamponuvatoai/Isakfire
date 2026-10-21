"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy } from "@/components/icons";
import { buttonClass, ButtonArrow, cx } from "@/components/ui";
import { services } from "@/lib/content";
import {
  contactPreferences,
  emptyDraft,
  HELP_DECIDE,
  mailtoHref,
  OTHER_REGION,
  presetsFromSearch,
  propertyTypes,
  quoteMessage,
  reviewGroups,
  SALES_EMAIL,
  stageOptions,
  steps,
  validateStep,
  type QuoteDraft,
  type QuoteErrors,
  type QuoteField,
  type QuoteOptions,
} from "@/lib/quote";
import { business, locations } from "@/lib/site";

const options: QuoteOptions = {
  services: services.map(({ slug, name }) => ({ slug, name })),
  regions: locations.map(({ abbr, region }) => ({ abbr, region })),
};

const inputClass = cx(
  "min-h-12 w-full rounded-[3px] bg-white px-4 ring-1 ring-concrete-300 ring-inset placeholder:text-steel",
  "focus:ring-2 focus:ring-blue focus:outline-none aria-invalid:ring-2 aria-invalid:ring-red",
);

const fieldId = (field: QuoteField) => `quote-${field}`;
const errorId = (field: QuoteField) => `quote-${field}-error`;

function FieldError({ field, errors }: { field: QuoteField; errors: QuoteErrors }) {
  const message = errors[field];
  return message ? (
    <p id={errorId(field)} className="flex items-start gap-2 text-[0.9375rem] font-medium text-red">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-red" />
      {message}
    </p>
  ) : null;
}

function Field({
  field,
  label,
  optional,
  errors,
  hint,
  children,
}: {
  field: QuoteField;
  label: string;
  optional?: boolean;
  errors: QuoteErrors;
  hint?: string;
  children: (props: { id: string; name: QuoteField; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode;
}) {
  const hintId = `quote-${field}-hint`;
  const describedBy = [hint && hintId, errors[field] && errorId(field)].filter(Boolean).join(" ") || undefined;
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={fieldId(field)} className="font-semibold">
        {label} {optional ? <span className="font-normal text-steel">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="-mt-1 text-[0.875rem] text-steel">
          {hint}
        </p>
      ) : null}
      {children({
        id: fieldId(field),
        name: field,
        "aria-invalid": errors[field] ? true : undefined,
        "aria-describedby": describedBy,
      })}
      <FieldError field={field} errors={errors} />
    </div>
  );
}

export function QuotePlanner({ presets }: { presets?: Partial<QuoteDraft> }) {
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
    if (first) {
      // Commit the error state first so the field is announced with its message.
      flushSync(() => setErrors(found));
      const target =
        first === "services"
          ? document.querySelector<HTMLInputElement>(`#${CSS.escape(formId)} input[name="services"]`)
          : document.getElementById(fieldId(first));
      target?.focus();
      return;
    }
    goTo(step + 1);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(quoteMessage(draft, options));
      setStatus(`Copied. Paste it into an email to ${SALES_EMAIL}.`);
    } catch {
      setStatus("Your browser didn’t allow copying. Use “Open email draft”, or select the summary and copy it.");
    }
  }

  const toggleService = (slug: string, checked: boolean) =>
    update("services", checked ? [...draft.services, slug] : draft.services.filter((s) => s !== slug));

  const servicesInvalid = Boolean(errors.services);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <ol aria-label="Steps" className="grid grid-cols-4 gap-1 lg:grid-cols-1 lg:gap-0 lg:border-t-2 lg:border-navy">
          {steps.map((s, i) => (
            <li
              key={s.title}
              aria-current={i === step ? "step" : undefined}
              className={cx(
                "border-t-4 pt-2 text-[0.8125rem] lg:flex lg:items-center lg:gap-4 lg:border-t-0 lg:border-b lg:rule lg:py-4 lg:text-base",
                i === step ? "border-red font-semibold" : i < step ? "border-navy" : "border-concrete-300 text-steel",
              )}
            >
              <span className="block mono-label lg:w-6">
                {i < step ? (
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
          {step === 0 && "What can we help with?"}
          {step === 1 && "Tell us about the property."}
          {step === 2 && "Who should we contact?"}
          {step === 3 && "Review your request."}
        </h2>

        <div className="mt-8 border-t-2 border-navy pt-8">
          {step === 0 ? (
            <div className="grid gap-8">
              <fieldset aria-describedby={servicesInvalid ? errorId("services") : undefined}>
                <legend className="font-semibold">Services to discuss</legend>
                <p className="mt-1 text-[0.875rem] text-steel">Select all that apply.</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[...options.services, { slug: HELP_DECIDE, name: "Help me decide" }].map((s) => {
                    const checked = draft.services.includes(s.slug);
                    return (
                      <label
                        key={s.slug}
                        className={cx(
                          "flex min-h-13 items-center gap-3 rounded-[3px] bg-white px-4 py-3 ring-1 transition-colors ring-inset",
                          checked
                            ? "ring-2 ring-navy"
                            : servicesInvalid
                              ? "ring-red"
                              : "ring-concrete-300 hover:ring-navy",
                        )}
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={s.slug}
                          checked={checked}
                          aria-invalid={servicesInvalid || undefined}
                          onChange={(event) => toggleService(s.slug, event.target.checked)}
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
              <Field field="stage" label="Project stage" errors={errors}>
                {(props) => (
                  <select
                    {...props}
                    value={draft.stage}
                    onChange={(e) => update("stage", e.target.value)}
                    className={inputClass}
                  >
                    {stageOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <Field field="propertyType" label="Property type" errors={errors}>
                {(props) => (
                  <select
                    {...props}
                    value={draft.propertyType}
                    onChange={(e) => update("propertyType", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a property type</option>
                    {propertyTypes.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                )}
              </Field>
              <Field field="region" label="State or province" errors={errors}>
                {(props) => (
                  <select
                    {...props}
                    value={draft.region}
                    onChange={(e) => update("region", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a location</option>
                    {options.regions.map((r) => (
                      <option key={r.abbr} value={r.abbr}>
                        {r.region}
                      </option>
                    ))}
                    <option value={OTHER_REGION}>Other / discuss coverage</option>
                  </select>
                )}
              </Field>
              <div className="sm:col-span-2">
                <Field field="address" label="Property address" optional errors={errors}>
                  {(props) => (
                    <input
                      {...props}
                      autoComplete="street-address"
                      value={draft.address}
                      onChange={(e) => update("address", e.target.value)}
                      className={inputClass}
                    />
                  )}
                </Field>
              </div>
              <Field field="size" label="Approximate square footage" optional errors={errors}>
                {(props) => (
                  <input
                    {...props}
                    inputMode="numeric"
                    value={draft.size}
                    onChange={(e) => update("size", e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
              <Field field="floors" label="Number of floors" optional errors={errors}>
                {(props) => (
                  <input
                    {...props}
                    inputMode="numeric"
                    value={draft.floors}
                    onChange={(e) => update("floors", e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
              <div className="sm:col-span-2">
                <Field
                  field="message"
                  label="Anything else we should know?"
                  optional
                  errors={errors}
                  hint="Scope, target dates or service questions. You can attach photos and drawings to the email."
                >
                  {(props) => (
                    <textarea
                      {...props}
                      rows={5}
                      maxLength={2000}
                      value={draft.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={cx(inputClass, "py-3")}
                    />
                  )}
                </Field>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <Field field="firstName" label="First name" errors={errors}>
                {(props) => (
                  <input
                    {...props}
                    autoComplete="given-name"
                    maxLength={80}
                    value={draft.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
              <Field field="lastName" label="Last name" errors={errors}>
                {(props) => (
                  <input
                    {...props}
                    autoComplete="family-name"
                    maxLength={80}
                    value={draft.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
              <div className="sm:col-span-2">
                <Field field="company" label="Company or organisation" optional errors={errors}>
                  {(props) => (
                    <input
                      {...props}
                      autoComplete="organization"
                      maxLength={120}
                      value={draft.company}
                      onChange={(e) => update("company", e.target.value)}
                      className={inputClass}
                    />
                  )}
                </Field>
              </div>
              <Field field="email" label="Email" errors={errors}>
                {(props) => (
                  <input
                    {...props}
                    type="email"
                    autoComplete="email"
                    maxLength={150}
                    value={draft.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
              <Field field="phone" label="Phone" errors={errors}>
                {(props) => (
                  <input
                    {...props}
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={draft.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                )}
              </Field>
              <Field field="preferred" label="Preferred contact" errors={errors}>
                {(props) => (
                  <select
                    {...props}
                    value={draft.preferred}
                    onChange={(e) => update("preferred", e.target.value)}
                    className={inputClass}
                  >
                    {contactPreferences.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <p className="max-w-[56ch] text-steel">
                Check the details below. “Open email draft” starts a message to {SALES_EMAIL} in your own email app,
                ready for you to review and send.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {reviewGroups(draft, options).map((group) => (
                  <section key={group.title} className="border-t-2 border-navy bg-white p-5">
                    <h3 className="mono-label text-red">{group.title}</h3>
                    <dl className="mt-4 grid gap-3">
                      {group.entries.map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-[0.8125rem] text-steel">{label}</dt>
                          <dd className="font-medium break-words whitespace-pre-line">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
              <p className="mt-6 rounded-[3px] bg-concrete-100 px-4 py-3 text-[0.9375rem] font-medium">
                Nothing has been sent yet. Your details stay on this page until you send the email yourself.
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t rule pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={buttonClass("ghost-dark")}>
              <ArrowLeft className="text-lg" /> Back
            </button>
          ) : null}
          {step < 3 ? (
            <button type="submit" className={buttonClass("red", "sm:ml-auto")}>
              Continue <ButtonArrow icon={<ArrowRight />} />
            </button>
          ) : (
            <>
              <button type="button" onClick={copy} className={buttonClass("ghost-dark", "sm:ml-auto")}>
                <Copy className="text-lg" /> Copy request
              </button>
              <a
                href={mailtoHref(draft, options)}
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

/** Reads `?service=` and `?region=` presets; rendered inside a Suspense boundary. */
export function QuotePlannerFromUrl() {
  const params = useSearchParams();
  const query = params.toString();
  const presets = useMemo(() => presetsFromSearch(new URLSearchParams(query), options), [query]);
  return <QuotePlanner key={query} presets={presets} />;
}
