import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import { IMAGES } from "@/data/images";
import {
  QUALITY_POSITIONING,
  QUALITY_APPROACH,
  QC_ORG_CHART,
  QC_RESPONSIBILITIES,
  INDUCTION_DETAILS,
  EMERGENCY_FLOW,
  NEAR_MISS_STEPS,
} from "@/data/content/qualitySafety";

export const metadata: Metadata = {
  title: "Quality & Safety — Vinara Infra LLP",
  description: "Right first time, every time. Zero harm, zero accident. Our QA/QC and EHS systems, in full.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";
const noCaption = (img: (typeof IMAGES)[string]) => ({ ...img, caption: undefined });

const SAFETY_STATS = [
  { v: "412", l: "Today manpower" },
  { v: "82", l: "Staff & operators" },
  { v: "1,265", l: "Safe manhours — staff & operators" },
  { v: "2,480", l: "Safe manhours — workers" },
  { v: "3,745", l: "Total safe manhours daily" },
  { v: "9,96,553", l: "Safe manhours to March 2026" },
];

export default function QualitySafetyPage() {
  return (
    <>
      <h1 className="sr-only">Quality &amp; Safety — right first time, every time; zero harm, zero accident</h1>

      {/* Hero */}
      <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#f2f7fc]">
        <div className="mx-auto flex h-full w-full max-w-[1680px] flex-col justify-center gap-10 px-4 pt-24 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pt-0">
          <div className="lg:w-7/12">
            <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
              <span className="h-px w-10 bg-[#3e86d0]" />
              Quality &amp; safety
            </p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-[#0f2b57] md:text-6xl">
              Right first time, every time.
              <span className="block text-[#e8833a]">Zero harm. Zero accident.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#quality"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2b57] px-7 py-3 text-body font-semibold text-white transition hover:bg-[#1d5fb0]"
              >
                Quality <ArrowUpRight size={18} />
              </a>
              <a
                href="#safety"
                className="inline-flex items-center gap-2 rounded-full border border-[#0f2b57]/25 px-7 py-3 text-body font-semibold text-[#0f2b57] transition hover:border-[#0f2b57]"
              >
                Safety <ArrowUpRight size={18} />
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#0f2b57]/15 pt-6 sm:grid-cols-4">
              {QUALITY_POSITIONING.map((q) => (
                <div key={q.title}>
                  <dt className="font-display text-body font-bold text-[#0f2b57]">{q.title}</dt>
                  <dd className="mt-1 text-caption text-[#5a6b84]">{q.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative lg:w-5/12">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <SiteImage
                slot="quality-hero"
                image={noCaption(IMAGES.safetyPpe)}
                ratio="1/1"
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="rounded-[2rem] border-0"
              />
            </div>
            <div className="absolute -left-6 bottom-6 rounded-2xl bg-white p-5 shadow-xl">
              <p className={`${eyebrow} text-[#5a6b84]`}>Safe manhours</p>
              <p className="mt-1 font-display text-3xl font-bold text-[#0f2b57]">9,96,553</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality approach */}
      <section id="quality" className="bg-white py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Quality approach</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            Controlled throughout the project, not checked at the end.
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_APPROACH.map((s, i) => (
              <li key={s.title} className="border-t-2 border-[#3e86d0] pt-4">
                <span className="tabular font-display text-3xl font-bold text-[#3e86d0]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-body-l font-bold text-[#0f2b57]">{s.title}</h3>
                <p className="mt-1 text-caption text-[#5a6b84]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* QC organisation + on-site control */}
      <section className="bg-[#f2f7fc] py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={`${eyebrow} text-[#3e86d0]`}>QC organisation</p>
            <ol className="mt-5 space-y-2">
              {QC_ORG_CHART.map((role, i) => (
                <li
                  key={role}
                  className="rounded-xl border border-[#0f2b57]/15 bg-white px-5 py-3 text-body font-medium text-[#0f2b57]"
                  style={{ marginLeft: `${i * 18}px` }}
                >
                  {role}
                </li>
              ))}
            </ol>
            <div className="mt-8 overflow-hidden rounded-2xl">
              <SiteImage slot="quality-lab" image={noCaption(IMAGES.rmcLab)} ratio="4/3" className="rounded-2xl border-0" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className={`${eyebrow} text-[#3e86d0]`}>Responsibilities</p>
            <ul className="mt-5 grid grid-cols-1 border-t border-[#0f2b57]/15 sm:grid-cols-2 sm:gap-x-8">
              {QC_RESPONSIBILITIES.map((r) => (
                <li key={r} className="flex items-start gap-3 border-b border-[#0f2b57]/15 py-3 text-body text-[#0f2b57]">
                  <Check size={16} className="mt-1 shrink-0 text-[#3e86d0]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Safety */}
      <section id="safety" className="bg-[#0b2247] py-20 text-white">
        <Container>
          <p className={`${eyebrow} text-[#e8833a]`}>Safety systems</p>
          <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-4xl font-bold md:text-5xl">Site induction, before anyone starts.</h2>
              <p className="mt-4 text-body text-white/80">{INDUCTION_DETAILS.purpose}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-caption">
                {[
                  ["Conducted by", INDUCTION_DETAILS.conductedBy],
                  ["Client", INDUCTION_DETAILS.client],
                  ["Work location", INDUCTION_DETAILS.workLocation],
                  ["Camp location", INDUCTION_DETAILS.campLocation],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-white/20 pt-3">
                    <dt className="text-white/60">{k}</dt>
                    <dd className="mt-1 text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="overflow-hidden rounded-2xl lg:col-span-6">
              <SiteImage slot="safety-induction" image={noCaption(IMAGES.safetyInduction)} ratio="4/3" className="rounded-2xl border-0" />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="border-l-2 border-[#e8833a] pl-5">
              <p className={`${eyebrow} text-[#e8833a]`}>Emergency response</p>
              <p className="mt-3 font-display text-body-l font-bold">{EMERGENCY_FLOW.join(" → ")}</p>
              <p className="mt-2 text-caption text-white/70">
                Life safety first — do not risk your life to save materials, tools or machinery.
              </p>
            </div>
            <div className="border-l-2 border-[#3e86d0] pl-5">
              <p className={`${eyebrow} text-[#7fb6e8]`}>Near miss reporting</p>
              <p className="mt-3 font-display text-body-l font-bold">{NEAR_MISS_STEPS.join(" → ")}</p>
              <p className="mt-2 text-caption text-white/70">Reporting is for prevention, not punishment.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Performance & culture */}
      <section className="bg-white py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Safety performance &amp; culture</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#0f2b57]/15 pt-8 sm:grid-cols-3 lg:grid-cols-6">
            {SAFETY_STATS.map((s) => (
              <div key={s.l}>
                <dd className="tabular font-display text-3xl font-bold text-[#0f2b57]">{s.v}</dd>
                <dt className="mt-1 text-caption text-[#5a6b84]">{s.l}</dt>
              </div>
            ))}
          </dl>

          <p className="mt-14 font-display text-3xl font-bold text-[#0f2b57] md:text-5xl">
            Think safe. Work safe. <span className="text-[#e8833a]">Go home safe.</span>
          </p>
        </Container>
      </section>
    </>
  );
}
