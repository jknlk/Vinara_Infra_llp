"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Check, Factory, Layers, Warehouse, Cog, PackageSearch, FlaskConical, Truck, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import {
  RMC_PLANT_FACILITY,
  RMC_PRODUCT_RANGE,
  RMC_QUALITY_ASSURANCE,
  RMC_FLEET,
  RMC_STRENGTHS,
} from "@/data/content/services";

const eyebrow = "text-label uppercase tracking-[0.14em]";

const FACILITY_ICONS = [Factory, Layers, Warehouse, Cog];

function FacilityCard({
  icon: Icon,
  index,
  title,
  body,
}: {
  icon: typeof Factory;
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div
      data-rmc-item
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3e86d0]/60 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-16px_rgba(62,134,208,0.35)]"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#3e86d0]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#3e86d0]/15 text-[#7fb6e8] ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-[#3e86d0]/25">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="tabular text-caption font-semibold text-white/30">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="relative mt-5 font-display text-body-l font-bold leading-snug text-white">{title}</h3>
      <p className="relative mt-2 text-caption leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

const COLUMN_ICONS = { product: PackageSearch, quality: FlaskConical, fleet: Truck, strengths: Award };

function BulletColumn({
  icon: Icon,
  label,
  items,
}: {
  icon: typeof PackageSearch;
  label: string;
  items: string[];
}) {
  return (
    <div
      data-rmc-item
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#3e86d0]/15 text-[#7fb6e8] ring-1 ring-inset ring-white/10">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <p className={`${eyebrow} text-[#7fb6e8]`}>{label}</p>
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((p) => (
          <li key={p} className="flex items-start gap-3 text-body text-white/75">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#3e86d0]/15 text-[#7fb6e8]">
              <Check size={11} strokeWidth={2.5} />
            </span>
            <span className="leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RmcCapabilityGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-rmc-item]");

      items.forEach((item) => {
        gsap.from(item, {
          x: -160,
          opacity: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="mt-16">
      <Container full className="px-6 md:px-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RMC_PLANT_FACILITY.map((f, i) => (
            <FacilityCard key={f.title} icon={FACILITY_ICONS[i]} index={i} title={f.title} body={f.body} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <BulletColumn icon={COLUMN_ICONS.product} label="Product range" items={RMC_PRODUCT_RANGE} />
          <BulletColumn icon={COLUMN_ICONS.quality} label="Quality assurance" items={RMC_QUALITY_ASSURANCE} />
          <BulletColumn icon={COLUMN_ICONS.fleet} label="Fleet & logistics" items={RMC_FLEET} />
          <BulletColumn icon={COLUMN_ICONS.strengths} label="Key strengths" items={RMC_STRENGTHS} />
        </div>
      </Container>
    </div>
  );
}
