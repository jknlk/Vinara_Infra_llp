import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { loadHome } from "@/lib/homeContent";
import ProjectsStage from "@/components/home/ProjectsStage";

export default async function ProjectsShowcase() {
  const projects = await loadHome("featured");

  return (
    <section className="bg-white pt-2 pb-0">
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
              Completed and in-progress builds — each tracked against real area, client
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
      </div>

      {/* full-bleed: the looping rows run edge to edge */}
      <ProjectsStage projects={projects} />
    </section>
  );
}
