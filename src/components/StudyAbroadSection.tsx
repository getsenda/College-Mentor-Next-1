"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useHomepageData } from '@/hooks/useHomepageData';

import heroImage from "../../public/assets/website images/Homepage/study abroad/freepik__talk__5542.png";
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
  Bell,
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
  Space
} from "lucide-react";
import { useRouter } from 'next/navigation';
import InteractiveWorldMap from "@/components/InteractiveWorldMap";

const StudyAbroadSection = () => {
  const router = useRouter();
  const { data } = useHomepageData();

  const stats = [
    { number: "500+", label: "Expert Mentors", icon: Users, color: "text-[#00C798]" },
    { number: "10,000+", label: "Success Stories", icon: Star, color: "text-[#009c7a]" },
    { number: "1:1", label: "Personal Guidance", icon: UserCheck, color: "text-[#173CBA]" },
    { number: "24/7", label: "Support Available", icon: Clock, color: "text-[#00C798]" }
  ];
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredStudents, setHoveredStudents] = useState<number | null>(null);
  const [mapHoveredCountry, setMapHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; country: string } | null>(null);
  const countryStats: Record<
    string,
    { students: number; x: string; y: string; color: string; bubbleOffset?: string }
  > = {
    USA: { students: 1200, x: "20%", y: "45%", color: "#2563eb" },       // blue
    UK: { students: 850, x: "45%", y: "28%", color: "#9333ea", bubbleOffset: "left" },        // purple - offset left, moved up slightly
    Canada: { students: 760, x: "22%", y: "28%", color: "#f59e0b" },    // amber
    Australia: { students: 540, x: "82%", y: "78%", color: "#ef4444" }, // red
    Germany: { students: 430, x: "52%", y: "37%", color: "#22c55e", bubbleOffset: "right" },   // green - offset right, moved down and right
    Ireland: { students: 220, x: "43%", y: "30%", color: "#14b8a6", bubbleOffset: "top-right" },   // teal - offset top-right
    "New Zealand": { students: 180, x: "85%", y: "85%", color: "#e11d48" }, // pink
    Singapore: { students: 150, x: "72%", y: "70%", color: "#f97316" },
    India: { students: 2000, x: "68%", y: "55%", color: "#ff5722" },



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
  // Available countries in our list
  const availableCountries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand', 'Singapore', 'India'];

  const handleMapCountryHover = useCallback((countryName: string | null) => {
    setMapHoveredCountry(countryName);

    if (countryName) {
      // Check if country is in our available list with better matching
      const countryLower = countryName.toLowerCase();
      let matchedCountry = null;

      // Direct matches first
      const directMatch = availableCountries.find(country =>
        country.toLowerCase() === countryLower
      );

      if (directMatch) {
        matchedCountry = directMatch;
      } else {
        // Special case matching
        if (countryLower.includes('united states') || countryLower.includes('america')) {
          matchedCountry = 'USA';
        } else if (countryLower.includes('united kingdom') || countryLower.includes('britain')) {
          matchedCountry = 'UK';
        }
      }

      if (matchedCountry) {
        setHoveredCountry(matchedCountry);
        setHoveredStudents(countryStats[matchedCountry]?.students || 0);
        setTooltip(null);
      } else {
        // Only clear if we're not already showing this country
        if (hoveredCountry) {
          setHoveredCountry(null);
          setHoveredStudents(null);
        }
      }
    } else {
      setHoveredCountry(null);
      setHoveredStudents(null);
      setTooltip(null);
    }
  }, [hoveredCountry, countryStats]);
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



  return (
    <section className="relative bg-[#f5f9f7] overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-4">

      {/* Top Curve with Shadow */}
      <div className="absolute -top-1 left-0 right-0 overflow-hidden leading-[0] z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 drop-shadow-md"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,80 C480,200 960,0 1440,120 L1440,0 L0,0 Z"
          />
        </svg>
      </div>


      <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div id="global-education" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 mb-2 sm:mb-3">
            <Sparkles size={10} className="text-primary animate-pulse sm:w-3 sm:h-3" />
            <span className="text-primary font-medium text-xs">Global Education</span>
          </div>

          {data?.studyAbroad?.heading && (
            <h2
              id="study-abroad-title"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-2 sm:mb-3"
            >
              {(() => {
                const parts = data.studyAbroad.heading.split(/(Study Abroad|Gateway)/i);
                return parts.map((part, index) => {
                  if (/^(study abroad|gateway)$/i.test(part)) {
                    return (
                      <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {part}
                      </span>
                    );
                  }
                  return <span key={index}>{part}</span>;
                });
              })()}
            </h2>
          )}
          {data?.studyAbroad?.subHeading && (
            <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              {data.studyAbroad.subHeading}
            </p>
          )}
        </div>

        {/* Content + Image */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center mb-8 sm:mb-10 md:mb-12">
          {/* Content (wider, taller spacing) */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Your Gateway to International Education
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Embark on an exciting journey to study abroad and gain a world-class education. Our expert guidance helps you navigate the complex process of international admissions, visa applications, and cultural adaptation.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {["Expert Guidance", "Visa Support", "Application Help", "Cultural Prep"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image (larger height) */}
          <div className="relative">
            <img
              src={heroImage.src}
              alt="Study Abroad"
              className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-lg sm:rounded-xl shadow-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop&crop=center&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-xl"></div>
          </div>
        </div>

        {/* Interactive World Map + Flags */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Explore Study Abroad Opportunities
              </h3>
              <p className="text-sm text-gray-600">
                Hover over the country flags to see their location on the world map
              </p>
            </div>

            <div className="grid lg:grid-cols-10 gap-6 items-start">
              {/* World Map (larger) */}
              {/* <div className="relative lg:col-span-8 w-full h-[550px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <InteractiveWorldMap hoveredCountry={hoveredCountry} />

                {hoveredCountry && (
                  <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-lg shadow-md border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800">{hoveredCountry}</h4>
                    <p className="text-xs text-gray-600">
                      {hoveredStudents} students from here
                    </p>
                  </div>
                )}
              </div> */}
              <div
                id="study-abroad-map"
                className="relative lg:col-span-8 w-full h-[550px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                onMouseMove={(e) => {
                  if (mapHoveredCountry && !availableCountries.some(country =>
                    country.toLowerCase() === mapHoveredCountry.toLowerCase() ||
                    (country === 'USA' && (mapHoveredCountry.toLowerCase().includes('united states') || mapHoveredCountry.toLowerCase().includes('america'))) ||
                    (country === 'UK' && (mapHoveredCountry.toLowerCase().includes('united kingdom') || mapHoveredCountry.toLowerCase().includes('britain')))
                  )) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                      country: mapHoveredCountry
                    });
                  }
                }}
                onMouseLeave={() => {
                  setTooltip(null);
                }}
              >

                <InteractiveWorldMap
                  hoveredCountry={hoveredCountry}
                  onCountryHover={handleMapCountryHover}
                  tooltip={tooltip}
                />

                {hoveredCountry && countryStats[hoveredCountry] && (() => {
                  const stats = countryStats[hoveredCountry];
                  const bubbleOffset = stats.bubbleOffset || "center";

                  // Calculate transform based on offset direction
                  let transform = "translate(-50%, -100%)";
                  let flexDirection = "flex-col";
                  let bubbleMargin = "mt-1";

                  if (bubbleOffset === "left") {
                    transform = "translate(-100%, -50%)";
                    flexDirection = "flex-row-reverse";
                    bubbleMargin = "mr-2";
                  } else if (bubbleOffset === "right") {
                    transform = "translate(0%, -50%)";
                    flexDirection = "flex-row";
                    bubbleMargin = "ml-2";
                  } else if (bubbleOffset === "top") {
                    transform = "translate(-50%, -100%)";
                    flexDirection = "flex-col-reverse";
                    bubbleMargin = "mb-2";
                  } else if (bubbleOffset === "top-right") {
                    transform = "translate(-20%, -100%)";
                    flexDirection = "flex-col-reverse";
                    bubbleMargin = "mb-2";
                  }

                  return (
                    <div
                      className={`absolute flex ${flexDirection} items-center pointer-events-none`}
                      style={{
                        left: stats.x,
                        top: stats.y,
                        transform: transform,
                      }}
                    >
                      {/* 🎯 Colorful Pin */}
                      <MapPin
                        className="w-6 h-6 drop-shadow-md flex-shrink-0"
                        style={{
                          color: stats.color,
                          fill: stats.color,   // 👈 filled
                          stroke: "white",                            // 👈 border contrast
                          strokeWidth: 1.5
                        }}
                      />

                      {/* 📊 Student Count Bubble */}
                      <div className={`${bubbleMargin} bg-white px-2 py-1 rounded-md shadow text-xs font-medium text-gray-800 border border-gray-200 whitespace-nowrap`}>
                        {stats.students} students
                      </div>
                    </div>
                  );
                })()}
              </div>


              {/* Country list (3 per row on mobile, single column on desktop) */}
              <div className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4 lg:gap-6 justify-center items-start">

                {[
                  { name: "India", flag: "https://flagcdn.com/w40/in.png" },
                  { name: "USA", flag: "https://flagcdn.com/w40/us.png" },
                  { name: "UK", flag: "https://flagcdn.com/w40/gb.png" },
                  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
                  { name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
                  { name: "Germany", flag: "https://flagcdn.com/w40/de.png" },
                  { name: "Ireland", flag: "https://flagcdn.com/w40/ie.png" },
                  { name: "New Zealand", flag: "https://flagcdn.com/w40/nz.png" },
                  { name: "Singapore", flag: "https://flagcdn.com/w40/sg.png" },

                ].map((country, index) => (
                  <div key={index} className="overflow-hidden">
                    <div
                      className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 cursor-pointer transition-transform duration-300 transform-gpu hover:scale-105 flex-shrink-0"
                      onMouseEnter={() => {
                        setHoveredCountry(country.name);
                        setHoveredStudents(countryStats[country.name]?.students || 0);
                      }}
                      onMouseLeave={() => {
                        setHoveredCountry(null);
                        setHoveredStudents(null);
                      }}
                    >
                      <div
                        className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-2 cursor-pointer 
                          transition-all duration-200
                          ${hoveredCountry === country.name ? "bg-primary/10 rounded-lg px-2 py-1" : ""}`}
                        onMouseEnter={() => setHoveredCountry(country.name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className={`w-8 h-8 lg:w-8 lg:h-8 rounded-full shadow-sm 
                            ${hoveredCountry === country.name
                              ? "border-2 border-primary ring-2 ring-primary/40"
                              : "border border-gray-200"}`}
                        />
                        <h4
                          className={`font-medium text-xs lg:text-sm text-center lg:text-left
                            ${hoveredCountry === country.name ? "text-primary font-semibold" : "text-gray-800"}`}
                        >
                          {country.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Need Guidance Section */}
        <div className="mt-6 sm:mt-8 md:mt-10 relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-primary/10 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-primary rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-secondary rounded-full blur-2xl"></div>
          </div>

          <div
            id="study-abroad-guidance-container"
            className="text-center max-w-xl mx-auto relative z-10"
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              Need Guidance for Study Abroad?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
              Our expert counselors will help you choose the right country and university for your goals
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center overflow-hidden">
              <div className="overflow-hidden">
                <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 transform-gpu hover:scale-105 text-xs sm:text-sm">
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StudyAbroadSection;
