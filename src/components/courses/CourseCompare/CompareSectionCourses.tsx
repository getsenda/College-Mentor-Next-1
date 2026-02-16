"use client";
import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComparisonSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function ComparisonSection({ title, children, defaultExpanded = false }: ComparisonSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-gray-200 flex items-center justify-between hover:from-cyan-100 hover:to-blue-100 transition-colors cursor-pointer"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
      >
        <h4 className="text-gray-900 text-sm md:text-lg font-medium">{title}</h4>
        <div className="p-1.5 rounded-full bg-white/50">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
