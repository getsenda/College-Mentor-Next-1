import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Clock, Trophy, ArrowRight, Star, Target, Lightbulb, Download, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data - in real app this would come from API/database
const mockUserTestHistory = {
  hasTakenTest: true, // Toggle this to see different states
  latestResult: {
    id: 1,
    testName: "Ikigai Career Assessment",
    completedAt: "Dec 5, 2025",
    score: "85%",
    topCareer: "Software Engineer",
    reportUrl: "#", // Would be actual report URL
  },
};

const assessments = [
  {
    id: 1,
    title: "Ikigai Career Assessment",
    description: "Discover your ideal career path based on Japanese philosophy of finding purpose",
    duration: "15-20 mins",
    questions: 40,
    status: "available",
    icon: Target,
    color: "from-orange-500 to-red-500",
    route: "/career-assessment",
  },
  {
    id: 2,
    title: "Aptitude Test",
    description: "Assess your logical reasoning, verbal ability, and numerical skills",
    duration: "30 mins",
    questions: 50,
    status: "available",
    icon: Lightbulb,
    color: "from-blue-500 to-cyan-500",
    route: "/aptitude-test",
  },
  {
    id: 3,
    title: "Personality Assessment",
    description: "Understand your personality type and suitable career matches",
    duration: "20 mins",
    questions: 35,
    status: "coming_soon",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    route: "/personality-test",
  },
];

const CareerAssessmentTab = () => {
  const router = useRouter();
  const [userTestData] = useState(mockUserTestHistory);

  const handleDownloadReport = () => {
    // In real app, this would download the actual PDF report
    console.log("Downloading report...");
    // You could use: window.open(userTestData.latestResult.reportUrl, '_blank');
  };

  const handleTakeTest = (route: string) => {
    router.push(route);
  };

  return (
    <div className="space-y-8">
      {/* Latest Test Result / Take Test Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-secondary ">
          Your Career Assessment
        </h3>

        {userTestData.hasTakenTest && userTestData.latestResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{userTestData.latestResult.testName}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Completed on {userTestData.latestResult.completedAt}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-100">
                          Score: {userTestData.latestResult.score}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Top Match: {userTestData.latestResult.topCareer}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleDownloadReport}
                      className="bg-secondary text-background hover:bg-foreground/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleTakeTest("/career-assessment")}
                      className="border-border/60"
                    >
                      Retake Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white border border-border/40 shadow-sm rounded-xl overflow-hidden">
              <CardContent className="p-10 text-center">
                <div className="w-14 h-14 rounded-lg bg-foreground flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-background" />
                </div>
                <h4 className="font-semibold text-lg text-foreground mb-2">Discover Your Ideal Career</h4>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                  Take the Ikigai Career Assessment to find your perfect career path based on your passions, skills, and values.
                </p>
                <Button
                  size="lg"
                  onClick={() => handleTakeTest("/career-assessment")}
                  className="bg-foreground text-background hover:bg-foreground/90 group"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Take Test
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Other Available Assessments */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-secondary">
          Other Assessments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessments.slice(1).map((assessment, index) => {
            const Icon = assessment.icon;
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white border border-border/40 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="w-11 h-11 rounded-lg bg-muted/50 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold text-foreground">{assessment.title}</CardTitle>
                      {assessment.status === "coming_soon" && (
                        <Badge variant="secondary" className="text-xs bg-secondary text-white">Coming Soon</Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {assessment.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {assessment.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClipboardCheck className="w-4 h-4" />
                        {assessment.questions} Questions
                      </div>
                    </div>
                    <Button
                      className="w-full bg-secondary text-background hover:bg-foreground/90 group"
                      disabled={assessment.status === "coming_soon"}
                      onClick={() => handleTakeTest(assessment.route)}
                    >
                      {assessment.status === "coming_soon" ? "Coming Soon" : "Start Assessment"}
                      {assessment.status !== "coming_soon" && (
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      )}
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

export default CareerAssessmentTab;
