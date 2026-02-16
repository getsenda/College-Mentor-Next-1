"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, IndianRupee, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Course } from '@/components/types/course';


interface College {
  id: string;
  name: string;
  location: string;
  fees: string;
  ranking: number;
}

interface TopCollegesSectionProps {
  courses: Course[];
  onCompare?: (courseIds: string[]) => void;
}

// Mock data for colleges - in production this would come from API
const getCollegesForCourse = (courseId: string): College[] => {
  const collegeData: Record<string, College[]> = {
    'btech': [
      { id: '1', name: 'IIT Delhi', location: 'New Delhi', fees: '₹2.5L/year', ranking: 1 },
      { id: '2', name: 'IIT Bombay', location: 'Mumbai', fees: '₹2.5L/year', ranking: 2 },
      { id: '3', name: 'IIT Madras', location: 'Chennai', fees: '₹2.5L/year', ranking: 3 },
      { id: '4', name: 'IIT Kanpur', location: 'Kanpur', fees: '₹2.5L/year', ranking: 4 },
      { id: '5', name: 'IIT Kharagpur', location: 'Kharagpur', fees: '₹2.5L/year', ranking: 5 },
      { id: '6', name: 'BITS Pilani', location: 'Pilani', fees: '₹5L/year', ranking: 6 },
    ],
    'bsc': [
      { id: '7', name: 'St. Stephen\'s College', location: 'Delhi', fees: '₹50K/year', ranking: 1 },
      { id: '8', name: 'Hindu College', location: 'Delhi', fees: '₹45K/year', ranking: 2 },
      { id: '9', name: 'Presidency College', location: 'Kolkata', fees: '₹30K/year', ranking: 3 },
      { id: '10', name: 'Loyola College', location: 'Chennai', fees: '₹55K/year', ranking: 4 },
      { id: '11', name: 'Christ University', location: 'Bangalore', fees: '₹1.2L/year', ranking: 5 },
    ],
    'bba': [
      { id: '12', name: 'Shaheed Sukhdev College', location: 'Delhi', fees: '₹40K/year', ranking: 1 },
      { id: '13', name: 'Christ University', location: 'Bangalore', fees: '₹3L/year', ranking: 2 },
      { id: '14', name: 'NMIMS', location: 'Mumbai', fees: '₹4.5L/year', ranking: 3 },
      { id: '15', name: 'Symbiosis', location: 'Pune', fees: '₹3.5L/year', ranking: 4 },
      { id: '16', name: 'IP University', location: 'Delhi', fees: '₹1.5L/year', ranking: 5 },
    ],
    'mba': [
      { id: '17', name: 'IIM Ahmedabad', location: 'Ahmedabad', fees: '₹25L/year', ranking: 1 },
      { id: '18', name: 'IIM Bangalore', location: 'Bangalore', fees: '₹25L/year', ranking: 2 },
      { id: '19', name: 'IIM Calcutta', location: 'Kolkata', fees: '₹25L/year', ranking: 3 },
      { id: '20', name: 'ISB Hyderabad', location: 'Hyderabad', fees: '₹35L/year', ranking: 4 },
      { id: '21', name: 'XLRI Jamshedpur', location: 'Jamshedpur', fees: '₹25L/year', ranking: 5 },
    ],
    'bcom': [
      { id: '22', name: 'SRCC', location: 'Delhi', fees: '₹35K/year', ranking: 1 },
      { id: '23', name: 'Lady Shri Ram College', location: 'Delhi', fees: '₹30K/year', ranking: 2 },
      { id: '24', name: 'St. Xavier\'s College', location: 'Mumbai', fees: '₹45K/year', ranking: 3 },
      { id: '25', name: 'Christ University', location: 'Bangalore', fees: '₹1.5L/year', ranking: 4 },
      { id: '26', name: 'Loyola College', location: 'Chennai', fees: '₹40K/year', ranking: 5 },
    ],
  };

  // Return colleges based on course ID pattern
  const courseKey = courseId.toLowerCase();
  for (const key of Object.keys(collegeData)) {
    if (courseKey.includes(key)) {
      return collegeData[key];
    }
  }

  // Default colleges if no match
  return collegeData['btech'].slice(0, 5);
};

export function TopCollegesSection({ courses, onCompare }: TopCollegesSectionProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const handleAddToCompare = (college: College) => {
    // If onCompare callback exists, use it to add courses to comparison
    if (onCompare) {
      onCompare(courses.map(c => String(c.id)));
    } else {
      router.push(`/college-compare?id=${college.id}`);
    }
  };

  if (courses.length === 0) return null;

  const activeCourse = courses[activeTab];
  const colleges = getCollegesForCourse(String(activeCourse.id));

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gradient-to-b from-background to-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold mb-4">
            Top Colleges Offering These Courses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the best institutions for your selected courses and add them to compare
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto pb-2">
          <div className="inline-flex items-center bg-muted/50 rounded-xl p-1 md:p-1.5 border border-border min-w-max">
            {courses.map((course, index) => (
              <button
                key={course.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-3 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${activeTab === index
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{course.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Top Colleges for {activeCourse.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colleges.slice(0, 6).map((college, index) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                        #{college.ranking}
                      </span>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 text-lg">
                        {college.name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary/70" />
                      <span>{college.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IndianRupee className="w-4 h-4 text-primary/70" />
                      <span>{college.fees}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 bg-[#3B82F6] group-hover:bg-secondary group-hover:text-primary-foreground transition-all duration-300 text-white"
                    onClick={() => handleAddToCompare(college)}
                  >
                    <Plus className="w-4 h-4" />
                    Add to Compare
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <Button
                variant="link"
                className="gap-2 text-primary hover:text-primary/80"
                onClick={() => router.push('/colleges')}
              >
                View All Colleges for {activeCourse.name}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
