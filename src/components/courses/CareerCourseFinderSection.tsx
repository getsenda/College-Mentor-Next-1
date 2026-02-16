import { useState, useEffect, useRef } from 'react';

import { Search, ArrowRight, TrendingUp, Lock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/FallBack';
import { logger } from '@/utils/logger';
import { courseService, CareerFinderCourseItem, CourseSearchResultItem } from '@/services/courseService';


interface Program {
  id: string;
  title: string;
  institution: string;
  image: string;
  avgSalary: string;
  growthRate: string;
  type: 'course' | 'career';
  filterId: string;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop';

function mapSearchResultToProgram(item: CourseSearchResultItem, filterId: string): Program {
  const salaryObj = item.average_salary;
  let avgSalary = '—';
  if (salaryObj && typeof salaryObj === 'object') {
    const min = salaryObj.min ?? salaryObj.minimum;
    const max = salaryObj.max ?? salaryObj.maximum;
    if (min || max) avgSalary = `₹${[min, max].filter(Boolean).join(' - ')}`;
  } else if (typeof salaryObj === 'string') avgSalary = salaryObj;
  return {
    id: String(item.id),
    title: item.name || 'Course',
    institution: item.stream || '—',
    image: PLACEHOLDER_IMAGE,
    avgSalary,
    growthRate: '—',
    type: 'course',
    filterId,
  };
}

// Removed: allCoursePrograms and allCareerPrograms mock data - now uses APIs

export const CourseCareerExplorer = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'careers'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [careerFinderData, setCareerFinderData] = useState<{ filter: string; programs: Program[] } | null>(null);
  const [careerFinderLoading, setCareerFinderLoading] = useState(false);
  const [courseFinderData, setCourseFinderData] = useState<{ filter: string; programs: Program[] } | null>(null);
  const [courseFinderLoading, setCourseFinderLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update search query and filter when tab changes
  useEffect(() => {
    setSearchQuery('');
    setSelectedFilter('');
    setCareerFinderData(null);
    setCourseFinderData(null);
  }, [activeTab]);

  // Fetch courses from API when Courses tab has a selected filter or after search submit
  useEffect(() => {
    if (activeTab !== 'courses') return;
    if (!selectedFilter) {
      setCourseFinderData(null);
      return;
    }
    setCourseFinderLoading(true);
    setCourseFinderData(null);
    courseService
      .searchCourses({ courseName: selectedFilter, page: 0, size: 24, sort: 'name,asc' })
      .then((res) => {
        const items = res?.results ?? [];
        const mapped = items.map((item) => mapSearchResultToProgram(item, selectedFilter));
        setCourseFinderData({ filter: selectedFilter, programs: mapped });
      })
      .catch(() => {
        setCourseFinderData({ filter: selectedFilter, programs: [] });
      })
      .finally(() => {
        setCourseFinderLoading(false);
      });
  }, [activeTab, selectedFilter]);

  // Fetch career finder API when Careers tab has a selected filter
  useEffect(() => {
    if (activeTab !== 'careers' || !selectedFilter) {
      return;
    }
    const careerName = selectedFilter;
    setCareerFinderLoading(true);
    setCareerFinderData(null);
    courseService
      .getCareerFinder(careerName)
      .then((apiItems: CareerFinderCourseItem[]) => {
        const mapped: Program[] = (apiItems || []).map((item, index) => ({
          id: String(item.id ?? `career-${careerName}-${index + 1}`),
          title: item.courseName || item.title || 'Course / Career',
          institution: item.collegeName || item.institution || '—',
          image: PLACEHOLDER_IMAGE,
          avgSalary: typeof item.avgSalary === 'number' ? `₹${(item.avgSalary / 100000).toFixed(1)} LPA` : (item.avgSalary as string) || '—',
          growthRate: item.growthRate || '—',
          type: 'career',
          filterId: careerName,
        }));
        setCareerFinderData({ filter: careerName, programs: mapped });
      })
      .catch(() => {
        setCareerFinderData({ filter: careerName, programs: [] });
      })
      .finally(() => {
        setCareerFinderLoading(false);
      });
  }, [activeTab, selectedFilter]);

  // Derive programs from API data only (no mock fallback)
  let programs: Program[] = [];
  if (activeTab === 'courses') {
    if (courseFinderLoading) {
      programs = [];
    } else if (courseFinderData?.programs) {
      programs = courseFinderData.programs;
    }
  } else {
    if (careerFinderLoading) {
      programs = [];
    } else if (careerFinderData?.filter === selectedFilter) {
      programs = careerFinderData.programs ?? [];
    }
  }

  const resultsCount = programs.length;

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.length > 0) {
      // Set filter to search term so the API is triggered (courses or careers)
      const term = activeTab === 'careers' ? searchQuery.trim().toLowerCase() : searchQuery.trim();
      setSelectedFilter(term);
    }
  };

  const handleExplore = (programId: string) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    logger.log('Exploring program:', programId);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginPrompt(false);
    logger.log('User logged in');
  };

  const handleTabChange = (tab: 'courses' | 'careers') => {
    setActiveTab(tab);
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
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3">
            <span className="text-gray-800">AI Course & Career </span>
            <span className="text-[#10B981]">Explorer</span>
          </h2>
          <p className="text-gray-600">
            {activeTab === 'courses'
              ? 'Discover courses and see career outcomes they lead to'
              : 'Explore careers and find courses that can get you there'
            }
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex bg-transparent rounded-full gap-3">
            <button
              onClick={() => handleTabChange('courses')}
              className={`px-10 py-3 rounded-full transition-all duration-300 ${activeTab === 'courses'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Find Courses
            </button>
            <button
              onClick={() => handleTabChange('careers')}
              className={`px-10 py-3 rounded-full transition-all duration-300 ${activeTab === 'careers'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Find Careers
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full shadow-lg overflow-hidden relative"
          >
            <div className="flex-1 flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length > 0) setSelectedFilter('');
                }}
                placeholder={activeTab === 'courses' ? 'Search for courses' : 'Search for careers'}
                className="flex-1 px-8 py-5 outline-none text-gray-700 pr-10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            <button
              type="submit"
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 flex items-center gap-2 transition-all"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </form>
        </motion.div>

        {/* Results Header with Scroll Buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-header`}
            className="flex items-center justify-between mb-4 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-gray-800 text-[25px]">
              {activeTab === 'courses'
                ? (selectedFilter ? `Courses matching "${selectedFilter}"` : 'Find Courses')
                : (selectedFilter ? `Careers in ${selectedFilter}` : 'Find Careers')
              }
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-[#10B981]">
                Showing {resultsCount} results
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Program Cards Horizontal Scroll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedFilter}`}
            className="relative max-w-7xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide px-8 sm:px-12 lg:px-0"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {!selectedFilter ? (
                <div className="flex items-center justify-center py-16 w-full">
                  <p className="text-gray-600 text-center max-w-md">
                    {activeTab === 'courses'
                      ? 'Search for courses or select a category above to explore'
                      : 'Select a career industry or search above to explore courses that lead there'}
                  </p>
                </div>
              ) : (activeTab === 'courses' && courseFinderLoading) || (activeTab === 'careers' && careerFinderLoading) ? (
                <div className="flex items-center justify-center py-16 w-full">
                  <p className="text-gray-500">
                    {activeTab === 'courses' ? 'Loading courses...' : 'Loading career recommendations...'}
                  </p>
                </div>
              ) : programs.length === 0 ? (
                <div className="flex items-center justify-center py-16 w-full">
                  <p className="text-gray-600 text-center">
                    {activeTab === 'courses'
                      ? 'No courses found. Try a different search or category'
                      : 'No career outcomes found. Try searching for a different career'}
                  </p>
                </div>
              ) : (
                programs.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 w-80"
                  >
                    {/* Program Image */}
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white px-4 py-1.5 rounded-full text-sm shadow-md">
                          {program.institution}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${program.type === 'course'
                            ? 'bg-blue-500 text-white'
                            : 'bg-emerald-500 text-white'
                          }`}>
                          {program.type === 'course' ? 'Course' : 'Career'}
                        </span>
                      </div>
                    </div>

                    {/* Program Content */}
                    <div className="p-5">
                      {/* Program Title */}
                      <h4 className="mb-4 text-gray-800 line-clamp-2 min-h-[1rem] text-lg">
                        {program.title}
                      </h4>

                      {/* Salary and Growth Stats */}
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <div className="text-xs text-gray-500 uppercase mb-1">AVG. SALARY</div>
                          <div className="text-gray-800">{program.avgSalary}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 uppercase mb-1">GROWTH RATE</div>
                          <div className="text-[#10B981] flex items-center justify-end gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{program.growthRate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Explore Button */}
                      <button
                        onClick={() => handleExplore(program.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg group"
                      >
                        <span>Explore {activeTab === 'courses' ? 'Course' : 'Career'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )))}
            </div>

            {/* Navigation Arrows - Centered Below Cards */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lock Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>

              {/* Title */}
              <h3 className="text-center mb-4 text-gray-800">
                Login Required
              </h3>

              {/* Description */}
              <p className="text-center text-gray-600 mb-8">
                Please login to access the AI Course & Career Explorer and discover personalized recommendations.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300"
                >
                  Login Now
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};