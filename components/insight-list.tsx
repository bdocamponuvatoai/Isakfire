"use client";

import { useState } from "react";
import { ALL, FilterBar, ResultCount } from "@/components/filter-bar";
import { InsightCard } from "@/components/insight-card";
import { insightCategories, insights } from "@/lib/content";

export function InsightList() {
  const [category, setCategory] = useState(ALL);
  const shown = insights.filter((i) => category === ALL || i.category === category);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <FilterBar label="Filter articles" options={insightCategories} value={category} onChange={setCategory} />
        <ResultCount shown={shown.length} total={insights.length} noun="articles" />
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((insight) => (
          <li key={insight.title}>
            <InsightCard insight={insight} />
          </li>
        ))}
      </ul>
    </div>
  );
}
