"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { logger } from '@/utils/logger';
import { courseService, TrendingOnlineCourse } from '@/services/courseService';

interface Course {
  id: string;
  title: string;
  institution: string;
  badge: string;
  duration: string;
  students: string;
  price: string;
  rating: number;
  category: 'popular' | 'online' | 'passionate';
}

const fallbackCourses: Course[] = [
  {
    id: '1',
    title: 'Data Science & Machine Learning',
    institution: 'IIT Bombay',
    badge: 'Online',
    duration: '6 Months',
    students: '12,450',
    price: '₹45,000',
    rating: 4.5,
    category: 'popular'
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    institution: 'BITS Pilani',
    badge: 'Online',
    duration: '8 Months',
    students: '12,400',
    price: '₹35,000',
    rating: 4.8,
    category: 'popular'
  },
  {
    id: '3',
    title: 'Data Science & Machine Learning',
    institution: 'IIT Bombay',
    badge: 'Online',
    duration: '6 Months',
    students: '12,450',
    price: '₹45,000',
    rating: 4.5,
    category: 'popular'
  },
  {
    id: '4',
    title: 'Data Science & Machine Learning',
    institution: 'IIT Bombay',
    badge: 'Online',
    duration: '6 Months',
    students: '12,450',
    price: '₹45,000',
    rating: 4.6,
    category: 'popular'
  },
  {
    id: '5',
    title: 'Artificial Intelligence & Deep Learning',
    institution: 'IIT Delhi',
    badge: 'Online',
    duration: '7 Months',
    students: '10,230',
    price: '₹50,000',
    rating: 4.7,
    category: 'online'
  },
  {
    id: '6',
    title: 'Cloud Computing & DevOps',
    institution: 'IIIT Bangalore',
    badge: 'Online',
    duration: '5 Months',
    students: '8,900',
    price: '₹40,000',
    rating: 4.4,
    category: 'online'
  },
  {
    id: '7',
    title: 'Cyber Security Fundamentals',
    institution: 'IIT Madras',
    badge: 'Online',
    duration: '6 Months',
    students: '9,500',
    price: '₹42,000',
    rating: 4.6,
    category: 'online'
  },
  {
    id: '8',
    title: 'Blockchain Technology',
    institution: 'BITS Goa',
    badge: 'Online',
    duration: '4 Months',
    students: '7,800',
    price: '₹38,000',
    rating: 4.3,
    category: 'online'
  },
  {
    id: '9',
    title: 'UI/UX Design Masterclass',
    institution: 'NID Ahmedabad',
    badge: 'Online',
    duration: '5 Months',
    students: '11,200',
    price: '₹32,000',
    rating: 4.8,
    category: 'passionate'
  },
  {
    id: '10',
    title: 'Digital Marketing Strategy',
    institution: 'IIM Calcutta',
    badge: 'Online',
    duration: '3 Months',
    students: '15,600',
    price: '₹28,000',
    rating: 4.5,
    category: 'passionate'
  },
  {
    id: '11',
    title: 'Product Management',
    institution: 'ISB Hyderabad',
    badge: 'Online',
    duration: '6 Months',
    students: '13,400',
    price: '₹55,000',
    rating: 4.7,
    category: 'passionate'
  },
  {
    id: '12',
    title: 'Financial Analytics',
    institution: 'IIM Bangalore',
    badge: 'Online',
    duration: '4 Months',
    students: '9,800',
    price: '₹48,000',
    rating: 4.6,
    category: 'passionate'
  },
  // More Popular courses
  {
    id: '13',
    title: 'Mobile App Development',
    institution: 'IIT Kanpur',
    badge: 'Online',
    duration: '6 Months',
    students: '14,200',
    price: '₹38,000',
    rating: 4.7,
    category: 'popular'
  },
  {
    id: '14',
    title: 'Python Programming Mastery',
    institution: 'IIT Roorkee',
    badge: 'Online',
    duration: '4 Months',
    students: '18,500',
    price: '₹25,000',
    rating: 4.9,
    category: 'popular'
  },
  {
    id: '15',
    title: 'React & Next.js Development',
    institution: 'BITS Hyderabad',
    badge: 'Online',
    duration: '5 Months',
    students: '16,300',
    price: '₹32,000',
    rating: 4.8,
    category: 'popular'
  },
  {
    id: '16',
    title: 'Java Enterprise Development',
    institution: 'IIT Guwahati',
    badge: 'Online',
    duration: '7 Months',
    students: '12,100',
    price: '₹42,000',
    rating: 4.6,
    category: 'popular'
  },
  {
    id: '17',
    title: 'Angular Framework Course',
    institution: 'IIIT Delhi',
    badge: 'Online',
    duration: '5 Months',
    students: '10,800',
    price: '₹35,000',
    rating: 4.5,
    category: 'popular'
  },
  // More Online courses
  {
    id: '18',
    title: 'AWS Cloud Architecture',
    institution: 'IIT Bombay',
    badge: 'Online',
    duration: '6 Months',
    students: '11,400',
    price: '₹45,000',
    rating: 4.7,
    category: 'online'
  },
  {
    id: '19',
    title: 'Kubernetes & Docker',
    institution: 'BITS Pilani',
    badge: 'Online',
    duration: '4 Months',
    students: '9,200',
    price: '₹40,000',
    rating: 4.6,
    category: 'online'
  },
  {
    id: '20',
    title: 'Ethical Hacking & Penetration Testing',
    institution: 'IIT Delhi',
    badge: 'Online',
    duration: '8 Months',
    students: '8,600',
    price: '₹52,000',
    rating: 4.8,
    category: 'online'
  },
  {
    id: '21',
    title: 'Smart Contract Development',
    institution: 'IIIT Bangalore',
    badge: 'Online',
    duration: '5 Months',
    students: '7,500',
    price: '₹48,000',
    rating: 4.4,
    category: 'online'
  },
  {
    id: '22',
    title: 'Azure Cloud Solutions',
    institution: 'IIT Madras',
    badge: 'Online',
    duration: '6 Months',
    students: '10,100',
    price: '₹43,000',
    rating: 4.5,
    category: 'online'
  },
  // More Passionate courses
  {
    id: '23',
    title: 'Graphic Design Fundamentals',
    institution: 'NID Bangalore',
    badge: 'Online',
    duration: '4 Months',
    students: '13,800',
    price: '₹30,000',
    rating: 4.7,
    category: 'passionate'
  },
  {
    id: '24',
    title: 'Content Writing & SEO',
    institution: 'IIM Indore',
    badge: 'Online',
    duration: '3 Months',
    students: '17,200',
    price: '₹22,000',
    rating: 4.6,
    category: 'passionate'
  },
  {
    id: '25',
    title: 'Social Media Marketing',
    institution: 'ISB Mohali',
    badge: 'Online',
    duration: '3 Months',
    students: '19,500',
    price: '₹26,000',
    rating: 4.8,
    category: 'passionate'
  },
  {
    id: '26',
    title: 'Business Analytics & Strategy',
    institution: 'IIM Ahmedabad',
    badge: 'Online',
    duration: '6 Months',
    students: '14,600',
    price: '₹58,000',
    rating: 4.9,
    category: 'passionate'
  },
  {
    id: '27',
    title: 'Investment Banking Fundamentals',
    institution: 'IIM Calcutta',
    badge: 'Online',
    duration: '5 Months',
    students: '11,900',
    price: '₹50,000',
    rating: 4.7,
    category: 'passionate'
  },
];

type TabType = 'popular' | 'online' | 'passionate';

export const TrendingCourses = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('popular');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const filteredCourses = courses.filter(course => course.category === activeTab);

  // Map active tab to API filterCollege param
  const getFilterCollege = (tab: TabType): "Online" | "Passionate" | "Popular" => {
    switch (tab) {
      case 'online':
        return 'Online';
      case 'passionate':
        return 'Passionate';
      case 'popular':
      default:
        return 'Popular';
    }
  };

  // Fetch trending courses for current tab
  useEffect(() => {
    const fetchTrending = async () => {
      const filterCollege = getFilterCollege(activeTab);
      const apiCourses: TrendingOnlineCourse[] = await courseService.getTrendingCourses(filterCollege);

      if (!apiCourses || apiCourses.length === 0) {
        logger.log(
          `ℹ️ No trending courses from API for filterCollege=${filterCollege}, showing no data for "${activeTab}" tab`
        );
        setCourses(prev => prev.filter(course => course.category !== activeTab));
        return;
      }

      const mapped: Course[] = apiCourses.map((item: TrendingOnlineCourse, index: number) => ({
        id: String(item.id ?? `${activeTab}-${index + 1}`),
        title: item.courseName || item.title || 'Course title coming soon',
        institution: item.collegeName || item.institution || 'College name coming soon',
        badge: item.badge || filterCollege,
        duration: item.duration || item.courseDuration || 'Duration to be announced',
        students: item.students?.toString?.() || item.enrolledStudents?.toString?.() || '—',
        price: item.price || item.fees || 'Fees to be announced',
        rating: typeof item.rating === 'number' ? item.rating : 4.5,
        category: activeTab,
      }));

      setCourses(prev => {
        const others = prev.filter(course => course.category !== activeTab);
        return [...others, ...mapped];
      });
    };

    fetchTrending();
  }, [activeTab]);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const resetPoint = scrollWidth / 2;

      // Adjust scrollLeft for arrow visibility (account for duplicated content)
      const adjustedScrollLeft = scrollLeft >= resetPoint ? scrollLeft - resetPoint : scrollLeft;

      setShowLeftArrow(adjustedScrollLeft > 10);
      setShowRightArrow(adjustedScrollLeft < resetPoint - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    // Initial check after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        clearTimeout(timer);
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
    return () => clearTimeout(timer);
  }, [checkScroll, activeTab]);

  // Auto-scroll functionality - seamless infinite scrolling
  useEffect(() => {
    if (isPaused) return;

    // Initialize scroll position to start of first set
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (maxScroll <= 0) {
          // No scrolling needed if content fits
          return;
        }

        // Calculate the point where we should reset (halfway through duplicated content)
        const resetPoint = scrollWidth / 2;

        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          if (!scrollRef.current) return;

          const currentScroll = scrollRef.current.scrollLeft;

          if (currentScroll >= resetPoint - 5) {
            // Reset to equivalent position in first set (seamless loop)
            scrollRef.current.scrollLeft = currentScroll - resetPoint;
          } else {
            // Scroll right continuously
            scrollRef.current.scrollLeft += 1.5;
          }
        });
      }
    }, 16); // ~60fps for smooth continuous scrolling

    return () => clearInterval(interval);
  }, [isPaused, activeTab]);

  const scrollCourses = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Approximate width of one card + gap
      const newPosition =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleViewDetails = (courseId: string) => {
    logger.log(`Viewing details for course: ${courseId}`);
  };

  const handleViewAllCourses = () => {
    router.push('/courses/list');
  };

  return (
    <section className="py-16 bg-cyan-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3">
            <span className="text-gray-800">Trending </span>
            <span className="text-[#10B981]">Courses</span>
          </h2>
          <p className="text-gray-600">
            Discover trending courses that students are enrolling in
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-8 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'popular'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveTab('online')}
              className={`px-8 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'online'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Online
            </button>
            <button
              onClick={() => setActiveTab('passionate')}
              className={`px-8 py-2.5 rounded-xl transition-all duration-300 ${activeTab === 'passionate'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Passionate
            </button>
          </div>
        </motion.div>

        {/* Course Cards - Horizontal Scrollable */}
        <div
          className="relative mb-12 max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredCourses.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600 text-center">
                No courses available for this category
              </p>
            </div>
          ) : (
            <>
              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                onScroll={checkScroll}
              >
                {/* First set of cards */}
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={`${course.id}-1`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-80"
                  >
                    {/* Badge and Rating */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        {course.badge}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="mb-2 text-gray-800 line-clamp-2 text-lg font-normal">
                      {course.title}
                    </h3>

                    {/* Institution */}
                    <p className="text-sm text-gray-500 mb-4">
                      {course.institution}
                    </p>

                    {/* Course Meta Info */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600">{course.price}</span>

                      </div>
                    </div>

                    {/* Price and View Details */}
                    {/* Price and View Details */}
                    <div className="flex flex-col items-center pt-4 border-t border-blue-300">
                      <button
                        onClick={() => handleViewDetails(course.id)}
                        className="w-full flex items-center justify-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors group border border-gray-300 rounded-md px-3 py-2"
                      >
                        View Details
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>


                    </div>
                  </motion.div>
                ))}
                {/* Duplicate set for seamless infinite scroll */}
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={`${course.id}-2`}
                    className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-80"
                  >
                    {/* Badge and Rating */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        {course.badge}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                      </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="mb-2 text-gray-800 line-clamp-2 text-lg font-normal">
                      {course.title}
                    </h3>

                    {/* Institution */}
                    <p className="text-sm text-gray-500 mb-4">
                      {course.institution}
                    </p>

                    {/* Course Meta Info */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-600">{course.price}</span>
                      </div>
                    </div>

                    {/* Price and View Details */}
                    <div className="flex flex-col items-center pt-4 border-t border-blue-300">
                      <button
                        onClick={() => handleViewDetails(course.id)}
                        className="w-full flex items-center justify-center gap-1 text-sm text-gray-700 hover:text-blue-600 transition-colors group border border-gray-300 rounded-md px-3 py-2"
                      >
                        View Details
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Arrows - Centered Below Cards */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {showLeftArrow && (
                  <button
                    onClick={() => scrollCourses('left')}
                    className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-all"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                {showRightArrow && (
                  <button
                    onClick={() => scrollCourses('right')}
                    className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-all"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </>
          )}

          {/* Hide scrollbar for webkit browsers */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* View All Courses Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={handleViewAllCourses}
            className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            View All Courses
          </button>
        </motion.div>
      </div>
    </section>
  );
};