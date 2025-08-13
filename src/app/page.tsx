'use client';

import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    // If this is being loaded in a Farcaster context, redirect to the frame
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const isFarcaster = userAgent.includes('Farcaster') || 
                         window.location.search.includes('farcaster') ||
                         document.referrer.includes('farcaster');
      
      if (isFarcaster) {
        window.location.href = '/frame';
        return;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;