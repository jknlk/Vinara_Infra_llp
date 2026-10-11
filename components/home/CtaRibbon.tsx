"use client";

import Link from "next/link";
import JellyRibbon, { RIBBON_WIDTH } from "@/components/ui/JellyRibbon";

// An S: the ribbon crests on the left, crosses the middle and dips on the right.
const SWING = 44;
const sCurve = (x: number) => -SWING * Math.sin((2 * Math.PI * x) / RIBBON_WIDTH);

export default function CtaRibbon({ href }: { href: string }) {
  return (
    // Only the band takes the pointer: the box around it lies over the
    // neighbouring section.
    <Link href={href} className="group/ribbon pointer-events-none relative block overflow-x-clip">
      <span className="sr-only">Have a project to build like these? Contact us</span>
      <JellyRibbon
        band={84}
        sway={16}
        breath={6}
        rest={sCurve}
        repeats={6}
        speed={36}
        stitched
        className="drop-shadow-[0_14px_18px_rgba(0,40,120,0.22)]"
        bandClassName="pointer-events-auto fill-blue-600 transition-colors group-hover/ribbon:fill-ink"
        textClassName="fill-white font-display text-[40px] font-bold"
      >
        Have a project to build <tspan className="fill-blue-200">like these?</tspan>
        {"   ✦   "}
        Contact us <tspan className="fill-blue-200">→</tspan>
        {"   ✦   "}
      </JellyRibbon>
    </Link>
  );
}
