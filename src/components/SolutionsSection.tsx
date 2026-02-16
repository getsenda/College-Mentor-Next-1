"use client";

import React from 'react';
import { BookOpen, GraduationCap, FileText, Building, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import realCollegeMentorBg from '../../public/assets/real-college-mentor-bg.jpg';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { useHomepageData } from '@/hooks/useHomepageData';
import { useRouter } from 'next/navigation';

const SolutionsSection = () => {
  const { data } = useHomepageData();
  const router = useRouter();

  // Hardcoded fallback data
  const defaultQuickAccessItems = [
    {
      icon: BookOpen,
      title: "Courses",
      subtitle: "Discover 500+ Courses",
      description: "Explore courses across all streams and find your perfect match",
      buttonText: "Explore Now",
      buttonUrl: "/courses"
    },
    {
      icon: GraduationCap,
      title: "Colleges",
      subtitle: "Explore 40,000+ Colleges",
      description: "Find the best colleges with our comprehensive database",
      buttonText: "Explore Now",
      buttonUrl: "/colleges"
    },
    {
      icon: FileText,
      title: "Exams",
      subtitle: "Prepare for 50+ Competitive Exams",
      description: "Get exam prep materials and practice tests",
      buttonText: "Explore Now",
      buttonUrl: "/exams"
    },
    {
      icon: Building,
      title: "Careers",
      subtitle: "Find 200+ Dream Career Path",
      description: "Discover career paths that align with your interests",
      buttonText: "Explore Now",
      buttonUrl: "/careers"
    }
  ];

  // Map API quickAccess data to component format with icons
  const iconMap: Record<string, any> = {
    "Courses": BookOpen,
    "Colleges": GraduationCap,
    "Exams": FileText,
    "Careers": Building,
  };

  // Use API quickAccess only if it exists and has items, otherwise use hardcoded
  const quickAccessItems = data?.quickAccess && data.quickAccess.length > 0
    ? data.quickAccess.map((item) => ({
      icon: iconMap[item.title] || BookOpen,
      title: item.title,
      subtitle: item.countText,
      description: item.description,
      buttonText: item.buttonText,
      buttonUrl: item.buttonUrl,
    }))
    : defaultQuickAccessItems;

  return (
    <section id="quick-action-section" className="relative overflow-hidden bg-[#00C798] py-8 sm:py-12 md:py-16 lg:py-20">

      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-15 sm:opacity-20 md:opacity-30 z-0"
        style={{
          backgroundImage: `url(${realCollegeMentorBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Top Wave (deep, elevated white) */}
      <div className="absolute top-0 left-0 w-full z-10">
        <svg
          viewBox="0 0 1200 250"
          className="w-full h-[60px] sm:h-[80px] md:h-[120px] lg:h-[160px] xl:h-[200px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,160 C300,20 900,300 1200,100 L1200,0 L0,0 Z"
            fill="#f5f9f7"
          />
        </svg>
      </div>

      {/* White container inside green, sitting on wave */}
      <div className="relative z-10 w-full flex items-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh] px-4 sm:px-6 lg:px-8">
        <div className="bg-white/40 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-xl shadow-black/10 
      p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 
      w-full max-w-[1400px] mx-auto 
      border border-gray-100/50 backdrop-blur-sm">

          {/* Section Header - improved mobile alignment */}
          <ScrollAnimation>
            <div className="text-center mb-3 sm:mb-4 md:mb-6 px-1 sm:px-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 mb-2 sm:mb-3">
                <Sparkles size={10} className="text-primary animate-pulse sm:w-3 sm:h-3" />
                <span className="text-primary font-medium text-xs">Your Educational Journey</span>
              </div>

              <h2
                id="quick-access-title"
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight mb-2 sm:mb-3 px-1 sm:px-2"
              >
                Quick{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Access
                </span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
                Jump-start your educational journey with our most popular tools
              </p>
            </div>
          </ScrollAnimation>


          {/* Cards Grid */}
          <ScrollAnimation delay={0.3}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {quickAccessItems.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col text-center p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl 
                 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 
                 bg-white/50 backdrop-blur-md min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-[280px]"
                >
                  {/* Top Content (fills available space) */}
                  <div className="flex-1 flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-[#00C798] rounded-lg sm:rounded-xl md:rounded-2xl 
                          flex items-center justify-center group-hover:scale-110 
                          transition-transform duration-300 shadow-lg">
                        <item.icon size={14} className="text-white sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900">{item.title}</h3>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm md:text-base text-blue-600 font-medium mt-1 sm:mt-2">{item.subtitle}</p>

                    {/* Description (flex-grow ensures push-down) */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 flex-grow leading-relaxed">{item.description}</p>
                  </div>

                  {/* Button (always aligned at bottom) */}
                  <button
                    onClick={() => item.buttonUrl && router.push(item.buttonUrl)}
                    className="mt-2 sm:mt-3 w-full rounded-md sm:rounded-lg md:rounded-xl 
     border border-[#00C798]/80 text-[#00C798] 
     bg-white/80 backdrop-blur-sm 
     hover:bg-[#00C798] hover:text-white 
     font-medium transition-all duration-300 
     text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3"
                  >
                    {item.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </ScrollAnimation>

        </div>
      </div>


      {/* Bottom Wave (improved animated deep curvy shape) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/* Front wave (faster, more opaque) */}
        <svg
          viewBox="0 0 1200 250"
          className="w-[200%] h-[200px] animate-wave"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C300,-40 900,260 1200,120 L1200,250 L0,250 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>

        {/* Back wave (slower, lighter) */}
        <svg
          viewBox="0 0 1200 250"
          className="w-[200%] h-[200px] animate-wave-slow absolute top-0 left-0"
          preserveAspectRatio="none"
        >
          <path
            d="M0,140 C300,-20 900,280 1200,140 L1200,250 L0,250 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>
    </section>

  );
};

export default SolutionsSection;
