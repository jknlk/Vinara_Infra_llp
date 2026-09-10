import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import DataPanel from "@/components/ui/DataPanel";
import BuildingRow from "@/components/ui/BuildingRow";
import ProgressBar from "@/components/ui/ProgressBar";
import ProjectPlanViewer from "@/components/projects/ProjectPlanViewer";
import Gauge from "@/components/projects/Gauge";
import { IMAGES } from "@/data/images";
import { PROJECTS, PORTFOLIO_TOTALS } from "@/data/buildings";
import { CLIENTS, PMC_PARTNERS, TENANTS } from "@/data/content/site";
import {
  CONCRETE_CONTROL,
  BOQ_CONTROL,
  BOQ_TAKEAWAYS,
  DASHBOARD,
  DELIVERY_FACTORS,
  SITE_CHALLENGES,
} from "@/data/content/projects";

export const metadata: Metadata = {
  title: "Projects — Vinara Infra LLP",
  description: "NELA 1, NELA 2 and Bikaner House — 213.06 acres, 23 buildings, 4.23 million sq.ft of Grade-A warehousing.",
};

function num(v: number, d = 2) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Portfolio at a glance"
        standfirst="213.06 acres · 42,30,930.54 sq.ft · 23 buildings · 0.54 FSI · 47.34% ground coverage · 6 completed · 6 in progress · 11 upcoming."
        image={IMAGES.heroAerial}
        imageSlot="hero-aerial"
      />

      {/* S1 · Summary table */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Summary by project" />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-body">
              <thead>
                <tr className="border-b border-navy-500 text-left text-label uppercase tracking-[0.08em] text-grey-300">
                  <th className="py-3 pr-4 font-semibold">Project</th>
                  <th className="py-3 pr-4 text-right font-semibold">Plot</th>
                  <th className="py-3 pr-4 text-right font-semibold">Built-up</th>
                  <th className="py-3 pr-4 text-right font-semibold">Buildings</th>
                  <th className="py-3 pr-4 text-right font-semibold">Completed</th>
                  <th className="py-3 pr-4 text-right font-semibold">WIP</th>
                  <th className="py-3 pr-4 text-right font-semibold">Upcoming</th>
                  <th className="py-3 text-right font-semibold">Ground cov.</th>
                </tr>
              </thead>
              <tbody>
                {PROJECTS.map((p) => (
                  <tr key={p.slug} className="border-b border-navy-500/60">
                    <td className="py-3 pr-4 font-medium text-white">{p.shortName}</td>
                    <td className="tabular py-3 pr-4 text-right text-grey-300">{num(p.plotAcres)} ac</td>
                    <td className="tabular py-3 pr-4 text-right text-grey-300">{num(p.builtUpSqft)}</td>
                    <td className="tabular py-3 pr-4 text-right text-grey-300">{p.buildingsCount}</td>
                    <td className="tabular py-3 pr-4 text-right text-green-500">{p.completed}</td>
                    <td className="tabular py-3 pr-4 text-right text-sky-200">{p.wip}</td>
                    <td className="tabular py-3 pr-4 text-right text-orange-300">{p.upcoming}</td>
                    <td className="tabular py-3 text-right text-grey-300">{num(p.groundCoverage)}%</td>
                  </tr>
                ))}
                <tr>
                  <td className="pt-4 font-semibold text-white">Total</td>
                  <td className="tabular pt-4 text-right font-semibold text-white">{num(PORTFOLIO_TOTALS.plotAcres)} ac</td>
                  <td className="tabular pt-4 text-right font-semibold text-white">{num(PORTFOLIO_TOTALS.builtUpSqft)}</td>
                  <td className="tabular pt-4 text-right font-semibold text-white">{PORTFOLIO_TOTALS.buildings}</td>
                  <td className="tabular pt-4 text-right font-semibold text-green-500">{PORTFOLIO_TOTALS.completed}</td>
                  <td className="tabular pt-4 text-right font-semibold text-sky-200">{PORTFOLIO_TOTALS.wip}</td>
                  <td className="tabular pt-4 text-right font-semibold text-orange-300">{PORTFOLIO_TOTALS.upcoming}</td>
                  <td className="tabular pt-4 text-right font-semibold text-white">{num(PORTFOLIO_TOTALS.groundCoverage)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[60ch] text-caption text-grey-500">
            Building-count figures shown here reflect the consolidated master plan tables below. Two source
            documents cite different totals for NELA 1 (14 vs. 16 buildings) and the portfolio (23 vs. 27) —
            flagged for client confirmation before these figures are treated as final.
          </p>
        </Container>
      </section>

      {/* S2–S4 · Per-project detail */}
      {PROJECTS.map((project) => (
        <section key={project.slug} id={project.slug} className="border-t border-navy-500 bg-navy-900 py-24">
          <Container>
            <SectionHead title={`${project.name} — ${project.client}`} standfirst={project.description} />
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <ProjectPlanViewer slug={project.slug} />
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="tabular text-body-l font-display font-bold text-white">{num(project.plotAcres)}</p>
                    <p className="text-caption text-grey-300">Acres</p>
                  </div>
                  <div>
                    <p className="tabular text-body-l font-display font-bold text-white">{project.buildingsCount}</p>
                    <p className="text-caption text-grey-300">Buildings</p>
                  </div>
                  <div>
                    <p className="tabular text-body-l font-display font-bold text-white">{num(project.groundCoverage)}%</p>
                    <p className="text-caption text-grey-300">Ground cov.</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-[2.5rem_1fr_9rem_auto] gap-4 border-b border-navy-500 pb-2 text-label uppercase tracking-[0.08em] text-grey-300 sm:grid-cols-[2.5rem_1fr_9rem_auto]">
                  <span>#</span>
                  <span>Building</span>
                  <span className="text-right">Built-up (sq.ft)</span>
                  <span className="text-right">Status</span>
                </div>
                {project.buildings.map((b, i) => (
                  <BuildingRow key={b.id} index={i + 1} building={b} />
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-navy-500 pt-3 text-body font-semibold text-white">
                  <span>Total</span>
                  <span className="tabular">{num(project.builtUpSqft)}</span>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* S5 · Delivery instrumentation */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Delivery instrumentation" standfirst="The section no competitor shows — every quantity, tracked." />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DataPanel accent="var(--color-sky-400)">
              <h3 className="text-body-l font-display font-bold text-white">Concrete quantity control</h3>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <Stat label="Total BOQ" value={`${num(CONCRETE_CONTROL.totalBoqM3, 0)} m³`} />
                <Stat label="Achieved" value={`${num(CONCRETE_CONTROL.achievedM3, 0)} m³`} />
                <Stat label="Progress" value={`${CONCRETE_CONTROL.progressPct}%`} accent />
                <Stat label="Balance" value={`${num(CONCRETE_CONTROL.balanceM3, 0)} m³`} />
              </div>
              <ProgressBar percent={CONCRETE_CONTROL.progressPct} color="var(--color-sky-400)" className="mt-6" />
              <p className="mt-4 text-caption text-grey-300">Major concrete works: {CONCRETE_CONTROL.majorWorks.join(", ")}.</p>
            </DataPanel>

            <DataPanel accent="var(--color-orange-500)">
              <h3 className="text-body-l font-display font-bold text-white">BOQ-based control</h3>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <Stat label="Total BOQ value" value={`₹${BOQ_CONTROL.totalCr}+ Cr`} />
                <Stat label="Value achieved" value={`₹${BOQ_CONTROL.achievedCr} Cr`} accent />
                <Stat label="Balance" value={`₹${BOQ_CONTROL.balanceCr} Cr`} />
                <Stat label="Work packages" value={String(BOQ_CONTROL.workPackages)} />
              </div>
              <ProgressBar percent={BOQ_CONTROL.achievedPct} color="var(--color-orange-500)" className="mt-6" />
            </DataPanel>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BOQ_TAKEAWAYS.map((t) => (
              <li key={t} className="border-l-2 border-sky-400 pl-4 text-body text-grey-300">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-16 border-t border-navy-500 pt-12">
            <Gauge percent={DASHBOARD.overallProgressPct} label="Overall progress" color="var(--color-orange-500)" />
            <Gauge percent={Math.round(DASHBOARD.spi * 100)} label={`SPI · ${DASHBOARD.spi.toFixed(2)}`} color="var(--color-sky-400)" />
            <Gauge percent={Math.round(DASHBOARD.cpi * 100)} label={`CPI · ${DASHBOARD.cpi.toFixed(2)}`} color="var(--color-green-500)" />
          </div>
        </Container>
      </section>

      {/* S6 · The delivery challenge */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead title="The delivery challenge" />
            <ul className="mt-8 space-y-3">
              {DELIVERY_FACTORS.map((f) => (
                <li key={f} className="border-b border-navy-500 pb-3 text-body text-grey-300">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <SectionHead title="Site challenges" />
            <div className="mt-8 space-y-6">
              {SITE_CHALLENGES.map((c) => (
                <div key={c.title}>
                  <h3 className="text-body-l font-display font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-caption text-grey-300">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
        <Container className="mt-16">
          <p className="text-display-m font-display text-white">
            Success is not just about building structures, it&rsquo;s about delivering commitments.
          </p>
        </Container>
      </section>

      {/* S7 · Clients & partners */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Clients & partners" />
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            {[...CLIENTS, ...PMC_PARTNERS, ...TENANTS].map((name) => (
              <div key={name} className="flex h-16 items-center justify-center rounded-lg border border-navy-500 px-4 text-center text-caption font-medium text-grey-300">
                {name}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
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
