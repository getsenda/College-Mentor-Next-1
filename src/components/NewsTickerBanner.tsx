import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useHomepageData } from '@/hooks/useHomepageData';

const NewsTickerBanner = () => {
  const { data } = useHomepageData();
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded fallback news items
  const defaultNewsItems = [
    {
      text: "🎯 JEE Main 2025 Registration Opens - Apply Now Before Deadline!",
      link: "#",
      urgent: true
    },
    {
      text: "📚 NEET 2025 Syllabus Released - Check Latest Updates & Preparation Tips",
      link: "#",
      urgent: false
    },
    {
      text: "💰 College Mentor Scholarship Programs - Rs. 50,000+ Funding Available",
      link: "#",
      urgent: true
    },
    {
      text: "🏆 Top Engineering Colleges Accepting Applications - Limited Seats Available",
      link: "#",
      urgent: false
    },
    {
      text: "🌟 Free IKIGAI Career Assessment & Mentorship - Book Your Session Today",
      link: "#",
      urgent: true
    },
    {
      text: "📈 New College Predictor Tool Launched - Predict Your Admission Chances",
      link: "#",
      urgent: false
    }
  ];

  // Use API news only if it exists, otherwise use hardcoded
  const newsItems = data?.newsTicker?.news && data.newsTicker.news.length > 0
    ? data.newsTicker.news.map((news, index) => ({
      text: news.title,
      link: news.redirectUrl || "#",
      urgent: index % 3 === 0, // Alternate urgent flag
    }))
    : defaultNewsItems;

  // Auto-rotate news items
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, newsItems.length]);

  if (!isVisible) return null;

  const currentNews = newsItems[currentIndex];

  return (
    <div id="news-banner" className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[hsl(162,100%,39%)] to-[hsl(229,78%,41%)] text-white shadow-lg animate-in slide-in-from-bottom duration-500">
      {/* Progress Bar - At top of banner */}
      <div className="h-0.5 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-75 ease-linear"
          style={{
            width: `${((currentIndex + 1) / newsItems.length) * 100}%`
          }}
        />
      </div>

      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-2.5">
          {/* Breaking News Label */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${currentNews.urgent ? 'bg-white text-[#00C798]' : 'bg-white/20 text-white'
              }`}>
              {currentNews.urgent ? '🔥 Breaking' : '📢 News'}
            </div>
          </div>

          {/* Scrolling News Content */}
          <div className="flex-1 mx-2 sm:mx-3 md:mx-4 overflow-hidden">
            <div className="relative">
              <div
                className="whitespace-nowrap animate-marquee hover:pause-animation cursor-pointer transition-all duration-300 hover:text-white/80"
                onClick={() => currentNews.link && window.open(currentNews.link, '_blank')}
              >
                <span className="text-xs sm:text-sm font-medium">
                  {currentNews.text}
                </span>
                {currentNews.link && (
                  <ExternalLink className="inline ml-1 sm:ml-2 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                )}
              </div>
            </div>
          </div>

          {/* News Indicators & Close Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* News Indicators */}
            <div className="hidden sm:flex items-center space-x-1">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to news item ${index + 1}`}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors duration-200 group"
              aria-label="Close news ticker"
            >
              <X size={14} className="group-hover:rotate-90 transition-transform duration-200 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default NewsTickerBanner;