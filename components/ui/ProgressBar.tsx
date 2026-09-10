"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ProgressBar({
  percent,
  color = "var(--color-sky-400)",
  label,
  className = "",
}: {
  percent: number;
  color?: string;
  label?: string;
  className?: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!fillRef.current) return;
    gsap.fromTo(
      fillRef.current,
      { scaleX: 0 },
      {
        scaleX: percent / 100,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: fillRef.current, once: true },
      }
    );
  }, { scope: fillRef, dependencies: [percent] });

  return (
    <div className={className}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-caption text-grey-300">
          <span>{label}</span>
          <span className="tabular text-white">{percent}%</span>
        </div>
      ) : null}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <div
          ref={fillRef}
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: color, transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
