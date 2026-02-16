"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpRight,
  FileDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/FallBack";
import {
  courseService,
  CourseSearchResponse,
  CourseSearchResultItem,
  CourseFacetsResponse,
  CourseFacetsPayload,
} from "@/services/courseService";
import { logger } from "@/utils/logger";

type CourseType = "Degree" | "Certification" | "Online";
type EducationLevel = "Diploma" | "UG" | "PG" | "PhD";

const PAGE_SIZE = 20;

interface Course {
  id: string;
  stream: string;
  title: string;
  // Derived from API degree_types array (but still original values)
  degreeTypes: string[];
  // API objects mapped directly for display
  averageFee?: Record<string, string>;
  averageSalary?: Record<string, string>;
  entranceExams?: string[];
  // Internal-only fields for filters/sorting (not shown in UI)
  degree: string;
  courseType: CourseType;
  twinning: boolean;
  educationLevel: EducationLevel;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  hasDirectAdmission: boolean;
  applicationStatus: "Application Open" | "Entrance Exam";
}

// All data is driven from backend /courses/search. No mock data fallback.

// Fallback filter options when facets API is not yet loaded or returns empty
const streamsFallback = ["Engineering", "Medical", "Management", "Law", "Arts"];
const degreesFallback = ["Diploma", "B.Tech", "M.Tech", "PG Diploma", "MBA", "PhD"];
const courseTypesFallback: CourseType[] = ["Degree", "Certification", "Online"];
const educationLevelsFallback: EducationLevel[] = ["Diploma", "UG", "PG", "PhD"];

const streamIdToName: Record<string, string> = {
  engineering: "Engineering",
  medical: "Medical",
  management: "Management",
  law: "Law",
  arts: "Arts",
};

interface FilterState {
  streams: string[];
  degrees: string[];
  courseTypes: CourseType[];
  twinning: boolean | null;
  educationLevels: EducationLevel[];
}

const initialFilters: FilterState = {
  streams: [],
  degrees: [],
  courseTypes: [],
  twinning: null,
  educationLevels: [],
};

const CourseListing: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [urlParamsInitialized, setUrlParamsInitialized] = useState(false);
  const filterSidebarScrollRef = React.useRef<number>(0);
  const filterSidebarRef = React.useRef<HTMLDivElement>(null);
  const [apiCourses, setApiCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiTotalCount, setApiTotalCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [facets, setFacets] = useState<CourseFacetsResponse | null>(null);
  const [facetsLoading, setFacetsLoading] = useState(false);

  // Build facets payload: same format as search (courseName, stream, degree, courseType, educationLevel).
  // Single value sent as string when one selected, array when multiple (backend compatibility).
  const buildFacetsPayload = useCallback((): CourseFacetsPayload => {
    const payload: CourseFacetsPayload = {};
    const trimmed = searchQuery.trim();
    if (trimmed) payload.courseName = trimmed;
    if (filters.streams.length > 0) payload.stream = filters.streams.length === 1 ? filters.streams[0] : filters.streams;
    if (filters.degrees.length > 0) payload.degree = filters.degrees.length === 1 ? filters.degrees[0] : filters.degrees;
    if (filters.courseTypes.length > 0) payload.courseType = filters.courseTypes.length === 1 ? filters.courseTypes[0] : filters.courseTypes;
    if (filters.educationLevels.length > 0) payload.educationLevel = filters.educationLevels.length === 1 ? filters.educationLevels[0] : filters.educationLevels;
    return payload;
  }, [searchQuery, filters.streams, filters.degrees, filters.courseTypes, filters.educationLevels]);

  // Fetch facets when filters/search change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setFacetsLoading(true);
      const payload = buildFacetsPayload();
      const res = await courseService.getCourseFacets(payload);
      setFacets(res ?? null);
      setFacetsLoading(false);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [buildFacetsPayload]);

  const facetToStrings = useCallback(
    (opts: (string | { value: string; count?: number })[] | undefined): string[] => {
      if (!opts || !Array.isArray(opts)) return [];
      return opts.map((o) => (typeof o === "string" ? o : o.value));
    },
    []
  );

  const facetStreams = useMemo(() => {
    const arr = facetToStrings(facets?.streams ?? facets?.stream);
    return arr.length > 0 ? arr : streamsFallback;
  }, [facets?.streams, facets?.stream, facetToStrings]);
  const facetDegrees = useMemo(() => {
    const arr = facetToStrings(facets?.degrees ?? facets?.degree);
    return arr.length > 0 ? arr : degreesFallback;
  }, [facets?.degrees, facets?.degree, facetToStrings]);
  const facetCourseTypes = useMemo(() => {
    const arr = facetToStrings(facets?.courseTypes ?? facets?.courseType);
    return arr.length > 0 ? arr : courseTypesFallback;
  }, [facets?.courseTypes, facets?.courseType, facetToStrings]);
  const facetEducationLevels = useMemo(() => {
    const arr = facetToStrings(facets?.educationLevels ?? facets?.educationLevel);
    return arr.length > 0 ? arr : educationLevelsFallback;
  }, [facets?.educationLevels, facets?.educationLevel, facetToStrings]);

  // Map backend /courses/search item into UI Course model
  const mapSearchResultToCourse = useCallback((item: CourseSearchResultItem): Course => {
    const degreeTypes = item.degree_types || [];

    // Map backend degree_types to our EducationLevel union
    const inferEducationLevel = (): EducationLevel => {
      const lowered = degreeTypes.map((d) => d.toLowerCase());
      if (lowered.some((d) => d.includes("diploma"))) return "Diploma";
      if (lowered.some((d) => d.includes("phd") || d.includes("doctor"))) return "PhD";
      if (lowered.some((d) => d.includes("postgraduate") || d === "pg")) return "PG";
      // Default to UG if anything else mentions undergrad / bachelor, otherwise UG as safe default
      return "UG";
    };

    const educationLevel = inferEducationLevel();

    return {
      id: String(item.id),
      title: item.name || "Course name coming soon",
      stream: item.stream || "Engineering",
      degreeTypes,
      averageFee: item.average_fee,
      averageSalary: item.average_salary,
      entranceExams: item.entrance_exams,
      // Internal-only values for filters/sorting
      degree: degreeTypes[0] || "Undergraduate",
      courseType: "Degree",
      twinning: false,
      educationLevel,
      rating: 4.5,
      reviewsCount: 0,
      isFeatured: false,
      hasDirectAdmission: false,
      applicationStatus: "Application Open",
    };
  }, []);

  // When any filter is active, fetch all pages and paginate client-side
  // so filtered results appear together instead of scattered across API pages.
  const hasActiveApiFilters =
    filters.streams.length > 0 ||
    filters.degrees.length > 0 ||
    filters.courseTypes.length > 0 ||
    filters.educationLevels.length > 0 ||
    filters.twinning !== null;

  const fetchCoursesByName = useCallback(
    async (courseName: string, page: number = 0) => {
      const trimmed = courseName.trim();
      setIsLoading(true);
      setApiError(null);

      // Payload format: courseName, stream, degree, courseType, educationLevel, twinning (same as facets).
      // Single value as string when one selected, array when multiple (backend compatibility).
      const buildPayload = (p: number): Record<string, any> => {
        const pl: Record<string, any> = {
          page: p,
          size: PAGE_SIZE,
          sort: "name,asc",
        };
        if (trimmed) pl.courseName = trimmed;
        if (filters.streams.length > 0) pl.stream = filters.streams.length === 1 ? filters.streams[0] : filters.streams;
        if (filters.degrees.length > 0) pl.degree = filters.degrees.length === 1 ? filters.degrees[0] : filters.degrees;
        if (filters.courseTypes.length > 0) pl.courseType = filters.courseTypes.length === 1 ? filters.courseTypes[0] : filters.courseTypes;
        if (filters.educationLevels.length > 0) pl.educationLevel = filters.educationLevels.length === 1 ? filters.educationLevels[0] : filters.educationLevels;
        if (filters.twinning !== null) pl.twinning = filters.twinning ? "true" : "false";
        return pl;
      };

      try {
        const payload = buildPayload(page);
        logger.log("🔍 Fetching courses from /courses/search", payload);
        const res: CourseSearchResponse | null = await courseService.searchCourses(payload);

        if (!res || !Array.isArray(res.results)) {
          logger.warn("⚠️ No results from courseService.searchCourses for payload:", payload);
          setApiCourses([]);
          setApiTotalCount(0);
          setCurrentPage(0);
          return;
        }

        const totalCount = typeof res.count === "number" ? res.count : res.results.length;
        let allMapped = res.results.map(mapSearchResultToCourse);

        // When filters are active, fetch all pages and merge so filtered courses appear on consecutive pages
        if (hasActiveApiFilters && totalCount > PAGE_SIZE) {
          const totalPages = Math.ceil(totalCount / PAGE_SIZE);
          for (let p = 1; p < totalPages; p++) {
            const nextRes = await courseService.searchCourses(buildPayload(p));
            if (nextRes?.results?.length) {
              allMapped = allMapped.concat(nextRes.results.map(mapSearchResultToCourse));
            }
          }
        }

        setApiCourses(allMapped);
        setApiTotalCount(totalCount);
        setCurrentPage(0);
      } catch (error: any) {
        logger.error("🔴 Failed to fetch courses from /courses/search:", error);
        setApiError(error?.message || "Failed to fetch courses");
        setApiCourses([]);
        setApiTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    },
    [
      hasActiveApiFilters,
      filters.streams,
      filters.degrees,
      filters.courseTypes,
      filters.educationLevels,
      filters.twinning,
      mapSearchResultToCourse,
    ]
  );

  // Initialize from URL (?stream=... from ExploreStreamsSection, ?search=... from home/hero search)
  useEffect(() => {
    if (!urlParamsInitialized) {
      const searchParam = searchParams.get("search");
      if (searchParam?.trim()) {
        setSearchQuery(searchParam.trim());
        fetchCoursesByName(searchParam.trim(), 0);
      } else {
        const streamParam = searchParams.get("stream");
        const streamName = streamParam
          ? (streamIdToName[streamParam] ?? streamParam)
          : null;
        if (streamName?.trim()) {
          setFilters((prev) => ({
            ...prev,
            streams: prev.streams.includes(streamName) ? prev.streams : [streamName],
          }));
          fetchCoursesByName("");
        } else {
          fetchCoursesByName("", 0);
        }
      }
      setUrlParamsInitialized(true);
    }
  }, [searchParams, urlParamsInitialized, fetchCoursesByName]);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Trigger backend search whenever the user types in the search box.
  // This keeps the payload driven primarily by `courseName`, as required.
  useEffect(() => {
    const timeout = setTimeout(() => {
      // When search is empty, backend returns "all courses" (no courseName filter)
      fetchCoursesByName(searchQuery, 0);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery, fetchCoursesByName]);

  const applyFilters = useCallback(() => {
    // Use only API-backed courses. No mock fallback.
    let list = [...apiCourses];

    // Stream
    if (filters.streams.length > 0) {
      list = list.filter((course) => filters.streams.includes(course.stream));
    }

    // Degree
    if (filters.degrees.length > 0) {
      list = list.filter((course) => filters.degrees.includes(course.degree));
    }

    // Course Type
    if (filters.courseTypes.length > 0) {
      list = list.filter((course) => filters.courseTypes.includes(course.courseType));
    }

    // Twinning
    if (filters.twinning !== null) {
      list = list.filter((course) => course.twinning === filters.twinning);
    }

    // Education Level
    if (filters.educationLevels.length > 0) {
      list = list.filter((course) => filters.educationLevels.includes(course.educationLevel));
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "featured":
          if (a.isFeatured === b.isFeatured) {
            return b.rating - a.rating;
          }
          return a.isFeatured ? -1 : 1;
        case "direct-admission":
          if (a.hasDirectAdmission === b.hasDirectAdmission) {
            return b.rating - a.rating;
          }
          return a.hasDirectAdmission ? -1 : 1;
        case "application-open":
          if (a.applicationStatus === b.applicationStatus) {
            return b.rating - a.rating;
          }
          return a.applicationStatus === "Application Open" ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredCourses(list);
  }, [filters, sortBy, apiCourses]);

  // Debounced filter application
  useEffect(() => {
    const timeout = setTimeout(() => applyFilters(), 300);
    return () => clearTimeout(timeout);
  }, [applyFilters]);

  // When filters are active we fetched all pages and merged; paginate that list client-side
  const useClientSidePagination = hasActiveApiFilters && apiCourses.length > 0;
  const displayedCourses = useMemo(() => {
    if (!useClientSidePagination) return filteredCourses;
    const start = currentPage * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [useClientSidePagination, filteredCourses, currentPage]);
  const totalPages = useMemo(() => {
    if (useClientSidePagination) return Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
    return Math.max(1, Math.ceil((apiTotalCount ?? 0) / PAGE_SIZE));
  }, [useClientSidePagination, filteredCourses.length, apiTotalCount]);
  const displayCount = useClientSidePagination ? filteredCourses.length : (apiTotalCount ?? filteredCourses.length);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.streams.length > 0) count++;
    if (filters.degrees.length > 0) count++;
    if (filters.courseTypes.length > 0) count++;
    if (filters.educationLevels.length > 0) count++;
    if (filters.twinning !== null) count++;
    return count;
  }, [filters]);

  // Restore scroll position after filter updates
  React.useLayoutEffect(() => {
    if (filterSidebarRef.current && filterSidebarScrollRef.current > 0) {
      filterSidebarRef.current.scrollTop = filterSidebarScrollRef.current;
    }
  });

  const handleMultiSelect = <K extends keyof FilterState>(key: K, value: FilterState[K] extends (infer U)[] ? U : never) => {
    // Save current scroll position before state update
    const filterSidebar = document.querySelector('.filter-sidebar-container') as HTMLElement;
    if (filterSidebar) {
      filterSidebarScrollRef.current = filterSidebar.scrollTop;
    }

    setFilters((prev) => {
      const current = prev[key] as unknown as string[];
      const v = value as unknown as string;
      const next = current.includes(v) ? current.filter((i) => i !== v) : [...current, v];
      return { ...prev, [key]: next as FilterState[K] };
    });
  };

  const handleTwinningToggle = (value: boolean | null) => {
    // Save current scroll position before state update
    const filterSidebar = document.querySelector('.filter-sidebar-container') as HTMLElement;
    if (filterSidebar) {
      filterSidebarScrollRef.current = filterSidebar.scrollTop;
    }

    setFilters((prev) => ({
      ...prev,
      twinning: value,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };

  const FilterGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 space-y-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full"
        >
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
        {isExpanded && children}
      </div>
    );
  };

  const MultiCheckbox: React.FC<{
    options: string[];
    selected: string[];
    onChange: (value: string) => void;
  }> = ({ options, selected, onChange }) => (
    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer group">
          <Checkbox
            checked={selected.includes(option)}
            onCheckedChange={() => onChange(option)}
            className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <span className="text-sm text-gray-700 group-hover:text-blue-700">{option}</span>
        </label>
      ))}
    </div>
  );

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const handleViewDetails = () => {
      // Navigate to course details page backed by course details API
      router.push(`/course-details/${course.id}`);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col gap-3"
      >
        <div className="flex-1 flex flex-col gap-3">
          {/* Title & stream (from API) */}
          <div className="flex flex-col gap-1">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {course.title}
            </h3>
            <p className="text-xs text-blue-700 font-medium">
              {course.stream}
            </p>
          </div>

          {/* Degree types (from degree_types) */}
          {course.degreeTypes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {course.degreeTypes.map((deg) => (
                <span
                  key={deg}
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-800 border border-blue-100"
                >
                  {deg}
                </span>
              ))}
            </div>
          )}

          {/* Average fee and salary (from average_fee, average_salary) */}
          {(course.averageFee || course.averageSalary) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              {course.averageFee && (
                <div>
                  <p className="text-[11px] uppercase text-gray-500 font-semibold tracking-wide">
                    Average Fee
                  </p>
                  <p className="font-medium text-gray-900">
                    {Object.values(course.averageFee)[0]}
                  </p>
                </div>
              )}
              {course.averageSalary && (
                <div>
                  <p className="text-[11px] uppercase text-gray-500 font-semibold tracking-wide">
                    Average Salary
                  </p>
                  <p className="font-medium text-gray-900">
                    {Object.values(course.averageSalary)[0]}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Entrance exams (from entrance_exams) */}
          {course.entranceExams && course.entranceExams.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] uppercase text-gray-500 font-semibold tracking-wide mr-1">
                Entrance Exams:
              </span>
              {course.entranceExams.slice(0, 4).map((exam) => (
                <span
                  key={exam}
                  className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700 border border-gray-200"
                >
                  {exam}
                </span>
              ))}
              {course.entranceExams.length > 4 && (
                <span className="text-[11px] text-gray-500">
                  +{course.entranceExams.length - 4} more
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="h-9 px-4 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleViewDetails}
              >
                View Details
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-9 px-4 text-xs font-medium border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900"
              >
                <FileDown className="w-3.5 h-3.5 mr-1" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50/60 to-blue-100/40 pt-20">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-blue-200 sticky top-20 z-30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-blue-700">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-2 h-2 mx-2 text-blue-600" />
            <span className="text-blue-900 font-medium">List of Courses in India</span>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-emerald-600 to-cyan-500">
        <div className="relative container mx-auto px-4 py-8 md:py-10 lg:py-12">
          <div className="max-w-3xl text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
              Explore Engineering Courses Across India
            </h1>
            <p className="mt-3 text-sm md:text-base text-blue-100">
              Discover, filter, and compare engineering programs by stream, degree, course type, and education level.
              Find the right course that matches your career goals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          {!isMobile && (
            <aside
              ref={filterSidebarRef}
              className="filter-sidebar-container w-full md:w-80 bg-white border border-gray-200 rounded-3xl p-6 min-h-[680px] max-h-[calc(100vh-40px)] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:!text-white hover:bg-blue-600 transition-colors"
                >
                  Reset All
                </Button>
              </div>

              <div className="space-y-4 text-sm">
                <FilterGroup title="Stream">
                  <MultiCheckbox
                    options={facetStreams}
                    selected={filters.streams}
                    onChange={(value) => handleMultiSelect("streams", value)}
                  />
                </FilterGroup>

                <FilterGroup title="Degree">
                  <MultiCheckbox
                    options={facetDegrees}
                    selected={filters.degrees}
                    onChange={(value) => handleMultiSelect("degrees", value)}
                  />
                </FilterGroup>

                <FilterGroup title="Course Type">
                  <MultiCheckbox
                    options={facetCourseTypes}
                    selected={filters.courseTypes as string[]}
                    onChange={(value) =>
                      handleMultiSelect("courseTypes", value as CourseType)
                    }
                  />
                </FilterGroup>

                <FilterGroup title="Twinning Programs">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={filters.twinning === true}
                        onCheckedChange={() =>
                          handleTwinningToggle(filters.twinning === true ? null : true)
                        }
                        className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm text-gray-700">Only twinning programs</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={filters.twinning === false}
                        onCheckedChange={() =>
                          handleTwinningToggle(filters.twinning === false ? null : false)
                        }
                        className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm text-gray-700">Exclude twinning programs</span>
                    </label>
                  </div>
                </FilterGroup>

                <FilterGroup title="Education Level">
                  <MultiCheckbox
                    options={facetEducationLevels}
                    selected={filters.educationLevels as string[]}
                    onChange={(value) =>
                      handleMultiSelect("educationLevels", value as EducationLevel)
                    }
                  />
                </FilterGroup>
              </div>
            </aside>
          )}

          {/* Filter Sheet - Mobile */}
          {isMobile && (
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mb-4 border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={() => setIsFilterSheetOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[400px] overflow-y-auto h-[100dvh] min-h-[100vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="filter-sidebar-container mt-6 space-y-4 text-sm">
                  <FilterGroup title="Stream">
                    <MultiCheckbox
                      options={facetStreams}
                      selected={filters.streams}
                      onChange={(value) => handleMultiSelect("streams", value)}
                    />
                  </FilterGroup>
                  <FilterGroup title="Degree">
                    <MultiCheckbox
                      options={facetDegrees}
                      selected={filters.degrees}
                      onChange={(value) => handleMultiSelect("degrees", value)}
                    />
                  </FilterGroup>
                  <FilterGroup title="Course Type">
                    <MultiCheckbox
                      options={facetCourseTypes}
                      selected={filters.courseTypes as string[]}
                      onChange={(value) =>
                        handleMultiSelect("courseTypes", value as CourseType)
                      }
                    />
                  </FilterGroup>
                  <FilterGroup title="Twinning Programs">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.twinning === true}
                          onCheckedChange={() =>
                            handleTwinningToggle(filters.twinning === true ? null : true)
                          }
                          className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-gray-700">Only twinning programs</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.twinning === false}
                          onCheckedChange={() =>
                            handleTwinningToggle(filters.twinning === false ? null : false)
                          }
                          className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-gray-700">Exclude twinning programs</span>
                      </label>
                    </div>
                  </FilterGroup>
                  <FilterGroup title="Education Level">
                    <MultiCheckbox
                      options={facetEducationLevels}
                      selected={filters.educationLevels as string[]}
                      onChange={(value) =>
                        handleMultiSelect("educationLevels", value as EducationLevel)
                      }
                    />
                  </FilterGroup>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="w-full mt-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    Reset All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Results Section */}
          <section className="flex-1 bg-white rounded-2xl p-5 md:p-6 border border-blue-100">
            {/* Search + Sort */}
            <div className="bg-white rounded-xl border border-blue-100 p-4 mb-5 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
                  <Input
                    placeholder="Search courses, institutions or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-56 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="border-blue-200">
                      <SelectItem value="featured" className="focus:bg-blue-50 focus:text-black hover:text-black">
                        Featured Courses
                      </SelectItem>
                      <SelectItem value="a-z" className="focus:bg-blue-50 focus:text-black hover:text-black">
                        A to Z
                      </SelectItem>
                      <SelectItem value="z-a" className="focus:bg-blue-50 focus:text-black hover:text-black">
                        Z to A
                      </SelectItem>
                      <SelectItem value="direct-admission" className="focus:bg-blue-50 focus:text-black hover:text-black">
                        Direct Admission
                      </SelectItem>
                      <SelectItem value="application-open" className="focus:bg-blue-50 focus:text-black hover:text-black">
                        Application Open / Entrance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {isMobile && (
                    <Button
                      variant="outline"
                      className="md:hidden border-blue-300 text-blue-700 hover:bg-blue-50"
                      onClick={() => setIsFilterSheetOpen(true)}
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters + Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
              <div className="space-y-0.5">
                <p className="text-sm text-blue-800">
                  {displayCount}{" "}
                  {displayCount === 1 ? "course" : "courses"} found
                </p>
                {displayCount > 0 && (
                  <p className="text-xs text-blue-700">
                    Page <span className="font-semibold">{currentPage + 1}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </p>
                )}
                {isLoading && (
                  <p className="text-xs text-blue-600">
                    Searching courses…
                  </p>
                )}
                {!isLoading && apiError && (
                  <p className="text-xs text-red-600">
                    {apiError}
                  </p>
                )}
              </div>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:!text-white hover:bg-blue-600 transition-colors"
                >
                  Clear all filters
                </Button>
              )}
            </div>

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.streams.map((s) => (
                  <Badge
                    key={s}
                    className="gap-1 bg-blue-50 text-blue-900 border-blue-300 hover:bg-blue-100"
                  >
                    {s}
                  </Badge>
                ))}
                {filters.degrees.map((d) => (
                  <Badge
                    key={d}
                    className="gap-1 bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                  >
                    {d}
                  </Badge>
                ))}
                {filters.courseTypes.map((ct) => (
                  <Badge
                    key={ct}
                    className="gap-1 bg-violet-50 text-violet-900 border-violet-300 hover:bg-violet-100"
                  >
                    {ct}
                  </Badge>
                ))}
                {filters.educationLevels.map((el) => (
                  <Badge
                    key={el}
                    className="gap-1 bg-gray-50 text-gray-900 border-gray-300 hover:bg-gray-100"
                  >
                    {el}
                  </Badge>
                ))}
                {filters.twinning !== null && (
                  <Badge className="gap-1 bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100">
                    {filters.twinning ? "Twinning Only" : "Non-twinning Only"}
                  </Badge>
                )}
              </div>
            )}

            {/* Course Cards */}
            <AnimatePresence>
              <div className="space-y-4">
                {displayedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </AnimatePresence>

            {/* Pagination */}
            {displayCount > PAGE_SIZE && (() => {
              const getPageNumbers = () => {
                const delta = 2;
                const range: number[] = [];
                const rangeWithDots: (number | "ellipsis")[] = [];
                for (let i = Math.max(0, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
                  range.push(i);
                }
                if (range[0] > 0) {
                  rangeWithDots.push(0);
                  if (range[0] > 1) rangeWithDots.push("ellipsis");
                }
                rangeWithDots.push(...range);
                if (range[range.length - 1] < totalPages - 1) {
                  if (range[range.length - 1] < totalPages - 2) rangeWithDots.push("ellipsis");
                  rangeWithDots.push(totalPages - 1);
                }
                return rangeWithDots;
              };
              const pageNumbers = getPageNumbers();
              const showStart = currentPage * PAGE_SIZE + 1;
              const showEnd = useClientSidePagination
                ? Math.min((currentPage + 1) * PAGE_SIZE, filteredCourses.length)
                : Math.min((currentPage + 1) * PAGE_SIZE, apiTotalCount ?? 0);
              return (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pb-6 gap-2 sm:gap-0">
                  <p className="text-xs text-blue-700">
                    Showing{" "}
                    <span className="font-semibold">{showStart}</span> -{" "}
                    <span className="font-semibold">{showEnd}</span> of{" "}
                    <span className="font-semibold">{displayCount}</span> courses
                  </p>
                  <div className="flex flex-wrap items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 0 || isLoading}
                      onClick={() => {
                        if (currentPage > 0) {
                          if (useClientSidePagination) setCurrentPage((p) => p - 1);
                          else fetchCoursesByName(searchQuery, currentPage - 1);
                        }
                      }}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 active:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </Button>
                    {pageNumbers.map((p, i) =>
                      p === "ellipsis" ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-blue-600">…</span>
                      ) : (
                        <Button
                          key={p}
                          variant={currentPage === p ? "default" : "outline"}
                          size="sm"
                          disabled={isLoading}
                          onClick={() => {
                            if (useClientSidePagination) setCurrentPage(p);
                            else fetchCoursesByName(searchQuery, p);
                          }}
                          className={
                            currentPage === p
                              ? "bg-blue-600 text-white hover:bg-blue-700 min-w-[2rem]"
                              : "border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 min-w-[2rem]"
                          }
                        >
                          {p + 1}
                        </Button>
                      )
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isLoading || currentPage + 1 >= totalPages}
                      onClick={() => {
                        if (currentPage + 1 < totalPages) {
                          if (useClientSidePagination) setCurrentPage((p) => p + 1);
                          else fetchCoursesByName(searchQuery, currentPage + 1);
                        }
                      }}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 active:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              );
            })()}

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg font-semibold text-blue-900 mb-2">No courses found</p>
                <p className="text-sm text-blue-700 mb-4">
                  Try adjusting your filters or search query to see more results.
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-blue-300 text-blue-700 hover:!text-white hover:bg-blue-600 transition-colors"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default CourseListing;


