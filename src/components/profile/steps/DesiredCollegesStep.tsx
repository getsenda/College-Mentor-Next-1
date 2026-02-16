import { useFormContext, useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, School } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileFormData, topColleges, courses } from "../profileSchema";
import { useState } from "react";

const DesiredCollegesStep = () => {
  const { control, watch } = useFormContext<ProfileFormData>();
  const [collegeSearch, setCollegeSearch] = useState("");
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "desiredColleges",
  });

  const filteredColleges = topColleges.filter(college =>
    college.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const addCollege = () => {
    if (fields.length < 5) {
      append({ collegeName: "", courseName: "", priority: fields.length + 1 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <School className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Desired Colleges</h3>
          <p className="text-sm text-muted-foreground">Add up to 5 colleges you're interested in</p>
        </div>
      </div>

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
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1 pt-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`desiredColleges.${index}.collegeName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select college" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-60">
                              <div className="p-2">
                                <Input
                                  placeholder="Search colleges..."
                                  value={collegeSearch}
                                  onChange={(e) => setCollegeSearch(e.target.value)}
                                  className="mb-2"
                                />
                              </div>
                              {filteredColleges.map((college) => (
                                <SelectItem key={college} value={college}>
                                  {college}
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
                      name={`desiredColleges.${index}.courseName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course} value={course}>
                                  {course}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={addCollege}
          className="w-full border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add College (Priority {fields.length + 1})
        </Button>
      )}

      {fields.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <School className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No colleges added yet. Click the button above to add your desired colleges.</p>
        </div>
      )}
    </div>
  );
};

export default DesiredCollegesStep;