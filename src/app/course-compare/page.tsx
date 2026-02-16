import { Suspense } from "react";
import CourseCompareMain from "@/components/courses/CourseCompare/CourseScreenMain";

export default function CourseComparePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CourseCompareMain />
        </Suspense>
    );
}
