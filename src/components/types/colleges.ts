export interface College {
    id: string;
    name: string;
    location: string;
    state: string;
    type: 'Public' | 'Private' | 'Community';
    size: 'Small' | 'Medium' | 'Large';
    ranking: number;
    tuition: number;
    acceptanceRate: number;
    satRange: [number, number];
    gpaAverage: number;
    studentCount: number;
    foundedYear: number;
    majors: string[];
    image: string;
    description: string;
    campusSize: number;
    graduationRate: number;
    studentFacultyRatio: number;
  }