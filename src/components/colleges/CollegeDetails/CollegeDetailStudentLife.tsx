import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ChevronRight,
  ChevronDown,
  Newspaper,
  Cog,
  BookOpen,
  PenTool,
  Calculator,
  Palette,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";
import campusLifeHero from "../../../../public/assets/campus-life-hero.jpg";

import { RenderHTML, hasContent } from "@/utils/htmlContent";
import TableOfContents from "@/utils/toc";
import { generateCampusLifeTOC } from "@/utils/tableofContent";
import FAQSection from "./faqSection";

interface CampusLifeTabProps {
  collegeData: CollegeDetail;
  scrollToSection: (id: string) => void;
}

// Parse club names from details text
function parseClubNames(details: string): string[] {
  if (!details) return [];

  // Strip HTML tags
  const plainText = details.replace(/<[^>]*>/g, '');

  // Look for club names - common patterns like "Club Name, Another Club" or listed items
  const clubs: string[] = [];

  // Split by common separators and filter
  const segments = plainText.split(/[,;.]/).map(s => s.trim());

  segments.forEach(segment => {
    // Look for items that contain "Club" or common club types
    if (segment.length > 3 && segment.length < 60) {
      // Check if it looks like a club name
      if (/club|society|cell|chapter|branch|association/i.test(segment)) {
        clubs.push(segment);
      }
    }
  });

  // Return unique clubs, max 12 for display
  return [...new Set(clubs)].slice(0, 12);
}

// Club icon mapping
const clubIcons = [Newspaper, Cog, BookOpen, PenTool, Calculator, Palette];

// Item type for campus life
type CampusLifeItem = {
  type: string;
  name: string;
  intro: string;
  details: string;
  additional_info_json: Record<string, any>;
};

export default function CampusLifeTab({
  collegeData,
  scrollToSection,
}: CampusLifeTabProps) {
  // Get campus life data from the new API structure
  const campusLifeData = collegeData.tabs.campus_life;
  const items = campusLifeData.items || [];
  const faqs = campusLifeData.faqs || [];
  const collegeName = collegeData.tabs.overview.about.name;

  // Group items by type (supports multiple items per type)
  const itemsByType = items.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, CampusLifeItem[]>);

  // Helper to get items with content for a type
  const getItemsWithContent = (type: string): CampusLifeItem[] => {
    return (itemsByType[type] || []).filter(item => hasContent(item.intro) || hasContent(item.details));
  };

  // Check if we have any campus life content
  const hasCampusLifeContent = items.length > 0;

  // Get items with content for each type
  const campusLifeItems = getItemsWithContent('campus_life');
  const studentClubsItems = getItemsWithContent('student_clubs');
  const festItems = getItemsWithContent('fest');
  const techFestsItems = getItemsWithContent('tech_fests');
  const counsellingItems = getItemsWithContent('counselling');

  // Parse club names from all student clubs items
  const clubNames = studentClubsItems.reduce((acc, item) => {
    if (item.details) {
      acc.push(...parseClubNames(item.details));
    }
    return acc;
  }, [] as string[]);
  const uniqueClubNames = [...new Set(clubNames)].slice(0, 12);

  // Expand/collapse state for Read More sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Render a single item's content
  const renderItemContent = (item: CampusLifeItem, sectionKey: string, showName: boolean = false) => (
    <div key={`${item.type}-${item.name}`} className="space-y-4">
      {showName && item.name && (
        <h4 className="font-medium text-gray-900">{item.name}</h4>
      )}
      {hasContent(item.intro) && (
        <div className="text-gray-700 leading-relaxed">
          <RenderHTML
            content={item.intro}
            className="max-w-none text-gray-700"
          />
        </div>
      )}
      {hasContent(item.details) && (
        <>
          <div className={`text-gray-700 leading-relaxed ${!expandedSections[sectionKey] ? 'line-clamp-4' : ''}`}>
            <RenderHTML
              content={item.details}
              className="max-w-none text-gray-700"
            />
          </div>
          <button
            onClick={() => toggleSection(sectionKey)}
            className="text-primary font-medium flex items-center gap-1 hover:underline"
          >
            {expandedSections[sectionKey] ? 'Show Less' : 'Read More'}
            <ChevronRight className={`w-4 h-4 transition-transform ${expandedSections[sectionKey] ? 'rotate-90' : ''}`} />
          </button>
        </>
      )}
    </div>
  );

  // Render multiple items for a section
  const renderMultipleItems = (items: CampusLifeItem[], sectionKey: string) => {
    if (items.length === 1) {
      return renderItemContent(items[0], sectionKey, false);
    }
    return (
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            {renderItemContent(item, `${sectionKey}-${idx}`, true)}
          </div>
        ))}
      </div>
    );
  };

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
        <img src={campusLifeHero.src} alt="Campus Life" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-1">Student & Campus Life</h2>
          </div>
        </div>
      </motion.div>

      {/* Table of Contents */}
      <TableOfContents
        items={generateCampusLifeTOC(collegeData)}
        scrollToSection={scrollToSection}
      />

      {/* Campus Life Overview Section */}
      {campusLifeItems.length > 0 && (
        <div id="campus-life-intro" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Student Life</h3>
          </div>
          {renderMultipleItems(campusLifeItems, 'studentLife')}
        </div>
      )}

      {/* Student Clubs Section */}
      {studentClubsItems.length > 0 && (
        <div id="student-clubs" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Student Clubs</h3>
          </div>

          {/* Show intro from first item */}
          {hasContent(studentClubsItems[0].intro) && (
            <div className="text-gray-700 leading-relaxed mb-6">
              <RenderHTML
                content={studentClubsItems[0].intro}
                className="max-w-none text-gray-700"
              />
            </div>
          )}

          {/* Club Cards - 3 column grid */}
          {uniqueClubNames.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {uniqueClubNames
                  .slice(0, expandedSections['clubs'] ? undefined : 6)
                  .map((club, idx) => {
                    const IconComponent = clubIcons[idx % clubIcons.length];
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-primary/30 transition-colors"
                      >
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-gray-900 font-medium text-sm">{club}</span>
                      </div>
                    );
                  })}
              </div>

              {uniqueClubNames.length > 6 && (
                <button
                  onClick={() => toggleSection('clubs')}
                  className="text-primary font-medium flex items-center gap-1 hover:underline"
                >
                  {expandedSections['clubs'] ? 'Show Less Clubs' : `View All ${uniqueClubNames.length} Clubs`}
                  {expandedSections['clubs'] ? <ChevronDown className="w-4 h-4 rotate-180" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
            </>
          )}

          {/* Full club details - expandable */}
          {uniqueClubNames.length === 0 && studentClubsItems.some(item => hasContent(item.details)) && (
            <>
              <div className={`text-gray-700 leading-relaxed ${!expandedSections['clubDetails'] ? 'line-clamp-4' : ''}`}>
                {studentClubsItems.map((item, idx) => (
                  hasContent(item.details) && (
                    <RenderHTML
                      key={idx}
                      content={item.details}
                      className="max-w-none text-gray-700"
                    />
                  )
                ))}
              </div>
              <button
                onClick={() => toggleSection('clubDetails')}
                className="mt-3 text-primary font-medium flex items-center gap-1 hover:underline"
              >
                {expandedSections['clubDetails'] ? 'Show Less' : 'Read More'}
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedSections['clubDetails'] ? 'rotate-90' : ''}`} />
              </button>
            </>
          )}

          {/* Additional club details when clubs are shown */}
          <AnimatePresence>
            {expandedSections['clubs'] && studentClubsItems.some(item => hasContent(item.details)) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                {studentClubsItems.map((item, idx) => (
                  hasContent(item.details) && (
                    <RenderHTML
                      key={idx}
                      content={item.details}
                      className="max-w-none text-gray-700"
                    />
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Fests Section */}
      {festItems.length > 0 && (
        <div id="fests" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Festivals</h3>
          </div>
          {renderMultipleItems(festItems, 'fests')}
        </div>
      )}

      {/* Tech Fests Section */}
      {techFestsItems.length > 0 && (
        <div id="tech-fests" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Tech Fest</h3>
          </div>
          {renderMultipleItems(techFestsItems, 'techFests')}
        </div>
      )}

      {/* Counselling Services Section */}
      {counsellingItems.length > 0 && (
        <div id="counselling" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Counselling Services</h3>
          </div>
          {renderMultipleItems(counsellingItems, 'counselling')}
        </div>
      )}

      {/* No Content Message */}
      {!hasCampusLifeContent && (
        <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Campus Life Data Available</h4>
          <p className="text-gray-600">
            Campus life information for {collegeName} is not currently available. Please check back later.
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