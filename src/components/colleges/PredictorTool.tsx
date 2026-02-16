import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    GraduationCap,
    TrendingUp,
    Users,
    Award,
    ChevronRight,
    Sparkles,
    CheckCircle
} from "lucide-react";
import heroImage from "../../../public/assets/college-success-hero.jpg";
import { logger } from "@/utils/logger";

const CollegePredictor = () => {
    const [examScore, setExamScore] = useState("");
    const [rank, setRank] = useState("");



    const features = [
        {
            title: "AI-Powered Predictions",
            description: "Advanced algorithms analyze your scores against historical data",
            icon: Sparkles,
        },
        {
            title: "Real-time Updates",
            description: "Get instant updates on admission chances and cutoffs",
            icon: TrendingUp,
        },
        {
            title: "Comprehensive Database",
            description: "Access data from 500+ colleges across India",
            icon: GraduationCap,
        },
    ];

    const handlePredictNow = () => {
        // This would navigate to the full predictor page
        logger.log("Navigating to predictor with:", { examScore, rank });
    };

    return (
        <section className="min-h-screen bg-[#f5f9f7] relative overflow-hidden pb-20 pt-40">
            {/* Top Curve with Shadow */}
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
            {/* Optional: Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#f5f9f7] rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#f5f9f7] rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f5f9f7] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center mb-20 max-w-7xl mx-auto">
                    {/* Left Content */}
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1.5 mb-3">
                            <Sparkles size={12} className="text-primary animate-pulse" />
                            <span className="text-primary font-medium text-xs"> Powered by AI & Machine Learning</span>
                        </div>

                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-2 sm:mb-3">
                            Find Your Perfect{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                College Match
                            </span>

                        </h2>


                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-muted-foreground mb-8 leading-relaxed">
                            Discover eligible colleges based on your exam scores and rank. Get personalized predictions
                            powered by advanced AI and real admission data from top institutions.
                        </p>

                        {/* Key Benefits */}
                        <div className="space-y-4 mb-8">
                            {[
                                "AI-powered predictions with 94% accuracy",
                                "Real-time data from 500+ colleges",
                                "Personalized recommendations based on your profile",
                                "Free consultation with education experts"
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 text-foreground">
                                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                                    <span className="text-base md:text-lg">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50K+</div>
                                <div className="text-muted-foreground font-medium">Students Helped</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-accent mb-1">94%</div>
                                <div className="text-muted-foreground font-medium">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="animate-scale-in order-first lg:order-last">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl transform rotate-3"></div>
                            <img
                                src={heroImage.src}
                                alt="Successful college students celebrating graduation with laptops and diplomas"
                                className="relative w-full h-auto rounded-3xl shadow-elegant object-cover"
                            />

                            {/* Floating Stats Cards */}
                            <div className="absolute -top-6 -left-6 bg-card/90 backdrop-blur-sm p-4 rounded-2xl shadow-card border floating-animation">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-success/20 to-success/40 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-success" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-foreground">98%</div>
                                        <div className="text-xs text-muted-foreground">Admission Rate</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-sm p-4 rounded-2xl shadow-card border floating-animation" style={{ animationDelay: '-2s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-primary/40 rounded-xl flex items-center justify-center">
                                        <Award className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-foreground">₹2.5Cr</div>
                                        <div className="text-xs text-muted-foreground">Scholarships</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Predictor Form */}
                <div className="max-w-4xl mx-auto mb-20 animate-scale-in">
                    <Card className="p-8 bg-gradient-card border-0 shadow-elegant shadow-md">
                        <div className="text-center mb-8">

                            <h2 className="text-2xl font-bold mb-4">Get Your Prediction</h2>
                            <p className="text-muted-foreground">Enter your details to discover your college options</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Exam Score</label>
                                <Input
                                    placeholder="Enter your exam score"
                                    value={examScore}
                                    onChange={(e) => setExamScore(e.target.value)}
                                    className="h-12 text-lg border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Rank (Optional)</label>
                                <Input
                                    placeholder="Enter your rank"
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value)}
                                    className="h-12 text-lg border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                onClick={handlePredictNow}
                                className="hero-button groupb bg-secondary hover:bg-[#3b82f6] text-white px-8 py-4 font-semibold shadow-elegant hover:shadow-strong w-full md:w-auto mx-auto"
                                size="lg"
                            >
                                Predict Now
                                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </Card>
                </div>



                {/* Features Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 text-center">
                            Why Choose Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Get Your Prediction</span>
                        </h4>
                        {/* <h2 className="text-4xl font-bold mb-4">Why Choose Our Predictor?</h2> */}
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                            Advanced technology meets educational expertise to give you the most accurate predictions.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={feature.title}
                                className="p-8 bg-white shadow-md border-0 shadow-card backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 group"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Icon with animated square background */}
                                <div className="w-14 h-14 flex items-center justify-center 
                                rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 
                                text-primary mb-6 animate-pulse-slow">
                                    <feature.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>

                        ))}
                    </div>

                </div>

                {/* Final CTA */}
                <div className="text-center mt-20">
                    <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full font-medium mb-6">
                        <Award className="w-4 h-4" />
                        Trusted by 50,000+ Students
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Ready to Find Your Dream College?</h3>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Join thousands of successful students who found their perfect college match with our AI-powered predictions.
                    </p>
                    <Button
                        onClick={handlePredictNow}
                        className="hero-button groupb bg-secondary hover:bg-[#3b82f6] text-white px-8 py-4 font-semibold shadow-elegant hover:shadow-strong w-full md:w-auto mx-auto"
                        size="lg"
                    >
                        Start Your Journey
                        <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CollegePredictor;