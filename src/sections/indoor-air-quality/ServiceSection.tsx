"use client";
import { motion } from "framer-motion";
import ServiceCard from '@/components/ui/ServiceCard';
import { DropIcon, FanIcon, ShieldCheckIcon, WindIcon } from '@phosphor-icons/react';

const servicesData = [
    {
        title: 'Active Purification',
        items: ['UV light & scrubber integration', 'High-efficiency particle reduction','Odor and smoke elimination'],
        icon: <FanIcon size={28} weight="regular" />,
    },
    {
        title: 'Humidity Control',
        items: ['Optimal indoor moisture balancing', 'Proactive mold and mildew prevention', 'Enhanced respiratory and skin comfort'],
        icon: <DropIcon size={28} weight="regular" />,
    },
    {
        title: 'Airflow & Ventilation',
       items: ['Continuous outdoor air exchange','Balanced pressure and distribution','Elimination of stale air zones'],
        icon: <WindIcon size={28} weight="regular" />,
    },
    {
        title: 'IAQ Preventive Plan',
        items: ['Scheduled filter updates','Regular duct and coil deep sanitization','Long-term air quality tracking'],
        icon: <ShieldCheckIcon size={28} weight="regular" />,
    },
];

export default function ServicesSection() {
    return (
        <section className="w-full bg-[#f0f6fc] py-8 px-5 sm:px-6 lg:px-4">
            <div className="max-w-7xl mx-auto">

                {/* Título */}
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#294715] mb-19 sm:mb-12 sm:ml-[35px] mt-[7px]"
                    initial={{ opacity: 0, y: 7 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    Indoor Services
                </motion.h2>

                {/* Grid de cards — cada una entra con stagger */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-8">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -36 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.55,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <ServiceCard
                                title={service.title}
                                items={service.items}
                                icon={service.icon}
                                iconGradientFrom="#4D7C2C"
                                iconGradientTo="#8FCD60"
                                accentColor="#4D7C2C"
                                titleHoverColor="#24400f"
                                dotColor="#97D55C"
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
