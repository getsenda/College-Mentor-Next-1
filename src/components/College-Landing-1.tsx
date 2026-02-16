"use client"
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, GraduationCap, FileText, Briefcase, BookOpen, Building2, Stethoscope, Scale, PenTool, Sprout, Palette, UtensilsCrossed, Eye, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { collegeService, IntermediateCollegeSearchResult } from "@/services/collegeService";
import { logger } from "@/utils/logger";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
// import collegeCampusBg from "@/assets/college-campus-bg.jpg";

const categories = [
    "Engineering",
    "Management",
    "Medical",
    "Law",
    "Architecture & Planning",
    "Agriculture",
    "Liberal Arts",
    "Hospitality"
];


const tabsData = {
    "Engineering": [
        {
            title: "Top Engineering Colleges",
            bgColor: "bg-blue-500/5",
            borderColor: "border-blue-400/20",
            icon: GraduationCap,
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600",
            items: ["IIT Madras", "IIT Kanpur", "IIT Delhi", "IIT Bombay", "NIT Warangal", "NIT Trichy", "IIIT Hyderabad", "IISC Bangalore", "IIT Kharagpur", "IIT Roorkee", "BITS Pilani", "VIT Vellore"]
        },
        {
            title: "Engineering Exams",
            bgColor: "bg-purple-500/5",
            borderColor: "border-purple-400/20",
            icon: FileText,
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-600",
            items: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "COMEDK", "AP EAPCET", "KIITEE", "MHT CET", "WBJEE", "TS EAMCET"]
        },
        {
            title: "Engineering Specializations",
            bgColor: "bg-teal-500/5",
            borderColor: "border-teal-400/20",
            icon: Briefcase,
            iconBg: "bg-teal-500/10",
            iconColor: "text-teal-600",
            items: ["Full Stack Developer", "Data Scientist", "Cloud Architect", "AI/ML Engineer", "DevOps Engineer", "Blockchain Developer", "IoT Engineer", "Cybersecurity Expert", "Web Developer", "Mobile App Developer"]
        },
        {
            title: "Engineering Courses",
            bgColor: "bg-orange-500/5",
            borderColor: "border-orange-400/20",
            icon: BookOpen,
            iconBg: "bg-orange-500/10",
            iconColor: "text-orange-600",
            items: ["Computer Science", "AI & Machine Learning", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics & Communication", "Robotics Engineering", "Chemical Engineering", "Aerospace Engineering", "Biotechnology"]
        }
    ],
    "Management": [
        {
            title: "Top Management Colleges",
            bgColor: "bg-emerald-500/5",
            borderColor: "border-emerald-400/20",
            icon: Building2,
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-600",
            items: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "XLRI Jamshedpur", "FMS Delhi", "SP Jain Mumbai", "ISB Hyderabad", "MDI Gurgaon", "IIM Indore"]
        },
        {
            title: "Management Exams",
            bgColor: "bg-rose-500/5",
            borderColor: "border-rose-400/20",
            icon: FileText,
            iconBg: "bg-rose-500/10",
            iconColor: "text-rose-600",
            items: ["CAT", "XAT", "SNAP", "NMAT", "CMAT", "MAT", "ATMA", "GMAT", "GRE"]
        },
        {
            title: "Management Specializations",
            bgColor: "bg-indigo-500/5",
            borderColor: "border-indigo-400/20",
            icon: Briefcase,
            iconBg: "bg-indigo-500/10",
            iconColor: "text-indigo-600",
            items: ["Marketing Manager", "Financial Analyst", "HR Manager", "Operations Manager", "Business Consultant", "Product Manager", "Investment Banker", "Business Analyst", "Strategy Consultant", "Supply Chain Manager"]
        },
        {
            title: "Management Courses",
            bgColor: "bg-amber-500/5",
            borderColor: "border-amber-400/20",
            icon: BookOpen,
            iconBg: "bg-amber-500/10",
            iconColor: "text-amber-600",
            items: ["MBA General", "MBA Finance", "MBA Marketing", "MBA HR", "MBA Operations", "MBA Analytics", "MBA Healthcare", "MBA IT", "Executive MBA", "Global MBA"]
        }
    ],
    "Medical": [
        {
            title: "Top Medical Colleges",
            bgColor: "bg-red-500/5",
            borderColor: "border-red-400/20",
            icon: Stethoscope,
            iconBg: "bg-red-500/10",
            iconColor: "text-red-600",
            items: ["AIIMS Delhi", "PGIMER Chandigarh", "CMC Vellore", "JIPMER Puducherry", "KGMU Lucknow", "Maulana Azad Delhi", "Armed Forces Medical College", "BHU Varanasi", "AIIMS Jodhpur", "King George Medical"]
        },
        {
            title: "Medical Exams",
            bgColor: "bg-pink-500/5",
            borderColor: "border-pink-400/20",
            icon: FileText,
            iconBg: "bg-pink-500/10",
            iconColor: "text-pink-600",
            items: ["NEET UG", "NEET PG", "AIIMS", "JIPMER", "INI CET", "FMGE", "NEXT"]
        },
        {
            title: "Medical Specializations",
            bgColor: "bg-cyan-500/5",
            borderColor: "border-cyan-400/20",
            icon: Briefcase,
            iconBg: "bg-cyan-500/10",
            iconColor: "text-cyan-600",
            items: ["Cardiologist", "Neurologist", "Pediatrician", "Surgeon", "Dermatologist", "Radiologist", "Psychiatrist", "Orthopedic Surgeon", "Oncologist", "Gynecologist"]
        },
        {
            title: "Medical Courses",
            bgColor: "bg-violet-500/5",
            borderColor: "border-violet-400/20",
            icon: BookOpen,
            iconBg: "bg-violet-500/10",
            iconColor: "text-violet-600",
            items: ["MBBS", "BDS", "BAMS", "BHMS", "B.Pharm", "BSc Nursing", "BPT", "BUMS", "MD", "MS Surgery"]
        }
    ],
    "Law": [
        {
            title: "Top Law Colleges",
            bgColor: "bg-slate-500/5",
            borderColor: "border-slate-400/20",
            icon: Scale,
            iconBg: "bg-slate-500/10",
            iconColor: "text-slate-600",
            items: ["NLSIU Bangalore", "NALSAR Hyderabad", "NLIU Bhopal", "NLU Delhi", "WBNUJS Kolkata", "NLU Jodhpur", "GNLU Gandhinagar", "RMLNLU Lucknow", "HNLU Raipur", "ILS Pune"]
        },
        {
            title: "Law Exams",
            bgColor: "bg-stone-500/5",
            borderColor: "border-stone-400/20",
            icon: FileText,
            iconBg: "bg-stone-500/10",
            iconColor: "text-stone-600",
            items: ["CLAT", "AILET", "LSAT India", "MH CET Law", "SLAT", "AP LAWCET", "KLEE", "PU LLB"]
        },
        {
            title: "Law Specializations",
            bgColor: "bg-zinc-500/5",
            borderColor: "border-zinc-400/20",
            icon: Briefcase,
            iconBg: "bg-zinc-500/10",
            iconColor: "text-zinc-600",
            items: ["Corporate Lawyer", "Criminal Lawyer", "Civil Lawyer", "Tax Lawyer", "IP Lawyer", "Constitutional Lawyer", "Litigation Lawyer", "Legal Advisor", "Judge", "Legal Consultant"]
        },
        {
            title: "Law Courses",
            bgColor: "bg-neutral-500/5",
            borderColor: "border-neutral-400/20",
            icon: BookOpen,
            iconBg: "bg-neutral-500/10",
            iconColor: "text-neutral-600",
            items: ["BA LLB", "BBA LLB", "BSc LLB", "BCom LLB", "LLB", "LLM", "Integrated Law", "Corporate Law", "Criminal Law", "Cyber Law"]
        }
    ],
    "Architecture & Planning": [
        {
            title: "Top Architecture Colleges",
            bgColor: "bg-sky-500/5",
            borderColor: "border-sky-400/20",
            icon: PenTool,
            iconBg: "bg-sky-500/10",
            iconColor: "text-sky-600",
            items: ["IIT Kharagpur", "IIT Roorkee", "SPA Delhi", "CEPT Ahmedabad", "NIT Trichy", "SPA Bhopal", "Jadavpur University", "Anna University", "BMS Bangalore", "Manipal Architecture"]
        },
        {
            title: "Architecture Exams",
            bgColor: "bg-lime-500/5",
            borderColor: "border-lime-400/20",
            icon: FileText,
            iconBg: "bg-lime-500/10",
            iconColor: "text-lime-600",
            items: ["NATA", "JEE Main Paper 2", "AAT", "GATE Architecture", "CEPT Entrance"]
        },
        {
            title: "Architecture Specializations",
            bgColor: "bg-fuchsia-500/5",
            borderColor: "border-fuchsia-400/20",
            icon: Briefcase,
            iconBg: "bg-fuchsia-500/10",
            iconColor: "text-fuchsia-600",
            items: ["Urban Planner", "Landscape Architect", "Interior Designer", "Sustainable Architect", "Building Architect", "Project Manager", "3D Visualizer", "Architectural Consultant", "Conservation Architect", "Design Architect"]
        },
        {
            title: "Architecture Courses",
            bgColor: "bg-yellow-500/5",
            borderColor: "border-yellow-400/20",
            icon: BookOpen,
            iconBg: "bg-yellow-500/10",
            iconColor: "text-yellow-600",
            items: ["B.Arch", "M.Arch", "Urban Planning", "Landscape Architecture", "Interior Design", "Sustainable Architecture", "Architectural Engineering", "Construction Management", "Building Technology", "Heritage Conservation"]
        }
    ],
    "Agriculture": [
        {
            title: "Top Agriculture Colleges",
            bgColor: "bg-green-500/5",
            borderColor: "border-green-400/20",
            icon: Sprout,
            iconBg: "bg-green-500/10",
            iconColor: "text-green-600",
            items: ["IARI Delhi", "PAU Ludhiana", "UAS Bangalore", "TNAU Coimbatore", "ANGRAU Hyderabad", "GBPUAT Pantnagar", "NDUAT Faizabad", "MPUAT Udaipur", "JNKVV Jabalpur", "OUAT Bhubaneswar"]
        },
        {
            title: "Agriculture Exams",
            bgColor: "bg-emerald-500/5",
            borderColor: "border-emerald-400/20",
            icon: FileText,
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-600",
            items: ["ICAR AIEEA", "State Agriculture Entrance", "EAMCET Agriculture", "KCET Agriculture", "JEE Agriculture"]
        },
        {
            title: "Agriculture Specializations",
            bgColor: "bg-teal-500/5",
            borderColor: "border-teal-400/20",
            icon: Briefcase,
            iconBg: "bg-teal-500/10",
            iconColor: "text-teal-600",
            items: ["Agronomist", "Agricultural Scientist", "Soil Expert", "Horticulturist", "Plant Pathologist", "Agricultural Engineer", "Farm Manager", "Food Technologist", "Agricultural Economist", "Crop Consultant"]
        },
        {
            title: "Agriculture Courses",
            bgColor: "bg-lime-500/5",
            borderColor: "border-lime-400/20",
            icon: BookOpen,
            iconBg: "bg-lime-500/10",
            iconColor: "text-lime-600",
            items: ["B.Sc Agriculture", "B.Tech Agricultural Engineering", "Horticulture", "Forestry", "Agricultural Economics", "Soil Science", "Plant Breeding", "Agronomy", "Agricultural Biotechnology", "Food Technology"]
        }
    ],
    "Liberal Arts": [
        {
            title: "Top Liberal Arts Colleges",
            bgColor: "bg-purple-500/5",
            borderColor: "border-purple-400/20",
            icon: Palette,
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-600",
            items: ["Ashoka University", "Azim Premji University", "Flame University", "Shiv Nadar University", "Krea University", "Christ University", "St. Xavier's Mumbai", "Presidency Kolkata", "Fergusson Pune", "Miranda House Delhi"]
        },
        {
            title: "Liberal Arts Exams",
            bgColor: "bg-pink-500/5",
            borderColor: "border-pink-400/20",
            icon: FileText,
            iconBg: "bg-pink-500/10",
            iconColor: "text-pink-600",
            items: ["CUET", "NPAT", "IPU CET", "SET", "DUET", "BHU UET", "State University Entrance"]
        },
        {
            title: "Liberal Arts Specializations",
            bgColor: "bg-rose-500/5",
            borderColor: "border-rose-400/20",
            icon: Briefcase,
            iconBg: "bg-rose-500/10",
            iconColor: "text-rose-600",
            items: ["Content Writer", "Journalist", "Social Worker", "Psychologist", "Historian", "Political Analyst", "Public Policy Expert", "UX Researcher", "Brand Strategist", "Cultural Critic"]
        },
        {
            title: "Liberal Arts Courses",
            bgColor: "bg-fuchsia-500/5",
            borderColor: "border-fuchsia-400/20",
            icon: BookOpen,
            iconBg: "bg-fuchsia-500/10",
            iconColor: "text-fuchsia-600",
            items: ["BA Psychology", "BA Economics", "BA Sociology", "BA Political Science", "BA English", "BA History", "BA Philosophy", "Liberal Arts", "Humanities", "Social Sciences"]
        }
    ],
    "Hospitality": [
        {
            title: "Top Hospitality Colleges",
            bgColor: "bg-orange-500/5",
            borderColor: "border-orange-400/20",
            icon: UtensilsCrossed,
            iconBg: "bg-orange-500/10",
            iconColor: "text-orange-600",
            items: ["IHM Pusa Delhi", "IHM Mumbai", "IHM Bangalore", "Welcomgroup Graduate School", "Christ University", "IIHM Kolkata", "Oberoi Centre", "Manipal Academy", "Amity University", "NIPS Hotel Management"]
        },
        {
            title: "Hospitality Exams",
            bgColor: "bg-red-500/5",
            borderColor: "border-red-400/20",
            icon: FileText,
            iconBg: "bg-red-500/10",
            iconColor: "text-red-600",
            items: ["NCHMCT JEE", "AIHMCT", "IHM Entrance", "PUTHAT", "CUET", "NCHM JEE"]
        },
        {
            title: "Hospitality Specializations",
            bgColor: "bg-amber-500/5",
            borderColor: "border-amber-400/20",
            icon: Briefcase,
            iconBg: "bg-amber-500/10",
            iconColor: "text-amber-600",
            items: ["Hotel Manager", "Restaurant Manager", "Event Manager", "Chef", "Food & Beverage Manager", "Catering Manager", "Tourism Manager", "Resort Manager", "Guest Relations Manager", "Housekeeping Manager"]
        },
        {
            title: "Hospitality Courses",
            bgColor: "bg-yellow-500/5",
            borderColor: "border-yellow-400/20",
            icon: BookOpen,
            iconBg: "bg-yellow-500/10",
            iconColor: "text-yellow-600",
            items: ["Hotel Management", "Culinary Arts", "Event Management", "Tourism Management", "Food Production", "Food & Beverage Service", "Hospitality Administration", "Cruise Line Management", "Catering Technology", "Bakery & Confectionery"]
        }
    ]
};

export default function CollegeDisplay() {
    const [activeTab, setActiveTab] = useState("Engineering");
    const [searchQuery, setSearchQuery] = useState("");
    const [collegeListResults, setCollegeListResults] = useState<IntermediateCollegeSearchResult[] | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const itemsPerPage = 8;
    const [activeCategory, setActiveCategory] = useState("Engineering");
    const [currentPages, setCurrentPages] = useState<{ [key: string]: number[] }>({
        "Engineering": [1, 1, 1, 1],
        "Management": [1, 1, 1, 1],
        "Medical": [1, 1, 1, 1],
        "Law": [1, 1, 1, 1],
        "Architecture & Planning": [1, 1, 1, 1],
        "Agriculture": [1, 1, 1, 1],
        "Liberal Arts": [1, 1, 1, 1],
        "Hospitality": [1, 1, 1, 1]
    });

    // Debounced search: colleges/list API (intermediate search)
    const performSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setCollegeListResults(null);
            setSearchError(null);
            setIsSearching(false);
            setCurrentPages({
                "Engineering": [1, 1, 1, 1],
                "Management": [1, 1, 1, 1],
                "Medical": [1, 1, 1, 1],
                "Law": [1, 1, 1, 1],
                "Architecture & Planning": [1, 1, 1, 1],
                "Agriculture": [1, 1, 1, 1],
                "Liberal Arts": [1, 1, 1, 1],
                "Hospitality": [1, 1, 1, 1]
            });
            return;
        }

        setIsSearching(true);
        setSearchError(null);

        try {
            const response = await collegeService.searchIntermediateColleges({
                collegeName: query.trim(),
                page: 1,
                size: 15,
            });

            const results = response?.results ?? [];
            setCollegeListResults(results);
        } catch (error: any) {
            logger.error("College search error:", error);
            setSearchError(error?.message || "Failed to search colleges. Please try again.");
            setCollegeListResults(null);
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounce search with useEffect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(searchQuery);
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery, performSearch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                // Don't clear search query, just keep dropdown behavior
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updatePage = (cardIndex: number, direction: 'prev' | 'next') => {
        const newPages = { ...currentPages };
        const cardData = tabsData[activeCategory as keyof typeof tabsData];
        const totalPages = Math.ceil(cardData[cardIndex].items.length / itemsPerPage);

        if (direction === 'next' && newPages[activeCategory][cardIndex] < totalPages) {
            newPages[activeCategory][cardIndex]++;
        } else if (direction === 'prev' && newPages[activeCategory][cardIndex] > 1) {
            newPages[activeCategory][cardIndex]--;
        }

        setCurrentPages(newPages);
    };

    const getCurrentItems = (cardIndex: number) => {
        const cardData = tabsData[activeCategory as keyof typeof tabsData];
        const start = (currentPages[activeCategory][cardIndex] - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return cardData[cardIndex].items.slice(start, end);
    };

    const handleItemClick = (item: string, cardTitle: string) => {
        logger.log(`Clicked: ${item} from ${cardTitle}`);
        // Add your navigation logic here
        // For example: navigate to detail page
    };

    // Handle search result item click
    const handleSearchResultClick = (type: 'college' | 'course' | 'exam' | 'career', id: number) => {
        if (type === 'college') {
            window.location.href = `/colleges/${id}`;
        } else if (type === 'course') {
            window.location.href = `/courses/${id}`;
        } else if (type === 'exam') {
            window.location.href = `/exams/${id}`;
        } else if (type === 'career') {
            window.location.href = `/careers/${id}`;
        }
    };

    const currentCardData = tabsData[activeCategory as keyof typeof tabsData] || tabsData.Engineering;


    return (
        <section className="relative overflow-hidden py-10 lg:py-10 ">
            {/* Top Wave (same shape, elevated look) */}
            <div className="absolute top-0 left-0 right-0 z-10">
                <svg
                    className="w-full h-[200px] drop-shadow-lg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 350"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,160 C480,20 960,300 1440,140 L1440,0 L0,0 Z"
                        fill="#FFFFF0"
                    />
                </svg>
            </div>



            {/* Background Image with Glossy Effect */}
            {/* <div className="absolute inset-0"> */}
            {/* <img
                    src="/src/assets/indian-students-mentors.jpg"
                    alt="Students browsing colleges"
                    className="w-full h-full object-cover "
                /> */}

            {/* Glossy Overlay Effect */}
            {/* <div className="absolute inset-0 bg-background/60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70"></div> */}
            {/* </div> */}

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl pt-24">
                {/* Enhanced Header Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 animate-fade-in-up">
                    <div className="flex-1 text-center lg:text-left space-y-3">
                        <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                            Browse by{" "}

                            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                                Stream
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-md md:text-md max-w-2xl">
                            Explore the leading College Profiles, Rankings & Accreditations.
                        </p>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div ref={searchRef} className="w-full lg:w-[450px] relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-50 transition"></div>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search your Dream College"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-6 pr-14 h-12 text-base rounded-2xl border-2 border-border/50 bg-background/95 backdrop-blur-sm focus:border-primary transition-all shadow-lg"
                            />
                            <Button
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8 rounded-xl bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform shadow-md"
                                disabled={isSearching}
                            >
                                {isSearching ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Search className="w-5 h-5" />
                                )}
                            </Button>
                        </div>

                        {/* Search Results Dropdown */}
                        {searchQuery.trim() && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[400px] overflow-y-auto z-50">
                                {isSearching ? (
                                    <div className="p-4 text-center">
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto text-gray-400" />
                                        <p className="text-sm text-gray-500 mt-2">Searching...</p>
                                    </div>
                                ) : searchError ? (
                                    <div className="p-4 text-center">
                                        <p className="text-sm text-red-500">{searchError}</p>
                                    </div>
                                ) : collegeListResults !== null ? (
                                    <div className="p-2">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">Colleges</h4>
                                        {collegeListResults.length > 0 ? (
                                            collegeListResults.map((college) => (
                                                <button
                                                    key={college.id}
                                                    onClick={() => handleSearchResultClick('college', college.id)}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                                                >
                                                    <GraduationCap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{college.collegeName}</p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {[college.city, college.state].filter(Boolean).join(", ") || college.location || "—"}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center">
                                                <p className="text-sm text-gray-500">No colleges found</p>
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>

                </div>
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        {/* <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-gray-100 hover:border-teal-500 transition-all flex-shrink-0"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button> */}

                        {/* Desktop: Centered flex layout */}
                        <div className="hidden sm:flex flex-1 overflow-x-auto scrollbar-hide">
                            <div className="flex items-center justify-center gap-3 pb-2 w-full">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-6 py-2.5 whitespace-nowrap text-lg transition-all relative rounded-full ${activeCategory === category
                                            ? 'bg-gradient-to-r from-[#00C896] to-[#008F6C] text-white shadow-lg shadow-[#00C896]/30'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile: Carousel layout */}
                        <div className="sm:hidden w-full">
                            <Carousel
                                opts={{
                                    align: "start",
                                    dragFree: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2">
                                    {categories.map((category) => (
                                        <CarouselItem key={category} className="pl-2 basis-auto">
                                            <button
                                                onClick={() => setActiveCategory(category)}
                                                className={`px-4 py-2 whitespace-nowrap text-sm transition-all relative rounded-full ${activeCategory === category
                                                    ? 'bg-gradient-to-r from-[#00C896] to-[#008F6C] text-white shadow-lg shadow-[#00C896]/30'
                                                    : 'text-gray-600 hover:text-gray-900 bg-gray-100'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>

                        {/* <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-gray-100 hover:border-teal-500 transition-all flex-shrink-0"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button> */}
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {currentCardData.map((card, cardIndex) => {
                            const totalPages = Math.ceil(card.items.length / itemsPerPage);
                            const currentItems = getCurrentItems(cardIndex);
                            const currentPage = currentPages[activeCategory][cardIndex];
                            const progressWidth = (currentPage / totalPages) * 100;

                            return (
                                <div
                                    key={cardIndex}
                                    className={`${card.bgColor} ${card.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-opacity-80 backdrop-blur-sm`}
                                >
                                    {/* Card Title */}
                                    <h3 className="text-lg text-secondary  mb-6">
                                        {card.title}
                                    </h3>

                                    {/* Items List */}
                                    <div className="space-y-3 mb-6 min-h-[280px]">
                                        {currentItems.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleItemClick(item, card.title)}
                                                className="w-full flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-all group text-left p-2 rounded-lg hover:bg-white/60"
                                            >
                                                <div className="mt-0.5 flex-shrink-0">
                                                    <div className="w-4 h-4 rounded border-2 border-gray-400 flex items-center justify-center group-hover:border-teal-500 transition-colors">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-sm group-hover:bg-teal-500 transition-colors"></div>
                                                    </div>
                                                </div>
                                                <span className="flex-1 group-hover:translate-x-0.5 transition-transform">
                                                    {item}
                                                </span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center justify-center gap-3 pt-4 border-t-2 border-gray-200">
                                        <button
                                            onClick={() => updatePage(cardIndex, 'prev')}
                                            disabled={currentPage === 1}
                                            className="w-9 h-9 rounded-full border-2 border-teal-500 flex items-center justify-center text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 transition-all"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-900 min-w-[1.5rem] text-center">
                                                {currentPage}
                                            </span>
                                            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300"
                                                    style={{ width: `${progressWidth}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-500 min-w-[1.5rem] text-center">
                                                {totalPages}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => updatePage(cardIndex, 'next')}
                                            disabled={currentPage === totalPages}
                                            className="w-9 h-9 rounded-full border-2 border-teal-500 flex items-center justify-center text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 transition-all"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View All Button */}
                    <div className="flex justify-center">
                        <Button
                            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-2 text-md rounded-lg min-w-[140px]"
                        >
                            View All →
                        </Button>
                    </div>

                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg className="w-full h-20 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="#edf2f0" />
                </svg>
            </div>
        </section>

    );
}
