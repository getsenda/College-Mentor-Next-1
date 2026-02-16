// import { Course } from "../courses/CourseCompare/CourseScreenMain";

import { logger } from "@/utils/logger";


// export const coursesData: Course[] = [
//   {
//     id: 'btech',
//     name: 'B.Tech',
//     fullName: 'Bachelor of Technology',
//     degreeType: 'Undergraduate',
//     stream: 'Engineering',
//     duration: '4 Years',
//     coreFocus: 'Technical and engineering skills with hands-on practical training',
    
//     minMarks: '60-70% in 10+2 (Science with Mathematics)',
//     subjectsRequired: ['Physics', 'Chemistry', 'Mathematics'],
//     entranceExams: ['JEE Main', 'JEE Advanced', 'WBJEE', 'KEAM', 'MHT CET', 'AP EAMCET', 'TS EAMCET', 'BITSAT', 'VITEEE', 'SRMJEEE'],
    
//     subjects: [
//       'Engineering Mathematics',
//       'Engineering Physics',
//       'Engineering Chemistry',
//       'Programming Languages (C, C++, Java, Python)',
//       'Data Structures & Algorithms',
//       'Computer Networks',
//       'Digital Electronics',
//       'Thermodynamics',
//       'Engineering Mechanics',
//       'Database Management Systems',
//       'Operating Systems',
//       'Machine Design'
//     ],
//     specializations: [
//       'Computer Science Engineering (CSE)',
//       'Electronics & Communication (ECE)',
//       'Mechanical Engineering',
//       'Civil Engineering',
//       'Electrical Engineering',
//       'Artificial Intelligence & Machine Learning',
//       'Information Technology',
//       'Chemical Engineering',
//       'Biotechnology Engineering',
//       'Aeronautical Engineering',
//       'Nanotechnology',
//       'Food Technology'
//     ],
//     hasInternship: true,
//     hasProject: true,
    
//     avgFees: '₹6 Lakhs/year',
//     feesRange: { min: '₹2 Lakhs', max: '₹19 Lakhs' },
    
//     topColleges: [
//       { name: 'IIT Bombay', location: 'Mumbai', fees: '₹8-20 Lakhs' },
//       { name: 'IIT Delhi', location: 'New Delhi', fees: '₹8-8.1 Lakhs' },
//       { name: 'IIT Madras', location: 'Chennai', fees: '₹5.31-10 Lakhs' },
//       { name: 'IIT Kanpur', location: 'Kanpur', fees: '₹8-8.38 Lakhs' },
//       { name: 'IIT Roorkee', location: 'Roorkee', fees: '₹8-10.71 Lakhs' },
//       { name: 'NIT Trichy', location: 'Tiruchirappalli', fees: '₹5 Lakhs' }
//     ],
    
//     jobRoles: [
//       'Software Engineer',
//       'Data Scientist',
//       'Data Analyst',
//       'Data Engineer',
//       'AI/ML Engineer',
//       'Mechanical Engineer',
//       'Civil Engineer',
//       'Chemical Engineer',
//       'Petroleum Engineer',
//       'Electrical Engineer',
//       'Biomedical Engineer',
//       'Aeronautical Engineer'
//     ],
//     topRecruiters: ['Google', 'Apple', 'Microsoft', 'Amazon', 'ISRO', 'Hindustan Unilever Ltd', 'TCS', 'Infosys', 'Wipro', 'Adobe', 'Samsung'],
//     hiringIndustries: ['IT & Software', 'Manufacturing', 'Construction', 'Automobile', 'Aerospace', 'Telecom', 'Energy'],
    
//     avgSalary: '₹7.7 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 7.7 },
//       { year: '2-4 Years', amount: 10 },
//       { year: '5-7 Years', amount: 15 },
//       { year: '8+ Years', amount: 22 }
//     ],
    
//     higherStudyOptions: ['M.Tech', 'MBA', 'MS abroad', 'Ph.D.', 'Executive MBA'],
//     emergingFields: [
//       'Artificial Intelligence',
//       'Machine Learning',
//       'Blockchain Technology',
//       'IoT Engineering',
//       'Cybersecurity',
//       'Cloud Computing',
//       'Quantum Computing',
//       'Robotics'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.5/5 (Highly Positive)',
//       totalReviews: '25,000+ Reviews',
//       highlights: ['Excellent placement opportunities', 'Industry-relevant curriculum', 'Strong alumni network', 'Good infrastructure in top colleges']
//     },
    
//     description: 'B.Tech is a professional undergraduate engineering degree focused on practical and technical skills. It offers specializations in various fields and prepares students for high-paying technical careers with starting packages ranging from ₹30-60 LPA in top recruitment drives.'
//   },
//   {
//     id: 'bsc',
//     name: 'B.Sc',
//     fullName: 'Bachelor of Science',
//     degreeType: 'Undergraduate',
//     stream: 'Science',
//     duration: '3 Years',
//     coreFocus: 'Theoretical knowledge and research-oriented learning in science',
    
//     minMarks: '55-60% in 10+2 (Science stream)',
//     subjectsRequired: ['Physics', 'Chemistry', 'Biology/Mathematics (PCM/PCB/PCMB)'],
//     entranceExams: ['CUET', 'MHT CET', 'KCET', 'ICAR AIEEA', 'CG PAT', 'IPU CET', 'BHU UET', 'NPAT'],
    
//     subjects: [
//       'Physics (Mechanics, Optics, Thermodynamics)',
//       'Chemistry (Organic, Inorganic, Physical)',
//       'Mathematics (Calculus, Linear Algebra)',
//       'Biology (Botany, Zoology)',
//       'Computer Science',
//       'Statistics',
//       'Environmental Science',
//       'Biochemistry',
//       'Foundation Courses',
//       'Research Methods'
//     ],
//     specializations: [
//       'Physics',
//       'Chemistry',
//       'Mathematics',
//       'Computer Science',
//       'Biotechnology',
//       'Microbiology',
//       'Zoology',
//       'Botany',
//       'Data Science',
//       'Forensic Science',
//       'Environmental Science',
//       'Biochemistry',
//       'Genetics',
//       'Neuroscience'
//     ],
//     hasInternship: true,
//     hasProject: true,
    
//     avgFees: '₹1 Lakh/year',
//     feesRange: { min: '₹540', max: '₹38.96 Lakhs' },
    
//     topColleges: [
//       { name: 'Delhi University', location: 'Delhi', fees: '₹540-2.4 Lakhs' },
//       { name: 'Banaras Hindu University', location: 'Varanasi', fees: '₹600-35,500' },
//       { name: 'BITS Pilani', location: 'Pilani', fees: '₹19.9 Lakhs' },
//       { name: 'Christ University', location: 'Bangalore', fees: '₹1.2-3 Lakhs' },
//       { name: 'IIT Roorkee', location: 'Roorkee', fees: '₹8.06 Lakhs' },
//       { name: 'Chennai Mathematical Institute', location: 'Chennai', fees: '₹6 Lakhs' }
//     ],
    
//     jobRoles: [
//       'Research Scientist',
//       'Lab Technician',
//       'Data Analyst',
//       'Quality Controller',
//       'Scientific Officer',
//       'Teacher/Lecturer',
//       'Biochemist',
//       'Statistician',
//       'Lab Chemist',
//       'Professor'
//     ],
//     topRecruiters: ['TCS', 'HCL Tech', 'Wipro', 'Amazon', 'Biocon', 'Cipla', 'ISRO', 'DRDO', 'Food Corporation of India', 'Research Labs'],
//     hiringIndustries: ['Research & Development', 'Pharmaceuticals', 'Education', 'Healthcare', 'Government Labs', 'IT', 'Agriculture'],
    
//     avgSalary: '₹3 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 3 },
//       { year: '2-4 Years', amount: 5.5 },
//       { year: '5-7 Years', amount: 8 },
//       { year: '8+ Years', amount: 12 }
//     ],
    
//     higherStudyOptions: ['M.Sc', 'Ph.D.', 'MBA', 'MCA', 'B.Ed', 'Research Programs', 'M.S. in Mathematical Sciences'],
//     emergingFields: [
//       'Data Science',
//       'Bioinformatics',
//       'Nanotechnology',
//       'Environmental Science',
//       'Computational Biology',
//       'Forensic Science',
//       'Artificial Intelligence',
//       'Cybersecurity'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.2/5 (Positive)',
//       totalReviews: '18,000+ Reviews',
//       highlights: ['Strong foundation for research', 'Affordable fees', 'Good for govt jobs preparation', 'Flexible specialization options']
//     },
    
//     description: 'B.Sc is a foundational undergraduate degree in science that emphasizes theoretical knowledge and research. It provides a strong base for higher studies, research careers, and government sector jobs.'
//   },
//   {
//     id: 'bcom',
//     name: 'B.Com',
//     fullName: 'Bachelor of Commerce',
//     degreeType: 'Undergraduate',
//     stream: 'Commerce',
//     duration: '3 Years',
//     coreFocus: 'Accounting, finance, taxation, and business management fundamentals',
    
//     minMarks: '45% in 10+2',
//     subjectsRequired: ['Any stream (Commerce preferred)'],
//     entranceExams: ['CUET', 'IPU CET', 'NPAT', 'DU JAT', 'UGAT'],
    
//     subjects: [
//       'Financial Accounting',
//       'Business Law',
//       'Corporate Accounting',
//       'Income Tax',
//       'Auditing',
//       'Economics',
//       'Business Statistics',
//       'Cost Accounting'
//     ],
//     specializations: [
//       'Accounting & Finance',
//       'Banking & Insurance',
//       'Taxation',
//       'E-Commerce',
//       'Financial Markets',
//       'International Business',
//       'Marketing',
//       'Investment Management'
//     ],
//     hasInternship: true,
//     hasProject: false,
    
//     avgFees: '₹75,000/year',
//     feesRange: { min: '₹20,000', max: '₹2 Lakhs' },
    
//     topColleges: [
//       { name: 'SRCC (Delhi)', location: 'Delhi', fees: '₹35,000/year' },
//       { name: 'LSR (Delhi)', location: 'Delhi', fees: '₹30,000/year' },
//       { name: 'Loyola College', location: 'Chennai', fees: '₹45,000/year' },
//       { name: 'Christ University', location: 'Bangalore', fees: '₹1.5 Lakhs/year' },
//       { name: 'St. Xavier\'s', location: 'Mumbai', fees: '₹50,000/year' }
//     ],
    
//     jobRoles: [
//       'Chartered Accountant',
//       'Accountant',
//       'Financial Analyst',
//       'Tax Consultant',
//       'Auditor',
//       'Investment Banker',
//       'Banking Officer',
//       'Finance Manager'
//     ],
//     topRecruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'ICICI Bank', 'HDFC Bank', 'SBI', 'Axis Bank'],
//     hiringIndustries: ['Banking & Finance', 'Consulting', 'Insurance', 'Taxation', 'Accounting Firms', 'Corporate Sector'],
    
//     avgSalary: '₹4.5 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 4.5 },
//       { year: '2-4 Years', amount: 6.5 },
//       { year: '5-7 Years', amount: 10 },
//       { year: '8+ Years', amount: 16 }
//     ],
    
//     higherStudyOptions: ['M.Com', 'MBA', 'CA', 'CS', 'CMA', 'CFA'],
//     emergingFields: [
//       'FinTech',
//       'Digital Banking',
//       'Financial Analytics',
//       'Cryptocurrency & Blockchain',
//       'Investment Analysis',
//       'Risk Management'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.0/5 (Positive)',
//       totalReviews: '15,000+ Reviews',
//       highlights: ['Excellent for CA/CS preparation', 'Affordable education', 'Good job opportunities in banking', 'Strong commerce foundation']
//     },
    
//     description: 'B.Com is a comprehensive undergraduate program in commerce and finance. It prepares students for careers in accounting, taxation, finance, and business management with strong analytical skills.'
//   },
//   {
//     id: 'bba',
//     name: 'BBA',
//     fullName: 'Bachelor of Business Administration',
//     degreeType: 'Undergraduate',
//     stream: 'Management',
//     duration: '3 Years',
//     coreFocus: 'Business management, leadership, and entrepreneurship skills',
    
//     minMarks: '50% in 10+2',
//     subjectsRequired: ['Any stream'],
//     entranceExams: ['IPMAT', 'DU JAT', 'NPAT', 'SET', 'UGAT', 'CUET'],
    
//     subjects: [
//       'Business Management',
//       'Marketing Management',
//       'Human Resource Management',
//       'Financial Management',
//       'Operations Management',
//       'Business Communication',
//       'Organizational Behavior',
//       'Strategic Management'
//     ],
//     specializations: [
//       'Marketing',
//       'Finance',
//       'Human Resources',
//       'Operations',
//       'International Business',
//       'Digital Marketing',
//       'Entrepreneurship',
//       'Business Analytics'
//     ],
//     hasInternship: true,
//     hasProject: true,
    
//     avgFees: '₹3.5 Lakhs/year',
//     feesRange: { min: '₹1 Lakh', max: '₹8 Lakhs' },
    
//     topColleges: [
//       { name: 'Shaheed Sukhdev College', location: 'Delhi', fees: '₹50,000/year' },
//       { name: 'Christ University', location: 'Bangalore', fees: '₹2.5 Lakhs/year' },
//       { name: 'Symbiosis Pune', location: 'Pune', fees: '₹4.5 Lakhs/year' },
//       { name: 'NMIMS', location: 'Mumbai', fees: '₹6 Lakhs/year' },
//       { name: 'IIM Indore (5yr)', location: 'Indore', fees: '₹5 Lakhs/year' }
//     ],
    
//     jobRoles: [
//       'Business Analyst',
//       'Marketing Manager',
//       'HR Manager',
//       'Operations Manager',
//       'Sales Executive',
//       'Brand Manager',
//       'Business Development Manager',
//       'Entrepreneur'
//     ],
//     topRecruiters: ['Accenture', 'IBM', 'Flipkart', 'Amazon', 'Asian Paints', 'Nestle', 'HUL', 'Deloitte'],
//     hiringIndustries: ['Consulting', 'E-commerce', 'FMCG', 'Retail', 'Banking', 'Manufacturing', 'Startups'],
    
//     avgSalary: '₹5.5 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 5.5 },
//       { year: '2-4 Years', amount: 8 },
//       { year: '5-7 Years', amount: 12 },
//       { year: '8+ Years', amount: 18 }
//     ],
    
//     higherStudyOptions: ['MBA', 'PGDM', 'Executive MBA', 'MS in Management'],
//     emergingFields: [
//       'Digital Marketing',
//       'Business Analytics',
//       'E-commerce Management',
//       'Supply Chain Analytics',
//       'Growth Hacking',
//       'Product Management'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.1/5 (Positive)',
//       totalReviews: '12,000+ Reviews',
//       highlights: ['Good management foundation', 'Industry internships', 'Entrepreneurship focus', 'Direct MBA pathway']
//     },
    
//     description: 'BBA is a management-oriented degree focusing on business administration and entrepreneurship. It develops leadership, communication, and managerial skills essential for corporate careers.'
//   },
//   {
//     id: 'bca',
//     name: 'BCA',
//     fullName: 'Bachelor of Computer Applications',
//     degreeType: 'Undergraduate',
//     stream: 'Computer Science',
//     duration: '3 Years',
//     coreFocus: 'Computer applications, programming, and software development',
    
//     minMarks: '50% in 10+2',
//     subjectsRequired: ['Mathematics (preferred but not mandatory in all colleges)'],
//     entranceExams: ['CUET', 'IPU CET', 'BIT SAT', 'UGAT', 'NPAT'],
    
//     subjects: [
//       'Programming in C/C++',
//       'Java Programming',
//       'Database Management Systems',
//       'Web Development (HTML, CSS, JS)',
//       'Software Engineering',
//       'Data Structures',
//       'Computer Networks',
//       'Operating Systems'
//     ],
//     specializations: [
//       'Web Development',
//       'Mobile App Development',
//       'Data Science',
//       'Cybersecurity',
//       'Cloud Computing',
//       'AI & Machine Learning',
//       'Game Development',
//       'Blockchain'
//     ],
//     hasInternship: true,
//     hasProject: true,
    
//     avgFees: '₹1.5 Lakhs/year',
//     feesRange: { min: '₹40,000', max: '₹3 Lakhs' },
    
//     topColleges: [
//       { name: 'Christ University', location: 'Bangalore', fees: '₹1.8 Lakhs/year' },
//       { name: 'Symbiosis', location: 'Pune', fees: '₹2 Lakhs/year' },
//       { name: 'Presidency College', location: 'Bangalore', fees: '₹80,000/year' },
//       { name: 'Kristu Jayanti College', location: 'Bangalore', fees: '₹70,000/year' },
//       { name: 'IIM Indore (5yr BCA+MBA)', location: 'Indore', fees: '₹5 Lakhs/year' }
//     ],
    
//     jobRoles: [
//       'Software Developer',
//       'Web Developer',
//       'System Analyst',
//       'Database Administrator',
//       'Network Administrator',
//       'App Developer',
//       'UI/UX Designer',
//       'Software Tester'
//     ],
//     topRecruiters: ['TCS', 'Infosys', 'Cognizant', 'HCL', 'Tech Mahindra', 'IBM', 'Accenture', 'Capgemini'],
//     hiringIndustries: ['IT & Software', 'E-commerce', 'Consulting', 'Banking Tech', 'Startups', 'Game Development'],
    
//     avgSalary: '₹4.5 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 4.5 },
//       { year: '2-4 Years', amount: 7 },
//       { year: '5-7 Years', amount: 12 },
//       { year: '8+ Years', amount: 18 }
//     ],
    
//     higherStudyOptions: ['MCA', 'M.Sc IT', 'MBA', 'MS abroad', 'Data Science Programs'],
//     emergingFields: [
//       'Full Stack Development',
//       'DevOps',
//       'Cloud Architecture',
//       'Blockchain Development',
//       'AI/ML Engineering',
//       'Cybersecurity'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.3/5 (Positive)',
//       totalReviews: '14,000+ Reviews',
//       highlights: ['Practical programming skills', 'Good IT placement', 'Alternative to B.Tech', 'Industry-relevant curriculum']
//     },
    
//     description: 'BCA is a specialized undergraduate program in computer applications and software development. It provides practical IT skills and is a popular alternative to B.Tech for computer science enthusiasts.'
//   },
//   {
//     id: 'mbbs',
//     name: 'MBBS',
//     fullName: 'Bachelor of Medicine, Bachelor of Surgery',
//     degreeType: 'Undergraduate',
//     stream: 'Medical',
//     duration: '5.5 Years',
//     coreFocus: 'Medical science, patient care, and clinical practice',
    
//     minMarks: '50% in 10+2 (PCB)',
//     subjectsRequired: ['Physics', 'Chemistry', 'Biology'],
//     entranceExams: ['NEET-UG'],
    
//     subjects: [
//       'Anatomy',
//       'Physiology',
//       'Biochemistry',
//       'Pathology',
//       'Pharmacology',
//       'Microbiology',
//       'Forensic Medicine',
//       'Community Medicine',
//       'Surgery',
//       'Medicine'
//     ],
//     specializations: [
//       'General Medicine',
//       'Surgery',
//       'Pediatrics',
//       'Gynecology',
//       'Orthopedics',
//       'Dermatology',
//       'Radiology',
//       'Anesthesiology'
//     ],
//     hasInternship: true,
//     hasProject: false,
    
//     avgFees: '₹10 Lakhs/year',
//     feesRange: { min: '₹50,000', max: '₹25 Lakhs' },
    
//     topColleges: [
//       { name: 'AIIMS Delhi', location: 'New Delhi', fees: '₹5,000/year' },
//       { name: 'CMC Vellore', location: 'Vellore', fees: '₹60,000/year' },
//       { name: 'JIPMER', location: 'Puducherry', fees: 'Free' },
//       { name: 'AFMC', location: 'Pune', fees: 'Free (Bond)' },
//       { name: 'Maulana Azad', location: 'Delhi', fees: '₹7,000/year' }
//     ],
    
//     jobRoles: [
//       'Medical Doctor',
//       'Surgeon',
//       'Physician',
//       'Medical Researcher',
//       'Public Health Specialist',
//       'Medical Officer',
//       'Consultant',
//       'Clinical Professor'
//     ],
//     topRecruiters: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Government Hospitals', 'WHO'],
//     hiringIndustries: ['Healthcare', 'Hospitals', 'Research', 'Public Health', 'Pharmaceuticals', 'Medical Education'],
    
//     avgSalary: '₹9 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 9 },
//       { year: '2-4 Years', amount: 12 },
//       { year: '5-7 Years', amount: 18 },
//       { year: '8+ Years', amount: 30 }
//     ],
    
//     higherStudyOptions: ['MD', 'MS', 'DNB', 'DM', 'MCh', 'Fellowship programs'],
//     emergingFields: [
//       'Telemedicine',
//       'Medical AI',
//       'Genomic Medicine',
//       'Regenerative Medicine',
//       'Sports Medicine',
//       'Precision Medicine'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.7/5 (Highly Positive)',
//       totalReviews: '20,000+ Reviews',
//       highlights: ['Noble profession', 'High job security', 'Excellent earning potential', 'Government college seats highly valued']
//     },
    
//     description: 'MBBS is a professional medical degree that trains students to become medical doctors. It combines theoretical knowledge with clinical practice through extensive hospital training and internship.'
//   },
//   {
//     id: 'llb',
//     name: 'LLB',
//     fullName: 'Bachelor of Laws',
//     degreeType: 'Undergraduate',
//     stream: 'Law',
//     duration: '3 Years',
//     coreFocus: 'Legal principles, judicial procedures, and law practice',
    
//     minMarks: '45-50% in Graduation',
//     subjectsRequired: ['Any Graduate Degree'],
//     entranceExams: ['CLAT', 'LSAT', 'AILET', 'State-level Law Entrance'],
    
//     subjects: [
//       'Constitutional Law',
//       'Criminal Law',
//       'Contract Law',
//       'Corporate Law',
//       'Family Law',
//       'Intellectual Property Rights',
//       'International Law',
//       'Environmental Law'
//     ],
//     specializations: [
//       'Corporate Law',
//       'Criminal Law',
//       'Cyber Law',
//       'Tax Law',
//       'IPR Law',
//       'Human Rights',
//       'International Law',
//       'Environmental Law'
//     ],
//     hasInternship: true,
//     hasProject: false,
    
//     avgFees: '₹1.5 Lakhs/year',
//     feesRange: { min: '₹50,000', max: '₹3 Lakhs' },
    
//     topColleges: [
//       { name: 'Faculty of Law, DU', location: 'Delhi', fees: '₹20,000/year' },
//       { name: 'Government Law College', location: 'Mumbai', fees: '₹15,000/year' },
//       { name: 'Symbiosis Law School', location: 'Pune', fees: '₹2.5 Lakhs/year' },
//       { name: 'Amity Law School', location: 'Noida', fees: '₹1.8 Lakhs/year' },
//       { name: 'ILS Law College', location: 'Pune', fees: '₹80,000/year' }
//     ],
    
//     jobRoles: [
//       'Lawyer/Advocate',
//       'Legal Advisor',
//       'Corporate Lawyer',
//       'Judge',
//       'Legal Analyst',
//       'Public Prosecutor',
//       'Legal Consultant',
//       'Notary'
//     ],
//     topRecruiters: ['Law Firms', 'Corporate Legal Departments', 'Courts', 'Legal Consultancies', 'Government Legal Services'],
//     hiringIndustries: ['Legal Services', 'Corporate', 'Government', 'NGOs', 'Consulting', 'Banking & Finance'],
    
//     avgSalary: '₹6 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 6 },
//       { year: '2-4 Years', amount: 9 },
//       { year: '5-7 Years', amount: 15 },
//       { year: '8+ Years', amount: 25 }
//     ],
    
//     higherStudyOptions: ['LLM', 'MBA', 'Ph.D. in Law', 'Judicial Services'],
//     emergingFields: [
//       'Cyber Law',
//       'Data Protection Law',
//       'Space Law',
//       'Sports Law',
//       'Entertainment Law',
//       'Medical Law'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.2/5 (Positive)',
//       totalReviews: '10,000+ Reviews',
//       highlights: ['Prestigious profession', 'Good courtroom exposure', 'Diverse career options', 'High earning potential in corporate law']
//     },
    
//     description: 'LLB is a professional law degree that prepares students for legal practice. It covers various aspects of law and legal procedures, essential for a career in the legal field and judiciary.'
//   },
//   {
//     id: 'mba',
//     name: 'MBA',
//     fullName: 'Master of Business Administration',
//     degreeType: 'Postgraduate',
//     stream: 'Management',
//     duration: '2 Years',
//     coreFocus: 'Advanced business management, strategy, and leadership',
    
//     minMarks: '50% in Graduation',
//     subjectsRequired: ['Any Graduate Degree'],
//     entranceExams: ['CAT', 'XAT', 'GMAT', 'CMAT', 'MAT', 'SNAP'],
    
//     subjects: [
//       'Business Strategy',
//       'Marketing Management',
//       'Financial Management',
//       'Operations Management',
//       'Human Resource Management',
//       'Business Analytics',
//       'Entrepreneurship',
//       'Corporate Governance'
//     ],
//     specializations: [
//       'Finance',
//       'Marketing',
//       'HR',
//       'Operations',
//       'Business Analytics',
//       'International Business',
//       'IT Management',
//       'Healthcare Management'
//     ],
//     hasInternship: true,
//     hasProject: true,
    
//     avgFees: '₹12 Lakhs/year',
//     feesRange: { min: '₹3 Lakhs', max: '₹25 Lakhs' },
    
//     topColleges: [
//       { name: 'IIM Ahmedabad', location: 'Ahmedabad', fees: '₹23 Lakhs/year' },
//       { name: 'IIM Bangalore', location: 'Bangalore', fees: '₹23 Lakhs/year' },
//       { name: 'IIM Calcutta', location: 'Kolkata', fees: '₹23 Lakhs/year' },
//       { name: 'XLRI Jamshedpur', location: 'Jamshedpur', fees: '₹26 Lakhs/year' },
//       { name: 'FMS Delhi', location: 'Delhi', fees: '₹20,000/year' }
//     ],
    
//     jobRoles: [
//       'Management Consultant',
//       'Product Manager',
//       'Investment Banker',
//       'Marketing Manager',
//       'Business Analyst',
//       'Operations Manager',
//       'CEO/COO',
//       'Strategy Manager'
//     ],
//     topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Goldman Sachs', 'Amazon', 'Microsoft', 'Google'],
//     hiringIndustries: ['Consulting', 'Banking & Finance', 'IT', 'FMCG', 'E-commerce', 'Manufacturing', 'Pharma'],
    
//     avgSalary: '₹18 Lakhs/year',
//     salaryTrend: [
//       { year: 'Fresher', amount: 18 },
//       { year: '2-4 Years', amount: 25 },
//       { year: '5-7 Years', amount: 35 },
//       { year: '8+ Years', amount: 50 }
//     ],
    
//     higherStudyOptions: ['Ph.D. in Management', 'Executive MBA', 'Specialized Certifications'],
//     emergingFields: [
//       'Business Analytics',
//       'Digital Transformation',
//       'Growth Marketing',
//       'Product Management',
//       'Venture Capital',
//       'Sustainability Management'
//     ],
    
//     studentReviews: {
//       sentimentScore: '4.6/5 (Highly Positive)',
//       totalReviews: '30,000+ Reviews',
//       highlights: ['Excellent ROI', 'Strong placement record', 'Global career opportunities', 'Networking with industry leaders']
//     },
    
//     description: 'MBA is a prestigious postgraduate program that develops advanced management and leadership skills. It significantly boosts career prospects with high-paying roles in top companies.'
//   }
// ];
/**
 * Represents the salary details which can be a single string or 
 * a breakdown by degree level.
 */
export interface AverageSalary {
  [key: string]: string; // Handles "Diploma", "UG", "salary", etc.
}

/**
 * Represents the fee details. Note: The API returns varying keys 
 * (e.g., "000\nPG" or "Postgraduate") and occasionally a base "value".
 */
// export interface AverageFee {
//   value?: string;
//   [key: string]: string | undefined;
// }

// /**
//  * Main Course model representing the search results.
//  */
// export interface Course {
//   id: number;
//   name: string;
//   stream: string | null;
//   degree_types: string[];
//   entrance_exams: string[];
//   average_fee: AverageFee;
//   average_salary: AverageSalary;
// }

// /**
//  * Represents the paginated response from the courses search API.
//  */
// export interface CourseSearchResponse {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Course[];
// }

