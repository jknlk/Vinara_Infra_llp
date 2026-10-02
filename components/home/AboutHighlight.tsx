"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, HardHat, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Container from "@/components/ui/Container";
import { IMAGES } from "@/data/images";

const DISCIPLINES = [
  { icon: Building2, label: "Warehousing" },
  { icon: HardHat, label: "Industrial" },
  { icon: ShieldCheck, label: "QHSE" },
  { icon: Users, label: "Experienced team" },
];

const PEOPLE = [
  IMAGES.leadershipPortrait1,
  IMAGES.leadershipPortrait2,
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
    alt: "Portrait placeholder for Vinara senior manager",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop",
    alt: "Portrait placeholder for Vinara project manager",
  },
];

function DisciplineItem({ item }: { item: (typeof DISCIPLINES)[number] }) {
  const Icon = item.icon;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#0EA0BC]/30 bg-[#0EA0BC] px-3.5 py-2.5 text-white">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 text-white">
        <Icon size={16} />
      </span>
      <span className="font-display text-body-s font-bold">{item.label}</span>
    </div>
  );
}

export default function AboutHighlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePerson, setActivePerson] = useState(0);

  useGSAP(
    () => {
      gsap.from("[data-about-reveal]", {
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePerson((current) => (current + 1) % PEOPLE.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100svh] overflow-hidden bg-[#041423] py-4 text-white sm:py-6"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-16 h-64 w-64 rounded-full bg-[#0EA0BC]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-18rem] top-1/4 h-[34rem] w-[34rem] rounded-full border border-[#0EA0BC]/25" />

      <Container className="relative grid flex-1 items-center gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(390px,0.78fr)] lg:gap-14">
        <div>
          <p data-about-reveal className="text-label uppercase tracking-[0.32em] text-blue-300">
            About Vinara Infra
          </p>

          <h2
            data-about-reveal
            className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3.75rem)] font-extrabold leading-[0.98] text-white"
          >
            Industrial Projects, Built With Discipline.
          </h2>

          <p data-about-reveal className="mt-4 max-w-2xl text-body text-slate-300">
            Vinara Infra LLP is a Bengaluru-based construction partner focused on warehousing,
            industrial, infrastructure and precast works. We bring planning discipline, experienced
            site leadership and uncompromised QHSE systems together to deliver durable spaces for
            modern businesses.
          </p>

          <div data-about-reveal className="mt-5 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {DISCIPLINES.map((item) => (
              <DisciplineItem key={item.label} item={item} />
            ))}
          </div>

          <div data-about-reveal className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0EA0BC]/30 bg-[#0EA0BC] px-6 text-body font-bold text-white transition hover:border-white hover:bg-white hover:text-[#041423] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0EA0BC]"
            >
              Learn More About Us
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center gap-2 px-2 text-body font-bold text-slate-200 transition hover:text-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              View Our Works
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div data-about-reveal className="relative mx-auto flex w-full max-w-[460px] flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-xl shadow-black/30">
            {PEOPLE.map((person, index) => (
              <div
                key={`${person.alt}-${index}`}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: index === activePerson ? 1 : 0 }}
              >
                {person.src ? (
                  <Image
                    src={person.src}
                    alt={person.alt}
                    fill
                    sizes="(min-width: 1024px) 460px, 90vw"
                    className="object-cover object-top grayscale-[20%]"
                    priority={index === 0}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041423]/45 via-transparent to-white/5" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 self-center">
            {PEOPLE.map((person, index) => (
              <span
                key={`${person.alt}-dot-${index}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activePerson ? "w-6 bg-blue-400" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
