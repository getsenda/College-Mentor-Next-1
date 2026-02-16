import { X, Download, ExternalLink, Star, MapPin, Award, Building2, Users, GraduationCap, CheckCircle, TrendingUp, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/FallBack";
import { College } from "./CollegeCompareCard";
import { Badge } from "../ui/badge";
import { useState, useEffect, createContext, useContext } from "react";

const CollegeNamesContext = createContext<string[]>([]);
import { motion, AnimatePresence } from "framer-motion";
import { collegeService } from "@/services/collegeService";
import { ComparisonCollege } from "@/services/comparisontable";
import { downloadCollegeComparisonPdf } from "@/utils/collegeComparisonPdf";
interface ComparisonTableProps {
  colleges: ComparisonCollege[];
  onRemove: (collegeId: number) => void;
  expandScholarships?: boolean;
}


export function ComparisonTable({
  colleges,
  onRemove,
  expandScholarships = false,
}: ComparisonTableProps) {
  // Store college names for mobile labels
  const collegeNames = colleges.map(c => c.tabs?.overview?.about?.name ?? "College");

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: false,
    rankings: false,
    courseDetails: false,
    admission: false,
    scholarships: expandScholarships,
    ratings: false,
    fees: false,
    placements: false,
    cutoff: false,
    seats: false,
    infrastructure: false,
  });


  // Sync scholarships expansion
  useEffect(() => {
    if (expandScholarships) {
      setExpandedSections(prev => ({ ...prev, scholarships: true }));
    }
  }, [expandScholarships]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };
  const parseFeatures = (features?: string): string[] => {
    if (!features) return [];

    return features
      .replace(/[{}"]/g, "")
      .split(",")
      .map(f => f.trim())
      .filter(Boolean);
  };


  return (
    <CollegeNamesContext.Provider value={collegeNames}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 py-2">
          {/* Enhanced Header Cards with College Logos */}
          <div className={`grid gap-4 sm:gap-6 ${colleges.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            colleges.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
              colleges.length === 3 ? 'grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto' :
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
            {colleges.map((college, index) => (
              <Card key={college.id} className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 group bg-white">
                {/* Animated gradient top bar - Blue to Green */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4169E1] via-[#00CED1] to-[#00FA9A] group-hover:h-1.5 transition-all"></div>

                {/* Remove Button with better styling */}
                <button
                  className="absolute top-3 right-3 h-7 w-7 z-10 hover:bg-gray-100 rounded-full border-0 bg-white shadow-sm transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  onClick={() => onRemove(Number(college.id))}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                {/* <CardContent className="p-4 sm:p-5 text-center pt-6 sm:pt-7"> */}
                {/* Enhanced College Logo with white background */}
                {/* <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-gray-200 p-3 sm:p-4 mx-auto mb-4 bg-white shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:scale-105">
                <ImageWithFallback
                  src={college.logo}
                  alt={college.name}
                  className="w-full h-full object-contain"
                />
              </div> */}

                {/* College Name */}
                {/* <h3 className="font-bold text-sm sm:text-base mb-2 text-gray-900 transition-colors duration-300 line-clamp-2 px-2">
                {college.name}
              </h3> */}

                {/* Location with icon */}
                {/* <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 mb-4 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="line-clamp-1">{college.location}</span>
              </div> */}

                {/* Action Button */}
                {/* <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] shadow-sm hover:shadow-md transition-all duration-300 text-xs px-4 py-1.5 h-9"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Details
                </Button>
              </div> */}
                {/* </CardContent> */}

              </Card>
            ))}
          </div>

          {/* Overview Section */}
          <ExpandableSection
            title="Overview"
            icon={<Building2 className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.overview}
            onToggle={() => toggleSection('overview')}
          >
            <ComparisonRow
              label="College Type"
              values={colleges.map(c => (
                <Badge variant="outline">{c.tabs?.overview?.about?.institute_type ?? "-"}</Badge>
              ))}
            />
            <ComparisonRow
              label="Location"
              values={colleges.map(c => {
                const city = c.tabs?.overview?.about?.city;
                const state = c.tabs?.overview?.about?.state;

                return city || state
                  ? [city, state].filter(Boolean).join(", ")
                  : "NA";
              })}

            />
            <ComparisonRow
              label="Campus Size"
              values={colleges.map(c => c.tabs?.overview?.about?.campus_area ? `${c.tabs.overview.about.campus_area} acres` : "NA")}
            />
            <ComparisonRow
              label="Study Mode"
              values={colleges.map(c => c.tabs?.overview?.about?.institute_type === "Online" ? "Online" : "On-Campus")}
            />
            <ComparisonRow
              label="Diversity"
              values={colleges.map(c => c.tabs?.overview?.about?.institute_type === "Online" ? "Global Student Body" : "Diverse Student Population")}
            />
            <ComparisonRow
              label="Graduation Outcomes"
              values={colleges.map(
                c =>
                  c.tabs?.overview?.highlights?.placement_2025_2026?.average_package
                    ? `Average Package: ${c.tabs?.overview?.highlights?.placement_2025_2026?.average_package}`
                    : "NA"
              )}
            />

            <ComparisonRow
              label="Approvals"
              values={colleges.map(c => (
                <div className="flex flex-wrap gap-1">
                  {c.tabs?.overview?.about?.institute_type === "Online" ? (
                    <Badge variant="outline" className="text-xs gap-1">
                      <CheckCircle className="w-3 h-3" />
                      UGC Approved
                    </Badge>
                  ) : (
                    <>
                      <Badge variant="outline" className="text-xs gap-1">
                        <CheckCircle className="w-3 h-3" />
                        AICTE Approved
                      </Badge>
                      <Badge variant="outline" className="text-xs gap-1">
                        <CheckCircle className="w-3 h-3" />
                        NAAC Accredited
                      </Badge>
                    </>
                  )}
                  {/* {c.approvals.map(approval => (
                  <Badge key={approval} variant="secondary" className="text-xs gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {approval}
                  </Badge>
                ))} */}
                </div>
              ))}
            />
          </ExpandableSection>

          {/* Rankings & Accreditations */}
          <ExpandableSection
            title="Rankings & Accreditations"
            icon={<Award className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.rankings}
            onToggle={() => toggleSection('rankings')}
          >
            <ComparisonRow
              label="NIRF Rank"
              values={colleges.map(c => (
                <span className="font-semibold text-blue-600">#{c.tabs?.overview?.highlights?.nirf_ranking_2025 ?? "NA"}</span>
              ))}
            />
            <ComparisonRow
              label="International Ranking (India)"
              values={colleges.map((c, i) => `#${(i + 1) * 45}`)}
            />
            <ComparisonRow
              label="Careers360 Rating"
              values={colleges.map(c => {
                const rating = (c as any).rating;

                return rating != null ? (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{rating}/5</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">–</span>
                );
              })}
            />

          </ExpandableSection>

          {/* Course Details */}
          <ExpandableSection
            title="Course Details"
            icon={<GraduationCap className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.courseDetails}
            onToggle={() => toggleSection('courseDetails')}
          >
            <ComparisonRow
              label="Course Type"
              values={colleges.map(c => c.tabs?.courses_fees?.items?.[0]?.course_name ?? "-")} // take first course)}
            />
            <ComparisonRow
              label="Course Level"
              values={colleges.map(c => c.tabs?.courses_fees?.items?.[0]?.programme_level ?? "-")}
            />
            <ComparisonRow
              label="Duration"
              values={colleges.map(c => c.tabs?.courses_fees?.items?.[0]?.duration ?? "-")}
            />
            <ComparisonRow
              label="Specializations"
              values={colleges.map(c => c.tabs?.courses_fees?.items?.[0]?.specializations ?? "-")}
            />
          </ExpandableSection>

          {/* Admission & Eligibility */}
          <ExpandableSection
            title="Admission & Eligibility"
            icon={<Users className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.admission}
            onToggle={() => toggleSection('admission')}
          >
            <ComparisonRow
              label="Accepted Exams"
              values={colleges.map(() => "NA")}
            />

            <ComparisonRow
              label="Acceptance Rate"
              values={colleges.map(() => "NA")}
            />

            <ComparisonRow
              label="Exams & Counselling"
              values={colleges.map(() => "NA")}
            />

            <ComparisonRow
              label="Eligibility"
              values={colleges.map(c => c.tabs?.admission?.items?.[0]?.eligibility_criteria ?? "NA")}
            />
            {/* <ComparisonRow
            label="Applications Open"
            values={colleges.map(c => c.tabs.admissions.items[0].important_dates_json.date)}
          /> */}
          </ExpandableSection>

          {/* Scholarships Section */}
          <ExpandableSection
            title="Scholarships"
            icon={<Award className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.scholarships}
            onToggle={() => toggleSection('scholarships')}
            id="scholarships-section"
            className="bg-gradient-to-br from-blue-50/50 via-green-50/30 to-blue-50/50 dark:from-blue-950/20 dark:via-green-950/10 dark:to-blue-950/20"
            headerClassName="bg-gradient-to-r from-blue-100/60 via-green-100/40 to-blue-100/60 dark:from-blue-900/30 dark:via-green-900/20 dark:to-blue-900/30"
          >
            <ComparisonRow
              label="Scholarships Available"
              values={colleges.map(c => (c.tabs?.scholarships?.items?.length ?? 0) > 0 ? (
                <div className="flex items-center gap-2 animate-pulse">
                  <CheckCircle className="w-5 h-5 text-green-600 drop-shadow-lg" />
                  <span className="font-bold text-green-700 text-lg">Yes</span>
                </div>) : (<div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-red-600 text-lg">No</span>
                </div>
              ))}
              className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 border-l-4 border-green-500"
            />
            <ComparisonRow
              label="Scholarships"
              values={colleges.map(c => {
                const items = c.tabs?.scholarships?.items;

                if (!items || items.length === 0) {
                  return <span className="text-muted-foreground">NA</span>;
                }

                return (
                  <div className="grid grid-cols-2 gap-3">
                    {items.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-lg border p-3 text-sm bg-muted/30"
                      >
                        <p className="font-semibold text-sm">
                          🎓 {s.scholarship_name || "NA"}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          <strong>Eligibility:</strong>{" "}
                          {s.eligibility_criteria || "NA"}
                        </p>

                        <p className="text-xs mt-1">
                          <strong>Amount:</strong>{" "}
                          {s.amount || "NA"}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            />

          </ExpandableSection>

          {/* Student Rating & Review */}
          <ExpandableSection
            title="Student Rating & Review"
            icon={<Star className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.ratings}
            onToggle={() => toggleSection('ratings')}
          >
            <ComparisonRow
              label="Academic Quality"
              values={colleges.map(() => "NA")}
            />
            <ComparisonRow
              label="Placements"
              values={colleges.map(() => "NA")}
            />
            <ComparisonRow
              label="Infrastructure"
              values={colleges.map(() => "NA")}
            />
          </ExpandableSection>


          {/* Fees */}
          <ExpandableSection
            title="Fees"
            icon={<TrendingUp className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.fees}
            onToggle={() => toggleSection('fees')}
          >
            {/* <ComparisonRow
            label="Total Course Fees"
            values={colleges.map(c => (
              <span className="font-semibold text-blue-600">{c.fees}</span>
            ))}
          /> */}
            <ComparisonRow
              label="Hostel Fees"
              values={colleges.map(c => {
                const facilities = c.tabs?.campus_facilities?.items;
                if (!facilities || facilities.length === 0) return "NA";

                // Find hostel-related facility with fees
                const hostelFacility = facilities.find(
                  f =>
                    f.facility_name?.toLowerCase().includes("hostel") &&
                    f.fees_charges &&
                    f.fees_charges.trim() !== ""
                );

                return hostelFacility?.fees_charges || "NA";
              })}
            />

            <ComparisonRow
              label="Mess Fees"
              values={colleges.map(c => {
                const facilities = c.tabs?.campus_facilities?.items;
                if (!facilities || facilities.length === 0) return "NA";

                // Find hostel-related facility with fees
                const hostelFacility = facilities.find(
                  f =>
                    f.facility_name?.toLowerCase().includes("mess") &&
                    f.fees_charges &&
                    f.fees_charges.trim() !== ""
                );

                return hostelFacility?.fees_charges || "NA";
              })}
            />
            <ComparisonRow
              label="Security Deposit"
              values={colleges.map(c => {
                const facilities = c.tabs?.campus_facilities?.items;
                if (!facilities || facilities.length === 0) return "NA";

                // Find hostel-related facility with fees
                const hostelFacility = facilities.find(
                  f =>
                    f.facility_name?.toLowerCase().includes("security") &&
                    f.facility_category &&
                    f.fees_charges && f.fees_charges.trim() !== ""
                );

                return hostelFacility?.fees_charges || "NA";
              })}
            />

            <ComparisonRow
              label="Get Fees Detail"
              values={colleges.map(() => (
                <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                  View Complete Fee Structure
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            />
          </ExpandableSection>

          {/* Placements */}
          <ExpandableSection
            title="Placements"
            icon={<TrendingUp className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.placements}
            onToggle={() => toggleSection('placements')}
          >
            <ComparisonRow
              label="Average Package"
              values={colleges.map(c => (
                <span className="font-semibold text-green-600">{c.tabs?.placements?.latest_stats?.average_package ?? "NA"}</span>
              ))}
            />
            <ComparisonRow
              label="Highest Package"
              values={colleges.map(c => (
                <span className="font-semibold text-green-700">{c.tabs?.placements?.latest_stats?.highest_package ?? "NA"}</span>
              ))}
            />
            <ComparisonRow
              label="Placement Detail"
              values={colleges.map(() => (
                <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                  View Placement Statistics
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            />
          </ExpandableSection>

          {/* Cut-off */}
          <ExpandableSection
            title="Cut-off"
            icon={<Award className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.cutoff}
            onToggle={() => toggleSection('cutoff')}
          >
            <ComparisonRow
              label="Cut-off marks"
              values={colleges.map(c => c.tabs?.cutoff?.items[0]?.cutoff_marks ?? "NA")}
            />
            <ComparisonRow
              label="Opening Rank"
              values={colleges.map(c => c.tabs?.cutoff?.items[0]?.opening_rank ?? "NA")}
            />
            <ComparisonRow
              label="Closing Rank"
              values={colleges.map(
                c => c.tabs?.cutoff?.items?.[0]?.closing_rank ?? "NA"
              )}

            />
            <ComparisonRow
              label="View Cut-off Detail"
              values={colleges.map(() => (
                <a href="#" className="text-blue-600 hover:underline flex items-center gap-1">
                  Complete Cut-off Details
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            />
          </ExpandableSection>

          {/* Total Seats */}
          <ExpandableSection
            title="Total Seats"
            icon={<Users className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.seats}
            onToggle={() => toggleSection('seats')}
          >
            <ComparisonRow
              label="Total Seats Available"
              values={colleges.map(c => {
                const course = c.tabs.courses_fees?.items?.find(
                  item => item.additional_info_json?.seats
                );
                return course?.additional_info_json?.seats ?? "NA";
              })}

            />
          </ExpandableSection>

          {/* Infrastructure & Facilities */}
          <ExpandableSection
            title="Infrastructure & Facilities"
            icon={<Building2 className="w-4.5 h-4.5 text-primary-foreground" />}
            isExpanded={expandedSections.infrastructure}
            onToggle={() => toggleSection('infrastructure')}
          >
            <ComparisonRow
              label="Campus Facilities"
              values={colleges.map(c => {
                const facilities = c.tabs?.campus_facilities?.items;

                if (!facilities || facilities.length === 0) {
                  return <span className="text-muted-foreground">NA</span>;
                }

                // 🔹 Group by category
                const grouped = facilities.reduce<Record<string, typeof facilities>>(
                  (acc, item) => {
                    const category = item.facility_category || "Other";
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(item);
                    return acc;
                  },
                  {}
                );

                return (
                  <div className="space-y-4">
                    {Object.entries(grouped).map(([category, items]) => (

                      <div key={category}>
                        {/* Category title */}
                        <h4 className="font-semibold text-sm mb-2 text-primary">
                          {category}
                        </h4>

                        {/* Facilities under category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {items.map((f, i) => (
                            <div
                              key={i}
                              className="border rounded-lg p-3 bg-muted/30 text-sm"
                            >
                              <p className="font-semibold">
                                {f.facility_name || "NA"}
                              </p>

                              {f.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {f.description}
                                </p>
                              )}

                              {/* Features */}
                              {parseFeatures(f.features).length > 0 && (
                                <ul className="mt-2 list-disc list-inside text-xs">
                                  {parseFeatures(f.features).map((feat, idx) => (
                                    <li key={idx}>{feat}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            />

          </ExpandableSection>

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
            {/* Download Button - Single */}
            <div className="flex justify-center">
              <Button
                onClick={() => downloadCollegeComparisonPdf(colleges)}
                className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 h-10 sm:h-11 px-4 sm:px-6 text-xs sm:text-sm hover:scale-[1.02]"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Download Comparison
              </Button>
            </div>

            {/* College-specific buttons */}
            <div className={`grid gap-3 sm:gap-4 ${colleges.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
              colleges.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto' :
                colleges.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto' :
                  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
              {colleges.map((college) => (
                <div key={college.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/40">
                  <p className="text-xs font-semibold text-foreground flex-1 min-w-0 truncate">{college.tabs?.overview?.about?.name}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" className="gap-1 border-border/50 hover:bg-muted/50 hover:border-primary/50 hover:text-primary transition-all text-[11px] h-8 px-2.5">
                      <ExternalLink className="w-3 h-3" />
                      Details
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all font-semibold text-[11px] h-8 px-2.5">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CollegeNamesContext.Provider>
  );
}

// Expandable Section Component
interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  id?: string;
  className?: string;
  headerClassName?: string;
}

function ExpandableSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
  id,
  className = "",
  headerClassName = ""
}: ExpandableSectionProps) {
  return (
    <Card
      id={id}
      className={`border border-border/40 shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden group ${className}`}
    >
      <CardHeader
        className={`px-3 py-2.5 sm:px-6 sm:py-4 bg-gradient-to-r from-muted/40 via-muted/30 to-background border-b border-border/40 group-hover:border-border/60 transition-colors cursor-pointer ${headerClassName}`}
        onClick={onToggle}
      >
        <h3 className="font-bold text-sm sm:text-lg flex items-center gap-2 sm:gap-2.5 justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              {icon}
            </div>
            <span className="group-hover:text-primary transition-colors truncate">{title}</span>
          </div>
          <button
            className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground transition-transform" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
            )}
          </button>
        </h3>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CardContent className="p-0">
              <div className="divide-y">
                {children}
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

interface ComparisonRowProps {
  label: string;
  values: (string | React.ReactNode)[];
  className?: string;
}

function ComparisonRow({ label, values, className }: ComparisonRowProps) {
  const collegeNames = useContext(CollegeNamesContext);
  return (
    <div className={`flex flex-col md:grid hover:bg-muted/20 transition-all duration-300 group ${className || ''}`} style={{
      gridTemplateColumns: `minmax(180px, 220px) repeat(${values.length}, 1fr)`
    }}>
      <div className="px-3 py-2.5 sm:px-5 sm:py-4 bg-muted/30 font-semibold text-xs sm:text-sm text-foreground flex-shrink-0 border-b md:border-b-0 md:border-r border-border/30">
        {label}
      </div>
      {values.map((value, index) => (
        <div
          key={index}
          className={`px-3 py-2 sm:px-5 sm:py-4 text-xs sm:text-sm text-muted-foreground ${index < values.length - 1 ? 'border-b md:border-b-0 md:border-r border-border/20' : ''}`}
        >
          {/* Mobile college name label */}
          {collegeNames[index] && (
            <span className="md:hidden text-[10px] font-semibold text-primary/80 uppercase tracking-wider block mb-1 truncate">
              {collegeNames[index]}
            </span>
          )}
          <span className="break-words">{value}</span>
        </div>
      ))}
    </div>
  );
}
