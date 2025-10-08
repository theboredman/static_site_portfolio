# theboredman Portfolio

An elegant, dark-themed personal portfolio website showcasing AI & Machine Learning projects with sophisticated design and smooth interactions.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎨 Design Philosophy

This portfolio embodies a **refined elegance** through:
- **Sophisticated dark aesthetics** without cyberpunk or neon styling
- **Minimal, clean UI** emphasizing whitespace and balance
- **Thoughtful typography** combining modern sans-serif with elegant serif
- **Subtle animations** that enhance rather than distract
- **Accessible design** following WCAG guidelines

## 🎯 Features

- ✨ **Elegant Dark Theme** - Deep blacks with muted gold and teal accents
- 📱 **Fully Responsive** - Seamless experience across all devices
- 🎭 **Smooth Animations** - Scroll-triggered reveals and micro-interactions
- 🎨 **Interactive Elements** - Animated skill bars, project cards with hover effects
- ♿ **Accessible** - ARIA labels, keyboard navigation, reduced motion support
- ⚡ **Performance Optimized** - Lazy loading, efficient CSS, minimal JavaScript
- 🚀 **GitHub Pages Ready** - Static site, no build process required

## 🎨 Color Palette

### Background Colors
```css
--color-bg-primary: #0a0a0a;        /* Deep black for main background */
--color-bg-secondary: #1a1a1a;      /* Charcoal for cards and sections */
--color-bg-tertiary: #2a2a2a;       /* Lighter charcoal for hover states */
--color-bg-elevated: #222222;       /* Elevated surfaces */
```

### Text Colors
```css
--color-text-primary: #f5f5f5;      /* Off-white for primary text */
--color-text-secondary: #b0b0b0;    /* Muted gray for secondary text */
--color-text-tertiary: #808080;     /* Subtle gray for captions */
```

### Accent Colors
```css
--color-accent-primary: #c9a961;    /* Muted gold - elegance and warmth */
--color-accent-secondary: #5a9fa8;  /* Muted teal - calm sophistication */
--color-accent-tertiary: #8b7d6b;   /* Warm taupe - subtle contrast */
```

**Design Reasoning:**
- **Deep blacks** (#0a0a0a, #1a1a1a) create sophisticated depth without harshness
- **Muted gold** (#c9a961) adds warmth and luxury without being flashy
- **Muted teal** (#5a9fa8) provides cool contrast and calm professionalism
- **Off-white** (#f5f5f5) ensures readability while maintaining the dark aesthetic

## 📝 Typography

### Font Families
- **Body Text:** Inter - Clean, modern sans-serif with excellent readability
- **Headings:** Playfair Display - Elegant serif that adds sophistication
- **Monospace:** JetBrains Mono - For code and technical elements

**Typography Reasoning:**
- **Inter** provides crystal-clear readability at all sizes, perfect for body content
- **Playfair Display** adds a touch of elegance and gravitas to headings
- **Fluid typography** (clamp values) ensures perfect scaling across all viewports
- **Generous line-height** (1.7 for body) improves readability

## 📁 Project Structure

```
theboredman-portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # CSS custom properties (design tokens)
│   └── main.css           # Main stylesheet
├── js/
│   └── main.js            # Interactive functionality
├── assets/
│   ├── images/            # Project images, photos
│   └── icons/             # Icon assets
├── README.md              # This file
└── .gitignore            # Git ignore rules
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/theboredman/theboredman-portfolio.git
cd theboredman-portfolio
```

2. **Open in browser:**
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Deployment to GitHub Pages

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main / (root)
   - Save

Your site will be live at: `https://theboredman.github.io/theboredman-portfolio/`

## 🎯 Customization Guide

### Update Personal Information

1. **Edit `index.html`:**
   - Update name, tagline, and bio in the Hero and About sections
   - Add your projects in the Projects section
   - Update social links in the Contact section
   - Add your email address

2. **Add Your Projects:**
   - Replace placeholder project cards
   - Add project images to `assets/images/`
   - Update project titles, descriptions, and links

3. **Update Skills:**
   - Modify skill categories and percentages
   - Adjust skill bar animations in the Skills section

### Customize Colors

Edit `css/variables.css` to change the color scheme:
```css
:root {
  --color-accent-primary: #your-color;
  --color-accent-secondary: #your-color;
  /* ... other colors */
}
```

## 🛠 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** - No frameworks, pure JS for interactivity
- **Google Fonts** - Inter & Playfair Display
- **SVG Icons** - Inline SVG for crisp icons

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus visible indicators
- Reduced motion support for users with vestibular disorders
- High contrast ratios for text readability (WCAG AA compliant)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**theboredman** (Asadullah Hil Galib)
- GitHub: [@theboredman](https://github.com/theboredman)
- LinkedIn: [theboredman](https://linkedin.com/in/theboredman)
- Email: imgalibb@gmail.com

---

**Built with ❤️ and ☕ by theboredman**

*"I build to learn, and I learn to build."*
