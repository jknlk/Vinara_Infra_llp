"use client";

import { useMemo, useState } from "react";
import { INSPECTION_ACTIVITIES } from "@/data/content/qualitySafety";

export default function InspectionGrid() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INSPECTION_ACTIVITIES;
    return INSPECTION_ACTIVITIES.filter(
      (a) => a.activity.toLowerCase().includes(q) || a.checked.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by activity — e.g. concreting, MEP, façade"
        className="w-full max-w-md rounded-full border border-navy-500 bg-navy-900 px-5 py-2.5 text-caption text-ink placeholder:text-grey-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <div key={a.activity} className="rounded-[4px] border border-navy-500 bg-navy-900 p-5">
            <h3 className="text-body-l font-display font-bold text-ink">{a.activity}</h3>
            <p className="mt-2 text-caption text-grey-300">{a.checked}</p>
          </div>
        ))}
        {filtered.length === 0 ? <p className="text-body text-grey-300">No matching activity.</p> : null}
      </div>
    </div>
  );
}
