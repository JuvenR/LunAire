"use client";
import { useRef, useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0 });
    }
  }, []);

  const handleScroll = (newIndex: number) => {
    if (scrollContainerRef.current) {
      let finalIndex = newIndex;
      if (finalIndex < 0) finalIndex = images.length - 1;
      if (finalIndex >= images.length) finalIndex = 0;
      setActiveIndex(finalIndex);

      const cardWidth = 270;
      const cardGap = 24;
      const containerWidth = scrollContainerRef.current.offsetWidth;

      const targetScrollLeft =
        finalIndex * (cardWidth + cardGap) - (containerWidth / 2 - cardWidth / 2);

      scrollContainerRef.current.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => handleScroll(activeIndex - 1);
  const scrollRight = () => handleScroll(activeIndex + 1);

  return (
    // CORREGIDO: Se cambia el fondo plano por un degradado vertical que muere en tu color objetivo #0975BB
    <section className="relative w-full bg-gradient-to-b from-[#021d3a] to-[#0975BB] pb-16 overflow-hidden">
      
      <button
        onClick={scrollLeft}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 p-4 rounded-full border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Mover a la izquierda"
      >
        <CaretLeft size={28} weight="bold" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-24 scroll-smooth snap-x snap-mandatory focus:outline-none pt-4 pb-8"
        style={{ scrollbarWidth: 'none', perspective: '1000px' }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {images.map((src, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              onClick={() => handleScroll(index)}
              className={`snap-center shrink-0 w-[270px] h-[300px] aspect-square relative rounded-xl overflow-hidden transition-all duration-500 ease-out cursor-pointer
                hover:-translate-y-4 hover:opacity-100 hover:z-30 items-center 
                ${isActive
                  ? 'scale-101 opacity-100 z-10'
                  : 'scale-100 opacity-55 shadow-md shadow-black/40'
                }`}
            >
              <img
                src={src}
                alt={`Gallery item ${index + 1}`}
                className="w-[334px] h-[354px] object-cover select-none self-stretch"
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 p-4 rounded-full border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
        aria-label="Mover a la derecha"
      >
        <CaretRight size={28} weight="bold" />
      </button>
    </section>
  );
}