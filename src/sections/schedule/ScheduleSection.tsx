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
    <section className="bg-[#eef4fb]">
      <div className="mx-auto grid w-full max-w-[1250px] gap-10 px-6 py-14 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14 lg:px-8 xl:px-0">
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
