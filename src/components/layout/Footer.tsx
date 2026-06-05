import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  EnvelopeSimpleIcon,
  FacebookLogoIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const navLinks = [
  { label: "Air Conditioning", href: "/air-conditioning" },
  { label: "Heating Services", href: "/heating" },
  { label: "Indoor Air Quality", href: "/indoor-air-quality" },
  { label: "Maintenance Plans", href: "/maintenance" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[linear-gradient(160deg,#003d69_0%,#00558e_60%,#0c1828_100%)] text-sm text-white">
      <div className="mx-auto w-full max-w-[1250px] px-6 py-12 lg:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link
              href="/"
              aria-label="Go to LunAire home"
              className="flex items-center"
            >
              <Image
                src="/brand/logo.png"
                alt="LunAire LLC"
                width={120}
                height={120}
                className="h-20 w-auto"
              />
            </Link>

            <p className="max-w-sm leading-relaxed text-white/90">
              Expert HVAC comfort for your home with transparent pricing and fast
              response.
            </p>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-md border border-white/40 bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-[#003d69]"
            >
              <FacebookLogoIcon size={18} />
              Facebook
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold tracking-tight text-[#a8c4dc]">
              Navigation
            </h2>
            <nav className="flex flex-col gap-3 text-white/90">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold tracking-tight text-[#a8c4dc]">
              Contact
            </h2>
            <ul className="flex flex-col gap-4 text-white/90">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 shrink-0 text-[#a8c4dc]" size={20} />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="shrink-0 text-[#a8c4dc]" size={20} />
                <a
                  href={contact.phone.href}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone.label}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeSimpleIcon
                  className="shrink-0 text-[#a8c4dc]"
                  size={20}
                />
                <a
                  href={contact.email.href}
                  className="transition-colors hover:text-white"
                >
                  {contact.email.label}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 shrink-0 text-[#a8c4dc]" size={20} />
                <div className="flex flex-col">
                  <span>Mon - Fri: 8:00am - 6:00pm</span>
                  <span>Sat: 9:00am - 2:00pm</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 bg-black/15 px-6 py-5 lg:px-8 xl:px-0">
        <div className="mx-auto w-full max-w-[1250px]">
          <p className="text-xs font-medium text-white/80">
            (c) {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
