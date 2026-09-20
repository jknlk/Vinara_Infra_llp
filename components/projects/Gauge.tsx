"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Gauge({
  percent,
  label,
  color = "var(--color-orange-500)",
  size = 160,
}: {
  percent: number;
  label: string;
  color?: string;
  size?: number;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;

  useGSAP(() => {
    if (!circleRef.current || !valueRef.current) return;
    const target = { v: 0 };
    gsap.to(target, {
      v: percent,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: circleRef.current, once: true },
      onUpdate: () => {
        const offset = circumference - (target.v / 100) * circumference;
        circleRef.current!.style.strokeDashoffset = String(offset);
        valueRef.current!.textContent = `${Math.round(target.v)}%`;
      },
    });
  }, { scope: circleRef, dependencies: [percent] });

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(15,43,87,0.12)" strokeWidth={10} />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <span ref={valueRef} className="tabular absolute inset-0 grid place-items-center text-display-m font-display text-ink">
          0%
        </span>
      </div>
      <p className="mt-4 text-caption uppercase tracking-[0.08em] text-grey-300">{label}</p>
    </div>
  );
}
