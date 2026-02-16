import { useRef, useState } from 'react';
import {

    BookOpen,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    HelpCircle,
    Plane,

} from 'lucide-react';

import { CollegeDetail } from '@/services/collegeService';
import coursesStudents from "../../../../public/assets/courses-students.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { generateCoursesTOC } from '@/utils/tableofContent';
import FAQSection from './faqSection';

interface CoursesTabProps {
    collegeData: CollegeDetail;
    scrollToSection: (id: string) => void;
}

export default function CoursesTab({
    collegeData,
    scrollToSection,
}: CoursesTabProps) {

    // ✅ Hooks MUST be here
    const aboutRef = useRef<HTMLDivElement>(null);
    const feeStructureRef = useRef<HTMLDivElement>(null);
    const nriCriteriaRef = useRef<HTMLDivElement>(null);
    const eligibilityRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);
    // Get courses data from the new API structure
    const coursesData = collegeData.tabs.courses_fees;
    const courses = coursesData.items || [];
    const faqs = coursesData.faqs || [];
    const intro = coursesData.intro;

    // Get overview data for stats
    const overview = collegeData.tabs.overview;
    const quickStats = overview.quick_stats;
    const TABLE_COLLAPSED_ROWS = 4;


    const [expandedSections, setExpandedSections] =
        useState<Record<string, boolean>>({});

    const toggleReadMore = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };



    const tocItems = generateCoursesTOC(collegeData);

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
                <img src={coursesStudents.src} alt="Courses and Fees" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                        <motion.h2
                            className="text-2xl font-bold text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Explore Our Diverse Courses
                        </motion.h2>
                        <motion.p
                            className="text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Comprehensive programs with competitive fee structures
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                    { value: courses.length ? `${courses.length}` : '0', suffix: '+', label: 'Programs', color: 'from-primary to-primary/80' },
                    { value: quickStats.programme_levels?.length ? `${quickStats.programme_levels.length}` : '0', suffix: '+', label: 'Specializations', color: 'from-secondary to-secondary/80' },
                    { value: quickStats.average_package || 'N/A', label: 'Avg. Package', color: 'from-accent to-accent/80' },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className={`p-4 sm:p-6 bg-gradient-to-br ${stat.color} rounded-xl text-white text-center flex sm:flex-col items-center sm:items-center justify-between sm:justify-center gap-2`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-sm sm:text-base text-white/90 sm:order-2">{stat.label}</div>
                        <div className="text-2xl sm:text-3xl font-bold sm:order-1">
                            {Number(stat.value) >= 1000 ? `${(Number(stat.value) / 1000).toFixed(0)}K` : stat.value}{stat.suffix}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Table of Contents */}
            {/* <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/10">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Table of Contents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                        { id: 'fee-structure', title: 'Fee Structure', icon: CreditCard },
                        { id: 'nri-criteria', title: 'Criteria for NRI/OCI', icon: Plane },
                        { id: 'eligibility', title: 'Eligibility Criteria', icon: CheckCircle2 },
                        { id: 'faqs', title: 'FAQs', icon: HelpCircle },
                    ].map((item) => (
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
            </div> */}
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
            <div id="about" ref={aboutRef} className="scroll-mt-24">
                <div className="border-l-4 border-primary pl-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{overview.about.name}</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p
                        className={`transition-all ${expandedSections.about ? '' : 'line-clamp-4'
                            }`}
                    >
                        {coursesData.intro}
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



            {/* NRI/OCI Criteria Section */}
            <div id="nri-criteria" ref={nriCriteriaRef} className="scroll-mt-24">
                <div className="border-l-4 border-primary pl-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Available Courses & Programmes</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    {/* 
                    {!expandedSections['nri'] && (
                        <button
                            onClick={() => toggleReadMore('nri')}
                            className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                        >
                            Read More
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )} */}


                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        {/* ===== MOBILE VIEW (Cards) ===== */}
                        <div className="space-y-4 md:hidden">
                            {courses.map((course, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                                >
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {course.course_name}
                                    </h4>

                                    <div className="text-sm text-gray-600 mb-2">
                                        {course.programme_level}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Duration</p>
                                            <p className="font-medium text-gray-900">
                                                {course.duration || '—'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">Fees</p>
                                            <p className="font-medium text-gray-900">
                                                {course.total_fees || '—'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ===== DESKTOP VIEW (Table) ===== */}
                        <div className="hidden md:block border border-gray-200 rounded-lg overflow-x-auto">
                            <table className="w-full min-w-[600px] text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                                            Course
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                                            Programme Level
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                                            Duration
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold text-gray-900">
                                            Fees
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {courses.map((course, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900">
                                                {course.course_name}
                                            </td>

                                            <td className="px-4 py-3 text-gray-700">
                                                {course.programme_level}
                                            </td>

                                            <td className="px-4 py-3 text-gray-700">
                                                {course.duration || '—'}
                                            </td>

                                            <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">
                                                {course.total_fees || '—'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>



                        {/* <button
                                onClick={() => toggleReadMore('nri-criteria')}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                            >
                                Show Less
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button> */}
                    </motion.div>

                </div>

            </div>








            {/* FAQs Section */}
            {faqs.length > 0 && (
                <div id="faqs" className="mt-8 scroll-mt-24">
                    <FAQSection faqs={faqs} />
                </div>
            )}

        </motion.div>

    );
}