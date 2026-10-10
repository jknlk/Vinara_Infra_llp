import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import ProgressMarquee from "@/components/planning/ProgressMarquee";
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
const noCaption = (img: (typeof IMAGES)[string]) => ({ ...img, caption: undefined });


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
      <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#0f2b57]">
        <Image
          src={IMAGES.planningHero.src ?? ""}
          alt={IMAGES.planningHero.alt}
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
              Controls &amp; QHSE
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
                href="#progress"
                className="rounded-full border border-white/40 px-7 py-3 text-body font-semibold text-white transition hover:border-white"
              >
                Progress measurement
              </a>
              <a
                href="#quality"
                className="rounded-full border border-white/40 px-7 py-3 text-body font-semibold text-white transition hover:border-white"
              >
                Quality &amp; safety
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

      {/* Progress measurement */}
      <section id="progress" className="bg-white py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>Progress measurement</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            From site execution to management decision.
          </h2>
        </div>
        <ProgressMarquee />
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#dbe9fa] bg-gradient-to-r from-[#eef5ff] via-white to-[#eef5ff] p-6 shadow-[0_20px_50px_-30px_rgba(0,72,176,0.4)] md:p-8">
            <p className={`${eyebrow} text-[#3e86d0]`}>Data flow</p>
            <ol className="relative mt-6 grid grid-cols-2 gap-y-8 md:grid-cols-6">
              <span aria-hidden className="absolute left-[8%] right-[8%] top-6 hidden h-0.5 bg-gradient-to-r from-[#9fd0ff] via-[#4d94ff] to-[#0048b0] md:block" />
              {DATA_FLOW.map((d, i) => (
                <li key={d} className="group relative flex flex-col items-center text-center">
                  <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-[#0048b0] to-[#4d94ff] font-display text-sm font-bold text-white shadow-[0_10px_20px_-8px_rgba(0,72,176,0.6)] transition-transform duration-500 group-hover:scale-125">
                    {i + 1}
                  </span>
                  <span className="mt-3 font-display text-body font-bold text-[#0f2b57]">{d}</span>
                </li>
              ))}
            </ol>
          </div>
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
            <span className="bg-gradient-to-r from-[#0048b0] to-[#4d94ff] bg-clip-text text-transparent">
              principles you can trust.
            </span>
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="relative mb-6 lg:col-span-4">
              <div className="absolute -inset-3 -z-10 -rotate-2 rounded-[28px] bg-gradient-to-br from-[#4d94ff]/40 to-[#9fd0ff]/20 blur-sm" />
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-[0_30px_60px_-24px_rgba(0,72,176,0.45)]">
                <SiteImage slot="planning-outputs" image={noCaption(IMAGES.planningOutputs)} ratio="1/1" className="rounded-none border-0" />
              </div>
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
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
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
