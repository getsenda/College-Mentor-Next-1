"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Star, MapPin, TrendingUp, Award, ExternalLink, Eye, GraduationCap, Users, BookOpen, CheckCircle, Clock, Building, Sparkles, Loader2 } from 'lucide-react';
import iimb from '../../../public/assets/iimb.jpg';
import delhi from '../../../public/assets/delhiu.avif';
import iitd from '../../../public/assets/iitd.jpg';
import aiims from '../../../public/assets/aiims.jpg';
import nitt from '../../../public/assets/nitt.jpeg';
import { useInView } from 'framer-motion';
import { ScrollAnimation } from '../ui/scroll-animation';
import { ImageWithFallback } from '../figma/FallBack';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { collegeService, FeaturedCollege } from '@/services/collegeService';
import { logger } from '@/utils/logger';
import { useRouter } from "next/navigation";

interface College {
    id: string;
    name: string;
    location: string;
    image: any;
    badge: {
        text: string;
        color: string;
    };
    rating: number;
    reviews: number;
    fees: {
        amount: string;
        label: string;
    };
    package: {
        amount: string;
        label: string;
    };
    ranking: string;
    category: string;
    website: string;
    description: string;
    established: string;
    courses: string[];
    highlights: string[];
}

const collegePagesData: College[][] = [
    // Page 1 - Top 5 Premier Institutes
    [
        {
            id: '1',
            name: 'IIT Delhi',
            location: 'New Delhi',
            image: iitd,
            badge: {
                text: 'Top Ranked',
                color: 'bg-gradient-to-r from-yellow-400 to-orange-500'
            },
            rating: 4.8,
            reviews: 2450,
            fees: {
                amount: '₹2.5 Lakhs',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹25 LPA',
                label: 'Avg Package'
            },
            ranking: 'Ranked #1 in Engineering by NIRF with 95% placement record',
            category: 'Engineering',
            website: 'https://www.iitd.ac.in',
            description: 'IIT Delhi is one of the premier engineering institutes in India, known for its cutting-edge research, world-class faculty, and excellent placement opportunities.',
            established: '1961',
            courses: ['B.Tech', 'M.Tech', 'PhD', 'MBA', 'MSc'],
            highlights: [
                '95% Placement Rate',
                'Top recruiters: Google, Microsoft, Amazon',
                'State-of-the-art research facilities',
                'International collaborations with MIT, Stanford'
            ]
        },
        {
            id: '2',
            name: 'IIM Bangalore',
            location: 'Bangalore',
            image: iimb,
            badge: {
                text: 'Premier',
                color: 'bg-gradient-to-r from-blue-500 to-purple-600'
            },
            rating: 4.9,
            reviews: 3200,
            fees: {
                amount: '₹24 Lakhs',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹32 LPA',
                label: 'Avg Package'
            },
            ranking: 'Top business school with world-class faculty and global exposure',
            category: 'Management',
            website: 'https://www.iimb.ac.in',
            description: 'IIM Bangalore is India\'s leading business school, offering world-class management education with rigorous curriculum and strong industry connections.',
            established: '1973',
            courses: ['MBA', 'PGPBA', 'PhD', 'Executive MBA', 'Management Development Programs'],
            highlights: [
                '100% Placement Record',
                'Average salary among highest in Asia',
                'Global exchange programs with 90+ universities',
                'Strong alumni network of 30,000+ professionals'
            ]
        },
        {
            id: '3',
            name: 'AIIMS Delhi',
            location: 'New Delhi',
            image: aiims,
            badge: {
                text: 'Medical Excellence',
                color: 'bg-gradient-to-r from-green-500 to-teal-600'
            },
            rating: 4.9,
            reviews: 1890,
            fees: {
                amount: '₹5.2 Lakhs',
                label: 'Total Course Fees'
            },
            package: {
                amount: '₹18 LPA',
                label: 'Avg Package'
            },
            ranking: 'Premier medical institute with cutting-edge research and innovation',
            category: 'Medical',
            website: 'https://www.aiims.edu',
            description: 'AIIMS Delhi is India\'s most prestigious medical institute, renowned for excellence in medical education, research, and patient care.',
            established: '1956',
            courses: ['MBBS', 'MD', 'MS', 'DM', 'MCh', 'PhD', 'BSc Nursing'],
            highlights: [
                'World-class medical facilities',
                'Leading research in medical sciences',
                'Super-specialty training programs',
                'Affordable quality education'
            ]
        },
        {
            id: '4',
            name: 'NIT Trichy',
            location: 'Tiruchirappalli',
            image: nitt,
            badge: {
                text: 'NITs Excellence',
                color: 'bg-gradient-to-r from-indigo-500 to-blue-600'
            },
            rating: 4.6,
            reviews: 1650,
            fees: {
                amount: '₹5.5 Lakhs',
                label: 'Total Course Fees'
            },
            package: {
                amount: '₹22 LPA',
                label: 'Avg Package'
            },
            ranking: 'Top NIT with excellent infrastructure and placement opportunities',
            category: 'Engineering',
            website: 'https://www.nitt.edu',
            description: 'NIT Trichy is among the top National Institutes of Technology in India, offering excellent engineering and technology education.',
            established: '1964',
            courses: ['B.Tech', 'M.Tech', 'MCA', 'MBA', 'MSc', 'PhD'],
            highlights: [
                '90% Placement Rate',
                'Strong industry connections',
                'Modern labs and research centers',
                'Active student clubs and technical societies'
            ]
        },
        {
            id: '5',
            name: 'DU - Delhi University',
            location: 'New Delhi',
            image: delhi,
            badge: {
                text: 'Historic Excellence',
                color: 'bg-gradient-to-r from-red-500 to-pink-600'
            },
            rating: 4.7,
            reviews: 4100,
            fees: {
                amount: '₹50,000',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹8 LPA',
                label: 'Avg Package'
            },
            ranking: 'One of India\'s oldest and most prestigious universities',
            category: 'Arts & Science',
            website: 'https://www.du.ac.in',
            description: 'Delhi University is one of India\'s premier universities, offering diverse programs across arts, sciences, and commerce.',
            established: '1922',
            courses: ['BA', 'BSc', 'BCom', 'MA', 'MSc', 'MCom', 'PhD'],
            highlights: [
                '91 affiliated colleges',
                'Diverse course offerings',
                'Strong alumni network',
                'Rich cultural and academic heritage'
            ]
        },
    ],
    // Page 2 - Next 5 Premier Institutes
    [
        {
            id: '6',
            name: 'IIT Bombay',
            location: 'Mumbai',
            image: iitd,
            badge: {
                text: 'Top Ranked',
                color: 'bg-gradient-to-r from-orange-400 to-red-500'
            },
            rating: 4.9,
            reviews: 2850,
            fees: {
                amount: '₹2.3 Lakhs',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹28 LPA',
                label: 'Avg Package'
            },
            ranking: 'Ranked #2 in Engineering with exceptional research output',
            category: 'Engineering',
            website: 'https://www.iitb.ac.in',
            description: 'IIT Bombay is renowned for its academic excellence, cutting-edge research facilities, and strong industry partnerships.',
            established: '1958',
            courses: ['B.Tech', 'M.Tech', 'PhD', 'Dual Degree', 'MSc'],
            highlights: [
                '98% Placement Rate',
                'Highest number of patents among IITs',
                'Strong startup ecosystem',
                'International research collaborations'
            ]
        },
        {
            id: '7',
            name: 'IIM Ahmedabad',
            location: 'Ahmedabad',
            image: iimb,
            badge: {
                text: 'Elite',
                color: 'bg-gradient-to-r from-purple-500 to-pink-600'
            },
            rating: 4.9,
            reviews: 3500,
            fees: {
                amount: '₹25 Lakhs',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹35 LPA',
                label: 'Avg Package'
            },
            ranking: 'India\'s top management school with global recognition',
            category: 'Management',
            website: 'https://www.iima.ac.in',
            description: 'IIM Ahmedabad is India\'s premier management institute, known for producing business leaders and entrepreneurs.',
            established: '1961',
            courses: ['MBA', 'PGP', 'PhD', 'Executive Education', 'Fellow Programme'],
            highlights: [
                '100% Placement Record',
                'Highest average package in India',
                'Strong entrepreneurship cell',
                'Global faculty and curriculum'
            ]
        },
        {
            id: '8',
            name: 'BITS Pilani',
            location: 'Pilani',
            image: nitt,
            badge: {
                text: 'Premier Private',
                color: 'bg-gradient-to-r from-cyan-500 to-blue-600'
            },
            rating: 4.7,
            reviews: 2100,
            fees: {
                amount: '₹4.5 Lakhs',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹20 LPA',
                label: 'Avg Package'
            },
            ranking: 'Top private engineering institute with excellent academics',
            category: 'Engineering',
            website: 'https://www.bits-pilani.ac.in',
            description: 'BITS Pilani is a leading private institute offering world-class engineering education with flexible curriculum.',
            established: '1964',
            courses: ['B.E', 'M.E', 'MSc', 'MBA', 'PhD'],
            highlights: [
                'Practice School program with industry',
                'Flexible credit system',
                '92% Placement Rate',
                'Multi-campus presence'
            ]
        },
        {
            id: '9',
            name: 'IISc Bangalore',
            location: 'Bangalore',
            image: aiims,
            badge: {
                text: 'Research Leader',
                color: 'bg-gradient-to-r from-teal-500 to-green-600'
            },
            rating: 4.8,
            reviews: 1500,
            fees: {
                amount: '₹3 Lakhs',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹24 LPA',
                label: 'Avg Package'
            },
            ranking: 'Premier research institute with focus on science and engineering',
            category: 'Science & Engineering',
            website: 'https://www.iisc.ac.in',
            description: 'IISc Bangalore is India\'s leading research institution, known for groundbreaking research and innovation.',
            established: '1909',
            courses: ['BSc', 'MTech', 'MSc', 'PhD', 'Integrated PhD'],
            highlights: [
                'Top research publications globally',
                'World-class research facilities',
                'Strong industry collaboration',
                'International faculty'
            ]
        },
        {
            id: '10',
            name: 'Jawaharlal Nehru University',
            location: 'New Delhi',
            image: delhi,
            badge: {
                text: 'Academic Excellence',
                color: 'bg-gradient-to-r from-rose-500 to-orange-600'
            },
            rating: 4.6,
            reviews: 2800,
            fees: {
                amount: '₹30,000',
                label: 'Annual Fees'
            },
            package: {
                amount: '₹7 LPA',
                label: 'Avg Package'
            },
            ranking: 'Leading university for social sciences and humanities',
            category: 'Arts & Science',
            website: 'https://www.jnu.ac.in',
            description: 'JNU is renowned for its academic excellence in social sciences, humanities, and science programs.',
            established: '1969',
            courses: ['BA', 'BSc', 'MA', 'MSc', 'MPhil', 'PhD'],
            highlights: [
                'Top-ranked in social sciences',
                'Research-oriented curriculum',
                'Vibrant campus life',
                'International collaborations'
            ]
        },
    ],
];

// Default images array for fallback
const defaultImages = [iitd, iimb, aiims, nitt, delhi];

// Number of cards per page in the right-side list
const ITEMS_PER_PAGE = 5;

// Helper function to format currency
const formatCurrency = (amount: number): string => {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} Lakhs`;
    } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
};

// Helper function to parse fees string (e.g., "2.5lakh" -> 250000)
const parseFees = (feesString: string): number => {
    if (!feesString) return 0;
    const lower = feesString.toLowerCase();
    if (lower.includes('lakh')) {
        const num = parseFloat(lower.replace(/[^\d.]/g, ''));
        return num * 100000;
    }
    if (lower.includes('crore')) {
        const num = parseFloat(lower.replace(/[^\d.]/g, ''));
        return num * 10000000;
    }
    const num = parseFloat(lower.replace(/[^\d.]/g, ''));
    return num || 0;
};

// Helper function to parse package string (e.g., "Rs. 3.53 LPA" -> 353000)
const parsePackage = (packageString: string): number => {
    if (!packageString) return 0;
    const lower = packageString.toLowerCase();
    if (lower.includes('lpa') || lower.includes('lakh')) {
        const num = parseFloat(lower.replace(/[^\d.]/g, ''));
        return num * 100000;
    }
    if (lower.includes('crore')) {
        const num = parseFloat(lower.replace(/[^\d.]/g, ''));
        return num * 10000000;
    }
    const num = parseFloat(lower.replace(/[^\d.]/g, ''));
    return num || 0;
};

// Transform API response to UI format with defaults
const transformFeaturedCollege = (apiCollege: FeaturedCollege, index: number): College => {
    // Get default image (cycle through available images)
    const defaultImage = defaultImages[index % defaultImages.length];

    // Handle recommended courses - could be array or string
    const courses = Array.isArray(apiCollege.recommendedCourses)
        ? apiCollege.recommendedCourses
        : apiCollege.recommendedCourses && typeof apiCollege.recommendedCourses === 'string'
            ? apiCollege.recommendedCourses.split(',').map((c: string) => c.trim()).filter(Boolean)
            : ['B.Tech', 'M.Tech']; // Default courses

    // Default badge based on index or collegeTag
    const badges = [
        { text: 'Top Ranked', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' },
        { text: 'Premier', color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
        { text: 'Excellence', color: 'bg-gradient-to-r from-green-500 to-teal-600' },
        { text: 'Elite', color: 'bg-gradient-to-r from-indigo-500 to-blue-600' },
        { text: 'Featured', color: 'bg-gradient-to-r from-purple-500 to-pink-600' },
    ];
    const badge = apiCollege.collegeTag === 'premium'
        ? { text: 'Premium', color: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
        : badges[index % badges.length];

    // Parse rating
    const rating = apiCollege.rating ? parseFloat(apiCollege.rating) : 4.5;

    return {
        id: apiCollege.id.toString(), // Use actual API college ID, not index
        name: apiCollege.name || 'College Name',
        location: apiCollege.location || 'Location Not Available',
        image: defaultImage,
        badge: badge,
        rating: rating,
        reviews: 1500, // Default reviews
        fees: {
            // Show exactly as returned from API (no re-formatting)
            amount: apiCollege.annualFees || 'Annual Fees: N/A',
            label: 'Annual Fees'
        },
        package: {
            // Show exactly as returned from API (no re-formatting)
            amount: apiCollege.avgPackage || 'Avg Package: N/A',
            label: 'Avg Package'
        },
        ranking: 'Top-ranked institution with excellent placement opportunities',
        category: 'Engineering', // Default category
        website: 'https://www.example.com', // Default website
        description: apiCollege.description || 'A premier educational institution known for academic excellence and outstanding placement records.',
        established: apiCollege.establishedYear?.toString() || '1990',
        courses: courses.length > 0 ? courses : ['B.Tech', 'M.Tech'],
        highlights: [
            'Excellent Placement Record',
            'World-class Infrastructure',
            'Experienced Faculty',
            'Industry Partnerships'
        ]
    };
};

// Split colleges into pages (ITEMS_PER_PAGE per page)
const splitIntoPages = (colleges: College[]): College[][] => {
    const pages: College[][] = [];
    for (let i = 0; i < colleges.length; i += ITEMS_PER_PAGE) {
        pages.push(colleges.slice(i, i + ITEMS_PER_PAGE));
    }
    return pages.length > 0 ? pages : [[colleges[0]]]; // At least one page
};

export default function FeaturedColleges() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [collegePages, setCollegePages] = useState<College[][]>([collegePagesData[0]]); // Fallback to hardcoded data
    const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef(null);
    const detailedCardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // Fetch featured colleges from API
    useEffect(() => {
        const fetchFeaturedColleges = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiColleges = await collegeService.getFeaturedColleges();

                if (apiColleges.length === 0) {
                    // If no colleges from API, use fallback data
                    setCollegePages(collegePagesData);
                    setSelectedCollege(collegePagesData[0][0]);
                    setLoading(false);
                    return;
                }

                // Transform API data to UI format
                // IMPORTANT: Pass the actual API college object, not index-based data
                const transformedColleges = apiColleges.map((college, index) => {
                    const transformed = transformFeaturedCollege(college, index);
                    logger.log('🔹 Transforming college:', {
                        apiId: college.id,
                        transformedId: transformed.id,
                        name: college.name,
                        index: index
                    });
                    return transformed;
                });

                // Split into pages
                const pages = splitIntoPages(transformedColleges);
                setCollegePages(pages);
                setSelectedCollege(pages[0][0]);
            } catch (err) {
                logger.error('Error fetching featured colleges:', err);
                setError('Failed to load featured colleges');
                // Fallback to hardcoded data on error
                setCollegePages(collegePagesData);
                setSelectedCollege(collegePagesData[0][0]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedColleges();
    }, []);

    const colleges = collegePages[currentPage] || [];

    const scrollToDetailedCard = () => {
        if (detailedCardRef.current) {
            const elementTop = detailedCardRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100; // Offset from top to account for header
            window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
        }
    };

    const handleApplyNow = (college: College) => {
        // Store lead in admin panel (mock implementation)
        logger.log('🔹 Apply Now clicked:', {
            collegeId: college.id,
            collegeName: college.name
        });
        // Navigate to college details or open website
        if (college.website && college.website !== 'https://www.example.com') {
            window.open(college.website, '_blank');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            router.push(`/college-details?id=${college.id}`);
        }
    };

    const handleViewDetails = (college: College) => {
        // Navigate to college detail page with actual college ID from API
        logger.log('🔹 View Details clicked:', {
            collegeId: college.id,
            collegeName: college.name
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/college-details?id=${college.id}`);
    };

    const handleCollegeSelect = (college: College) => {
        setSelectedCollege(college);
        // Use setTimeout to ensure the DOM has updated with the new college
        setTimeout(() => {
            scrollToDetailedCard();
        }, 100);
    };

    return (
        <section
            ref={sectionRef}
            className="pt-0 pb-0 px-4 bg-[#FFFFF0] overflow-hidden relative -mt-0"
        >


            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <ScrollAnimation className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-block mb-4"
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-8">
                            <Sparkles size={12} className="text-primary animate-pulse" />
                            <span className="text-primary font-medium text-xs">Premium Selection</span>
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-0.5">
                            Featured{' '}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Colleges
                            </span>

                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Explore premier colleges and universities with excellent placement records and world-class education
                    </motion.p>
                </ScrollAnimation>

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                            <p className="text-gray-600">Loading featured colleges...</p>
                        </div>
                    </div>
                ) : error && collegePages.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <p className="text-red-600 mb-2">{error}</p>
                            <p className="text-gray-500">Using default data</p>
                        </div>
                    </div>
                ) : selectedCollege ? (
                    /* Split Screen Layout */
                    <div ref={detailedCardRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

                        {/* Left Side - Detail View */}
                        <ScrollAnimation delay={0.2}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCollege.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full lg:max-h-[800px] flex flex-col"
                                >
                                    {/* Hero Image */}
                                    {/* Smaller image height */}
                                    <div className="relative h-40 lg:h-48 overflow-hidden flex-shrink-0 bg-gray-100">
                                        <motion.div
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <ImageWithFallback
                                                src={typeof selectedCollege.image === 'string' ? selectedCollege.image : selectedCollege.image.src}
                                                alt={selectedCollege.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </motion.div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />




                                        {/* Badge and Rating */}
                                        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                                            <motion.span
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className={`${selectedCollege.badge.color} text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm text-xs font-medium`}
                                            >
                                                {selectedCollege.badge.text}
                                            </motion.span>
                                            <motion.div
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                                            >
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-gray-900 text-xs font-medium">{selectedCollege.rating}</span>
                                                <span className="text-gray-500 text-xs">({selectedCollege.reviews})</span>
                                            </motion.div>
                                        </div>

                                        {/* College Name and Location */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <motion.h3
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-white mb-2 text-lg font-semibold"
                                            >
                                                {selectedCollege.name}
                                            </motion.h3>
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="flex items-center gap-2 text-white/90 text-xs"
                                            >
                                                <MapPin className="w-3 h-3" />
                                                <span>{selectedCollege.location}</span>
                                                <span className="mx-2">•</span>
                                                <Building className="w-3 h-3" />
                                                <span>Est. {selectedCollege.established}</span>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 overflow-y-auto flex-1">
                                        {/* Description */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="mb-6"
                                        >
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {selectedCollege.description}
                                            </p>
                                        </motion.div>

                                        {/* Stats Grid */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="grid grid-cols-2 gap-3 mb-6"
                                        >
                                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2.5 border border-blue-200">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <TrendingUp className="w-3 h-3 text-blue-600" />
                                                    <span className="text-blue-600 text-xs">{selectedCollege.fees.label}</span>
                                                </div>
                                                <div className="text-blue-900 text-sm font-semibold">{selectedCollege.fees.amount}</div>
                                            </div>

                                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-2.5 border border-green-200">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <Award className="w-3 h-3 text-green-600" />
                                                    <span className="text-green-600 text-xs">{selectedCollege.package.label}</span>
                                                </div>
                                                <div className="text-green-900 text-sm font-semibold">{selectedCollege.package.amount}</div>
                                            </div>
                                        </motion.div>


                                        {/* Courses */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                            className="mb-6"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <BookOpen className="w-3 h-3 text-gray-700" />
                                                <h4 className="text-gray-900 text-xs font-semibold">Available Courses</h4>
                                            </div>
                                            {/* Desktop: flex-wrap grid, Mobile: carousel */}
                                            <div className="hidden sm:flex flex-wrap gap-2">
                                                {selectedCollege.courses.map((course, index) => (
                                                    <motion.span
                                                        key={index}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.7 + index * 0.05 }}
                                                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 text-xs"
                                                    >
                                                        {course}
                                                    </motion.span>
                                                ))}
                                            </div>
                                            {/* Mobile: Carousel with peek effect */}
                                            <div className="sm:hidden">
                                                <Carousel
                                                    opts={{
                                                        align: "start",
                                                        loop: false,
                                                    }}
                                                    className="w-full"
                                                >
                                                    <CarouselContent className="-ml-2">
                                                        {selectedCollege.courses.map((course, index) => (
                                                            <CarouselItem key={index} className="pl-2 basis-auto">
                                                                <motion.span
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ delay: 0.7 + index * 0.05 }}
                                                                    className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 text-xs whitespace-nowrap"
                                                                >
                                                                    {course}
                                                                </motion.span>
                                                            </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                </Carousel>
                                            </div>
                                        </motion.div>

                                        {/* Highlights */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                            className="mb-8"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <CheckCircle className="w-3 h-3 text-gray-700" />
                                                <h4 className="text-gray-900 text-xs font-semibold">Key Highlights</h4>
                                            </div>
                                            <div className="space-y-2">
                                                {selectedCollege.highlights.map((highlight, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.8 + index * 0.1 }}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <CheckCircle className="w-3 h-3 text-[#00C896] mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-600 text-xs">{highlight}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        {/* CTA Buttons */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 }}
                                            className="flex gap-3"
                                        >
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleViewDetails(selectedCollege)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:shadow-xl transition-shadow duration-300"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span className="text-xs font-medium">View Full Details</span>
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleApplyNow(selectedCollege)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-[#00C896] hover:text-[#00C896] transition-all duration-300"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                <span className="text-xs font-medium">Apply Now</span>
                                            </motion.button>
                                        </motion.div>


                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </ScrollAnimation>

                        {/* Right Side - College List */}
                        <ScrollAnimation
                            delay={0.4}
                            className="flex flex-col h-full lg:max-h-[900px] max-w-lg w-full"
                        >
                            {colleges.length > 5 ? (
                                // Carousel for more than 5 colleges
                                <Carousel
                                    opts={{
                                        align: "start",
                                        loop: true,
                                    }}
                                    orientation="vertical"
                                    className="w-full flex-1"
                                >
                                    <CarouselContent className="h-[600px] -mt-4">
                                        {colleges.map((college, index) => (
                                            <CarouselItem key={college.id} className="pt-4">
                                                <motion.button
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                                    onClick={() => handleCollegeSelect(college)}
                                                    whileHover={{ scale: 1.03, y: -4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full text-left"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            scale: selectedCollege.id === college.id ? 1.02 : 1,
                                                            boxShadow: selectedCollege.id === college.id
                                                                ? '0 20px 25px -5px rgba(0, 200, 150, 0.2), 0 10px 10px -5px rgba(0, 200, 150, 0.1)'
                                                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                        className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300"
                                                    >
                                                        <div className="flex gap-4 p-4">
                                                            {/* Thumbnail */}
                                                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                                <ImageWithFallback
                                                                    src={college.image}
                                                                    alt={college.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                {selectedCollege.id === college.id && (
                                                                    <motion.div
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        className="absolute inset-0 bg-[#00C896]/20 flex items-center justify-center"
                                                                    >
                                                                        <div className="w-8 h-8 rounded-full bg-[#00C896] flex items-center justify-center">
                                                                            <CheckCircle className="w-5 h-5 text-white" />
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </div>

                                                            {/* Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                                    <h6
                                                                        className={`truncate text-sm font-semiBold transition-colors duration-300 ${selectedCollege.id === college.id ? 'text-secondary' : 'text-gray-900'
                                                                            }`}
                                                                    >
                                                                        {college.name}
                                                                    </h6>

                                                                    <div className="flex items-center gap-1 flex-shrink-0">
                                                                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                                        <span className="text-gray-700">{college.rating}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-1.5 text-gray-500 mb-2">
                                                                    <MapPin className="w-3.5 h-3.5" />
                                                                    <span className="truncate">{college.location}</span>
                                                                </div>

                                                                <div className="flex items-center gap-3">
                                                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">
                                                                        {college.fees.amount}
                                                                    </span>
                                                                    <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md">
                                                                        {college.package.amount}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.button>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-1/2 -translate-x-1/2 -top-12" />
                                    <CarouselNext className="left-1/2 -translate-x-1/2 -bottom-12" />
                                </Carousel>
                            ) : (
                                // Scrollable list for 5 or fewer colleges
                                <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                                    {colleges.map((college, index) => (
                                        <motion.button
                                            key={college.id}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                            onClick={() => handleCollegeSelect(college)}
                                            whileHover={{ scale: 1.03, y: -4 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full text-left"
                                        >
                                            <motion.div
                                                animate={{
                                                    scale: selectedCollege.id === college.id ? 1.02 : 1,
                                                    boxShadow: selectedCollege.id === college.id
                                                        ? '0 20px 25px -5px rgba(0, 200, 150, 0.2), 0 10px 10px -5px rgba(0, 200, 150, 0.1)'
                                                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300"
                                            >
                                                <div className="flex gap-4 p-4">
                                                    {/* Thumbnail */}
                                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                        <ImageWithFallback
                                                            src={college.image}
                                                            alt={college.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {selectedCollege.id === college.id && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                className="absolute inset-0 bg-[#00C896]/20 flex items-center justify-center"
                                                            >
                                                                <div className="w-8 h-8 rounded-full bg-[#00C896] flex items-center justify-center">
                                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2 mb-1">
                                                            <h6
                                                                className={`truncate text-sm font-semiBold transition-colors duration-300 ${selectedCollege.id === college.id ? 'text-secondary' : 'text-gray-900'
                                                                    }`}
                                                            >
                                                                {college.name}
                                                            </h6>

                                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                                <span className="text-gray-700">{college.rating}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-1.5 text-gray-500 mb-2">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            <span className="truncate">{college.location}</span>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">
                                                                {college.fees.amount}
                                                            </span>
                                                            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md">
                                                                {college.package.amount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Numbered Pagination */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 }}
                                className="flex items-center justify-center gap-3 mt-6 mb-4"
                            >
                                {collegePages.map((_, pageIndex) => (
                                    <motion.button
                                        key={pageIndex}
                                        onClick={() => {
                                            setCurrentPage(pageIndex);
                                            setSelectedCollege(collegePages[pageIndex][0]);
                                            // Use setTimeout to ensure the DOM has updated
                                            setTimeout(() => {
                                                scrollToDetailedCard();
                                            }, 100);
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-300 ${currentPage === pageIndex
                                            ? 'bg-gradient-to-r from-secondary to-emerald-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:border-secondary hover:text-secondary'
                                            }`}
                                        aria-label={`View page ${pageIndex + 1}`}
                                    >
                                        {pageIndex + 1}
                                    </motion.button>
                                ))}
                            </motion.div>

                            {/* View All Link */}
                            {/* <motion.button
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className="w-full mt-2 px-5 py-2.5 bg-secondary/70 hover:bg-secondary text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0"
                        >
                            <GraduationCap className="w-4 h-4" />
                            <span className="text-sm font-medium">Explore All 40,000+ Colleges</span>
                        </motion.button> */}

                        </ScrollAnimation>
                    </div>
                ) : null}
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, 5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#00C896]/10 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, -5, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#3B82F6]/10 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-2xl"
                />
            </div>

        </section>
    );
}
