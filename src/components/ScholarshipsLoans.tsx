import React, { useRef } from "react";
import { ImageWithFallback } from "./figma/FallBack";
import { ArrowRight, BookOpen, Calendar, Sparkles, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useHomepageData } from '@/hooks/useHomepageData';
const studentmentorvideo = "/videos/Student-Mentor.mp4";
const scholarship = "/videos/Scholarship.mp4";
const loanvideo = "/videos/LoanMentorNew.mp4";
const careermentorvideo = "/videos/Career-Mentor.mp4";
const admissionmentor = "/videos/Admission-Mentor.mp4";
const health = "/videos/Health-Mentor.mp4";

const steps = [
    {
        id: 1,
        title: "Student Mentor",
        description: "Sign up on College Mentor",
        image:
            "https://images.unsplash.com/photo-1688646545293-2755ea04cd8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY3JlYXRpbmclMjBhY2NvdW50JTIwbGFwdG9wfGVufDF8fHx8MTc1NjM2MjE4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        position: "top",
        video: studentmentorvideo,

    },
    {
        id: 2,
        title: "Career Mentor",
        description: "Enter personal and academic details",
        image:
            "https://images.unsplash.com/photo-1544717305-f9c88f2897bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGxhcHRvcCUyMHByb2ZpbGUlMjBmb3JtfGVufDF8fHx8MTc1NjM2MjE4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        position: "bottom",
        video: careermentorvideo,
    },
    {
        id: 3,
        title: "Application Mentor",
        description: "Prepare necessary paperwork",
        image:
            "https://images.unsplash.com/photo-1742155506795-74d6d648c1e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudHMlMjBwYXBlcndvcmslMjBkZXNrfGVufDF8fHx8MTc1NjM2MjE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        position: "top",
        video: admissionmentor,
    },
    {
        id: 4,
        title: "Health Mentor",
        description: "Submit your applications",
        image:
            "https://images.unsplash.com/photo-1587116987928-21e47bd76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYXBwbGljYXRpb24lMjBmb3JtJTIwc3VibWlzc2lvbnxlbnwxfHx8fDE3NTYzNjIxODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        position: "bottom",
        video: health,
    },
    {
        id: 5,
        title: "Scholarship Mentor",
        description: "Monitor and follow up on your status",
        image:
            "https://images.unsplash.com/photo-1663326576694-b5870f62e775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmVzcyUyMHRyYWNraW5nJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjM2MjE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        position: "top",
        video: scholarship,
    },
    {
        id: 6,
        title: "Loan Mentor",
        description: "Receive confirmation and start your journey",
        image:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwYXBwcm92YWwlMjBzdHVkZW50fGVufDF8fHx8MTc1NjM2MjE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        position: "bottom",
        video: loanvideo,
    },
];
// Hardcoded fallback features
const defaultFeatures = [
    {
        icon: <Users className="w-6 h-6" />,
        title: "One-on-One Mentoring Sessions",
        description: "Personalized guidance from industry experts"
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        title: "Flexible Scheduling",
        description: "Book sessions that fit your schedule"
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Career Roadmaps",
        description: "Structured learning paths for your goals"
    },
    {
        icon: <Target className="w-6 h-6" />,
        title: "Goal Tracking",
        description: "Monitor progress and celebrate achievements"
    }
];
// Map API features to component format with icons
const featureIconMap: Record<string, any> = {
    " Mentoring Sessions": Users,
    "Flexible Scheduling": Calendar,
    "Career Roadmaps": BookOpen,
    "Goal Tracking": Target,
};
function StepCard({ step }: { step: (typeof steps)[0] }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    return (
        <div
            className={`relative flex flex-col items-center flex-1 ${step.id === 1 ? "ml-8 sm:ml-12 md:ml-16 lg:ml-20" : ""
                }`}
        >

            {/* Step Card */}
            <div
                className={`w-full max-w-[180px] sm:max-w-[220px] relative z-10 ${step.position === "bottom"
                    ? "mt-8 sm:mt-10"
                    : "mb-8 sm:mb-10"
                    }`}
            >
                <div
                    className="w-full h-48 sm:h-56 lg:h-64 mb-2 sm:mb-3 overflow-hidden rounded-lg group cursor-pointer relative"
                    onMouseEnter={() => {
                        videoRef.current?.play().catch(() => { });
                    }}
                    onMouseLeave={() => {
                        if (videoRef.current) {
                            videoRef.current.pause();
                            videoRef.current.currentTime = 0;
                        }
                    }}
                >

                    {/* 3D Elevation Border - Top and Right only */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Top horizontal line with 3D effect */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/40 to-white/20 rounded-t-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)]"></div>
                        {/* Right vertical line with 3D effect */}
                        <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-white/60 via-white/40 to-white/20 rounded-r-lg shadow-[2px_0_4px_rgba(0,0,0,0.1)]"></div>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300">
                        <ImageWithFallback
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* YouTube Video (hidden by default, shown on hover) */}
                    {/* MP4 Video (shown on hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <video
                            src={step.video}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    </div>


                    {/* Title and Description Overlay - Inside Card */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
                            {step.title}
                        </h3>
                        {/* <p className="text-[10px] sm:text-xs text-white/90 leading-relaxed">
                            {step.description}
                        </p> */}
                    </div>
                </div>



            </div>
        </div>
    );
}

export default function App() {
    const { data } = useHomepageData();

    // Use API mentoringProgram data only if it exists, otherwise use hardcoded
    const mentoringData = data?.mentoringProgram;

    // Map API features to component format
    const features = mentoringData?.features && mentoringData.features.length > 0
        ? mentoringData.features.map((feature) => {
            const IconComponent = featureIconMap[feature.title] || Users;
            return {
                icon: <IconComponent className="w-6 h-6" />,
                title: feature.title,
                description: feature.description,
            };
        })
        : defaultFeatures;

    // Use API steps (mentorTypes) only if they exist, otherwise use hardcoded
    const mentorTypes = mentoringData?.mentorTypes || [];
    const apiSteps = mentorTypes.length > 0
        ? mentorTypes.map((mentor, index) => ({
            id: index + 1,
            title: mentor.label || `Mentor ${index + 1}`,
            description: mentor.description || `Connect with ${mentor.label}`,
            image: mentor.imageUrl || steps[index]?.image,
            position: index % 2 === 0 ? "top" : "bottom" as "top" | "bottom",
            video: steps[index]?.video || "dQw4w9WgXcQ",
        }))
        : null;

    // Use API steps if available, otherwise use hardcoded
    const finalSteps = apiSteps || steps;

    // Use API heading/subHeading only if they exist, otherwise use hardcoded
    const heading = mentoringData?.heading || "Mentoring Program";
    const subHeading = mentoringData?.subHeading || "Connect with experienced mentors across domains like engineering, management, medical, and more. Get personalized guidance for your academic and career journey.";

    // Helper function to render heading with gradient
    const renderHeadingWithGradient = (text: string) => {
        const parts = text.split(/(Mentoring Program|Program)/i);
        return parts.map((part, index) => {
            if (/^(mentoring program|program)$/i.test(part)) {
                return (
                    <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (

        // <div className="relative bg-white overflow-hidden py-12 sm:py-16 lg:py-20 pb-0">
        <div className="relative bg-white overflow-hidden pt-12 sm:pt-16 lg:pt-32 pb-0">
            {/* CSS Animation Styles */}
            <style>{`
                @keyframes dash {
                    0% {
                        stroke-dashoffset: 28px;
                    }
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>
            {/* Top Deep Curve with Elevation */}
            <div className="absolute -top-1 left-0 right-0 overflow-hidden leading-[0] z-0">
                <svg
                    className="relative block w-full h-24 sm:h-28 md:h-32 lg:h-40 drop-shadow-md"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#f5f9f7"
                        d="M0,160 C480,0 960,320 1440,160 L1440,0 L0,0 Z"
                    />
                    {/* Optional darker stroke to enhance depth */}
                    <path
                        d="M0,160 C480,0 960,320 1440,160"
                        stroke="rgba(0,0,0,0.12)"
                        strokeWidth="2"
                        fill="transparent"
                    />
                </svg>
            </div>


            <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">




                {/* Section Header */}
                <div className="text-center" id="scholarships-loans-header">


                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-8" id="scholarships-loans-expert-guidance">
                        <Sparkles size={12} className="text-primary animate-pulse" />
                        <span className="text-primary font-medium text-xs">Expert Guidance</span>
                    </div>

                    {heading && (
                        <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-4">
                            {renderHeadingWithGradient(heading)}
                        </h2>
                    )}
                    {subHeading && (
                        <p className="text-body-large max-w-2xl mx-auto mb-12">
                            {subHeading}
                        </p>
                    )}
                </div>
                {/* Key Features Grid */}
                <motion.div
                    className="mb-10 sm:mb-12 md:mb-14 lg:mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h4 id="why-choose-our-mentoring-program" className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-center">
                        Why Choose Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mentoring Program?</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 pt-4 sm:pt-6 md:pt-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="overflow-hidden">
                                    <motion.div
                                        className="transform-gpu"
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full group">
                                            <CardContent className="p-4 sm:p-5 md:p-6 flex items-center gap-4">

                                                {/* Icon (smaller size) */}
                                                <motion.div
                                                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br from-[#3B82F6] to-[#3B82F6] rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                                    whileHover={{ rotate: 12, scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {feature.icon}
                                                </motion.div>

                                                {/* Text Column */}
                                                <div className="flex flex-col">
                                                    {/* Title */}
                                                    <h5 className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors duration-300">
                                                        {feature.title}
                                                    </h5>

                                                    {/* Description */}
                                                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                                                        {feature.description}
                                                    </p>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
                {/* Process Flow Section */}
                <div className="px-0">
                    <div className="max-w-7xl mx-auto w-full">
                        {/* Desktop Layout - Horizontal Flow */}
                        <div className="hidden sm:flex items-start justify-center">
                            <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full max-w-6xl">
                                {finalSteps.map((step) => (
                                    <StepCard key={step.id} step={step} />
                                ))}
                            </div>
                        </div>

                        {/* Mobile Layout - Vertical Stack */}
                        <div className="sm:hidden space-y-3">
                            {finalSteps.map((step) => (
                                <div key={step.id} className="flex flex-col items-center">
                                    <div className="w-full max-w-xs">
                                        <div className="w-full h-48 sm:h-56 mb-4 overflow-hidden rounded-xl group cursor-pointer relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border border-slate-200/50">
                                            {/* 3D Elevation Border - Top and Right only */}
                                            <div className="absolute inset-0 pointer-events-none">
                                                {/* Top horizontal line with 3D effect */}
                                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/40 to-white/20 rounded-t-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]"></div>
                                                {/* Right vertical line with 3D effect */}
                                                <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-white/60 via-white/40 to-white/20 rounded-r-xl shadow-[2px_0_4px_rgba(0,0,0,0.1)]"></div>
                                            </div>

                                            {/* Thumbnail Image */}
                                            <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-300">
                                                <ImageWithFallback
                                                    src={step.image}
                                                    alt={step.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* MP4 Video (shown on hover) */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <video
                                                    src={step.video}
                                                    className="w-full h-full object-cover"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    preload="metadata"
                                                />
                                            </div>
                                        </div>

                                        {/* Title and Description for Mobile */}
                                        <div className="text-center mt-4 w-full max-w-xs">
                                            <h3 className="text-base font-semibold text-gray-800 mb-1 underline decoration-2 underline-offset-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* CTA Section */}

                {/* Ready to Connect with a Mentor Section */}
                <div className="mt-6 sm:mt-8 relative bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-secondary/10 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-secondary rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-primary rounded-full blur-2xl"></div>
                    </div>

                    <div className="text-center max-w-xl mx-auto relative z-10">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                            Ready to Connect with a Mentor?
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                            Get personalized guidance from experienced mentors who have walked the same path
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                            <div className="overflow-hidden">
                                <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 transform-gpu hover:scale-105 text-xs sm:text-sm">
                                    Find My Mentor
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
