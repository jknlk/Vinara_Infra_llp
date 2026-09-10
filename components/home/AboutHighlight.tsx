import { Zap, ShieldCheck, Users, HardHat } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { IMAGES } from "@/data/images";

const PILLARS = [
  {
    icon: Zap,
    title: "Technology-led",
    body: "Tools and methods that accelerate output and improve predictability.",
  },
  {
    icon: ShieldCheck,
    title: "QHSE Commitment",
    body: "Uncompromised focus on Quality, Health, Safety and Environment.",
  },
  {
    icon: Users,
    title: "People & Culture",
    body: "Trust, transparency, accountability and discipline at every level.",
  },
  {
    icon: HardHat,
    title: "Design-Build",
    body: "Efficient, durable, scalable structures aligned to modern needs.",
  },
];

export default function AboutHighlight() {
  const photo = IMAGES.aboutInterior;

  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-24">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
        <div className="relative flex lg:col-span-6">
          <div className="relative min-h-[360px] w-full flex-1 overflow-hidden rounded-2xl border border-[#E3EAF4]">
            {photo.src ? (
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            ) : null}
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[#E3EAF4] bg-white/95 px-6 py-4 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6">
              <p className="text-label uppercase tracking-[0.08em] text-blue-600">Flagship Program</p>
              <p className="tabular mt-1 text-body-l font-display font-bold text-ink">
                NELA 1 · 113.01 Acres · Assetz Industrial Park
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-6">
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <span className="h-px w-6 bg-blue-500" />
            About Vinara
          </div>

          <h2 className="mt-4 text-display-m font-display leading-[1.1]">
            <span className="block text-ink">Technology-led delivery.</span>
            <span className="block text-blue-600">Uncompromised QHSE.</span>
          </h2>

          <p className="mt-6 max-w-[54ch] text-body-l text-grey-500">
            At Vinara Infra, we harness cutting-edge technologies to boost productivity and
            deliver reliable construction outcomes — going beyond conventional approaches across
            warehousing, industrial, precast and infrastructure projects.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-[#E3EAF4] bg-white/70 p-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <p.icon size={18} />
                </span>
                <h3 className="mt-4 text-body font-display font-bold text-ink">{p.title}</h3>
                <p className="mt-1 text-caption text-grey-500">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
