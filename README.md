# BeuxBunk Portfolio - Space Engineer

A modern, responsive portfolio website built with Next.js 15, featuring an interactive Space Invaders game and Farcaster Frame integration.

## 🚀 Features

- **Modern Design**: Clean, professional design with space engineer theme
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Interactive Game**: Space Invaders game with canvas rendering
- **Farcaster Integration**: Full Farcaster Frame support with MiniKit SDK
- **Fast Performance**: Optimized Next.js components with TypeScript
- **Material-UI**: Professional UI components with custom space theme

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Farcaster**: MiniKit SDK, OnchainKit
- **Deployment**: Vercel

## 📁 Project Structure

### API Routes:
- **`/src/app/api/frame/route.ts`** - Handles Farcaster frame interactions
- **`/src/app/api/frame-image/route.ts`** - Generates dynamic SVG frame images

### Frame Components:
- **`/src/app/frame/page.tsx`** - Interactive Space Invaders game with MiniKit SDK
- **`/src/app/frame/layout.tsx`** - Farcaster metadata and frame configuration

### Main App Files:
- **`/src/app/page.tsx`** - Homepage with Space Engineer theme and play button
- **`/src/app/layout.tsx`** - Root layout with providers
- **`/src/app/globals.css`** - Global styling with Tailwind
- **`/src/app/providers.tsx`** - MiniKit provider configuration

### Configuration:
- **`farcaster-manifest.json`** - Frame manifest for Farcaster
- **`FRAME_README.md`** - Comprehensive documentation

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
- **Email**: louis@beuxbunk.com
- **Frame**: Play Space Invaders directly in Farcaster

---

Made with ❤️ by BeuxBunk - Space Engineer