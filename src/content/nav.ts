import type { NavItem } from "@/types/nav";

export const navItems: NavItem[] = [
  {
    label: "Services",
    children: [
      { label: "Air Conditioning", href: "/air-conditioning" },
      { label: "Heating", href: "/heating" },
      { label: "Indoor Air Quality", href: "/indoor-air-quality" },
    ],
  },
  { label: "Maintenance Plans", href: "/maintenance" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];
