import Link from "next/link";
import type { ProjectSite } from "@/data/buildings";
import StatusPill from "@/components/ui/StatusPill";
import ProgressBar from "@/components/ui/ProgressBar";

function formatArea(v: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v);
}

export default function ProjectCard({
  project,
  className = "",
  featured = false,
}: {
  project: ProjectSite;
  className?: string;
  featured?: boolean;
}) {
  const progressPct = Math.round(((project.completed + project.wip * 0.5) / project.buildingsCount) * 100);

  return (
    <Link
      href={`/projects#${project.slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-navy-500 bg-navy-900 p-6 transition-colors hover:border-sky-400/50 ${
        featured ? "min-h-[420px] p-8" : "min-h-[220px]"
      } ${className}`}
    >
      <div>
        <StatusPill status={project.wip > 0 ? "wip" : project.completed === project.buildingsCount ? "completed" : "upcoming"} label={`${project.completed} completed · ${project.wip} in progress`} />
        <p className="mt-4 text-caption uppercase tracking-[0.08em] text-grey-300">{project.client}</p>
        <h3 className={`mt-1 font-display font-bold text-ink ${featured ? "text-display-l" : "text-display-m"}`}>
          {project.name}
        </h3>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between text-caption text-grey-300">
          <span>Built-up area</span>
          <span className="tabular text-ink">{formatArea(project.builtUpSqft)} sq.ft</span>
        </div>
        <ProgressBar percent={progressPct} color="var(--color-sky-400)" className="mt-3" />
        <span className="mt-4 inline-block text-caption font-medium text-navy-700 group-hover:text-sky-400">
          View details
        </span>
      </div>
    </Link>
  );
}
