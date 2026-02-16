// models/CourseSearch.model.ts

import { CourseSearchResponse1 } from "../types/course";
import { CourseModel } from "./coursemodel";



export class CourseSearchModel {
    total: number;
    next: string | null;
    previous: string | null;
    courses: CourseModel[];

    constructor(response: CourseSearchResponse1) {
        this.total = response.count;
        this.next = response.next;
        this.previous = response.previous;
        this.courses = response.results.map(
            course => new CourseModel(course)
        );
    }
}
