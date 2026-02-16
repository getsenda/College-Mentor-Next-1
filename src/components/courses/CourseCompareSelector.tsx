import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Loader2 } from "lucide-react";
import { searchService, Course } from "@/services/searchService";
import { useToast } from "@/hooks/use-toast";

interface CourseCompareSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (course: Course) => void;
  selectedCourses: Course[];
}

export function CourseCompareSelector({ open, onClose, onSelect, selectedCourses }: CourseCompareSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open && searchQuery.length > 0) {
      searchCourses();
    }
  }, [searchQuery, open]);

  const searchCourses = async () => {
    if (searchQuery.length < 1) return;

    setIsLoading(true);
    try {
      const response = await searchService.searchAll({
        q: searchQuery,
        limit: 20,
        fuzzy: true
      });

      if (response.data) {
        setCourses(response.data.courses || []);
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search courses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (course: Course) => {
    const isAlreadySelected = selectedCourses.some(c => c.id === course.id);
    
    if (isAlreadySelected) {
      toast({
        title: "Already Selected",
        description: "This course is already in your comparison list.",
        variant: "destructive"
      });
      return;
    }

    onSelect(course);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] !top-[20%] md:!top-[15%] !translate-y-0">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Search and Select Course
          </DialogTitle>
        </DialogHeader>

        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Type course name (e.g., B.Tech, MBA, B.Sc)..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <CommandEmpty>
                  {searchQuery.length > 0 ? "No courses found." : "Start typing to search courses..."}
                </CommandEmpty>
                <CommandGroup heading="Courses">
                  {courses.map((course) => (
                    <CommandItem
                      key={course.id}
                      onSelect={() => handleSelect(course)}
                      className="flex items-start gap-3 p-3 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{course.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                          <span className="text-xs text-muted-foreground">{course.mode}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {Math.floor(course.durationMonths / 12)} years • ₹{course.fees.toLocaleString()}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
