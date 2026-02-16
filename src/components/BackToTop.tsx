"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
// import backToTopIcon from '@/assets/back-to-top-icon.png';
import backToTopIcon from '../../public/assets/back-to-top-icon.png';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-28 right-6 z-[9999] w-12 h-12 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-[#00C798] text-primary-foreground border-0"
      aria-label="Back to top"
    >
      <Image
        src={backToTopIcon}
        alt="Back to top"
        className="h-6 w-6 filter brightness-0 invert"
      />
    </Button>

  );
};

export default BackToTop;