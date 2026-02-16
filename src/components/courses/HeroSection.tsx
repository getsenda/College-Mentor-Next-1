"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Mic, MicOff, Search, X } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  recentSearches: string[];
  isVoiceSearch: boolean;
  setIsVoiceSearch: (isVoice: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  recentSearches,
  isVoiceSearch,
  setIsVoiceSearch
}) => {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-36 md:pb-40 overflow-hidden">
      {/* Background with World Map Overlay */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-800/90 to-blue-900/95"></div>
        {/* World map pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice">
            <path d="M100,200 Q200,150 300,200 Q400,180 500,200 Q600,190 700,200 Q800,180 900,200 Q1000,190 1100,200" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M150,300 Q250,280 350,300 Q450,290 550,300 Q650,285 750,300 Q850,290 950,300" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
            <circle cx="200" cy="150" r="3" fill="white" opacity="0.4" />
            <circle cx="400" cy="180" r="3" fill="white" opacity="0.4" />
            <circle cx="600" cy="160" r="3" fill="white" opacity="0.4" />
            <circle cx="800" cy="190" r="3" fill="white" opacity="0.4" />
            <circle cx="1000" cy="170" r="3" fill="white" opacity="0.4" />
          </svg>
        </div>

        {/* Scattered Avatar Elements - Hidden on mobile, visible on md+ */}
        <div className="hidden md:block absolute inset-0 z-20">
          <div className="absolute top-20 left-8 lg:left-16 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
          </div>
          <div className="absolute top-32 right-12 lg:right-24 w-8 h-8 lg:w-10 lg:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full"></div>
          </div>
          <div className="absolute top-48 left-1/4 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
          </div>
          <div className="absolute top-24 right-1/3 w-9 h-9 lg:w-11 lg:h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-6 h-6 lg:w-7 lg:h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
          </div>
          <div className="absolute top-40 left-3/4 w-11 h-11 lg:w-13 lg:h-13 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-7 h-7 lg:w-9 lg:h-9 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full"></div>
          </div>
          <div className="absolute top-16 right-8 lg:right-16 w-8 h-8 lg:w-9 lg:h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Background Waves */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="blueGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueGreenGradient)" />
          <path d="M0,240 C180,120 360,360 540,240 C720,120 900,360 1080,240 C1260,120 1350,300 1440,240 L1440,800 L0,800 Z" fill="rgba(255,255,255,0.15)" />
        </svg>
      </div>

      {/* Curved Transition Element */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="w-full h-24 sm:h-28 md:h-32 lg:h-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path
            d="M0,0 C300,50 600,20 900,80 C1000,100 1100,60 1200,80 L1200,200 L0,200 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl relative z-30">
        <div className="text-center">
          {/* Centered Content */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-3 sm:mb-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2.5 sm:px-4 py-1 sm:py-2">
                <Search size={12} className="sm:w-4 sm:h-4 text-white animate-pulse" />
                <span className="text-white font-medium text-[10px] sm:text-sm">Smart Course Discovery</span>
              </div>
            </div>

            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-6 leading-snug">
              Unlock your Potential:
              <span className="text-white/90"> Navigate World Class Courses and Universities</span>
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-white/80 mb-4 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover, explore, and connect with world-class educational opportunities. Get personalized guidance to find your perfect academic path.
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-xl sm:rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/40 shadow-2xl">
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={18} className="sm:w-[22px] sm:h-[22px]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, streams, or keywords"
                    className="w-full pl-11 sm:pl-14 pr-20 sm:pr-24 py-2.5 sm:py-3 text-sm sm:text-base border-0 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-green-300/30 outline-none bg-transparent text-gray-900 placeholder:text-gray-500 font-medium"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                    {searchQuery.length > 0 && (
                      <button
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 rounded-full transition-all duration-200"
                        onClick={() => setSearchQuery('')}
                      >
                        <X size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    )}
                    {/* Voice Search Button */}
                    <button
                      className="p-1.5 sm:p-2 text-gray-400 hover:text-green-500 transition-colors duration-200"
                      onClick={() => setIsVoiceSearch(!isVoiceSearch)}
                    >
                      {isVoiceSearch ? <MicOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Mic size={16} className="sm:w-[18px] sm:h-[18px]" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mt-3 sm:mt-4">
                  <div className="text-white/80 text-xs sm:text-sm mb-2 text-center">Recent Searches:</div>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(search)}
                        className="px-2.5 sm:px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs sm:text-sm hover:bg-white/20 transition-all duration-300"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-xl mt-2 z-50 max-h-60 overflow-y-auto mx-2 sm:mx-0"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Search size={14} className="sm:w-4 sm:h-4 text-gray-400" />
                        <span className="text-sm sm:text-base text-gray-700">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-2 sm:gap-4 justify-center mb-4 sm:mb-8">
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-3 sm:px-8 py-2 sm:py-4 text-xs sm:text-lg rounded-lg sm:rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-bold"
                onClick={() => router.push('/courses')}
              >
                <BookOpen className="mr-1 sm:mr-2" size={14} />
                Explore Courses
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/60 text-white bg-white/20 hover:bg-white hover:text-blue-600 px-3 sm:px-8 py-2 sm:py-4 text-xs sm:text-lg rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold backdrop-blur-sm"
                onClick={() => router.push('/course-compare')}
              >
                <Layers className="mr-1 sm:mr-2" size={14} />
                Compare Courses
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
