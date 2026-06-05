"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { navItems } from "@/content/nav";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="ml-auto flex items-center gap-2 lg:hidden">
      <a
        href={contact.phone.href}
        className="inline-flex h-10 items-center rounded-sm border border-[#c0c7d2] bg-white/90 px-3 text-sm font-semibold text-[#003d69]"
      >
        Call
      </a>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#c0c7d2] bg-white/90 text-[#003d69]"
      >
        <ListIcon size={22} />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-60 flex flex-col text-white"
            style={{
              background:
                "radial-gradient(1200px 500px at 0% 0%, rgba(0,85,142,0.22), transparent 54%), linear-gradient(140deg, #003d69 0%, #00558e 60%, #0c1828 100%)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6">
              <Link href="/" onClick={close} className="flex items-center">
                <Image
                  src="/brand/logo.png"
                  alt={`${site.name} logo`}
                  width={240}
                  height={240}
                  className="h-20 w-auto"
                  priority
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/15"
              >
                <XIcon size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-10">
              <div className="mx-auto w-full max-w-sm space-y-3">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        className="flex w-full items-center justify-between rounded-sm px-3 py-4 text-3xl font-medium tracking-tight transition hover:bg-white/10"
                      >
                        <span>{item.label}</span>
                        <CaretDownIcon
                          size={26}
                          className={`text-white/85 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {servicesOpen && (
                        <div className="mt-2 divide-y divide-white/10 rounded-sm bg-white/5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={close}
                              className="flex items-center justify-between px-4 py-4 text-base text-white/90 transition hover:bg-white/10"
                            >
                              <span>{child.label}</span>
                              <CaretDownIcon
                                size={22}
                                className="-rotate-90 text-white/70"
                              />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={close}
                      className="flex items-center justify-between rounded-sm px-3 py-4 text-3xl font-medium tracking-tight transition hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <CaretDownIcon
                        size={26}
                        className="-rotate-90 text-white/70"
                      />
                    </Link>
                  )
                )}

                <div className="pt-7">
                  <Link
                    href={site.scheduleHref}
                    onClick={close}
                    className="flex h-14 w-full items-center justify-center rounded-sm bg-[#bb0014] text-lg font-extrabold text-white shadow-[0_20px_36px_-24px_rgba(187,0,20,0.7)] transition hover:bg-[#e0292a]"
                  >
                    Schedule Online
                  </Link>
                  <p className="mt-4 text-center text-sm text-white/80">
                    Or call{" "}
                    <a
                      href={contact.phone.href}
                      className="font-semibold text-white hover:text-white/90"
                    >
                      {contact.phone.label}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social footer */}
            <div className="border-t border-white/15 bg-black/15 px-6 py-4">
              <div className="mx-auto flex max-w-sm items-center justify-between text-sm font-medium text-white/80">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
