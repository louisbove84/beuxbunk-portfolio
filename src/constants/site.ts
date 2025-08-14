// Global site configuration - Single source of truth for all constants
export const CONTACT_INFO = {
  // Personal Information
  name: 'Louis Bove',
  title: 'Machine Learning Engineer | Leader',
  location: 'Denver, CO',
  tagline: 'Developing cutting-edge ML solutions for defense applications and leading high-performance teams',
  
  // Contact Details
  email: 'louisbove84@gmail.com',
  linkedin: 'https://www.linkedin.com/in/louisbove84/',
  github: 'https://github.com/louisbove84',
  
  // Website Information
  website: 'https://www.beuxbunk.com',
  gamesUrl: 'https://prompt-game-generator.vercel.app',
  
  // Professional Summary
  bio: {
    short: 'Machine Learning Engineer specializing in defense sector applications, with expertise in graph neural networks and edge computing solutions.',
    skills: 'I develop customer-driven products through iterative test events, implementing innovative solutions for disconnected environments with deterministic requirements.',
    experience: 'My technical work focuses on image classification, research and development for \'on the edge\' systems, and building robust ML solutions that operate without internet connectivity. I bring 15 years of military experience spanning tactical operations through executive leadership, managing teams from single digits to 30+ personnel.',
    closing: 'I excel at presenting complex technical solutions to enterprise-level leadership and translating operational requirements into innovative machine learning applications.'
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
  flag: '/profile/flag.jpg',
  
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
    aiGaming: '/projects/aiGaming.png',
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
