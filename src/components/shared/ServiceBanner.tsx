"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

interface ServiceBannerProps {
  topTitle: string;
  mainTitle: string;
  buttonText: string;
  buttonHref: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
}

export default function ServiceBanner({
  topTitle,
  mainTitle,
  buttonText,
  buttonHref,
  bgFrom,
  bgTo,
  textColor,
}: ServiceBannerProps) {
  const cardRef = useRef<HTMLDivElement>(null);



  return (
    <div
      className="w-full overflow-hidden px-4 sm:px-8 lg:px-10 py-8 sm:py-10 flex items-center min-h-[200px] sm:min-h-[220px]"
      style={{
        background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
      }}
    >
      {/* Floating card wrapper */}
      <div
        ref={cardRef}
        className="w-full"
        style={{
          willChange: 'transform',
        }}
      >
        <motion.div
          className="flex flex-col justify-center items-center px-5 sm:px-8 py-8 rounded-[20px]"
          style={{
            background: 'rgba(237, 245, 255, 0.92)',
            // White glow — makes it look like it's lit from within
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.6),
              0 4px 24px rgba(255,255,255,0.5),
              0 20px 60px rgba(9, 117, 187, 0.18),
              0 2px 8px rgba(255,255,255,0.8) inset
            `,
            backdropFilter: 'blur(8px)',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="text-[#848E9F] text-lg sm:text-[20px] font-medium mb-3 tracking-wide text-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {topTitle}
          </motion.span>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-[40px] lg:text-[40px] font-bold leading-tight mb-8 text-center"
            style={{ color: textColor }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {mainTitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={buttonHref}
              className="bg-[#be2e3e] w-full max-w-[300px] hover:bg-[#a32432] text-white font-semibold px-10 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-base md:text-lg inline-block text-center"

            >
              {buttonText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
