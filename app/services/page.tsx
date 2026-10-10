import type { Metadata } from "next";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import ServicesHero from "@/components/services/ServicesHero";
import RmcCapabilityGrid from "@/components/services/RmcCapabilityGrid";
import RmcOperations from "@/components/services/RmcOperations";
import { IMAGES } from "@/data/images";
import {
  SERVICE_SECTIONS,
  WORKFLOW,
} from "@/data/content/services";

export const metadata: Metadata = {
  title: "Services — Vinara Infra LLP",
  description: "Warehousing, industrial, precast and infrastructure construction, plus our in-house RMC plant.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      {/* Service rows */}
      {SERVICE_SECTIONS.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`py-6 ${flip ? "bg-[#f2f7fc]" : "bg-white"}`}>
            <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-2xl">
                  <SiteImage
                    slot={s.slug}
                    image={IMAGES[s.imageKey as keyof typeof IMAGES]}
                    ratio="4/3"
                    className="rounded-2xl border-0"
                  />
                  <span className="absolute left-5 top-4 font-display text-6xl font-bold text-white drop-shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
                <p className={`${eyebrow} text-[#3e86d0]`}>Capability {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">{s.title}</h2>
                <p className="mt-5 text-body-l text-[#5a6b84]">{s.body}</p>
                <ul className="mt-8 grid grid-cols-1 border-t border-[#0f2b57]/15 sm:grid-cols-2 sm:gap-x-8">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-[#0f2b57]/15 py-3 text-body font-medium text-[#0f2b57]"
                    >
                      <Check size={16} className="shrink-0 text-[#3e86d0]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-caption text-[#5a6b84]">Reference: {s.reference}</p>
              </div>
            </Container>
          </section>
        );
      })}

      {/* RMC */}
      <section id="rmc" className="relative overflow-hidden bg-gradient-to-b from-[#eef5ff] via-white to-[#f3f8ff] py-8 text-[#0f2b57]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-[#4d94ff]/20 blur-[120px]" />
          <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#9fd0ff]/30 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: "radial-gradient(#b5cdff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "linear-gradient(to bottom, #000, transparent 60%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 60%)",
            }}
          />
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
                <span className="h-px w-10 bg-[#3e86d0]" />
                In-house
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
                RMC Plant &amp;{" "}
                <span className="bg-gradient-to-r from-[#0048b0] to-[#4d94ff] bg-clip-text text-transparent">
                  Concrete Supply
                </span>
              </h2>
              <p className="mt-6 max-w-[58ch] text-body-l text-[#5a6b84]">
                Efficient, consistent, large-scale production with reliable supply and superior quality for every
                project.
              </p>
            </div>
            <div className="relative lg:col-span-5">
              <div className="absolute -inset-3 -z-10 rotate-2 rounded-[28px] bg-gradient-to-br from-[#4d94ff]/40 to-[#9fd0ff]/20 blur-sm" />
              <div className="overflow-hidden rounded-2xl border border-white bg-white p-2 shadow-[0_30px_60px_-20px_rgba(0,72,176,0.35)]">
                <SiteImage slot="service-rmc" image={IMAGES.serviceRmc} ratio="16/10" className="rounded-xl border-0" />
              </div>
            </div>
          </div>
        </Container>

        <RmcCapabilityGrid />

        <Container className="relative">
          <RmcOperations />

          <p className="mt-8 bg-gradient-to-r from-[#0048b0] via-[#4d94ff] to-[#0048b0] bg-clip-text font-display text-2xl font-extrabold text-transparent md:text-5xl">
            Built for reliability. Designed for performance.
          </p>
        </Container>
      </section>

      {/* Workflow */}
      <section className="bg-white py-6">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Workflow</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            Six stages. One accountable team.
          </h2>
          <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {WORKFLOW.map((w, i) => (
              <li key={w} className="border-t-2 border-[#3e86d0] pt-5">
                <span className="tabular font-display text-3xl font-bold text-[#3e86d0]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-body font-medium text-[#0f2b57]">{w}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
