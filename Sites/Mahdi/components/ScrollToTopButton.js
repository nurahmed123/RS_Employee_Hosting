// components/ScrollToTopButton.js

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show or hide the button based on scroll position
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 p-2 md:p-3 lg:p-4 rounded-full bg-[#6466f1] dark:bg-[#2d3748] text-white shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        } hover:bg-[#4b4df0] dark:hover:bg-[#3a4964]`}
      onClick={scrollToTop}
      title="Go to top"
    >
      <FaArrowUp className="text-lg md:text-xl lg:text-2xl" />
    </button>
  );
};

export default ScrollToTopButton;
