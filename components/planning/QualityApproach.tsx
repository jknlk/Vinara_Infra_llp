import {
  BadgeCheck,
  ClipboardList,
  Eye,
  FileText,
  FlaskConical,
  HardHat,
  Handshake,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { QUALITY_POSITIONING, QUALITY_APPROACH } from "@/data/content/qualitySafety";

const POSITION_ICONS: LucideIcon[] = [Eye, Handshake, ShieldCheck, Users];
const STEP_ICONS: LucideIcon[] = [ClipboardList, PackageCheck, HardHat, SearchCheck, FlaskConical, FileText, BadgeCheck];

export default function QualityApproach() {
  const last = QUALITY_APPROACH.length - 1;
  return (
    <div>
      {/* Positioning band */}
      <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2b57] via-[#14407f] to-[#3e86d0] p-1 shadow-[0_30px_70px_-30px_rgba(15,43,87,0.55)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-px overflow-hidden rounded-[1.35rem] bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {QUALITY_POSITIONING.map((q, i) => {
            const Icon = POSITION_ICONS[i % POSITION_ICONS.length];
            return (
              <div key={q.title} className="group bg-[#0f2b57]/90 p-7 transition-colors hover:bg-[#0f2b57]/70">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#7fb6e8] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <p className="mt-5 text-label font-semibold uppercase tracking-[0.14em] text-[#7fb6e8]">{q.title}</p>
                <p className="mt-2 font-display text-xl font-bold leading-snug text-white">{q.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process steps */}
      <ol className="m-scroll mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {QUALITY_APPROACH.map((s, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          const final = i === last;
          return (
            <li
              key={s.title}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1.5 ${
                final
                  ? "border-transparent bg-gradient-to-br from-[#0f2b57] to-[#1d5aa8] text-white shadow-[0_25px_50px_-20px_rgba(15,43,87,0.6)] sm:col-span-2 lg:col-span-1"
                  : "border-[#0f2b57]/10 bg-gradient-to-b from-white to-[#f2f7fc] text-[#0f2b57] shadow-sm hover:border-[#3e86d0]/40 hover:shadow-[0_25px_45px_-25px_rgba(62,134,208,0.55)]"
              }`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-black leading-none ${
                  final ? "text-white/10" : "text-[#3e86d0]/10"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${
                  final ? "bg-white/15 text-white" : "bg-[#0f2b57] text-white"
                }`}
              >
                <Icon size={22} />
              </span>
              <p className={`relative mt-5 text-label font-semibold uppercase tracking-[0.14em] ${final ? "text-[#7fb6e8]" : "text-[#3e86d0]"}`}>
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="relative mt-1 font-display text-2xl font-bold">{s.title}</h3>
              <p className={`relative mt-2 text-caption ${final ? "text-white/80" : "text-[#5a6b84]"}`}>{s.body}</p>
              <span
                className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                  final ? "bg-[#7fb6e8]" : "bg-gradient-to-r from-[#0f2b57] to-[#3e86d0]"
                }`}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
