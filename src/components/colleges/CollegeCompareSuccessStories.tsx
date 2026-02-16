import { ChevronLeft, ChevronRight, Quote, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ImageWithFallback } from "../figma/FallBack";
import { Button } from "../ui/button";

interface SuccessStory {
  id: string;
  name: string;
  college: string;
  degree: string;
  graduationYear: string;
  currentRole: string;
  location: string;
  story: string;
  image: string;
  category: string;
}

const successStories: SuccessStory[] = [
  {
    id: "1",
    name: "Priya Sharma",
    college: "Harvard University",
    degree: "B.Tech in Computer Science",
    graduationYear: "2021",
    currentRole: "AI Research Scientist",
    location: "Bangalore, Karnataka",
    story: "Comparing universities helped me identify Harvard's cutting-edge AI program. Today, I'm leading breakthrough research in machine learning, thanks to the scholarship opportunities I discovered through careful comparison.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    category: "Engineering"
  },
  {
    id: "2",
    name: "Amit Patel",
    college: "Stanford University",
    degree: "M.S. in Data Science",
    graduationYear: "2022",
    currentRole: "Lead Data Scientist",
    location: "San Francisco, USA",
    story: "The college comparison tool revealed Stanford's unmatched industry connections. With guidance from mentors, I secured a position at a leading tech company, working on transformative data solutions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    category: "Data Science"
  },
  {
    id: "3",
    name: "Neha Kapoor",
    college: "MIT",
    degree: "B.E. in Electronics & Communication",
    graduationYear: "2020",
    currentRole: "Hardware Engineer",
    location: "Boston, USA",
    story: "Detailed university comparisons showed MIT's exceptional lab facilities and research opportunities. The investment in my education opened doors to working on next-generation semiconductor technology.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    category: "Engineering"
  },
  {
    id: "4",
    name: "Arjun Reddy",
    college: "IIT Delhi",
    degree: "B.Tech in Mechanical Engineering",
    graduationYear: "2019",
    currentRole: "Manufacturing Head",
    location: "Chennai, Tamil Nadu",
    story: "IIT Delhi's state-of-the-art labs and industry collaborations provided practical exposure that textbooks couldn't offer. The placement cell's dedicated efforts and mock interviews helped me crack one of the most competitive recruitment processes.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    category: "Mechanical"
  }
];

export function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? successStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === successStories.length - 1 ? 0 : prev + 1));
  };

  const currentStory = successStories[currentIndex];

  return (
    <div className="py-12 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          {/* <Badge className="mb-4 bg-primary/10 text-primary border-none px-6 py-2 text-sm font-semibold">
            Success Stories
          </Badge> */}
          <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Discover how strategic college comparison transformed dreams into reality.
            These graduates leveraged our platform to make informed decisions that shaped their futures.
          </p>
        </div>

        {/* Story Card */}
        <div className="max-w-7xl mx-auto relative">
          <div className="relative bg-transparent">
            {/* Decorative Dots - Left Side */}
            <div className="absolute left-[13%] top-1/2 -translate-y-1/2 -translate-x-4 hidden lg:grid grid-cols-3 gap-2 z-0">
              <div className="w-2 h-2 rounded-full bg-[#00C798]"></div>
              <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
              <div className="w-2 h-2 rounded-full bg-[#173CBA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#186BBF]"></div>
              <div className="w-2 h-2 rounded-full bg-[#00C798]"></div>
              <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
              <div className="w-2 h-2 rounded-full bg-[#173CBA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#186BBF]"></div>
              <div className="w-2 h-2 rounded-full bg-[#00C798]"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-0 relative animate-scale-in max-w-full">
              {/* Left Card - Image */}
              <div className="relative lg:w-[280px] w-full z-10 lg:-mb-0 -mb-8 group flex-shrink-0">
                <div
                  className="bg-gradient-to-br from-primary via-accent to-primary rounded-2xl p-1 shadow-xl transition-all duration-500 hover:shadow-primary/20 hover:scale-[1.02]"
                  style={{
                    transform: 'rotate(-3deg)',
                  }}
                >
                  <div
                    className="bg-card rounded-2xl overflow-hidden"
                    style={{
                      transform: 'rotate(3deg)',
                    }}
                  >
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <ImageWithFallback
                        src={currentStory.image}
                        alt={currentStory.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Floating Quote Icon */}
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center shadow-lg animate-pulse">
                        <Quote className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                      </div>

                      {/* Name Badge at Bottom */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-card/95 backdrop-blur-md rounded-xl p-3 shadow-lg">
                          <h4 className="text-foreground font-bold text-base mb-0.5">{currentStory.name}</h4>
                          <p className="text-muted-foreground text-xs">{currentStory.college}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card - Content */}
              <div className="flex-1 w-full lg:-ml-10 z-20 lg:max-w-2xl">
                <div className="bg-gradient-to-br from-primary/80 via-primary to-secondary rounded-2xl shadow-xl hover:shadow-primary/30 transition-shadow duration-500 p-6 lg:p-8 relative overflow-hidden">
                  {/* Enhanced Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative z-10">
                    {/* Category Badge */}
                    <Badge className="mb-4 bg-accent hover:bg-accent/90 text-accent-foreground border-none px-3 py-1 text-xs font-semibold shadow-lg">
                      {currentStory.category}
                    </Badge>

                    {/* Degree & Graduation */}
                    <div className="flex items-center gap-2 text-primary-foreground/90 mb-5">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm font-medium">{currentStory.degree} • Class of {currentStory.graduationYear}</span>
                    </div>

                    {/* Current Role Card */}
                    <div className="bg-primary-foreground/15 backdrop-blur-md rounded-xl p-4 mb-5 border border-primary-foreground/20 shadow-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 shadow-md">
                          <Briefcase className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-primary-foreground font-bold text-base mb-0.5">{currentStory.currentRole}</p>
                          <div className="flex items-center gap-1.5 text-primary-foreground/80">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-xs">{currentStory.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story Quote */}
                    <div className="relative mb-5">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-accent rounded-full"></div>
                      <p className="text-primary-foreground/95 leading-relaxed text-sm pl-5 italic font-light">
                        "{currentStory.story}"
                      </p>
                    </div>

                    {/* College Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-md border border-primary-foreground/25 shadow-lg hover:bg-primary-foreground/20 transition-colors">
                      <GraduationCap className="w-4 h-4 text-primary-foreground" />
                      <span className="text-primary-foreground text-sm font-semibold">{currentStory.college}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Enhanced Pagination Dots */}
            <div className="flex gap-3">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex
                      ? 'w-12 h-3.5 bg-gradient-to-r from-primary via-accent to-primary shadow-md'
                      : 'w-3.5 h-3.5 bg-secondary/60 hover:bg-muted-foreground/40'
                    }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/30 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Counter */}
          {/* <div className="text-center mt-6">
            <p className="text-base text-muted-foreground font-medium">
              Story {currentIndex + 1} of {successStories.length}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}