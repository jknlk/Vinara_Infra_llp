"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Calendar, Building2, Warehouse, LandPlot, Boxes, type LucideIcon } from "lucide-react";

const STATS: { value: number; plus: boolean; unit: string; locale: string; label: string; icon: LucideIcon; featured?: boolean }[] = [
  { value: 37, plus: false, unit: " yrs", locale: "en-IN", label: "Civil Engineering Legacy", icon: Calendar },
  { value: 50, plus: true, unit: "", locale: "en-IN", label: "APCC Projects Delivered", icon: Building2 },
  { value: 2224000, plus: true, unit: " sq.ft", locale: "en-US", label: "Warehousing Under Delivery", icon: Warehouse, featured: true },
  { value: 160, plus: false, unit: " acres", locale: "en-IN", label: "AGP Park Footprint", icon: LandPlot },
  { value: 8, plus: false, unit: "", locale: "en-IN", label: "Active Warehousing Blocks", icon: Boxes },
];

function formatNum(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value));
}

function StatCard({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
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

  if (stat.featured) {
    return (
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-blue-600/25 via-ink to-ink p-8 transition-all duration-300 hover:border-sky-400/50 lg:col-span-2 lg:row-span-2 lg:p-10">
        <div className="pointer-events-none absolute inset-0 grid-rule opacity-30" />
        <span className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
        <Icon
          size={200}
          strokeWidth={0.75}
          className="pointer-events-none absolute -bottom-8 -right-8 text-white/5 transition-transform duration-700 group-hover:scale-110"
        />

        <div className="relative flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-400/15 text-sky-300 transition-colors group-hover:bg-sky-400 group-hover:text-ink">
            <Icon size={26} strokeWidth={1.75} />
          </span>
          <span className="rounded-full border border-sky-400/30 px-3 py-1 text-label uppercase tracking-[0.08em] text-sky-300">
            Flagship metric
          </span>
        </div>

        <div className="relative mt-10">
          <span
            ref={ref}
            className="tabular block text-display-l font-display font-bold leading-none text-white sm:text-display-xl"
          >
            {formatNum(0, stat.locale)}
            {stat.plus ? "+" : ""}
            {stat.unit}
          </span>
          <p className="mt-3 text-body font-medium uppercase tracking-[0.08em] text-sky-200">{stat.label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:bg-white/[0.07]">
      <span className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-sky-400/0 blur-2xl transition-colors duration-500 group-hover:bg-sky-400/20" />
      <span className="absolute -right-3 -top-3 text-7xl font-display font-bold text-white/5 transition-colors group-hover:text-white/10" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-sky-300 transition-colors group-hover:bg-sky-400 group-hover:text-ink">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <span ref={ref} className="tabular relative mt-5 block text-display-m font-display font-bold text-white">
        {formatNum(0, stat.locale)}
        {stat.plus ? "+" : ""}
        {stat.unit}
      </span>
      <p className="relative mt-2 text-caption font-medium uppercase tracking-[0.08em] text-grey-300">{stat.label}</p>
    </div>
  );
}

export default function StatsShowcase() {
  return (
    <section className="bg-ink pb-12 pt-12">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-300">
            <span className="h-px w-6 bg-sky-400" />
            By the Numbers
          </div>
          <h2 className="mt-4 text-display-m font-display leading-[1.1]">
            <span className="text-white">Scale that speaks </span>
            <span className="text-sky-300">for itself.</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
