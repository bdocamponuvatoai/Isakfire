import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/components/ui";
import type { QuoteErrors, QuoteField } from "@/lib/quote";

const inputClass = cx(
  "min-h-12 w-full rounded-[3px] bg-white px-4 ring-1 ring-concrete-300 ring-inset placeholder:text-steel",
  "focus:ring-2 focus:ring-blue focus:outline-none aria-invalid:ring-2 aria-invalid:ring-red",
);

export const fieldId = (field: QuoteField) => `quote-${field}`;
export const errorId = (field: QuoteField) => `quote-${field}-error`;
const hintId = (field: QuoteField) => `quote-${field}-hint`;

/** Inline error, referenced by its field's `aria-describedby`. */
export function FieldError({ field, errors }: { field: QuoteField; errors: QuoteErrors }) {
  const message = errors[field];
  return message ? (
    <p id={errorId(field)} className="flex items-start gap-2 text-[0.9375rem] font-medium text-red">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-red" />
      {message}
    </p>
  ) : null;
}

type FieldBase = {
  field: QuoteField;
  label: string;
  errors: QuoteErrors;
  optional?: boolean;
  hint?: string;
  className?: string;
};

type ControlProps = {
  id: string;
  name: QuoteField;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

/** Label, optional hint and inline error around one control, with the ARIA wiring between them. */
function FieldShell({
  field,
  label,
  errors,
  optional,
  hint,
  className,
  children,
}: FieldBase & { children: (props: ControlProps) => ReactNode }) {
  const describedBy = [hint && hintId(field), errors[field] && errorId(field)].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cx("grid content-start gap-2", className)}>
      <label htmlFor={fieldId(field)} className="font-semibold">
        {label} {optional ? <span className="font-normal text-steel">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={hintId(field)} className="-mt-1 text-[0.875rem] text-steel">
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

type ValueProps = { value: string; onValue: (value: string) => void };

export function TextField({
  field,
  label,
  errors,
  optional,
  hint,
  className,
  value,
  onValue,
  ...input
}: FieldBase & ValueProps & Omit<ComponentProps<"input">, keyof ControlProps | "value" | "onChange" | "className">) {
  return (
    <FieldShell {...{ field, label, errors, optional, hint, className }}>
      {(control) => (
        <input {...input} {...control} value={value} onChange={(e) => onValue(e.target.value)} className={inputClass} />
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  field,
  label,
  errors,
  optional,
  hint,
  className,
  value,
  onValue,
  ...textarea
}: FieldBase & ValueProps & Omit<ComponentProps<"textarea">, keyof ControlProps | "value" | "onChange" | "className">) {
  return (
    <FieldShell {...{ field, label, errors, optional, hint, className }}>
      {(control) => (
        <textarea
          {...textarea}
          {...control}
          value={value}
          onChange={(e) => onValue(e.target.value)}
          className={cx(inputClass, "py-3")}
        />
      )}
    </FieldShell>
  );
}

type Option = string | { value: string; label: string };

export function SelectField({
  field,
  label,
  errors,
  optional,
  hint,
  className,
  value,
  onValue,
  options,
  placeholder,
}: FieldBase & ValueProps & { options: readonly Option[]; placeholder?: string }) {
  return (
    <FieldShell {...{ field, label, errors, optional, hint, className }}>
      {(control) => (
        <select {...control} value={value} onChange={(e) => onValue(e.target.value)} className={inputClass}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) =>
            typeof o === "string" ? (
              <option key={o}>{o}</option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
      )}
    </FieldShell>
  );
}
