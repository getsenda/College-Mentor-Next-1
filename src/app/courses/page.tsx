import { Suspense } from 'react';
import CourseLanding from '@/components/CourseLanding';

const Courses = () => {
    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <main className="space-y-0">
                <Suspense fallback={<div>Loading...</div>}>
                    <CourseLanding />
                </Suspense>
            </main>
        </div>
    );
};

export default Courses;
