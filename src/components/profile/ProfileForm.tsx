import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronLeft, ChevronRight, User, GraduationCap, School, Briefcase, FileText, Save, AlertCircle } from "lucide-react";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import GraduationStep from "./steps/GraduationStep";
import TwelfthStep from "./steps/TwelfthStep";
import TenthStep from "./steps/TenthStep";
import DesiredCollegesStep from "./steps/DesiredCollegesStep";
import WorkExperienceStep from "./steps/WorkExperienceStep";
import ExaminationsStep from "./steps/ExaminationsStep";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, type ProfileFormData, calculateProfileCompletion, getProfileStrengthColor, profileCompletionWeights } from "./profileSchema";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Basic details", weight: 30 },
  { id: 2, title: "Education", icon: GraduationCap, description: "Academic details", weight: 25 },
  // { id: 3, title: "Desired Colleges", icon: School, description: "College preferences", weight: 20 },
  // { id: 4, title: "Work Experience", icon: Briefcase, description: "Professional history", weight: 15 },
  // { id: 5, title: "Examinations", icon: FileText, description: "Exams & achievements", weight: 10 },
];

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema) as any,
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      countryCode: "+91",
      city: "",
      educationLevel: "",
      email: "",
      gender: "",
      streamInterested: "",
      coursesInterested: [],
      graduationInstitute: "",
      graduationYear: "",
      graduationPercentage: "",
      graduationGradeType: "percentage",
      graduationCourse: "",
      twelfthSchool: "",
      twelfthCity: "",
      twelfthYear: "",
      twelfthPercentage: "",
      twelfthGradeType: "percentage",
      twelfthBoard: "",
      twelfthStream: "",
      tenthSchool: "",
      tenthCity: "",
      tenthYear: "",
      tenthPercentage: "",
      tenthGradeType: "percentage",
      tenthBoard: "",
      desiredColleges: [],
      hasWorkExperience: undefined,
      workExperiences: [],
      examsAppeared: [],
      upcomingExams: [],
      certifications: [],
      achievements: "",
      extracurriculars: [],
      languagesKnown: [],
    },
  });

  const formData = methods.watch();
  const profileCompletion = calculateProfileCompletion(formData);
  const strengthInfo = getProfileStrengthColor(profileCompletion.total);

  // Calculate step progress percentage
  const stepProgress = (currentStep / steps.length) * 100;

  // Get progress bar color based on completion
  const getProgressColor = (percentage: number) => {
    if (percentage <= 40) return "bg-red-500";
    if (percentage <= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleNext = async () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await methods.trigger(["firstName", "lastName", "mobile", "city", "educationLevel", "email", "streamInterested", "coursesInterested"]);
    } else if (currentStep === 2) {
      isValid = await methods.trigger(["twelfthSchool", "twelfthCity", "twelfthYear", "twelfthPercentage", "twelfthBoard", "twelfthStream", "tenthSchool", "tenthCity", "tenthYear", "tenthPercentage", "tenthBoard"]);
    }
    // Steps 3-5 are optional, so we don't block navigation

    if (isValid || currentStep >= 3) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow navigation to completed steps or the next available step
    if (completedSteps.includes(stepId) || stepId === currentStep || stepId === Math.max(...completedSteps) + 1) {
      setCurrentStep(stepId);
    }
  };

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    // Simulate saving to localStorage or API
    const data = methods.getValues();
    localStorage.setItem("profileFormData", JSON.stringify(data));
    localStorage.setItem("profileCurrentStep", currentStep.toString());
    localStorage.setItem("profileCompletedSteps", JSON.stringify(completedSteps));

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Progress saved! You can continue later.");
    }, 1000);
  };

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem("profileFormData");
    const savedStep = localStorage.getItem("profileCurrentStep");
    const savedCompletedSteps = localStorage.getItem("profileCompletedSteps");

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        methods.reset(parsed);
      } catch (e) {
        console.error("Failed to load saved data");
      }
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    if (savedCompletedSteps) {
      try {
        setCompletedSteps(JSON.parse(savedCompletedSteps));
      } catch (e) {
        console.error("Failed to load completed steps");
      }
    }
  }, []);

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile Data:", data);
    localStorage.removeItem("profileFormData");
    localStorage.removeItem("profileCurrentStep");
    localStorage.removeItem("profileCompletedSteps");
    toast.success("Profile saved successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return (
          <div className="space-y-8">
            <GraduationStep />
            <TwelfthStep />
            <TenthStep />
          </div>
        );
      case 3:
        return <DesiredCollegesStep />;
      case 4:
        return <WorkExperienceStep />;
      case 5:
        return <ExaminationsStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          {/* Profile Completion Card */}
          <Card className="bg-card border border-border/50 shadow-sm rounded-xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-base text-foreground text-xl">Profile Strength</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-md font-medium ${strengthInfo.label === 'Complete' ? 'bg-success/10 text-success' :
                      strengthInfo.label === 'Moderate' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <p className=" text-muted-foreground mb-3 text-md">{strengthInfo.description}</p>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Completion</span>
                      <span className={`text-xs font-semibold ${profileCompletion.total >= 70 ? 'text-success' :
                        profileCompletion.total >= 40 ? 'text-warning' : 'text-destructive'
                        }`}>
                        {profileCompletion.total}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${getProgressColor(profileCompletion.total)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${profileCompletion.total}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                  {Object.entries(profileCompletionWeights).map(([key, weight]) => {
                    const score = profileCompletion[key as keyof typeof profileCompletion];
                    const isComplete = (score as number) >= 70;
                    const isModerate = (score as number) >= 40;
                    return (
                      <div key={key} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${isComplete ? 'bg-success/5 border-success/20' :
                        isModerate ? 'bg-warning/5 border-warning/20' :
                          'bg-muted/30 border-border/50'
                        }`}>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold ${isComplete ? 'bg-success/10 text-success' :
                          isModerate ? 'bg-warning/10 text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}>
                          {weight}
                        </div>
                        <span className="text-xs text-muted-foreground capitalize hidden xl:inline">
                          {key.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Form Card */}
          <Card className="bg-card border border-border/50 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-border/30 bg-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">Complete Your Profile</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Step {currentStep} of {steps.length}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSaveAndContinue}
                  disabled={isSaving}
                  className="flex items-center gap-2 text-xs h-9"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? "Saving..." : "Save Progress"}
                </Button>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = completedSteps.includes(step.id);
                  const isClickable = completedSteps.includes(step.id) || step.id === currentStep || step.id <= Math.max(...completedSteps, 0) + 1;

                  return (
                    <div key={step.id} className="flex items-center flex-1 min-w-0">
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-1 transition-all ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                          } ${isActive
                            ? 'bg-[#3B82F6]  text-primary-foreground shadow-sm'
                            : isCompleted
                              ? 'bg-success/10 text-success'
                              : 'bg-muted/50 text-muted-foreground'
                          }`}
                        onClick={() => isClickable && handleStepClick(step.id)}
                      >
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${isActive
                          ? 'bg-primary-foreground/20'
                          : isCompleted
                            ? 'bg-success/20'
                            : 'bg-background'
                          }`}>
                          {isCompleted ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <StepIcon className="w-4 h-4" />
                          )}
                        </div>
                        <div className="hidden lg:block min-w-0">
                          <span className="text-xs font-medium block truncate">{step.title}</span>
                          <span className="text-[10px] opacity-70">{step.weight}%</span>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-4 h-0.5 mx-1 shrink-0 ${isCompleted ? "bg-success" : "bg-border"
                          }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardHeader>

            <CardContent className="p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {/* Validation Errors Summary */}
              {Object.keys(methods.formState.errors).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-destructive/5 border border-destructive/20 rounded-lg flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-destructive">
                    Please fix the errors above before proceeding.
                  </span>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 pt-5 border-t border-border/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 h-10"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 h-10 bg-[#3B82F6] text-primary-foreground hover:bg-[#3B82F6] /90"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex items-center gap-2 h-10 bg-success text-success-foreground hover:bg-success/90"
                  >
                    <Check className="w-4 h-4" />
                    Save Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;