"use client";

import { Check, Clock, Hammer, Warehouse } from "lucide-react";
import type { Building, BuildingStatus } from "@/data/buildings";

// same status colours as the eave band on the 3D site plan
export const STATUS: Record<BuildingStatus, { hex: string; tint: string; group: string; Icon: typeof Check }> = {
  completed: { hex: "#1e7a4b", tint: "rgba(30,122,75,0.10)", group: "Completed", Icon: Check },
  wip: { hex: "#f2841f", tint: "rgba(242,132,31,0.12)", group: "In progress", Icon: Hammer },
  upcoming: { hex: "#3e86d0", tint: "rgba(62,134,208,0.12)", group: "Upcoming", Icon: Clock },
};

const SQM_PER_SQFT = 0.092903;
const eyebrow = "text-label uppercase tracking-[0.14em]";

function num(v: number, d = 0) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

// records where the pointer is inside the element, so its spotlight layer can follow the cursor
function trackPointer(e: React.MouseEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
}

export default function BuildingCards({ buildings, totalSqft }: { buildings: Building[]; totalSqft: number }) {
  const sum = buildings.reduce((a, b) => a + b.builtUpSqft, 0) || 1;
  const bySize = [...buildings].sort((a, b) => b.builtUpSqft - a.builtUpSqft).map((b) => b.id);
  const many = buildings.length >= 5;
  const groups = (Object.keys(STATUS) as BuildingStatus[])
    .map((status) => {
      const list = buildings.filter((b) => b.status === status);
      return { status, count: list.length, sqft: list.reduce((a, b) => a + b.builtUpSqft, 0) };
    })
    .filter((g) => g.count > 0);

  return (
    <div>
      {/* site summary: every building as a slice of the total built-up area */}
      <div
        onMouseMove={trackPointer}
        className="group/panel relative overflow-hidden rounded-2xl bg-[#0f2b57] px-5 py-4 text-white shadow-[0_18px_40px_-22px_rgba(15,43,87,0.7)]"
      >
        {/* soft light that follows the cursor across the panel */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/panel:opacity-100"
          style={{ background: "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(127,182,232,0.28), transparent 65%)" }}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className={`${eyebrow} text-[#7fb6e8]`}>Buildings</p>
            <p className="tabular mt-1 font-display text-2xl font-bold md:text-3xl">
              {num(totalSqft, 2)}
              <span className="ml-2 text-body font-normal text-white/70">sq.ft built-up</span>
            </p>
          </div>
          <p className="text-caption text-white/70">
            {buildings.length} buildings · ≈ {num(totalSqft * SQM_PER_SQFT)} sq.m
          </p>
        </div>

        <div className="relative mt-3 flex h-2.5 gap-1">
          {buildings.map((b) => (
            <span
              key={b.id}
              title={`${b.name} · ${num(b.builtUpSqft)} sq.ft`}
              className="h-full rounded-full transition duration-300 hover:scale-y-[1.9] hover:brightness-125"
              style={{ width: `${(b.builtUpSqft / sum) * 100}%`, background: STATUS[b.status].hex }}
            />
          ))}
        </div>
        <div className="relative mt-1.5 flex gap-1">
          {buildings.map((b) => (
            <span
              key={b.id}
              className="truncate text-[11px] leading-tight text-white/60"
              style={{ width: `${(b.builtUpSqft / sum) * 100}%` }}
            >
              {b.id}
            </span>
          ))}
        </div>

        <div className="relative mt-3 flex flex-wrap gap-x-6 gap-y-1 border-t border-white/15 pt-3">
          {groups.map((g) => (
            <p key={g.status} className="flex items-center gap-2 text-caption text-white/85">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS[g.status].hex }} />
              {STATUS[g.status].group}
              <span className="tabular font-semibold text-white">
                {g.count} · {num(g.sqft)} sq.ft
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* five or more buildings go three to a row on wide screens, with the last row stretched to fill it */}
      <div className={`mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 ${many ? "xl:grid-cols-6" : ""}`}>
        {buildings.map((b, idx) => {
          const s = STATUS[b.status];
          const share = (b.builtUpSqft / sum) * 100;
          const rank = bySize.indexOf(b.id) + 1;
          // an odd one out at the end spans the row instead of leaving a hole
          const wide = buildings.length % 2 === 1 && idx === buildings.length - 1;
          const tail = buildings.length % 3;
          const xlSpan = !many
            ? ""
            : tail === 1 && idx === buildings.length - 1
              ? "xl:col-span-6"
              : tail === 2 && idx >= buildings.length - 2
                ? "xl:col-span-3"
                : "xl:col-span-2";
          return (
            <article
              key={b.id}
              onMouseMove={trackPointer}
              className={`group relative z-0 overflow-hidden rounded-2xl border border-[#0f2b57]/10 bg-white px-4 py-3.5 pl-5 shadow-[0_1px_2px_rgba(15,43,87,0.06)] transition duration-300 ease-out hover:z-10 hover:scale-[1.035] hover:border-[var(--accent)] hover:shadow-[0_22px_44px_-18px_var(--accent)] active:scale-[1.01] ${
                wide ? "sm:col-span-2" : ""
              } ${xlSpan}`}
              style={{ "--accent": s.hex } as React.CSSProperties}
            >
              {/* light in the status colour under the cursor, and a sheen that sweeps across on entry */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${s.hex}2e, transparent 70%)` }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100"
              />
              <span className="absolute inset-y-0 left-0 w-1.5 transition-all duration-300 group-hover:w-2" style={{ background: s.hex }} />
              <span
                aria-hidden
                className="tabular pointer-events-none absolute -right-1 -top-2 select-none font-display text-[4rem] font-bold leading-none text-[#0f2b57]/[0.05] transition duration-300 group-hover:text-[#0f2b57]/[0.09]"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{ background: s.tint, color: s.hex }}
                >
                  <Warehouse size={18} />
                </span>
                <h3 className="min-w-0 flex-1 truncate font-display text-body-l font-bold text-[#0f2b57]">{b.name}</h3>
              </div>

              <p
                className="relative mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-semibold"
                style={{ background: s.tint, color: s.hex }}
              >
                {b.status === "wip" ? (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: s.hex }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: s.hex }} />
                  </span>
                ) : (
                  <s.Icon size={13} strokeWidth={3} />
                )}
                {b.statusLabel}
              </p>

              <div className="relative mt-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                <p className="tabular font-display text-2xl font-bold leading-none text-[#0f2b57]">
                  {num(b.builtUpSqft, 2)}
                  <span className="ml-1.5 text-caption font-normal text-[#5a6b84]">sq.ft</span>
                </p>
                <p className="tabular text-caption text-[#5a6b84]">≈ {num(b.builtUpSqft * SQM_PER_SQFT)} sq.m</p>
              </div>

              <div className="relative mt-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-[#0f2b57]/[0.08]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${share}%`, background: `linear-gradient(90deg, ${s.hex}99, ${s.hex})` }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-caption text-[#5a6b84]">
                  <span>
                    Share of site <span className="tabular font-semibold text-[#0f2b57]">{num(share, 1)}%</span>
                  </span>
                  <span>{rank === 1 ? "Largest on site" : `#${rank} by area`}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
