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
    <div className="w-full h-[500px] bg-[#031d3a] flex flex-col md:flex-row overflow-hidden">

      {/* Foto */}
      <motion.div
        className="w-full md:w-2/5 h-[100px] md:h-auto md:self-stretch flex-shrink-0"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center select-none block"
        />
      </motion.div>

      {/* Texto */}
      <div className="flex-1 flex flex-col justify-center items-end px-8 py-12 md:px-20 md:py-16 text-white text-right">

        <motion.span
          className="text-gray-400 text-lg md:text-xl font-normal mb-2 tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {topTitle}
        </motion.span>

        <motion.h2
          className="text-3xl md:text-[44px] font-bold leading-tight max-w-[500px] mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {mainTitle}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={buttonHref}
            className="bg-[#be2e3e] hover:bg-[#a32432] text-white font-medium px-10 py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-base md:text-lg shadow-md inline-block text-center"
          >
            {buttonText}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}