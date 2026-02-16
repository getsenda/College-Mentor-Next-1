"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Cog,
  Wrench,
  Settings,
  Bookmark,
  BookmarkCheck,
  MessageCircleQuestion,
  Eye,
  BookOpen,
  GraduationCap,
  Building2,
  FileText,
  Briefcase,
  Scale,
  ChevronDown,
  ChevronUp,
  GitCompare,
  MapPin,
  IndianRupee,
  TrendingUp,
  Globe,
  HelpCircle,
  Users,
  ExternalLink,
  Loader2,
} from "lucide-react";
import heroImage from "../../../public/assets/hero-mechanical.jpg";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { courseService, type CourseDetailsResponse } from "@/services/courseService";
import ReadMoreText from "./ReadMoreText";
import ReadMoreTable from "./ReadMoreTable";

const CourseDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isTabsExpanded, setIsTabsExpanded] = useState(false);
  const [courseData, setCourseData] = useState<CourseDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) {
      setError("Course ID is required");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    courseService
      .getCourseDetails(id)
      .then((data) => setCourseData(data))
      .catch((err) => setError(err?.message || "Failed to load course details"))
      .finally(() => setLoading(false));
  }, [id]);

  const currentCourse = courseData
    ? { id: String(courseData.id), name: courseData.tabs.overview.name, stream: "" }
    : { id: "", name: "", stream: "" };

  const handleCourseCompare = () => {
    router.push(`/course-compare?course=${encodeURIComponent(currentCourse.name)}`);
  };

  const allSections = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "admission", label: "Admission", icon: FileText },
    { id: "top-colleges", label: "Top Colleges", icon: Building2 },
    { id: "ug-courses", label: "UG Courses", icon: GraduationCap },
    { id: "pg-courses", label: "PG Courses", icon: GraduationCap },
    { id: "course-compare", label: "Compare Courses", icon: Scale },
    { id: "entrance-exams", label: "Top Entrance Exams", icon: FileText },
    { id: "careers", label: "Top Careers", icon: Briefcase },
  ];

  // Responsive visible count based on screen size
  const [visibleCount, setVisibleCount] = useState(7);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 400) {
        setVisibleCount(2);
      } else if (window.innerWidth < 480) {
        setVisibleCount(3);
      } else if (window.innerWidth < 640) {
        setVisibleCount(4);
      } else if (window.innerWidth < 768) {
        setVisibleCount(5);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(6);
      } else {
        setVisibleCount(7);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const visibleSections = allSections.slice(0, visibleCount);
  const hiddenSections = allSections.slice(visibleCount);
  const hasHiddenSections = hiddenSections.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsNavSticky(rect.top <= 0);
      }

      const sectionElements = allSections.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-secondary" />
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
        <p className="text-destructive">{error || "Course not found"}</p>
        <Button variant="outline" onClick={() => router.push("/courses/list")}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const tabs = courseData.tabs;
  const overview = tabs.overview;

  const highlightsArr = overview.highlights
    ? Object.entries(overview.highlights).map(([category, details]) => ({
      category,
      details: Array.isArray(details) ? details.join(", ") : String(details),
    }))
    : [];

  const govColleges = tabs.top_colleges?.items?.filter((c) => c.college_type === "Government") ?? [];
  const privColleges = tabs.top_colleges?.items?.filter((c) => c.college_type === "Private") ?? [];

  const curriculumByProgramme = (tabs.curriculum?.items ?? []).reduce<
    Record<string, Array<{ semester: string; subjects: string }>>
  >((acc, item) => {
    const key = item.programme_type;
    if (!acc[key]) acc[key] = [];
    acc[key].push({
      semester: item.semester,
      subjects: (item.core_subjects ?? []).join(", "),
    });
    return acc;
  }, {});

  const topRecruitersFromHighlight = Array.isArray(overview.highlights?.top_recruiters)
    ? overview.highlights.top_recruiters.map((name: string) => ({ name, description: "" }))
    : overview.highlights?.["Top Recruiters"]
      ? overview.highlights["Top Recruiters"].split(", ").map((name: string) => ({ name, description: "" }))
      : [];

  const entranceExamsFromHighlight = Array.isArray(overview.highlights?.entrance_exams)
    ? overview.highlights.entrance_exams.map((name: string) => ({
      name,
      type: "National",
      level: "UG",
      description: "",
    }))
    : overview.highlights?.["Entrance Exams"]
      ? overview.highlights["Entrance Exams"]
        .split(", ")
        .map((name: string) => ({ name, type: "National", level: "UG", description: "" }))
      : [];

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Floating Icons - Hidden on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute top-20 right-10 opacity-20 animate-float">
            <Cog className="w-20 h-20 lg:w-32 lg:h-32 text-primary" />
          </div>
          <div className="absolute bottom-32 right-1/4 opacity-15 animate-float" style={{ animationDelay: "2s" }}>
            <Settings className="w-16 h-16 lg:w-24 lg:h-24 text-primary" />
          </div>
          <div className="absolute top-1/3 right-20 opacity-10 animate-float" style={{ animationDelay: "4s" }}>
            <Wrench className="w-14 h-14 lg:w-20 lg:h-20 text-primary" />
          </div>
        </div>

        <div
          className="
    relative z-10
    container mx-auto
    px-4 sm:px-6 lg:px-8

    pt-20        /* mobile */
    sm:pt-24     /* tablets */
    lg:pt-28     /* laptops */
    xl:pt-20     /* 👈 reduce gap on large screens */

    min-h-[calc(100vh-5rem)]
    sm:min-h-[calc(100vh-6rem)]
    lg:min-h-[calc(100vh-7rem)]
    xl:min-h-[calc(100vh-20rem)]

    flex flex-col
    justify-start lg:justify-center
    items-center
  "
        >
          <div className="max-w-5xl text-center">
            <nav
              className="mb-2 sm:mb-4 animate-fade-up px-2 mt-8 sm:mt-0"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-muted-foreground flex-wrap">
                <Link
                  href="/"
                  className="hover:text-primary cursor-pointer transition-colors text-white text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Home
                </Link>
                <span className="text-secondary text-xs sm:text-sm">/</span>
                <Link
                  href="/courses/list"
                  className="hover:text-primary cursor-pointer transition-colors text-white text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Courses
                </Link>
                <span className="text-secondary text-xs sm:text-sm">/</span>
                <span className="text-secondary text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {overview.name}
                </span>
              </div>
            </nav>

            <h1
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="text-white/80">{overview.name}</span>
            </h1>

            <p
              className="text-sm sm:text-lg md:text-xl text-gray-400 mb-4 sm:mb-6 animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="font-semibold text-gray-200">Degree:</span> {overview.degree_name}
            </p>

            <p
              className="text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-xl px-2 animate-fade-up line-clamp-3"
              style={{ animationDelay: "0.8s" }}
            >
              {overview.what_is}
            </p>

            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-4 animate-fade-up px-2"
              style={{ animationDelay: "1s" }}
            >
              {/* <Button
                variant="hero"
                className="group bg-secondary
  px-4 sm:px-6 lg:px-8
  py-3 sm:py-4 lg:py-4
  text-sm sm:text-base
  font-normal
  rounded-lg
  transition-all duration-300"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </Button> */}
              {/* <Button
                variant="outline"
                className="group
  px-4 sm:px-6 lg:px-8
  py-3 sm:py-4 lg:py-4
  text-sm sm:text-base
  font-normal
  rounded-lg
  transition-all duration-300"
              >
                Talk to Advisor
              </Button> */}
              <Button
                variant="outline"
                onClick={() => setIsSaved(!isSaved)}
                className={`
  group
  px-4 sm:px-6 lg:px-8
  py-3 sm:py-4 lg:py-4
  text-sm sm:text-base
  font-normal
  rounded-lg
  transition-all duration-300
  ${isSaved
                    ? "bg-amber-500 border-2 border-amber-500 text-white hover:bg-amber-600"
                    : "bg-amber-500 border-2 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600 shadow-md shadow-amber-500/25"
                  }`}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
                )}
                <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
              </Button>
              {/* <Button
                variant="outline"
                className="group
  px-4 sm:px-6 lg:px-8
  py-3 sm:py-4 lg:py-4
  text-sm sm:text-base
  font-normal
  rounded-lg
  transition-all duration-300"
              >
                <MessageCircleQuestion className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
                <span className="hidden sm:inline">Ask Question</span>
              </Button> */}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Sticky Navigation */}
      <div ref={navRef} className="relative"></div>
      {isNavSticky && <div className="h-20 sm:h-24" />}
      <div
        className={`${isNavSticky ? "fixed top-[72px] left-0 right-0" : "relative"
          } z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border/50 shadow-sm transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 sm:py-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 pb-2">
                <div
                  className="flex gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {visibleSections.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex-shrink-0 px-2 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 ${activeSection === section.id
                        ? "bg-[#00C798] text-white shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                        <section.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                        <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">
                          {section.label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {hasHiddenSections && (
                  <motion.button
                    onClick={() => setIsTabsExpanded(!isTabsExpanded)}
                    className="flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground ml-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isTabsExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {isTabsExpanded && hasHiddenSections && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-start pb-2">
                      {hiddenSections.map((section) => (
                        <motion.button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex-shrink-0 px-2 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 ${activeSection === section.id
                            ? "bg-[#00C798] text-white shadow-md"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                            <section.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">
                              {section.label}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections with Sidebar */}
      <div
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12"
        style={{ paddingTop: isNavSticky ? "80px" : "24px" }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Overview Section */}
            <section id="overview" className="mb-10 sm:mb-16 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">
                What is {overview.name}?
              </h2>
              <ReadMoreText content={overview.what_is} maxLines={5} />

              {/* Highlights */}
              {highlightsArr.length > 0 && (
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
                    Highlights
                  </h3>
                  <ReadMoreTable
                    columns={[
                      { key: "category", header: "Category" },
                      { key: "details", header: "Details" },
                    ]}
                    data={highlightsArr}
                    maxRows={4}
                  />
                </div>
              )}

              {/* Curriculum */}
              {tabs.curriculum?.intro && (
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
                    Course Curriculum/Syllabus
                  </h3>
                  <ReadMoreText content={tabs.curriculum.intro} maxLines={3} />
                  {Object.entries(curriculumByProgramme).map(([programmeType, rows]) => (
                    <div key={programmeType} className="mt-4">
                      <h4 className="text-base sm:text-lg font-medium mb-3 text-foreground">
                        {programmeType}
                      </h4>
                      <ReadMoreTable
                        columns={[
                          { key: "semester", header: "Semester", width: "200px" },
                          { key: "subjects", header: "Core Subjects" },
                        ]}
                        data={rows}
                        maxRows={4}
                      />
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground mt-3 italic">
                    Note: The above syllabus is indicative. Individual institutions may have
                    variations.
                  </p>
                </div>
              )}

              {/* Top Colleges */}
              {(govColleges.length > 0 || privColleges.length > 0) && (
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
                    Top Colleges
                  </h3>
                  {tabs.top_colleges?.intro && (
                    <ReadMoreText content={tabs.top_colleges.intro} maxLines={2} />
                  )}
                  {govColleges.length > 0 && (
                    <>
                      <h4 className="text-base sm:text-lg font-medium mb-3 text-foreground flex items-center gap-2 mt-4">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                        <span className="text-sm sm:text-base">Government Colleges</span>
                      </h4>
                      <ReadMoreTable
                        columns={[
                          { key: "rank", header: "Rank" },
                          { key: "college_name", header: "College Name" },
                          { key: "location", header: "Location" },
                          { key: "average_fee", header: "Avg Fee" },
                        ]}
                        data={govColleges}
                        maxRows={4}
                      />
                    </>
                  )}
                  {privColleges.length > 0 && (
                    <>
                      <h4 className="text-base sm:text-lg font-medium mb-3 mt-4 sm:mt-6 text-foreground flex items-center gap-2">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <span className="text-sm sm:text-base">Private Colleges</span>
                      </h4>
                      <ReadMoreTable
                        columns={[
                          { key: "rank", header: "Rank" },
                          { key: "college_name", header: "College Name" },
                          { key: "location", header: "Location" },
                          { key: "average_fee", header: "Avg Fee" },
                        ]}
                        data={privColleges}
                        maxRows={4}
                      />
                    </>
                  )}
                  <p className="text-sm text-muted-foreground mt-3 italic">
                    Note: Fee structures are approximate. Verify current fees directly with
                    institutions.
                  </p>
                </div>
              )}

              {/* Job Profiles / Top Careers */}
              {(tabs.top_careers?.items?.length ?? 0) > 0 && (
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    Job Profiles
                  </h3>
                  <ReadMoreTable
                    columns={[
                      { key: "job_profile", header: "Job Profile" },
                      { key: "job_description", header: "Job Description" },
                      { key: "average_salary", header: "Avg Salary (P.A.)" },
                    ]}
                    data={tabs?.top_careers?.items ?? []}
                    maxRows={4}
                  />
                </div>
              )}

              {/* Top Recruiters */}
              {topRecruitersFromHighlight.length > 0 && (
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    Top Recruiters
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {topRecruitersFromHighlight.map((recruiter: { name: string; description: string }, index: any) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Card className="p-3 sm:p-4 hover:shadow-md transition-shadow h-full">
                          <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                            {recruiter.name}
                          </h4>
                          {recruiter.description && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {recruiter.description}
                            </p>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Trends */}
              {tabs.upcoming_trends?.data && (
                <div className="mt-6 sm:mt-10">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    Upcoming Trends
                  </h3>
                  {tabs.upcoming_trends.intro && (
                    <ReadMoreText content={tabs.upcoming_trends.intro} maxLines={2} />
                  )}
                  <div className="space-y-4 sm:space-y-6 mt-4">
                    {tabs.upcoming_trends.data.scope_in_india && (
                      <Card className="p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          Scope in India
                        </h4>
                        <ReadMoreText
                          content={tabs.upcoming_trends.data.scope_in_india}
                          maxLines={5}
                        />
                      </Card>
                    )}
                    {tabs.upcoming_trends.data.scope_abroad && (
                      <Card className="p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-foreground flex items-center gap-2">
                          <Globe className="w-4 h-4 text-secondary" />
                          Scope Abroad
                        </h4>
                        <ReadMoreText
                          content={tabs.upcoming_trends.data.scope_abroad}
                          maxLines={5}
                        />
                      </Card>
                    )}
                    {(tabs.upcoming_trends.data.higher_education_opportunities ||
                      (tabs.upcoming_trends.data.foreign_universities?.length ?? 0) > 0) && (
                        <Card className="p-4 sm:p-6">
                          <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-foreground flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-primary" />
                            Higher Education Options
                          </h4>
                          {tabs.upcoming_trends.data.higher_education_opportunities && (
                            <ReadMoreText
                              content={tabs.upcoming_trends.data.higher_education_opportunities}
                              maxLines={5}
                            />
                          )}
                          {(tabs.upcoming_trends.data.foreign_universities?.length ?? 0) > 0 && (
                            <div className="mt-3 sm:mt-4">
                              <h5 className="font-medium text-foreground mb-2 text-sm sm:text-base">
                                Top Foreign Universities
                              </h5>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {tabs.upcoming_trends.data.foreign_universities!.map(
                                  (uni, index) => (
                                    <span
                                      key={index}
                                      className="px-2 sm:px-3 py-1 bg-secondary/10 text-secondary text-xs sm:text-sm rounded-full"
                                    >
                                      {uni}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </Card>
                      )}
                  </div>
                </div>
              )}
            </section>

            {/* Courses Section */}
            <section id="courses" className="mb-10 sm:mb-16 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                Courses
              </h2>

              <div className="grid gap-4 sm:gap-6">
                {tabs.courses?.degree_programme &&
                  Object.entries(tabs.courses.degree_programme).map(([level, title], idx) => {
                    const duration = tabs.courses?.degree_duration?.[level] ?? "";
                    const eligibility = tabs.courses?.eligibility_criteria?.[level] ?? "";
                    const fee = tabs.courses?.average_fee?.[level] ?? "";
                    const salary = tabs.courses?.average_salary?.[level] ?? "";
                    return (
                      <Card key={idx} className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">
                              {title}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm">
                              {duration && (
                                <span className="flex items-center gap-1 text-secondary">
                                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Duration: {duration}
                                </span>
                              )}
                              {eligibility && (
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Eligibility: {eligibility}
                                </span>
                              )}
                              {fee && (
                                <span className="flex items-center gap-1">
                                  <IndianRupee className="w-3 h-3" />
                                  Fee: {fee}
                                </span>
                              )}
                              {salary && (
                                <span className="flex items-center gap-1">Salary: {salary}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </section>

            {/* Admission Section */}
            <section id="admission" className="mb-10 sm:mb-16 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                Admission - Eligibility Criteria
              </h2>
              {(tabs.eligibility?.intro || tabs.admission?.eligibility_criteria?.length) && (
                <>
                  {tabs.eligibility?.intro && (
                    <ReadMoreText content={tabs.eligibility.intro} maxLines={3} />
                  )}
                  <div className="overflow-x-auto -mx-3 sm:mx-0 mt-4">
                    <div className="min-w-[600px] sm:min-w-0 px-3 sm:px-0">
                      <Card className="overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-secondary/10">
                              <TableHead className="font-semibold text-foreground w-1/5 text-xs sm:text-sm">
                                Course Level
                              </TableHead>
                              <TableHead className="font-semibold text-foreground text-xs sm:text-sm">
                                Eligibility Criteria
                              </TableHead>
                              <TableHead className="font-semibold text-foreground w-24 text-xs sm:text-sm">
                                Duration
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {(tabs.eligibility?.items ?? tabs.admission?.eligibility_criteria ?? []).map(
                              (item, index) => (
                                <TableRow
                                  key={index}
                                  className={index % 2 === 0 ? "bg-muted/30" : ""}
                                >
                                  <TableCell className="font-medium text-foreground text-xs sm:text-sm">
                                    {item.course_type}
                                  </TableCell>
                                  <TableCell className="text-muted-foreground text-xs sm:text-sm">
                                    {item.eligibility_criteria}
                                  </TableCell>
                                  <TableCell className="text-secondary font-medium text-xs sm:text-sm">
                                    {item.duration}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Card>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 italic">
                    Note: Reserved category candidates (SC/ST/OBC/PwD) typically receive 5%
                    relaxation in percentage criteria.
                  </p>
                </>
              )}
            </section>

            {/* Top Colleges Section */}
            <section id="top-colleges" className="mb-10 sm:mb-16 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                Top Colleges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[...govColleges.slice(0, 5), ...privColleges.slice(0, 5)].map(
                  (college, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-3 sm:p-4 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                            #{college.rank}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors text-sm sm:text-base truncate">
                              {college.college_name}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{college.location}</span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs sm:text-sm font-medium text-secondary">
                              {college.average_fee}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                )}
              </div>
            </section>

            {/* UG Courses Section */}
            {(tabs.ug_courses?.length ?? 0) > 0 && (
              <section id="ug-courses" className="mb-10 sm:mb-16 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  UG Courses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {tabs.ug_courses!.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer group h-full">
                        <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors text-sm sm:text-base">
                          {course.name}
                        </h4>
                        <span className="text-xs sm:text-sm text-secondary mt-2 block">
                          {course.programme_level}
                        </span>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* PG Courses Section */}
            {(tabs.pg_courses?.length ?? 0) > 0 && (
              <section id="pg-courses" className="mb-10 sm:mb-16 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  PG Courses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {tabs.pg_courses!.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer group h-full">
                        <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors text-sm sm:text-base">
                          {course.name}
                        </h4>
                        <span className="text-xs sm:text-sm text-secondary mt-2 block">
                          {course.programme_level}
                        </span>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Entrance Exams Section */}
            {entranceExamsFromHighlight.length > 0 && (
              <section id="entrance-exams" className="mb-10 sm:mb-16 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  Top Entrance Exams
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {entranceExamsFromHighlight.map((exam: { name: string; type: string; level: string; description: string }, index: any) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors text-sm sm:text-base">
                              {exam.name}
                            </h4>
                            {exam.description && (
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                                {exam.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center sm:flex-col sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                            <span
                              className={`px-2 py-0.5 text-[10px] sm:text-xs rounded-full ${exam.type === "National"
                                ? "bg-secondary/10 text-secondary"
                                : "bg-primary/10 text-primary"
                                }`}
                            >
                              {exam.type}
                            </span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground">
                              {exam.level}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Top Careers Section */}
            {(tabs.top_careers?.items?.length ?? 0) > 0 && (
              <section id="careers" className="mb-10 sm:mb-16 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  Top Careers
                </h2>
                {tabs.top_careers?.intro && (
                  <ReadMoreText content={tabs.top_careers.intro} maxLines={2} />
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                  {tabs?.top_careers?.items?.map((career: { job_profile: string; job_description: string; average_salary: string }, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-4 sm:p-5 hover:shadow-lg transition-all cursor-pointer group h-full">
                        <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors text-sm sm:text-base">
                          {career.job_profile}
                        </h4>
                        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                          {career.job_description && (
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {career.job_description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-muted-foreground">Avg Salary</span>
                            <span className="text-secondary font-medium">
                              {career.average_salary}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Course Compare Section */}
            <section id="course-compare" className="mb-10 sm:mb-16 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                Course Compare
              </h2>
              <Card className="p-4 sm:p-8 bg-gradient-to-br from-secondary/5 to-primary/5">
                <div className="text-center max-w-xl mx-auto">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <GitCompare className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold text-foreground mb-2">
                    Compare {overview.name} with Other Courses
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    Make informed decisions by comparing course curriculum, fees, career
                    prospects, and more.
                  </p>
                  <Button
                    onClick={handleCourseCompare}
                    className="bg-secondary hover:bg-secondary/90 text-white text-sm sm:text-base"
                  >
                    <Scale className="w-4 h-4 mr-2" />
                    Course Compare Tool
                    <ExternalLink className="w-4 h-4 ml-2 hidden sm:inline" />
                  </Button>
                </div>
              </Card>
            </section>

            {/* FAQs Section */}
            {(tabs.faqs?.items?.length ?? 0) > 0 && (
              <section className="mb-10 sm:mb-16">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {tabs?.faqs?.items?.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-secondary text-sm sm:text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="shadow-lg border-border/50 bg-background">
                  <CardContent className="p-5">
                    <div className="text-center space-y-4">
                      <div className="w-14 h-14 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                        <GitCompare className="w-7 h-7 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Compare Courses</h3>
                        <p className="text-xs text-muted-foreground">
                          Compare {currentCourse.name} with other courses
                        </p>
                      </div>
                      <Button
                        onClick={handleCourseCompare}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white"
                      >
                        <Scale className="w-4 h-4 mr-2" />
                        Course Compare
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
  );
};

export default CourseDetails;
