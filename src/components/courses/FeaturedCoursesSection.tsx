import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/FallBack';
import { courseService, TwinningProgram } from '@/services/courseService';
import { logger } from '@/utils/logger';


interface Program {
  id: string;
  university1: string;
  university2: string;
  location1: string;
  location2: string;
  image1: string;
  image2: string;
  programType: string;
  mode: string;
  color: 'blue' | 'orange' | 'green';
}

const basePrograms: Program[] = [
  {
    id: '1',
    university1: 'SRM',
    university2: 'UC DAVIS',
    location1: 'India',
    location2: 'USA',
    image1: 'https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNDg0MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1664134654088-a68149c2ed5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwbWFpbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjUyNTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    programType: 'Semester Abroad',
    mode: 'Twinning',
    color: 'blue'
  },
  {
    id: '2',
    university1: 'Manipal',
    university2: 'Melbourne',
    location1: 'India',
    location2: 'Australia',
    image1: 'https://images.unsplash.com/photo-1638636214032-581196ffd400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBjYW1wdXN8ZW58MXx8fHwxNzYyNDk3MjY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1690616477729-a3d5f8ed00d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcXVhZCUyMGxhd258ZW58MXx8fHwxNzYyNTI1MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    programType: 'Semester Abroad',
    mode: 'Twinning',
    color: 'orange'
  },
  {
    id: '3',
    university1: 'VIT',
    university2: 'PURDUE',
    location1: 'India',
    location2: 'USA',
    image1: 'https://images.unsplash.com/photo-1594027674795-865f4959fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwaGFsbCUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MjUyNDY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1702736310552-ec812e56f6b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBjbG9ja3Rvd2VyJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNTI1MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    programType: 'Semester Abroad',
    mode: 'Twinning',
    color: 'green'
  },
  {
    id: '4',
    university1: 'GITAM',
    university2: 'Stanford',
    location1: 'India',
    location2: 'USA',
    image1: 'https://images.unsplash.com/photo-1702001295364-b701b493ef57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwYXJjaGl0ZWN0dXJlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzYyNTI0NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1592542306951-17d42a2d0d1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZW50cmFuY2UlMjBnYXRlfGVufDF8fHx8MTc2MjUyNTI0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    programType: 'Semester Abroad',
    mode: 'Twinning',
    color: 'blue'
  },
  {
    id: '5',
    university1: 'Amrita',
    university2: 'MIT',
    location1: 'India',
    location2: 'USA',
    image1: 'https://images.unsplash.com/photo-1720525200240-17cd4ffd127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBxdWFkcmFuZ2xlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyNTI0NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1676768307908-eb581424bde0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY291cnR5YXJkJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MjUyNTI0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    programType: 'Semester Abroad',
    mode: 'Twinning',
    color: 'orange'
  },
  {
    id: '6',
    university1: 'SSN',
    university2: 'Oxford',
    location1: 'India',
    location2: 'UK',
    image1: 'https://images.unsplash.com/photo-1667273704848-32df02bd29f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjUyNDY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    image2: 'https://images.unsplash.com/photo-1701094264660-7e7aaad18c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG93ZXIlMjBsYW5kbWFya3xlbnwxfHx8fDE3NjI1MjUyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    programType: 'Semester Abroad',
    mode: 'Twinning',
    color: 'green'
  },
];

const colorConfig = {
  blue: {
    button: 'bg-[#00B4D8] hover:bg-[#00A0C8]',
    icon: 'bg-[#00B4D8]'
  },
  orange: {
    button: 'bg-[#FF8C00] hover:bg-[#E67E00]',
    icon: 'bg-[#FF8C00]'
  },
  green: {
    button: 'bg-[#10B981] hover:bg-[#059669]',
    icon: 'bg-[#10B981]'
  }
};

// Helper to generate abbreviation from college/university name
const getAbbreviation = (name: string): string => {
  if (!name) return "";
  const words = name.split(/\s+/).filter(Boolean);
  const initials = words.map((w) => w[0]?.toUpperCase()).join("");
  return initials || name;
};

export const InterestingPrograms = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [programs, setPrograms] = useState<Program[]>(basePrograms);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      const apiPrograms: TwinningProgram[] = await courseService.getTwinningPrograms();

      if (!apiPrograms || apiPrograms.length === 0) {
        logger.log("ℹ️ No twinning programs from API, using default static programs");
        setPrograms(basePrograms);
        return;
      }

      const mapped: Program[] = apiPrograms.map((item, index) => {
        const template = basePrograms[index % basePrograms.length];
        return {
          ...template,
          id: `${index + 1}`,
          university1: item.collegeName,
          university2: item.partnerUniversityName,
          location1: item.collegeCounty || template.location1,
          location2: item.partnerUniversityCountry || template.location2,
          programType: item.programType || template.programType,
          mode: item.programMode || template.mode,
        };
      });

      setPrograms(mapped);
    };

    fetchPrograms();
  }, []);

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gray-800">Interesting </span>
          <span className="text-[#10B981]">Programs For You</span>
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory px-1"

          

            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start"
              >
                <div className="bg-white rounded-2xl overflow-hidden ">
                  {/* Card Image with Split Layout */}
                  <div className="relative h-[210px] sm:h-[250px] overflow-hidden flex">
                    {/* Left University Image */}
                    <div className="w-1/2 relative">
                      <ImageWithFallback
                        src={program.image1}
                        alt={program.university1}
                        className="w-full h-full object-cover"
                      />
                      {/* Left Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/30 to-black/50"></div>

                      {/* Left University Info (name + location) */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-sm font-semibold">{program.university1}</div>
                        <div className="text-xs opacity-90">{program.location1}</div>
                      </div>
                    </div>

                    {/* Right University Image */}
                    <div className="w-1/2 relative">
                      <ImageWithFallback
                        src={program.image2}
                        alt={program.university2}
                        className="w-full h-full object-cover"
                      />
                      {/* Right Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-bl from-black/20 via-black/30 to-black/50"></div>

                      {/* Right University Info (name + location) */}
                      <div className="absolute bottom-4 right-4 text-white text-right">
                        <div className="text-sm font-semibold">{program.university2}</div>
                        <div className="text-xs opacity-90">{program.location2}</div>
                      </div>
                    </div>

                    {/* Center Icon - Overlaying the split */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className={`${colorConfig[program.color].icon} rounded-full p-3 shadow-xl border-4 border-white`}>
                        <svg 
                          width="28" 
                          height="32" 
                          viewBox="0 0 28 32" 
                          fill="none"
                          className="text-white"
                        >
                          {/* Right Arrow (Top) */}
                          <path 
                            d="M4 8h16M16 4l4 4-4 4" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                          {/* Left Arrow (Bottom) */}
                          <path 
                            d="M24 24H8M12 28l-4-4 4-4" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6">
                    {/* Abbreviations row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-700">
                        {getAbbreviation(program.university1)}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                        {program.mode || 'Twinning'}
                      </span>
                      <span className="text-xs font-semibold text-gray-700 text-right">
                        {getAbbreviation(program.university2)}
                      </span>
                    </div>

                    {/* Program Details Divider */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        PROGRAM DETAILS
                      </span>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Program Info */}
                    <div className="flex justify-between mb-6">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Program Type</div>
                        <div className="text-sm text-gray-800">{program.programType}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Mode</div>
                        <div className="text-sm text-gray-800">{program.mode}</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button 
                      className={`w-full ${colorConfig[program.color].button} text-white py-3 rounded-md flex items-center justify-center gap-2 transition-all hover:shadow-lg group`}
                    >
                      <span className="text-sm">Explore Admission Process</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows (below cards) */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* View All Button */}
        {/* <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button className="border-2 border-blue-500 text-blue-500 px-12 py-3 rounded-md hover:bg-blue-50 transition-colors">
            View All Streams
          </button>
        </motion.div> */}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
