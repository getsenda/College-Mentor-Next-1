"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Clock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { collegeService, NewsItem as ApiNewsItem } from '@/services/collegeService';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { logger } from '@/utils/logger';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: 'green' | 'blue';
  tags: string[];
  timestamp: string;
}

// Helper function to extract category from headline
const getCategoryFromHeadline = (headline: string): { category: string; color: 'green' | 'blue' } => {
  const lowerHeadline = headline.toLowerCase();

  // Medical-related keywords -> green
  if (lowerHeadline.includes('neet') || lowerHeadline.includes('medical') || lowerHeadline.includes('aiims')) {
    return { category: 'Medical', color: 'green' };
  }

  // Scholarship, funding, free -> green
  if (lowerHeadline.includes('scholarship') || lowerHeadline.includes('funding') || lowerHeadline.includes('free')) {
    return { category: 'Scholarship', color: 'green' };
  }

  // Everything else -> blue (Engineering, Management, Admission, Career, etc.)
  if (lowerHeadline.includes('jee') || lowerHeadline.includes('engineering') || lowerHeadline.includes('iit')) {
    return { category: 'Engineering', color: 'blue' };
  }
  if (lowerHeadline.includes('cat') || lowerHeadline.includes('management') || lowerHeadline.includes('mba')) {
    return { category: 'Management', color: 'blue' };
  }
  if (lowerHeadline.includes('career') || lowerHeadline.includes('assessment') || lowerHeadline.includes('mentorship')) {
    return { category: 'Career', color: 'blue' };
  }
  if (lowerHeadline.includes('predictor') || lowerHeadline.includes('admission')) {
    return { category: 'Admission', color: 'blue' };
  }

  // Default to blue
  return { category: 'General', color: 'blue' };
};

// Helper function to generate excerpt from headline
const generateExcerpt = (headline: string): string => {
  // Remove common patterns and create a simple excerpt
  const excerpt = headline
    .replace(/2025|2024/g, '')
    .replace(/ - /g, ' - ')
    .trim();

  // If headline is long, truncate it
  if (excerpt.length > 80) {
    return excerpt.substring(0, 77) + '...';
  }

  return excerpt || 'Stay updated with the latest news and updates';
};

// Helper function to generate timestamp based on sortOrder
const generateTimestamp = (sortOrder: number): string => {
  const hoursAgo = sortOrder * 2; // Approximate hours based on sort order
  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  } else if (hoursAgo < 48) {
    return '1 day ago';
  } else {
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  }
};

// Helper function to extract tags from headline
const extractTags = (headline: string): string[] => {
  const tags: string[] = [];
  const lowerHeadline = headline.toLowerCase();

  if (lowerHeadline.includes('urgent') || lowerHeadline.includes('deadline') || lowerHeadline.includes('apply now')) {
    tags.push('Urgent');
  }
  if (lowerHeadline.includes('new') || lowerHeadline.includes('launched')) {
    tags.push('New');
  }
  if (lowerHeadline.includes('free')) {
    tags.push('Free');
  }

  return tags;
};

const LatestNews: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiNews = await collegeService.getNews();

        // Map API response to component format
        const mappedNews: NewsItem[] = apiNews
          .sort((a, b) => a.sortOrder - b.sortOrder) // Sort by sortOrder
          .map((item) => {
            const { category, color } = getCategoryFromHeadline(item.headline);

            return {
              id: item.id,
              title: item.headline,
              excerpt: generateExcerpt(item.headline),
              category,
              categoryColor: color,
              tags: extractTags(item.headline),
              timestamp: generateTimestamp(item.sortOrder),
            };
          });

        setNewsData(mappedNews);
      } catch (err: any) {
        logger.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleItemClick = (id: number) => {
    logger.log(`Navigating to item: ${id}`);
  };

  const getCategoryColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 text-red-600 border-red-200';
      case 'green': return 'bg-green-50 text-green-600 border-green-200';
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'purple': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'orange': return 'bg-orange-50 text-orange-600 border-orange-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="relative w-full bg-[#f5f9f7] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Latest{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              News & Updates
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Stay updated with the latest education news and updates
          </p>
        </div>

        {/* Auto-scrolling Cards Container */}
        <div className="relative overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-gray-600">Loading news...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white"
              >
                Retry
              </Button>
            </div>
          ) : newsData.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600 text-center">
                college news, yet to be announced, college data yet to come
              </p>
            </div>
          ) : (
            <>
              {/* Desktop: Auto-scrolling */}
              <div className="hidden sm:flex gap-6 animate-scroll-slow">
                {newsData.map((item) => (
                  <NewsCard key={item.id} item={item} onItemClick={handleItemClick} getCategoryColorClass={getCategoryColorClass} />
                ))}
                {/* Duplicate for seamless loop */}
                {newsData.map((item) => (
                  <NewsCard key={`duplicate-${item.id}`} item={item} onItemClick={handleItemClick} getCategoryColorClass={getCategoryColorClass} />
                ))}
              </div>

              {/* Mobile: Swipeable Carousel with Autoplay */}
              <div className="sm:hidden">
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 3000,
                      stopOnInteraction: true,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2">
                    {newsData.map((item) => (
                      <CarouselItem key={item.id} className="pl-2 basis-[85%]">
                        <NewsCard item={item} onItemClick={handleItemClick} getCategoryColorClass={getCategoryColorClass} isMobile />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted NewsCard component for reusability
interface NewsCardProps {
  item: NewsItem;
  onItemClick: (id: number) => void;
  getCategoryColorClass: (color: string) => string;
  isMobile?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onItemClick, getCategoryColorClass, isMobile }) => (
  <motion.article
    whileHover={isMobile ? undefined : { y: -4 }}
    onClick={() => onItemClick(item.id)}
    className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full ${isMobile ? 'p-4 min-h-[220px]' : 'flex-shrink-0 min-w-[360px] max-w-[360px] p-6'
      }`}
  >
    {/* Category Tags */}
    <div className="flex gap-2 mb-3 sm:mb-4 flex-wrap">
      <Badge
        variant="outline"
        className={`${getCategoryColorClass(item.categoryColor)} border text-xs px-2 py-1`}
      >
        {item.category}
      </Badge>
      {item.tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="bg-green-50 text-green-600 border-green-200 text-xs px-2 py-1"
        >
          {tag}
        </Badge>
      ))}
    </div>

    {/* Title */}
    <h3 className={`font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
      {item.title}
    </h3>

    {/* Excerpt */}
    <p className={`text-gray-600 flex-grow line-clamp-2 ${isMobile ? 'text-xs mb-4' : 'text-sm mb-6'}`}>
      {item.excerpt}
    </p>

    {/* Footer */}
    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>{item.timestamp}</span>
      </div>
      <Button
        size="sm"
        className={`bg-[#22c55e] hover:bg-[#16a34a] text-white ${isMobile ? 'text-xs px-2 py-1 h-7' : ''}`}
      >
        Read More
        <ArrowRight className={`ml-1 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
      </Button>
    </div>
  </motion.article>
);

export default LatestNews;
