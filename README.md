# Modern Express.js Portfolio Website

A sophisticated, responsive portfolio website built with Express.js, featuring modern design principles, smooth animations, and comprehensive functionality for showcasing professional work and skills.

**Now available as a static site for GitHub Pages deployment!**

## 🚀 Features

### Core Functionality
- **Express.js Backend**: Robust server with proper middleware and routing
- **Static Site Generation**: Convert to static HTML for GitHub Pages
- **EJS Templating**: Dynamic content rendering with reusable components
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern UI/UX**: Clean design with smooth animations and micro-interactions
- **Contact Form**: Backend validation with email integration (static version uses mailto)
- **SEO Optimized**: Proper meta tags, structured data, and performance optimization

### Technical Features
- **Security**: Helmet.js for security headers, CORS protection
- **Performance**: Compression middleware, optimized assets, lazy loading
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Form Validation**: Real-time validation with user-friendly error messages
- **Progressive Enhancement**: Works without JavaScript, enhanced with JS
- **Static Site Generator**: Custom build process for GitHub Pages deployment
- **Error Handling**: Comprehensive error pages and fallbacks

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web application framework
- **EJS** - Templating engine
- **Express Validator** - Form validation
- **Nodemailer** - Email functionality
- **Helmet** - Security middleware
- **Compression** - Response compression

### Frontend
- **Modern CSS** - CSS Grid, Flexbox, custom properties
- **Vanilla JavaScript** - ES6+ features, modern APIs
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family
- **Intersection Observer** - Scroll animations
- **Web APIs** - Local Storage, Fetch API

### Development
- **Nodemon** - Development auto-restart
- **File Organization** - Modular structure
- **Code Quality** - Consistent formatting and best practices

## 🌐 GitHub Pages Deployment

### Quick Deployment

```bash
# Generate static files
npm run build

# Commit and push
git add .
git commit -m "Deploy static site"
git push origin main
```

### Setup GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Set source to **Deploy from a branch**
3. Select branch: **main**
4. Select folder: **/docs**
5. Click **Save**

Your site will be available at: `https://theboredman.github.io/portfolio_website`

### Static Site Features
- ✅ All pages converted to static HTML
- ✅ Contact form uses mailto links
- ✅ Optimized for fast loading
- ✅ SEO-friendly URLs
- ✅ Custom 404 page

## 📁 Project Structure

```
portfolio/
├── docs/                  # Generated static files (GitHub Pages)
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── projects.html
│   ├── skills.html
│   ├── 404.html
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── images/           # Images and assets
├── server.js             # Main server file
├── generate-static.js    # Static site generator
├── package.json          # Dependencies and scripts
├── routes/               # Express routes
│   ├── index.js          # Home page route
│   ├── about.js          # About page route
│   ├── projects.js       # Projects page routes
│   ├── skills.js         # Skills page route
│   └── contact.js         # Contact form handling
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout template
│   ├── index.ejs          # Home page
│   ├── about.ejs          # About page
│   ├── projects.ejs       # Projects listing
│   ├── skills.ejs         # Skills showcase
│   ├── contact.ejs        # Contact form
│   ├── 404.ejs           # Error page
│   └── partials/          # Reusable components
│       ├── navbar.ejs     # Navigation bar
│       └── footer.ejs     # Footer component
├── public/                # Static assets
│   ├── css/              # Stylesheets
│   │   ├── main.css      # Core styles
│   │   ├── components.css # Component styles
│   │   ├── responsive.css # Responsive design
│   │   ├── forms.css     # Form styling
│   │   └── pages.css     # Page-specific styles
│   ├── js/               # JavaScript files
│   │   ├── main.js       # Core functionality
│   │   ├── animations.js # Animation system
│   │   ├── projects.js   # Projects page logic
│   │   ├── skills.js     # Skills page logic
│   │   └── contact.js    # Contact form logic
│   └── images/           # Image assets
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** (Optional)
   Create a `.env` file for environment variables:
   ```env
   PORT=3000
   NODE_ENV=development
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Visit the website**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

1. **Install production dependencies**
   ```bash
   npm install --production
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Main brand color
- **Secondary**: Purple (#7c3aed) - Accent and highlights
- **Accent**: Emerald (#10b981) - Success states and CTAs
- **Neutral**: Gray scale for text and backgrounds
- **Status**: Success, warning, error, and info colors

### Typography
- **Font Family**: Inter - Modern, readable sans-serif
- **Scale**: Modular scale from 0.75rem to 3.75rem
- **Weights**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights**: Tight (1.2), Normal (1.5), Relaxed (1.75)

### Spacing System
- **Base Unit**: 0.25rem (4px)
- **Scale**: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32
- **Consistent**: 8px grid system throughout

## 📱 Responsive Breakpoints

- **Mobile**: < 768px - Single column layouts, stacked navigation
- **Tablet**: 768px - 1024px - Optimized grid layouts
- **Desktop**: > 1024px - Full grid layouts with enhanced interactions
- **Large Desktop**: > 1440px - Expanded containers and typography

## ✨ Features Overview

### Navigation
- Fixed navigation with scroll effects
- Mobile-responsive hamburger menu
- Active state indicators
- Smooth scroll to sections

### Home Page
- Animated hero section with floating elements
- Featured projects showcase
- Skills preview with progress indicators
- Call-to-action sections

### About Page
- Personal story and bio
- Interactive statistics counter
- Education timeline
- Professional experience cards

### Projects Page
- Filterable project grid
- Detailed project information
- Technology stack indicators
- Live demo and GitHub links

### Skills Page
- Categorized skill display
- Animated progress bars
- Certification showcase
- Service offerings

### Contact Page
- Validated contact form
- Real-time form feedback
- Contact information display
- FAQ section

## 🔧 Customization

### Content Updates
1. **Personal Information**: Update routes files with your information
2. **Projects**: Modify the projects array in `routes/projects.js`
3. **Skills**: Update skill categories in `routes/skills.js`
4. **Images**: Replace placeholder images with your own

### Styling
1. **Colors**: Update CSS custom properties in `public/css/main.css`
2. **Typography**: Modify font imports and variables
3. **Layout**: Adjust grid systems and spacing in component files

### Functionality
1. **Contact Form**: Configure email service in `routes/contact.js`
2. **Analytics**: Add tracking codes in `views/layout.ejs`
3. **SEO**: Update meta tags and structured data

## 📊 Performance Features

- **Lazy Loading**: Images load only when needed
- **Code Splitting**: JavaScript modules loaded per page
- **Compression**: Gzip compression for all responses
- **Caching**: Static asset caching headers
- **Optimization**: Minified CSS and optimized images

## 🔒 Security Features

- **Helmet.js**: Security headers and XSS protection
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Server-side validation for all forms
- **Error Handling**: Secure error messages without sensitive data
- **Rate Limiting**: Protection against spam and abuse

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work correctly
- [ ] Mobile menu functions properly
- [ ] Contact form validates and submits
- [ ] All animations trigger correctly
- [ ] Responsive design works on all devices
- [ ] Accessibility features function properly

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Future Enhancements

- **Blog System**: Add a blog with markdown support
- **CMS Integration**: Connect to a headless CMS
- **Database**: Add database for dynamic content
- **Authentication**: Admin panel for content management
- **Analytics**: Advanced tracking and insights
- **Dark Mode**: Theme switching capability
- **Multilingual**: Internationalization support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for icons
- **Google Fonts** for typography
- **Pexels** for placeholder images
- **Express.js** community for excellent documentation
- **Modern CSS** techniques and best practices

## 📞 Support

For support or questions about this portfolio template:
- Email: imgalibb@gmail.com
- LinkedIn: [theboredman](https://www.linkedin.com/in/theboredman)

---

Built with ❤️ using Express.js and modern web technologies.