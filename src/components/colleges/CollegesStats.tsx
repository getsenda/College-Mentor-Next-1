import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/motion";
import { GraduationCap, Users, Star, Trophy, BookOpen, MapPin } from "lucide-react";

const stats = [
  {
    icon: GraduationCap,
    number: 40000,
    suffix: "+",
    label: "Colleges Listed",
    description: "Comprehensive database across India",
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    icon: Users,
    number: 2000000,
    suffix: "+",
    label: "Students Guided",
    description: "Success stories and counting",
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    icon: Star,
    number: 95,
    suffix: "%",
    label: "Success Rate",
    description: "Students getting their dream college",
    color: "text-yellow-600",
    bg: "bg-yellow-100"
  },
  {
    icon: Trophy,
    number: 500,
    suffix: "+",
    label: "Top Colleges",
    description: "Premium institutions featured",
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  {
    icon: BookOpen,
    number: 1000,
    suffix: "+",
    label: "Courses Available",
    description: "Diverse academic programs",
    color: "text-indigo-600",
    bg: "bg-indigo-100"
  },
  {
    icon: MapPin,
    number: 28,
    suffix: "",
    label: "States Covered",
    description: "Pan-India presence",
    color: "text-red-600",
    bg: "bg-red-100"
  }
];

export function CollegesStats() {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Trusted by Millions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform has helped shape the futures of countless students across India with reliable college information and guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-all duration-500 hover:shadow-elegant overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>

                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                      <AnimatedNumber value={stat.number} duration={2} />{stat.suffix}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {stat.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-primary rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join the Success Story
              </h3>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
                Be part of India's largest college discovery platform and take the first step towards your dream career
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <div className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors duration-300 cursor-pointer">
                    Start Your Journey
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <div className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                    Learn More
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}