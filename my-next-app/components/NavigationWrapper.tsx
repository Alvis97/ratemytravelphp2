// components/NavigationWrapper.tsx
import React, { useState, useEffect } from 'react';
import StandardNavigation from './StandardNavigation';
import HamburgerNavigation from './HamburgerNavigation';

const NavigationWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile ? <HamburgerNavigation /> : <StandardNavigation />;
};

export default NavigationWrapper;
