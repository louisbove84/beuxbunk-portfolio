# Louis Bové Portfolio

A modern, responsive personal portfolio website built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### Design & User Experience
- **Minimalist, modern design** with plenty of white space
- **Dark theme by default** with light mode toggle
- **Smooth animations** and subtle hover effects
- **Responsive design** that works on all devices
- **Sticky navigation** with smooth scroll between sections
- **Mobile-friendly** with collapsible navigation menu

### Sections
1. **Hero Section**
   - Professional headshot
   - Name and tagline
   - Call-to-action buttons
   - Social media links

2. **About Section**
   - Personal bio and background
   - Technical skills organized by category
   - Experience highlights
   - Personality traits and values

3. **Projects Section**
   - Featured projects with detailed descriptions
   - Technology stack tags
   - Live demo and GitHub links
   - Additional projects in grid layout

4. **Contact Section**
   - Contact form with validation
   - Contact information cards
   - Social media links
   - Response time information

### Technical Features
- **Next.js 15** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Theme switching** (dark/light mode)
- **Smooth scrolling** navigation
- **Custom animations** with CSS keyframes
- **Accessibility features** (focus states, ARIA labels)
- **SEO optimized** with proper meta tags
- **Performance optimized** with Next.js Image component

## 🛠 Technology Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Heroicons (SVG)
- **Images**: Next.js Image optimization
- **Theme**: Custom theme context with localStorage persistence
- **Animations**: CSS keyframes and Tailwind transitions

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Various colors for different sections
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with good line height for readability

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Generous white space for better readability
- Proper section padding and margins

## 🔧 Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## 📝 Customization

### Personal Information
Update the following files with your information:
- `src/components/Hero.tsx` - Name, tagline, social links
- `src/components/About.tsx` - Bio, skills, experience
- `src/components/Projects.tsx` - Project details and links
- `src/components/Contact.tsx` - Contact information
- `src/app/layout.tsx` - SEO metadata

### Images
Replace the following images in the `public` folder:
- `headShot.jpeg` - Your professional headshot
- Project screenshots in the `images` folder

### Theme Colors
Modify colors in:
- `src/app/globals.css` - Custom CSS variables
- Tailwind classes throughout components

### Content
- Update project descriptions and links
- Modify skill lists and categories
- Customize contact form behavior
- Add or remove social media links

## 🌟 Key Components

- **Navigation**: Sticky header with smooth scroll and theme toggle
- **Hero**: Eye-catching introduction with professional photo
- **About**: Skills showcase with animated tags
- **Projects**: Portfolio grid with hover effects
- **Contact**: Functional contact form with validation
- **Footer**: Additional links and copyright information

## 🚀 Deployment

The portfolio is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**

## 📧 Contact

For questions or feedback about this portfolio template, feel free to reach out!

---

Built with ❤️ using Next.js, React, and Tailwind CSS
