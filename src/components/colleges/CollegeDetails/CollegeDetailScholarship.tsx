import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookMarked,
  BookOpen,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardList,
  CreditCard,
  FileText,
  Gift,
  GraduationCap,
  IndianRupee,
  Info,
  Lightbulb,
  Microscope,
  Monitor,
  Rocket,
  TrophyIcon,
  Users,
  UsersIcon,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";
import researchHero from "@/assets/research-innovation-hero.jpg";
import onlineLearning from "@/assets/online-learning.jpg";
import { RenderHTML, hasContent } from "@/utils/htmlContent";
import FAQSection from "./faqSection";
import TableOfContents from "@/utils/toc";
import { Button } from "@/components/ui/button";
import scholarshipsHero from "../../../../public/assets/scholarships-hero.jpg";
import { generateScholarshipsTOC } from "@/utils/tableofContent";
interface ScholarshipTabProps {
  collegeData: CollegeDetail;
  scrollToSection: (id: string) => void;
}

export default function ScholarshipsTab({
  collegeData,
  scrollToSection,
}: ScholarshipTabProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const toggleReadMore = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleRow = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };


  // Get scholarships data from the new API structure
  const scholarshipsData = collegeData.tabs.scholarships;
  const scholarships = scholarshipsData.items || [];
  const faqs = scholarshipsData.faqs || [];
  const intro = scholarshipsData.intro;
  const collegeName = collegeData.tabs.overview.about.name;

  // Check if scholarships exist
  const hasScholarships = scholarships.length > 0;

  // Group scholarships by type (Merit-Based, Government, etc.)
  const groupedByType = hasScholarships
    ? scholarships.reduce((acc, scholarship) => {
      const type = scholarship.scholarship_type || 'Other';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(scholarship);
      return acc;
    }, {} as Record<string, typeof scholarships>)
    : {};

  // Calculate stats
  const scholarshipTypes = Object.keys(groupedByType).length;

  // Find max scholarship amount (parse amounts like "Rs. 75,000" or "₹75K")
  const maxScholarship = hasScholarships
    ? scholarships.reduce((max, s) => {
      if (!s.amount) return max;
      const numMatch = s.amount.replace(/,/g, '').match(/\d+/);
      const num = numMatch ? parseInt(numMatch[0]) : 0;
      return num > max ? num : max;
    }, 0)
    : 0;

  // Format max scholarship for display
  const formatMaxScholarship = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount}`;
  };

  // Check for tuition fee waiver
  const hasTuitionWaiver = hasScholarships && scholarships.some(s =>
    s.benefits?.toLowerCase().includes('tuition') ||
    s.benefits?.toLowerCase().includes('fee waiver') ||
    s.amount?.toLowerCase().includes('waiver')
  );

  // Check if scholarship has expandable details
  const hasDetails = (scholarship: typeof scholarships[0]) => {
    return hasContent(scholarship.eligibility_criteria) ||
      hasContent(scholarship.benefits) ||
      hasContent(scholarship.application_process) ||
      scholarship.income_limit ||
      scholarship.cgpa_requirement ||
      scholarship.renewal_conditions;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero Image Section */}
      <motion.div
        className="relative h-64 rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={scholarshipsHero.src}
          alt="Scholarships"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 flex items-center justify-center">
          <motion.h2
            className="text-3xl font-bold text-white text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Scholarships at {collegeName}
          </motion.h2>
        </div>
      </motion.div>

      {/* Table of Contents */}
      {/* Table of Contents - Dynamic from API */}
      <TableOfContents
        items={generateScholarshipsTOC(collegeData)}
        scrollToSection={scrollToSection}
      />

      {/* Overview Section */}
      <div id="scholarships-overview" className="scroll-mt-24">
        <div className="border-l-4 border-primary pl-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900"> {collegeName} Scholarships</h3>
        </div>
        <p>
          {expandedSections["scholarships-overview"]
            ? collegeData.tabs.scholarships.intro
            : collegeData.tabs.scholarships.intro.slice(0, 150) + "..."}
        </p>


        {!expandedSections['scholarships-overview'] && (
          <button
            onClick={() => toggleReadMore('scholarships-overview')}
            className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
          >
            Read More
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        {expandedSections['scholarships-overview'] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >

            <button
              onClick={() => toggleReadMore('scholarships-overview')}
              className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
            >
              Show Less
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </motion.div>
        )}
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center p-6 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <Gift className="w-10 h-10 mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{scholarshipTypes}+</div>
          <div className="text-sm text-white/80">Scholarship Types</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center p-6 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <TrophyIcon className="w-10 h-10 mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{maxScholarship > 0 ? formatMaxScholarship(maxScholarship) : 'N/A'}</div>
          <div className="text-sm text-white/80">Max Scholarship (Annual)</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center p-6 bg-gradient-to-br from-accent to-accent/80 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <UsersIcon className="w-10 h-10 mx-auto mb-2" />
          <div className="text-3xl font-bold mb-1">{hasTuitionWaiver ? '100%' : 'N/A'}</div>
          <div className="text-sm text-white/80">Tuition Fee Waiver Available</div>
        </motion.div>
      </div>


      {/* Scholarships by Type - HYBRID TABLE FORMAT */}
      {!hasScholarships && (
        <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
          <Gift className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Scholarship Data Available</h4>
          <p className="text-gray-600">
            Scholarship information has not been added for this college yet. Contact the admissions office for current scholarship opportunities.
          </p>
        </div>
      )}

      {hasScholarships && Object.entries(groupedByType).map(([type, typeScholarships]) => {
        const sectionId = `scholarship-${type.toLowerCase().replace(/\s+/g, '-')}`;
        const initialRowCount = 5;
        const isExpanded = expandedSections[sectionId];
        const visibleScholarships = isExpanded ? typeScholarships : typeScholarships.slice(0, initialRowCount);
        const showExpandButton = typeScholarships.length > initialRowCount;

        return (
          <div key={type} id={sectionId} className="scroll-mt-24">
            <div className="border-l-4 border-primary pl-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{type} Scholarships</h3>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Scholarship Name</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Amount (Per Annum)</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 w-20">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visibleScholarships.map((scholarship, idx) => {
                    const rowId = `${sectionId}-${idx}`;
                    const isRowExpanded = expandedRows[rowId];
                    const showDetails = hasDetails(scholarship);

                    return (
                      <>
                        <tr key={rowId} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-900 font-medium">
                            {scholarship.scholarship_name}
                          </td>
                          <td className="px-4 py-3 text-right text-primary font-semibold whitespace-nowrap">
                            {scholarship.amount || '-'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {showDetails && (
                              <button
                                onClick={() => toggleRow(rowId)}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-primary"
                                title={isRowExpanded ? "Hide details" : "View details"}
                              >
                                {isRowExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <Info className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                        {/* Expandable Details Row */}
                        {isRowExpanded && showDetails && (
                          <tr key={`${rowId}-details`} className="bg-gray-50">
                            <td colSpan={3} className="px-4 py-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Eligibility Criteria */}
                                {hasContent(scholarship.eligibility_criteria) && (
                                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <h5 className="font-medium text-gray-900 mb-2 text-sm">Eligibility Criteria</h5>
                                    <RenderHTML
                                      content={scholarship.eligibility_criteria}
                                      className="max-w-none text-gray-700 text-sm"
                                    />
                                  </div>
                                )}

                                {/* Benefits */}
                                {hasContent(scholarship.benefits) && (
                                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                                    <h5 className="font-medium text-gray-900 mb-2 text-sm">Benefits</h5>
                                    <RenderHTML
                                      content={scholarship.benefits}
                                      className="max-w-none text-gray-700 text-sm"
                                    />
                                  </div>
                                )}

                                {/* Application Process */}
                                {hasContent(scholarship.application_process) && (
                                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 md:col-span-2">
                                    <h5 className="font-medium text-gray-900 mb-2 text-sm">How to Apply</h5>
                                    <RenderHTML
                                      content={scholarship.application_process}
                                      className="max-w-none text-gray-700 text-sm"
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Additional Details */}
                              {(scholarship.income_limit || scholarship.cgpa_requirement || scholarship.renewal_conditions) && (
                                <div className="mt-4 flex flex-wrap gap-3">
                                  {scholarship.income_limit && (
                                    <div className="bg-white rounded px-3 py-2 border border-gray-200">
                                      <span className="text-xs text-gray-500 block">Income Limit</span>
                                      <span className="text-sm font-medium text-gray-900">{scholarship.income_limit}</span>
                                    </div>
                                  )}
                                  {scholarship.cgpa_requirement && (
                                    <div className="bg-white rounded px-3 py-2 border border-gray-200">
                                      <span className="text-xs text-gray-500 block">CGPA Required</span>
                                      <span className="text-sm font-medium text-gray-900">{scholarship.cgpa_requirement}</span>
                                    </div>
                                  )}
                                  {scholarship.renewal_conditions && (
                                    <div className="bg-white rounded px-3 py-2 border border-gray-200">
                                      <span className="text-xs text-gray-500 block">Renewal</span>
                                      <span className="text-sm font-medium text-gray-900">{scholarship.renewal_conditions}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>

              {/* View All button for table */}
              {showExpandButton && (
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full px-4 py-3 text-sm text-primary hover:bg-gray-50 flex items-center justify-center gap-2 font-medium transition-colors"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>View All ({typeScholarships.length - initialRowCount} more) <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}
    </motion.div>
  );
}