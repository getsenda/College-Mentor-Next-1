"use client";
import { useState, useEffect } from 'react';
import { X, Search, Check, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseModel } from '@/components/data/coursemodel';
import { courseService } from '@/services/courseService';
import { Course } from '@/components/types/course';



interface CourseSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (courses: CourseModel[]) => void;
  selectedCourseIds: number[];   // 👈 only IDs
  isSingleSelect?: boolean;
}

export function CourseSelectionModal({
  isOpen,
  onClose,
  onSelect,
  selectedCourseIds,
  isSingleSelect = false
}: CourseSelectionModalProps) {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<CourseModel[]>([]);
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (!isOpen) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await courseService.getSearchCourses(0, 20);
        setCourses(response.courses);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedCourses([]);
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCourses = courses.filter(course => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      course.name.toLowerCase().includes(searchLower) ||
      course.stream.toLowerCase().includes(searchLower) ||
      course.degreeTypes.some(d =>
        d.toLowerCase().includes(searchLower)
      );

    const isAlreadySelected = selectedCourseIds.includes(course.id);


    return matchesSearch && !isAlreadySelected;
  });
  const isSelected = (courseId: number) =>
    selectedCourses.some(c => c.id === courseId);




  const handleToggleCourse = (course: CourseModel) => {
    if (selectedCourseIds.includes(course.id)) return;

    const isSelected = selectedCourses.some(c => c.id === course.id);

    if (isSelected) {
      setSelectedCourses(prev =>
        prev.filter(c => c.id !== course.id)
      );
    } else {
      setSelectedCourses(prev =>
        isSingleSelect ? [course] : [...prev, course]
      );
    }
  };


  const handleOk = () => {
    if (selectedCourses.length > 0) {
      onSelect(selectedCourses);
    }
  };


  const isAlreadySelectedInSlot = (courseId: number) =>
    selectedCourseIds.includes(courseId);



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-24"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-br from-cyan-50 to-blue-50 flex-shrink-0">
            <div>
              <h3 className="text-gray-900">Select Course{!isSingleSelect && 's'}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {isSingleSelect
                  ? 'Choose a course to add'
                  : 'Choose courses to compare'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by course name, degree, or stream..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-sm"
                autoFocus
              />
            </motion.div>
          </div>



          {/* Courses List */}
          <div className="flex-1 overflow-y-auto p-6 pt-4">
            {filteredCourses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-500"
              >
                {searchTerm
                  ? `No courses found matching "${searchTerm}"`
                  : 'All available courses are already selected'}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCourses.map((course, index) => {
                  const selected = isSelected(course.id);
                  const alreadyInSlot = isAlreadySelectedInSlot(course.id);
                  const disabled = alreadyInSlot; // Only disable if already in a slot

                  return (
                    <motion.button
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={!disabled ? { scale: 1.02, y: -4 } : {}}
                      whileTap={!disabled ? { scale: 0.98 } : {}}
                      onClick={() => !disabled && handleToggleCourse(course)}
                      disabled={disabled}
                      className={`text-left p-3 rounded-xl border-2 transition-all ${selected
                        ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg'
                        : alreadyInSlot
                          ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-60'
                          : 'border-gray-200 hover:border-cyan-300 hover:shadow-lg'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          whileHover={!disabled ? { rotate: [0, -5, 5, 0], scale: 1.1 } : {}}
                          transition={{ duration: 0.3 }}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${selected
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg'
                            : alreadyInSlot
                              ? 'bg-gray-300 text-gray-500'
                              : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'
                            }`}
                        >
                          <AnimatePresence mode="wait">
                            {selected ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                              >
                                <Check className="w-4 h-4" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="book"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <BookOpen className="w-4 h-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <h4 className={`text-sm font-semibold ${alreadyInSlot ? 'text-gray-500' : 'text-gray-900'}`}>{course.name}</h4>
                              <p className={`text-xs ${alreadyInSlot ? 'text-gray-400' : 'text-gray-600'}`}>{course.name}</p>
                            </div>
                          </div>

                          {alreadyInSlot && (
                            <div className="mb-1.5">
                              <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded-md">
                                Already Selected
                              </span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1.5 mb-2">
                            <motion.span
                              whileHover={!disabled ? { scale: 1.1 } : {}}
                              className={`text-xs px-1.5 py-0.5 rounded-md ${alreadyInSlot
                                ? 'bg-gray-200 text-gray-500'
                                : 'bg-blue-100 text-blue-700'
                                }`}
                            >
                              {course.stream}
                            </motion.span>
                            <motion.span
                              whileHover={!disabled ? { scale: 1.1 } : {}}
                              className={`text-xs px-1.5 py-0.5 rounded-md ${alreadyInSlot
                                ? 'bg-gray-200 text-gray-500'
                                : 'bg-green-100 text-green-700'
                                }`}
                            >
                              {course.stream}
                            </motion.span>

                          </div>

                          <p className={`text-xs line-clamp-2 ${alreadyInSlot ? 'text-gray-400' : 'text-gray-500'}`}>
                            {course.entranceExams.length > 0 ? `Entrance Exams: ${course.entranceExams.join(', ')}` : 'No entrance exams listed'}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center justify-between gap-4">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-gray-600"
              >
                {selectedCourses.length === 0 && `Select ${isSingleSelect ? 'a course' : 'courses'} to continue`}
                {selectedCourses.length > 0 && `${selectedCourses.length} course${selectedCourses.length > 1 ? 's' : ''} selected`}
              </motion.div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={selectedCourses.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={selectedCourses.length > 0 ? { scale: 0.95 } : {}}
                  onClick={handleOk}
                  disabled={selectedCourses.length === 0}
                  className={`px-8 py-3 rounded-xl transition-all ${selectedCourses.length > 0
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  OK
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}