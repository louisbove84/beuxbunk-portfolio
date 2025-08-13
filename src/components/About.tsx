'use client';

import React from 'react';
import { CONTACT_INFO } from '../constants/site';

const About = () => {
  const skills = [
    {
      category: 'Data Science & ML',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter']
    },
    {
      category: 'Web Development',
      technologies: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'HTML/CSS']
    },
    {
      category: 'Tools & Technologies',
      technologies: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'C++', 'Data Visualization']
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate developer with a love for creating innovative solutions and beautiful user experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {CONTACT_INFO.bio.short} {CONTACT_INFO.bio.skills}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {CONTACT_INFO.bio.experience}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {CONTACT_INFO.bio.closing}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                🚀 Problem Solver
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                🎨 UI/UX Enthusiast
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                📚 Continuous Learner
              </span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                🤝 Team Player
              </span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Technical Skills
            </h3>
            
            {skills.map((skillGroup, index) => (
              <div key={skillGroup.category} className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {skillGroup.category}
                </h4>
                
                <div className="flex flex-wrap gap-2 ml-5">
                  {skillGroup.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-default"
                      style={{
                        animationDelay: `${index * 100 + techIndex * 50}ms`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Experience Highlights */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                🏆 Experience Highlights
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>5+ years of full-stack development experience</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Led multiple successful web application projects</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Strong background in modern JavaScript frameworks</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Passionate about clean code and best practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
