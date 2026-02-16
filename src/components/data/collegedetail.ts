
export interface College {
  id: number;
  name: string;
  location: string;
  state: string | null;
  city: string | null;
  stream: string | null;
  institute_type: string;
  established: number | null;
  rating: number | null;
  nirf_rank: string | null;
  nirf_score: string | number | null;
  highest_package: string;
  average_package: string;
  median_package: string;
  fees: string | null;
  courses: string[];
  examsAccepted: string[] | null;
  accreditation: string | null;
  cutoff: string | null;
  ownership: string | null;
  collegeCategory: string | null;
  specialization: string | null;
  admissionMode: string | null;
  feesRange: number | null;
  degree: string | null;
  type: string | null;
  instituteType: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CollegeListParams {
  search?: string;
  state?: string;
  category?: string;
  institute_type?: string;
  ordering?: string;
}

// FAQ Item type
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// TAB: Overview
// ============================================
export interface OverviewTab {
  items: Array<{
    partner_university_name: string;
    country: string;
    collaboration_type: string;
    programme_details: string;
    duration: string;
    eligibility: string;
    benefits: string;
    mou_signed_date: string | null;
    additional_info_json: Record<string, any>;
  }>;
  faqs: FAQItem[];
  about: {
    name: string;
    short_description: string;
    description: string;
    established: number;
    location: string;
    city: string;
    state: string;
    institute_type: string;
    campus_area: number | null;
  };
  highlights: Record<string, string>;
  quick_stats: {
    nirf_rank: string;
    nirf_score: number | null;
    qs_ranking: string;
    naac_grade: string;
    naac_score: number | null;
    highest_package: string;
    average_package: string;
    median_package: string;
    top_recruiters: string[];
    programme_levels: string[];
    top_courses: string[];
  };
  academic_collaboration: {
    description: string;
    details: string;
  };
  international_partners: string[];
  international_description: string;
}

// ============================================
// TAB: Courses & Fees
// ============================================
export interface CoursesFeesTab {
  intro: string;
  items: Array<{
    programme_level: string;
    course_name: string;
    duration: string;
    total_fees: string;
    fee_per_semester: string;
    specializations: string[];
    hostel_fees: string;
    additional_info_json: Record<string, any>;
  }>;
  additional_fees: Record<string, string>;
  faqs: FAQItem[];
}

// ============================================
// TAB: Admission
// ============================================
export interface AdmissionTab {
  intro: string;
  items: Array<{
    programme_level: string;
    programme_name: string;
    specializations: string[];
    admission_process: string;
    entrance_tests: string[];
    eligibility_criteria: string;
    seat_matrix: string;
    important_dates_json: Record<string, any> | Array<any>;
    required_documents: string[];
    application_fee: string;
    course_fee: string | null;
    admission_details_json: Record<string, any>;
  }>;
  international_admissions: string;
  admission_process_steps: string[];
  faqs: FAQItem[];
}

// ============================================
// TAB: Cutoff
// ============================================
export interface CutoffTab {
  intro: string;
  items: Array<{
    exam_name: string;
    course_name: string;
    category: string;
    round: number | null;
    opening_rank: number | null;
    closing_rank: number | null;
    year: number;
    cutoff_marks: string;
    cutoff_details_json: Record<string, any>;
  }>;
  faqs: FAQItem[];
}

// ============================================
// TAB: Online Courses
// ============================================
export interface OnlineCourseItem {
  course_name: string;
  duration: string;
  fees: string;
  description: string;
  additional_info_json: {
    eligibility?: string;
    platform?: string;
    mode?: string;
    credits?: string;
    [key: string]: string | undefined;
  };
}

export interface OnlineCoursesTab {
  intro: string;
  items: OnlineCourseItem[];
  faqs: FAQItem[];
}

// ============================================
// TAB: Scholarships
// ============================================
export interface ScholarshipsTab {
  intro: string;
  items: Array<{
    scholarship_name: string;
    scholarship_type: string;
    amount: string;
    eligibility_criteria: string;
    benefits: string;
    income_limit: string;
    cgpa_requirement: string;
    category: string;
    renewal_conditions: string;
    application_process: string;
    scholarship_details_json: Record<string, any>;
  }>;
  faqs: FAQItem[];
}

// ============================================
// TAB: Rankings
// ============================================
export interface RankingsTab {
  intro: string;
  items: Array<{
    ranking_type: string;
    ranking_name: string;
    category: string;
    rank: string;
    year: number;
    score: number | null;
    accreditation_body: string;
    accreditation_status: string;
    accreditation_score: number | null;
    accreditations_list: string[];
    recognitions_list: string[];
    faqs_json: any[];
  }>;
  faqs: FAQItem[];
  accreditations: Array<{
    type: string;
    grade?: string;
    status?: string;
    score?: number | null;
  }>;
}

// ============================================
// TAB: Placements
// ============================================
export interface PlacementsTab {
  intro: string;
  items: Array<{
    placement_year: number;
    programme_type: string;
    total_students_placed: number;
    placement_rate: string;
    highest_package: string;
    average_package: string;
    median_package: string;
    number_of_recruiters: number;
    number_of_offers: number;
    ppos: number;
    top_recruiters: string[];
    branch_wise_stats_json: Array<{
      branch: string;
      package_range?: string;
      placement_rate?: string;
      placement_percentage?: string;
      average_package: string;
      highest_package: string;
      note?: string;
    }>;
    internship_stats_json: Array<{
      description?: string;
      internship_areas?: string;
      training_modules?: string;
      ppo_opportunities?: string;
      internship_availability?: string;
      percentage_getting_internships?: string;
      stipend_range?: string;
      ppo_conversion?: string;
      international_opportunities?: string;
      companies_offering_internships?: string;
    }>;
  }>;
  faqs: FAQItem[];
  placement_process: string;
  summer_internships_intro: string;
  latest_stats: {
    placement_rate?: string;
    highest_package?: string;
    average_package?: string;
    number_of_recruiters?: number;
  } | null;
}

// ============================================
// TAB: Campus Life
// ============================================
export interface CampusLifeTab {
  items: Array<{
    type: string;
    name: string;
    intro: string;
    details: string;
    additional_info_json: Record<string, any>;
  }>;
  faqs: FAQItem[];
}

// ============================================
// TAB: Research
// ============================================
export interface ResearchTab {
  intro: string;
  items: Array<{
    research_area: string[];
    research_domain: string;
    research_centre_name: string;
    facilities_description: string;
    patent_number: string;
    patent_title: string;
    patent_status: string;
    patent_country: string;
    publications_count: number | null;
    research_funding_amount: string;
    funding_source: string;
    research_details_json: Record<string, any>;
  }>;
  faqs: FAQItem[];
}

// ============================================
// TAB: Campus Facilities
// ============================================
export interface CampusFacilitiesTab {
  intro: string;
  items: Array<{
    facility_category: string;
    facility_name: string;
    description: string;
    capacity: string;
    features: string[];
    fees_charges: string;
    availability: string;
    facility_details_json: Record<string, any>;
  }>;
  faqs: FAQItem[];
}

// ============================================
// All Tabs Container
// ============================================
export interface CollegeTabs {
  overview: OverviewTab;
  courses_fees: CoursesFeesTab;
  admission: AdmissionTab;
  cutoff: CutoffTab;
  online_courses: OnlineCoursesTab;
  scholarships: ScholarshipsTab;
  rankings: RankingsTab;
  placements: PlacementsTab;
  campus_life: CampusLifeTab;
  research: ResearchTab;
  campus_facilities: CampusFacilitiesTab;
}

// ============================================
// Main CollegeDetail Interface
// ============================================
export interface CollegeDetail {
  id: number;
  tabs: CollegeTabs;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
}
export interface PopularCollegeComparison {
  collegeId1: number;
  collegeName1: string;
  collegeId2: number;
  collegeName2: string;
}
