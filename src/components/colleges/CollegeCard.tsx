
import { Star, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CollegeCardProps {
  name: string;
  location: string;
  degree: string;
  coursesSummary?: string;
  rating: number;
  reviews: number;
  fees: string;
  rank: string;
  image: string;
  logo: string;
  index: number;
  onViewDetail: () => void;
}

export function CollegeCard({
  name,
  location,
  degree,
  coursesSummary,
  rating,
  reviews,
  fees,
  rank,
  image,
  logo,
  index,
  onViewDetail,
}: CollegeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="min-w-[340px] max-w-[340px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Rating badge at top-right */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* College Name */}
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-3 min-h-[60px]">
          {name}
        </h3>

        {/* Accreditation / Rank */}
        {rank && (
          <p className="inline-flex items-center px-2 py-0.5 mb-2 rounded-full bg-blue-50 text-[11px] font-medium text-blue-700 border border-blue-100">
            {rank}
          </p>
        )}

        {/* Location */}
        <p className="text-sm text-gray-600 mb-1">{location}</p>

        {/* Last 2 recommended courses from API */}
        {coursesSummary && (
          <p className="text-[11px] text-gray-500 mb-3">
            Courses: {coursesSummary}
          </p>
        )}

        {/* Price Row - Annual Fees on left */}
        <div className="flex items-center justify-start mb-4">
          <span className="text-base font-bold text-primary">{fees}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onViewDetail}
            className="flex-1 bg-[#3B82F6] hover:bg-primary/90 text-white"
          >
            Apply Now
          </Button>
          <Button
            variant="outline"
            onClick={onViewDetail}
            className="flex-1 border-[#3B82F6] text-primary hover:bg-primary/60"
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
