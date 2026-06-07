export type BookingService =
  | "general"
  | "ac"
  | "heating"
  | "maintenance"
  | "iaq";

export const BOOKING_LINKS: Record<BookingService, string> = {
  general: "https://cal.com/luna-aire-llc/general-service-call",
  ac: "https://cal.com/luna-aire-llc/ac-service",
  heating: "https://cal.com/luna-aire-llc/heating-service",
  maintenance: "https://cal.com/luna-aire-llc/maintenance-visit",
  iaq: "https://cal.com/luna-aire-llc/indoor-air-quality",
};

export function isBookingService(
  value: string | null | undefined
): value is BookingService {
  if (!value) return false;
  return Object.prototype.hasOwnProperty.call(BOOKING_LINKS, value);
}

export function getBookingLink(service: string | null | undefined): string {
  if (isBookingService(service)) return BOOKING_LINKS[service];
  return BOOKING_LINKS.general;
}

export function normalizeCalLink(calLink: string): string {
  try {
    const parsed = new URL(calLink);
    if (parsed.hostname.endsWith("cal.com")) {
      return parsed.pathname.replace(/^\/+/, "");
    }
  } catch {
    // Ignore parse errors and fallback to regex normalization.
  }

  return calLink
    .replace(/^https?:\/\/(www\.)?cal\.com\//i, "")
    .replace(/^\/+/, "");
}
