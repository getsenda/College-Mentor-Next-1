import { Suspense } from "react";
import CourseDetails from "@/components/courses/CourseDetail";

export default function CourseDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CourseDetails />
        </Suspense>
    );
}
