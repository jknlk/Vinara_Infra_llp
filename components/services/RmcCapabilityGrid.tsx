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
      className="group relative overflow-hidden rounded-3xl border border-[#dbe9fa] bg-white p-7 shadow-[0_10px_30px_-18px_rgba(0,72,176,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-[#4d94ff]/60 hover:shadow-[0_30px_60px_-24px_rgba(0,72,176,0.5)]"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0048b0] to-[#9fd0ff] transition-transform duration-500 group-hover:scale-x-100" />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#4d94ff]/15 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#4d94ff]/25" />
      <span className="tabular pointer-events-none absolute -bottom-4 right-3 font-display text-8xl font-extrabold leading-none text-[#0048b0]/[0.06] transition-colors duration-500 group-hover:text-[#0048b0]/[0.12]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#0048b0] to-[#4d94ff] text-white shadow-[0_10px_20px_-8px_rgba(0,72,176,0.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon size={24} strokeWidth={1.75} />
      </span>
      <h3 className="relative mt-6 font-display text-body-l font-bold leading-snug text-[#0f2b57]">{title}</h3>
      <p className="relative mt-2 text-caption leading-relaxed text-[#5a6b84]">{body}</p>
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
      className="group relative overflow-hidden rounded-3xl border border-[#dbe9fa] bg-gradient-to-b from-white to-[#f5f9ff] p-7 shadow-[0_10px_30px_-18px_rgba(0,72,176,0.3)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(0,72,176,0.45)]"
    >
      <div className="flex items-center gap-3 border-b border-[#e3eefb] pb-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0048b0] to-[#4d94ff] text-white shadow-[0_8px_16px_-8px_rgba(0,72,176,0.6)]">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <p className={`${eyebrow} text-[#0048b0]`}>{label}</p>
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((p) => (
          <li key={p} className="flex items-start gap-3 text-body text-[#3d4f6b]">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4d94ff]/15 text-[#0048b0] transition-colors duration-300 group-hover:bg-[#0048b0] group-hover:text-white">
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
    <div ref={rootRef} className="mt-8">
      <Container full className="px-6 md:px-12">
        <div className="m-scroll grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RMC_PLANT_FACILITY.map((f, i) => (
            <FacilityCard key={f.title} icon={FACILITY_ICONS[i]} index={i} title={f.title} body={f.body} />
          ))}
        </div>

        <div className="m-scroll mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <BulletColumn icon={COLUMN_ICONS.product} label="Product range" items={RMC_PRODUCT_RANGE} />
          <BulletColumn icon={COLUMN_ICONS.quality} label="Quality assurance" items={RMC_QUALITY_ASSURANCE} />
          <BulletColumn icon={COLUMN_ICONS.fleet} label="Fleet & logistics" items={RMC_FLEET} />
          <BulletColumn icon={COLUMN_ICONS.strengths} label="Key strengths" items={RMC_STRENGTHS} />
        </div>
      </Container>
    </div>
  );
}
