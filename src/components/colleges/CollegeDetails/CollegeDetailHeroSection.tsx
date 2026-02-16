import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ChevronRight,
    Trophy,
    TrendingUp,
    Users,
    Sparkles,
    MapPin,
    Calendar,
    Award,
    Heart,
    GitCompare,
    Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { compareCollegesStore } from "@/utils/compareCollegesStore";

import glaUniversityCampus from "../../../../public/assets/gla-university-campus.png";
import { CollegeDetail } from "@/components/data/collegedetail";
interface HeroSectionProps {
    collegeData: CollegeDetail;
}

export default function HeroSection({ collegeData }: HeroSectionProps) {
    const [isSaved, setIsSaved] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const router = useRouter();

    // Check if this college is already in compare list on mount
    useEffect(() => {
        setIsComparing(compareCollegesStore.hasId(collegeData.id));
    }, [collegeData.id]);

    // Get overview data from the new API structure
    const about = collegeData.tabs.overview.about;
    const quickStats = collegeData.tabs.overview.quick_stats;
    const collegeName = about.name;
    const city = about.city;
    const state = about.state;
    const naacGrade = quickStats?.naac_grade;
    const nirfRank = quickStats?.nirf_rank;
    const campusArea = about.campus_area;
    const instituteType = about.institute_type;
    const shortDescription = about.short_description;
    const description = about.description;
    const established = about.established;
    const averagePackage = quickStats?.average_package;

    const handleSave = () => {
        setIsSaved(!isSaved);
        console.log("Save action - Login required");
    };

    const handleCompare = () => {
        if (isComparing) {
            // Remove from compare list
            compareCollegesStore.removeId(collegeData.id);
            setIsComparing(false);
        } else {
            // Add to compare list and navigate
            compareCollegesStore.addId(collegeData.id);
            setIsComparing(true);
            router.push(`/college-compare?addId=${collegeData.id}`);
        }
    };

    const handleBrochureDownload = () => {
        console.log("Brochure download - Login required");
    };



    return (
        <div>
            {/* HERO SECTION */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6]">
                {/* Background Pattern */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#93C5FD]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#60A5FA]/15 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 lg:pt-6 pb-6 sm:pb-6 lg:pb-6">

                    {/* Breadcrumb - positioned at top left with proper spacing */}
                    <motion.div
                        className="flex items-center gap-1.5 sm:gap-2 text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span
                            onClick={() => router.push('/')}
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            Home
                        </span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span
                            onClick={() => router.push('/colleges')}
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            Colleges
                        </span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-white font-medium truncate max-w-[120px] sm:max-w-none">{collegeName}</span>
                    </motion.div>

                    {/* Mobile: Stack vertically, Desktop: Side by side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-12 items-center">

                        {/* Left Content */}
                        <motion.div
                            className="space-y-2 sm:space-y-3 lg:space-y-4 self-center text-left order-2 lg:order-1 pb-2 sm:pb-0"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >

                            {/* Main Heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                <h1 className="text-xl sm:text-2xl lg:text-4xl text-white font-bold leading-tight mb-1">
                                    {collegeName}
                                </h1>
                                {naacGrade ? (
                                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
                                        Premier Institute in {city} • {naacGrade} Accredited
                                    </p>
                                ) : (
                                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
                                        Premier Institute in {city}
                                    </p>
                                )}
                            </motion.div>


                            {/* Badges - ensure they're fully visible */}
                            <motion.div
                                className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-wrap pb-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <Badge className="bg-orange-500 text-white border-0 hover:bg-orange-600 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full">
                                    <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                    NIRF #151
                                </Badge>
                                <Badge className="bg-emerald-500 text-white border-0 hover:bg-emerald-600 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full">
                                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                    95% Placement
                                </Badge>
                                <Badge className="bg-cyan-500 text-white border-0 hover:bg-cyan-600 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full">
                                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                                    ₹12 LPA Avg
                                </Badge>
                            </motion.div>
                        </motion.div>

                        {/* Right: College Image with Floating Badge - Show first on mobile */}
                        <motion.div
                            className="relative order-1 lg:order-2 mb-2 lg:mb-8"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                                <img
                                    src={glaUniversityCampus.src}
                                    alt="GLA University Campus"
                                    className="w-full h-[160px] sm:h-[220px] lg:h-[280px] object-cover"
                                />

                                {/* Floating Students Badge - Hidden on very small screens */}
                                <motion.div
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 shadow-lg flex items-center gap-1.5 sm:gap-2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5, type: "spring" }}
                                >
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                                    <span className="text-slate-800 font-bold text-xs sm:text-sm">15K+ Students</span>
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>


            {/* White Content Card Below Hero */}
            <motion.div
                className="relative pb-8 sm:pb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                <div className="w-[95%] sm:w-[90%] lg:w-[75%] mx-auto px-2 sm:px-4 lg:px-8 -mt-8 sm:-mt-12">
                    <motion.div
                        className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-3 sm:p-4 lg:p-6">
                            {/* Two Column Layout: About Left, Quick Actions Right */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 sm:gap-6">
                                {/* Left: About + Stats */}
                                <div className="space-y-3 sm:space-y-4">
                                    {/* About Section */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                            <h2 className="text-base sm:text-lg font-bold text-slate-800">About the University</h2>
                                        </div>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                            {shortDescription}
                                        </p>
                                    </div>

                                    {/* Stats Grid - 2x2 on mobile, 4 columns on desktop */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                                        <motion.div
                                            className="bg-white p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors duration-300"
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-blue-200 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] sm:text-xs text-slate-500">Location</div>
                                                    <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{[city, state].filter(Boolean).join(', ')}</div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="bg-white p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-teal-300 transition-colors duration-300"
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-teal-200 flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] sm:text-xs text-slate-500">Established</div>
                                                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">{established}</div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="bg-white p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-purple-300 transition-colors duration-300"
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-purple-200 flex items-center justify-center flex-shrink-0">
                                                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] sm:text-xs text-slate-500">Campus Area</div>
                                                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">{campusArea} Acres</div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="bg-white p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-amber-300 transition-colors duration-300"
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-amber-200 flex items-center justify-center flex-shrink-0">
                                                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] sm:text-xs text-slate-500">Accredation</div>
                                                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">NAAC {naacGrade}</div>
                                                </div>
                                            </div>

                                        </motion.div>
                                    </div>
                                </div>

                                {/* Right: Quick Actions Sidebar */}
                                <div className="space-y-2 sm:space-y-3">
                                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Quick Actions</h3>

                                    {/* On mobile: horizontal row, on desktop: vertical stack */}
                                    <div className="flex flex-row lg:flex-col gap-2 sm:gap-3">
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 lg:flex-none">
                                            <Button
                                                variant="outline"
                                                onClick={handleSave}
                                                className={`w-full h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-medium justify-center lg:justify-start px-2 sm:px-4 ${isSaved
                                                    ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
                                                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-secondary"
                                                    }`}
                                            >
                                                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:mr-2 ${isSaved ? "fill-current" : ""}`} />
                                                <span className="hidden lg:inline">Save College</span>
                                            </Button>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 lg:flex-none">
                                            <Button
                                                variant="outline"
                                                onClick={handleCompare}
                                                className={`w-full h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-medium justify-center lg:justify-start px-2 sm:px-4 ${isComparing
                                                    ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-secondary "
                                                    }`}
                                            >
                                                <GitCompare className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:mr-2" />
                                                <span className="hidden lg:inline">Compare Colleges</span>
                                            </Button>
                                        </motion.div>

                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 lg:flex-none">
                                            <Button
                                                onClick={handleBrochureDownload}
                                                className="w-full h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold justify-center lg:justify-start px-2 sm:px-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0"
                                            >
                                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:mr-2" />
                                                <span className="hidden lg:inline">Download Brochure</span>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>

    );
};