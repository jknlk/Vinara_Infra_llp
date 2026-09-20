"use client";

import { useRef } from "react";
import { Zap, ShieldCheck, Users, HardHat } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reveal = (selector: string, vars: gsap.TweenVars = {}) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
            clearProps: "opacity,transform",
            ...vars,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      };

      reveal("[data-about-eyebrow]");
      reveal("[data-about-heading]");
      reveal("[data-about-copy]");
      reveal("[data-about-image]", { y: 60, duration: 1 });

      gsap.from("[data-about-pillar]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: true,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: "[data-about-pillars]", start: "top 88%", once: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative z-10 -mt-4 overflow-hidden bg-surface pb-4 sm:-mt-6 lg:-mt-8">
      <div data-about-image className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[32/9]">
            {photo.src ? (
              <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" priority />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

            <div className="absolute inset-x-0 top-0 px-6 pt-8 sm:px-10 sm:pt-10">
              <div data-about-eyebrow className="inline-flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-1.5 text-body-l font-display font-bold uppercase tracking-[0.08em] text-ink shadow-sm backdrop-blur">
                <span className="h-px w-8 bg-blue-600" />
                About Vinara
              </div>

              <h2
                data-about-heading
                className="mt-4 whitespace-normal text-xl font-display leading-[1.1] sm:whitespace-nowrap sm:text-3xl lg:text-display-m"
              >
                <span className="text-white">Technology-led delivery. </span>
                <span className="text-sky-300">Uncompromised QHSE.</span>
              </h2>

              <p data-about-copy className="mt-4 w-full text-body-l text-white">
                At Vinara Infra, we harness cutting-edge technologies to boost productivity and
                deliver reliable construction outcomes — going beyond conventional approaches across
                warehousing, industrial, precast and infrastructure projects.
              </p>
            </div>
          </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-[#E3EAF4] bg-white/95 px-6 py-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto">
          <p className="text-label uppercase tracking-[0.08em] text-blue-600">Flagship Program</p>
          <p className="tabular mt-1 text-body-l font-display font-bold text-ink">
            NELA 1 · 113.01 Acres · Assetz Industrial Park
          </p>
        </div>
      </div>

      <Container className="mt-10">
        <div data-about-pillars className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              data-about-pillar
              key={p.title}
              tabIndex={0}
              className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_0_1px_rgba(62,134,208,0.45),0_16px_40px_-14px_rgba(26,95,196,0.55)] focus-visible:border-blue-400 focus-visible:shadow-[0_0_0_1px_rgba(62,134,208,0.45),0_16px_40px_-14px_rgba(26,95,196,0.55)] active:border-blue-400 active:shadow-[0_0_0_1px_rgba(62,134,208,0.45),0_16px_40px_-14px_rgba(26,95,196,0.55)]"
            >
              <span className="pointer-events-none absolute -right-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-blue-400 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-40 group-focus-visible:opacity-40 group-active:opacity-40" />
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <p.icon size={18} />
              </span>
              <h3 className="relative mt-4 text-body font-display font-bold text-ink">{p.title}</h3>
              <p className="relative mt-1 text-caption text-grey-500">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
