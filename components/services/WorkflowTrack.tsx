"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import JellyRibbon, { RIBBON_WIDTH } from "@/components/ui/JellyRibbon";
import { WORKFLOW } from "@/data/content/services";

const eyebrow = "text-label uppercase tracking-[0.14em]";
const pad = (n: number) => String(n).padStart(2, "0");

// Spaces inside SVG text collapse, so the gaps are non-breaking ones.
const NBSP = "\u00a0";

// An S: the ribbon crests on the left, crosses the middle and dips on the right.
const SWING = 44;
const sCurve = (x: number) => -SWING * Math.sin((2 * Math.PI * x) / RIBBON_WIDTH);

export default function WorkflowTrack() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <p className={`${eyebrow} flex items-center gap-3 text-blue-600`}>
              <span className="h-px w-10 bg-blue-600" />
              Workflow
            </p>
            <h2 className="mt-5 font-display text-display-l text-ink">
              Six stages.
              <span className="block join-shine pb-[0.08em]">One accountable team.</span>
            </h2>
          </div>
          <p className="text-body-l text-grey-500 lg:col-span-4">
            From first drawing to final handover, every stage runs through the same team.
          </p>
        </div>
      </Container>

      <div className="pointer-events-none relative mt-8 overflow-x-clip md:mt-10">
        {/* The stages loop along the ribbon, where they are hidden from assistive
            tech. This is the copy it reads. */}
        <ol className="sr-only">
          {WORKFLOW.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ol>
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
          {WORKFLOW.map((w, i) => (
            <tspan key={w}>
              <tspan className="tabular fill-blue-200" style={{ fontSize: "0.6em" }}>
                {pad(i + 1)}
                {NBSP}
              </tspan>
              {w.replace(/ /g, NBSP)}
              {i < WORKFLOW.length - 1 && (
                <tspan className="fill-blue-200">
                  {NBSP.repeat(2)}→{NBSP.repeat(2)}
                </tspan>
              )}
            </tspan>
          ))}
          {`${NBSP.repeat(3)}✦${NBSP.repeat(3)}`}
        </JellyRibbon>
      </div>

      <Container>
        <div className="mt-8 flex flex-col gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-10">
          <p className="max-w-[24ch] font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
            Tell us what you need built.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-body font-semibold text-white transition-colors hover:bg-ink"
          >
            Get a quote
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
