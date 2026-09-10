import Link from "next/link";
import Image from "next/image";
import { COMPANY_BLURB, CONTACT, FOOTER_COLUMNS, FOOTER_STAT_STRIP } from "@/data/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink px-4 pb-4 pt-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[2.5rem] border border-[#E3EAF4] bg-white">
        <span className="absolute left-6 top-6 h-2.5 w-2.5 rounded-full bg-blue-500/40" />
        <span className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-blue-500/40" />

        <div className="grid grid-cols-1 gap-10 px-8 pb-10 pt-14 sm:px-12 md:pt-16 lg:grid-cols-2 lg:items-end">
          <div className="flex items-center gap-4">
            <Image src="/vinara-logo-transparent.png" alt="Vinara Infra LLP" width={44} height={44} className="h-11 w-auto" />
            <h2 className="text-display-l font-display leading-[0.95] text-ink">
              Let&rsquo;s
              <br />
              Grow <span className="text-blue-600">Together.</span>
            </h2>
          </div>
          <p className="max-w-[46ch] text-body-l text-grey-500 lg:ml-auto lg:text-right">{COMPANY_BLURB}</p>
        </div>

        <div className="border-t border-dashed border-[#E3EAF4]" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 px-8 py-12 sm:grid-cols-4 sm:px-12">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-label uppercase tracking-[0.08em] text-grey-500">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l, i) => (
                  <li key={col.heading + l.label + i}>
                    <Link href={l.href} className="text-caption text-grey-500 hover:text-blue-600">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-label uppercase tracking-[0.08em] text-grey-500">Head Office</p>
            <address className="mt-4 max-w-[26ch] text-caption not-italic leading-relaxed text-grey-500">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-caption text-blue-600">{CONTACT.departments[1].contact}</p>
          </div>
        </div>

        <div className="border-t border-dashed border-[#E3EAF4]" />

        <div className="flex flex-col items-start justify-between gap-3 px-8 py-6 text-caption text-grey-500 sm:flex-row sm:items-center sm:px-12">
          <p>&copy; {new Date().getFullYear()} Vinara Infra LLP. All rights reserved.</p>
          <p className="tabular">{FOOTER_STAT_STRIP}</p>
        </div>
      </div>
    </footer>
  );
}
