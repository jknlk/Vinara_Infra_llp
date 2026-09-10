import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PROJECTS_SHOWCASE } from "@/data/content/projectsShowcase";
import { IMAGES } from "@/data/images";

function ProjectCard({ project, featured = false }: { project: (typeof PROJECTS_SHOWCASE)[number]; featured?: boolean }) {
  const image = IMAGES[project.imageKey];
  const badgeColor =
    project.status === "completed" ? "bg-green-500/90 text-white" : "bg-sky-400/90 text-ink";

  return (
    <Link
      href={project.href}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 ${
        featured ? "min-h-[440px]" : "min-h-[320px]"
      }`}
    >
      {image?.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <span
        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-label font-semibold uppercase tracking-[0.06em] ${badgeColor}`}
      >
        {project.statusLabel}
      </span>

      <div className="relative z-10 p-5">
        <p className="flex items-center gap-1.5 text-caption text-grey-300">
          <MapPin size={13} />
          {project.location}
        </p>
        <h3 className="mt-1 text-body-l font-display font-bold text-white">{project.name}</h3>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-label uppercase tracking-[0.06em] text-grey-300">Client</p>
            <p className="mt-0.5 text-caption font-medium text-white">{project.client}</p>
          </div>
          <div className="text-right">
            <p className="text-label uppercase tracking-[0.06em] text-grey-300">Area</p>
            <p className="tabular mt-0.5 text-caption font-medium text-white">{project.area}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-label uppercase tracking-[0.06em] text-grey-300">
            <span>Progress</span>
            <span className="tabular">{project.progress}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-sky-400"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-caption font-semibold text-white group-hover:text-sky-200">
          View Details
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsShowcase() {
  const [featured1, featured2, ...rest] = PROJECTS_SHOWCASE;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
              <span className="h-px w-6 bg-blue-500" />
              Featured Projects
            </div>
            <h2 className="mt-4 max-w-xl text-display-m font-display leading-[1.1]">
              <span className="text-ink">Landmarks in </span>
              <span className="text-blue-600">steel &amp; concrete.</span>
            </h2>
          </div>

          <div className="max-w-sm lg:text-right">
            <p className="text-body-l text-grey-500">
              Twelve completed and in-progress builds — each tracked against real area, client
              and delivery status.
            </p>
            <Link
              href="/projects"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-50 px-5 py-2.5 text-caption font-semibold text-blue-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Live Build Experience
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProjectCard project={featured1} featured />
          <ProjectCard project={featured2} featured />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
