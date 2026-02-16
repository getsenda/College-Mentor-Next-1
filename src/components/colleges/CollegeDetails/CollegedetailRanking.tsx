import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  TrendingUp,
  Calendar,
  Shield,
  Medal,
  ChevronRight,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Globe,
  Star,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";
import rankingHero from "../../../assets/admission-process.jpg";
import rankingsHero from "../../../../public/assets/rankings-hero.jpg";
import { RenderHTML, hasContent } from "@/utils/htmlContent";
import TableOfContents from "@/utils/toc";
import { generateRankingsTOC } from "@/utils/tableofContent";
import FAQSection from "./faqSection";
import { Badge } from "@/components/ui/badge";

interface RankingsTabProps {
  collegeData: CollegeDetail;
  scrollToSection: (id: string) => void;
}

export default function RankingsTab({
  collegeData,
  scrollToSection,
}: RankingsTabProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get rankings data from the new API structure
  const rankingsData = collegeData.tabs.rankings;
  const allRankings = rankingsData.items || [];
  const allAccreditations = rankingsData.accreditations || [];
  const faqs = rankingsData.faqs || [];
  const intro = rankingsData.intro;
  const collegeName = collegeData.tabs.overview.about.name;

  // Filter out rankings that don't have actual numeric ranking data
  // Excludes entries like "Not ranked yet (new institution)"
  const rankings = allRankings.filter(r => {
    if (!r.year || !r.rank || !r.category) return false;
    // Check if rank starts with a number (e.g., "1", "10", "101-150")
    const rankStr = String(r.rank).trim();
    return /^\d/.test(rankStr);
  });

  const toggleReadMore = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // Filter out accreditations that don't have meaningful data
  const accreditations = allAccreditations.filter(a => a.type && (a.grade || a.status || a.score));

  // Check if rankings exist
  const hasRankings = rankings.length > 0;

  // Group rankings by ranking_name
  const groupedRankings = hasRankings
    ? rankings.reduce((acc, ranking) => {
      const name = ranking.ranking_name || 'Other';
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push(ranking);
      return acc;
    }, {} as Record<string, typeof rankings>)
    : {};

  // Get unique years and latest year
  const years = hasRankings ? [...new Set(rankings.map(r => r.year))] : [];
  const latestYear = years.length > 0 ? Math.max(...years.filter(y => y)) : new Date().getFullYear();

  // Check if accreditations exist
  const hasAccreditations = accreditations.length > 0;

  // Check for recognitions from ALL ranking items (including ones without rank data)
  // because accreditation/recognition info may be stored in items without actual rankings
  const hasRecognitions = allRankings.some(r =>
    (r.accreditations_list && r.accreditations_list.length > 0) ||
    (r.recognitions_list && r.recognitions_list.length > 0)
  );

  // Collect all recognitions from ALL items (not just filtered rankings)
  const allRecognitions: string[] = [];
  const allAccreditationsList: string[] = [];
  allRankings.forEach(r => {
    if (r.recognitions_list) allRecognitions.push(...r.recognitions_list);
    if (r.accreditations_list) allAccreditationsList.push(...r.accreditations_list);
  });

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
        <img src={rankingsHero.src} alt="GLA University Rankings and Accreditations" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <motion.h2
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Rankings & Accreditations
            </motion.h2>
            <motion.p
              className="text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Recognized Excellence and National Rankings
            </motion.p>
          </div>
        </div>
      </motion.div>



      {/* Table of Contents - Dynamic from API */}
      <TableOfContents
        items={generateRankingsTOC(collegeData)}
        scrollToSection={scrollToSection}
      />

      {/* NIRF Rankings Section */}
      <div id="nirf-rankings" className="scroll-mt-24">
        <div className="border-l-4 border-primary pl-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{collegeName} Rankings</h3>
        </div>
        <p>
          {expandedSections["nirf-rankings"]
            ? collegeData.tabs.cutoff.intro
            : collegeData.tabs.cutoff.intro.slice(0, 150) + "..."}
        </p>


        {!expandedSections['nirf-rankings'] && (
          <button
            onClick={() => toggleReadMore('nirf-rankings')}
            className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
          >
            Read More
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        {expandedSections['nirf-rankings'] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >

            <button
              onClick={() => toggleReadMore('nirf-rankings')}
              className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
            >
              Show Less
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </motion.div>
        )}
      </div>


      {/* Rankings Information */}
      <div id="rankings" className="scroll-mt-24">
        <div className="border-l-4 border-primary pl-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{collegeName} Rankings</h3>
        </div>
        <p className="text-gray-700 mb-6">
          {hasRankings
            ? `${collegeName} has been ranked by ${Object.keys(groupedRankings).length} different ranking bodies. Review the rankings across various years and categories below.`
            : `Ranking information for ${collegeName} is not currently available. Please check back later for updated rankings.`}
        </p>

        {!hasRankings && (
          <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No Ranking Data Available</h4>
            <p className="text-gray-600">
              Ranking information has not been added for this college yet.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {hasRankings && Object.entries(groupedRankings).map(([name, rankings]) => (
            <div key={name} id={name.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Ranking Body Header */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    {name} Rankings
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {rankings.length} ranking{rankings.length !== 1 ? 's' : ''} available
                  </p>
                </div>

                {/* Rankings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">Year</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">Rank</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                        {rankings.some(r => r.score) && (
                          <th className="px-4 py-3 text-center font-semibold text-gray-900">Score</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rankings
                        .sort((a, b) => b.year - a.year)
                        .map((ranking, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-center font-medium text-gray-900">{ranking.year}</td>
                            <td className="px-4 py-3 text-gray-700">{ranking.category}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                                #{ranking.rank}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-700">{ranking.ranking_type}</td>
                            {rankings.some(r => r.score) && (
                              <td className="px-4 py-3 text-center text-gray-700">
                                {ranking.score || '-'}
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditations Section */}
      {hasAccreditations && (
        <div id="accreditations" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Accreditations</h3>
          </div>
          <p className="text-gray-700 mb-6">
            {collegeName} has received accreditations from recognized bodies ensuring quality education standards.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {accreditations.map((accreditation, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg mb-1">
                      {accreditation.type}
                    </h4>
                    {accreditation.grade && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Grade:</span> {accreditation.grade}
                      </p>
                    )}
                    {accreditation.status && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Status:</span> {accreditation.status}
                      </p>
                    )}
                    {accreditation.score && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Score:</span> {accreditation.score}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recognitions Section - from rankings data */}
      {hasRecognitions && (
        <div id="recognitions" className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Recognitions</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Additional accreditations and recognitions received by {collegeName}.
          </p>

          <div className="grid md:grid-cols-1 gap-6">
            {/* Accreditations List */}
            {allAccreditationsList.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Programme Accreditations
                </h5>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[...new Set(allAccreditationsList)].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <Medal className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {/* Recognitions List */}
            {allRecognitions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-blue-600" />
                  Other Recognitions
                </h5>
                <ul className="space-y-2">
                  {[...new Set(allRecognitions)].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <Award className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ranking Trends (if we have multiple years) */}
      {hasRankings && years.length > 1 && (
        <div className="scroll-mt-24">
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Ranking Trends</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Historical ranking performance of {collegeName} across different ranking bodies.
          </p>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-gray-900">Year-wise Rankings</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(groupedRankings).map(([name, rankings]) => {
                const sortedRankings = [...rankings].sort((a, b) => b.year - a.year);
                const latest = sortedRankings[0];
                const oldest = sortedRankings[sortedRankings.length - 1];

                return (
                  <div key={name} className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="font-medium text-gray-900 mb-2">{name}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-gray-600">{latest.year}</p>
                        <p className="font-semibold text-primary">#{latest.rank}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600">{oldest.year}</p>
                        <p className="font-semibold text-gray-700">#{oldest.rank}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} />
      )}
    </motion.div>
  );
}