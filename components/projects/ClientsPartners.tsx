"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Group = { label: string; names: readonly string[] };

const eyebrow = "text-label uppercase tracking-[0.14em]";

export default function ClientsPartners({ groups }: { groups: Group[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLLIElement>("[data-fly-item]"));
    gsap.set(items, { x: "-100%", opacity: 0 });

    const triggers = items.map((item) =>
      ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
          gsap.to(item, { x: "0%", opacity: 1, duration: 2, ease: "power3.out" });
        },
        once: true,
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={rootRef} className="w-full bg-white py-24">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <p className={`${eyebrow} text-[#3e86d0]`}>Clients &amp; partners</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">Built alongside the best.</h2>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.label} className="overflow-hidden">
              <h3 className="border-b-2 border-[#3e86d0] pb-3 font-display text-body-l font-bold text-[#0f2b57]">
                {g.label}
              </h3>
              <ul className="mt-4 divide-y divide-[#0f2b57]/10">
                {g.names.map((name) => (
                  <li key={name} data-fly-item className="py-3 text-body text-[#5a6b84]">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
