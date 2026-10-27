import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceChapters from "@/components/services/ServiceChapters";
import RmcCapabilityGrid from "@/components/services/RmcCapabilityGrid";
import RmcOperations from "@/components/services/RmcOperations";
import WorkflowTrack from "@/components/services/WorkflowTrack";
import { IMAGES } from "@/data/images";
import { loadServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Vinara Infra LLP",
  description: "Warehousing, industrial, precast, infrastructure, MEP, PEB and interior works, plus our in-house RMC plant.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";

export default async function ServicesPage() {
  const services = await loadServices();
  return (
    <>
      <ServicesHero services={services} />

      <ServiceChapters services={services} />

      {/* RMC */}
      <section id="rmc" className="bg-white py-14 text-ink md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 md:pt-14 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <p className={`${eyebrow} tabular flex items-center gap-3 text-blue-600`}>
                <span className="h-px w-10 bg-blue-600" />
                {String(services.length + 1).padStart(2, "0")}
                <span className="text-grey-300">—</span>
                In-house
              </p>
              <h2 className="mt-5 font-display text-display-l text-ink">
                RMC Plant &amp;{" "}
                <span className="block join-shine pb-[0.08em]">
                  Concrete Supply
                </span>
              </h2>
              <p className="mt-6 max-w-[30ch] font-display text-2xl font-medium leading-[1.25] tracking-tight text-ink md:text-[1.75rem]">
                Efficient, consistent, large-scale production with reliable supply and superior quality for every
                project.
              </p>
            </div>
            <div className="lg:col-span-5">
              <SiteImage
                slot="service-rmc"
                image={IMAGES.serviceRmc}
                ratio="4/3"
                sizes="(min-width:1024px) 40vw, 100vw"
                className="rounded-3xl border-0"
              />
            </div>
          </div>
        </Container>

        <RmcCapabilityGrid />

        <Container>
          <RmcOperations />

          <p className="mt-12 max-w-[18ch] join-shine pb-[0.08em] font-display text-display-l">
            Built for reliability. Designed for performance.
          </p>
        </Container>
      </section>

      <WorkflowTrack />
    </>
  );
}
