import { CLIENTS, PMC_PARTNERS, TENANTS } from "@/data/content/site";

const NAMES = [...CLIENTS, ...PMC_PARTNERS, ...TENANTS];

export default function TrustedByMarquee() {
  return (
    <section className="bg-white pb-24 pt-12">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <span className="h-px w-6 bg-blue-500" />
            Trusted By
          </div>
          <h2 className="mt-4 text-display-l font-display leading-[1.05]">
            <span className="text-ink">The world&rsquo;s most demanding </span>
            <span className="text-blue-600">operators.</span>
          </h2>
        </div>

        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-marquee items-center gap-4">
            {[...NAMES, ...NAMES].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex h-16 shrink-0 items-center justify-center rounded-xl border border-[#E3EAF4] bg-white px-8 text-body font-semibold text-ink"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
