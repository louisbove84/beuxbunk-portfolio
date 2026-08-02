'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VISUAL_ASSETS } from '../constants/site';

type QrItem = { label: string; src: string; alt: string };

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  image?: string;
  /** Tailwind gradient classes used when the project has no screenshot. */
  gradient?: string;
  /** Short label rendered inside the gradient header. */
  gradientLabel?: string;
  liveDemo?: string;
  blogPost?: { label: string; href: string };
  qrCodes?: QrItem[];
  appLinks?: { web?: { label: string; url: string } };
}

const projects: Project[] = [
  {
    id: 1,
    title: 'mnemos',
    description:
      'Air-gappable, self-hosted memory layer for AI conversations. Phase 0 ships GPU inference on a single-node k3s cluster: NVIDIA device plugin, llama.cpp CUDA server, and an OpenAI-compatible endpoint.',
    technologies: ['Kubernetes (k3s)', 'llama.cpp', 'CUDA', 'LLM Serving', 'Homelab'],
    gradient: 'from-blue-600 via-indigo-600 to-violet-700',
    gradientLabel: 'local-first AI infrastructure',
    github: 'https://github.com/louisbove84/mnemos',
    blogPost: { label: 'Read the write-up', href: '/blog/mnemos-phase-0-gpu-inference' },
  },
  {
    id: 2,
    title: 'CarbonCheck Field',
    description:
      'Flutter mobile app that helps farmers analyze crop types and estimate carbon credit income using satellite imagery and AI.',
    image: VISUAL_ASSETS.projectImages.carbonCheckField,
    technologies: ['Flutter', 'Dart', 'Vertex AI', 'Google Earth Engine', 'Cloud Run'],
    qrCodes: [
      { src: '/images/qr-code.png', alt: 'CarbonCheck Field Android QR code', label: 'Download for Android' },
      { src: '/images/qr-code_ios.png', alt: 'CarbonCheck Field iOS QR code', label: 'Download for iOS' },
    ],
    appLinks: { web: { label: 'Web App', url: 'https://carboncheck.beuxbunk.com' } },
    github: 'https://github.com/louisbove84/carbon_check_field',
  },
  {
    id: 3,
    title: 'Birds of Play',
    description:
      'Advanced motion detection system using DBSCAN clustering with overlap-aware distance metrics. Real-time bird tracking with YOLO11 object detection, unsupervised ML clustering, and supervised fine-tuning interface.',
    image: VISUAL_ASSETS.projectImages.birdsOfPlay,
    technologies: ['C++', 'Python', 'DBSCAN', 'YOLO11', 'OpenCV', 'MongoDB'],
    liveDemo: 'https://birds-of-play.vercel.app',
    github: 'https://github.com/louisbove84/birds_of_play',
  },
  {
    id: 4,
    title: 'Drone Object Detector',
    description:
      'Object detection model trained on drone footage using YOLO architecture. Processes video clips to identify and track objects in aerial imagery.',
    image: VISUAL_ASSETS.projectImages.droneDetector,
    technologies: ['Python', 'YOLO', 'Computer Vision', 'OpenCV'],
    github: 'https://github.com/louisbove84/Drone_Object_Detector',
  },
];

const GitHubIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const CardHeader = ({ project }: { project: Project }) => {
  if (project.image) {
    return (
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className={`h-56 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${project.gradient}`}
    >
      <span className="font-mono text-2xl font-semibold text-white tracking-tight">
        {project.title}
      </span>
      {project.gradientLabel && (
        <span className="text-sm text-white/70">{project.gradientLabel}</span>
      )}
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            What I&apos;m building now — from local-first AI infrastructure to shipped apps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              <CardHeader project={project} />

              <div className="p-8 flex flex-col flex-grow">
                {/* Gradient headers already display the title, so avoid repeating it. */}
                <h3 className={project.image ? 'text-2xl font-bold text-gray-900 dark:text-white mb-3' : 'sr-only'}>
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.qrCodes && (
                  <div className="mb-6 flex flex-wrap justify-center gap-6">
                    {project.qrCodes.map((qrItem) => (
                      <div key={qrItem.label} className="flex flex-col items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {qrItem.label}
                        </span>
                        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white p-2 shadow-sm">
                          <Image
                            src={qrItem.src}
                            alt={qrItem.alt}
                            width={140}
                            height={140}
                            className="h-32 w-32 object-contain"
                            unoptimized
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-3">
                  {project.blogPost && (
                    <Link
                      href={project.blogPost.href}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {project.blogPost.label}
                    </Link>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Now
                    </a>
                  )}
                  {project.appLinks?.web && (
                    <a
                      href={project.appLinks.web.url}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {project.appLinks.web.label}
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
