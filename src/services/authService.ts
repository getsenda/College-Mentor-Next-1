import { apiService, ApiResponse } from "./apiService";

export interface SendOtpPayload {
  type: "MOBILE" | "EMAIL";
  value: string;
  category: "LOGIN" | "SIGNUP";
}

export interface SendOtpResponse {
  otpToken: string | null;
  message?: string;
  statusCode: number;
}

export interface VerifyOtpPayload {
  type: "MOBILE" | "EMAIL";
  value: string;
  otp: string;
  otpToken: string;
  category: "LOGIN" | "SIGNUP";
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  mobileVerified: boolean;
  emailVerified: boolean;
  educationLevel: string | null;
  board: string | null;
  schoolStream: string | null;
  interestedStream: string | null;
  interestedCourses: string | null;
  preferredFees: string | null;
  preferredState: string | null;
  preferredCity: string | null;
  currentLocation: string | null;
  termsAccepted: boolean;
  profileStatus: string;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VerifyOtpResponse {
  statusCode: number;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
  otpToken: string | null;
}

export interface RegisterBasicPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export interface RegisterEducationPayload {
  educationLevel: string;
  board?: string;
  pursuingCourse?: string;
  stream?: string;
  course?: string;
  preferredFees: string;
  preferredCity: string[];
  preferredState: string[];
  currentLocation: string;
}

export const authService = {
  /**
   * -----------------------------------------
   * SEND OTP
   * -----------------------------------------
   */
  sendOtp: async (payload: SendOtpPayload): Promise<any> => {
    const res = await apiService.post<SendOtpResponse>("/auth/send-otp", payload);
    return res; // direct backend response
  },

  /**
   * -----------------------------------------
   * VERIFY OTP
   * -----------------------------------------
   */
  verifyOtp: async (payload: VerifyOtpPayload): Promise<any> => {
    const res = await apiService.post<VerifyOtpResponse>("/auth/verify-otp", payload);
    return res; // direct backend response
  },

  /**
   * -----------------------------------------
   * REGISTER BASIC
   * -----------------------------------------
   */
  registerBasic: async (data: RegisterBasicPayload): Promise<any> => {
    const res = await apiService.post("/auth/register-basic", data);
    return res;
  },

  /**
   * -----------------------------------------
   * REGISTER EDUCATION
   * -----------------------------------------
   */
  registerEducation: async (data: RegisterEducationPayload): Promise<any> => {
    const res = await apiService.post("/auth/register-education", data);
    return res;
  },
};
