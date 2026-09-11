"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Calendar, Building2, Warehouse, LandPlot, IndianRupee, Boxes, type LucideIcon } from "lucide-react";

const STATS: { value: number; plus: boolean; unit: string; locale: string; label: string; icon: LucideIcon }[] = [
  { value: 37, plus: false, unit: " yrs", locale: "en-IN", label: "Civil Engineering Legacy", icon: Calendar },
  { value: 50, plus: true, unit: "", locale: "en-IN", label: "APCC Projects Delivered", icon: Building2 },
  { value: 2224000, plus: true, unit: " sq.ft", locale: "en-US", label: "Warehousing Under Delivery", icon: Warehouse },
  { value: 160, plus: false, unit: " acres", locale: "en-IN", label: "AGP Park Footprint", icon: LandPlot },
  { value: 150, plus: true, unit: " Cr", locale: "en-IN", label: "AGP Program Value (₹)", icon: IndianRupee },
  { value: 8, plus: false, unit: "", locale: "en-IN", label: "Active Warehousing Blocks", icon: Boxes },
];

function formatNum(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value));
}

function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const Icon = stat.icon;

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
    <div className="group relative overflow-hidden rounded-2xl border border-[#E3EAF4] bg-white p-8 transition-colors hover:border-blue-400">
      <span className="absolute -right-4 -top-4 text-8xl font-display font-bold text-[#F3F6FB] transition-colors group-hover:text-blue-50" aria-hidden>
        {formatNum(stat.value, stat.locale).replace(/[^0-9]/g, "").slice(0, 3)}
      </span>
      <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <span ref={ref} className="tabular relative mt-6 block text-display-m font-display font-bold text-ink">
        {formatNum(0, stat.locale)}
        {stat.plus ? "+" : ""}
        {stat.unit}
      </span>
      <p className="relative mt-2 text-caption font-medium uppercase tracking-[0.08em] text-grey-500">{stat.label}</p>
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
