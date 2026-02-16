import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Building2, Calendar, Award, BookOpen } from "lucide-react";
import { ProfileFormData, graduationCourses, generateYears } from "../profileSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const currentYear = new Date().getFullYear();
const years = generateYears(1980, currentYear);

const GraduationStep = () => {
  const { control, watch } = useFormContext<ProfileFormData>();
  const gradeType = watch("graduationGradeType");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Graduation Details</h3>
          <p className="text-sm text-muted-foreground">Enter your higher education information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Institute Name */}
        <FormField
          control={control}
          name="graduationInstitute"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                Institute Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter university/college name" 
                  {...field} 
                  className="h-11" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Graduation Course */}
        <FormField
          control={control}
          name="graduationCourse"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                Graduation Course <span className="text-destructive">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {graduationCourses.map((course) => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passing Year */}
        <FormField
          control={control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Passing Year <span className="text-destructive">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grade Type */}
        <FormField
          control={control}
          name="graduationGradeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                Grade Format
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="grad-percentage" />
                    <Label htmlFor="grad-percentage" className="cursor-pointer">Percentage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cgpa" id="grad-cgpa" />
                    <Label htmlFor="grad-cgpa" className="cursor-pointer">CGPA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grade" id="grad-grade" />
                    <Label htmlFor="grad-grade" className="cursor-pointer">Grade</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Percentage/Grade */}
        <FormField
          control={control}
          name="graduationPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Award className="w-4 h-4 text-muted-foreground" />
                {gradeType === "percentage" ? "Percentage" : gradeType === "cgpa" ? "CGPA" : "Grade"} 
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    gradeType === "percentage" 
                      ? "Enter percentage (e.g., 85)" 
                      : gradeType === "cgpa" 
                        ? "Enter CGPA (e.g., 8.5)" 
                        : "Enter grade (e.g., A+)"
                  }
                  {...field} 
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GraduationStep;
