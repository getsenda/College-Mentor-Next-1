"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { CollegeItem } from '@/components/data/coursecompare';

interface College {
  name: string;
  location: string;
  fees: string;
}

interface CollegesCarouselProps {
  colleges: CollegeItem[];
}


export function CollegesCarousel({ colleges }: CollegesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % colleges.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + colleges.length) % colleges.length);
  };

  const college = colleges[currentIndex];

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-gray-50 to-white p-3 md:p-6 rounded-lg border border-gray-200">
        <div className="mb-3 md:mb-4">
          <h4 className="text-gray-900 mb-0.5 md:mb-1 text-sm md:text-lg font-medium line-clamp-1">{college.college_name}</h4>
          <p className="text-xs md:text-sm text-gray-500">{college.location}</p>
        </div>

        <div className="mb-3 md:mb-4">
          <div className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">Annual Fees</div>
          <div className="text-cyan-600 text-xs md:text-base font-medium">{college.average_fee}</div>
        </div>

        <button className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-xs md:text-sm">
          <span>Apply Now</span>
          <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>

      {colleges.length > 1 && (
        <>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <button
              onClick={prevSlide}
              className="p-1.5 md:p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Previous college"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>

            <div className="flex gap-1">
              {colleges.slice(0, 5).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${index === currentIndex
                      ? 'bg-cyan-600 w-3 md:w-4'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to college ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-1.5 md:p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Next college"
            >
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>
          </div>

          <div className="text-center mt-1.5 md:mt-2 text-[10px] md:text-xs text-gray-500">
            {currentIndex + 1} of {colleges.length}
          </div>
        </>
      )}
    </div>
  );
}
