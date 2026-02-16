"use client";

import { CourseDetail, PopularComparisonPair } from '@/components/data/coursecompare';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface PopularComparisonProps {
  popularComparisons: PopularComparisonPair[];
  onCompare: (pair: PopularComparisonPair) => void;  // ✅ CORRECT
}


export function PopularComparison({
  popularComparisons,
  onCompare
}: PopularComparisonProps) {


  return (
    <section className="py-16 bg-[#F5F9F7]">
      {/* bg-gradient-to-br from-gray-50 to-white" */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-0">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Popular Comparison</span>
            </h2>
            {/* <TrendingUp className="w-6 h-6 text-cyan-600" />
            <h2 className="text-gray-900">Popular Comparison</h2> */}
          </div>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most searched course comparisons to make informed decisions about your education
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularComparisons.map((comparison, index) => (
            <motion.div
              key={`${comparison.course1.id}-${comparison.course2.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => onCompare(comparison)}
            >
              {/* Popularity Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 text-xs rounded-full border border-cyan-200">
                  {comparison.popularity}
                </span>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -45 }}
                  className="text-cyan-600"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors text-lg font-semibold">
                {comparison.course1.code} vs {comparison.course2.code}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {comparison.course1.description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Compare</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
