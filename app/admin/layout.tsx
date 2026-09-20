import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Vinara Infra LLP",
  robots: { index: false, follow: false },
};

// Covers the public Nav/Footer from the root layout so the admin area is a standalone screen.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[100] overflow-auto bg-[#f2f7fc] text-[#0f2b57]">{children}</div>;
}
