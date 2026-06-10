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
  repeatCount = 30,
  speed = 30,
}: GradientBannerProps) {
  const items = Array.from({ length: repeatCount });

  const Row = () => (
    <div className="flex items-center">
      {items.map((_, index) => (
        <React.Fragment key={index}>
          <span className="text-white text-lg md:text-xl font-medium px-8">
            {text}
          </span>
          <span className="text-white text-lg px-2 opacity-90">
            ●
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className="w-full py-4 overflow-hidden flex items-center relative"
      style={{
        background: `linear-gradient(to right, ${startColor}, ${endColor})`,
      }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
      <div className="animate-marquee w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}