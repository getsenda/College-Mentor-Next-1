import apiClient from "./apiClient";
import { apiService, ApiResponse } from "./apiService";
import { logger } from "@/utils/logger";
import { ComparisonCollege } from "./comparisontable";
import { CollegeDetail } from "@/components/data/collegedetail";

// TypeScript interface matching the Top Colleges API response structure
export interface TopCollege {
  id: number;
  name: string;
  location: string;
  annualFees: string;
  recommendedCourses: string[];
  rating: string;
  collegeAccredationType: string;
}

// TypeScript interface for Colleges By Ranking API response
// Latest API structure for NIRF / IIRF tabs
export interface CollegeRankingItem {
  id: number;
  collegeName: string;
  location: string;
  rating: number;
  registeredStudents: number;
  category: string;
}

// News API interface
export interface NewsItem {
  id: number;
  headline: string;
  sortOrder: number;
}

// Featured College API interface
export interface FeaturedCollege {
  id: number;
  name: string;
  location: string;
  establishedYear: number;
  annualFees: string;
  description: string;
  recommendedCourses: string[] | string; // Can be array or comma-separated string
  avgPackage: string;
  rating?: string;
  collegeTag?: string;
  keyHighlights?: Record<string, any>;
}

// State-wise colleges count API interface
export interface StateWiseCollegeCount {
  collegeCountStatewise: number;
  collegeCountDeemedUniversities: number;
  collegeCountPrivateUniversities: number;
  collegeCountPublicUniversities: number;
  state: string;
}

// ============================
// Intermediate College Search
// ============================

// Response item for /college/intermediate/searchCollege
export interface IntermediateCollegeSearchResult {
  id: number;
  collegeName: string;
  overviewDescription: string | null;
  location: string | null;
  institutionType: string | null;
  campusAreaAcres: number | null;
  nirfRanking2025: string | null;
  nirfScore: number | null;
  qsRanking: string | null;
  naacAccreditation: string | null;
  naacScore: number | null;
  highestPackage2025: string | null;
  averagePackage2025: string | null;
  medianPackage2025: string | null;
  topRecruiters: string[] | null;
  programmeLevels: string[] | null;
  topCourses: string[] | null;
  state: string | null;
  category: string | null;
  priority: number | null;
  establishedYear: number | null;
  highlightsJson: Record<string, string> | null;
  dataGenerationStatus: string | null;
  admissions: unknown;
  courses: unknown;
  placements: unknown;
  rankings: unknown;
  scholarships: unknown;
  city: string | null;
  fees: string | null;
  cutoff: string | null;
  examsAccepted: string[] | null;
}

export interface IntermediateCollegeSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IntermediateCollegeSearchResult[];
}

// Payload for /college/intermediate/searchCollege
export interface IntermediateCollegeSearchPayload {
  page?: number;
  size?: number;
  sortBy?: string;

  /**
   * Primary search field. When omitted or empty, backend returns
   * the full colleges list (no name-based filtering).
   */
  collegeName?: string;

  states?: string[];
  cities?: string[];
  /** Single category (legacy) or multiple categories for combined stream filter */
  category?: string | string[];
  degreeNames?: string[];
  specializations?: string[];
  entranceTests?: string[];
  /** Single type (legacy) or multiple for combined university type filter */
  institutionType?: string | string[];
  naacAccreditation?: string;
  naacScoreFrom?: number;
  naacScoreTo?: number;
  nirfRanking2025?: string;
  nirfScoreFrom?: number;
  nirfScoreTo?: number;
  establishedYearFrom?: number;
  establishedYearTo?: number;
}

// Payload for /college/facets/filters - same structure, built dynamically from user selection
export type CollegeFacetsPayload = Pick<
  IntermediateCollegeSearchPayload,
  | "collegeName"
  | "states"
  | "cities"
  | "category"
  | "degreeNames"
  | "specializations"
  | "entranceTests"
  | "institutionType"
  | "naacAccreditation"
  | "naacScoreFrom"
  | "naacScoreTo"
  | "nirfRanking2025"
  | "nirfScoreFrom"
  | "nirfScoreTo"
  | "establishedYearFrom"
  | "establishedYearTo"
>;

// Facet option: string or { value, count }
export type FacetOption = string | { value: string; count?: number };

/** Matches /college/facets/filters API response (empty payload returns all options) */
export interface CollegeFacetsResponse {
  states?: FacetOption[];
  cities?: FacetOption[];
  streams?: FacetOption[];
  institutionTypes?: FacetOption[];
  degreeNames?: FacetOption[];
  specializations?: FacetOption[];
  entranceTests?: FacetOption[];
  naacAccreditations?: FacetOption[];
  /** Alias for streams if API returns as categories */
  categories?: FacetOption[];
}
// Search College API item (matches your pasted response)
export interface SearchCollegeItem {
  id: number;
  collegeName: string;
  city: string;
  state: string;
  institutionType: string;        // "Private", "Government", etc.
  nirfRanking2025?: string;        // e.g. "201-300 (Engineering Category)"
  naacAccreditation?: string;      // e.g. "A+"
  naacScore?: number | null;       // e.g. 3.65
  logo?: string | null;
}

export interface PopularCollegeComparison {
  collegeId1: number;
  collegeName1: string;
  collegeId2: number;
  collegeName2: string;
}
// Wrapper response
export interface SearchCollegeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchCollegeItem[];
}

export const collegeService = {
  /**
   * Get Top Colleges API
   * GET /api/colleges/top-colleges
   * Returns array directly or wrapped in ApiResponse
   */
  getTopColleges: async (): Promise<TopCollege[]> => {
    try {
      const response = await apiService.get<TopCollege[]>("/colleges/top-colleges");

      // API returns array directly, so response is the array itself
      if (Array.isArray(response)) {
        return response as TopCollege[];
      }

      // Handle wrapped response structure
      const responseAny = response as any;
      if (responseAny?.data && Array.isArray(responseAny.data)) {
        return responseAny.data;
      }

      // If response is empty or invalid, return empty array
      logger.warn('⚠️ getTopColleges: Unexpected response format', response);
      return [];
    } catch (error) {
      logger.error('🔴 collegeService.getTopColleges error:', error);
      throw error;
    }
  },

  /**
   * Get News API
   * GET /api/colleges/news
   * Returns array directly or wrapped in ApiResponse
   */
  getNews: async (): Promise<NewsItem[]> => {
    try {
      const response = await apiService.get<NewsItem[]>("/colleges/news");

      // API returns array directly, so response is the array itself
      if (Array.isArray(response)) {
        return response as NewsItem[];
      }

      // Handle wrapped response structure
      const responseAny = response as any;
      if (responseAny?.data && Array.isArray(responseAny.data)) {
        return responseAny.data;
      }

      // If response is empty or invalid, return empty array
      logger.warn('⚠️ getNews: Unexpected response format', response);
      return [];
    } catch (error) {
      logger.error('🔴 collegeService.getNews error:', error);
      throw error;
    }
  },

  /**
   * Get Colleges by Ranking API
   * POST /api/colleges/getCollegesByRanking
   * @param rankName - The ranking agency (e.g., "NIRF", "IIRF")
   * @param year - The ranking year (e.g., 2025)
   * @returns Array of colleges with ranking information
   */
  getCollegesByRanking: async (rankName: string, year: number): Promise<CollegeRankingItem[]> => {
    try {
      const response = await apiService.post<CollegeRankingItem[]>("/colleges/getCollegesByRanking", {
        rankName,
        year
      });

      // API returns array directly, so response is the array itself
      if (Array.isArray(response)) {
        return response as CollegeRankingItem[];
      }

      // Handle wrapped response structure
      const responseAny = response as any;
      if (responseAny?.data && Array.isArray(responseAny.data)) {
        return responseAny.data as CollegeRankingItem[];
      }

      // If response is empty or invalid, return empty array
      logger.warn('⚠️ getCollegesByRanking: Unexpected response format', response);
      return [];
    } catch (error) {
      logger.error('🔴 collegeService.getCollegesByRanking error:', error);
      throw error;
    }
  },

  /**
   * Get Featured Colleges API
   * GET /api/colleges/featured-colleges
   * @returns Array of featured colleges
   */
  getFeaturedColleges: async (): Promise<FeaturedCollege[]> => {
    try {
      const response = await apiService.get<FeaturedCollege[]>("/colleges/featured-colleges");

      // API returns array directly, so response is the array itself
      if (Array.isArray(response)) {
        return response as FeaturedCollege[];
      }

      // Handle wrapped response structure
      const responseAny = response as any;
      if (responseAny?.data && Array.isArray(responseAny.data)) {
        return responseAny.data;
      }

      // If response is empty or invalid, return empty array
      logger.warn('⚠️ getFeaturedColleges: Unexpected response format', response);
      return [];
    } catch (error) {
      logger.error('🔴 collegeService.getFeaturedColleges error:', error);
      throw error;
    }
  },

  /**
   * Get State-wise Colleges API
   * GET /api/colleges/stateWiseColleges
   * @returns Array of state-wise college counts
   */
  getStateWiseColleges: async (): Promise<StateWiseCollegeCount[]> => {
    try {
      const response = await apiService.get<StateWiseCollegeCount[]>("/colleges/stateWiseColleges");

      if (Array.isArray(response)) {
        return response as StateWiseCollegeCount[];
      }

      const responseAny = response as any;
      if (responseAny?.data && Array.isArray(responseAny.data)) {
        return responseAny.data as StateWiseCollegeCount[];
      }

      logger.warn("⚠️ getStateWiseColleges: Unexpected response format", response);
      return [];
    } catch (error) {
      logger.error("🔴 collegeService.getStateWiseColleges error:", error);
      throw error;
    }
  },

  /**
   * Intermediate college search API
   * POST /college/intermediate/searchCollege
   *
   * NOTE:
   * - No fields are hardcoded in the payload builder.
   * - Caller should always provide `collegeName` as the primary search field.
   */
  searchIntermediateColleges: async (
    payload: IntermediateCollegeSearchPayload
  ): Promise<IntermediateCollegeSearchResponse | null> => {
    try {
      const { collegeName, ...rest } = payload;
      const trimmedName = collegeName?.trim();

      const requestPayload: IntermediateCollegeSearchPayload = {
        ...rest,
      };

      if (trimmedName) {
        requestPayload.collegeName = trimmedName;
      }

      logger.log(
        "🔍 Searching colleges via /college/intermediate/searchCollege",
        requestPayload
      );

      const response = await apiService.post<IntermediateCollegeSearchResponse>(
        "/college/intermediate/searchCollege",
        requestPayload
      );

      // API is expected to return the response body directly (not wrapped)
      if (response && typeof response === "object" && "results" in response) {
        return response as IntermediateCollegeSearchResponse;
      }

      logger.warn(
        "⚠️ searchIntermediateColleges: Unexpected response format",
        response
      );
      return null;
    } catch (error) {
      logger.error("🔴 collegeService.searchIntermediateColleges error:", error);
      return null;
    }
  },

  /**
   * College facets/filters API
   * POST /college/facets/filters
   * Returns available filter options based on current selection (dynamic payload).
   */
  getCollegeFacets: async (
    payload: CollegeFacetsPayload
  ): Promise<CollegeFacetsResponse | null> => {
    try {
      const requestPayload: Record<string, unknown> = {};
      if (payload.collegeName?.trim()) requestPayload.collegeName = payload.collegeName.trim();
      if (payload.states?.length) requestPayload.states = payload.states;
      if (payload.cities?.length) requestPayload.cities = payload.cities;
      if (payload.category != null) requestPayload.category = Array.isArray(payload.category) ? payload.category : payload.category;
      if (payload.degreeNames?.length) requestPayload.degreeNames = payload.degreeNames;
      if (payload.institutionType != null) requestPayload.institutionType = Array.isArray(payload.institutionType) ? payload.institutionType : payload.institutionType;
      if (payload.specializations?.length) requestPayload.specializations = payload.specializations;
      if (payload.entranceTests?.length) requestPayload.entranceTests = payload.entranceTests;
      if (payload.naacAccreditation) requestPayload.naacAccreditation = payload.naacAccreditation;
      if (payload.naacScoreFrom != null) requestPayload.naacScoreFrom = payload.naacScoreFrom;
      if (payload.naacScoreTo != null) requestPayload.naacScoreTo = payload.naacScoreTo;
      if (payload.nirfRanking2025) requestPayload.nirfRanking2025 = payload.nirfRanking2025;
      if (payload.nirfScoreFrom != null) requestPayload.nirfScoreFrom = payload.nirfScoreFrom;
      if (payload.nirfScoreTo != null) requestPayload.nirfScoreTo = payload.nirfScoreTo;
      if (payload.establishedYearFrom != null) requestPayload.establishedYearFrom = payload.establishedYearFrom;
      if (payload.establishedYearTo != null) requestPayload.establishedYearTo = payload.establishedYearTo;

      const response = await apiService.post<CollegeFacetsResponse>(
        "/college/facets/filters",
        requestPayload
      );

      if (response && typeof response === "object") {
        return response as CollegeFacetsResponse;
      }
      return null;
    } catch (error) {
      logger.error("🔴 collegeService.getCollegeFacets error:", error);
      return null;
    }
  },

  getSearchColleges: async (
    page = 1,
    pageSize = 20
  ): Promise<SearchCollegeResponse> => {
    try {
      const response = await apiClient.post<SearchCollegeResponse>(
        "/college/intermediate/searchCollege",
        {
          page,
          page_size: pageSize,
        }
      );




      if (response?.data?.results) {
        return response.data;
      }

      logger.warn(
        "⚠️ getSearchColleges: Unexpected response format",
        response
      );

      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };
    } catch (error) {
      logger.error("🔴 collegeService.getSearchColleges error:", error);
      throw error;
    }
  },
  /** ✅ POPULAR COMPARISONS API */
  async getPopularComparisons(): Promise<PopularCollegeComparison[]> {
    const res = await apiClient.get<PopularCollegeComparison[]>(
      "/college/compare/popularComparisions"
    );
    return res.data;
  },
  /** ✅ COLLEGE COMPARISON API */
  // collegeService.ts
  async compareColleges(ids: number[]): Promise<ComparisonCollege[]> {
    const res = await apiClient.get<ComparisonCollege[]>(
      "/college/compare",
      {
        params: { ids: ids.join(",") },
      }
    );
    return res.data;

  },
  /** ✅ REAL DETAIL API */
  async getCollegeDetail(id: number): Promise<CollegeDetail> {
    const response = await apiClient.get<CollegeDetail>(`/college/details/collegeData/${id}`);
    return response.data;
  },
};



export type { CollegeDetail };

