import type { BookingService } from "@/lib/booking";

export type ServiceOption = {
  key: BookingService;
  label: string;
  description: string;
};

// Bookable services shown in the Schedule picker. The `key` maps to a Cal.com
// link via getBookingLink().
export const bookingServices: ServiceOption[] = [
  {
    key: "general",
    label: "General service call",
    description:
      "Best for diagnostics, estimates, or if you are not sure which service to pick.",
  },
  {
    key: "ac",
    label: "A/C Service",
    description: "Cooling repairs, tune-ups, and new system quotes.",
  },
  {
    key: "heating",
    label: "Heating Service",
    description: "Furnace and heat pump repairs, maintenance, and replacements.",
  },
  {
    key: "maintenance",
    label: "Maintenance Visit",
    description: "Seasonal tune-up to keep your system running efficiently.",
  },
  {
    key: "iaq",
    label: "Indoor Air Quality",
    description: "Air purifiers, filtration, and humidity solutions for your home.",
  },
];
