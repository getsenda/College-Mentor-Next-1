import { apiService, ApiResponse } from "./apiService";
import { logger } from "@/utils/logger";
import { courseService } from "./courseService";
import { collegeService } from "./collegeService";

// TypeScript interfaces matching the API response structure
export interface College {
  id: number;
  name: string;
  streamId: number;
  state: string;
  city: string;
  establishedYear: number;
  ranking: number;
  totalSeats: number;
  avgFees: number;
  website: string;
  description: string;
  createdAt: string;
}

export interface Course {
  id: number;
  title: string;
  collegeId: number;
  streamId: number;
  level: string;
  durationMonths: number;
  mode: string;
  fees: number;
  seats: number;
  description: string;
}

export interface Exam {
  id: number;
  name: string;
  streamId: number;
  examType: string;
  mode: string;
  durationMinutes: number;
  totalMarks: number;
  examDate: string;
  description: string;
}

export interface Career {
  id: number;
  title: string;
  streamId: number;
  recommendedCourses: string;
  avgSalary: number;
  growthOutlook: string;
  description: string;
}

export interface SearchResults {
  colleges: College[];
  courses: Course[];
  exams: Exam[];
  careers: Career[];
}

export interface SearchPayload {
  q: string;
  limit: number;
  fuzzy: boolean;
}

// New search API payload interface
export interface SearchApiPayload {
  q: string;
  fuzzy: boolean;
  page: number;
  size: number;
  filters?: {
    stream?: number;
    state?: string;
    collegeId?: number;
    examDateFrom?: string;
    examDateTo?: string;
    [key: string]: any;
  };
}

// Search API response interfaces
export interface SearchApiResponse<T> {
  content?: T[];
  data?: T[];
  items?: T[];
  results?: T[];
}

// Career Finder API interfaces
export interface CareerFinderResult {
  careerTitle: string;
  growthOutlook: string;
  salary: number;
}

export interface CollegeFinderResult {
  collegeName: string;
  /** API may return string e.g. "8,00,000 - 10,00,000" or number */
  avgFees: string | number;
  collegeRank: number;
  city: string;
}

export interface Stream {
  id: number;
  name: string;
}

export const searchService = {
  /**
   * Search All API
   * POST /api/search/all
   */
  searchAll: async (payload: SearchPayload): Promise<any> => {
    logger.log('🔵 searchService.searchAll called with payload:', payload);
    logger.log('🔵 Calling endpoint: /search/all (will become /api/search/all)');
    try {
      const response = await apiService.post<SearchResults>("/search/all", payload);
      logger.log('🟢 searchService.searchAll response:', response);
      return response;
    } catch (error) {
      logger.error('🔴 searchService.searchAll error:', error);
      throw error;
    }
  },

  /**
   * Career Finder based on College
   * GET /api/colleges/collegeFinder?collegeName={collegeName}
   */
  getCareersByCollege: async (collegeName: string): Promise<CareerFinderResult[]> => {
    try {
      const response = await apiService.get<CareerFinderResult[]>(
        `/colleges/collegeFinder?collegeName=${encodeURIComponent(collegeName)}`
      );

      // Handle response structure
      if (Array.isArray(response)) {
        return response;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        const responseAny = response as any;
        if (Array.isArray(responseAny)) {
          return responseAny;
        } else if (Array.isArray(responseAny.data)) {
          return responseAny.data;
        }
        return [];
      }
    } catch (error: any) {
      logger.error('🔴 searchService.getCareersByCollege error:', error);

      // Check for various error formats (axios, apiService, etc.)
      const statusCode = error?.statusCode || error?.response?.status || error?.status;

      // If it's a 500 error or 404, treat it as "not found" and return empty array
      // This handles cases where the API returns 500 for missing data
      if (statusCode === 500 || statusCode === 404) {
        logger.log('⚠️ Treating 500/404 as "not found" - returning empty array');
        return [];
      }

      // Also check error message for common "not found" patterns
      const errorMessage = (error?.message || '').toLowerCase();
      if (errorMessage.includes('500') || errorMessage.includes('not found') || errorMessage.includes('404')) {
        logger.log('⚠️ Error message suggests "not found" - returning empty array');
        return [];
      }

      // For other errors, still throw to let component handle it
      throw error;
    }
  },

  /**
   * College Finder based on Career
   * GET /api/colleges/careerFinder?careerName={careerName}
   */
  getCollegesByCareer: async (careerName: string): Promise<CollegeFinderResult[]> => {
    try {
      const response = await apiService.get<CollegeFinderResult[]>(
        `/colleges/careerFinder?careerName=${encodeURIComponent(careerName)}`
      );

      // Handle response structure
      if (Array.isArray(response)) {
        return response;
      } else if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        const responseAny = response as any;
        if (Array.isArray(responseAny)) {
          return responseAny;
        } else if (Array.isArray(responseAny.data)) {
          return responseAny.data;
        }
        return [];
      }
    } catch (error: any) {
      logger.error('🔴 searchService.getCollegesByCareer error:', error);

      // Check for various error formats (axios, apiService, etc.)
      const statusCode = error?.statusCode || error?.response?.status || error?.status;

      // If it's a 500 error or 404, treat it as "not found" and return empty array
      // This handles cases where the API returns 500 for missing data
      if (statusCode === 500 || statusCode === 404) {
        logger.log('⚠️ Treating 500/404 as "not found" - returning empty array');
        return [];
      }

      // Also check error message for common "not found" patterns
      const errorMessage = (error?.message || '').toLowerCase();
      if (errorMessage.includes('500') || errorMessage.includes('not found') || errorMessage.includes('404')) {
        logger.log('⚠️ Error message suggests "not found" - returning empty array');
        return [];
      }

      // For other errors, still throw to let component handle it
      throw error;
    }
  },

  /**
   * Search Colleges API
   * POST /api/search/colleges
   */
  searchColleges: async (payload: SearchApiPayload): Promise<College[]> => {
    try {
      const response = await apiService.post<SearchApiResponse<College>>("/search/colleges", payload);

      // Handle different response structures
      if (response.data) {
        if (Array.isArray(response.data)) {
          return response.data;
        } else if (response.data.content && Array.isArray(response.data.content)) {
          return response.data.content;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
      }

      // Check if response itself is an array
      const responseAny = response as any;
      if (Array.isArray(responseAny)) {
        return responseAny;
      } else if (Array.isArray(responseAny.data)) {
        return responseAny.data;
      } else if (Array.isArray(responseAny.content)) {
        return responseAny.content;
      }

      return [];
    } catch (error: any) {
      logger.error('🔴 searchService.searchColleges error:', error);
      return [];
    }
  },

  /**
   * Search Courses API
   * POST /api/search/courses
   */
  searchCourses: async (payload: SearchApiPayload): Promise<Course[]> => {
    try {
      const response = await apiService.post<SearchApiResponse<Course>>("/search/courses", payload);

      // Handle different response structures
      if (response.data) {
        if (Array.isArray(response.data)) {
          return response.data;
        } else if (response.data.content && Array.isArray(response.data.content)) {
          return response.data.content;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
      }

      // Check if response itself is an array
      const responseAny = response as any;
      if (Array.isArray(responseAny)) {
        return responseAny;
      } else if (Array.isArray(responseAny.data)) {
        return responseAny.data;
      } else if (Array.isArray(responseAny.content)) {
        return responseAny.content;
      }

      return [];
    } catch (error: any) {
      logger.error('🔴 searchService.searchCourses error:', error);
      return [];
    }
  },

  /**
   * Search Exams API
   * POST /api/search/exams
   */
  searchExams: async (payload: SearchApiPayload): Promise<Exam[]> => {
    try {
      const response = await apiService.post<SearchApiResponse<Exam>>("/search/exams", payload);

      // Handle different response structures
      if (response.data) {
        if (Array.isArray(response.data)) {
          return response.data;
        } else if (response.data.content && Array.isArray(response.data.content)) {
          return response.data.content;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
      }

      // Check if response itself is an array
      const responseAny = response as any;
      if (Array.isArray(responseAny)) {
        return responseAny;
      } else if (Array.isArray(responseAny.data)) {
        return responseAny.data;
      } else if (Array.isArray(responseAny.content)) {
        return responseAny.content;
      }

      return [];
    } catch (error: any) {
      logger.error('🔴 searchService.searchExams error:', error);
      return [];
    }
  },

  /**
   * Search Careers API
   * POST /api/search/careers
   */
  searchCareers: async (payload: SearchApiPayload): Promise<Career[]> => {
    try {
      const response = await apiService.post<SearchApiResponse<Career>>("/search/careers", payload);

      // Handle different response structures
      if (response.data) {
        if (Array.isArray(response.data)) {
          return response.data;
        } else if (response.data.content && Array.isArray(response.data.content)) {
          return response.data.content;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
      }

      // Check if response itself is an array
      const responseAny = response as any;
      if (Array.isArray(responseAny)) {
        return responseAny;
      } else if (Array.isArray(responseAny.data)) {
        return responseAny.data;
      } else if (Array.isArray(responseAny.content)) {
        return responseAny.content;
      }

      return [];
    } catch (error: any) {
      logger.error('🔴 searchService.searchCareers error:', error);
      return [];
    }
  },

  /**
   * Combined search: courses + colleges using dedicated APIs.
   * Uses courseService.searchCourses and collegeService.searchIntermediateColleges in parallel.
   * Returns SearchResults format for use in SearchBar, HeroSectionGreen, College-Landing-New.
   */
  searchCoursesAndColleges: async (query: string, limit: number = 5): Promise<SearchResults> => {
    const trimmed = query?.trim();
    const empty: SearchResults = { colleges: [], courses: [], exams: [], careers: [] };
    if (!trimmed) return empty;

    try {
      const [coursesRes, collegesRes] = await Promise.all([
        courseService.searchCourses({
          courseName: trimmed,
          page: 0,
          size: limit,
          sort: "name,asc",
        }),
        collegeService.searchIntermediateColleges({
          collegeName: trimmed,
          page: 0,
          size: limit,
          sortBy: "collegeName_asc",
        }),
      ]);

      const courses: Course[] = (coursesRes?.results ?? []).map((c) => ({
        id: c.id,
        title: c.name,
        collegeId: 0,
        streamId: 0,
        level: c.degree_types?.[0] ?? "UG",
        durationMonths: 48,
        mode: "Full-time",
        fees: 0,
        seats: 0,
        description: c.stream ?? "",
      }));

      const colleges: College[] = (collegesRes?.results ?? []).map((c) => ({
        id: c.id,
        name: c.collegeName,
        streamId: 0,
        state: c.state ?? "",
        city: c.city ?? "",
        establishedYear: c.establishedYear ?? 0,
        ranking: 0,
        totalSeats: 0,
        avgFees: 0,
        website: "",
        description: c.overviewDescription ?? "",
        createdAt: "",
      }));

      return { colleges, courses, exams: [], careers: [] };
    } catch (error) {
      logger.error("🔴 searchService.searchCoursesAndColleges error:", error);
      return empty;
    }
  },

  /**
   * Get Streams API
   * GET /api/search/streams
   */
  getStreams: async (): Promise<any> => {
    logger.log('🔵 searchService.getStreams called');
    try {
      const response = await apiService.get<Stream[]>("/search/streams");
      logger.log('🟢 searchService.getStreams response:', response);
      return response;
    } catch (error) {
      logger.error('🔴 searchService.getStreams error:', error);
      throw error;
    }
  },
};

