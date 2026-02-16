import { Suspense } from "react";
import CollegeLanding from '@/components/colleges/College-Landing-New';
export default function CollegesPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CollegeLanding />
        </Suspense>
    );
}
