import {
  Building2,
  Flag,
  HardHat,
  MapPin,
  ShieldCheck,
  Tent,
  UserCheck,
  Users,
} from "lucide-react";
import SiteImage from "@/components/ui/SiteImage";
import { IMAGES } from "@/data/images";
import { INDUCTION_DETAILS } from "@/data/content/qualitySafety";

const eyebrow = "text-label font-semibold uppercase tracking-[0.14em]";

const FEATURED = { v: "9,96,553", l: "Safe manhours to March 2026" };
const STATS = [
  { v: "412", l: "Today manpower", Icon: Users },
  { v: "82", l: "Staff & operators", Icon: HardHat },
  { v: "1,265", l: "Safe manhours — staff & operators", Icon: ShieldCheck },
  { v: "2,480", l: "Safe manhours — workers", Icon: ShieldCheck },
  { v: "3,745", l: "Total safe manhours daily", Icon: Flag },
];

const DETAILS = [
  { k: "Conducted by", v: INDUCTION_DETAILS.conductedBy, Icon: UserCheck },
  { k: "Client", v: INDUCTION_DETAILS.client, Icon: Building2 },
  { k: "Work location", v: INDUCTION_DETAILS.workLocation, Icon: MapPin },
  { k: "Camp location", v: INDUCTION_DETAILS.campLocation, Icon: Tent },
];

export default function SafetySection() {
  return (
    <section id="safety" className="relative overflow-hidden bg-white py-8 text-[#0f2b57]">
      <div className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[#e8833a]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-[28rem] w-[28rem] rounded-full bg-[#3e86d0]/10 blur-3xl" />

      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <p className={`${eyebrow} flex items-center gap-3 text-[#e8833a]`}>
          <span className="h-px w-10 bg-[#e8833a]" />
          Safety performance &amp; systems
        </p>
        <h2 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
          Think safe. Work safe.
          <span className="block bg-gradient-to-r from-[#e8833a] to-[#f2b45c] bg-clip-text text-transparent">
            Go home safe.
          </span>
        </h2>

        {/* Stats */}
        <div className="m-scroll mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2b57] via-[#14407f] to-[#3e86d0] p-8 text-white shadow-[0_30px_70px_-30px_rgba(15,43,87,0.6)] lg:col-span-5 lg:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <ShieldCheck className="relative text-[#f2b45c]" size={36} />
            <p className="tabular relative mt-8 font-display text-6xl font-bold leading-none md:text-7xl">{FEATURED.v}</p>
            <p className="relative mt-3 text-body-l text-white/80">{FEATURED.l}</p>
            <span className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-caption ring-1 ring-white/20">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#5be08f]" /> Safe manhours, and counting
            </span>
          </div>
          <div className="m-scroll grid grid-cols-2 gap-5 sm:grid-cols-3 lg:col-span-7">
            {STATS.map(({ v, l, Icon }, i) => (
              <div
                key={l}
                className={`group relative overflow-hidden rounded-2xl border border-[#0f2b57]/10 bg-gradient-to-b from-white to-[#f2f7fc] p-5 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_25px_45px_-20px_rgba(232,131,58,0.75)] ${i === STATS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#e8833a] to-[#f2b45c] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8833a]/10 text-[#e8833a] transition duration-300 group-hover:scale-110 group-hover:bg-white/25 group-hover:text-white">
                  <Icon size={20} />
                </span>
                <p className="tabular relative mt-4 font-display text-3xl font-bold transition-colors duration-300 group-hover:text-white md:text-4xl">{v}</p>
                <p className="relative mt-1 text-caption text-[#5a6b84] transition-colors duration-300 group-hover:text-white/90">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Induction */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className={`${eyebrow} text-[#3e86d0]`}>Site induction</p>
            <h3 className="mt-3 font-display text-4xl font-bold md:text-5xl">Site induction, before anyone starts.</h3>
            <p className="mt-4 max-w-[56ch] text-body-l text-[#5a6b84]">{INDUCTION_DETAILS.purpose}</p>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {DETAILS.map(({ k, v, Icon }) => (
                <div
                  key={k}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#0f2b57]/10 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_20px_40px_-20px_rgba(62,134,208,0.8)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#0f2b57] to-[#3e86d0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0f2b57] text-white transition duration-300 group-hover:bg-white/20">
                    <Icon size={20} />
                  </span>
                  <div className="relative">
                    <dt className="text-label uppercase tracking-[0.12em] text-[#5a6b84] transition-colors duration-300 group-hover:text-white/80">{k}</dt>
                    <dd className="font-display text-body font-bold transition-colors duration-300 group-hover:text-white">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative lg:col-span-6">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-[#e8833a]/30 via-transparent to-[#3e86d0]/30 blur-xl" />
            <div className="overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(15,43,87,0.55)]">
              <SiteImage
                slot="safety-induction"
                image={{ ...IMAGES.safetyInduction, caption: undefined }}
                ratio="4/3"
                className="rounded-3xl border-0"
              />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-[#0f2b57]/10">
              <ShieldCheck className="text-[#e8833a]" size={26} />
              <div>
                <p className="font-display text-body font-bold">AGP Core Five</p>
                <p className="text-caption text-[#5a6b84]">Safety risks briefed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
