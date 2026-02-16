import React, { useEffect, useState, useRef } from "react";

import {

  Target,

  Users,

  Award,

  BarChart3,

  Building2,

  TrendingUp,

  Trophy,

  BadgeDollarSign,

  BookOpen,

  Sparkles,

} from "lucide-react";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import indianStudentsMentors from "../../public/assets/indian-students-mentors.jpg";

// Avatar animation imports - commented out
// import centralStudentMain from "@/assets/indian-avatar-3.jpg";
// import avatar2 from "@/assets/indian-avatar-3.jpg";

import { ScrollAnimation } from "@/components/ui/scroll-animation";

import { useHomepageData } from "@/hooks/useHomepageData";
import Image from "next/image";



const HowItWorks = () => {

  const { data } = useHomepageData();



  // Use API data only

  const whyCollegeMentor = data?.whyCollegeMentor;



  // Map API steps to component format with icons

  const iconMap = [Target, Users, Award, BarChart3];

  const iconBgColors = ["bg-primary/10", "bg-secondary/10", "bg-accent/10", "bg-success/10"];

  const iconColors = ["text-primary", "text-secondary", "text-accent", "text-success"];



  // Use API steps only if they exist

  const steps = whyCollegeMentor?.steps

    ? whyCollegeMentor.steps.map((step, index) => ({

      number: `0${index + 1}`,

      icon: iconMap[index] || Target,

      title: step.title,

      description: step.description,

      iconBgColor: iconBgColors[index] || "bg-primary/10",

      iconColor: iconColors[index] || "text-primary",

    }))

    : [];



  // Map API metrics to component format with icons

  const metricIconMap: Record<string, any> = {

    "Partner Universities": Building2,

    "Students Mentored": Users,

    "Success Rate": TrendingUp,

    "Dream Admissions": Trophy,

    "Scholarships": BadgeDollarSign,

  };



  // Use API metrics only if they exist

  const metrics = whyCollegeMentor?.metrics

    ? whyCollegeMentor.metrics.map((metric) => ({

      icon: metricIconMap[metric.label] || Building2,

      value: metric.value,

      label: metric.label,

      color: "text-white",

      bgColor: "bg-secondary",

    }))

    : [];



  // Use API imageStats only if they exist

  const imageStats = whyCollegeMentor?.imageStats || [];



  // Use API heading only if it exists

  const heading = whyCollegeMentor?.heading || "";



  // Use API subHeading only if it exists

  const subHeading = whyCollegeMentor?.subHeading || "";



  // Split heading to find "CollegeMentor" and apply gradient

  const renderHeadingWithGradient = (text: string) => {

    const parts = text.split(/(CollegeMentor)/i);

    return parts.map((part, index) => {

      // Case-insensitive check for "CollegeMentor"

      if (/^collegementor$/i.test(part)) {

        return (

          <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">

            {part}

          </span>

        );

      }

      return <span key={index}>{part}</span>;

    });

  };

  const node1Ref = useRef<HTMLDivElement>(null);

  const node2Ref = useRef<HTMLDivElement>(null);

  const node3Ref = useRef<HTMLDivElement>(null);

  const node4Ref = useRef<HTMLDivElement>(null);

  return (

    <section className="pt-0 pb-0 bg-[#f5f9f7] relative">


      <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* Section Header */}

        <ScrollAnimation>

          <div className="text-center mb-6 sm:mb-8 md:mb-12 mt-0">

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">

              <Sparkles size={12} className="text-primary animate-pulse" />

              <span className="text-primary font-medium text-xs">Step by Step Guide</span>

            </div>



            {heading && (

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-2 sm:mb-3">

                {renderHeadingWithGradient(heading)}

              </h2>

            )}

            {subHeading && (

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">

                {subHeading}

              </p>

            )}

          </div>

        </ScrollAnimation>



        {/* Main Content Grid */}

        <ScrollAnimation delay={0.2}>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-10 md:mb-12">

            {/* Left Side - Animated Vertical Stepper */}

            <div className="order-2 lg:order-1">

              <div className="relative">

                {/* Vertical Line */}

                <div className="absolute left-5 sm:left-6 top-10 sm:top-12 bottom-10 sm:bottom-12 w-0.5 bg-border"></div>



                {steps.length > 0 && steps.map((step, index) => (

                  <div

                    key={index}

                    className="relative flex items-start mb-8 last:mb-0"

                  >

                    {/* Step Number Circle */}

                    <motion.div

                      ref={

                        index === 0 ? node1Ref :

                          index === 1 ? node2Ref :

                            index === 2 ? node3Ref :

                              index === 3 ? node4Ref : null

                      }

                      initial={{ scale: 0, opacity: 0 }}

                      animate={{ scale: 1, opacity: 1 }}

                      transition={{ duration: 0.5, delay: index * 0.8 }}

                      className="relative z-10 flex-shrink-0"

                    >

                      {/* Always show numbered circle - avatar no longer interferes */}

                      <div className="w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-sm">

                        <span className="text-sm font-semibold text-primary">

                          {step.number}

                        </span>

                      </div>

                    </motion.div>



                    {/* Content */}

                    <motion.div

                      initial={{ opacity: 0, y: 20 }}

                      animate={{ opacity: 1, y: 0 }}

                      transition={{ duration: 0.5, delay: index * 0.8 + 0.3 }}

                      className="ml-6 flex-1"

                    >

                      <div className="flex items-center gap-4 mb-2">

                        {/* Icon */}

                        <div

                          className={`w-10 h-10 rounded-lg ${step.iconBgColor} flex items-center justify-center`}

                        >

                          <step.icon size={20} className={step.iconColor} />

                        </div>



                        {/* Title */}

                        <h3 className="text-body font-semibold text-foreground">

                          {step.title}

                        </h3>

                      </div>



                      {/* Description */}

                      <p className="text-body-small text-muted-foreground leading-relaxed ml-14">

                        {step.description}

                      </p>

                    </motion.div>



                    {/* Connector Line Animation */}

                    {index < steps.length - 1 && (

                      <motion.div

                        initial={{ scaleY: 0 }}

                        animate={{ scaleY: 1 }}

                        transition={{ duration: 0.6, delay: index * 0.8 + 0.6 }}

                        className="absolute left-[25px] top-5 w-0.5 h-[calc(100%+16px)] bg-primary origin-top"

                      />

                    )}

                  </div>

                ))}

              </div>

            </div>



            {/* Right Side - Image with Floating Stats */}

            <div className="relative order-1 lg:order-2">

              <div className="relative overflow-hidden rounded-xl md:rounded-2xl">

                <Image

                  src={indianStudentsMentors}

                  alt="Indian students and mentors collaborating"

                  className="w-full h-auto object-cover"

                />



                {/* Floating Animated Stats Cards */}

                {imageStats.length > 0 && imageStats.map((stat, index) => {

                  const positions = [

                    { top: "top-3 left-3 md:top-6 md:left-6", icon: Users, iconColor: "text-blue-600", bgColor: "bg-blue-500/20", borderColor: "border-blue-200/30" },

                    { top: "top-20 right-2 md:top-32 md:right-4", icon: Award, iconColor: "text-green-600", bgColor: "bg-green-500/20", borderColor: "border-green-200/30" },

                    { top: "bottom-3 left-4 md:bottom-6 md:left-8", icon: BookOpen, iconColor: "text-purple-600", bgColor: "bg-purple-500/20", borderColor: "border-purple-200/30" },

                  ];

                  const position = positions[index] || positions[0];

                  const StatIcon = position.icon;



                  // Parse caption to extract value and label (e.g., "25K+ Total Students" -> value: "25K+", label: "Total Students")

                  const captionParts = stat.caption.split(/\s+(.+)/);

                  const value = captionParts[0] || stat.caption;

                  const label = captionParts[1] || "";



                  return (

                    <div

                      key={index}

                      className={`absolute ${position.top} bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl p-2 md:p-4 shadow-2xl animate-float border border-white/20`}

                      style={{ animationDelay: `${index}s` }}

                    >

                      <div className="flex items-center gap-2 md:gap-3">

                        <div className={`w-8 h-8 md:w-12 md:h-12 ${position.bgColor} backdrop-blur-sm rounded-full flex items-center justify-center border ${position.borderColor}`}>

                          <StatIcon className={position.iconColor} size={16} />

                        </div>

                        <div>

                          <div className="text-base md:text-lg font-bold text-gray-800">{value}</div>

                          {label && <div className="text-xs md:text-sm text-gray-600">{label}</div>}

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </ScrollAnimation>


        {/* Metrics Row */}

        <ScrollAnimation delay={0.4}>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-12 lg:gap-16 mt-2">





            {metrics.length > 0 && metrics.map((metric, index) => (

              <div

                key={index}

                className="flex flex-col items-center text-center"

              >

                {/* Icon with colored background */}

                <div

                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 shadow-md ${metric.bgColor}`}

                >

                  <metric.icon size={32} className={metric.color} />

                </div>



                <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">

                  {metric.value}

                </div>



                <div className="text-xs sm:text-sm md:text-base text-muted-foreground">

                  {metric.label}

                </div>

              </div>





            ))}

          </div>

        </ScrollAnimation>



      </div>

    </section>

  );

};



export default HowItWorks;