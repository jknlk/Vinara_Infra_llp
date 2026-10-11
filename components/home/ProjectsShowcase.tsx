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
            <div className="inline-flex items-center gap-2 text-label font-semibold uppercase tracking-[0.18em] text-blue-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Featured Projects
            </div>
            <h2 className="mt-3 font-display text-display-l leading-[1.02] text-ink">
              Landmarks in
              <span className="join-shine block pb-[0.08em]">steel &amp; concrete.</span>
            </h2>
          </div>

          <div className="max-w-md lg:text-right">
            <p className="text-body-l text-grey-500">
              Completed and in-progress builds — each tracked against real area, client
              and delivery status.
            </p>
            <Link href="/projects" className="group/cta relative mt-5 inline-flex">
              <span className="pointer-events-none absolute -inset-1 overflow-hidden rounded-full opacity-50 blur-lg transition-opacity duration-300 group-hover/cta:opacity-100">
                <span className="join-glow absolute inset-[-150%]" />
              </span>
              <span className="relative inline-flex overflow-hidden rounded-full p-[2px]">
                <span className="join-glow absolute inset-[-150%]" />
                <span className="relative inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-body font-semibold text-white">
                  Live Build Experience
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover/cta:rotate-45 group-hover/cta:scale-110">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* full-bleed: the looping rows run edge to edge */}
      <ProjectsStage projects={projects} />
    </section>
  );
}
