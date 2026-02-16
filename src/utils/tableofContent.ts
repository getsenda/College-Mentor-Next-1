import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Globe2,
  Handshake,
  HelpCircle,
  AlertTriangle,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  FileText,
  Calendar,
  Award,
  Target,
  TrendingUp,
  Briefcase,
  Building2,
  Users,
  Beaker,
  Home,
  Laptop,
  Medal,
  ShieldCheck,
  ClipboardList,
  FlaskConical,
  Lightbulb,
  Landmark,
  PartyPopper,
  HeartHandshake,
  Globe,
  Trophy,
  Gift,
} from "lucide-react";
import type { CollegeDetail } from "@/services/collegeService";
import { hasContent } from "@/utils/htmlContent";
import { toSlug } from "./slug";

export interface TOCItem {
  id: string;
  title: string;
  icon: LucideIcon;
}
const SCHOLARSHIP_ICON_MAP: Record<string, any> = {
  overview: Gift,
  "b.tech": Award,
  btech: Award,
  "m.tech": Award,
  mtech: Award,
  "b.pharma": Award,
  bpharma: Award,
  "m.pharma": Award,
  mpharma: Award,
  "m.sc": Award,
  msc: Award,
  phd: GraduationCap,
  "ph.d": GraduationCap,
  special: Trophy,
};
const getScholarshipIcon = (type: string) => {
  const key = type.toLowerCase();
  return (
    Object.entries(SCHOLARSHIP_ICON_MAP).find(([k]) =>
      key.includes(k)
    )?.[1] || Award
  );
};

/**
 * Generates TOC items for Overview tab based on available data
 */
export function generateOverviewTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const overview = data.tabs.overview;

  // Highlights - check if highlights object has any values
  if (overview.highlights && Object.keys(overview.highlights).some(key => overview.highlights[key])) {
    items.push({ id: "highlights", title: "Highlights", icon: Sparkles });
  }

  // International Collaboration
  if (
    (overview.items && overview.items.length > 0) ||
    hasContent(overview.international_description) ||
    (overview.international_partners && overview.international_partners.length > 0)
  ) {
    items.push({ id: "collaboration", title: "International Collaboration", icon: Globe2 });
  }

  // Academic & Industry Collaboration
  if (hasContent(overview.academic_collaboration?.description) || hasContent(overview.academic_collaboration?.details)) {
    items.push({ id: "academic-collaboration", title: "Academic & Industry Collaboration", icon: Handshake });
  }

  // FAQs
  if (overview.faqs && overview.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

/**
 * Generates TOC items for Courses & Fees tab based on available data
 */
export function generateCoursesTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const courses = data.tabs.courses_fees;

  // Intro
  if (hasContent(courses.intro)) {
    items.push({ id: "courses-intro", title: "About Courses", icon: FileText });
  }

  // Courses list
  if (courses.items && courses.items.length > 0) {
    items.push({ id: "courses-list", title: "Courses & Programmes", icon: GraduationCap });
  }

  // Fee structure - show if any course has fees
  //   if (courses.items && courses.items.some(c => c.total_fees || c.fee_per_semester)) {
  //     items.push({ id: "fee-structure", title: "Fee Structure", icon: CreditCard });
  //   }

  // Hostel fees - show if any course has hostel fees
  if (courses.items && courses.items.some(c => c.hostel_fees)) {
    items.push({ id: "hostel-fees", title: "Hostel Fees", icon: Home });
  }

  // Additional charges - show if additional_fees has data
  if (courses.additional_fees && Object.keys(courses.additional_fees).length > 0) {
    items.push({ id: "additional-charges", title: "Additional Charges", icon: CreditCard });
  }

  // FAQs
  if (courses.faqs && courses.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

/**
 * Generates TOC items for Admissions tab based on available data
 */
export function generateAdmissionsTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const admission = data.tabs.admission;
  const admissions = admission.items || [];

  const hasProgramme = (level: string) =>
    admissions.some(a => a.programme_level === level);

  const hasEligibility = (level: string) =>
    admissions.some(
      a => a.programme_level === level && hasContent(a.eligibility_criteria)
    );

  // ---------- Admission Process (UG / PG / PhD) ----------
  // ---------- Admissions Overview ----------
  if (hasContent(admission.intro)) {
    items.push({
      id: "admissions-overview",
      title: "Admissions Overview",
      icon: Globe,
    });
  }

  if (hasProgramme("Undergraduate")) {
    items.push({
      id: "ug-admission",
      title: "UG Admissions",
      icon: FileText,
    });
  }

  if (hasProgramme("Postgraduate")) {
    items.push({
      id: "pg-admission",
      title: "PG Admissions",
      icon: FileText,
    });
  }

  if (hasProgramme("Postgraduate")) {
    items.push({
      id: "admission-process",
      title: "Admission Process",
      icon: ClipboardList,
    });
  }


  // ---------- Important Dates ----------
  if (
    admissions.some(
      a =>
        a.important_dates_json &&
        ((Array.isArray(a.important_dates_json) &&
          a.important_dates_json.length > 0) ||
          (typeof a.important_dates_json === "object" &&
            Object.keys(a.important_dates_json).length > 0))
    )
  ) {
    items.push({
      id: "important-dates",
      title: "Important Dates",
      icon: Calendar,
    });
  }





  // ---------- Required Documents (common) ----------
  if (admissions.some(a => Array.isArray(a.required_documents) && a.required_documents.length > 0)) {
    items.push({
      id: "documents",
      title: "Required Documents",
      icon: ClipboardList,
    });
  }

  // ---------- FAQs ----------
  if (admission.faqs && admission.faqs.length > 0) {
    items.push({
      id: "faqs",
      title: "FAQs",
      icon: HelpCircle,
    });
  }

  return items;
}
/**
 * Generates TOC items for Cutoff tab based on available data
 */
/**
 * Generates TOC items for Cutoff tab based on available data
 */
export function generateCutoffTOC(data: CollegeDetail): TOCItem[] {

  const items: TOCItem[] = [];
  const cutoff = data.tabs.cutoff;

  if (!cutoff || !cutoff.items || cutoff.items.length === 0) {
    return items;
  }

  // 1️⃣ Unique exam names from cutoff items
  const examNames = Array.from(
    new Set(cutoff.items.map(item => item.exam_name))
  );

  // 2️⃣ Add TOC entry for each exam
  examNames.forEach((examName) => {
    items.push({
      id: `${toSlug(examName)}-cutoff`, // MUST match section ID
      title: `${examName} Cutoff`,
      icon: Target,
    });
  });

  // 3️⃣ FAQs (cutoff-specific)
  if (cutoff.faqs && cutoff.faqs.length > 0) {
    items.push({
      id: "faqs",
      title: "FAQs",
      icon: HelpCircle,
    });
  }

  return items;
}

/**
 * Generates TOC items for Scholarships tab based on available data
 */
export function generateScholarshipsTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const scholarships = data.tabs.scholarships;

  // Overview
  if (scholarships.intro) {
    items.push({
      id: "scholarships-overview",
      title: "Overview",
      icon: Gift,
    });
  }

  // Scholarship types
  if (scholarships.items && scholarships.items.length > 0) {
    const types = Array.from(
      new Set(scholarships.items.map(s => s.scholarship_type))
    ).filter(Boolean);

    types.forEach(type => {
      items.push({
        id: `scholarship-${type.toLowerCase().replace(/\s+/g, "-")}`,
        title: `${type} Scholarships`,
        icon: getScholarshipIcon(type),
      });
    });
  }

  // FAQs
  if (scholarships.faqs && scholarships.faqs.length > 0) {
    items.push({
      id: "faqs",
      title: "FAQs",
      icon: HelpCircle,
    });
  }

  return items;
}

/**
 * Generates TOC items for Rankings tab based on available data
 */
export function generateRankingsTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const rankings = data.tabs.rankings;

  // Rankings
  if (rankings.items && rankings.items.length > 0) {
    items.push({ id: "rankings", title: "Rankings", icon: TrendingUp });
  }

  // Accreditations
  if (rankings.accreditations && rankings.accreditations.length > 0) {
    items.push({ id: "accreditations", title: "Accreditations", icon: ShieldCheck });
  }

  // Recognition lists from rankings
  if (rankings.items && rankings.items.some(r =>
    (r.accreditations_list && r.accreditations_list.length > 0) ||
    (r.recognitions_list && r.recognitions_list.length > 0)
  )) {
    items.push({ id: "recognitions", title: "Recognitions", icon: Medal });
  }

  // FAQs
  if (rankings.faqs && rankings.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

/**
 * Generates TOC items for Placements tab based on available data
 */
export function generatePlacementsTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const placements = data.tabs.placements;

  // Placement stats
  if (placements.latest_stats || (placements.items && placements.items.length > 0)) {
    items.push({ id: "placement-stats", title: "Placement Statistics", icon: TrendingUp });
  }

  // Placement process
  if (hasContent(placements.placement_process)) {
    items.push({ id: "placement-process", title: "Placement Process", icon: Briefcase });
  }

  // Top recruiters
  if (placements.items && placements.items.some(p => p.top_recruiters && p.top_recruiters.length > 0)) {
    items.push({ id: "top-recruiters", title: "Top Recruiters", icon: Building2 });
  }

  // Branch-wise stats
  if (placements.items && placements.items.some(p =>
    p.branch_wise_stats_json && p.branch_wise_stats_json.length > 0
  )) {
    items.push({ id: "branch-wise", title: "Branch-wise Placements", icon: GraduationCap });
  }

  // Summer internships
  if (hasContent(placements.summer_internships_intro) ||
    (placements.items && placements.items.some(p =>
      p.internship_stats_json && p.internship_stats_json.length > 0
    ))
  ) {
    items.push({ id: "internships", title: "Internships", icon: Users });
  }

  // FAQs
  if (placements.faqs && placements.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

/**
 * Generates TOC items for Campus Life tab based on available data
 */
export function generateCampusLifeTOC(data: CollegeDetail): TOCItem[] {
  const tocItems: TOCItem[] = [];
  const campusLife = data.tabs.campus_life;

  if (campusLife.items && campusLife.items.length > 0) {
    // Convert items array to lookup by type
    const itemsByType = campusLife.items.reduce((acc, item) => {
      acc[item.type] = item;
      return acc;
    }, {} as Record<string, typeof campusLife.items[0]>);

    if (itemsByType['campus_life'] && (hasContent(itemsByType['campus_life'].intro) || hasContent(itemsByType['campus_life'].details))) {
      tocItems.push({ id: "campus-life-intro", title: "Campus Life", icon: Home });
    }
    if (itemsByType['student_clubs'] && (hasContent(itemsByType['student_clubs'].intro) || hasContent(itemsByType['student_clubs'].details))) {
      tocItems.push({ id: "student-clubs", title: "Student Clubs", icon: Users });
    }
    if (itemsByType['fest'] && (hasContent(itemsByType['fest'].intro) || hasContent(itemsByType['fest'].details))) {
      tocItems.push({ id: "fests", title: "Fests & Events", icon: PartyPopper });
    }
    if (itemsByType['tech_fests'] && (hasContent(itemsByType['tech_fests'].intro) || hasContent(itemsByType['tech_fests'].details))) {
      tocItems.push({ id: "tech-fests", title: "Tech Fests", icon: Laptop });
    }
    if (itemsByType['counselling'] && (hasContent(itemsByType['counselling'].intro) || hasContent(itemsByType['counselling'].details))) {
      tocItems.push({ id: "counselling", title: "Counselling Services", icon: HeartHandshake });
    }
  }

  // FAQs
  if (campusLife.faqs && campusLife.faqs.length > 0) {
    tocItems.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return tocItems;
}

/**
 * Generates TOC items for Research tab based on available data
 */
export function generateResearchTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const research = data.tabs.research;

  if (research.items && research.items.length > 0) {
    // Research centres
    if (research.items.some(r => r.research_centre_name)) {
      items.push({ id: "research-centres", title: "Research Centres", icon: FlaskConical });
    }

    // Research domains
    if (research.items.some(r => hasContent(r.research_domain) || (Array.isArray(r.research_area) ? r.research_area.length > 0 : r.research_area))) {
      items.push({ id: "research-areas", title: "Research Areas", icon: Beaker });
    }

    // Patents
    if (research.items.some(r => r.patent_number || r.patent_title)) {
      items.push({ id: "patents", title: "Patents", icon: Lightbulb });
    }

    // Facilities
    if (research.items.some(r => hasContent(r.facilities_description))) {
      items.push({ id: "research-facilities", title: "Research Facilities", icon: Building2 });
    }
  }

  // FAQs
  if (research.faqs && research.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

/**
 * Generates TOC items for Campus Facilities tab based on available data
 */
export function generateCampusFacilitiesTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const facilities = data.tabs.campus_facilities;

  if (facilities.items && facilities.items.length > 0) {
    // Group by category
    const categories = [...new Set(facilities.items.map(f => f.facility_category))].filter(Boolean);
    categories.forEach(category => {
      items.push({
        id: `facility-${category.toLowerCase().replace(/\s+/g, '-')}`,
        title: category,
        icon: Landmark
      });
    });
  }

  // FAQs
  if (facilities.faqs && facilities.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

/**
 * Generates TOC items for Online Courses tab based on available data
 */
export function generateOnlineCoursesTOC(data: CollegeDetail): TOCItem[] {
  const items: TOCItem[] = [];
  const onlineCourses = data.tabs.online_courses;

  if (onlineCourses.items && onlineCourses.items.length > 0) {
    items.push({ id: "online-courses-list", title: "Online Courses", icon: Laptop });
  }

  // FAQs
  if (onlineCourses.faqs && onlineCourses.faqs.length > 0) {
    items.push({ id: "faqs", title: "FAQs", icon: HelpCircle });
  }

  return items;
}

// =============================================================================
// EXAM TOC GENERATORS
// =============================================================================

/**
 * Generates TOC items for Exam Eligibility tab based on available data
 */
// export function generateExamEligibilityTOC(
//   eligibility: ExamDetail['tabs']['eligibility'],
//   faqs: ExamDetail['tabs']['faqs']
// ): TOCItem[] {
//   const eligibilityFaqs = faqs.items.filter(faq =>
//     faq.topic.toLowerCase() === 'eligibility'
//   );

//   // Check for foreign categories
//   const hasForeignCategories = eligibility.items.some(item =>
//     item.category_name.toLowerCase().includes('nri') ||
//     item.category_name.toLowerCase().includes('oci') ||
//     item.category_name.toLowerCase().includes('foreign') ||
//     item.category_name.toLowerCase().includes('international')
//   );

//   const items: TOCItem[] = [];

//   items.push({ id: 'eligibility-intro', title: 'Eligibility Overview', icon: Sparkles });

//   if (eligibility.items.length > 0) {
//     items.push({ id: 'education-qualification', title: 'Education Qualification', icon: GraduationCap });
//     items.push({ id: 'category-eligibility', title: 'Category-wise Eligibility', icon: Users });
//   }

//   if (hasForeignCategories || eligibility.items.length > 0) {
//     items.push({ id: 'nri-oci-eligibility', title: 'NRI/OCI/Foreign Nationals', icon: Globe2 });
//   }

//   if (eligibilityFaqs.length > 0) {
//     items.push({ id: 'eligibility-faqs', title: 'FAQs', icon: HelpCircle });
//   }

//   return items;
// }

// /**
//  * Generates TOC items for Exam Application tab based on available data
//  * Order matches the actual section order in the component
//  */
// export function generateExamApplicationTOC(
//   application: ExamDetail['tabs']['application'],
//   websiteLinks: ExamDetail['tabs']['website_links'],
//   documents: ExamDetail['tabs']['documents_to_upload'],
//   cityChoices: ExamDetail['tabs']['city_choices'],
//   fees: ExamDetail['tabs']['application_fee'],
//   importantPoints: ExamDetail['tabs']['important_points'],
//   faqs: ExamDetail['tabs']['faqs']
// ): TOCItem[] {
//   const applicationFaqs = faqs.items.filter(faq =>
//     faq.topic === 'Application' || faq.topic === 'Application Process'
//   );

//   const hasStepCorrectionWindow = application.items.some(step =>
//     step.correction_window_duration ||
//     (step.correction_window_steps_to_edit && step.correction_window_steps_to_edit.length > 0)
//   );

//   const hasStepEditableFields = application.items.some(step =>
//     (step.editable_fields && step.editable_fields.length > 0) ||
//     (step.non_editable_fields && step.non_editable_fields.length > 0)
//   );

//   const items: TOCItem[] = [];

//   if (application.intro) {
//     items.push({ id: 'application-intro', title: 'Intro', icon: FileText });
//   }

//   if (application.items.length > 0) {
//     items.push({ id: 'application-steps', title: 'Application Steps', icon: ClipboardList });
//   }

//   if (application.prerequisites && application.prerequisites.length > 0) {
//     items.push({ id: 'prerequisites', title: 'Prerequisites', icon: CheckCircle2 });
//   }

//   if (websiteLinks.items.length > 0) {
//     items.push({ id: 'website-links', title: 'Website Links', icon: Globe2 });
//   }

//   if (importantPoints.items.length > 0) {
//     items.push({ id: 'important-points', title: 'Important Points', icon: Lightbulb });
//   }

//   if (documents.items.length > 0) {
//     items.push({ id: 'documents', title: 'Documents', icon: FileText });
//   }

//   if (cityChoices.items.length > 0) {
//     items.push({ id: 'city-choices', title: 'City Choices', icon: Building2 });
//   }

//   if (fees.items.length > 0) {
//     items.push({ id: 'application-fee', title: 'Application Fee', icon: CreditCard });
//   }

//   if (application.correction_window || hasStepCorrectionWindow) {
//     items.push({ id: 'correction-window', title: 'Correction Window', icon: AlertTriangle });
//   }

//   if (application.editable_fields || hasStepEditableFields) {
//     items.push({ id: 'editable-fields', title: 'Editable/Non-Editable Fields', icon: CheckCircle2 });
//   }

//   if (applicationFaqs.length > 0) {
//     items.push({ id: 'application-faqs', title: 'FAQs', icon: HelpCircle });
//   }

//   return items;
// }

// /**
//  * Generates TOC items for Exam Overview tab based on available data
//  * Order matches the actual section order in the component
//  */
// export function generateExamOverviewTOC(
//   overview: ExamDetail['tabs']['overview'],
//   importantDates: ExamDetail['tabs']['important_dates'],
//   courses: ExamDetail['tabs']['courses'],
//   institutes: ExamDetail['tabs']['participating_institutes'],
//   faqs: ExamDetail['tabs']['faqs']
// ): TOCItem[] {
//   const overviewFaqs = faqs.items.filter(faq =>
//     faq.topic === 'Overview' || faq.topic === 'General'
//   );

//   const items: TOCItem[] = [];

//   // About is always present
//   items.push({ id: 'about', title: 'About Exam', icon: Sparkles });

//   // Highlights
//   if (overview.highlights && Object.keys(overview.highlights).length > 0) {
//     items.push({ id: 'highlights', title: 'Highlights', icon: Sparkles });
//   }

//   // Important Dates
//   if (importantDates.items && importantDates.items.length > 0) {
//     items.push({ id: 'important-dates', title: 'Important Dates', icon: Calendar });
//   }

//   // Courses
//   if (courses.items && courses.items.length > 0) {
//     items.push({ id: 'courses', title: 'List of Courses', icon: GraduationCap });
//   }

//   // Participating Institutes
//   if (institutes.items && institutes.items.length > 0) {
//     items.push({ id: 'institutes', title: 'Participating Institutes', icon: Building2 });
//   }

//   // FAQs
//   if (overviewFaqs.length > 0) {
//     items.push({ id: 'faqs', title: 'FAQs', icon: HelpCircle });
//   }

//   return items;
// }