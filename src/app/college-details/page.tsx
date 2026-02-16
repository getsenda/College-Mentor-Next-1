import { Suspense } from "react";
import CollegeDetails from "@/components/colleges/CollegeDetails";

export default function CollegeDetailsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CollegeDetails />
        </Suspense>
    );
}
