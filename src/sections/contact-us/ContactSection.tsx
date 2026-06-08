import { ContactInfoPanel } from "@/sections/contact-us/ContactInfoPanel";
import { ContactForm } from "@/sections/contact-us/ContactForm";

export function ContactSection() {
  return (
    <section className="bg-[#eaf3fb]">
      <div className="mx-auto grid w-full max-w-[1250px] items-center gap-9 px-6 py-12 md:py-14 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:px-0">
        <ContactInfoPanel />
        <ContactForm />
      </div>
    </section>
  );
}
