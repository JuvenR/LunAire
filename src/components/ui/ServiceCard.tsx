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

      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#1c5b8e] to-[#5da3db] shadow-md flex items-center justify-center text-white z-10 transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:shadow-lg">
        {icon}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 pl-12 min-h-[180px] transition-all duration-300
        group-hover:bg-white group-hover:shadow-[0_8px_30px_rgba(28,91,142,0.12)] group-hover:-translate-y-1">

        <h3 className="text-xl font-bold text-[#1c5b8e] mb-4 transition-colors duration-300 group-hover:text-[#0f283d]">
          {title}
        </h3>

        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-gray-600 text-sm md:text-base flex items-center gap-2 transition-colors duration-300 group-hover:text-gray-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5da3db] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}