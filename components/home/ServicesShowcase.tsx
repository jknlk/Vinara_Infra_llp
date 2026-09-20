import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_SHOWCASE } from "@/data/content/home";
import { IMAGES } from "@/data/images";

export default function ServicesShowcase() {
  return (
    <section className="bg-surface pb-16 pt-4">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Our Services
        </div>

        <h2 className="mt-4 max-w-2xl text-display-m font-display leading-[1.1]">
          <span className="text-ink">One partner. </span>
          <span className="text-blue-600">Every discipline.</span>
        </h2>

        <p className="mt-6 max-w-[62ch] text-body-l text-grey-500">
          Eight integrated capabilities, one accountable team. From foundation to finishing, from
          earthworks to precast — Vinara delivers the full stack.
        </p>
      </div>

      <div className="group/track relative mt-12 w-full overflow-x-hidden overflow-y-visible py-4">
        <div className="animate-marquee flex w-max gap-6 px-3 [animation-duration:45s] group-hover/track:[animation-play-state:paused]">
          {[...SERVICES_SHOWCASE, ...SERVICES_SHOWCASE].map((s, i) => {
            const img = IMAGES[s.image];
            return (
              <Link
                key={`${s.title}-${i}`}
                href={s.href}
                className="group flex h-[440px] w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl border-2 border-[#E3EAF4] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500 hover:shadow-[0_0_0_3px_rgba(26,95,196,0.55),0_24px_48px_-16px_rgba(11,42,91,0.45)] sm:w-[340px]"
              >
                <div className="relative h-56 w-full shrink-0 overflow-hidden bg-navy-900">
                  {img?.src && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="340px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <span className="tabular absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-caption font-semibold text-white backdrop-blur">
                    {String((i % SERVICES_SHOWCASE.length) + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-blue-600/90 px-3 py-1.5 text-label font-semibold uppercase tracking-[0.04em] text-white backdrop-blur">
                    {s.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <h3 className="text-body-l font-display font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-caption text-grey-500">{s.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-label font-semibold uppercase tracking-[0.08em] text-blue-600 group-hover:text-blue-700">
                    Learn more
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
