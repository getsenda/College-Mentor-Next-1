'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const carouselData = [
  {
    image: '/auth/slide1.jpg',
    title: 'Find Your Dream College',
    description: 'Explore top colleges and universities tailored to your preferences'
  },
  {
    image: '/auth/slide2.jpg',
    title: 'Expert Guidance',
    description: 'Get personalized mentorship from experienced professionals'
  },
  {
    image: '/auth/slide3.jpg',
    title: 'Secure Your Future',
    description: 'Make informed decisions about your academic journey'
  }
];

export default function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full bg-primary overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={carouselData[currentSlide].image}
            alt={carouselData[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              {carouselData[currentSlide].title}
            </h2>
            <p className="text-sm opacity-90">
              {carouselData[currentSlide].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'w-6 bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}