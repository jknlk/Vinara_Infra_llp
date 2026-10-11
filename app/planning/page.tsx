import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import JellyFrame from "@/components/ui/JellyFrame";
import ProgressMarquee from "@/components/planning/ProgressMarquee";
import DataFlowRibbon from "@/components/planning/DataFlowRibbon";
import { IMAGES } from "@/data/images";
import {
  CONTROL_DOMAINS,
  PLANNING_LEVELS,
  PROGRESS_STEPS,
  DATA_FLOW,
  OUTPUTS_REPORTS,
  REPORTING_PRINCIPLES,
} from "@/data/content/planning";
import {
  QC_ORG_CHART,
} from "@/data/content/qualitySafety";
import QualityApproach from "@/components/planning/QualityApproach";
import SafetySection from "@/components/planning/SafetySection";
import QcOrgArc from "@/components/planning/QcOrgArc";
import type { SparkItem } from "@/components/ui/sparks-carousel";

export const metadata: Metadata = {
  title: "Controls & QHSE — Vinara Infra LLP",
  description:
    "Planning, progress control, quality assurance and safety systems — one integrated delivery-control framework from master programme to handover.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";


// One card per level of the QC organisation, top of the hierarchy first.
const QC_ORG_CARDS: SparkItem[] = QC_ORG_CHART.map((title, i) => {
  const img = [IMAGES.planningSchedule, IMAGES.cycleAnalyze, IMAGES.cycleMeasure, IMAGES.gallery5, IMAGES.cycleExecute][i];
  const count = [1, 1, 3, 3, "All"][i];
  return {
    id: title,
    imageSrc: img.src ?? "",
    imageAlt: img.alt,
    title: title.replace(/ × \d+$/, ""),
    count,
    countLabel: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"][i] + (typeof count === "number" && i > 1 ? " · headcount" : ""),
  };
});

export default function PlanningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#071a3a] text-white">
        <Image
          src={IMAGES.planningHero.src ?? ""}
          alt={IMAGES.planningHero.alt}
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover object-[68%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071a3a] via-[#071a3a]/80 to-[#071a3a]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071a3a] via-[#071a3a]/25 to-[#071a3a]/50" />

        {/* pb clears the ribbon fixed to the bottom of the screen */}
        <div className="relative mx-auto flex w-full max-w-[1680px] flex-1 flex-col px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <div className="flex flex-1 flex-col justify-center lg:w-9/12">
            <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
              <span className="h-px w-10 bg-[#7fb6e8]" />
              Controls &amp; QHSE
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,min(6.4vw,11.5vh),6rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
              One plan. One direction.
              <span className="block join-shine join-shine-dark pb-[0.08em]">
                One source of truth.
              </span>
            </h1>
            <p className="mt-6 max-w-[46ch] border-l-2 border-[#4d94ff] pl-5 text-body-l text-white/75">
              People, processes and technology, integrated into a single real-time view of the project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#progress"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1f6fd1] px-7 py-3.5 text-body font-semibold text-white shadow-lg shadow-[#1f6fd1]/30 transition-colors hover:bg-[#4d94ff]"
              >
                Progress measurement
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#quality"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-body font-semibold text-white backdrop-blur transition-colors hover:border-white/60 hover:bg-white/10"
              >
                Quality &amp; safety
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-7 border-t border-white/15 pt-6 xl:flex-row xl:items-end xl:justify-between">
            <dl className="grid grid-cols-3 gap-6 sm:flex sm:gap-14">
              {[
                { v: CONTROL_DOMAINS.length, l: "Control domains" },
                { v: PLANNING_LEVELS.length, l: "Planning levels" },
                { v: PROGRESS_STEPS.length, l: "Progress steps" },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="tabular font-display text-4xl font-extrabold leading-none md:text-5xl">
                    {String(s.v).padStart(2, "0")}
                  </dd>
                  <dt className={`${eyebrow} mt-2 text-white/60`}>{s.l}</dt>
                </div>
              ))}
            </dl>

            <div>
              <p className={`${eyebrow} text-[#7fb6e8]`}>Data flow</p>
              <ol className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                {DATA_FLOW.map((d, i) => (
                  <li key={d} className="flex items-center gap-3">
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-caption font-semibold backdrop-blur">
                      <span className="tabular mr-2 text-[#7fb6e8]">{String(i + 1).padStart(2, "0")}</span>
                      {d}
                    </span>
                    {i < DATA_FLOW.length - 1 && <span aria-hidden className="hidden h-px w-5 bg-white/30 sm:block" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Progress measurement */}
      <section id="progress" className="bg-white py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>Progress measurement</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold join-shine pb-[0.08em] md:text-5xl">
            From site execution to management decision.
          </h2>
        </div>
        <ProgressMarquee />
        {/* The ribbon is pulled up into the empty space under the arc's raised middle cards. */}
        <div className="relative z-10 -mb-4 md:-mb-[1.5%] md:-mt-[6%]">
          <DataFlowRibbon />
        </div>
      </section>

      {/* Outputs & principles */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f3f8ff] to-white py-6">
        <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-[#4d94ff]/15 blur-[120px]" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
            <span className="h-px w-10 bg-[#3e86d0]" />
            Reporting
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-[#0f2b57] md:text-5xl">
            Outputs you can act on,{" "}
            <span className="join-shine">
              principles you can trust.
            </span>
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="relative mb-6 lg:col-span-4">
              <div className="absolute -inset-3 -z-10 -rotate-2 rounded-[28px] bg-gradient-to-br from-[#4d94ff]/40 to-[#9fd0ff]/20 blur-sm" />
              <JellyFrame className="aspect-square w-full" echoClassName="stroke-[#0048b0]/30">
                <Image
                  src={IMAGES.planningOutputs.src ?? ""}
                  alt={IMAGES.planningOutputs.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </JellyFrame>
              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-md">
                <p className={`${eyebrow} text-[#3e86d0]`}>Data flow</p>
                <p className="mt-1 font-display text-body font-bold text-[#0f2b57]">{DATA_FLOW.join(" → ")}</p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <p className={`${eyebrow} text-[#3e86d0]`}>Outputs &amp; reports</p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {OUTPUTS_REPORTS.map((o, i) => (
                  <li
                    key={o}
                    className="group flex items-center gap-3 rounded-2xl border border-[#dbe9fa] bg-white p-4 shadow-[0_8px_24px_-16px_rgba(0,72,176,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4d94ff]/60 hover:shadow-[0_20px_36px_-20px_rgba(0,72,176,0.5)]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0048b0] to-[#4d94ff] text-white transition-transform duration-300 group-hover:rotate-6">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                    <span className="text-body font-medium text-[#0f2b57]">{o}</span>
                    <span className="tabular ml-auto font-display text-sm font-bold text-[#0048b0]/25">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>

              <p className={`${eyebrow} mt-7 text-[#3e86d0]`}>Principles</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {REPORTING_PRINCIPLES.map((p, i) => (
                  <div
                    key={p.title}
                    className="group relative overflow-hidden rounded-2xl border border-[#dbe9fa] bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgba(0,72,176,0.5)]"
                  >
                    <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0048b0] to-[#9fd0ff]" />
                    <span className="tabular pointer-events-none absolute -right-1 -top-3 font-display text-6xl font-extrabold text-[#0048b0]/[0.06] transition-colors group-hover:text-[#0048b0]/[0.12]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative font-display text-body-l font-bold text-[#0f2b57]">{p.title}</h3>
                    <p className="relative mt-1.5 text-caption leading-relaxed text-[#5a6b84]">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality approach */}
      <section id="quality" className="bg-white py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>Quality &amp; safety · Right first time, every time</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold join-shine pb-[0.08em] md:text-5xl">
            Controlled throughout the project, not checked at the end.
          </h2>
          <QualityApproach />
        </div>
      </section>

      {/* QC organisation */}
      <section className="bg-white py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>QC organisation</p>
          <div className="mt-5">
            <QcOrgArc items={QC_ORG_CARDS} />
          </div>
        </div>
      </section>

      <SafetySection />
    </>
  );
}
