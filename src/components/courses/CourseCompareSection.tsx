import { motion } from 'framer-motion';
import { logger } from '@/utils/logger';
import { TrendingUp, Clock, IndianRupee, ArrowRight, Target } from 'lucide-react';

interface Comparison {
  id: string;
  course1: string;
  course2: string;
  badge: {
    text: string;
    color: 'green' | 'blue';
  };
  description: string;
  duration: string;
  feeRange: string;
  placement: string;
}

const comparisons: Comparison[] = [
  {
    id: '1',
    course1: 'B.Tech',
    course2: 'B.E',
    badge: { text: 'Popular', color: 'green' },
    description: 'Compare curriculum, fees, duration & career outcomes',
    duration: '4 Years',
    feeRange: '₹6-15L',
    placement: '90% Placement'
  },
  {
    id: '2',
    course1: 'MBA',
    course2: 'PGDM',
    badge: { text: 'Top Choice', color: 'blue' },
    description: 'Compare curriculum, fees, duration & career outcomes',
    duration: '2 Years',
    feeRange: '₹12-25L',
    placement: '95% Placement'
  },
  {
    id: '3',
    course1: 'BBA',
    course2: 'BMS',
    badge: { text: 'Popular', color: 'green' },
    description: 'Compare curriculum, fees, duration & career outcomes',
    duration: '3 Years',
    feeRange: '₹3-8L',
    placement: '85% Placement'
  },
  {
    id: '4',
    course1: 'B.Tech',
    course2: 'B.E',
    badge: { text: 'Popular', color: 'green' },
    description: 'Compare curriculum, fees, duration & career outcomes',
    duration: '4 Years',
    feeRange: '₹6-15L',
    placement: '90% Placement'
  },
  {
    id: '5',
    course1: 'MBA',
    course2: 'PGDM',
    badge: { text: 'Top Choice', color: 'blue' },
    description: 'Compare curriculum, fees, duration & career outcomes',
    duration: '2 Years',
    feeRange: '₹12-25L',
    placement: '95% Placement'
  },
  {
    id: '6',
    course1: 'BBA',
    course2: 'BMS',
    badge: { text: 'Popular', color: 'green' },
    description: 'Compare curriculum, fees, duration & career outcomes',
    duration: '3 Years',
    feeRange: '₹3-8L',
    placement: '85% Placement'
  },
];

export const CourseComparisons = () => {
  const handleStartComparing = () => {
    logger.log('Start comparing courses');
  };

  const handleSmartCompare = (comparisonId: string) => {
    logger.log(`Smart compare for: ${comparisonId}`);
  };

  const handleViewAllComparisons = () => {
    logger.log('View all comparisons');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 rounded-3xl p-12 mb-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>

            {/* Title */}
            <h2 className="mb-4 text-white">
              Compare Courses Side-by-Side
            </h2>

            {/* Subtitle */}
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Make informed decisions by comparing fees, duration, placements, and ratings of different courses
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={handleStartComparing}
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Comparing Courses
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3">
            <span className="text-gray-800">AI Popular </span>
            <span className="text-[#10B981]">Course Comparisons</span>
          </h2>
          <p className="text-gray-500">
            See how top courses stack up against each other
          </p>
        </motion.div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={comparison.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Header with Badge */}
              <div className="flex items-center justify-between mb-4">
                {/* Course Comparison Title */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-800">
                    {comparison.course1}
                  </span>
                  <span className="text-gray-400 text-sm">vs</span>
                  <span className="text-gray-800">
                    {comparison.course2}
                  </span>
                </div>
                
                {/* Badge */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    comparison.badge.color === 'green'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {comparison.badge.text}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-6">
                {comparison.description}
              </p>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{comparison.duration}</span>
                </div>

                {/* Fee Range */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IndianRupee className="w-4 h-4 text-gray-400" />
                  <span>{comparison.feeRange}</span>
                </div>

                {/* Placement */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span>{comparison.placement}</span>
                </div>
              </div>

              {/* Smart Compare Button */}
              <button
                onClick={() => handleSmartCompare(comparison.id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Smart Compare
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Comparisons Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={handleViewAllComparisons}
            className="border-2 border-blue-500 text-blue-500 px-12 py-2 rounded-xl hover:bg-blue-50 transition-all duration-300"
          >
            View All Comparisons
          </button>
        </motion.div>
      </div>
    </section>
  );
};
