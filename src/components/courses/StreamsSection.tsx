"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowRight, Cog, Stethoscope, Briefcase, Scale, Palette, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Mock data for course streams
const courseStreams = [
  {
    id: 1,
    name: "Engineering",
    count: 25,
    courses: ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"],
    color: "from-blue-500 to-blue-600",
    icon: Cog,
    description: "Build the future with cutting-edge technology and innovation"
  },
  {
    id: 2,
    name: "Medical",
    count: 15,
    courses: ["MBBS", "BDS", "B.Pharm", "Nursing"],
    color: "from-green-500 to-green-600",
    icon: Stethoscope,
    description: "Heal and care for humanity with medical excellence"
  },
  {
    id: 3,
    name: "Management",
    count: 20,
    courses: ["MBA", "BBA", "PGDM", "Executive MBA"],
    color: "from-purple-500 to-purple-600",
    icon: Briefcase,
    description: "Lead organizations and drive business success"
  },
  {
    id: 4,
    name: "Law",
    count: 8,
    courses: ["LLB", "BA LLB", "BBA LLB", "LLM"],
    color: "from-orange-500 to-orange-600",
    icon: Scale,
    description: "Uphold justice and protect rights in society"
  },
  {
    id: 5,
    name: "Design",
    count: 18,
    courses: ["Graphic Design", "Fashion Design", "Interior Design", "UI/UX"],
    color: "from-pink-500 to-pink-600",
    icon: Palette,
    description: "Create beautiful and functional designs"
  },
  {
    id: 6,
    name: "Architecture",
    count: 12,
    courses: ["B.Arch", "M.Arch", "Interior Design", "Urban Planning"],
    color: "from-indigo-500 to-indigo-600",
    icon: Landmark,
    description: "Design spaces that inspire and function"
  }
];

const StreamsSection: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Add CSS animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .scroll-animation {
        animation: scroll 30s linear infinite;
      }
      .scroll-animation:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleStreamClick = (streamName: string) => {
    // Navigate to intermediate page with prefilled stream filter
    router.push(`/courses?stream=${encodeURIComponent(streamName.toLowerCase())}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 mb-6 shadow-lg">
            <BookOpen size={20} className="text-blue-600" />
            <span className="text-blue-700 font-semibold">Academic Streams</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-black">Explore Courses By</span>{' '}
            <span className="text-green-600">Stream</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover your perfect academic path with our comprehensive course stream categories
          </p>
        </motion.div>

        {/* Auto-scrolling Stream Cards */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 scroll-animation">
            {/* First set of cards */}
            {courseStreams.map((stream, index) => {
              const IconComponent = stream.icon;
              return (
                <motion.div
                  key={`first-${stream.id}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group flex-shrink-0 w-80"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:border-blue-300/50">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Icon and Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stream.color} shadow-lg`}>
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{stream.name}</h3>
                          <p className="text-sm text-gray-500">{stream.count} courses</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm">
                        {stream.description}
                      </p>

                      {/* Course Examples */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Popular:</p>
                        <div className="flex flex-wrap gap-1">
                          {stream.courses.slice(0, 2).map((course, courseIndex) => (
                            <span
                              key={courseIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                            >
                              {course}
                            </span>
                          ))}
                          {stream.courses.length > 2 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              +{stream.courses.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className={`w-full bg-gradient-to-r ${stream.color} hover:opacity-90 text-white py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                        onClick={() => handleStreamClick(stream.name)}
                      >
                        <span>Explore</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {/* Duplicate set for seamless loop */}
            {courseStreams.map((stream, index) => {
              const IconComponent = stream.icon;
              return (
                <motion.div
                  key={`second-${stream.id}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group flex-shrink-0 w-80"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:border-blue-300/50">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Icon and Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${stream.color} shadow-lg`}>
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{stream.name}</h3>
                          <p className="text-sm text-gray-500">{stream.count} courses</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm">
                        {stream.description}
                      </p>

                      {/* Course Examples */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Popular:</p>
                        <div className="flex flex-wrap gap-1">
                          {stream.courses.slice(0, 2).map((course, courseIndex) => (
                            <span
                              key={courseIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                            >
                              {course}
                            </span>
                          ))}
                          {stream.courses.length > 2 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              +{stream.courses.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className={`w-full bg-gradient-to-r ${stream.color} hover:opacity-90 text-white py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                        onClick={() => handleStreamClick(stream.name)}
                      >
                        <span>Explore</span>
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Can't find your stream?
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our complete course catalog with advanced filters and personalized recommendations
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push('/courses')}
            >
              Browse All Courses
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StreamsSection;