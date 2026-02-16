// api/comparison.types.ts
// API response model
export interface PopularComparisonPair {
  course1: {
    id: number;
    name: string;
    description: string;
    code: string;
  };
  course2: {
    id: number;
    name: string;
    description: string;
    code: string;
  };
  popularity: string;
}
// API response model
export interface PopularComparisonApiResponse {
  courseId1: number;
  courseCode1: string;
  courseName1: string;
  description1: string;
  courseId2: number;
  courseCode2: string;
  courseName2: string;
  description2: string;
  popularity: string;
}


export interface CourseHighlights {
    degree_name: string;
    degree_types: string[];
    degree_programme: Record<string, string>;
    duration: Record<string, string>;
    eligibility_criteria: Record<string, string>;
    average_fee: Record<string, string>;
    average_salary: Record<string, string>;
    entrance_exams: string[];
    job_profiles: string[];
    top_recruiters: string[];
  }
  
  export interface CurriculumItem {
    programme_type: string;
    programme_level: string;
    semester: string;
    core_subjects: string[];
  }
  
  export interface Curriculum {
    intro: string;
    items: CurriculumItem[];
  }
  
  export interface CollegeItem {
    college_name: string;
    location: string;
    rank: number;
    average_fee: string;
    college_type: "Government" | "Private";
  }
  
  export interface TopColleges {
    intro: string;
    items: CollegeItem[];
  }
  
  export interface CareerItem {
    job_profile: string;
    job_description: string;
    average_salary: string;
  }
  
  export interface TopCareers {
    intro: string;
    items: CareerItem[];
  }
  
  export interface UpcomingTrends {
    intro: string;
    data: {
      scope_in_india: string;
      scope_abroad: string;
      higher_education_opportunities: string;
      foreign_universities: string[];
    };
  }
  
  export interface CourseDetail {
    id: number;
    tabs: {
      overview: {
        name: string;
        what_is: string;
        degree_name: string;
        highlights: CourseHighlights;
        section_intros: Record<string, string>;
      };
      courses: {
        degree_programme: Record<string, string>;
        degree_duration: Record<string, string>;
        eligibility_criteria: Record<string, string>;
        average_fee: Record<string, string>;
        average_salary: Record<string, string>;
      };
      admission: {
        eligibility_criteria: Array<{
          course_type: string;
          eligibility_criteria: string;
          duration: string;
        }>;
        top_colleges: CollegeItem[];
      };
      curriculum: Curriculum;
      top_colleges: TopColleges;
      top_careers: TopCareers;
      upcoming_trends: UpcomingTrends;
      faqs: {
        items: Array<{
          question: string;
          answer: string;
        }>;
      };
      ug_courses?: Array<{ name: string; programme_level: string }>;
      pg_courses?: Array<{ name: string; programme_level: string }>;
    };
  }
  
  export type CourseDetailResponse = CourseDetail[];
  