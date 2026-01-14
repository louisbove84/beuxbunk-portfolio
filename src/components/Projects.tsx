'use client';

import React from 'react';
import Image from 'next/image';
import { VISUAL_ASSETS, CONTACT_INFO } from '../constants/site';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'CarbonCheck Field',
      description: 'Flutter mobile app that helps farmers analyze crop types and estimate carbon credit income using satellite imagery and AI.',
      image: VISUAL_ASSETS.projectImages.carbonCheckField,
      technologies: ['Flutter', 'Dart', 'Vertex AI', 'Google Earth Engine', 'Cloud Run'],
      appLinks: {
        android: {
          label: 'Google Play',
          url: 'https://play.google.com/store/apps/details?id=com.carboncheck.field&hl=en-US&ah=zvSku2bjX8c_Eo4TAMY6Z21_jII'
        },
        ios: {
          label: 'App Store',
          url: '#',
          placeholder: true
        }
      },
      github: 'https://github.com/louisbove84/carbon_check_field',
      featured: true,
      hasDemo: true
    },
    {
      id: 2,
      title: 'AI Game Generator',
      description: 'Intelligent game generation platform that creates custom games from user prompts. Features interactive gameplay with modern web technologies and AI-driven content creation.',
      image: VISUAL_ASSETS.projectImages.aiGaming,
      technologies: ['Next.js', 'React', 'TypeScript', 'AI/ML', 'Framer Motion', 'Tailwind CSS'],
      liveDemo: CONTACT_INFO.gamesUrl,
      github: 'https://github.com/louisbove84/prompt-game-generator',
      featured: false,
      hasDemo: true
    },
    {
      id: 3,
      title: 'Drone Object Detector',
      description: 'Object detection model trained on drone footage using YOLO architecture. Processes video clips to identify and track objects in aerial imagery.',
      image: VISUAL_ASSETS.projectImages.droneDetector,
      technologies: ['Python', 'YOLO', 'Computer Vision', 'OpenCV', 'Deep Learning'],
      liveDemo: '#',
      github: 'https://github.com/louisbove84/Drone_Object_Detector',
      featured: false,
      hasDemo: false
    },
    {
      id: 4,
      title: 'Age Recognition Model',
      description: 'Deep learning model using Convolutional Neural Networks to predict age from facial images. Implemented with TensorFlow and achieved high accuracy on diverse datasets.',
      image: VISUAL_ASSETS.projectImages.ageRecognition,
      technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Jupyter'],
      liveDemo: '#',
      github: 'https://github.com/louisbove84/Age_Recognition_Model',
      featured: false,
      hasDemo: false
    },
    {
      id: 5,
      title: 'Hotel EV Charging Stations Analysis',
      description: 'Data analysis project examining how Electric Vehicle Charging Stations affect hotel ratings. Comprehensive statistical analysis with data visualization.',
      image: VISUAL_ASSETS.projectImages.hotelAnalysis,
      technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Statistical Analysis'],
      liveDemo: '#',
      github: 'https://github.com/louisbove84/Hotel-EV-Charging-Stations',
      featured: false,
      hasDemo: false
    },
    {
      id: 6,
      title: 'Article Rating Predictor',
      description: 'Machine learning model to predict the popularity of articles on Towards Data Science based on titles and content. Uses NLP and feature engineering.',
      image: VISUAL_ASSETS.projectImages.articlePredictor,
      technologies: ['Python', 'NLP', 'Scikit-learn', 'Feature Engineering', 'Text Analysis'],
      liveDemo: '#',
      github: 'https://github.com/louisbove84/Article-Rating-Predictor',
      featured: false,
      hasDemo: false
    },
    {
      id: 7,
      title: 'Birds of Play',
      description: 'Advanced motion detection system using DBSCAN clustering with overlap-aware distance metrics. Real-time bird tracking with YOLO11 object detection, unsupervised ML clustering, and supervised fine-tuning interface.',
      image: VISUAL_ASSETS.projectImages.birdsOfPlay,
      technologies: ['C++', 'Python', 'DBSCAN', 'YOLO11', 'OpenCV', 'MongoDB', 'ML'],
      liveDemo: 'https://birds-of-play.vercel.app',
      github: 'https://github.com/louisbove84/birds_of_play',
      featured: true,
      hasDemo: true
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section
      id="projects"
      className="py-20 relative"
      style={{
        backgroundImage: `url(${VISUAL_ASSETS.projectsBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better content readability */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-100 drop-shadow-md max-w-3xl mx-auto">
              A showcase of my recent work and side projects
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {project.hasDemo && !project.appLinks && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Try Now
                      </a>
                    )}
                    {project.appLinks?.android && (
                      <a
                        href={project.appLinks.android.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {project.appLinks.android.label}
                      </a>
                    )}
                    {project.appLinks?.ios && (
                      <a
                        href={project.appLinks.ios.url}
                        target={project.appLinks.ios.placeholder ? '_self' : '_blank'}
                        rel={project.appLinks.ios.placeholder ? undefined : 'noopener noreferrer'}
                        onClick={project.appLinks.ios.placeholder ? (event) => event.preventDefault() : undefined}
                        aria-disabled={project.appLinks.ios.placeholder ? 'true' : undefined}
                        className={`inline-flex items-center px-4 py-2 font-semibold rounded-lg transition-colors ${
                          project.appLinks.ios.placeholder
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {project.appLinks.ios.label}
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target={project.github.startsWith('http') ? '_blank' : '_self'}
                        rel={project.github.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-8 text-center">
              Other Notable Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      {project.hasDemo && !project.appLinks && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                        >
                          Demo
                        </a>
                      )}
                      {project.appLinks?.android && (
                        <a
                          href={project.appLinks.android.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
                        >
                          {project.appLinks.android.label}
                        </a>
                      )}
                      {project.appLinks?.ios && (
                        <a
                          href={project.appLinks.ios.url}
                          target={project.appLinks.ios.placeholder ? '_self' : '_blank'}
                          rel={project.appLinks.ios.placeholder ? undefined : 'noopener noreferrer'}
                          onClick={project.appLinks.ios.placeholder ? (event) => event.preventDefault() : undefined}
                          aria-disabled={project.appLinks.ios.placeholder ? 'true' : undefined}
                          className={`flex-1 text-center py-2 text-sm font-semibold rounded transition-colors ${
                            project.appLinks.ios.placeholder
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {project.appLinks.ios.label}
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target={project.github.startsWith('http') ? '_blank' : '_self'}
                          rel={project.github.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`${project.hasDemo ? 'flex-1' : 'px-6'} inline-flex items-center justify-center py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded hover:border-gray-400 dark:hover:border-gray-500 transition-colors`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Projects;
