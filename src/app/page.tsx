'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-mono">
                SPACE ENGINEER
              </h1>
              <p className="text-xl text-blue-300 mb-8 font-mono">
                Louis Bove • Software Engineer • Space Enthusiast
              </p>
              <div className="space-y-4">
                <a
                  href="/frame"
                  className="inline-block bg-red-500 text-white px-8 py-3 rounded-lg font-mono font-bold hover:bg-red-600 transition-all duration-300 hover:scale-105"
                >
                  PLAY SPACE INVADERS
                </a>
                <br />
                <a
                  href="mailto:louis@beuxbunk.com"
                  className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-mono font-bold hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                >
                  CONTACT MISSION CONTROL
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Game Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black bg-opacity-50 rounded-lg p-6 border-2 border-blue-500"
            >
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                INTERACTIVE SPACE INVADERS
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="text-green-400 font-mono text-sm">
                  <div>SPACE ENGINEER v1.0</div>
                  <div>Loading game modules...</div>
                  <div>Farcaster Frame integration: ACTIVE</div>
                  <div>Enemy AI: ENABLED</div>
                  <div>Player controls: READY</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm font-mono">
                Experience the classic Space Invaders game with modern web technology. 
                Built with Next.js and optimized for Farcaster Frames.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 font-mono">
            MISSION CAPABILITIES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Python', 'JavaScript', 'React', 'Next.js', 
              'TypeScript', 'Node.js', 'C++', 'Machine Learning',
              'Data Analysis', 'Algorithm Design', 'AWS', 'Docker'
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-blue-500 bg-opacity-20 border border-blue-400 rounded-lg p-4 text-center"
              >
                <span className="text-blue-300 font-mono">{skill}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 font-mono">
            RECENT MISSIONS
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border-2 border-blue-500">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">
                SPACE ENGINEER PORTFOLIO
              </h3>
              <p className="text-gray-300 mb-4 font-mono">
                Interactive portfolio featuring Space Invaders game with Farcaster Frame integration.
                Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">Next.js</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">TypeScript</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">Farcaster</span>
              </div>
            </div>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-6 border-2 border-blue-500">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">
                MACHINE LEARNING PROJECTS
              </h3>
              <p className="text-gray-300 mb-4 font-mono">
                Various ML projects including computer vision, natural language processing,
                and predictive modeling using Python and TensorFlow.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">Python</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">TensorFlow</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">ML</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
