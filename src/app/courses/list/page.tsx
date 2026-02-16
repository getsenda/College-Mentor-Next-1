import { Suspense } from "react";
import CourseListing from "@/components/courses/CourseListing";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function CourseListingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CourseListing />
            <Footer />
            <BackToTop />
        </Suspense>
    );
}
