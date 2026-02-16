"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronDown, Search, User, Menu, X, LogIn, UserPlus, BookOpen, GraduationCap, Award, Briefcase, Globe, Calculator, Target, TrendingUp, ChevronRight, FileText, Building2, Loader2, Users, Bell, Info, DollarSign, Plane } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useRouter, usePathname } from 'next/navigation';
import { searchService, SearchResults } from '../../services/searchService';
import { logger } from '@/utils/logger';

const predictorTools = [
  'College Predictor',
  'Rank Predictor',
  'College Compare',
  'Course Compare',
  'Eligibility Checker'
];

// Dropdown data structure from Excel file - organized by streams
const collegedekhoDropdownMenus = {
  Courses: {
    streams: [
      {
        name: "Engineering",
        topCourses: [
          "Artificial Intelligence",
          "AI and Robotics",
          "Robotics Engineering",
          "Automation and Robotics",
          "Internet of Things (IoT)",
          "Embedded Systems",
          "Intelligent Systems",
          "Data Management",
          "Cloud Technology",
          "Information Security",
          "Cyber Defense",
          "Blockchain",
          "Augmented and Virtual Reality",
          "Game Technology",
          "Software Engineering"
        ],
        degrees: [
          "BTech",
          "BE",
          "MTech",
          "ME"
        ],
        compare: [
          "Aerospace Engineering vs Areonatuial Engineering",
          "Artificial Intelligence vs Robotics Engineering",
          "Cyber Defense vs Blockchain",
          "Software Engineering vs AI",
          "Mechanical vs Mechatronics",
          "ECE vs Electrical Engineering",
          "Biomedical vs Biotechnology",
          "Computer Science vs Electronics & Communication",
          "Computer Science vs Mechanical",
          "Computer Science vs Civil",
          "Computer Science vs Electrical",
          "Computer Science vs IT",
          "Mechanical vs Civil",
          "Mechanical vs Electrical",
          "Electronics & Communication vs IT"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Business & Management",
        topCourses: [
          "Marketing Management",
          "Financial Services",
          "Human Resource Management (HRM)",
          "Operations Management",
          "Logistics and Supply Chain Management",
          "Product Management",
          "Project Management",
          "International Business",
          "Entrepreneurship",
          "Digital Marketing"
        ],
        degrees: [
          "BBA (Bachelor of Business Administration)",
          "BMS (Bachelor of Management Studies)",
          "BBM (Bachelor of Business Management)",
          "MBA (Master of Business Administration)",
          "PGDM (Post Graduate Diploma in Management)",
          "Integrated BBA + MBA",
          "Executive MBA (EMBA)",
          "Online MBA"
        ],
        compare: [
          "Marketing Management vs Digital Marketing",
          "Operations Management vs Project Management",
          "Logistics & Supply Chain vs Operations Management",
          "International Business vs Export Import Management",
          "Entrepreneurship vs General Management"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Medicine",
        topCourses: [
          "General Medicine and Surgery",
          "General Surgery",
          "Dental",
          "Paediatrics and Child Health",
          "Gynaecology and Obstetrics",
          "Orthopaedics",
          "Cardiology",
          "Neurology",
          "Forensic Medicine",
          "Ayurveda"
        ],
        degrees: [
          "MBBS",
          "BDS",
          "BAMS",
          "BHMS",
          "BUMS",
          "BVSc & AH",
          "MD",
          "MS",
          "DM",
          "MCh"
        ],
        compare: [
          "Dental vs General Medicine",
          "Gynaecology and Obstetrics",
          "Orthopaedics vs Cardiology",
          "Neurology vs Forensic Medicine"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Law",
        topCourses: [
          "Corporate Law",
          "Intellectual Property Rights",
          "IP and Technology Law",
          "Cyber Law",
          "Commercial Law",
          "Competition Law",
          "Taxation Law",
          "International Trade Law",
          "Environmental Law",
          "Criminal Law"
        ],
        degrees: [
          "LLB",
          "BA LLB",
          "BBA LLB",
          "BCom LLB",
          "BSc LLB"
        ],
        compare: [
          "Corporate Law vs Company Law",
          "Intellectual Property Rights vs IP and Technology Law",
          "Commercial Law vs Business Law",
          "International Trade Law vs Immigration Law",
          "Consumer Law vs Civil Law"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Animation & Design",
        topCourses: [
          "UI UX",
          "Game Design",
          "Graphic Designing",
          "Animation",
          "Communication Design",
          "Fashion Design",
          "Interior Design",
          "Automotive Design",
          "VLSI Design"
        ],
        degrees: [
          "BDes",
          "BFA",
          "BSc",
          "BA",
          "MDes",
          "MFA"
        ],
        compare: [
          "Animation vs  Game Design",
          "Fashion Design vs Textile Design",
          "Automotive Design vs VLSI Design",
          "Jewellery Design vs Accessory Designing"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Architecture & Planning",
        topCourses: [
          "Industrial Design",
          "Product Design",
          "Urban Planning and Design"
        ],
        degrees: [
          "B.Arch",
          "BPlan",
          "M.Arch",
          "M.Plan"
        ],
        compare: [
          "Industrial Design vs Product Design",
          "Urban Planning and Design vs Product Design",
          "Industrial Design vs  Urban Planning and Design"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Accounting & Commerce",
        topCourses: [
          "Chartered Accountancy (CA)",
          "Company Secretary (CS)",
          "Cost Management Accounting (CMA)",
          "Banking and Insurance",
          "Financial Management",
          "Auditing",
          "Economics",
          "Banking"
        ],
        degrees: [
          "B.Com",
          "B.Com (Hons)",
          "BBA",
          "M.Com",
          "MBA",
          "M.Sc",
          "CA",
          "CMA",
          "CS",
          "CPA",
          "CFA"
        ],
        compare: [
          "CA vs CMA",
          "CA vs CS",
          "CA vs Banking and Insurance",
          "CA vs Finance",
          "CMA vs CS",
          "CMA vs Finance",
          "CS vs Finance",
          "Banking and Insurance vs Finance"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Agriculture",
        topCourses: [
          "Agricultural Science",
          "Horticulture",
          "Fisheries Science",
          "Dairy Technology",
          "Forestry",
          "Food Processing"
        ],
        degrees: [
          "B.Sc Agriculture",
          "B.Sc Horticulture",
          "B.Sc Forestry",
          "B.Sc Animal Husbandry",
          "B.Sc Agribusiness",
          "M.Sc Agriculture.",
          "MBA in Agribusiness"
        ],
        compare: [
          "Agricultural Science vs Horticulture",
          "Fisheries Science vs Dairy Technology",
          "Forestry vs Food Processing"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Nursing",
        topCourses: [
          "Nursing",
          "General Nursing and Midwifery (GNM)",
          "Auxiliary Nurse and Midwifery (ANM)",
          "Medical-Surgical Nursing",
          "Community Health Nursing",
          "Critical Care Nursing",
          "Intensive Care Nursing"
        ],
        degrees: [
          "BSc Nursing",
          "Post Basic BSc Nursing",
          "GNM",
          "ANM",
          "MSc Nursing"
        ],
        compare: [
          "GNM vs ANM",
          "Medical Surgical Nursing vs  Community Health Nursing",
          "Critical Care Nursing vs Intensive Care Nursing"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Pharmacy",
        topCourses: [
          "Pharmacy",
          "Pharmaceutical Technology",
          "Pharmaceutical Biotechnology",
          "Pharmaceutics",
          "Clinical Pharmacy",
          "Industrial Pharmacy",
          "Pharmaceutical Chemistry",
          "Pharmaceutical Quality Assurance",
          "Pharmacology and Toxicology"
        ],
        degrees: [
          "D.Pharm",
          "B.Pharm",
          "M.Pharm",
          "Pharm.D"
        ],
        compare: [
          "Pharmacy vs Pharmaceutics",
          "Pharmacy vs Pharmaceutical Technology",
          "Pharmacy vs Pharmaceutical Biotechnology",
          "Pharmacy vs Pharmaceutical Regulatory Affairs",
          "Pharmacy vs Clinical Pharmacy"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Paramedical & Allied Sciences",
        topCourses: [
          "Physiotherapy",
          "Occupational Therapy",
          "Medical Laboratory Technology",
          "Medical Radiography",
          "Medical Imaging",
          "Radiotherapy",
          "Optometry",
          "Dialysis Technology",
          "Perfusion Technology",
          "Operation Theatre Technology",
          "Anaesthesia Technology",
          "Audiology and Speech Therapy"
        ],
        degrees: [
          "BPT",
          "BOT",
          "BSc MLT",
          "BOptom"
        ],
        compare: [
          "Physiotherapy vs Occupational Therapy",
          "Medical Radiography vs Medical Imaging",
          "Radiotherapy vs Optometry",
          "Dialysis Technology vs Perfusion Technology"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Arts & Humanities",
        topCourses: [
          "Psychology",
          "Political Science",
          "English",
          "History",
          "Sociology",
          "Philosophy"
        ],
        degrees: [
          "BA",
          "MA",
          "BFA",
          "MFA",
          "BSW",
          "MSW"
        ],
        compare: [
          "Psychology vs Sociology",
          "Political Science vs Public Administration",
          "English vs Creative Writing",
          "History vs Archaeology",
          "Philosophy vs Psychology",
          "Public Policy vs Political Science"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Sciences",
        topCourses: [
          "Biotechnology",
          "Physics",
          "Chemistry",
          "Mathematics",
          "Astrophysics",
          "Microbiology",
          "Environmental Studies",
          "Statistics"
        ],
        degrees: [
          "BSc",
          "BSc (Hons)",
          "BS",
          "MSc"
        ],
        compare: [
          "Biotechnology vs Microbiology",
          "Physics vs Engineering Physics",
          "Statistics vs Actuarial Science",
          "Geology vs Applied Geophysics",
          "Biotechnology vs Bioinformatics",
          "Chemistry vs Industrial Biotechnology"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Media & Mass Communication",
        topCourses: [
          "Mass Communication",
          "Journalism",
          "Advertising",
          "Public Relations",
          "Digital Media",
          "Film Making",
          "Visual Communication",
          "Cinematography"
        ],
        degrees: [
          "BA",
          "BJ",
          "BMM",
          "BMC",
          "MA",
          "MJ",
          "BJMC"
        ],
        compare: [
          "Mass Communication vs Journalism",
          "Advertising vs Public Relations",
          "Digital Media vs Visual Communication",
          "Film Making vs Cinematography",
          "Media Management vs Event Management"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      },
      {
        name: "Hospitality & Hotel Management",
        topCourses: [
          "Hotel Management",
          "Hospitality Management",
          "Tourism",
          "Culinary Arts",
          "Travel and Tourism",
          "Food and Beverage Service"
        ],
        degrees: [
          "BHM",
          "B.Sc. in Hospitality and Hotel Administration",
          "MHM",
          "M.Sc. in Hospitality and Tourism Management"
        ],
        compare: [
          "Hotel Management vs Hospitality Management",
          "Tourism vs Travel and Tourism",
          "Culinary Arts vs Catering",
          "Bartending vs Food and Beverage Service"
        ],
        rankPredictor: [],
        collegePredictor: [],
        exams: [],
        colleges: [],
        careers: []
      }
    ],
  },
  Exams: {
    streams: [


      {
        name: "Engineering",
        popularExams: [
          "JEE Main",
          "JEE Advanced",
          "BITSAT",
          "VITEEE",
          "SRMJEEE",
          "AP EAPCET",
          "TG EAPCET",
          "GATE",
          "COMEDK UGET",
          "MHT CET",
          "TNEA",
          "WBJEE",
          "KCET"
        ],
        courseCompare: [
          "Aerospace Engineering vs Areonatuial Engineering",
          "Artificial Intelligence vs Robotics Engineering",
          "Cyber Defense vs Blockchain",
          "Software Engineering vs AI",
          "Mechanical vs Mechatronics",
          "ECE vs Electrical Engineering",
          "Biomedical vs Biotechnology",
          "Computer Science vs Electronics & Communication",
          "Computer Science vs Mechanical",
          "Computer Science vs Civil",
          "Computer Science vs Electrical",
          "Computer Science vs IT",
          "Mechanical vs Civil",
          "Mechanical vs Electrical",
          "Electronics & Communication vs IT"
        ],
        collegeCompare: [
          "IIT Madras vs IIT Kharagpur",
          "IIT Bombay vs NIT Warangal",
          "BITS Pilani vs VIT Chennai",
          "IIT Bombay vs IIT Delhi",
          "NIT Trichy vs IIT Bombay",
          "IIT Kanpur vs IIT Bombay",
          "NIT Trichy vs NIT Warangal",
          "SRM vs VIT",
          "BITS vs VIT"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Business & Management",
        popularExams: [
          "CAT",
          "XAT",
          "SNAP",
          "NMAT",
          "MAT",
          "CMAT",
          "GMAT",
          "ATMA",
          "TG ICET",
          "AP ICET"
        ],
        courseCompare: [
          "Marketing Management vs Digital Marketing",
          "Operations Management vs Project Management",
          "Logistics & Supply Chain vs Operations Management",
          "International Business vs Export Import Management",
          "Entrepreneurship vs General Management"
        ],
        collegeCompare: [
          "IIM Ahmedabad vs IIM Bangalore",
          "FMS Delhi vs XLRI Jamshedpur",
          "ISB Hyderabad vs IIM Calcutta",
          "DoMS IIT Madras vs VGSOM IIT Kharagpur",
          "VGSOM IIT Kharagpur vs IIM Udaipur",
          "XLRI Jamshedpur vs Symbiosis Institute of Business Management (SIBM) Pune"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Medicine",
        popularExams: [
          "NEET UG",
          "NEET PG",
          "INI CET",
          "AIIMS PG",
          "NEET SS",
          "FMGE",
          "NEET MDS",
          "AIAPGET"
        ],
        courseCompare: [
          "Dental vs General Medicine",
          "Gynaecology and Obstetrics",
          "Orthopaedics vs Cardiology",
          "Neurology vs Forensic Medicine"
        ],
        collegeCompare: [
          "AIIMS Delhi vs AIIMS Bhopal",
          "PGIMER Chandigarh vs JIPMER Puducherry",
          "AIIMS Delhi vs JIPMER Puducherry",
          "AIIMS Bhopal vs PGIMER Chandigarh",
          "CMC Vellore vs JIPMER Puducherry"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Law",
        popularExams: [
          "CLAT",
          "AILET",
          "SLAT",
          "AP LAWCET",
          "TG LAWCET",
          "MH CET Law"
        ],
        courseCompare: [
          "Corporate Law vs Company Law",
          "Intellectual Property Rights vs IP and Technology Law",
          "Commercial Law vs Business Law",
          "International Trade Law vs Immigration Law",
          "Consumer Law vs Civil Law"
        ],
        collegeCompare: [
          "NLSIU Bangalore vs NALSAR Hyderabad",
          "NLU Delhi vs Gujarat National Law University",
          "Jamia Millia Islamia vs BHU Law",
          "GNLU Gandhinagar vs NUJS Kolkata"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Govt Exams",
        popularExams: [
          "UPSC CSE",
          "SSC CGL",
          "SSC CHSL",
          "IBPS PO",
          "IBPS Clerk",
          "SBI PO",
          "SBI Clerk",
          "RRB NTPC",
          "Railway Group D",
          "AP PSC",
          "TG PSC",
          "CTET",
          "APSET",
          "RRB JE",
          "DRDO CEPTAM",
          "NDA",
          "CDS",
          "AFCAT"
        ],
        courseCompare: [],
        collegeCompare: [],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Animation & Design",
        popularExams: [
          "NIFT Entrance",
          "NID DAT",
          "UCEED",
          "CEED",
          "AIEED",
          "SEED"
        ],
        courseCompare: [
          "Animation vs  Game Design",
          "Fashion Design vs Textile Design",
          "Automotive Design vs VLSI Design",
          "Jewellery Design vs Accessory Designing"
        ],
        collegeCompare: [
          "NIFT Delhi vs NID Ahmedabad",
          "Pearl Academy vs MIT Institute of Design",
          "SOFT Pune vs Arch Academy of Design"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Architecture & Planning",
        popularExams: [
          "NATA",
          "JEE Main Paper 2",
          "JEE Advanced (Architecture)",
          "GATE Architecture"
        ],
        courseCompare: [
          "Industrial Design vs Product Design",
          "Urban Planning and Design vs Product Design",
          "Industrial Design vs  Urban Planning and Design"
        ],
        collegeCompare: [
          "IIT Roorkee vs IIT Kharagpur",
          "SPA Delhi vs CEPT Ahmedabad",
          "Jamia Millia vs NIT Calicut"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Accounting & Commerce",
        popularExams: [
          "CA Foundation",
          "CA Intermediate",
          "CA Final",
          "CS Executive",
          "CS Professional",
          "CMA Foundation",
          "CMA Intermediate",
          "CMA Final"
        ],
        courseCompare: [
          "CA vs CMA",
          "CA vs CS",
          "CA vs Banking and Insurance",
          "CA vs Finance",
          "CMA vs CS",
          "CMA vs Finance",
          "CS vs Finance",
          "Banking and Insurance vs Finance"
        ],
        collegeCompare: [
          "Shri Ram College of Commerce (SRCC), Delhi vs  Lady Shri Ram College for Women (LSR), Delhi",
          "Hindu College, Delhi vs St. Xavier's College, Mumbai",
          "Christ University, Bangalore vs Loyola College, Chennai",
          "Shri Ram College of Commerce (SRCC), Delhi vs Loyola College, Chennai"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Agriculture",
        popularExams: [
          "ICAR AIEEA",
          "AGRICET",
          "TG EAPCET",
          "AP EAPCET",
          "LPU NEST – Agriculture",
          "OUAT Entrance Exam"
        ],
        courseCompare: [
          "Agricultural Science vs Horticulture",
          "Fisheries Science vs Dairy Technology",
          "Forestry vs Food Processing"
        ],
        collegeCompare: [
          "IARI Delhi vs PAU Ludhiana",
          "GBPUAT vs CCSHAU",
          "UAS Bangalore vs TNAU Coimbatore",
          "BHU vs Parul University"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Nursing",
        popularExams: [
          "AIIMS Nursing",
          "JIPMER Nursing",
          "PGIMER Nursing",
          "RUHS Nursing",
          "NEET UG"
        ],
        courseCompare: [
          "GNM vs ANM",
          "Medical Surgical Nursing vs  Community Health Nursing",
          "Critical Care Nursing vs Intensive Care Nursing"
        ],
        collegeCompare: [
          "AIIMS Delhi vs CMC Vellore",
          "PGIMER Chandigarh vs JIPMER Puducherry",
          "AFMC Pune vs Manipal College of Nursing"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Pharmacy",
        popularExams: [
          "GPAT",
          "NIPER JEE",
          "BITS HD Pharmacy",
          "UPESPAT",
          "TG EAPCET",
          "AP EAPCET"
        ],
        courseCompare: [
          "Pharmacy vs Pharmaceutics",
          "Pharmacy vs Pharmaceutical Technology",
          "Pharmacy vs Pharmaceutical Biotechnology",
          "Pharmacy vs Pharmaceutical Regulatory Affairs",
          "Pharmacy vs Clinical Pharmacy"
        ],
        collegeCompare: [
          "Jamia Hamdard vs Manipal College of Pharmacy",
          "NIPER Mohali vs JSS Mysore",
          "JSS College of Pharmacy vs NIPER Hyderabad"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Arts & Humanities",
        popularExams: [
          "CUET UG",
          "CUET PG",
          "Symbiosis Entrance Test",
          "Azim Premji National Entrance Test",
          "Ashoka Aptitude Test (AAT)"
        ],
        courseCompare: [
          "Psychology vs Sociology",
          "Political Science vs Public Administration",
          "English vs Creative Writing",
          "History vs Archaeology",
          "Philosophy vs Psychology",
          "Public Policy vs Political Science"
        ],
        collegeCompare: [
          "Jawaharlal Nehru University vs University of Hyderabad",
          "Jamia Millia Islamia vs Aligarh Muslim University",
          "University of Delhi vs Banaras Hindu University"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Sciences",
        popularExams: [
          "CUET UG",
          "CUET PG",
          "IIT JAM",
          "NEST",
          "OUAT Entrance Exam",
          "IISER Aptitude Test (IAT)"
        ],
        courseCompare: [
          "Biotechnology vs Microbiology",
          "Physics vs Engineering Physics",
          "Statistics vs Actuarial Science",
          "Geology vs Applied Geophysics",
          "Biotechnology vs Bioinformatics",
          "Chemistry vs Industrial Biotechnology"
        ],
        collegeCompare: [
          "IISER Pune vs IISER Kolkata",
          "IISER Pune vs IISc, Bangalore",
          "Hindu College, New Delhi vs  Loyola College, Chennai",
          "IISER Mohali vs IISER Bhopal"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Media & Mass Communication",
        popularExams: [
          "JMI Entrance Exam",
          "IIMC Entrance Exam",
          "GMCET",
          "CUET"
        ],
        courseCompare: [
          "Mass Communication vs Journalism",
          "Advertising vs Public Relations",
          "Digital Media vs Visual Communication",
          "Film Making vs Cinematography",
          "Media Management vs Event Management"
        ],
        collegeCompare: [
          "IIMC Delhi vs Asian College of Journalism (ACJ) Chennai",
          "Xavier Institute of Communications (XIC) Mumbai vs Symbiosis Institute of Media and Communication (SIMC) Pune",
          "Jamia Millia Islamia vs IIMC Delhi"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      },
      {
        name: "Hospitality & Hotel Management",
        popularExams: [
          "NCHM JEE",
          "IIHM eCHAT",
          "AIHMCT WAT"
        ],
        courseCompare: [
          "Hotel Management vs Hospitality Management",
          "Tourism vs Travel and Tourism",
          "Culinary Arts vs Catering",
          "Bartending vs Food and Beverage Service"
        ],
        collegeCompare: [
          "IHM Delhi vs IHM Mumbai",
          "IHM Bangalore vs IHM Chennai",
          "Banarsidas Chandiwala Institute of Hotel Management & Catering Technology vs Welcomgroup Graduate School of Hotel Administration"
        ],
        moreExams: [],
        popularColleges: [],
        popularCourses: [],
        careers: [],
        rankPredictor: [],
        collegePredictor: []
      }
    ],


  },
  Colleges: {
    streams: [
      {
        name: 'Engineering',
        byDegrees: ['Top Engineering Colleges in India', 'Top Private Engineering Colleges in India', 'Top IITs in India', 'Top NITs in India', 'Top IIITs in India', 'Top B.Tech Colleges in India', 'Top M.Tech Colleges in India', 'Top Diploma Colleges in India'],
        byLocation: ['Top Engineering Colleges in Bangalore', 'Top Engineering Colleges in Mumbai', 'Top Engineering Colleges in Chennai', 'Top Engineering Colleges in Tamilnadu', 'Top Engineering Colleges in Hyderabad', 'Top Engineering Colleges in Karnataka', 'Top Engineering Colleges in Andhra Pradesh', 'Top Engineering Colleges in Telangana', 'Top Engineering Colleges in Pune', 'Top Engineering Colleges in Maharashtra', 'Top Engineering Colleges in Delhi', 'Top Engineering Colleges in Gujarat', 'Top Engineering Colleges in West Bengal'],
        popularColleges: ['IIT Madras', 'IIT Delhi', 'IIT Bombay', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Roorkee', 'IIT Hyderabad', 'IIT Guwahati', 'NIT Trichy', 'IIT (BHU) Varanasi'],
        rankPredictor: ['JEE Mains Rank Predictor', 'JEE Mains Percentile Predictor', 'JEE Advanced Rank Predictor', 'AP EAMCET Rank Predictor', 'TS EAMCET Rank Predictor', 'KCET Rank Predictor', 'MHT CET Rank Predictor', 'KEAM Rank Predictor', 'TNEA Rank Predictor', 'WBJEE Rank Predictor'],
        predictor: ['JEE Main College Predictor', 'JEE Advanced College Predictor', 'AP EAMCET College Predictor', 'TS EAMCET College Predictor', 'KCET College Predictor', 'MHT CET College Predictor'],
        compare: ['IIT Madras vs IIT Kharagpur', 'IIT Bombay vs NIT Warangal', 'BITS Pilani vs VIT Chennai', 'IIT Bombay vs IIT Delhi', 'NIT Trichy vs IIT Bombay', 'SRM vs VIT', 'BITS vs VIT'],
        topColleges: ['IIT Madras', 'IIT Delhi', 'IIT Bombay', 'IIT Kanpur', 'IIT Kharagpur', 'IIT Roorkee', 'IIT Hyderabad', 'IIT Guwahati', 'NIT Trichy', 'IIT (BHU) Varanasi'],
        exams: ['JEE Mains', 'JEE Advance', 'AP EAMCET', 'TS EAMCET', 'KCET', 'MHT CET', 'KEAM', 'TNEA', 'COMEDK', 'GATE', 'WBJEE'],
      },
      {
        name: 'Business & Management',
        byDegrees: ['Top MBA Colleges in India', 'IIMs in India', 'Top Private MBA Colleges in India', 'Top Online MBA Colleges in India', 'Top PGDM Colleges in India', 'Top BBA Colleges in India'],
        byLocation: ['Top MBA Colleges in Bangalore', 'Top MBA Colleges in Mumbai', 'Top MBA Colleges in Chennai', 'Top MBA Colleges in Hyderabad', 'Top MBA Colleges in Pune', 'Top MBA Colleges in Delhi', 'Top MBA Colleges in Maharashtra', 'Top MBA Colleges in Andhra Pradesh', 'Top MBA Colleges in Telangana'],
        popularColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Kozhikode', 'IIT Delhi', 'IIM Lucknow', 'IIM Mumbai', 'IIM Calcutta', 'IIM Indore', 'MDI Gurgaon', 'XLRI Jamshedpur'],
        rankPredictor: ['CAT Rank Predictor'],
        predictor: ['CAT College Predictor', 'XAT College Predictor', 'SNAP College Predictor', 'NMAT College Predictor', 'GMAT College Predictor', 'APICET College Predictor', 'Karnataka PGCET College Predictor', 'KMAT College Predictor'],
        compare: ['IIM Ahmedabad vs IIM Bangalore', 'FMS Delhi vs XLRI Jamshedpur', 'ISB Hyderabad vs IIM Calcutta', 'DoMS IIT Madras vs VGSOM IIT Kharagpur'],
        topColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'XLRI Jamshedpur', 'FMS Delhi', 'ISB Hyderabad'],
        exams: ['CAT', 'MAT', 'TSICET', 'XAT', 'SNAP', 'NMAT', 'GMAT', 'APICET', 'Karnataka PGCET', 'KMAT'],
      },
      {
        name: 'Medicine',
        byDegrees: ["Top MBA Colleges in India", "IIMs in India", "Top Private MBA Colleges in India", "Top Online MBA Colleges in India", "Top PGDM Colleges in India", "Top BBA Colleges in India"],
        byLocation: ["Top Medical Colleges in Andhra Pradesh",
          "Top Medical Colleges in Telangana",
          "Top Medical Colleges in Karnataka",
          "Top Medical Colleges in Bangalore",
          "Top Medical Colleges in Hyderabad",
          "Top Medical Colleges in Chennai",
          "Top Medical Colleges in Maharashtra",
          "Top Medical Colleges in Mumbai",
          "Top Medical Colleges in Delhi",
          "Top Medical Colleges in Pune"
        ],
        popularColleges: ["IIM Ahmedabad",
          "AIIMS Delhi",
          "PGIMER Chandigarh",
          "CMC Vellore",
          "JIPMER Puducherry",
          "SGPGIMS Lucknow",
          "BHU",
          "NIMHANS Bengaluru",
          "KGMU Lucknow",
          "Amrita University",
          "KMC Manipal"],
        rankPredictor: ['NEET Rank Predictor'],
        predictor: ['NEET PG College Predictor', 'KEAM Predictor', 'NEET UG Predictor'],
        compare: ['AIIMS Delhi vs CMC Vellore', 'JIPMER vs MAMC', 'KMC Manipal vs KIMS'],
        topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER Puducherry', 'MAMC Delhi', 'KGMU Lucknow'],
        exams: ['NEET UG', 'NEET PG', 'AIIMS', 'JIPMER'],
      },
      {
        name: 'Law',
        byDegrees: ["Top Law Colleges in India",
          "Best National Law Universities in India",
          "BA + LLB Colleges in India",
          "Top LLM Colleges in India",
          "Top BCom + LLB Colleges in India",
          "Top BBA + LLB Colleges in India"],
        byLocation: ['Top Law Colleges in Delhi', 'Top Law Colleges in Mumbai', 'Top Law Colleges in Bangalore', 'Top Law Colleges in Chennai', 'Top Law Colleges in Hyderabad', 'Top Law Colleges in Pune'],
        popularColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'Gujarat National Law University', 'Jamia Millia Islamia', 'BHU Law'],
        rankPredictor: ['CLAT Rank Predictor', 'AILET Rank Predictor'],
        predictor: ['CLAT College Predictor', 'AILET Predictor', 'LSAT India Predictor'],
        compare: ['NLSIU Bangalore vs NALSAR Hyderabad', 'NLU Delhi vs Gujarat National Law University', 'Jamia Millia Islamia vs BHU Law'],
        topColleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'GNLU Gandhinagar'],
        exams: ['CLAT', 'AILET', 'LSAT India', 'MH CET Law', 'AP LAWCET'],
      },
      {
        name: 'Animation & Design',
        byDegrees: ["Top NIFT Colleges in India",
          "Top Fashion Design Colleges in India",
          "Top Interior Design Colleges in India",
          "Top Graphic Designing Colleges in India",
          "BDes Colleges in India",
          "MDes Colleges in India",
          "Top Design Colleges in India",
          "Best VFX Colleges in India",
          "Top Animation Colleges in India"],
        byLocation: ['Top Design Colleges in Delhi', 'Top Design Colleges in Mumbai', 'Top Design Colleges in Bangalore', 'Top Design Colleges in Chennai', 'Top Design Colleges in Pune', 'Top Design Colleges in Hyderabad'],
        popularColleges: ["Top Design Colleges in Andhra Pradesh",
          "Top Design Colleges in Telangana",
          "Top Design Colleges in Bangalore",
          "Top Animation Colleges in Mumbai",
          "Top Animation Colleges in Bangalore",
          "Top Animation Colleges in Chennai",
          "Top Animation Colleges in Hyderabad",
          "Design Colleges in Maharashtra",
          "Design Colleges in Tamil Nadu",
          "Design Colleges in Karnataka"],
        rankPredictor: ['NIFT Rank Predictor', 'NID Rank Predictor', 'UCEED Rank Predictor'],
        predictor: ['NIFT College Predictor', 'NID College Predictor', 'UCEED College Predictor'],
        compare: ['NIFT Delhi vs NID Ahmedabad', 'Pearl Academy vs MIT Institute of Design', 'SOFT Pune vs Arch Academy of Design'],
        topColleges: ['NID Ahmedabad', 'NIFT Delhi', 'Pearl Academy', 'IIT Bombay (IDC)', 'MAAC'],
        exams: ['NIFT Entrance', 'NID Entrance', 'UCEED', 'CEED', 'AIEED'],
      },
      {
        name: 'Architecture & Planning',
        byDegrees: ['Top Architecture Colleges in India', 'Best Planning Colleges in India', 'Top Private Architecture Colleges in india', 'Govt Architecture and Planning Colleges in india', 'Top Architecture Colleges in Bangalore'],
        byLocation: ['Top Architecture Colleges in Delhi', 'Top Architecture Colleges in Mumbai', 'Top Architecture Colleges in Chennai', 'Top Architecture Colleges in Bangalore', 'Top Architecture Colleges in Pune', 'Top Architecture Colleges in Hyderabad'],
        popularColleges: ['SPA Delhi', 'CEPT Ahmedabad', 'IIT Kharagpur', 'IIT Roorkee', 'Jamia Millia Islamia', 'Sir JJ College Mumbai'],
        rankPredictor: [],
        predictor: [],
        compare: ['SPA Delhi vs CEPT Ahmedabad', 'IIT Kharagpur vs IIT Roorkee (Architecture)', 'Jamia Millia vs NIT Calicut'],
        topColleges: ['SPA Delhi', 'CEPT Ahmedabad', 'IIT Kharagpur', 'IIT Roorkee', 'Jamia Millia Islamia'],
        exams: ['NATA', 'JEE Main Paper 2', 'GATE (Architecture & Planning)'],
      },
      {
        name: 'Accounting & Commerce',
        byDegrees: ['Best CA Colleges in India', 'Top Commerece Colleges in India', 'Top Private Commerce Colleges in India', 'Top B.Com Colleges in India', 'Top M.Com Colleges in India'],
        byLocation: ['Top Commerce Colleges in Maharashtra', 'Top Commerce Colleges in Karnataka', 'Top Commerce Colleges in Tamilnadu', 'Top Commerce Colleges in Telangana', 'Top Commerce Colleges in Andhra Pradesh', 'Top Commerce Colleges in Chennai'],
        popularColleges: ['SRCC Delhi', 'LSR Delhi', 'St. Xavier\'s Mumbai', 'Loyola Chennai', 'Christ University Bangalore', 'Hindu College Delhi'],
        rankPredictor: [],
        predictor: [],
        compare: ['SRCC vs LSR Delhi', 'St. Xavier\'s Mumbai vs Christ Bangalore', 'Loyola Chennai vs Mount Carmel Bangalore', 'Hindu College vs St.Xavier\'s College,Mumbai'],
        topColleges: ['SRCC Delhi', 'LSR Delhi', 'St. Xavier\'s Mumbai', 'Loyola Chennai', 'Christ Bangalore'],
        exams: ['CA Foundation', 'CA Intermediate', 'CA Final', 'CS Executive', 'CS Professional', 'CMA Foundation'],
      },
      {
        name: 'Agriculture',
        byDegrees: ['Top Agricultural Colleges in India', 'Top Veterinary Colleges in India', 'Best Agriculture Universities in India', 'Top Government Agriculture Colleges in India', 'Top M.Sc Agriculture Colleges in India'],
        byLocation: ['Top Agricultural Colleges in Punjab', 'Top Agricultural Colleges in Haryana', 'Top Agricultural Colleges in Maharashtra', 'Top Agricultural Colleges in Karnataka', 'Top Agricultural Colleges in Tamil Nadu'],
        popularColleges: ['IARI Delhi', 'PAU Ludhiana', 'TNAU Coimbatore', 'BHU', 'UAS Bangalore', 'GBPUAT Pantnagar', 'CCSHAU Hisar'],
        rankPredictor: [],
        predictor: ['ICAR College Predictor', 'Agriculture College Predictor'],
        compare: ['IARI Delhi vs PAU Ludhiana', 'GBPUAT vs CCSHAU', 'UAS Bangalore vs TNAU Coimbatore'],
        topColleges: ['IARI Delhi', 'PAU Ludhiana', 'TNAU Coimbatore', 'UAS Bangalore', 'GBPUAT Pantnagar'],
        exams: ['ICAR AIEEA (UG)', 'ICAR AIEEA (PG)', 'State Agriculture Entrance Exams'],
      },
      {
        name: 'Nursing',
        byDegrees: ['Top Nursing Colleges in India', 'Top B.Sc Nursing Colleges in India', 'Top GNM Colleges in India', 'Top ANM Colleges in India', 'Top M.Sc Nursing Colleges in India'],
        byLocation: ['Nursing Colleges in Maharashtra', 'Nursing Colleges in Tamil Nadu', 'Top Nursing Colleges in Karnataka', 'Top Nursing Colleges in Andhra Pradesh', 'Top Nursing Colleges in Telangana', 'Top Nursing Colleges in Pune'],
        popularColleges: ['AIIMS Delhi (Nursing)', 'CMC Vellore (Nursing)', 'King\'s College of Nursing , Pune', 'JIPMER (Nursing)', 'Narayana Nursing College, Nellore', 'Amrita College of Nursing, Kochi'],
        rankPredictor: [],
        predictor: [],
        compare: ['AIIMS Nursing vs CMC Vellore Nursing', 'JIPMER Chandigarh vs JIPMAR Puducherry', 'AFMC Pune vs Manipal College of Nursing'],
        topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'RAK College Delhi', 'Manipal College of Nursing'],
        exams: ['NEET UG (for B.Sc Nursing)', 'AIIMS Nursing Entrance', 'JIPMER Nursing Entrance', 'State Nursing Entrance Exams'],
      },
      {
        name: 'Pharmacy',
        byDegrees: ['Top Pharmacy Colleges in India', 'Top B.Pharm Colleges in India', 'Top D.Pharm Colleges in India', 'Top M.Pharm Colleges in India', 'Top PharmD Colleges in India'],
        byLocation: ['Top Pharmacy Colleges in Maharashtra', 'Top Pharmacy Colleges in Telangana', 'Top Pharmacy Colleges in Andhra Pradesh', 'Top Pharmacy Colleges in Chennai', 'Top Pharmacy Colleges in Hyderabad', 'Top Pharmacy Colleges in Pune'],
        popularColleges: ['Jamia Hamdard Delhi', 'NIPER Mohali', 'BITS Pilani (Pharmacy)', 'Manipal College of Pharmacy', 'JSS College Mysuru', 'ICT Mumbai',],
        rankPredictor: [],
        predictor: [],
        compare: ['NIPER vs JJS Mysore', 'Jamia Hamdard vs Manipal Pharmacy', 'JSS College of Pharmacy vs NIPER Hyderabad'],
        topColleges: ['NIPER Mohali', 'Jamia Hamdard Delhi', 'Manipal College of Pharmacy', 'ICT Mumbai'],
        exams: ['GPAT', 'NIPER JEE', 'State Pharmacy Entrance Exams'],
      },
      //till here
      {
        name: 'Paramedical & Allied Sciences',
        byDegrees: ["Top Paramedical Colleges in India",
          "Diploma Paramedical Colleges in India",
          "BMLT Colleges in India",
          "BPT Colleges in India",
          "MPT Colleges in India",
          "BOptom Colleges in India"],
        byLocation: ["Para Medical Colleges in Maharashtra",
          "Para Medical Colleges in Tamil Nadu",
          "Para Medical Colleges in Andhra Pradesh",
          "Para Medical Colleges in Karnataka",
          "Para Medical Colleges in Telangana"],
        popularColleges: ['AIIMS Delhi (Paramedical)', 'PGIMER Chandigarh', 'CMC Vellore (Allied Health)', 'JIPMER Puducherry', 'KMC Manipal (Allied Health)', 'KGMU Lucknow (Paramedical)'],
        rankPredictor: [],
        predictor: ['Paramedical College Predictor'],
        compare: ["AIIMS Delhi vs CMC Vellore",
          "Maulana Azad Medical College vs JIPMER Puducherry",
          "St. Xaviers College vs Madras Medical College"],
        topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'Manipal', 'KGMU Lucknow'],
        exams: ['NEET UG (for some courses)', 'State Paramedical Entrance Exams'],
      },
      {
        name: 'Aviation',
        byDegrees: ['Top Aviation Colleges in India', 'Top Private Aviation Colleges in india', 'Top Govt Aviation Colleges in india'],
        byLocation: ['Top Aviation Colleges in Delhi', 'Top Aviation Colleges in Mumbai', 'Top Aviation Colleges in Bangalore', 'Top Aviation Colleges in Chennai', 'Top Aviation Colleges in Hyderabad', 'Top Aviation Colleges in Pune'],
        popularColleges: ["Indira Gandhi Rashtriya Uran Akademi (IGRUA), Amethi",
          "Rajiv Gandhi National Aviation University (RGNAU), Amethi",
          "Bombay Flying Club",
          "Hindustan Aviation Academy"],
        rankPredictor: [],
        predictor: [],
        compare: [],
        topColleges: ['IGRUA', 'Bombay Flying Club', 'CAE Oxford Aviation Academy', 'Rajiv Gandhi Aviation Academy'],
        exams: ['AME CET', 'IGRUA Entrance Exam', 'NDA (Air Force)', 'AFCAT'],
      },
      {
        name: 'Arts & Humanities',
        byDegrees: ["Top Universities in India",
          "Top Private Universities in India",
          "Top Colleges in India",
          "Top Central Universities in India",
          "Top MSW Colleges in India",
          "Top Psychology Colleges in India"],
        byLocation: ["Top Universities in Andhra Pradesh",
          "Top Universities in Telangana",
          "Top Universities in Tamil Nadu",
          "Top Universities in Kerala",
          "Top Universities in Hyderabad",
          "Top Universities in Bangalore",
          "Top Universities in Chennai"],
        popularColleges: ["Jawaharlal Nehru University",
          "Jamia Millia Islamia",
          "University of Delhi",
          "Banaras Hindu University",
          "University of Hyderabad",
          "Aligarh Muslim University"],
        rankPredictor: [],
        predictor: [],
        compare: ["Jawaharlal Nehru University vs University of Hyderabad",
          "Jamia Millia Islamia vs Aligarh Muslim University",
          "University of Delhi vs Banaras Hindu University"],
        topColleges: ['St. Stephen\'s College', 'Hindu College', 'LSR Delhi', 'Presidency College Kolkata', 'JNU Delhi'],
        exams: ['CUET', 'DU Entrance', 'JNU Entrance', 'BHU UET'],
      },
      {
        name: 'Sciences',
        byDegrees: ['Top Science Colleges in India', 'Top B.Sc Colleges in India', 'Top M.Sc Colleges in India', 'Top Research Institutes in India', 'B.Tech+M.Sc Colleges in India'],
        byLocation: ['Top Science Colleges in Maharashtra', 'Top Science Colleges in Delhi', 'Top Science Colleges in Mumbai', 'Top Science Colleges in Bangalore', 'Top Science Colleges in Chennai', 'Top Science Colleges in Hyderabad', 'Top Science Colleges in Kolkata'],
        popularColleges: ["IISc, Bangalore",
          "IISER Pune",
          "IISER Kolkata",
          "IISER Mohali",
          "IISER Bhopal",
          "IISER Thiruvananthapuram",
          "IISER Tirupati",
          "Hindu College, New Delhi",
          "Loyola College, Chennai"],
        rankPredictor: [],
        predictor: [],
        compare: ["IISER Pune vs IISER Kolkata",
          "IISER Pune vs IISc, Bangalore",
          "Hindu College, New Delhi vs Loyola College, Chennai",
          "IISER Mohali vs IISER Bhopal"],
        topColleges: ['IISc Bangalore', 'IIT Bombay', 'IIT Delhi', 'IISER Pune', 'St. Stephen\'s College'],
        exams: ['IIT JAM', 'CUET', 'JEST', 'CSIR NET', 'GATE'],
      },
      {
        name: 'Media & Mass Communication',
        byDegrees: ["Top Journalism Colleges in India",
          "Top Mass Communication Colleges in India",
          "Top Private Journalism and Mass Communication Colleges in India",
          "BJMC Colleges in India",
          "MJMC Colleges in India",
          "BMM Colleges in India",
          "BA Journalism Colleges in India",
          "Diploma Journalism Colleges in India"],
        byLocation: ["Mass Communication Colleges in Andhra Pradesh",
          "Mass Communication Colleges in Telangana",
          "Mass Communication Colleges in Maharashtra",
          "Mass Communication Colleges in Tamil Nadu",
          "Mass Communication Colleges in Karnataka",
          "Mass Communication Colleges in Rajasthan",
          "Mass Communication Colleges in Delhi NCR"],
        popularColleges: ["IIMC Delhi",
          "Xavier Institute of Communications (XIC) Mumbai",
          "Symbiosis Institute of Media and Communication (SIMC) Pune",
          "Asian College of Journalism (ACJ) Chennai",
          "Jamia Millia Islamia"],
        rankPredictor: [],
        predictor: [],
        compare: ["IIMC Delhi vs Asian College of Journalism (ACJ) Chennai",
          "Xavier Institute of Communications (XIC) Mumbai vs Symbiosis Institute of Media and Communication (SIMC) Pune",
          "Jamia Millia Islamia vs IIMC Delhi"],
        topColleges: ['IIMC Delhi', 'AJK MCRC Jamia', 'Symbiosis Pune', 'XIC Mumbai', 'ACJ Chennai'],
        exams: ['IIMC Entrance', 'JMI Entrance', 'Symbiosis SET', 'XIC Entrance', 'IPU CET'],
      },
      {
        name: 'Hospitality & Hotel Management',
        byDegrees: ["Top Hotel Management Colleges in India",
          "Top Private Hotel Management Colleges in India",
          "Top Government Hotel Management Colleges in India",
          "Top BHM Colleges in India",
          "Top Certificate Hotel Management Colleges in India"],
        byLocation: ["Top Hotel Management Colleges in Andhra Pradesh",
          "Top Hotel Management Colleges in Telangana",
          "Top Hotel Management Colleges in Tamil Nadu",
          "Top Hotel Management Colleges in Karnataka",
          "Top Hotel Management Colleges in Maharashtra",
          "Top Hotel Management Colleges in Delhi NCR"],
        popularColleges: ['IHM Pusa Delhi', 'IHM Mumbai', 'IHM Bangalore', 'Welcomgroup Graduate School', 'Christ University', 'Manipal Academy', 'IHM Goa'],
        rankPredictor: [],
        predictor: [],
        compare: ["IHM Delhi vs IHM Mumbai",
          "IHM Bangalore vs IHM Chennai",
          "Banarsidas Chandiwala Institute of Hotel Management & Catering Technology vs Welcomgroup Graduate School of Hotel Administration"],
        topColleges: ['IHM Pusa Delhi', 'IHM Mumbai', 'IHM Bangalore'],
        exams: ['NCHMCT JEE', 'AIHMCT WAT'],
      },
    ]
  },
  "Careers": {
    streams: [
      {
        name: "Engineering",
        careers: [
          "Agricultural Engineer",
          "Robotics Engineer",
          "Genetic Engineer",
          "Chemical Engineer",
          "Aeronautical Engineer",
          "Aerospace Engineer",
          "Civil Engineer",
          "Software Engineer",
          "AI and ML Engineer",
          "Petroleum Engineer",
          "Environmental Engineer",
          "Marine Engineer",
          "Cybersecurity Engineers",
          "Data Scientists"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IIT Madras vs IIT Kharagpur",
          "IIT Bombay vs NIT Warangal",
          "BITS Pilani vs VIT Chennai",
          "IIT Bombay vs IIT Delhi",
          "NIT Trichy vs IIT Bombay",
          "IIT Kanpur vs IIT Bombay",
          "NIT Trichy vs NIT Warangal",
          "SRM vs VIT",
          "BITS vs VIT"
        ],
        courseCompare: [
          "Aerospace Engineering vs Areonatuial Engineering",
          "Artificial Intelligence vs Robotics Engineering",
          "Cyber Defense vs Blockchain",
          "Software Engineering vs AI",
          "Mechanical vs Mechatronics",
          "ECE vs Electrical Engineering",
          "Biomedical vs Biotechnology",
          "Computer Science vs Electronics & Communication",
          "Computer Science vs Mechanical",
          "Computer Science vs Civil",
          "Computer Science vs Electrical",
          "Computer Science vs IT",
          "Mechanical vs Civil",
          "Mechanical vs Electrical",
          "Electronics & Communication vs IT"
        ]
      },
      {
        name: "Medical and Allied Sciences",
        careers: [
          "Ayurvedic Doctor",
          "Psychologist",
          "Psychiatrist",
          "Physiotherapist",
          "Pathologist",
          "Physiologist",
          "Speech Therapist",
          "Optician",
          "Nurse",
          "Nutritionist",
          "Cardiologist",
          "Dentist",
          "Psychologist",
          "Doctor",
          "Surgeons"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "AIIMS Delhi vs AIIMS Bhopal",
          "PGIMER Chandigarh vs JIPMER Puducherry",
          "AIIMS Delhi vs JIPMER Puducherry",
          "AIIMS Bhopal vs PGIMER Chandigarh",
          "CMC Vellore vs JIPMER Puducherry"
        ],
        courseCompare: [
          "Dental vs General Medicine",
          "Gynaecology and Obstetrics",
          "Orthopaedics vs Cardiology",
          "Neurology vs Forensic Medicine"
        ]
      },
      {
        name: "Business & Management",
        careers: [
          "Marketing Manager",
          "General Manager",
          "Human Resources Manager",
          "Sustainability Manager",
          "Supply Chain Manager",
          "Operations Manager",
          "Entrepreneur",
          "Hospital Management",
          "Business Manager",
          "Finance Manager",
          "Business Operations Managers",
          "Product Managers",
          "Logistics Managers",
          "Public Relations Officers",
          "Chief Executive Officers"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IIM Ahmedabad vs IIM Bangalore",
          "FMS Delhi vs XLRI Jamshedpur",
          "ISB Hyderabad vs IIM Calcutta",
          "DoMS IIT Madras vs VGSOM IIT Kharagpur",
          "VGSOM IIT Kharagpur vs IIM Udaipur",
          "XLRI Jamshedpur vs Symbiosis Institute of Business Management (SIBM) Pune"
        ],
        courseCompare: [
          "Marketing Management vs Digital Marketing",
          "Operations Management vs Project Management",
          "Logistics & Supply Chain vs Operations Management",
          "International Business vs Export Import Management",
          "Entrepreneurship vs General Management"
        ]
      },
      {
        name: "Architecture and Planning",
        careers: [
          "Urban Planner",
          "Architect"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IIT Roorkee vs IIT Kharagpur",
          "SPA Delhi vs CEPT Ahmedabad",
          "Jamia Millia vs NIT Calicut"
        ],
        courseCompare: [
          "Industrial Design vs Product Design",
          "Urban Planning and Design vs Product Design",
          "Industrial Design vs  Urban Planning and Design"
        ]
      },
      {
        name: "Pharmacy",
        careers: [
          "Pharmacist"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "Jamia Hamdard vs Manipal College of Pharmacy",
          "NIPER Mohali vs JSS Mysore",
          "JSS College of Pharmacy vs NIPER Hyderabad"
        ],
        courseCompare: [
          "Pharmacy vs Pharmaceutics",
          "Pharmacy vs Pharmaceutical Technology",
          "Pharmacy vs Pharmaceutical Biotechnology",
          "Pharmacy vs Pharmaceutical Regulatory Affairs",
          "Pharmacy vs Clinical Pharmacy"
        ]
      },
      {
        name: "IT and Application",
        careers: [
          "Data Scientist",
          "Product Manager",
          "Big Data Analyst",
          "Business Analyst",
          "Ethical Hacker",
          "Project Manager",
          "Risk Analyst",
          "System Analyst",
          "Database Administrator",
          "Information Systems Manager"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      },
      {
        name: "Accounting & Commerce",
        careers: [
          "Chartered Accountant (CA)",
          "Chartered Financial Analyst (CFA)",
          "Certified Public Accountant (CPA)",
          "Company Secretary (CS)",
          "Financial Analyst",
          "Wealth Manager",
          "Investment Banker",
          "Risk Manager",
          "Financial Planner",
          "Economist"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "Shri Ram College of Commerce (SRCC), Delhi vs  Lady Shri Ram College for Women (LSR), Delhi",
          "Hindu College, Delhi vs St. Xavier's College, Mumbai",
          "Christ University, Bangalore vs Loyola College, Chennai",
          "Shri Ram College of Commerce (SRCC), Delhi vs Loyola College, Chennai"
        ],
        courseCompare: [
          "CA vs CMA",
          "CA vs CS",
          "CA vs Banking and Insurance",
          "CA vs Finance",
          "CMA vs CS",
          "CMA vs Finance",
          "CS vs Finance",
          "Banking and Insurance vs Finance"
        ]
      },
      {
        name: "Design",
        careers: [
          "Interior Designer",
          "Furniture Designer",
          "Jewellery Designer",
          "Interaction Designer",
          "Game Designer",
          "Mobile App Designer",
          "Web Designer",
          "Product and Industrial Designer",
          "UX Designer"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "NIFT Delhi vs NID Ahmedabad",
          "Pearl Academy vs MIT Institute of Design",
          "SOFT Pune vs Arch Academy of Design"
        ],
        courseCompare: [
          "Animation vs  Game Design",
          "Fashion Design vs Textile Design",
          "Automotive Design vs VLSI Design",
          "Jewellery Design vs Accessory Designing"
        ]
      },
      {
        name: "Law",
        careers: [
          "Lawyer",
          "Corporate Lawyer",
          "Criminal Lawyer",
          "Cyber Lawyer",
          "Judge",
          "Public Prosecutor"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "NLSIU Bangalore vs NALSAR Hyderabad",
          "NLU Delhi vs Gujarat National Law University",
          "Jamia Millia Islamia vs BHU Law",
          "GNLU Gandhinagar vs NUJS Kolkata"
        ],
        courseCompare: [
          "Corporate Law vs Company Law",
          "Intellectual Property Rights vs IP and Technology Law",
          "Commercial Law vs Business Law",
          "International Trade Law vs Immigration Law",
          "Consumer Law vs Civil Law"
        ]
      },
      {
        name: "Agriculture",
        careers: [
          "Fishery Scientist",
          "Agricultural Scientist",
          "Agronomist",
          "Animal Trainer",
          "Botanist",
          "Brewers",
          "Forest Officer",
          "Horticulturist",
          "Soil Scientist"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IARI Delhi vs PAU Ludhiana",
          "GBPUAT vs CCSHAU",
          "UAS Bangalore vs TNAU Coimbatore",
          "BHU vs Parul University"
        ],
        courseCompare: [
          "Agricultural Science vs Horticulture",
          "Fisheries Science vs Dairy Technology",
          "Forestry vs Food Processing"
        ]
      },
      {
        name: "Sports",
        careers: [
          "Sports Manager",
          "Sports Person",
          "Aerobic Instructor",
          "Umpires and Referees"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      },
      {
        name: "Social Science and Human Services",
        careers: [
          "Archaeologist",
          "Historian",
          "Anthropologist",
          "Museologist",
          "Exhibition Curator",
          "Exhibition Coordinator",
          "Cartographers",
          "Social Worker",
          "Political Scientist",
          "CSR Manager"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "Jawaharlal Nehru University vs University of Hyderabad",
          "Jamia Millia Islamia vs Aligarh Muslim University",
          "University of Delhi vs Banaras Hindu University"
        ],
        courseCompare: [
          "Psychology vs Sociology",
          "Political Science vs Public Administration",
          "English vs Creative Writing",
          "History vs Archaeology",
          "Philosophy vs Psychology",
          "Public Policy vs Political Science"
        ]
      },
      {
        name: "Hospitality & Hotel Management",
        careers: [
          "Event Manager",
          "Event Planner",
          "Chef",
          "Food Stylist",
          "Baker",
          "Food Technologist"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IHM Delhi vs IHM Mumbai",
          "IHM Bangalore vs IHM Chennai",
          "Banarsidas Chandiwala Institute of Hotel Management & Catering Technology vs Welcomgroup Graduate School of Hotel Administration"
        ],
        courseCompare: [
          "Hotel Management vs Hospitality Management",
          "Tourism vs Travel and Tourism",
          "Culinary Arts vs Catering",
          "Bartending vs Food and Beverage Service"
        ]
      },
      {
        name: "Marketing and Sales",
        careers: [
          "Marketing Researcher",
          "Retail Manager",
          "Auctioneer",
          "Sales Manager",
          "Category Manager",
          "Digital Marketing Specialist",
          "Social Media Analyst",
          "Product Marketer",
          "Customer Success Specialist"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      },
      {
        name: "Education",
        careers: [
          "Professor",
          "Teacher",
          "Special Educator",
          "Counsellor",
          "Career Counsellor",
          "Instructional Designer"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      },
      {
        name: "Science and Technology",
        careers: [
          "Virologist",
          "Molecular Biologist",
          "Biotechnologist",
          "Bioinformatics Specialist",
          "Biochemist",
          "Biophysicist",
          "Chemical Scientist",
          "Mathematician",
          "Environmental Scientist",
          "Climatologist"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IISER Pune vs IISER Kolkata",
          "IISER Pune vs IISc, Bangalore",
          "Hindu College, New Delhi vs  Loyola College, Chennai",
          "IISER Mohali vs IISER Bhopal"
        ],
        courseCompare: [
          "Biotechnology vs Microbiology",
          "Physics vs Engineering Physics",
          "Statistics vs Actuarial Science",
          "Geology vs Applied Geophysics",
          "Biotechnology vs Bioinformatics",
          "Chemistry vs Industrial Biotechnology"
        ]
      },
      {
        name: "Government and Public Sector",
        careers: [
          "IAS Officer",
          "Indian Foreign Service",
          "Income Tax Officer",
          "Indian Statistical Service",
          "Indian Legal Service",
          "Customs Officer",
          "Political Analyst"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      },
      {
        name: "Media and Entertainment",
        careers: [
          "Content Writer",
          "YouTuber",
          "Film Director",
          "Film Editor",
          "Animator",
          "Music Composer",
          "Actor",
          "Journalist",
          "Copywriter",
          "Cinematographer"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [
          "IIMC Delhi vs Asian College of Journalism (ACJ) Chennai",
          "Xavier Institute of Communications (XIC) Mumbai vs Symbiosis Institute of Media and Communication (SIMC) Pune",
          "Jamia Millia Islamia vs IIMC Delhi"
        ],
        courseCompare: [
          "Mass Communication vs Journalism",
          "Advertising vs Public Relations",
          "Digital Media vs Visual Communication",
          "Film Making vs Cinematography",
          "Media Management vs Event Management"
        ]
      },
      {
        name: "Aviation",
        careers: [
          "Air Hostness",
          "Air Traffic Control Officer",
          "Air Traffic Controller",
          "Cabin Crew",
          "Pilot"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      },
      {
        name: "Defence",
        careers: [
          "Air Force Officer",
          "Army Officer",
          "Naval Officer",
          "Border Security Force",
          "Coast Guard",
          "Merchant Navy Officer"
        ],
        collegePredictor: [],
        rankPredictor: [],
        collegeCompare: [

        ],
        courseCompare: [

        ]
      }
    ],
    topRecruiters: [
      { name: 'Google', hiring: '500+' },
      { name: 'Microsoft', hiring: '400+' },
      { name: 'Amazon', hiring: '600+' },
      { name: 'TCS', hiring: '5000+' },
      { name: 'Infosys', hiring: '4000+' },
      { name: 'Wipro', hiring: '3500+' },
    ],
    careerTools: [
      { name: 'Career Assessment Test', users: '50K+' },
      { name: 'Salary Calculator', users: '30K+' },
      { name: 'Job Search Portal', users: '80K+' },
      { name: 'Resume Builder', users: '60K+' },
    ],
    skillDevelopment: [
      { name: 'Coding Bootcamps', duration: '3-6 Months' },
      { name: 'Certification Courses', duration: '1-3 Months' },
      { name: 'Internship Programs', duration: '2-6 Months' },
    ]
  },
  More: {
    items: [
      { name: 'Scholarships', icon: Award, path: '/scholarships' },
      { name: 'Regulatory Professional Councils', icon: FileText, path: '/regulatory-councils' },
      { name: 'Application to Admission', icon: Target, path: '/application-admission' },
      { name: 'Education Loans', icon: DollarSign, path: '/education-loans' },
      { name: 'Education for All', icon: Globe, path: '/education-for-all' },
      { name: 'College Mentor Scholarships', icon: GraduationCap, path: '/college-mentor-scholarships' },
      { name: 'Study Abroad Mentoring', icon: Plane, path: '/study-abroad' },
      { name: 'Ikigai Discovery Test', icon: Target, path: '/ikigai-test' },
      { name: 'Mentoring 360', icon: Users, path: '/mentoring-360' },
      { name: 'Write a Review Earn Up to Rs.300', icon: FileText, path: '/write-review' },
      { name: 'Exam & Admissions Alerts', icon: Bell, path: '/exam-alerts' },
      { name: 'About Us', icon: Info, path: '/about' },
    ]
  }
};



const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedStream, setSelectedStream] = useState(0); // Track selected stream index
  const [selectedCareerSector, setSelectedCareerSector] = useState(0); // Track selected career sector index

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const primaryNavRef = useRef<HTMLElement | null>(null);
  const [primaryNavHeight, setPrimaryNavHeight] = useState(96); // Default to 96px

  // Helper function to check if nav item is active
  const isNavActive = (itemName: string): boolean => {
    // pathname already defined by usePathname() hook above
    if (itemName === 'Home' && pathname === '/') return true;
    if (itemName === 'Colleges' && pathname.startsWith('/colleges')) return true;
    if (itemName === 'Courses' && (pathname.startsWith('/courses') || pathname.startsWith('/course-compare'))) return true;
    if (itemName === 'Exams' && pathname.startsWith('/exams')) return true;
    if (itemName === 'Careers' && pathname.startsWith('/careers')) return true;
    if (itemName === 'News' && pathname.startsWith('/news')) return true;
    return false;
  };

  // Measure primary navigation height
  useEffect(() => {
    const measureNavHeight = () => {
      if (primaryNavRef.current) {
        const height = primaryNavRef.current.offsetHeight;
        setPrimaryNavHeight(height);
      }
    };

    measureNavHeight();
    window.addEventListener('resize', measureNavHeight);
    return () => window.removeEventListener('resize', measureNavHeight);
  }, [isScrolled]);

  // Scroll detection for header color changes and dropdown closing
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Close any open dropdowns when scrolling
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDropdown]);

  // Search function - combined courses + colleges (dedicated APIs)
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const results = await searchService.searchCoursesAndColleges(query.trim(), 5);
      if (results && (results.colleges.length > 0 || results.courses.length > 0 || results.exams.length > 0 || results.careers.length > 0)) {
        setSearchResults(results);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      logger.error('❌ Search error:', error);
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search handler
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    logger.log('⌨️ Search input changed:', value);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    // If query is empty, clear results immediately
    if (!value.trim()) {
      setSearchResults(null);
      setHasSearched(false);
      return;
    }

    // Debounce search - wait 500ms after user stops typing
    logger.log('⏱️ Setting debounce timeout for:', value);
    searchTimeoutRef.current = setTimeout(() => {
      logger.log('⏰ Debounce timeout completed, calling performSearch with:', value);
      performSearch(value.trim());
    }, 500);
  }, [performSearch]);

  // Handle Enter key press
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Clear timeout to prevent debounced search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // Perform immediate search
      performSearch(searchQuery);
    }
  }, [searchQuery, performSearch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Reset search when dropdown closes
  useEffect(() => {
    if (activeDropdown !== 'search') {
      setSearchQuery('');
      setSearchResults(null);
      setHasSearched(false);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    }
  }, [activeDropdown]);

  // Primary Navigation Items
  const primaryNavigationItems = [
    { name: 'Home', hasDropdown: false },
    { name: 'Colleges', hasDropdown: true },
    { name: 'Courses', hasDropdown: true },
    { name: 'Exams', hasDropdown: true },
    { name: 'Careers', hasDropdown: true },
    { name: 'News', hasDropdown: false },
    { name: 'More', hasDropdown: true },
  ];

  // Secondary Navigation Items
  const secondaryNavigationItems = [
    { name: 'IKIGAI Test', hasDropdown: false },
    { name: 'Mentorship', hasDropdown: false },
    { name: 'ExamSuite', hasDropdown: false },
    { name: 'Predictors/Tools', hasDropdown: true },
    { name: 'Scholarship Test', hasDropdown: false },
    { name: 'Application to Admission', hasDropdown: false },
  ];

  const handleMouseEnter = (itemName: string, hasDropdown: boolean) => {
    // Clear any pending close timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    if (hasDropdown) {
      setActiveDropdown(itemName);
      if (itemName === 'Colleges' || itemName === 'Courses' || itemName === 'Exams') {
        setSelectedStream(0); // Reset to first stream when opening dropdown
      }
    } else {
      // Close any open dropdowns when hovering over items without dropdowns (like Home, News)
      setActiveDropdown(null);
    }
  };

  const handleDropdownMouseEnter = () => {
    // Clear any pending close timeout when entering dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    // Use a longer delay to allow scrolling and moving between nav items and dropdown
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setSelectedStream(0); // Reset stream selection when dropdown closes
    }, 300);
  };
  // const handleStreamSelect = (stream: string) => {
  //   setSelectedStream(stream);
  //   setActiveDropdown(null);
  // };

  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdowns(prev => {
      const isClosing = prev.includes(itemName);
      if (!isClosing) {
        // Reset stream selection when opening a new dropdown
        setSelectedStream(0);
        setSelectedCareerSector(0);
      }
      return isClosing
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName];
    });
  };

  // Check if a primary navigation dropdown is active (not secondary nav dropdown, and not search)
  // Search should keep primary nav visible, only hide secondary nav
  const primaryNavDropdowns = ['Colleges', 'Courses', 'Exams', 'Careers', 'News', 'More'];
  const isPrimaryDropdownActive = activeDropdown && primaryNavDropdowns.includes(activeDropdown);

  return (
    <div className="fixed top-0 left-0 right-0 z-[300] pointer-events-none">
      {/* Mobile Search Overlay */}
      {activeDropdown === 'search' && (
        <div className="fixed inset-0 bg-white z-[200] lg:hidden animate-in slide-in-from-top-2 duration-300">
          {/* Search Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Search</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveDropdown(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search courses, colleges, exams..."
                className="pl-10 pr-4 py-3 w-full text-base border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
                autoFocus
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>

          {/* Search Results - Mobile */}
          <div className="p-4 flex-1 overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-primary" size={24} />
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            )}

            {!isSearching && hasSearched && searchResults && (
              <div className="space-y-6">
                {/* Colleges Section */}
                {searchResults.colleges && searchResults.colleges.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Colleges</h3>
                      <span className="text-sm text-gray-500">({searchResults.colleges.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults.colleges.map((college) => (
                        <button
                          key={college.id}
                          onClick={() => {
                            router.push(`/college-details?id=${college.id}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <Building2 size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {college.name}
                            </div>
                            {(college.city || college.state) && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                {college.city}{college.city && college.state ? ', ' : ''}{college.state}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses Section */}
                {searchResults.courses && searchResults.courses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Courses</h3>
                      <span className="text-sm text-gray-500">({searchResults.courses.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults.courses.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => {
                            router.push(`/course-details/${course.id}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <GraduationCap size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {course.title}
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">
                              {course.level} • {course.durationMonths} months
                            </div>
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exams Section */}
                {searchResults.exams && searchResults.exams.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Exams</h3>
                      <span className="text-sm text-gray-500">({searchResults.exams.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults.exams.map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => {
                            router.push(`/exams/${exam.id}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <FileText size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {exam.name}
                            </div>
                            {exam.examDate && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Careers Section */}
                {searchResults.careers && searchResults.careers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="text-primary" size={18} />
                      <h3 className="text-base font-semibold text-gray-900">Careers</h3>
                      <span className="text-sm text-gray-500">({searchResults.careers.length})</span>
                    </div>
                    <div className="space-y-1">
                      {searchResults.careers.map((career) => (
                        <button
                          key={career.id}
                          onClick={() => {
                            router.push(`/careers?id=${career.id}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                        >
                          <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                            <Briefcase size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                              {career.title}
                            </div>
                            {career.avgSalary && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                Avg Salary: ₹{career.avgSalary.toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results Message */}
                {(!searchResults.colleges || searchResults.colleges.length === 0) &&
                  (!searchResults.courses || searchResults.courses.length === 0) &&
                  (!searchResults.exams || searchResults.exams.length === 0) &&
                  (!searchResults.careers || searchResults.careers.length === 0) && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    </div>
                  )}
              </div>
            )}

            {/* Quick Links - Show when no search has been performed */}
            {!hasSearched && !isSearching && (
              <>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Quick Links</div>
                <div className="space-y-2">
                  {[
                    'Find a College',
                    'Course Explorer',
                    'Exam Preparation',
                    'Career Guidance',
                    'Scholarship Finder',
                    'Study Abroad',
                    'Career Assessment',
                    'Mentorship Programs'
                  ].map((link, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                      onClick={() => {
                        logger.log('Navigate to:', link);
                        setActiveDropdown(null);
                      }}
                    >
                      <span className="text-gray-400 mr-3 group-hover:text-primary transition-colors duration-200">→</span>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200 font-medium">{link}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Logo/Auth Bar */}
      <nav
        className={`transition-all duration-300 lg:hidden pointer-events-auto ${isScrolled
          ? "bg-white border-b border-gray-200"
          : "bg-gradient-to-r from-[hsl(162,100%,39%)] to-[hsl(229,78%,41%)]"
          }`}
        style={{
          backgroundColor: isScrolled
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(0, 162, 100, 0.98)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between py-5 sm:py-6">
            {/* Left side: Menu icon */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`hover:bg-primary/10 transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
              >
                {mobileMenuOpen ? <X size={18} className={isScrolled ? 'text-gray-700' : 'text-white'} /> : <Menu size={18} />}
              </Button>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center">
              <img
                src="/lovable-uploads/f76258ce-d7f2-42ce-a5a8-490fc7ec7425.png"
                alt="College Mentor Logo"
                className={`h-14 sm:h-16 md:h-20 w-auto object-contain max-w-[180px] sm:max-w-[200px] md:max-w-[220px] 
                  ${isScrolled ? "filter-none" : "brightness-0 invert"}`}
                onError={(e) => {
                  logger.error("Mobile logo failed to load:", e.currentTarget.src);
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Right side: Search icon */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "search" ? null : "search")
                }
                className={`hover:bg-primary/10 transition-colors duration-300 ${isScrolled ? "text-gray-700" : "text-white"
                  } sm:hidden`}
              >
                <Search size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-transparent z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-out Menu - Full Screen */}
            <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-white z-50 animate-slide-in-right overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <img
                  src="/lovable-uploads/f76258ce-d7f2-42ce-a5a8-490fc7ec7425.png"
                  alt="College Mentor"
                  className="h-10 w-auto object-contain"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-white p-1"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Navigation Section */}
              <div className="py-1">
                {/* <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  NAVIGATION
                </div> */}
                {[
                  { name: 'Home', hasDropdown: false },
                  { name: 'Colleges', hasDropdown: true },
                  { name: 'Courses', hasDropdown: true },
                  { name: 'Exams', hasDropdown: true },
                  { name: 'Careers', hasDropdown: true },
                  { name: 'News', hasDropdown: false },
                  { name: 'More', hasDropdown: true }
                ].map((item) => (
                  <div key={item.name} className="border-b border-gray-50 last:border-b-0">
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                    >
                      {/* TEXT CLICK → NAVIGATE */}
                      <span
                        className="text-base font-semibold text-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();

                          setMobileMenuOpen(false);

                          if (item.name === 'Home') router.push('/');
                          else if (item.name === 'News') router.push('/news');
                          else router.push(`/${item.name.toLowerCase()}`);
                        }}
                      >
                        {item.name}
                      </span>

                      {/* DROPDOWN ICON CLICK → TOGGLE */}
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`h-4 w-4 cursor-pointer transition-transform duration-200 ${mobileDropdowns.includes(item.name) ? 'rotate-180' : ''
                            }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMobileDropdown(item.name);
                          }}
                        />
                      )}
                    </button>


                    {/* Mobile Dropdown Content */}
                    {item.hasDropdown && mobileDropdowns.includes(item.name) && (
                      <div className="bg-gray-50 animate-accordion-down">
                        {item.name === 'Colleges' && collegedekhoDropdownMenus.Colleges && (
                          <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
                            {/* Stream Selector */}
                            <div>
                              <h4 className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">Select Stream</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {collegedekhoDropdownMenus.Colleges.streams.map((stream, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setSelectedStream(index)}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1 ${selectedStream === index
                                      ? 'bg-primary text-white'
                                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                      }`}
                                  >
                                    {stream.name}
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Colleges By Degrees */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Top Colleges</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.byDegrees?.map((degree, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/colleges/list'); setMobileMenuOpen(false); }}
                                  >
                                    {degree}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Exams */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Colleges By Location (Cities & States)</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.byLocation?.map((exam, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/colleges/list'); setMobileMenuOpen(false); }}
                                  >
                                    {exam}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Popular Colleges */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Popular Colleges</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.popularColleges?.map((course, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/courses'); setMobileMenuOpen(false); }}
                                  >
                                    {course}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Rank Predictors */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Rank Predictors</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.rankPredictor?.map((pred, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/rank-predictor'); setMobileMenuOpen(false); }}
                                  >
                                    {pred}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* College Predictors */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Predictors</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.predictor?.map((pred, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/college-predictor'); setMobileMenuOpen(false); }}
                                  >
                                    {pred}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* College Compare */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Compare</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.compare?.map((comp, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/college-compare'); setMobileMenuOpen(false); }}
                                  >
                                    {comp}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {item.name === 'Courses' && collegedekhoDropdownMenus.Courses && (
                          <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
                            {/* Stream Selector */}
                            <div>
                              <h4 className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">Select Stream</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {collegedekhoDropdownMenus.Courses.streams?.map((stream, index) => (
                                  <button
                                    key={stream.name}
                                    onClick={() => setSelectedStream(index)}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1 ${selectedStream === index
                                      ? 'bg-primary text-white'
                                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                      }`}
                                  >
                                    {stream.name}
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Top Courses */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Top Courses</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.topCourses?.map((course, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/courses'); setMobileMenuOpen(false); }}
                                  >
                                    {course}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Degrees */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Degrees</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.degrees?.map((degree, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/courses'); setMobileMenuOpen(false); }}
                                  >
                                    {degree}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Course Comparison */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Course Comparison</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.compare?.map((comp, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/course-compare'); setMobileMenuOpen(false); }}
                                  >
                                    {comp}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Rank Predictor */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Rank Predictor</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.rankPredictor?.map((pred, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/rank-predictor'); setMobileMenuOpen(false); }}
                                  >
                                    {pred}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* College Predictor */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Predictor</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.collegePredictor?.map((pred, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/college-predictor'); setMobileMenuOpen(false); }}
                                  >
                                    {pred}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {item.name === 'Exams' && collegedekhoDropdownMenus.Exams && (
                          <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
                            {/* Stream Selector */}
                            <div>
                              <h4 className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">Select Stream</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {collegedekhoDropdownMenus.Exams.streams?.map((stream, index) => (
                                  <button
                                    key={stream.name}
                                    onClick={() => setSelectedStream(index)}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1 ${selectedStream === index
                                      ? 'bg-primary text-white'
                                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                      }`}
                                  >
                                    {stream.name}
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Popular Exams */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Popular Exams</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.popularExams?.map((exam, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/exams'); setMobileMenuOpen(false); }}
                                  >
                                    {exam}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* College Predictor */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Predictor</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.collegePredictor?.map((pred, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/college-predictor'); setMobileMenuOpen(false); }}
                                  >
                                    {pred}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Rank Predictor */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Rank Predictor</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.rankPredictor?.map((predictor, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/rank-predictor'); setMobileMenuOpen(false); }}
                                  >
                                    {predictor}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Course Compare */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Course Compare</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.courseCompare?.map((comp, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/course-compare'); setMobileMenuOpen(false); }}
                                  >
                                    {comp}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* College Compare */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Compare</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.collegeCompare?.map((comp, index) => (
                                  <button
                                    key={index}
                                    className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                                    onClick={() => { router.push('/college-compare'); setMobileMenuOpen(false); }}
                                  >
                                    {comp}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {item.name === 'Careers' && collegedekhoDropdownMenus.Careers && (
                          <div className="p-3 space-y-3 max-h-[70vh] overflow-y-auto">
                            {/* Sector Selector */}
                            <div>
                              <h4 className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">Select Sector</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {collegedekhoDropdownMenus.Careers.streams?.map((sector, index) => (
                                  <button
                                    key={sector.name}
                                    onClick={() => setSelectedCareerSector(index)}
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors flex items-center gap-1 ${selectedCareerSector === index
                                      ? 'bg-primary text-white'
                                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                      }`}
                                  >
                                    {sector.name}
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Top Careers */}
                            <div className="border-t pt-3">
                              <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Top Careers</h4>
                              <div className="space-y-0.5">
                                {collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector]?.careers?.slice(0, 8).map((career, index) => (
                                  <button key={index} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors" onClick={() => { router.push('/careers'); setMobileMenuOpen(false); }}>{career}</button>
                                ))}
                              </div>
                            </div>

                            {/* College Predictor */}
                            {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.collegePredictor?.length > 0 && (
                              <div className="border-t pt-3">
                                <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Predictor</h4>
                                <div className="space-y-0.5">
                                  {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.collegePredictor?.map((item: string, index: number) => (
                                    <button key={index} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors" onClick={() => { router.push('/college-predictor'); setMobileMenuOpen(false); }}>{item}</button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Rank Predictor */}
                            {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.rankPredictor?.length > 0 && (
                              <div className="border-t pt-3">
                                <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Rank Predictor</h4>
                                <div className="space-y-0.5">
                                  {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.rankPredictor?.map((item: string, index: number) => (
                                    <button key={index} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors" onClick={() => { router.push('/rank-predictor'); setMobileMenuOpen(false); }}>{item}</button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* College Compare */}
                            {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.collegeCompare?.length > 0 && (
                              <div className="border-t pt-3">
                                <h4 className="text-xs font-semibold text-gray-800 mb-1.5">College Compare</h4>
                                <div className="space-y-0.5">
                                  {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.collegeCompare?.map((item: string, index: number) => (
                                    <button key={index} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors" onClick={() => { router.push('/college-compare'); setMobileMenuOpen(false); }}>{item}</button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Course Compare */}
                            {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.courseCompare?.length > 0 && (
                              <div className="border-t pt-3">
                                <h4 className="text-xs font-semibold text-gray-800 mb-1.5">Course Compare</h4>
                                <div className="space-y-0.5">
                                  {(collegedekhoDropdownMenus.Careers.streams?.[selectedCareerSector] as any)?.courseCompare?.map((item: string, index: number) => (
                                    <button key={index} className="w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-colors" onClick={() => { router.push('/course-compare'); setMobileMenuOpen(false); }}>{item}</button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {item.name === 'More' && collegedekhoDropdownMenus.More && (
                          <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                            {collegedekhoDropdownMenus.More.items.map((menuItem, index) => {
                              const IconComponent = menuItem.icon;
                              return (
                                <button
                                  key={index}
                                  className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                                  <span className="font-medium text-left">{menuItem.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Tools Section */}
              <div className="py-2 border-t border-gray-100">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  QUICK TOOLS
                </div>
                {[
                  { name: 'IKIGAI Test', icon: Target },
                  { name: 'Mentorship', icon: Users },
                  { name: 'ExamSuite', icon: FileText },
                  { name: 'Predictors/Tools', icon: Calculator, hasDropdown: true },
                  { name: 'Scholarship Test', icon: Award },
                  { name: 'Application to Admission', icon: GraduationCap },
                ].map((tool) => (
                  <div key={tool.name} className="border-b border-gray-50 last:border-b-0">
                    <button
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                      onClick={() => {
                        if (!tool.hasDropdown) {
                          setMobileMenuOpen(false);
                          if (tool.name === 'IKIGAI Test') router.push('/');
                          else if (tool.name === 'Mentorship') router.push('/');
                          else if (tool.name === 'ExamSuite') router.push('/exams');
                          else if (tool.name === 'Scholarship Test') router.push('/');
                          else if (tool.name === 'Application to Admission') router.push('/');
                        } else {
                          toggleMobileDropdown(tool.name);
                        }
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <tool.icon size={16} className="text-primary" />
                        <span className="font-medium">{tool.name}</span>
                      </span>
                      {tool.hasDropdown && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${mobileDropdowns.includes(tool.name) ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                    {tool.hasDropdown && mobileDropdowns.includes(tool.name) && (
                      <div className="bg-gray-50 px-4 py-2 space-y-1">
                        {predictorTools.map((pred, idx) => (
                          <button
                            key={idx}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-white rounded transition-colors flex items-center gap-2"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              if (pred === 'College Predictor') {
                                router.push('/college-predictor');
                              } else if (pred === 'Rank Predictor') {
                                router.push('/rank-predictor');
                              } else if (pred === 'College Compare') {
                                router.push('/college-compare');
                              } else if (pred === 'Course Compare') {
                                router.push('/course-compare');
                              } else if (pred === 'Eligibility Checker') {
                                router.push('/eligibility-checker');
                              }
                            }}
                          >
                            <Calculator size={14} className="text-primary/70" />
                            {pred}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-gray-100 mt-auto space-y-3">
                {/* WhatsApp Button */}
                {/* <Button
                  variant="outline"
                  className="w-full border-gray-300 text-white hover:bg-green-600 bg-[#25D366]"
                  onClick={() => window.open("https://wa.me/919999999999", "_blank")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="h-5 w-5 mr-2"
                  />
                  WhatsApp
                </Button> */}

                {/* Login Button */}
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-white hover:bg-primary bg-secondary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/auth");
                  }}
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </div>

            </div>
          </>
        )}
      </nav>

      {/* Primary Navigation */}
      <nav
        ref={primaryNavRef}
        className={`transition-all duration-300 shadow-md relative pointer-events-auto z-[350] ${isScrolled
          ? 'bg-gradient-to-r from-white via-gray-50 to-white'
          : 'bg-gradient-to-r from-[hsl(162,100%,39%)] to-[hsl(229,78%,41%)]'
          }`}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: activeDropdown === 'search'
            ? (isScrolled ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 162, 100, 1)')
            : (isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(0, 162, 100, 0.98)'),
          backdropFilter: activeDropdown === 'search' ? 'none' : 'blur(8px)'
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="hidden lg:block">
            <div className="flex items-center justify-between py-4">
              {/* Left Side - Logo and Navigation */}
              <div className="flex items-center space-x-8">
                {/* College Mentor Logo */}
                <div className="flex items-center">
                  <img
                    src="/lovable-uploads/f76258ce-d7f2-42ce-a5a8-490fc7ec7425.png"
                    alt="College Mentor Logo"
                    className={`h-14 w-auto transition-all duration-300 ${isScrolled ? 'brightness-100 invert-0' : 'brightness-0 invert'
                      }`}
                    onError={(e) => {
                      logger.error('Logo failed to load:', e.currentTarget.src);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Primary Navigation Items */}
                <div className="flex items-center space-x-1">
                  {primaryNavigationItems.map((item) => (
                    <div key={item.name} className="relative">
                      <button
                        className={`group flex items-center space-x-1 px-4 py-3 rounded-lg relative whitespace-nowrap hover:scale-105 hover:-translate-y-0.5 hover:z-10 transition-[color,font-weight,font-size,transform,background-color] duration-300 ease-out ${isNavActive(item.name)
                          ? `${isScrolled ? 'text-secondary' : 'text-[#FFC206]'} font-bold text-base scale-105 text-xl`
                          : `text-sm font-medium ${isScrolled
                            ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-gray-200 hover:ring-2 hover:ring-gray-200'
                            : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-white/20 hover:ring-2 hover:ring-white/30'}`
                          }`}
                        onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown)}
                        onMouseLeave={() => {
                          dropdownTimeoutRef.current = setTimeout(() => {
                            setActiveDropdown(null);
                          }, 200); // small delay for smooth exit
                        }}

                        onClick={() => {
                          if (!item.hasDropdown) {
                            if (item.name === 'Home') {
                              router.push('/');
                            } else if (item.name === 'News') {
                              router.push('/news');
                            } else if (item.name === 'About Us') {
                              logger.log('Navigate to About Us');
                            }
                          } else if (item.name === 'Colleges') {
                            router.push('/colleges');
                          } else if (item.name === 'Courses') {
                            router.push('/courses');
                          } else if (item.name === 'Exams') {
                            router.push('/exams');
                          } else if (item.name === 'Careers') {
                            router.push('/careers');
                          }
                        }}
                      >
                        <span className={`relative whitespace-nowrap transition-all duration-300 ${isNavActive(item.name) ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 'group-hover:animate-pulse'}`}>
                          {item.name}
                        </span>
                        {item.hasDropdown && (
                          <ChevronDown
                            size={14}
                            className={`transition-all duration-300 ${activeDropdown === item.name ? 'rotate-180 text-secondary' : 'group-hover:scale-110'
                              }`}
                          />
                        )}
                      </button>
                      {/* Animated underline for active item */}
                      <span
                        className={`absolute bottom-1 left-[45%] -translate-x-1/2 w-2/3 h-0.5 rounded-full origin-center transition-transform duration-300 ease-out ${isNavActive(item.name)
                          ? isScrolled
                            ? 'bg-secondary scale-x-100'
                            : 'bg-[#FFC206] scale-x-100'
                          : 'bg-secondary scale-x-0'
                          }`}
                        aria-hidden
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - WhatsApp + Login Button */}
              <div className="flex items-center space-x-10">
                <div className="relative">
                  {/* Search Icon Button */}
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === "search" ? null : "search")
                    }
                    className={`p-2 rounded-full border transition-colors duration-200
                      ${isScrolled ? "bg-secondary border-secondary" : "bg-white/10 border-white/30"}
                      hover:bg-white/20`}
                  >
                    <Search className="text-white" size={18} />
                  </button>

                  {/* Search Dropdown */}
                  {activeDropdown === "search" && (
                    <>
                      {/* Blurred Background Overlay - Starts below header to keep header clear */}
                      <div
                        className="fixed left-0 right-0 bottom-0 bg-black/20 z-[240]"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          top: `${primaryNavHeight}px`,
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)'
                        }}
                      />

                      {/* Search Popup */}
                      <div
                        className="fixed left-0 right-0 w-full 
          bg-white z-[250] animate-in slide-in-from-top-2 duration-300 
          shadow-2xl overflow-hidden max-h-[75vh] flex flex-col"
                        style={{ top: `${primaryNavHeight}px` }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* Search Bar */}
                        <div className="border-b border-gray-100 py-3 bg-white">
                          <div className="container mx-auto px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative flex-1">
                                <Search
                                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                  size={18}
                                />
                                <Input
                                  type="text"
                                  placeholder="Search courses, colleges, exams..."
                                  className="pl-10 pr-4 py-2.5 w-full text-base border-0 
                       focus:ring-0 focus:outline-none 
                       bg-muted rounded-lg text-foreground 
                       placeholder:text-muted-foreground"
                                  autoFocus
                                  value={searchQuery}
                                  onChange={(e) => handleSearchChange(e.target.value)}
                                  onKeyDown={handleSearchKeyDown}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveDropdown(null)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X size={20} />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Search Results */}
                        <div className="container mx-auto px-4 py-4 overflow-y-auto flex-1">
                          {isSearching && (
                            <div className="flex items-center justify-center py-8">
                              <Loader2 className="animate-spin text-primary" size={24} />
                              <span className="ml-2 text-gray-600">Searching...</span>
                            </div>
                          )}

                          {!isSearching && hasSearched && searchResults && (
                            <div className="space-y-6">
                              {/* Colleges Section */}
                              {searchResults.colleges && searchResults.colleges.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Building2 className="text-primary" size={18} />
                                    <h3 className="text-base font-semibold text-gray-900">Colleges</h3>
                                    <span className="text-sm text-gray-500">({searchResults.colleges.length})</span>
                                  </div>
                                  <div className="space-y-1">
                                    {searchResults.colleges.map((college) => (
                                      <button
                                        key={college.id}
                                        onClick={() => {
                                          router.push(`/college-details?id=${college.id}`);
                                          setActiveDropdown(null);
                                        }}
                                        className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                                      >
                                        <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                                          <Building2 size={16} />
                                        </span>
                                        <div className="flex-1">
                                          <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                            {college.name}
                                          </div>
                                          {(college.city || college.state) && (
                                            <div className="text-sm text-gray-500 mt-0.5">
                                              {college.city}{college.city && college.state ? ', ' : ''}{college.state}
                                            </div>
                                          )}
                                        </div>
                                        <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Courses Section */}
                              {searchResults.courses && searchResults.courses.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <GraduationCap className="text-primary" size={18} />
                                    <h3 className="text-base font-semibold text-gray-900">Courses</h3>
                                    <span className="text-sm text-gray-500">({searchResults.courses.length})</span>
                                  </div>
                                  <div className="space-y-1">
                                    {searchResults.courses.map((course) => (
                                      <button
                                        key={course.id}
                                        onClick={() => {
                                          router.push(`/course-details/${course.id}`);
                                          setActiveDropdown(null);
                                        }}
                                        className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                                      >
                                        <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                                          <GraduationCap size={16} />
                                        </span>
                                        <div className="flex-1">
                                          <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                            {course.title}
                                          </div>
                                          <div className="text-sm text-gray-500 mt-0.5">
                                            {course.level} • {course.durationMonths} months
                                          </div>
                                        </div>
                                        <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Exams Section */}
                              {searchResults.exams && searchResults.exams.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <FileText className="text-primary" size={18} />
                                    <h3 className="text-base font-semibold text-gray-900">Exams</h3>
                                    <span className="text-sm text-gray-500">({searchResults.exams.length})</span>
                                  </div>
                                  <div className="space-y-1">
                                    {searchResults.exams.map((exam) => (
                                      <button
                                        key={exam.id}
                                        onClick={() => {
                                          router.push(`/exams/${exam.id}`);
                                          setActiveDropdown(null);
                                        }}
                                        className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                                      >
                                        <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                                          <FileText size={16} />
                                        </span>
                                        <div className="flex-1">
                                          <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                            {exam.name}
                                          </div>
                                          {exam.examDate && (
                                            <div className="text-sm text-gray-500 mt-0.5">
                                              Exam Date: {new Date(exam.examDate).toLocaleDateString()}
                                            </div>
                                          )}
                                        </div>
                                        <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Careers Section */}
                              {searchResults.careers && searchResults.careers.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <Briefcase className="text-primary" size={18} />
                                    <h3 className="text-base font-semibold text-gray-900">Careers</h3>
                                    <span className="text-sm text-gray-500">({searchResults.careers.length})</span>
                                  </div>
                                  <div className="space-y-1">
                                    {searchResults.careers.map((career) => (
                                      <button
                                        key={career.id}
                                        onClick={() => {
                                          router.push(`/careers?id=${career.id}`);
                                          setActiveDropdown(null);
                                        }}
                                        className="w-full flex items-start text-left p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                                      >
                                        <span className="text-gray-400 mr-3 mt-1 group-hover:text-primary transition-colors duration-200">
                                          <Briefcase size={16} />
                                        </span>
                                        <div className="flex-1">
                                          <div className="text-gray-900 group-hover:text-primary font-medium transition-colors duration-200">
                                            {career.title}
                                          </div>
                                          {career.avgSalary && (
                                            <div className="text-sm text-gray-500 mt-0.5">
                                              Avg Salary: ₹{career.avgSalary.toLocaleString('en-IN')}
                                            </div>
                                          )}
                                        </div>
                                        <ChevronRight className="text-gray-300 group-hover:text-primary transition-colors duration-200" size={16} />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* No Results Message */}
                              {(!searchResults.colleges || searchResults.colleges.length === 0) &&
                                (!searchResults.courses || searchResults.courses.length === 0) &&
                                (!searchResults.exams || searchResults.exams.length === 0) &&
                                (!searchResults.careers || searchResults.careers.length === 0) && (
                                  <div className="text-center py-8">
                                    <p className="text-gray-500">No results found for "{searchQuery}"</p>
                                  </div>
                                )}
                            </div>
                          )}

                          {/* Quick Links - Show when no search has been performed */}
                          {!hasSearched && !isSearching && (
                            <div>
                              <div className="text-base font-semibold text-gray-700 mb-3">
                                Quick Links
                              </div>
                              <div className="space-y-1">
                                {[
                                  "Find a College",
                                  "Course Explorer",
                                  "Exam Preparation",
                                  "Career Guidance",
                                  "Scholarship Finder",
                                  "Study Abroad",
                                  "Career Assessment",
                                  "Mentorship Programs",
                                ].map((link, index) => (
                                  <button
                                    key={index}
                                    className="w-full flex items-center text-left p-2 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                                  >
                                    <span className="text-gray-400 mr-3 group-hover:text-secondary transition-colors duration-200">
                                      →
                                    </span>
                                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                      {link}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* WhatsApp Icon */}
                {/* <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="hover:opacity-80 inline-block"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="h-6 w-6"
                  />
                </a> */}

                {/* Login Button */}
                <Button
                  onClick={() => router.push("/auth")}
                  size="sm"
                  className={`flex items-center gap- rounded-lg px-6 py-2 shadow-soft hover:shadow-md hover:scale-105 text-white 
      ${isScrolled ? "bg-secondary hover:bg-[#00a77e]" : "bg-secondary hover:bg-[#00a77e]"}
    `}
                >
                  <span className="flex items-center gap-1 font-semibold">
                    <LogIn size={16} />
                    Login
                  </span>
                </Button>
              </div>

            </div>
          </div>
        </div>

        {/* Fixed Width Full-Span Dropdown Container */}
        {activeDropdown && activeDropdown !== 'search' && (collegedekhoDropdownMenus as Record<string, any>)[activeDropdown] && (
          <div className="absolute top-full left-0 right-0 w-full z-[9999] flex justify-center pointer-events-none">
            <div
              className="container mx-auto px-4 max-w-7xl pointer-events-auto"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-white border border-gray-200 rounded-b-xl shadow-2xl p-5 animate-in slide-in-from-top-2 duration-300 ease-out max-h-[80vh] overflow-y-auto">
                {/* Colleges Dropdown */}
                {activeDropdown === 'Colleges' && (
                  <div className="flex gap-4 max-h-[600px]">
                    {/* Left Sidebar - Stream Categories */}
                    <div className="w-72 border-r pr-3 space-y-0 overflow-y-auto max-h-[560px] scrollbar-visible">
                      {collegedekhoDropdownMenus.Colleges.streams.map((stream, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedStream(index)}
                          onMouseEnter={() => setSelectedStream(index)}
                          className={`w-full text-left px-2 py-1.5 text-sm font-semibold rounded transition flex items-center justify-between ${selectedStream === index
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                          <span>{stream.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-5 overflow-y-auto max-h-[560px]">
                      {/* Colleges By Degrees */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          Top Colleges
                        </h3>
                        <div className="space-y-0.5">
                          {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.byDegrees?.slice(0, 8).map((degree, index) => (
                            <button
                              key={index}
                              onClick={() => { router.push('/colleges/list'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {degree}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/colleges/list'); setActiveDropdown(null); }} className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1 px-2 py-1.5">
                            View All →
                          </button>
                        </div>

                        {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.byLocation && (
                          <div className="pt-2">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                              Colleges By Location (Cities & States)
                            </h3>
                            <div className="space-y-0.5">
                              {collegedekhoDropdownMenus.Colleges.streams[selectedStream].byLocation.slice(0, 6).map((location, index) => (
                                <button
                                  key={index}
                                  onClick={() => { router.push('/colleges/list'); setActiveDropdown(null); }}
                                  className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                                >
                                  {location}
                                </button>
                              ))}
                              <button onClick={() => { router.push('/exams'); setActiveDropdown(null); }} className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1 px-2 py-1.5">
                                View All →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Column 2: Popular Colleges + Rank Predictors */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          Popular Colleges
                        </h3>
                        <div className="space-y-0.5">
                          {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.popularColleges?.slice(0, 5).map((college, index) => (
                            <button
                              key={index}
                              onClick={() => { router.push('/courses'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {college}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/courses'); setActiveDropdown(null); }} className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1 px-2 py-1.5">
                            View All →
                          </button>
                        </div>

                        {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.rankPredictor && (
                          <div className="pt-2">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                              Rank Predictors
                            </h3>
                            <div className="space-y-0.5">
                              {collegedekhoDropdownMenus.Colleges.streams[selectedStream].rankPredictor.slice(0, 5).map((pred, index) => (
                                <button
                                  key={index}
                                  onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }}
                                  className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                                >
                                  {pred}
                                </button>
                              ))}
                              <button onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }} className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1 px-2 py-1.5">
                                View All →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Column 3: College Predictors + College Compare */}
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          College Predictors
                        </h3>
                        <div className="space-y-0.5">
                          {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.predictor?.slice(0, 4).map((college, index) => (
                            <button
                              key={index}
                              onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {college}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }} className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1 px-2 py-1.5">
                            View All →
                          </button>
                        </div>

                        {collegedekhoDropdownMenus.Colleges.streams[selectedStream]?.compare && (
                          <div className="pt-2">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                              College Compare
                            </h3>
                            <div className="space-y-0.5">
                              {collegedekhoDropdownMenus.Colleges.streams[selectedStream].compare.slice(0, 4).map((college, index) => (
                                <button
                                  key={index}
                                  onClick={() => { router.push('/college-compare'); setActiveDropdown(null); }}
                                  className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                                >
                                  {college}
                                </button>
                              ))}
                              <button onClick={() => { router.push('/college-compare'); setActiveDropdown(null); }} className="text-sm text-primary font-medium hover:text-primary/80 flex items-center gap-1 px-2 py-1.5">
                                View All →
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Courses Dropdown */}
                {activeDropdown === 'Courses' && (
                  <div className="flex gap-4 max-h-[600px]">
                    {/* Left Sidebar - Stream Categories */}
                    <div className="w-72 border-r pr-3 space-y-0 overflow-y-auto max-h-[560px] scrollbar-visible">
                      {collegedekhoDropdownMenus.Courses.streams?.map((stream, index) => (
                        <button
                          key={stream.name}
                          onClick={() => setSelectedStream(index)}
                          onMouseEnter={() => setSelectedStream(index)}
                          className={`w-full text-left px-2 py-1.5 text-sm font-semibold rounded transition flex items-center justify-between ${selectedStream === index ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                        >
                          <span>{stream.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>

                    {/* Right Content Grid */}
                    <div className="flex-1 grid grid-cols-3 gap-6 overflow-y-auto max-h-[560px]">
                      {/* Column 1: Top Courses + Degrees */}
                      <div className="space-y-6">
                        {/* Top Courses */}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Top Courses</h4>
                          <div className="space-y-0.5">
                            {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.topCourses?.slice(0, 5).map((course, idx) => (
                              <button
                                key={idx}
                                onClick={() => { router.push('/courses'); setActiveDropdown(null); }}
                                className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                              >
                                {course}
                              </button>
                            ))}
                            <button onClick={() => { router.push('/courses'); setActiveDropdown(null); }} className="block w-full text-left py-0.5 px-1 text-sm font-medium text-primary hover:text-primary/80">
                              View All →
                            </button>
                          </div>
                        </div>

                        {/* Degrees */}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Degrees</h4>
                          <div className="space-y-0.5">
                            {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.degrees?.slice(0, 5).map((degree, idx) => (
                              <button
                                key={idx}
                                onClick={() => { router.push('/courses'); setActiveDropdown(null); }}
                                className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                              >
                                {degree}
                              </button>
                            ))}
                            <button onClick={() => { router.push('/courses'); setActiveDropdown(null); }} className="block w-full text-left py-0.5 px-1 text-sm font-medium text-primary hover:text-primary/80">
                              View All →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Course Comparison + Rank Predictor */}
                      <div className="space-y-6">
                        {/* Course Comparison */}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Course Comparison</h4>
                          <div className="space-y-0.5">
                            {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.compare?.slice(0, 5).map((compare, idx) => (
                              <button
                                key={idx}
                                onClick={() => { router.push('/course-compare'); setActiveDropdown(null); }}
                                className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                              >
                                {compare}
                              </button>
                            ))}
                            <button onClick={() => { router.push('/course-compare'); setActiveDropdown(null); }} className="block w-full text-left py-0.5 px-1 text-sm font-medium text-primary hover:text-primary/80">
                              View All →
                            </button>
                          </div>
                        </div>

                        {/* Rank Predictor */}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">Rank Predictor</h4>
                          <div className="space-y-0.5">
                            {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.rankPredictor?.slice(0, 5).map((pred, idx) => (
                              <button
                                key={idx}
                                onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }}
                                className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                              >
                                {pred}
                              </button>
                            ))}
                            <button onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-0.5 px-1 text-sm font-medium text-primary hover:text-primary/80">
                              View All →
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: College Predictor */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">College Predictor</h4>
                          <div className="space-y-0.5">
                            {collegedekhoDropdownMenus.Courses.streams?.[selectedStream]?.collegePredictor?.slice(0, 7).map((pred, idx) => (
                              <button
                                key={idx}
                                onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }}
                                className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                              >
                                {pred}
                              </button>
                            ))}
                            <button onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-0.5 px-1 text-sm font-medium text-primary hover:text-primary/80">
                              View All →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Exams Dropdown */}
                {activeDropdown === 'Exams' && (
                  <div className="flex gap-4 max-h-[600px]">
                    <div className="w-72 border-r pr-3 space-y-0 overflow-y-auto max-h-[560px] scrollbar-visible">
                      {collegedekhoDropdownMenus.Exams.streams?.map((stream, index) => (
                        <button
                          key={stream.name}
                          onClick={() => setSelectedStream(index)}
                          onMouseEnter={() => setSelectedStream(index)}
                          className={`w-full text-left px-2 py-1.5 text-sm font-semibold rounded transition flex items-center justify-between ${selectedStream === index ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                        >
                          <span>{stream.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-5 overflow-y-auto max-h-[560px]">
                      {/* Column 1 - Popular Exams + College Predictor */}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          Popular Exams
                        </h4>
                        <div>
                          {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.popularExams?.slice(0, 7).map((e, idx) => (
                            <button
                              key={idx}
                              onClick={() => { router.push('/exams'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {e}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/exams'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-2 text-sm font-medium text-primary hover:text-primary/80">
                            View All →
                          </button>
                        </div>

                        <h4 className="font-semibold text-gray-900 text-sm mb-1 mt-3">
                          College Predictor
                        </h4>
                        <div>
                          {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.collegePredictor?.slice(0, 5).map((cp, idx) => (
                            <button
                              key={idx}
                              onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {cp}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-2 text-sm font-medium text-primary hover:text-primary/80">
                            View All →
                          </button>
                        </div>
                      </div>

                      {/* Column 2 - Rank Predictor + Course Compare */}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          Rank Predictor
                        </h4>
                        <div>
                          {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.rankPredictor?.slice(0, 5).map((r, idx) => (
                            <button
                              key={idx}
                              onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {r}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-2 text-sm font-medium text-primary hover:text-primary/80">
                            View All →
                          </button>
                        </div>

                        <h4 className="font-semibold text-gray-900 text-sm mb-1 mt-3">
                          Course Compare
                        </h4>
                        <div>
                          {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.courseCompare?.slice(0, 5).map((cc, idx) => (
                            <button
                              key={idx}
                              onClick={() => { router.push('/course-compare'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {cc}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/course-compare'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-2 text-sm font-medium text-primary hover:text-primary/80">
                            View All →
                          </button>
                        </div>
                      </div>

                      {/* Column 3 - College Compare */}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          College Compare
                        </h4>
                        <div>
                          {collegedekhoDropdownMenus.Exams.streams?.[selectedStream]?.collegeCompare?.slice(0, 7).map((ccomp, idx) => (
                            <button
                              key={idx}
                              onClick={() => { router.push('/college-compare'); setActiveDropdown(null); }}
                              className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors break-words line-clamp-3"
                            >
                              {ccomp}
                            </button>
                          ))}
                          <button onClick={() => { router.push('/college-compare'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-2 text-sm font-medium text-primary hover:text-primary/80">
                            View All →
                          </button>
                        </div>
                      </div>




                    </div>
                  </div>
                )}

                {/* Careers Dropdown */}
                {activeDropdown === 'Careers' && (
                  <div className="flex gap-4 max-h-[600px]">
                    {/* Left Sidebar - Sectors */}
                    <div className="w-72 border-r pr-3 space-y-0 overflow-y-auto max-h-[560px] scrollbar-visible">
                      {collegedekhoDropdownMenus.Careers.streams.map((sector, index) => (
                        <button
                          key={sector.name}
                          onClick={() => setSelectedCareerSector(index)}
                          onMouseEnter={() => setSelectedCareerSector(index)}
                          className={`w-full text-left px-2 py-1.5 text-sm font-semibold rounded transition flex items-center justify-between ${selectedCareerSector === index ? 'bg-blue-50 text-blue-600' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                        >
                          <span>{sector.name}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>

                    {/* Right Content - 5 Sections */}
                    <div className="flex-1 overflow-y-auto max-h-[560px]">
                      <div className="grid grid-cols-3 gap-x-6">
                        {/* Column 1: Top Careers & College Predictor */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Top Careers</h4>
                            <div className="space-y-0.5">
                              {collegedekhoDropdownMenus.Careers.streams[selectedCareerSector].careers.slice(0, 8).map((career, idx) => (
                                <button key={idx} onClick={() => { router.push('/careers'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors">{career}</button>
                              ))}
                              <button onClick={() => { router.push('/careers'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-1 text-sm font-medium text-primary hover:text-primary/80">View All →</button>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">College Predictor</h4>
                            <div className="space-y-0.5">
                              {(collegedekhoDropdownMenus.Careers.streams[selectedCareerSector] as any).collegePredictor?.map((item: string, idx: number) => (
                                <button key={idx} onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors">{item}</button>
                              ))}
                              <button onClick={() => { router.push('/college-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-1 text-sm font-medium text-primary hover:text-primary/80">View All →</button>
                            </div>
                          </div>
                        </div>
                        {/* Column 2: Rank Predictor & College Compare */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Rank Predictor</h4>
                            <div className="space-y-0.5">
                              {(collegedekhoDropdownMenus.Careers.streams[selectedCareerSector] as any).rankPredictor?.map((item: string, idx: number) => (
                                <button key={idx} onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors">{item}</button>
                              ))}
                              <button onClick={() => { router.push('/rank-predictor'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-1 text-sm font-medium text-primary hover:text-primary/80">View All →</button>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">College Compare</h4>
                            <div className="space-y-0.5">
                              {(collegedekhoDropdownMenus.Careers.streams[selectedCareerSector] as any).collegeCompare?.map((item: string, idx: number) => (
                                <button key={idx} onClick={() => { router.push('/college-compare'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors">{item}</button>
                              ))}
                              <button onClick={() => { router.push('/college-compare'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-1 text-sm font-medium text-primary hover:text-primary/80">View All →</button>
                            </div>
                          </div>
                        </div>
                        {/* Column 3: Course Compare */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Course Compare</h4>
                            <div className="space-y-0.5">
                              {(collegedekhoDropdownMenus.Careers.streams[selectedCareerSector] as any).courseCompare?.map((item: string, idx: number) => (
                                <button key={idx} onClick={() => { router.push('/course-compare'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:underline rounded transition-colors">{item}</button>
                              ))}
                              <button onClick={() => { router.push('/course-compare'); setActiveDropdown(null); }} className="block w-full text-left py-1 px-2 mt-1 text-sm font-medium text-primary hover:text-primary/80">View All →</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* More Dropdown */}
                {activeDropdown === 'More' && (
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {collegedekhoDropdownMenus.More.items.map((menuItem, index) => {
                      const IconComponent = menuItem.icon;
                      return (
                        <button
                          key={index}
                          className="flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:text-primary hover:bg-gray-50 hover:underline rounded-lg transition-all duration-200 group"
                        >
                          <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{menuItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      {/* <div className="h-20 lg:h-24"></div>
    </div> */}
      {/* Separator Line (Desktop Only) - Hidden when primary dropdown is active or search is active */}
      {(isScrolled || isPrimaryDropdownActive || activeDropdown === 'search') ? null : (
        <div
          className={`hidden lg:block h-px transition-all duration-300 bg-white/20 pointer-events-auto`}
        />
      )}


      {/* Secondary Navigation - Hidden on mobile, when primary dropdown is active, or when search is active */}
      {isScrolled || isPrimaryDropdownActive || activeDropdown === 'search' ? null : (
        <nav className={`transition-all duration-300 shadow-sm hidden lg:block bg-gradient-to-r from-[hsl(162,100%,39%)] to-[hsl(229,78%,41%)] pointer-events-auto`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 py-3"
              onMouseLeave={handleMouseLeave}
              style={{ paddingLeft: '250px' }}  // adjust based on logo width + gap
            >
              {/* Use same spacing as primary navbar's first item */}
              {/* Left Side - Navigation Items */}
              <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 pl-4 md:pl-6">
                {secondaryNavigationItems.map((item) => (
                  <div key={item.name} className="relative">
                    <button
                      className={`group flex items-center space-x-1 transition-all duration-300 font-medium text-xs md:text-sm py-2 rounded-lg hover:scale-110 hover:shadow-md hover:-translate-y-1 hover:z-10 ${item.name === 'IKIGAI Test' ? 'pl-4 pr-2 md:pl-6 md:pr-4' : 'px-2 md:px-4'} ${isScrolled
                        ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-gray-200 hover:ring-2 hover:ring-gray-200'
                        : 'text-white hover:text-white/80 hover:bg-white/10 hover:shadow-white/20 hover:ring-2 hover:ring-white/30'
                        }`}
                      onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown)}
                      onClick={() => {
                        if (item.name === 'Scholarship Test') {
                          window.location.href = "/scholarship";
                        } else if (item.name === 'Application to Admission') {
                          window.location.href = "/admission";
                        }
                      }}
                    >
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          size={12}
                          className={`transition-all duration-300 ${activeDropdown === item.name ? 'rotate-180 text-secondary' : 'group-hover:scale-110'
                            }`}
                        />
                      )}
                    </button>

                    {/* Predictors/Tools Dropdown */}
                    {item.hasDropdown && activeDropdown === item.name && (
                      <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl py-4 z-[9999] mt-2 animate-in slide-in-from-top-2 duration-300 ease-out">

                        {/* Dropdown Title */}
                        <div className="px-4 py-2 text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                          Predictors & Tools
                        </div>

                        {/* ✅ Predictor Tools List */}
                        <div className="px-2">
                          {predictorTools.map((tool, index) => (
                            <button
                              key={tool}
                              onClick={() => {
                                setActiveDropdown(null);
                                if (tool === 'College Predictor') {
                                  router.push('/college-predictor');
                                } else if (tool === 'Rank Predictor') {
                                  router.push('/rank-predictor');
                                } else if (tool === 'College Compare') {
                                  router.push('/college-compare');
                                } else if (tool === 'Course Compare') {
                                  router.push('/course-compare');
                                } else if (tool === 'Eligibility Checker') {
                                  router.push('/eligibility-checker');
                                }
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-secondary/10 hover:text-secondary rounded-lg transition-all duration-500 font-medium text-slate-700 transform hover:scale-105 hover:shadow-md hover:-translate-y-1 group relative overflow-hidden"
                              style={{
                                animationDelay: `${index * 60}ms`,
                                animation: "zoomIn 0.4s ease-out forwards",
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{tool}</span>
                                <div className="w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-bounce"></div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}


                  </div>
                ))}
              </div>

              {/* Right Side - Search Bar */}
              {/* CTA Buttons */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-0">
                {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  size="sm"
                  className="group text-black rounded-lg sm:rounded-lg px-4 sm:px-5 md:px-5 py-2.5 sm:py-2.5 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex-1 sm:flex-none sm:min-w-[150px] md:min-w-[160px] h-10 sm:h-10 text-sm sm:text-sm hover:opacity-90"
                  style={{ backgroundColor: "#FFC107" }}
                  onClick={() => {
                    window.location.href = "/scholarship";
                  }}
                >
                  <Award
                    size={15}
                    className="mr-2 group-hover:scale-110 transition-transform text-black sm:w-[16px] sm:h-[16px]"
                  />
                  Scholarship Test
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  className="group text-secondary-foreground bg-secondary hover:bg-secondary/90 rounded-lg sm:rounded-lg px-4 sm:px-5 md:px-5 py-2.5 sm:py-2.5 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex-1 sm:flex-none sm:min-w-[150px] md:min-w-[160px] h-10 sm:h-10 text-sm sm:text-sm"
                  onClick={() => {
                    window.location.href = "/admission";
                  }}
                >
                  <FileText
                    size={15}
                    className="mr-2 group-hover:scale-110 transition-transform sm:w-[16px] sm:h-[16px]"
                  />
                  Application to Admission
                </Button>
              </div> */}


                {/* <div className="flex justify-start">
                              <button
                                className="group text-white hover:text-white/80 font-medium transition-all duration-300 underline decoration-white/60 decoration-2 hover:decoration-white/80 underline-offset-4 text-sm"
                                onClick={() => { logger.log('Watch our brand film here clicked'); }}
                              >
                                Watch our brand film here
                              </button>
                            </div> */}
              </div>
              {/* <div className="flex items-center">
              <div className="relative">
                <div
                  className="relative flex items-center justify-center"
                  onMouseLeave={() => setActiveDropdown(null)}
                > */}
              {/* Search Icon - Always Visible */}
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <Input
                    type="text"
                    onClick={() => setActiveDropdown(activeDropdown === 'search' ? null : 'search')}
                    placeholder="Search courses, colleges, exams..."
                    className="pl-10 pr-4 py-2.5 w-80 text-sm bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-1 focus:ring-white/30 rounded-lg transition-all duration-200"
                  /> 

            {/* Search Dropdown - Appears on Click */}
              {/* {activeDropdown === "search" && ( */}
              {/* <div */}
              {/* className="fixed top-0 left-0 right-0 w-full 
              h-screen sm:h-1/2   */}
              {/* /* full height on mobile, half on desktop */}
              {/* bg-white z-[250] 
                animate-in slide-in-from-top-2 duration-300 
                shadow-2xl overflow-y-auto" */}
              {/* > */}
              {/* Search Bar */}
              {/* <div className="border-b border-gray-100 py-3">
                        <div className="container mx-auto px-4 max-w-4xl">
                          <div className="relative">
                            <Search
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              type="text"
                              placeholder="Search courses, colleges, exams..."
                              className="pl-10 pr-4 py-2.5 w-full text-base border-0 
                       focus:ring-0 focus:outline-none 
                       bg-muted rounded-lg text-foreground 
                       placeholder:text-muted-foreground"
                              autoFocus
                              onChange={(e) => {
                                const searchTerm = e.target.value.toLowerCase();
                                if (searchTerm.length > 2) {
                                  logger.log("Live searching for:", searchTerm);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div> */}

              {/* Quick Links */}
              {/* <div className="container mx-auto px-4 max-w-4xl py-3">
                        <div className="text-base font-semibold text-gray-700 mb-3">Quick Links</div>
                        <div className="space-y-1">
                          {[
                            'Find a College',
                            'Course Explorer',
                            'Exam Preparation',
                            'Career Guidance',
                            'Scholarship Finder',
                            'Study Abroad',
                            'Career Assessment',
                            'Mentorship Programs'
                          ].map((link, index) => (
                            <button
                              key={index}
                              className="w-full flex items-center text-left p-2 hover:bg-gray-50 rounded-md transition-colors duration-200 group"
                            >
                              <span className="text-gray-400 mr-3 group-hover:text-secondary transition-colors duration-200">→</span>
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{link}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            </div>
          </div>
        </nav>
      )}

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-20 lg:h-24 pointer-events-none"></div>
    </div>
  );
};

export default Navigation;
