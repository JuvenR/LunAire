"use client";
import React from "react";

export interface ServiceCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export default function ServiceCard({ title, items, icon }: ServiceCardProps) {
  return (
    <div className="relative ml-8 w-full group">

      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[75px] h-[75px] rounded-full bg-gradient-to-b from-[#006FB8] to-[#56BCFF] shadow-lg flex items-center justify-center text-white z-10 transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:shadow-lg
        [&_svg]:w-10 [&_svg]:h-10 [&_svg]:stroke-[8] font-bold">
        {icon}
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-7 pl-20 min-h-[190px] w-[490px] transition-all duration-300
        group-hover:bg-white group-hover:shadow-[0_8px_30px_rgba(28,91,142,0.12)] group-hover:-translate-y-1">

        <h3 className="text-[25px] font-bold text-[#0A76BC] ml-3 mb-2 transition-colors duration-300 group-hover:text-[#004273]">
          {title}
        </h3>

        <ul className="flex flex-col gap-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-[#424954] text-[19px] flex items-center gap-3 transition-colors duration-300 group-hover:text-gray-800"
            >
              <span className="w-2 h-2 rounded-full bg-[#5da3db] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}