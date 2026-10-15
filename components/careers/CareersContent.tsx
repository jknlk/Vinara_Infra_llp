"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import {
  HardHat,
  Cpu,
  ShieldCheck,
  TrendingUp,
  CalendarClock,
  Briefcase,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Check,
  Plus,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import ApplyForm from "@/components/careers/ApplyForm";
import { CAREERS_VALUES, DEPARTMENT_ICONS, HIRING_STEPS, type JobRole } from "@/data/content/careers";
import { IMAGES } from "@/data/images";

const ICONS: Record<string, LucideIcon> = {
  HardHat,
  Cpu,
  ShieldCheck,
  TrendingUp,
  CalendarClock,
  Briefcase,
  Layers,
};

const GENERAL_APPLICATION = "mailto:careers@vinarainfra.com?subject=General%20Application";

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-label uppercase tracking-[0.12em] ${
        dark ? "text-white/60" : "text-grey-500"
      }`}
    >
      <span className={`h-px w-8 ${dark ? "bg-blue-400" : "bg-blue-600"}`} />
      {children}
    </div>
  );
}

export default function CareersContent({ roles: allRoles }: { roles: JobRole[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dept, setDept] = useState<string>("All");
  const [openRole, setOpenRole] = useState<string | null>(null);

  const DEPARTMENTS = useMemo(
    () => ["All", ...Array.from(new Set(allRoles.map((r) => r.department).filter(Boolean)))],
    [allRoles]
  );
  const roles = useMemo(
    () => (dept === "All" ? allRoles : allRoles.filter((r) => r.department === dept)),
    [dept, allRoles]
  );
  const countFor = (d: string) => (d === "All" ? allRoles.length : allRoles.filter((r) => r.department === d).length);
  const ctaPhoto = IMAGES.portraitTowerCrane;

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-careers-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-careers-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          overwrite: true,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      {/* Why Vinara */}
      <section id="why-vinara" className="scroll-mt-24 bg-white py-6 lg:py-8">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-careers-reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <Eyebrow>Why Vinara</Eyebrow>
                <h2 className="mt-5 text-display-m font-display leading-[1.05] text-ink">
                  Work that leaves something <span className="join-shine">standing.</span>
                </h2>
                <p className="mt-5 max-w-[40ch] text-body text-grey-500">
                  A lean, delivery-focused team where what you plan on Monday is poured, erected or
                  handed over while you&rsquo;re still on the project.
                </p>
                <a
                  href="#open-roles"
                  className="group mt-7 inline-flex items-center gap-2 text-body font-semibold text-ink"
                >
                  <span className="border-b border-ink/25 pb-0.5 transition-colors group-hover:border-blue-600 group-hover:text-blue-600">
                    See open roles
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-blue-600 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>

            <div
              data-careers-stagger
              className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-8"
            >
              {CAREERS_VALUES.map((v, i) => {
                const Icon = ICONS[v.icon] ?? HardHat;
                return (
                  <div
                    key={v.title}
                    className="group relative bg-white p-8 transition-colors duration-300 hover:bg-surface lg:p-10"
                  >
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-blue-400 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon size={22} strokeWidth={1.6} />
                      </span>
                      <span className="tabular font-display text-caption font-bold text-ink/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-bold leading-snug text-ink">{v.title}</h3>
                    <p className="mt-2.5 max-w-[38ch] text-body text-grey-500">{v.body}</p>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-blue-600 transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Hiring process */}
      <section className="relative isolate overflow-hidden bg-ink py-6 text-white lg:py-6">
        <div
          className="pointer-events-none absolute -right-[10%] -top-[40%] -z-10 h-[90%] w-[50%] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--color-navy-700), transparent)" }}
        />
        <Container>
          <div data-careers-reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow dark>How hiring works</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-display-m font-display leading-[1.05]">
                Four steps, <span className="join-shine join-shine-dark">no runaround.</span>
              </h2>
            </div>
            <p className="max-w-[38ch] text-body text-white/60">
              A straightforward process, run by the people you&rsquo;d actually be working with.
            </p>
          </div>

          <ol data-careers-stagger className="m-scroll mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {HIRING_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative border-t border-white/15 py-8 sm:pr-8 lg:pr-10"
              >
                <span className="absolute -top-px left-0 h-px w-12 bg-blue-400" />
                <span className="tabular font-display text-5xl font-extrabold leading-none tracking-[-0.03em] text-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-2 max-w-[30ch] text-caption text-white/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="scroll-mt-24 bg-surface py-6 lg:py-8">
        <Container>
          <div data-careers-reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Open roles</Eyebrow>
              <h2 className="mt-5 text-display-m font-display leading-[1.05] text-ink">
                <span className="tabular join-shine">{roles.length}</span>{" "}
                {roles.length === 1 ? "position" : "positions"} open
              </h2>
            </div>
            <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0">
              {DEPARTMENTS.map((d) => {
                const active = dept === d;
                return (
                  <button
                    key={d}
                    onClick={() => setDept(d)}
                    aria-pressed={active}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-caption font-medium transition-colors ${
                      active
                        ? "border-ink bg-ink text-white"
                        : "border-ink/15 bg-white text-grey-500 hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {d}
                    <span className={`tabular text-label ${active ? "text-blue-400" : "text-ink/35"}`}>
                      {countFor(d)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            data-careers-reveal
            className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_24px_60px_-32px_rgba(6,32,79,0.35)]"
          >
            {roles.length === 0 ? (
              <div className="px-6 py-16 text-center sm:px-10">
                <p className="font-display text-xl font-bold text-ink">No open positions here right now.</p>
                <p className="mx-auto mt-2 max-w-[44ch] text-body text-grey-500">
                  Send us your resume and we&rsquo;ll reach out when the right opening comes up.
                </p>
                <a
                  href={GENERAL_APPLICATION}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-caption font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  <Mail size={14} />
                  Send your resume
                </a>
              </div>
            ) : (
              <ul className="divide-y divide-ink/10">
                {roles.map((role, i) => {
                  const DeptIcon =
                    ICONS[DEPARTMENT_ICONS[role.department as keyof typeof DEPARTMENT_ICONS]] ?? Briefcase;
                  const isOpen = openRole === role.title;
                  return (
                    <li key={role.title} className={`group transition-colors duration-300 ${isOpen ? "bg-surface/60" : "hover:bg-surface/60"}`}>
                      <button
                        onClick={() => setOpenRole(isOpen ? null : role.title)}
                        aria-expanded={isOpen}
                        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 px-6 py-6 text-left sm:px-8 lg:grid-cols-[3rem_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:py-7"
                      >
                        <span className="tabular hidden font-display text-caption font-bold text-ink/25 lg:block">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="inline-flex items-center gap-1.5 text-label uppercase tracking-[0.08em] text-blue-600">
                            <DeptIcon size={13} strokeWidth={2} />
                            {role.department}
                          </span>
                          <span className="mt-1.5 block font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-blue-700">
                            {role.title}
                          </span>
                        </span>
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300 lg:order-last ${
                            isOpen
                              ? "rotate-45 border-ink bg-ink text-white"
                              : "border-ink/15 text-ink group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                          }`}
                        >
                          <Plus size={18} />
                        </span>
                        <span className="col-span-2 inline-flex min-w-0 items-center gap-2 text-caption text-grey-500 lg:col-span-1">
                          <MapPin size={14} className="shrink-0 text-blue-600" />
                          <span className="truncate">{role.location}</span>
                        </span>
                        <span className="col-span-2 inline-flex min-w-0 items-center gap-2 text-caption text-grey-500 lg:col-span-1">
                          <Clock size={14} className="shrink-0 text-blue-600" />
                          <span className="truncate">
                            {role.type} · {role.experience}
                          </span>
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="grid grid-cols-1 gap-8 px-6 pb-8 sm:px-8 lg:grid-cols-[3rem_minmax(0,1.6fr)_minmax(0,2fr)] lg:gap-x-6">
                            <span className="hidden lg:block" />
                            <div>
                              <p className="text-label uppercase tracking-[0.1em] text-ink/40">The role</p>
                              <p className="mt-3 text-body text-grey-500">{role.summary}</p>
                              <ApplyForm role={role.title} />
                            </div>
                            <div>
                              <p className="text-label uppercase tracking-[0.1em] text-ink/40">What you&rsquo;ll do</p>
                              <ul className="mt-3 space-y-2.5">
                                {role.responsibilities.map((r) => (
                                  <li key={r} className="flex items-start gap-3 text-body text-grey-500">
                                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700">
                                      <Check size={12} strokeWidth={3} />
                                    </span>
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Container>
      </section>

      {/* Don't see your role */}
      <section className="bg-surface pb-6 lg:pb-8">
        <Container>
          <div
            data-careers-reveal
            className="relative isolate overflow-hidden rounded-[32px] bg-ink px-8 py-14 text-white sm:px-12 lg:px-16 lg:py-20"
          >
            {ctaPhoto.src ? (
              <Image
                src={ctaPhoto.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 1184px, 100vw"
                className="-z-20 object-cover opacity-30"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />

            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Eyebrow dark>General applications</Eyebrow>
                <h2 className="mt-5 font-display text-display-l leading-[1]">
                  Don&rsquo;t see your role? <span className="join-shine join-shine-dark">Write to us anyway.</span>
                </h2>
                <p className="mt-5 max-w-[52ch] text-body-l text-white/70">
                  We&rsquo;re always looking for driven engineers and site professionals. Send us your
                  resume and we&rsquo;ll reach out when the right opening comes up.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <a
                  href={GENERAL_APPLICATION}
                  className="group inline-flex items-center gap-3 rounded-full bg-blue-400 py-2 pl-6 pr-2 text-body font-semibold text-ink transition-colors hover:bg-white"
                >
                  careers@vinarainfra.com
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
