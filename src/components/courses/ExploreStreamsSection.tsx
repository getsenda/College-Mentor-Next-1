import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Heart, TrendingUp, Scale, Scissors, Palette, Monitor, Plane, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/FallBack';
import { courseService, CourseFacetsResponse, CourseFacetOption } from '@/services/courseService';

const DEFAULT_STREAM_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

// Hardcoded images per stream – matched by normalized name
const STREAM_IMAGES: Record<string, string> = {
  engineering: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  medical: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80',
  management: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  law: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  arts: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80',
  computer: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  hospitality: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  architecture: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  commerce: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
  pharmacy: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
  agriculture: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  education: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
};

function getStreamImage(streamName: string): string {
  const lower = streamName.toLowerCase();
  const key = lower.replace(/\s+/g, '-').replace(/[,&]/g, '');
  if (STREAM_IMAGES[key]) return STREAM_IMAGES[key];
  // Partial match: "engineering and architecture" -> engineering
  for (const [imgKey, url] of Object.entries(STREAM_IMAGES)) {
    if (key.startsWith(imgKey) || key.includes(`-${imgKey}`) || lower.includes(imgKey)) return url;
  }
  return DEFAULT_STREAM_IMAGE;
}

interface Stream {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  icon: React.ReactNode;
  iconBg: string;
  courseCount: number;
}

function facetToStreams(opts: CourseFacetOption[] | undefined): Array<{ value: string; count?: number }> {
  if (!opts || !Array.isArray(opts)) return [];
  return opts.map((o) =>
    typeof o === 'string' ? { value: o } : { value: (o as { value: string; count?: number }).value, count: (o as { value: string; count?: number }).count }
  ).filter((x) => x.value?.trim());
}

const ICONS = [Settings, Heart, TrendingUp, Scale, Scissors, Palette, Monitor, Plane, Home];
const FALLBACK_STREAMS: Stream[] = [
  { id: 'engineering', name: 'Engineering', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Settings className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'medical', name: 'Medical', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Heart className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'management', name: 'Management', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <TrendingUp className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'law', name: 'Law', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Scale className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'design', name: 'Fashion Design', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Scissors className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'arts', name: 'Arts, Humanities and Social Sciences', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Palette className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'computer', name: 'Computer Application and IT', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Monitor className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'hospitality', name: 'Hospitality and Tourism', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Plane className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
  { id: 'architecture', name: 'Architecture', subtitle: 'Explore courses', image: DEFAULT_STREAM_IMAGE, icon: <Home className="w-5 h-5" />, iconBg: 'bg-[#6366F1]', courseCount: 0 },
];

function buildStreamFromFacet(
  item: { value: string; count?: number },
  index: number
): Stream {
  const name = item.value?.trim() || 'Stream';
  const IconComponent = ICONS[index % ICONS.length];
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    subtitle: 'Explore courses',
    image: getStreamImage(name),
    icon: <IconComponent className="w-5 h-5" />,
    iconBg: 'bg-[#6366F1]',
    courseCount: item.count ?? 0,
  };
}

export const BrowseByStream = () => {
  const router = useRouter();
  const [streams, setStreams] = useState<Stream[]>(FALLBACK_STREAMS);
  const [streamsLoading, setStreamsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setStreamsLoading(true);
    courseService
      .getCourseFacets({})
      .then((res: CourseFacetsResponse | null) => {
        if (cancelled) return;
        const rawStreams = facetToStreams(res?.streams ?? res?.stream);
        if (rawStreams.length > 0) {
          setStreams(rawStreams.map((item, i) => buildStreamFromFacet(item, i)));
        }
      })
      .catch(() => {
        if (!cancelled) setStreams(FALLBACK_STREAMS);
      })
      .finally(() => {
        if (!cancelled) setStreamsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleStreamClick = (streamName: string) => {
    router.push(`/courses/list?stream=${encodeURIComponent(streamName)}`);
  };

  return (
    <section className="py-16 bg-[#fffbf2] ">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">
            <span className="text-gray-800">Browse </span>
            <span className="text-[#10B981]">By Stream</span>
          </h2>
          <p className="text-gray-600 max-w-3xl text-sm sm:text-base">
            Choose from diverse academic streams and discover programs that match your passion
          </p>
        </motion.div>

        {/* Stream Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {streams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => handleStreamClick(stream.name)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">

                {/* Card Image */}
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={stream.image}
                    alt={stream.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"></div>

                  {/* Icon Badge */}
                  <div className={`absolute top-3 left-3 ${stream.iconBg} rounded-lg p-2 shadow-lg`}>
                    <div className="text-white">
                      {stream.icon}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1">

                  <h3 className="mb-1 text-gray-800 line-clamp-2 text-lg font-medium">
                    {stream.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {stream.subtitle}
                  </p>

                  {/* Course Count */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">
                      {stream.courseCount} Courses
                    </span>
                  </div>

                  {/* Explore Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStreamClick(stream.name);
                    }}
                    className="mt-auto w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-cyan-600"
                  >
                    Explore
                  </button>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};