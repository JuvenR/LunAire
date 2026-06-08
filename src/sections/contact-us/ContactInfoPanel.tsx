import { contact } from "@/content/contact";

const items = [
  {
    label: "Phone",
    value: contact.phone.label,
    href: contact.phone.href,
    accent: "text-[#0a85c8]",
  },
  {
    label: "Hours",
    value: "Monday - Saturday\n8:00am - 6:00pm",
    accent: "text-[#9f1830]",
  },
  {
    label: "Service Area",
    value: contact.serviceArea,
    accent: "text-[#4c842d]",
  },
] as const;

export function ContactInfoPanel() {
  return (
    <div>
      <h2 className="text-4xl font-extrabold tracking-tight text-[#082b45]">
        Our Information
      </h2>

      <div className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-h-[80px] items-center justify-between gap-5 rounded-2xl bg-white px-5 py-4 shadow-[0_8px_18px_rgba(28,62,88,0.16)]"
          >
            <p className={`text-2xl font-extrabold ${item.accent}`}>
              {item.label}
            </p>
            {"href" in item ? (
              <a
                href={item.href}
                className="text-right text-xl font-extrabold leading-6 text-[#4a5160] transition-colors hover:text-[#0a6fa4]"
              >
                {item.value}
              </a>
            ) : (
              <p className="whitespace-pre-line text-right text-xl font-extrabold leading-6 text-[#4a5160]">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
