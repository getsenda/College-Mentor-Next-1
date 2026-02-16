
import { apiService } from "./apiService";
import { logger } from "@/utils/logger";
import apiClient from "./apiClient";
import { CourseSearchModel } from "@/components/data/coursesearchmodel";
import { CourseSearchResponse1 } from "@/components/types/course";
import {
  CourseDetailResponse,
  PopularComparisonApiResponse,
} from "@/components/data/coursecompare";

// Twinning / interesting programs API response
export interface TwinningProgram {
  collegeName: string;
  collegeCounty: string;
  partnerUniversityName: string;
  partnerUniversityCountry: string;
  programMode: string;
  programType: string;
}

// Trending / online courses API response (flexible, backend-controlled)
export interface TrendingOnlineCourse {
  [key: string]: any;
}

// Career finder API response (GET /api/courses/careerFinder?careerName=...)
export interface CareerFinderCourseItem {
  id?: number | string;
  courseName?: string;
  title?: string;
  collegeName?: string;
  institution?: string;
  avgSalary?: number | string;
  growthRate?: string;
  [key: string]: any;
}

// Courses news API response (GET /api/courses/news)
export interface CourseNewsItem {
  id?: number;
  headline?: string;
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  sortOrder?: number;
  [key: string]: any;
}

/**
 * Courses search (intermediate listing) API
 * POST /api/courses/search
 *
 * Filter payload format (single value as string, multiple as array):
 * { courseName?, stream?, degree?, courseType?, educationLevel?, twinning?, page?, size?, sort? }
 */
export interface CourseSearchPayload {
  courseName?: string;
  /** Single string when one selected, string[] when multiple (e.g. "Engineering And Architecture") */
  stream?: string | string[];
  degree?: string | string[];
  courseType?: string | string[];
  educationLevel?: string | string[];
  twinning?: string; // "true" | "false"
  page?: number;
  size?: number;
  sort?: string;
  [key: string]: any;
}

export interface CourseSearchResultItem {
  id: number;
  name: string;
  stream?: string;
  degree_types?: string[];
  entrance_exams?: string[];
  average_fee?: Record<string, string>;
  average_salary?: Record<string, string>;
  [key: string]: any;
}

export interface CourseSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CourseSearchResultItem[];
}

/**
 * Payload for POST /api/courses/facets/filters
 * Same shape as search filters: courseName, stream, degree, courseType, educationLevel.
 * Single value as string when one selected, array when multiple.
 */
export interface CourseFacetsPayload {
  courseName?: string;
  stream?: string | string[];
  degree?: string | string[];
  courseType?: string | string[];
  educationLevel?: string | string[];
}

/** Facet option: string or { value, count } */
export type CourseFacetOption = string | { value: string; count?: number };

/** Response from POST /api/courses/facets/filters */
export interface CourseFacetsResponse {
  streams?: CourseFacetOption[];
  degrees?: CourseFacetOption[];
  courseTypes?: CourseFacetOption[];
  educationLevels?: CourseFacetOption[];
  /** Backend may use singular keys */
  stream?: CourseFacetOption[];
  degree?: CourseFacetOption[];
  courseType?: CourseFacetOption[];
  educationLevel?: CourseFacetOption[];
}

/**
 * Course details API response
 * GET /api/courses/details/courseData/{id}
 *
 * This is intentionally permissive (lots of `Record<string, any>`)
 * because the backend owns the content structure and may evolve it.
 */
export interface CourseDetailsResponse {
  id: number;
  tabs: {
    overview: {
      name: string;
      what_is: string;
      degree_name: string;
      // Flexible highlights block – mix of strings, arrays, and nested objects
      highlights?: Record<string, any>;
      section_intros?: Record<string, string>;
    };
    courses?: {
      degree_programme?: Record<string, string>;
      degree_duration?: Record<string, string>;
      eligibility_criteria?: Record<string, string>;
      average_fee?: Record<string, string>;
      average_salary?: Record<string, string>;
    };
    admission?: {
      eligibility_criteria?: Array<{
        course_type: string;
        eligibility_criteria: string;
        duration: string;
      }>;
      top_colleges?: Array<{
        college_name: string;
        location: string;
        rank: number;
        average_fee: string;
        college_type: string;
      }>;
    };
    ug_courses?: Array<{ name: string; programme_level: string }>;
    pg_courses?: Array<{ name: string; programme_level: string }>;
    curriculum?: {
      intro?: string;
      items?: Array<{
        programme_type: string;
        programme_level: string;
        semester: string;
        core_subjects: string[];
      }>;
    };
    top_colleges?: {
      intro?: string;
      items?: Array<{
        college_name: string;
        location: string;
        rank: number;
        average_fee: string;
        college_type: string;
      }>;
    };
    eligibility?: {
      intro?: string;
      items?: Array<{
        course_type: string;
        eligibility_criteria: string;
        duration: string;
      }>;
    };
    top_careers?: {
      intro?: string;
      items?: Array<{
        job_profile: string;
        job_description: string;
        average_salary: string;
      }>;
    };
    upcoming_trends?: {
      intro?: string;
      data?: {
        scope_in_india?: string;
        scope_abroad?: string;
        higher_education_opportunities?: string;
        foreign_universities?: string[];
      };
    };
    faqs?: {
      items?: Array<{ question: string; answer: string }>;
    };
  };
}

export const courseService = {
  /**
   * Get interesting twinning programs
   * GET /api/courses/fetch/twinningPrograms
   */
  getTwinningPrograms: async (): Promise<TwinningProgram[]> => {
    try {
      const response = await apiService.get<TwinningProgram[]>("/courses/fetch/twinningPrograms");

      if (Array.isArray(response)) {
        return response as TwinningProgram[];
      }

      const anyRes = response as any;
      if (anyRes?.data && Array.isArray(anyRes.data)) {
        return anyRes.data as TwinningProgram[];
      }

      logger.warn("⚠️ courseService.getTwinningPrograms: unexpected response format", response);
      return [];
    } catch (error) {
      logger.error("🔴 courseService.getTwinningPrograms error:", error);
      return [];
    }
  },

  /**
   * Get trending/online/passionate courses for Courses Landing page
   * GET /api/courses/fetch/trendingOnlineCourses?filterCollege=Online|Passionate|Popular
   */
  getTrendingCourses: async (
    filterCollege: "Online" | "Passionate" | "Popular"
  ): Promise<TrendingOnlineCourse[]> => {
    try {
      const response = await apiService.get<TrendingOnlineCourse[]>(
        `/courses/fetch/trendingOnlineCourses?filterCollege=${encodeURIComponent(
          filterCollege
        )}`
      );

      if (Array.isArray(response)) {
        return response as TrendingOnlineCourse[];
      }

      const anyRes = response as any;
      if (anyRes?.data && Array.isArray(anyRes.data)) {
        return anyRes.data as TrendingOnlineCourse[];
      }

      logger.warn(
        "⚠️ courseService.getTrendingCourses: unexpected response format",
        response
      );
      return [];
    } catch (error) {
      logger.error("🔴 courseService.getTrendingCourses error:", error);
      return [];
    }
  },

  /**
   * AI Career & Course Explorer - find courses/careers by career name
   * GET /api/courses/careerFinder?careerName={careerName}
   */
  getCareerFinder: async (careerName: string): Promise<CareerFinderCourseItem[]> => {
    try {
      const response = await apiService.get<CareerFinderCourseItem[]>(
        `/courses/careerFinder?careerName=${encodeURIComponent(careerName)}`
      );

      if (Array.isArray(response)) {
        return response as CareerFinderCourseItem[];
      }

      const anyRes = response as any;
      if (anyRes?.data && Array.isArray(anyRes.data)) {
        return anyRes.data as CareerFinderCourseItem[];
      }

      logger.warn("⚠️ courseService.getCareerFinder: unexpected response format", response);
      return [];
    } catch (error) {
      logger.error("🔴 courseService.getCareerFinder error:", error);
      return [];
    }
  },

  /**
   * Get course news / blogs
   * GET /api/courses/news
   */
  getCoursesNews: async (): Promise<CourseNewsItem[]> => {
    try {
      const response = await apiService.get<CourseNewsItem[]>("/courses/news");

      if (Array.isArray(response)) {
        return response as CourseNewsItem[];
      }

      const anyRes = response as any;
      if (anyRes?.data && Array.isArray(anyRes.data)) {
        return anyRes.data as CourseNewsItem[];
      }

      logger.warn("⚠️ courseService.getCoursesNews: unexpected response format", response);
      return [];
    } catch (error) {
      logger.error("🔴 courseService.getCoursesNews error:", error);
      return [];
    }
  },

  /**
   * Search courses for the intermediate listing page
   * POST /api/courses/search
   *
   * Note:
   * - Backend primarily filters using `courseName`
   * - Other fields are optional and may be added over time
   */
  searchCourses: async (
    payload: CourseSearchPayload
  ): Promise<CourseSearchResponse | null> => {
    try {
      const response = await apiService.post<CourseSearchResponse>("/courses/search", payload);

      const anyRes = response as any;

      // Direct shape: { count, next, previous, results }
      if (anyRes && typeof anyRes === "object" && "count" in anyRes && "results" in anyRes) {
        return anyRes as CourseSearchResponse;
      }

      // Wrapped shape: { data: { count, next, previous, results } }
      if (
        anyRes?.data &&
        typeof anyRes.data === "object" &&
        "count" in anyRes.data &&
        "results" in anyRes.data
      ) {
        return anyRes.data as CourseSearchResponse;
      }

      logger.warn(
        "⚠️ courseService.searchCourses: unexpected response format",
        response
      );
      return null;
    } catch (error) {
      logger.error("🔴 courseService.searchCourses error:", error);
      return null;
    }
  },

  /**
   * Course facets/filters API
   * POST /api/courses/facets/filters
   * Returns available filter options based on current selection (dynamic payload).
   */
  getCourseFacets: async (
    payload: CourseFacetsPayload
  ): Promise<CourseFacetsResponse | null> => {
    try {
      const requestPayload: Record<string, unknown> = {};
      if (payload.courseName?.trim()) requestPayload.courseName = payload.courseName.trim();
      if (payload.stream) requestPayload.stream = payload.stream;
      if (payload.degree) requestPayload.degree = payload.degree;
      if (payload.courseType) requestPayload.courseType = payload.courseType;
      if (payload.educationLevel) requestPayload.educationLevel = payload.educationLevel;

      const response = await apiService.post<CourseFacetsResponse>(
        "/courses/facets/filters",
        requestPayload
      );

      if (response && typeof response === "object") {
        return response as CourseFacetsResponse;
      }
      return null;
    } catch (error) {
      logger.error("🔴 courseService.getCourseFacets error:", error);
      return null;
    }
  },

  /**
   * Course details page
   * GET /api/courses/details/courseData/{id}
   */
  getCourseDetails: async (id: number | string): Promise<CourseDetailsResponse> => {
    try {
      const res = await apiClient.get<CourseDetailsResponse>(
        `/courses/details/courseData/${id}`
      );
      return res.data;
    } catch (error) {
      logger.error("🔴 courseService.getCourseDetails error:", error);
      throw error;
    }
  },

  getSearchCourses: async (
    page = 1,
    pageSize = 20
  ): Promise<CourseSearchModel> => {
    try {
      const response = await apiClient.post<CourseSearchResponse1>(
        "/courses/search",
        {
          page,
          page_size: pageSize,
        }
      );

      if (response?.data?.results) {
        return new CourseSearchModel(response.data);
      }

      logger.warn(
        "⚠️ getSearchColleges: Unexpected response format",
        response
      );

      return new CourseSearchModel({
        count: 0,
        next: null,
        previous: null,
        results: [],
      });
    } catch (error) {
      logger.error("🔴 courseService.getSearchColleges error:", error);
      throw error;
    }
  },
  // collegeService.ts
  async compareCourses(ids: number[]): Promise<CourseDetailResponse> {
    const res = await apiClient.get<CourseDetailResponse>(
      "/courses/details/courseCompare",
      {
        params: { ids: ids.join(",") },
      }
    );
    return res.data;
  },
  async popularCourses(): Promise<PopularComparisonApiResponse[]> {
    const res = await apiClient.get<PopularComparisonApiResponse[]>(
      "/courses/details/popularComparisions"
    );
    return res.data;
  }
};
