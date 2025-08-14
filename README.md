# BeuxBunk Portfolio - Machine Learning Engineer

A modern, responsive portfolio website built with Next.js 15, showcasing ML engineering expertise and leadership experience in the defense sector.

## 🚀 Features

- **Professional Portfolio**: Clean, modern design showcasing ML engineering expertise
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **About Me**: Structured narrative highlighting ML, defense, and leadership experience
- **Project Showcase**: Featured projects with live demos and GitHub links
- **Contact Integration**: Professional contact form with social media links
- **Patriotic Theming**: Subtle American flag overlay reflecting defense sector background

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Images**: Next.js Image optimization
- **External Integration**: AI Game Generator (separate Vercel deployment)
- **Deployment**: Vercel

## 📁 Project Structure

### Core Components:
- **`/src/components/Hero.tsx`** - Hero section with American flag overlay
- **`/src/components/About.tsx`** - Professional narrative with technical skills
- **`/src/components/Projects.tsx`** - Project showcase with featured/other projects
- **`/src/components/Contact.tsx`** - Contact form with social media links
- **`/src/components/Footer.tsx`** - Footer with quick links and branding

### Main App Files:
- **`/src/app/page.tsx`** - Main portfolio homepage
- **`/src/app/layout.tsx`** - Root layout with metadata and providers
- **`/src/app/globals.css`** - Global styling with Tailwind CSS
- **`/src/constants/site.ts`** - Centralized configuration and constants

### Configuration:
- **`/public/.well-known/farcaster.json`** - Farcaster frame configuration
- **`.cursorrules`** - AI coding guidelines and commit message standards
- **`.env.example`** - Environment variables template

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beuxbunk-portfolio.git
cd beuxbunk-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates a `.next` folder with optimized production files.

## 🎮 Farcaster Frame Features

### Frame URLs

- **Frame Page**: `http://localhost:3000/frame`
- **Frame Image API**: `http://localhost:3000/api/frame-image`
- **Frame API**: `http://localhost:3000/api/frame`

### Game Controls

- **Arrow Keys**: Move left/right
- **Spacebar**: Shoot
- **Restart Button**: Reset the game

### MiniKit Integration

The frame includes full MiniKit SDK integration with:
- Frame saving functionality
- Profile viewing
- Notification support
- Close frame action

## 🎨 Customization

### Colors and Theme

The theme uses a space engineer aesthetic with:
- Primary color: `#4a90e2` (blue)
- Accent color: `#ff6b6b` (red)
- Background: `#0a0a2e` (dark blue)
- Text colors: `#ffffff` (white) and various space-themed colors

### Content

Update the following files to customize your content:

- **Personal Info**: `src/app/page.tsx` - Hero section and skills
- **Game**: `src/app/frame/page.tsx` - Space Invaders game logic
- **Navigation**: `src/components/Navbar.tsx` - Navigation items
- **Theme**: `src/components/ThemeRegistry.tsx` - Material-UI theme

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_URL` - Your production domain
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - OnchainKit API key
   - `NEXT_PUBLIC_ICON_URL` - Icon URL for MiniKit
4. Deploy automatically on every push

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-api-key
NEXT_PUBLIC_ICON_URL=https://your-domain.vercel.app/icon.svg
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

Test the Farcaster frame using:
- Farcaster's frame validator
- Local development server
- Frame debugging tools

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Website**: [beuxbunk.com](https://beuxbunk.com)
- **Email**: louisbove84@gmail.com
- **LinkedIn**: [linkedin.com/in/louisbove84](https://linkedin.com/in/louisbove84)
- **GitHub**: [github.com/louisbove84](https://github.com/louisbove84)

---

Made with ❤️ by Louis Bove - Machine Learning Engineer | Leader