import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/FallBack";
import studentsCollaborationImage from "../../../public/assets/admission-success-students.jpg";

interface EnrollmentHeroProps {
  onKnowMore: () => void;
}

export function EnrollmentHero({ onKnowMore }: EnrollmentHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex items-center bg-secondary">
      {/* Top Curve with Shadow */}
      <div className="absolute -top-1 left-0 right-0 overflow-hidden leading-[0] z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 drop-shadow-md"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,140 C180,60 360,180 720,100 C1080,20 1260,180 1440,100 L1440,0 L0,0 Z"
          />





        </svg>
      </div>

      {/* Base Green Background */}
      {/* <div className="absolute inset-0 bg-secondary" />  */}


      {/* Dotted Circle Pattern */}
      <div className="absolute top-12 right-4 sm:right-8 md:right-12 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full hidden sm:block">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full text-secondary-foreground/30"
          fill="currentColor"
        >
          <defs>
            <pattern
              id="dot-pattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" />
            </pattern>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#dot-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-2 sm:mb-3">
            <Sparkles size={12} className="text-white animate-pulse" />
            <span className="text-white font-medium text-xs sm:text-sm">Simplified Admission Process</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Application to <span>Direct Admission</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-secondary-foreground/80 max-w-3xl">
            Discover streamlined pathways to your academic future. Skip the
            complexity and explore direct admission opportunities tailored for
            ambitious students.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6">
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-foreground">82% students</p>
              <p className="text-base sm:text-lg font-bold text-secondary-foreground">applied</p>
              <p className="text-xs sm:text-sm text-secondary-foreground/70 mt-1">
                After taking CollegeMentor's admission readiness survey
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-foreground">4.2x</p>
              <p className="text-base sm:text-lg font-bold text-secondary-foreground">more likely to enroll</p>
              <p className="text-xs sm:text-sm text-secondary-foreground/70 mt-1">
                After engaging with mentors through CollegeMentor
              </p>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onKnowMore}
            size="lg"
            className="bg-background text-secondary hover:bg-background/90 shadow-elegant hover:shadow-strong mt-4 sm:mt-6 w-full sm:w-auto text-sm sm:text-base"
          >
            Know More
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>

        {/* Right Image with Floating Effect */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative hidden lg:block"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="overflow-hidden rounded-xl shadow-2xl"
          >
            <ImageWithFallback
              src={studentsCollaborationImage.src}
              alt="University campus building"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </motion.div>

          {/* Floating Popup Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-elegant"
          >
            Admissions Open
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card text-foreground rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-elegant flex space-x-4 sm:space-x-6"
          >
            <div className="text-center">
              <p className="text-primary text-xl sm:text-2xl font-bold">98%</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-secondary text-xl sm:text-2xl font-bold">24h</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Processing</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Curve with Shadow */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 drop-shadow-md"
          preserveAspectRatio="none"
        >
          <path
            fill="#f5f7f9"
            d="M0,60 C180,140 360,20 720,100 C1080,180 1260,20 1440,100 L1440,200 L0,200 Z"
          />
        </svg>
      </div>



    </section>
  );
}