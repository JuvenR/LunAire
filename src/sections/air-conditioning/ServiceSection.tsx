"use client";
import React from 'react';
import { motion } from "framer-motion";
import ServiceCard from '@/components/ui/ServiceCard';
import { ShieldCheckIcon, SnowflakeIcon, WindIcon, WrenchIcon } from '@phosphor-icons/react';

const servicesData = [
  {
    title: 'Installation and Replacement',
    items: ['Correct system sizing', 'High-efficiency units', 'Calibrated startup'],
    icon: <SnowflakeIcon size={28} weight="regular" />,
  },
  {
    title: 'Diagnostics and Repair',
    items: ['Electrical inspection', 'Leak detection', 'Critical fault correction'],
    icon: <WrenchIcon size={28} weight="regular" />,
  },
  {
    title: 'Airflow Balancing',
    items: ['Zone distribution', 'Better comfort', 'Fewer hot spots'],
    icon: <WindIcon size={28} weight="regular" />,
  },
  {
    title: 'Preventive Maintenance',
    items: ['Component cleaning', 'Performance tuning', 'Breakdown prevention'],
    icon: <ShieldCheckIcon size={28} weight="regular" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f0f6fc] py-8 px-4 ">
      <div className="max-w-7xl mx-auto">

        {/* Título */}
        <motion.h2
          className="text-5xl font-bold text-[#004273] mb-12 ml-[35px] mt-[7px]"
          initial={{ opacity: 0, y: 7 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Air Conditioning Services
        </motion.h2>

        {/* Grid de cards — cada una entra con stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
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
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}