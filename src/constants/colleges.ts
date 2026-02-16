import {
    Building2,
    Stethoscope,
    Briefcase,
    Palette,
    Scale,
    FlaskConical
} from "lucide-react";
import {
    FeaturedCollege,
    Stream,
    TopCollege,
    Testimonial,
    SuccessStory,
    Mentor
} from "@/types/colleges";

export const FEATURED_COLLEGES: FeaturedCollege[] = [
    {
        id: 1,
        name: "Indian Institute of Technology Delhi",
        shortName: "IIT Delhi",
        location: "New Delhi",
        description: "Premier engineering institute known for cutting-edge research and innovation.",
        secondLine: "Ranked #1 in Engineering by NIRF with 95% placement record.",
        rating: 4.8,
        reviews: 2847,
        fees: "₹2.5 Lakhs",
        placement: "₹25 LPA",
        image: "/assets/university-logos/iit.png",
        campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
        badge: "Top Ranked",
        established: 1961,
        courses: ["B.Tech", "M.Tech", "PhD"],
        websiteUrl: "https://home.iitd.ac.in/",
    },
    {
        id: 2,
        name: "Indian Institute of Management Bangalore",
        shortName: "IIM Bangalore",
        location: "Bangalore",
        description: "Leading business school offering world-class management education.",
        secondLine: "Top MBA program with excellent industry connections and placements.",
        rating: 4.9,
        reviews: 1923,
        fees: "₹24 Lakhs",
        placement: "₹35 LPA",
        image: "/assets/university-logos/iim.png",
        campusImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
        badge: "Premier",
        established: 1973,
        courses: ["MBA", "PGPM", "Executive MBA"],
        websiteUrl: "https://www.iimb.ac.in/",
    },
    {
        id: 3,
        name: "All India Institute of Medical Sciences",
        shortName: "AIIMS Delhi",
        location: "New Delhi",
        description: "India's premier medical institute with state-of-the-art facilities.",
        secondLine: "Excellence in medical education, research, and patient care since 1956.",
        rating: 4.7,
        reviews: 3156,
        fees: "₹1.2 Lakhs",
        placement: "₹15 LPA",
        image: "/assets/university-logos/aiims.png",
        campusImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
        badge: "Medical Excellence",
        established: 1956,
        courses: ["MBBS", "MD", "MS"],
        websiteUrl: "https://www.aiims.edu/",
    },
    {
        id: 4,
        name: "National Institute of Technology Trichy",
        shortName: "NIT Trichy",
        location: "Tiruchirappalli",
        description: "Leading technical institute known for engineering excellence and innovation.",
        secondLine: "Top NIT with outstanding placement record and industry partnerships.",
        rating: 4.6,
        reviews: 2134,
        fees: "₹5.5 Lakhs",
        placement: "₹22 LPA",
        image: "/assets/university-logos/bits.png",
        campusImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
        badge: "NIT Excellence",
        established: 1964,
        courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
        websiteUrl: "https://www.nitt.edu/",
    },
    {
        id: 5,
        name: "Birla Institute of Technology and Science",
        shortName: "BITS Pilani",
        location: "Pilani",
        description: "Prestigious private technical university with global recognition and alumni network.",
        secondLine: "Known for innovation, research, and excellent industry connections worldwide.",
        rating: 4.7,
        reviews: 3021,
        fees: "₹19 Lakhs",
        placement: "₹28 LPA",
        image: "/assets/university-logos/bits.png",
        campusImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
        badge: "Innovation Hub",
        established: 1964,
        courses: ["B.E", "M.E", "MBA", "M.Sc"],
        websiteUrl: "https://www.bits-pilani.ac.in/",
    },
];

export const STREAMS: Stream[] = [
    {
        id: "engineering",
        name: "Engineering",
        icon: Building2,
        colleges: 4500,
        color: "from-blue-500 to-blue-600",
        description: "Top engineering colleges across India",
    },
    {
        id: "medical",
        name: "Medical",
        icon: Stethoscope,
        colleges: 1200,
        color: "from-red-500 to-red-600",
        description: "Medical colleges and healthcare programs",
    },
    {
        id: "management",
        name: "Management",
        icon: Briefcase,
        colleges: 2800,
        color: "from-green-500 to-green-600",
        description: "Premier business schools and MBA programs",
    },
    {
        id: "arts",
        name: "Arts",
        icon: Palette,
        colleges: 850,
        color: "from-purple-500 to-purple-600",
        description: "Arts and humanities programs",
    },
    {
        id: "science",
        name: "Science",
        icon: FlaskConical,
        colleges: 1200,
        color: "from-orange-500 to-orange-600",
        description: "Science programs and research institutes",
    },
    {
        id: "law",
        name: "Law",
        icon: Scale,
        colleges: 650,
        color: "from-indigo-500 to-indigo-600",
        description: "Law schools and legal studies",
    },
];

export const TOP_COLLEGES: TopCollege[] = [
    {
        id: 1,
        name: "IIT Bombay",
        location: "Mumbai",
        rank: 1,
        rating: 4.9,
        fees: "₹2.5L",
        placement: "₹28L",
        image: "/assets/university-logos/iit.png",
        campusImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
        description: "Premier engineering institute known for cutting-edge research and innovation in technology.",
        established: 1958,
        courses: ["B.Tech", "M.Tech", "PhD", "Dual Degree"],
        websiteUrl: "https://www.iitb.ac.in/",
    },
    {
        id: 2,
        name: "IIM Ahmedabad",
        location: "Ahmedabad",
        rank: 2,
        rating: 4.8,
        fees: "₹25L",
        placement: "₹32L",
        image: "/assets/university-logos/iim.png",
        campusImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
        description:
            "Leading business school offering world-class management education and excellent industry connections.",
        established: 1961,
        courses: ["MBA", "PGPM", "Executive MBA", "Fellow Programme"],
        websiteUrl: "https://www.iima.ac.in/",
    },
    {
        id: 3,
        name: "AIIMS Delhi",
        location: "New Delhi",
        rank: 3,
        rating: 4.9,
        fees: "₹1.2L",
        placement: "₹18L",
        image: "/assets/university-logos/aiims.png",
        campusImage: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
        description: "India's premier medical institute with state-of-the-art facilities and excellence in healthcare.",
        established: 1956,
        courses: ["MBBS", "MD", "MS", "DM", "MCh"],
        websiteUrl: "https://www.aiims.edu/",
    },
    {
        id: 4,
        name: "IIT Madras",
        location: "Chennai",
        rank: 4,
        rating: 4.7,
        fees: "₹2.3L",
        placement: "₹26L",
        image: "/assets/university-logos/iit.png",
        campusImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
        description: "Leading technical institute known for engineering excellence and outstanding research contributions.",
        established: 1959,
        courses: ["B.Tech", "M.Tech", "MBA", "PhD"],
        websiteUrl: "https://www.iitm.ac.in/",
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Priya Sharma",
        college: "IIT Delhi",
        quote: "College Mentor helped me find the perfect engineering college.",
        stat: "88% students agree",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: 2,
        name: "Arjun Patel",
        college: "IIM Bangalore",
        quote: "The comparison tool made my college decision so much easier.",
        stat: "92% users recommend",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 3,
        name: "Sneha Reddy",
        college: "AIIMS Delhi",
        quote: "Amazing platform! Found my dream medical college within minutes.",
        stat: "95% success rate",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        id: 4,
        name: "Rohit Kumar",
        college: "NIT Trichy",
        quote: "The rank predictor was incredibly accurate for my JEE results.",
        stat: "90% accuracy rate",
        image: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
        id: 5,
        name: "Ananya Singh",
        college: "BITS Pilani",
        quote: "Expert mentorship guided me to the right career path.",
        stat: "94% mentorship success",
        image: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    {
        id: 6,
        name: "Vikram Joshi",
        college: "VIT Vellore",
        quote: "Scholarship finder helped me get financial aid for my studies.",
        stat: "85% scholarship success",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
];

export const SUCCESS_STORIES: SuccessStory[] = [
    {
        id: 1,
        name: "Sudheer",
        college: "Aditya University",
        quote: "I have secured admission to Aditya University",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        badge: "Merit Scholar",
        initial: "S"
    },
    {
        id: 2,
        name: "Priya Sharma",
        college: "IIT Delhi",
        quote: "Thanks to College Mentor, I got into my dream engineering college",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        badge: "Top Ranker",
        initial: "P"
    },
    {
        id: 3,
        name: "Arjun Patel",
        college: "IIM Bangalore",
        quote: "The guidance I received was invaluable for my MBA journey",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        badge: "Excellence Award",
        initial: "A"
    },
    {
        id: 4,
        name: "Ananya Singh",
        college: "BITS Pilani",
        quote: "College Mentor team helped me navigate the admission process smoothly",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        badge: "Gold Medalist",
        initial: "A"
    },
    {
        id: 5,
        name: "Rohit Kumar",
        college: "NIT Trichy",
        quote: "Found the perfect college match with expert mentorship",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        badge: "Scholar",
        initial: "R"
    },
];

export const MENTOR_GROUPS: Mentor[][] = [
    [
        {
            name: "Pasupuleti Manjusha",
            role: "Career Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
        },
        {
            name: "P. Kavya Rishitha",
            role: "Student Buddy Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
        },
        {
            name: "Vaishali CN",
            role: "Admission Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop"
        },
        {
            name: "Mounika Reddy Polu",
            role: "Career Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
        },
        {
            name: "Sowmya Venkatesh",
            role: "Student Buddy Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Dr. Rajesh Kumar",
            role: "Academic Counselor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
        },
        {
            name: "Meera Desai",
            role: "Engineering Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
        },
        {
            name: "Amit Sharma",
            role: "Technical Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop"
        },
        {
            name: "Divya Narayan",
            role: "Study Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop"
        },
        {
            name: "Karthik Reddy",
            role: "Placement Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Anita Verma",
            role: "MBA Counselor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
        },
        {
            name: "Vikram Singh",
            role: "Business Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
        },
        {
            name: "Priyanka Joshi",
            role: "Career Strategist",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=200&h=200&fit=crop"
        },
        {
            name: "Rahul Mehta",
            role: "Industry Expert",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop"
        },
        {
            name: "Sneha Kapoor",
            role: "Success Coach",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Ravi Patel",
            role: "Technical Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop"
        },
        {
            name: "Neha Gupta",
            role: "Education Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop"
        },
        {
            name: "Suresh Iyer",
            role: "Research Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop"
        },
        {
            name: "Kavita Nair",
            role: "Student Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop"
        },
        {
            name: "Aditya Rao",
            role: "Academic Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop"
        }
    ],
    [
        {
            name: "Pooja Agarwal",
            role: "Career Expert",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
        },
        {
            name: "Manish Kumar",
            role: "Admission Expert",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=200&h=200&fit=crop"
        },
        {
            name: "Shalini Mishra",
            role: "Study Mentor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop"
        },
        {
            name: "Arjun Malhotra",
            role: "Success Guide",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop"
        },
        {
            name: "Deepa Shah",
            role: "Learning Advisor",
            badge: "⭐",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
        }
    ]
];
