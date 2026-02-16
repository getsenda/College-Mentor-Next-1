"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, Building2, TrendingUp, Users, ArrowRight, GraduationCap, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';
import { searchService, CareerFinderResult, CollegeFinderResult } from '@/services/searchService';
import { logger } from '@/utils/logger';

// Helper function to format salary
const formatSalary = (salary: number): string => {
  if (salary >= 10000000) {
    return `₹${(salary / 10000000).toFixed(1)} Cr`;
  } else if (salary >= 100000) {
    return `₹${(salary / 100000).toFixed(1)} LPA`;
  } else if (salary >= 1000) {
    return `₹${(salary / 1000).toFixed(0)}K`;
  }
  return `₹${salary}`;
};

// Helper function to format fees
const formatFees = (fees: number): string => {
  if (fees >= 100000) {
    return `₹${(fees / 100000).toFixed(1)} Lacs`;
  } else if (fees >= 1000) {
    return `₹${(fees / 1000).toFixed(0)}K`;
  }
  return `₹${fees}`;
};

// Helper function to get growth badge color
const getGrowthColor = (growthOutlook: string): string => {
  const outlook = growthOutlook.toLowerCase();
  if (outlook.includes('very high')) return 'bg-green-50 text-green-700';
  if (outlook.includes('high')) return 'bg-blue-50 text-blue-700';
  if (outlook.includes('moderate')) return 'bg-yellow-50 text-yellow-700';
  return 'bg-gray-50 text-gray-700';
};

// Helper function to get career image based on title
const getCareerImage = (title: string): string => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('software') || titleLower.includes('engineer') || titleLower.includes('developer')) {
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
  }
  if (titleLower.includes('data') || titleLower.includes('scientist') || titleLower.includes('analyst')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
  }
  if (titleLower.includes('civil') || titleLower.includes('construction')) {
    return 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
  }
  if (titleLower.includes('management') || titleLower.includes('consulting')) {
    return 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
  }
  if (titleLower.includes('finance') || titleLower.includes('banking')) {
    return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
  }
  if (titleLower.includes('doctor') || titleLower.includes('medical')) {
    return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
  }
  return 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080';
};

// Helper function to get college image
const getCollegeImage = (collegeName: string): string => {
  return `https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&sig=${collegeName.length}`;
};

interface CollegeCareerData {
  name: string;
  careers: Array<{
    title: string;
    avgSalary: string;
    growth: string;
    image: string;
  }>;
}

interface CareerCollegeData {
  name: string;
  colleges: Array<{
    name: string;
    location: string;
    ranking: string;
    fees: string;
    image: string;
  }>;
}

type SearchResult = {
  type: 'college' | 'career';
  data: CollegeCareerData | CareerCollegeData;
};

export function CareerFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<'college' | 'career'>('college');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    setSearchResult(null);

    try {
      if (searchType === 'college') {
        // Get careers for college
        const careers = await searchService.getCareersByCollege(searchQuery);

        if (careers.length > 0) {
          const mappedData: CollegeCareerData = {
            name: searchQuery,
            careers: careers.map((career) => ({
              title: career.careerTitle,
              avgSalary: formatSalary(career.salary),
              growth: career.growthOutlook,
              image: getCareerImage(career.careerTitle),
            })),
          };
          setSearchResult({ type: 'college', data: mappedData });
        } else {
          // Match backend copy for no-career case
          setError('no related careers, career data yet to come');
        }
      } else {
        // Get colleges for career
        const colleges = await searchService.getCollegesByCareer(searchQuery);

        if (colleges.length > 0) {
          const mappedData: CareerCollegeData = {
            name: searchQuery,
            colleges: colleges.map((college) => ({
              name: college.collegeName,
              location: college.city,
              ranking: `Rank #${college.collegeRank}`,
              fees: typeof college.avgFees === 'string' ? college.avgFees : formatFees(college.avgFees),
              image: getCollegeImage(college.collegeName),
            })),
          };
          setSearchResult({ type: 'career', data: mappedData });
        } else {
          // Match backend copy for no-college case
          setError('no related colleges, careers data yet to come');
        }
      }
    } catch (err: any) {
      logger.error('Search error:', err);

      // Check if it's a network/server error vs not found
      const statusCode = err?.statusCode || err?.response?.status;

      // If it's still a 500/404 that wasn't caught by the service, treat as not found
      if (statusCode === 500 || statusCode === 404) {
        if (searchType === 'college') {
          setError(`No career outcomes found for "${searchQuery}". Try searching for a different college.`);
        } else {
          setError(`No colleges found for "${searchQuery}". Try searching with a more specific career name (e.g., "Software Engineer", "Civil Engineer").`);
        }
      } else {
        // For other errors, show generic message
        setError('Unable to search at the moment. Please try again later.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-24 pb-6">
      {/* Top Curve with Shadow */}
      {/* <div className="absolute -top-1 left-0 right-0 overflow-hidden leading-[0] z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 drop-shadow-md"
          preserveAspectRatio="none"
        >
          <path
            fill="#3B82F6"
            d="M0,180 C480,150 960,0 1440,0 L1440,0 L0,0 Z"
          />
        </svg>
      </div> */}
      <div className="absolute top-0 left-0 w-full z-10">
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-[60px] sm:h-[80px] md:h-[120px] lg:h-[160px] xl:h-[200px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,100 900,-40 1200,80 L1200,0 L0,0 Z"
            fill="#3B82F6"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-3">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career
            </span>{' '}
            Finder
          </h2>

          <p className="text-gray-600 mb-6">
            Search for colleges to discover career outcomes, or search for careers to find top colleges
          </p>

          {/* Search Type Options */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 px-4 sm:px-0">
            <Button
              onClick={() => {
                setSearchType('college');
                setSearchQuery('');
                setSearchResult(null);
              }}
              variant={searchType === 'college' ? 'default' : 'outline'}
              className={`px-4 sm:px-8 py-4 sm:py-6 rounded-xl transition-all w-full sm:w-auto ${searchType === 'college'
                  ? 'bg-gradient-to-r from-secondary to-teal-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 hover:text-secondary'
                }`}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Search for College
            </Button>
            <Button
              onClick={() => {
                setSearchType('career');
                setSearchQuery('');
                setSearchResult(null);
              }}
              variant={searchType === 'career' ? 'default' : 'outline'}
              className={`px-4 sm:px-8 py-4 sm:py-6 rounded-xl transition-all w-full sm:w-auto ${searchType === 'career'
                  ? 'bg-gradient-to-r from-secondary to-teal-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 hover:text-secondary'
                }`}
            >
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Search for Career
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={
                  searchType === 'college'
                    ? 'Enter college name (e.g., IIM Ahmedabad)'
                    : 'Enter career name (e.g., Civil Engineer)'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-32 py-6 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary/80 hover:bg-secondary text-white"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </div>

            {/* Quick Search Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <span className="text-xs text-gray-500">Try:</span>
              {searchType === 'college'
                ? ['IIM Ahmedabad', 'IIT Bombay'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setTimeout(() => {
                        const event = { key: 'Enter' } as React.KeyboardEvent;
                        handleKeyPress(event);
                      }, 100);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))
                : ['Civil Engineer', 'Software Engineer', 'Doctor'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setTimeout(() => {
                        const event = { key: 'Enter' } as React.KeyboardEvent;
                        handleKeyPress(event);
                      }, 100);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {searchResult && (
            <motion.div
              key={searchResult.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {searchResult.type === 'college' ? (
                <CollegeCareerResults data={searchResult.data as CollegeCareerData} />
              ) : (
                <CareerCollegeResults data={searchResult.data as CareerCollegeData} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Career outcomes for a college
function CollegeCareerResults({ data }: { data: CollegeCareerData }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-secondary" />
          <h4 className="text-gray-900 text-lg">Career Outcomes from {data.name}</h4>
        </div>
        <Button
          variant="outline"
          className="px-4 py-2 bg-gradient-to-r from-secondary to-teal-600 text-white hover:from-secondary/90 hover:to-teal-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.careers.map((career, index) => (
          <motion.div
            key={career.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <motion.img
                src={career.image}
                alt={career.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h5 className="text-white">{career.title}</h5>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Avg. Salary</span>
                  <span className="text-sm text-gray-900">{career.avgSalary}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Growth Outlook</span>
                  <Badge variant="secondary" className={getGrowthColor(career.growth)}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {career.growth}
                  </Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full group bg-secondary text-white hover:bg-primary hover:text-white">
                Explore Career
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Top colleges for a career
function CareerCollegeResults({ data }: { data: CareerCollegeData }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-secondary" />
          <h4 className="text-gray-900 text-lg">Top Colleges for {data.name}</h4>
        </div>
        <Button
          variant="outline"
          className="px-4 py-2 bg-gradient-to-r from-secondary to-teal-600 text-white hover:from-secondary/90 hover:to-teal-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.colleges.map((college, index) => (
          <motion.div
            key={college.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <motion.img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-3 right-3 bg-white/95 text-blue-700 hover:bg-white">
                <GraduationCap className="w-3 h-3 mr-1" />
                {college.ranking}
              </Badge>
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-lg">{college.name}</h4>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs">{college.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Course Fees</span>
                  <span className="text-sm text-gray-900">{college.fees}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full group bg-secondary text-white">
                View College
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform " />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
