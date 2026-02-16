"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, GraduationCap, ArrowRight, ChevronRight, TrendingUp, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { collegeService, StateWiseCollegeCount } from '@/services/collegeService';
import { logger } from '@/utils/logger';

type UniversityType = {
  name: string;
  count: number;
  type: 'deemed' | 'private' | 'public';
};

type StateCollege = {
  id: number;
  name: string;
  image: string;
  landmark: string;
  totalColleges: number;
  universities: UniversityType[];
  featured: string[];
};

// Simple helper to generate a placeholder image per state
const getStateImage = (stateName: string): string => {
  return `https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop&auto=format&sig=${encodeURIComponent(
    stateName
  )}`;
};

// Simple helper to generate a landmark label per state
const getStateLandmark = (stateName: string): string => {
  return `${stateName} - Top Colleges`;
};

const getTypeColor = (type: 'deemed' | 'private' | 'public') => {
  switch (type) {
    case 'deemed':
      return 'from-[#173CBA] to-[#186BBF]'; // Blue gradient
    case 'private':
      return 'from-[#3B82F6] to-[#186BBF]'; // Bright blue gradient
    case 'public':
      return 'from-[#00C798] to-[#14B8A6]'; // Teal gradient
  }
};

export function StatewiseColleges() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [statesData, setStatesData] = useState<StateCollege[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStateWise = async () => {
      try {
        const apiStates: StateWiseCollegeCount[] = await collegeService.getStateWiseColleges();

        const mapped: StateCollege[] = apiStates.map((item, index) => ({
          id: index + 1,
          name: item.state,
          image: getStateImage(item.state),
          landmark: getStateLandmark(item.state),
          totalColleges: item.collegeCountStatewise,
          universities: [
            {
              name: 'Deemed Universities',
              count: item.collegeCountDeemedUniversities,
              type: 'deemed',
            },
            {
              name: 'Private Universities',
              count: item.collegeCountPrivateUniversities,
              type: 'private',
            },
            {
              name: 'Public Universities',
              count: item.collegeCountPublicUniversities,
              type: 'public',
            },
          ],
          // Placeholder featured list until backend provides specific institutions
          featured: [],
        }));

        setStatesData(mapped);
      } catch (err) {
        logger.error('Failed to load state-wise colleges:', err);
        setStatesData([]);
      }
    };

    fetchStateWise();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#E8F5E8] via-white to-[#E8F5E8]/50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#00C798]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#3B82F6]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">
              <Sparkles size={12} className="text-primary animate-pulse" />
              <span className="text-primary font-medium text-xs">Discover Colleges by Location</span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-3">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                State-wise{" "}
              </span>
              Colleges
            </h2>


            <p className="text-gray-600 text-lg max-w-2xl">
              Find top colleges and universities across India's educational hubs
            </p>
          </motion.div>
        </div>

        {/* Cards Container with Navigation */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory scroll-smooth px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {statesData.map((state, index) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(state.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[45%] lg:w-[calc(33%-16px)] snap-start"
              >
                <Card className="overflow-hidden border border-[#00C798]/20 hover:border-[#00C798] transition-all duration-300 hover:shadow-2xl group h-full bg-white">
                  {/* Image Section */}
                  <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                    <img
                      src={state.image}
                      alt={`${state.name} colleges`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-105"
                    />
                    {/* Lighter gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173CBA]/40 via-transparent to-transparent" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#FFC206] hover:bg-[#173CBA] backdrop-blur-sm text-[#173CBA] hover:text-white border-0 shadow-lg px-3 py-1 transition-colors">
                        <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                        {state.totalColleges} Colleges
                      </Badge>
                    </div>

                    {/* State Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00C798] to-[#14B8A6] backdrop-blur-md rounded-xl flex items-center justify-center border border-white/40 shadow-lg">
                          <MapPin className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl text-white drop-shadow-lg">{state.name}</h3>
                          <p className="text-white/95 text-sm drop-shadow-md">{state.landmark}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* University Stats */}
                    <div className="space-y-2.5 mb-5">
                      {state.universities.map((uni) => (
                        <div
                          key={uni.name}
                          className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#E8F5E8] to-white border border-[#00C798]/20 hover:border-[#00C798]/50 hover:shadow-md transition-all group/item"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getTypeColor(uni.type)} flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform`}>
                              {uni.type === 'public' ? (
                                <GraduationCap className="w-4 h-4 text-white" />
                              ) : (
                                <Building2 className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <span className="text-sm text-gray-700">{uni.name}</span>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-white border border-[#00C798]/30 flex items-center justify-center shadow-sm">
                            <span className="text-sm text-[#173CBA]">{uni.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Featured Colleges */}
                    <div className="mb-5">
                      <p className="text-xs text-gray-500 mb-2.5">Top Institutions:</p>
                      <div className="flex flex-wrap gap-2">
                        {state.featured.map((college) => (
                          <Badge
                            key={college}
                            variant="outline"
                            className="text-xs border-[#00C798]/30 text-[#173CBA] hover:bg-[#E8F5E8] transition-colors bg-white"
                          >
                            {college}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Explore Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-[#00C798] to-[#14B8A6] hover:from-[#00C798]/90 hover:to-[#14B8A6]/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all group/btn"
                    >
                      Explore Colleges
                      <motion.div
                        animate={{ x: hoveredCard === state.id ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows - Centered Below Cards */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#00C798]/30 hover:border-[#00C798] hover:bg-[#E8F5E8] shadow-xl hover:shadow-2xl transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#173CBA]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 border-[#00C798]/30 hover:border-[#00C798] hover:bg-[#E8F5E8] shadow-xl hover:shadow-2xl transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#173CBA]" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Hint */}
        <div className="lg:hidden text-center mt-6 px-4">
          <p className="text-sm text-gray-500">
            ← Swipe to explore more states →
          </p>
        </div>

        {/* View All Button */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              className="bg-white border border-[#3B82F6] text-[#3B82F6] rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 group px-8 hover:border-[#186BBF] hover:text-white"

            >
              <MapPin className="w-5 h-5 mr-2" />
              View All States & Territories
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
