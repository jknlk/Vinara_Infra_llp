import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import DataPanel from "@/components/ui/DataPanel";
import SiteImage from "@/components/ui/SiteImage";
import StatBlock from "@/components/ui/StatBlock";
import InspectionGrid from "@/components/quality/InspectionGrid";
import { IMAGES } from "@/data/images";
import {
  QUALITY_POSITIONING,
  QUALITY_APPROACH,
  QC_ORG_CHART,
  QC_RESPONSIBILITIES,
  ONSITE_CONTROL,
  QC_EQUIPMENT,
  ACONEX_MODULES,
  ACONEX_CLIENT_BENEFITS,
  ACONEX_REGISTER,
  INDUCTION_DETAILS,
  DEPLOYMENT_STEPS,
  CORE_FIVE_RISKS,
  VEHICLE_RULES,
  EXCAVATION_RULES,
  HEIGHT_RULES,
  SCAFFOLD_LOADS,
  FIRE_EXTINGUISHERS,
  FIRE_RESPONSE,
  EMERGENCY_FLOW,
  NEAR_MISS_STEPS,
  SAFETY_PROGRAMME,
  SAFETY_ACTIVITIES,
  SAFETY_WELFARE,
} from "@/data/content/qualitySafety";

export const metadata: Metadata = {
  title: "Quality & Safety — Vinara Infra LLP",
  description: "Right first time, every time. Zero harm, zero accident. Our QA/QC and EHS systems, in full.",
};

export default function QualitySafetyPage() {
  return (
    <>
      {/* S1 · Hero — split quality / safety */}
      <section className="relative overflow-hidden border-b border-navy-500 bg-ink pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="grid-rule pointer-events-none absolute inset-0 mx-auto max-w-[1280px]" />
        <Container>
          <h1 className="sr-only">Quality & Safety — right first time, every time; zero harm, zero accident</h1>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="border-l-2 border-green-500 pl-6">
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Quality</p>
              <h2 className="mt-3 text-display-l font-display text-green-500">Right first time, every time.</h2>
            </div>
            <div className="border-l-2 border-orange-500 pl-6">
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Safety</p>
              <h2 className="mt-3 text-display-l font-display text-orange-500">Zero harm. Zero accident.</h2>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_POSITIONING.map((q) => (
              <div key={q.title}>
                <p className="text-body-l font-display font-bold text-white">{q.title}</p>
                <p className="mt-1 text-caption text-grey-300">{q.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* S2 · Quality approach */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Quality approach" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_APPROACH.map((s, i) => (
              <DataPanel key={s.title} accent="var(--color-green-500)">
                <span className="tabular text-caption text-green-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-body-l font-display font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{s.body}</p>
              </DataPanel>
            ))}
          </div>
          <p className="mt-12 text-display-m font-display text-white">
            Quality is not checked at the end, it is controlled throughout the project.
          </p>
        </Container>
      </section>

      {/* S3 · QC organisation */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="QC organisation" />
            <div className="mt-8 space-y-3">
              {QC_ORG_CHART.map((role, i) => (
                <div
                  key={role}
                  className="rounded-lg border border-navy-500 bg-ink px-4 py-3 text-body text-white"
                  style={{ marginLeft: `${i * 12}px` }}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHead title="Responsibilities" />
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {QC_RESPONSIBILITIES.map((r) => (
                <li key={r} className="text-caption text-grey-300">{r}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* S4 · On-site control */}
      <section className="bg-ink py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead title="On-site control" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ONSITE_CONTROL.map((c, i) => (
                <div key={c} className="border-t border-sky-400 pt-3">
                  <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-body text-white">{c}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <SiteImage slot="quality-inspection" image={IMAGES.qualityInspection} ratio="4/3" />
            <p className="mt-6 text-label uppercase tracking-[0.08em] text-grey-300">Equipment</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {QC_EQUIPMENT.map((e) => (
                <li key={e} className="rounded-full border border-navy-500 px-3 py-1 text-caption text-grey-300">{e}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* S5 · Aconex IR system */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead
            title="Aconex IR system"
            standfirst="We use Aconex — IR (Information Register) to manage all quality-related documentation, checklists, inspections and approvals in a centralised platform."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {["Centralised document control", "Real-time visibility", "Accountability & traceability"].map((t) => (
              <span key={t} className="rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-caption text-sky-200">{t}</span>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Modules</p>
              <ul className="mt-4 space-y-2">
                {ACONEX_MODULES.map((m) => (
                  <li key={m} className="text-body text-grey-300">{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Client benefits</p>
              <ul className="mt-4 space-y-2">
                {ACONEX_CLIENT_BENEFITS.map((b) => (
                  <li key={b} className="text-body text-grey-300">{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* live proof — register extract */}
          <DataPanel accent="var(--color-orange-500)" className="mt-16">
            <p className="text-label uppercase tracking-[0.08em] text-grey-300">Register extract</p>
            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <p className="tabular text-caption text-grey-300">IR series</p>
                <p className="mt-1 tabular text-body font-medium text-white">
                  {ACONEX_REGISTER.irRangeStart} – {ACONEX_REGISTER.irRangeEnd.split("-").pop()}
                </p>
              </div>
              <div>
                <p className="text-caption text-grey-300">Issued to</p>
                <p className="mt-1 text-body font-medium text-white">{ACONEX_REGISTER.issuedTo}</p>
              </div>
              <div>
                <p className="text-caption text-grey-300">Date range</p>
                <p className="mt-1 tabular text-body font-medium text-white">{ACONEX_REGISTER.dateRange}</p>
              </div>
              <div>
                <p className="text-caption text-grey-300">Records in register</p>
                <p className="mt-1 tabular text-body font-medium text-orange-500">
                  {ACONEX_REGISTER.totalRecords.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </DataPanel>
        </Container>
      </section>

      {/* S6 · Inspections covered */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Inspections covered" standfirst={`${INSPECTION_ACTIVITIES_COUNT} activities, filterable.`} />
          <div className="mt-10">
            <InspectionGrid />
          </div>
          <p className="mt-12 max-w-[62ch] text-body-l text-grey-300">
            No work is concealed without inspection. No critical activity proceeds without approval. Quality is
            built, not checked.
          </p>
        </Container>
      </section>

      {/* S7 · Safety systems */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="Safety systems" />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <SiteImage slot="safety-induction" image={IMAGES.safetyInduction} ratio="4/3" />
            </div>
            <div className="lg:col-span-6">
              <p className="text-body text-grey-300">{INDUCTION_DETAILS.purpose}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-caption text-grey-300">
                <p>Conducted by: <span className="text-white">{INDUCTION_DETAILS.conductedBy}</span></p>
                <p>Client: <span className="text-white">{INDUCTION_DETAILS.client}</span></p>
                <p>Work location: <span className="text-white">{INDUCTION_DETAILS.workLocation}</span></p>
                <p>Camp location: <span className="text-white">{INDUCTION_DETAILS.campLocation}</span></p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Deployment</p>
              <ol className="mt-4 space-y-3">
                {DEPLOYMENT_STEPS.map((s, i) => (
                  <li key={s} className="flex gap-3 text-body text-grey-300">
                    <span className="tabular text-sky-400">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-6">
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">AGP Core 05 Risks</p>
              <ul className="mt-4 space-y-3">
                {CORE_FIVE_RISKS.map((r) => (
                  <li key={r} className="rounded-lg border border-sky-400/40 bg-sky-400/10 px-4 py-3 text-body text-sky-200">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <RuleList title="Vehicle movement" rules={VEHICLE_RULES} />
            <RuleList title="Excavation" rules={EXCAVATION_RULES} />
            <RuleList title="Work at height" rules={HEIGHT_RULES} />
          </div>

          {/* scaffold load table */}
          <div className="mt-16">
            <p className="text-label uppercase tracking-[0.08em] text-grey-300">Scaffold design load, per working bay</p>
            <div className="mt-4 grid grid-cols-3 gap-6 sm:max-w-md">
              <Stat label="Live load" value={`${SCAFFOLD_LOADS.liveLoadKn} kN`} />
              <Stat label="Dead load" value={`${SCAFFOLD_LOADS.deadLoadKn} kN`} />
              <Stat label="Total" value={`${SCAFFOLD_LOADS.totalKn} kN`} accent />
            </div>
            <p className="mt-4 text-caption text-grey-300">Standards: {SCAFFOLD_LOADS.standards.join(" · ")}</p>
          </div>

          {/* fire extinguisher table */}
          <div className="mt-16 overflow-x-auto">
            <p className="text-label uppercase tracking-[0.08em] text-grey-300">Fire extinguisher classes</p>
            <table className="mt-4 w-full min-w-[420px] border-collapse text-body">
              <thead>
                <tr className="border-b border-navy-500 text-left text-label uppercase tracking-[0.08em] text-grey-300">
                  <th className="py-3 pr-4 font-semibold">Extinguisher</th>
                  <th className="py-3 font-semibold">Suitable for</th>
                </tr>
              </thead>
              <tbody>
                {FIRE_EXTINGUISHERS.map((f) => (
                  <tr key={f.class} className="border-b border-navy-500/60">
                    <td className="py-3 pr-4 text-white">{f.class}</td>
                    <td className="py-3 text-grey-300">{f.suitableFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-caption text-grey-300">In case of fire: {FIRE_RESPONSE.join(" → ")}.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Emergency response flow</p>
              <p className="mt-4 text-body-l text-white">{EMERGENCY_FLOW.join(" → ")}</p>
              <p className="mt-4 text-caption text-grey-300">
                Life safety first — do not risk your life to save materials, tools or machinery.
              </p>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Near miss reporting</p>
              <p className="mt-4 text-body-l text-white">{NEAR_MISS_STEPS.join(" → ")}</p>
              <p className="mt-4 text-caption text-grey-300">Reporting is for prevention, not punishment.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* S8 · Safety performance & culture */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Safety performance & culture" />
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            <StatBlock value={412} label="Today manpower" />
            <StatBlock value={82} label="Staff & operators" />
            <StatBlock value={1265} label="Safe manhours — staff & operator" />
            <StatBlock value={2480} label="Safe manhours — workers" />
            <StatBlock value={3745} label="Total safe manhours daily" />
            <StatBlock value={996553} label="Safe manhours to March 2026" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {SAFETY_PROGRAMME.map((p) => (
              <DataPanel key={p.title}>
                <h3 className="text-body-l font-display font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{p.body}</p>
              </DataPanel>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Activities</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SAFETY_ACTIVITIES.map((a) => (
                  <li key={a} className="rounded-full border border-navy-500 px-3 py-1 text-caption text-grey-300">{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Welfare</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SAFETY_WELFARE.map((w) => (
                  <li key={w} className="rounded-full border border-navy-500 px-3 py-1 text-caption text-grey-300">{w}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-16 text-display-m font-display text-white">Think safe. Work safe. Go home safe.</p>
        </Container>
      </section>
    </>
  );
}

const INSPECTION_ACTIVITIES_COUNT = 14;

function RuleList({ title, rules }: { title: string; rules: string[] }) {
  return (
    <div>
      <p className="text-label uppercase tracking-[0.08em] text-grey-300">{title}</p>
      <ul className="mt-4 space-y-2">
        {rules.map((r) => (
          <li key={r} className="text-caption text-grey-300">{r}</li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className={`tabular text-body-l font-display font-bold ${accent ? "text-orange-500" : "text-white"}`}>{value}</p>
      <p className="mt-1 text-caption text-grey-300">{label}</p>
    </div>
  );
}
