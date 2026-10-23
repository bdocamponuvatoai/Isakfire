import { reviewGroups, SALES_EMAIL, type QuoteDraft } from "@/lib/quote";
import { quoteOptions } from "./options";

/** Final step: a read-only summary. Says plainly that nothing has been sent. */
export function ReviewStep({ draft }: { draft: QuoteDraft }) {
  return (
    <div>
      <p className="max-w-[56ch] text-steel">
        Check the details below. “Open email draft” starts a message to {SALES_EMAIL} in your own email app, ready for
        you to review and send.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviewGroups(draft, quoteOptions).map((group) => (
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
  );
}
