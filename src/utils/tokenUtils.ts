/**
 * Utility functions for JWT token management
 */

import { logger } from "./logger";

/**
 * Decode JWT token payload (without verification)
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export const decodeJWT = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    logger.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Get token expiration time
 * @param token - JWT token string
 * @returns Expiration timestamp (seconds) or null
 */
export const getTokenExpiration = (token: string): number | null => {
  const decoded = decodeJWT(token);
  return decoded?.exp || null;
};

/**
 * Check if token is expired
 * @param token - JWT token string
 * @returns true if expired, false if valid, null if invalid token
 */
export const isTokenExpired = (token: string): boolean | null => {
  const exp = getTokenExpiration(token);
  if (exp === null) return null;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

/**
 * Get time until token expires
 * @param token - JWT token string
 * @returns Time in seconds until expiration, or null if invalid/expired
 */
export const getTimeUntilExpiration = (token: string): number | null => {
  const exp = getTokenExpiration(token);
  if (exp === null) return null;
  
  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeft = exp - currentTime;
  
  return timeLeft > 0 ? timeLeft : 0;
};

/**
 * Get token lifetime in seconds
 * @param token - JWT token string
 * @returns Total lifetime in seconds (exp - iat), or null if invalid
 */
export const getTokenLifetime = (token: string): number | null => {
  const decoded = decodeJWT(token);
  if (!decoded?.exp || !decoded?.iat) return null;
  
  return decoded.exp - decoded.iat;
};

/**
 * Format time remaining in human-readable format
 * @param seconds - Time in seconds
 * @returns Formatted string (e.g., "1 hour 30 minutes" or "45 minutes")
 */
export const formatTimeRemaining = (seconds: number): string => {
  if (seconds <= 0) return "Expired";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return minutes > 0 
      ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`
      : `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${secs} second${secs > 1 ? 's' : ''}`;
  }
};

/**
 * Get access token info from localStorage
 * @returns Object with token info or null
 */
export const getAccessTokenInfo = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  
  const decoded = decodeJWT(token);
  if (!decoded) return null;
  
  const exp = decoded.exp;
  const iat = decoded.iat;
  const lifetime = exp - iat;
  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeft = exp - currentTime;
  const isExpired = timeLeft <= 0;
  
  return {
    token,
    decoded,
    issuedAt: new Date(iat * 1000),
    expiresAt: new Date(exp * 1000),
    lifetimeSeconds: lifetime,
    lifetimeFormatted: formatTimeRemaining(lifetime),
    timeRemainingSeconds: Math.max(0, timeLeft),
    timeRemainingFormatted: formatTimeRemaining(timeLeft),
    isExpired,
    expiresIn: lifetime // Total lifetime in seconds
  };
};

