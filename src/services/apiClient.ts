import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { logger } from "@/utils/logger";

/**
 * Get API base URL
 * 
 * See apiService.ts for detailed documentation on priority order
 * 
 * Since production frontend and API are on same domain (cm-dev.getsenda.com),
 * using relative "/api" path works perfectly for both dev and prod!
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
  // This prevents CORS issues when testing locally
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

const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          // Attempt to refresh token
          const baseURL = getApiBaseURL();
          const refreshUrl = baseURL.endsWith("/")
            ? baseURL + "auth/refresh"
            : baseURL + "/auth/refresh";
          const response = await axios.post(refreshUrl, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 🔹 Log every request (only in development)
if (process.env.NODE_ENV === 'development') {
  apiClient.interceptors.request.use((config) => {
    logger.log("➡️ API Request:");
    logger.log("URL:", (config.baseURL ?? "") + (config.url ?? ""));
    logger.log("Method:", config.method?.toUpperCase());
    logger.log("Data:", config.data);
    return config;
  });

  // 🔹 Log every response (only in development)
  apiClient.interceptors.response.use(
    (response) => {
      logger.log("✅ API Response:", response.config.url);
      logger.log("   Status:", response.status, response.statusText);
      logger.log("   Headers:", response.headers);
      logger.log("   Content-Type:", response.headers['content-type']);
      logger.log("   Data:", response.data);

      // Warn if response body is empty but status is 200
      if (response.status === 200 && (response.data === null || response.data === undefined || response.data === '')) {
        logger.warn("⚠️ Warning: 200 OK but response body is empty/null");
      }

      return response;
    },
    (error) => {
      logger.error("❌ API Error:", error.config?.url);
      if (error.response) {
        logger.error("   Status:", error.response.status, error.response.statusText);
        logger.error("   Headers:", error.response.headers);
        logger.error("   Data:", error.response.data);
      } else {
        logger.error("   Message:", error.message);
      }
      return Promise.reject(error);
    }
  );
}

export default apiClient;
export type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";