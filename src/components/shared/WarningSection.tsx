"use client";
import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useSpring, useTransform, MotionValue } from 'framer-motion';

interface WarningSectionProps {
    title: string;
    subtitle: string;
    titleColor: string;
    subtitleColor?: string;
    cardColors: [string, string, string];
    cards: [string, string, string];
    bgFrom?: string;
    bgTo?: string;
}

function FloatingCard({
    children,
    phase,
    rotate,
    style,
    className,
    onHoverStart,
    onHoverEnd,
    isHovered,
}: {
    children: React.ReactNode;
    phase: number;
    rotate: number;
    style?: React.CSSProperties;
    className?: string;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    isHovered?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const rawY = useRef(0);

    // Springs para transiciones suaves
    const springY = useSpring(0, { stiffness: 60, damping: 18 });
    const springRotate = useSpring(rotate, { stiffness: 60, damping: 18 });
    const springScale = useSpring(1, { stiffness: 120, damping: 20 });

    useAnimationFrame((t) => {
        // Calcula el float natural
        const floatY = Math.sin((t + phase * 800) / 1600) * 6;
        rawY.current = floatY;

        if (!isHovered) {
            springY.set(floatY);
            springRotate.set(rotate);
            springScale.set(1);
        }
    });

    // Al hover: lleva suavemente a posición neutral
    React.useEffect(() => {
        if (isHovered) {
            springY.set(-8);
            springRotate.set(0);
            springScale.set(1.07);
        }
    }, [isHovered]);

    // Aplicar springs al DOM directamente
    React.useEffect(() => {
        const unsubY = springY.on('change', updateTransform);
        const unsubR = springRotate.on('change', updateTransform);
        const unsubS = springScale.on('change', updateTransform);
        return () => { unsubY(); unsubR(); unsubS(); };
    }, [springY, springRotate, springScale]);

    const updateTransform = () => {
        if (ref.current) {
            ref.current.style.transform =
                `rotate(${springRotate.get()}deg) translateY(${springY.get()}px) scale(${springScale.get()})`;
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{ ...style, willChange: 'transform', cursor: 'pointer' }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
        >
            {children}
        </div>
    );
}

export default function WarningSection({
    title = "Is your AC trying to tell you something?",
    subtitle = "Most AC problems give you warning signs before they become expensive repairs.",
    titleColor = "#0F4C81",
    subtitleColor = "#2C5282",
    cardColors = ["#0079C1", "#0F4C81", "#0A2240"],
    cards = [
        "Your home won't cool down properly",
        "Your electricity bill went up for no reason",
        "Excess humidity inside the house even with the AC on"
    ],
    bgFrom = "#EAF3FB",
    bgTo = "#C5DFF2",
}: WarningSectionProps) {

    const finalCardColors = [cardColors[0], titleColor, cardColors[2]];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const cardData = [
        { top: "0px",   left: "40px", rotate: 4,  phase: 0 },
        { top: "205px", left: "10px", rotate: -3, phase: 1 },
        { top: "415px", left: "50px", rotate: 5,  phase: 2 },
    ];

    return (
        <section
            className="relative w-full overflow-hidden px-6 py-16 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 min-h-[700px] select-none"
            style={{
                background: `linear-gradient(180deg, ${bgFrom}, ${bgTo})`,
            }}
        >
            {/* Cards side */}
            <div className="relative w-full max-w-[400px] h-[620px] z-10">
                {cardData.map((cd, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.7,
                            delay: 0.1 + i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            position: 'absolute',
                            top: cd.top,
                            left: cd.left,
                            zIndex: hoveredIndex === i ? 50 : 10,
                        }}
                    >
                        <FloatingCard
                            phase={cd.phase}
                            rotate={cd.rotate}
                            isHovered={hoveredIndex === i}
                            onHoverStart={() => setHoveredIndex(i)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="w-[350px] h-[190px] rounded-2xl text-white font-semibold text-2xl flex items-center justify-start"
                            style={{
                                backgroundColor: finalCardColors[i],
                                padding: '35px',
                                boxShadow: hoveredIndex === i
                                    ? '0 24px 55px -5px rgba(0,0,0,0.35)'
                                    : '0 10px 30px -5px rgba(0,0,0,0.2)',
                                transition: 'box-shadow 0.4s ease',
                            }}
                        >
                            <p className="leading-snug tracking-wide">{cards[i]}</p>
                        </FloatingCard>
                    </motion.div>
                ))}
            </div>

            {/* Text side */}
            <div className="w-full max-w-xl text-right flex flex-col justify-center">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-9 leading-[1.15]"
                    style={{ color: titleColor }}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                    {title}
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl font-regular max-w-lg opacity-90 ml-[50px]"
                    style={{ color: subtitleColor }}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                    {subtitle}
                </motion.p>
            </div>
        </section>
    );
}