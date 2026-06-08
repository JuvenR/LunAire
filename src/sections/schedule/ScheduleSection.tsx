"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookingServices } from "@/content/services";
import type { BookingService } from "@/lib/booking";
import { ServiceList } from "@/sections/schedule/ServiceList";
import { BookingPanel } from "@/sections/schedule/BookingPanel";

export function ScheduleSection({
  initialService,
}: {
  initialService: BookingService;
}) {
  const router = useRouter();
  const [service, setService] = useState<BookingService>(initialService);

  const handleSelect = (key: BookingService) => {
    setService(key);
    // Keep the URL shareable / back-button friendly without scrolling.
    router.replace(`/schedule?service=${key}`, { scroll: false });
  };

  return (
    <section className="bg-[#eaf3fb]">
      <div className="mx-auto grid min-h-[710px] w-full max-w-[1250px] items-start gap-12 px-6 py-[4.5rem] md:py-20 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16 lg:px-8 xl:px-0">
        <ServiceList
          services={bookingServices}
          selected={service}
          onSelect={handleSelect}
        />
        <BookingPanel service={service} />
      </div>
    </section>
  );
}
