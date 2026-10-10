import Link from "next/link";
import Image from "next/image";
import { CONTACT, FOOTER_COLUMNS } from "@/data/content/site";

export default function Footer() {
  return (
    <footer className="bg-white px-4 pb-4 pt-5 sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <span className="absolute left-6 top-6 h-2.5 w-2.5 rounded-full bg-white/50" />
        <span className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-white/50" />

        <div className="grid grid-cols-1 gap-4 px-8 pb-4 pt-6 sm:px-12 lg:grid-cols-2 lg:items-end">
          <h2 className="text-display-m font-display leading-[0.95] text-white">
            Let&rsquo;s
            <br />
            Grow <span className="text-white/70">Together.</span>
          </h2>
          <Image
            src="/vinara-logo-transparent.png"
            alt="Vinara Infra LLP"
            width={256}
            height={256}
            className="h-28 w-auto rounded-3xl bg-white p-2 sm:h-32 lg:ml-auto lg:mr-8"
          />
        </div>

        <div className="border-t border-dashed border-white/30" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-8 py-6 sm:grid-cols-3 sm:px-12">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-label uppercase tracking-[0.08em] text-white/70">{col.heading}</p>
              <ul className="mt-2 space-y-1.5">
                {col.links.map((l, i) => (
                  <li key={col.heading + l.label + i}>
                    <Link href={l.href} className="text-caption text-white/90 hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-label uppercase tracking-[0.08em] text-white/70">Head Office</p>
            <address className="mt-2 max-w-[26ch] text-caption not-italic leading-relaxed text-white/90">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-2 text-caption font-semibold text-white">{CONTACT.departments[1].contact}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-white/30" />

        <div className="flex flex-col items-start justify-between gap-2 px-8 py-3 text-caption text-white/80 sm:flex-row sm:items-center sm:px-12">
          <p>&copy; {new Date().getFullYear()} Vinara Infra LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
