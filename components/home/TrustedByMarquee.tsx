import Image from "next/image";
import WaveMarquee from "@/components/ui/WaveMarquee";
import { partnerLogo } from "@/lib/partnerLogos";
import { loadPartnerGroups } from "@/lib/partners";

export default async function TrustedByMarquee() {
  const NAMES = (await loadPartnerGroups()).flatMap((g) => g.names);
  const half = Math.ceil(NAMES.length / 2);
  const ROWS = [NAMES.slice(0, half), NAMES.slice(half)].filter((row) => row.length > 0);
  return (
    <section className="bg-white pb-5 pt-4">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
            <span className="h-px w-6 bg-blue-500" />
            Trusted By
          </div>
          <h2 className="mt-4 text-display-l font-display leading-[1.05]">
            <span className="text-ink">The world&rsquo;s most demanding </span>
            <span className="join-shine pb-[0.08em]">operators.</span>
          </h2>
        </div>

        <div className="relative mt-8 overflow-hidden py-2 sm:mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-32" />

          {/* Each row rides its own wave instead of running as a straight line. */}
          <WaveMarquee
            className="h-[132px] sm:h-[186px]"
            rows={ROWS.map((row) =>
              row.map((name) => {
                const logo = partnerLogo(name);
                return logo ? (
                  <Image
                    key={name}
                    src={logo.src}
                    alt={name}
                    width={logo.width}
                    height={logo.height}
                    unoptimized
                    className="h-auto max-h-7 w-auto max-w-[92px] object-contain sm:h-10 sm:max-h-none sm:max-w-[220px]"
                  />
                ) : (
                  <span
                    key={name}
                    className="text-center font-display text-xs font-bold leading-tight tracking-tight text-ink sm:whitespace-nowrap sm:text-xl sm:leading-normal"
                  >
                    {name}
                  </span>
                );
              })
            )}
          />
        </div>
      </div>
    </section>
  );
}
