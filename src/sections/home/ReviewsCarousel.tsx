"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { reviews } from "@/content/reviews";

// Runs before paint on the client, falls back to useEffect on the server
// (avoids the SSR useLayoutEffect warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Two stacked copies are enough for a seamless wrap: the offset is always taken
// modulo one copy height, and one copy is far taller than the viewport.
const COPIES = 2;
const loop = Array.from({ length: COPIES }).flatMap(() => reviews);

// Auto-scroll: gentle px/second, and the idle delay before it resumes.
const AUTO_SPEED = 20;
const RESUME_DELAY = 2500;

// Subtle, deterministic per-card variation. Keyed by the base review index so
// every copy looks identical and the infinite wrap stays seamless.
const variations = [
  { rotate: -2, x: -8 },
  { rotate: 1.6, x: 8 },
  { rotate: -1, x: -4 },
  { rotate: 2, x: 6 },
  { rotate: -1.6, x: -7 },
  { rotate: 1.1, x: 5 },
  { rotate: -1.8, x: -6 },
  { rotate: 0.8, x: 4 },
  { rotate: -0.6, x: -2 },
];

export function ReviewsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Height of a single copy — measured once on mount and on resize.
  const copyHeightRef = useRef(0);

  // Animation state (refs only — this component never re-renders after mount).
  const offsetRef = useRef(0); // how far the track is translated up (px)
  const lastTime = useRef(0);
  const lastY = useRef(0);
  const rafRef = useRef<number | null>(null);
  const measureRaf = useRef<number | null>(null);

  // Pause sources.
  const hoverRef = useRef(false);
  const dragRef = useRef(false);
  const focusRef = useRef(false);
  const resumeAt = useRef(0);
  const reducedRef = useRef(false);

  // The only per-frame write: one transform on one element. No layout reads.
  const setOffset = (value: number) => {
    const copy = copyHeightRef.current;
    const o = copy ? ((value % copy) + copy) % copy : value;
    offsetRef.current = o;
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(0, ${-o}px, 0)`;
  };

  // The loop period = distance between a card and its twin one copy down.
  const measure = () => {
    const track = trackRef.current;
    if (!track || track.children.length <= reviews.length) return;
    const first = track.children[0] as HTMLElement;
    const twin = track.children[reviews.length] as HTMLElement;
    copyHeightRef.current = twin.offsetTop - first.offsetTop;
    setOffset(offsetRef.current); // re-clamp + re-apply after a resize
  };

  useIsoLayoutEffect(() => {
    measure();
  }, []);

  // Re-measure on size changes only — coalesced into a single rAF so a resize
  // drag never thrashes layout, and never runs during the animation frame.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => {
      if (measureRaf.current !== null) return;
      measureRaf.current = requestAnimationFrame(() => {
        measureRaf.current = null;
        measure();
      });
    });
    ro.observe(track);
    return () => {
      ro.disconnect();
      if (measureRaf.current !== null) cancelAnimationFrame(measureRaf.current);
    };
  }, []);

  // Track prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onChange = () => {
      reducedRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // rAF runs *only while the carousel is on screen* and advances the transform
  // only while idle. Off screen / reduced-motion / interacting => no rAF at all.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      let dt = lastTime.current ? (now - lastTime.current) / 1000 : 0;
      lastTime.current = now;
      if (dt > 0.05) dt = 0.05; // clamp after a backgrounded tab

      const idle =
        !reducedRef.current &&
        !hoverRef.current &&
        !dragRef.current &&
        !focusRef.current &&
        Date.now() >= resumeAt.current;

      if (idle) setOffset(offsetRef.current + AUTO_SPEED * dt);
    };

    const start = () => {
      if (rafRef.current !== null) return;
      lastTime.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (rafRef.current === null) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(vp);

    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  // Hold off auto-scroll for a moment after a discrete interaction.
  const pauseSoon = () => {
    resumeAt.current = Date.now() + RESUME_DELAY;
  };

  // Mouse drag moves the transform offset. Touch keeps native page scrolling.
  // The cursor is set imperatively so a drag never triggers a React re-render.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const vp = viewportRef.current;
    dragRef.current = true;
    lastY.current = e.clientY;
    vp?.setPointerCapture(e.pointerId);
    if (vp) vp.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setOffset(offsetRef.current - (e.clientY - lastY.current));
    lastY.current = e.clientY;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const vp = viewportRef.current;
    dragRef.current = false;
    vp?.releasePointerCapture(e.pointerId);
    if (vp) vp.style.cursor = "";
    pauseSoon();
  };

  // Pause on hover (mouse only); resume shortly after leaving.
  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") hoverRef.current = true;
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current) endDrag(e);
    if (e.pointerType === "mouse") {
      hoverRef.current = false;
      pauseSoon();
    }
  };

  const onFocus = () => {
    focusRef.current = true;
  };

  const onBlur = () => {
    focusRef.current = false;
    pauseSoon();
  };

  return (
    <div
      ref={viewportRef}
      onWheel={pauseSoon}
      onTouchStart={pauseSoon}
      onTouchMove={pauseSoon}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
      className="h-[clamp(440px,72svh,620px)] cursor-grab select-none overflow-hidden [touch-action:pan-y] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.45)_18%,#000_38%,#000_62%,rgba(0,0,0,0.45)_82%,rgba(0,0,0,0.04)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.45)_18%,#000_38%,#000_62%,rgba(0,0,0,0.45)_82%,rgba(0,0,0,0.04)_100%)]"
    >
      <div
        ref={trackRef}
        style={{ transform: "translate3d(0, 0, 0)" }}
        className="flex flex-col gap-7 pl-8 pr-6 will-change-transform"
      >
        {loop.map((review, index) => {
          const v = variations[(index % reviews.length) % variations.length];
          return (
            <article
              key={index}
              style={{
                transform: `rotate(${v.rotate}deg) translateX(${v.x}px)`,
              }}
              className="relative rounded-2xl bg-white py-6 pl-12 pr-7 shadow-[0_14px_30px_rgba(28,62,88,0.18)]"
            >
              <div
                className={`absolute -left-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-2xl font-semibold text-white shadow-[0_6px_14px_rgba(28,62,88,0.25)] ${review.color}`}
                aria-hidden
              >
                {review.name.charAt(0)}
              </div>

              <h3 className="text-lg font-extrabold leading-none text-black">
                {review.name}
              </h3>
              <p className="mt-1.5 text-sm font-bold text-slate-500">
                {review.date}
              </p>

              <div className="mt-3 flex gap-1 text-[#F5C400]">
                {Array.from({ length: 5 }).map((_, star) => (
                  <StarIcon key={star} size={16} weight="fill" />
                ))}
              </div>

              <p className="mt-2.5 text-base font-bold leading-6 text-black">
                {review.text}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
