import { Target, Telescope } from "lucide-react";
import Container from "@/components/ui/Container";
import { MISSION_VISION } from "@/data/content/about";

export default function MissionVision() {
  return (
    <section className="bg-white py-8 md:py-8">
      <Container>
        <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
          <span className="h-px w-12 bg-[#3e86d0]" />
          Mission &amp; Vision
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-display-m text-[#0f2b57]">
          What drives us, and where we are headed.
        </h2>

        <div className="m-scroll mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0f2b57] via-[#0d3a7d] to-[#0b4fc2] p-8 text-white shadow-[0_30px_60px_-30px_rgba(11,79,194,0.6)] md:p-12">
            <Target
              aria-hidden
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-12 -right-10 h-64 w-64 text-white/[0.07] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <Target size={26} />
            </span>
            <h3 className="mt-8 font-display text-3xl font-bold">Our Mission</h3>
            <span className="mt-5 block h-1 w-12 rounded-full bg-[#7fb6e8]" />
            <p className="relative mt-6 max-w-xl text-body-l text-white/85">{MISSION_VISION.mission}</p>
          </article>

          <article className="group relative overflow-hidden rounded-[28px] border border-[#0f2b57]/10 bg-[#f4f8fd] p-8 text-[#0f2b57] md:p-12">
            <Telescope
              aria-hidden
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-12 -right-10 h-64 w-64 text-[#0b4fc2]/[0.07] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
            />
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b4fc2] text-white shadow-[0_12px_24px_-10px_rgba(11,79,194,0.7)]">
              <Telescope size={26} />
            </span>
            <h3 className="mt-8 font-display text-3xl font-bold">Our Vision</h3>
            <span className="mt-5 block h-1 w-12 rounded-full bg-[#0b4fc2]" />
            <p className="relative mt-6 max-w-xl text-body-l text-[#5a6b84]">{MISSION_VISION.vision}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
