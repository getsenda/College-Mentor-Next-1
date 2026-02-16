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
    ScrollText,
    Trophy,

} from 'lucide-react';
import admissionProcess from "../../../../public/assets/admission-process.jpg";
import { CollegeDetail } from '@/services/collegeService';
import { motion } from 'framer-motion';
import { generateAdmissionsTOC, generateCoursesTOC } from '@/utils/tableofContent';
import FAQSection from './faqSection';
import { Button } from '@/components/ui/button';



interface AdmissionsTabProps {
    collegeData: CollegeDetail;
    scrollToSection: (id: string) => void;
}

export default function AdmissionsTab({
    collegeData,
    scrollToSection,
}: AdmissionsTabProps) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Get admission data from the new API structure
    const admissionData = collegeData.tabs.admission;
    const admissions = admissionData.items || [];
    const faqs = admissionData.faqs || [];
    const intro = admissionData.intro;
    const internationalAdmissions = admissionData.international_admissions;
    const admissionProcessSteps = admissionData.admission_process_steps || [];

    // Get college name
    const collegeName = collegeData.tabs.overview.about.name;
    // Helper to safely get array with filtering
    const getArray = (value: string[] | undefined): string[] => {
        if (!value || !Array.isArray(value)) return [];
        return value.filter(v => v && v.trim());
    };
    const toggleReadMore = (key: string) => {
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    // Group admissions by programme_level
    const admissionsByLevel = admissions.reduce((acc, admission) => {
        const level = admission.programme_level || 'Other';
        if (!acc[level]) {
            acc[level] = [];
        }
        acc[level].push(admission);
        return acc;
    }, {} as Record<string, typeof admissions>);


    // Calculate stats
    const totalProgrammes = admissions.length;
    const uniqueEntranceTests = new Set<string>();
    admissions.forEach(a => {
        getArray(a.entrance_tests).forEach(t => uniqueEntranceTests.add(t));
    });

    const totalSeats = admissions.reduce((sum, a) => {
        const match = a.seat_matrix?.match(/(\d+)/);
        return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    // Check if any admission has important dates
    const hasImportantDates = admissions.some(a =>
        a.important_dates_json &&
        ((Array.isArray(a.important_dates_json) && a.important_dates_json.length > 0) ||
            (typeof a.important_dates_json === 'object' && Object.keys(a.important_dates_json).length > 0))
    );

    // Get unique required documents across all admissions
    const allDocuments = new Set<string>();
    admissions.forEach(a => {
        getArray(a.required_documents).forEach(doc => allDocuments.add(doc));
    });

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    // Icon mapping for programme levels
    const levelIcons: Record<string, typeof GraduationCap> = {
        'Undergraduate': School,
        'Postgraduate': BookOpen,
        'Diploma': Award,
        'PhD': GraduationCap,
    };



    const tocItems = generateAdmissionsTOC(collegeData);
    const documents =
        admissionData?.items?.[0]?.required_documents || [];

    const INITIAL_VISIBLE_COUNT = 4;

    const visibleDocuments = expandedSections['required-documents']
        ? documents
        : documents.slice(0, INITIAL_VISIBLE_COUNT);

    const remainingCount = documents.length - INITIAL_VISIBLE_COUNT;


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
                <img src={admissionProcess.src} alt="Admission Process" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                        <motion.h2
                            className="text-2xl font-bold text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Admission & Eligibility
                        </motion.h2>
                        <motion.p
                            className="text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Your Journey to Excellence Starts Here
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Application Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                    { value: totalProgrammes.toString(), label: 'Programmes', icon: FileText },
                    { value: uniqueEntranceTests.size.toString(), label: 'Entrance Tests', icon: Trophy },
                    { value: totalSeats > 0 ? `${totalSeats}+` : 'N/A', label: 'Total Seats', icon: BookOpen },

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
            <div id="admissions-overview" className="border-l-4 border-primary pl-4">
                <h2 className="text-2xl font-bold text-foreground">{collegeName} Admission Process</h2>
            </div>

            {/* Overview Section */}
            <div className="space-y-4">
                <div className="text-muted-foreground leading-relaxed space-y-4">
                    <p>
                        {expandedSections["admissions-overview"]
                            ? collegeData.tabs.admission.intro
                            : collegeData.tabs.admission.intro.slice(0, 150) + "..."}
                    </p>


                    {!expandedSections['admissions-overview'] && (
                        <button
                            onClick={() => toggleReadMore('admissions-overview')}
                            className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                        >
                            Read More
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                    {expandedSections['admissions-overview'] && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4"
                        >

                            <button
                                onClick={() => toggleReadMore('admissions-overview')}
                                className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                            >
                                Show Less
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>


            {/* UG Admission Process */}
            <div id="ug-admission" className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold text-foreground">UG Admission</h3>
                </div>

                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full min-w-[500px]">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                                    Course
                                </th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                                    Eligibility
                                </th>
                                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                                    Fees (Per Year)
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {(expandedSections["ug-table"]
                                ? admissionData.items.filter((item) => item.programme_level === "Undergraduate")
                                : admissionData.items.filter((item) => item.programme_level === "Undergraduate").slice(0, 4)
                            ).map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap">
                                        {item.programme_name}
                                    </td>

                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground">
                                        {item.eligibility_criteria}
                                    </td>

                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                                        {item.course_fee}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                <div className="flex justify-start">
                    <button
                        onClick={() => toggleReadMore('ug-table')}
                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        {expandedSections['ug-table'] ? (
                            <>
                                View Less
                                <ChevronRight className="w-4 h-4 rotate-90 transition-transform duration-200" />
                            </>
                        ) : (
                            <>
                                Read More
                                <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                            </>
                        )}
                    </button>
                </div>


            </div>



            {/* PG Admissions */}
            <div id="pg-admission" className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold text-foreground">PG Admissions</h3>
                </div>

                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Programme
                                </th>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Eligibility
                                </th>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Entrance
                                </th>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                                    Fees (Per Year)
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {(expandedSections["pg-table"]
                                ? admissionData.items.filter((item) => item.programme_level === "Postgraduate")
                                : admissionData.items.filter((item) => item.programme_level === "Postgraduate")?.slice(0, 2)
                            )?.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    {/* Programme */}
                                    <td className="px-3 py-3 text-xs sm:text-sm font-medium whitespace-nowrap">
                                        {item.programme_name}
                                    </td>

                                    {/* Eligibility */}
                                    <td className="px-3 py-3 text-xs sm:text-sm text-muted-foreground">
                                        {item.eligibility_criteria
                                            ?.split("\n")[0]} {/* first line only */}
                                    </td>

                                    {/* Entrance Tests */}
                                    <td className="px-3 py-3 text-xs sm:text-sm text-muted-foreground">
                                        {item.entrance_tests?.join(", ")}
                                    </td>

                                    {/* Fees */}
                                    <td className="px-3 py-3 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                                        {item.course_fee}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        onClick={() => toggleReadMore('pg-table')}
                        className="text-[#3B82F6] hover:text-secondary border-primary/20 hover:border-primary/40"
                    >
                        {expandedSections['pg-table'] ? (
                            <>
                                Show Less
                                <ChevronRight className="w-4 h-4 ml-1 rotate-90" />
                            </>
                        ) : (
                            <>
                                Read More ({7 - 4} more courses)
                                <ChevronRight className="w-4 h-4 ml-1 -rotate-90" />
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* M.Tech Admissions */}
            <div id="mtech-admission" className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold text-foreground"> PhD Admissions</h3>
                </div>
                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full min-w-[650px]">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Programme
                                </th>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Eligibility
                                </th>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Entrance Test
                                </th>
                                <th className="px-3 py-3 text-left text-xs sm:text-sm font-semibold">
                                    Fees
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {admissionData.items?.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-muted/50 transition-colors"
                                >
                                    {/* Programme */}
                                    <td className="px-3 py-3 text-xs sm:text-sm font-medium whitespace-nowrap">
                                        {item.programme_name}
                                    </td>

                                    {/* Eligibility (first 2 points only) */}
                                    <td className="px-3 py-3 text-xs sm:text-sm text-muted-foreground">
                                        {item.eligibility_criteria
                                            ?.split("\n")
                                            .slice(0, 2)
                                            .join(" ")}
                                    </td>

                                    {/* Entrance Tests */}
                                    <td className="px-3 py-3 text-xs sm:text-sm text-muted-foreground">
                                        {item.entrance_tests?.join(", ")}
                                    </td>

                                    {/* Fees */}
                                    <td className="px-3 py-3 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                                        {item.course_fee}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




            {/* Admission Process */}
            <div id="admission-process" className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold text-foreground">{collegeName} Admission Process</h3>
                </div>

                <div className="space-y-3">
                    {(() => {
                        const steps = admissionData.admission_process_steps || [];
                        const displayedSteps = expandedSections['admission-process-section']
                            ? steps
                            : steps.slice(0, 3);

                        return displayedSteps.map((step, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg border border-border">
                                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                                    {index + 1}
                                </div>
                                <p className="text-muted-foreground text-sm flex-1">{step}</p>
                            </div>
                        ));
                    })()}
                </div>
                {!expandedSections['admission-process-section'] && (
                    <button
                        onClick={() => toggleReadMore('admission-process-section')}
                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        Read More (3 more steps)
                        <ChevronRight className="w-4 h-4 -rotate-90" />
                    </button>
                )}
                {expandedSections['admission-process-section'] && (
                    <button
                        onClick={() => toggleReadMore('admission-process-section')}
                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        Show Less
                        <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                )}

            </div>

            {/* Required Documents */}
            <div id="required-documents" className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-xl font-semibold text-foreground">
                        {collegeName} Admission: Required Documents
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {visibleDocuments.map((doc, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-muted rounded-lg border border-border"
                        >
                            <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                            <span className="text-sm text-foreground">{doc}</span>
                        </div>
                    ))}
                </div>

                {documents.length > INITIAL_VISIBLE_COUNT && !expandedSections['required-documents'] && (
                    <button
                        onClick={() => toggleReadMore('required-documents')}
                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        Read More ({remainingCount} more documents)
                        <ChevronRight className="w-4 h-4 -rotate-90" />
                    </button>
                )}

                {expandedSections['required-documents'] && (
                    <button
                        onClick={() => toggleReadMore('required-documents')}
                        className="text-[#3B82F6] hover:text-secondary text-sm font-medium inline-flex items-center gap-1"
                    >
                        Show Less
                        <ChevronRight className="w-4 h-4 rotate-90" />
                    </button>
                )}
            </div>

            {faqs.length > 0 && (
                <div id="faqs" className="mt-8 scroll-mt-24">
                    <FAQSection faqs={faqs} />
                </div>
            )}


        </motion.div>

    );
}