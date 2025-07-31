# BeuxBunk Portfolio

A modern, responsive portfolio website built with React and Material-UI, showcasing my projects and skills.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark theme
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Fast Performance**: Optimized React components and lazy loading
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Contact Form**: Functional contact form for easy communication
- **Project Showcase**: Beautiful project cards with live demos and GitHub links

## 🛠️ Technologies Used

- **Frontend**: React.js, Material-UI, Framer Motion
- **Styling**: CSS-in-JS with Material-UI's sx prop
- **Routing**: React Router DOM
- **Icons**: Material-UI Icons
- **Deployment**: Vercel (with custom domain: beuxbunk.com)

## 📁 Project Structure

```
src/
├── components/
│   └── Navbar.js          # Navigation component
├── pages/
│   ├── Home.js           # Landing page with hero section
│   ├── Projects.js       # Projects showcase
│   ├── About.js          # About me and skills
│   └── Contact.js        # Contact form and info
├── App.js                # Main app component with routing
└── index.js              # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
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
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🎨 Customization

### Colors and Theme

The theme is defined in `src/App.js`. You can customize:

- Primary color: `#00d4ff` (cyan)
- Secondary color: `#ff6b6b` (coral)
- Background: `#0a192f` (dark blue)
- Text colors: `#ccd6f6` (light) and `#8892b0` (secondary)

### Content

Update the following files to customize your content:

- **Personal Info**: `src/pages/Home.js` - Hero section
- **Projects**: `src/pages/Projects.js` - Project cards
- **About**: `src/pages/About.js` - Skills and experience
- **Contact**: `src/pages/Contact.js` - Contact information and social links

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Add navigation link in `src/components/Navbar.js`

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure your custom domain (beuxbunk.com)
4. Deploy automatically on every push

### Other Platforms

The build folder can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Website**: [beuxbunk.com](https://beuxbunk.com)
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your Name](https://linkedin.com/in/yourusername)

---

Made with ❤️ by BeuxBunk
