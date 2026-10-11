import {
  ClipboardList,
  DraftingCompass,
  HardHat,
  KeyRound,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { EXECUTION_STEPS } from "@/data/content/about";

// Same order as EXECUTION_STEPS.
const ICONS: LucideIcon[] = [ClipboardList, DraftingCompass, Truck, HardHat, ShieldCheck, KeyRound];

export default function ExecutionApproach() {
  return (
    <section className="relative overflow-hidden bg-[#0b2247] py-8 text-white md:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-[#0b4fc2] opacity-40 blur-[140px]"
      />

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#7fb6e8]">
              <span className="h-px w-12 bg-[#7fb6e8]" />
              Execution approach
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-display-m join-shine join-shine-dark pb-[0.08em]">From first plan to final handover.</h2>
          </div>
          <p className="max-w-sm text-body text-white/65">
            Six disciplined stages, one accountable team — every project follows the same proven path.
          </p>
        </div>

        <ol className="m-scroll mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXECUTION_STEPS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={s.n}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7fb6e8]/50 hover:bg-white/[0.08] md:p-8"
              >
                <span
                  aria-hidden
                  className="tabular pointer-events-none absolute -right-2 -top-4 font-display text-[7rem] font-bold leading-none text-white/[0.05] transition-colors duration-300 group-hover:text-[#7fb6e8]/15"
                >
                  {String(s.n).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b4fc2] shadow-[0_14px_28px_-12px_rgba(11,79,194,0.9)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={26} />
                  </span>
                  <span className="text-label uppercase text-[#7fb6e8]">Step {String(s.n).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-body text-white/70">{s.body}</p>
                <span
                  aria-hidden
                  className="mt-7 block h-px w-full origin-left scale-x-[0.15] bg-[#7fb6e8] transition-transform duration-500 group-hover:scale-x-100"
                />
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
