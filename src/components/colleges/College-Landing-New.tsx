"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import {
    Search,
    Mic,
    Star,
    MapPin,
    Users,
    Building2,
    GraduationCap,
    Trophy,
    TrendingUp,
    Plus,
    ArrowRight,
    Filter,
    Heart,
    Share2,
    ExternalLink,
    ChevronDown,
    Sparkles,
    Target,
    BookOpen,
    Calculator,
    MessageSquare,
    ThumbsUp,
    Eye,
    X,
    Building,
} from "lucide-react";
import { searchService, SearchResults } from "@/services/searchService";
import { logger } from "@/utils/logger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";

import heroImage from "../../../public/assets/website images/colleges/college landing page/freepik__talk__8450.png";

import statsAward from "../../../public/assets/stats-award.jpg";
import statsPlacement from "../../../public/assets/stats-placement.jpg";
import statsPackage from "../../../public/assets/stats-package.jpg";
import statsReviews from "../../../public/assets/stats-reviews.jpg";
import CollegeDisplay from "./College-Landing-1";
import LatestNews from "../LatestNewsNew";
import { TopColleges } from "./TopColleges";
import { CareerFinder } from "./CollegeFinder";
import { EnrollmentHero } from "./Admission-college";
import { CollegeMapper } from "./CollegeMapper";
import { SmartTools } from "./SmartTools";
import { StatewiseColleges } from "./StatewiseColleges";

import FeaturedColleges from "./Featured_Colleges";
import TopCollegeRankings from "./CollegeRanking";
import Footer from "../Footer";
import BackToTop from "../BackToTop";

// Featured colleges sample JSON data with university logos

const featuredColleges = [
    {
        id: 1,
        name: "Indian Institute of Technology Delhi",
        shortName: "IIT Delhi",
        location: "New Delhi",
        description: "Premier engineering institute known for cutting-edge research and innovation.",
        secondLine: "Ranked #1 in Engineering by NIRF with 95% placement record.",
        rating: 4.8,
        reviews: 2847,
        fees: "₹2.5 Lakhs",
        placement: "₹25 LPA",
        image: "/assets/university-logos/iit.png",
        campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
        badge: "Top Ranked",
        established: 1961,
        courses: ["B.Tech", "M.Tech", "PhD"],
        websiteUrl: "https://home.iitd.ac.in/",
    },
    {
        id: 2,
        name: "Indian Institute of Management Bangalore",
        shortName: "IIM Bangalore",
        location: "Bangalore",
        description: "Leading business school offering world-class management education.",
        secondLine: "Top MBA program with excellent industry connections and placements.",
        rating: 4.9,
        reviews: 1923,
        fees: "₹24 Lakhs",
        placement: "₹35 LPA",
        image: "/assets/university-logos/iim.png",
        campusImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
        badge: "Premier",
        established: 1973,
        courses: ["MBA", "PGPM", "Executive MBA"],
        websiteUrl: "https://www.iimb.ac.in/",
    },
    {
        id: 3,
        name: "All India Institute of Medical Sciences",
        shortName: "AIIMS Delhi",
        location: "New Delhi",
        description: "India's premier medical institute with state-of-the-art facilities.",
        secondLine: "Excellence in medical education, research, and patient care since 1956.",
        rating: 4.7,
        reviews: 3156,
        fees: "₹1.2 Lakhs",
        placement: "₹15 LPA",
        image: "/assets/university-logos/aiims.png",
        campusImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
        badge: "Medical Excellence",
        established: 1956,
        courses: ["MBBS", "MD", "MS"],
        websiteUrl: "https://www.aiims.edu/",
    },
    {
        id: 4,
        name: "National Institute of Technology Trichy",
        shortName: "NIT Trichy",
        location: "Tiruchirappalli",
        description: "Leading technical institute known for engineering excellence and innovation.",
        secondLine: "Top NIT with outstanding placement record and industry partnerships.",
        rating: 4.6,
        reviews: 2134,
        fees: "₹5.5 Lakhs",
        placement: "₹22 LPA",
        image: "/assets/university-logos/bits.png",
        campusImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
        badge: "NIT Excellence",
        established: 1964,
        courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
        websiteUrl: "https://www.nitt.edu/",
    },
    {
        id: 5,
        name: "Birla Institute of Technology and Science",
        shortName: "BITS Pilani",
        location: "Pilani",
        description: "Prestigious private technical university with global recognition and alumni network.",
        secondLine: "Known for innovation, research, and excellent industry connections worldwide.",
        rating: 4.7,
        reviews: 3021,
        fees: "₹19 Lakhs",
        placement: "₹28 LPA",
        image: "/assets/university-logos/bits.png",
        campusImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
        badge: "Innovation Hub",
        established: 1964,
        courses: ["B.E", "M.E", "MBA", "M.Sc"],
        websiteUrl: "https://www.bits-pilani.ac.in/",
    },
];

const streams = [
    {
        id: 1,
        name: "Engineering",
        colleges: 1247,
        description: "Top engineering colleges across India",
    },
    {
        id: 2,
        name: "Management",
        colleges: 856,
        description: "Premier business schools and MBA programs",
    },
    {
        id: 3,
        name: "Medical",
        colleges: 542,
        description: "Medical colleges and healthcare programs",
    },
    {
        id: 4,
        name: "Design",
        colleges: 324,
        description: "Design institutes and creative programs",
    },
    {
        id: 5,
        name: "Law",
        colleges: 298,
        description: "Law schools and legal studies",
    },
];

const topColleges = [
    {
        id: 1,
        name: "IIT Bombay",
        location: "Mumbai",
        rank: 1,
        rating: 4.9,
        fees: "₹2.5L",
        placement: "₹28L",
        image: "/assets/university-logos/iit.png",
        campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
        description: "Premier engineering institute known for cutting-edge research and innovation in technology.",
        established: 1958,
        courses: ["B.Tech", "M.Tech", "PhD", "Dual Degree"],
        websiteUrl: "https://www.iitb.ac.in/",
    },
    {
        id: 2,
        name: "IIM Ahmedabad",
        location: "Ahmedabad",
        rank: 2,
        rating: 4.8,
        fees: "₹25L",
        placement: "₹32L",
        image: "/assets/university-logos/iim.png",
        campusImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
        description:
            "Leading business school offering world-class management education and excellent industry connections.",
        established: 1961,
        courses: ["MBA", "PGPM", "Executive MBA", "Fellow Programme"],
        websiteUrl: "https://www.iima.ac.in/",
    },
    {
        id: 3,
        name: "AIIMS Delhi",
        location: "New Delhi",
        rank: 3,
        rating: 4.9,
        fees: "₹1.2L",
        placement: "₹18L",
        image: "/assets/university-logos/aiims.png",
        campusImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
        description: "India's premier medical institute with state-of-the-art facilities and excellence in healthcare.",
        established: 1956,
        courses: ["MBBS", "MD", "MS", "DM", "MCh"],
        websiteUrl: "https://www.aiims.edu/",
    },
    {
        id: 4,
        name: "IIT Madras",
        location: "Chennai",
        rank: 4,
        rating: 4.7,
        fees: "₹2.3L",
        placement: "₹26L",
        image: "/assets/university-logos/iit.png",
        campusImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
        description: "Leading technical institute known for engineering excellence and outstanding research contributions.",
        established: 1959,
        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
        websiteUrl: "https://www.iitm.ac.in/",
    },
];

// Dynamic testimonials data with Indian students
const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        college: "IIT Delhi",
        quote: "College Mentor helped me find the perfect engineering college.",
        stat: "88% students agree",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 2,
        name: "Arjun Patel",
        college: "IIM Bangalore",
        quote: "The comparison tool made my college decision so much easier.",
        stat: "92% users recommend",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 3,
        name: "Sneha Reddy",
        college: "AIIMS Delhi",
        quote: "Amazing platform! Found my dream medical college within minutes.",
        stat: "95% success rate",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        id: 4,
        name: "Rohit Kumar",
        college: "NIT Trichy",
        quote: "The rank predictor was incredibly accurate for my JEE results.",
        stat: "90% accuracy rate",
        image: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
        id: 5,
        name: "Ananya Singh",
        college: "BITS Pilani",
        quote: "Expert mentorship guided me to the right career path.",
        stat: "94% mentorship success",
        image: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
        id: 6,
        name: "Vikram Joshi",
        college: "VIT Vellore",
        quote: "Scholarship finder helped me get financial aid for my studies.",
        stat: "85% scholarship success",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
];
// Student success stories for Making Dreams Happen section
const successStories = [
    {
        id: 1,
        name: "Sudheer",
        college: "Aditya University",
        quote: "I have secured admission to Aditya University",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        badge: "Merit Scholar",
        initial: "S"
    },
    {
        id: 2,
        name: "Priya Sharma",
        college: "IIT Delhi",
        quote: "Thanks to College Mentor, I got into my dream engineering college",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        badge: "Top Ranker",
        initial: "P"
    },
    {
        id: 3,
        name: "Arjun Patel",
        college: "IIM Bangalore",
        quote: "The guidance I received was invaluable for my MBA journey",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        badge: "Excellence Award",
        initial: "A"
    },
    {
        id: 4,
        name: "Ananya Singh",
        college: "BITS Pilani",
        quote: "College Mentor team helped me navigate the admission process smoothly",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        badge: "Gold Medalist",
        initial: "A"
    },
    {
        id: 5,
        name: "Rohit Kumar",
        college: "NIT Trichy",
        quote: "Found the perfect college match with expert mentorship",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        badge: "Scholar",
        initial: "R"
    },
];

// Mentor groups corresponding to each success story
const mentorGroups = [
    [
        {
            name: "Pasupuleti Manjusha",
            role: "Career Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
        },
        {
            name: "P. Kavya Rishitha",
            role: "Student Buddy Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
        },
        {
            name: "Vaishali CN",
            role: "Admission Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop"
        },
        {
            name: "Mounika Reddy Polu",
            role: "Career Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
        },
        {
            name: "Sowmya Venkatesh",
            role: "Student Buddy Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Dr. Rajesh Kumar",
            role: "Academic Counselor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
        },
        {
            name: "Meera Desai",
            role: "Engineering Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
        },
        {
            name: "Amit Sharma",
            role: "Technical Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop"
        },
        {
            name: "Divya Narayan",
            role: "Study Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop"
        },
        {
            name: "Karthik Reddy",
            role: "Placement Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Anita Verma",
            role: "MBA Counselor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
        },
        {
            name: "Vikram Singh",
            role: "Business Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
        },
        {
            name: "Priyanka Joshi",
            role: "Career Strategist",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=200&h=200&fit=crop"
        },
        {
            name: "Rahul Mehta",
            role: "Industry Expert",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"
        },
        {
            name: "Sneha Kapoor",
            role: "Success Coach",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Ravi Patel",
            role: "Technical Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop"
        },
        {
            name: "Neha Gupta",
            role: "Education Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop"
        },
        {
            name: "Suresh Iyer",
            role: "Research Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop"
        },
        {
            name: "Kavita Nair",
            role: "Student Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop"
        },
        {
            name: "Aditya Rao",
            role: "Academic Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Pooja Agarwal",
            role: "Career Expert",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
        },
        {
            name: "Manish Kumar",
            role: "Admission Expert",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=200&h=200&fit=crop"
        },
        {
            name: "Shalini Mishra",
            role: "Study Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop"
        },
        {
            name: "Arjun Malhotra",
            role: "Success Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop"
        },
        {
            name: "Deepa Shah",
            role: "Learning Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
        }
    ]
];

// Mock lead generation function
const handleLead = (collegeId: number) => {
    logger.log(`Lead generated for college ID: ${collegeId}`);
    // In real implementation, this would call an API to store lead in admin panel
    // Example: await api.post('/admin/leads', { collegeId, timestamp: new Date(), source: 'featured_colleges' });
};

const handleKnowMore = () => {
    logger.log("User clicked Learn More!");
    // you can navigate, open modal, etc.
};
// Custom hook for counting animation
const useCountAnimation = (targetValue: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(targetValue * easeOutQuart));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [targetValue, duration, isVisible]);

    return { count, setIsVisible };
};

// Animated Counter Component
const AnimatedCounter = ({ targetValue }: { targetValue: number }) => {
    const { count, setIsVisible } = useCountAnimation(targetValue, 2000);

    return (
        <motion.span
            className="text-xl font-bold text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={() => setIsVisible(true)}
            viewport={{ once: true }}
        >
            {count.toLocaleString()}+
        </motion.span>
    );
};

const CollegeLanding = () => {
    const [selectedCollege, setSelectedCollege] = useState(topColleges[0]); // For Top Colleges section
    const [selectedFeaturedCollege, setSelectedFeaturedCollege] = useState(featuredColleges[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentTestimonials, setCurrentTestimonials] = useState([testimonials[0], testimonials[1]]);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0); // For Making Dreams Happen section
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter(); // ✅ correct hook

    const handleViewAll = () => {
        router.push("/colleges/list");
    };

    // Helper function to toggle c  ard expansion
    const toggleCardExpansion = (cardId: number) => {
        setExpandedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cardId)) {
                newSet.delete(cardId);
            } else {
                newSet.add(cardId);
            }
            return newSet;
        });
    };

    // Combined courses + colleges search with debouncing
    useEffect(() => {
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        if (searchQuery.trim().length === 0) {
            setSearchResults(null);
            setShowSuggestions(false);
            setIsSearching(false);
            return;
        }

        setShowSuggestions(true);
        setIsSearching(true);
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const results = await searchService.searchCoursesAndColleges(searchQuery.trim(), 10);
                setSearchResults(results);
                const hasResults =
                    (results.colleges?.length ?? 0) > 0 || (results.courses?.length ?? 0) > 0;
                setShowSuggestions(hasResults);
            } catch (error) {
                logger.error("Error in combined search:", error);
                setSearchResults(null);
                setShowSuggestions(false);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        };
    }, [searchQuery]);

    // Rotate testimonials every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIndex((prevIndex) => {
                const newIndex = (prevIndex + 2) % testimonials.length;
                setCurrentTestimonials([testimonials[newIndex], testimonials[(newIndex + 1) % testimonials.length]]);
                return newIndex;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Auto-rotate success stories every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % successStories.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background min-h-screen">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />
            {/* Hero Section */}
            <section className="relative bg-primary pt-20 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16 overflow-hidden">

                {/* <section className="relative bg-primary pt-16 sm:pt-20 lg:pt-32 pb-8 sm:pb-12 lg:pb-16 overflow-hidden"> */}
                {/* <section className="relative bg-gradient-to-r from-[#2a87f7] to-[#1d73e8] text-white  lg:pt-32"> */}
                {/* Two Deep Curvy Waves Background SVG */}
                <div className="absolute inset-0">
                    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="primaryBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2a87f7" />
                                <stop offset="50%" stopColor="#1d73e8" />
                                <stop offset="100%" stopColor="#1557b0" />
                            </linearGradient>
                            <linearGradient id="lightBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>

                        {/* Main background */}
                        <rect width="100%" height="100%" fill="url(#primaryBlueGradient)" />

                        {/* First Wave - 70% height coverage with deep curves */}
                        <path
                            d="M0,240 C180,120 360,360 540,240 C720,120 900,360 1080,240 C1260,120 1350,300 1440,240 L1440,800 L0,800 Z"
                            fill="url(#lightBlueGradient)"
                            opacity="0.4"
                        />
                    </svg>
                </div>

                <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 pt-6 sm:pt-6 md:pt-6">
                    {/* <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center"> */}
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center w-full">

                        {/* Left Content */}
                        <motion.div
                            className="text-left"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Search size={16} className="text-white animate-pulse" />
                <span className="text-white font-medium text-sm">Search + Quick Access</span>
              </div> */}

                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                                Featured Colleges
                                <br />
                                <span className="text-white/90">Help to build your dreams</span>
                            </h1>

                            <p className="text-sm lg:text-base xl:text-lg text-white/80 mb-4 max-w-2xl">
                                Our mission is to help students make informed decisions about their higher education journey. Discover,
                                compare, and choose the perfect college that aligns with your career aspirations.
                            </p>

                            {/* Search Bar - Match Secondary Navigation */}
                            <div className="flex items-center w-full">
                                <div className="relative w-full sm:w-auto">
                                    <div
                                        className="relative flex items-center justify-center w-full"
                                        onMouseLeave={() => setShowSuggestions(false)}
                                    >
                                        {/* Search Icon - Always Visible */}
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={() => {
                                                if (searchQuery.length > 0) {
                                                    setShowSuggestions(true);
                                                }
                                            }}
                                            onBlur={() => {
                                                setTimeout(() => setShowSuggestions(false), 150);
                                            }}
                                            placeholder="Search colleges, courses, exams..."
                                            className="w-full sm:w-80 md:w-96 lg:w-[420px] xl:w-[480px] pl-12 pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white/95 backdrop-blur-lg border border-white/40 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                                        />

                                        {/* Clear button when there's text */}
                                        {searchQuery.length > 0 && (
                                            <button
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full transition-all duration-200"
                                                onClick={() => {
                                                    setSearchQuery("");
                                                    setShowSuggestions(false);
                                                }}
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                    {/* Search Suggestions Dropdown - Courses & Colleges */}
                                    {showSuggestions && searchQuery.trim().length > 0 && (isSearching || (searchResults && (searchResults.colleges?.length > 0 || searchResults.courses?.length > 0))) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 w-full bg-card border border-border rounded-xl shadow-elegant mt-0 z-[300] max-h-60 overflow-y-auto"
                                            onMouseEnter={() => setShowSuggestions(true)}
                                        >
                                            {isSearching ? (
                                                <div className="px-4 py-3 text-center text-muted-foreground text-sm">
                                                    Searching...
                                                </div>
                                            ) : (
                                                <>
                                                    {searchResults?.colleges && searchResults.colleges.length > 0 && (
                                                        <div className="border-b border-border/50">
                                                            <div className="px-4 py-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                                                                <Building2 size={14} />
                                                                Colleges
                                                            </div>
                                                            {searchResults.colleges.map((college) => (
                                                                <div
                                                                    key={`col-${college.id}`}
                                                                    className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors"
                                                                    onClick={() => {
                                                                        setSearchQuery("");
                                                                        setShowSuggestions(false);
                                                                        setSearchResults(null);
                                                                        router.push(`/college-details?id=${college.id}`);
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <Building2 size={14} className="text-muted-foreground flex-shrink-0" />
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="text-foreground text-sm font-medium truncate">{college.name}</div>
                                                                            {(college.city || college.state) && (
                                                                                <div className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                                                                                    <MapPin size={10} />
                                                                                    {[college.city, college.state].filter(Boolean).join(", ")}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {searchResults?.courses && searchResults.courses.length > 0 && (
                                                        <div>
                                                            <div className="px-4 py-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                                                                <GraduationCap size={14} />
                                                                Courses
                                                            </div>
                                                            {searchResults.courses.map((course) => (
                                                                <div
                                                                    key={`crs-${course.id}`}
                                                                    className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors border-b border-border/50 last:border-b-0"
                                                                    onClick={() => {
                                                                        setSearchQuery("");
                                                                        setShowSuggestions(false);
                                                                        setSearchResults(null);
                                                                        router.push(`/course-details/${course.id}`);
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <GraduationCap size={14} className="text-muted-foreground flex-shrink-0" />
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="text-foreground text-sm font-medium truncate">{course.title}</div>
                                                                            {course.level && (
                                                                                <span className="text-muted-foreground text-xs">{course.level}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-1 mt-4">
                                <Button
                                    variant="success"
                                    size="lg"
                                    className="shadow-elegant hover:shadow-strong text-sm sm:text-base w-full sm:w-auto"
                                    onClick={() => router.push("/college-details")}
                                >
                                    <Building className="mr-2" size={18} />
                                    Explore Colleges
                                </Button>
                                <Button
                                    onClick={handleViewAll}
                                    size="lg"
                                    className="bg-white text-primary hover:bg-primary hover:text-white shadow-md text-sm sm:text-base w-full sm:w-auto transition-colors duration-200"
                                >
                                    <Target className="mr-2" size={18} />
                                    Compare Colleges
                                </Button>



                            </div>

                            {/* Animated Statistics */}
                            <motion.div
                                className="grid grid-cols-3 gap-2 sm:gap-6 rounded-2xl p-3 sm:p-6 mb-6 sm:mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <motion.div
                                    className="text-left"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    <div className="text-white/90 text-[10px] sm:text-sm font-medium mb-0 leading-tight">Total Colleges</div>
                                    <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-0 leading-tight -mt-1">
                                        <AnimatedCounter targetValue={5000} />
                                    </div>
                                    <div className="text-white/70 text-[9px] sm:text-xs leading-tight -mt-1">Verified Colleges</div>
                                </motion.div>

                                <motion.div
                                    className="text-left"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.9 }}
                                >
                                    <div className="text-white/90 text-[10px] sm:text-sm font-medium mb-0 leading-tight">Reviews</div>
                                    <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-0 leading-tight -mt-1">
                                        <AnimatedCounter targetValue={50000} />
                                    </div>
                                    <div className="text-white/70 text-[9px] sm:text-xs leading-tight -mt-1">Student Reviews</div>
                                </motion.div>

                                <motion.div
                                    className="text-left"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 1.1 }}
                                >
                                    <div className="text-white/90 text-[10px] sm:text-sm font-medium mb-0 leading-tight">Top Recruiters</div>
                                    <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-0 leading-tight -mt-1">
                                        <AnimatedCounter targetValue={500} />
                                    </div>
                                    <div className="text-white/70 text-[9px] sm:text-xs leading-tight -mt-1">Top Companies</div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - College Success Stories with Floating Stats */}
                        <motion.div
                            className="relative hidden lg:flex justify-center items-center w-full h-full -mt-8 mb-16"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Main Image Card */}
                            <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden w-[550px] aspect-[16/9]">
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                </div>

                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={heroImage.src}
                                        alt="Students celebrating graduation"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0"></div>
                                </div>

                                {/* Dynamic Text Content Inside Card */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                    <motion.div
                                        className="space-y-4"
                                        key={testimonialIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {currentTestimonials.slice(0, 1).map((testimonial, index) => (

                                            <motion.div
                                                key={testimonial.id}
                                                className="flex items-start gap-4 "
                                                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                            >
                                                <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex-shrink-0 border-2 border-white/30">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            // Fallback to alternative human image if primary fails
                                                            const fallbackImages = [
                                                                "https://randomuser.me/api/portraits/women/25.jpg",
                                                                "https://randomuser.me/api/portraits/men/18.jpg",
                                                                "https://randomuser.me/api/portraits/women/35.jpg",
                                                                "https://randomuser.me/api/portraits/men/22.jpg",
                                                                "https://randomuser.me/api/portraits/women/47.jpg",
                                                                "https://randomuser.me/api/portraits/men/63.jpg",
                                                            ];
                                                            e.currentTarget.src = fallbackImages[testimonial.id - 1] || fallbackImages[0];
                                                        }}
                                                    />
                                                </div>
                                                <div className="text-white">
                                                    <div className="text-sm font-medium leading-tight">"{testimonial.quote}"</div>
                                                    <div className="text-xs text-white/70 mt-1">{testimonial.stat}</div>
                                                    <div className="text-xs text-white/50 mt-1">
                                                        {testimonial.name} • {testimonial.college}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>


                            {/* Top Ribbon - 500+ Colleges */}
                            {/* <motion.div
                                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-primary shadow-xl z-30 cursor-default animate-floatRibbon"
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                whileHover={{ scale: 1.05 }}
                            > */}
                            {/* <div className="relative px-4 py-2 flex items-center gap-2 font-bold text-sm rounded-r-full rounded-l-full">
                                    <GraduationCap className="w-5 h-5 text-blue-500" />
                                    <span>500+ Colleges</span> */}
                            {/* Ribbon tail */}
                            {/* <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></span> */}
                            {/* </div> */}
                            {/* </motion.div> */}

                            {/* Right Ribbon - 85% Success Rate */}

                            {/* <motion.div
                                className="absolute top-1/2 right-12 transform -translate-y-1/2 bg-white text-primary shadow-xl z-30 cursor-default animate-floatRibbon"
                                animate={{ x: [0, -12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="relative px-4 py-2 flex items-center gap-2 font-bold text-sm rounded-r-full rounded-l-full">
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                    <span>85% Success Rate</span>
                                    <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></span>
                                </div>
                            </motion.div> */}

                            {/* Bottom Ribbon - 50+ Programs */}
                            {/* <motion.div
                                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-primary shadow-xl z-30 cursor-default animate-floatRibbon"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="relative px-4 py-2 flex items-center gap-2 font-bold text-sm rounded-r-full rounded-l-full">
                                    <BookOpen className="w-5 h-5 text-green-400" />
                                    <span>50+ Programs</span>
                                    <span className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></span>
                                </div>
                            </motion.div> */}



                        </motion.div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
                    <svg
                        className="block w-full h-[100px] sm:h-[270px] lg:h-[320px]"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0,160 
             C180,240 360,280 540,240 
             C720,200 900,120 1080,160 
             C1260,200 1440,320 1440,320 
             L1440,320 L0,320 Z"
                            fill="#FFFFF0"
                        />
                    </svg>
                </div>

            </section>



            <FeaturedColleges />




            <CollegeDisplay />
            <TopColleges />
            <SmartTools />
            <CareerFinder />
            {/* Call EnrollmentHero here */}
            <EnrollmentHero onKnowMore={handleKnowMore} />
            < TopCollegeRankings />
            <CollegeMapper />
            {/* <NewsBlogs /> */}
            {/* Making Dreams Happen Section */}
            <section className="py-24 bg-[#a6e0de]/50 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        {/* Left Side - Student Success Story */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Polaroid-style Card */}
                            <div className="relative max-w-md mx-auto">
                                <motion.div
                                    key={currentStoryIndex}
                                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    whileHover={{ rotate: -2, scale: 1.02 }}
                                    className="bg-white p-6 rounded-3xl shadow-2xl border-8 border-white"
                                >
                                    <div className="relative">
                                        <motion.img
                                            key={`img-${currentStoryIndex}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                            src={successStories[currentStoryIndex].image}
                                            alt={successStories[currentStoryIndex].name}
                                            className="w-full h-80 object-cover rounded-2xl"
                                        />
                                        {/* Achievement Badge */}
                                        <motion.div
                                            key={`badge-${currentStoryIndex}`}
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 6 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                            className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-xl"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Trophy className="w-5 h-5" />
                                                <span className="font-bold text-sm">{successStories[currentStoryIndex].badge}</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        key={`caption-${currentStoryIndex}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="mt-6 text-center"
                                    >
                                        <p className="text-gray-600 italic text-sm leading-relaxed">
                                            "Graduating with honors"
                                        </p>
                                    </motion.div>
                                </motion.div>

                                {/* Progress Indicators */}
                                <div className="flex justify-center gap-2 mt-6">
                                    {successStories.map((_, index) => (
                                        <motion.div
                                            key={index}
                                            className={`h-2 rounded-full transition-all duration-500 ${index === currentStoryIndex ? 'w-8 bg-teal-600' : 'w-2 bg-teal-200'
                                                }`}
                                            onClick={() => setCurrentStoryIndex(index)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal-200 rounded-full px-6 py-3">
                                <Sparkles className="w-5 h-5 text-teal-600" />
                                <span className="text-teal-700 font-semibold text-sm">Success Stories</span>
                            </div>

                            <h2 className="text-xl md:text-2xl lg:text-3xl  font-bold text-gray-900 leading-tight">
                                Making Dreams{" "}

                                <span className="text-transparent bg-clip-text bg-secondary">
                                    Happen
                                </span>
                                <span className="text-2xl align-super text-gray-400">©</span>
                            </h2>

                            <div className="space-y-4">
                                <span className="text-xl md:text-2xl lg:text-3xl l font-bold text-gray-700 leading-tight">
                                    Thanks to{" "}
                                </span>
                                <span className="text-xl md:text-2xl lg:text-2xl  font-extrabold bg-clip-text text-transparent bg-secondary leading-tight">
                                    COLLEGE MENTOR

                                    TEAM
                                </span>
                            </div>

                            <motion.div
                                key={`testimonial-${currentStoryIndex}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white/80 backdrop-blur-sm border-l-4 border-teal-600 rounded-2xl p-6 shadow-lg"
                            >
                                <p className="text-lg text-gray-700 font-semibold mb-3">
                                    "{successStories[currentStoryIndex].quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                        {successStories[currentStoryIndex].initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{successStories[currentStoryIndex].name}</p>
                                        <p className="text-sm text-teal-600 italic">{successStories[currentStoryIndex].college}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Mentor Cards Section */}
                    <div className="mt-16">
                        {/* Mobile Carousel */}
                        <div className="block md:hidden">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2">
                                    {mentorGroups[currentStoryIndex].map((mentor, index) => (
                                        <CarouselItem key={`carousel-${currentStoryIndex}-${mentor.name}`} className="pl-2 basis-[70%] sm:basis-1/2">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group h-full"
                                            >
                                                <Card className="relative bg-white border-border/50 hover:border-teal-300 transition-all duration-300 hover:shadow-xl overflow-hidden h-full">
                                                    <CardContent className="p-4 text-center space-y-3">
                                                        {/* Badge */}
                                                        <div className="absolute top-2 right-2 text-xl">{mentor.badge}</div>

                                                        {/* Avatar */}
                                                        <div className="relative mx-auto w-20 h-20">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-md opacity-50"></div>
                                                            <img
                                                                src={mentor.image}
                                                                alt={mentor.name}
                                                                className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                                            />
                                                        </div>

                                                        {/* Name */}
                                                        <h3 className="font-bold text-gray-900 text-sm leading-tight">
                                                            {mentor.name}
                                                        </h3>

                                                        {/* Role */}
                                                        <p className="text-xs text-gray-600 font-medium">
                                                            {mentor.role}
                                                        </p>

                                                        {/* Top Mentor Badge */}
                                                        <div className="flex items-center justify-center gap-1 text-teal-600">
                                                            <Star className="w-3 h-3 fill-current" />
                                                            <span className="text-xs font-bold uppercase tracking-wide">Top Mentor</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="flex justify-center gap-2 mt-4">
                                    <CarouselPrevious className="static translate-y-0 h-8 w-8" />
                                    <CarouselNext className="static translate-y-0 h-8 w-8" />
                                </div>
                            </Carousel>
                        </div>

                        {/* Desktop Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6"
                        >
                            {mentorGroups[currentStoryIndex].map((mentor, index) => (
                                <motion.div
                                    key={`${currentStoryIndex}-${mentor.name}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.05 }}
                                    className="group"
                                >
                                    <Card className="relative bg-white border-border/50 hover:border-teal-300 transition-all duration-300 hover:shadow-xl overflow-hidden">
                                        <CardContent className="p-6 text-center space-y-4">
                                            {/* Badge */}
                                            <div className="absolute top-3 right-3 text-2xl">{mentor.badge}</div>

                                            {/* Avatar */}
                                            <div className="relative mx-auto w-24 h-24">
                                                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                                <img
                                                    src={mentor.image}
                                                    alt={mentor.name}
                                                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                                />
                                            </div>

                                            {/* Name */}
                                            <h3 className="font-bold text-gray-900 text-sm leading-tight">
                                                {mentor.name}
                                            </h3>

                                            {/* Role */}
                                            <p className="text-xs text-gray-600 font-medium">
                                                {mentor.role}
                                            </p>

                                            {/* Top Mentor Badge */}
                                            <div className="flex items-center justify-center gap-2 text-teal-600 group-hover:text-teal-700 transition-colors">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-xs font-bold uppercase tracking-wide">Top Mentor</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* State-wise Colleges Section */}
            <StatewiseColleges />

            <LatestNews />

            <Footer />
            <BackToTop />

        </div>
    );
};

export default CollegeLanding;
