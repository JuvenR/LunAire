"use client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceBannerProps {
  imageSrc: string;
  imageAlt?: string;
  topTitle: string;
  mainTitle: string;
  buttonText: string;
  buttonHref: string;
}

export default function ServiceBanner({
  imageSrc,
  imageAlt = "Service presentation",
  topTitle,
  mainTitle,
  buttonText,
  buttonHref,
}: ServiceBannerProps) {
  return (
    <div className="w-full bg-[#021d3a] grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-[450px] md:h-[500px]">
      {/* Foto */}
      <motion.div
        className="w-full h-[250px] md:h-full relative overflow-hidden"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center select-none"
        />
      </motion.div>

      {/* Texto — todos con el mismo delay base, escalonados manualmente */}
      <div className="flex flex-col justify-center items-end px-8 py-12 md:px-20 md:py-16 text-white text-right">
        <motion.span
          className="text-gray-400 text-base md:text-lg font-medium mb-3 tracking-wider uppercase"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {topTitle}
        </motion.span>

        <motion.h2
          className="text-3xl md:text-[44px] lg:text-[48px] font-bold leading-tight max-w-[500px] mb-8"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {mainTitle}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={buttonHref}
            className="bg-[#be2e3e] hover:bg-[#a32432] text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-base md:text-lg shadow-md inline-block text-center"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}