"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CollegePredictorIcon from '../../public/assets/collegep.svg';
import RankPredictorIcon from '../../public/assets/cc.svg';
import CollegeScholarshipIcon from '../../public/assets/cs.svg';
import EduLoanIcon from '../../public/assets/el.svg';
import {
  GraduationCap,
  GitCompare,
  Trophy,
  CreditCard,
  Wifi,
  Battery,
  Signal,
  Sparkles,
  Shield,
  UserCheck,
  ArrowRight
} from "lucide-react";
import { useHomepageData } from '@/hooks/useHomepageData';

interface Tool {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  preview: React.ReactNode;
}

const tools: Tool[] = [
  {
    id: "rank-predictor",
    title: "Rank Predictor",
    subtitle: "Predict Your Rank Based on Performance",
    icon: RankPredictorIcon,
    iconColor: "text-indigo-600",
    bgColor: "bg-[#3B82F6]",
    borderColor: "border-indigo-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        <div className="rounded-2xl px-3 pt-1 pb-3 h-full flex flex-col">
          <h3 className="text-sm font-semibold mb-3 text-center text-gray-900">
            Rank Predictor
          </h3>

          {/* Exam Selection */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-orange-600 text-[10px] font-bold">JEE</span>
              </div>
              <div className="text-[10px] font-medium">JEE Main</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-blue-600 text-[10px] font-bold">NEET</span>
              </div>
              <div className="text-[10px] font-medium">NEET</div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3 flex-1 overflow-y-auto">
            {/* Score */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Score</label>
              <input
                type="text"
                placeholder="250"
                defaultValue="250"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px] focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Category</label>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-red-100 text-red-600 rounded-lg text-[10px]">General</button>
                <button className="flex-1 py-1.5 bg-yellow-100 text-yellow-600 rounded-lg text-[10px]">OBC</button>
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Year</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-medium transition">
            Predict Rank
          </button>
        </div>
      </div>
    )
  },
  {
    id: "college-predictor",
    title: "College Predictor",
    subtitle: "Predict Your Dream College by Rank",
    icon: CollegePredictorIcon,
    // icon: GraduationCap,
    iconColor: "text-blue-600",
    bgColor: "bg-[#3B82F6]", // bg-blue-50
    borderColor: "border-blue-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        {/* 🔑 Remove bg-white here */}
        <div className="rounded-2xl px-3 pt-1 pb-3 h-full flex flex-col">
          <h3 className="text-sm font-semibold mb-3 text-center text-gray-900">
            College Predictor
          </h3>


          {/* Exam Selection */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-orange-600 text-[10px] font-bold">JEE</span>
              </div>
              <div className="text-[10px] font-medium">JEE Main</div>
              <div className="text-[9px] text-gray-500">(B.E. | B.Tech)</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-blue-600 text-[10px] font-bold">JEE</span>
              </div>
              <div className="text-[10px] font-medium">JEE Advanced</div>
              <div className="text-[9px] text-gray-500">(B.E. | B.Tech)</div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-3 flex-1 overflow-y-auto">
            {/* Rank */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Rank</label>
              <input
                type="text"
                placeholder="15500"
                defaultValue="15500"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Gender</label>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-[10px]">Male</button>
                <button className="flex-1 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-[10px]">Female</button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Category</label>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-red-100 text-red-600 rounded-lg text-[10px]">General</button>
                <button className="flex-1 py-1.5 bg-yellow-100 text-yellow-600 rounded-lg text-[10px]">OBC</button>
              </div>
            </div>

            {/* Domicile */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Domicile State</label>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-green-100 text-green-600 rounded-lg text-[10px]">Andhra Pradesh</button>
                <button className="flex-1 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-[10px]">Telangana</button>
              </div>
            </div>

            {/* Specially Abled */}
            <div>
              <label className="text-[10px] text-gray-600 mb-1 block">Specially Abled</label>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-[10px]">No</button>
                <button className="flex-1 py-1.5 bg-green-100 text-green-600 rounded-lg text-[10px]">Yes</button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-medium transition">
            Predict Result
          </button>
        </div>
      </div>
    )

  },
  {
    id: "college-compare",
    title: "College Compare",
    subtitle: "Compare Your Dream Colleges",
    icon: RankPredictorIcon,
    // icon: GitCompare,
    iconColor: "text-purple-600",
    bgColor: "bg-[#3B82F6]",
    borderColor: "border-purple-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-center">College Compare</h3>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Select First College</label>
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]"
            />
          </div>

          <div className="text-center text-gray-400">
            <div className="w-10 h-10 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-[10px] font-bold">VS</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Select Second College</label>
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]"
            />
          </div>

          {/* Comparison Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-[10px] text-gray-600">Ranking</div>
              <div className="font-semibold text-blue-600 text-[11px]">#1</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-[10px] text-gray-600">Fees</div>
              <div className="font-semibold text-green-600 text-[11px]">₹2.5L</div>
            </div>
          </div>

          <button className="w-full py-2 bg-purple-600 text-white rounded-lg text-[11px] font-medium">
            Compare Colleges
          </button>
        </div>
      </div>
    )

  },
  {
    id: "course-compare",
    title: "Course Compare",
    subtitle: "Compare Multiple Courses",
    icon: GitCompare,
    iconColor: "text-cyan-600",
    bgColor: "bg-[#3B82F6]",
    borderColor: "border-cyan-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-center">Course Compare</h3>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Select First Course</label>
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]"
            />
          </div>

          <div className="text-center text-gray-400">
            <div className="w-10 h-10 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-[10px] font-bold">VS</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Select Second Course</label>
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]"
            />
          </div>

          {/* Comparison Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-[10px] text-gray-600">Duration</div>
              <div className="font-semibold text-blue-600 text-[11px]">4 Years</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-[10px] text-gray-600">Fees</div>
              <div className="font-semibold text-green-600 text-[11px]">₹2.5L</div>
            </div>
          </div>

          <button className="w-full py-2 bg-cyan-600 text-white rounded-lg text-[11px] font-medium">
            Compare Courses
          </button>
        </div>
      </div>
    )
  },
  {
    id: "college-ranking",
    title: "College Ranking",
    subtitle: "View and Compare College Rankings",
    icon: Trophy,
    iconColor: "text-yellow-600",
    bgColor: "bg-[#3B82F6]",
    borderColor: "border-yellow-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-center">College Ranking</h3>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Select College</label>
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]"
            />
          </div>

          <div className="space-y-2">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-[10px]">NIRF Ranking</h4>
                  <p className="text-[9px] text-gray-600">#1 in Engineering</p>
                </div>
                <Trophy className="w-4 h-4 text-yellow-600" />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-[10px]">Overall Ranking</h4>
                  <p className="text-[9px] text-gray-600">#5 Nationally</p>
                </div>
                <Trophy className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>

          <button className="w-full py-2 bg-yellow-600 text-white rounded-lg text-[11px] font-medium">
            View Rankings
          </button>
        </div>
      </div>
    )
  },
  {
    id: "scholarships",
    title: "College Scholarships",
    subtitle: "Discover College Scholarships",
    icon: CollegeScholarshipIcon,
    iconColor: "text-green-600",
    bgColor: "bg-[#3B82F6]",
    borderColor: "border-green-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-center">Scholarships</h3>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Select Exam</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]">
              <option>JEE Main</option>
              <option>NEET</option>
              <option>BITSAT</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-[10px]">Merit Scholarship</h4>
                  <p className="text-[9px] text-gray-600">Up to ₹2,00,000</p>
                </div>
                <Trophy className="w-4 h-4 text-yellow-600" />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-[10px]">Need-based Aid</h4>
                  <p className="text-[9px] text-gray-600">Up to ₹1,50,000</p>
                </div>
                <Trophy className="w-4 h-4 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-[10px]">Sports Scholarship</h4>
                  <p className="text-[9px] text-gray-600">Up to ₹1,00,000</p>
                </div>
                <Trophy className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>

          <button className="w-full py-2 bg-green-600 text-white rounded-lg text-[11px] font-medium">
            Find Scholarships
          </button>
        </div>
      </div>
    )

  },
  {
    id: "education-loan",
    title: "Education Loan",
    subtitle: "Domestic | International",
    icon: EduLoanIcon,
    iconColor: "text-orange-600",
    bgColor: "bg-[#3B82F6]",
    borderColor: "border-orange-200",
    preview: (
      <div className="p-4 h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4 text-[10px] text-gray-600">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <span>94%</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-center">Education Loan</h3>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Loan Amount</label>
            <input
              type="text"
              placeholder="₹10,00,000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]"
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-600 mb-1 block">Course Duration</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[10px]">
              <option>4 Years</option>
              <option>3 Years</option>
              <option>2 Years</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-[10px] text-gray-600">Interest Rate</div>
              <div className="font-semibold text-blue-600 text-[11px]">8.5%</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-[10px] text-gray-600">Max Amount</div>
              <div className="font-semibold text-green-600 text-[11px]">₹1.5Cr</div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-[10px] text-gray-600 mb-1">Monthly EMI</div>
            <div className="text-[13px] font-bold text-gray-800">₹12,500</div>
          </div>

          <button className="w-full py-2 bg-orange-600 text-white rounded-lg text-[11px] font-medium">
            Check Eligibility
          </button>
        </div>
      </div>
    )

  }
];


export default function CollegeToolsRedesign() {
  const { data } = useHomepageData();
  const [selectedTool, setSelectedTool] = useState<Tool>(tools[0]);
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Use API tools data only if it exists, otherwise use hardcoded
  const toolsData = data?.tools;

  // Use API title/subtitle/description only if they exist, otherwise use hardcoded
  const title = toolsData?.title || "College Predictor";
  const subtitle = toolsData?.subtitle || "Predict Your Dream College by Rank";
  const description = toolsData?.description || "Predict college based on your rank";

  // Helper function to render title with gradient
  const renderTitleWithGradient = (text: string) => {
    const parts = text.split(/(Powerful Tools|Smart Decisions|Tools)/i);
    return parts.map((part, index) => {
      if (/^(powerful tools|smart decisions|tools)$/i.test(part)) {
        return (
          <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    // <section className="relative bg-white py-12 sm:py-16 lg:py-20 overflow-hidden" id="tools-section">
    <section className="relative bg-white pt-12 sm:pt-16 md:pt-20 overflow-hidden" id="tools-section">
      {/* Zero-height anchor at top to let global avatar start from the very beginning */}
      <span id="tools-section-start" className="block h-0" />
      {/* ✅ Top Curve (filled with f5f9f7 so it shows against white) */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          className="w-full h-[100px] sm:h-[120px] md:h-[140px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            fill="#f5f9f7"
            d="M0,64 C480,160 960,0 1440,96 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10 mt-8 sm:mt-10 md:mt-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div id="tools-smart-solutions" className="inline-flex items-center gap-2 bg-white backdrop-blur-sm border border-primary/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 mb-2 sm:mb-3">
              <Sparkles size={10} className="text-primary animate-pulse sm:w-3 sm:h-3" />
              <span className="text-primary font-medium text-xs">Smart Solutions</span>
            </div>

            {title && (
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-2 sm:mb-3" id="tools-smart-decisions-title">
                {renderTitleWithGradient(`Powerful Tools for Smart Decisions`)}
              </h1>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle && (
              <h2 className="text-sm sm:text-base font-semibold text-muted-foreground mb-1 sm:mb-2">{subtitle}</h2>
            )}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>


        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center relative">
          {/* Left Side - Tools List */}
          <motion.div
            className="space-y-4 sm:space-y-5 md:space-y-6 relative lg:pr-6 xl:pr-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {tools.map((tool, index) => {
              // 👇 Decide which tool is active
              const activeTool = hoveredTool || selectedTool;
              const isActive = activeTool.id === tool.id;

              return (
                <motion.div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  onMouseEnter={() => setHoveredTool(tool)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className="group cursor-pointer transition-all duration-300 relative"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                >
                  <div className="flex flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 py-3 sm:py-2 pl-4 sm:pl-0 relative">

                    {/* Icon */}
                    <div className="flex-shrink-0 flex justify-center ml-4 sm:ml-0">
                      <div
                        className={`
      w-12 h-12 flex items-center justify-center rounded-xl 
      transition-all duration-300 transform-gpu
      ${tool.bgColor}
      ${isActive ? "animate-bounce-slow" : ""}
    `}
                      >
                        {typeof tool.icon === "string" ? (
                          <img
                            src={tool.icon}
                            alt={tool.title}
                            className="w-6 h-6 filter brightness-0 invert"
                          />
                        ) : tool.icon && (tool.icon as any).src ? (
                          <img
                            src={(tool.icon as any).src}
                            alt={tool.title}
                            className="w-6 h-6 filter brightness-0 invert"
                          />
                        ) : (
                          React.createElement(tool.icon as any, {
                            className: "w-6 h-6 text-white",
                          })
                        )}
                      </div>
                    </div>




                    {/* Content */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                        {tool.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{tool.subtitle}</p>
                    </div>

                    {/* ✅ Only ONE active dotted arrow at a time */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="hidden sm:flex items-center ml-4"  // 👈 hide on mobile, show from sm+
                      >
                        {/* Dotted Line */}
                        <motion.div className="flex space-x-1 mr-2">
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${tool.iconColor.replace('text-', 'bg-')}`}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: i * 0.05,
                                duration: 0.2,
                                type: "spring",
                                stiffness: 400
                              }}
                            />
                          ))}
                        </motion.div>

                        {/* Arrow */}
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className={`p-2 rounded-full shadow-lg bg-white border-2 ${tool.iconColor.replace('text-', 'border-')}`}
                        >
                          <ArrowRight className={`w-4 h-4 ${tool.iconColor}`} />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          {/* Right Side - Realistic Phone Mockup */}
          <motion.div
            className="flex justify-center relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Background blob */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full opacity-60 -z-10"
              animate={{
                scale: hoveredTool || selectedTool ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* iPhone 14 Pro Mockup */}
            <motion.div
              className="relative z-10"
              animate={{
                scale: hoveredTool ? 1.02 : 1,
                rotateY: hoveredTool ? -2 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[520px] bg-gray-900 rounded-[3rem] shadow-2xl p-1">
                {/* Screen Bezel */}
                <div className="w-full h-full bg-black rounded-[2.8rem] p-1">
                  {/* Screen */}
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">

                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20"></div>

                    {/* Screen Content */}
                    <div className="h-full pt-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={hoveredTool ? hoveredTool.id : selectedTool.id}
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="h-full"
                        >
                          {hoveredTool ? hoveredTool.preview : selectedTool.preview}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-60"></div>
                  </div>
                </div>

                {/* Side Buttons */}
                <div className="absolute left-0 top-20 w-0.5 h-12 bg-gray-700 rounded-r-sm"></div>
                <div className="absolute left-0 top-36 w-0.5 h-8 bg-gray-700 rounded-r-sm"></div>
                <div className="absolute left-0 top-48 w-0.5 h-8 bg-gray-700 rounded-r-sm"></div>
                <div className="absolute right-0 top-32 w-0.5 h-16 bg-gray-700 rounded-l-sm"></div>
              </div>

              {/* Subtle glow effect when hovered */}
              <AnimatePresence>
                {hoveredTool && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-[3rem] shadow-2xl pointer-events-none"
                    style={{
                      boxShadow: `0 0 40px ${hoveredTool.iconColor.includes('blue') ? '#3B82F6' :
                        hoveredTool.iconColor.includes('purple') ? '#9333EA' :
                          hoveredTool.iconColor.includes('green') ? '#16A34A' :
                            '#EA580C'
                        }20`
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <br></br>

      </div>
    </section>

  );
}