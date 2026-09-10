"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { value: 37, plus: false, unit: " yrs", locale: "en-IN", label: "Civil Engineering Legacy" },
  { value: 50, plus: true, unit: "", locale: "en-IN", label: "APCC Projects Delivered" },
  { value: 2224000, plus: true, unit: " sq.ft", locale: "en-US", label: "Warehousing Under Delivery" },
  { value: 160, plus: false, unit: " acres", locale: "en-IN", label: "AGP Park Footprint" },
  { value: 150, plus: true, unit: " Cr", locale: "en-IN", label: "AGP Program Value (₹)" },
  { value: 8, plus: false, unit: "", locale: "en-IN", label: "Active Warehousing Blocks" },
] as const;

function formatNum(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value));
}

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: stat.value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate() {
        el.textContent = `${formatNum(counter.val, stat.locale)}${stat.plus ? "+" : ""}${stat.unit}`;
      },
      scrollTrigger: { trigger: el, once: true },
    });
  }, { scope: ref });

  return (
    <div className="rounded-2xl border border-[#E3EAF4] bg-white p-8">
      <span ref={ref} className="tabular block text-display-m font-display font-bold text-blue-600">
        {formatNum(0, stat.locale)}
        {stat.plus ? "+" : ""}
        {stat.unit}
      </span>
      <p className="mt-3 text-caption uppercase tracking-[0.08em] text-grey-500">{stat.label}</p>
    </div>
  );
}

export default function StatsShowcase() {
  return (
    <section className="bg-white pb-12 pt-24">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <span className="h-px w-6 bg-blue-500" />
            By the Numbers
          </div>
          <h2 className="mt-4 text-display-m font-display leading-[1.1]">
            <span className="text-ink">Scale that speaks </span>
            <span className="text-blue-600">for itself.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
