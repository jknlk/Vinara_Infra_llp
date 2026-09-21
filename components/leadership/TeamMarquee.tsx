import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

type Member = { name: string; role: string; bio: string; photo: string };

export default function TeamMarquee({ members }: { members: readonly Member[] }) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#f2f7fc] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#f2f7fc] to-transparent sm:w-24" />

      <Marquee className="[--gap:1.5rem]" pauseOnHover repeat={3}>
        {members.map((p) => (
          <div key={p.name} className="group flex w-64 shrink-0 flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0f2b57]/5">
              <Image
                src={p.photo}
                alt={p.name}
                fill
                sizes="256px"
                className="object-cover object-top grayscale transition-all duration-300 group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-white/90 p-4 backdrop-blur-sm">
                <h3 className="font-display text-body-l font-bold text-[#0f2b57]">{p.name}</h3>
                <p className="mt-1 text-caption font-medium text-blue-600">{p.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
