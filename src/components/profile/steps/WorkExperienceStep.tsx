import { useFormContext, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Briefcase, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileFormData, industries, generateYears } from "../profileSchema";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WorkExperienceStep = () => {
  const { control, watch, setValue } = useFormContext<ProfileFormData>();
  const hasWorkExperience = watch("hasWorkExperience");
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperiences",
  });

  const years = generateYears(2000, new Date().getFullYear());

  const addExperience = () => {
    append({
      companyName: "",
      designation: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      industry: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <p className="text-sm text-muted-foreground">Add your professional experience (if any)</p>
        </div>
      </div>

      <FormField
        control={control}
        name="hasWorkExperience"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between p-4 rounded-lg border bg-background/50">
            <div>
              <FormLabel className="text-base">Do you have work experience?</FormLabel>
              <p className="text-sm text-muted-foreground">
                Include internships, part-time jobs, or full-time positions
              </p>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (!checked) {
                    setValue("workExperiences", []);
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {hasWorkExperience && (
        <>
          <AnimatePresence>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border border-border/50 bg-background/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Experience #{index + 1}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={control}
                        name={`workExperiences.${index}.companyName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`workExperiences.${index}.designation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation/Role</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`workExperiences.${index}.industry`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries.map((industry) => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
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
                        name={`workExperiences.${index}.isCurrentJob`}
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-3 pt-8">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Currently working here</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`workExperiences.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {!watch(`workExperiences.${index}.isCurrentJob`) && (
                        <FormField
                          control={control}
                          name={`workExperiences.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <Input type="month" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            className="w-full border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Work Experience
          </Button>

          {fields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No work experience added yet. Click the button above to add your experience.</p>
            </div>
          )}
        </>
      )}

      {!hasWorkExperience && hasWorkExperience !== undefined && (
        <div className="text-center py-8 text-muted-foreground bg-background/50 rounded-lg border border-dashed">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No work experience? No problem!</p>
          <p className="text-sm">You can always add it later.</p>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceStep;