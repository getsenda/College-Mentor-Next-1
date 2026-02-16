export interface UserAnswers {
  fieldOfStudy: string;
  location: string;
  budgetRange: string;
  campusSize: string;
  priorities: string[];
  learningStyle: string;
  careerGoals: string;
  campusLife: string;
}


export interface Question {
  key: keyof UserAnswers;
  question: string;
  type: 'single' | 'multiple';
  options: string[];
}

export const questions: Question[] = [
  {
    key: 'fieldOfStudy',
    question: 'What field of study interests you most?',
    type: 'single',
    options: [
      'Engineering & Technology',
      'Business & Economics',
      'Arts & Humanities',
      'Health & Medicine',
      'Social Sciences',
      'Natural Sciences',
      'Education',
      'Undecided - Want to explore'
    ]
  },
  {
    key: 'location',
    question: 'Where would you prefer to study?',
    type: 'single',
    options: [
      'In-state (home state)',
      'Anywhere in the US',
      'Major city',
      'Small town/Rural',
      'Coastal areas',
      'Mountain regions',
      'International options',
      'No preference'
    ]
  },
  {
    key: 'budgetRange',
    question: 'What\'s your expected budget for college?',
    type: 'single',
    options: [
      'Under $20,000/year',
      '$20,000 - $40,000/year',
      '$40,000 - $60,000/year',
      '$60,000+/year',
      'Need significant financial aid',
      'Looking for scholarships',
      'Budget is flexible'
    ]
  },
  {
    key: 'campusSize',
    question: 'What size campus appeals to you?',
    type: 'single',
    options: [
      'Small (Under 5,000 students)',
      'Medium (5,000-15,000 students)',
      'Large (15,000+ students)',
      'No preference'
    ]
  },
  {
    key: 'priorities',
    question: 'What are your top priorities for college? (Select all that apply)',
    type: 'multiple',
    options: [
      'Academic reputation',
      'Research opportunities',
      'Campus life & activities',
      'Athletic programs',
      'Internship connections',
      'Study abroad programs',
      'Diverse student body',
      'Small class sizes',
      'Strong alumni network',
      'Career services'
    ]
  },
  {
    key: 'learningStyle',
    question: 'What learning environment do you prefer?',
    type: 'single',
    options: [
      'Traditional lectures',
      'Hands-on/Practical learning',
      'Discussion-based classes',
      'Independent study',
      'Group projects',
      'Online/Hybrid learning',
      'Research-focused'
    ]
  },
  {
    key: 'careerGoals',
    question: 'What are your post-graduation plans?',
    type: 'single',
    options: [
      'Enter workforce immediately',
      'Graduate/Professional school',
      'Start my own business',
      'Work in non-profit sector',
      'Government/Public service',
      'Still exploring options'
    ]
  },
  {
    key: 'campusLife',
    question: 'What type of campus atmosphere do you prefer?',
    type: 'single',
    options: [
      'High-energy & social',
      'Academic & intellectual',
      'Balanced social/academic',
      'Close-knit community',
      'Diverse & multicultural',
      'Traditional college experience',
      'Modern & innovative'
    ]
  }
];