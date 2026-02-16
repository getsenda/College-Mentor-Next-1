"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CourseCompareHero } from '../CourseCompareHero';
import { LoginModal } from '../Loginmodal';

import { CourseCards } from './CourseCard';
import { DetailedComparison } from './DetailedComparison';
import PrimaryNavigation from '@/components/header/PrimaryNavigation';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { PopularComparison } from './PopularComparisonCourses';
import { FAQSection } from './FAQCourseCompare';
import { CourseDetail, PopularComparisonPair } from '@/components/data/coursecompare';
import { courseService } from '@/services/courseService';
import { CourseSelectionModal } from './CourseSelectionModal';
import { CourseModel } from '@/components/data/coursemodel';





export default function CourseCompareMain() {
    const [bookmarkedCourses, setBookmarkedCourses] = useState<Set<string>>(new Set());
    const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
    const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loginAction, setLoginAction] = useState<'bookmark' | 'download' | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [comparisonData, setComparisonData] = useState<CourseDetail[]>([]);
    const [comparisonLoading, setComparisonLoading] = useState(false);
    const [selectedCourses, setSelectedCourses] =
        useState<(CourseModel | null)[]>([null, null, null, null]);

    const [popularComparisons, setPopularComparisons] =
        useState<PopularComparisonPair[]>([]);


    const fetchComparisonData = async (courses: CourseModel[]) => {
        try {
            setComparisonLoading(true);

            const ids = courses.map(c => c.id); // already number

            const data = await courseService.compareCourses(ids);
            setComparisonData(data);
            setShowComparison(true);

            setTimeout(() => {
                document
                    .getElementById("comparison-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        } catch (err) {
            console.error("Failed to fetch comparison data", err);
        } finally {
            setComparisonLoading(false);
        }
    };

    const handleOpenSelectionModal = (slotIndex?: number) => {
        setActiveSlotIndex(slotIndex !== undefined ? slotIndex : null);
        setIsSelectionModalOpen(true);
    };

    const handleCloseSelectionModal = () => {
        setIsSelectionModalOpen(false);
        setActiveSlotIndex(null);
    };

    const handleSelectCourses = (courses: CourseModel[]) => {
        let updatedCourses = [...selectedCourses];

        if (activeSlotIndex !== null) {
            updatedCourses[activeSlotIndex] = courses[0] ?? null;
        } else {
            courses.forEach(course => {
                const emptySlotIndex = updatedCourses.findIndex(c => c === null);
                if (emptySlotIndex !== -1) {
                    updatedCourses[emptySlotIndex] = course;
                }
            });
        }

        setSelectedCourses(updatedCourses);
        handleCloseSelectionModal();

        const active = updatedCourses.filter(
            (c): c is CourseModel => c !== null
        );

        if (active.length > 0) {
            fetchComparisonData(active);
        }
    };
    const handlePopularCompare = async (pair: PopularComparisonPair) => {
        try {
            setComparisonLoading(true);

            const ids = [pair.course1.id, pair.course2.id];

            const data = await courseService.compareCourses(ids);

            setComparisonData(data);
            setShowComparison(true);

            setTimeout(() => {
                document
                    .getElementById("comparison-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);

        } catch (err) {
            console.error("Failed to fetch comparison", err);
        } finally {
            setComparisonLoading(false);
        }
    };

    useEffect(() => {
        const fetchPopularComparisons = async () => {
            try {
                const res = await courseService.popularCourses();

                const mapped: PopularComparisonPair[] = res.map(item => ({
                    course1: {
                        id: item.courseId1,
                        name: item.courseName1,
                        description: item.description1,
                        code: item.courseCode1,
                    },
                    course2: {
                        id: item.courseId2,
                        name: item.courseName2,
                        description: item.description2,
                        code: item.courseCode2,
                    },
                    popularity: item.popularity,
                }));

                setPopularComparisons(mapped);

            } catch (err) {
                console.error("Failed to load popular comparisons", err);
            }
        };

        fetchPopularComparisons();
    }, []);


    const activeCourses = comparisonData;

    // const handleTopCollegesCompare = (courseIds: string[]) => {
    //     // Find courses by IDs
    //     const courses = courseIds.map(id => coursesData.find(c => c.id === id)).filter((c): c is Course => c !== null);

    //     // Reset all slots and add fresh courses
    //     const newCourses: (Course | null)[] = [null, null, null, null];
    //     courses.forEach((course, index) => {
    //         if (index < 4) {
    //             newCourses[index] = course;
    //         }
    //     });
    //     setSelectedCourses(newCourses);

    //     // Scroll to comparison section
    //     setTimeout(() => {
    //         document.getElementById('comparison-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //     }, 100);
    // };


    const handleRemoveCourse = (slotIndex: number) => {
        const newCourses = [...selectedCourses];
        newCourses[slotIndex] = null;
        setSelectedCourses(newCourses);

        const active = newCourses.filter(
            (c): c is CourseModel => c !== null
        );

        if (active.length >= 1) {
            fetchComparisonData(active);
        } else {
            setComparisonData([]);
            setShowComparison(false);
        }
    };

    const handleBookmark = (courseId: string) => {
        if (!isLoggedIn) {
            setLoginAction('bookmark');
            setIsLoginModalOpen(true);
            return;
        }

        const newBookmarks = new Set(bookmarkedCourses);
        if (newBookmarks.has(courseId)) {
            newBookmarks.delete(courseId);
        } else {
            newBookmarks.add(courseId);
        }
        setBookmarkedCourses(newBookmarks);
    };

    const handleDownload = () => {
        if (!isLoggedIn) {
            setLoginAction('download');
            setIsLoginModalOpen(true);
            return;
        }

        alert('Comparison downloaded successfully!');
    };

    const handleLogin = (email: string, password: string) => {
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <PrimaryNavigation />
            <CourseCompareHero onOpenSearch={() => handleOpenSelectionModal()} />

            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-12">
                <CourseCards
                    selectedCourses={selectedCourses}
                    onAddCourse={(index) => handleOpenSelectionModal(index)}
                    onRemoveCourse={handleRemoveCourse}
                />

                {activeCourses.length >= 1 && (
                    <motion.div
                        id="comparison-section"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-16"
                    >
                        <DetailedComparison
                            courses={activeCourses}
                            onBookmark={handleBookmark}
                            onDownload={handleDownload}
                            bookmarkedCourses={bookmarkedCourses}
                            isLoggedIn={isLoggedIn}
                        />

                        {/* Top Colleges Section - shown after detailed comparison */}
                        {/* <div className="mt-12">
                            <TopCollegesSection courses={activeCourses} onCompare={handleTopCollegesCompare} />
                        </div> */}
                    </motion.div>
                )}
            </main>
            <CourseSelectionModal
                isOpen={isSelectionModalOpen}
                onClose={handleCloseSelectionModal}
                onSelect={handleSelectCourses}
                selectedCourseIds={selectedCourses
                    .filter((c): c is CourseModel => c !== null)
                    .map(c => Number(c.id))}
                isSingleSelect={activeSlotIndex !== null}
            />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
                action={loginAction}
            />

            <PopularComparison
                popularComparisons={popularComparisons}
                onCompare={handlePopularCompare}
            />


            <FAQSection />
            <Footer />
            <BackToTop />
        </div>

    );
}