import { motion } from "framer-motion";
import { Course } from "@/services/searchService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Bookmark, X, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseComparisonProps {
  courses: Course[];
  onRemove: (index: number) => void;
  onEditSelection: () => void;
}

export function CourseComparison({ courses, onRemove, onEditSelection }: CourseComparisonProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Login Required",
      description: "Please login to download the comparison report.",
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Login Required",
      description: "Please login to bookmark this comparison.",
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Course Comparison
            </h2>
            <p className="text-muted-foreground">Detailed side-by-side comparison of selected courses</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleBookmark} variant="outline" className="gap-2">
              <Bookmark className="w-4 h-4" />
              Bookmark
            </Button>
            <Button onClick={handleDownload} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button onClick={onEditSelection} variant="default" className="gap-2">
              Edit Selection
            </Button>
          </div>
        </div>

        {/* Course cards */}
        <div className={`grid gap-6 ${courses.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} max-w-6xl mx-auto`}>
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden bg-white border border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="h-1.5 bg-gradient-to-r from-[#4169E1] via-[#00CED1] to-[#00FA9A]" />
                
                <button
                  onClick={() => onRemove(index)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4169E1] to-[#00CED1] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2 bg-[#4169E1]/10 text-[#4169E1] hover:bg-[#4169E1]/20">
                        {course.level}
                      </Badge>
                      <h3 className="font-bold text-lg leading-tight">{course.title}</h3>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold border-r border-border w-48">Comparison Parameter</th>
                    {courses.map((course) => (
                      <th key={course.id} className="text-left p-4 font-semibold border-r border-border last:border-r-0">
                        {course.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Course Level</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0">{course.level}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Duration</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0">
                        {Math.floor(course.durationMonths / 12)} years ({course.durationMonths} months)
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Mode</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0">{course.mode}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Course Focus</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0">
                        {course.title.includes('B.Tech') || course.title.includes('BTech') 
                          ? 'Engineering and technology' 
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? 'Science and its applications'
                          : 'Specialised education'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Course Structure</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0">
                        {course.title.includes('B.Tech') || course.title.includes('BTech')
                          ? 'More practical, project-based'
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? 'More theoretical, lab-oriented'
                          : 'Balanced practical and theoretical'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Eligibility</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 text-sm">
                        {course.title.includes('B.Tech') || course.title.includes('BTech')
                          ? 'Class 12 in Science with Maths. Min. 50-60% required'
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? 'Class 12 in Science with PCB/PCM. Min. 50-60% required'
                          : 'As per course requirements'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Total Fees</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 font-semibold text-primary">
                        ₹{course.fees.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Available Seats</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0">{course.seats}</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Average Salary</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 font-semibold text-primary">
                        {course.title.includes('B.Tech') || course.title.includes('BTech')
                          ? '₹4 - 20 LPA'
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? '₹3 - 8 LPA'
                          : '₹3 - 15 LPA'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Job Scope</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 text-sm">
                        {course.title.includes('B.Tech') || course.title.includes('BTech')
                          ? 'Software Engineer, Mechanical Engineer, Research Associate, Professor'
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? 'Scientist, Research Associate, Professor, Lab Chemist, Statistician'
                          : 'Various career opportunities'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Entrance Exams</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 text-sm">
                        {course.title.includes('B.Tech') || course.title.includes('BTech')
                          ? 'JEE Main, JEE Advanced, WBJEE, KEAM, MHT CET'
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? 'CUET, ICAR AIEEA, MHT CET, KCET'
                          : 'Course specific exams'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Top Recruiters</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 text-sm">
                        {course.title.includes('B.Tech') || course.title.includes('BTech')
                          ? 'Google, Apple, Microsoft, ISRO, Infosys'
                          : course.title.includes('B.Sc') || course.title.includes('BSc')
                          ? 'TCS, Wipro, Biocon, Cipla, Research Institutes'
                          : 'Various organizations'}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium border-r border-border bg-muted/20">Description</td>
                    {courses.map((course) => (
                      <td key={course.id} className="p-4 border-r border-border last:border-r-0 text-sm text-muted-foreground">
                        {course.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
