"use client"
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { CollegeCard } from './CollegeCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { collegeService, TopCollege } from '@/services/collegeService';
import { logger } from '@/utils/logger';

// Helper function to format fees from string like "2.5lakh"
const formatFees = (feesString: string): string => {
    if (!feesString) return '₹N/A';

    // Handle formats like "2.5lakh", "2.5 lakh", "2.5L"
    const normalized = feesString.toLowerCase().replace(/\s+/g, '');

    if (normalized.includes('lakh') || normalized.endsWith('l')) {
        const numStr = normalized.replace(/[^\d.]/g, '');
        const num = parseFloat(numStr);
        if (!isNaN(num)) {
            return `₹${num} Lacs`;
        }
    }

    // Fallback: return as-is or format if it's a number
    const num = parseFloat(normalized);
    if (!isNaN(num)) {
        if (num >= 100000) {
            return `₹${(num / 100000).toFixed(1)} Lacs`;
        } else if (num >= 1000) {
            return `₹${(num / 1000).toFixed(0)}K`;
        }
        return `₹${num}`;
    }

    return `₹${feesString}`;
};

// Helper function to extract location parts (city, state) from full address
const parseLocation = (location: string): { city: string; state: string; full: string } => {
    if (!location) return { city: 'N/A', state: 'N/A', full: 'N/A' };

    // Try to extract state (common pattern: "...State - PIN" or "...State, India")
    const stateMatch = location.match(/,\s*([^,]+?)\s*(?:-|,|$)/);
    const state = stateMatch ? stateMatch[1].trim() : location.split(',').pop()?.trim() || 'N/A';

    // Try to extract city (usually before state)
    const parts = location.split(',');
    const city = parts.length > 1 ? parts[parts.length - 2]?.trim() || parts[0]?.trim() : parts[0]?.trim() || 'N/A';

    return {
        city: city.replace(/\s*-\s*\d+.*$/, ''), // Remove PIN code if present
        state: state.replace(/\s*-\s*\d+.*$/, '').replace(/,?\s*India\s*/i, ''),
        full: location,
    };
};

// Helper function to get degree from recommended courses
const getDegreeFromCourses = (courses: string[]): string => {
    if (!courses || courses.length === 0) return 'Various';

    // Count course types
    const courseTypes: { [key: string]: number } = {
        'B.Tech': 0,
        'M.Tech': 0,
        'MBA': 0,
        'B.E': 0,
        'M.E': 0,
        'B.Arch': 0,
        'B.Pharma': 0,
        'M.Pharma': 0,
        'BCA': 0,
        'MCA': 0,
        'PhD': 0,
    };

    courses.forEach(course => {
        Object.keys(courseTypes).forEach(type => {
            if (course.includes(type)) {
                courseTypes[type]++;
            }
        });
    });

    // Determine primary degree type
    const entries = Object.entries(courseTypes).filter(([, count]) => count > 0);
    if (entries.length === 0) return 'Various';

    entries.sort(([, a], [, b]) => b - a);

    // Format degree string
    if (entries[0][0] === 'B.Tech' || entries[0][0] === 'B.E') {
        return entries.some(([type]) => type === 'M.Tech' || type === 'M.E')
            ? 'B.Tech/M.Tech'
            : 'B.Tech';
    }
    if (entries[0][0] === 'MBA') return 'MBA/PGDM';
    if (entries[0][0] === 'B.Pharma' || entries[0][0] === 'M.Pharma') return 'B.Pharm/M.Pharm';
    if (entries[0][0] === 'BCA' || entries[0][0] === 'MCA') return 'BCA/MCA';

    return entries[0][0] || 'Various';
};

interface CollegeCardData {
    id: number;
    name: string;
    location: string;
    degree: string;
    coursesSummary?: string;
    rating: number;
    reviews: number;
    fees: string;
    rank: string;
    image: string;
    logo: string;
}

export function TopColleges() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const isMobile = useIsMobile();
    const [colleges, setColleges] = useState<CollegeCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch top colleges from API
    useEffect(() => {
        const fetchTopColleges = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Service handles response structure internally
                const collegesData = await collegeService.getTopColleges();

                // Map API data to component format
                const mappedColleges: CollegeCardData[] = collegesData.map((college) => {
                    // Parse location to get city and state
                    const locationInfo = parseLocation(college.location);

                    // Parse rating (string to number)
                    const rating = parseFloat(college.rating) || 4.0;

                    // Get degree from recommended courses
                    const degree = getDegreeFromCourses(college.recommendedCourses || []);

                    // Generate reviews count based on number of courses (proxy for college size)
                    const reviews = Math.max(100, (college.recommendedCourses?.length || 1) * 50);

                    // Last 2 recommended courses (if available)
                    const courses = college.recommendedCourses || [];
                    const lastTwoCourses = courses.slice(-2);
                    const coursesSummary =
                        lastTwoCourses.length > 0 ? lastTwoCourses.join(', ') : undefined;

                    return {
                        id: college.id,
                        name: college.name,
                        location: `${locationInfo.city}, ${locationInfo.state}`,
                        degree: degree,
                        coursesSummary,
                        rating: Math.round(rating * 10) / 10, // Round to 1 decimal
                        reviews: reviews,
                        fees: formatFees(college.annualFees),
                        rank: college.collegeAccredationType
                            ? `Accredited: ${college.collegeAccredationType}`
                            : 'Accredited',
                        image: `https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&sig=${college.id}`, // Using college ID for unique image
                        logo: '/assets/university-logos/default.png', // Default logo
                    };
                });

                setColleges(mappedColleges);
            } catch (err: any) {
                logger.error('Error fetching top colleges:', err);
                setError(err?.message || 'Failed to load top colleges');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopColleges();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 360;
            const newScrollPosition =
                scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleViewDetail = (collegeId: number) => {
        logger.log(`Navigating to college detail page: ${collegeId}`);
        router.push(`/college-details?id=${collegeId}`);
    };

    const handleViewAllColleges = () => {
        logger.log('Navigating to all colleges page');
        router.push('/colleges/list');
    };

    return (
        <section className="pt-4 pb-0 bg-[#edf2f0]">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-0.5">
                            Top{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Colleges
                            </span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Explore the best educational institutions
                        </p>
                    </div>

                    {/* View All Button - Hidden on mobile */}
                    {/* <Button
                        onClick={handleViewAllColleges}
                        className={`bg-[#3B82F6] hover:bg-primary/90 text-white ${isMobile ? 'hidden' : 'block'
                            }`}
                    >
                        View All Colleges →
                    </Button> */}
                    {isMobile ? (
                        <a
                            onClick={handleViewAllColleges}
                            className="text-blue-400 underline text-sm font-medium cursor-pointer"
                        >
                            View All
                        </a>
                    ) : (
                        <Button
                            onClick={handleViewAllColleges}
                            className="bg-[#3B82F6] hover:bg-primary/90 text-white"
                        >
                            View All Colleges →
                        </Button>
                    )}

                </motion.div>

                {/* Scrollable Cards Container with Navigation */}
                <div className="relative">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <span className="ml-3 text-gray-600">Loading top colleges...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <p className="text-red-500 mb-4">{error}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-[#3B82F6] hover:bg-primary/90 text-white"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : colleges.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-gray-600">No colleges found</p>
                        </div>
                    ) : (
                        <>
                            {/* Scrollable Cards Container */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                {colleges.map((college, index) => (
                                    <CollegeCard
                                        key={college.id}
                                        {...college}
                                        index={index}
                                        onViewDetail={() => handleViewDetail(college.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Navigation Arrows - Centered Below Cards */}
                    {/* Navigation Arrows - Centered Below Cards */}
                    <div className="flex items-center justify-center gap-3 mt-4 md:mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scroll('left')}
                            className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border border-primary shadow-md md:shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-gray-700 hover:text-primary"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scroll('right')}
                            className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white border border-primary shadow-md md:shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-gray-700 hover:text-primary"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.button>
                    </div>
                </div>

                <style>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`}</style>

            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}
