import React from 'react';
import { Target, GitCompare, Award, BadgeDollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';


type Tool = {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    ctaText: string;
    url: string;
    gradient: string;
};

const tools: Tool[] = [
    {
        id: 1,
        icon: <GitCompare className="w-8 h-8" />,
        title: 'College Compare',
        description: 'Detailed comparison of colleges across multiple parameters and rankings',
        ctaText: 'Compare Colleges',
        url: 'https://www.collegementor.com/college-compare',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        id: 2,
        icon: <Target className="w-8 h-8" />,
        title: 'College Predictor',
        description: 'Predict your chances of admission based on your exam scores and preferences',
        ctaText: 'Predict Now',
        url: 'https://www.collegementor.com/college-predictor',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        id: 3,
        icon: <Award className="w-8 h-8" />,
        title: 'Scholarships',
        description: 'Discover scholarship opportunities and financial aid programs for your education',
        ctaText: 'Explore Scholarships',
        url: 'https://www.collegementor.com/scholarships',
        gradient: 'from-orange-500 to-amber-500',
    },
    {
        id: 4,
        icon: <BadgeDollarSign className="w-8 h-8" />,
        title: 'Education Loan',
        description: 'Find the best education loan options with competitive interest rates',
        ctaText: 'Explore Loans',
        url: 'https://www.collegementor.com/education-loan-details',
        gradient: 'from-green-500 to-emerald-500',
    },
];

export function SmartTools() {
    const handleToolClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#3B82F6' }}>
            <div className="absolute top-0 left-0 w-full z-10">
                <svg
                    viewBox="0 0 1200 200"
                    className="w-full h-[60px] sm:h-[80px] md:h-[120px] lg:h-[160px] xl:h-[200px]"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 C300,100 900,-40 1200,80 L1200,0 L0,0 Z"
                        fill="#edf2f0"
                    />
                </svg>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">AI-Powered Solutions</span>
                    </div>
                    <h2 className="text-white mb-4 mt-8">Smart Tools</h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto">
                        AI-powered tools to help you make the right choice
                    </p>
                </motion.div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group"
                        >
                            <div className="h-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-xl hover:bg-white/30 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                                {/* Glossy overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-30 rounded-2xl" />

                                {/* Content Container */}
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                                        className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md   flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg text-white"
                                    >
                                        {tool.icon}
                                    </motion.div>

                                    {/* Content */}
                                    <h5 className="text-white mb-3">{tool.title}</h5>
                                    <p className="text-white/90 text-sm mb-6 min-h-[60px]">
                                        {tool.description}
                                    </p>

                                    {/* CTA Button */}
                                    <Button
                                        onClick={() => handleToolClick(tool.url)}
                                        className="bg-white text-primary hover:bg-white/90 group/btn shadow-lg"
                                    >
                                        {tool.ctaText}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-white/90 text-sm">
                        Need help choosing the right tool? <button className="underline hover:text-white transition-colors">Contact our experts</button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
