import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Heart, ClipboardList, Users, DollarSign, MessageCircle } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: {
    title: string;
    subtitle: string;
  }[];
  gradient: string;
}

const mentors: Mentor[] = [
  {
    id: 'student-buddy',
    name: 'Student Buddy',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Your peer companion who understands the college experience firsthand. Get personalized support for coursework, campus navigation, and building lasting friendships.',
    features: [
      {
        title: 'Study Sessions',
        subtitle: 'Group & One-on-One support'
      },
      {
        title: 'Social Integration',
        subtitle: 'Campus activities & clubs'
      }
    ],
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'career-navigator',
    name: 'Career Navigator',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Expert guidance to help you chart your career path. From internships to job placements, get insights on industry trends and build professional connections.',
    features: [
      {
        title: 'Industry Insights',
        subtitle: 'Latest trends & opportunities'
      },
      {
        title: 'Resume Building',
        subtitle: 'Professional portfolio guidance'
      }
    ],
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'wellness-coach',
    name: 'Wellness Coach',
    icon: <Heart className="w-6 h-6" />,
    description: 'Your mental and physical health partner throughout your college journey. Get support for stress management, healthy habits, and maintaining work-life balance.',
    features: [
      {
        title: 'Mental Wellness',
        subtitle: 'Stress & anxiety management'
      },
      {
        title: 'Lifestyle Balance',
        subtitle: 'Healthy habits & routines'
      }
    ],
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    id: 'admission-strategist',
    name: 'Admission Strategist',
    icon: <ClipboardList className="w-6 h-6" />,
    description: 'Navigate the complex admission process with expert guidance. From application essays to entrance exams, get strategic advice to maximize your chances.',
    features: [
      {
        title: 'Application Review',
        subtitle: 'Essays & portfolio feedback'
      },
      {
        title: 'Exam Preparation',
        subtitle: 'Strategy & practice tests'
      }
    ],
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'funding-expert',
    name: 'Funding Expert',
    icon: <Users className="w-6 h-6" />,
    description: 'Unlock scholarship opportunities and funding sources for your education. Get personalized recommendations and application assistance for financial aid.',
    features: [
      {
        title: 'Scholarship Search',
        subtitle: 'Personalized opportunities'
      },
      {
        title: 'Grant Applications',
        subtitle: 'Step-by-step guidance'
      }
    ],
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'finance-advisor',
    name: 'Finance Advisor',
    icon: <DollarSign className="w-6 h-6" />,
    description: 'Smart financial planning for your college years and beyond. Learn budgeting, loan management, and investment basics to secure your financial future.',
    features: [
      {
        title: 'Budget Planning',
        subtitle: 'Smart money management'
      },
      {
        title: 'Loan Guidance',
        subtitle: 'Education financing options'
      }
    ],
    gradient: 'from-cyan-500 to-cyan-600'
  }
];

export const CollegeMentors = () => {
  const [selectedMentor, setSelectedMentor] = useState<string>('student-buddy');
  const detailsRef = useRef<HTMLDivElement>(null);

  const scrollToDetailsOnMobile = () => {
    // Only auto-scroll on mobile/tablet (below lg breakpoint)
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 1023px)').matches) return;

    // Wait a tick so the details card updates before scrolling
    window.setTimeout(() => {
      const el = detailsRef.current;
      if (!el) return;

      // Scroll to the details card (down the page). Use an offset for sticky headers.
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, left: 0, behavior: 'smooth' });
    }, 50);
  };

  const activeMentor = mentors.find(m => m.id === selectedMentor) || mentors[0];

  return (
    <section className="pt-6 pb-16 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4">
            <span className="text-gray-800">College Mentors You Can </span>
            <span className="text-[#10B981]">Count On</span>
          </h2>
          <p className="text-gray-600">
            Get personalized guidance from experienced mentors and our AI-powered chat counselor. Available 24/7 to answer your questions about:
          </p>
        </motion.div>

        {/* Mentors Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Mentor List */}
          <motion.div
            className="lg:col-span-4 space-y-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {mentors.map((mentor, index) => (
              <motion.button
                key={mentor.id}
                onClick={() => {
                  setSelectedMentor(mentor.id);
                  scrollToDetailsOnMobile();
                }}
                className={`w-full flex items-center gap-4 p-2.5 rounded-2xl transition-all duration-300 ${
                  selectedMentor === mentor.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selectedMentor === mentor.id
                    ? 'bg-white/20  '
                    : 'bg-gray-200 text-primary/60'
                }`}>
                  {mentor.icon}
                </div>
                <span className="text-left">{mentor.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Side - Mentor Details Card */}
          <div ref={detailsRef} className="lg:col-span-8 scroll-mt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMentor}
                className={`bg-gradient-to-br ${activeMentor.gradient} rounded-3xl p-8 shadow-2xl text-white h-full`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {activeMentor.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {activeMentor.name}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-white/90 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {activeMentor.description}
                </motion.p>

                {/* Features Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {activeMentor.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <h4 className="mb-1 text-white text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-white/80 text-sm">
                        {feature.subtitle}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Ask Mentor Button */}
                <motion.button
                  className="w-full md:w-auto bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Ask Mentor</span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
