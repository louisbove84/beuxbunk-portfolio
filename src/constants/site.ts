// Global site configuration - Single source of truth for all constants
export const CONTACT_INFO = {
  // Personal Information
  name: 'Louis Bové',
  title: 'Data Scientist & Full-Stack Developer',
  location: 'Denver, CO',
  tagline: 'Turning data into insights and building intelligent applications with modern technologies',
  
  // Contact Details
  email: 'louisbove84@gmail.com',
  linkedin: 'https://www.linkedin.com/in/louisbove84/',
  github: 'https://github.com/louisbove84',
  
  // Website Information
  website: 'https://www.beuxbunk.com',
  gamesUrl: 'https://prompt-game-generator-y94azagr0-louis-projects-67d6b226.vercel.app',
  
  // Professional Summary
  bio: {
    short: 'Data Scientist and Full-Stack Developer based in Denver, CO, with a passion for turning data into actionable insights and creating digital experiences that make a difference.',
    skills: 'I specialize in machine learning, data analysis, and modern web technologies.',
    experience: 'My work spans from building predictive models and neural networks to developing interactive web applications. I enjoy tackling complex problems in areas like age recognition, object detection, and article rating prediction using cutting-edge technologies.',
    closing: 'When I\'m not analyzing data or coding, you can find me exploring new machine learning techniques, contributing to open-source projects, or sharing knowledge with the developer community.'
  },
  
  // Social Media
  social: {
    twitter: 'https://x.com/louisBove154433',
  }
} as const;

// Visual Assets - Centralized image and theme paths
export const VISUAL_ASSETS = {
  // Profile Images
  headshot: '/profile/headShot.jpeg',
  
  // Background Images
  heroBackground: '/backgrounds/granite.jpg',
  projectsBackground: '/backgrounds/granite.jpg', // Same as hero for consistency
  
  // Alternative backgrounds (for easy switching)
  backgrounds: {
    granite: '/backgrounds/granite.jpg',
    alternative: '/backgrounds/pexels-pixabay-73873.jpg',
    // Add more background options here as needed
    // mountain: '/backgrounds/mountain.jpg',
    // abstract: '/backgrounds/abstract.jpg',
  },
  
  // Project Images (for easy management)
  projectImages: {
    memeGames: '/games/itsFine.jpg',
    ageRecognition: '/projects/ageRecognition.jpeg',
    hotelAnalysis: '/projects/chargingStation.jpeg',
    articlePredictor: '/projects/articleRating.jpeg',
    droneDetector: '/projects/droneDector.jpeg',
    birdsOfPlay: '/projects/birdsOfPlay.jpg',
  }
} as const;

// Helper function to get mailto link
export const getMailtoLink = (subject?: string, body?: string) => {
  let mailto = `mailto:${CONTACT_INFO.email}`;
  const params = [];
  
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  
  if (params.length > 0) {
    mailto += `?${params.join('&')}`;
  }
  
  return mailto;
};

// Helper function to get LinkedIn profile URL
export const getLinkedInUrl = () => CONTACT_INFO.linkedin;

// Helper function to get GitHub profile URL
export const getGitHubUrl = () => CONTACT_INFO.github;

// Helper function to get Twitter/X profile URL
export const getTwitterUrl = () => CONTACT_INFO.social.twitter;
