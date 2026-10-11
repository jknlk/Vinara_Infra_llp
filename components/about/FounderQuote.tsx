import Image from "next/image";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import JellyFrame from "@/components/ui/JellyFrame";
import { FOUNDER_MESSAGE } from "@/data/content/about";
import { DIRECTORS } from "@/data/content/leadership";

const FOUNDER = DIRECTORS[0];

export default function FounderQuote() {
  return (
    <section className="bg-white py-8 md:py-8">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-[#0b2247] text-white">
          {/* blueprint grid + glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0b4fc2] opacity-50 blur-[120px]"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
            {/* portrait */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[400px]">
                <JellyFrame className="aspect-[4/5]" echoClassName="stroke-[#7fb6e8]/40">
                  <Image
                    src={FOUNDER.photo}
                    alt={FOUNDER.name}
                    fill
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2247]/70 via-transparent to-transparent" />
                </JellyFrame>
                <span className="absolute -right-3 -top-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0b4fc2] shadow-[0_18px_36px_-12px_rgba(11,79,194,0.9)] sm:-right-5">
                  <Quote size={28} fill="currentColor" strokeWidth={0} />
                </span>
              </div>
            </div>

            {/* quote */}
            <figure className="lg:col-span-7">
              <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#7fb6e8]">
                <span className="h-px w-12 bg-[#7fb6e8]" />
                From the founder&rsquo;s desk
              </p>
              <blockquote className="mt-6 font-display text-2xl font-bold leading-[1.25] sm:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
                &ldquo;{FOUNDER_MESSAGE.quote}&rdquo;
              </blockquote>
              <p className="mt-6 max-w-[58ch] text-body-l text-white/70">{FOUNDER_MESSAGE.note}</p>
              <figcaption className="mt-10 flex items-center gap-5 border-t border-white/15 pt-8">
                <span className="h-12 w-1 rounded-full bg-[#3e86d0]" />
                <div>
                  <p className="font-display text-xl font-bold">{FOUNDER.name}</p>
                  <p className="mt-1 text-caption uppercase tracking-[0.14em] text-[#7fb6e8]">
                    {FOUNDER.role}, Vinara Infra LLP
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
