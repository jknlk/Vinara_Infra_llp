import type { Metadata } from "next";
import { archivo, plexSans } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinara Infra LLP — Building today. Empowering tomorrow.",
  description:
    "Vinara Infra LLP delivers 4.23 million sq.ft of Grade-A warehousing across three industrial parks in Bengaluru, with an in-house ready-mix concrete plant and technology-led quality, safety and delivery controls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-ink font-body text-white">
        <SmoothScroll>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
