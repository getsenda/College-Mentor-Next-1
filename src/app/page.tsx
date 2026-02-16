"use client";
import { useEffect, Suspense } from "react";
import Header from "@/components/header/Header";
import NewsTickerBanner from "@/components/NewsTickerBanner";
import HowItWorks from "@/components/HowItWorks";
import SolutionsSection from "@/components/SolutionsSection";
import IkigaiCareerTest from "@/components/IkigaiCareerTest";
import Footer from "@/components/Footer";
import CallbackSection from "@/components/CallBackSection";
import StudyAbroadInteractive from "@/components/StudyAbroadSection";
import PartnerSection from "@/components/PartnersSection";
import CollegeTools from "@/components/ToolsSection";
import ExamPrepSection from "@/components/ExamPrepSection";
import App from "@/components/ScholarshipsLoans";
import FloatingSidebar from "@/components/FloatingSidebar";
import BackToTop from "@/components/BackToTop";
import { TestimonialsSection } from "@/components/Testimonials";
import MentoringProgramSection from "@/components/MentorProgramme";

const Index = () => {
  // Scroll to top on page load/refresh to reset avatar animation
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Also handle browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Ensure scroll position is at top after a short delay (handles browser restoration)
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingSidebar />

      {/* ✅ Push content down so header isn’t hidden behind ticker */}
      <div className="pt-12">
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header />
        </Suspense>

        {/* How It Works Section */}
        <HowItWorks />


        {/* Solutions Section */}
        <SolutionsSection />

        {/* Ikigai Career Test Section */}
        <div id="ikigai">
          <IkigaiCareerTest />
        </div>

        {/* Exam Prep Section */}
        <div id="examsuite">
          <ExamPrepSection />
        </div>

        {/* Tools Section */}
        <div id="predictors">
          <CollegeTools />
        </div>

        {/* Partner Section */}
        <div id="partners">
          <PartnerSection />
        </div>

        {/* ScholarShip Section */}
        <App />
        {/* StudyAbroad Section */}
        <StudyAbroadInteractive />
        {/* Mentor Programme Section */}

        <MentoringProgramSection />


        <TestimonialsSection />


        {/* CallBack Section */}
        <CallbackSection />

        {/* Footer */}
        <Footer />
        <NewsTickerBanner />
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Index;
