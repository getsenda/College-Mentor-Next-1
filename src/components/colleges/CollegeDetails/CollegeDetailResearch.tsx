import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ChevronRight,
  FileText,
  Lightbulb,
  Microscope,
  Rocket,
  Users,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";
import researchHero from "../../../../public/assets/research-innovation-hero.jpg";

import { RenderHTML, hasContent } from "@/utils/htmlContent";
import FAQSection from "./faqSection";

interface ResearchInnovationTabProps {
  collegeData: CollegeDetail;
  scrollToSection: (id: string) => void;
}

export default function ResearchInnovationTab({
  collegeData,
}: ResearchInnovationTabProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get research data from the new API structure
  const researchData = collegeData.tabs.research;
  const research = researchData.items || [];
  const faqs = researchData.faqs || [];
  const intro = researchData.intro;
  const collegeName = collegeData.tabs.overview.about.name;

  // Check if research data exists
  const hasResearch = research.length > 0;

  // Extract research centres (unique)
  const researchCentres = hasResearch
    ? research
      .filter(r => r.research_centre_name)
      .reduce((acc, r) => {
        if (!acc.find(c => c.name === r.research_centre_name)) {
          acc.push({
            name: r.research_centre_name,
            description: r.facilities_description,
            domain: r.research_domain,
            areas: r.research_area || [],
          });
        }
        return acc;
      }, [] as Array<{ name: string; description: string; domain: string; areas: string[] }>)
    : [];

  // Extract incubation/innovation centres
  const incubationCentres = hasResearch
    ? research.filter(r =>
      r.research_domain?.toLowerCase().includes('innovation') ||
      r.research_domain?.toLowerCase().includes('entrepreneurship') ||
      r.research_centre_name?.toLowerCase().includes('incubation') ||
      r.research_centre_name?.toLowerCase().includes('startup') ||
      r.research_centre_name?.toLowerCase().includes('launchpad')
    )
    : [];

  // Extract patents
  const patents = hasResearch
    ? research.filter(r => r.patent_title && r.patent_title.trim() !== '')
    : [];

  // Calculate stats
  const totalResearchCentres = researchCentres.length;
  const totalPatents = patents.length;
  const targetStartups = research.reduce((sum, r) => {
    const startups = r.research_details_json?.target_startups ||
      r.research_details_json?.current_startups || 0;
    if (typeof startups === 'string' && startups.includes('+')) {
      return sum + parseInt(startups.replace('+', '')) || sum;
    }
    return sum + (parseInt(startups) || 0);
  }, 0);
  const launchpadTeams = research.reduce((sum, r) => {
    return sum + (r.research_details_json?.launchpad_teams || 0);
  }, 0);

  // Show limited centres initially
  const visibleCentresCount = 6;
  const showMoreCentres = expandedSections['centres'];
  const visibleCentres = showMoreCentres ? researchCentres : researchCentres.slice(0, visibleCentresCount);

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
        <img src={researchHero.src} alt="Research & Innovation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-1">Research & Innovation</h2>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats - Only show if we have actual data */}
      {(totalResearchCentres > 0 || totalPatents > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            totalResearchCentres > 0 && {
              value: totalResearchCentres.toString(),
              label: 'Research Centers',
              icon: Building2,
              bgColor: 'bg-[#3366CC]',
            },
            totalPatents > 0 && {
              value: totalPatents.toString(),
              label: 'Patents',
              icon: FileText,
              bgColor: 'bg-[#00A86B]',
            },
            targetStartups > 0 && {
              value: `${targetStartups}+`,
              label: 'Target Startups',
              icon: Rocket,
              bgColor: 'bg-[#40B5AD]',
            },
            launchpadTeams > 0 && {
              value: launchpadTeams.toString(),
              label: 'LaunchPad Teams',
              icon: Users,
              bgColor: 'bg-[#5B7FBD]',
            },
          ].filter(Boolean).map((stat, index) => (
            <motion.div
              key={index}
              className={`${(stat as any).bgColor} rounded-xl p-5 text-center text-white`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                {(() => {
                  const Icon = (stat as any).icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <div className="text-2xl font-bold mb-1">{(stat as any).value}</div>
              <div className="text-sm text-white/90">{(stat as any).label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Research Intro Section */}
      <div id="research-intro" className="scroll-mt-24">
        <div className="border-l-4 border-primary pl-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{collegeName} Research</h3>
        </div>

        {hasContent(intro) && (
          <>
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
          </>
        )}
      </div>

      {/* Research and Innovation Centres - Simple cards like reference */}
      {researchCentres.length > 0 && (
        <div id="research-centres" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Research and Innovation Centres</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {visibleCentres.map((centre, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                    {centre.name}
                  </h4>
                  {centre.areas.length > 0 && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {centre.areas.join(' • ')}
                    </p>
                  )}
                  {centre.description && !centre.areas.length && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {centre.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {researchCentres.length > visibleCentresCount && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => toggleSection('centres')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                {showMoreCentres ? 'Show Less Centers' : 'Read More Centers'}
                <ChevronRight className={`w-4 h-4 transition-transform ${showMoreCentres ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Incubation Facilities */}
      {incubationCentres.length > 0 && (
        <div id="incubation-facilities" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Incubation Facilities</h3>
          </div>

          <div className="space-y-4">
            {incubationCentres.map((centre, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {centre.research_centre_name || centre.research_domain}
                  </h4>
                </div>

                {centre.facilities_description && (
                  <p className="text-gray-600 text-sm mb-3">
                    {centre.facilities_description}
                  </p>
                )}

                {/* Support/details from JSON */}
                {centre.research_details_json?.support_provided && (
                  <p className="text-primary text-sm font-medium">
                    {centre.research_details_json.support_provided}
                  </p>
                )}
                {centre.research_details_json?.target_startups && (
                  <p className="text-primary text-sm font-medium mt-1">
                    Target: {centre.research_details_json.target_startups} companies
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Top Patents Section - 2 column grid like reference */}
      {patents.length > 0 && (
        <div id="patents" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Top {patents.length} Patents Granted
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {(expandedSections['patents'] ? patents : patents.slice(0, 10)).map((patent, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <span className="flex-shrink-0 w-7 h-7 bg-primary text-white text-sm font-medium rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-900 text-sm">{patent.patent_title}</p>
              </motion.div>
            ))}
          </div>

          {patents.length > 10 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => toggleSection('patents')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                {expandedSections['patents'] ? 'Show Less' : `View All ${patents.length} Patents`}
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedSections['patents'] ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Data State */}
      {!hasResearch && (
        <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
          <Microscope className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Research Data Available</h4>
          <p className="text-gray-600">
            Research information has not been added for this college yet.
          </p>
        </div>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}
    </motion.div>
  );
}