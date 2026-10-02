import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import ControlCycleCards from "@/components/planning/ControlCycleCards";
import ProgressMarquee from "@/components/planning/ProgressMarquee";
import { IMAGES } from "@/data/images";
import {
  CONTROL_DOMAINS,
  PLANNING_LEVELS,
  CYCLE_FOUNDATIONS,
  CYCLE_ENABLERS,
  CYCLE_OUTCOMES,
  PROGRESS_STEPS,
  DATA_FLOW,
  OUTPUTS_REPORTS,
  REPORTING_PRINCIPLES,
} from "@/data/content/planning";

export const metadata: Metadata = {
  title: "Planning & Controls — Vinara Infra LLP",
  description: "A six-level planning hierarchy and an integrated control cycle from master programme to daily execution.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";
const noCaption = (img: (typeof IMAGES)[string]) => ({ ...img, caption: undefined });

export default function PlanningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#0f2b57]">
        <Image
          src={IMAGES.planningSchedule.src ?? ""}
          alt={IMAGES.planningSchedule.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2b57]/90 via-[#0f2b57]/70 to-[#0f2b57]/30" />
        <div className="relative mx-auto flex h-full w-full max-w-[1680px] flex-col justify-center gap-10 px-4 pt-24 sm:px-6 lg:px-8 lg:pt-0">
          <div className="lg:w-7/12">
            <p className={`${eyebrow} flex items-center gap-3 text-[#7fb4e8]`}>
              <span className="h-px w-10 bg-[#7fb4e8]" />
              Planning &amp; controls
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-white md:text-6xl">
              One plan. One direction.
              <span className="block text-[#7fb4e8]">One source of truth.</span>
            </h1>
            <p className="mt-4 max-w-[54ch] text-body-l text-white/80">
              People, processes and technology, integrated into a single real-time view of the project.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#cycle"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-body font-semibold text-[#0f2b57] transition hover:bg-[#7fb4e8] hover:text-white"
              >
                See the control cycle <ArrowUpRight size={18} />
              </a>
              <a
                href="#progress"
                className="rounded-full border border-white/40 px-7 py-3 text-body font-semibold text-white transition hover:border-white"
              >
                Progress measurement
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 border-t border-white/20 pt-6">
              {[
                { v: String(CONTROL_DOMAINS.length), l: "control domains" },
                { v: String(PLANNING_LEVELS.length), l: "planning levels" },
                { v: String(PROGRESS_STEPS.length), l: "progress steps" },
              ].map((s, i) => (
                <div key={s.l} className={i > 0 ? "border-l border-white/20 pl-8" : "pr-8"}>
                  <dd className="tabular font-display text-3xl font-bold text-white">{s.v}</dd>
                  <dt className="mt-1 text-caption text-white/70">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="absolute bottom-8 right-4 rounded-2xl bg-white p-5 shadow-xl sm:right-6 lg:right-8">
          <p className={`${eyebrow} text-[#5a6b84]`}>Data flow</p>
          <p className="mt-1 font-display text-body font-bold text-[#0f2b57]">{DATA_FLOW.slice(0, 3).join(" → ")}</p>
        </div>
      </section>

      {/* Control cycle */}
      <section id="cycle" className="bg-white py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} pl-1 text-[#3e86d0]`}>Closed-loop control</p>
          <h2 className="mt-3 pl-1 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">The control cycle</h2>
          <ControlCycleCards />
        </div>
        <Container className="mt-12">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#0f2b57]/15 md:grid-cols-3">
            {[
              { l: "Foundations", items: CYCLE_FOUNDATIONS },
              { l: "Enablers", items: CYCLE_ENABLERS },
              { l: "Outcomes", items: CYCLE_OUTCOMES },
            ].map((g) => (
              <div key={g.l} className="bg-[#f2f7fc] p-6">
                <p className={`${eyebrow} text-[#3e86d0]`}>{g.l}</p>
                <p className="mt-3 text-body text-[#0f2b57]">{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Progress measurement */}
      <section id="progress" className="bg-[#f2f7fc] py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>Progress measurement</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            From site execution to management decision.
          </h2>
        </div>
        <ProgressMarquee />
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className="mt-6 text-body text-[#5a6b84]">
            <span className="font-semibold text-[#0f2b57]">Data flow:</span> {DATA_FLOW.join(" → ")}
          </p>
        </div>
      </section>

      {/* Outputs & principles */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="overflow-hidden rounded-2xl lg:col-span-5">
            <SiteImage slot="planning-outputs" image={noCaption(IMAGES.planningOutputs)} ratio="4/3" className="rounded-2xl border-0" />
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-7">
            <div>
              <p className={`${eyebrow} text-[#3e86d0]`}>Outputs &amp; reports</p>
              <ul className="mt-4 divide-y divide-[#0f2b57]/10 border-y border-[#0f2b57]/10">
                {OUTPUTS_REPORTS.map((o) => (
                  <li key={o} className="flex items-start gap-3 py-3 text-body text-[#0f2b57]">
                    <Check size={16} className="mt-1 shrink-0 text-[#3e86d0]" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${eyebrow} text-[#3e86d0]`}>Principles</p>
              <div className="mt-4 space-y-5">
                {REPORTING_PRINCIPLES.map((p) => (
                  <div key={p.title} className="border-l-2 border-[#3e86d0] pl-4">
                    <h3 className="font-display text-body-l font-bold text-[#0f2b57]">{p.title}</h3>
                    <p className="mt-1 text-caption text-[#5a6b84]">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
