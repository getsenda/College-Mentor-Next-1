import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courseService, CourseNewsItem } from '@/services/courseService';

const NewsBlogsSection: React.FC = () => {
  const [items, setItems] = useState<CourseNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await courseService.getCoursesNews();
        setItems(data ?? []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const title = (item: CourseNewsItem) => item.headline ?? item.title ?? '';
  const hasData = items.length > 0;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-40 to-green-90">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Course News & <span className="bg-gradient-to-r from-[#1daa5f] to-green-600 bg-clip-text text-transparent">Updates</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto ">
            Stay updated with the latest course news, announcements, and important updates
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : !hasData ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600 text-center">
                No news or blogs data currently
              </p>
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="flex gap-6 py-4 overflow-x-auto scroll-smooth scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {items.map((news, index) => (
                  <div
                    key={news.id ?? index}
                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      {news.category && (
                        <Badge className="mb-3 bg-green-100 text-green-800 hover:bg-green-100">
                          {news.category}
                        </Badge>
                      )}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {title(news)}
                      </h3>
                      {news.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{news.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {news.date && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={14} />
                            <span>{news.date}</span>
                          </div>
                        )}
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#1daa5f] to-green-600 hover:from-green-700 hover:to-emerald-800 text-white transition-all duration-300"
                        >
                          Read More
                          <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">
                <button
                  type="button"
                  onClick={() => scrollByAmount('left')}
                  className="bg-white rounded-full p-3 shadow-lg active:scale-95 transition"
                  aria-label="Scroll news left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount('right')}
                  className="bg-white rounded-full p-3 shadow-lg active:scale-95 transition"
                  aria-label="Scroll news right"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

export default NewsBlogsSection;