// api/course.types.ts

export interface AverageSalary {
  [key: string]: string;
}

export interface AverageFee {
  value?: string;
  [key: string]: string | undefined;
}

export interface Course {
  id: number;
  name: string;
  stream: string | null;
  degree_types: string[];
  entrance_exams: string[];
  average_fee: AverageFee;
  average_salary: AverageSalary;
}

export interface CourseSearchResponse1 {
  count: number;
  next: string | null;
  previous: string | null;
  results: Course[];
}
