import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookMarked,
    BookOpen,
    Building2,
    CheckCircle,
    ChevronRight,
    ClipboardList,
    CreditCard,
    FileText,
    GraduationCap,
    IndianRupee,
    Lightbulb,
    Microscope,
    Monitor,
    Rocket,
    Users,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";
import researchHero from "../../public/assets/research-innovation-hero.jpg";
import onlineLearning from "../../../../public/assets/online-learning.jpg";
import { RenderHTML, hasContent } from "@/utils/htmlContent";
import FAQSection from "./faqSection";
import { OnlineCourseItem } from "@/components/data/collegedetail";
import TableOfContents from "@/utils/toc";


interface OnlineCoursesTabProps {
    collegeData: CollegeDetail;
    scrollToSection: (id: string) => void;
}
// Extract tags from course (platform, mode, etc.)
const extractTags = (course: OnlineCourseItem): string[] => {
    const tags: string[] = [];
    const info = course.additional_info_json || {};

    if (info.platform) tags.push(info.platform);
    if (info.mode) tags.push(info.mode);
    if (info.credits) tags.push(info.credits);

    return tags;
};
export default function OnlineCoursesTab({
    collegeData,
    scrollToSection,
}: OnlineCoursesTabProps) {
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [showAllFees, setShowAllFees] = useState(false);

    // Get online courses data from API
    const onlineCoursesData = collegeData.tabs.online_courses;
    const courses = onlineCoursesData?.items || [];
    const faqs = onlineCoursesData?.faqs || [];
    const intro = onlineCoursesData?.intro;
    const collegeName = collegeData.tabs.overview.about.name;

    // Check if courses exist
    const hasCourses = courses.length > 0;
    const INTRO_LIMIT = 300;
    const isLongIntro = intro.length > INTRO_LIMIT;

    // Courses to display (show 6 initially, then all)
    const visibleCourses = showAllCourses ? courses : courses.slice(0, 6);
    const visibleFees = showAllFees ? courses : courses.slice(0, 5);


    // Generate TOC items
    const tocItems = [
        { id: 'online-overview', title: 'About Online Courses', icon: BookOpen },
        ...(hasCourses ? [{ id: 'available-programs', title: 'Available Online Programs', icon: Monitor }] : []),
        ...(hasCourses ? [{ id: 'course-details', title: 'Course Details & Fees', icon: IndianRupee }] : []),
        ...(faqs.length > 0 ? [{ id: 'faqs', title: 'FAQs', icon: BookOpen }] : []),
    ];
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const isExpanded = expandedSections['intro'];

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const toggleReadMore = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // If no data at all, show coming soon
    if (!hasCourses && !hasContent(intro)) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
            >
                <div className="border border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                    <Monitor className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Online Courses Coming Soon</h4>
                    <p className="text-gray-600">
                        Online course information for {collegeName} is not currently available.
                        Please check back later or contact the admissions office for information about distance learning programs.
                    </p>
                </div>
            </motion.div>
        );
    }


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Hero Image */}
            <motion.div
                className="relative h-64 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <img src={onlineLearning.src} alt="Online Courses" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                        <motion.h2
                            className="text-2xl font-bold text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Online Learning Programs
                        </motion.h2>
                        <motion.p
                            className="text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Flexible learning opportunities from anywhere
                        </motion.p>
                    </div>
                </div>
            </motion.div>


            {/* Table of Contents */}
            <TableOfContents items={tocItems} scrollToSection={scrollToSection} />
            {/* About Online Courses */}
            <div id="online-overview" className="scroll-mt-24">
                <div className="border-l-4 border-primary pl-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{collegeName} Online Courses</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-2">
                    {isExpanded || !isLongIntro
                        ? intro
                        : `${intro.slice(0, INTRO_LIMIT)}...`}
                </p>

                {isLongIntro && (
                    <button
                        onClick={() => toggleReadMore('intro')}
                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        {isExpanded ? "Show Less" : "Read More"}
                        <ChevronRight
                            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""
                                }`}
                        />
                    </button>
                )}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-6 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="text-3xl font-bold mb-2">{courses.length}+</div>
                        <div className="text-sm text-white/80">Online Programs</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center p-6 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="text-3xl font-bold mb-2">10K+</div>
                        <div className="text-sm text-white/80">Online Students</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-center p-6 bg-gradient-to-br from-accent to-accent/80 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-2xl font-bold">UGC</div>
                        <div className="text-sm text-white/80">Approved</div>
                    </motion.div>
                </div> */}
            </div>

            {/* Available Programs */}
            <div id="available-programs" className="scroll-mt-24">
                <div className="border-l-4 border-primary pl-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Available Online Programs at {collegeName}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                    {collegeName} offers the following online degree programs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleCourses.map((course, index) => {
                        const tags = extractTags(course);
                        return (
                            <motion.div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-primary/5"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                        <GraduationCap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-primary text-base mb-0.5">{course.course_name}</h4>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {course.duration || 'Contact for details'}
                                        </p>
                                        {tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {courses.length > 6 && (
                    <button
                        onClick={() => setShowAllCourses(!showAllCourses)}
                        className="mt-4 text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1"
                    >
                        {showAllCourses ? 'Show Less' : `Read More (${courses.length - 6} more programs)`}
                        <ChevronRight className={`w-4 h-4 transition-transform ${showAllCourses ? 'rotate-90' : ''}`} />
                    </button>
                )}
            </div>

            {/* Course Details & Fees */}
            <div id="course-details" className="scroll-mt-24">
                <div className="border-l-4 border-primary pl-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Online Course Fees Structure</h3>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Program</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Duration</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">Total Fees</th>
                                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Eligibility</th>
                            </tr>
                        </thead>
                        {/* <tbody className="divide-y divide-gray-200">
                            {(() => {
                                const feesData = [
                                    { program: "Online MBA", duration: "2 Years", fees: "₹1.2 Lakhs", eligibility: "Graduation (Any)" },
                                    { program: "Online MCA", duration: "2 Years", fees: "₹1 Lakh", eligibility: "BCA/B.Sc (IT/CS)" },
                                    { program: "Online BBA", duration: "3 Years", fees: "₹1.5 Lakhs", eligibility: "10+2 (Any)" },
                                    { program: "Online BCA", duration: "3 Years", fees: "₹1.2 Lakhs", eligibility: "10+2 (Any)" },
                                    { program: "Online B.Com", duration: "3 Years", fees: "₹90,000", eligibility: "10+2 (Commerce)" },
                                ];
                                const displayedData = expandedSections['fees-table'] ? feesData : feesData.slice(0, 3);
                                return displayedData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">{item.program}</td>
                                        <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{item.duration}</td>
                                        <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">{item.fees}</td>
                                        <td className="px-2 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{item.eligibility}</td>
                                    </tr>
                                ));
                            })()}
                                
                        </tbody> */}
                        <tbody className="divide-y divide-gray-200">
                            {visibleFees.map((course, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-2 py-4">
                                        <span className="font-medium text-primary">{course.course_name}</span>
                                    </td>
                                    <td className="px-2 py-4 text-center text-gray-700">
                                        {course.duration || '-'}
                                    </td>
                                    <td className="px-2 py-4 text-center text-gray-700">
                                        {course.fees || 'Contact for details'}
                                    </td>
                                    <td className="px-2 py-4 text-gray-700">
                                        {course.additional_info_json?.eligibility || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!expandedSections['fees-table'] && (
                    <button
                        onClick={() => toggleReadMore('fees-table')}
                        className="mt-3 text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        Read More (2 more programs)
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}
                {expandedSections['fees-table'] && (
                    <button
                        onClick={() => toggleReadMore('fees-table')}
                        className="mt-3 text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        Show Less
                        <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                )}
            </div>

            {/* FAQs */}
            {faqs.length > 0 && (
                <div id="online-faqs" className="scroll-mt-24">

                    <FAQSection faqs={faqs} />
                </div>
            )}
        </motion.div>
    );
}