import { Suspense } from "react";
import CollegeCompareMain from "@/components/colleges/CollegeCompareMain";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function CollegeComparePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CollegeCompareMain />
            <Footer />
            <BackToTop />
        </Suspense>
    );
}
