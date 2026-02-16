"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CourseComparisons } from './courses/CourseCompareSection';

import { CollegeMentors } from './courses/CollegeMentorsSection';
import StudentTestimonialSection from './courses/StudentTestimonialSection';
import AnimatedTestimonialSection from './courses/AnimatedTestimonialSection';
import NewsBlogsSection from './courses/NewsBlogsSection';
import { BrowseByStream } from './courses/ExploreStreamsSection';
import { HeroSectionGreen } from './header/HeroSectionGreen';
import { InterestingPrograms } from './courses/FeaturedCoursesSection';
import { TrendingCourses } from './courses/PopularCoursesSection';
import { CourseCareerExplorer } from './courses/CareerCourseFinderSection';
import { DreamUniversities } from './courses/DreamUniversities';
import Footer from './Footer';
import BackToTop from './BackToTop';

const CourseLanding = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Computer Science', 'Engineering', 'Medicine']);

  // Mock search suggestions
  const mockSuggestions = [
    "Computer Science", "Engineering", "Medicine", "Business", "Arts", "Law", "Architecture", "Design"
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search + Quick Access */}
      <HeroSectionGreen />
      <InterestingPrograms />
      <BrowseByStream />
      <TrendingCourses />
      <CourseComparisons />
      <CourseCareerExplorer />
      <CollegeMentors />
      <DreamUniversities />
      <AnimatedTestimonialSection />
      <NewsBlogsSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default CourseLanding;
