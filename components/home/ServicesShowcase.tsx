import Link from "next/link";
import { Warehouse, Building2, Compass, Layers, Droplet, Waves, Route, Wrench, ArrowRight } from "lucide-react";
import { SERVICES_SHOWCASE } from "@/data/content/home";

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
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col rounded-2xl border border-[#E3EAF4] bg-white p-6 transition-all hover:border-blue-400 hover:bg-gradient-to-b hover:from-blue-50/60 hover:to-white hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-body-l font-display font-bold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-caption text-grey-500">{s.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-label font-semibold uppercase tracking-[0.08em] text-blue-600 group-hover:text-blue-700">
                  Learn more
                  <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
