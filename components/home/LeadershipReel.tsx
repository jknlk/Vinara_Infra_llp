import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import CurvedPeopleGallery from "@/components/home/CurvedPeopleGallery";
import PeopleArc from "@/components/home/PeopleArc";
import { loadHome } from "@/lib/homeContent";

export default async function LeadershipReel() {
  const team = (await loadHome("leader")) as { name: string; role: string; bio: string; image: string }[];
  const people = team.map((p) => ({ src: p.image, alt: `${p.name} — ${p.role}`, name: p.name, role: p.role }));

  return (
    <section className="relative overflow-hidden bg-white pb-4 pt-2 lg:pt-4">
      <Container full className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Leadership
        </div>

        <h2 className="mt-4 max-w-2xl text-display-l font-display leading-[1.05]">
          <span className="text-ink">The people </span>
          <span className="text-blue-600">behind the build.</span>
        </h2>

        <p className="mt-4 max-w-[52ch] text-body-l text-grey-500">
          Directors, project leads and site engineers driving delivery across every Vinara programme.
        </p>

        <Link
          href="/leadership"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-caption font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Meet the full team
          <ArrowRight size={14} />
        </Link>
      </Container>

      {/* The ring's centre cards are short, so its stage is pulled up under the copy; only the tall edge cards rise beside it. */}
      <div className="relative mt-4 lg:-mt-10 xl:-mt-20">
        {/* A phone sees too little of the full ring for it to curve, so it gets a tighter one. */}
        <PeopleArc className="md:hidden" people={people} />
        <CurvedPeopleGallery className="max-md:hidden" images={people} />

        {/* Sits in the hollow under the short centre cards of the arc on desktop;
            stacks below the strip on smaller screens. */}
        <Link
          href="/careers"
          className="group relative z-10 mx-auto mt-8 flex w-fit flex-col items-center px-6 text-center lg:absolute lg:bottom-1 lg:left-1/2 xl:bottom-3 lg:mt-0 lg:-translate-x-1/2"
        >
          <span className="inline-flex items-center gap-2 text-label font-semibold uppercase tracking-[0.18em] text-blue-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            We&rsquo;re hiring
          </span>

          <span className="join-shine mt-1 block whitespace-nowrap font-display text-[clamp(2rem,3.6vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] transition-transform duration-500 group-hover:scale-[1.04]">
            Join the team.
          </span>

          <span className="relative mt-3 inline-flex lg:mt-4">
            <span className="pointer-events-none absolute -inset-1 overflow-hidden rounded-full opacity-60 blur-lg transition-opacity duration-300 group-hover:opacity-100">
              <span className="join-glow absolute inset-[-150%]" />
            </span>
            <span className="relative inline-flex overflow-hidden rounded-full p-[2px]">
              <span className="join-glow absolute inset-[-150%]" />
              <span className="relative inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-body font-semibold text-white">
                Explore careers
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110">
                  <ArrowRight size={16} />
                </span>
              </span>
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
