import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import ProjectPlanViewer from "@/components/projects/ProjectPlanViewer";
import BuildingCards from "@/components/projects/BuildingCards";
import BuildingShowcase from "@/components/projects/BuildingShowcase";
import ProjectsHero3D from "@/components/projects/ProjectsHero3D";
import ProjectIndexGrid from "@/components/projects/ProjectIndexGrid";
import ClientsPartners from "@/components/projects/ClientsPartners";
import { IMAGES } from "@/data/images";
import { PROJECTS, PORTFOLIO_TOTALS } from "@/data/buildings";
import { listGallery, listProjects } from "@/lib/db";
import { loadPartnerGroups } from "@/lib/partners";
import { loadBuildingPhotos, photoKey } from "@/lib/buildingPhotos";

// cached; admin saves purge it (lib/revalidate.ts), and it refreshes every 5 minutes regardless
export const revalidate = 300;

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

export default async function ProjectsPage() {
  const [cards, clientGroups, photos, gallery] = await Promise.all([
    loadCards(),
    loadPartnerGroups(),
    loadBuildingPhotos(),
    listGallery().catch(() => []),
  ]);
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
      <ProjectsHero3D
        summary={`${PROJECTS.length} sites. ${PORTFOLIO_TOTALS.buildings} buildings. Grade-A warehousing delivered at scale.`}
        stats={heroStats}
        fallback={
          <SiteImage
            slot="projects-hero"
            image={{ ...IMAGES.heroAerial, caption: undefined }}
            ratio="auto"
            priority
            sizes="100vw"
            className="h-full w-full rounded-none border-0"
          />
        }
      />

      {/* Project index cards */}
      <section className="bg-white py-6">
        {/* same gutters as the card grid below, so the heading and the cards share a left edge */}
        <Container full className="px-6 md:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
                <span className="h-px w-10 bg-[#3e86d0]" />
                Our sites
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-6xl">
                Every site. <span className="join-shine">One standard.</span>
              </h2>
            </div>
            <p className="max-w-[34ch] text-body text-[#5a6b84] lg:text-right">
              {cards.length} sites, each with a live 3D plan below. Pick one to jump to its buildings.
            </p>
          </div>
        </Container>
        <ProjectIndexGrid cards={cards} detailSlugs={[...detailSlugs]} />
      </section>

      {/* Per-project detail */}
      {PROJECTS.map((project, i) => {
        return (
          <section key={project.slug} id={project.slug} className="scroll-mt-20">
            <div className={i % 2 === 0 ? "bg-[#f2f7fc]" : "bg-white"}>
              {/* Title: site number set large behind the name, key figures as chips on the right */}
              <Container full className="relative overflow-hidden pt-14">
                <span
                  aria-hidden
                  className="tabular pointer-events-none absolute -top-2 left-2 select-none font-display text-[11rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgba(62,134,208,0.22)] md:text-[15rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
                  <div>
                    <p className={`${eyebrow} flex items-center gap-2 text-[#3e86d0]`}>
                      <MapPin size={14} />
                      Site {String(i + 1).padStart(2, "0")} · {project.client}
                    </p>
                    <h2 className="mt-3 font-display text-5xl font-bold leading-none text-[#0f2b57] md:text-7xl">
                      {project.name}
                    </h2>
                    <p className="mt-4 max-w-[60ch] text-body text-[#5a6b84]">{project.description}</p>
                  </div>
                  <dl className="flex flex-wrap gap-3">
                    {[
                      { v: num(project.plotAcres), l: "acres" },
                      { v: String(project.buildingsCount), l: "buildings" },
                      { v: `${num(project.groundCoverage)}%`, l: "ground coverage" },
                    ].map((s) => (
                      <div
                        key={s.l}
                        className="rounded-2xl border border-[#0f2b57]/10 bg-white px-5 py-3 shadow-[0_1px_2px_rgba(15,43,87,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#3e86d0] hover:shadow-[0_18px_36px_-18px_rgba(62,134,208,0.7)]"
                      >
                        <dd className="tabular font-display text-2xl font-bold leading-none text-[#0f2b57]">{s.v}</dd>
                        <dt className="mt-1.5 text-caption text-[#5a6b84]">{s.l}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="relative mt-8 h-px bg-gradient-to-r from-[#3e86d0] via-[#3e86d0]/30 to-transparent" />
              </Container>

              {/* Plan + buildings */}
              <Container full className="grid grid-cols-1 gap-8 pb-14 pt-8 lg:grid-cols-12">
                {/* the plan stretches to the full height of the buildings column, so both sides start and end level */}
                <div className="flex flex-col lg:col-span-5">
                  <ProjectPlanViewer slug={project.slug} className="lg:h-auto lg:min-h-[400px] lg:flex-1" />
                </div>
                <div className="lg:col-span-7">
                  <BuildingCards
                    buildings={project.buildings}
                    totalSqft={project.builtUpSqft}
                    projectName={project.shortName}
                    photos={Object.fromEntries(project.buildings.map((b) => [b.id, photos[photoKey(project.slug, b.id)]]))}
                    sitePhotos={gallery
                      .filter((g) => g.categories.includes(project.shortName))
                      .map((g) => ({ src: g.src, caption: g.title }))}
                  />
                </div>
              </Container>

              {/* Building by building: pinned sideways presentation of the site photography */}
              <BuildingShowcase
                projectName={project.name}
                slides={project.buildings.map((b) => ({ ...b, ...photos[photoKey(project.slug, b.id)] }))}
              />
            </div>
          </section>
        );
      })}

      {/* Clients & partners */}
      <ClientsPartners groups={clientGroups} />
    </>
  );
}
