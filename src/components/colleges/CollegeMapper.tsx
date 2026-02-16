"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, Target, TrendingUp, Award, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import studentsBrightFutureImage from '../../../public/assets/bright-future-celebration.jpg';
import collegeMapperBg from '../../../public/assets/college-mapper-background.jpg';


type Question = {
  id: number;
  question: string;
  options: string[];
  icon: React.ReactNode;
};

type QuizResult = {
  college: string;
  location: string;
  program: string;
  matchScore: number;
  highlights: string[];
};

const questions: Question[] = [
  {
    id: 1,
    question: 'What field of study are you most interested in?',
    options: ['Engineering & Technology', 'Business & Management', 'Medical & Healthcare', 'Arts & Humanities', 'Science & Research'],
    icon: <Brain className="w-6 h-6" />,
  },
  {
    id: 2,
    question: 'What is your preferred mode of learning?',
    options: ['Hands-on practical learning', 'Theoretical & research-based', 'Mix of both', 'Project-based learning', 'Case study method'],
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 3,
    question: 'What is your expected budget for annual fees?',
    options: ['Under ₹2 Lakhs', '₹2-5 Lakhs', '₹5-10 Lakhs', '₹10-20 Lakhs', 'Above ₹20 Lakhs'],
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 4,
    question: 'Which type of college environment do you prefer?',
    options: ['Large campus with diverse activities', 'Small focused community', 'Urban city campus', 'Suburban peaceful setting', 'Rural residential campus'],
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: 5,
    question: 'What is most important to you in a college?',
    options: ['Placement opportunities', 'Research facilities', 'International exposure', 'Industry connections', 'Campus facilities'],
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 6,
    question: 'What is your preferred location for college?',
    options: ['Metro cities (Mumbai, Delhi, Bangalore)', 'Tier-2 cities', 'Home state', 'Anywhere in India', 'Open to studying abroad'],
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: 7,
    question: 'What are your academic strengths?',
    options: ['Mathematics & Analytics', 'Communication & Writing', 'Creative & Design', 'Science & Experiments', 'Technology & Coding'],
    icon: <Brain className="w-6 h-6" />,
  },
];

export function CollegeMapper() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: answer });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setIsQuizStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentStep]?.id];

  // Mock results based on answers
  const results: QuizResult[] = [
    {
      college: 'IIT Bombay',
      location: 'Mumbai, Maharashtra',
      program: 'B.Tech in Computer Science',
      matchScore: 95,
      highlights: ['Top placement record', 'World-class research facilities', 'Strong industry connections'],
    },
    {
      college: 'IIM Ahmedabad',
      location: 'Ahmedabad, Gujarat',
      program: 'MBA/PGDM',
      matchScore: 92,
      highlights: ['Best ROI in India', 'International exposure', 'Case-based learning'],
    },
    {
      college: 'AIIMS Delhi',
      location: 'New Delhi',
      program: 'MBBS',
      matchScore: 88,
      highlights: ['Premier medical institution', 'Affordable fees', 'Excellent faculty'],
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative bg-[#3B82F6] rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={collegeMapperBg.src}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/90 to-[#3B82F6]/95" />
            </div>
            <div className="relative grid md:grid-cols-2 gap-0 md:gap-8 items-stretch">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 sm:p-8 md:p-10 lg:p-12 relative z-10"
              >
                <Badge className="bg-white/20 text-white border-0 mb-3 md:mb-4 backdrop-blur-sm text-xs sm:text-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Recommendations
                </Badge>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
                  Building Bridges to a <span className="text-yellow-300">Bright Future</span>
                </h2>

                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 md:mb-8">
                  Answer a few simple questions and discover the perfect college match for your aspirations. Our AI-powered tool analyzes your preferences and recommends the best options in just 2 minutes.
                </p>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {[
                    'Personalized college recommendations',
                    'Career path guidance',
                    'Detailed program insights',
                    'Scholarship opportunities',
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center gap-2 md:gap-3 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {!isQuizStarted && (
                  <>
                    <Button
                      onClick={handleStartQuiz}
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 group w-full md:w-auto text-sm md:text-base"
                    >
                      Map Your College in 2 Minutes
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <p className="text-white/70 text-xs sm:text-sm mt-3 md:mt-4">
                      ✨ Join 50,000+ students who found their perfect match
                    </p>
                  </>
                )}
              </motion.div>

              {/* Right Side - Image or Quiz */}
              <div className="relative min-h-[500px] md:h-[620px] bg-white md:rounded-r-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isQuizStarted ? (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="relative h-full w-full"
                    >
                      <img
                        src={studentsBrightFutureImage.src}
                        alt="Students celebrating bright future and success"
                        className="absolute inset-0 w-full h-full object-cover md:rounded-r-3xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 md:rounded-r-3xl" />

                      {/* Floating Stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-2xl text-gray-900">95%</p>
                            <p className="text-xs text-gray-500">Success Rate</p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="absolute bottom-8 left-8 bg-white rounded-2xl p-4 shadow-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-2xl text-gray-900">2 Min</p>
                            <p className="text-xs text-gray-500">Quick Results</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : !showResults ? (
                    <motion.div
                      key="quiz"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full flex flex-col"
                    >
                      {/* Header - Fixed at top */}
                      <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b bg-white">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                            Question {currentStep + 1} of {questions.length}
                          </Badge>
                          <span className="text-xs sm:text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Scrollable Question Area */}
                      <ScrollArea className="flex-1">
                        <div className="p-4 sm:p-6">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                              {questions[currentStep].icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-base sm:text-lg text-gray-900 mb-4 sm:mb-6">
                                {questions[currentStep].question}
                              </h4>

                              {/* Options */}
                              <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                                <div className="space-y-2 sm:space-y-3">
                                  {questions[currentStep].options.map((option) => (
                                    <Label
                                      key={option}
                                      htmlFor={option}
                                      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all ${currentAnswer === option
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                      <RadioGroupItem value={option} id={option} />
                                      <span className="flex-1 text-sm sm:text-base text-black font-normal">{option}</span>
                                    </Label>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>

                      {/* Navigation - Fixed at bottom */}
                      <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t bg-white">
                        <div className="flex items-center justify-between gap-2 sm:gap-4">
                          <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className="text-xs sm:text-sm"
                          >
                            Previous
                          </Button>
                          <Button
                            onClick={handleNext}
                            disabled={!currentAnswer}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm flex-1 sm:flex-none"
                          >
                            {currentStep === questions.length - 1 ? 'View Results' : 'Next Question'}
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full flex flex-col"
                    >
                      {/* Results Header - Fixed */}
                      <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b bg-white">
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                          >
                            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                          </motion.div>
                          <h3 className="text-lg sm:text-xl text-gray-900 mb-2">Your Perfect College Matches!</h3>
                          <p className="text-sm sm:text-base text-gray-600">Based on your preferences, here are our top recommendations</p>
                        </div>
                      </div>

                      {/* Scrollable Results Area */}
                      <ScrollArea className="flex-1">
                        <div className="p-4 sm:p-6">
                          <div className="space-y-3 sm:space-y-4">
                            {results.map((result, index) => (
                              <motion.div
                                key={result.college}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:border-blue-600 transition-all cursor-pointer"
                              >
                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <h4 className="text-sm sm:text-base text-gray-900 font-semibold">{result.college}</h4>
                                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                        {result.matchScore}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">{result.location}</p>
                                    <p className="text-xs sm:text-sm text-blue-600 mt-1">{result.program}</p>
                                  </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                  {result.highlights.map((highlight) => (
                                    <div key={highlight} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                                      {highlight}
                                    </div>
                                  ))}
                                </div>
                                <Button variant="outline" className="w-full mt-3 sm:mt-4 bg-secondary hover:bg-secondary/70 text-white text-xs sm:text-sm ">
                                  View College Details
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>

                      {/* Actions - Fixed at bottom */}
                      <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t bg-white">
                        <div className="flex gap-2 sm:gap-3">
                          <Button variant="outline" onClick={handleReset} className="flex-1 hover:bg-secondary text-xs sm:text-sm">
                            Start Over
                          </Button>
                          <Button className="flex-1 bg-[#3B82F6] hover:bg-secondary text-white text-xs sm:text-sm">
                            Explore More
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
