"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHomepageData } from '@/hooks/useHomepageData';

import {
    Users,
    Video,
    MessageCircle,
    Map,
    Star,
    Clock,
    Building2,
    GraduationCap,
    UserCheck,
    CheckCircle,
    Shield,
    Award,
    ArrowRight,
    Sparkles,
    Zap,
    Target,
    Heart,
    TrendingUp,
    Globe,
    BookOpen,
    Play,
    Calendar,
    Compass,
    FileText,
    BookOpenCheck,
    GraduationCap as GraduationCapIcon,
    Brain,
    Calculator,
    Microscope,
    Search,
    BarChart3,
    GitCompare,
    BookOpen as BookOpenIcon,
    CheckSquare,
    Trophy,
    ChevronLeft,
    ChevronRight,
    Space,
    Section
} from "lucide-react";
import { useRouter } from "next/navigation";
import indianAvatar2 from "../../public/assets/avatar.jpeg";
import indianStudentsMentors from "../../public/assets/indian-students-mentors.jpg";
import { motion } from 'framer-motion';


const ExamsSuite = () => {
    const router = useRouter();
    const { data } = useHomepageData();

    // Hardcoded fallback stats
    const defaultStats = [
        { number: "500+", label: "Expert Mentors", icon: Users, color: "text-[#00C798]" },
        { number: "10,000+", label: "Success Stories", icon: Star, color: "text-[#009c7a]" },
        { number: "1:1", label: "Personal Guidance", icon: UserCheck, color: "text-[#173CBA]" },
        { number: "24/7", label: "Support Available", icon: Clock, color: "text-[#00C798]" }
    ];

    // Map API stats to component format with icons
    const statIconMap: Record<string, any> = {
        "Expert Mentors": Users,
        "Success Stories": Star,
        "Personal Guidance": UserCheck,
        "Support Available": Clock,
    };

    const statColorMap: Record<string, string> = {
        "Expert Mentors": "text-[#00C798]",
        "Success Stories": "text-[#009c7a]",
        "Personal Guidance": "text-[#173CBA]",
        "Support Available": "text-[#00C798]",
    };

    // Use API stats only if they exist, otherwise use hardcoded
    // If API data exists but individual fields are null, use field-level fallbacks
    const examPrepData = data?.examPrep;
    const stats = examPrepData?.stats && examPrepData.stats.length > 0
        ? examPrepData.stats.map((stat, index) => {
            // Get default stat for this index as fallback for null fields
            const defaultStat = defaultStats[index] || defaultStats[0];
            return {
                number: stat.value || defaultStat.number,
                label: stat.label || defaultStat.label,
                icon: statIconMap[stat.label] || defaultStat.icon || Users,
                color: statColorMap[stat.label] || defaultStat.color || "text-[#00C798]",
            };
        })
        : defaultStats;

    const features = [
        {
            icon: Video,
            title: "One-on-One Video Sessions",
            description: "Connect face-to-face with expert mentors through high-quality video calls",
            color: "text-[#00C798]",
            bgColor: "bg-[#00C798]"
        },
        {
            icon: MessageCircle,
            title: "24/7 Chat Support",
            description: "Get instant answers to your queries anytime, anywhere",
            color: "text-[#009c7a]",
            bgColor: "bg-[#009c7a]"
        },
        {
            icon: Map,
            title: "Personalized Roadmaps",
            description: "Custom career paths designed specifically for your goals and background",
            color: "text-[#173CBA]",
            bgColor: "bg-[#173CBA]"
        }
    ];

    const categories = [
        {
            title: "Industry Professionals",
            subtitle: "Connect with working professionals from top companies",
            companies: ["Google", "Microsoft", "Amazon", "Meta"],
            icon: Building2,
            gradient: "from-[#00C798] to-[#009c7a]"
        },
        {
            title: "College Alumni",
            subtitle: "Get insights from graduates of your target colleges",
            companies: ["IIT Delhi", "IIT Bombay", "AIIMS", "BITS"],
            icon: GraduationCap,
            gradient: "from-[#009c7a] to-[#00C798]"
        },
        {
            title: "Career Counselors",
            subtitle: "Professional guidance for career planning and decisions",
            badges: ["Certified", "Experienced", "Trusted", "Verified"],
            icon: Shield,
            gradient: "from-[#173CBA] to-[#00C798]"
        }
    ];

    // Hardcoded fallback popularExams
    const defaultPopularExams = [
        {
            title: "JEE Main",
            subtitle: "Joint Entrance Examination",
            icon: Calculator,
            color: "text-[#00C798]",
            bgColor: "bg-[#00C798]/10",
            borderColor: "border-[#00C798]/30",
            description: "Engineering entrance exam for IITs and NITs",
            participants: "12.5L+",
            applicationStatus: "Open",
            examDates: "1 - 10 Sept",
        },
        {
            title: "NEET",
            subtitle: "National Eligibility cum Entrance Test",
            icon: Microscope,
            color: "text-[#009c7a]",
            bgColor: "bg-[#009c7a]/10",
            borderColor: "border-[#009c7a]/30",
            description: "Medical entrance exam for MBBS and BDS",
            applicationStatus: "Closed",
            participants: "18.2L+",
            examDates: "20 - 24 Sept",
        },
        {
            title: "CAT",
            subtitle: "Common Admission Test",
            icon: Brain,
            color: "text-[#173CBA]",
            bgColor: "bg-[#173CBA]/10",
            borderColor: "border-[#173CBA]/30",
            description: "MBA entrance exam for IIMs",
            participants: "2.3L+",
            applicationStatus: "Open",
            examDates: "11 - 30 Sept",
        },
        {
            title: "GATE",
            subtitle: "Graduate Aptitude Test",
            icon: GraduationCapIcon,
            color: "text-[#00C798]",
            bgColor: "bg-[#00C798]/10",
            borderColor: "border-[#00C798]/30",
            description: "Postgraduate engineering entrance",
            participants: "8.9L+",
            applicationStatus: "Upcoming",
            examDates: "1 - 30 Dec",
        },
        {
            title: "UPSC CSE",
            subtitle: "Civil Services Examination",
            icon: Shield,
            color: "text-[#009c7a]",
            bgColor: "bg-[#009c7a]/10",
            borderColor: "border-[#009c7a]/30",
            description: "Civil services and government jobs",
            participants: "11.5L+",
            applicationStatus: "Upcoming",
            examDates: "5 - 20 Oct",
        },
        {
            title: "CLAT",
            subtitle: "Common Law Admission Test",
            icon: FileText,
            color: "text-[#173CBA]",
            bgColor: "bg-[#173CBA]/10",
            borderColor: "border-[#173CBA]/30",
            description: "Law entrance for NLUs",
            participants: "1.8L+",
            applicationStatus: "Upcoming",
            examDates: "11 - 30 Dec",
        }
    ];

    // Map API popularExams to component format with icons
    const examIconMap: Record<string, any> = {
        "JEE Main": Calculator,
        "NEET": Microscope,
        "CAT": Brain,
        "GATE": GraduationCapIcon,
        "UPSC CSE": Shield,
        "CLAT": FileText,
    };

    const examColorMap: Record<string, { color: string; bgColor: string; borderColor: string }> = {
        "JEE Main": { color: "text-[#00C798]", bgColor: "bg-[#00C798]/10", borderColor: "border-[#00C798]/30" },
        "NEET": { color: "text-[#009c7a]", bgColor: "bg-[#009c7a]/10", borderColor: "border-[#009c7a]/30" },
        "CAT": { color: "text-[#173CBA]", bgColor: "bg-[#173CBA]/10", borderColor: "border-[#173CBA]/30" },
        "GATE": { color: "text-[#00C798]", bgColor: "bg-[#00C798]/10", borderColor: "border-[#00C798]/30" },
        "UPSC CSE": { color: "text-[#009c7a]", bgColor: "bg-[#009c7a]/10", borderColor: "border-[#009c7a]/30" },
        "CLAT": { color: "text-[#173CBA]", bgColor: "bg-[#173CBA]/10", borderColor: "border-[#173CBA]/30" },
    };

    // Use API popularExams only if they exist, otherwise use hardcoded
    // If API data exists but individual fields are null, use field-level fallbacks
    const popularExams = examPrepData?.popularExams && examPrepData.popularExams.length > 0
        ? examPrepData.popularExams.map((exam, index) => {
            const colors = examColorMap[exam.name] || { color: "text-[#00C798]", bgColor: "bg-[#00C798]/10", borderColor: "border-[#00C798]/30" };
            // Get default exam for this index as fallback for null fields
            const defaultExam = defaultPopularExams[index] || defaultPopularExams[0];
            return {
                title: exam.name || defaultExam.title,
                subtitle: exam.name || defaultExam.subtitle, // API doesn't have subtitle, using name or default
                icon: examIconMap[exam.name] || defaultExam.icon || Calculator,
                color: colors.color || defaultExam.color,
                bgColor: colors.bgColor || defaultExam.bgColor,
                borderColor: colors.borderColor || defaultExam.borderColor,
                description: exam.shortDescription || defaultExam.description,
                participants: exam.participants || defaultExam.participants,
                applicationStatus: exam.status || defaultExam.applicationStatus,
                examDates: exam.examDates || defaultExam.examDates,
            };
        })
        : defaultPopularExams;

    // Use API heading/subHeading only if they exist, otherwise use hardcoded
    const heading = examPrepData?.heading || "Conquer Your Exams With College Mentor";
    const subHeading = examPrepData?.subHeading || "Your Pathway to Excelling Boost your scores and enhance admission possibilities with our all-encompassing test prep covering 250+ exams, JEE Mains, NEET, NIFT, NID, NATA, CLAT, CAT and BITS Pilani.";

    // Helper function to render heading with gradient
    const renderHeadingWithGradient = (text: string) => {
        const parts = text.split(/(College Mentor|Exams)/i);
        return parts.map((part, index) => {
            if (/^(college mentor|exams)$/i.test(part)) {
                return (
                    <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const handleGetNotified = () => {
        // Check if user is logged in (you can implement your own auth check)
        const isLoggedIn = false; // Replace with actual auth check

        if (!isLoggedIn) {
            router.push('/auth');
        } else {
            // Subscribe user to notifications
            console.log('Subscribing to exam notifications');
            // Add your notification subscription logic here
        }
    };

    const handleExploreExams = () => {
        // Prevent navigation - do nothing
    };

    const handleViewAllExams = () => {
        // Prevent navigation - do nothing
    };

    // Tool exploration handlers
    const handleToolAction = (toolName: string, url?: string) => {
        const isLoggedIn = false; // Replace with actual auth check
        if (!isLoggedIn) {
            router.push('/auth');
            return;
        }

        if (url) {
            window.open(url, '_blank');
        } else {
            // For tools without specific URLs, you can implement custom logic
            console.log(`Opening ${toolName} tool`);
        }
    };

    const tools = [
        {
            icon: Search,
            title: "College Predictor",
            description: "Predict college based on your rank",
            buttonText: "College Predictor",
            url: "https://www.collegementor.com/college-predictor",
            color: "bg-[#00C798]"
        },
        {
            icon: BarChart3,
            title: "Rank Predictor",
            description: "Predict your rank based on performance",
            buttonText: "Rank Predictor",
            color: "bg-[#00C798]"
        },
        {
            icon: GitCompare,
            title: "College Compare",
            description: "Compare colleges with rankings and highlights",
            buttonText: "College Comparison",
            url: "https://www.collegementor.com/college-compare",
            color: "bg-[#00C798]"
        },
        {
            icon: BookOpenIcon,
            title: "Course Compare",
            description: "Compare multiple courses and their details",
            buttonText: "Course Comparison",
            color: "bg-[#00C798]"
        },
        {
            icon: CheckSquare,
            title: "Eligibility Checker",
            description: "Check which exams you are eligible for",
            buttonText: "Eligibility Checker",
            color: "bg-[#00C798]"
        },
        {
            icon: Award,
            title: "Scholarship Finder",
            description: "Discover scholarships and financial aid opportunities",
            buttonText: "Find Scholarships",
            color: "bg-[#00C798]"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [currentWinnerIndex, setCurrentWinnerIndex] = useState(0);

    // Animation states
    const sectionRef = useRef<HTMLDivElement>(null);
    const greenCircleRef = useRef<HTMLDivElement>(null);
    const leftCircleRef = useRef<HTMLDivElement>(null);
    return (


        <div className="min-h-screen bg-background">

            {/* Header Section */}

            <section ref={sectionRef} className="relative bg-[#f5f9f7] pt-32 overflow-visible">
                {/* ✅ Top Deep Curve with Elevation */}
                <div className="absolute top-0 left-0 right-0">
                    <svg
                        className="w-full h-[160px] sm:h-[180px] md:h-[200px] drop-shadow-md"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 350"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,160 C480,20 960,300 1440,140 L1440,0 L0,0 Z"
                            fill="white"
                        />
                    </svg>
                </div>

                {/* ✅ Content below curve */}
                <div className="relative z-10 w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
                        {/* Left Content */}
                        <div className="space-y-6 mt-6">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 shadow-sm">
                                <BookOpenCheck className="w-4 h-4 text-primary animate-pulse" />
                                <span className="text-primary font-semibold text-sm">Comprehensive Exam Preparation</span>
                            </div>

                            {heading && (
                                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                                    {renderHeadingWithGradient(heading)}
                                </h2>
                            )}

                            {subHeading && (
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {subHeading}
                                </p>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={handleExploreExams}
                                    variant="outline"
                                    className="px-6 py-3 text-sm rounded-xl border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all duration-300"
                                    aria-label="Visit our test library"
                                >
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                    Visit our test library
                                </Button>

                            </div>
                        </div>

                        {/* Right Side - Circles Only (container style removed) */}
                        <div className="relative overflow-visible">
                            <div
                                id="exam-section-image"
                                className="relative overflow-visible"
                            >
                                {/* Three Circles in Triangular Shape (positioned like reference) */}
                                <div className="relative h-[460px] overflow-visible">
                                    {/* Top Circle - Custom Color #00d084 with enter pulse */}
                                    <motion.div
                                        ref={greenCircleRef}
                                        id="exam-green-circle"
                                        initial={{ scale: 0.4, opacity: 0.95 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ type: 'tween', duration: 0.9, ease: 'easeOut' }}
                                        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-44 h-44 p-4 bg-[#00d084] rounded-full shadow-2xl border-4 border-gray-200"
                                    >
                                    </motion.div>

                                    {/* Small Left Circle - White with Image */}
                                    <motion.div
                                        ref={leftCircleRef}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ type: 'tween', duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                                        className="absolute top-[60%] left-[35%] w-36 h-36 bg-white rounded-full shadow-2xl border-4 border-gray-200 z-10 overflow-hidden"
                                    >
                                        <img
                                            src={indianAvatar2.src}
                                            alt="Student studying"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </motion.div>

                                    {/* Large Bottom-Right Circle - White with Image */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.6 }}
                                        transition={{ type: 'tween', duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                                        className="absolute top-[60%] left-[65%] -translate-x-1/2 w-56 h-56 bg-white rounded-full shadow-2xl border-4 border-gray-200 overflow-hidden"
                                    >
                                        <img
                                            src={indianStudentsMentors.src}
                                            alt="Students and mentors"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Exams Grid */}
                    <div className="mb-8" id="popular-exams-section">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
                                <Trophy className="w-4 h-4 text-primary animate-pulse" />
                                <span className="text-primary font-semibold text-sm">Top Competitive Exams</span>
                            </div>

                            <h3 className="text-2xl lg:text-3xl font-bold mb-3" id="popular-exams-title">
                                Popular <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Exams</span>
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-lg mx-auto font-medium">
                                Prepare for the most sought-after competitive exams with our comprehensive study materials
                            </p>
                        </div>


                        {/* //chip code */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {popularExams.map((exam, index) => {
                                // Dynamic chip colors
                                let chipColor = "bg-gray-200 text-gray-700";
                                if (exam.applicationStatus === "Open")
                                    chipColor = "bg-green-100 text-green-700 border border-green-400";
                                if (exam.applicationStatus === "Closed")
                                    chipColor = "bg-red-100 text-red-700 border border-red-400";
                                if (exam.applicationStatus === "Upcoming")
                                    chipColor = "bg-blue-100 text-blue-700 border border-blue-400";

                                return (
                                    <div key={index} className="overflow-hidden rounded-xl">
                                        <Card
                                            className="relative overflow-visible border border-gray-200 shadow-md hover:shadow-lg transition-all duration-500 transform-gpu hover:-translate-y-2 bg-white rounded-xl"
                                        >
                                            {/* ✅ Animated Chip */}
                                            {exam.applicationStatus && (
                                                <motion.div
                                                    className="absolute top-3 right-3"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                                                    whileHover={{
                                                        scale: [1, 1.15, 1], // zoom in & out
                                                        transition: { duration: 0.6, repeat: Infinity, repeatType: "mirror" }
                                                    }}
                                                >
                                                    <span
                                                        className={`px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-full ${chipColor}`}
                                                    >
                                                        {exam.applicationStatus}
                                                    </span>
                                                </motion.div>
                                            )}

                                            {/* Card Body */}
                                            <CardContent className="p-4 h-full flex flex-col min-h-[200px]">
                                                {/* Icon */}
                                                <div
                                                    className={`inline-flex p-3 rounded-xl ${exam.bgColor} border ${exam.borderColor} mb-3 w-fit`}
                                                >
                                                    <exam.icon className={`w-6 h-6 ${exam.color}`} />
                                                </div>

                                                {/* Content */}
                                                <h4 className="text-lg font-bold text-gray-900">{exam.title}</h4>
                                                <p className="text-sm text-blue-600 font-medium">{exam.subtitle}</p>
                                                <p className="text-gray-600 text-xs flex-1 mt-2">{exam.description}</p>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-xs text-gray-500 font-medium">
                                                        {exam.participants} participants
                                                    </span>
                                                </div>

                                                {exam.examDates && (
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        Exam Dates:{" "}
                                                        <span className="font-medium text-blue-700">{exam.examDates}</span>
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 relative bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-secondary/10 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-secondary rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-primary rounded-full blur-2xl"></div>
                        </div>

                        <div className="text-center max-w-xl mx-auto relative z-10">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                                Ready to Explore Your Exams?
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                                Connect with experienced mentors who know the challenges and strategies to help you succeed.</p>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                                <div className="overflow-hidden">
                                    <Button
                                        variant="outline"
                                        className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-300 transform-gpu hover:scale-105 text-xs sm:text-sm"
                                    >
                                        Mock Test
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    );
}




export default ExamsSuite;