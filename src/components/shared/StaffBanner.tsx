"use client";
import { motion } from "framer-motion";

interface StaffBannerProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function StaffBanner({ imageUrl, title, description }: StaffBannerProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">

      {/* Fondo — zoom out sutil al entrar al viewport */}
      <motion.div
        className="absolute h-full inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent z-10" />

      {/* Texto */}
      <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col justify-end items-start text-left mt-10">

        <motion.h2
          className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {description}
        </motion.p>

      </div>
    </div>
  );
}