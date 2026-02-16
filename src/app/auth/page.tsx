'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { ChevronDown, ArrowLeft, Smartphone, Mail, Globe, User } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import authSlide1 from '../../../public/assets/auth-slide-1.jpg';
import authSlide2 from '../../../public/assets/auth-slide-2.jpg';
import authSlide3 from '../../../public/assets/auth-slide-3.jpg';
import authSlide4 from '../../../public/assets/auth-slide-4.jpg';
import { authService, SendOtpPayload, VerifyOtpPayload } from '@/services/authService';
import { toast } from 'sonner';
import { profileFormSchema } from '@/components/profile/profileSchema';
import { logger } from '@/utils/logger';

// Country data with flag URLs
const countries = [
    { code: 'IN', name: 'India', dialCode: '+91', flag: 'https://flagcdn.com/w20/in.png' },
    { code: 'US', name: 'United States', dialCode: '+1', flag: 'https://flagcdn.com/w20/us.png' },
    { code: 'UK', name: 'United Kingdom', dialCode: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'https://flagcdn.com/w20/au.png' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'https://flagcdn.com/w20/de.png' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: 'https://flagcdn.com/w20/jp.png' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: 'https://flagcdn.com/w20/sg.png' }
];

// City-State mapping data
const cityStateMapping = {
    'Mumbai': 'Maharashtra',
    'Pune': 'Maharashtra',
    'Delhi': 'Delhi',
    'Bangalore': 'Karnataka',
    'Chennai': 'Tamil Nadu',
    'Hyderabad': 'Telangana',
    'Kolkata': 'West Bengal',
    'Ahmedabad': 'Gujarat'
};

const states = [
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Telangana',
    'West Bengal',
    'Gujarat',
    'Uttar Pradesh'
];

const cities = Object.keys(cityStateMapping);

// Carousel data with high-resolution images
const carouselData = [
    {
        image: authSlide1,
        title: 'Find Your Dream College',
        description: 'Explore top colleges and universities tailored to your preferences and career goals'
    },
    {
        image: authSlide2,
        title: 'Expert Guidance',
        description: 'Get personalized mentorship from experienced professionals who understand your journey'
    },
    {
        image: authSlide3,
        title: 'Secure Your Future',
        description: 'Make informed decisions about your academic journey with our comprehensive guidance'
    },
    {
        image: authSlide4,
        title: 'Join Success Stories',
        description: 'Be part of thousands of students who have achieved their dreams with our support'
    }
];

export default function AuthPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState('IN (+91)');
    const [phone, setPhone] = useState('');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [activeTab, setActiveTab] = useState('mobile');
    const [registerStep, setRegisterStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [board, setBoard] = useState('');
    const [stream, setStream] = useState('');
    const [course, setCourse] = useState('');
    const [pursuingCourse, setPursuingCourse] = useState('');
    const [preferredFees, setPreferredFees] = useState('');
    const [preferredCity, setPreferredCity] = useState<string[]>([]);
    const [preferredState, setPreferredState] = useState<string[]>([]);
    const [currentLocation, setCurrentLocation] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    // ✅ Add these states
    const [otpToken, setOtpToken] = useState<string | null>(null);
    // OTP states
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    // Track if phone was already verified during login (skip OTP for signup)
    const [phoneAlreadyVerified, setPhoneAlreadyVerified] = useState(false);

    // Validation states
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useRouter();
    const [profileStatus, setProfileStatus] = useState<string | null>(null);

    // Ref for OTP input section (for auto-scroll)
    const signupOtpRef = useRef<HTMLDivElement>(null);

    // Initialize profile status from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setProfileStatus(user?.profileStatus || null);
            } catch (e) {
                logger.error("Error parsing stored user:", e);
            }
        }
    }, []);

    // Helper function to get selected country object
    const getSelectedCountry = () => {
        const [code, dialCode] = selectedCountry.split(' ');
        return countries.find(country => country.code === code && country.dialCode === dialCode) || countries[0];
    };

    // Handle city selection
    const handleCityChange = (selectedCity: string) => {
        if (selectedCity && !preferredCity.includes(selectedCity)) {
            setPreferredCity([...preferredCity, selectedCity]);
        }
    };

    // Handle state selection
    const handleStateChange = (selectedState: string) => {
        if (selectedState && !preferredState.includes(selectedState)) {
            setPreferredState([...preferredState, selectedState]);
        }
    };

    // Remove city from selection
    const removeCity = (cityToRemove: string) => {
        setPreferredCity(preferredCity.filter(city => city !== cityToRemove));
    };

    // Remove state from selection
    const removeState = (stateToRemove: string) => {
        setPreferredState(preferredState.filter(state => state !== stateToRemove));
    };

    // Auto-scroll carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Prevent body scrolling when on auth page
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close country dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showCountryDropdown) {
                setShowCountryDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCountryDropdown]);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const access = params.get("access");
        const refresh = params.get("refresh");
        const profileStatus = params.get("profileStatus");
        const firstName = params.get("firstName");
        const lastName = params.get("lastName");
        const email = params.get("email");

        if (!access) return; // Not OAuth callback

        // Save access token (short-lived, stored in localStorage)
        localStorage.setItem("accessToken", access);

        // Refresh token handling:
        // - If backend sets httpOnly cookie: No need to store in localStorage (more secure)
        // - If backend sends in response: Store as fallback (less secure but works)
        // Note: Best practice is httpOnly cookie, but we support both approaches
        if (refresh) {
            // Only store if backend doesn't use httpOnly cookies
            // You can remove this line once backend uses httpOnly cookies
            localStorage.setItem("refreshToken", refresh);
        }

        // Save user
        const user = { firstName, lastName, email, profileStatus };
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect logic based on profileStatus
        if (profileStatus === "COMPLETED" || profileStatus === "BASIC_COMPLETED") {
            // ✅ Fully onboarded or basic completed → go to home
            navigate.replace("/");
        } else {
            // ✅ INCOMPLETE or new user → open Sign up, Step 1
            setIsLogin(false);
            setRegisterStep(1);

            // Auto-fill form fields from OAuth callback data
            if (firstName) setFirstName(firstName);
            if (lastName) setLastName(lastName);
            if (email) setEmail(email);

            // Clean URL to /auth (stay on auth page for step 1)
            window.history.replaceState({}, "", "/auth");
        }
    }, [navigate]);



    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };
    const validateOTP = (otp: string) => {
        return /^\d{6}$/.test(otp.trim());
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Mobile number is required';
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit mobile number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep1WithOtp = () => {
        const newErrors: { [key: string]: string } = {};

        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!phone.trim()) {
            newErrors.phone = 'Mobile number is required';
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit mobile number';
        }
        if (!otp.trim()) {
            newErrors.otp = 'OTP is required';
        } else if (!validateOTP(otp)) {
            newErrors.otp = 'Please enter a valid 6-digit OTP';




        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleGoogleLogin = () => {
        window.location.href = "https://cm-dev.getsenda.com/oauth2/authorization/google";
    };


    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!educationLevel) newErrors.educationLevel = 'Level of education is required';

        // For Class 8-10: Show board field
        if (educationLevel === 'Class 8-10' && !board) {
            newErrors.board = 'Educational board is required';
        }

        // For Class 11-12: Show pursuing course field
        if (educationLevel === 'Class 11-12' && !pursuingCourse) {
            newErrors.pursuingCourse = 'Course you are pursuing is required';
        }

        // For Graduation and Post Graduation: Show stream and course fields
        if ((educationLevel === 'Graduation' || educationLevel === 'Post Graduation')) {
            if (!stream) newErrors.stream = 'Stream is required';
            if (!course) newErrors.course = 'Course is required';
        }

        if (!acceptTerms) newErrors.acceptTerms = 'Please accept the terms and conditions';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateLogin = () => {
        const newErrors: { [key: string]: string } = {};

        if (activeTab === 'mobile' || activeTab === 'whatsapp') {
            if (!phone.trim()) {
                newErrors.phone = 'Mobile number is required';
            } else if (!validatePhone(phone)) {
                newErrors.phone = 'Please enter a valid 10-digit mobile number';
            }
        } else if (activeTab === 'email') {
            if (!email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!validateEmail(email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handleSendOtp = () => {
    //   if (validateLogin()) {
    //     setIsSubmitting(true);
    //     // Simulate API call
    //     setTimeout(() => {
    //       setIsSubmitting(false);
    //       setShowOtpInput(true);
    //       setOtpSent(true);
    //     }, 2000);
    //   }
    // };


    const handleSignupSendOtp = async () => {
        if (!validateStep1()) return;

        try {
            setIsSubmitting(true);

            const payload: SendOtpPayload = {
                type: "MOBILE",
                value: phone,
                category: "SIGNUP",
            };

            logger.log("🔹 Signup Send OTP Payload:", payload);

            const response = await authService.sendOtp(payload);

            logger.log("🔹 Signup OTP Response:", response);

            const token = response.otpToken; // backend returns otpToken at root

            if (!token) {
                toast.error("OTP token missing in API response.");
                return;
            }

            setOtpToken(token);
            setShowOtpInput(true);

            // Auto-scroll to OTP input after a small delay to allow rendering
            setTimeout(() => {
                signupOtpRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            toast.success(response.message || "OTP sent!");
        } catch (err: any) {
            toast.error(err.message || "Failed to send OTP");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSignupVerifyOtp = async () => {
        const cleanOtp = otp.trim();

        if (!validateOTP(cleanOtp)) {
            setErrors({ otp: "Please enter a valid 6-digit OTP" });
            return;
        }

        if (!otpToken) {
            toast.error("OTP token missing. Please resend OTP.");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload: VerifyOtpPayload = {
                type: "MOBILE",
                value: phone,
                otp: cleanOtp,
                otpToken,
                category: "SIGNUP",
            };

            logger.log("🔹 Signup Verify OTP Payload:", payload);

            const response = await authService.verifyOtp(payload);

            logger.log("🔹 Signup Verify OTP Response:", response);

            if (response.statusCode === 200) {
                toast.success(response.message || "OTP verified!");

                /** 2️⃣ Save Basic Registration */
                const basicPayload = {
                    firstName,
                    lastName,
                    email,
                    mobile: phone,
                };

                logger.log("🔹 Register Basic Payload:", basicPayload);

                const registerRes = await authService.registerBasic(basicPayload);

                logger.log("🔹 Register Basic Response:", registerRes);

                if (registerRes.statusCode === 200) {
                    if (registerRes.user) {
                        localStorage.setItem("user", JSON.stringify(registerRes.user));
                    } else {
                        const existing = localStorage.getItem("user");
                        const merged = existing ? { ...JSON.parse(existing), firstName, lastName, email, mobileNumber: phone, mobile: phone } : { firstName, lastName, email, mobileNumber: phone, mobile: phone };
                        localStorage.setItem("user", JSON.stringify(merged));
                    }
                    toast.success("Basic profile saved!");
                    setRegisterStep(2);
                    setShowOtpInput(false);
                    setPhoneAlreadyVerified(false); // Reset flag
                } else {
                    toast.error(registerRes.message || "Failed to save basic info");
                }
            } else {
                toast.error(response.message || "OTP verification failed");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to verify OTP");
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Continue to Step 2 without OTP verification
     * Used when user already verified phone during login
     */
    const handleContinueWithoutOtp = async () => {
        // Validate basic info first
        if (!validateStep1()) return;

        try {
            setIsSubmitting(true);

            /** Save Basic Registration (phone already verified during login) */
            const basicPayload = {
                firstName,
                lastName,
                email,
                mobile: phone,
            };

            logger.log("🔹 Register Basic Payload (phone already verified):", basicPayload);

            const registerRes = await authService.registerBasic(basicPayload);

            logger.log("🔹 Register Basic Response:", registerRes);

            if (registerRes.statusCode === 200) {
                if (registerRes.user) {
                    localStorage.setItem("user", JSON.stringify(registerRes.user));
                } else {
                    const existing = localStorage.getItem("user");
                    const merged = existing ? { ...JSON.parse(existing), firstName, lastName, email, mobileNumber: phone, mobile: phone } : { firstName, lastName, email, mobileNumber: phone, mobile: phone };
                    localStorage.setItem("user", JSON.stringify(merged));
                }
                toast.success("Basic profile saved!");
                setRegisterStep(2);
                setPhoneAlreadyVerified(false); // Reset flag
            } else {
                toast.error(registerRes.message || "Failed to save basic info");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to save basic info");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStep2Submit = async () => {
        if (!validateStep2()) return;

        try {
            setIsSubmitting(true);

            let payload: any = {
                educationLevel,
                preferredFees,
                preferredState,
                preferredCity,
                currentLocation,
                termsAccepted: acceptTerms, // IMPORTANT
            };

            // 🎓 CASE A — Class 8–10
            if (educationLevel === "Class 8-10") {
                payload.board = board;
            }

            // 🎓 CASE B — Class 11–12
            if (educationLevel === "Class 11-12") {
                payload.board = board;
                payload.schoolStream = pursuingCourse; // mapping field
            }

            // 🎓 CASE C — UG / PG / Diploma
            if (educationLevel === "Graduation" || educationLevel === "Post Graduation") {
                payload.interestedStream = stream;
                payload.interestedCourses = course ? [course] : [];
            }

            logger.log("📤 Final Payload:", payload);

            const response = await authService.registerEducation(payload);

            logger.log("📥 Register Education Response:", response);

            if (response.statusCode === 200) {
                toast.success("Registration completed!");
                navigate.push("/");
            } else {
                toast.error(response.message || "Failed to submit education details");
            }

        } catch (err: any) {
            toast.error(err.message || "Failed to submit");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendOtp = async () => {
        // Validate login input (email or mobile)
        if (!validateLogin()) return;

        try {
            setIsSubmitting(true);

            // Build payload with correct literal types
            const payload: SendOtpPayload = {
                type: activeTab === "email" ? "EMAIL" : "MOBILE",
                value: activeTab === "email" ? email : phone,
                category: "LOGIN",
            };

            logger.log("🔹 Sending OTP with payload:", payload);

            // Call backend
            const response = await authService.sendOtp(payload);

            logger.log("🔹 FULL SEND OTP RESPONSE:", response);

            // Extract OTP Token from backend response
            const token = response.otpToken; // backend sends otpToken at root level

            logger.log("🔹 Extracted OTP Token:", token);

            // Handle missing token
            if (!token) {
                toast.error("OTP token missing in API response.");
                return;
            }

            // Store token
            setOtpToken(token);

            // Show OTP input UI
            setShowOtpInput(true);
            setOtpSent(true);

            toast.success(response.message || "OTP sent successfully!");

        } catch (err: any) {
            logger.error("❌ SEND OTP ERROR:", err);
            toast.error(err.message || "Failed to send OTP");
        } finally {
            setIsSubmitting(false);
        }
    };



    // ✅ Replace your fake handleVerifyOtp
    const handleVerifyOtp = async () => {
        const cleanOtp = otp.trim();

        if (!validateOTP(cleanOtp)) {
            setErrors({ otp: "Please enter a valid 6-digit OTP" });
            return;
        }

        if (!otpToken) {
            toast.error("OTP token missing. Please resend OTP.");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload: VerifyOtpPayload = {
                type: activeTab === "email" ? "EMAIL" : "MOBILE",
                value: activeTab === "email" ? email : phone,
                otp: cleanOtp,
                otpToken,
                category: "LOGIN",
            };

            const response = await authService.verifyOtp(payload);

            logger.log("Verify OTP Response:", response);

            if (response.statusCode === 200) {
                // ✅ Extract all fields from API response
                const accessToken = response.accessToken;
                const refreshToken = response.refreshToken;
                const user = response.user; // Complete user object with all fields

                toast.success("Login successful!");

                // ✅ Store access token in localStorage (short-lived, OK in localStorage)
                if (accessToken) {
                    localStorage.setItem("accessToken", accessToken);

                    // Decode and log token expiration info
                    try {
                        const tokenParts = accessToken.split('.');
                        if (tokenParts.length === 3) {
                            const payload = JSON.parse(atob(tokenParts[1]));
                            const exp = payload.exp;
                            const iat = payload.iat;
                            const lifetime = exp - iat; // Total lifetime in seconds
                            const expiresAt = new Date(exp * 1000);
                            const lifetimeMinutes = Math.floor(lifetime / 60);
                            const lifetimeHours = Math.floor(lifetimeMinutes / 60);

                            logger.log("✅ Access Token Info:", {
                                issuedAt: new Date(iat * 1000).toLocaleString(),
                                expiresAt: expiresAt.toLocaleString(),
                                lifetime: `${lifetimeMinutes} minutes (${lifetimeHours > 0 ? `${lifetimeHours} hour${lifetimeHours > 1 ? 's' : ''} ` : ''}${lifetimeMinutes % 60} min)`,
                                lifetimeSeconds: lifetime
                            });
                        }
                    } catch (e) {
                        logger.log("⚠️ Could not decode token for expiration info");
                    }
                }

                // ✅ Store refresh token in localStorage
                // - If backend sets httpOnly cookie: No need to store (more secure)
                // - If backend sends in response: Store as fallback
                // Note: Best practice is httpOnly cookie, but we support both approaches
                if (refreshToken) {
                    // Only store if backend doesn't use httpOnly cookies
                    // You can remove this line once backend uses httpOnly cookies
                    localStorage.setItem("refreshToken", refreshToken);
                }

                // ✅ Store complete user object in localStorage with ALL fields:
                // - id, firstName, lastName, email, mobileNumber
                // - mobileVerified, emailVerified
                // - educationLevel, board, schoolStream, interestedStream, interestedCourses
                // - preferredFees, preferredState, preferredCity, currentLocation
                // - termsAccepted, profileStatus, onboardingComplete
                // - createdAt, updatedAt
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    logger.log("✅ User info saved to localStorage:", {
                        id: user.id,
                        name: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        mobileNumber: user.mobileNumber,
                        profileStatus: user.profileStatus,
                        onboardingComplete: user.onboardingComplete,
                        allFields: user
                    });
                }

                // 🚦 Decide where to go based on profileStatus / onboarding
                if (user && (user.profileStatus === "INCOMPLETE" || !user.onboardingComplete)) {
                    // 🔁 We are already on /auth, just switch to Sign up tab
                    setIsLogin(false);       // show Sign up
                    setRegisterStep(1);      // start at Step 1
                    setShowOtpInput(false);  // hide login OTP box
                    setOtp("");              // clear OTP

                    // Phone was already verified during login, skip OTP for signup
                    setPhoneAlreadyVerified(true);

                    // Auto-fill form fields if available from user object
                    if (user.firstName) setFirstName(user.firstName);
                    if (user.lastName) setLastName(user.lastName);
                    if (user.email) setEmail(user.email);
                    if (user.mobileNumber) setPhone(user.mobileNumber);

                    toast.message("Complete your signup to continue.");
                } else {
                    // ✅ Existing / completed user → go Home
                    navigate.push("/");
                }
            } else {
                toast.error(response.message || "OTP verification failed");
            }
        } catch (err: any) {
            logger.error("VERIFY OTP ERROR:", err);
            toast.error(err.response?.data?.message || err.message || "Failed to verify OTP");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden bg-white pt-20 pb-8">
            {/* Left Side - Carousel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={carouselData[currentSlide].image.src}
                            alt={carouselData[currentSlide].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 text-white">
                                {carouselData[currentSlide].title}
                            </h2>
                            <p className="text-sm lg:text-lg xl:text-xl opacity-90 leading-relaxed text-white">
                                {carouselData[currentSlide].description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 lg:gap-3">
                    {carouselData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Back to Home Button */}
                {/* <button
          onClick={() => navigate('/')}
          className="absolute top-6 lg:top-8 left-6 lg:left-8 text-white hover:text-gray-200 transition-colors flex items-center gap-2 text-sm lg:text-base"
        >
          <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
          Back to Home
        </button> */}
                <button
                    onClick={() => navigate.push('/')}
                    className="absolute top-6 lg:top-8 left-6 lg:left-8 text-white hover:text-gray-200 transition-colors flex items-center gap-2 text-sm lg:text-base underline underline-offset-4"
                >
                    <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                    Back to Home
                </button>

            </div>

            {/* Mobile Carousel */}
            <div className="lg:hidden relative h-32 sm:h-36 md:h-40 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={carouselData[currentSlide].image.src}
                            alt={carouselData[currentSlide].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                            <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">
                                {carouselData[currentSlide].title}
                            </h2>
                            <p className="text-xs sm:text-sm opacity-90 text-white">
                                {carouselData[currentSlide].description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Mobile Carousel Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                    {carouselData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-6 bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Mobile Back to Home Button */}
                <button
                    onClick={() => navigate.push('/')}
                    className="absolute top-3 sm:top-4 left-3 sm:left-4 text-white hover:text-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="flex-1 lg:w-1/2 flex flex-col p-4 sm:p-6 lg:p-8 xl:p-12 overflow-y-auto">
                <div className="w-full max-w-md mx-auto">


                    {/* Logo and Header */}
                    <div className="text-center space-y-2 sm:space-y-3">
                        {/* <div className="flex justify-center mb-2">
                 <img
                   src="/lovable-uploads/f76258ce-d7f2-42ce-a5a8-490fc7ec7425.png"
                   alt="CollegeMentor Logo"
                   className="h-12 w-auto object-contain"
                   onError={(e) => {
                     logger.error('Logo failed to load:', e.currentTarget.src);
                     e.currentTarget.style.display = 'none';
                   }}
                 />
               </div> */}
                        <div>
                            <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="mt-1 text-gray-600 text-xs sm:text-sm lg:text-base">
                                {isLogin ? 'Sign in to continue your journey' : 'Join thousands of students in their success journey'}
                            </p>
                        </div>
                    </div>

                    {/* Main Login/Sign up Tabs */}
                    <div className="mt-6 sm:mt-8">
                        <div className="flex justify-center space-x-8">
                            <button
                                onClick={() => {
                                    setIsLogin(true);
                                    setShowOtpInput(false);
                                    setOtpSent(false);
                                    setErrors({});
                                    setRegisterStep(1);
                                }}
                                className={`text-sm sm:text-base font-medium transition-colors ${isLogin
                                    ? 'text-primary border-b-2 border-primary pb-1'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setIsLogin(false);
                                    setShowOtpInput(false);
                                    setOtpSent(false);
                                    setErrors({});
                                    setRegisterStep(1);
                                    setPhoneAlreadyVerified(false); // Reset when manually switching to signup
                                }}
                                className={`text-sm sm:text-base font-medium transition-colors ${!isLogin
                                    ? 'text-primary border-b-2 border-primary pb-1'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>

                    {/* Auth Forms */}
                    <div className="w-full space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                        {isLogin ? (
                            <>
                                {/* Login Form */}
                                <div className="space-y-2 sm:space-y-3">
                                    {/* Login Tabs */}
                                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                        <TabsList className="grid w-full grid-cols-2 h-10 sm:h-10">
                                            <TabsTrigger value="mobile" className="text-xs flex items-center gap-1">
                                                <Smartphone size={12} className="text-blue-500" />
                                                <span>Mobile</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="email" className="text-xs flex items-center gap-1">
                                                <Mail size={12} className="text-red-500" />
                                                <span>Email</span>
                                            </TabsTrigger>
                                            {/* <TabsTrigger value="whatsapp" className="text-xs flex items-center gap-1">
                        <FaWhatsapp size={12} className="text-green-500" />
                        <span>WhatsApp</span>
                      </TabsTrigger> */}
                                        </TabsList>

                                        {/* Mobile Tab */}
                                        <TabsContent value="mobile" className="space-y-2 sm:space-y-3 mt-2 sm:mt-3">
                                            <div className="space-y-2 sm:space-y-3">
                                                <label className="text-xs font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                                                <div className="flex gap-2">
                                                    <div className="relative w-[110px]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                            className="w-full h-9 pl-2 pr-5 border border-gray-300 rounded-lg text-xs bg-white focus:border-primary focus:ring-1 focus:ring-primary flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center space-x-1">
                                                                <img
                                                                    src={getSelectedCountry().flag}
                                                                    alt={getSelectedCountry().name}
                                                                    className="w-4 h-3 object-cover rounded"
                                                                    onError={(e) => {
                                                                        e.currentTarget.style.display = 'none';
                                                                    }}
                                                                />
                                                                <span>{getSelectedCountry().code} {getSelectedCountry().dialCode}</span>
                                                            </div>
                                                            <ChevronDown className="w-3 h-3 text-gray-500" />
                                                        </button>

                                                        {showCountryDropdown && (
                                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                                {countries.map((country) => (
                                                                    <button
                                                                        key={country.code}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedCountry(`${country.code} ${country.dialCode}`);
                                                                            setShowCountryDropdown(false);
                                                                        }}
                                                                        className="w-full px-2 py-2 text-xs text-left hover:bg-gray-50 flex items-center space-x-2"
                                                                    >
                                                                        <img
                                                                            src={country.flag}
                                                                            alt={country.name}
                                                                            className="w-4 h-3 object-cover rounded"
                                                                            onError={(e) => {
                                                                                e.currentTarget.style.display = 'none';
                                                                            }}
                                                                        />
                                                                        <span>{country.code} ({country.dialCode})</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Enter mobile number"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className={`flex-1 h-9 text-xs ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                                                    />
                                                </div>
                                                {errors.phone && (
                                                    <p className="text-xs text-red-500">{errors.phone}</p>
                                                )}
                                                <Button
                                                    className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                    onClick={handleSendOtp}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Sending...' : 'Send OTP'}
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        {/* Email Tab */}
                                        <TabsContent value="email" className="space-y-2 sm:space-y-3 mt-2 sm:mt-3">
                                            <div className="space-y-2 sm:space-y-3">
                                                <label className="text-xs font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter email address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`h-9 text-xs ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-red-500">{errors.email}</p>
                                                )}
                                                <Button
                                                    className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                    onClick={handleSendOtp}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Sending...' : 'Send OTP'}
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        {/* WhatsApp Tab */}
                                        <TabsContent value="whatsapp" className="space-y-2 sm:space-y-3 mt-2 sm:mt-3">
                                            <div className="space-y-2 sm:space-y-3">
                                                <label className="text-xs font-medium text-gray-700">WhatsApp Number <span className="text-red-500">*</span></label>
                                                <div className="flex gap-2">
                                                    <div className="relative w-[110px]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                            className="w-full h-9 pl-2 pr-5 border border-gray-300 rounded-lg text-xs bg-white focus:border-primary focus:ring-1 focus:ring-primary flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center space-x-1">
                                                                <img
                                                                    src={getSelectedCountry().flag}
                                                                    alt={getSelectedCountry().name}
                                                                    className="w-4 h-3 object-cover rounded"
                                                                    onError={(e) => {
                                                                        e.currentTarget.style.display = 'none';
                                                                    }}
                                                                />
                                                                <span>{getSelectedCountry().code} {getSelectedCountry().dialCode}</span>
                                                            </div>
                                                            <ChevronDown className="w-3 h-3 text-gray-500" />
                                                        </button>

                                                        {showCountryDropdown && (
                                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                                {countries.map((country) => (
                                                                    <button
                                                                        key={country.code}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedCountry(`${country.code} ${country.dialCode}`);
                                                                            setShowCountryDropdown(false);
                                                                        }}
                                                                        className="w-full px-2 py-2 text-xs text-left hover:bg-gray-50 flex items-center space-x-2"
                                                                    >
                                                                        <img
                                                                            src={country.flag}
                                                                            alt={country.name}
                                                                            className="w-4 h-3 object-cover rounded"
                                                                            onError={(e) => {
                                                                                e.currentTarget.style.display = 'none';
                                                                            }}
                                                                        />
                                                                        <span>{country.code} ({country.dialCode})</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Enter WhatsApp number"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className={`flex-1 h-9 text-xs ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                                                    />
                                                </div>
                                                {errors.phone && (
                                                    <p className="text-xs text-red-500">{errors.phone}</p>
                                                )}
                                                <Button
                                                    className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                    onClick={handleSendOtp}
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Sending...' : 'Send OTP'}
                                                </Button>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    {/* OTP Input Section */}
                                    {showOtpInput && (
                                        <div className="space-y-2 sm:space-y-3 mt-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-700">Enter OTP <span className="text-red-500">*</span></label>
                                                <Input
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="Enter 6-digit code"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").trim())}

                                                    className={`h-9 text-xs ${errors.otp ? "border-red-500 focus:border-red-500" : ""}`}
                                                    maxLength={6}
                                                />
                                                {errors.otp && (
                                                    <p className="text-xs text-red-500">{errors.otp}</p>
                                                )}
                                            </div>
                                            <Button
                                                className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                onClick={handleVerifyOtp}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                                            </Button>
                                        </div>
                                    )}

                                    <div className="relative my-3 sm:my-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-2 sm:px-3 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    {/* Social Login Buttons */}
                                    <div className="space-y-1 sm:space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full h-9 border-2 font-medium text-xs hover:bg-gray-200 hover:text-secondary"
                                            onClick={() => {
                                                handleGoogleLogin()
                                            }}
                                        >
                                            <FcGoogle className="mr-2 h-4 w-4" />
                                            Login with Google
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-full h-9 border-2 font-medium text-xs hover:bg-gray-200 hover:text-secondary"
                                            onClick={() => { }}
                                        >
                                            <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
                                            Login with Facebook
                                        </Button>

                                        <Button
                                            variant="outline"
                                            className="w-full h-9 border-2 font-medium text-xs hover:bg-gray-200 hover:text-secondary"
                                            onClick={() => { }}
                                        >
                                            <FaLinkedin className="mr-2 h-4 w-4 text-blue-700" />
                                            Login with LinkedIn
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Sign Up Form */}
                                <div className="space-y-3 sm:space-y-4">
                                    {/* Progress Indicator */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${registerStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                1
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Basic Info</span>
                                        </div>
                                        <div className="flex-1 h-0.5 bg-gray-200 mx-3"></div>
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${registerStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                2
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">Education</span>
                                        </div>
                                    </div>

                                    {registerStep === 1 ? (
                                        <>
                                            {/* Step 1: Basic Information */}
                                            <div className="space-y-2 sm:space-y-3">
                                                <h3 className="text-sm font-semibold text-gray-900">Step 1 of 2 - Basic Information</h3>

                                                {/* First Name */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter first name"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className={`h-9 text-xs ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                                                    />
                                                    {errors.firstName && (
                                                        <p className="text-xs text-red-500">{errors.firstName}</p>
                                                    )}
                                                </div>

                                                {/* Last Name */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter last name"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className={`h-9 text-xs ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
                                                    />
                                                    {errors.lastName && (
                                                        <p className="text-xs text-red-500">{errors.lastName}</p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                                    <Input
                                                        type="email"
                                                        placeholder="your.email@example.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className={`h-9 text-xs ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                                    />
                                                    {errors.email && (
                                                        <p className="text-xs text-red-500">{errors.email}</p>
                                                    )}
                                                </div>

                                                {/* Mobile Number */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                                                    <div className="flex gap-2">
                                                        <div className="relative w-[110px]">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                                className="w-full h-9 pl-2 pr-5 border border-gray-300 rounded-lg text-xs bg-white focus:border-primary focus:ring-1 focus:ring-primary flex items-center justify-between"
                                                            >
                                                                <div className="flex items-center space-x-1">
                                                                    <img
                                                                        src={getSelectedCountry().flag}
                                                                        alt={getSelectedCountry().name}
                                                                        className="w-4 h-3 object-cover rounded"
                                                                        onError={(e) => {
                                                                            e.currentTarget.style.display = 'none';
                                                                        }}
                                                                    />
                                                                    <span>{getSelectedCountry().code} {getSelectedCountry().dialCode}</span>
                                                                </div>
                                                                <ChevronDown className="w-3 h-3 text-gray-500" />
                                                            </button>

                                                            {showCountryDropdown && (
                                                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                                                                    {countries.map((country) => (
                                                                        <button
                                                                            key={country.code}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setSelectedCountry(`${country.code} ${country.dialCode}`);
                                                                                setShowCountryDropdown(false);
                                                                            }}
                                                                            className="w-full px-2 py-2 text-xs text-left hover:bg-gray-50 flex items-center space-x-2"
                                                                        >
                                                                            <img
                                                                                src={country.flag}
                                                                                alt={country.name}
                                                                                className="w-4 h-3 object-cover rounded"
                                                                                onError={(e) => {
                                                                                    e.currentTarget.style.display = 'none';
                                                                                }}
                                                                            />
                                                                            <span>{country.code} ({country.dialCode})</span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Input
                                                            type="tel"
                                                            placeholder="66276372878"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            className={`flex-1 h-9 text-xs ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                                                        />
                                                    </div>
                                                    {errors.phone && (
                                                        <p className="text-xs text-red-500">{errors.phone}</p>
                                                    )}
                                                </div>

                                                {/* Continue/OTP Button */}
                                                {/* If phone already verified during login, show Continue button */}
                                                {/* Otherwise, show Send OTP button */}
                                                {!showOtpInput && (
                                                    <Button
                                                        className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                        onClick={phoneAlreadyVerified ? handleContinueWithoutOtp : handleSignupSendOtp}
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting
                                                            ? (phoneAlreadyVerified ? 'Saving...' : 'Sending...')
                                                            : (phoneAlreadyVerified ? 'Continue' : 'Send OTP')
                                                        }
                                                    </Button>
                                                )}


                                                {/* OTP Section */}
                                                {showOtpInput && (
                                                    <div ref={signupOtpRef} className="space-y-2 sm:space-y-3 mt-4">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <label className="text-xs font-medium text-gray-700">Enter OTP <span className="text-red-500">*</span></label>
                                                                <button className="text-xs text-primary hover:underline">Resend</button>
                                                            </div>
                                                            <Input
                                                                type="text"
                                                                placeholder="Enter 6-digit code"
                                                                value={otp}
                                                                onChange={(e) => setOtp(e.target.value)}
                                                                className={`h-9 text-xs ${errors.otp ? 'border-red-500 focus:border-red-500' : ''}`}
                                                                maxLength={6}
                                                            />
                                                            {errors.otp && (
                                                                <p className="text-xs text-red-500">{errors.otp}</p>
                                                            )}
                                                        </div>
                                                        <Button
                                                            className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                            onClick={handleSignupVerifyOtp}
                                                            disabled={isSubmitting}
                                                        >
                                                            Continue to Next Step
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Step 2: Education Information */}
                                            <div className="space-y-3 sm:space-y-4">
                                                {/* <div className="flex items-center space-x-2 mb-4"> */}
                                                {/* <div className="flex items-center"> */}
                                                {/* <img
                                  src="/lovable-uploads/f76258ce-d7f2-42ce-a5a8-490fc7ec7425.png"
                                  alt="CollegeMentor Logo"
                                  className="h-6 w-auto object-contain mr-2"
                                  onError={(e) => {
                                    logger.error('Logo failed to load:', e.currentTarget.src);
                                    e.currentTarget.style.display = 'none';
                                  }} */}
                                                {/* /> */}
                                                {/* <span className="text-sm font-bold text-primary">CollegeMentor</span> */}
                                                {/* </div> */}
                                                {/* <h3 className="text-sm font-semibold text-gray-900">Academic Information</h3> */}
                                                {/* </div> */}
                                                {/* <p className="text-xs text-gray-600 mb-4">Complete your educational profile</p> */}

                                                {/* Level of Education */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-700">Level of Education <span className="text-red-500">*</span></label>
                                                    <select
                                                        className={`w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary ${errors.educationLevel ? 'border-red-500 focus:border-red-500' : ''}`}
                                                        value={educationLevel}
                                                        onChange={(e) => setEducationLevel(e.target.value)}
                                                    >
                                                        <option value="">Select level</option>
                                                        <option value="Class 8-10">Class 8-10</option>
                                                        <option value="Class 11-12">Class 11-12</option>
                                                        <option value="Graduation">Graduation</option>
                                                        <option value="Post Graduation">Post Graduation</option>
                                                    </select>
                                                    {errors.educationLevel && (
                                                        <p className="text-xs text-red-500">{errors.educationLevel}</p>
                                                    )}
                                                </div>

                                                {/* Board - Only for Class 8-10 */}
                                                {educationLevel === 'Class 8-10' && (
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Which educational board are you currently studying under? <span className="text-red-500">*</span></label>
                                                        <select
                                                            className={`w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary ${errors.board ? 'border-red-500 focus:border-red-500' : ''}`}
                                                            value={board}
                                                            onChange={(e) => setBoard(e.target.value)}
                                                        >
                                                            <option value="">Select board</option>
                                                            <option value="CBSE">CBSE</option>
                                                            <option value="ICSE">ICSE</option>
                                                            <option value="State Board">State Board</option>
                                                            <option value="IB">IB</option>
                                                        </select>
                                                        {errors.board && (
                                                            <p className="text-xs text-red-500">{errors.board}</p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Pursuing Course - Only for Class 11-12 */}
                                                {educationLevel === 'Class 11-12' && (
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Which course are you pursuing/studying? <span className="text-red-500">*</span></label>
                                                        <select
                                                            className={`w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary ${errors.pursuingCourse ? 'border-red-500 focus:border-red-500' : ''}`}
                                                            value={pursuingCourse}
                                                            onChange={(e) => setPursuingCourse(e.target.value)}
                                                        >
                                                            <option value="">Select course</option>
                                                            <option value="PCMB">PCMB (Physics, Chemistry, Mathematics, Biology)</option>
                                                            <option value="PCM">PCM (Physics, Chemistry, Mathematics)</option>
                                                            <option value="PCB">PCB (Physics, Chemistry, Biology)</option>
                                                            <option value="PCMCS">PCMCS (Physics, Chemistry, Mathematics, Computer Science)</option>
                                                            <option value="Arts">Arts</option>
                                                            <option value="Commerce">Commerce</option>
                                                            <option value="Commerce with Maths">Commerce with Maths</option>
                                                            <option value="Commerce without Maths">Commerce without Maths</option>
                                                            <option value="Humanities">Humanities</option>
                                                        </select>
                                                        {errors.pursuingCourse && (
                                                            <p className="text-xs text-red-500">{errors.pursuingCourse}</p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Stream - Only for Graduation and Post Graduation */}
                                                {(educationLevel === 'Graduation' || educationLevel === 'Post Graduation') && (
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Stream <span className="text-red-500">*</span></label>
                                                        <select
                                                            className={`w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary ${errors.stream ? 'border-red-500 focus:border-red-500' : ''}`}
                                                            value={stream}
                                                            onChange={(e) => setStream(e.target.value)}
                                                        >
                                                            <option value="">Select stream</option>
                                                            <option value="Engineering">Engineering</option>
                                                            <option value="Medical">Medical</option>
                                                            <option value="Commerce">Commerce</option>
                                                            <option value="Arts">Arts</option>
                                                            <option value="Science">Science</option>
                                                        </select>
                                                        {errors.stream && (
                                                            <p className="text-xs text-red-500">{errors.stream}</p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Course - Only for Graduation and Post Graduation */}
                                                {(educationLevel === 'Graduation' || educationLevel === 'Post Graduation') && (
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Course <span className="text-red-500">*</span></label>
                                                        <select
                                                            className={`w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary ${errors.course ? 'border-red-500 focus:border-red-500' : ''}`}
                                                            value={course}
                                                            onChange={(e) => setCourse(e.target.value)}
                                                        >
                                                            <option value="">Select your course</option>
                                                            <option value="Computer Science">Computer Science</option>
                                                            <option value="Mechanical">Mechanical</option>
                                                            <option value="Electrical">Electrical</option>
                                                            <option value="Civil">Civil</option>
                                                        </select>
                                                        {errors.course && (
                                                            <p className="text-xs text-red-500">{errors.course}</p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Preferences Section */}
                                                <div className="space-y-3">

                                                    {/* Preferred Fees */}
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Preferred Fees <span className="text-red-500">*</span></label>
                                                        <Input
                                                            type="text"
                                                            placeholder="e.g., ₹50,000 - ₹1,00,000"
                                                            value={preferredFees}
                                                            onChange={(e) => setPreferredFees(e.target.value)}
                                                            className="h-9 text-xs"
                                                        />
                                                    </div>

                                                    {/* Preferred City */}
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Preferred City <span className="text-red-500">*</span></label>
                                                        <select
                                                            className="w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                                                            value=""
                                                            onChange={(e) => handleCityChange(e.target.value)}
                                                        >
                                                            <option value="">Select city</option>
                                                            {cities.filter(city => !preferredCity.includes(city)).map((city) => (
                                                                <option key={city} value={city}>{city}</option>
                                                            ))}
                                                        </select>

                                                        {/* Selected Cities */}
                                                        {preferredCity.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {preferredCity.map((city) => (
                                                                    <span
                                                                        key={city}
                                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                                                    >
                                                                        {city}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeCity(city)}
                                                                            className="text-primary hover:text-primary/70 ml-1"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Preferred State */}
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Preferred State <span className="text-red-500">*</span></label>
                                                        <select
                                                            className="w-full h-9 pl-3 pr-8 border border-gray-300 rounded-lg text-xs appearance-none bg-white focus:border-primary focus:ring-1 focus:ring-primary"
                                                            value=""
                                                            onChange={(e) => handleStateChange(e.target.value)}
                                                        >
                                                            <option value="">Select state</option>
                                                            {states.filter(state => !preferredState.includes(state)).map((state) => (
                                                                <option key={state} value={state}>{state}</option>
                                                            ))}
                                                        </select>

                                                        {/* Selected States */}
                                                        {preferredState.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {preferredState.map((state) => (
                                                                    <span
                                                                        key={state}
                                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                                                                    >
                                                                        {state}
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeState(state)}
                                                                            className="text-secondary hover:text-secondary/70 ml-1"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Current Location */}
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-700">Current Location <span className="text-red-500">*</span></label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Current city, state"
                                                            value={currentLocation}
                                                            onChange={(e) => setCurrentLocation(e.target.value)}
                                                            className="h-9 text-xs"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Terms and Conditions */}
                                                <div className="flex items-start space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="acceptTerms"
                                                        checked={acceptTerms}
                                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                                        className="mt-1 h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                                                    />
                                                    <label htmlFor="acceptTerms" className="text-xs text-gray-600">
                                                        I accept the Terms & Conditions and Privacy Policy
                                                    </label>
                                                </div>
                                                {errors.acceptTerms && (
                                                    <p className="text-xs text-red-500">{errors.acceptTerms}</p>
                                                )}

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 h-9 text-xs"
                                                        onClick={() => setRegisterStep(1)}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        className="flex-1 h-9 bg-primary hover:bg-primary/90 text-white font-medium text-xs"
                                                        disabled={!acceptTerms || isSubmitting}
                                                        onClick={handleStep2Submit}
                                                    >
                                                        {isSubmitting ? 'Creating Account...' : 'Submit'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}


                    </div>

                    {/* Help Text */}
                    <div className="text-center space-y-1 mt-4 sm:mt-6">
                        <p className="text-xs text-gray-600">
                            Can't login or sign up? <a href="#" className="text-primary hover:underline font-medium">Let us help</a>
                        </p>
                        <p className="text-xs text-gray-500">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}