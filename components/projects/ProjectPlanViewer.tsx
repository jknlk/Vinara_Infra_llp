"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SitePoster from "@/components/hero/SitePoster";

const MasterPlanScene = dynamic(() => import("@/components/hero/MasterPlanScene"), { ssr: false });

export default function ProjectPlanViewer({ slug }: { slug: string }) {
  const [can3D, setCan3D] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      const cores = navigator.hardwareConcurrency ?? 8;
      setCan3D(Boolean(gl) && cores >= 4);
    } catch {
      setCan3D(false);
    }
  }, []);

  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-navy-500 md:h-[440px]">
      {can3D === true ? <MasterPlanScene activeSlug={slug} /> : <SitePoster slug={slug} />}
      <p className="pointer-events-none absolute bottom-4 left-4 text-caption text-grey-300">
        {can3D === true ? "Drag to orbit · tap a building for details" : "Static site plan"}
      </p>
    </div>
  );
}
