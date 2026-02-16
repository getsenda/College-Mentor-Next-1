import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { School, Building2, MapPin, Calendar, Award, Layers } from "lucide-react";
import { ProfileFormData, boards, streamOptions, indianCities, generateYears } from "../profileSchema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();
const years = generateYears(1990, currentYear);

const TwelfthStep = () => {
  const { control, watch } = useFormContext<ProfileFormData>();
  const gradeType = watch("twelfthGradeType");
  const [cityOpen, setCityOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <School className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">12th Standard Details</h3>
          <p className="text-sm text-muted-foreground">Enter your senior secondary education information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Name */}
        <FormField
          control={control}
          name="twelfthSchool"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                School Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter school name" 
                  {...field} 
                  className="h-11" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={control}
          name="twelfthCity"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                City <span className="text-destructive">*</span>
              </FormLabel>
              <Popover open={cityOpen} onOpenChange={setCityOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full h-11 justify-between font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value || "Select city"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {indianCities.map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={() => {
                              field.onChange(city);
                              setCityOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === city ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Passing Year */}
        <FormField
          control={control}
          name="twelfthYear"
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

        {/* Board */}
        <FormField
          control={control}
          name="twelfthBoard"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <School className="w-4 h-4 text-muted-foreground" />
                Board <span className="text-destructive">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {boards.map((board) => (
                    <SelectItem key={board} value={board}>{board}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stream */}
        <FormField
          control={control}
          name="twelfthStream"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                Stream of Study <span className="text-destructive">*</span>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {streamOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
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
          name="twelfthGradeType"
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
                    <RadioGroupItem value="percentage" id="12th-percentage" />
                    <Label htmlFor="12th-percentage" className="cursor-pointer">Percentage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cgpa" id="12th-cgpa" />
                    <Label htmlFor="12th-cgpa" className="cursor-pointer">CGPA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grade" id="12th-grade" />
                    <Label htmlFor="12th-grade" className="cursor-pointer">Grade</Label>
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
          name="twelfthPercentage"
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

export default TwelfthStep;
