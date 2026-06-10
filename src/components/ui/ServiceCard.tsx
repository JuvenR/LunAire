"use client";
import React from "react";

export interface ServiceCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  iconGradientFrom?: string;
  iconGradientTo?: string;
  accentColor?: string;
  titleHoverColor?: string;
  dotColor?: string;
}

export default function ServiceCard({
  title,
  items,
  icon,
  iconGradientFrom = "#006FB8",
  iconGradientTo = "#56BCFF",
  accentColor = "#0A76BC",
  titleHoverColor = "#004273",
  dotColor = "#5da3db",
}: ServiceCardProps) {
  return (
    <div className="relative w-full max-w-[490px] mx-auto sm:ml-8 sm:mr-0 group">
      <div
        className="absolute left-1/2 -top-9 -translate-x-1/2 sm:-left-10 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 w-[68px] h-[68px] sm:w-[75px] sm:h-[75px] rounded-full shadow-lg flex items-center justify-center text-white z-10 transition-transform duration-300 group-hover:-translate-y-2 sm:group-hover:-translate-y-[60%] group-hover:shadow-lg
          [&_svg]:w-9 [&_svg]:h-9 sm:[&_svg]:w-10 sm:[&_svg]:h-10 [&_svg]:stroke-[8] font-bold"
        style={{
          background: `linear-gradient(to bottom, ${iconGradientFrom}, ${iconGradientTo})`,
        }}
      >
        {icon}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-5 pt-12 sm:p-7 sm:pl-20 min-h-[190px] w-full transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_8px_30px_rgba(28,91,142,0.12)] group-hover:-translate-y-1">
        <h3
          className="text-[22px] sm:text-[25px] font-bold text-center sm:text-left sm:ml-3 mb-3 sm:mb-2 transition-colors duration-300"
          style={{ color: accentColor }}
          onMouseEnter={e => (e.currentTarget.style.color = titleHoverColor)}
          onMouseLeave={e => (e.currentTarget.style.color = accentColor)}
        >
          {title}
        </h3>

        <ul className="flex flex-col gap-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-[#424954] text-[17px] sm:text-[19px] flex items-center gap-3 transition-colors duration-300 group-hover:text-gray-800"
            >
              <span
                className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                style={{ backgroundColor: dotColor }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}