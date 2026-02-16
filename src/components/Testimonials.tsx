"use client";
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ImageWithFallback } from './figma/FallBack';
import { Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useHomepageData } from '@/hooks/useHomepageData';

// Import testimonial images
import testimonialImage1 from '../../public/assets/website images/Homepage/College mentor scholar/Akhil Gopal.png';
import testimonialImage2 from '../../public/assets/website images/Homepage/College mentor scholar/B Sai Prasanna Anjaneyulu.png';
import testimonialImage3 from '../../public/assets/website images/Homepage/College mentor scholar/G Lahri.png';
import testimonialImage4 from '../../public/assets/website images/Homepage/College mentor scholar/K Manasa.png';
import testimonialImage5 from '../../public/assets/website images/Homepage/College mentor scholar/K Pushya Tejaswi.png';
import testimonialImage6 from '../../public/assets/website images/Homepage/College mentor scholar/L Sai Charan Kashyap.png';
import testimonialImage7 from '../../public/assets/website images/Homepage/College mentor scholar/Neelam Narendra.png';
import testimonialImage8 from '../../public/assets/website images/Homepage/College mentor scholar/P Karthik.png';
import testimonialImage9 from '../../public/assets/website images/Homepage/College mentor scholar/P Lokeswara Reddy.png';
import testimonialImage10 from '../../public/assets/website images/Homepage/College mentor scholar/P Shruthi.png';
import testimonialImage11 from '../../public/assets/website images/Homepage/College mentor scholar/Polu Bhavya Sri.png';
import testimonialImage12 from '../../public/assets/website images/Homepage/College mentor scholar/Sai Nikhil Kumar.png';


import { StaticImageData } from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string | StaticImageData;
    quote: string;
    backgroundColor: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Akhil Gopal",
        role: "Computer Science Student",
        company: "IIT Delhi",
        image: testimonialImage1,
        quote: "CollegeMentor helped me secure my dream internship at Google. The personalized guidance and industry insights were invaluable throughout my placement preparation.",
        backgroundColor: "bg-blue-100"
    },
    {
        id: 2,
        name: "B Sai Prasanna Anjaneyulu",
        role: "MBA Student",
        company: "IIM Bangalore",
        image: testimonialImage2,
        quote: "The career counseling sessions were game-changing. My mentor helped me pivot from engineering to consulting and land offers from top firms like McKinsey.",
        backgroundColor: "bg-green-100"
    },
    {
        id: 3,
        name: "G Lahri",
        role: "Engineering Student",
        company: "BITS Pilani",
        image: testimonialImage3,
        quote: "From resume building to interview preparation, CollegeMentor provided end-to-end support. I'm now working at Microsoft thanks to their comprehensive guidance.",
        backgroundColor: "bg-purple-100"
    },
    {
        id: 4,
        name: "K Manasa",
        role: "Finance Student",
        company: "SRCC Delhi",
        image: testimonialImage4,
        quote: "The mock interviews and industry connections provided by CollegeMentor were instrumental in my selection at Goldman Sachs. Highly recommend their services!",
        backgroundColor: "bg-yellow-100"
    },
    {
        id: 5,
        name: "K Pushya Tejaswi",
        role: "Data Science Student",
        company: "ISI Kolkata",
        image: testimonialImage5,
        quote: "CollegeMentor's AI-driven career recommendations helped me discover my passion for data science. Now I'm leading ML projects at Amazon Web Services.",
        backgroundColor: "bg-red-100"
    },
    {
        id: 6,
        name: "L Sai Charan Kashyap",
        role: "Business Student",
        company: "XLRI Jamshedpur",
        image: testimonialImage6,
        quote: "The networking opportunities and alumni mentorship program opened doors I never knew existed. Successfully transitioned into product management at Flipkart.",
        backgroundColor: "bg-indigo-100"
    },
    {
        id: 7,
        name: "Neelam Narendra",
        role: "Law Student",
        company: "NLSIU Bangalore",
        image: testimonialImage7,
        quote: "From corporate law to litigation strategy, CollegeMentor's legal career guidance was comprehensive. Now practicing at one of India's top law firms.",
        backgroundColor: "bg-pink-100"
    },
    {
        id: 8,
        name: "P Karthik",
        role: "Entrepreneur",
        company: "IIT Bombay",
        image: testimonialImage8,
        quote: "CollegeMentor's startup incubation program and investor connections were crucial for my ed-tech venture. We've now raised Series A funding!",
        backgroundColor: "bg-teal-100"
    },
    {
        id: 9,
        name: "P Lokeswara Reddy",
        role: "Engineering Student",
        company: "NIT Warangal",
        image: testimonialImage9,
        quote: "The comprehensive placement preparation and mock interviews helped me secure a position at a top tech company. CollegeMentor's guidance was exceptional!",
        backgroundColor: "bg-cyan-100"
    },
    {
        id: 10,
        name: "P Shruthi",
        role: "Medical Student",
        company: "AIIMS Delhi",
        image: testimonialImage10,
        quote: "CollegeMentor's medical career guidance and exam preparation resources were instrumental in my success. I'm now pursuing my dream specialization!",
        backgroundColor: "bg-rose-100"
    },
    {
        id: 11,
        name: "Polu Bhavya Sri",
        role: "Design Student",
        company: "NID Ahmedabad",
        image: testimonialImage11,
        quote: "The creative portfolio reviews and industry connections through CollegeMentor opened amazing opportunities. I'm now working with leading design firms!",
        backgroundColor: "bg-violet-100"
    },
    {
        id: 12,
        name: "Sai Nikhil Kumar",
        role: "Research Scholar",
        company: "IISc Bangalore",
        image: testimonialImage12,
        quote: "CollegeMentor's research guidance and academic mentorship helped me publish papers and secure research positions. Highly recommend their services!",
        backgroundColor: "bg-amber-100"
    }

];

export function TestimonialsSection() {
    const { data } = useHomepageData();

    // Hardcoded fallback testimonials
    const defaultTestimonials = testimonials;

    // Always use all 12 local testimonials to ensure all images are visible
    // We use local images anyway, so always show all 12 testimonials
    // If API data exists, we can merge it but ensure we always have 12 items
    const apiTestimonials = data?.successStories?.stories && data.successStories.stories.length > 0
        ? data.successStories.stories.map((story, index) => {
            // Get default testimonial for this index as fallback for null fields
            const defaultTestimonial = defaultTestimonials[index] || defaultTestimonials[index % defaultTestimonials.length];
            return {
                id: index + 1,
                name: story.studentName || defaultTestimonial.name,
                role: story.course || defaultTestimonial.role,
                company: story.institute || defaultTestimonial.company,
                // Always use local image, never use API imageUrl to ensure new images are always shown
                image: defaultTestimonial.image,
                quote: story.testimonial || defaultTestimonial.quote,
                backgroundColor: defaultTestimonial.backgroundColor,
            };
        })
        : null;

    // Always ensure we have all 12 testimonials - merge API data with local defaults
    // This ensures all 12 images are always visible in the profile row
    const finalTestimonials = apiTestimonials && apiTestimonials.length > 0
        ? [...apiTestimonials, ...defaultTestimonials.slice(apiTestimonials.length)].slice(0, 12)
        : defaultTestimonials;

    // Use API heading/subHeading only if they exist, otherwise use hardcoded
    const heading = data?.successStories?.heading || "College Mentor Scholar";
    const subHeading = data?.successStories?.subHeading || "Real experiences from learners who've cleared their exams with confidence.";

    // Helper function to render heading with gradient
    const renderHeadingWithGradient = (text: string) => {
        const parts = text.split(/(College Mentor|Scholar)/i);
        return parts.map((part, index) => {
            if (/^(college mentor|scholar)$/i.test(part)) {
                return (
                    <span key={index} className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const [activeTestimonialId, setActiveTestimonialId] = useState<number>(2);
    const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to selected image - clamp scroll to show all images at boundaries
    const scrollToActiveImage = useCallback((id: number) => {
        const imageElement = imageRefs.current.get(id);
        if (imageElement && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const containerRect = container.getBoundingClientRect();
            const elementRect = imageElement.getBoundingClientRect();

            // Calculate if element is outside visible area (relative to container)
            const elementLeftRelative = elementRect.left - containerRect.left;
            const elementRightRelative = elementRect.right - containerRect.left;

            // Calculate max scroll (to ensure last images stay visible)
            const maxScroll = container.scrollWidth - container.clientWidth;

            // If element is to the left of visible area, scroll left
            if (elementLeftRelative < 0) {
                const newScrollLeft = Math.max(0, container.scrollLeft + elementLeftRelative - 20);
                container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
            }
            // If element is to the right of visible area, scroll right
            else if (elementRightRelative > containerRect.width) {
                const scrollAmount = elementRightRelative - containerRect.width + 20;
                const newScrollLeft = Math.min(maxScroll, container.scrollLeft + scrollAmount);
                container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
            }
        }
    }, []);

    // Scroll to active image when it changes
    useEffect(() => {
        scrollToActiveImage(activeTestimonialId);
    }, [activeTestimonialId, scrollToActiveImage]);

    // Sync activeTestimonialId when finalTestimonials changes
    React.useEffect(() => {
        if (finalTestimonials.length > 0 && !finalTestimonials.find(t => t.id === activeTestimonialId)) {
            setActiveTestimonialId(finalTestimonials[1]?.id || finalTestimonials[0]?.id || 1);
        }
    }, [finalTestimonials, activeTestimonialId]);

    // Always 3 cards - recalculate on every render when activeTestimonialId changes
    const displayedTestimonials = React.useMemo(() => {
        const activeIndex = finalTestimonials.findIndex(t => t.id === activeTestimonialId);
        if (activeIndex === -1) return finalTestimonials.slice(0, 3);
        const displayed: Testimonial[] = [];
        for (let i = -1; i <= 1; i++) {
            const idx = (activeIndex + i + finalTestimonials.length) % finalTestimonials.length;
            displayed.push(finalTestimonials[idx]);
        }
        return displayed;
    }, [activeTestimonialId, finalTestimonials]);

    // Auto carousel - scrolls through all testimonials automatically
    React.useEffect(() => {
        if (finalTestimonials.length === 0) return;

        const interval = setInterval(() => {
            setActiveTestimonialId(prevId => {
                const currentIndex = finalTestimonials.findIndex(t => t.id === prevId);
                const nextIndex = (currentIndex + 1) % finalTestimonials.length;
                return finalTestimonials[nextIndex]?.id || 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [finalTestimonials]);


    return (
        <section id="testimonials-section" className="relative bg-[#f5f9f7] py-16 sm:py-20 lg:py-24">
            <div className="w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
                {/* Top Deep Curve with Elevation */}
                <div className="absolute -top-1 left-0 right-0 overflow-hidden leading-[0] z-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 200"
                        className="w-full h-20 sm:h-24 md:h-28 lg:h-32 drop-shadow-md"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#ffffff"
                            d="M0,80 C480,200 960,0 1440,120 L1440,0 L0,0 Z"
                        />
                    </svg>
                </div>

                {/* Header */}
                <div className="text-center">


                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-8">
                        <Sparkles size={12} className="text-primary animate-pulse" />
                        <span className="text-primary font-medium text-xs">Success Stories</span>
                    </div>

                    {heading && (
                        <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mb-2">
                            {renderHeadingWithGradient(heading)}
                        </h2>
                    )}
                    {subHeading && (
                        <p className="text-body-large max-w-2xl mx-auto mb-12">
                            {subHeading}
                        </p>
                    )}
                </div>

                {/* Profile Images Row - Single horizontal row */}
                <div className="hidden md:flex justify-center mb-20">
                    <div
                        ref={scrollContainerRef}
                        className="flex items-center space-x-4 sm:space-x-6 max-w-full w-full overflow-x-auto pb-4 px-4 scrollbar-hide"
                    >
                        {finalTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                ref={(el) => {
                                    if (el) imageRefs.current.set(testimonial.id, el);
                                }}
                                className={`cursor-pointer flex-shrink-0 ${index === 1 ? '-mt-2' : index === 3 ? 'mt-4' : index === 5 ? '-mt-2' : index === 7 ? 'mt-2' : index === 9 ? '-mt-2' : index === 11 ? 'mt-3' : ''
                                    }`}
                                onClick={() => setActiveTestimonialId(testimonial.id)}
                                onMouseEnter={() => setActiveTestimonialId(testimonial.id)}
                                whileHover={{ y: -3, transition: { duration: 0.1 } }}
                            >
                                <motion.div
                                    className={`w-24 h-36 rounded-2xl p-1 border-2 transition-all duration-150 ${activeTestimonialId === testimonial.id
                                        ? 'border-secondary-400 opacity-100 scale-105 shadow-lg bg-secondary-400'
                                        : 'border-transparent opacity-30 bg-gray-100'
                                        }`}
                                    animate={{
                                        scale: activeTestimonialId === testimonial.id ? 1.05 : 1,
                                        opacity: activeTestimonialId === testimonial.id ? 1 : 0.3,
                                        backgroundColor: activeTestimonialId === testimonial.id ? '#00C798' : '#f3f4f6'
                                    }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <div className="w-full h-full rounded-xl overflow-hidden">
                                        <img
                                            src={typeof testimonial.image === 'string' ? testimonial.image : testimonial.image.src}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>


                {/* Mobile Carousel View */}
                <div className="md:hidden max-w-sm mx-auto">
                    <Carousel opts={{ loop: true }} className="w-full">
                        <CarouselContent>
                            {finalTestimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id}>
                                    <div className={`rounded-3xl p-8 shadow-lg relative h-[320px] flex flex-col ${testimonial.backgroundColor} border-2 border-secondary`}>
                                        {/* Quote Icon */}
                                        <div className="text-5xl text-gray-300 mb-4 leading-none">"</div>

                                        {/* Quote Text */}
                                        <p className="text-gray-700 mb-8 text-sm leading-relaxed flex-1">
                                            {testimonial.quote}
                                        </p>

                                        {/* Profile Info */}
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 bg-white p-1 shadow-sm">
                                                    <img
                                                        src={typeof testimonial.image === 'string' ? testimonial.image : testimonial.image.src}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        loading="eager"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-gray-900 text-sm mb-1">{testimonial.name}</h4>
                                                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                                                </div>
                                            </div>

                                            {/* Company Logo */}
                                            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
                                                <div className="text-xs text-gray-700">
                                                    {testimonial.company}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0" />
                        <CarouselNext className="right-0" />
                    </Carousel>
                </div>

                {/* Desktop Grid View - Display 3 at once based on selection */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {displayedTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={`${activeTestimonialId}-${testimonial.id}`}
                                className={`rounded-3xl p-8 shadow-sm relative h-[320px] flex flex-col transition-all duration-150
      ${testimonial.id === activeTestimonialId
                                        ? `${testimonial.backgroundColor} border-4 border-secondary opacity-100 scale-110 shadow-lg`
                                        : `${testimonial.backgroundColor} border border-gray-100 opacity-40 scale-100`
                                    }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: testimonial.id === activeTestimonialId ? 1 : 0.4,
                                    y: 0,
                                    scale: testimonial.id === activeTestimonialId ? 1.1 : 1
                                }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, delay: index * 0.02 }}
                            >
                                {/* Quote Icon */}
                                <div className="text-5xl text-gray-300 mb-4 leading-none">"</div>

                                {/* Quote Text */}
                                <p className="text-gray-700 mb-8 text-sm leading-relaxed flex-1">
                                    {testimonial.quote}
                                </p>

                                {/* Profile Info */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden mr-4 bg-white p-1 shadow-sm">
                                            <img
                                                src={typeof testimonial.image === 'string' ? testimonial.image : testimonial.image.src}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover rounded-lg"
                                                loading="eager"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 text-sm mb-1">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-xs">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    {/* Company Logo */}
                                    <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
                                        <div className="flex items-center">
                                            {testimonial.company === 'SGU' && (
                                                <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center mr-2">
                                                    SGU
                                                </div>
                                            )}
                                            {testimonial.company === 'Lexicon MILE' && (
                                                <div className="w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center mr-2">
                                                    L
                                                </div>
                                            )}
                                            <div className="text-xs text-gray-700">
                                                {testimonial.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>


            </div>




        </section>
    );
}