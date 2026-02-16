interface UserAnswers {
  fieldOfStudy: string;
  budgetRange: string;
  campusSize: string;
  location: string;
  priorities: string[];
  learningStyle: string;
  campusLife: string;
}
interface College {
  name: string;
  location: string;
  type: string;
  strengths: string[];
  tuition: string;
  size: string;
  match: number; // Match percentage
}


export const generateRecommendations = (answers: UserAnswers): College[] => {
  // Sample college data - in a real app, this would come from a database
  const colleges: College[] = [
    {
      name: 'Stanford University',
      location: 'California',
      type: 'Private Research University',
      strengths: ['Cutting-edge research', 'Silicon Valley connections', 'Entrepreneurship programs'],
      tuition: '$60,000+/year',
      size: 'Large',
      match: 0
    },
    {
      name: 'Massachusetts Institute of Technology',
      location: 'Massachusetts',
      type: 'Private Research University',
      strengths: ['World-class engineering', 'Innovation focus', 'Strong alumni network'],
      tuition: '$60,000+/year',
      size: 'Medium',
      match: 0
    },
    {
      name: 'University of California, Berkeley',
      location: 'California',
      type: 'Public Research University',
      strengths: ['Research excellence', 'Diverse programs', 'Strong academics'],
      tuition: '$40,000-$60,000/year',
      size: 'Large',
      match: 0
    },
    {
      name: 'Williams College',
      location: 'Massachusetts',
      type: 'Private Liberal Arts',
      strengths: ['Small class sizes', 'Close faculty relationships', 'Strong academics'],
      tuition: '$60,000+/year',
      size: 'Small',
      match: 0
    },
    {
      name: 'University of Texas at Austin',
      location: 'Texas',
      type: 'Public Research University',
      strengths: ['Strong programs', 'Research opportunities', 'Vibrant campus life'],
      tuition: '$20,000-$40,000/year',
      size: 'Large',
      match: 0
    },
    {
      name: 'Pomona College',
      location: 'California',
      type: 'Private Liberal Arts',
      strengths: ['Academic excellence', 'Small classes', 'Beautiful campus'],
      tuition: '$60,000+/year',
      size: 'Small',
      match: 0
    },
    {
      name: 'Georgia Institute of Technology',
      location: 'Georgia',
      type: 'Public Research University',
      strengths: ['Top engineering programs', 'Research opportunities', 'Industry connections'],
      tuition: '$20,000-$40,000/year',
      size: 'Large',
      match: 0
    },
    {
      name: 'Carleton College',
      location: 'Minnesota',
      type: 'Private Liberal Arts',
      strengths: ['Strong academics', 'Collaborative environment', 'Liberal arts focus'],
      tuition: '$60,000+/year',
      size: 'Small',
      match: 0
    }
  ];

  // Calculate match scores based on user preferences
  const scoredColleges = colleges.map(college => {
    let score = 0;
    let maxScore = 0;

    // Field of study matching
    maxScore += 25;
    if (answers.fieldOfStudy === 'Engineering & Technology' &&
      (college.name.includes('MIT') || college.name.includes('Georgia Institute') || college.name.includes('Stanford'))) {
      score += 25;
    } else if (answers.fieldOfStudy === 'Business & Economics' &&
      (college.name.includes('Stanford') || college.name.includes('Berkeley'))) {
      score += 20;
    } else if (answers.fieldOfStudy === 'Arts & Humanities' &&
      (college.name.includes('Williams') || college.name.includes('Pomona') || college.name.includes('Carleton'))) {
      score += 25;
    } else {
      score += 10;
    }

    // Budget matching
    maxScore += 20;
    const budgetMapping: { [key: string]: string[] } = {
      'Under $20,000/year': [],
      '$20,000 - $40,000/year': ['University of Texas at Austin', 'Georgia Institute of Technology'],
      '$40,000 - $60,000/year': ['University of California, Berkeley'],
      '$60,000+/year': ['Stanford University', 'MIT', 'Williams College', 'Pomona College', 'Carleton College']
    };

    const budgetMatches = budgetMapping[answers.budgetRange] || [];
    if (budgetMatches.some(name => college.name.includes(name))) {
      score += 20;
    } else {
      score += 5;
    }

    // Campus size matching
    maxScore += 15;
    if (answers.campusSize.toLowerCase().includes(college.size.toLowerCase())) {
      score += 15;
    } else {
      score += 5;
    }

    // Location preference
    maxScore += 15;
    if (answers.location === 'Major city' && ['Stanford', 'MIT', 'Berkeley'].some(name => college.name.includes(name))) {
      score += 15;
    } else if (answers.location === 'Small town/Rural' && ['Williams', 'Carleton'].some(name => college.name.includes(name))) {
      score += 15;
    } else if (answers.location === 'Coastal areas' && college.location === 'California') {
      score += 12;
    } else {
      score += 8;
    }

    // Priorities matching
    maxScore += 15;
    if (answers.priorities.includes('Research opportunities') && college.type.includes('Research')) {
      score += 8;
    }
    if (answers.priorities.includes('Small class sizes') && college.size === 'Small') {
      score += 7;
    }
    if (answers.priorities.includes('Academic reputation')) {
      score += 10;
    }

    // Learning style and campus life
    maxScore += 10;
    if (answers.learningStyle === 'Research-focused' && college.type.includes('Research')) {
      score += 5;
    }
    if (answers.campusLife === 'Close-knit community' && college.size === 'Small') {
      score += 5;
    }
    score += 5; // Base score for other preferences

    const matchPercentage = Math.round((score / maxScore) * 100);
    return { ...college, match: matchPercentage };
  });

  // Sort by match percentage and return top 6
  return scoredColleges
    .sort((a, b) => b.match - a.match)
    .slice(0, 6);
};