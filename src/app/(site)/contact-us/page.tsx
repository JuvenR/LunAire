import { PageHero } from "@/components/shared/PageHero";
import { UrgentCallBand } from "@/components/shared/UrgentCallBand";
import { ContactSection } from "@/sections/contact-us/ContactSection";

export default function Page() {
  return (
    <main>
      <PageHero
        eyebrow="Contact Us"
        title="Contact Our Team"
        subtitle="Send your request and our team will confirm your service window as soon as possible."
      />
      <ContactSection />
      <UrgentCallBand />
    </main>
  );
}
