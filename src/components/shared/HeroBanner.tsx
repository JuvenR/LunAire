"use client";
import React from "react";
import { motion } from "framer-motion";

interface HeroBannerProps {
  imageUrl: string;
  subtitle?: string;
  title: React.ReactNode;
  description?: string;
  buttonText?: string;
  overlayColor?: string;
  onButtonClick?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageUrl,
  subtitle,
  title,
  description,
  buttonText = "Schedule Now",
  overlayColor = "rgba(23, 79, 128, 0.9)",
  onButtonClick,
}) => {
  return (
    <div className="relative w-full min-h-[450px] flex items-center overflow-hidden">

      {/* Fondo — zoom sutil */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.13 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {/* Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(to right, ${overlayColor} 0%, ${overlayColor} 2%, transparent 100%)`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl text-white">

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-sm md:text-base font-semibold tracking-wider uppercase mb-3 text-gray-200"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-5 leading-tight "
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              className="text-base md:text-lg mb-8 text-gray-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </motion.p>
          )}

          {/* Button (CORREGIDO: Ahora sí se desliza hacia arriba con flow) */}
          <motion.button
            onClick={onButtonClick}
            className="px-10 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-[10px] text-white font-semibold transition-transform hover:scale-105 duration-300 shadow-lg inline-block cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileTap={{ scale: 0.97 }}
          >
            {buttonText}
          </motion.button>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;