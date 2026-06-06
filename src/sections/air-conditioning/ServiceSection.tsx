"use client";
import React from 'react';
import { Snowflake, Wrench, Wind, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import ServiceCard from '@/components/ui/ServiceCard';

const servicesData = [
  {
    title: 'Installation and Replacement',
    items: ['Correct system sizing', 'High-efficiency units', 'Calibrated startup'],
    icon: <Snowflake size={28} weight="regular" />,
  },
  {
    title: 'Diagnostics and Repair',
    items: ['Electrical inspection', 'Leak detection', 'Critical fault correction'],
    icon: <Wrench size={28} weight="regular" />,
  },
  {
    title: 'Airflow Balancing',
    items: ['Zone distribution', 'Better comfort', 'Fewer hot spots'],
    icon: <Wind size={28} weight="regular" />,
  },
  {
    title: 'Preventive Maintenance',
    items: ['Component cleaning', 'Performance tuning', 'Breakdown prevention'],
    icon: <ShieldCheck size={28} weight="regular" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f0f6fc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Título */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#0f283d] mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          AC Services
        </motion.h2>

        {/* Grid de cards — cada una entra con stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
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