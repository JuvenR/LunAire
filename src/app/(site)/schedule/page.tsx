import { PageHero } from "@/components/shared/PageHero";
import { UrgentCallBand } from "@/components/shared/UrgentCallBand";
import { ScheduleSection } from "@/sections/schedule/ScheduleSection";
import { isBookingService } from "@/lib/booking";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialService = isBookingService(service) ? service : "general";

  return (
    <main>
      <PageHero
        eyebrow="Schedule Online"
        title="Book Your Appointment"
        subtitle="Select your service and choose a convenient time slot. You can add issue details during booking."
      />
      <ScheduleSection initialService={initialService} />
      <UrgentCallBand />
    </main>
  );
}
