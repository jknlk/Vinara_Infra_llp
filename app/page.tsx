import KeywordTicker from "@/components/home/KeywordTicker";
import HomeHeroLight from "@/components/hero/HomeHeroLight";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import LeadershipReel from "@/components/home/LeadershipReel";
import TrustedByMarquee from "@/components/home/TrustedByMarquee";
import Live3DShowcase from "@/components/home/Live3DShowcase";
import GalleryPreview from "@/components/home/GalleryPreview";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      <HomeHeroLight />

      {/* Slides up over the pinned hero once the frame scrub finishes */}
      <div className="relative z-20 -mt-[100lvh] bg-white">
      <KeywordTicker />

      {/* S4 · Services */}
      <ServicesShowcase />

      {/* S5 · Projects */}
      <ProjectsShowcase />

      {/* S5b · Live 3D site showcase */}
      <Live3DShowcase />

      {/* S8 · Gallery preview */}
      <GalleryPreview />

      {/* S8b · Trusted by */}
      <TrustedByMarquee />

      {/* S9 · Leadership (last section) */}
      <LeadershipReel />
      </div>
    </>
  );
}
