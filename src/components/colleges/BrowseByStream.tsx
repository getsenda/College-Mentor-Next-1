import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, Building2, Stethoscope, Briefcase, Palette, Scale, FlaskConical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const streams = [
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

export default function BrowseByStream() {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("/colleges/list");
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Browse by Stream
            </h2>
            <p className="text-gray-600">
              Explore colleges by your preferred field of study
            </p>
          </div>
          <Button
            onClick={handleViewAll}
            variant="outline"
            className="hidden md:flex items-center gap-2"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream, index) => {
            const IconComponent = stream.icon;
            return (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stream.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{stream.colleges}+</p>
                        <p className="text-xs text-gray-500">Colleges</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {stream.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {stream.description}
                    </p>
                    <Link
                      href={`/colleges/list?stream=${stream.id}`}
                      className="inline-flex items-center text-sm text-primary hover:underline font-medium group-hover:gap-2 gap-1 transition-all"
                    >
                      Explore {stream.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button
            onClick={handleViewAll}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            View All Streams
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

