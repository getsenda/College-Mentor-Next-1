import { motion } from "framer-motion";
import { Plus, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/services/searchService";

interface CourseSlotProps {
  course: Course | null;
  slotNumber: number;
  onSelect: () => void;
  onRemove: () => void;
}

export function CourseSlot({ course, slotNumber, onSelect, onRemove }: CourseSlotProps) {
  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: slotNumber * 0.1 }}
      >
        <Card className="relative overflow-hidden border-2 border-dashed border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group">
          <div className="p-8 flex flex-col items-center justify-center min-h-[280px] gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-8 h-8 text-primary/50" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">Course {slotNumber}</h3>
              <p className="text-sm text-muted-foreground">No course selected</p>
            </div>
            <Button 
              onClick={onSelect}
              variant="outline"
              className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Course
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: slotNumber * 0.1 }}
      className="group relative"
    >
      <Card className="relative overflow-hidden border border-border bg-background shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Gradient header */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
        
        {/* Remove button */}
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-4">
          {/* Course icon and badge */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="mb-2">
                {course.level}
              </Badge>
              <h3 className="font-bold text-lg leading-tight truncate">{course.title}</h3>
            </div>
          </div>

          {/* Course details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{Math.floor(course.durationMonths / 12)} years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Mode:</span>
              <span className="font-medium">{course.mode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Fees:</span>
              <span className="font-medium text-primary">₹{course.fees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Seats:</span>
              <span className="font-medium">{course.seats}</span>
            </div>
          </div>

          {/* Change button */}
          <Button
            onClick={onSelect}
            variant="outline"
            className="w-full mt-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Change Course
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
