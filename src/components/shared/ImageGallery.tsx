"use client";
import { useRef, useState, useCallback, useEffect } from 'react';
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

interface ImageGalleryProps {
  images: string[];
  title?: string;
  subtitle?: string;
  accentColor?: string;
  bgFrom?: string;
  bgTo?: string;
}

export default function ImageGallery({
  images,
  title = "We make things happen",
  subtitle = "See our top-quality installations and reliable repairs that guarantee a cool, comfortable home.",
  accentColor = "#0975BB",
  bgFrom = "#EAF3FB",
  bgTo = "#C5DFF2",
}: ImageGalleryProps) {
  const count = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const accDeltaX = useRef(0);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const R = 1000; 
  const ANGLE_STEP = 14; 
  const SIZES = [280, 220, 175];
  const CAROUSEL_HEIGHT = 480;
  const CIRCLE_CENTER_Y = 1220; 

  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveIndex(prev => (prev + 1) % count);
    setTimeout(() => { isAnimating.current = false; }, 550);
  }, [count]);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveIndex(prev => (prev - 1 + count) % count);
    setTimeout(() => { isAnimating.current = false; }, 550);
  }, [count]);

  const goToIndex = useCallback((index: number) => {
    if (isAnimating.current || index === activeIndex) return;
    isAnimating.current = true;
    setActiveIndex(index);
    setTimeout(() => { isAnimating.current = false; }, 550);
  }, [activeIndex]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    if (absY > absX) return;
    e.preventDefault();
    accDeltaX.current += e.deltaX;
    if (accDeltaX.current > 40) { goNext(); accDeltaX.current = 0; }
    else if (accDeltaX.current < -40) { goPrev(); accDeltaX.current = 0; }
    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    wheelTimeout.current = setTimeout(() => { accDeltaX.current = 0; }, 300);
  }, [goNext, goPrev]);

  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -40) goNext();
      else if (dx > 40) goPrev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goNext, goPrev]);

  const getOffset = (imgIndex: number) => {
    let offset = imgIndex - activeIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const getPosition = (offset: number) => {
    const abs = Math.abs(offset);
    const visible = abs <= 2;

    const angleDeg = 90 - offset * ANGLE_STEP;
    const angleRad = (angleDeg * Math.PI) / 180;

    const dx = Math.cos(angleRad) * R; 
    const dy = -Math.sin(angleRad) * R; 

    const size = SIZES[Math.min(abs, SIZES.length - 1)];
    
    // CAMBIO APLICADO: Redondeamos a 2 decimales para evitar el Hydration Mismatch
    const cardX = dx.toFixed(2); 
    const cardY = (CIRCLE_CENTER_Y + dy - size / 2).toFixed(2);

    const brightness = abs === 0 ? 1 : abs === 1 ? 0.5 : 0.3;
    const zIndex = abs === 0 ? 50 : abs === 1 ? 20 : 10;
    const opacity = visible ? 1 : 0;

    return { cardX, cardY, size, brightness, zIndex, opacity, visible };
  };

  return (
    <section
      className="relative w-full select-none overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
        paddingTop: '52px',
        paddingBottom: '32px',
      }}
      onWheel={handleWheel}
    >
      <div className="px-10 mb-8">
        <h2 className="text-4xl font-bold mb-3" style={{ color: accentColor }}>
          {title}
        </h2>
        <p className="text-gray-500 text-base max-w-lg leading-relaxed">{subtitle}</p>
      </div>

      <div style={{ position: 'relative', height: `${CAROUSEL_HEIGHT}px`, width: '100%' }}>

        <button
          onClick={goPrev}
          className="absolute left-4 z-50 p-3 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-md bg-white/80"
          style={{ top: '45%', transform: 'translateY(-50%)', borderColor: accentColor, color: accentColor }}
        >
          <CaretLeft size={22} weight="bold" />
        </button>

        {images.map((src, imgIndex) => {
          const offset = getOffset(imgIndex);
          const { cardX, cardY, size, brightness, zIndex, opacity, visible } = getPosition(offset);
          const isActive = offset === 0;

          return (
            <div
              key={imgIndex}
              onClick={() => !isActive && visible && goToIndex(imgIndex)}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: `${size}px`,
                height: `${size}px`,
                transform: `translate(calc(-50% + ${cardX}px), ${cardY}px)`,
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: isActive || !visible ? 'default' : 'pointer',
                opacity,
                zIndex,
                boxShadow: isActive
                  ? `0 20px 60px 8px ${accentColor}55`
                  : '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), width 0.55s ease, height 0.55s ease, opacity 0.4s ease, box-shadow 0.4s ease',
                willChange: 'transform',
              }}
            >
              <img
                src={src}
                alt={`Gallery ${imgIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none',
                  filter: `brightness(${brightness})`,
                  transition: 'filter 0.55s ease',
                }}
                draggable={false}
              />
            </div>
          );
        })}

        <button
          onClick={goNext}
          className="absolute right-4 z-50 p-3 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-md bg-white/80"
          style={{ top: '45%', transform: 'translateY(-50%)', borderColor: accentColor, color: accentColor }}
        >
          <CaretRight size={22} weight="bold" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            style={{
              width: index === activeIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: index === activeIndex ? accentColor : '#CBD5E1',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}