import React, { useState } from "react";
import { ArrowRight, Target, Clock, Star, Users, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CollegeQuestionnaire from "@/components/colleges/CollegeQuestionnaire";
import { UserAnswers } from "@/components/types/Questions";
import indianStudentsImage from "../../../public/assets/indian-college-students-questionnaire.jpg";
import { logger } from "@/utils/logger";

interface LandingPageProps {
  onStartQuestionnaire?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartQuestionnaire }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStart = () => {
    setShowQuestions(true);
    if (onStartQuestionnaire) onStartQuestionnaire();
  };

  const handleBack = () => {
    setShowQuestions(false);
    setShowSuccess(false);
  };

  const handleQuestionnaireComplete = (answers: UserAnswers) => {
    logger.log('Questionnaire completed:', answers);
    setShowSuccess(true);

    // Return to previous screen after 2 seconds
    setTimeout(() => {
      setShowQuestions(false);
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="h-auto flex flex-col bg-gradient-to-br from-background via-background to-muted/20 pt-20 pb-10 relative overflow-hidden">


      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 pt-4 pb-4 max-w-7xl mx-auto w-full">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch w-full">


          {/* Left Side (Image or Questionnaire) */}
          <div className="order-2 lg:order-1 flex justify-center items-center">
            {!showQuestions ? (
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300" />
                <img
                  src={indianStudentsImage.src}
                  alt="Indian college students researching and planning their higher education journey with laptops and books"
                  className="relative w-full max-w-lg rounded-3xl shadow-elegant animate-float"
                  loading="lazy"
                />
              </div>
            ) : (
              <Card className="w-full max-w-xl shadow-elegant border-primary/10">
                <div className="p-6"> {/* reduced padding */}
                  {!showSuccess ? (
                    <>
                      <div className="flex items-center gap-3 mb-4"> {/* reduced mb */}
                        <Button
                          onClick={handleBack}
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-primary/10 transition-colors duration-200"
                        >
                          <ArrowLeft className="w-5 h-5 text-primary" />
                        </Button>
                        <h2 className="text-lg font-semibold text-foreground">College Questionnaire</h2>
                      </div>
                      <CollegeQuestionnaire onComplete={handleQuestionnaireComplete} />
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Submitted Successfully!</h3>
                      <p className="text-sm text-muted-foreground">Your responses have been saved. Redirecting...</p>
                    </div>

                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Right Side (Content) */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left space-y-8">
            <div className="space-y-6">

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">
                <Sparkles size={12} className="text-primary animate-pulse" />
                <span className="text-primary font-medium text-xs"> Personalized College Matching</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-2 sm:mb-3">
                Find Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Perfect College
                </span>

              </h2>

              <p className="ttext-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Get matched with colleges that fit your goals, lifestyle, and dreams —
                <span className="font-semibold text-primary"> in just 2 minutes.</span>
              </p>
            </div>

            {!showQuestions && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="group bg-[#3B82F6] hover:opacity-90 text-white px-8 py-4 text-lg font-semibold shadow-elegant hover:shadow-glow transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Takes only 2 minutes
                </div>
              </div>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 group">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Complete assessment in under 2 minutes</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 group">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Personalized matches just for you</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-primary/10 group">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">Comprehensive</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Covers academics & campus life</p>
                </div>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="font-medium">10,000+ Students Matched</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Curve */}
      {/* <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] pointer-events-none">
        <svg
          className="relative block w-full h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path d="M0,32 C360,96 1080,0 1440,32 L1440,120 L0,120 Z" fill="white" />
        </svg>
    </div> */}
    </div>
  );
}
export default LandingPage;