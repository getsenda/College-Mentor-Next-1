import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import indianStudentsImage from "../../../public/assets/indian-students-studying-group.jpg";
import Image from "next/image";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How to compare between two universities?",
    answer: "Steps to Compare Universities: Check the applicable basis of university comparison that you prefer. It could be based on the Global, Regional, or Subject rankings, as well as Academics, Cost, Test Scores, and Numbers.",
  },
  {
    id: 2,
    question: "Which is better, College or Institute?",
    answer: "Universities offer a wide range of degree programs across different fields of study, while institutes often focus on a specific area of study or research. Institutes may offer undergraduate or graduate degree programs, but their programs are more concentrated in a specific field.",
  },
  {
    id: 3,
    question: "Is IIT an Institute or University?",
    answer: "The Indian Institutes of Technology (IITs) are a group of autonomous prestigious engineering and technology-oriented institutes of higher education established and declared as Institutes of National Importance by the Parliament of India.",
  },
  {
    id: 4,
    question: "Which is No 1 IIT in India?",
    answer: "According to the NIRF Ranking, IIT Madras is the No. 1 IIT, and Top Institutes in India also include Chennai Tamil Nadu.",
  },
];

export function CollegeCompareFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-2 sm:mb-3">
            Meet Our Experts
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight text-foreground mb-2 px-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FAQs</span>
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left: FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4 "
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}

              >
                <Collapsible
                  open={openItems.includes(faq.id)}
                  onOpenChange={() => toggleItem(faq.id)}
                >
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <CollapsibleTrigger className="w-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-start justify-between gap-3 sm:gap-4 text-left group">
                      <div className="flex-1">
                        {/* <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          FAQ
                        </span> */}
                        <p className="text-sm sm:text-base font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                          {faq.question}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: openItems.includes(faq.id) ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </motion.div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 sm:px-5 pb-3 sm:pb-3.5">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
              <Image
                src={indianStudentsImage}
                alt="Indian college students researching and planning their higher education journey with laptops and books"
                width={600}
                height={400}
                className="relative w-full max-w-lg rounded-3xl shadow-elegant animate-float"
                loading="lazy"
              /><div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center px-4"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Still have question?</span>
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help you make the right decision.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
          >
            Contact Our Experts
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
}
