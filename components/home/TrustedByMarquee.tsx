import Image from "next/image";
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
            <span className="text-blue-600">operators.</span>
          </h2>
        </div>

        <div className="group relative mt-10 space-y-6 overflow-hidden py-2 sm:mt-14 sm:space-y-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-32" />

          {ROWS.map((row, r) => (
            <ul
              key={r}
              className={`flex w-max animate-marquee items-center [animation-duration:60s] group-hover:[animation-play-state:paused] ${
                r % 2 ? "[animation-direction:reverse]" : ""
              }`}
            >
              {/* Four copies so a short row still fills the track; the loop shifts by two.
                  On mobile every cell is a fixed 30vw, so three or more partners are always in view. */}
              {[...row, ...row, ...row, ...row].map((name, i) => {
                const logo = partnerLogo(name);
                return (
                  <li
                    key={`${name}-${i}`}
                    aria-hidden={i >= row.length}
                    className="flex h-12 w-[30vw] shrink-0 items-center justify-center px-2 sm:mr-24 sm:w-auto sm:px-0"
                  >
                    {logo ? (
                      <Image
                        src={logo.src}
                        alt={name}
                        width={logo.width}
                        height={logo.height}
                        unoptimized
                        className="h-auto max-h-7 w-auto max-w-[92px] object-contain sm:h-10 sm:max-h-none sm:max-w-[220px]"
                      />
                    ) : (
                      <span className="text-center font-display text-xs font-bold leading-tight tracking-tight text-ink sm:whitespace-nowrap sm:text-xl sm:leading-normal">
                        {name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
