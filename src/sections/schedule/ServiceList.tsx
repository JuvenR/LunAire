import type { ServiceOption } from "@/content/services";
import type { BookingService } from "@/lib/booking";

type ServiceListProps = {
  services: ServiceOption[];
  selected: BookingService;
  onSelect: (key: BookingService) => void;
};

export function ServiceList({ services, selected, onSelect }: ServiceListProps) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-[#0b3a5e]">Services</h2>
      <ul className="mt-6 flex flex-col gap-4">
        {services.map((service) => {
          const isActive = service.key === selected;
          return (
            <li key={service.key}>
              <button
                type="button"
                onClick={() => onSelect(service.key)}
                aria-pressed={isActive}
                className={`text-left text-lg font-bold transition-colors ${
                  isActive
                    ? "text-[#0a85c8]"
                    : "text-[#1c2b3a] hover:text-[#0a6fa4]"
                }`}
              >
                {service.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
