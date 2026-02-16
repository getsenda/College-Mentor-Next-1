// models/Course.model.ts

export interface KeyValueInfo {
    label: string;
    value: string;
  }
  
  export class CourseModel {
    id: number;
    name: string;
    stream: string;
    degreeTypes: string[];
    entranceExams: string[];
    fees: KeyValueInfo[];
    salaries: KeyValueInfo[];
  
    constructor(raw: any) {
      this.id = raw.id;
      this.name = raw.name;
      this.stream = raw.stream ?? "General";
      this.degreeTypes = raw.degree_types ?? [];
      this.entranceExams = raw.entrance_exams ?? [];
      this.fees = CourseModel.normalize(raw.average_fee);
      this.salaries = CourseModel.normalize(raw.average_salary);
    }
  
    private static normalize(
      data: Record<string, string> = {}
    ): KeyValueInfo[] {
      return Object.entries(data)
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => ({
          label: CourseModel.clean(key),
          value: CourseModel.clean(value as string),
        }));
    }
  
    private static clean(text: string): string {
      return text
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/\n+/g, "\n")
        .trim();
    }
  }
  