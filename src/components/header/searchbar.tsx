'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Search, X, Building2, GraduationCap, FileText, Briefcase, Loader2, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchService, SearchResults } from "@/services/searchService";
import { logger } from "@/utils/logger";
import { useRouter } from "next/navigation";
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  className?: string;
  variant?: "default" | "hero";
  showQuickLinks?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search courses, colleges, exams...",
  onSearch,
  className = "",
  variant = "default",
  showQuickLinks = false,
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Search state for API integration
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search function - uses combined courses + colleges search (dedicated APIs)
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setHasSearched(false);
      return;
    }

    logger.log('🔍 Performing combined search (courses + colleges) for:', query);
    setIsSearching(true);
    setHasSearched(true);

    try {
      const results = await searchService.searchCoursesAndColleges(query.trim(), 5);

      if (results && (results.colleges.length > 0 || results.courses.length > 0 || results.exams.length > 0 || results.careers.length > 0)) {
        logger.log('✅ Setting search results with data:', {
          colleges: results.colleges.length,
          courses: results.courses.length,
          exams: results.exams.length,
          careers: results.careers.length,
        });
        setSearchResults(results);
        setShowSuggestions(true);
      } else {
        logger.log('⚠️ No results or empty results');
        setSearchResults(null);
        setShowSuggestions(true); // Show dropdown even if no results to display "No results" message
      }
      // Also call the onSearch callback if provided
      onSearch?.(query.toLowerCase());
    } catch (error) {
      logger.error('❌ Search error:', error);
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  }, [onSearch]);

  // Debounced search handler
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    logger.log('⌨️ Search input changed:', value);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    // If query is empty, clear results immediately
    if (!value.trim()) {
      setSearchResults(null);
      setHasSearched(false);
      setShowSuggestions(false);
      return;
    }

    // Debounce search - wait 500ms after user stops typing
    logger.log('⏱️ Setting debounce timeout for:', value);
    searchTimeoutRef.current = setTimeout(() => {
      logger.log('⏰ Debounce timeout completed, calling performSearch with:', value);
      performSearch(value.trim());
    }, 500);
  }, [performSearch]);

  // Handle Enter key press
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      // Clear timeout to prevent debounced search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // Perform immediate search
      performSearch(searchTerm);
      setShowSuggestions(true);
    }
  }, [searchTerm, performSearch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  const searchBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearchChange(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    setSearchResults(null);
    setHasSearched(false);
  };

  const handleSearchClick = () => {
    // No longer needed for hero variant - removed overlay behavior
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setSearchTerm("");
    setShowSuggestions(false);
    setSearchResults(null);
    setHasSearched(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
  };

  const quickLinks = [
    "Find a College",
    "Course Explorer",
    "Exam Preparation",
    "Career Guidance",
    "Scholarship Finder",
    "Study Abroad",
    "Career Assessment",
    "Mentorship Programs",
  ];

  const baseClasses = variant === "hero" ? "relative w-full max-w-md" : "relative w-full";

  return (
    <>
      {/* Search Overlay removed - now using dropdown for all variants */}
      {false && showOverlay &&
        variant === "hero" &&
        createPortal(
          <div className="fixed inset-0 bg-white z-[999] animate-in slide-in-from-top-2 duration-300">
            {/* Search Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Search</h2>
              <Button variant="ghost" size="sm" onClick={closeOverlay} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </Button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder={placeholder}
                  className="pl-10 pr-4 py-3 w-full text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
                  autoFocus
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
              {isSearching && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-primary" size={24} />
                  <span className="ml-2 text-gray-600">Searching...</span>
                </div>
              )}

              {!isSearching && hasSearched && searchResults && (
                <div className="space-y-6">
                  {/* Colleges Section */}
                  {(searchResults?.colleges?.length ?? 0) > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="text-primary" size={18} />
                        <h3 className="text-base font-semibold text-gray-900">Colleges</h3>
                        <span className="text-sm text-gray-500">({searchResults?.colleges?.length})</span>
                      </div>
                      <div className="space-y-1">
                        {searchResults?.colleges?.map((college) => (
                          <button
                            key={college.id}
                            onClick={() => {
                              router.push(`/college-details?id=${college.id}`);
                              closeOverlay();
                            }}
                            className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                          >
                            <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                              <Building2 size={16} />
                            </span>
                            <div className="flex-1">
                              <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                {college.name}
                              </div>
                              {(college.city || college.state) && (
                                <div className="text-sm text-gray-500 mt-0.5">
                                  {college.city}{college.city && college.state ? ', ' : ''}{college.state}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Courses Section */}
                  {(searchResults?.courses?.length ?? 0) > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="text-primary" size={18} />
                        <h3 className="text-base font-semibold text-gray-900">Courses</h3>
                        <span className="text-sm text-gray-500">({searchResults?.courses?.length})</span>
                      </div>
                      <div className="space-y-1">
                        {searchResults?.courses?.map((course) => (
                          <button
                            key={course.id}
                            onClick={() => {
                              router.push(`/course-details/${course.id}`);
                              closeOverlay();
                            }}
                            className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                          >
                            <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                              <GraduationCap size={16} />
                            </span>
                            <div className="flex-1">
                              <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                {course.title}
                              </div>
                              <div className="text-sm text-gray-500 mt-0.5">
                                {course.level} • {course.durationMonths} months
                              </div>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exams Section */}
                  {(searchResults?.exams?.length ?? 0) > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="text-primary" size={18} />
                        <h3 className="text-base font-semibold text-gray-900">Exams</h3>
                        <span className="text-sm text-gray-500">({searchResults?.exams?.length})</span>
                      </div>
                      <div className="space-y-1">
                        {searchResults?.exams?.map((exam) => (
                          <button
                            key={exam.id}
                            onClick={() => {
                              router.push(`/exams/${exam.id}`);
                              closeOverlay();
                            }}
                            className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                          >
                            <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                              <FileText size={16} />
                            </span>
                            <div className="flex-1">
                              <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                {exam.name}
                              </div>
                              {exam.examDate && (
                                <div className="text-sm text-gray-500 mt-0.5">
                                  Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Careers Section */}
                  {(searchResults?.careers?.length ?? 0) > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="text-primary" size={18} />
                        <h3 className="text-base font-semibold text-gray-900">Careers</h3>
                        <span className="text-sm text-gray-500">({searchResults?.careers?.length})</span>
                      </div>
                      <div className="space-y-1">
                        {searchResults?.careers?.map((career) => (
                          <button
                            key={career.id}
                            onClick={() => {
                              router.push(`/careers?id=${career.id}`);
                              closeOverlay();
                            }}
                            className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                          >
                            <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                              <Briefcase size={16} />
                            </span>
                            <div className="flex-1">
                              <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                {career.title}
                              </div>
                              {career.avgSalary && (
                                <div className="text-sm text-gray-500 mt-0.5">
                                  Avg Salary: ₹{career.avgSalary.toLocaleString('en-IN')}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Results Message */}
                  {(!searchResults?.colleges || searchResults?.colleges?.length === 0) &&
                    (!searchResults?.courses || searchResults?.courses?.length === 0) &&
                    (!searchResults?.exams || searchResults?.exams?.length === 0) &&
                    (!searchResults?.careers || searchResults?.careers?.length === 0) && (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No results found for "{searchTerm}"</p>
                      </div>
                    )}
                </div>
              )}

              {/* Quick Links - Show when no search has been performed */}
              {!hasSearched && !isSearching && (
                <>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Quick Links</div>
                  <div className="space-y-2">
                    {quickLinks.map((link, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                        onClick={() => {
                          logger.log("Navigate to:", link);
                          closeOverlay();
                        }}
                      >
                        <span className="text-gray-400 mr-3 group-hover:text-primary transition-colors duration-200">
                          →
                        </span>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200 font-medium">
                          {link}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}

      <div ref={searchBarRef} className={`${baseClasses} ${className}`}>
        {/* Search Input */}
        <div className="relative" style={{ isolation: 'isolate' }}>
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 ${variant === "hero" ? "text-gray-600" : "text-gray-400"}`}
            size={variant === "hero" ? 20 : 18}
          />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => {
              if (searchTerm.length > 2 || hasSearched || isSearching) {
                setShowSuggestions(true);
              }
            }}
            className={`
              pl-10 pr-12 w-full border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg relative text-gray-900
              ${variant === "hero"
                ? "py-4 text-lg bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                : "py-3 text-base"
              }
            `}
            autoComplete="off"
          />

          {/* Clear Button */}
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          )}
        </div>

        {/* Search Results Dropdown - only show when searching or has results */}
        {showSuggestions && (isSearching || hasSearched) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[500px] overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-primary" size={24} />
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            )}

            {!isSearching && hasSearched && searchResults && (
              <div className="p-4 space-y-6">
                {/* Colleges Section */}
                {searchResults?.colleges && (searchResults?.colleges?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Colleges</h3>
                      <span className="text-sm text-gray-500">({searchResults?.colleges?.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults?.colleges?.map((college) => (
                        <button
                          key={college.id}
                          onClick={() => {
                            router.push(`/college-details?id=${college.id}`);
                            setShowSuggestions(false);
                            setSearchTerm("");
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <Building2 size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {college.name}
                            </div>
                            {(college.city || college.state) && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                {college.city}{college.city && college.state ? ', ' : ''}{college.state}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses Section */}
                {searchResults?.courses && (searchResults?.courses?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Courses</h3>
                      <span className="text-sm text-gray-500">({searchResults?.courses?.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults?.courses?.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => {
                            router.push(`/course-details/${course.id}`);
                            setShowSuggestions(false);
                            setSearchTerm("");
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <GraduationCap size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {course.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">
                              {course.level} • {course.durationMonths} months
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exams Section */}
                {searchResults?.exams && (searchResults?.exams?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Exams</h3>
                      <span className="text-sm text-gray-500">({searchResults?.exams?.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults?.exams?.map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => {
                            router.push(`/exams/${exam.id}`);
                            setShowSuggestions(false);
                            setSearchTerm("");
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <FileText size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {exam.name}
                            </div>
                            {exam.examDate && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Careers Section */}
                {searchResults?.careers && (searchResults?.careers?.length ?? 0) > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Careers</h3>
                      <span className="text-sm text-gray-500">({searchResults?.careers?.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults?.careers?.map((career) => (
                        <button
                          key={career.id}
                          onClick={() => {
                            router.push(`/careers?id=${career.id}`);
                            setShowSuggestions(false);
                            setSearchTerm("");
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <Briefcase size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {career.title}
                            </div>
                            {career.avgSalary && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                Avg Salary: ₹{career.avgSalary.toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results Message */}
                {(!searchResults?.colleges || searchResults?.colleges?.length === 0) &&
                  (!searchResults?.courses || searchResults?.courses?.length === 0) &&
                  (!searchResults?.exams || searchResults?.exams?.length === 0) &&
                  (!searchResults?.careers || searchResults?.careers?.length === 0) && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No results found for "{searchTerm}"</p>
                    </div>
                  )}
              </div>
            )}

          </div>
        )}
      </div>
    </>
  );
};

export { SearchBar };
