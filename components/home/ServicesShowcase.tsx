import Image from "next/image";
import Link from "next/link";
import { Warehouse, Building2, Compass, Layers, Droplet, Waves, Route, Wrench, ArrowRight } from "lucide-react";
import { SERVICES_SHOWCASE } from "@/data/content/home";
import { IMAGES } from "@/data/images";

const ICONS = { Warehouse, Building2, Compass, Layers, Droplet, Waves, Route, Wrench };

export default function ServicesShowcase() {
  return (
    <section className="bg-white pb-24 pt-12">
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_SHOWCASE.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            const img = IMAGES[s.image];
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#E3EAF4] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_24px_48px_-16px_rgba(11,42,91,0.25)]"
              >
                <div className="relative h-44 w-full overflow-hidden bg-navy-900">
                  {img?.src && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/0 to-navy-900/10" />
                  <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-blue-600 shadow-md backdrop-blur transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <h3 className="text-body-l font-display font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-caption text-grey-500">{s.body}</p>
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
