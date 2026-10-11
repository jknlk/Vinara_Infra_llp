import {
  Activity,
  BadgeCheck,
  Clock,
  Gem,
  HeartPulse,
  Leaf,
  Scale,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import { WHY_VINARA, CORE_VALUES } from "@/data/content/about";

// Same order as WHY_VINARA / CORE_VALUES.
const WHY_ICONS: LucideIcon[] = [Activity, BadgeCheck, ShieldCheck, Users, Wallet, Clock];
const VALUE_ICONS: LucideIcon[] = [Gem, Scale, HeartPulse, Leaf];

export default function WhyVinaraValues() {
  return (
    <section className="bg-white py-8 md:py-8">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
            <span className="h-px w-12 bg-[#3e86d0]" />
            Why Vinara
          </p>
          <h2 className="mt-4 font-display text-display-m join-shine pb-[0.08em]">Built on systems, not luck.</h2>
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WHY_VINARA.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <li
                  key={w}
                  className="group flex items-center gap-4 rounded-2xl border border-[#0f2b57]/10 bg-[#f4f8fd] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0b4fc2]/30 hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(11,79,194,0.5)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0b4fc2] shadow-[0_6px_16px_-8px_rgba(15,43,87,0.35)] transition-colors duration-300 group-hover:bg-[#0b4fc2] group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="font-display text-body font-bold leading-snug text-[#0f2b57]">{w}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
            <span className="h-px w-12 bg-[#3e86d0]" />
            Our values
          </p>
          <h2 className="mt-4 font-display text-display-m join-shine pb-[0.08em]">What we stand for.</h2>
          <div className="m-scroll mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CORE_VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <article
                  key={v.title}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2b57] to-[#0b4fc2] p-7 text-white transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <Icon
                    aria-hidden
                    strokeWidth={1}
                    className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-white/[0.08] transition-transform duration-500 group-hover:scale-125"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold">{v.title}</h3>
                  <p className="relative mt-2 text-body text-white/75">{v.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
