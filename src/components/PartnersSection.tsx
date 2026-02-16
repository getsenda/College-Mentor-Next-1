"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useHomepageData } from '@/hooks/useHomepageData';

type Logo = { name: string; logo: string };

const logos: Logo[] = [
  { name: "IIT Delhi", logo: "/assets/university-logos/iit.jpg" },
  { name: "IIM Bangalore", logo: "/assets/university-logos/iim.png" },
  { name: "AIIMS", logo: "/assets/university-logos/aiims.png" },
  { name: "BITS Pilani", logo: "/assets/university-logos/bits.jpg" },
  { name: "JNU", logo: "/assets/university-logos/jnu.jpeg" },
  { name: "Delhi University", logo: "/assets/university-logos/delhi.png" },
  { name: "MIT Manipal", logo: "/assets/university-logos/mit.png" },
  { name: "Amity University", logo: "/assets/university-logos/amity.png" },
  { name: "Shiv Nadar University", logo: "/assets/university-logos/shiv.png" },
  { name: "Lovely Professional", logo: "/assets/university-logos/lpu.png" },
];

// Split into two rows - will be recalculated in component

const LogoMarqueeRow: React.FC<{
  items: Logo[];
  direction?: "left" | "right";
  baseSpeed?: number; // base speed factor
  rowIndex: number;
  onSlideChange?: (row: number, activeIndex: number) => void;
}> = ({ items, direction = "left", baseSpeed = 6, rowIndex, onSlideChange }) => {
  const [active, setActive] = useState(0);

  // Auto highlight active item
  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  // Sync active state with parent only when it changes
  useEffect(() => {
    onSlideChange?.(rowIndex, active);
  }, [active, rowIndex, onSlideChange]);

  // Tripled items for seamless loop
  const track = [...items, ...items, ...items];

  // Dynamic speed → more items = slower animation
  const speedSec = items.length * baseSpeed;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x:
            direction === "left"
              ? ["0%", "-33.33%"]
              : ["-33.33%", "0%"],
        }}
        transition={{ duration: speedSec, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, idx) => {
          const realIndex = idx % items.length;
          const isActive = active === realIndex;

          return (
            <motion.div
              key={`${item.name}-${idx}`}
              className="flex flex-col items-center justify-center flex-shrink-0"
            >
              {/* Circle */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-white border-2 border-gray-200 shadow-sm flex items-center justify-center">
                <motion.img
                  src={item.logo}
                  alt={item.name}
                  className="w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>

              {/* Label */}
              <p
                className={`mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-center ${isActive ? "text-[#00C798]" : "text-gray-600"
                  }`}
              >
                {item.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const PartnerSection: React.FC = () => {
  const { data } = useHomepageData();
  const [activeRowA, setActiveRowA] = useState(0);

  // Use API partner data if it exists, otherwise use hardcoded
  const partnerData = data?.partners;

  // Memoize logos to avoid recalculation
  const logosWithApi = useMemo(() => {
    return partnerData?.name && partnerData?.logoUrl
      ? [{ name: partnerData.name, logo: partnerData.logoUrl }, ...logos]
      : logos;
  }, [partnerData]);

  // Split into two rows - memoized
  const rowA = useMemo(() => logosWithApi.filter((_, i) => i % 2 === 0), [logosWithApi]);
  const rowB = useMemo(() => logosWithApi.filter((_, i) => i % 2 === 1), [logosWithApi]);

  const handleSlideChange = useCallback((row: number, idx: number) => {
    if (row === 0) {
      setActiveRowA(idx);
    }
  }, []);

  return (
    // <section className="relative py-12 sm:py-16 lg:py-20 bg-[#f5f9f7] overflow-hidden">
    <section className="relative pt-5  bg-[#f5f9f7] overflow-hidden">
      {/* Floating circles */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#00C798]/20"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-[#00C798]/10"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 left-1/3 w-10 h-10 rounded-full bg-[#00C798]/15"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Top curve */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[100px] sm:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path d="M0,64 C360,120 1080,0 1440,64 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div className="relative w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-12">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 pt-6 sm:pt-8 md:pt-10">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-50 to-green-50 text-primary shadow-sm">
            🌟 Success Network
          </span>
          <h2 id="partners-section" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Partnering with India&apos;s leading institutions
          </p>
        </div>

        {/* Two marquee rows */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          <LogoMarqueeRow
            items={rowA}
            direction="left"
            baseSpeed={6}
            rowIndex={0}
            onSlideChange={handleSlideChange}
          />
          <LogoMarqueeRow items={rowB} direction="right" baseSpeed={6} rowIndex={1} />
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-14 lg:mt-20">
          {rowA.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition ${activeRowA === i ? "bg-[#00C798]" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
