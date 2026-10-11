"use client";

import { useEffect, useRef } from "react";
import { Building2, ClipboardCheck, Handshake, PackageCheck, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Group = { label: string; names: readonly string[] };

const eyebrow = "text-label uppercase tracking-[0.14em]";

// one accent, icon and one-line role per kind of relationship, matched on the group label
const KINDS: { match: RegExp; Icon: LucideIcon; hex: string; role: string }[] = [
  { match: /client/i, Icon: Building2, hex: "#2f7fd0", role: "Developers and owners we build for" },
  { match: /pmc/i, Icon: ClipboardCheck, hex: "#14a89a", role: "Project managers we deliver alongside" },
  { match: /tenant/i, Icon: PackageCheck, hex: "#e8802a", role: "Occupiers of the buildings we hand over" },
];
const FALLBACK_KIND = { Icon: Handshake, hex: "#2f7fd0", role: "" };

// "AGP Industrial Logistics Parks" -> "AI", "CBRE" -> "CB"
function monogram(name: string) {
  const words = name.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w));
  const letters = words.length > 1 ? words[0][0] + words[1][0] : (words[0] ?? "").slice(0, 2);
  return letters.toUpperCase();
}

// records where the pointer is inside the element, so its spotlight layer can follow the cursor
function trackPointer(e: React.MouseEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function ClientsPartners({ groups }: { groups: Group[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const total = groups.reduce((a, g) => a + g.names.length, 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // each panel's tiles rise in one after another as the panel scrolls into view
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-partner-group]"));
    const triggers = panels.map((panel) => {
      const items = panel.querySelectorAll<HTMLElement>("[data-fly-item]");
      gsap.set(items, { y: 24, opacity: 0 });
      return ScrollTrigger.create({
        trigger: panel,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(items, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06 });
        },
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={rootRef} id="clients" className="relative w-full overflow-hidden bg-white py-6 text-[#0b2247]">
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className={`${eyebrow} flex items-center gap-3 text-[#2f7fd0]`}>
              <span className="h-px w-10 bg-[#2f7fd0]" />
              Clients &amp; partners
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">
              Built alongside <span className="join-shine">the best.</span>
            </h2>
            <p className="mt-4 max-w-[52ch] text-body-l text-[#0b2247]/70">
              The developers, project managers and occupiers behind every site we deliver.
            </p>
          </div>

          <dl className="flex gap-8 sm:gap-10">
            {groups.map((g) => {
              const kind = KINDS.find((k) => k.match.test(g.label)) ?? FALLBACK_KIND;
              return (
                <div key={g.label} className="border-l-2 pl-4" style={{ borderColor: kind.hex }}>
                  <dd className="tabular font-display text-4xl font-bold leading-none md:text-5xl">
                    {String(g.names.length).padStart(2, "0")}
                  </dd>
                  <dt className="mt-2 text-caption text-[#0b2247]/70">{g.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="-mx-4 mt-12 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {groups.map((g, gi) => {
            const kind = KINDS.find((k) => k.match.test(g.label)) ?? FALLBACK_KIND;
            // with the usual three groups the first (longest) gets half the row and a two-column list
            const lead = groups.length === 3 && gi === 0;
            const span = groups.length === 3 ? (lead ? "lg:col-span-6" : "lg:col-span-3") : "lg:col-span-4";
            return (
              <div
                key={g.label}
                data-partner-group
                onMouseMove={trackPointer}
                className={`group/panel relative w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[60%] lg:w-auto lg:shrink border p-5 shadow-md transition duration-500 sm:p-6 ${span}`}
                style={{
                  background: `linear-gradient(160deg, ${kind.hex}38 0%, ${kind.hex}18 55%, #ffffff 100%)`,
                  borderColor: `${kind.hex}55`,
                }}
              >
                {/* soft light that follows the cursor across the panel */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
                  style={{ background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), ${kind.hex}26, transparent 65%)` }}
                />
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${kind.hex}, ${kind.hex}55)` }} />
                <div className="relative flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-500 group-hover/panel:scale-110"
                    style={{ background: kind.hex, color: "#fff" }}
                  >
                    <kind.Icon size={24} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-body-l font-bold">{g.label}</h3>
                    {kind.role ? <p className="text-caption text-[#0b2247]/75">{kind.role}</p> : null}
                  </div>
                  <span
                    className="tabular rounded-full px-2.5 py-1 text-caption font-semibold"
                    style={{ background: kind.hex, color: "#fff" }}
                  >
                    {g.names.length}
                  </span>
                </div>

                <ul className={`relative mt-5 grid grid-cols-1 gap-2.5 ${lead ? "lg:grid-cols-2" : ""}`}>
                  {g.names.map((name) => (
                    <li
                      key={name}
                      data-fly-item
                      onMouseMove={trackPointer}
                      className="group relative z-0 flex cursor-default items-center gap-3 overflow-hidden rounded-xl border bg-white px-3 py-2.5 transition duration-300 ease-out hover:z-10 hover:scale-[1.06] hover:border-[var(--accent)] hover:bg-white hover:shadow-[0_14px_36px_-12px_var(--accent)] active:scale-[1.02]"
                      style={{ "--accent": kind.hex, borderColor: `${kind.hex}40` } as React.CSSProperties}
                    >
                      {/* bright spot under the cursor, and a sheen that sweeps across on entry */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: `radial-gradient(160px circle at var(--mx, 50%) var(--my, 50%), ${kind.hex}55, transparent 70%)` }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
                      />
                      <span
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-caption font-bold tracking-wide transition duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                        style={{ background: `${kind.hex}33`, color: kind.hex }}
                      >
                        {monogram(name)}
                      </span>
                      <span className="relative text-body leading-snug text-[#0b2247] transition duration-300 group-hover:text-[#0b2247]">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-caption text-[#0b2247]/50">
          {total} organisations across {groups.length} kinds of partnership.
        </p>
      </div>
    </section>
  );
}
