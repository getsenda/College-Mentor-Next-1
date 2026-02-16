import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
const boy1 = "/assets/boy1.svg";
const boy2 = "/assets/boy2.svg";
const girl1 = "/assets/girl1.webp";
const girl2 = "/assets/girl2.svg";

const testimonials = [
  {
    id: 1,
    name: "Dipankar Roy",
    text: "The College Mentor course was a game-changer! It helped me discover my true passion. Highly recommend!",
    avatar: boy1,
  },
  {
    id: 2,
    name: "Priya Sharma",
    text: "Amazing guidance and support throughout my college journey. The mentors truly care about your success!",
    avatar: girl1,
  },
  {
    id: 3,
    name: "Rahul Kumar",
    text: "Best decision I made was joining this program. It opened doors I never knew existed!",
    avatar: boy2,
  },
  {
    id: 4,
    name: "Ananya Singh",
    text: "The personalized approach helped me find my perfect career path. Forever grateful!",
    avatar: girl2,
  }
];

// Background colors for each testimonial (changes when user clicks a testimonial)
const testimonialBackgroundColors = [
  '#FFF8F0',  // default cream
  '#F0F9FF',  // soft blue
  '#F0FFF4',  // soft green
  '#FFF5F5',  // soft rose
];

const AnimatedTestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Auto-scroll every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  const pulseAnimation = {
    animate: {
      scale: [1, 1.08, 1],
    },
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleAvatarClick = (index: number) => {
    setActiveIndex(index);
  };

  // Calculate positions for the 4 avatars in a vertical dashed line
  const getAvatarPosition = (index: number) => {
    const positions = [
      { top: '0%' },
      { top: '30%' },
      { top: '60%' },
      { top: '90%' },
    ];
    return positions[index];
  };

  return (
    <motion.section
      className="py-12 md:py-20 relative overflow-hidden"
      animate={{ backgroundColor: testimonialBackgroundColors[activeIndex] }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Avatar Animation */}
          <div className="relative flex items-center justify-center h-[350px] md:h-[450px] lg:h-[500px]">

            {/* Curved dotted line (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 500 500"
              fill="none"
            >
              <path
                d="M150 60 C 40 200, 40 300, 150 440"
                stroke="#1daa5f"
                strokeWidth="3"
                strokeDasharray="6 10"
                strokeLinecap="round"
              />
            </svg>

            {/* Small avatars on the curve */}
            {testimonials.map((item, index) => {
              const positions = [
                { top: "10%", left: "22%" },
                { top: "32%", left: "10%" },
                { top: "60%", left: "12%" },
                { top: "82%", left: "25%" }
              ];

              return (
                <motion.div
                  key={item.id}
                  className="absolute cursor-pointer"
                  style={positions[index]}
                  onClick={() => handleAvatarClick(index)}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-4 transition-all duration-300 ${activeIndex === index
                      ? "border-[#1daa5f] shadow-xl"
                      : "border-white/50"
                      }`}
                  >
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              );
            })}

            {/* Center big avatar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Pulse */}
                <motion.div
                  key={`pulse-${activeIndex}`}
                  animate={pulseAnimation.animate}

                  className="absolute inset-0 rounded-full"
                />

                {/* Actual center avatar */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 md:border-8 border-white shadow-2xl">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Side - Testimonial Content */}
          <div className="space-y-6 md:space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 md:space-y-6"
              >
                <Quote className="w-12 h-12 md:w-16 md:h-16 text-foreground" />

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  Student Testimonial
                </h3>

                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {testimonials[activeIndex].text}
                </p>

                <div className="pt-2 md:pt-4">
                  <p className="text-right text-base md:text-lg font-semibold text-foreground">
                    {testimonials[activeIndex].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 pt-4 md:pt-8 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                className="rounded-full w-12 h-12 md:w-14 md:h-14 border-2 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={handleNext}
                className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-primary hover:bg-primary/90 transition-all"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AnimatedTestimonialSection;
