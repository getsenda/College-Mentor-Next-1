"use client"
import React, { useState, useEffect } from "react";
import { ChevronDown, Star, MapPin, ArrowRight, TrendingUp, Award, Users, Calendar, ExternalLink, ChevronUp, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { collegeService, CollegeRankingItem } from "@/services/collegeService";
import { logger } from "@/utils/logger";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Stream ID to name mapping
const streamIdToName: { [key: number]: string } = {
  1: "Engineering",
  2: "Medical",
  3: "Management",
  4: "Law",
  5: "Design",
  6: "Architecture",
};

// Ranking agency to API rankName mapping
// Backend now expects rankName in the body as the agency name itself
// e.g. { rankName: "NIRF" } or { rankName: "IIRF" }
const agencyToRankName: { [key: string]: string } = {
  "NIRF": "NIRF",
  "IIRF": "IIRF",
  "India Today": "India Today",
  "Outlook-ICARE": "Outlook-ICARE",
  "Times Higher Education": "Times Higher Education",
  "QS BRICK Ranking": "QS BRICK Ranking",
  "Internshala Annual College Ranking": "Internshala Annual College Ranking",
  "Times B School Rankings": "Times B School Rankings",
  // Legacy fallback
  "The Week": "NIRF",
  "Outlook": "NIRF",
};

// Interface for displayed college ranking
interface DisplayCollegeRanking {
  id: number;
  name: string;
  shortName?: string;
  location: string;
  rank: number;
  totalRanked?: number;
  stream: string;
  rating?: number;
  students?: string;
  established: string;
}

// Legacy rankings data (kept as fallback)
const rankingData = {
  "2025": {
    "NIRF": [
      {
        id: 1,
        name: "IIM Ahmedabad",
        shortName: "IIMA",
        location: "Ahmedabad, Gujarat",
        rank: 1,
        totalRanked: 150,
        stream: "Management",
        rating: 4.8,
        students: "1200+",
        established: "1961"
      },
      {
        id: 2,
        name: "IIM Bangalore",
        shortName: "IIMB",
        location: "Bangalore, Karnataka",
        rank: 2,
        totalRanked: 150,
        stream: "Management",
        rating: 4.7,
        students: "1100+",
        established: "1973"
      },
      {
        id: 3,
        name: "IIM Calcutta",
        shortName: "IIMC",
        location: "Kolkata, West Bengal",
        rank: 3,
        totalRanked: 150,
        stream: "Management",
        rating: 4.7,
        students: "1000+",
        established: "1961"
      },
      {
        id: 4,
        name: "IIT Madras",
        shortName: "IITM",
        location: "Chennai, Tamil Nadu",
        rank: 4,
        totalRanked: 150,
        stream: "Engineering",
        rating: 4.9,
        students: "8500+",
        established: "1959"
      },
      {
        id: 5,
        name: "IIT Delhi",
        shortName: "IITD",
        location: "New Delhi, Delhi",
        rank: 5,
        totalRanked: 150,
        stream: "Engineering",
        rating: 4.8,
        students: "8000+",
        established: "1961"
      },
      {
        id: 6,
        name: "AIIMS Delhi",
        shortName: "AIIMS",
        location: "New Delhi, Delhi",
        rank: 6,
        totalRanked: 150,
        stream: "Medical",
        rating: 4.9,
        students: "5000+",
        established: "1956"
      },
      {
        id: 7,
        name: "IIT Bombay",
        shortName: "IITB",
        location: "Mumbai, Maharashtra",
        rank: 7,
        totalRanked: 150,
        stream: "Engineering",
        rating: 4.8,
        students: "9000+",
        established: "1958"
      },
      {
        id: 8,
        name: "NLSIU Bangalore",
        shortName: "NLSIU",
        location: "Bangalore, Karnataka",
        rank: 8,
        totalRanked: 150,
        stream: "Law",
        rating: 4.6,
        students: "600+",
        established: "1987"
      },
      {
        id: 9,
        name: "IIT Kharagpur",
        shortName: "IITKGP",
        location: "Kharagpur, West Bengal",
        rank: 9,
        totalRanked: 150,
        stream: "Engineering",
        rating: 4.7,
        students: "10000+",
        established: "1951"
      },
      {
        id: 10,
        name: "IIT Kanpur",
        shortName: "IITK",
        location: "Kanpur, Uttar Pradesh",
        rank: 10,
        totalRanked: 150,
        stream: "Engineering",
        rating: 4.7,
        students: "7500+",
        established: "1959"
      },
      {
        id: 11,
        name: "XLRI Jamshedpur",
        shortName: "XLRI",
        location: "Jamshedpur, Jharkhand",
        rank: 11,
        totalRanked: 150,
        stream: "Management",
        rating: 4.6,
        students: "900+",
        established: "1949"
      },
      {
        id: 12,
        name: "NIT Trichy",
        shortName: "NITT",
        location: "Trichy, Tamil Nadu",
        rank: 12,
        totalRanked: 150,
        stream: "Engineering",
        rating: 4.5,
        students: "8000+",
        established: "1964"
      }
    ],
    "India Today": [
      {
        id: 1,
        name: "IIT Bombay",
        shortName: "IITB",
        location: "Mumbai, Maharashtra",
        rank: 1,
        totalRanked: 200,
        stream: "Engineering",
        rating: 4.9,
        students: "9000+",
        established: "1958"
      },
      {
        id: 2,
        name: "IIT Delhi",
        shortName: "IITD",
        location: "New Delhi, Delhi",
        rank: 2,
        totalRanked: 200,
        stream: "Engineering",
        rating: 4.8,
        students: "8000+",
        established: "1961"
      },
      {
        id: 3,
        name: "IIT Madras",
        shortName: "IITM",
        location: "Chennai, Tamil Nadu",
        rank: 3,
        totalRanked: 200,
        stream: "Engineering",
        rating: 4.9,
        students: "8500+",
        established: "1959"
      },
      {
        id: 4,
        name: "IIT Kharagpur",
        shortName: "IITKGP",
        location: "Kharagpur, West Bengal",
        rank: 4,
        totalRanked: 200,
        stream: "Engineering",
        rating: 4.7,
        students: "10000+",
        established: "1951"
      }
    ],
    "The Week": [
      {
        id: 1,
        name: "IIM Ahmedabad",
        shortName: "IIMA",
        location: "Ahmedabad, Gujarat",
        rank: 1,
        totalRanked: 100,
        stream: "Management",
        rating: 4.8,
        students: "1200+",
        established: "1961"
      },
      {
        id: 2,
        name: "IIM Bangalore",
        shortName: "IIMB",
        location: "Bangalore, Karnataka",
        rank: 2,
        totalRanked: 100,
        stream: "Management",
        rating: 4.7,
        students: "1100+",
        established: "1973"
      },
      {
        id: 3,
        name: "IIM Calcutta",
        shortName: "IIMC",
        location: "Kolkata, West Bengal",
        rank: 3,
        totalRanked: 100,
        stream: "Management",
        rating: 4.7,
        students: "1000+",
        established: "1961"
      }
    ],
    "Outlook": [
      {
        id: 1,
        name: "NLSIU Bangalore",
        shortName: "NLSIU",
        location: "Bangalore, Karnataka",
        rank: 1,
        totalRanked: 80,
        stream: "Law",
        rating: 4.6,
        students: "600+",
        established: "1987"
      },
      {
        id: 2,
        name: "NALSAR Hyderabad",
        shortName: "NALSAR",
        location: "Hyderabad, Telangana",
        rank: 2,
        totalRanked: 80,
        stream: "Law",
        rating: 4.5,
        students: "550+",
        established: "1998"
      },
      {
        id: 3,
        name: "NLU Delhi",
        shortName: "NLU",
        location: "New Delhi, Delhi",
        rank: 3,
        totalRanked: 80,
        stream: "Law",
        rating: 4.5,
        students: "500+",
        established: "2008"
      }
    ]
  },
  "2024": {
    "NIRF": [
      {
        id: 1,
        name: "IIM Ahmedabad",
        shortName: "IIMA",
        location: "Ahmedabad, Gujarat",
        rank: 1,
        totalRanked: 150,
        stream: "Management",
        rating: 4.8,
        students: "1200+",
        established: "1961"
      },
      {
        id: 2,
        name: "IIM Bangalore",
        shortName: "IIMB",
        location: "Bangalore, Karnataka",
        rank: 2,
        totalRanked: 150,
        stream: "Management",
        rating: 4.7,
        students: "1100+",
        established: "1973"
      },
      {
        id: 3,
        name: "IIM Calcutta",
        shortName: "IIMC",
        location: "Kolkata, West Bengal",
        rank: 3,
        totalRanked: 150,
        stream: "Management",
        rating: 4.7,
        students: "1000+",
        established: "1961"
      }
    ]
  }
};

const years = ["2025", "2024", "2023", "2022", "2021"];
const rankingAgencies = [
  "NIRF",
  "IIRF",
  "India Today",
  "Outlook-ICARE",
  "Times Higher Education",
  "QS BRICK Ranking",
  "Internshala Annual College Ranking",
  "Times B School Rankings",
];

const streamConfig: { [key: string]: { text: string; gradient: string; } } = {
  "Management": {
    text: "text-[#00C798]",
    gradient: "from-emerald-500 to-teal-600"
  },
  "Engineering": {
    text: "text-blue-700",
    gradient: "from-blue-500 to-indigo-600"
  },
  "Medical": {
    text: "text-rose-700",
    gradient: "from-rose-500 to-pink-600"
  },
  "Law": {
    text: "text-purple-700",
    gradient: "from-purple-500 to-indigo-600"
  },
  "Architecture": {
    text: "text-orange-700",
    gradient: "from-orange-500 to-amber-600"
  }
};

const getMedalEmoji = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
};

export default function TopCollegeRankings() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedAgency, setSelectedAgency] = useState("NIRF");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [rankings, setRankings] = useState<DisplayCollegeRanking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transform API response to display format
  const transformCollegeData = (colleges: CollegeRankingItem[], rankName: string): DisplayCollegeRanking[] => {
    return colleges
      .map((college, index) => {
        // Rank is implied by the order from the API (1-based)
        const rank = index + 1;

        // Build location string from single location field
        const location = college.location || "N/A";

        // Stream / category from API
        const stream = college.category || "General";

        // Established year not present in latest response
        const established = "N/A";

        // Students from registeredStudents
        const students = college.registeredStudents
          ? `${college.registeredStudents}+`
          : undefined;

        return {
          id: college.id,
          name: college.collegeName,
          location,
          rank,
          stream,
          rating: college.rating || 4.5,
          students,
          established,
        } as DisplayCollegeRanking;
      })
      .filter((college): college is DisplayCollegeRanking => college !== null)
      .sort((a, b) => a.rank - b.rank); // Sort by rank ascending
  };

  // Fetch rankings from API
  useEffect(() => {
    const fetchRankings = async () => {
      // Check if this agency has API support (has a rankName mapping)
      const rankName = agencyToRankName[selectedAgency];

      if (!rankName) {
        // Fallback to hardcoded data for agencies without API support
        const fallbackRankings =
          rankingData[selectedYear as keyof typeof rankingData]?.[
          selectedAgency as keyof (typeof rankingData)[keyof typeof rankingData]
          ] || [];
        setRankings(fallbackRankings);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const year = parseInt(selectedYear);

        const colleges = await collegeService.getCollegesByRanking(rankName, year);
        const transformedRankings = transformCollegeData(colleges, rankName);
        setRankings(transformedRankings);
      } catch (err) {
        logger.error("Error fetching rankings:", err);
        setError("Failed to load rankings. Please try again.");
        setRankings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [selectedYear, selectedAgency]);

  // ✅ Show first 5 items unless "Show All" is active
  const displayedRankings = showAll ? rankings : rankings.slice(0, 5);

  // ✅ Consistent "show more" logic
  const hasMore = rankings.length > 5;

  return (
    <section className="relative py-8 overflow-hidden bg-[#f5f7f9]">

      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">
            <Sparkles size={12} className="text-primary animate-pulse" />
            <span className="text-primary font-medium text-xs">Official Rankings</span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-3">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Top College{" "}
            </span>
            Rankings
          </h2>



          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover India's leading institutions ranked by trusted agencies
          </p>
        </div>

        {/* Controls */}
        <div className="mb-10 flex flex-col items-center gap-4">
          {/* Year Selector */}
          <div className="relative">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 transition-all shadow-md hover:shadow-lg min-w-[140px]"
            >
              <span className="text-sm text-gray-900">Year: {selectedYear}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showYearDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setShowYearDropdown(false);
                      setShowAll(false);
                    }}
                    className={`w-full px-6 py-2.5 text-sm text-left hover:bg-blue-50 transition-colors ${selectedYear === year ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ranking Agencies - Desktop */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3 w-full px-4 sm:px-0">
            {rankingAgencies.map((agency) => (
              <button
                key={agency}
                onClick={() => {
                  setSelectedAgency(agency);
                  setShowAll(false);
                }}
                className={`px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${selectedAgency === agency
                  ? 'bg-secondary text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:shadow-md'
                  }`}
              >
                {agency}
              </button>
            ))}
          </div>

          {/* Ranking Agencies - Mobile Carousel */}
          <div className="sm:hidden w-full">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {rankingAgencies.map((agency) => (
                  <CarouselItem key={agency} className="pl-2 basis-auto">
                    <button
                      onClick={() => {
                        setSelectedAgency(agency);
                        setShowAll(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl transition-all text-xs whitespace-nowrap ${selectedAgency === agency
                        ? 'bg-secondary text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                    >
                      {agency}
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* Rankings List */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h4 className="text-xl text-gray-900 mb-2">Loading Rankings...</h4>
            <p className="text-gray-500">Please wait while we fetch the latest rankings</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-red-400" />
            </div>
            <h4 className="text-xl text-gray-900 mb-2">Error Loading Rankings</h4>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : rankings.length > 0 ? (
          <div className="relative">
            <div className="space-y-3 mb-6">
              {displayedRankings.map((college) => {
                const config = streamConfig[college.stream] || streamConfig["Engineering"];

                return (
                  <div
                    key={college.id}
                    className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden max-w-5xl mx-auto"
                  >
                    <div className="p-4 md:p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Left: Rank Badge & College Info */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {/* Rank Badge */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-[#3B82F6] flex flex-col items-center justify-center shadow-md`}>
                            <span className="text-lg text-white">{college.rank}</span>
                          </div>

                          {/* College Details */}
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <h3 className="text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-w-0 mb-1">
                              {college.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                              <span className="truncate min-w-0">{college.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Stats & Actions */}
                        <div className="flex items-center justify-between lg:justify-end gap-2 lg:gap-4 flex-shrink-0 overflow-visible">
                          {/* Stats - Responsive min-width */}
                          <div className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0 justify-start min-w-0 sm:min-w-[180px] lg:min-w-[240px]">
                            {/* Stream Badge - Start-aligned for consistent positioning */}
                            <Badge className={`bg-gray-50 ${config.text} hover:text-white border-0 px-2 lg:px-3 py-1 rounded-lg text-xs whitespace-nowrap flex-shrink-0`}>
                              {college.stream}
                            </Badge>

                            {/* Rating */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                              <span className="text-sm text-gray-900 whitespace-nowrap">{college.rating}</span>
                            </div>

                            {/* Students - Desktop Only */}
                            {college.students && (
                              <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-600 whitespace-nowrap">
                                <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span>{college.students}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              className="bg-[#3B82F6] hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md text-xs px-2 sm:px-3 lg:px-4 py-2 whitespace-nowrap flex-shrink-0"
                              onClick={() => router.push(`/college-details?id=${college.id}`)}
                            >
                              Details
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-xs px-2 sm:px-2.5 lg:px-3 py-2 flex-shrink-0 group"
                              onClick={() => {
                                // You can add website URL handling here if available in API
                                window.open(`/college-details?id=${college.id}`, '_blank');
                              }}
                            >
                              <ExternalLink className="w-3.5 h-3.5 group-hover:text-black" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More Link - Bottom Right Corner */}
            {hasMore && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 group transition-colors"
                >
                  {showAll ? (
                    <>
                      Show less
                      <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  ) : (
                    <>
                      View {rankings.length - 5} more rankings
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-xl text-gray-900 mb-2">No Rankings Available</h4>
            <p className="text-gray-500">Please select a different year or ranking agency</p>
          </div>
        )}
      </div>
    </section>
  );
}
