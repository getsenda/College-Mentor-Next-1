"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Quote, ArrowRight, Play, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { logger } from '@/utils/logger';

// Mock data for student testimonials
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    course: "B.Tech Computer Science",
    college: "IIT Delhi",
    currentRole: "Software Engineer at Google",
    rating: 5,
    image: "/assets/avatar-1.jpg",
    testimonial: "The course guidance helped me choose the right path. The mentors provided excellent support throughout my journey, and I'm now working at my dream company!",
    achievements: ["Google SWE", "IIT Graduate", "3.9 GPA"],
    videoUrl: "https://example.com/video1"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    course: "MBA Business Administration",
    college: "Harvard Business School",
    currentRole: "Senior Business Consultant at McKinsey",
    rating: 5,
    image: "/assets/indian-avatar-1.jpg",
    testimonial: "The business education guidance was transformative. They helped me understand complex business concepts and now I'm leading strategic initiatives at top consulting firms.",
    achievements: ["McKinsey Consultant", "Harvard Graduate", "Business Excellence"],
    videoUrl: "https://example.com/video2"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    course: "MD Medicine",
    college: "Johns Hopkins University",
    currentRole: "Chief Medical Officer at Mayo Clinic",
    rating: 5,
    image: "/assets/indian-avatar-2.jpg",
    testimonial: "The medical education guidance was exceptional. They helped me navigate the complex medical field and now I'm leading medical teams at world-renowned hospitals.",
    achievements: ["Mayo Clinic CMO", "Johns Hopkins Graduate", "Medical Leadership"],
    videoUrl: "https://example.com/video3"
  },
  {
    id: 4,
    name: "Rahul Kumar",
    course: "B.Tech Mechanical",
    college: "IIT Bombay",
    currentRole: "Senior Engineer at Tesla",
    rating: 5,
    image: "/assets/indian-avatar-1.jpg",
    testimonial: "The engineering guidance was incredible. They helped me choose the right specialization and now I'm working on cutting-edge technology at Tesla.",
    achievements: ["Tesla Engineer", "IIT Graduate", "Innovation Award"],
    videoUrl: "https://example.com/video4"
  },
  {
    id: 5,
    name: "Ananya Singh",
    course: "BBA",
    college: "Delhi University",
    currentRole: "Marketing Director at Amazon",
    rating: 5,
    image: "/assets/indian-avatar-2.jpg",
    testimonial: "The business course guidance was perfect. They helped me understand the industry and now I'm leading marketing strategies at Amazon.",
    achievements: ["Amazon Director", "DU Graduate", "Marketing Excellence"],
    videoUrl: "https://example.com/video5"
  },
  {
    id: 6,
    name: "Vikram Joshi",
    course: "M.Tech CSE",
    college: "IIT Kanpur",
    currentRole: "AI Research Scientist at OpenAI",
    rating: 5,
    image: "/assets/indian-avatar-3.jpg",
    testimonial: "The advanced course guidance was outstanding. They helped me choose the right research path and now I'm working on the future of AI.",
    achievements: ["OpenAI Researcher", "IIT Graduate", "AI Innovation"],
    videoUrl: "https://example.com/video6"
  }
];

const StudentTestimonialSection: React.FC = () => {
  const router = useRouter();
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const handleViewAllTestimonials = () => {
    router.push('/testimonials');
  };

  const handlePlayVideo = (videoUrl: string) => {
    // In a real implementation, this would open a video modal or redirect to video page
    logger.log('Playing video:', videoUrl);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200/50 rounded-full px-6 py-3 mb-6 shadow-lg">
            <Users size={20} className="text-orange-600" />
            <span className="text-orange-700 font-semibold">Student Success Stories</span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            <span className="text-black">STUDENT</span> <span className="text-[#1daa5f]">TESTIMONIALS</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our successful students who achieved their dreams with our guidance.
            Real stories, real results, real inspiration.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Student Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonials[selectedTestimonial].image}
                        alt={testimonials[selectedTestimonial].name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                        <Award size={16} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{testimonials[selectedTestimonial].name}</h3>
                      <p className="text-gray-600">{testimonials[selectedTestimonial].course}</p>
                      <p className="text-sm text-gray-500">{testimonials[selectedTestimonial].college}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-500 fill-current" />
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200/50">
                      <div className="flex items-start gap-3">
                        <Quote size={24} className="text-orange-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700 italic leading-relaxed">
                          "{testimonials[selectedTestimonial].testimonial}"
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {testimonials[selectedTestimonial].achievements.map((achievement, idx) => (
                        <Badge key={idx} className="bg-green-100 text-green-700 text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Current Role</span>
                      </div>
                      <p className="text-gray-900 font-medium">{testimonials[selectedTestimonial].currentRole}</p>
                    </div>
                  </div>
                </div>

                {/* Video/Media */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8 text-center">
                    <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Play size={48} className="text-orange-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Watch Success Story</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      See how {testimonials[selectedTestimonial].name} achieved their dreams
                    </p>
                    <Button
                      onClick={() => handlePlayVideo(testimonials[selectedTestimonial].videoUrl)}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                    >
                      <Play className="mr-2" size={16} />
                      Play Video
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group cursor-pointer"
              onClick={() => setSelectedTestimonial(index)}
            >
              <Card className={`h-full bg-white/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden ${selectedTestimonial === index
                ? 'border-orange-300 shadow-orange-200'
                : 'border-gray-200/50 hover:border-orange-200'
                }`}>
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Student Header */}
                  <div className="text-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mx-auto mb-3"
                    />
                    <h4 className="font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{testimonial.course}</p>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="mb-4 flex-grow">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <Quote size={16} className="text-orange-600 mb-2" />
                      <p className="text-sm text-gray-700 italic line-clamp-3">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                  </div>

                  {/* Current Role */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Now Working As:</div>
                    <p className="text-sm text-gray-900 font-medium">{testimonial.currentRole}</p>
                  </div>

                  {/* Achievements */}
                  <div className="flex flex-wrap gap-1">
                    {testimonial.achievements.slice(0, 2).map((achievement, idx) => (
                      <Badge key={idx} className="text-[10px] px-2 py-1 bg-green-100 text-green-700">
                        {achievement}
                      </Badge>
                    ))}
                    {testimonial.achievements.length > 2 && (
                      <Badge className="text-[10px] px-2 py-1 bg-blue-100 text-blue-700">
                        +{testimonial.achievements.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Join Our Success Stories
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Be the next success story! Get personalized guidance and achieve your academic and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleViewAllTestimonials}
              >
                View All Success Stories
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 px-8 py-3 text-lg font-semibold rounded-xl"
                onClick={() => router.push('/courses')}
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentTestimonialSection;