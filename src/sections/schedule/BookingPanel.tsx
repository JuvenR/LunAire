import { CalInlineEmbed } from "@/components/shared/CalInlineEmbed";
import { bookingServices } from "@/content/services";
import { getBookingLink, type BookingService } from "@/lib/booking";

export function BookingPanel({ service }: { service: BookingService }) {
  const current =
    bookingServices.find((option) => option.key === service) ??
    bookingServices[0];

  return (
    <div className="pt-1">
      <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#273c4f]">
        Selected service
      </p>
      <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0a85c8]">
        {current.label}
      </h3>
      <p className="mt-2 max-w-3xl text-xl font-medium leading-8 text-[#4a5160]">
        {current.description}
      </p>

      <div className="mt-9 overflow-hidden rounded-lg border border-[#dce5ee] bg-white shadow-[0_10px_18px_rgba(28,62,88,0.22)]">
        <CalInlineEmbed
          calLink={getBookingLink(service)}
          className="min-h-[430px]"
        />
      </div>
    </div>
  );
}
