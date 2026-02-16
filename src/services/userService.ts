import { apiService, ApiResponse } from "./apiService";
import { logger } from "@/utils/logger";

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}

export const userService = {
  /**
   * Get user profile
   * GET /api/users/me
   */
  getProfile: async (): Promise<any> => {
    // skipAuthRedirectOnRefreshFailure: when token is expired, don't redirect to /auth so
    // form pages can keep the user on the page and use localStorage prefill or manual entry
    return await apiService.get<UserProfile>("/users/me", { skipAuthRedirectOnRefreshFailure: true } as any);
  },

  /**
   * Update user profile
   * PUT /api/users/me
   */
  updateProfile: async (data: UpdateProfilePayload): Promise<ApiResponse<UserProfile>> => {
    return await apiService.put<UserProfile>("/users/me", data);
  },

  /**
   * Delete user account
   * DELETE /api/users/me
   */
  deleteAccount: async (): Promise<ApiResponse<void>> => {
    return await apiService.delete<void>("/users/me");
  },

  /**
   * Check if a college is bookmarked
   * GET /api/userProfile/isCollegeBookmarked/{collegeId}
   */
  isCollegeBookmarked: async (collegeId: number): Promise<any> => {
    return await apiService.get(`/userProfile/isCollegeBookmarked/${collegeId}`);
  },

  /**
   * Bookmark a college
   * POST /api/userProfile/bookmark/college?collegeId={collegeId}
   * Note: accessToken is sent in Authorization header automatically via interceptor
   * Backend may also require accessToken in body (keeping it for compatibility)
   */
  bookmarkCollege: async (userId: number, collegeId: number): Promise<any> => {
    // Check if accessToken exists (interceptor will handle adding it to headers)
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      throw new Error("Access token not found. Please login again.");
    }
    
    logger.log('🔹 Bookmark College API Call:', {
      collegeId,
      url: `/userProfile/bookmark/college`,
      params: { collegeId },
      hasToken: !!accessToken
    });
    
    // Let interceptor handle Authorization header (enables automatic token refresh)
    // Include accessToken in body if backend requires it
    return await apiService.post(
      `/userProfile/bookmark/college`,
      { accessToken }, // Backend may require this in body
      {
        params: {
          collegeId: collegeId
        }
        // Don't manually set Authorization header - interceptor handles it
        // This ensures token refresh works when token expires
      }
    );
  },

  /**
   * Unbookmark a college
   * POST /api/userProfile/unbookmark/college?collegeId={collegeId}
   * Note: accessToken is sent in Authorization header automatically via interceptor
   * Backend may also require accessToken in body (keeping it for compatibility)
   */
  unbookmarkCollege: async (userId: number, collegeId: number): Promise<any> => {
    // Check if accessToken exists (interceptor will handle adding it to headers)
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      throw new Error("Access token not found. Please login again.");
    }
    
    logger.log('🔹 Unbookmark College API Call:', {
      collegeId,
      url: `/userProfile/unbookmark/college`,
      params: { collegeId },
      hasToken: !!accessToken
    });
    
    // Let interceptor handle Authorization header (enables automatic token refresh)
    // Include accessToken in body if backend requires it
    return await apiService.post(
      `/userProfile/unbookmark/college`,
      { accessToken }, // Backend may require this in body
      {
        params: {
          collegeId: collegeId
        }
        // Don't manually set Authorization header - interceptor handles it
        // This ensures token refresh works when token expires
      }
    );
  },
};
