'use client';

import React from 'react';

const About = () => {

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Professional Summary with Narrative + Badges */}
          <div className="space-y-8">
            {/* Machine Learning Engineering */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mt-2"></div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Machine Learning Engineering</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Specializes in developing cutting-edge ML solutions with a focus on graph neural networks and edge computing systems. Creates customer-driven products through iterative test events, ensuring solutions meet real-world requirements while operating in resource-constrained environments.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    PyTorch
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    C++
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    CI/CD
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Javascript
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    AFSIM
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    LLM Integration
                  </span>
                </div>
              </div>
            </div>
            
            {/* Defense Sector Expertise */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mt-2"></div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Defense Sector Expertise</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  With 15+ years of military experience, brings deep understanding of defense operations and analysis. Specializes in implementing innovative solutions for disconnected environments where reliability and deterministic behavior are critical for mission success.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Self-Directed Leadership
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    High-Tempo Operations
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Operations Analysis
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Process Improvement
                  </span>
                </div>
              </div>
            </div>
            
            {/* Leadership & Communication */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-2 h-2 bg-gray-800 dark:bg-gray-200 rounded-full mt-2"></div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Leadership & Communication</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Extensive experience managing teams ranging from 5 to 30+ personnel across tactical and strategic roles. Comfortable presenting complex technical concepts to enterprise leadership and facilitating decision-making cycles in high-stakes environments.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Team Management
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Executive Presentations
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Strategic Planning
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Decision Making
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
