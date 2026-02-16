import { apiService, ApiResponse } from "./apiService";

/**
 * Supported share platforms
 */
export type SharePlatform =
    | "whatsapp"
    | "facebook"
    | "linkedin"
    | "twitter"
    | "telegram";

/**
 * API response type
 */
export interface ShareCollegeResponse {
    shareUrl: string;
}

/**
 * Share a college page via backend share APIs
 */
export const shareCollege = (
    platform: SharePlatform,
    urlToShare: string
): Promise<ApiResponse<ShareCollegeResponse>> => {
    return apiService.get<ShareCollegeResponse>(
        `/share/${platform}`,
        {
            params: {
                urlToShare,
            },
        }
    );
};
