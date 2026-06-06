import React from 'react';

interface GradientBannerProps {
  text: string;
  startColor: string; 
  endColor: string;   
  repeatCount?: number; 
  speed?: number; 
}

export default function GradientBanner({
  text,
  startColor,
  endColor,
  repeatCount = 10,
  speed = 30, // 20 segundos por defecto
}: GradientBannerProps) {
  
  const items = Array.from({ length: repeatCount });

  return (
    <div
      className="w-full py-4 overflow-hidden flex items-center relative"
      style={{
        background: `linear-gradient(to right, ${startColor}, ${endColor})`,
      }}
    >

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            /* La animación durará lo que le pases en la prop 'speed' */
            animation: marquee ${speed}s linear infinite;
          }
          /* Opcional: Pausar la animación si el usuario pasa el mouse por encima */
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="animate-marquee w-max">
        

        <div className="flex items-center">
          {items.map((_, index) => (
            <React.Fragment key={`first-${index}`}>
              <span className="text-white text-lg md:text-xl font-medium px-4">
                {text}
              </span>
              <span className="text-white text-xs px-2 opacity-80">
                ●
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center">
          {items.map((_, index) => (
            <React.Fragment key={`second-${index}`}>
              <span className="text-white text-lg md:text-xl font-medium px-4">
                {text}
              </span>
              <span className="text-white text-xs px-2 opacity-80">
                ●
              </span>
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
}