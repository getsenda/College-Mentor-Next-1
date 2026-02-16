'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Award,
    TrendingUp,
    Building2,
    BookOpen,
    Sparkles,
    Globe2,
    Handshake,
    PhoneCall,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    HelpCircle,
} from 'lucide-react';
import overviewCampus from "../../../../public/assets/overview-campus.jpg";

import RenderHTML, { hasContent } from '@/utils/htmlContent';
import FAQSection from './faqSection';
import { questions } from '@/components/data/Questions';
import { generateOverviewTOC } from '@/utils/tableofContent';
import { CollegeDetail } from '@/components/data/collegedetail';
// import overviewCampus from '@/public/images/gla-overview.jpg'; // update path if needed
interface OverviewTabProps {
    collegeData: CollegeDetail;
    scrollToSection: (id: string) => void;
    highlightsRef: React.RefObject<HTMLDivElement | null>;
    collaborationRef: React.RefObject<HTMLDivElement | null>;
}
const COLLAPSED_COLLAB_COUNT = 6;

export default function OverviewTab({
    collegeData,
    scrollToSection,
    highlightsRef,
    collaborationRef,
}: OverviewTabProps) {
    const [aboutExpanded, setAboutExpanded] = useState(false);
    // const highlightsRef = useRef<HTMLDivElement>(null);
    //   const collaborationRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        about: false,
        collaboration: false,
        'academic-collab': false,
    });

    const toggleReadMore = (key: string) => {
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Get overview tab data
    const overview = collegeData.tabs.overview;
    const about = overview.about;
    const quickStats = overview.quick_stats;
    const highlights = overview.highlights;
    const internationalCollaborations = overview.items || [];
    const faqs = overview.faqs || [];
    const formatLabel = (text: string) =>
        text
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());

    const highlightRows = Object.entries(highlights || {}).flatMap(
        ([key, value]) => {
            // If value is an object (like placement)
            if (typeof value === 'object' && value !== null) {
                return Object.entries(value).map(([subKey, subValue]) => ({
                    label: `${formatLabel(key)} - ${formatLabel(subKey)}`,
                    value: subValue,
                }));
            }

            return {
                label: formatLabel(key),
                value,
            };
        }
    );
    const tocItems = generateOverviewTOC(collegeData);
    console.log('Overview FAQs:', overview.faqs); // Log overview.faqs to ensure it's populated
    console.log('College Data:', collegeData); // Log the entire co
    return (
        <section className="px-4 py-6 md:px-8 max-w-7xl mx-auto">
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
                    <img src={overviewCampus.src} alt="GLA University Campus Overview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-6">
                            <motion.h2
                                className="text-2xl font-bold text-white mb-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Welcome to {about.name}
                            </motion.h2>
                            <motion.p
                                className="text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                A Premier Institution for Higher Education
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                {/* Animated Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { value: quickStats.top_courses?.length ? `${quickStats.top_courses.length}+` : '0', label: 'Courses', icon: Users, bgColor: '#73CBA9' },
                        { value: about.campus_area || 'N/A', label: 'Campus Area', icon: Award, bgColor: '#186BBF' },
                        { value: quickStats.average_package || 'N/A', label: 'Avg Package', icon: TrendingUp, bgColor: '#00C798' },
                        {
                            value: quickStats.top_recruiters?.length
                                ? `${quickStats.top_recruiters.length}+`
                                : '0', label: 'Recuiters', icon: Building2, bgColor: '#3B82F6'
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
                            <div className="text-xl font-bold mb-1 text-white">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/90">{stat.label}</div>
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
                            {tocItems.map((item: any) => (
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

                {/* About Section */}
                <div>
                    <div className="border-l-4 border-primary pl-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">About {about.name}</h3>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p
                            className={`transition-all ${expandedSections.about ? '' : 'line-clamp-4'
                                }`}
                        >
                            {about.description}
                        </p>
                        {/* <p>
                            GLA University Mathura, Uttar Pradesh, holds prestigious rankings, including a NAAC A+ accreditation with a score of 3.46, making it India's No.1 NAAC A+ accredited private university. In 2024, the university ranked in the 151-200 list in the NIRF Overall ranking.
                        </p> */}
                        {!expandedSections['about'] && (
                            <button
                                onClick={() => toggleReadMore('about')}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                            >
                                Read More

                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                        {expandedSections['about'] && (

                            <button
                                onClick={() => toggleReadMore('about')}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1 "
                            >
                                Show Less
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>

                        )}
                    </div>
                </div>

                {/* Highlights Section */}
                <div id="highlights" ref={highlightsRef} className="scroll-mt-24">
                    <div className="border-l-4 border-primary pl-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{about.name} Highlights</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        The table mentioned below provides all the key information about GLA University, Mathura:
                    </p>
                    <div className="border border-gray-200 rounded-lg overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Particulars</th>
                                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Details</th>
                                </tr>
                            </thead>
                            {/* <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Established</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">2010 (as GLA University; founded as G.L.A. Institute in 1998)</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Campus Area</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">110 acres</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Type of Institution</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">Private University</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">GLA Ranking</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">NIRF 2024: 101-150 (University), 101-125 (Management), 53 (Pharmacy)</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">NAAC Accreditation</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">A+ (3.46 score)</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Approval & Recognition</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">UGC, AICTE, NCTE, BCI, PCI, IACBE, AIU, NAAC A+</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Programme-Level</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">UG, PG, Doctoral, Diploma, Online Courses</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Courses Offered</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">107 courses across 11 streams (Engineering, Management, Pharmacy, Law, etc.)</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Admissions Offered</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">Entrance-based</td>
                                </tr>
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Entrance Exams</td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">GLAET, CAT, MAT, XAT, UPSEE, GATE, CUET-PG, JEE Main</td>
                                </tr>
                            </tbody> */}
                            <tbody className="divide-y divide-gray-200">
                                {highlightRows.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                                            {row.label}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                                            {String(row.value)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* International Collaboration Section */}
                <div id="collaboration" ref={collaborationRef} className="scroll-mt-24">
                    <div className="border-l-4 border-primary pl-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">International Collaboration and Exchange Programmes</h3>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            {overview.international_description}
                        </p>
                        {internationalCollaborations.length > 0 && (
                            <div className="space-y-4">

                                {/* Grid */}
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {(expandedSections['collaboration']
                                        ? internationalCollaborations
                                        : internationalCollaborations.slice(0, COLLAPSED_COLLAB_COUNT)
                                    ).map((collab: any, index: number) => (
                                        <div
                                            key={index}
                                            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                                        >
                                            <p className="text-sm font-medium text-gray-900">
                                                {collab.partner_university_name}
                                                {collab.country && (
                                                    <span className="text-gray-500"> ({collab.country})</span>
                                                )}
                                            </p>

                                            {hasContent(collab.programme_details) && (
                                                <RenderHTML
                                                    content={collab.programme_details}
                                                    className="text-sm text-gray-600 mt-1"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Read More / Show Less */}
                                {internationalCollaborations.length > COLLAPSED_COLLAB_COUNT && (
                                    <button
                                        onClick={() => toggleReadMore('collaboration')}
                                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                                    >
                                        {expandedSections['collaboration'] ? 'Show Less' : 'Read More'}
                                        <ChevronRight
                                            className={`w-4 h-4 transition-transform ${expandedSections['collaboration'] ? 'rotate-90' : ''
                                                }`}
                                        />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* Academic and Industry Collaboration Section */}
                {/* Academic and Industry Collaboration Section */}
                {(hasContent(overview.academic_collaboration?.description) ||
                    hasContent(overview.academic_collaboration?.details)) && (
                        <div id="academic-collaboration" className="scroll-mt-24">
                            <div className="border-l-4 border-primary pl-4 mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Academic and Industry Collaboration
                                </h3>
                            </div>

                            {/* Description (always visible) */}
                            {hasContent(overview.academic_collaboration?.description) && (
                                <RenderHTML
                                    content={overview.academic_collaboration.description}
                                    className={`max-w-none text-gray-700 leading-relaxed ${expandedSections['academic-collab'] ? '' : 'line-clamp-4'
                                        }`}
                                />
                            )}

                            {/* Read More */}
                            {!expandedSections['academic-collab'] &&
                                hasContent(overview.academic_collaboration?.details) && (
                                    <button
                                        onClick={() => toggleReadMore('academic-collab')}
                                        className="mt-3 text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                                    >
                                        Read More
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}

                            {/* Expanded Details */}
                            {expandedSections['academic-collab'] &&
                                hasContent(overview.academic_collaboration?.details) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4"
                                    >
                                        <RenderHTML
                                            content={overview.academic_collaboration.details}
                                            className="max-w-none text-gray-600"
                                        />

                                        <button
                                            onClick={() => toggleReadMore('academic-collab')}
                                            className="mt-3 text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                                        >
                                            Show Less
                                            <ChevronRight className="w-4 h-4 rotate-90" />
                                        </button>
                                    </motion.div>
                                )}






                        </div>



                    )}
                {faqs.length > 0 && (
                    <div id="faqs" className="mt-8 scroll-mt-24">
                        <FAQSection faqs={faqs} />
                    </div>
                )}


                {/* Contact Section */}
                {/* <div id="contact" ref={contactRef} className="scroll-mt-24"> */}
                {/* <div className="border-l-4 border-primary pl-4 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">GLA University Contact</h3>
                    </div> */}
                {/* <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">GLA University Address</p>
                                    <p className="text-sm text-gray-700">
                                        17km Stone, NH-19 Mathura-Delhi Road, P.O. Chaumuhan, Mathura-281 406 (UP) India
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">Contact Details</p>
                                    <p className="text-sm text-gray-700">
                                        +91-5662-250900, 250909, 241489, +91-9927064017
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        <span className="font-medium">Admission Helpline:</span> 9027068068
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-900 mb-1">Email ID</p>
                                    <a
                                        href="mailto:glauniversity@gla.ac.in"
                                        className="text-sm text-primary hover:text-primary/80"
                                    >
                                        glauniversity@gla.ac.in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}
            </motion.div>
        </section>
    );
}