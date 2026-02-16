"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/FallBack';


interface FAQ {
    id: string;
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        id: 'faq-1',
        question: 'How does the course comparison tool work?',
        answer: 'Select up to 4 courses using the search bar, then click "Compare Courses". You can compare courses across eligibility criteria, curriculum, fees structure, career opportunities, salary trends, entrance exams, and more. Use the detailed comparison table to make an informed decision about your education path.'
    },
    {
        id: 'faq-2',
        question: 'What is the difference between B.Tech and B.Sc in Computer Science?',
        answer: 'B.Tech focuses on practical engineering applications and takes 4 years, while B.Sc emphasizes theoretical and research aspects in 3 years. B.Tech offers better placement opportunities in IT companies, whereas B.Sc is ideal for those pursuing research or higher studies like M.Sc or PhD.'
    },
    {
        id: 'faq-3',
        question: 'Can I compare courses from different streams?',
        answer: 'Yes! You can compare any courses regardless of their stream. Compare B.Tech with BBA, MBBS with B.Com, or any combination. This helps you understand different career paths, salary expectations, course duration, and educational requirements to make informed decisions about your future.'
    },
    {
        id: 'faq-4',
        question: 'What are the eligibility criteria for engineering courses?',
        answer: 'Most engineering courses (B.Tech) require 10+2 with Physics, Chemistry, and Mathematics with minimum 50-60% marks. You must qualify entrance exams like JEE Main, JEE Advanced, or state-level engineering exams. Some colleges also offer direct admission based on board exam scores.'
    },
    {
        id: 'faq-5',
        question: 'What entrance exams are required for different courses?',
        answer: 'Different courses require different entrance exams: JEE Main/Advanced for B.Tech, NEET for MBBS/BDS, CUET for most undergraduate courses, CAT/XAT/MAT for MBA, CLAT for Law, and NATA for Architecture. Some universities also conduct their own entrance tests. Check the entrance exams section in course comparison for specific requirements.'
    },
    {
        id: 'faq-6',
        question: 'How accurate is the average salary data shown for courses?',
        answer: 'Salary data is based on placement reports from top colleges, industry surveys, and employment data across sectors. It shows average salary progression from fresher to 8+ years of experience. Actual salaries vary based on college tier, location, company, skills, and individual performance.'
    },
    {
        id: 'faq-7',
        question: 'What are emerging fields and specializations in courses?',
        answer: 'Emerging fields are new and rapidly growing areas like Artificial Intelligence, Data Science, Blockchain, and Cybersecurity. Specializations are focused tracks within a course (like Computer Science in B.Tech, Finance in BBA). These help align your education with future industry demands and increase employability.'
    },
    // {
    //     id: 'faq-8',
    //     question: 'Can I bookmark courses and download comparison reports?',
    //     answer: 'Yes! You need to log in to access these features. Once logged in, click the bookmark icon to save courses for later comparison. You can also download detailed comparison reports in PDF format containing all course information, helping you make offline decisions or share with family.'
    // }
];

export function FAQSection() {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    const toggleFAQ = (id: string) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xs tracking-widest text-blue-600 uppercase mb-4 font-semibold"
                    >
                        Got Questions? We've Got Answers
                    </motion.p>
                    {/* <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent"
                    >
                        Frequently Asked Questions
                    </motion.h2> */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-0">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Frequently Asked Questions</span>
                    </h2>

                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-12 items-start">
                    {/* Left Column - FAQ List (2/5 width) */}
                    <div className="lg:col-span-2 space-y-2 md:space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className={`bg-white/80 backdrop-blur-sm rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openFAQ === faq.id
                                        ? 'border-cyan-400 shadow-xl shadow-cyan-100'
                                        : 'border-gray-200 hover:border-cyan-200 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    {/* Question Button */}
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                    >
                                        <span className={`pr-4 transition-colors duration-300 ${openFAQ === faq.id ? 'text-cyan-700' : 'text-gray-900'
                                            }`}>
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{
                                                rotate: openFAQ === faq.id ? 180 : 0,
                                                scale: openFAQ === faq.id ? 1.1 : 1
                                            }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="flex-shrink-0"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openFAQ === faq.id
                                                ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                                                : 'bg-gray-100 group-hover:bg-cyan-50'
                                                }`}>
                                                {openFAQ === faq.id ? (
                                                    <Minus className="w-5 h-5 text-white" />
                                                ) : (
                                                    <Plus className={`w-5 h-5 transition-colors ${openFAQ === faq.id ? 'text-white' : 'text-gray-600 group-hover:text-cyan-600'
                                                        }`} />
                                                )}
                                            </div>
                                        </motion.div>
                                    </button>

                                    {/* Answer */}
                                    <AnimatePresence>
                                        {openFAQ === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <motion.div
                                                    initial={{ y: -10 }}
                                                    animate={{ y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="px-6 pb-5 pt-2"
                                                >
                                                    <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent mb-4" />
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column - Image with Overlay (3/5 width) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-3 lg:sticky lg:top-24 h-fit"
                    >
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
                            {/* Image */}
                            <div className="relative h-[300px] md:h-[600px]">
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1589872880544-76e896b0592c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxpYnJhcnklMjBzdHVkeWluZyUyMGdyb3VwfGVufDF8fHx8MTc2NDY4Mjc2MXww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Students studying together"
                                    className="w-full h-full object-cover"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
                            </div>

                            {/* Content Overlay */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                            >
                                <h3 className="text-2xl mb-3 text-white font-semibold">
                                    Still have questions?
                                </h3>
                                <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                                    Our expert counselors are here to guide you through your educational journey and help you make the best decision.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 group"
                                >
                                    <span>Contact Our Experts</span>
                                    <motion.svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </motion.button>
                            </motion.div>

                            {/* Decorative Elements */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-8 right-8 w-20 h-20 bg-cyan-400/30 rounded-full blur-xl"
                            />
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-cyan-200 shadow-lg"
                            >
                                <div className="text-3xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    500+
                                </div>
                                <p className="text-sm text-gray-600">Courses Available</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-blue-200 shadow-lg"
                            >
                                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    50K+
                                </div>
                                <p className="text-sm text-gray-600">Students Guided</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}