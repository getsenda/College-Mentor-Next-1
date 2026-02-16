import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  Users,
  DollarSign,
  Building2,
  Award,
  Calendar,
  Target,
  Globe,
  ChevronRight,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";


import { RenderHTML, hasContent } from "@/utils/htmlContent";
import { generatePlacementsTOC } from "@/utils/tableofContent";
import TableOfContents from "@/utils/toc";
import FAQSection from "./faqSection";

import placementsHero from "../../../../public/assets/placements-hero.jpg";
interface PlacementsTabProps {
  collegeData: CollegeDetail;
  scrollToSection: (id: string) => void;
}

export default function PlacementsTab({
  collegeData,
  scrollToSection,
}: PlacementsTabProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get placements data from the new API structure
  const placementsData = collegeData.tabs.placements;
  const placements = placementsData.items || [];
  const faqs = placementsData.faqs || [];
  const latestStats = placementsData.latest_stats;
  const placementProcess = placementsData.placement_process;
  const summerInternshipsIntro = placementsData.summer_internships_intro;
  const intro = placementsData.intro;
  const collegeName = collegeData.tabs.overview.about.name;

  // Check if placements exist
  const hasPlacements = placements.length > 0;
  const placementData = hasPlacements ? placements[0] : null;

  // Top recruiters - collect from ALL placement items and deduplicate
  const topRecruiters = Array.from(new Set(
    placements.flatMap(p =>
      Array.isArray(p.top_recruiters) ? p.top_recruiters.filter((r: string) => r && r.trim()) : []
    )
  ));

  // Get branch-wise stats
  const branchStats = placementData?.branch_wise_stats_json || [];

  // Get internship stats - consolidate all objects into one since API sends sparse objects
  const rawInternshipStats = placementData?.internship_stats_json || [];

  // Merge all internship stat objects into one - only keep first non-empty value for each key
  const consolidatedInternship = rawInternshipStats.reduce((acc: Record<string, string>, item: Record<string, string>) => {
    Object.entries(item).forEach(([key, value]) => {
      // Only set if we don't already have a value for this key (avoid duplicates/merging)
      if (value && value.trim && value.trim() && !acc[key]) {
        acc[key] = value;
      }
    });
    return acc;
  }, {} as Record<string, string>);

  // Check if we have any internship data beyond just description (which is already in summerInternshipsIntro)
  const internshipDataKeys = Object.keys(consolidatedInternship).filter(k => k !== 'description');
  const hasInternshipData = internshipDataKeys.length > 0;

  // Generate dynamic TOC
  const tocItems = generatePlacementsTOC(collegeData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Hero Image */}
      <motion.div
        className="relative h-64 rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <img src={placementsHero.src} alt="Placements" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-1">Placements</h2>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            displayValue: placementData?.placement_rate || latestStats?.placement_rate || 'N/A',
            label: 'Placement Rate',
            bgColor: '#3B82F6',
            icon: TrendingUp,
          },
          {
            displayValue: placementData?.highest_package || latestStats?.highest_package || 'N/A',
            label: 'Highest Package',
            bgColor: '#10B981',
            icon: DollarSign,
          },
          {
            displayValue: placementData?.average_package || latestStats?.average_package || 'N/A',
            label: 'Average Package',
            bgColor: '#F59E0B',
            icon: Award,
          },
          {
            displayValue: placementData?.number_of_recruiters?.toString() || latestStats?.number_of_recruiters?.toString() || '0',
            label: 'Recruiters',
            bgColor: '#8B5CF6',
            icon: Building2,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: stat.bgColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="w-12 h-12 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold mb-1 text-white">
              {stat.displayValue}
            </div>
            <div className="text-sm text-white/90">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Table of Contents */}
      {tocItems.length > 0 && (
        <TableOfContents items={tocItems} scrollToSection={scrollToSection} />
      )}

      {/* Placements Intro */}
      {hasContent(intro) && (
        <div id="placements-intro" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{collegeName} Placements</h3>
          </div>
          <div className={`text-gray-700 leading-relaxed ${!expandedSections['intro'] ? 'line-clamp-4' : ''}`}>
            <RenderHTML
              content={intro}
              className="max-w-none text-gray-700"
            />
          </div>
          <button
            onClick={() => toggleSection('intro')}
            className="mt-3 text-primary font-medium flex items-center gap-1 hover:underline"
          >
            {expandedSections['intro'] ? 'Show Less' : 'Read More'}
            <ChevronRight className={`w-4 h-4 transition-transform ${expandedSections['intro'] ? 'rotate-90' : ''}`} />
          </button>
        </div>
      )}

      {/* Placement Statistics */}
      <div id="placement-stats" className="scroll-mt-24">
        <div className="border-l-4 border-primary pl-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Placement Statistics</h3>
        </div>

        {!hasPlacements && (
          <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No Placement Data Available</h4>
            <p className="text-gray-600">
              Placement information has not been added for this college yet.
            </p>
          </div>
        )}

        {hasPlacements && placementData && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {placementData.placement_year} Placement Report
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Programme: {placementData.programme_type}
              </p>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Total Students Placed</span>
                  <span className="text-gray-900 font-semibold">{placementData.total_students_placed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Placement Rate</span>
                  <span className="text-primary font-semibold">{placementData.placement_rate}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Number of Offers</span>
                  <span className="text-gray-900 font-semibold">{placementData.number_of_offers}</span>
                </div>
                {placementData.ppos && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">PPOs</span>
                    <span className="text-gray-900 font-semibold">{placementData.ppos}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Highest Package</span>
                  <span className="text-green-600 font-semibold">{placementData.highest_package}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Average Package</span>
                  <span className="text-gray-900 font-semibold">{placementData.average_package}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Median Package</span>
                  <span className="text-gray-900 font-semibold">{placementData.median_package}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Placement Process */}
      {hasContent(placementProcess) && (
        <div id="placement-process" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Placement Process</h3>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="text-gray-700 leading-relaxed">
              <RenderHTML
                content={placementProcess}
                className="max-w-none text-gray-700"
              />
            </div>
          </div>
        </div>
      )}

      {/* Top Recruiters */}
      {topRecruiters.length > 0 && (
        <div id="top-recruiters" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Top Recruiters</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Leading companies that recruit from {collegeName}.
          </p>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topRecruiters.map((recruiter, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary/5 hover:border-primary border border-transparent transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{recruiter}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Branch-wise Placements */}
      {branchStats.length > 0 && (
        <div id="branch-wise" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Branch-wise Placements</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Placement statistics categorized by branches/departments.
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-[40%] px-6 py-4 text-left font-semibold text-gray-900">Branch</th>
                  <th className="w-[15%] px-4 py-4 text-center font-semibold text-gray-900 whitespace-nowrap">Placement&nbsp;%</th>
                  <th className="w-[20%] px-4 py-4 text-center font-semibold text-gray-900 whitespace-nowrap">Highest&nbsp;Package</th>
                  <th className="w-[25%] px-4 py-4 text-center font-semibold text-gray-900 whitespace-nowrap">Average&nbsp;Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {branchStats.map((branch, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{branch.branch}</p>
                        {branch.note && (
                          <p className="text-xs text-gray-500 mt-1">{branch.note}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {branch.placement_percentage ? (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-primary/10 text-primary">
                          {branch.placement_percentage}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-green-600">
                      {branch.highest_package || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-4 py-4 text-center font-medium text-gray-700">
                      {branch.average_package || <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summer Internships Intro */}
      {hasContent(summerInternshipsIntro) && (
        <div id="internships" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Internship Opportunities</h3>
          </div>
          <RenderHTML
            content={summerInternshipsIntro}
            className="max-w-none text-gray-700 leading-relaxed"
          />
        </div>
      )}

      {/* Internship Stats - show if no summer_internships_intro but has internship data */}
      {!hasContent(summerInternshipsIntro) && hasInternshipData && (
        <div id="internships" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Internship Opportunities</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Details about internship programs and opportunities available to students.
          </p>
        </div>
      )}

      {/* Internship Stats - Single Consolidated Card (only show if we have actual stats data) */}
      {hasInternshipData && (
        <div className="border border-gray-200 rounded-lg p-6">
          {/* Description - only show if we don't already have summerInternshipsIntro */}
          {!hasContent(summerInternshipsIntro) && consolidatedInternship.description && (
            <p className="text-gray-700 mb-4">{consolidatedInternship.description}</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {consolidatedInternship.internship_availability && (
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Availability</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.internship_availability}</p>
                  </div>
                </div>
              )}
              {consolidatedInternship.percentage_getting_internships && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Success Rate</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.percentage_getting_internships}</p>
                  </div>
                </div>
              )}
              {consolidatedInternship.stipend_range && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Stipend Range</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.stipend_range}</p>
                  </div>
                </div>
              )}
              {consolidatedInternship.internship_areas && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Internship Areas</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.internship_areas}</p>
                  </div>
                </div>
              )}
              {consolidatedInternship.training_modules && (
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Training Modules</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.training_modules}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {consolidatedInternship.ppo_conversion && (
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">PPO Conversion</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.ppo_conversion}</p>
                  </div>
                </div>
              )}
              {consolidatedInternship.ppo_opportunities && (
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">PPO Opportunities</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.ppo_opportunities}</p>
                  </div>
                </div>
              )}
              {consolidatedInternship.international_opportunities && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">International Opportunities</p>
                    <p className="text-gray-700 text-sm">{consolidatedInternship.international_opportunities}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {consolidatedInternship.companies_offering_internships && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-medium text-gray-900 text-sm mb-2">Companies Offering Internships</p>
              <p className="text-gray-700 text-sm">{consolidatedInternship.companies_offering_internships}</p>
            </div>
          )}
        </div>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}
    </motion.div>
  );
}