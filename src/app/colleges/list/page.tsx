import React from 'react';
import { Metadata } from 'next';
import CollegeListing from '@/components/colleges/CollegeListing';
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Top Colleges in India 2025 - Rankings, Fees, Admission | College Mentor",
    description: "Browse through the list of top colleges in India for Engineering, Medical, Management, and more. Compare colleges by fees, placement, and ranking to find your best fit.",
    keywords: ["colleges in India", "top engineering colleges", "MBA colleges India", "medical colleges admission", "college rankings 2025"],
    openGraph: {
        title: "Best Colleges in India - Compare and Find Your Dream College",
        description: "Discover the best colleges in India with detailed information on courses, fees, and rankings.",
        images: [
            {
                url: "/assets/website images/colleges/college landing page/freepik__talk__8450.png",
                width: 1200,
                height: 630,
                alt: "College Mentor - Top Colleges in India",
            },
        ],
    },
};

export default function CollegeListPage() {
    return (
        <div className="min-h-screen bg-background">
            <main>
                <React.Suspense fallback={<div>Loading...</div>}>
                    <CollegeListing />
                </React.Suspense>
            </main>
            <Footer />
        </div>
    );
}
