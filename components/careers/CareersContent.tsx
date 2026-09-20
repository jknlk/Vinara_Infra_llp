"use client";

import { useMemo, useRef, useState } from "react";
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
  ArrowUpRight,
  Mail,
  CheckCircle2,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { CAREERS_VALUES, DEPARTMENT_ICONS, type JobRole } from "@/data/content/careers";

const ICONS: Record<string, LucideIcon> = {
  HardHat,
  Cpu,
  ShieldCheck,
  TrendingUp,
  CalendarClock,
  Briefcase,
  Layers,
};

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

  useGSAP(
    () => {
      const reveal = (selector: string, vars: gsap.TweenVars = {}) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true,
            clearProps: "opacity,transform",
            ...vars,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      };
      gsap.from("[data-careers-value]", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        overwrite: true,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: "[data-careers-values]", start: "top 88%", once: true },
      });
      reveal("[data-careers-role]", { stagger: 0.06 });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      {/* Why Vinara */}
      <section className="bg-surface py-20">
        <Container full>
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <span className="h-px w-6 bg-blue-500" />
            Why Vinara
          </div>
          <h2 className="mt-4 max-w-xl text-display-m font-display leading-[1.1]">
            <span className="text-ink">Build things that </span>
            <span className="text-blue-600">actually get built.</span>
          </h2>

          <div data-careers-values className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAREERS_VALUES.map((v, i) => {
              const Icon = ICONS[v.icon] ?? HardHat;
              return (
                <div
                  key={v.title}
                  data-careers-value
                  tabIndex={0}
                  className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_0_1px_rgba(62,134,208,0.45),0_16px_40px_-14px_rgba(26,95,196,0.55)] focus-visible:border-blue-400"
                >
                  <span className="pointer-events-none absolute -right-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-blue-400 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-40" />
                  <span className="tabular relative text-caption font-semibold text-blue-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative mt-3 grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <h3 className="relative mt-4 text-body-l font-display font-bold text-ink">{v.title}</h3>
                  <p className="relative mt-2 text-caption text-grey-500">{v.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="scroll-mt-24 border-t border-navy-500 bg-white py-20">
        <Container full>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
                <span className="h-px w-6 bg-blue-500" />
                Open roles
              </div>
              <h2 className="mt-4 text-display-m font-display leading-[1.1]">
                <span className="text-ink">{roles.length} </span>
                <span className="text-blue-600">{roles.length === 1 ? "position" : "positions"} open</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDept(d)}
                  className={`rounded-full border px-4 py-2 text-caption font-medium transition-colors ${
                    dept === d
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-navy-500 bg-surface text-grey-500 hover:border-blue-400/60 hover:text-ink"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {roles.map((role) => {
              const DeptIcon = ICONS[DEPARTMENT_ICONS[role.department as keyof typeof DEPARTMENT_ICONS]] ?? Briefcase;
              const isOpen = openRole === role.title;
              return (
                <div
                  key={role.title}
                  data-careers-role
                  className="group overflow-hidden rounded-2xl border-2 border-[#E3EAF4] bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_0_3px_rgba(26,95,196,0.35),0_20px_48px_-16px_rgba(11,42,91,0.35)]"
                >
                  <button
                    onClick={() => setOpenRole(isOpen ? null : role.title)}
                    className="flex w-full flex-col gap-5 p-6 text-left sm:flex-row sm:items-center sm:justify-between sm:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <DeptIcon size={20} strokeWidth={1.75} />
                      </span>
                      <div>
                        <span className="text-label font-semibold uppercase tracking-[0.06em] text-blue-600">
                          {role.department}
                        </span>
                        <h3 className="mt-1 text-body-l font-display font-bold text-ink">{role.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-caption text-grey-500">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={13} className="text-blue-600" />
                            {role.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={13} className="text-blue-600" />
                            {role.type} · {role.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 self-end text-grey-500 transition-transform duration-300 sm:self-center ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="border-t border-[#E3EAF4] px-6 pb-6 pt-5 sm:px-8">
                        <p className="text-body text-grey-500">{role.summary}</p>
                        <ul className="mt-4 space-y-1.5">
                          {role.responsibilities.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-caption text-grey-500">
                              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-blue-500" />
                              {r}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`mailto:careers@vinarainfra.com?subject=${encodeURIComponent(
                            `Application — ${role.title}`
                          )}`}
                          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-caption font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          Apply now
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Don't see your role */}
      <section className="bg-surface py-20">
        <Container full className="text-center">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-navy-700 px-8 py-12 shadow-[0_24px_60px_-16px_rgba(26,95,196,0.55)] sm:px-14">
            <span className="pointer-events-none absolute -left-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
            <span className="pointer-events-none absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-white/5" />
            <div className="relative mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white/15">
              <Mail size={22} className="text-white" />
            </div>
            <h2 className="relative text-display-m font-display font-bold text-white">Don&rsquo;t see your role?</h2>
            <p className="relative mt-3 text-body text-sky-100">
              We&rsquo;re always looking for driven engineers and site professionals. Send us your resume
              and we&rsquo;ll reach out when the right opening comes up.
            </p>
            <a
              href="mailto:careers@vinarainfra.com?subject=General%20Application"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-body font-semibold text-ink transition-colors hover:bg-sky-100"
            >
              <Mail size={16} />
              careers@vinarainfra.com
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
