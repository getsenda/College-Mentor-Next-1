import { useState } from "react";

import { ChevronLeft, ChevronRight, TrendingUp, Award, Star, MapPin, Users, Trophy, Briefcase, IndianRupee, ArrowRight, Zap } from "lucide-react";
import { College } from "./CollegeCompareCard";
import { ImageWithFallback } from "../figma/FallBack";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import collegeimage from "../../../public/assets/overview-campus.jpg";


interface ComparisonPair {
  college1: College;
  college2: College;
}

interface CompareScholarshipsProps {
  comparisons: ComparisonPair[];
  onCompare: (college1: College, college2: College) => void;
}

export function CompareScholarships({ comparisons, onCompare }: CompareScholarshipsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(comparisons.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComparisons = comparisons.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };



  return (
    <div className="relative pt-12 pb-24 px-4 -mx-4 mb-0 overflow-hidden bg-white">




      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23173CBA' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#173CBA] via-[#186BBF] to-[#00C798] text-white px-7 py-3 rounded-2xl shadow-xl mb-6 hover:shadow-2xl transition-shadow">
            <Zap className="w-5 h-5 fill-white" />
            <span className="font-bold text-base">Trending Battles</span>
          </div> */}
          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-5">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Compare Scholarship
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed px-4 sm:px-0">
            Discover which colleges students are comparing the most. Make data-driven decisions.
          </p>
        </div>

        {/* Comparison Cards - New Stacked Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {currentComparisons.map((comparison, index) => (
            <Card
              key={index}
              className="group relative bg-white border-2 border-gray-100 hover:border-[#173CBA]/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-3xl"
            >
              {/* Trending Number Badge */}
              <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-gradient-to-br from-[#173CBA] to-[#186BBF] flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-sm">#{startIndex + index + 1}</span>
              </div>

              <div className="p-4">
                {/* Top Section - Images Side by Side */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {/* College 1 Image */}
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                      <ImageWithFallback
                        src={collegeimage}
                        alt={comparison.college1.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      {/* College Name Overlay */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="font-bold text-white text-xs mb-0.5 line-clamp-2 drop-shadow-lg leading-tight">
                          {comparison.college1.name}
                        </h3>
                        <div className="flex items-center gap-1 text-white/90 text-xs">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="text-[10px]">{comparison.college1.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* College 2 Image */}
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                      <ImageWithFallback
                        src={collegeimage}
                        alt={comparison.college2.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      {/* College Name Overlay */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="font-bold text-white text-xs mb-0.5 line-clamp-2 drop-shadow-lg leading-tight">
                          {comparison.college2.name}
                        </h3>
                        <div className="flex items-center gap-1 text-white/90 text-xs">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="text-[10px]">{comparison.college2.city}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VS Badge Centered Between Images */}
                <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#173CBA] via-[#186BBF] to-[#00C798] flex items-center justify-center shadow-xl border-2 border-white">
                    <span className="text-white font-bold text-[10px]">VS</span>
                  </div>
                </div>

                {/* Bottom Section - Type Comparison */}
                {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 px-2 py-1.5 rounded-lg bg-blue-100 border border-blue-200 text-center">
                      <span className="text-xs font-bold text-[#173CBA]">{comparison.college1.type}</span>
                    </div>
                    <div className="flex-1 px-2 py-1.5 rounded-lg bg-teal-100 border border-teal-200 text-center">
                      <span className="text-xs font-bold text-[#00C798]">{comparison.college2.type}</span>
                    </div>
                  </div>
                </div> */}

                {/* Compare Button */}
                <Button
                  onClick={() => onCompare(comparison.college1, comparison.college2)}
                  className="w-full h-9 bg-gradient-to-r from-[#173CBA] via-[#186BBF] to-[#00C798] hover:from-[#00C798] hover:via-[#186BBF] hover:to-[#173CBA] text-white shadow-md hover:shadow-lg transition-all duration-500 group-hover:scale-[1.02] rounded-lg font-semibold text-sm"
                >
                  <span>Compare</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

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
    </div>
  );
}