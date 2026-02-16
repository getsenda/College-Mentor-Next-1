"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryNavigation from "../header/PrimaryNavigation";
import { shareCollege, SharePlatform } from "@/services/shareService";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { userService } from "@/services/userService";
import { logger } from "@/utils/logger";
import {
  Heart,
  Download,
  GitCompare,
  MapPin,
  Calendar,
  Users,
  Award,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  Trophy,
  ArrowRight,
  Share2,
  MessageCircle,
  Linkedin,
  Facebook,
  Send,
  BookOpen,
  GraduationCapIcon,
  FileText,
  Briefcase,
  DollarSign,
  UserSquare2,
  PartyPopper,
  Building2,
  Star,
  Image,
  Home,
  Users2,
  TrendingDown,
  Newspaper,
  Contact,
  Eye,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Globe2,
  Handshake,
  PhoneCall,
  CreditCard,
  Plane,
  CheckCircle2,
  HelpCircle,
  ClipboardList,
  FileCheck,
  BookMarked,
  School,
  GraduationCapIcon as GradCap,
  Briefcase as BriefcaseIcon,
  ScrollText,
  FilePlus,
  Monitor,
  Laptop,
  CheckCircle,
  DollarSignIcon,
  Gift,
  Trophy as TrophyIcon,
  Users as UsersIcon,
  Scissors,
  Target,
  Lightbulb,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ImageWithFallback } from "../figma/FallBack";
import newsImage1 from "../../../public/assets/news-engineering-colleges.jpg";
import newsImage2 from "../../../public/assets/news-scholarships.jpg";
import newsImage3 from "../../../public/assets/indian-students-studying-group.jpg";
import amityLogo from "../../../public/assets/amity.png";
import galleryImage1 from "../../../public/assets/students-collaboration.jpg";
import galleryImage2 from "../../../public/assets/hero-students-graduation.jpg";
import galleryImage3 from "../../../public/assets/indian-college-students-questionnaire.jpg";
import galleryImage4 from "../../../public/assets/mentoring-session-professional.jpg";
import collegeCompare from "../../../public/assets/college-compare.jpg";
import glaUniversityCampus from "../../../public/assets/gla-university-campus.png";
import { CollegeDetail, collegeService } from "@/services/collegeService";
import HeroSection from "./CollegeDetails/CollegeDetailHeroSection";
import OverviewTab from "./CollegeDetails/CollegeDetailOverview";
import CutoffTab from "./CollegeDetails/CollegeDetailCuttoff";
import AdmissionsTab from "./CollegeDetails/CollegeDetailAdmission";
import CoursesTab from "./CollegeDetails/CollegeDetailCourses";
import OnlineCoursesTab from "./CollegeDetails/CollegeDetailOnlineCourses";
import ScholarshipsTab from "./CollegeDetails/CollegeDetailScholarship";
import RankingsTab from "./CollegeDetails/CollegedetailRanking";
import CampusLifeTab from "./CollegeDetails/CollegeDetailStudentLife";
import PlacementsTab from "./CollegeDetails/CollegeDetailPlacement";
import ResearchInnovationTab from "./CollegeDetails/CollegeDetailResearch";
import predictorTool from "../../../public/assets/predictor-tool.jpg";

export default function CollegeDetailsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview");

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showAllRecruiters, setShowAllRecruiters] = useState(false);
  const [showAllClubs, setShowAllClubs] = useState(false);
  const [showAllResearchCenters, setShowAllResearchCenters] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [isTabsExpanded, setIsTabsExpanded] = useState(false);
  const [collegeData, setCollegeData] = useState<CollegeDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Handle sticky tabs behavior - stick below navigation (approx 64px height)
  const NAV_HEIGHT = 64;
  const collegeId = searchParams?.get('id');
  // Overview sections refs
  const highlightsRef = useRef<HTMLDivElement>(null);
  const collaborationRef = useRef<HTMLDivElement>(null);

  // Fetch college data
  useEffect(() => {
    const fetchCollegeData = async () => {
      const collegeId = searchParams?.get('id');
      if (!collegeId) {
        setError('No college ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await collegeService.getCollegeDetail(parseInt(collegeId));
        setCollegeData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load college data');
        console.error('Error fetching college:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeData();
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const tabsElement = document.getElementById('college-tabs-container');
      if (tabsElement) {
        const rect = tabsElement.getBoundingClientRect();
        setIsTabsSticky(rect.top <= NAV_HEIGHT);
      }
    };

    const calculateTabsHeight = () => {
      const tabsElement = document.getElementById('college-tabs-container');
      if (tabsElement) {
        setTabsHeight(tabsElement.offsetHeight);
      }
    };

    // Calculate tabs height on mount and resize
    calculateTabsHeight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculateTabsHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateTabsHeight);
    };
  }, []);






  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      if (hash && activeTab === 'overview') {
        const section = document.getElementById(hash);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  // Check if college is bookmarked on page load
  // useEffect(() => {
  //   const checkBookmarkStatus = async () => {
  //     const collegeId = searchParams.get("id");
  //     const storedUser = localStorage.getItem("user");

  //     // Only check if we have collegeId and user is logged in
  //     if (!collegeId || !storedUser) {
  //       return;
  //     }

  //     try {
  //       const response = await userService.isCollegeBookmarked(parseInt(collegeId));

  //       // Check if college is bookmarked (response might be boolean or object with isBookmarked field)
  //       const bookmarked =
  //         response === true ||
  //         response?.isBookmarked === true ||
  //         response?.bookmarked === true ||
  //         (typeof response === 'object' && response?.data === true);

  //       setIsSaved(bookmarked);

  //       logger.log('🔹 Bookmark status checked:', {
  //         collegeId,
  //         bookmarked,
  //         response
  //       });
  //     } catch (error: any) {
  //       // Check if it's a 500 error (likely means user is not logged in)
  //       const statusCode = error.statusCode || error.response?.status;
  //       if (statusCode === 500) {
  //         // User is likely not logged in, show login required toast
  //         const accessToken = localStorage.getItem("accessToken");
  //         if (!accessToken) {
  //           toast.error("Login Required");
  //         } else {
  //           // Token exists but server error - assume not bookmarked
  //           logger.log('🔹 Bookmark status check failed (assuming not bookmarked):', error);
  //         }
  //       } else {
  //         // For other errors (e.g., 404), just assume not bookmarked silently
  //         logger.log('🔹 Bookmark status check failed (assuming not bookmarked):', error);
  //       }
  //       setIsSaved(false);
  //     }
  //   };

  //   checkBookmarkStatus();
  // }, [searchParams]);

  const toggleReadMore = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };





  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PrimaryNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading college details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !collegeData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PrimaryNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error || 'College not found'}</p>
            <Button onClick={() => router.push('/colleges/list')} className="mt-4">
              Back to Colleges
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-gray-50 pt-20">
      {/* <PrimaryNavigation /> */}
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

      {/* Combined Hero and Content Section */}
      <div className="relative">
        {/* Hero Section - Two Column Layout */}
        <HeroSection collegeData={collegeData} />
      </div>
      {/* Main Content with Tabs */}
      <div id="college-tabs-container" className="relative"></div>
      <div className={`${isTabsSticky ? 'fixed top-[72px] left-0 right-0' : 'relative'} z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border/50 shadow-sm transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            {(() => {
              const allTabs = [
                { value: 'overview', label: 'Overview', icon: BookOpen },
                { value: 'courses', label: 'Courses & Fees', icon: GraduationCapIcon },
                { value: 'admissions', label: 'Admission & Eligibility', icon: FileCheck },
                { value: 'placements', label: 'Cutoff', icon: Scissors },
                { value: 'fees', label: 'College Predictor', icon: Target },
                { value: 'faculty', label: 'College Compare', icon: GitCompare },
                { value: 'campus', label: 'Online Courses', icon: Monitor },
                { value: 'facilities', label: 'Scholarships', icon: Gift },
                { value: 'reviews', label: 'Ranking & Accreditation', icon: Trophy },
                { value: 'gallery', label: 'Placements Section', icon: Briefcase },
                { value: 'hostel', label: 'Student/Campus Life', icon: Users },
                { value: 'dept', label: 'Departments', icon: Building2 },
                { value: 'alumni', label: 'Research & Innovation', icon: Lightbulb },
                { value: 'cutoff', label: 'Campus Facilities', icon: Home },
              ];

              const visibleCount = 6;
              const visibleTabs = allTabs.slice(0, visibleCount);
              const hiddenTabs = allTabs.slice(visibleCount);
              const hasHiddenTabs = hiddenTabs.length > 0;

              return (
                <div className="space-y-3">
                  {/* Mobile: Carousel for tabs */}
                  <div className="sm:hidden">
                    <Carousel
                      opts={{
                        align: 'start',
                        dragFree: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-2">
                        {allTabs.map((tab) => (
                          <CarouselItem key={tab.value} className="pl-2 basis-auto">
                            <motion.button
                              onClick={() => {
                                setActiveTab(tab.value);
                                // navigate(`/college-details?tab=${tab.value}`);
                              }}
                              className={`px-3 py-2 rounded-full transition-all duration-300 text-xs whitespace-nowrap ${activeTab === tab.value
                                ? 'bg-[#00C798] text-white shadow-md'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="flex items-center gap-1.5">
                                <tab.icon className="w-3.5 h-3.5" />
                                <span>{tab.label}</span>
                              </div>
                            </motion.button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>

                  {/* Desktop: Original flex layout */}
                  <div className="hidden sm:block">
                    {/* First Row - Visible tabs + expand button */}
                    <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
                      {visibleTabs.map((tab) => (
                        <motion.button
                          key={tab.value}
                          onClick={() => {
                            setActiveTab(tab.value);
                            // navigate(`/college-details?tab=${tab.value}`);
                          }}
                          className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-xs sm:text-sm ${activeTab === tab.value
                            ? 'bg-[#00C798] text-white shadow-md'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                            <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>{tab.label}</span>
                          </div>
                        </motion.button>
                      ))}

                      {/* Chevron Button - Always at end of first row */}
                      {hasHiddenTabs && (
                        <motion.button
                          onClick={() => setIsTabsExpanded(!isTabsExpanded)}
                          className="min-w-[40px] px-3 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title={isTabsExpanded ? "Show less" : `Show ${hiddenTabs.length} more`}
                        >
                          <div className="flex items-center gap-1">
                            {isTabsExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <>
                                <span className="text-xs">+{hiddenTabs.length}</span>
                                <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </div>
                        </motion.button>
                      )}
                    </div>

                    {/* Additional Rows - Hidden tabs (shown when expanded) */}
                    <AnimatePresence>
                      {isTabsExpanded && hasHiddenTabs && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-3"
                        >
                          <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
                            {hiddenTabs.map((tab) => (
                              <motion.button
                                key={tab.value}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => {
                                  setActiveTab(tab.value);
                                  // navigate(`/college-details?tab=${tab.value}`);
                                }}
                                className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-xs sm:text-sm ${activeTab === tab.value
                                  ? 'bg-[#00C798] text-white shadow-md'
                                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                  }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                                  <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                  <span>{tab.label}</span>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump when tabs become sticky */}
      {isTabsSticky && <div className="h-20 sm:h-24"></div>}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            const params = new URLSearchParams(searchParams?.toString());
            params.set('tab', value);
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className="w-full"
        >

          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ paddingTop: isTabsSticky ? `${tabsHeight + 32}px` : '0px' }}
          >
            {/* Main Content Area - Shows first on mobile, first on desktop */}
            <motion.div
              className="lg:col-span-2 order-1 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Tab Content Container */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tab Content */}
                <div className="p-4 sm:p-6">

                  <TabsContent value="overview" className="mt-0">
                    <OverviewTab
                      collegeData={collegeData}
                      scrollToSection={scrollToSection}
                      highlightsRef={highlightsRef}
                      collaborationRef={collaborationRef}
                    />
                  </TabsContent>
                  <TabsContent value="courses" className="mt-0">
                    <CoursesTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>

                  <TabsContent value="admissions" className="mt-0">
                    <AdmissionsTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>

                  <TabsContent value="placements" className="mt-0">
                    <CutoffTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>

                  <TabsContent value="fees" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Hero Image */}
                      <motion.div
                        className="relative h-64 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <img src={predictorTool.src} alt="College Predictor Tool" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-6">
                            <motion.h2
                              className="text-2xl font-bold text-white mb-2"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              College Predictor Tool
                            </motion.h2>
                            <motion.p
                              className="text-white/90"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              Predict your admission chances with AI-powered analysis
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Table of Contents */}
                      {/* <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Table of Contents
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { id: 'about-predictor', title: 'About College Predictor' },
                            { id: 'how-to-use', title: 'How to Use Predictor' },
                            { id: 'predictor-tool', title: 'College Predictor Tool' },
                            { id: 'admission-chances', title: 'Admission Chances' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                              className="text-left px-4 py-2 rounded-md hover:bg-primary/10 transition-all duration-300 text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group hover:scale-[1.02]"
                            >
                              <span className="flex-1">{item.title}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </button>
                          ))}
                        </div>
                      </div> */}

                      {/* About College Predictor */}
                      {/* <div id="about-predictor" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">GLA University College Predictor</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          The GLA University College Predictor is an AI-powered tool that helps students predict their chances of admission to various programs at GLA University based on their entrance exam scores, academic performance, and preferences. This tool uses historical admission data and current trends to provide accurate predictions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-6 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-white">
                            <div className="text-3xl mb-2">98%</div>
                            <div className="text-sm text-white/80">Prediction Accuracy</div>
                          </div>
                          <div className="text-center p-6 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl text-white">
                            <div className="text-3xl mb-2">50K+</div>
                            <div className="text-sm text-white/80">Predictions Made</div>
                          </div>
                          <div className="text-center p-6 bg-gradient-to-br from-accent to-accent/80 rounded-xl text-white">
                            <div className="text-3xl mb-2">24/7</div>
                            <div className="text-sm text-white/80">Available</div>
                          </div>
                        </div>
                      </div> */}

                      {/* How to Use */}
                      {/* <div id="how-to-use" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">How to Use GLA College Predictor</h3>
                        </div>
                        <div className="space-y-3">
                          {[
                            "Enter your JEE Main percentile or GLAET score in the predictor tool",
                            "Select your preferred branch or program (B.Tech, M.Tech, MBA, etc.)",
                            "Provide your category (General, OBC, SC, ST) for accurate predictions",
                            "Review your predicted colleges and chances of admission",
                            "Download the detailed report for future reference",
                          ].map((step, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg border border-border">
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                                {index + 1}
                              </div>
                              <p className="text-muted-foreground text-sm flex-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div> */}

                      {/* Predictor Tool */}
                      {/* <div id="predictor-tool" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">College Predictor Input</h3>
                        </div>
                        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                  <option>JEE Main</option>
                                  <option>GLAET</option>
                                  <option>GATE</option>
                                  <option>CAT</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Score/Percentile</label>
                                <input
                                  type="number"
                                  placeholder="Enter your score"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                  <option>General</option>
                                  <option>OBC</option>
                                  <option>SC</option>
                                  <option>ST</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Program</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                                  <option>B.Tech CSE</option>
                                  <option>B.Tech ECE</option>
                                  <option>B.Tech EE</option>
                                  <option>MBA</option>
                                  <option>M.Tech</option>
                                </select>
                              </div>
                            </div>
                            <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                              Predict My Chances
                            </button>
                          </div>
                        </div>
                      </div> */}

                      {/* Admission Chances */}
                      {/* <div id="admission-chances" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">Understanding Your Admission Chances</h3>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-x-auto">
                          <table className="w-full min-w-[450px]">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">JEE Percentile</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Program</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Chances</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">90+ Percentile</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">B.Tech CSE, CSE (AI & ML)</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800">
                                    High
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">85-90 Percentile</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">B.Tech ECE, EE</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800">
                                    High
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">80-85 Percentile</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">B.Tech CSE, ECE</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Moderate
                                  </span>
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">75-80 Percentile</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">B.Tech ME, CE</td>
                                <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800">
                                    High
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          Note: Admission chances are indicative and based on previous year trends. Actual admissions depend on various factors including seat availability and competition.
                        </p> */}
                      {/* </div> */}
                      <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                        <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">College Predictor</h4>
                        <p className="text-gray-600">Coming soon</p>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="faculty" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Hero Image */}
                      <motion.div
                        className="relative h-64 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <img src={collegeCompare.src} alt="College Comparison Tool" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-6">
                            <motion.h2
                              className="text-2xl font-bold text-white mb-2"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              College Comparison Tool
                            </motion.h2>

                          </div>
                        </div>
                      </motion.div>
                      <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                        <GitCompare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">College Compare</h4>
                        <p className="text-gray-600">Coming soon</p>
                      </div>
                    </motion.div>
                  </TabsContent>
                  {/* Comparison Stats */}
                  {/* <div className="grid grid-cols-4 gap-4">
                        {[
                          { value: 95, suffix: '%', label: 'Placement', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
                          { value: 151, suffix: '', label: 'NIRF Rank', icon: Trophy, color: 'from-green-500 to-green-600' },
                          { value: 15000, suffix: '+', label: 'Students', icon: Users, color: 'from-purple-500 to-purple-600' },
                          { value: 500, suffix: '+', label: 'Faculty', icon: Award, color: 'from-orange-500 to-orange-600' },
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            className={`p-4 bg-gradient-to-br ${stat.color} rounded-lg text-white text-center`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                          >
                            <stat.icon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-2xl font-bold mb-1">
                              {stat.value >= 1000 ? `${(stat.value / 1000).toFixed(0)}K` : stat.value}{stat.suffix}
                            </div>
                            <div className="text-xs text-white/90">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div> */}

                  {/* Table of Contents */}
                  {/* <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Table of Contents
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { id: 'compare-overview', title: 'How to Compare Colleges' },
                            { id: 'gla-vs-others', title: 'GLA vs Other Universities' },
                            { id: 'comparison-parameters', title: 'Key Comparison Parameters' },
                            { id: 'comparison-table', title: 'Detailed Comparison' },
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                              className="text-left px-4 py-2 rounded-md hover:bg-primary/10 transition-all duration-300 text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group hover:scale-[1.02]"
                            >
                              <span className="flex-1">{item.title}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </button>
                          ))}
                        </div>
                      </div> */}

                  {/* How to Compare */}
                  {/* <div id="compare-overview" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">College Comparison Tool</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Compare GLA University with other top engineering colleges in India. Our comprehensive comparison tool helps you make an informed decision by comparing various parameters such as placements, fees, infrastructure, faculty, and more.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                            <div className="text-2xl font-bold text-primary mb-1">Placements</div>
                            <div className="text-xs text-muted-foreground">Compare packages & recruiters</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                            <div className="text-2xl font-bold text-secondary mb-1">Fees</div>
                            <div className="text-xs text-muted-foreground">Compare course fees</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                            <div className="text-2xl font-bold text-accent mb-1">Infrastructure</div>
                            <div className="text-xs text-muted-foreground">Compare facilities</div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-lg border border-primary/20">
                            <div className="text-2xl font-bold text-primary mb-1">Rankings</div>
                            <div className="text-xs text-muted-foreground">Compare NIRF ranks</div>
                          </div>
                        </div>
                      </div> */}

                  {/* GLA vs Others */}
                  {/* <div id="gla-vs-others" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-6">
                          <h3 className="text-xl font-semibold text-gray-900">Compare College with GLA University</h3>
                        </div> */}

                  {/* Main Comparison Card */}
                  {/* <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6"> */}
                  {/* GLA University */}
                  {/* <div className="flex-1 flex flex-col items-center text-center">
                              <div className="w-24 h-24 mb-4 rounded-full border-2 border-gray-200 overflow-hidden bg-white flex items-center justify-center p-2">
                                <img
                                  src={amityLogo}
                                  alt="GLA University"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <h4 className="font-bold text-lg text-gray-900 mb-1">GLA University</h4>
                              <p className="text-sm text-gray-600 mb-2">B.E. in Computer Science</p>
                              <div className="flex items-center gap-1 mb-3">
                                <div className="flex">
                                  {[1, 2, 3, 4].map((star) => (
                                    <Star key={star} className="w-4 h-4 fill-orange-400 text-orange-400" />
                                  ))}
                                  <Star className="w-4 h-4 fill-orange-200 text-orange-400" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">4.5</span>
                                <span className="text-sm text-gray-500">(120 Reviews)</span>
                              </div>
                            </div> */}

                  {/* VS Badge */}
                  {/* <div className="shrink-0">
                              <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
                                VS
                              </div>
                            </div>

                            {/* Add College Placeholder */}
                  {/* <div className="flex-1 flex flex-col items-center text-center">
                              <div className="w-24 h-24 mb-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-8 h-8 mx-auto mb-2 text-gray-400">+</div>
                                  <p className="text-xs text-gray-500">Add College</p>
                                </div>
                              </div>
                              <Button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white">
                                Compare
                              </Button>
                            </div>
                          </div>
                        </div>  */}

                  {/* Popular Comparisons */}
                  {/* <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">GLA University Popular Comparisons</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              {
                                name: "LPU",
                                fullName: "Lovely Professional University",
                                program: "B.E. in Computer Science",
                                rating: 4.3,
                                reviews: 89,
                                logo: "/public/assets/university-logos/lpu.png"
                              },
                              {
                                name: "Amity",
                                fullName: "Amity University",
                                program: "B.Tech. in Computer Science and Engineering",
                                rating: 4.1,
                                reviews: 156,
                                logo: "/public/assets/university-logos/amity.png"
                              },
                              {
                                name: "BITS",
                                fullName: "BITS Pilani",
                                program: "B.E. in Computer Science",
                                rating: 4.5,
                                reviews: 234,
                                logo: "/public/assets/university-logos/bits.png"
                              },
                              {
                                name: "Shiv Nadar",
                                fullName: "Shiv Nadar University",
                                program: "B.Tech. in Computer Science and Engineering",
                                rating: 4.4,
                                reviews: 78,
                                logo: "/public/assets/university-logos/shivnadar.png"
                              },
                            ].map((college, index) => (
                              <motion.div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
                                whileHover={{ y: -2 }}
                              > */}
                  {/* Top Row: Logos and VS Badge */}
                  {/* <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3"> */}
                  {/* GLA Logo */}
                  {/* <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-gray-200 overflow-hidden bg-white flex items-center justify-center p-1 shrink-0">
                                    <img
                                      src={amityLogo}
                                      alt="GLA"
                                      className="w-full h-full object-contain"
                                    />
                                  </div> */}

                  {/* VS Badge */}
                  {/* <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                                    VS
                                  </div> */}

                  {/* Comparison College Logo */}
                  {/* <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-gray-200 overflow-hidden bg-white flex items-center justify-center p-1 shrink-0">
                                    <img
                                      src={college.logo}
                                      alt={college.name}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                </div> */}

                  {/* College Name & Program */}
                  {/* <div className="text-center mb-3">
                                  <h5 className="font-semibold text-gray-900 text-sm sm:text-base truncate">GLA vs {college.fullName}</h5>
                                  <p className="text-xs text-gray-600 truncate">{college.program}</p>
                                </div> */}

                  {/* Ratings */}
                  {/* <div className="flex items-center justify-center gap-1 mb-3">
                                  <div className="flex">
                                    {[1, 2, 3, 4].map((star) => (
                                      <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-400 text-orange-400" />
                                    ))}
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-orange-200 text-orange-400" />
                                  </div>
                                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{college.rating}</span>
                                  <span className="text-xs text-gray-500">({college.reviews})</span>
                                </div> */}

                  {/* Compare Button */}
                  {/* <Button
                                  size="sm"
                                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm"
                                >
                                  Compare
                                </Button> */}
                  {/* </motion.div> */}
                  {/* ))} */}
                  {/* </div> */}
                  {/* </div> */}
                  {/* </div> */}

                  {/* Comparison Parameters */}
                  {/* <div id="comparison-parameters" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">Key Comparison Parameters</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "NIRF Ranking & Accreditations",
                            "Placement Statistics & Top Recruiters",
                            "Course Fees & Scholarship Options",
                            "Infrastructure & Campus Facilities",
                            "Faculty Qualifications & Student Ratio",
                            "Research Output & Patents",
                            "International Collaborations",
                            "Student Reviews & Ratings",
                          ].map((param, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg border border-border">
                              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span className="text-sm text-foreground">{param}</span>
                            </div>
                          ))}
                        </div>
                      </div> */}

                  {/* Detailed Comparison Table */}
                  {/* <div id="comparison-table" className="scroll-mt-24">
                        <div className="border-l-4 border-primary pl-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">GLA University vs LPU vs Amity (B.Tech CSE)</h3>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-x-auto">
                          <table className="w-full min-w-[500px]">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Parameter</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">GLA</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">LPU</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Amity</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {(() => {
                                const comparisonData = [
                                  { param: "NIRF Ranking 2024", gla: "101-150", lpu: "51-100", amity: "101-150" },
                                  { param: "Annual Fees (B.Tech)", gla: "₹1.8 Lakhs", lpu: "₹2.2 Lakhs", amity: "₹2.5 Lakhs" },
                                  { param: "Highest Package 2024", gla: "₹55 LPA", lpu: "₹62 LPA", amity: "₹50 LPA" },
                                  { param: "Average Package 2024", gla: "₹7.5 LPA", lpu: "₹8 LPA", amity: "₹7 LPA" },
                                  { param: "Placement Rate", gla: "75%", lpu: "80%", amity: "70%" },
                                  { param: "Campus Area", gla: "110 acres", lpu: "600 acres", amity: "70 acres" },
                                  { param: "Total Faculty", gla: "600+", lpu: "1800+", amity: "800+" },
                                  { param: "International Tie-ups", gla: "50+", lpu: "200+", amity: "100+" },
                                ];
                                const displayedData = expandedSections['comparison-table'] ? comparisonData : comparisonData.slice(0, 4);
                                return displayedData.map((item, index) => (
                                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">{item.param}</td>
                                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{item.gla}</td>
                                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{item.lpu}</td>
                                    <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{item.amity}</td>
                                  </tr>
                                ));
                              })()}
                            </tbody>
                          </table>
                        </div>
                        {!expandedSections['comparison-table'] && (
                          <button
                            onClick={() => toggleReadMore('comparison-table')}
                            className="mt-3 text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                          >
                            Read More (4 more parameters)
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                        {expandedSections['comparison-table'] && (
                          <button
                            onClick={() => toggleReadMore('comparison-table')}
                            className="mt-3 text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                          >
                            Show Less
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </button>
                        )}
                        <p className="text-sm text-muted-foreground mt-4">
                          Note: Data is based on official sources and publicly available information for 2024. Rankings and statistics may vary year to year.
                        </p>
                      </div>
                    </motion.div>
                  </TabsContent> */}

                  <TabsContent value="campus" className="mt-0">
                    <OnlineCoursesTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>

                  <TabsContent value="facilities" className="mt-0">
                    <ScholarshipsTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0">
                    <RankingsTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>


                  <TabsContent value="gallery" className="mt-0">
                    <PlacementsTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>


                  <TabsContent value="hostel" className="mt-0">
                    <CampusLifeTab collegeData={collegeData} scrollToSection={scrollToSection} />
                  </TabsContent>

                  <TabsContent value="alumni" className="mt-0">
                    < ResearchInnovationTab collegeData={collegeData} scrollToSection={scrollToSection} />

                  </TabsContent>

                  <TabsContent value="departments" className="mt-0">
                    <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                      <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        No Department Data Available
                      </h4>
                      <p className="text-gray-600">
                        Department information has not been added for this college yet.
                      </p>
                    </div>
                  </TabsContent>


                  <TabsContent value="news" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="border-l-4 border-[#00C798] pl-4">
                          <h3 className="text-[#00C798]">Latest News & Events</h3>
                        </div>
                        <div className="space-y-3">
                          {[
                            "GLA University ranks #151 in NIRF 2024",
                            "New Innovation & Incubation Center Launched",
                            "Annual Tech Fest Aavishkar 2024 Announced",
                          ].map((news, i) => (
                            <div
                              key={i}
                              className="p-4 bg-gradient-to-r from-[#00C798]/5 to-[#3B82F6]/5 rounded-lg border border-[#00C798]/20"
                            >
                              {news}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="contact" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        <div className="border-l-4 border-[#173CBA] pl-4">
                          <h5 className="text-[#173CBA]">Contact Information</h5>
                        </div>
                        <div className="space-y-3">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-gray-700 mb-2">Address</h4>
                            <p className="text-gray-600 text-sm">
                              GLA University, 17 Km Stone, NH-2, Mathura-Delhi Road, Mathura, Uttar Pradesh - 281406
                            </p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-gray-700 mb-2">Admissions Office</h4>
                            <p className="text-gray-600 text-sm">Phone: +91-565-2781000</p>
                            <p className="text-gray-600 text-sm">Email: info@gla.ac.in</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Shows last on mobile, second on desktop */}
            <motion.div
              className="lg:col-span-1 order-2 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div className="space-y-4 sm:space-y-5 lg:sticky lg:top-24">
                {/* News & Updates */}
                <Card className="overflow-hidden shadow-sm border-border/50 hover:shadow-md transition-shadow">
                  <CardHeader className="bg-primary/5 border-b border-border/50 pb-3">
                    <CardTitle className="flex items-center gap-2 text-primary text-base">
                      <Newspaper className="w-4 h-4" />
                      News & Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 px-4 pb-4">
                    {[
                      {
                        title: "Admissions Open 2024",
                        desc: "Applications now being accepted for all programs",
                        date: "Dec 15, 2024",
                        urgent: true,
                        image: newsImage1,
                      },
                      {
                        title: "New AI & ML Course Launched",
                        desc: "State-of-the-art curriculum designed with industry experts",
                        date: "Dec 10, 2024",
                        image: newsImage2,
                      },
                      {
                        title: "JEE Main 2024 Registration",
                        desc: "Last date: March 15, 2024",
                        date: "Dec 5, 2024",
                        urgent: true,
                        image: newsImage3,
                      },
                    ].map((news, index) => (
                      <motion.div
                        key={index}
                        className="flex gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer border-l-3 border-primary"
                        whileHover={{ x: 3 }}
                      >
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                          <img src={news.image.src} alt={news.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h5 className="text-sm font-semibold text-foreground line-clamp-1">{news.title}</h5>
                            {news.urgent && (
                              <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-5 shrink-0">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{news.desc}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {news.date}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Button className="w-full h-9 bg-[#3B82F6] hover:bg-secondary" variant="default">
                      View All News
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="overflow-hidden shadow-sm border-border/50 hover:shadow-md transition-shadow">
                  <CardHeader className="bg-secondary/5 border-b border-border/50 pb-3">
                    <CardTitle className="flex items-center gap-2 text-secondary text-base">
                      <MapPin className="w-4 h-4" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 px-4 pb-4">
                    {/* Map View */}
                    <div className="relative h-40 bg-muted rounded-lg overflow-hidden border border-border/50">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8199999999997!2d77.6729!3d27.5923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM1JzMyLjMiTiA3N8KwNDAnMjIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed break-words">
                        GLA University, 17 Km Stone, NH-2, Mathura-Delhi Road, Mathura, Uttar Pradesh - 281406
                      </p>
                    </div>

                    <Button className="w-full h-9 min-h-fit" variant="secondary">
                      <Mail className="w-3.5 h-3.5 mr-2 shrink-0" />
                      <span className="text-sm truncate">Email & Mobile</span>
                      <span className="ml-1.5 text-[10px] opacity-70 shrink-0 whitespace-nowrap">(Login Required)</span>
                    </Button>
                  </CardContent>
                </Card>

                {/* Featured Colleges */}
                <Card className="overflow-hidden shadow-sm border-border/50 hover:shadow-md transition-shadow">
                  <CardHeader className="bg-primary/5 border-b border-border/50 pb-3">
                    <CardTitle className="flex items-center gap-2 text-primary text-base">
                      <Award className="w-4 h-4" />
                      Featured Colleges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 px-4 pb-4">
                    {[
                      { name: "Amity University", location: "Noida", rank: "#15", logo: amityLogo },
                      {
                        name: "Shiv Nadar University",
                        location: "Greater Noida",
                        rank: "#23",
                        logo: "/assets/university-logos/shivnadar.png",
                      },
                      { name: "LPU", location: "Jalandhar", rank: "#32", logo: "/assets/university-logos/lpu.png" },
                    ].map((college, index) => (
                      <motion.div
                        key={index}
                        className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors border border-border/30"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex gap-3 mb-3">
                          <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-white border border-border/30 p-1">
                            <img src={typeof college.logo === 'string' ? college.logo : college.logo.src} alt={college.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-sm font-semibold text-foreground line-clamp-1">{college.name}</h5>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{college.location}</span>
                            </p>
                          </div>
                          <Badge className="bg-primary text-primary-foreground shrink-0 ml-2 text-xs h-fit">
                            {college.rank}
                          </Badge>
                        </div>
                        <Button size="sm" className="w-full h-8 text-xs bg-[#3B82F6] hover:bg-secondary" variant="default">
                          Apply Now
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Video & Images Gallery */}
                <Card className="overflow-hidden shadow-sm border-border/50 hover:shadow-md transition-shadow">
                  <CardHeader className="bg-accent/5 border-b border-border/50 pb-3">
                    <CardTitle className="flex items-center gap-2 text-accent text-base">
                      <Image className="w-4 h-4" />
                      Video & Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 px-4 pb-4">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { src: galleryImage1, alt: "Students Collaboration" },
                        { src: galleryImage2, alt: "Graduation Ceremony" },
                        { src: galleryImage3, alt: "Campus Activities" },
                        { src: galleryImage4, alt: "Mentoring Session" },
                      ].map((img, index) => (
                        <motion.div
                          key={index}
                          className="relative h-20 bg-muted rounded-lg overflow-hidden cursor-pointer group border border-border/30"
                          whileHover={{ scale: 1.03 }}
                        >
                          <img
                            src={img.src.src}
                            alt={img.alt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Button className="w-full h-9 bg-[#3B82F6] hover:bg-secondary" variant="default">
                      View All Media
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}