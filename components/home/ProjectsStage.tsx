import ProjectsArc from "@/components/home/ProjectsArc";
import CtaRibbon from "@/components/home/CtaRibbon";
import type { HomeData } from "@/data/content/homeAdmin";

// Spaces inside SVG text collapse, so the caption's gaps are non-breaking ones.
const NBSP = " ";

const pad = (n: number) => String(n).padStart(2, "0");
const isDone = (p: HomeData) => p.status === "completed";

// Sums the built-up area only when every card uses a plain "<number> sq.ft" value.
function totalArea(projects: HomeData[]): string | null {
  let sum = 0;
  for (const p of projects) {
    const value = parseFloat((p.area ?? "").replace(/,/g, ""));
    if (!Number.isFinite(value) || !/sq\.?\s*ft/i.test(p.area ?? "")) return null;
    sum += value;
  }
  return Math.round(sum).toLocaleString("en-IN");
}

export default function ProjectsStage({ projects }: { projects: HomeData[] }) {
  if (!projects.length) return null;

  const completed = projects.filter(isDone).length;
  const area = totalArea(projects);
  const stats = [
    ...(area ? [{ value: `${area} sq.ft`, label: "Total built-up area" }] : []),
    { value: pad(projects.length), label: "Buildings" },
    { value: pad(completed), label: "Delivered" },
    { value: pad(projects.length - completed), label: "In progress" },
  ];

  return (
    <div className="mt-10">
      {/* The figures loop along the curve under the cards, where they are
          hidden from assistive tech. This is the copy it reads. */}
      <dl className="sr-only">
        {stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col">
        <ProjectsArc
          projects={projects}
          caption={stats.map((s) => (
            <tspan key={s.label}>
              <tspan className="tabular fill-ink font-display font-extrabold">{s.value}</tspan>
              <tspan className="fill-grey-500 font-semibold uppercase tracking-[0.12em]" style={{ fontSize: "0.5em" }}>
                {NBSP}
                {NBSP}
                {s.label.replace(/ /g, NBSP)}
              </tspan>
              <tspan className="fill-sky-400" style={{ fontSize: "0.6em" }}>
                {NBSP.repeat(4)}✦{NBSP.repeat(4)}
              </tspan>
            </tspan>
          ))}
        />

        {/* The ribbon's trough hangs past the end of this section, over the top of the next. */}
        <div className="relative z-10 -mb-[78px] -mt-[22px] md:-mb-[4.9%] md:-mt-[2.9%]">
          <CtaRibbon href="/contact" />
        </div>
      </div>
    </div>
  );
}
