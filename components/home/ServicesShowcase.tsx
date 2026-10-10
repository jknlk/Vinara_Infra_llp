import Link from "next/link";
import { ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";
import ServicesArc from "@/components/home/ServicesArc";
import { SERVICES_SHOWCASE } from "@/data/content/home";
import { IMAGES } from "@/data/images";

export default function ServicesShowcase() {
  return (
    <section className="bg-white pb-4 pt-4">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <span className="h-px w-6 bg-blue-500" />
            Our Services
          </div>

          <h2 className="mt-4 text-display-m font-display leading-[1.1]">
            <span className="text-ink">One partner. </span>
            <span className="text-blue-600">Every discipline.</span>
          </h2>
        </div>

        <div className="lg:max-w-[52ch] lg:text-right">
          <p className="text-body-l text-grey-500">
            Eight integrated capabilities, one accountable team. From foundation to finishing, from
            earthworks to precast — Vinara delivers the full stack.
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <MoveHorizontal size={14} className="text-blue-600" />
            Drag to explore
          </p>
        </div>
      </div>

      <div className="mt-6 lg:mt-8">
        <ServicesArc
          cards={SERVICES_SHOWCASE.map((s) => ({
            tag: s.tag,
            title: s.title,
            body: s.body,
            href: s.href,
            image: IMAGES[s.image],
          }))}
        />
      </div>

      {/* Sits in the hollow under the arc on desktop, where the centre cards are shortest. */}
      <div className="pointer-events-none relative z-10 mx-auto mt-2 flex max-w-xl flex-col items-center px-4 text-center lg:mt-[calc(-7.5*clamp(13.5px,1vw,24px))]">
        <p className="text-body-l text-grey-500">
          Need more than one discipline on the same site? We plan, build and hand over the whole
          scope under a single contract.
        </p>
        <div className="pointer-events-auto mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/services"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-ink"
          >
            View All Services
            <ArrowRight size={18} className="transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="group/cta inline-flex items-center gap-2 rounded-full border border-grey-300 bg-white px-6 py-3 text-body font-semibold text-ink transition-colors hover:bg-paper"
          >
            Get a Quote
            <ArrowUpRight size={18} className="transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
