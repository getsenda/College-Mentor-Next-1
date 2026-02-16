import React, { useEffect, useState } from "react";
import { Users, Calendar, BookOpen, Target, CheckCircle2, Star, Award, Clock, Sparkles, ArrowRight, GraduationCap, Trophy, Heart, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useHomepageData } from '@/hooks/useHomepageData';
// Import scholarship images
import educationLoanImage from '../../public/assets/scholarship-education-loan.jpg';
import meritBasedImage from '../../public/assets/scholarship-merit-based.jpg';
import forGirlsImage from '../../public/assets/scholarship-for-girls.jpg';
import sportsTalentImage from '../../public/assets/scholarship-sports-talent.jpg';
import minoritiesImage from '../../public/assets/scholarship-minorities.jpg';
import internationalImage from '../../public/assets/scholarship-international.jpg';



const testimonialStats = [
    {
        percentage: "Education Loan",
        text: "of students using our platform agree",
        quote: "I feel I belong & picked the right career path.",
        avatar: "🎓",
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600"
    },
    {
        percentage: "Sports Scholarship",
        text: "of students agree",
        quote: "I was offered internship through mentoring.",
        avatar: "💼",
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600"
    },
    {
        percentage: "Merit Scholarship",
        text: "of alumni using our platform agree",
        quote: "I will give back to my alma mater.",
        avatar: "🎯",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        percentage: "Research Scholarship",
        text: "careers to discover",
        quote: "Discover how you match with more than 800 careers based on your personality, interests, experience and ambitions.",
        avatar: "🔍",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600"
    },
    {
        percentage: "Need-Based Scholarship",
        text: "accuracy in career matching",
        quote: "Our advanced algorithm analyzes your unique profile to provide highly accurate career recommendations.",
        avatar: "⚡",
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600"
    }
];




export default function MentoringProgramSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Auto-remove pop-out after 5 seconds if no other tap
    useEffect(() => {
        if (selectedImage === null) return;
        const timeoutId = setTimeout(() => {
            setSelectedImage(null);
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [selectedImage]);

    // Hardcoded fallback gallery images
    const defaultGalleryImages = [
        {
            image: educationLoanImage,
            title: "Education Loan",
            subtitle: "Financial Support",
            number: "1",
            icon: GraduationCap,
            description: "Comprehensive financial assistance for your educational journey with flexible repayment options.",
        },
        {
            image: meritBasedImage,
            title: "Merit Based",
            subtitle: "Academic Excellence",
            number: "2",
            icon: Award,
            description: "Recognizing outstanding academic achievements with substantial scholarship rewards.",
        },
        {
            image: forGirlsImage,
            title: "For Girls",
            subtitle: "Women Empowerment",
            number: "3",
            icon: Heart,
            description: "Empowering women through education with dedicated support and mentorship programs.",
        },
        {
            image: sportsTalentImage,
            title: "Sports Talent",
            subtitle: "Athletic Excellence",
            number: "4",
            icon: Trophy,
            description: "Supporting athletic talents with scholarships that balance sports and academic pursuits.",
        },
        {
            image: minoritiesImage || "https://images.unsplash.com/photo-1629019324504-2e1fdf96e5e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5vcml0aWVzJTIwaW5jbHVzaXZlJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1OTE2NjQzOXww&ixlib=rb-4.1.0&q=80&w=1080",
            title: "Minorities",
            subtitle: "Inclusive Education",
            number: "5",
            icon: Users,
            description: "Promoting diversity and inclusion through targeted scholarship programs for underrepresented communities.",
        },
        {
            image: internationalImage || "https://images.unsplash.com/photo-1588623731810-171b80f3c55e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwZ2xvYmFsJTIwb3Bwb3J0dW5pdGllc3xlbnwxfHx8fDE3NTkxNjY0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
            title: "International",
            subtitle: "Global Opportunities",
            number: "6",
            icon: Globe,
            description: "Opening doors to international education with comprehensive support for studying abroad.",
        },
    ];

    // Map API programs to galleryImages format with icons
    const programIconMap: Record<string, any> = {
        "Education Loan": GraduationCap,
        "Merit Based": Award,
        "For Girls": Heart,
        "Sports Talent": Trophy,
        "Minorities": Users,
        "International": Globe,
    };

    const programImageMap: Record<string, any> = {
        "Education Loan": educationLoanImage,
        "Merit Based": meritBasedImage,
        "For Girls": forGirlsImage,
        "Sports Talent": sportsTalentImage,
        "Minorities": minoritiesImage,
        "International": internationalImage,
    };

    const { data } = useHomepageData();
    const scholarshipsData = data?.scholarships;

    // Use API programs only if they exist, otherwise use hardcoded
    const galleryImages = scholarshipsData?.programs && scholarshipsData.programs.length > 0
        ? scholarshipsData.programs.map((program, index) => ({
            image: program.imageUrl || programImageMap[program.title] || defaultGalleryImages[index]?.image,
            title: program.title,
            subtitle: defaultGalleryImages[index]?.subtitle || program.title, // Use default subtitle if available, otherwise use title
            number: `${index + 1}`,
            icon: programIconMap[program.title] || GraduationCap,
            description: program.description,
        }))
        : defaultGalleryImages;

    // Auto-select icons after 2 seconds, cycling through all items
    useEffect(() => {
        if (galleryImages.length === 0) return;

        let intervalId: NodeJS.Timeout | null = null;

        const initialDelay = setTimeout(() => {
            let currentIndex = 0;
            setSelectedImage(currentIndex); // Select first item immediately after 2 seconds
            currentIndex = 1;

            intervalId = setInterval(() => {
                setSelectedImage(currentIndex);
                currentIndex = (currentIndex + 1) % galleryImages.length;
            }, 3000); // Change selection every 3 seconds
        }, 2000); // Start after 2 seconds

        return () => {
            clearTimeout(initialDelay);
            if (intervalId) clearInterval(intervalId);
        };
    }, [galleryImages.length]);

    // Use API heading/subHeading only if they exist, otherwise use hardcoded
    const heading = scholarshipsData?.heading || "Your One-Stop Solution for Scholarships & Loans";
    const subHeading = scholarshipsData?.subHeading || "Discover scholarship opportunities tailored to your unique journey. From academic excellence to athletic achievements, we support diverse paths to educational success.";

    // Helper function to render heading with gradient
    const renderHeadingWithGradient = (text: string) => {
        const parts = text.split(/(Scholarships|Loans)/i);
        return parts.map((part, index) => {
            if (/^(scholarships|loans)$/i.test(part)) {
                return (
                    <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const selectedItem = selectedImage !== null ? galleryImages[selectedImage] : null;

    return (
        <TooltipProvider>
            {/* <section className="relative bg-white overflow-hidden py-16 sm:py-20 lg:py-24"> */}
            <section className="relative bg-white overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4 sm:pb-4 md:pb-4">
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

                <div className="relative z-10">
                    <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center mb-16"
                        >
                            <div className="text-center">


                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-8">
                                    <Sparkles size={12} className="text-primary animate-pulse" />
                                    <span id="scholarship-programs" className="text-primary font-medium text-xs">Scholarship Programs</span>
                                </div>

                                {heading && (
                                    <h2
                                        id="mentoring-program-title"
                                        className="text-xl md:text-2xl lg:text-3xl leading-tight mb-2"
                                    >
                                        {renderHeadingWithGradient(heading)}
                                    </h2>
                                )}
                                {subHeading && (
                                    <p className="text-body-large max-w-2xl mx-auto mb-24">
                                        {subHeading}
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Mobile View - Vertical Cards */}
                        <div className="md:hidden space-y-6 mb-12">
                            {galleryImages.map((item, index) => (
                                <motion.div
                                    key={`mobile-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                        <div className="relative h-56">
                                            <img
                                                src={typeof item.image === "string" ? item.image : item.image.src}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                            {/* Icon */}
                                            <div className="absolute top-4 left-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md">
                                                    <item.icon className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            {/* Number Badge */}
                                            <div className="absolute top-4 right-4">
                                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold shadow-lg">
                                                    {index + 1}
                                                </div>
                                            </div>

                                            {/* Title Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/30">
                                                    <h3 className="font-bold text-base text-white">{item.title}</h3>
                                                    <p className="text-sm text-white/90">{item.subtitle}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-6">
                                            <p className="text-gray-600 leading-relaxed mb-4">
                                                {item.description}
                                            </p>
                                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                                Learn More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop View - Stacked Gallery */}
                        <div className={`hidden md:block relative transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} order-1 lg:order-2`}>
                            {/* Gallery Container */}
                            <div className="relative h-[500px] flex items-center justify-between gap-4">

                                {/* Stacked Card Container - Left Side */}
                                {/* <div className="relative w-[30%] h-full grid grid-cols-3 grid-rows-1 gap-12 md:gap-14 place-items-center pl-2 mt-10 md:mt-16" style={{ perspective: '1000px' }}> */}
                                <div
                                    className="relative w-[30%] h-full grid grid-cols-3 grid-rows-1 gap-6 md:gap-8 place-items-center pl-2 mt-4 md:mt-6 "
                                    style={{ perspective: "1000px" }}
                                >


                                    {/* First row (3 cards) */}
                                    {galleryImages.slice(0, 3).map((item, index) => {
                                        const isSelected = selectedImage === index;
                                        return (
                                            <div
                                                key={`row1-${index}`}
                                                className="transition-all duration-700 ease-out cursor-pointer group"
                                                style={{
                                                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                                                    zIndex: isSelected ? 30 : "auto",
                                                    transformStyle: "preserve-3d",
                                                }}
                                                onClick={() => setSelectedImage(index)}
                                            >
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className={`w-40 h-56 md:w-44 md:h-60 bg-white shadow-xl overflow-hidden transition-all duration-500 rounded-2xl border-2 ${isSelected ? "border-blue-500" : "border-gray-200"
                                                                }`}
                                                        >
                                                            <div className="relative h-full overflow-hidden">
                                                                <img
                                                                    src={typeof item.image === "string" ? item.image : item.image.src}
                                                                    alt={item.title}
                                                                    className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? "scale-105" : ""
                                                                        }`}
                                                                />

                                                                {/* Dark gradient overlay */}
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                                                {/* Top-left Icon */}
                                                                <div className="absolute top-3 left-3">
                                                                    <div className="w-9 h-9 rounded-lg bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md">
                                                                        <item.icon className="w-5 h-5 text-white" />
                                                                    </div>
                                                                </div>

                                                                {/* Glossy Title + Subtitle (bottom) */}
                                                                <div className="absolute bottom-3 left-3 right-3">
                                                                    <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-white/30">
                                                                        <h3 className="font-bold text-sm text-white">{item.title}</h3>
                                                                        <p className="text-[11px] text-white/90">{item.subtitle}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </TooltipTrigger>

                                                </Tooltip>
                                            </div>
                                        );
                                    })}

                                    {/* Second row (next 3 cards) with half-card horizontal offset */}
                                    <div
                                        className="col-span-3 grid grid-cols-3 gap-6 md:gap-8 mt-5 md:mt-12"
                                        style={{ transform: "translateX(80px)" }}
                                    >
                                        {galleryImages.slice(3, 6).map((item, idx) => {
                                            const index = idx + 3;
                                            const isSelected = selectedImage === index;
                                            return (
                                                <div
                                                    key={`row2-${index}`}
                                                    className="transition-all duration-700 ease-out cursor-pointer group"
                                                    style={{
                                                        transform: isSelected ? "scale(1.15)" : "scale(1)",
                                                        zIndex: isSelected ? 30 : "auto",
                                                        transformStyle: "preserve-3d",
                                                    }}
                                                    onClick={() => setSelectedImage(index)}
                                                >
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div
                                                                className={`w-40 h-56 md:w-44 md:h-60 bg-white shadow-xl overflow-hidden transition-all duration-500 rounded-2xl border-2 ${isSelected ? "border-blue-500" : "border-gray-200"
                                                                    }`}
                                                            >
                                                                <div className="relative h-full overflow-hidden">
                                                                    <img
                                                                        src={typeof item.image === "string" ? item.image : item.image.src}
                                                                        alt={item.title}
                                                                        className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? "scale-105" : ""
                                                                            }`}
                                                                    />

                                                                    {/* Dark gradient overlay */}
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                                                    {/* Top-left Icon */}
                                                                    <div className="absolute top-3 left-3">
                                                                        <div className="w-9 h-9 rounded-lg bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md">
                                                                            <item.icon className="w-5 h-5 text-white" />
                                                                        </div>
                                                                    </div>

                                                                    {/* Glossy Title + Subtitle (bottom) */}
                                                                    <div className="absolute bottom-3 left-3 right-3">
                                                                        <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg border border-white/30">
                                                                            <h3 className="font-bold text-sm text-white">{item.title}</h3>
                                                                            <p className="text-[11px] text-white/90">{item.subtitle}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </TooltipTrigger>
                                                        {/* <TooltipContent>
                                                            <p className="font-medium">
                                                                {item.title} - {item.subtitle}
                                                            </p>
                                                        </TooltipContent> */}
                                                    </Tooltip>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>


                                {/* Content Panel with Navigation */}
                                <div className="relative w-[45%] h-full flex-col justify-center pr-2">

                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                        className="relative space-y-8"
                                    >
                                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                                            <CardContent className="p-8">
                                                {selectedItem ? (
                                                    <>
                                                        <div className="flex items-center gap-4 mb-6">
                                                            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                                                                <selectedItem.icon className="h-6 w-6 text-white" />
                                                            </div>
                                                            <div>
                                                                <h2 className="text-xl font-bold text-gray-900">
                                                                    {selectedItem.title}
                                                                </h2>
                                                                {selectedItem.subtitle && selectedItem.subtitle !== selectedItem.title && (
                                                                    <p className="text-secondary font-semibold">
                                                                        {selectedItem.subtitle}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <p className="text-gray-600 leading-relaxed mb-8">
                                                            {selectedItem.description}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <div className="text-center mb-8">
                                                        <div
                                                            id="scholarship-path-green-icon"
                                                            className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-4"
                                                        >
                                                            <Sparkles className="h-6 w-6 text-white" />
                                                        </div>
                                                        <h2
                                                            id="scholarship-path-text"
                                                            className="text-xl font-bold text-gray-900 mb-2"
                                                        >
                                                            Choose Your Scholarship Path
                                                        </h2>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            Select a number below to explore different scholarship opportunities and find the perfect match for your educational journey.
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Numbered Navigation */}
                                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">

                                                    <div className="flex justify-center gap-3 flex-wrap">
                                                        {galleryImages.map((item, index) => {
                                                            const IconComponent = item.icon;
                                                            return (
                                                                <motion.button
                                                                    key={index}
                                                                    onClick={() => setSelectedImage(index)}

                                                                    className={`
                                         w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
                                         backdrop-blur-md border-2 transition-all duration-500 hover:scale-110
                                         ${selectedImage === index
                                                                            ? 'bg-[#00C798] border-[#00C798] text-white shadow-xl scale-110'
                                                                            : 'bg-white/70 border-gray-200 text-gray-700 hover:bg-white hover:border-blue-300 shadow-md'
                                                                        }
                                       `}
                                                                    whileHover={{
                                                                        scale: 1.1,
                                                                        boxShadow: selectedImage === index
                                                                            ? "0 20px 40px rgba(0, 199, 152, 0.4)"
                                                                            : "0 10px 20px rgba(0, 0, 0, 0.1)"
                                                                    }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    animate={{
                                                                        scale: selectedImage === index ? 1.1 : 1,
                                                                        boxShadow: selectedImage === index
                                                                            ? "0 25px 50px rgba(0, 199, 152, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                                                                            : "0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                                                    }}
                                                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                                                >
                                                                    <motion.div
                                                                        animate={{
                                                                            scale: selectedImage === index ? [1, 1.2, 1] : 1,
                                                                            rotate: selectedImage === index ? [0, 5, -5, 0] : 0,
                                                                        }}
                                                                        transition={{
                                                                            duration: 1.5,
                                                                            repeat: selectedImage === index ? Infinity : 0,
                                                                            ease: "easeInOut",
                                                                        }}
                                                                    >
                                                                        <IconComponent className={`w-5 h-5 ${selectedImage === index ? 'text-white' : 'text-gray-700'}`} />
                                                                    </motion.div>
                                                                </motion.button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>



                                                {/* Quick Stats */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                                                        <div className="text-2xl font-bold text-blue-600">500+</div>
                                                        <div className="text-sm text-gray-600">Scholarships</div>
                                                    </div>
                                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                                                        <div className="text-2xl font-bold text-purple-600">$2M+</div>
                                                        <div className="text-sm text-gray-600">Awarded</div>
                                                    </div>
                                                    <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                                                        <div className="text-2xl font-bold text-green-600">95%</div>
                                                        <div className="text-sm text-gray-600">Success Rate</div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <Button className="bg-secondary hover:from-primary-700 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                                                        Learn More
                                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>




                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
                {/* Anchor for end of mentoring programme section to drive avatar path to the end */}
                <span id="mentoring-program-end" className="block h-0" />

            </section >
        </TooltipProvider>
    );
}