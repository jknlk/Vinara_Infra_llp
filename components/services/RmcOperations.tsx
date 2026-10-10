import {
  Building2,
  ClipboardCheck,
  Cog,
  Construction,
  Droplets,
  FlaskConical,
  Gauge,
  Microscope,
  ShieldCheck,
  ShowerHead,
  SlidersHorizontal,
  Tractor,
  Truck,
  UserCog,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { RMC_FACILITIES, RMC_MACHINERY, RMC_ORG, RMC_SAFETY } from "@/data/content/services";

const eyebrow = "text-label uppercase tracking-[0.14em]";

// Each list is in the same order as its data array.
const ROLE_ICONS: LucideIcon[] = [UserCog, SlidersHorizontal, FlaskConical, Truck];
const ASSET_ICONS: LucideIcon[] = [Truck, Tractor, Construction];
const FACILITY_ICONS: LucideIcon[] = [Droplets, ShowerHead, Microscope, Gauge, Building2];
const SAFETY_ICONS: LucideIcon[] = [ShieldCheck, Wrench, ClipboardCheck];

type Row = { label: string; nos: number; icon: LucideIcon };

function CountPanel({
  dark,
  icon: Icon,
  label,
  unit,
  rows,
}: {
  dark?: boolean;
  icon: LucideIcon;
  label: string;
  unit: string;
  rows: Row[];
}) {
  const total = rows.reduce((sum, r) => sum + r.nos, 0);
  const max = Math.max(...rows.map((r) => r.nos));

  return (
    <article
      className={`relative overflow-hidden rounded-[28px] p-7 md:p-9 ${
        dark
          ? "bg-gradient-to-br from-[#0b2247] via-[#0a3a8a] to-[#0048b0] text-white shadow-[0_30px_60px_-28px_rgba(0,72,176,0.7)]"
          : "border border-[#dbe9fa] bg-white text-[#0f2b57] shadow-[0_24px_50px_-30px_rgba(0,72,176,0.45)]"
      }`}
    >
      <Icon
        aria-hidden
        strokeWidth={1}
        className={`pointer-events-none absolute -right-8 -top-8 h-44 w-44 ${dark ? "text-white/[0.06]" : "text-[#0048b0]/[0.05]"}`}
      />

      <div className="relative flex items-end justify-between gap-6">
        <div>
          <span
            className={`grid h-12 w-12 place-items-center rounded-2xl ${
              dark
                ? "bg-white/10 ring-1 ring-white/20"
                : "bg-gradient-to-br from-[#0048b0] to-[#4d94ff] text-white shadow-[0_10px_20px_-8px_rgba(0,72,176,0.6)]"
            }`}
          >
            <Icon size={22} strokeWidth={1.75} />
          </span>
          <p className={`${eyebrow} mt-5 ${dark ? "text-[#9fd0ff]" : "text-[#3e86d0]"}`}>{label}</p>
        </div>
        <p className="text-right">
          <span className="tabular block font-display text-6xl font-extrabold leading-none md:text-7xl">
            {String(total).padStart(2, "0")}
          </span>
          <span className={`mt-2 block text-caption ${dark ? "text-white/65" : "text-[#5a6b84]"}`}>{unit}</span>
        </p>
      </div>

      <ul className={`relative mt-8 border-t ${dark ? "border-white/15" : "border-[#e3eefb]"}`}>
        {rows.map((r) => (
          <li
            key={r.label}
            className={`group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b py-4 ${
              dark ? "border-white/10" : "border-[#e3eefb]"
            }`}
          >
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl transition-colors duration-300 ${
                dark
                  ? "bg-white/10 text-[#9fd0ff] group-hover:bg-white group-hover:text-[#0048b0]"
                  : "bg-[#eef5ff] text-[#0048b0] group-hover:bg-[#0048b0] group-hover:text-white"
              }`}
            >
              <r.icon size={18} strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-body font-bold">{r.label}</p>
              <span className={`mt-2 block h-1.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-[#e7f0fb]"}`}>
                <span
                  className={`block h-full rounded-full ${
                    dark ? "bg-gradient-to-r from-[#4d94ff] to-[#9fd0ff]" : "bg-gradient-to-r from-[#0048b0] to-[#4d94ff]"
                  }`}
                  style={{ width: `${(r.nos / max) * 100}%` }}
                />
              </span>
            </div>
            <span className={`tabular font-display text-3xl font-extrabold ${dark ? "text-white" : "text-[#0048b0]"}`}>
              {String(r.nos).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function RmcOperations() {
  const team: Row[] = RMC_ORG.map((r, i) => ({ label: r.role, nos: r.nos, icon: ROLE_ICONS[i] }));
  const machinery: Row[] = RMC_MACHINERY.map((m, i) => ({ label: m.asset, nos: m.nos, icon: ASSET_ICONS[i] }));

  return (
    <div className="mt-10">
      <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
        <span className="h-px w-10 bg-[#3e86d0]" />
        Team &amp; machinery
      </p>
      <h3 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-[#0f2b57] md:text-4xl">
        The people and plant behind every pour.
      </h3>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CountPanel dark icon={Users} label="Plant team" unit="people on the plant" rows={team} />
        <CountPanel icon={Cog} label="Machinery & fleet" unit="machines in operation" rows={machinery} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="rounded-[28px] border border-[#dbe9fa] bg-white/80 p-7 backdrop-blur-sm md:p-9 lg:col-span-7">
          <p className={`${eyebrow} text-[#3e86d0]`}>Facilities</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {RMC_FACILITIES.map((f, i) => {
              const Icon = FACILITY_ICONS[i];
              return (
                <li
                  key={f}
                  className="group flex flex-col gap-4 rounded-2xl border border-[#e3eefb] bg-[#f5f9ff] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#4d94ff]/60 hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(0,72,176,0.5)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#0048b0] shadow-[0_6px_16px_-8px_rgba(0,72,176,0.45)] transition-colors duration-300 group-hover:bg-[#0048b0] group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-body font-bold leading-snug text-[#0f2b57]">{f}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-[#0b2247] p-7 text-white md:p-9 lg:col-span-5">
          <ShieldCheck
            aria-hidden
            strokeWidth={1}
            className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-white/[0.06]"
          />
          <p className={`${eyebrow} text-[#9fd0ff]`}>Safety &amp; compliance</p>
          <ul className="relative mt-6 space-y-3">
            {RMC_SAFETY.map((s, i) => {
              const Icon = SAFETY_ICONS[i];
              return (
                <li key={s} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0048b0] text-white">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="text-body leading-snug text-white/85">{s}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
