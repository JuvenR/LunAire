import { CalInlineEmbed } from "@/components/shared/CalInlineEmbed";
import { bookingServices } from "@/content/services";
import { getBookingLink, type BookingService } from "@/lib/booking";

export function BookingPanel({ service }: { service: BookingService }) {
  const current =
    bookingServices.find((option) => option.key === service) ??
    bookingServices[0];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a6b7b]">
        Selected service
      </p>
      <h3 className="mt-1 text-2xl font-extrabold text-[#0a85c8]">
        {current.label}
      </h3>
      <p className="mt-2 max-w-xl text-sm font-medium text-[#404751]">
        {current.description}
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-[#d6e3ee] bg-white">
        <CalInlineEmbed calLink={getBookingLink(service)} />
      </div>
    </div>
  );
}
