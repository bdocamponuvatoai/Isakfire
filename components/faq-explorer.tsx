"use client";

import { useDeferredValue, useState } from "react";
import { FaqItem } from "@/components/faq-item";
import { ALL, FilterBar, ResultCount } from "@/components/filter-bar";
import { Search } from "@/components/icons";
import { faqGroups, faqs } from "@/lib/content";

export function FaqExplorer() {
  const [group, setGroup] = useState(ALL);
  const [query, setQuery] = useState("");
  const term = useDeferredValue(query.trim().toLocaleLowerCase());

  const shown = faqs.filter(
    (faq) =>
      (group === ALL || faq.group === group) &&
      (term === "" || `${faq.group} ${faq.q} ${faq.a}`.toLocaleLowerCase().includes(term)),
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
      <div className="grid content-start gap-8 lg:sticky lg:top-32">
        <label className="grid gap-2">
          <span className="font-semibold">Search questions</span>
          <span className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-steel" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “inspection” or “kitchen”"
              className="min-h-12 w-full rounded-[3px] bg-white pr-4 pl-11 ring-1 ring-concrete-300 ring-inset placeholder:text-steel focus:ring-2 focus:ring-blue focus:outline-none"
            />
          </span>
        </label>
        <FilterBar
          label="Filter by topic"
          options={faqGroups}
          value={group}
          onChange={setGroup}
          className="lg:flex-col lg:items-start"
        />
      </div>

      <div>
        <ResultCount shown={shown.length} total={faqs.length} noun="questions" />
        {shown.length > 0 ? (
          <div className="mt-4 border-t-2 border-navy">
            {shown.map((faq) => (
              <FaqItem key={faq.q} faq={faq} />
            ))}
          </div>
        ) : (
          <p className="mt-4 border-t-2 border-navy pt-6 text-lede text-steel">
            No questions match. Try another word, or call the team.
          </p>
        )}
      </div>
    </div>
  );
}
