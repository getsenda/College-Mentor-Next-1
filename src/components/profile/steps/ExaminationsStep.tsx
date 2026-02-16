import { useFormContext, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, FileText, Award, Languages, Trophy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileFormData, examsList, examScoreRanges, generateYears, languageOptions } from "../profileSchema";
import { useState } from "react";

const ExaminationsStep = () => {
  const { control, watch, setValue } = useFormContext<ProfileFormData>();
  const [newLanguage, setNewLanguage] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [newExtracurricular, setNewExtracurricular] = useState("");

  const { fields: examFields, append: appendExam, remove: removeExam } = useFieldArray({
    control,
    name: "examsAppeared",
  });

  const years = generateYears(2015, new Date().getFullYear() + 1);
  const upcomingExams = watch("upcomingExams") || [];
  const certifications = watch("certifications") || [];
  const extracurriculars = watch("extracurriculars") || [];
  const languagesKnown = watch("languagesKnown") || [];

  const addExam = () => {
    appendExam({ examName: "", score: "", year: "", rank: "", percentile: "" });
  };

  const addToArray = (
    arrayName: "upcomingExams" | "certifications" | "extracurriculars" | "languagesKnown",
    value: string,
    setter: (val: string) => void
  ) => {
    if (value.trim()) {
      const currentArray = watch(arrayName) || [];
      if (!currentArray.includes(value.trim())) {
        setValue(arrayName, [...currentArray, value.trim()]);
      }
      setter("");
    }
  };

  const removeFromArray = (
    arrayName: "upcomingExams" | "certifications" | "extracurriculars" | "languagesKnown",
    value: string
  ) => {
    const currentArray = watch(arrayName) || [];
    setValue(arrayName, currentArray.filter((item: string) => item !== value));
  };

  const getScoreRange = (examName: string) => {
    return examScoreRanges[examName] || { min: 0, max: 100 };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Examinations & Additional Info</h3>
          <p className="text-sm text-muted-foreground">Add your exam scores and achievements</p>
        </div>
      </div>

      {/* Exams Appeared */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Award className="w-4 h-4" />
          Exams Appeared
        </h4>

        <AnimatePresence>
          {examFields.map((field, index) => {
            const selectedExam = watch(`examsAppeared.${index}.examName`);
            const scoreRange = getScoreRange(selectedExam || "");

            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <Card className="border border-border/50 bg-background/50">
                  <CardContent className="p-4">
                    <div className="flex justify-end mb-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExam(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={control}
                        name={`examsAppeared.${index}.examName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Name</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select exam" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {examsList.map((exam) => (
                                  <SelectItem key={exam} value={exam}>
                                    {exam}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`examsAppeared.${index}.score`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Score {selectedExam && `(${scoreRange.min}-${scoreRange.max})`}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={`Enter score`}
                                min={scoreRange.min}
                                max={scoreRange.max}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`examsAppeared.${index}.year`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`examsAppeared.${index}.rank`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rank (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter rank" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`examsAppeared.${index}.percentile`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Percentile (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter percentile"
                                min={0}
                                max={100}
                                step={0.01}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <Button type="button" variant="outline" onClick={addExam} className="border-dashed">
          <Plus className="w-4 h-4 mr-2" />
          Add Exam
        </Button>
      </div>

      {/* Upcoming Exams */}
      <div className="space-y-3">
        <h4 className="font-medium">Upcoming Exams</h4>
        <div className="flex gap-2">
          <Select onValueChange={(value) => addToArray("upcomingExams", value, () => { })}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select upcoming exam" />
            </SelectTrigger>
            <SelectContent>
              {examsList.filter(e => !upcomingExams.includes(e)).map((exam) => (
                <SelectItem key={exam} value={exam}>{exam}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2">
          {upcomingExams.map((exam: string) => (
            <Badge key={exam} variant="secondary" className="gap-1">
              {exam}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFromArray("upcomingExams", exam)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages Known */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Languages className="w-4 h-4" />
          Languages Known
        </h4>
        <div className="flex gap-2">
          <Select onValueChange={(value) => addToArray("languagesKnown", value, setNewLanguage)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.filter(l => !languagesKnown.includes(l)).map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2">
          {languagesKnown.map((lang: string) => (
            <Badge key={lang} variant="outline" className="gap-1">
              {lang}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFromArray("languagesKnown", lang)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Award className="w-4 h-4" />
          Certifications
        </h4>
        <div className="flex gap-2">
          <Input
            placeholder="Enter certification name"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("certifications", newCertification, setNewCertification))}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addToArray("certifications", newCertification, setNewCertification)}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert: string) => (
            <Badge key={cert} variant="secondary" className="gap-1">
              {cert}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFromArray("certifications", cert)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <FormField
        control={control}
        name="achievements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements & Awards
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your achievements, awards, competitions won, etc."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Extracurriculars */}
      <div className="space-y-3">
        <h4 className="font-medium">Extracurricular Activities</h4>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Sports, Music, Debate, etc."
            value={newExtracurricular}
            onChange={(e) => setNewExtracurricular(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addToArray("extracurriculars", newExtracurricular, setNewExtracurricular))}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => addToArray("extracurriculars", newExtracurricular, setNewExtracurricular)}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {extracurriculars.map((activity: string) => (
            <Badge key={activity} variant="outline" className="gap-1">
              {activity}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeFromArray("extracurriculars", activity)}
              />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExaminationsStep;