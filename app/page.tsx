import Link from "next/link";
import Hero from "@/components/hero/Hero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import SiteImage from "@/components/ui/SiteImage";
import StatBlock from "@/components/ui/StatBlock";
import DataPanel from "@/components/ui/DataPanel";
import ProjectCard from "@/components/projects/ProjectCard";
import DeliveryTrack from "@/components/home/DeliveryTrack";
import { PROJECTS } from "@/data/buildings";
import { IMAGES } from "@/data/images";
import { CAPABILITY_STRIP, ABOUT_PREVIEW_POINTS, CAPABILITIES, HOME_STATS } from "@/data/content/home";
import { CLIENTS, PMC_PARTNERS, TENANTS } from "@/data/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* S2 · Capability strip */}
      <section className="border-y border-navy-500 bg-navy-900">
        <Container className="grid grid-cols-1 divide-y divide-navy-500 md:grid-cols-5 md:divide-x md:divide-y-0">
          {CAPABILITY_STRIP.map((c) => (
            <div key={c.title} className="px-0 py-8 md:px-6">
              <p className="text-body-l font-display font-bold text-white">{c.title}</p>
              <p className="mt-2 text-caption text-grey-300">{c.line}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* S3 · About preview */}
      <section className="bg-paper py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SiteImage slot="about-interior" image={IMAGES.aboutInterior} ratio="4/3" />
          </div>
          <div className="lg:col-span-6">
            <SectionHead
              tone="light"
              title="We measure everything we build."
              className=""
            />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ABOUT_PREVIEW_POINTS.map((p) => (
                <li key={p} className="rounded-xl border border-[#E3EAF4] bg-white px-4 py-3 text-body font-medium text-ink">
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/about" className="mt-8 inline-block text-body font-semibold text-navy-700 underline underline-offset-4">
              Learn about Vinara
            </Link>
          </div>
        </Container>
      </section>

      {/* S4 · Capabilities */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Capabilities" standfirst="Six disciplines, one accountable delivery team." />
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-navy-500 bg-navy-500 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="bg-navy-900 p-8">
                <h3 className="text-body-l font-display font-bold text-white">{c.title}</h3>
                <ul className="mt-4 space-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="text-caption text-grey-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/services" className="mt-8 inline-block text-body font-semibold text-sky-200 hover:text-sky-400">
            Explore all services
          </Link>
        </Container>
      </section>

      {/* S5 · Projects */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Live projects" standfirst="Three industrial parks, 23 buildings, one instrumented delivery model." />
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <ProjectCard project={PROJECTS[0]} featured className="lg:col-span-1 lg:row-span-2" />
            <ProjectCard project={PROJECTS[1]} />
            <ProjectCard project={PROJECTS[2]} />
          </div>
          <Link href="/projects" className="mt-8 inline-block text-body font-semibold text-sky-200 hover:text-sky-400">
            View all projects
          </Link>
        </Container>
      </section>

      {/* S6 · By the numbers */}
      <section className="border-y border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="By the numbers" />
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {HOME_STATS.map((s) => (
              <StatBlock key={s.label} value={s.value} decimals={s.decimals} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* S7 · How we deliver */}
      <section className="bg-paper py-24">
        <Container>
          <SectionHead tone="light" title="How we deliver" standfirst="A disciplined ten-stage sequence from planning to handover." />
        </Container>
        <div className="mt-12">
          <Container className="lg:max-w-none lg:px-12">
            <DeliveryTrack />
          </Container>
        </div>
      </section>

      {/* S8 · Trusted by */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Trusted by" />
          <div className="relative mt-12 overflow-hidden">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              {[...CLIENTS, ...PMC_PARTNERS, ...TENANTS].map((name) => (
                <div key={name} className="flex h-16 items-center justify-center rounded-lg border border-navy-500 px-4 text-center text-caption font-medium text-grey-300">
                  {name}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent" />
          </div>
        </Container>
      </section>

      {/* S9 · CTA */}
      <section className="bg-ink pb-24 pt-4">
        <Container>
          <DataPanel accent="var(--color-sky-400)" className="p-10 md:p-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <h2 className="text-display-l font-display text-white">Let&rsquo;s build together.</h2>
                <p className="mt-4 max-w-[46ch] text-body-l text-grey-300">
                  Have a warehousing brief, an infrastructure programme or a design-build enquiry? Our senior
                  team responds within 24 hours.
                </p>
              </div>
              <div className="lg:col-span-6">
                <Link
                  href="/contact"
                  className="inline-block rounded-full bg-white px-8 py-4 text-body font-semibold text-ink hover:bg-sky-200"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </DataPanel>
        </Container>
      </section>
    </>
  );
}
