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
                  Builds production-grade ML solutions for resource-constrained and mission-critical environments. Leverages a GCP ML pipeline and expertise in graph neural networks and edge computing — delivering customer-validated systems through rapid iteration and real-world test events.
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
                    GCP
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm">
                    Graph Neural Networks
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
                  15+ years of military operations experience inform reliable, deterministic AI for disconnected and high-stakes settings. Proven ability to translate complex battlefield needs into scalable technical solutions.
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
                  Led teams of 5–30+ in tactical and strategic roles, briefing senior leaders and driving decisions under pressure. Skilled at aligning technical teams with mission objectives in dynamic environments.
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
