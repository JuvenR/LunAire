import Image from "next/image";
import Link from "next/link";
import {
  CaretDownIcon,
  ClockIcon,
  PhoneIcon,
  TranslateIcon,
} from "@phosphor-icons/react/dist/ssr";
import { navItems } from "@/content/nav";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

const underline =
  "pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#00558e] transition-transform duration-200 group-hover:scale-x-100";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="border-b border-white/10 bg-[linear-gradient(98deg,#003d69_0%,#00558e_68%,#0c1828_100%)]">
        <div className="mx-auto flex h-[62px] max-w-[1760px] items-center justify-center gap-6 px-6 text-[15px] text-white/95 sm:justify-end sm:gap-10 lg:px-12">
          <a
            href={contact.phone.href}
            className="flex items-center gap-2 transition hover:text-white/80"
          >
            <PhoneIcon size={21} weight="fill" className="text-white" />
            <span className="font-semibold text-white">Call:</span>
            {contact.phone.label}
          </a>

          <div className="hidden items-center gap-2 sm:flex">
            <ClockIcon size={21} className="text-white" />
            <span className="font-semibold text-white">Hours:</span>
            <span className="text-white/90">{contact.hours}</span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-[#c0c7d2] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[118px] max-w-[1760px] items-center gap-6 px-6 lg:gap-9 lg:px-12">
          {/* Brand */}
          <Link
            href="/"
            aria-label={site.name}
            className="flex min-w-0 items-center gap-5"
          >
            <Image
              src="/brand/logo.png"
              alt={`${site.name} logo`}
              width={132}
              height={132}
              priority
              className="h-[66px] w-auto shrink-0"
            />
            <span
              aria-hidden
              className="hidden h-14 w-px shrink-0 bg-[#c0c7d2] lg:block"
            />
            <span className="hidden flex-col leading-tight lg:flex">
              <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#404751]">
                {site.category}
              </span>
              <span className="mt-1 text-[15px] font-semibold tracking-wide text-[#003d69]">
                {site.location}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="ml-auto hidden items-center gap-8 lg:flex xl:gap-9">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-[16px] font-semibold text-[#404751] transition-colors group-hover:text-[#003d69]"
                  >
                    <span className="relative">
                      {item.label}
                      <span className={underline} />
                    </span>
                    <CaretDownIcon
                      size={16}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  </button>

                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid w-[300px] gap-1 rounded-sm border border-[#c0c7d2] bg-white p-3 shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-sm px-3 py-2.5 text-sm font-medium text-[#404751] transition-colors hover:bg-[#eceef4] hover:text-[#003d69]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="group relative text-[16px] font-semibold text-[#404751] transition-colors hover:text-[#003d69]"
                >
                  {item.label}
                  <span className={underline} />
                </Link>
              )
            )}

            <span aria-hidden className="h-9 w-px bg-[#c0c7d2]" />

            {/* Language toggle (visual only — no i18n wired yet) */}
            <div className="inline-flex h-11 items-center gap-2 rounded-md border border-[#c0c7d2] bg-white/70 px-4 transition-colors hover:border-[#00558e] hover:bg-white">
              <TranslateIcon size={16} className="text-[#00558e]" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#404751]">
                {site.languages[0]}
              </span>
              <span aria-hidden className="text-[#9aa3b1]">
                /
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#003d69]">
                {site.languages[1]}
              </span>
            </div>

            <Link
              href={site.scheduleHref}
              className="inline-flex h-[60px] items-center rounded-md bg-[#bb0014] px-10 text-[16px] font-bold tracking-wide text-white shadow-[0_18px_34px_-18px_rgba(187,0,20,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e0292a]"
            >
              Schedule Online
            </Link>
          </div>

          {/* Mobile */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
