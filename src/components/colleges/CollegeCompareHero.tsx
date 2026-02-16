import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroSearchProps {
  onSearchClick: () => void;
}

export function HeroSearch({ onSearchClick }: HeroSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Different parallax speeds for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef}  className="relative py-24 md:py-24 px-4 -mx-4 mb-0 overflow-hidden bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10">
      {/* Parallax background layers */}
      {/* <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]"
      />
      <motion.div 
        style={{ y: layer1Y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(var(--accent)/0.1),transparent_50%)]"
      />
      <motion.div 
        style={{ y: layer2Y }}
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      /> */}

      <motion.div
        style={{ y: contentY, opacity }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h1 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-4 px-4 mt-5">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">COLLEGE & UNIVERSITIES COMPARE TOOL</span>
        </h1>
        <p className="text-gray-700 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-sm md:text-base px-4">
          Find the College that's the best fit for you by using our College Comparison Tool. Compare colleges side by side to find the right school for you! Add up to four schools to compare colleges in India based on Overview, Rankings & Accreditations, placements, Courses & fees, Admission & Eligibility, International Collaborations.
        </p>

        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lg p-3 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
            <div className="flex items-center flex-1 pl-2 sm:pl-4 min-w-0 py-2 sm:py-0">
              <Search className="w-5 h-5 text-[#173CBA] mr-3 flex-shrink-0" />
              <Input
                placeholder="Add a College to compare"
                className="border-0 bg-transparent focus-visible:ring-0 text-base placeholder:text-gray-400"
                onClick={onSearchClick}
                readOnly
              />
            </div>
            <Button
              className="bg-gradient-to-r from-[#173CBA] to-[#186BBF] hover:from-[#186BBF] hover:to-[#173CBA] rounded-full px-6 h-12 sm:h-11 gap-2 text-base font-medium w-full sm:w-auto"
              onClick={onSearchClick}
            >
              Compare
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      {/* Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="w-[200%]">
          <svg
            className="w-full h-24 md:h-32"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ animation: "waveMove 10s linear infinite" }}
          >
            <path
              fill="#ffffff"
              d="M0,160L80,144C160,128,320,96,480,112C640,128,800,192,960,202.7C1120,213,1280,171,1360,149.3L1440,128V320H0Z"
            />
          </svg>
        </div>
      </div> */}




    </div>
  );
}