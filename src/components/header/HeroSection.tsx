"use client";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import graduateStudent from '../../../public/assets/5.png';
import avatar3 from '../../../public/assets/indian-avatar-3.jpg';
import avatar1 from '../../../public/assets/indian-avatar-1.jpg';
import avatar2 from '../../../public/assets/indian-avatar-2.jpg';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedNumber } from '../ui/motion';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { useHomepageData } from '@/hooks/useHomepageData';
import { SearchBar } from '@/components/header/searchbar';
import { AvatarAnimation } from '@/components/header/avatar_animation';
import { FloatingLayer } from '@/components/FloatingLayer';
import { logger } from '@/utils/logger';



const HeroSection = () => {
  const { data, loading, error } = useHomepageData();

  // Use API data directly for title, subtitle, and searchPlaceholder (no hardcoded fallbacks)
  const heroData = data?.hero;
  const title = heroData?.title;
  const subtitle = heroData?.subtitle;
  const searchPlaceholder = heroData?.searchPlaceholder;

  // Hardcoded stats as fallback when API stats is null
  const defaultStats = {
    colleges: 40000,
    exams: 2500,
    courses: 15000,
    careers: 800
  };

  // Use API stats if available, otherwise use hardcoded stats
  // If API stats exists but individual fields are null, use field-level fallbacks
  const stats = heroData?.stats
    ? {
      colleges: heroData.stats.colleges ?? defaultStats.colleges,
      exams: heroData.stats.exams ?? defaultStats.exams,
      courses: heroData.stats.courses ?? defaultStats.courses,
      careers: heroData.stats.careers ?? defaultStats.careers,
    }
    : defaultStats;
  const avatar3Ref = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [currentSide, setCurrentSide] = useState<'left' | 'right'>('left');

  const messages = useMemo(() => [
    { text: "Career Guidance", avatar: avatar1, side: 'left' as const },
    { text: "Scholarship Alert", avatar: avatar2, side: 'right' as const },
    { text: "Dream College", avatar: avatar3, side: 'left' as const },
    { text: "Mentorship", avatar: avatar1, side: 'right' as const },
    { text: "Top Colleges", avatar: avatar2, side: 'left' as const },
    { text: "Expert Advice", avatar: avatar3, side: 'right' as const },
  ], []);

  useEffect(() => {
    let timeoutId: number | undefined;
    const messageInterval = setInterval(() => {
      // Fade out current message
      setShowMessage(false);

      // After fade out completes, change message and fade in
      timeoutId = window.setTimeout(() => {
        const nextIndex = (currentMessageIndex + 1) % messages.length;
        setCurrentMessageIndex(nextIndex);
        setCurrentSide(messages[nextIndex].side);
        setShowMessage(true);
      }, 500); // Wait for fade out to complete
    }, 3000); // Show each message for 3 seconds

    return () => {
      clearInterval(messageInterval);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [currentMessageIndex, messages]);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoModalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Esc key to close video - multiple layers of event handling
  useEffect(() => {
    if (!isVideoOpen) return;

    const handleEscKey = (event: KeyboardEvent | React.KeyboardEvent) => {
      if (event.key === 'Escape' || (event as KeyboardEvent).keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        if ('stopImmediatePropagation' in event) {
          event.stopImmediatePropagation();
        }
        setIsVideoOpen(false);
        return false;
      }
    };

    // Add multiple event listeners with capture phase
    const options = { capture: true, passive: false } as const;

    window.addEventListener('keydown', handleEscKey as EventListener, options);
    document.addEventListener('keydown', handleEscKey as EventListener, options);
    document.body.addEventListener('keydown', handleEscKey as EventListener, options);

    // Also add to document element
    document.documentElement.addEventListener('keydown', handleEscKey as EventListener, options);

    // Focus management - keep focus on close button or wrapper
    const focusElement = () => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else if (videoModalRef.current) {
        videoModalRef.current.focus();
      }
    };

    // Focus immediately and on any blur
    focusElement();
    const handleBlur = () => {
      // Refocus if focus moves away (but not if closing)
      if (isVideoOpen) {
        setTimeout(focusElement, 10);
      }
    };

    window.addEventListener('blur', handleBlur, true);

    return () => {
      window.removeEventListener('keydown', handleEscKey as EventListener, options);
      document.removeEventListener('keydown', handleEscKey as EventListener, options);
      document.body.removeEventListener('keydown', handleEscKey as EventListener, options);
      document.documentElement.removeEventListener('keydown', handleEscKey as EventListener, options);
      window.removeEventListener('blur', handleBlur, true);
    };
  }, [isVideoOpen]);

  return (
    <>
      <section ref={heroSectionRef} className="relative overflow-visible min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] pt-16 sm:pt-20 md:pt-24 lg:pt-20">

        {/* Full-width Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(162,100%,39%)] to-[hsl(229,78%,41%)]"></div>


        {/* Content Container */}
        <div
          className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8
min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]
flex flex-col justify-start sm:justify-center
max-w-7xl py-0 sm:py-8 md:py-12 lg:py-0"
        >


          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center w-full">
            {/* Left Side - Content */}
            <ScrollAnimation delay={0.2}>
              <div className="space-y-4 sm:space-y-4 md:space-y-5 lg:space-y-6 text-white">
                {/* Main Heading */}
                <div className="space-y-3 sm:space-y-3">
                  <h1
                    className="mt-0 sm:mt-auto text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
          text-white font-extrabold leading-tight sm:leading-snug md:leading-tight"
                  >
                    {title}
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-2xl mb-4 sm:mb-6">
                    {subtitle}
                  </p>
                </div>

                {/* Hero Search Bar */}
                <SearchBar
                  variant="hero"
                  placeholder={searchPlaceholder}
                  showQuickLinks={true}
                  onSearch={(searchTerm) => {
                    logger.log("Hero search:", searchTerm);
                  }}
                  className="w-full sm:w-[400px] md:w-[550px] [&_input]:h-[50px] [&_input]:text-lg [&_input]:px-10"

                />




                {/* Statistics Section - improved mobile layout */}
                <div className="mt-8 sm:mt-0 md:mt-0 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-4 sm:gap-4 md:gap-6 justify-start">
                  {stats.colleges !== undefined && (
                    <div className="text-center sm:text-left text-white">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1" style={{ color: "#FFC107" }}>
                        <AnimatedNumber value={stats.colleges} />
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">Colleges</div>
                    </div>
                  )}

                  {stats.exams !== undefined && (
                    <div className="text-center sm:text-left text-white">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1" style={{ color: "#FFC107" }}>
                        <AnimatedNumber value={stats.exams} />
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">Exams</div>
                    </div>
                  )}

                  {stats.courses !== undefined && (
                    <div className="text-center sm:text-left text-white">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1" style={{ color: "#FFC107" }}>
                        <AnimatedNumber value={stats.courses} />
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">Courses</div>
                    </div>
                  )}

                  {stats.careers !== undefined && (
                    <div className="text-center sm:text-left text-white">
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1" style={{ color: "#FFC107" }}>
                        <AnimatedNumber value={stats.careers} />
                      </div>
                      <div className="text-xs sm:text-sm opacity-90">Careers</div>
                    </div>
                  )}
                </div>

              </div>
            </ScrollAnimation>

            {/* Play Button - Centered between content sections */}
            <div className="relative flex justify-center items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-20 mt-6 sm:mt-8 lg:mt-0">
              <button
                className="group relative bg-white/15 backdrop-blur-lg hover:bg-white/25 rounded-full p-4 sm:p-5 md:p-6 border-2 border-white/30 hover:border-secondary/60 transition-all duration-300 hover:scale-110 shadow-2xl"
                onClick={() => setIsVideoOpen(true)}
              >
                <Play
                  size={24}
                  className="text-white ml-0.5 group-hover:text-secondary group-hover:scale-110 transition-all duration-300 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  fill="currentColor"
                />
                <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-ping"></div>
                <div
                  className="absolute inset-0 rounded-full border border-white/20 animate-pulse"
                  style={{ animationDelay: '1s' }}
                ></div>
              </button>
              {/* Non-disruptive central avatar positioned below the play button - rendered in floating layer */}
              {/* <FloatingLayer>
                <AvatarAnimation heroSectionRef={heroSectionRef} />
              </FloatingLayer> */}
            </div>


            {/* Right Side - Animated Hero Scene (replace current image/avatars) */}
            <ScrollAnimation delay={0.4}>
              <div className="relative flex justify-center lg:justify-end items-center mt-8 sm:mt-10 lg:mt-0
                  h-[240px] sm:h-[280px] md:h-[340px] lg:h-[460px]
                  overflow-visible">
                {/* Image wrapper */}
                <div className="relative inline-block">
                  <img
                    src={graduateStudent.src}
                    alt="Graduate Student"
                    className="block w-full
                 max-w-[150px] sm:max-w-[190px] md:max-w-[240px]
                 lg:max-w-[320px] xl:max-w-[380px]
                 h-auto object-contain"
                    style={{
                      filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
                      mixBlendMode: "multiply",
                    }}
                  />
                  {/* old code */}
                  {/* <div className="relative flex justify-center lg:justify-end items-center mt-8 sm:mt-10 lg:mt-0 h-[200px] sm:h-[240px] md:h-[300px] lg:h-[420px] overflow-hidden md:overflow-visible">
              {/* Image wrapper (must be relative) */}
                  {/* <div className="relative inline-block">
                <img
                  src={graduateStudent}
                  alt="Graduate Student"
                  className="block w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[280px] xl:max-w-[320px] h-auto object-contain"

                  style={{
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
                    mixBlendMode: "multiply",
                  }}
                /> */}




                  {/* LEFT pop-in (positioned relative to left glowing dot) - Hidden on mobile */}
                  <div className="hidden md:flex absolute -left-2 md:left-0 lg:left-4 bottom-0 flex-col items-center pointer-events-none">
                    {/* pulsing dot at top of the connector */}
                    <motion.div
                      className="w-5 h-3 rounded-full shadow-lg mb-1 relative"
                      style={{ backgroundColor: "#22c55e" }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      {/* Message positioned relative to this dot */}
                      <AnimatePresence mode="wait">
                        {showMessage && currentSide === 'left' && (
                          <motion.div
                            key={`left-message-${currentMessageIndex}`}
                            className="absolute -top-2 left-8 md:left-12 lg:left-16 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-visible"
                            style={{
                              padding: '8px 12px',
                              width: 'auto',
                              minWidth: 'max-content',
                              maxWidth: 'none',
                              boxSizing: 'border-box'
                            }}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="flex items-center" style={{ gap: '10px' }}>
                              <img
                                src={messages[currentMessageIndex].avatar.src}
                                alt="Student Avatar"
                                className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                style={{ display: 'block' }}
                              />
                              <span
                                className="text-sm font-medium text-gray-800 whitespace-nowrap"
                                style={{
                                  display: 'inline-block',
                                  lineHeight: '1.5',
                                  overflow: 'visible'
                                }}
                              >
                                {messages[currentMessageIndex].text}
                              </span>
                            </div>
                          </motion.div>

                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* animated dashed vertical SVG */}
                    <motion.svg
                      width="2"
                      height="80"
                      viewBox="0 0 2 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ strokeDasharray: "80", strokeDashoffset: 80 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    >
                      <line x1="1" y1="0" x2="1" y2="80" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 6" />
                    </motion.svg>

                    {/* avatar at the bottom end (image bottom) */}
                    <motion.div
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white mt-2"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img src={avatar2.src} alt="Student Left" className="w-full h-full object-cover" />
                    </motion.div>
                  </div>






                  {/* Right side dotted line with avatar (bottom aligned) - Hidden on mobile */}
                  <div className="hidden md:flex absolute right-0 md:right-2 lg:right-4 xl:-right-[34px] bottom-0 flex-col items-center">
                    {/* Avatar */}
                    <motion.div
                      ref={avatar3Ref}
                      id="hero-avatar3"
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white mb-2"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img
                        src={avatar3.src}
                        alt="Student Right"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Animated line */}
                    <motion.svg
                      width="2"
                      height="100"
                      viewBox="0 0 2 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ strokeDasharray: "100", strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    >
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="100"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                      />
                    </motion.svg>

                    {/* Glowing dot with message */}
                    <motion.div
                      className="w-3 h-3 bg-pink-400 rounded-full shadow-lg mb-1 relative"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {/* Message positioned relative to this dot */}
                      <AnimatePresence mode="wait">
                        {showMessage && currentSide === 'right' && (
                          <motion.div
                            key={`right-message-${currentMessageIndex}`}
                            className="absolute -top-2 right-8 md:right-12 lg:right-16 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-visible"
                            style={{
                              padding: '8px 12px',
                              width: 'auto',
                              minWidth: 'max-content',
                              maxWidth: 'none',
                              boxSizing: 'border-box'
                            }}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="flex items-center" style={{ gap: '10px' }}>
                              <img
                                src={messages[currentMessageIndex].avatar.src}
                                alt="Student Avatar"
                                className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                                style={{ display: 'block' }}
                              />
                              <span
                                className="text-sm font-medium text-gray-800 whitespace-nowrap"
                                style={{
                                  display: 'inline-block',
                                  lineHeight: '1.5',
                                  overflow: 'visible'
                                }}
                              >
                                {messages[currentMessageIndex].text}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Animated Sparkles */}
            <motion.div
              className="hidden md:block absolute top-6 left-20 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            <motion.div
              className="hidden md:block absolute bottom-12 right-4 w-1.5 h-1.5 bg-pink-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8
              }}
            />
          </div>
        </div>
        {/* Multi-Layered Animated Waves */}
        {/* Multi-Layered Waves Blending into Next Section */}
        <div className="block absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg
            className="relative block w-full h-32 sm:h-40 md:h-56"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            {/* Foreground Wave (matches next section) */}
            <motion.path
              fill="#F5F9F7"
              d="M0,160C360,320,720,0,1080,160C1260,240,1440,80,1440,90L1440,320L0,320Z"
              animate={{
                d: [
                  "M0,160C360,320,720,0,1080,160C1260,240,1440,80,1440,90L1440,320L0,320Z",
                  "M0,160C360,320,720,0,1080,160C1260,240,1440,80,1440,90L1440,320L0,320Z",
                  "M0,160C360,320,720,0,1080,160C1260,240,1440,80,1440,90L1440,320L0,320Z"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />

            {/* Middle Wave */}
            <motion.path
              fill="rgba(245,249,247,0.6)"
              d="M0,180C360,300,720,40,1080,180C1260,240,1440,100,1440,180L1440,320L0,320Z"
              animate={{
                d: [
                  "M0,180C360,300,720,40,1080,180C1260,240,1440,100,1440,180L1440,320L0,320Z",
                  "M0,200C360,320,720,60,1080,200C1260,260,1440,120,1440,200L1440,320L0,320Z",
                  "M0,160C360,280,720,20,1080,160C1260,220,1440,80,1440,160L1440,320L0,320Z"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />

            {/* Background Wave */}
            <motion.path
              fill="rgba(245,249,247,0.3)"
              d="M0,200C360,280,720,80,1080,200C1260,240,1440,160,1440,200L1440,320L0,320Z"
              animate={{
                d: [
                  "M0,200C360,280,720,80,1080,200C1260,240,1440,160,1440,200L1440,320L0,320Z",
                  "M0,220C360,300,720,100,1080,220C1260,260,1440,180,1440,220L1440,320L0,320Z",
                  "M0,180C360,260,720,60,1080,180C1260,220,1440,140,1440,180L1440,320L0,320Z"
                ]
              }}
              transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          </svg>
        </div>



      </section >

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black">
          <DialogHeader className="sr-only">
            <DialogTitle>CollegeMentor Brand Video</DialogTitle>
          </DialogHeader>
          <div
            ref={videoModalRef}
            className="relative aspect-video"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/OWinhZfwet0?autoplay=1&mute=1"
              title="CollegeMentor Brand Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full relative z-10"
            />
            <button
              ref={closeButtonRef}
              onClick={() => setIsVideoOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape' || e.keyCode === 27) {
                  e.preventDefault();
                  setIsVideoOpen(false);
                }
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>

  );
}
export default HeroSection;