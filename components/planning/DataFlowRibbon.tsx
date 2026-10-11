"use client";

import JellyRibbon, { RIBBON_WIDTH } from "@/components/ui/JellyRibbon";
import { DATA_FLOW } from "@/data/content/planning";

// Spaces inside SVG text collapse, so the gaps are non-breaking ones.
const NBSP = " ";

// An S: the ribbon crests on the left, crosses the middle and dips on the right.
const SWING = 44;
const sCurve = (x: number) => -SWING * Math.sin((2 * Math.PI * x) / RIBBON_WIDTH);

export default function DataFlowRibbon() {
  return (
    <div className="pointer-events-none relative overflow-x-clip">
      {/* The steps loop along the ribbon, where they are hidden from assistive
          tech. This is the copy it reads. */}
      <div className="sr-only">
        <p>Data flow</p>
        <ol>
          {DATA_FLOW.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      </div>
      <JellyRibbon
        band={84}
        sway={16}
        breath={6}
        rest={sCurve}
        repeats={3}
        speed={36}
        stitched
        className="drop-shadow-[0_14px_18px_rgba(0,40,120,0.22)]"
        bandClassName="fill-blue-600"
        textClassName="fill-white font-display text-[36px] font-bold"
      >
        <tspan className="fill-blue-200 uppercase tracking-[0.14em]" style={{ fontSize: "0.55em" }}>
          Data{NBSP}flow
        </tspan>
        {NBSP.repeat(3)}
        {DATA_FLOW.map((d, i) => (
          <tspan key={d}>
            <tspan className="tabular fill-blue-200" style={{ fontSize: "0.6em" }}>
              {String(i + 1).padStart(2, "0")}
              {NBSP}
            </tspan>
            {d}
            {i < DATA_FLOW.length - 1 && (
              <tspan className="fill-blue-200">
                {NBSP.repeat(2)}→{NBSP.repeat(2)}
              </tspan>
            )}
          </tspan>
        ))}
        {`${NBSP.repeat(3)}✦${NBSP.repeat(3)}`}
      </JellyRibbon>
    </div>
  );
}
