import {
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/dist/ssr";
import { contact } from "@/content/contact";

const items = [
  {
    label: "Phone",
    value: contact.phone.label,
    href: contact.phone.href,
    icon: PhoneIcon,
    accent: "text-[#0a6fa4]",
  },
  {
    label: "Hours",
    value: contact.hours,
    icon: ClockIcon,
    accent: "text-[#bb0014]",
  },
  {
    label: "Service Area",
    value: contact.serviceArea,
    icon: MapPinIcon,
    accent: "text-[#1f9d57]",
  },
] as const;

export function ContactInfoPanel() {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-[#0b3a5e]">Our Information</h2>

      <div className="mt-6 flex flex-col gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-xl bg-white px-6 py-5 shadow-[0_10px_24px_rgba(28,62,88,0.08)]"
            >
              <Icon size={26} weight="fill" className={`shrink-0 ${item.accent}`} />
              <div>
                <p className={`text-sm font-bold ${item.accent}`}>{item.label}</p>
                {"href" in item ? (
                  <a
                    href={item.href}
                    className="text-[15px] font-semibold text-[#1c2b3a] transition-colors hover:text-[#0a6fa4]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[15px] font-semibold text-[#1c2b3a]">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
