import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface FloatingLayerProps {
  children: React.ReactNode;
}

export const FloatingLayer: React.FC<FloatingLayerProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[40]">
      {children}
    </div>,
    document.body
  );
};

