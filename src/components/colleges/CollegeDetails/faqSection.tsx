import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { RenderHTML } from "@/utils/htmlContent";

import { motion, AnimatePresence } from "framer-motion";
import { FAQItem } from "@/components/data/collegedetail";

interface FAQSectionProps {
  faqs: FAQItem[] | undefined;
  id?: string;
  title?: string;
}

/**
 * Reusable FAQ section component for all tabs.
 * Renders FAQs with collapsible accordion-style answers supporting HTML content.
 */
export default function FAQSection({ faqs, id = "faqs", title = "Frequently Asked Questions (FAQs)" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id={id} className="scroll-mt-24">
      <div className="border-l-4 border-primary pl-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium text-gray-900 text-sm">{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                  }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 bg-white border-t border-gray-100">
                    <RenderHTML
                      content={faq.answer}
                      className="prose prose-sm max-w-none text-gray-700 text-sm"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}