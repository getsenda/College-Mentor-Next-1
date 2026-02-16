import React, { useState, useEffect } from 'react';
import { FileText, Target, UserCheck, ArrowRight, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useHomepageData } from '@/hooks/useHomepageData';

// Import images
import careerAssessmentImage from '../../public/assets/career-assessment-image.webp';
import centralStudentMain from '../../public/assets/indian-avatar-3.jpg';
import avatar1 from '../../public/assets/indian-avatar-1.jpg';
import avatar2 from '../../public/assets/indian-avatar-2.jpg';
import avatar3 from '../../public/assets/indian-avatar-3.jpg';
import avatar4 from '../../public/assets/mit-graduate-avatar.jpg';
import avatar5 from '../../public/assets/indian-student-portrait-male.jpg';
import avatar6 from '../../public/assets/indian-student-portrait-female.jpg';
import indianBoyImage from '../../public/assets/indian_boy.png';
import avatar7 from '../../public/assets/graduate-student-transparent.png';
import avatra8 from '../../public/assets/hero-blended-graduate.jpg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import Image from 'next/image';

// Country flags data with CSS background approach
const countryFlags = [
  {
    name: 'USA',
    studyText: 'Student Mentor',
    flagClass: 'flag-us'
  },
  {
    name: 'UK',
    studyText: 'Career Mentor',
    flagClass: 'flag-gb'
  },
  {
    name: 'Canada',
    studyText: 'Admission Mentor',
    flagClass: 'flag-ca'
  },
  {
    name: 'India',
    studyText: 'Loan Mentor',
    flagClass: 'flag-in'
  },
  {
    name: 'Germany',
    studyText: 'Scholarship Mentor',
    flagClass: 'flag-de'
  },
  {
    name: 'France',
    studyText: 'Health Mentor',
    flagClass: 'flag-fr'
  },
  {
    name: 'Japan',
    studyText: 'Study in Japan',
    flagClass: 'flag-jp'
  },
  {
    name: 'Singapore',
    studyText: 'Study in Singapore',
    flagClass: 'flag-sg'
  },
  {
    name: 'Australia',
    studyText: 'Study in Australia',
    flagClass: 'flag-au'
  },
  {
    name: 'Netherlands',
    studyText: 'Study in Netherlands',
    flagClass: 'flag-nl'
  },
  {
    name: 'Sweden',
    studyText: 'Study in Sweden',
    flagClass: 'flag-se'
  },
  {
    name: 'Switzerland',
    studyText: 'Study in Switzerland',
    flagClass: 'flag-ch'
  }
];
const avatarData = [
  { image: avatar1, alt: "USA Student", country: "US", tooltip: countryFlags[0].studyText, spin: "85s" },
  { image: avatar2, alt: "UK Student", country: "UK", tooltip: countryFlags[1].studyText, spin: "75s" },
  { image: avatar3, alt: "Canada Student", country: "CA", tooltip: countryFlags[2].studyText, spin: "105s" },
  { image: avatar4, alt: "India Student", country: "IN", tooltip: countryFlags[3].studyText, spin: "65s" },
  { image: avatar5, alt: "Germany Student", country: "DE", tooltip: countryFlags[4].studyText, spin: "115s" },
  { image: avatar6, alt: "France Student", country: "FR", tooltip: countryFlags[5].studyText, spin: "155s" },
  // { image: avatar7, alt: "Japan Student", country: "JP", tooltip: countryFlags[6].studyText, spin: "95s" },
  // { image: indianBoyImage, alt: "Singapore Student", country: "SG", tooltip: countryFlags[7].studyText, spin: "125s" }
];



const IkigaiCareerTest = () => {
  const { data } = useHomepageData();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAvatar3InCenter, setShowAvatar3InCenter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Track mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for avatar3 position events from HowItWorks component
  useEffect(() => {
    const handleAvatar3Event = (event: CustomEvent) => {
      setShowAvatar3InCenter(event.detail);
    };

    window.addEventListener('avatar3-at-ikigai', handleAvatar3Event as EventListener);
    return () => window.removeEventListener('avatar3-at-ikigai', handleAvatar3Event as EventListener);
  }, []);

  // Hardcoded fallback data
  const defaultFeatures = [
    {
      icon: FileText,
      title: "Comprehensive Assessment",
      description: "Assessment of your passions, abilities, character traits, and ambitions.",
      color: "from-orange-400 to-red-500",
      delay: "delay-100"
    },
    {
      icon: Target,
      title: "Personalized Report",
      description: "Find your strengths, preferences and exclusive career avenues that match your distinct qualities",
      color: "from-violet-400 to-purple-600",
      delay: "delay-200"
    },
    {
      icon: UserCheck,
      title: "Expert Mentorship",
      description: "Discover Dream Career College, and Job through Expert Dual Mentorship.",
      color: "from-teal-400 to-emerald-600",
      delay: "delay-300"
    }
  ];

  // Map API features to component format with icons
  const iconMap = [FileText, Target, UserCheck];
  const colorMap = ["from-orange-400 to-red-500", "from-violet-400 to-purple-600", "from-teal-400 to-emerald-600"];
  const delayMap = ["delay-100", "delay-200", "delay-300"];

  // Use API data only if it exists, otherwise use hardcoded
  const ikigaiData = data?.ikigaiCareerTest;

  const features = ikigaiData?.features && ikigaiData.features.length > 0
    ? ikigaiData.features.map((feature, index) => ({
      icon: iconMap[index] || FileText,
      title: feature.title,
      description: feature.description,
      color: colorMap[index] || "from-orange-400 to-red-500",
      delay: delayMap[index] || "delay-100"
    }))
    : defaultFeatures;

  // Use API heading/subHeading only if they exist, otherwise use hardcoded
  const heading = ikigaiData?.heading || "Ikigai Career Assessment Test";
  const subHeading = ikigaiData?.subHeading || "Discover Your Purpose";

  // Map API samples to avatar data format
  const sampleImageMap: Record<string, any> = {
    "indian_boy.png": indianBoyImage,
    "indian-avatar-3.jpg": avatar3,
    "hero-blended-graduate.jpg": avatra8,
    "career-assessment-image.webp": careerAssessmentImage,
  };

  // Helper to get image from API imageUrl or fallback
  const getImageFromUrl = (imageUrl: string | null) => {
    if (!imageUrl) return indianBoyImage;
    // Check if it's a known asset name
    if (sampleImageMap[imageUrl]) return sampleImageMap[imageUrl];
    // Otherwise return the URL directly (for external images)
    return imageUrl;
  };

  // Hardcoded fallback samples
  const defaultSamples = [
    { title: "Rahul - IIT Delhi Alumni", imageUrl: indianBoyImage },
    { title: "Meera - BITS Alumni", imageUrl: avatar3 },
    { title: "Abhay - CA Student", imageUrl: avatra8 },
    { title: "Priya - JEE Aspirant", imageUrl: indianBoyImage },
  ];

  // Use API samples only if they exist, otherwise use hardcoded
  const samples = ikigaiData?.samples && ikigaiData.samples.length > 0
    ? ikigaiData.samples.map((sample) => ({
      title: sample.title,
      imageUrl: getImageFromUrl(sample.imageUrl),
    }))
    : defaultSamples;

  // Use API stats only if they exist
  const stats = ikigaiData?.stats || [];

  // Helper function to render heading with gradient
  const renderHeadingWithGradient = (text: string) => {
    const parts = text.split(/(Ikigai|Career|Assessment|Test)/i);
    return parts.map((part, index) => {
      if (/^(ikigai|career|assessment|test)$/i.test(part)) {
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
    <section className="relative overflow-hidden bg-white p-0 pt-0 pb-0 mt-0 mb-0">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-primary/8 to-secondary/8 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-72 md:h-72 bg-gradient-to-r from-secondary/8 to-primary/8 rounded-full blur-3xl animate-pulse opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} order-1 lg:order-2`}>

            {/* Header */}
            <div className="mb-4 md:mb-6">
              {subHeading && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">
                  <Sparkles size={12} className="text-primary animate-pulse" />
                  <span className="text-primary font-medium text-xs">{subHeading}</span>
                </div>
              )}

              {heading && (
                <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-3">
                  {renderHeadingWithGradient(heading)}
                </h2>
              )}
            </div>

            {/* Features List */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm transform ${feature.delay} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`relative w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <feature.icon size={16} className="text-white md:w-5 md:h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-2 md:gap-3 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Button
                size="default"
                className="bg-gradient-to-r from-secondary to-emerald-600 hover:from-secondary/90 hover:to-emerald-600/90 text-white px-4 py-2 text-sm rounded-lg shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-105 group flex-1"
              >
                Know your Ikigai
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>

              <Button
                variant="outline"
                size="default"
                className="border-2 border-secondary/80 text-secondary hover:bg-secondary hover:text-white px-4 py-2 text-sm rounded-lg shadow-lg hover:shadow-secondary/30 transition-all duration-300 hover:scale-105 group flex-1"
              >
                <Download size={14} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:inline">Sample Reports</span>
                <span className="sm:hidden">Reports</span>
              </Button>
            </div>
          </div>

          {/* Right Animated Orbit System */}
          <div
            className={`relative transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              } mt-8 sm:mt-10 lg:mt-0 order-2 lg:order-1`}
          >
            {/* Orbit wrapper: smaller on mobile, large on desktop */}
            <div className="relative w-full max-w-xs sm:max-w-2xl mx-auto aspect-square">
              {/* Orbit SVG */}
              <div className="absolute inset-0">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 500 500"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                      <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                    </linearGradient>

                    <style>
                      {`
                        @keyframes dash {
                          0% {
                            stroke-dashoffset: 400;
                          }
                          100% {
                            stroke-dashoffset: 0;
                          }
                        }
                      `}
                    </style>
                  </defs>

                  {/* Orbits */}
                  <circle cx="250" cy="250" r="160" fill="none" stroke="url(#orbitGradient)" strokeWidth="1.2" />
                  <circle cx="250" cy="250" r="225" fill="none" stroke="url(#orbitGradient)" strokeWidth="1.5" />

                  {/* Rahul ↔ Priya arc (bottom ↔ left) */}
                  <path
                    d="M 250 475 A 225 225 0 0 1 25 230"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{ animation: "dash 3s linear infinite alternate" }}
                  />
                  <circle cx="250" cy="475" r="3" fill="hsl(var(--primary))" />
                  <circle cx="25" cy="230" r="3" fill="hsl(var(--primary))" />

                  {/* Aarav ↔ Meera arc (right ↔ top, clockwise) */}
                  <path
                    d="M 475 250 A 230 230 0 0 0 220 25"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{ animation: "dash 3s linear infinite alternate-reverse" }}
                  />
                  <circle cx="475" cy="250" r="3" fill="hsl(var(--secondary))" />
                  <circle cx="220" cy="25" r="3" fill="hsl(var(--secondary))" />
                </svg>

                {/* </svg> */}
              </div>

              {/* Central Career Assessment Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  id="ikigai-center-image"
                  className="w-1/2 sm:w-60 md:w-72 aspect-square bg-white rounded-full shadow-2xl overflow-hidden group hover:scale-105 transition-all duration-500"
                >
                  <Image
                    src={showAvatar3InCenter ? centralStudentMain : careerAssessmentImage}
                    alt="Career Assessment"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>




              {/* Rotating Orbital Avatars - Properly positioned on inner circle */}
              {avatarData.map((avatar, index) => {
                const total = avatarData.length;
                // Responsive radius: smaller on mobile, larger on desktop
                const baseRadius = isMobile ? 100 : 190;
                const angle = (index / total) * 2 * Math.PI;
                const x = baseRadius * Math.cos(angle);
                const y = baseRadius * Math.sin(angle);

                return (
                  <div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      animation: `spin 100s linear infinite`
                    }}
                  >
                    <div
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                      }}
                    >
                      {/* Counter-rotation so content stays upright */}
                      <div
                        className="relative"
                        style={{
                          animation: `spin-reverse 100s linear infinite`
                        }}
                      >
                        <div className="relative animate-float animate-scale-in group">
                          {/* Avatar circle */}
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border-2 border-white overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                            <Image
                              src={avatar.image}
                              alt={avatar.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Alumni Card - Centered below avatar */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white text-gray-600 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-md border-0 transition-all duration-300 group-hover:scale-105">
                            <div className="text-[7px] sm:text-[10px] font-bold text-center whitespace-nowrap">
                              {avatar.tooltip}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}



              {/* Sample 1 - Static Avatar (Left) */}
              {samples[0] && (
                <div className="absolute top-[40%] left-0 sm:left-2 md:left-4" style={{ transform: `translateY(-50%)` }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border-2 border-white overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <Image
                      src={samples[0].imageUrl}
                      alt={samples[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Alumni Card - Overlapping */}
                  <div className="absolute -bottom-3 -right-5 bg-white text-gray-600 rounded-lg p-1 shadow-md border-0 transition-all duration-300 group-hover:scale-105">
                    <div className="text-[9px] sm:text-[10px] font-bold text-center whitespace-nowrap">
                      {samples[0].title}
                    </div>

                    {/* Callout */}
                    <div className="absolute top-1/2 -right-24 sm:-right-28 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 shadow-md border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 w-20 sm:w-24 text-center">
                      <div className="text-[9px] sm:text-[10px] font-medium text-foreground">{samples[0].title.split(' - ')[0]}</div>
                      <div className="text-[9px] sm:text-[10px] text-primary">{samples[0].title.split(' - ')[1] || ''}</div>
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-white rotate-45 border-l border-t border-primary/20"></div>
                    </div>
                  </div>
                </div>
              )}




              {/* Sample 2 - Static Avatar (Top) */}
              {samples[1] && (
                <div
                  className="absolute top-0 sm:top-2 md:top-4 left-1/2"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  <div
                    className="absolute top-1/4 right-2 sm:right-5  w-12 h-12 sm:w-16 sm:h-16"
                  >
                    <div className="relative group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border-2 border-white overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <div className="w-full h-full rounded-full shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 group">
                          <img
                            src={typeof samples[1].imageUrl === "string" ? samples[1].imageUrl : samples[1].imageUrl.src}
                            alt={samples[1].title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Card - Overlapping */}
                        <div className="absolute -bottom-6 -left-6 bg-white text-gray-600 rounded-lg p-1 shadow-md border-0 transition-all duration-300 group-hover:scale-105">
                          <div className="text-[9px] sm:text-[10px] font-bold text-center whitespace-nowrap">
                            {samples[1].title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Sample 3 - Static Avatar (Right Side) */}
              {samples[2] && (
                <div
                  className="absolute top-[54%] right-0 sm:right-2 md:right-4"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <div className="relative group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg border-2 border-white overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                      <div className="w-full h-full rounded-full shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 group">
                        <img
                          src={typeof samples[2].imageUrl === "string" ? samples[2].imageUrl : samples[2].imageUrl.src}
                          alt={samples[2].title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Card - Overlapping */}
                      <div className="absolute -bottom-6 -left-2 bg-white text-gray-600 rounded-lg p-1 shadow-md border-0 transition-all duration-300 group-hover:scale-105">
                        <div className="text-[9px] sm:text-[10px] font-bold text-center whitespace-nowrap">
                          {samples[2].title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Priya - Static Indian Student Avatar near JEE Aspirant */}
              {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20" style={{ transform: 'translateX(calc(-50% + 40px))' }}>
                  <div className="relative">
                    <div className="w-full h-full rounded-full shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300 group">
                      <img
                        src={careerAssessmentImage}
                        alt="Priya - Indian Student"
                        className="w-full h-full object-cover"
                      />
                    </div> */}


              {/* Callout */}
              {/* <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 w-24 text-center">
                      <div className="text-xs font-medium text-foreground">Priya</div>
                      <div className="text-xs text-primary">JEE Aspirant</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-primary/20"></div>
                    </div>
                  </div>
                </div> */}

              {/* Sample 4 - Static Avatar (Bottom) */}
              {samples[3] && (
                <>
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12"
                    style={{ transform: 'translateX(calc(-50% + 25px))' }}
                  >
                    <div className="relative overflow-visible pb-10">
                      <div className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-white overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <img
                          src={typeof samples[3].imageUrl === "string" ? samples[3].imageUrl : samples[3].imageUrl.src}
                          alt={samples[3].title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Callout */}
                      <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 shadow-md border border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 w-12 sm:w-20 text-center">
                        <div className="text-[9px] sm:text-[10px] font-medium text-foreground">{samples[3].title.split(' - ')[0]}</div>
                        <div className="text-[9px] sm:text-[10px] text-primary">{samples[3].title.split(' - ')[1] || ''}</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rotate-45 border-r border-b border-primary/20"></div>
                      </div>
                    </div>
                  </div>

                  {/* Sample Card - Below */}
                  <div className="absolute  -bottom-3 left-1/2 -translate-x-1/2 bg-white text-gray-600 rounded-lg p-2 shadow-xl border-0 transition-all duration-300 hover:scale-105" style={{ transform: 'translateX(calc(-50% + 30px))' }}>
                    <div className="text-xs font-bold text-center whitespace-nowrap">
                      {samples[3].title}
                    </div>
                  </div>
                </>
              )}


              {/* Success Stats - Floating */}
              {stats.length > 0 && stats.map((stat, index) => {
                const positions = [
                  { top: "-top-2", right: "-right-2", left: "", border: "border-primary/20", gradient: "from-primary to-secondary" },
                  { top: "-bottom-2", right: "", left: "-left-2", border: "border-secondary/20", gradient: "from-secondary to-primary" },
                ];
                const position = positions[index] || positions[0];
                return (
                  <div
                    key={index}
                    className={`absolute ${position.top} ${position.right} ${position.left} bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-xl border ${position.border} animate-float`}
                    style={{ animationDelay: `${index}s` }}
                  >
                    <div className="text-center">
                      <div className={`text-xs font-bold bg-gradient-to-r ${position.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div >
    </section >
  );
};

export default IkigaiCareerTest;