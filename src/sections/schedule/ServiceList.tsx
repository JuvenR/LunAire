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
      <h2 className="text-5xl font-extrabold tracking-tight text-[#082b45]">
        Services
      </h2>
      <ul className="mt-14 flex flex-col">
        {services.map((service) => {
          const isActive = service.key === selected;
          return (
            <li key={service.key} className="border-b border-[#cbd9e6]">
              <button
                type="button"
                onClick={() => onSelect(service.key)}
                aria-pressed={isActive}
                className={`w-full py-6 text-left text-3xl font-extrabold leading-tight transition-colors ${
                  isActive
                    ? "text-[#0a85c8]"
                    : "text-[#414a56] hover:text-[#0a6fa4]"
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
