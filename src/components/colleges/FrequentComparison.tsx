import { Button } from "@/components/ui/button";
import { College } from "./CollegeCompareCard";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import collegeimage from "../../../public/assets/amity.png";
import Image from "next/image";

interface FrequentComparisonProps {
  comparisons: Array<{ college1: College; college2: College }>;
  onCompare: (college1: College, college2: College) => void;
}

export function FrequentComparison({ comparisons, onCompare }: FrequentComparisonProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(comparisons.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleComparisons = comparisons.slice(startIndex, startIndex + itemsPerPage);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Popular Comparison</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Popular college comparisons made by students like you
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mx-auto max-w-7xl"
        >
          {visibleComparisons.map((comparison, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-card via-card to-card/80 rounded-2xl shadow-lg border border-border/30 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:scale-[1.02]">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-4">
                  {/* Top Section - Colleges */}
                  <div className="flex items-start justify-between mb-4 relative">
                    {/* College 1 */}
                    <div className="flex flex-col items-center flex-1 space-y-2">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-background to-muted border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-md group-hover:border-primary/40 transition-all duration-300 group-hover:scale-110">
                          <Image
                            src={comparison.college1.logo || collegeimage}
                            alt={comparison.college1.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[8px] font-bold text-primary-foreground shadow-lg">
                          1
                        </div>
                      </div>
                      <p className="font-bold text-[11px] text-foreground text-center line-clamp-2 leading-tight px-1 h-10">
                        {comparison.college1.name}
                      </p>
                    </div>

                    {/* VS Badge - Centered */}
                    <div className="flex items-center justify-center px-2 -mt-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black shadow-xl border-2 border-background group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          VS
                        </div>
                      </div>
                    </div>

                    {/* College 2 */}
                    <div className="flex flex-col items-center flex-1 space-y-2">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-background to-muted border-2 border-accent/20 flex items-center justify-center overflow-hidden shadow-md group-hover:border-accent/40 transition-all duration-300 group-hover:scale-110">
                          <Image
                            src={comparison.college2.logo || collegeimage}
                            alt={comparison.college2.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground shadow-lg">
                          2
                        </div>
                      </div>
                      <p className="font-bold text-[11px] text-foreground text-center line-clamp-2 leading-tight px-1 min-h-10">

                        {comparison.college2.name}
                      </p>
                    </div>
                  </div>

                  {/* Compare Button */}
                  <Button
                    onClick={() => onCompare(comparison.college1, comparison.college2)}
                    className="w-full bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-accent hover:to-primary text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 text-xs h-9 font-semibold rounded-lg group-hover:scale-[1.02]"
                  >
                    <span className="flex items-center gap-2">
                      Compare
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-full w-12 h-12 border-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-foreground">{currentPage}</span>
              <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                />
              </div>
              <span className="text-lg font-semibold text-muted-foreground">{totalPages}</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full w-12 h-12 border-2 bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 disabled:opacity-50 disabled:bg-muted"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
