// import apiClient, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "./apiClient";

// /**
//  * Generic API Response wrapper
//  */
// export interface ApiResponse<T = any> {
//   data: T;
//   statusCode: number;
//   message?: string;
//   success?: boolean;
// }

// /**
//  * Generic API Error wrapper
//  */
// export interface ApiError {
//   message: string;
//   statusCode?: number;
//   errors?: Record<string, string[]>;
// }

// /**
//  * Request configuration options
//  */
// export interface RequestConfig extends AxiosRequestConfig {
//   skipAuth?: boolean; // Skip adding auth token
//   skipErrorHandling?: boolean; // Skip global error handling
// }

// /**
//  * Generic API Service Class
//  * Provides common HTTP methods with standardized error handling and type safety
//  */
// class ApiService {
//   private client: AxiosInstance;

//   constructor(client: AxiosInstance = apiClient) {
//     this.client = client;
//   }

//   /**
//    * Handle API errors consistently
//    */
//   private handleError(error: AxiosError): ApiError {
//     if (error.response) {
//       // Server responded with error status
//       const errorData = error.response.data as any;
//       return {
//         message: errorData?.message || error.message || "An error occurred",
//         statusCode: error.response.status,
//         errors: errorData?.errors,
//       };
//     } else if (error.request) {
//       // Request was made but no response received
//       return {
//         message: "No response from server. Please check your connection.",
//         statusCode: 0,
//       };
//     } else {
//       // Something else happened
//       return {
//         message: error.message || "An unexpected error occurred",
//       };
//     }
//   }

//   /**
//    * Extract data from response
//    */
//   private extractData<T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> {
//     // If response.data already has the structure we expect, return it
//     if (response.data && typeof response.data === 'object' && 'statusCode' in response.data) {
//       return response.data as ApiResponse<T>;
//     }

//     // Otherwise wrap it
//     return {
//       data: response.data as T,
//       statusCode: response.status,
//       success: response.status >= 200 && response.status < 300,
//     };
//   }

//   /**
//    * GET request
//    */
//   async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
//     try {
//       const response = await this.client.get<ApiResponse<T>>(url, config);
//       return this.extractData(response);
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * POST request
//    */
//   async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
//     try {
//       const response = await this.client.post<ApiResponse<T>>(url, data, config);
//       return this.extractData(response);
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * PUT request
//    */
//   async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
//     try {
//       const response = await this.client.put<ApiResponse<T>>(url, data, config);
//       return this.extractData(response);
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * PATCH request
//    */
//   async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
//     try {
//       const response = await this.client.patch<ApiResponse<T>>(url, data, config);
//       return this.extractData(response);
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * DELETE request
//    */
//   async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
//     try {
//       const response = await this.client.delete<ApiResponse<T>>(url, config);
//       return this.extractData(response);
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * Upload file(s) with FormData
//    */
//   async upload<T = any>(
//     url: string,
//     formData: FormData,
//     config?: RequestConfig
//   ): Promise<ApiResponse<T>> {
//     try {
//       const uploadConfig: RequestConfig = {
//         ...config,
//         headers: {
//           ...config?.headers,
//           "Content-Type": "multipart/form-data",
//         },
//       };
//       const response = await this.client.post<ApiResponse<T>>(url, formData, uploadConfig);
//       return this.extractData(response);
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * Download file
//    */
//   async download(url: string, config?: RequestConfig): Promise<Blob> {
//     try {
//       const response = await this.client.get(url, {
//         ...config,
//         responseType: "blob",
//       });
//       return response.data;
//     } catch (error) {
//       const apiError = this.handleError(error as AxiosError);
//       throw apiError;
//     }
//   }

//   /**
//    * Get the underlying axios instance (for advanced use cases)
//    */
//   getClient(): AxiosInstance {
//     return this.client;
//   }
// }

// // Export singleton instance
// export const apiService = new ApiService();

// // Export class for creating custom instances
// export default ApiService;

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosRequestHeaders } from "axios";
import { logger } from "@/utils/logger";

/**
 * ------------------------------------
 * Get API Base URL
 * 
 * Priority order:
 * 1. VITE_API_BASE_URL env var (set during build) - explicit override
 * 2. Production domain (cm-dev.getsenda.com) -> use "/api" (same domain, no CORS)
 * 3. localhost -> use "/api" (for local dev/preview with proxy)
 * 4. DEV mode -> use "/api" (Vite dev server proxy)
 * 5. Fallback -> full API URL (for other cases)
 * 
 * Since production frontend and API are on same domain (cm-dev.getsenda.com),
 * using relative "/api" path works perfectly for both dev and prod!
 * ------------------------------------
 */
const getApiBaseURL = (): string => {
  // Priority 1: Use VITE_API_BASE_URL if set (explicit override)
  if (process.env.VITE_API_BASE_URL) {
    return process.env.VITE_API_BASE_URL;
  }

  // Priority 2: If running on production domain (cm-dev.getsenda.com), use relative path
  // Frontend and API are on same domain, so /api works perfectly (no CORS issues)
  if (typeof window !== 'undefined' && window.location.hostname === 'cm-dev.getsenda.com') {
    return "/api";
  }

  // Priority 3: If running on localhost (dev or preview), use relative path for proxy
  // This prevents CORS issues when testing locally with server.js or vite preview
  if (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return "/api";
  }

  // Priority 4: In development mode, use relative path for Vite proxy
  if (process.env.NODE_ENV === 'development') {
    return "/api";
  }

  // Priority 5: Fallback (shouldn't reach here in normal cases)
  // Default to relative path since production uses same domain
  return "/api";
};

/**
 * ------------------------------------
 * Create Axios Client
 * ------------------------------------
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  // Enable credentials to send/receive httpOnly cookies (for refresh token)
  withCredentials: true,
});

/**
 * ------------------------------------
 * Attach Access Token
 * ------------------------------------
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = (config.headers || {}) as AxiosRequestHeaders;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ------------------------------------
 * Handle Refresh Token (401)
 * 
 * Best Practice:
 * - Access Token: localStorage (short-lived, client needs it)
 * - Refresh Token: httpOnly cookie (secure, set by backend)
 * 
 * Flow:
 * 1. On 401, call /auth/refresh (cookie sent automatically)
 * 2. Backend validates refresh token from cookie
 * 3. Backend returns new access token in response body
 * 4. Store new access token in localStorage
 * ------------------------------------
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        logger.log('🔄 Access token expired, attempting to refresh...');
        const baseURL = getApiBaseURL();
        const refreshUrl = baseURL.endsWith("/")
          ? baseURL + "auth/refresh"
          : baseURL + "/auth/refresh";

        // Call refresh endpoint - refresh token sent automatically via httpOnly cookie
        // If backend doesn't use cookies yet, it may still accept refreshToken in body (fallback)
        const refreshTokenFromStorage = localStorage.getItem("refreshToken");
        const refreshPayload = refreshTokenFromStorage
          ? { refreshToken: refreshTokenFromStorage } // Fallback for non-cookie setup
          : {}; // Prefer cookie-based approach

        logger.log('🔄 Calling refresh endpoint:', {
          url: refreshUrl,
          hasRefreshToken: !!refreshTokenFromStorage,
          withCredentials: true
        });

        const res = await axios.post(refreshUrl, refreshPayload, {
          withCredentials: true, // Ensure cookies are sent
        });

        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          logger.log('✅ Token refreshed successfully');
          // Store new access token (short-lived, OK in localStorage)
          localStorage.setItem("accessToken", newAccessToken);

          // If backend sends new refresh token in response (non-cookie setup), store it
          // Otherwise, refresh token is in httpOnly cookie (preferred)
          if (res.data?.refreshToken) {
            localStorage.setItem("refreshToken", res.data.refreshToken);
          }

          // Retry original request with new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          logger.error('❌ Refresh response missing accessToken');
          throw new Error('Refresh response missing accessToken');
        }
      } catch (err: any) {
        logger.error('❌ Token refresh failed:', {
          error: err,
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        // Clear tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Skip redirect for optional requests (e.g. profile prefill on form) so user stays on page
        const skipRedirect = (originalRequest as any).skipAuthRedirectOnRefreshFailure;
        if (!skipRedirect) {
          const redirectUrl = "/auth?redirect=" + encodeURIComponent(window.location.pathname + window.location.search);
          window.location.href = redirectUrl;
        }
      }
    }

    return Promise.reject(error);
  }
);

/**
 * ------------------------------------
 * Unified response type
 * ------------------------------------
 */
export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;           // optional
  otpToken?: string;  // special OTP field
  accessToken?: string;
  refreshToken?: string;
  user?: any;
}

/**
 * ------------------------------------
 * API Error type
 * ------------------------------------
 */
export interface ApiError {
  statusCode: number;
  message: string;
}

/**
 * ------------------------------------
 * Simple API Service
 * ------------------------------------
 */
class ApiService {
  client: AxiosInstance;

  constructor(client: AxiosInstance = apiClient) {
    this.client = client;
  }

  /**
   * Clean error object
   */
  private formatError(error: AxiosError): ApiResponse {
    let errorMessage = error.message;

    if (error.response?.data) {
      // If response.data is a string, use it directly
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      }
      // Check for message field
      else if ((error.response.data as any)?.message) {
        errorMessage = (error.response.data as any).message;
      }
      // Check for error field
      else if ((error.response.data as any)?.error) {
        errorMessage = (error.response.data as any).error;
      }
    }

    return {
      statusCode: error.response?.status || 500,
      message: errorMessage,
    };
  }

  /**
   * GET
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.client.get<any>(url, config);
      const responseData = response.data;

      // If response is empty or null, log warning
      if (responseData === null || responseData === undefined || responseData === '') {
        logger.warn(`⚠️ GET ${url}: Response data is empty (null/undefined/empty string)`);
        logger.warn('   Response headers:', response.headers);
        logger.warn('   Content-Type:', response.headers['content-type']);
      }

      // Return response data as-is (could be array, object, or ApiResponse structure)
      return responseData;
    } catch (error) {
      throw this.formatError(error as AxiosError);
    }
  }

  /**
   * POST
   */
  async post<T>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      logger.log('🌐 apiService.post called:', {
        url,
        fullUrl: this.client.defaults.baseURL + url,
        payload,
        config
      });
      const response = await this.client.post<any>(url, payload, config);
      logger.log('✅ apiService.post response:', response);
      const responseData = response.data;

      // If response is empty or null, log warning
      if (responseData === null || responseData === undefined || responseData === '') {
        logger.warn(`⚠️ POST ${url}: Response data is empty (null/undefined/empty string)`);
        logger.warn('   Response headers:', response.headers);
        logger.warn('   Content-Type:', response.headers['content-type']);
      }

      // Return response data as-is (could be array, object, or ApiResponse structure)
      return responseData;
    } catch (error) {
      logger.error('❌ apiService.post error:', error);
      throw this.formatError(error as AxiosError);
    }
  }

  /**
   * PUT
   */
  async put<T>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, payload, config);
      return response.data;
    } catch (error) {
      throw this.formatError(error as AxiosError);
    }
  }

  /**
   * PATCH
   */
  async patch<T>(url: string, payload?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<ApiResponse<T>>(url, payload, config);
      return response.data;
    } catch (error) {
      throw this.formatError(error as AxiosError);
    }
  }

  /**
   * DELETE
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.formatError(error as AxiosError);
    }
  }
}

/**
 * Export Instance
 */
export const apiService = new ApiService();
export default ApiService;
