import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAnswers } from "../types/Questions";

interface QuestionnaireProps {
  onComplete: (answers: UserAnswers) => void;
  onClose?: () => void;
}

const CollegeQuestionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 'fieldOfStudy',
      question: 'What field of study interests you most?',
      type: 'single' as const,
      options: [
        'Engineering & Technology',
        'Business & Economics',
        'Arts & Humanities',
        'Health & Medicine',
        'Social Sciences',
        'Natural Sciences',
        'Education',
        'Undecided - Want to explore'
      ]
    },
    {
      id: 'location',
      question: 'Where would you prefer to study?',
      type: 'single' as const,
      options: [
        'In my home state',
        'Anywhere in India',
        'Major metropolitan city',
        'Small town/Rural area',
        'Coastal areas',
        'Hill stations',
        'International options',
        'No preference'
      ]
    },
    {
      id: 'budgetRange',
      question: 'What\'s your expected budget for college?',
      type: 'single' as const,
      options: [
        'Under ₹2 Lakhs/year',
        '₹2-5 Lakhs/year',
        '₹5-10 Lakhs/year',
        '₹10-20 Lakhs/year',
        '₹20+ Lakhs/year',
        'Need significant financial aid',
        'Looking for scholarships',
        'Budget is flexible'
      ]
    },
    {
      id: 'campusSize',
      question: 'What size campus appeals to you?',
      type: 'single' as const,
      options: [
        'Small (Under 5,000 students)',
        'Medium (5,000-15,000 students)',
        'Large (15,000+ students)',
        'Very Large (25,000+ students)',
        'No preference'
      ]
    },
    {
      id: 'priorities',
      question: 'What are your top priorities for college? (Select all that apply)',
      type: 'multiple' as const,
      options: [
        'Academic reputation',
        'Research opportunities',
        'Campus life & activities',
        'Athletic programs',
        'Internship connections',
        'Study abroad programs',
        'Diverse student body',
        'Small class sizes',
        'Strong alumni network',
        'Career services',
        'Modern infrastructure',
        'Industry partnerships'
      ]
    },
    {
      id: 'learningStyle',
      question: 'What learning environment do you prefer?',
      type: 'single' as const,
      options: [
        'Traditional lectures',
        'Hands-on/Practical learning',
        'Discussion-based classes',
        'Independent study',
        'Group projects & collaboration',
        'Online/Hybrid learning',
        'Research-focused environment',
        'Project-based learning'
      ]
    },
    {
      id: 'careerGoals',
      question: 'What are your post-graduation plans?',
      type: 'single' as const,
      options: [
        'Enter workforce immediately',
        'Graduate/Professional school',
        'Start my own business',
        'Work in non-profit sector',
        'Government/Public service',
        'Research & Development',
        'Higher studies abroad',
        'Still exploring options'
      ]
    },
    {
      id: 'campusLife',
      question: 'What type of campus atmosphere do you prefer?',
      type: 'single' as const,
      options: [
        'High-energy & social',
        'Academic & intellectual',
        'Balanced social/academic',
        'Close-knit community',
        'Diverse & multicultural',
        'Traditional college experience',
        'Modern & innovative',
        'Entrepreneurial culture'
      ]
    },
    {
      id: 'extracurriculars',
      question: 'What extracurricular activities interest you?',
      type: 'single' as const,
      options: [
        'Sports & athletics',
        'Music & performing arts',
        'Student government & leadership',
        'Technical clubs & coding',
        'Social service & volunteering',
        'Cultural activities',
        'Entrepreneurship clubs',
        'Not particularly interested'
      ]
    },
    {
      id: 'accommodationType',
      question: 'What type of accommodation do you prefer?',
      type: 'single' as const,
      options: [
        'On-campus hostel',
        'Off-campus apartment',
        'Shared accommodation',
        'Single room hostel',
        'Day scholar (commute daily)',
        'Flexible/Either option works'
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion.type === 'single' && !selectedAnswer) return;
    if (currentQuestion.type === 'multiple' && selectedMultiple.length === 0) return;

    const newAnswers = { ...answers };
    const questionId = currentQuestion.id as keyof UserAnswers;

    if (currentQuestion.type === 'single') {
      (newAnswers as any)[questionId] = selectedAnswer;
    } else {
      (newAnswers as any)[questionId] = selectedMultiple;
    }

    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer("");
      setSelectedMultiple([]);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        onComplete(newAnswers as UserAnswers);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer("");
      setSelectedMultiple([]);
    }
  };

  const handleMultipleChange = (option: string) => {
    setSelectedMultiple(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground mb-2"
        >
          Questionnaire Complete!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground"
        >
          Analyzing your preferences and finding the best matches...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
          </div>
          <span className="text-sm font-semibold text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-border/50 shadow-elegant">
            <CardContent className="p-8">
              {/* Question */}
              <h3 className="text-2xl font-bold text-foreground mb-8 leading-tight">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              {currentQuestion.type === 'single' ? (
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-primary/5 transition-all duration-200 border border-border/50 hover:border-primary/30 cursor-pointer group"
                    >
                      <RadioGroupItem value={option} id={option} className="flex-shrink-0" />
                      <Label
                        htmlFor={option}
                        className="text-base font-medium cursor-pointer flex-1 group-hover:text-primary transition-colors"
                      >
                        {option}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-3 p-4 rounded-xl hover:bg-primary/5 transition-all duration-200 border border-border/50 hover:border-primary/30 cursor-pointer group"
                    >
                      <Checkbox
                        id={option}
                        checked={selectedMultiple.includes(option)}
                        onCheckedChange={() => handleMultipleChange(option)}
                        className="flex-shrink-0"
                      />
                      <Label
                        htmlFor={option}
                        className="text-base font-medium cursor-pointer flex-1 group-hover:text-primary transition-colors"
                      >
                        {option}
                      </Label>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={
                    currentQuestion.type === 'single'
                      ? !selectedAnswer
                      : selectedMultiple.length === 0
                  }
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CollegeQuestionnaire;
