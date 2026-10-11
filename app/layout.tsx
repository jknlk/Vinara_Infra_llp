import type { Metadata } from "next";
import { archivo, plexSans } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import StickyMarquee from "@/components/layout/StickyMarquee";
import Preloader from "@/components/layout/Preloader";
import SectionFx from "@/components/layout/SectionFx";
import TextReveal from "@/components/layout/TextReveal";
import ButtonFx from "@/components/layout/ButtonFx";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinara Infra LLP — Grow Together.",
  description:
    "Vinara Infra LLP delivers 3.13 million sq.ft of Grade-A warehousing across three industrial parks in Bengaluru, with an in-house ready-mix concrete plant and technology-led quality, safety and delivery controls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-paper pb-10 font-body text-ink">
        <SmoothScroll>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyMarquee />
          <SectionFx />
          <TextReveal />
          <ButtonFx />
          {/* after Nav on purpose: its scroll-lock effect must run last */}
          <Preloader />
        </SmoothScroll>
      </body>
    </html>
  );
}
