import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectsArc from "@/components/home/ProjectsArc";
import type { HomeData } from "@/data/content/homeAdmin";

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
  return `${Math.round(sum).toLocaleString("en-IN")} sq.ft`;
}

export default function ProjectsStage({ projects }: { projects: HomeData[] }) {
  if (!projects.length) return null;

  const completed = projects.filter(isDone).length;
  const area = totalArea(projects);
  const stats = [
    { value: pad(projects.length), label: "Buildings" },
    { value: pad(completed), label: "Delivered" },
    { value: pad(projects.length - completed), label: "In progress" },
    ...(area ? [{ value: area, label: "Built-up area" }] : []),
  ];

  return (
    <div className="mt-10">
      <dl className="mx-auto flex w-full max-w-[1680px] flex-wrap gap-x-8 gap-y-3 px-4 sm:gap-x-12 sm:px-6 lg:px-8">
        {stats.map((s) => (
          <div key={s.label}>
            <dd className="tabular text-body-l font-display font-bold text-ink sm:text-display-m">{s.value}</dd>
            <dt className="mt-1 text-label uppercase tracking-[0.08em] text-grey-500">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col">
        <ProjectsArc projects={projects} />

        <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-5 px-4 pb-2 pt-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:pt-10 lg:pb-4">
          <div>
            <p className="text-display-m font-display leading-[1.1] text-ink">
              Have a project to build <span className="text-blue-600">like these?</span>
            </p>
            <p className="mt-2 max-w-2xl text-body-l text-grey-500">
              Tell us your site, area and timeline — our team will get back to you with a plan and a quote.
            </p>
          </div>
          <Link
            href="/contact"
            className="group/cta inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-blue-600 px-7 py-3.5 text-body font-semibold text-white transition-colors hover:bg-ink lg:self-auto"
          >
            Contact Us
            <ArrowUpRight size={18} className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
