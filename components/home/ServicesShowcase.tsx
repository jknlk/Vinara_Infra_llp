import Link from "next/link";
import { ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";
import ServicesArc from "@/components/home/ServicesArc";
import { SERVICES_SHOWCASE } from "@/data/content/home";
import { IMAGES } from "@/data/images";

// Spaces inside SVG text collapse, so the caption's gaps are non-breaking ones.
const NBSP = " ";

// The line under the cards: each entry is an ink lead-in and a blue finish.
const CAPTION = [
  ["The whole scope.", "One contract."],
  ["Eight disciplines.", "One accountable team."],
  ["We plan, build", "and hand it over."],
];

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
            <span className="join-shine">Every discipline.</span>
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
          caption={CAPTION.map(([lead, rest]) => (
            <tspan key={lead}>
              <tspan className="fill-ink font-display font-extrabold">{lead.replace(/ /g, NBSP)}</tspan>
              <tspan className="fill-blue-600 font-display font-extrabold">
                {NBSP}
                {rest.replace(/ /g, NBSP)}
              </tspan>
              <tspan className="fill-sky-400" style={{ fontSize: "0.6em" }}>
                {NBSP.repeat(4)}✦{NBSP.repeat(4)}
              </tspan>
            </tspan>
          ))}
        />
      </div>

      {/* The line loops along the curve under the cards, where it is hidden
          from assistive tech. This is the copy it reads. */}
      <p className="sr-only">
        The whole scope, one contract. Need more than one discipline on the same site? We plan,
        build and hand it over as one accountable team.
      </p>

      {/* Sits in the hollow under the arc on desktop, where the centre cards are shortest. */}
      <div className="pointer-events-none relative z-10 mx-auto mt-6 flex max-w-xl flex-col items-center px-4 text-center lg:mt-[calc(-5*clamp(13.5px,1vw,24px))]">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4">
          <Link href="/services" className="group/cta relative inline-flex">
            <span className="pointer-events-none absolute -inset-1 overflow-hidden rounded-full opacity-50 blur-lg transition-opacity duration-300 group-hover/cta:opacity-100">
              <span className="join-glow absolute inset-[-150%]" />
            </span>
            <span className="relative inline-flex overflow-hidden rounded-full p-[2px]">
              <span className="join-glow absolute inset-[-150%]" />
              <span className="relative inline-flex items-center gap-3 rounded-full bg-blue-600 py-2 pl-6 pr-2 text-body font-semibold text-white transition-colors duration-300 group-hover/cta:bg-ink">
                View All Services
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-blue-600 transition-transform duration-500 group-hover/cta:-rotate-45 group-hover/cta:scale-110 group-hover/cta:text-ink">
                  <ArrowRight size={16} />
                </span>
              </span>
            </span>
          </Link>
          <Link
            href="/contact"
            className="group/cta inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white py-2 pl-6 pr-2 text-body font-semibold text-ink shadow-[0_8px_24px_-12px_rgba(0,72,176,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-[0_14px_30px_-12px_rgba(0,72,176,0.6)]"
          >
            Get a Quote
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600 transition-all duration-500 group-hover/cta:rotate-45 group-hover/cta:bg-blue-600 group-hover/cta:text-white">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
