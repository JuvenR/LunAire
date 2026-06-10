"use client";
import { motion } from "framer-motion";
import ServiceCard from '@/components/ui/ServiceCard';
import { FireSimpleIcon, ShieldCheckIcon, ThermometerHotIcon, WrenchIcon } from '@phosphor-icons/react';

const servicesData = [
    {
        title: 'Installation',
        items: ['Furnace and heat pump setup with safety checks'],
        icon: <FireSimpleIcon size={28} weight="regular" />,
    },
    {
        title: 'Diagnostics and Repair',
        items: ['Fast diagnostics and reliable fault correction'],
        icon: <WrenchIcon size={28} weight="regular" />,
    },
    {
        title: 'Comfort',
        items: ['Zone balancing and smart thermal tuning.'],
        icon: <ThermometerHotIcon size={28} weight="regular" />,
    },
    {
        title: 'Preventive Maintenance',
        items: ['Preventive checks and combustion control'],
        icon: <ShieldCheckIcon size={28} weight="regular" />,
    },
];

export default function ServicesSection() {
    return (
        <section className="w-full bg-[#f0f6fc] py-8 px-5 sm:px-6 lg:px-4">
            <div className="max-w-7xl mx-auto">

                {/* Título */}
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#631821] mb-19 sm:mb-12 sm:ml-[35px] mt-[7px]"
                    initial={{ opacity: 0, y: 7 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    Complete Heating Coverage
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
                                iconGradientFrom="#841B28"
                                iconGradientTo="#EE5B6D"
                                accentColor="#841B28"
                                titleHoverColor="#871D2A"
                                dotColor="#C12E41"
                            />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
