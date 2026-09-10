"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

function formatIN(value: number, decimals: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function StatBlock({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  context,
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration: 1.2,
      ease: "power2.out",
      onUpdate() {
        el.textContent = `${prefix}${formatIN(counter.val, decimals)}${suffix}`;
      },
      scrollTrigger: { trigger: el, once: true },
    });
  }, { scope: ref });

  return (
    <div className={`border-t border-navy-500 pt-4 ${className}`}>
      <span
        ref={ref}
        className="tabular block text-data-xl font-display text-orange-500"
      >
        {prefix}
        {formatIN(0, decimals)}
        {suffix}
      </span>
      <p className="mt-2 text-caption uppercase tracking-[0.08em] text-grey-300">{label}</p>
      {context ? <p className="mt-1 text-caption text-grey-500">{context}</p> : null}
    </div>
  );
}
