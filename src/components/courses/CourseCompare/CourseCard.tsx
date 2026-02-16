import { BookOpen, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course } from '@/components/types/course';
import { CourseModel } from '@/components/data/coursemodel';



interface CourseCardsProps {
  selectedCourses: (CourseModel | null)[];
  onAddCourse: (index: number) => void;
  onRemoveCourse: (index: number) => void;
}

export function CourseCards({ selectedCourses, onAddCourse, onRemoveCourse }: CourseCardsProps) {
  
  const activeCourses = selectedCourses.filter((c): c is CourseModel => c !== null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-center mb-6 md:mb-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-2 md:mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Course Compare</span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-600 text-sm md:text-base px-2"
        >
          Add courses below to see detailed comparison
        </motion.p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
        {selectedCourses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl md:rounded-2xl border-2 border-gray-200 p-3 md:p-6 hover:border-cyan-300 hover:shadow-2xl transition-all min-h-[200px] md:min-h-[320px] flex flex-col relative overflow-hidden group"
          >
            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            />

            <div className="relative z-10 flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                {course ? (
                  <motion.div
                    key={`course-${course.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg"
                    >
                      <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </motion.div>
                    <h3 className="text-center text-gray-900 mb-0.5 md:mb-1 text-sm md:text-lg font-semibold line-clamp-1">{course.name}</h3>
                    <p className="text-center text-xs text-gray-500 mb-2 md:mb-3 line-clamp-1 hidden md:block">{course.stream}</p>
                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center mb-2 md:mb-4">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 bg-blue-100 text-blue-700 rounded-lg"
                      >
                        {course.stream}
                      </motion.span>
                      {/* <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 bg-green-100 text-green-700 rounded-lg hidden md:block"
                      >
                        {course.}
                      </motion.span> */}
                    </div>
                    {/* <div className="flex-1" /> */}
                    {/* <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg md:rounded-xl p-2 md:p-3 mb-2 md:mb-4">
                      <p className="text-[10px] md:text-xs text-center text-gray-600 mb-0.5">Avg Salary</p>
                      <p className="text-center text-cyan-600 text-xs md:text-base font-semibold">{course.avgSalary}</p>
                    </div> */}
                    <div className="flex gap-1.5 md:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onAddCourse(index)}
                        className="flex-1 px-2 py-1.5 md:px-4 md:py-2.5 text-xs md:text-sm text-cyan-600 border-2 border-cyan-600 rounded-lg md:rounded-xl hover:bg-cyan-50 transition-colors"
                      >
                        Change
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, rotate: 90 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onRemoveCourse(index)}
                        className="px-2 py-1.5 md:px-4 md:py-2.5 text-xs md:text-sm text-red-600 border-2 border-red-600 rounded-lg md:rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`empty-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col items-center justify-center"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-8 h-8 md:w-12 md:h-12 bg-gray-100 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 border-2 border-dashed border-gray-300"
                    >
                      <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
                    </motion.div>
                    <h4 className="text-gray-900 mb-1 md:mb-2 text-sm md:text-lg font-medium">Course {index + 1}</h4>
                    <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-6 text-center">No course selected</p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAddCourse(index)}
                      className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg md:rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      Add
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}