import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, XCircle, ArrowRight, BookOpen, GraduationCap, Trophy, Download, Eye, BarChart3, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { useState } from "react";

const mockTests = [
  {
    id: 1,
    title: "JEE Main Mock Test",
    description: "Full-length practice test following JEE Main pattern",
    duration: "3 hours",
    questions: 90,
    subjects: ["Physics", "Chemistry", "Mathematics"],
    difficulty: "Hard",
    icon: GraduationCap,
    route: "/mock-test/jee-main",
  },
  {
    id: 2,
    title: "NEET Mock Test",
    description: "Complete NEET pattern practice with detailed solutions",
    duration: "3 hours 20 mins",
    questions: 200,
    subjects: ["Physics", "Chemistry", "Biology"],
    difficulty: "Hard",
    icon: BookOpen,
    route: "/mock-test/neet",
  },
  {
    id: 3,
    title: "CAT Mock Test",
    description: "MBA entrance preparation with all sections",
    duration: "2 hours",
    questions: 66,
    subjects: ["VARC", "DILR", "QA"],
    difficulty: "Medium",
    icon: FileText,
    route: "/mock-test/cat",
  },
];

// Mock data - in real app this would come from API/database
const userMockTestResults = [
  {
    id: 1,
    testName: "JEE Main Mock Test - Set 1",
    testType: "JEE Main",
    completedAt: "Dec 3, 2025",
    timeTaken: "2h 45m",
    score: 245,
    maxScore: 300,
    correct: 65,
    incorrect: 15,
    unattempted: 10,
    rank: 156,
    totalParticipants: 12500,
    percentile: 98.75,
    subjectWise: [
      { subject: "Physics", score: 78, maxScore: 100, correct: 20, incorrect: 5 },
      { subject: "Chemistry", score: 85, maxScore: 100, correct: 23, incorrect: 4 },
      { subject: "Mathematics", score: 82, maxScore: 100, correct: 22, incorrect: 6 },
    ],
  },
  {
    id: 2,
    testName: "NEET Mock Test - Set 2",
    testType: "NEET",
    completedAt: "Nov 28, 2025",
    timeTaken: "3h 10m",
    score: 580,
    maxScore: 720,
    correct: 145,
    incorrect: 35,
    unattempted: 20,
    rank: 89,
    totalParticipants: 8500,
    percentile: 98.95,
    subjectWise: [
      { subject: "Physics", score: 140, maxScore: 180, correct: 35, incorrect: 10 },
      { subject: "Chemistry", score: 160, maxScore: 180, correct: 40, incorrect: 10 },
      { subject: "Biology", score: 280, maxScore: 360, correct: 70, incorrect: 15 },
    ],
  },
  {
    id: 3,
    testName: "JEE Main Mock Test - Set 2",
    testType: "JEE Main",
    completedAt: "Nov 20, 2025",
    timeTaken: "2h 55m",
    score: 220,
    maxScore: 300,
    correct: 58,
    incorrect: 18,
    unattempted: 14,
    rank: 245,
    totalParticipants: 11800,
    percentile: 97.92,
    subjectWise: [
      { subject: "Physics", score: 70, maxScore: 100, correct: 18, incorrect: 6 },
      { subject: "Chemistry", score: 78, maxScore: 100, correct: 21, incorrect: 5 },
      { subject: "Mathematics", score: 72, maxScore: 100, correct: 19, incorrect: 7 },
    ],
  },
];

const MockTestTab = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const testsPerPage = 2;
  const totalPages = Math.ceil(userMockTestResults.length / testsPerPage);

  const handleStartTest = (route: string) => {
    router.push(route);
  };

  const handleViewAnalysis = (testId: number) => {
    router.push(`/mock-test/analysis/${testId}`);
  };

  const handleDownloadResult = (testId: number) => {
    console.log("Downloading result for test:", testId);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500/10 border-green-500/20";
    if (percentage >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const currentTests = userMockTestResults.slice(
    currentPage * testsPerPage,
    (currentPage + 1) * testsPerPage
  );

  return (
    <div className="space-y-6">
      {/* User's Mock Test Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">
            Your Mock Test Results
          </h3>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {currentPage + 1} of {totalPages}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {userMockTestResults.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {currentTests.map((result, index) => {
                const percentage = Math.round((result.score / result.maxScore) * 100);
                return (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <CardContent className="p-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground text-sm truncate">
                                {result.testName}
                              </h4>
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary shrink-0">
                                {result.testType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{result.completedAt}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {result.timeTaken}
                              </span>
                            </div>
                          </div>

                          {/* Compact Score Circle */}
                          <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 ${getScoreBg(percentage)}`}>
                            <span className={`text-lg font-bold leading-none ${getScoreColor(percentage)}`}>
                              {percentage}%
                            </span>
                            <span className="text-[9px] text-muted-foreground mt-0.5">Score</span>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center gap-4 text-xs mb-3 py-2 px-3 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            <span className="font-medium">{result.correct}</span>
                          </div>
                          <div className="flex items-center gap-1 text-red-500">
                            <XCircle className="w-3 h-3" />
                            <span className="font-medium">{result.incorrect}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <FileText className="w-3 h-3" />
                            <span>{result.unattempted}</span>
                          </div>
                          <div className="ml-auto flex items-center gap-1 text-primary">
                            <Trophy className="w-3 h-3" />
                            <span className="font-medium">#{result.rank}</span>
                          </div>
                        </div>

                        {/* Subject Progress - Compact */}
                        <div className="space-y-1.5 mb-3">
                          {result.subjectWise.map((subject) => {
                            const subjectPercentage = Math.round((subject.score / subject.maxScore) * 100);
                            return (
                              <div key={subject.subject} className="flex items-center gap-2">
                                <span className="text-[10px] text-muted-foreground w-16 truncate">
                                  {subject.subject}
                                </span>
                                <Progress value={subjectPercentage} className="h-1 flex-1" />
                                <span className={`text-[10px] font-medium w-8 text-right ${getScoreColor(subjectPercentage)}`}>
                                  {subjectPercentage}%
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Action Buttons - Compact */}
                        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewAnalysis(result.id)}
                            className="h-7 px-2 text-xs flex-1 hover:bg-primary/10 hover:text-primary"
                          >
                            <BarChart3 className="w-3 h-3 mr-1" />
                            Analysis
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadResult(result.id)}
                            className="h-7 px-2 text-xs flex-1 hover:bg-primary/10 hover:text-primary"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs flex-1 hover:bg-primary/10 hover:text-primary"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Solutions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        ) : (
          <Card className="bg-card/50 border border-border/30 rounded-xl">
            <CardContent className="p-8 text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-1">No Mock Tests Taken Yet</h4>
              <p className="text-muted-foreground text-xs">
                Start a mock test below to track your progress!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentPage
                  ? "bg-primary w-4"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
            />
          ))}
        </div>
      )}

      {/* Available Mock Tests */}
      <div>
        <h3 className="text-base font-semibold mb-3 text-foreground">
          Available Mock Tests
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockTests.map((test, index) => {
            const Icon = test.icon;
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group bg-card/50 border border-border/30 rounded-xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-medium text-foreground text-sm truncate">{test.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{test.description}</p>
                      </div>
                      <Badge
                        variant={test.difficulty === "Hard" ? "destructive" : "secondary"}
                        className="text-[10px] px-1.5 py-0 h-4 shrink-0"
                      >
                        {test.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {test.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {test.questions} Qs
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {test.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-border/50">
                          {subject}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full h-8 text-xs bg-primary hover:bg-primary/90 group/btn"
                      onClick={() => handleStartTest(test.route)}
                    >
                      Start Test
                      <ArrowRight className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MockTestTab;
