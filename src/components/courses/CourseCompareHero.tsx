// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { Search, Sparkles } from "lucide-react";

// interface CourseCompareHeroProps {
//   onSearchClick: () => void;
// }

// export function CourseCompareHero({ onSearchClick }: CourseCompareHeroProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"]
//   });

//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   return (
//     <div ref={containerRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/25 to-background">
//       {/* Animated background elements */}
//       <motion.div 
//         style={{ y: backgroundY }}
//         className="absolute inset-0 pointer-events-none"
//       >
//         <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
//       </motion.div>

//       <motion.div 
//         style={{ y: contentY, opacity }}
//         className="container mx-auto px-4 max-w-6xl relative z-10 text-center py-16"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
//         >
//           <Sparkles className="w-4 h-4 text-primary" />
//           <span className="text-sm font-medium text-primary">Smart Course Comparison</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
//         >
//          Course Compare Tool
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="text-lg md:text-md text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
//         >
//           Make informed decisions by comparing course details, fees, duration, and career prospects
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="max-w-2xl mx-auto"
//         >
//           <div 
//             onClick={onSearchClick}
//             className="relative group cursor-pointer"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
//             <div className="relative bg-background/80 backdrop-blur-lg border border-border/50 rounded-2xl p-4 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30">
//               <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
//               <span className="text-muted-foreground text-left flex-1">Search and select courses to compare...</span>
//               <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
//                 Click to start
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenSearch: () => void;
}

export function CourseCompareHero({ onOpenSearch }: HeroProps) {
  return (
    <div className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/40 via-secondary/35 to-background py-8 md:py-0 pt-24 md:pt-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-4 mt-12 md:mt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-cyan-200 mb-4 md:mb-6 shadow-sm"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-cyan-600" />
          </motion.div>
          <span className="text-xs md:text-sm text-cyan-700">Smart Course Comparison</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-cyan-600 mb-2 md:mb-4 text-xl md:text-3xl lg:text-4xl"
        >
          Course Compare Tool
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mb-4 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-2"
        >
          Make informed decisions by comparing course details, fees, duration, and career prospects
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onOpenSearch}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="max-w-2xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-2xl transition-all mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-2.5">

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            </motion.div>

            <input
              type="text"
              placeholder="Search courses to compare..."
              className="flex-1 outline-none text-gray-600 cursor-pointer text-sm md:text-base min-w-0"
              readOnly
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 md:px-4 md:py-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md text-sm md:text-base whitespace-nowrap"
            >
              Select
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}