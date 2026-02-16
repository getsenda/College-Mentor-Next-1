import { useRef, useState } from 'react';
import {

    Award,
    BookMarked,
    BookOpen,
    BriefcaseIcon,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    CreditCard,
    FileCheck,
    FileText,
    Globe2,
    GraduationCap,
    HelpCircle,
    PhoneCall,
    Plane,
    School,
    Scissors,
    ScrollText,
    TrendingUp,
    Trophy,

} from 'lucide-react';

import { CollegeDetail } from '@/services/collegeService';

import { motion } from 'framer-motion';
import { generateCutoffTOC } from '@/utils/tableofContent';
import { toSlug } from '@/utils/slug';
import FAQSection from './faqSection';



interface CutoffTabProps {
    collegeData: CollegeDetail;
    scrollToSection: (id: string) => void;
}


export default function CutoffTab({
    collegeData,
    scrollToSection,
}: CutoffTabProps) {

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    // Get cutoff data from the new API structure
    const cutoffData = collegeData.tabs.cutoff;
    const cutoffs = cutoffData.items || [];
    const faqs = cutoffData.faqs || [];
    const intro = cutoffData.intro;
    const collegeName = collegeData.tabs.overview.about.name;

    // Check if cutoffs exist
    const hasCutoffs = cutoffs.length > 0;

    // Group cutoffs by exam_name
    const groupedCutoffs = hasCutoffs
        ? cutoffs.reduce((acc, cutoff) => {
            const exam = cutoff.exam_name || 'Other';
            if (!acc[exam]) {
                acc[exam] = [];
            }
            acc[exam].push(cutoff);
            return acc;
        }, {} as Record<string, typeof cutoffs>)
        : {};

    // Get unique years for stats
    const years = hasCutoffs ? [...new Set(cutoffs.map(c => c.year))] : [];
    const latestYear = years.length > 0 ? Math.max(...years.filter(y => y)) : new Date().getFullYear();
    const tocItems = generateCutoffTOC(collegeData);
    const toggleReadMore = (key: string) => {
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const cutoffItems = collegeData.tabs?.cutoff?.items || [];

    const cutoffsByExam = cutoffItems.reduce<Record<string, any[]>>(
        (acc, item) => {
            if (!acc[item.exam_name]) {
                acc[item.exam_name] = [];
            }
            acc[item.exam_name].push(item);
            return acc;
        },
        {}
    );


    const normalizeCutoffData = (items: any[]) => {
        return Object.values(
            items.reduce<Record<number, any>>((acc, item) => {
                if (!acc[item.year]) {
                    acc[item.year] = {
                        year: item.year,
                        Course: item.course_name || "-",
                        General: "-",
                        OBC: "-",
                        "SC/ST": "-",
                        remarks: item.cutoff_details_json?.remarks || "",
                    };
                }

                acc[item.year][item.category] = item.cutoff_marks;
                return acc;
            }, {})
        ).sort((a, b) => b.year - a.year);
    };

    return (


        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Table of Contents */}
            {/* Application Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                    { value: hasCutoffs ? Object.keys(groupedCutoffs).length.toString() : '0', label: 'Entrance Exam', icon: FileText },
                    { value: hasCutoffs ? cutoffs.length.toString() : '0', label: 'Total Cutoffs', icon: Scissors },
                    { value: latestYear.toString(), label: 'Last Year', icon: TrendingUp },
                    { value: hasCutoffs ? [...new Set(cutoffs.map(c => c.category))].length.toString() : '0', label: 'Catergories', icon: ScrollText },

                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg text-center border border-primary/20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                    >
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-primary" />
                        <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">
                            {Number(stat.value) >= 1000 ? `${(Number(stat.value) / 1000).toFixed(0)}K` : stat.value}{stat.label === 'Success Rate' ? '%' : ""}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Table of Contents */}
            {tocItems.length > 0 && (
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Table of Contents
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tocItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-left px-4 py-2 rounded-md hover:bg-primary/10 transition-all duration-300 text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group hover:scale-[1.02]"
                            >
                                <item.icon className="w-4 h-4 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                                <span className="flex-1">{item.title}</span>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </button>
                        ))}
                    </div>
                </div>
            )}


            {/* Main Heading */}
            <div id="cutoff-overview" className="border-l-4 border-primary pl-4">
                <h2 className="text-2xl font-bold text-foreground">{collegeName} Cutoff</h2>
            </div>

            {/* Overview Section */}
            <div className="space-y-4">
                <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                        {expandedSections["cutoff-overview"]
                            ? collegeData.tabs.cutoff.intro
                            : collegeData.tabs.cutoff.intro.slice(0, 150) + "..."}
                    </p>


                    {!expandedSections['cutoff-overview'] && (
                        <button
                            onClick={() => toggleReadMore('cutoff-overview')}
                            className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                        >
                            Read More
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                    {expandedSections['cutoff-overview'] && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4"
                        >

                            <button
                                onClick={() => toggleReadMore('cutoff-overview')}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                            >
                                Show Less
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* JEE Main Cutoff */}



            {Object.entries(cutoffsByExam).map(([examName, examItems]) => {
                const tableData = normalizeCutoffData(examItems);

                const sectionId = `${toSlug(examName)}-cutoff`;
                const isExpanded = expandedSections[examName];
                const visibleData = isExpanded ? tableData : tableData.slice(0, 3);
                const remainingCount = tableData.length - 3;

                return (
                    <div
                        key={examName}
                        id={sectionId}
                        className="scroll-mt-24 space-y-4"
                    >
                        {/* Heading */}
                        <div className="border-l-4 border-primary pl-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {collegeName} {examName} Cutoff
                            </h3>
                        </div>

                        {/* Table */}
                        <div className="border border-gray-200 rounded-lg overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">General</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">OBC</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SC/ST</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Remarks</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {visibleData.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-700">{row.year}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{row.Course}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{row.General}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{row.OBC}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{row["SC/ST"]}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{row.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Read More / Show Less */}
                        {!isExpanded && remainingCount > 0 && (
                            <button
                                onClick={() => toggleReadMore(examName)}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                            >
                                Read More ({remainingCount} more years)
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}

                        {isExpanded && (
                            <button
                                onClick={() => toggleReadMore(examName)}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                            >
                                Show Less
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                        )}
                    </div>
                );
            })}





            {faqs.length > 0 && (
                <div id="faqs" className="mt-8 scroll-mt-24">
                    <FAQSection faqs={faqs} />
                </div>
            )}


        </motion.div>

    );
}