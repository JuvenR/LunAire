"use client";
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [viewportWidth, setViewportWidth] = useState(1200);

  const galleryScale =
    viewportWidth < 640
      ? Math.max(0.62, viewportWidth / 640)
      : viewportWidth < 1024
        ? 0.82
        : 1;
  const R = 1100 * galleryScale;
  const ANGLE_STEP = viewportWidth < 640 ? 20 : 16;
  const SIZE = 240 * galleryScale;
  const CAROUSEL_HEIGHT = viewportWidth < 640 ? 360 : viewportWidth < 1024 ? 430 : 520;
  const CIRCLE_CENTER_Y = 1280 * galleryScale;
  const VISIBLE_RANGE = viewportWidth < 640 ? 1 : 2;

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
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);

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
      window.removeEventListener('resize', updateViewportWidth);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goNext, goPrev]);

  if (count === 0) return null;

  const getOffset = (imgIndex: number) => {
    let offset = imgIndex - activeIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const getPosition = (offset: number) => {
    const abs = Math.abs(offset);
    const visible = abs <= VISIBLE_RANGE;

    const angleDeg = 90 - offset * ANGLE_STEP;
    const angleRad = (angleDeg * Math.PI) / 180;

    const dx = Math.cos(angleRad) * R;
    const dy = -Math.sin(angleRad) * R;

    const cardX = parseFloat(dx.toFixed(2));
    const cardY = parseFloat((CIRCLE_CENTER_Y + dy - SIZE / 2).toFixed(2));

    const brightness = abs === 0 ? 1 : abs === 1 ? 0.45 : 0.25;
    const opacity = visible ? 1 : 0;

    return { cardX, cardY, brightness, opacity, visible };
  };

  return (
    <section
      className="relative w-full select-none overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
        paddingTop: '72px',
        paddingBottom: '32px',
      }}
      onWheel={handleWheel}
    >
      {/* Header */}
      <div className="px-10 mb-8">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:ml-[70px]"
          style={{ color: accentColor }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-[#424954] text-base sm:text-[20px] sm:ml-[70px] leading-relaxed max-w-3xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Carousel */}
      <div style={{ position: 'relative', height: `${CAROUSEL_HEIGHT}px`, width: '100%' }}>
        {images.map((src, imgIndex) => {
          const offset = getOffset(imgIndex);
          const { cardX, cardY, brightness, opacity, visible } = getPosition(offset);
          const isActive = offset === 0;

          return (
            <div
              key={imgIndex}
              onClick={() => !isActive && visible && goToIndex(imgIndex)}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: `${SIZE}px`,
                height: `${SIZE}px`,
                transform: `translate(calc(-50% + ${cardX}px), ${cardY}px)`,
                overflow: 'hidden',
                cursor: isActive || !visible ? 'default' : 'pointer',
                opacity,
                borderRadius: '100%',
                zIndex: 10,
                boxShadow: isActive
                  ? `0 5px 20px 10px ${accentColor}95`
                  : '0 8px 24px rgba(0,0,0,0.12)',
                transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, box-shadow 0.4s ease',
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
                  borderRadius: '100%',
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
      </div>

      {/* Botones de navegación — centrados sobre los dots */}
      <motion.div
        className="flex justify-center gap-4 mb-7 mt-[-4px]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={goPrev}
          className="p-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
          style={{ backgroundColor: accentColor, color: 'white' }}
        >
          <CaretLeft size={22} weight="bold" />
        </button>
        <button
          onClick={goNext}
          className="p-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
          style={{ backgroundColor: accentColor, color: 'white' }}
        >
          <CaretRight size={22} weight="bold" />
        </button>
      </motion.div>

      {/* Dots */}
      <motion.div
        className="flex justify-center gap-2 mt-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
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
      </motion.div>
    </section>
  );
}
