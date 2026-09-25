import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import StatusPill from "@/components/ui/StatusPill";
import ProjectPlanViewer from "@/components/projects/ProjectPlanViewer";
import { IMAGES } from "@/data/images";
import { PROJECTS, PORTFOLIO_TOTALS } from "@/data/buildings";
import { CLIENTS, PMC_PARTNERS, TENANTS } from "@/data/content/site";
import { DELIVERY_FACTORS, SITE_CHALLENGES } from "@/data/content/projects";
import { listProjects } from "@/lib/db";

export const dynamic = "force-dynamic";

type ProjectCardData = {
  slug: string;
  name: string;
  client: string;
  plotAcres: number;
  buildingsCount: number;
  builtUpSqft: number;
  completed: number;
  wip: number;
  src: string | undefined;
};

async function loadCards(): Promise<ProjectCardData[]> {
  try {
    const rows = await listProjects();
    return rows.map((r) => ({ ...r, src: r.src ?? undefined }));
  } catch {
    // Database unavailable — fall back to the bundled sites so the page never breaks.
    return PROJECTS.map((p) => ({
      slug: p.slug,
      name: p.shortName,
      client: p.client,
      plotAcres: p.plotAcres,
      buildingsCount: p.buildingsCount,
      builtUpSqft: p.builtUpSqft,
      completed: p.completed,
      wip: p.wip,
      src: IMAGES[PROJECT_IMAGE[p.slug]]?.src,
    }));
  }
}

export const metadata: Metadata = {
  title: "Projects — Vinara Infra LLP",
  description: "NELA 1, NELA 2 and Bikaner House — 213.06 acres, 12 buildings in progress or completed, 3.13 million sq.ft of Grade-A warehousing.",
};

function num(v: number, d = 2) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

const eyebrow = "text-label uppercase tracking-[0.14em]";

const PROJECT_IMAGE: Record<string, string> = {
  "nela-1": "showcaseWarehouseAerial2",
  "nela-2": "showcaseSiteTeam",
  "bikaner-house": "showcaseBuildingFacade",
};

const CLIENT_GROUPS: { label: string; names: readonly string[] }[] = [
  { label: "Clients", names: CLIENTS },
  { label: "PMC partners", names: PMC_PARTNERS },
  { label: "Tenants", names: TENANTS },
];

export default async function ProjectsPage() {
  const cards = await loadCards();
  const detailSlugs = new Set<string>(PROJECTS.map((p) => p.slug));
  const heroStats = [
    { value: num(PORTFOLIO_TOTALS.plotAcres), label: "acres" },
    { value: num(PORTFOLIO_TOTALS.builtUpSqft, 0), label: "sq.ft built-up" },
    { value: String(PORTFOLIO_TOTALS.completed), label: "buildings completed" },
    { value: String(PORTFOLIO_TOTALS.wip), label: "buildings in progress" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#f2f7fc]">
        <div className="mx-auto flex h-full w-full max-w-[1680px] flex-col justify-center gap-10 px-4 pt-24 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pt-0">
          <div className="lg:w-7/12">
            <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
              <span className="h-px w-10 bg-[#3e86d0]" />
              Projects
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-[#0f2b57] md:text-7xl">
              Portfolio
              <span className="block text-[#3e86d0]">at a glance.</span>
            </h1>
            <p className="mt-4 max-w-[48ch] text-body-l text-[#5a6b84]">
              {PROJECTS.length} sites. {PORTFOLIO_TOTALS.buildings} buildings. Grade-A warehousing delivered at scale.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#nela-1"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2b57] px-7 py-3 text-body font-semibold text-white transition hover:bg-[#1d5fb0]"
              >
                Explore sites <ArrowUpRight size={18} />
              </a>
              <a
                href="/contact"
                className="rounded-full border border-[#0f2b57]/25 px-7 py-3 text-body font-semibold text-[#0f2b57] transition hover:border-[#0f2b57]"
              >
                Talk to us
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#0f2b57]/15 pt-6 sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dd className="tabular font-display text-2xl font-bold text-[#0f2b57] md:text-3xl">{s.value}</dd>
                  <dt className="mt-1 text-caption text-[#5a6b84]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:w-5/12">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <SiteImage
                slot="projects-hero"
                image={{ ...IMAGES.heroAerial, caption: undefined }}
                ratio="1/1"
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="rounded-[2rem] border-0"
              />
            </div>
            <div className="absolute -left-6 bottom-6 rounded-2xl bg-white p-5 shadow-xl">
              <p className={`${eyebrow} text-[#5a6b84]`}>Delivered</p>
              <p className="mt-1 font-display text-3xl font-bold text-[#0f2b57]">
                {PORTFOLIO_TOTALS.completed}
                <span className="text-body text-[#5a6b84]"> / {PORTFOLIO_TOTALS.buildings} buildings</span>
              </p>
              <div className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-[#0f2b57]/10">
                <div
                  className="h-full rounded-full bg-[#3e86d0]"
                  style={{ width: `${(PORTFOLIO_TOTALS.completed / PORTFOLIO_TOTALS.buildings) * 100}%` }}
                />
              </div>
            </div>
            <div className="absolute -right-3 top-8 rounded-2xl bg-[#0f2b57] px-5 py-4 text-white shadow-xl">
              <p className="tabular font-display text-2xl font-bold">{PROJECTS.length}</p>
              <p className="text-caption text-white/75">active sites</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project index cards */}
      <section className="bg-white py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={`${eyebrow} text-[#3e86d0]`}>Our sites</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">Every site. One standard.</h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {cards.map((p, i) => {
              const pct = p.buildingsCount ? Math.min(100, Math.round(((p.completed + p.wip * 0.5) / p.buildingsCount) * 100)) : 0;
              return (
                <a
                  key={p.slug}
                  href={detailSlugs.has(p.slug) ? `#${p.slug}` : undefined}
                  className="group overflow-hidden rounded-2xl border border-[#0f2b57]/15 bg-white transition-shadow hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <SiteImage
                      slot={`${p.slug}-card`}
                      image={{ src: p.src, alt: p.name }}
                      ratio="16/10"
                      className="rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-3 font-display text-5xl font-bold text-white drop-shadow-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold text-[#0f2b57]">{p.name}</h3>
                      <ArrowUpRight
                        size={22}
                        className="text-[#0f2b57] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                    <p className="mt-1 text-caption text-[#5a6b84]">{p.client}</p>
                    <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-[#0f2b57]/10 pt-4">
                      <div>
                        <dd className="tabular font-display font-bold text-[#0f2b57]">{num(p.plotAcres)}</dd>
                        <dt className="text-caption text-[#5a6b84]">acres</dt>
                      </div>
                      <div>
                        <dd className="tabular font-display font-bold text-[#0f2b57]">{p.buildingsCount}</dd>
                        <dt className="text-caption text-[#5a6b84]">buildings</dt>
                      </div>
                      <div>
                        <dd className="tabular font-display font-bold text-[#0f2b57]">{num(p.builtUpSqft / 100000, 1)}L</dd>
                        <dt className="text-caption text-[#5a6b84]">sq.ft</dt>
                      </div>
                    </dl>
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#0f2b57]/10">
                      <div className="h-full rounded-full bg-[#3e86d0]" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="mt-2 text-caption text-[#5a6b84]">
                      {p.completed} handed over · {p.wip} in progress
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Per-project detail */}
      {PROJECTS.map((project, i) => {
        const max = Math.max(...project.buildings.map((b) => b.builtUpSqft));
        return (
          <section key={project.slug} id={project.slug} className="scroll-mt-4">
            {/* Photo banner */}
            <div className="relative overflow-hidden bg-black text-white">
              <div className="absolute inset-0">
                <SiteImage
                  slot={`${project.slug}-banner`}
                  image={IMAGES[PROJECT_IMAGE[project.slug]]}
                  ratio="auto"
                  className="h-full w-full rounded-none border-0"
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>
              <Container className="relative grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className={`${eyebrow} flex items-center gap-2 text-[#7fb6e8]`}>
                    <MapPin size={14} />
                    {String(i + 1).padStart(2, "0")} · {project.client}
                  </p>
                  <h2 className="mt-4 font-display text-5xl font-bold md:text-7xl">{project.name}</h2>
                  <p className="mt-5 max-w-[56ch] text-body-l text-white/85">{project.description}</p>
                </div>
                <dl className="grid grid-cols-3 gap-6 lg:col-span-5">
                  {[
                    { v: num(project.plotAcres), l: "Acres" },
                    { v: String(project.buildingsCount), l: "Buildings" },
                    { v: `${num(project.groundCoverage)}%`, l: "Ground coverage" },
                  ].map((s) => (
                    <div key={s.l} className="border-t border-white/30 pt-4">
                      <dd className="tabular font-display text-3xl font-bold">{s.v}</dd>
                      <dt className="mt-1 text-caption text-white/75">{s.l}</dt>
                    </div>
                  ))}
                </dl>
              </Container>
            </div>

            {/* Plan + buildings */}
            <div className={i % 2 === 0 ? "bg-[#f2f7fc]" : "bg-white"}>
              <Container className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className={`${eyebrow} mb-4 text-[#3e86d0]`}>Site plan</p>
                  <ProjectPlanViewer slug={project.slug} />
                </div>
                <div className="lg:col-span-7">
                  <div className="mb-4 flex items-end justify-between">
                    <p className={`${eyebrow} text-[#3e86d0]`}>Buildings</p>
                    <p className="text-caption text-[#5a6b84]">
                      Total <span className="tabular font-semibold text-[#0f2b57]">{num(project.builtUpSqft)}</span> sq.ft
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {project.buildings.map((b, idx) => (
                      <div key={b.id} className="rounded-xl border border-[#0f2b57]/15 bg-white p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="tabular text-caption text-[#3e86d0]">{String(idx + 1).padStart(2, "0")}</span>
                            <h3 className="font-display text-body-l font-bold text-[#0f2b57]">{b.name}</h3>
                          </div>
                          <StatusPill status={b.status} label={b.statusLabel} />
                        </div>
                        <p className="tabular mt-4 font-display text-2xl font-bold text-[#0f2b57]">
                          {num(b.builtUpSqft)}
                          <span className="ml-1 text-caption font-normal text-[#5a6b84]">sq.ft</span>
                        </p>
                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#0f2b57]/10">
                          <div className="h-full rounded-full bg-[#3e86d0]" style={{ width: `${(b.builtUpSqft / max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </div>
          </section>
        );
      })}

      {/* Delivery challenge */}
      <section className="bg-[#0f2b57] py-24 text-white">
        <Container>
          <p className={`${eyebrow} text-[#7fb6e8]`}>The delivery challenge</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold md:text-5xl">What it takes to build at this scale.</h2>
          <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {DELIVERY_FACTORS.map((f, i) => (
                <li key={f} className="flex gap-4 py-4 text-body text-white/85">
                  <span className="tabular text-caption text-[#7fb6e8]">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="space-y-8">
              {SITE_CHALLENGES.map((c) => (
                <div key={c.title} className="border-l-2 border-[#3e86d0] pl-5">
                  <h3 className="font-display text-body-l font-bold">{c.title}</h3>
                  <p className="mt-1 text-caption text-white/75">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-20 max-w-3xl font-display text-2xl font-bold text-[#7fb6e8] md:text-4xl">
            Success is not just about building structures, it&rsquo;s about delivering commitments.
          </p>
        </Container>
      </section>

      {/* Clients & partners */}
      <section className="bg-white py-24">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Clients &amp; partners</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">Built alongside the best.</h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {CLIENT_GROUPS.map((g) => (
              <div key={g.label}>
                <h3 className="border-b-2 border-[#3e86d0] pb-3 font-display text-body-l font-bold text-[#0f2b57]">
                  {g.label}
                </h3>
                <ul className="mt-4 divide-y divide-[#0f2b57]/10">
                  {g.names.map((name) => (
                    <li key={name} className="py-3 text-body text-[#5a6b84]">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
