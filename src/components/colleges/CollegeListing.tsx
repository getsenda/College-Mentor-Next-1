"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Home,
  ChevronRight,
  ChevronLeft,
  Star,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  Users,
  Download,
  Share2,
  Heart,
  FileText,
  TrendingUp,
  BookOpen,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "../figma/FallBack";
import heroBgImage from "../../../public/assets/colleges-hero-indian-students.jpg";
import {
  collegeService,
  IntermediateCollegeSearchPayload,
  IntermediateCollegeSearchResult,
  CollegeFacetsResponse,
  CollegeFacetsPayload,
} from "@/services/collegeService";
import { logger } from "@/utils/logger";

const PAGE_SIZE = 20;
const DEFAULT_SORT_BY = "collegeName_asc";

// Filter options are fetched from /api/college/facets/filters (empty payload returns all)

// UI model for college listing, derived from intermediate search API result
interface CollegeListItem {
  id: string;
  name: string;
  shortName?: string;
  location: string;
  state?: string;
  city?: string;
  image?: string;
  type?: string;
  ownership?: string;
  nirfRankingLabel?: string;
  rating?: number;
  /** Numeric value used for featured sort (e.g. from priority or nirfScore) */
  ranking?: number;
  fees?: string;
  feesRange?: [number, number];
  placement?: string;
  highestPackage?: string;
  cutoff?: string;
  established?: string;
  studentsCount?: string;
  courses: string[];
  stream?: string;
  degree?: string;
  specialization?: string;
  accreditation?: string;
  collegeCategory?: string;
  instituteType?: string;
  educationMode?: string;
  scholarship?: boolean;
  examsAccepted: string[];
  admissionMode?: string;
  applicationOpen?: boolean;
}

interface FilterState {
  states: string[];
  cities: string[];
  streams: string[];
  courses: string[];
  specializations: string[];
  feeRange: [number, number];
  degrees: string[];
  examsAccepted: string[];
  admissionModes: string[];
  rankings: string[];
  collegeCategories: string[];
  instituteTypes: string[];
  universityTypes: string[];
  nirfScoreFrom?: number;
  nirfScoreTo?: number;
  naacScoreFrom?: number;
  naacScoreTo?: number;
  nirfRanking2025?: string;
  establishedYearFrom?: number;
  establishedYearTo?: number;
}

const initialFilters: FilterState = {
  states: [],
  cities: [],
  streams: [],
  courses: [],
  specializations: [],
  feeRange: [0, 2500000],
  degrees: [],
  examsAccepted: [],
  admissionModes: [],
  rankings: [],
  collegeCategories: [],
  instituteTypes: [],
  universityTypes: [],
};

// Map NAAC display labels to API values (e.g. "NAAC A+" -> "A+")
const naacDisplayToApi: Record<string, string> = {
  "NAAC A++": "A++",
  "NAAC A+": "A+",
  "NAAC A": "A",
  "NAAC B": "B",
  UGC: "UGC",
};

// Stream ID to Name mapping
const streamIdToName: Record<string, string> = {
  "engineering": "Engineering",
  "medical": "Medical",
  "management": "Management",
  "arts": "Arts",
  "science": "Science",
  "law": "Law",
};

export default function CollegeListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [apiColleges, setApiColleges] = useState<CollegeListItem[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<CollegeListItem[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [urlParamsInitialized, setUrlParamsInitialized] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSortFocused, setIsSortFocused] = useState(false);
  const streamScrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const filterSidebarScrollRef = React.useRef<number>(0);
  const [isStreamsExpanded, setIsStreamsExpanded] = useState(false);
  const [showSecondRow, setShowSecondRow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiTotalCount, setApiTotalCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [facets, setFacets] = useState<CollegeFacetsResponse | null>(null);
  const [facetsLoading, setFacetsLoading] = useState(false);

  const palette: any = undefined;

  // Build facets payload dynamically from user selection (no hardcoding)
  const buildFacetsPayload = useCallback((): CollegeFacetsPayload => {
    const payload: CollegeFacetsPayload = {};
    const trimmed = searchQuery.trim();
    if (trimmed) payload.collegeName = trimmed;
    if (filters.states.length > 0) payload.states = filters.states;
    if (filters.cities.length > 0) payload.cities = filters.cities;
    if (filters.streams.length > 0) payload.category = filters.streams.length === 1 ? filters.streams[0] : filters.streams;
    if (filters.degrees.length > 0) payload.degreeNames = filters.degrees;
    if (filters.specializations.length > 0) payload.specializations = filters.specializations;
    if (filters.examsAccepted.length > 0) payload.entranceTests = filters.examsAccepted;
    if (filters.universityTypes.length > 0) payload.institutionType = filters.universityTypes.length === 1 ? filters.universityTypes[0] : filters.universityTypes;
    const naacApi = filters.rankings.length > 0 ? naacDisplayToApi[filters.rankings[0]] ?? filters.rankings[0] : undefined;
    if (naacApi) payload.naacAccreditation = naacApi;
    if (filters.naacScoreFrom != null) payload.naacScoreFrom = filters.naacScoreFrom;
    if (filters.naacScoreTo != null) payload.naacScoreTo = filters.naacScoreTo;
    if (filters.nirfRanking2025) payload.nirfRanking2025 = filters.nirfRanking2025;
    if (filters.nirfScoreFrom != null) payload.nirfScoreFrom = filters.nirfScoreFrom;
    if (filters.nirfScoreTo != null) payload.nirfScoreTo = filters.nirfScoreTo;
    if (filters.establishedYearFrom != null) payload.establishedYearFrom = filters.establishedYearFrom;
    if (filters.establishedYearTo != null) payload.establishedYearTo = filters.establishedYearTo;
    return payload;
  }, [searchQuery, filters]);

  // Fetch facets when filters/search change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setFacetsLoading(true);
      const payload = buildFacetsPayload();
      const res = await collegeService.getCollegeFacets(payload);
      setFacets(res ?? null);
      setFacetsLoading(false);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [buildFacetsPayload]);

  // Extract string[] from facet options (supports string | { value, count })
  const facetToStrings = useCallback(
    (opts: (string | { value: string; count?: number })[] | undefined): string[] => {
      if (!opts || !Array.isArray(opts)) return [];
      return Array.from(new Set(opts.map((o) => (typeof o === "string" ? o : o.value))));
    },
    []
  );

  const hexToRgba = (hex: string, alpha: number) => {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Map intermediate search result into UI model
  const mapIntermediateResultToCollege = useCallback(
    (item: IntermediateCollegeSearchResult): CollegeListItem => {
      return {
        id: String(item.id),
        name: item.collegeName,
        location: item.location || "",
        state: item.state || undefined,
        city: item.city || undefined,
        // No logo in API payload yet
        image: undefined,
        type: item.institutionType || undefined,
        ownership: item.institutionType || undefined,
        nirfRankingLabel: item.nirfRanking2025 || undefined,
        rating: undefined,
        ranking: item.priority ?? item.nirfScore ?? undefined,
        fees: item.fees || undefined,
        // Fee range not directly available – keep optional
        feesRange: undefined,
        placement: item.averagePackage2025 || undefined,
        highestPackage: item.highestPackage2025 || undefined,
        cutoff: item.cutoff || undefined,
        established: item.establishedYear ? String(item.establishedYear) : undefined,
        studentsCount: undefined,
        courses: item.topCourses || [],
        stream: item.category || undefined,
        degree: undefined,
        specialization: undefined,
        accreditation: item.naacAccreditation || undefined,
        collegeCategory: undefined,
        instituteType: undefined,
        educationMode: undefined,
        scholarship: undefined,
        examsAccepted: item.examsAccepted || [],
        admissionMode: undefined,
        applicationOpen: undefined,
      };
    },
    []
  );

  // When any API-backed filter is active, we fetch all pages and paginate client-side
  // so filtered results appear together instead of scattered across API pages.
  const hasActiveApiFilters =
    filters.streams.length > 0 ||
    filters.degrees.length > 0 ||
    filters.states.length > 0 ||
    filters.cities.length > 0 ||
    filters.specializations.length > 0 ||
    filters.examsAccepted.length > 0 ||
    filters.universityTypes.length > 0 ||
    filters.rankings.length > 0 ||
    filters.naacScoreFrom != null ||
    filters.naacScoreTo != null ||
    filters.nirfRanking2025 != null ||
    filters.nirfScoreFrom != null ||
    filters.nirfScoreTo != null ||
    filters.establishedYearFrom != null ||
    filters.establishedYearTo != null;

  const fetchColleges = useCallback(
    async (collegeName: string, page: number = 0) => {
      setIsLoading(true);
      setApiError(null);

      const buildPayload = (p: number): IntermediateCollegeSearchPayload => {
        const pl: IntermediateCollegeSearchPayload = {
          page: p,
          size: PAGE_SIZE,
          sortBy: DEFAULT_SORT_BY,
        };
        const trimmed = collegeName.trim();
        if (trimmed) pl.collegeName = trimmed;
        if (filters.states.length > 0) pl.states = filters.states;
        if (filters.cities.length > 0) pl.cities = filters.cities;
        if (filters.streams.length > 0) pl.category = filters.streams.length === 1 ? filters.streams[0] : filters.streams;
        if (filters.degrees.length > 0) pl.degreeNames = filters.degrees;
        if (filters.specializations.length > 0) pl.specializations = filters.specializations;
        if (filters.examsAccepted.length > 0) pl.entranceTests = filters.examsAccepted;
        if (filters.universityTypes.length > 0) pl.institutionType = filters.universityTypes.length === 1 ? filters.universityTypes[0] : filters.universityTypes;
        const naacVal = filters.rankings.length > 0 ? naacDisplayToApi[filters.rankings[0]] ?? filters.rankings[0] : undefined;
        if (naacVal) pl.naacAccreditation = naacVal;
        if (filters.naacScoreFrom != null) pl.naacScoreFrom = filters.naacScoreFrom;
        if (filters.naacScoreTo != null) pl.naacScoreTo = filters.naacScoreTo;
        if (filters.nirfRanking2025) pl.nirfRanking2025 = filters.nirfRanking2025;
        if (filters.nirfScoreFrom != null) pl.nirfScoreFrom = filters.nirfScoreFrom;
        if (filters.nirfScoreTo != null) pl.nirfScoreTo = filters.nirfScoreTo;
        if (filters.establishedYearFrom != null) pl.establishedYearFrom = filters.establishedYearFrom;
        if (filters.establishedYearTo != null) pl.establishedYearTo = filters.establishedYearTo;
        return pl;
      };

      try {
        const payload = buildPayload(page);
        logger.log(
          "🔍 Fetching colleges from /college/intermediate/searchCollege",
          payload
        );

        const res = await collegeService.searchIntermediateColleges(payload);

        if (!res || !Array.isArray(res.results)) {
          logger.warn(
            "⚠️ No results from collegeService.searchIntermediateColleges for payload:",
            payload
          );
          setApiColleges([]);
          setFilteredColleges([]);
          setApiTotalCount(0);
          setCurrentPage(0);
          return;
        }

        const totalCount = typeof res.count === "number" ? res.count : res.results.length;
        let allMapped = res.results.map(mapIntermediateResultToCollege);

        // When filters are active, fetch all pages and merge so filtered colleges appear on consecutive pages
        if (hasActiveApiFilters && totalCount > PAGE_SIZE) {
          const totalPages = Math.ceil(totalCount / PAGE_SIZE);
          for (let p = 1; p < totalPages; p++) {
            const nextRes = await collegeService.searchIntermediateColleges(buildPayload(p));
            if (nextRes?.results?.length) {
              allMapped = allMapped.concat(nextRes.results.map(mapIntermediateResultToCollege));
            }
          }
        }

        setApiColleges(allMapped);
        setApiTotalCount(totalCount);
        setCurrentPage(0);
      } catch (error: any) {
        logger.error(
          "🔴 Failed to fetch colleges from /college/intermediate/searchCollege:",
          error
        );
        setApiError(error?.message || "Failed to fetch colleges");
        setApiColleges([]);
        setFilteredColleges([]);
        setApiTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    },
    [
      hasActiveApiFilters,
      filters.states,
      filters.cities,
      filters.streams,
      filters.degrees,
      filters.specializations,
      filters.examsAccepted,
      filters.universityTypes,
      filters.rankings,
      filters.naacScoreFrom,
      filters.naacScoreTo,
      filters.nirfRanking2025,
      filters.nirfScoreFrom,
      filters.nirfScoreTo,
      filters.establishedYearFrom,
      filters.establishedYearTo,
      mapIntermediateResultToCollege,
    ]
  );

  // Initialize filters from URL parameters only once on mount
  useEffect(() => {
    if (!urlParamsInitialized) {
      const streamParam = searchParams.get("stream");
      if (streamParam && streamIdToName[streamParam]) {
        const streamName = streamIdToName[streamParam];
        setFilters((prev) => {
          if (!prev.streams.includes(streamName)) {
            return {
              ...prev,
              streams: [streamName],
            };
          }
          return prev;
        });
      }
      setUrlParamsInitialized(true);
    }
  }, [searchParams, urlParamsInitialized]);

  // Trigger backend search whenever the user types in the search box.
  // This keeps the payload driven primarily by `collegeName`, as required.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchColleges(searchQuery, 0);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [fetchColleges, searchQuery]);

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check scroll position for stream chips arrows
  const checkStreamScroll = useCallback(() => {
    if (streamScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = streamScrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    // Initial check after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      checkStreamScroll();
    }, 100);

    const scrollElement = streamScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkStreamScroll);
      window.addEventListener("resize", checkStreamScroll);
      return () => {
        clearTimeout(timer);
        scrollElement.removeEventListener("scroll", checkStreamScroll);
        window.removeEventListener("resize", checkStreamScroll);
      };
    }
    return () => clearTimeout(timer);
  }, [checkStreamScroll]);

  const scrollStreams = (direction: "left" | "right") => {
    if (streamScrollRef.current) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? streamScrollRef.current.scrollLeft - scrollAmount
          : streamScrollRef.current.scrollLeft + scrollAmount;
      streamScrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...apiColleges];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.courses.some((c) => c.toLowerCase().includes(query))
      );
    }

    // State filter
    if (filters.states.length > 0) {
      filtered = filtered.filter((college) => college.state && filters.states.includes(college.state));
    }

    // City filter
    if (filters.cities.length > 0) {
      filtered = filtered.filter((college) => college.city && filters.cities.includes(college.city));
    }

    // Stream filter
    if (filters.streams.length > 0) {
      filtered = filtered.filter((college) => college.stream && filters.streams.includes(college.stream));
    }

    // Course filter
    if (filters.courses.length > 0) {
      filtered = filtered.filter((college) =>
        college.courses.some((c) => filters.courses.includes(c))
      );
    }

    // Specialization filter
    if (filters.specializations.length > 0) {
      filtered = filtered.filter((college) => college.specialization && filters.specializations.includes(college.specialization));
    }

    // Fee range filter
    // Not applied for API-backed data as numeric range is not available

    // University Types filter
    if (filters.universityTypes.length > 0) {
      filtered = filtered.filter((college) => {
        // Map college ownership/type to university types
        const collegeType = college.ownership || college.type || '';
        return filters.universityTypes.some((ut) => {
          const utLower = ut.toLowerCase();
          const collegeTypeLower = collegeType.toLowerCase();
          return collegeTypeLower.includes(utLower) ||
            (ut === 'Central' && college.collegeCategory && ['IIT', 'NIT', 'IISER'].includes(college.collegeCategory)) ||
            (ut === 'State Public' && collegeTypeLower.includes('government') && !college.collegeCategory) ||
            (ut === 'State private' && collegeTypeLower.includes('private') && college.state) ||
            (ut === 'Deemed private' && collegeTypeLower.includes('deemed') && collegeTypeLower.includes('private')) ||
            (ut === 'Deemed Government' && collegeTypeLower.includes('deemed') && collegeTypeLower.includes('government'));
        });
      });
    }

    // Degree filter
    if (filters.degrees.length > 0) {
      filtered = filtered.filter((college) => college.degree && filters.degrees.includes(college.degree));
    }

    // Exam accepted filter
    if (filters.examsAccepted.length > 0) {
      filtered = filtered.filter((college) => college.examsAccepted &&
        college.examsAccepted.some((exam) => filters.examsAccepted.includes(exam))
      );
    }

    // Admission mode filter
    if (filters.admissionModes.length > 0) {
      filtered = filtered.filter((college) => college.admissionMode &&
        filters.admissionModes.includes(college.admissionMode)
      );
    }

    // College category filter
    if (filters.collegeCategories.length > 0) {
      filtered = filtered.filter((college) => college.collegeCategory &&
        filters.collegeCategories.includes(college.collegeCategory)
      );
    }

    // Institute type filter
    if (filters.instituteTypes.length > 0) {
      filtered = filtered.filter((college) => college.instituteType &&
        filters.instituteTypes.includes(college.instituteType)
      );
    }

    // Sort
    switch (sortBy) {
      case "a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
        filtered.sort((a, b) => (b.ranking ?? 0) - (a.ranking ?? 0));
        break;
      case "direct-admission":
        // Sort by direct admission availability (mock)
        break;
      default:
        break;
    }

    setFilteredColleges(filtered);
  }, [apiColleges, filters, searchQuery, sortBy]);

  // Debounced filter update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  // When filters are active we fetched all pages and merged; paginate that list client-side
  const useClientSidePagination = hasActiveApiFilters && apiColleges.length > 0;
  const displayedColleges = useMemo(() => {
    if (!useClientSidePagination) return filteredColleges;
    const start = currentPage * PAGE_SIZE;
    return filteredColleges.slice(start, start + PAGE_SIZE);
  }, [useClientSidePagination, filteredColleges, currentPage]);
  const totalPages = useMemo(() => {
    if (useClientSidePagination) return Math.max(1, Math.ceil(filteredColleges.length / PAGE_SIZE));
    return Math.max(1, Math.ceil((apiTotalCount ?? 0) / PAGE_SIZE));
  }, [useClientSidePagination, filteredColleges.length, apiTotalCount]);
  const displayCount = useClientSidePagination ? filteredColleges.length : (apiTotalCount ?? filteredColleges.length);

  // Facet-driven options: from /api/college/facets/filters (no hardcoded fallbacks)
  const facetStates = useMemo(() => facetToStrings(facets?.states), [facets?.states, facetToStrings]);
  const facetCities = useMemo(() => facetToStrings(facets?.cities), [facets?.cities, facetToStrings]);
  const facetStreams = useMemo(
    () => facetToStrings(facets?.streams ?? facets?.categories),
    [facets?.streams, facets?.categories, facetToStrings]
  );
  const facetDegrees = useMemo(() => facetToStrings(facets?.degreeNames), [facets?.degreeNames, facetToStrings]);
  const facetSpecializations = useMemo(() => facetToStrings(facets?.specializations), [facets?.specializations, facetToStrings]);
  const facetExams = useMemo(() => facetToStrings(facets?.entranceTests), [facets?.entranceTests, facetToStrings]);
  const facetInstitutionTypes = useMemo(() => facetToStrings(facets?.institutionTypes), [facets?.institutionTypes, facetToStrings]);
  const facetNaac = useMemo(() => facetToStrings(facets?.naacAccreditations), [facets?.naacAccreditations, facetToStrings]);

  const availableStates = useMemo(() => facetStates, [facetStates]);
  const availableCities = useMemo(() => facetCities, [facetCities]);
  const availableStreams = useMemo(() => facetStreams, [facetStreams]);

  const availableCourses = useMemo(() => {
    const opts = facetDegrees;
    const sel = filters.courses.filter((c) => opts.includes(c));
    const other = opts.filter((c) => !filters.courses.includes(c));
    return [...sel, ...other];
  }, [facetDegrees, filters.courses]);

  const availableSpecializations = useMemo(() => {
    const opts = facetSpecializations;
    const sel = filters.specializations.filter((s) => opts.includes(s));
    const other = opts.filter((s) => !filters.specializations.includes(s));
    return [...sel, ...other];
  }, [facetSpecializations, filters.specializations]);

  const availableDegrees = useMemo(() => {
    const opts = facetDegrees;
    const sel = filters.degrees.filter((d) => opts.includes(d));
    const other = opts.filter((d) => !filters.degrees.includes(d));
    return [...sel, ...other];
  }, [facetDegrees, filters.degrees]);

  const availableUniversityTypes = useMemo(() => facetInstitutionTypes, [facetInstitutionTypes]);
  const availableEntranceExams = useMemo(() => facetExams, [facetExams]);

  const availableNaacOptions = useMemo(() => {
    if (facetNaac.length === 0) return [];
    const options = facetNaac.map((v) => {
      const display = Object.entries(naacDisplayToApi).find(([, api]) => api === v);
      return display ? display[0] : (v.startsWith("NAAC ") ? v : `NAAC ${v}`);
    });
    return Array.from(new Set(options));
  }, [facetNaac]);

  const locationsWithCounts = useMemo(() => {
    const locationMap = new Map<string, number>();
    [...facetStates, ...facetCities].forEach((loc) => {
      const count = apiColleges.filter(
        (c) => c.state === loc || c.city === loc
      ).length;
      locationMap.set(loc, count);
    });
    return Array.from(locationMap.entries())
      .sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : a[0].localeCompare(b[0])))
      .map(([loc]) => loc);
  }, [apiColleges, facetStates, facetCities]);

  // Get count for a location
  const getLocationCount = useCallback((location: string): number => {
    return apiColleges.filter(
      (college) => college.state === location || college.city === location
    ).length;
  }, [apiColleges]);

  const handleFilterChange = (filterKey: keyof FilterState, value: any) => {
    // Save current scroll position before state update
    const filterSidebar = document.querySelector('.filter-sidebar-container') as HTMLElement;
    if (filterSidebar) {
      filterSidebarScrollRef.current = filterSidebar.scrollTop;
    }

    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const handleMultiSelect = (filterKey: keyof FilterState, value: string) => {
    // Save current scroll position before state update
    const filterSidebar = document.querySelector('.filter-sidebar-container') as HTMLElement;
    if (filterSidebar) {
      filterSidebarScrollRef.current = filterSidebar.scrollTop;
    }

    setFilters((prev) => {
      const current = prev[filterKey] as string[];
      const newValue = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [filterKey]: newValue };
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.states.length > 0) count++;
    if (filters.cities.length > 0) count++;
    if (filters.degrees.length > 0) count++;
    if (filters.universityTypes.length > 0) count++;
    if (filters.streams.length > 0) count++;
    if (filters.feeRange[0] !== 0 || filters.feeRange[1] !== 2500000) count++;
    if (filters.courses.length > 0 || filters.specializations.length > 0) count++;
    if (filters.rankings.length > 0) count++;
    if (filters.examsAccepted.length > 0 || filters.admissionModes.length > 0) count++;
    if (filters.nirfScoreFrom != null || filters.nirfScoreTo != null) count++;
    if (filters.establishedYearFrom != null || filters.establishedYearTo != null) count++;
    return count;
  }, [filters]);

  const FilterSection = ({
    title,
    children,
    palette,
  }: {
    title: string;
    children: React.ReactNode;
    palette?: { secondary: string; foreground: string; accentSoft: string; accentStrong: string };
  }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div
        className={palette ? "rounded-lg p-4 border space-y-3" : "bg-blue-100 rounded-lg p-4 border border-blue-300 space-y-3"}
        style={palette ? { backgroundColor: palette.accentSoft, borderColor: palette.accentStrong } : undefined}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full"
        >
          <h3
            className={palette ? "text-sm font-semibold font-sans" : "text-sm font-semibold text-gray-900 font-sans"}
            style={palette ? { color: palette.foreground } : undefined}
          >
            {title}
          </h3>
          {isExpanded ? (
            <ChevronUp className={`w-4 h-4 ${palette ? "" : "text-gray-600"}`} style={palette ? { color: palette.foreground } : undefined} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${palette ? "" : "text-gray-600"}`} style={palette ? { color: palette.foreground } : undefined} />
          )}
        </button>
        {isExpanded && children}
      </div>
    );
  };

  const MultiSelectCheckbox = ({
    options,
    selected,
    onChange,
    limit = 5,
    palette,
    showCounts,
    getCount,
  }: {
    options: string[];
    selected: string[];
    onChange: (value: string) => void;
    limit?: number;
    palette?: { secondary: string; foreground: string; accentSoft: string; accentStrong: string };
    showCounts?: boolean;
    getCount?: (option: string) => number;
  }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedOptions = showAll ? options : options.slice(0, limit);

    return (
      <div className="space-y-2">
        {displayedOptions.map((option) => {
          const count = showCounts && getCount ? getCount(option) : null;
          return (
            <label key={option} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center space-x-2 flex-1">
                <Checkbox
                  checked={selected.includes(option)}
                  onCheckedChange={() => onChange(option)}
                />
                <span
                  className={palette ? "text-sm font-sans" : "text-sm text-gray-700 group-hover:text-primary font-sans"}
                  style={palette ? { color: palette.foreground } : undefined}
                >
                  {option}
                </span>
              </div>
              {count !== null && (
                <span
                  className={`text-xs ${palette ? "" : "text-gray-500"} font-medium`}
                  style={palette ? { color: palette.foreground } : undefined}
                >
                  ({count})
                </span>
              )}
            </label>
          );
        })}
        {options.length > limit && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={palette ? "text-xs hover:underline font-sans" : "text-xs text-primary hover:underline font-sans"}
            style={palette ? { color: palette.accentStrong } : undefined}
          >
            {showAll ? "Show Less" : `Show All (${options.length})`}
          </button>
        )}
      </div>
    );
  };

  const FilterSidebar = () => {
    const [degreeSearch, setDegreeSearch] = useState("");
    const filterSidebarRef = React.useRef<HTMLDivElement>(null);

    const filteredDegrees = degreeSearch
      ? availableDegrees.filter((deg) =>
        deg.toLowerCase().includes(degreeSearch.toLowerCase())
      )
      : availableDegrees;

    // Restore scroll position after filter updates
    React.useLayoutEffect(() => {
      if (filterSidebarRef.current && filterSidebarScrollRef.current > 0) {
        filterSidebarRef.current.scrollTop = filterSidebarScrollRef.current;
      }
    });

    return (
      <div
        ref={filterSidebarRef}
        className="filter-sidebar-container w-full md:w-80 bg-white border border-gray-200 rounded-3xl p-6 overflow-hidden overflow-y-auto min-h-[800px] max-h-[calc(100vh-40px)] font-sans"
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className={palette ? "text-lg font-bold font-sans" : "text-lg font-bold text-gray-900 font-sans"}
            style={palette ? { color: palette.foreground } : undefined}
          >
            Filters
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className={palette ? "text-xs font-sans" : "text-xs text-primary hover:text-white font-sans"}
            style={palette ? { color: palette.accentStrong } : undefined}
          >
            Reset All
          </Button>
        </div>

        <div className="space-y-4">
          {/* State Filters - 1st (facet-driven) */}
          <FilterSection title="State" palette={palette}>
            <MultiSelectCheckbox
              options={availableStates}
              selected={filters.states}
              onChange={(value) => handleMultiSelect("states", value)}
              palette={palette}
              showCounts={true}
              getCount={(state: string) => apiColleges.filter((college) => college.state === state).length}
            />
          </FilterSection>

          {/* City Filters - 2nd (dependent on state) */}
          <FilterSection title="City" palette={palette}>
            <MultiSelectCheckbox
              options={availableCities}
              selected={filters.cities}
              onChange={(value) => handleMultiSelect("cities", value)}
              palette={palette}
              showCounts={true}
              getCount={(city: string) => apiColleges.filter((college) => college.city === city).length}
            />
          </FilterSection>

          {/* Degree Filter - 2nd */}
          <FilterSection title="Degree" palette={palette}>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Search degrees..."
                value={degreeSearch}
                onChange={(e) => setDegreeSearch(e.target.value)}
                className={palette ? "text-sm font-sans" : "text-sm font-sans border-blue-200 focus:border-blue-500 focus:ring-blue-500"}
                style={palette ? { borderColor: palette.accentStrong } : undefined}
              />
              <MultiSelectCheckbox
                options={filteredDegrees}
                selected={filters.degrees}
                onChange={(value) => handleMultiSelect("degrees", value)}
                palette={palette}
              />
            </div>
          </FilterSection>

          {/* Universities Filter - 4th (facet-driven) */}
          <FilterSection title="Universities" palette={palette}>
            <MultiSelectCheckbox
              options={availableUniversityTypes}
              selected={filters.universityTypes}
              onChange={(value) => handleMultiSelect("universityTypes", value)}
              palette={palette}
            />
          </FilterSection>

          {/* NIRF Score Range - facet-aware */}
          <FilterSection title="NIRF Score" palette={palette}>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="From"
                  min={0}
                  max={100}
                  value={filters.nirfScoreFrom ?? ""}
                  onChange={(e) =>
                    handleFilterChange("nirfScoreFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="To"
                  min={0}
                  max={100}
                  value={filters.nirfScoreTo ?? ""}
                  onChange={(e) =>
                    handleFilterChange("nirfScoreTo", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </FilterSection>

          {/* Established Year Range - facet-aware */}
          <FilterSection title="Established Year" palette={palette}>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="From"
                  min={1800}
                  max={2030}
                  value={filters.establishedYearFrom ?? ""}
                  onChange={(e) =>
                    handleFilterChange("establishedYearFrom", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="To"
                  min={1800}
                  max={2030}
                  value={filters.establishedYearTo ?? ""}
                  onChange={(e) =>
                    handleFilterChange("establishedYearTo", e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </FilterSection>

          {/* Fee Range Filter - 7th */}
          <FilterSection title="Fee Range" palette={palette}>
            <div className="space-y-4">
              <Slider
                value={[filters.feeRange[0], filters.feeRange[1]]}
                onValueChange={(value) =>
                  handleFilterChange("feeRange", [value[0], value[1]] as [number, number])
                }
                min={0}
                max={2500000}
                step={50000}
                className="w-full"
              />
              <div
                className={palette ? "flex items-center justify-between text-sm font-sans" : "flex items-center justify-between text-sm text-gray-600 font-sans"}
                style={palette ? { color: palette.foreground } : undefined}
              >
                <span>₹{Math.round(filters.feeRange[0] / 100000)}L</span>
                <span>₹{Math.round(filters.feeRange[1] / 100000)}L</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={Math.round(filters.feeRange[0] / 100000)}
                  onChange={(e) =>
                    handleFilterChange("feeRange", [
                      parseInt(e.target.value) * 100000 || 0,
                      filters.feeRange[1],
                    ] as [number, number])
                  }
                  className={palette ? "text-sm font-sans" : "text-sm font-sans border-blue-200 focus:border-blue-500 focus:ring-blue-500"}
                  style={palette ? { borderColor: palette.accentStrong } : undefined}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={Math.round(filters.feeRange[1] / 100000)}
                  onChange={(e) =>
                    handleFilterChange("feeRange", [
                      filters.feeRange[0],
                      parseInt(e.target.value) * 100000 || 2500000,
                    ] as [number, number])
                  }
                  className={palette ? "text-sm font-sans" : "text-sm font-sans border-blue-200 focus:border-blue-500 focus:ring-blue-500"}
                  style={palette ? { borderColor: palette.accentStrong } : undefined}
                />
              </div>
            </div>
          </FilterSection>

          {/* Courses/Specialization Filter - 7th */}
          <FilterSection title="Courses/Specialization" palette={palette}>
            {filters.degrees.length > 0 ? (
              <>
                {availableCourses.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold mb-2 text-gray-600">Courses</h4>
                    <MultiSelectCheckbox
                      options={availableCourses}
                      selected={filters.courses}
                      onChange={(value) => handleMultiSelect("courses", value)}
                      palette={palette}
                    />
                  </div>
                )}
                {availableSpecializations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold mb-2 text-gray-600">Specializations</h4>
                    <MultiSelectCheckbox
                      options={availableSpecializations}
                      selected={filters.specializations}
                      onChange={(value) => handleMultiSelect("specializations", value)}
                      palette={palette}
                    />
                  </div>
                )}
              </>
            ) : filters.streams.length > 0 ? (
              <>
                {availableCourses.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold mb-2 text-gray-600">Courses</h4>
                    <MultiSelectCheckbox
                      options={availableCourses}
                      selected={filters.courses}
                      onChange={(value) => handleMultiSelect("courses", value)}
                      palette={palette}
                    />
                  </div>
                )}
                {availableSpecializations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold mb-2 text-gray-600">Specializations</h4>
                    <MultiSelectCheckbox
                      options={availableSpecializations}
                      selected={filters.specializations}
                      onChange={(value) => handleMultiSelect("specializations", value)}
                      palette={palette}
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-xs text-gray-500">Select a degree or stream to see available courses and specializations</p>
            )}
          </FilterSection>

          {/* Ranking/Accreditation Filter - 9th (facet-driven) */}
          <FilterSection title="Ranking/Accreditation" palette={palette}>
            <div className="space-y-2">
              {availableNaacOptions.map((acc) => (
                <label key={acc} className="flex items-center space-x-2 cursor-pointer group">
                  <Checkbox
                    checked={filters.rankings.includes(acc)}
                    onCheckedChange={() => handleMultiSelect("rankings", acc)}
                  />
                  <span
                    className={palette ? "text-sm font-sans" : "text-sm text-gray-700 group-hover:text-primary font-sans"}
                    style={palette ? { color: palette.foreground } : undefined}
                  >
                    {acc}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Exam Accepting Filter - 10th (facet-driven) */}
          <FilterSection title="Exam Accepting" palette={palette}>
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-semibold mb-2 text-gray-600">Entrance Exams Accepted</h4>
                <MultiSelectCheckbox
                  options={availableEntranceExams}
                  selected={filters.examsAccepted}
                  onChange={(value) => handleMultiSelect("examsAccepted", value)}
                  palette={palette}
                />
              </div>
              <div>
                <h4 className="text-xs font-semibold mb-2 text-gray-600">Admission Mode</h4>
                <MultiSelectCheckbox
                  options={availableEntranceExams}
                  selected={filters.admissionModes}
                  onChange={(value) => handleMultiSelect("admissionModes", value)}
                  palette={palette}
                />
              </div>
            </div>
          </FilterSection>

        </div>
      </div>
    );
  };

  return (
    <div
      className={palette ? "min-h-screen pt-20" : "min-h-screen bg-gradient-to-b from-blue-50 via-blue-50/50 to-blue-100/30 pt-20"}
      style={palette ? { background: `linear-gradient(to bottom, ${palette.accentSoft}, ${palette.secondary})` } : undefined}
    >
      {/* Header with Navigation */}
      <header className="bg-white border-b border-blue-200 sticky top-20 z-40">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-blue-700">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-2 h-2 mx-2 text-blue-600" />
            <span className="text-blue-900 font-medium">List of Colleges in India</span>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-75"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        />
        {palette ? (
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(palette.accentStrong, 0.30)}, ${hexToRgba(palette.foreground, 0.20)})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-800/40 z-10" />
        )}
        {/* Content */}
        <div className="relative container mx-auto px-4 py-6 md:py-8 lg:py-10 pb-16 md:pb-20 lg:pb-24 z-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 md:space-y-6"
            >
              {/* Main Heading - Split into two lines */}
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                List of Colleges
                <br />
                <span className="text-white">in India</span>
              </h1>

              {/* Subtitle/Description */}
              <p className="text-sm md:text-base lg:text-base text-white leading-relaxed max-w-xl mx-auto font-normal">
                Discover and compare top colleges across India. Find your perfect match with comprehensive rankings, detailed insights, and personalized recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stream Chips Section */}
      <div className="container mx-auto px-4 pt-4 sm:pt-6 pb-2">
        <div className="space-y-2 sm:space-y-3">
          {/* First Row - Responsive tabs + dropdown button */}
          <div className="flex gap-1.5 sm:gap-2 items-center flex-wrap">
            {availableStreams.slice(0, isMobile ? 6 : 11).map((stream) => {
              const isSelected = filters.streams.includes(stream);
              return (
                <button
                  key={stream}
                  onClick={() => handleMultiSelect("streams", stream)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${isSelected
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                >
                  {stream}
                </button>
              );
            })}

            {/* Dropdown Button for remaining streams */}
            {availableStreams.length > (isMobile ? 6 : 11) && (
              <button
                onClick={() => setShowSecondRow(!showSecondRow)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all bg-blue-600 text-white shadow-md hover:bg-blue-700 flex items-center justify-center"
                aria-label="Toggle more streams"
              >
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${showSecondRow ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {/* Second Row - Remaining tabs (toggleable) */}
          {availableStreams.length > (isMobile ? 6 : 11) && showSecondRow && (
            <div className="flex gap-1.5 sm:gap-2 items-center flex-wrap animate-in slide-in-from-top-2 duration-200">
              {availableStreams.slice(isMobile ? 6 : 11).map((stream) => {
                const isSelected = filters.streams.includes(stream);
                return (
                  <button
                    key={stream}
                    onClick={() => handleMultiSelect("streams", stream)}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${isSelected
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                      : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                      }`}
                  >
                    {stream}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          {!isMobile && <FilterSidebar />}

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
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-lg p-3 sm:p-6" style={palette ? { borderColor: palette.accentSoft, borderWidth: 1 } : undefined}>
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-3 sm:p-4 mb-4 sm:mb-6" style={palette ? { borderColor: palette.accentSoft } : undefined}>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative w-full">
                  <div
                    className={palette ? "rounded-md border-2 transition-colors" : ""}
                    style={palette ? {
                      borderColor: isSearchFocused ? palette.accentStrong : palette.accentSoft,
                      borderWidth: '2px'
                    } : undefined}
                  >
                    <Search className={palette ? "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4"} style={palette ? { color: isSearchFocused ? palette.accentStrong : palette.accentStrong } : undefined} />
                    <Input
                      placeholder="Search colleges, courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className={palette ? "pl-10 border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-0 text-sm" : "pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-sm"}
                      style={palette ? {
                        color: palette.foreground,
                        boxShadow: 'none',
                        outline: 'none',
                        border: 'none'
                      } : undefined}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap flex-shrink-0">Sort:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <div
                      className={palette ? "flex-1 rounded-md border-2 transition-colors" : "flex-1"}
                      style={palette ? {
                        borderColor: isSortFocused ? palette.accentStrong : palette.accentSoft,
                        borderWidth: '2px'
                      } : undefined}
                    >
                      <SelectTrigger
                        className={palette ? "w-full border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 text-xs sm:text-sm" : "w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm"}
                        style={palette ? {
                          color: palette.foreground,
                          boxShadow: 'none',
                          outline: 'none',
                          border: 'none'
                        } : undefined}
                        onFocus={() => setIsSortFocused(true)}
                        onBlur={() => setIsSortFocused(false)}
                      >
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                    </div>
                    <SelectContent
                      className={palette ? "border-2" : "border-blue-200"}
                      style={palette ? {
                        borderColor: palette.accentStrong,
                        backgroundColor: '#ffffff',
                        color: palette.foreground
                      } : undefined}
                    >
                      <SelectItem
                        value="featured"
                        className={palette ? "" : "focus:bg-blue-50 focus:text-gray-900 hover:bg-blue-50 hover:text-gray-900 text-xs sm:text-sm"}
                        style={palette ? { color: palette.foreground } : undefined}
                      >
                        Featured
                      </SelectItem>
                      <SelectItem
                        value="a-z"
                        className={palette ? "" : "focus:bg-blue-50 focus:text-gray-900 hover:bg-blue-50 hover:text-gray-900 text-xs sm:text-sm"}
                        style={palette ? { color: palette.foreground } : undefined}
                      >
                        A to Z
                      </SelectItem>
                      <SelectItem
                        value="z-a"
                        className={palette ? "" : "focus:bg-blue-50 focus:text-gray-900 hover:bg-blue-50 hover:text-gray-900 text-xs sm:text-sm"}
                        style={palette ? { color: palette.foreground } : undefined}
                      >
                        Z to A
                      </SelectItem>
                      <SelectItem
                        value="direct-admission"
                        className={palette ? "" : "focus:bg-blue-50 focus:text-gray-900 hover:bg-blue-50 hover:text-gray-900 text-xs sm:text-sm"}
                        style={palette ? { color: palette.foreground } : undefined}
                      >
                        Direct Admission
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {isMobile && (
                    <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 flex-shrink-0">
                          <SlidersHorizontal className="w-4 h-4" />
                          {activeFilterCount > 0 && <span className="ml-1">({activeFilterCount})</span>}
                        </Button>
                      </SheetTrigger>
                    </Sheet>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Count, Pagination info and Active Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1.5 sm:gap-0">
              <div>
                <p
                  className={palette ? "text-xs sm:text-sm" : "text-xs sm:text-sm text-blue-700"}
                  style={palette ? { color: palette.foreground } : undefined}
                >
                  {displayCount}{" "}
                  {displayCount === 1 ? "college" : "colleges"} found
                </p>
                {displayCount > 0 && (
                  <p
                    className={palette ? "text-[11px]" : "text-[11px] text-blue-700"}
                    style={palette ? { color: palette.foreground } : undefined}
                  >
                    Page <span className="font-semibold">{currentPage + 1}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </p>
                )}
                {isLoading && (
                  <p className="text-[11px] text-blue-600">
                    Searching colleges…
                  </p>
                )}
                {!isLoading && apiError && (
                  <p className="text-[11px] text-red-600">
                    {apiError}
                  </p>
                )}
              </div>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className={palette ? "text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 self-start sm:self-auto" : "text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3 text-blue-600 hover:!text-white hover:bg-blue-600 transition-colors self-start sm:self-auto"}
                  style={palette ? { color: palette.accentStrong } : undefined}
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-1">
                {filters.states.map((state) => (
                  <Badge
                    key={state}
                    className={palette ? "gap-1 border hover:opacity-80 text-xs flex-shrink-0" : "gap-1 bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200 text-xs flex-shrink-0"}
                    style={palette ? { backgroundColor: palette.accentSoft, color: palette.foreground, borderColor: palette.accentStrong } : undefined}
                  >
                    {state}
                    <X
                      className={palette ? "w-3 h-3 cursor-pointer hover:opacity-70" : "w-3 h-3 cursor-pointer text-blue-700 hover:text-blue-900"}
                      style={palette ? { color: palette.foreground } : undefined}
                      onClick={() => handleMultiSelect("states", state)}
                    />
                  </Badge>
                ))}
                {filters.cities.map((city) => (
                  <Badge
                    key={city}
                    className={palette ? "gap-1 border hover:opacity-80 text-xs flex-shrink-0" : "gap-1 bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200 text-xs flex-shrink-0"}
                    style={palette ? { backgroundColor: palette.accentSoft, color: palette.foreground, borderColor: palette.accentStrong } : undefined}
                  >
                    {city}
                    <X
                      className={palette ? "w-3 h-3 cursor-pointer hover:opacity-70" : "w-3 h-3 cursor-pointer text-blue-700 hover:text-blue-900"}
                      style={palette ? { color: palette.foreground } : undefined}
                      onClick={() => handleMultiSelect("cities", city)}
                    />
                  </Badge>
                ))}
                {filters.universityTypes.map((ut) => (
                  <Badge
                    key={ut}
                    className={palette ? "gap-1 border hover:opacity-80 text-xs flex-shrink-0" : "gap-1 bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200 text-xs flex-shrink-0"}
                    style={palette ? { backgroundColor: palette.accentSoft, color: palette.foreground, borderColor: palette.accentStrong } : undefined}
                  >
                    {ut}
                    <X
                      className={palette ? "w-3 h-3 cursor-pointer hover:opacity-70" : "w-3 h-3 cursor-pointer text-blue-700 hover:text-blue-900"}
                      style={palette ? { color: palette.foreground } : undefined}
                      onClick={() => handleMultiSelect("universityTypes", ut)}
                    />
                  </Badge>
                ))}
                {filters.streams.map((stream) => (
                  <Badge
                    key={stream}
                    className={palette ? "gap-1 border hover:opacity-80 text-xs flex-shrink-0" : "gap-1 bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200 text-xs flex-shrink-0"}
                    style={palette ? { backgroundColor: palette.accentSoft, color: palette.foreground, borderColor: palette.accentStrong } : undefined}
                  >
                    {stream}
                    <X
                      className={palette ? "w-3 h-3 cursor-pointer hover:opacity-70" : "w-3 h-3 cursor-pointer text-blue-700 hover:text-blue-900"}
                      style={palette ? { color: palette.foreground } : undefined}
                      onClick={() => handleMultiSelect("streams", stream)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* College Cards Grid */}
            <AnimatePresence>
              <div className="grid grid-cols-1 gap-3 sm:gap-6">
                {displayedColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} palette={palette}
                  />
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
                ? Math.min((currentPage + 1) * PAGE_SIZE, filteredColleges.length)
                : Math.min((currentPage + 1) * PAGE_SIZE, apiTotalCount ?? 0);
              return (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pb-6 gap-2 sm:gap-0">
                  <p className="text-xs text-blue-700">
                    Showing{" "}
                    <span className="font-semibold">{showStart}</span> -{" "}
                    <span className="font-semibold">{showEnd}</span> of{" "}
                    <span className="font-semibold">{displayCount}</span> colleges
                  </p>
                  <div className="flex flex-wrap items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 0 || isLoading}
                      onClick={() => {
                        if (currentPage > 0) {
                          if (useClientSidePagination) setCurrentPage((p) => p - 1);
                          else fetchColleges(searchQuery, currentPage - 1);
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
                            else fetchColleges(searchQuery, p);
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
                      disabled={
                        isLoading ||
                        currentPage + 1 >= totalPages
                      }
                      onClick={() => {
                        if (currentPage + 1 < totalPages) {
                          if (useClientSidePagination) setCurrentPage((p) => p + 1);
                          else fetchColleges(searchQuery, currentPage + 1);
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
            {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <Building2 className={palette ? "w-16 h-16 mx-auto mb-4" : "w-16 h-16 mx-auto text-blue-300 mb-4"} style={palette ? { color: palette.accentSoft } : undefined} />
                <h3 className={palette ? "text-lg font-semibold mb-2" : "text-lg font-semibold text-blue-900 mb-2"} style={palette ? { color: palette.foreground } : undefined}>No colleges found</h3>
                <p className={palette ? "mb-4" : "text-blue-700 mb-4"} style={palette ? { color: palette.foreground } : undefined}>Try adjusting your filters or search query</p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className={palette ? "" : "border-blue-300 text-blue-700 hover:text-white hover:border-blue-600 transition-colors"}
                  style={palette ? { borderColor: palette.accentStrong, color: palette.foreground } : undefined}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced College Card Component - Theme-aware design
function CollegeCard({ college, palette }: { college: any; palette?: { secondary: string; foreground: string; accentSoft: string; accentStrong: string } }) {
  const router = useRouter();

  // Stream color mapping
  const streamColors: Record<string, string> = {
    "Engineering": "#3B82F6", // Blue
    "Medical": "#EF4444", // Red
    "Management": "#10B981", // Green
    "Arts": "#F59E0B", // Amber
    "Science": "#8B5CF6", // Purple
    "Commerce": "#EC4899", // Pink
    "Law": "#6366F1", // Indigo
  };

  const streamColor = streamColors[college.stream] || "#6B7280";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative rounded-xl p-3 sm:p-4 md:p-5 cursor-pointer bg-white border shadow-[0_4px_18px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all"
        style={palette ? { borderColor: palette.accentSoft } : undefined}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex gap-2.5 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border bg-white shadow-sm flex items-center justify-center"
                style={palette ? { borderColor: palette.accentSoft } : undefined}
              >
                {college.image ? (
                  <ImageWithFallback
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center px-1 line-clamp-2">
                    {college.name?.split(" ").slice(0, 3).map((w: string) => w[0]).join("")}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className={palette ? "font-bold text-sm sm:text-base md:text-lg leading-snug cursor-pointer mb-1 line-clamp-2" : "font-bold text-sm sm:text-base md:text-lg text-blue-900 hover:text-blue-700 leading-snug cursor-pointer mb-1 line-clamp-2"}
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={() => router.push(`/college-details?id=${college.id}`)}
                  >
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate max-w-[100px] sm:max-w-none">{college.city}, {college.state}</span>
                    </div>
                    {college.stream && (
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600">
                        <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                        <span>{college.stream}</span>
                      </div>
                    )}
                    {college.ownership && (
                      <div
                        className="text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full border whitespace-nowrap bg-blue-50 border-blue-200 text-blue-700"
                      >
                        {college.ownership}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle save
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    aria-label="Save"
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle share
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                    aria-label="Share"
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Colored Information Boxes */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {/* Ranking Box - Light Yellow */}
                {college.nirfRankingLabel && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 flex-shrink-0" />
                      <span className="text-[8px] sm:text-[10px] font-medium text-yellow-700 uppercase tracking-wide">NIRF Ranking</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-yellow-900">
                      {college.nirfRankingLabel}
                    </div>
                  </div>
                )}

                {/* Annual Fees Box - Light Green */}
                <div className="bg-green-50 border border-green-200 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5">
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 rotate-180 flex-shrink-0" />
                    <span className="text-[8px] sm:text-[10px] font-medium text-green-700 uppercase tracking-wide">Fees</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-green-900">{college.fees}</div>
                </div>

                {/* Highest Package Box - Light Blue */}
                {college.highestPackage && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-[8px] sm:text-[10px] font-medium text-blue-700 uppercase tracking-wide">Package</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-blue-900">{college.highestPackage}</div>
                  </div>
                )}

                {/* Exams Box - Light Purple */}
                {college.examsAccepted && college.examsAccepted.length > 0 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-[8px] sm:text-[10px] font-medium text-purple-700 uppercase tracking-wide">Exams</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-purple-900">{college.examsAccepted[0]}</div>
                  </div>
                )}
              </div>

              {/* Additional Information Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-600 pt-1">
                {college.placement && (
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700">Placement:</span>
                    <span className="font-semibold text-gray-900">{college.placement}</span>
                  </div>
                )}
                {college.studentsCount && (
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-gray-700">Students:</span>
                    <span className="font-semibold text-gray-900">{college.studentsCount}</span>
                  </div>
                )}
                {college.accreditation && (
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
                    <span className="font-medium text-gray-700 hidden sm:inline">Accreditation:</span>
                    <span className="font-semibold text-gray-900">{college.accreditation}</span>
                  </div>
                )}
              </div>

              {/* Top Courses */}
              {college.courses && college.courses.length > 0 && (
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 block">Top Courses:</span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {college.courses.slice(0, 3).map((course: string) => (
                      <span
                        key={course}
                        className="text-[9px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons - Compare and Brochure */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="h-7 sm:h-9 px-2.5 sm:px-4 text-[10px] sm:text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle compare
                    }}
                  >
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                    Compare
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 sm:h-9 px-2.5 sm:px-4 text-[10px] sm:text-xs font-medium border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-700 active:text-gray-700 focus:text-gray-700"
                    style={{ color: '#374151' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle brochure download
                    }}
                  >
                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-gray-700" />
                    Brochure
                  </Button>
                </div>

                {/* Quick Links - Horizontal scroll on mobile */}
                <div
                  className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[12px] overflow-x-auto pb-1 sm:pb-0 scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    ...(palette ? { color: palette.foreground } : {})
                  }}
                >
                  <button
                    className="transition-colors whitespace-nowrap hover:text-blue-600 flex-shrink-0"
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/college-details?id=${college.id}#admission`);
                    }}
                  >
                    Admission
                  </button>
                  <span className="opacity-40 flex-shrink-0">•</span>
                  <button
                    className="transition-colors whitespace-nowrap hover:text-blue-600 flex-shrink-0"
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/college-details?id=${college.id}#facility`);
                    }}
                  >
                    Facility
                  </button>
                  <span className="opacity-40 flex-shrink-0">•</span>
                  <button
                    className="transition-colors whitespace-nowrap hover:text-blue-600 flex-shrink-0"
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/college-details?id=${college.id}#fees`);
                    }}
                  >
                    Fee
                  </button>
                  <span className="opacity-40 flex-shrink-0">•</span>
                  <button
                    className="transition-colors whitespace-nowrap hover:text-blue-600 flex-shrink-0"
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/college-details?id=${college.id}#courses`);
                    }}
                  >
                    Courses
                  </button>
                  <span className="opacity-40 flex-shrink-0">•</span>
                  <button
                    className="transition-colors whitespace-nowrap hover:text-blue-600 flex-shrink-0"
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/college-details?id=${college.id}#placement`);
                    }}
                  >
                    Placements
                  </button>
                  <span className="opacity-40 flex-shrink-0">•</span>
                  <button
                    className="transition-colors whitespace-nowrap hover:text-blue-600 flex-shrink-0"
                    style={palette ? { color: palette.foreground } : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/college-details?id=${college.id}#cutoff`);
                    }}
                  >
                    Cut Off
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

