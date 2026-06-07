import { contact } from "@/content/contact";

export function UrgentCallBand() {
  return (
    <section className="bg-[#04273f] text-white">
      <div className="mx-auto flex w-full max-w-[1250px] flex-col items-center gap-6 px-6 py-12 text-center lg:px-8 xl:px-0">
        <p className="text-base font-medium text-white/85">
          Need urgent help right now? Call our team for the fastest response
        </p>
        <a
          href={contact.phone.href}
          className="inline-flex items-center rounded-md bg-[#bb0014] px-7 py-3.5 text-[15px] font-bold tracking-wide text-white shadow-[0_18px_34px_-18px_rgba(187,0,20,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e0292a]"
        >
          Call {contact.phone.label}
        </a>
      </div>
    </section>
  );
}
