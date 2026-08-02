import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Writing from '../components/Writing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { getAllPosts } from '../lib/blog';

const Home = () => {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Writing posts={latestPosts} />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
