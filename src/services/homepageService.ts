import { apiService, ApiResponse } from "./apiService";

// TypeScript interfaces matching the API response structure
export interface HeroData {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  stats: {
    colleges?: number;
    exams?: number;
    courses?: number;
    careers?: number;
  } | null;
}

export interface QuickAccessItem {
  title: string;
  description: string;
  countText: string;
  buttonText: string;
  buttonUrl: string;
}

export interface WhyCollegeMentorStep {
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface Metric {
  id: string | null;
  label: string;
  value: string;
}

export interface ImageStat {
  imageUrl: string | null;
  caption: string;
}

export interface WhyCollegeMentor {
  heading: string;
  subHeading: string;
  steps: WhyCollegeMentorStep[];
  metrics: Metric[];
  imageStats: ImageStat[];
}

export interface IkigaiFeature {
  title: string;
  description: string;
  icon: string | null;
}

export interface IkigaiSample {
  id: string | null;
  title: string;
  imageUrl: string;
  redirectUrl: string | null;
}

export interface IkigaiCareerTest {
  heading: string;
  subHeading: string;
  features: IkigaiFeature[];
  samples: IkigaiSample[];
  stats: Metric[];
}

export interface PopularExam {
  name: string;
  shortDescription: string;
  participants: string;
  status: string;
  examDates: string;
}

export interface ExamPrep {
  heading: string;
  subHeading: string;
  popularExams: PopularExam[];
  stats: Metric[];
}

export interface Tools {
  title: string;
  subtitle: string;
  description: string;
}

export interface Partner {
  name: string;
  logoUrl: string;
}

export interface MentoringFeature {
  id: string | null;
  title: string;
  description: string;
}

export interface MentorType {
  id: string | null;
  name: string | null;
  description: string | null;
  imageUrl: string;
  label: string;
}

export interface MentoringProgram {
  heading: string;
  subHeading: string;
  features: MentoringFeature[];
  mentorTypes: MentorType[];
}

export interface ScholarshipProgram {
  id: string | null;
  title: string;
  description: string;
  imageUrl: string | null;
  redirectUrl: string | null;
}

export interface Scholarships {
  heading: string;
  subHeading: string;
  programs: ScholarshipProgram[];
  stats: Metric[];
}

export interface StudyAbroadFeature {
  id: string | null;
  title: string | null;
  description: string | null;
  label: string;
}

export interface StudyAbroadDestination {
  id: string | null;
  name: string;
  imageUrl: string | null;
  redirectUrl: string | null;
  flagUrl: string;
}

export interface StudyAbroadCta {
  title: string | null;
  buttonText: string;
  redirectUrl: string | null;
  buttonUrl: string | null;
}

export interface StudyAbroad {
  heading: string;
  subHeading: string;
  features: StudyAbroadFeature[];
  destinations: StudyAbroadDestination[];
  cta: StudyAbroadCta;
}

export interface SuccessStory {
  id: string | null;
  studentName: string;
  testimonial: string;
  course: string;
  institute: string;
  imageUrl: string;
}

export interface SuccessStories {
  heading: string;
  subHeading: string;
  stories: SuccessStory[];
  testimonial: string | null;
}

export interface CallbackField {
  id: string | null;
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export interface CallbackCta {
  buttonText: string;
  redirectUrl: string | null;
  buttonUrl: string | null;
}

export interface CallbackMeta {
  heading: string;
  subHeading: string;
}

export interface Callback {
  meta: CallbackMeta;
  fields: CallbackField[];
  cta: CallbackCta;
}

export interface NewsItem {
  id: string | null;
  title: string;
  redirectUrl: string | null;
  description: string | null;
}

export interface NewsTicker {
  news: NewsItem[];
}

export interface FooterLink {
  id: string | null;
  label: string;
  redirectUrl: string | null;
  url: string;
}

export interface FooterGroup {
  id: string | null;
  title: string;
  links: FooterLink[];
}

export interface FooterCompany {
  name: string;
  description: string | null;
  logoUrl: string | null;
  tagline: string;
  phone: string;
  email: string;
}

export interface Footer {
  company: FooterCompany;
  groups: FooterGroup[];
}

export interface HomepageData {
  hero: HeroData;
  quickAccess: QuickAccessItem[];
  whyCollegeMentor: WhyCollegeMentor;
  ikigaiCareerTest: IkigaiCareerTest;
  examPrep: ExamPrep;
  tools: Tools;
  partners: Partner;
  mentoringProgram: MentoringProgram;
  scholarships: Scholarships;
  studyAbroad: StudyAbroad;
  successStories: SuccessStories;
  callback: Callback;
  newsTicker: NewsTicker;
  footer: Footer;
}

export const homepageService = {
  /**
   * Get Homepage Data API
   * GET /api/home/homepage
   */
  getHomepageData: async (): Promise<any> => {
    return await apiService.get<HomepageData>("/home/homepage");
  },
};


