"use client"
import { useState, useEffect } from "react";
import { homepageService, HomepageData } from "@/services/homepageService";
import { logger } from "@/utils/logger";
import { ApiResponse } from "@/services/apiService";

export const useHomepageData = () => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await homepageService.getHomepageData();
        logger.log("Homepage API Response:", response);

        // The API returns data directly (not wrapped in a 'data' property)
        // Response structure from apiService: { statusCode, message, data?: T }
        // But the actual API endpoint returns the homepage data directly
        let homepageData: HomepageData | null = null;

        if (response && typeof response === 'object') {
          // Case 1: Response has a 'data' property (wrapped in ApiResponse structure)
          if ('data' in response && response.data && typeof response.data === 'object') {
            // Check if response.data has the structure of HomepageData (has 'hero' property)
            if ('hero' in response.data) {
              homepageData = response.data as HomepageData;
            }
          }
          // Case 2: Response itself is the homepage data (direct API response - has 'hero' property)
          else if ('hero' in response) {
            homepageData = response as unknown as HomepageData;
          }
        }

        if (homepageData) {
          logger.log("Homepage data extracted successfully");
          logger.log("Hero title:", homepageData.hero?.title);
          logger.log("Hero subtitle:", homepageData.hero?.subtitle);
          setData(homepageData);
        } else {
          logger.warn("Unable to extract homepage data from response structure:", response);
          setData(null);
        }
      } catch (err) {
        const errorResponse: ApiResponse = {
          statusCode: (err as any).statusCode || 500,
          message: (err as any).message || "Failed to fetch homepage data",
        };
        setError(errorResponse);
        logger.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return { data, loading, error };
};

