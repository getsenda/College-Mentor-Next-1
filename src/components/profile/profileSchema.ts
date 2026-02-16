import { z } from "zod";

// Exam score validation ranges
export const examScoreRanges: Record<string, { min: number; max: number }> = {
  "JEE Main": { min: 0, max: 300 },
  "JEE Advanced": { min: 0, max: 360 },
  "NEET": { min: 0, max: 720 },
  "CAT": { min: 0, max: 100 },
  "GATE": { min: 0, max: 100 },
  "IELTS": { min: 0, max: 9 },
  "TOEFL": { min: 0, max: 120 },
  "GRE": { min: 260, max: 340 },
  "GMAT": { min: 200, max: 800 },
  "SAT": { min: 400, max: 1600 },
};

export const profileFormSchema = z.object({
  // Step 1: Personal Information (Fields 1-9)
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Only alphabetic characters and spaces allowed"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Only alphabetic characters and spaces allowed"),
  mobile: z.string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be less than 15 digits")
    .regex(/^[0-9]+$/, "Only numeric characters allowed"),
  countryCode: z.string().default("+91"),
  city: z.string().min(1, "Please select a city"),
  educationLevel: z.string().min(1, "Please select education level"),
  email: z.string().email("Please enter a valid email address"),
  gender: z.string().optional(),
  streamInterested: z.string().min(1, "Please select a stream"),
  coursesInterested: z.array(z.string()).min(1, "Please select at least one course"),

  // Step 2: Graduation Details (Fields 10, 13)
  graduationInstitute: z.string().optional(),
  graduationYear: z.string().optional(),
  graduationPercentage: z.string().optional(),
  graduationGradeType: z.enum(["percentage", "cgpa", "grade"]),
  graduationCourse: z.string().optional(),
  twelfthSchool: z.string().min(1, "Please enter school name"),
  twelfthCity: z.string().min(1, "Please select city"),
  twelfthYear: z.string().min(1, "Please select passing year"),
  twelfthPercentage: z.string().min(1, "Please enter percentage/grade"),
  twelfthGradeType: z.enum(["percentage", "cgpa", "grade"]),
  twelfthBoard: z.string().min(1, "Please select board"),
  twelfthStream: z.string().min(1, "Please select stream"),
  tenthSchool: z.string().min(1, "Please enter school name"),
  tenthCity: z.string().min(1, "Please select city"),
  tenthYear: z.string().min(1, "Please select passing year"),
  tenthPercentage: z.string().min(1, "Please enter percentage/grade"),
  tenthGradeType: z.enum(["percentage", "cgpa", "grade"]),
  tenthBoard: z.string().min(1, "Please select board"),

  // Step 3: Desired Colleges (Field 14)
  desiredColleges: z.array(z.object({
    collegeName: z.string(),
    courseName: z.string(),
    priority: z.number(),
  })).optional(),

  // Step 4: Work Experience (Field 15)
  hasWorkExperience: z.boolean().optional(),
  workExperiences: z.array(z.object({
    companyName: z.string(),
    designation: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    isCurrentJob: z.boolean(),
    industry: z.string(),
  })).optional(),

  // Step 5: Examinations/Additional (Fields 16-21)
  examsAppeared: z.array(z.object({
    examName: z.string(),
    score: z.string(),
    year: z.string(),
    rank: z.string().optional(),
    percentile: z.string().optional(),
  })).optional(),
  upcomingExams: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  achievements: z.string().optional(),
  extracurriculars: z.array(z.string()).optional(),
  languagesKnown: z.array(z.string()).optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

// Profile completion weights
export const profileCompletionWeights = {
  personalInfo: 30, // Fields 1-9
  graduationInfo: 25, // Fields 10-13
  // desiredCollege: 20, // Field 14
  // workExperience: 15, // Field 15
  // examinations: 10, // Fields 16-21
};

// Data options
export const educationLevels = [
  "10th Pass",
  "12th Pass",
  "Undergraduate",
  "Graduate",
  "Post Graduate",
  "PhD",
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const streams = [
  "Science (PCM)",
  "Science (PCB)",
  "Science (PCMB)",
  "Commerce with Math",
  "Commerce without Math",
  "Arts/Humanities",
  "Vocational",
];

export const courses = [
  "B.Tech Computer Science",
  "B.Tech Electronics",
  "B.Tech Mechanical",
  "B.Tech Civil",
  "B.Com",
  "BBA",
  "BA Economics",
  "BA English",
  "BSc Physics",
  "BSc Chemistry",
  "BSc Mathematics",
  "MBBS",
  "BDS",
  "B.Pharm",
  "LLB",
  "BCA",
  "B.Arch",
];

export const boards = [
  "CBSE",
  "ICSE",
  "Maharashtra State Board",
  "Karnataka State Board",
  "Tamil Nadu State Board",
  "Andhra Pradesh State Board",
  "Telangana State Board",
  "Gujarat State Board",
  "Rajasthan State Board",
  "UP State Board",
  "West Bengal State Board",
  "Kerala State Board",
  "IB (International Baccalaureate)",
  "Cambridge (IGCSE)",
  "Other State Board",
];

export const streamOptions = [
  { value: "pcm", label: "Science (PCM - Physics, Chemistry, Math)" },
  { value: "pcb", label: "Science (PCB - Physics, Chemistry, Biology)" },
  { value: "pcmb", label: "Science (PCMB - Physics, Chemistry, Math, Biology)" },
  { value: "commerce-math", label: "Commerce (with Math)" },
  { value: "commerce", label: "Commerce (without Math)" },
  { value: "arts", label: "Arts/Humanities" },
  { value: "vocational", label: "Vocational Courses" },
];

export const graduationCourses = [
  "B.Tech Computer Science",
  "B.Tech Electronics & Communication",
  "B.Tech Mechanical Engineering",
  "B.Tech Civil Engineering",
  "B.Tech Electrical Engineering",
  "B.Com (Hons)",
  "B.Com General",
  "BBA",
  "BA Economics",
  "BA English",
  "BA Political Science",
  "BA History",
  "BSc Physics",
  "BSc Chemistry",
  "BSc Mathematics",
  "BSc Computer Science",
  "MBBS",
  "BDS",
  "B.Pharm",
  "LLB",
  "BCA",
  "B.Arch",
  "B.Des",
  "BHM",
  "B.Ed",
];

export const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Bhopal",
  "Indore",
  "Nagpur",
  "Kochi",
  "Trivandrum",
  "Coimbatore",
  "Visakhapatnam",
  "Patna",
  "Ranchi",
  "Guwahati",
  "Bhubaneswar",
  "Surat",
  "Vadodara",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Other",
];

export const examsList = [
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "CAT",
  "MAT",
  "XAT",
  "GATE",
  "CLAT",
  "IELTS",
  "TOEFL",
  "GRE",
  "GMAT",
  "SAT",
  "UPSC",
  "State PSC",
  "SSC",
  "Banking Exams",
  "Other",
];

export const topColleges = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Hyderabad",
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Kozhikode",
  "IIM Indore",
  "AIIMS Delhi",
  "AIIMS Jodhpur",
  "NIT Trichy",
  "NIT Warangal",
  "NIT Surathkal",
  "BITS Pilani",
  "BITS Hyderabad",
  "BITS Goa",
  "Delhi University",
  "JNU Delhi",
  "Amity University",
  "VIT Vellore",
  "SRM University",
  "Manipal University",
  "Other",
];

export const industries = [
  "Information Technology",
  "Finance & Banking",
  "Healthcare",
  "Manufacturing",
  "Education",
  "Retail",
  "E-commerce",
  "Consulting",
  "Media & Entertainment",
  "Real Estate",
  "Hospitality",
  "Government",
  "Nonprofit",
  "Startup",
  "Other",
];

export const languageOptions = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Urdu",
  "Odia",
  "Assamese",
  "French",
  "German",
  "Spanish",
  "Mandarin",
  "Japanese",
  "Other",
];

export const generateYears = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  return years;
};

// Calculate profile completion percentage
export const calculateProfileCompletion = (data: Partial<ProfileFormData>): {
  total: number;
  personalInfo: number;
  graduationInfo: number;
  desiredCollege: number;
  workExperience: number;
  examinations: number;
} => {
  // Personal Info (30%)
  const personalFields = [
    data.firstName,
    data.lastName,
    data.mobile,
    data.city,
    data.educationLevel,
    data.email,
    data.streamInterested,
    data.coursesInterested?.length,
  ];
  const personalInfoFilled = personalFields.filter(Boolean).length;
  const personalInfoScore = Math.round((personalInfoFilled / personalFields.length) * 100);

  // Graduation Info (25%)
  const graduationFields = [
    data.twelfthSchool,
    data.twelfthCity,
    data.twelfthYear,
    data.twelfthPercentage,
    data.twelfthBoard,
    data.twelfthStream,
    data.tenthSchool,
    data.tenthCity,
    data.tenthYear,
    data.tenthPercentage,
    data.tenthBoard,
    data.graduationInstitute,
  ];
  const graduationInfoFilled = graduationFields.filter(Boolean).length;
  const graduationInfoScore = Math.round((graduationInfoFilled / graduationFields.length) * 100);

  // Desired College (20%)
  const desiredCollegeScore = data.desiredColleges && data.desiredColleges.length > 0 ? 100 : 0;

  // Work Experience (15%)
  const workExperienceScore = data.hasWorkExperience !== undefined
    ? (data.workExperiences && data.workExperiences.length > 0 ? 100 : (data.hasWorkExperience === false ? 100 : 0))
    : 0;

  // Examinations (10%)
  const examFields = [
    data.examsAppeared?.length,
    data.upcomingExams?.length,
  ];
  const examsFilled = examFields.filter(Boolean).length;
  const examinationsScore = Math.round((examsFilled / examFields.length) * 100);

  // Total weighted score
  const total = Math.round(
    (personalInfoScore * profileCompletionWeights.personalInfo / 100) +
    (graduationInfoScore * profileCompletionWeights.graduationInfo / 100)
    // (desiredCollegeScore * profileCompletionWeights.desiredCollege / 100) +
    // (workExperienceScore * profileCompletionWeights.workExperience / 100) +
    // (examinationsScore * profileCompletionWeights.examinations / 100)
  );

  return {
    total,
    personalInfo: personalInfoScore,
    graduationInfo: graduationInfoScore,
    desiredCollege: desiredCollegeScore,
    workExperience: workExperienceScore,
    examinations: examinationsScore,
  };
};

// Get profile strength color based on percentage
export const getProfileStrengthColor = (percentage: number): {
  color: string;
  bgColor: string;
  label: string;
  description: string;
} => {
  if (percentage <= 40) {
    return {
      color: "text-red-500",
      bgColor: "bg-red-500",
      label: "Incomplete",
      description: "Limited mentor matching available",
    };
  } else if (percentage <= 70) {
    return {
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
      label: "Moderate",
      description: "Basic mentor suggestions enabled",
    };
  } else {
    return {
      color: "text-green-500",
      bgColor: "bg-green-500",
      label: "Complete",
      description: "Full platform features unlocked",
    };
  }
};