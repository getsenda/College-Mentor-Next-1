import { LucideIcon } from "lucide-react";

export interface FeaturedCollege {
    id: number;
    name: string;
    shortName: string;
    location: string;
    description: string;
    secondLine: string;
    rating: number;
    reviews: number;
    fees: string;
    placement: string;
    image: string;
    campusImage: string;
    badge: string;
    established: number;
    courses: string[];
    websiteUrl: string;
}

export interface Stream {
    id: string | number;
    name: string;
    colleges: number;
    description: string;
    icon?: LucideIcon;
    color?: string;
}

export interface Testimonial {
    id: number;
    name: string;
    college: string;
    quote: string;
    stat: string;
    image: string;
}

export interface SuccessStory {
    id: number;
    name: string;
    college: string;
    quote: string;
    image: string;
    badge: string;
    initial: string;
}

export interface Mentor {
    name: string;
    role: string;
    badge: string;
    image: string;
}

export interface TopCollege {
    id: number;
    name: string;
    location: string;
    rank: number;
    rating: number;
    fees: string;
    placement: string;
    image: string;
    campusImage: string;
    description: string;
    established: number;
    courses: string[];
    websiteUrl: string;
}
