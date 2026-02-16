import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, GraduationCap, Award, Star, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../figma/FallBack';


interface Mentor {
  id: string;
  name: string;
  role: string;
  university: string;
  experience: string;
  photo: string;
  universityImage: string;
  about: string;
  expertise: string[];
  studentsHelped: number;
  rating: number;
}

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Mr. Rajahekar',
    role: 'Admission Mentor',
    university: 'IIM Ahmedabad',
    experience: '15+ Years',
    photo: 'https://images.unsplash.com/photo-1758875569897-5e214ccc4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZW50b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI3NjUwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    universityImage: '/assets/university-logos/iim.png',
    about: 'Hello, I\'m Rajahekar, your mentor here to support your academic and personal development journey. Let\'s work together to achieve your goals and unlock your potential.',
    expertise: ['Admissions', 'Scholarships', 'Career Planning'],
    studentsHelped: 500,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    role: 'Career Navigator',
    university: 'IIT Bombay',
    experience: '12+ Years',
    photo: 'https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Vuc2Vsb3IlMjBwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NjI4MDI5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    universityImage: '/assets/university-logos/iit.png',
    about: 'With over a decade of experience in career counseling, I help students navigate their career paths and make informed decisions about their future in technology and engineering.',
    expertise: ['Engineering', 'Technology', 'Industry'],
    studentsHelped: 650,
    rating: 5.0
  },
  {
    id: '3',
    name: 'Prof. Michael Chen',
    role: 'Scholarship Expert',
    university: 'BITS Pilani',
    experience: '18+ Years',
    photo: 'https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2Mjc5NjczNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    universityImage: '/assets/university-logos/bits.png',
    about: 'I specialize in helping students find and secure scholarships and financial aid. My goal is to make quality education accessible to deserving students regardless of their financial background.',
    expertise: ['Scholarships', 'Financial Aid', 'Grants'],
    studentsHelped: 800,
    rating: 4.8
  }
];

export const DreamUniversities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mentors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mentors.length - 1 ? 0 : prev + 1));
  };

  const currentMentor = mentors[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm">Expert Guidance</span>
          </div>
          <h2 className="mb-4">
            <span className="text-gray-900">Connect with </span>
            <span className="text-emerald-600">Expert Mentors</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance from experienced mentors who have helped hundreds of students achieve their academic dreams
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main Mentor Card */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Mentor Profile */}
              <motion.div
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                  {/* Profile Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-emerald-100">
                        <ImageWithFallback
                          src={currentMentor.photo}
                          alt={currentMentor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{currentMentor.name}</h3>
                      <p className="text-emerald-600 mb-2">{currentMentor.role}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-gray-700">{currentMentor.rating}</span>
                        <span className="text-gray-400 text-sm ml-1">
                          ({currentMentor.studentsHelped}+ students)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* University Info */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">{currentMentor.university}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {currentMentor.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3">Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {currentMentor.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* About */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 mb-3">About</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentMentor.about}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                    <MessageCircle className="w-5 h-5" />
                    <span>Connect with {currentMentor.name}</span>
                  </button>
                </div>
              </motion.div>

              {/* Right Side - University Showcase */}
              <motion.div
                className="order-1 md:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                  <ImageWithFallback
                    src={currentMentor.universityImage}
                    alt={currentMentor.university}
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* University Badge */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white mb-1">{currentMentor.university}</h4>
                          <p className="text-white/80 text-sm">Premier Institution</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div>
                          <p className="text-white/60 text-sm mb-1">Students Helped</p>
                          <p className="text-white">{currentMentor.studentsHelped}+</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm mb-1">Success Rate</p>
                          <p className="text-white">98%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Top Rated</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={handlePrevious}
            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Previous mentor"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-3">
            {mentors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-emerald-500 shadow-lg'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to mentor ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Next mentor"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { label: 'Expert Mentors', value: '50+', icon: GraduationCap },
            { label: 'Students Helped', value: '2000+', icon: Award },
            { label: 'Success Rate', value: '95%', icon: Star },
            { label: 'Universities', value: '100+', icon: MapPin }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
