import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { Search, X, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerImage from '../../../public/assets/globe-image.png';
import cloudVector from '../../../public/assets/cloud_vector.png';
import { ImageWithFallback } from '../figma/FallBack';
import bannerImage1 from '../../../public/assets/avatar.avif';
import { searchService, SearchResults } from '@/services/searchService';
import { logger } from '@/utils/logger';
import { useRouter } from 'next/navigation';
import { Building2, GraduationCap } from 'lucide-react';

const universities = [
  { name: "VIT", image: "https://images.unsplash.com/photo-1700576592977-09517927f642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYyMzg1MTIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "SRM", image: "https://images.unsplash.com/flagged/photo-1580408453889-ed5e1b51924a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyMzQ1MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Amrita", image: "https://images.unsplash.com/photo-1622852067412-692f553fa38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzYyNDI1NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

const universitiesSet2 = [
  { name: "SSN", image: "https://images.unsplash.com/photo-1581634928711-e19c3d57478d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwYnVpbGRpbmclMjBjbGFzc2ljfGVufDF8fHx8MTc2MjQyNzEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "GITAM", image: "https://images.unsplash.com/photo-1672912995257-0c8255289523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsfGVufDF8fHx8MTc2MjMzNjU2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "RMK", image: "https://images.unsplash.com/photo-1731624674592-377a7cac4913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdnklMjBsZWFndWUlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc2MjQyMzk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

interface ArrowPaths {
  leftCurve: string;
  midLeft: string;
  center: string;
  rightCurve: string;
}

export const HeroSectionGreen = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [useImageSetOne, setUseImageSetOne] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [arrowPaths, setArrowPaths] = useState<ArrowPaths>({
    leftCurve: "M 450 128 Q 100 200 100 340",
    midLeft: "M 340 150 L 230 280",
    center: "M 390 170 L 380 330",
    rightCurve: "M 420 140 Q 640 260 650 340",
  });

  // Refs for avatar positions
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLImageElement>(null);
  const collegeMentorRef = useRef<HTMLDivElement>(null);
  const studentRef = useRef<HTMLDivElement>(null);
  const leftAvatar1Ref = useRef<HTMLDivElement>(null);
  const leftAvatar2Ref = useRef<HTMLDivElement>(null);
  const rightAvatarRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);
  const [logoPosition, setLogoPosition] = useState<{ bottom: string }>({ bottom: '52%' });
  const [speechBubblePosition, setSpeechBubblePosition] = useState<{ bottom: string; right: string }>({ bottom: '20%', right: '14%' });
  const [svgViewBox, setSvgViewBox] = useState<string>('0 0 800 500');

  const currentUniversities = useImageSetOne ? universities : universitiesSet2;

  // Calculate speech bubble position relative to student avatar
  const calculateSpeechBubblePosition = useCallback(() => {
    if (!studentRef.current || !containerRef.current) return;

    const student = studentRef.current;
    const container = containerRef.current;

    const studentRect = student.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Position bubble to the right and slightly above the student avatar
    // Calculate right position: from right edge of container to right edge of student + gap
    const gap = -220; // gap between student and bubble (more negative = further right)
    const studentRightFromContainerRight = containerRect.right - studentRect.right;
    const bubbleWidth = 100; // fixed bubble width
    const bubbleRight = studentRightFromContainerRight + gap;

    // Calculate bottom position: student top from container bottom + vertical offset
    const studentTopFromBottom = containerRect.bottom - studentRect.top;
    const bubbleHeight = 150; // fixed bubble height
    const verticalOffset = -10; // offset above student center (negative = lower)
    const bubbleBottom = studentTopFromBottom - (bubbleHeight / 2) + verticalOffset;

    // Convert to percentages
    const bubbleBottomPercent = (bubbleBottom / containerRect.height) * 100;
    const bubbleRightPercent = (bubbleRight / containerRect.width) * 100;

    setSpeechBubblePosition({
      bottom: `${bubbleBottomPercent}%`,
      right: `${bubbleRightPercent}%`
    });
  }, []);

  // Calculate logo position relative to globe top
  const calculateLogoPosition = useCallback(() => {
    if (!globeRef.current || !containerRef.current) return;

    const globe = globeRef.current;
    const container = containerRef.current;

    const globeRect = globe.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Get globe's top position relative to container bottom
    const globeTopFromBottom = containerRect.bottom - globeRect.top;
    const containerHeight = containerRect.height;

    // Calculate gap: 2px gap + approximate logo height/2 (around 20px) to position logo center above globe top
    const gap = 0; // desired gap in pixels
    const logoHalfHeight = 10; // approximate half height of logo
    const offset = gap + logoHalfHeight;

    // Calculate bottom percentage: globe top position + offset
    const logoBottom = ((globeTopFromBottom + offset) / containerHeight) * 100;

    setLogoPosition({ bottom: `${logoBottom}%` });
  }, []);

  // Calculate arrow paths based on actual element positions
  const calculateArrowPaths = useCallback(() => {
    if (!containerRef.current || !globeRef.current) return;

    const container = containerRef.current;
    const globe = globeRef.current;
    const containerRect = container.getBoundingClientRect();
    const globeRect = globe.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Set viewBox based on container dimensions, maintaining aspect ratio
    const viewBoxWidth = 800;
    const viewBoxHeight = (containerHeight / containerWidth) * viewBoxWidth;
    setSvgViewBox(`0 0 ${viewBoxWidth} ${viewBoxHeight}`);

    // Calculate globe's top center point (the pointed edge) - moved 5px higher
    const globeTopCenterX = ((globeRect.left + globeRect.width / 2) - containerRect.left) / containerWidth * viewBoxWidth;
    const globeTopCenterY = ((globeRect.top - containerRect.top) / containerHeight) * viewBoxHeight - (10 / containerHeight) * viewBoxHeight;

    // Get positions relative to container
    const getRelativePosition = (element: HTMLElement | null) => {
      if (!element || !container) return null;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      return {
        x: ((elementRect.left + elementRect.width / 2) - containerRect.left) / containerWidth * viewBoxWidth,
        y: ((elementRect.top + elementRect.height / 2) - containerRect.top) / containerHeight * viewBoxHeight,
      };
    };

    const studentPos = getRelativePosition(studentRef.current);
    const leftAvatar1Pos = getRelativePosition(leftAvatar1Ref.current);
    const leftAvatar2Pos = getRelativePosition(leftAvatar2Ref.current);
    const rightAvatarPos = getRelativePosition(rightAvatarRef.current);

    if (!studentPos || !leftAvatar1Pos || !leftAvatar2Pos || !rightAvatarPos) {
      return;
    }

    // Helper function to shorten arrow end point (stop before reaching avatar center)
    const shortenEndpoint = (startX: number, startY: number, endX: number, endY: number, shortenBy: number) => {
      const dx = endX - startX;
      const dy = endY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance === 0) return { x: endX, y: endY };

      // Convert shortenBy pixels to viewBox coordinates
      const shortenInViewBox = (shortenBy / containerHeight) * viewBoxHeight;
      const ratio = (distance - shortenInViewBox) / distance;

      return {
        x: startX + dx * ratio,
        y: startY + dy * ratio,
      };
    };

    // Shorten endpoints by 20px (converted to viewBox coordinates)
    const shortenDistance = 20;
    const leftAvatar1End = shortenEndpoint(globeTopCenterX, globeTopCenterY, leftAvatar1Pos.x, leftAvatar1Pos.y, shortenDistance);
    // Left second (mid-left) - shorten more
    const leftAvatar2End = shortenEndpoint(globeTopCenterX, globeTopCenterY, leftAvatar2Pos.x, leftAvatar2Pos.y, shortenDistance + 15);
    const studentEnd = shortenEndpoint(globeTopCenterX, globeTopCenterY, studentPos.x, studentPos.y, shortenDistance);
    // Right end - shorten more
    const rightAvatarEnd = shortenEndpoint(globeTopCenterX, globeTopCenterY, rightAvatarPos.x, rightAvatarPos.y, shortenDistance + 15);

    // Calculate arrow paths starting from globe's top center point
    const paths: ArrowPaths = {
      // Far left curve to left avatar 1 - curved path
      leftCurve: `M ${globeTopCenterX} ${globeTopCenterY} Q ${(globeTopCenterX + leftAvatar1End.x) / 2} ${globeTopCenterY + 50} ${leftAvatar1End.x} ${leftAvatar1End.y}`,

      // Mid-left line to left avatar 2 - straight line
      midLeft: `M ${globeTopCenterX} ${globeTopCenterY} L ${leftAvatar2End.x} ${leftAvatar2End.y}`,

      // Center vertical to student - straight line
      center: `M ${globeTopCenterX} ${globeTopCenterY} L ${studentEnd.x} ${studentEnd.y}`,

      // Far right curve to right avatar - curved path
      rightCurve: `M ${globeTopCenterX} ${globeTopCenterY} Q ${(globeTopCenterX + rightAvatarEnd.x) / 2} ${globeTopCenterY + 50} ${rightAvatarEnd.x} ${rightAvatarEnd.y}`,
    };

    setArrowPaths(paths);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUseImageSetOne((prev) => !prev);
      setAnimationKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Recalculate logo position, speech bubble position, and arrow paths when elements are ready or window resizes
  useEffect(() => {
    // Delay to ensure elements are rendered
    const timer = setTimeout(() => {
      calculateLogoPosition();
      calculateSpeechBubblePosition();
      calculateArrowPaths();
    }, 100);

    const handleResize = () => {
      calculateLogoPosition();
      calculateSpeechBubblePosition();
      calculateArrowPaths();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [animationKey, useImageSetOne, calculateLogoPosition, calculateSpeechBubblePosition, calculateArrowPaths]);

  // Recalculate when animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateLogoPosition();
      calculateSpeechBubblePosition();
      calculateArrowPaths();
    }, 3500); // After all animations complete

    return () => clearTimeout(timer);
  }, [animationKey, calculateLogoPosition, calculateSpeechBubblePosition, calculateArrowPaths]);

  // Combined courses + colleges search with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (searchTerm.trim().length === 0) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchService.searchCoursesAndColleges(searchTerm.trim(), 10);
        setSearchResults(results);
      } catch (error) {
        logger.error("Error in combined search:", error);
        setSearchResults(null);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
  };

  const handleCourseClick = (course: { id: number; title: string }) => {
    setSearchTerm("");
    setSearchResults(null);
    router.push(`/course-details/${course.id}`);
  };

  const handleCollegeClick = (college: { id: number; name: string }) => {
    setSearchTerm("");
    setSearchResults(null);
    router.push(`/college-details?id=${college.id}`);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setSearchResults(null);
  };

  const handleSearchCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // If we have a single course/college result, navigate to it; otherwise go to listing
      const results = searchResults;
      if (results?.courses?.length === 1 && results.colleges?.length === 0) {
        router.push(`/course-details/${results.courses[0].id}`);
      } else if (results?.colleges?.length === 1 && results.courses?.length === 0) {
        router.push(`/college-details?id=${results.colleges[0].id}`);
      } else {
        router.push(`/courses/list?search=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  return (
    <section
      className="relative z-30 pt-8 sm:pt-28 md:pt-32 lg:pt-0 pb-8 md:pb-12 lg:pb-0 overflow-visible min-h-screen md:min-h-0"
      style={{
        background: "linear-gradient(to bottom, #F0F9FF, #E0F2FE)"
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
          <circle cx="150" cy="100" r="40" fill="white" opacity="0.3" />
          <circle cx="1000" cy="150" r="60" fill="white" opacity="0.2" />
          <circle cx="300" cy="500" r="50" fill="white" opacity="0.25" />
          <circle cx="900" cy="450" r="45" fill="white" opacity="0.3" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-12 items-center mt-20 sm:mt-2">
          {/* Left Content */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl leading-tight text-gray-900 mb-2 md:mb-2 font-bold ">
                Unlock Your Future with
              </h1>
              <div className="inline-block bg-blue-500 rounded-xl md:rounded-2xl px-4 md:px-4 py-2 md:py-3 mb-2 md:mb-2">
                <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl font-bold leading-relaxed">College Mentor</span>
              </div>
              <p className="text-gray-600 text-base sm:text-lg md:text-lg max-w-md mt-1 md:mt-2">
                Discover top courses and connect with world-class universities — all in one place.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full lg:max-w-md relative mt-2">
              <form onSubmit={handleSearchCourse} className="relative">
                <div className="relative flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search courses and colleges..."
                    className="flex-1 py-3 md:py-4 pl-4 md:pl-6 pr-4 focus:outline-none text-gray-800 text-sm md:text-base"
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded-full mr-2"
                      onClick={handleClearInput}
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-r-full transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">Search Course</span>
                    <span className="sm:hidden">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path d="M9.12305 5.24414L5.09766 1.21875L6.15234 0.164062L11.9883 6L6.15234 11.8359L5.09766 10.7812L9.12305 6.75586H0V5.24414H9.12305Z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Suggestions Dropdown - Courses & Colleges */}
              {(searchResults && (searchResults.courses?.length > 0 || searchResults.colleges?.length > 0)) || isSearching ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-60 md:max-h-80 overflow-y-auto z-[999]"
                >
                  <div className="py-2">
                    {isSearching ? (
                      <div className="px-4 md:px-6 py-2 md:py-3 text-center text-gray-500 text-sm">
                        Searching...
                      </div>
                    ) : (
                      <>
                        {searchResults?.colleges && searchResults.colleges.length > 0 && (
                          <div className="border-b border-gray-100">
                            <div className="px-4 md:px-6 py-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
                              <Building2 size={14} />
                              Colleges
                            </div>
                            {searchResults.colleges.map((college) => (
                              <div
                                key={`col-${college.id}`}
                                className="px-4 md:px-6 py-2 md:py-3 hover:bg-blue-50 cursor-pointer transition-colors"
                                onClick={() => handleCollegeClick(college)}
                              >
                                <div className="text-gray-800 text-sm md:text-base font-medium">{college.name}</div>
                                {(college.city || college.state) && (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {college.city}
                                    {college.city && college.state ? ", " : ""}
                                    {college.state}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {searchResults?.courses && searchResults.courses.length > 0 && (
                          <div>
                            <div className="px-4 md:px-6 py-2 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase">
                              <GraduationCap size={14} />
                              Courses
                            </div>
                            {searchResults.courses.map((course) => (
                              <div
                                key={`crs-${course.id}`}
                                className="px-4 md:px-6 py-2 md:py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                onClick={() => handleCourseClick(course)}
                              >
                                <div className="text-gray-800 text-sm md:text-base font-medium">{course.title}</div>
                                {course.level && (
                                  <span className="text-xs text-gray-500 bg-blue-100 px-2 py-0.5 rounded-full">{course.level}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              ) : null}
            </div>

            {/* Recent Searches */}
            <div className="mt-2 md:mt-2">
              <p className="text-gray-600 mb-2 md:mb-2 text-sm md:text-base">Recent Searches:</p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="bg-white text-gray-700 px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm md:text-base">
                  B.Tech CSE
                </span>
                <span className="bg-white text-gray-700 px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm md:text-base">
                  MBA
                </span>
                <span className="bg-white text-gray-700 px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm md:text-base">
                  Medical
                </span>
                <span className="bg-white text-gray-700 px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm md:text-base">
                  Design
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mt-2 md:mt-2">
              <button onClick={() => router.push('/courses/list')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md text-sm md:text-base">
                <BookOpen size={18} className="md:w-5 md:h-5" />
                <span>Explore Courses</span>
              </button>
              <button onClick={() => router.push('/courses/list')} className="bg-white hover:bg-gray-50 text-gray-700 px-6 md:px-8 py-2.5 md:py-3 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2 shadow-sm text-sm md:text-base">
                <TrendingUp size={18} className="md:w-5 md:h-5" />
                <span>Compare Courses</span>
              </button>
            </div>
          </motion.div>

          {/* Right Hero Section */}
          <div className="w-full lg:w-1/2 relative min-h-[280px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[650px] flex items-center justify-center mt-0 lg:mt-0">


            {/* Master Wrapper */}
            <div ref={containerRef} className="relative w-full max-w-3xl mx-auto h-[280px] sm:h-[350px] md:h-[500px] lg:h-[580px]">
              {/* 1) GLOBE — APPEARS FIRST */}
              <img
                ref={globeRef}
                src={bannerImage.src}
                alt="Globe"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[600px] lg:w-[750px] h-auto object-contain z-0"
              />
              {/* 6) COLLEGE MENTOR LOGO - Centered above globe top */}
              <motion.div
                ref={collegeMentorRef}
                className="absolute left-1/2 -translate-x-1/2 z-30"
                style={{ bottom: logoPosition.bottom }}
                initial={false}
              >
                <div className="bg-white border-2 md:border-[3px] border-blue-600 rounded-full px-6 md:px-8 lg:px-10 py-2 md:py-2.5 lg:py-3 shadow-xl">
                  <div className="flex items-center gap-1 md:gap-2 text-sm md:text-base lg:text-lg">
                    <span className="text-blue-600">College</span>
                    <span className="text-teal-500">Mentor</span>
                  </div>
                </div>
              </motion.div>
              {/* 2) STUDENT CENTER - Scrolled down further */}
              <motion.div
                ref={studentRef}
                key={`student-${animationKey}`}
                className="absolute bottom-[5%] left-[35%] -translate-x-1/2 z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <div className="w-28 h-28 md:w-36 md:h-36 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 md:border-5 lg:border-[7px] border-blue-600 shadow-2xl">
                  <ImageWithFallback
                    src={bannerImage1}
                    className="w-full h-full object-cover"
                    alt="Student"
                  />
                </div>
              </motion.div>

              {/* 3) LEFT AVATAR 1 - Scrolled down further */}
              <motion.div
                ref={leftAvatar1Ref}
                key={`uni1-${animationKey}`}
                className="absolute bottom-[5%] left-[5%] z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 md:border-2 border-white shadow-xl">
                  <ImageWithFallback
                    src={currentUniversities[0].image}
                    alt={currentUniversities[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* 4) LEFT AVATAR 2 - Scrolled down further */}
              <motion.div
                ref={leftAvatar2Ref}
                key={`uni2-${animationKey}`}
                className="absolute bottom-[15%] left-[23%] z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 md:border-2 border-white shadow-xl">
                  <ImageWithFallback
                    src={currentUniversities[1].image}
                    alt={currentUniversities[1].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* 5) RIGHT AVATAR - Scrolled down further */}
              <motion.div
                ref={rightAvatarRef}
                key={`uni3-${animationKey}`}
                className="absolute bottom-[6%] right-[15%] z-30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 md:border-2 border-white shadow-xl">
                  <ImageWithFallback
                    src={currentUniversities[2].image}
                    alt={currentUniversities[2].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>



              {/* 7) SPEECH BUBBLE - Scrolled down further */}
              {/* ✅ Speech Bubble (cloud with original text, tightly fitted) */}
              <motion.div
                ref={speechBubbleRef}
                key={`bubble-${animationKey}`}
                className="absolute z-30"
                style={{
                  bottom: speechBubblePosition.bottom,
                  right: speechBubblePosition.right
                }}
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                <div className="relative w-[280px] h-[180px] sm:w-[300px] sm:h-[200px] md:w-[320px] md:h-[220px] drop-shadow-xl">
                  <img
                    src={cloudVector.src}
                    alt="Speech bubble"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-3">
                    <p className="max-w-[90%] text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] leading-tight text-gray-700 text-center break-words">
                      <span className="block text-blue-600 font-semibold mb-0.5 leading-tight">
                        Hey College Mentor,
                      </span>
                      <span className="block leading-tight">
                        can you help me
                      </span>
                      <span className="block leading-tight">
                        connect with the dream
                      </span>
                      <span className="block leading-tight">
                        colleges on my list?
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>




              {/* 8) DOTTED CURVED ARROWS - Scrolled down further to align */}
              <motion.svg
                key={`arrows-${animationKey}`}
                className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none overflow-visible"
                viewBox={svgViewBox}
                preserveAspectRatio="xMidYMid meet"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.6 }}
              >
                <defs>
                  <marker
                    id={`arrow-${animationKey}`}
                    markerWidth="8"
                    markerHeight="8"
                    refX="7.5"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3.5, 0 7" fill="#4169E1" />
                  </marker>
                </defs>
                {/* Far Left Curve to Left Avatar 1 */}
                <motion.path
                  d={arrowPaths.leftCurve}
                  stroke="#4169E1"
                  strokeWidth="2.8"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#arrow-${animationKey})`}
                  initial={{ strokeDashoffset: 250 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, delay: 2.4 }}
                />



                {/* Mid-left Curve to Left Avatar 2 */}
                <motion.path
                  d={arrowPaths.midLeft}
                  stroke="#4169E1"
                  strokeWidth="2.8"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#arrow-${animationKey})`}
                  initial={{ strokeDashoffset: 180 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, delay: 2.8 }}
                />

                {/* Center Vertical to Student */}
                <motion.path
                  d={arrowPaths.center}
                  stroke="#4169E1"
                  strokeWidth="2.8"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  initial={{ strokeDashoffset: 180 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, delay: 2.8 }}
                />

                {/* Far Right Curve to Right Avatar */}
                <motion.path
                  d={arrowPaths.rightCurve}




                  stroke="#4169E1"
                  strokeWidth="2.8"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#arrow-${animationKey})`}
                  initial={{ strokeDashoffset: 250 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, delay: 3.0 }}
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};