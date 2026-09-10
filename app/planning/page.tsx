import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import DataPanel from "@/components/ui/DataPanel";
import ProgressBar from "@/components/ui/ProgressBar";
import PlanningLadder from "@/components/planning/PlanningLadder";
import ControlCycle from "@/components/planning/ControlCycle";
import { IMAGES } from "@/data/images";
import {
  CONTROL_DOMAINS,
  CONTROLS_COMMITMENT,
  HIERARCHY_BENEFITS,
  CYCLE_FOUNDATIONS,
  CYCLE_ENABLERS,
  CYCLE_OUTCOMES,
  PROGRESS_STEPS,
  DATA_FLOW,
  OUTPUTS_REPORTS,
  REPORTING_PRINCIPLES,
} from "@/data/content/planning";
import { CONCRETE_CONTROL, BOQ_CONTROL } from "@/data/content/projects";

export const metadata: Metadata = {
  title: "Planning & Controls — Vinara Infra LLP",
  description: "A six-level planning hierarchy and an integrated control cycle from master programme to daily execution.",
};

export default function PlanningPage() {
  return (
    <>
      <PageHero
        title="One plan. One direction. One source of truth."
        standfirst="We integrate people, processes and technology to create a single, reliable and real-time view of the project — enabling informed decisions and successful delivery."
        image={IMAGES.planningSchedule}
        imageSlot="planning-schedule"
      />

      {/* S2 · Controls philosophy */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Controls philosophy" standfirst="Integrated Project Control — six domains, one view." />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONTROL_DOMAINS.map((d) => (
              <DataPanel key={d.title} accent="var(--color-sky-400)">
                <h3 className="text-body-l font-display font-bold text-white">{d.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{d.body}</p>
              </DataPanel>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {CONTROLS_COMMITMENT.map((c) => (
              <span key={c} className="rounded-full border border-navy-500 px-4 py-2 text-caption text-grey-300">
                {c}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* S3 · Planning hierarchy — pinned ladder */}
      <section className="border-t border-navy-500 bg-navy-900">
        <Container>
          <div className="pt-24">
            <SectionHead title="Planning hierarchy" standfirst="Six levels, from master programme down to daily execution." />
          </div>
        </Container>
        <PlanningLadder />
        <Container className="pb-24">
          <div className="flex flex-wrap gap-3">
            {HIERARCHY_BENEFITS.map((b) => (
              <span key={b} className="rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-caption text-sky-200">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-10 text-display-m font-display text-white">
            A strong plan at the top creates success at the bottom.
          </p>
        </Container>
      </section>

      {/* S4 · The control cycle */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="The control cycle" />
          <div className="mt-12">
            <ControlCycle />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Foundations</p>
              <p className="mt-3 text-body text-white">{CYCLE_FOUNDATIONS.join(" · ")}</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Enablers</p>
              <p className="mt-3 text-body text-grey-300">{CYCLE_ENABLERS.join(" · ")}</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Outcomes</p>
              <p className="mt-3 text-body text-grey-300">{CYCLE_OUTCOMES.join(" · ")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* S5 · Progress measurement */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="Progress measurement" />
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {PROGRESS_STEPS.map((s, i) => (
              <div key={s} className="border-t border-sky-400 pt-4">
                <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-caption font-medium text-white">{s}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-body text-grey-300">Data flow: {DATA_FLOW.join(" → ")}</p>
        </Container>
      </section>

      {/* S6 · Outputs & reports */}
      <section className="bg-ink py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="Outputs & reports" />
            <ul className="mt-8 space-y-3">
              {OUTPUTS_REPORTS.map((o) => (
                <li key={o} className="border-b border-navy-500 pb-3 text-body text-grey-300">{o}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <SectionHead title="Principles" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {REPORTING_PRINCIPLES.map((p) => (
                <div key={p.title}>
                  <h3 className="text-body-l font-display font-bold text-sky-200">{p.title}</h3>
                  <p className="mt-1 text-caption text-grey-300">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* S7 · Live dashboards */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="Live dashboards" />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DataPanel accent="var(--color-sky-400)">
              <h3 className="text-body-l font-display font-bold text-white">Concrete quantity control</h3>
              <p className="mt-2 tabular text-caption text-grey-300">
                {CONCRETE_CONTROL.achievedM3.toLocaleString("en-IN")} m³ of {CONCRETE_CONTROL.totalBoqM3.toLocaleString("en-IN")} m³
              </p>
              <ProgressBar percent={CONCRETE_CONTROL.progressPct} color="var(--color-sky-400)" className="mt-4" />
            </DataPanel>
            <DataPanel accent="var(--color-orange-500)">
              <h3 className="text-body-l font-display font-bold text-white">BOQ value control</h3>
              <p className="mt-2 tabular text-caption text-grey-300">
                ₹{BOQ_CONTROL.achievedCr} Cr of ₹{BOQ_CONTROL.totalCr}+ Cr
              </p>
              <ProgressBar percent={BOQ_CONTROL.achievedPct} color="var(--color-orange-500)" className="mt-4" />
            </DataPanel>
          </div>
          <p className="mt-16 text-display-m font-display text-white">
            Measured today. Managed today. Delivered tomorrow.
          </p>
        </Container>
      </section>
    </>
  );
}
