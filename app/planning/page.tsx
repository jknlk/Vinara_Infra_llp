import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import { IMAGES } from "@/data/images";
import {
  CONTROL_DOMAINS,
  CONTROLS_COMMITMENT,
  PLANNING_LEVELS,
  HIERARCHY_BENEFITS,
  CONTROL_CYCLE,
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
      <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#f2f7fc]">
        <div className="mx-auto flex h-full w-full max-w-[1680px] flex-col justify-center gap-10 px-4 pt-24 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pt-0">
          <div className="lg:w-7/12">
            <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
              <span className="h-px w-10 bg-[#3e86d0]" />
              Planning &amp; controls
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-[#0f2b57] md:text-6xl">
              One plan. One direction.
              <span className="block text-[#3e86d0]">One source of truth.</span>
            </h1>
            <p className="mt-4 max-w-[54ch] text-body-l text-[#5a6b84]">
              People, processes and technology, integrated into a single real-time view of the project.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#hierarchy"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2b57] px-7 py-3 text-body font-semibold text-white transition hover:bg-[#1d5fb0]"
              >
                See the hierarchy <ArrowUpRight size={18} />
              </a>
              <a
                href="#cycle"
                className="rounded-full border border-[#0f2b57]/25 px-7 py-3 text-body font-semibold text-[#0f2b57] transition hover:border-[#0f2b57]"
              >
                Control cycle
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-8 border-t border-[#0f2b57]/15 pt-6">
              {[
                { v: String(CONTROL_DOMAINS.length), l: "control domains" },
                { v: String(PLANNING_LEVELS.length), l: "planning levels" },
                { v: String(PROGRESS_STEPS.length), l: "progress steps" },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="tabular font-display text-3xl font-bold text-[#0f2b57]">{s.v}</dd>
                  <dt className="mt-1 text-caption text-[#5a6b84]">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative lg:w-5/12">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <SiteImage
                slot="planning-hero"
                image={noCaption(IMAGES.planningSchedule)}
                ratio="1/1"
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="rounded-[2rem] border-0"
              />
            </div>
            <div className="absolute -left-6 bottom-6 rounded-2xl bg-white p-5 shadow-xl">
              <p className={`${eyebrow} text-[#5a6b84]`}>Data flow</p>
              <p className="mt-1 font-display text-body font-bold text-[#0f2b57]">{DATA_FLOW.slice(0, 3).join(" → ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls philosophy */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className={`${eyebrow} text-[#3e86d0]`}>Controls philosophy</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57]">Six domains, one view.</h2>
            <p className="mt-4 text-body text-[#5a6b84]">Integrated Project Control across every discipline.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CONTROLS_COMMITMENT.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#0f2b57]/20 px-3 py-1.5 text-caption text-[#0f2b57]"
                >
                  <Check size={13} className="text-[#3e86d0]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#0f2b57]/15 sm:grid-cols-2 lg:col-span-8">
            {CONTROL_DOMAINS.map((d, i) => (
              <div key={d.title} className="bg-[#f2f7fc] p-7">
                <span className="tabular text-caption font-semibold text-[#3e86d0]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-body-l font-bold text-[#0f2b57]">{d.title}</h3>
                <p className="mt-2 text-caption text-[#5a6b84]">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Hierarchy */}
      <section id="hierarchy" className="bg-[#0f2b57] py-20 text-white">
        <Container>
          <p className={`${eyebrow} text-[#7fb6e8]`}>Planning hierarchy</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold md:text-5xl">
            Six levels, from master programme to daily execution.
          </h2>
          <ol className="mt-10 border-t border-white/20">
            {PLANNING_LEVELS.map((lvl) => (
              <li key={lvl.level} className="grid grid-cols-1 gap-2 border-b border-white/20 py-5 md:grid-cols-12 md:items-center md:gap-6">
                <span className="tabular font-display text-2xl font-bold text-[#7fb6e8] md:col-span-1">{lvl.level}</span>
                <h3 className="font-display text-body-l font-bold md:col-span-4">
                  {lvl.title} <span className="text-caption font-normal text-white/60">({lvl.term})</span>
                </h3>
                <p className="text-body text-white/80 md:col-span-4">{lvl.purpose}</p>
                <p className="text-caption text-[#7fb6e8] md:col-span-3 md:text-right">{lvl.output}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-2">
            {HIERARCHY_BENEFITS.map((b) => (
              <span key={b} className="rounded-full border border-white/25 px-4 py-1.5 text-caption text-white/85">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-10 font-display text-2xl font-bold text-[#7fb6e8] md:text-3xl">
            A strong plan at the top creates success at the bottom.
          </p>
        </Container>
      </section>

      {/* Control cycle */}
      <section id="cycle" className="bg-white py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Closed-loop control</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">The control cycle</h2>
          <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {CONTROL_CYCLE.map((stage, i) => (
              <li key={stage.title} className="border-t-2 border-[#3e86d0] pt-4">
                <span className="tabular font-display text-3xl font-bold text-[#3e86d0]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-body-l font-bold text-[#0f2b57]">{stage.title}</h3>
                <p className="mt-1 text-caption text-[#5a6b84]">{stage.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#0f2b57]/15 md:grid-cols-3">
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
      <section className="bg-[#f2f7fc] py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Progress measurement</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            From site execution to management decision.
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PROGRESS_STEPS.map((s, i) => (
              <li key={s} className="rounded-xl border border-[#0f2b57]/15 bg-white p-5">
                <span className="tabular font-display text-2xl font-bold text-[#3e86d0]">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-caption font-medium text-[#0f2b57]">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-body text-[#5a6b84]">
            <span className="font-semibold text-[#0f2b57]">Data flow:</span> {DATA_FLOW.join(" → ")}
          </p>
        </Container>
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
