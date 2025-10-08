// ===================================
// MAIN JAVASCRIPT
// Elegant Dark Theme Portfolio
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initSkillBars();
  initContactForm();
  initFooterYear();
  initNavScroll();
  initParticleSystem();
  initSectionParticles();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!navToggle || !navMenu) return;

  // Toggle menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip empty hrefs
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Animate skill bars when they become visible
        if (entry.target.classList.contains('skill-card')) {
          animateSkillBarsInCard(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const elementsToAnimate = document.querySelectorAll(`
    .about__content,
    .skill-card,
    .project-card,
    .contact__form,
    .contact__info
  `);

  elementsToAnimate.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar__fill');

  skillBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    bar.style.setProperty('--percent', `${percent}%`);
  });
}

function animateSkillBarsInCard(card) {
  const skillBars = card.querySelectorAll('.skill-bar__fill');

  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.classList.add('animate');
      const percent = bar.getAttribute('data-percent');
      bar.style.width = `${percent}%`;

      // Add ripple effect
      createRippleEffect(bar);
    }, index * 150);
  });
}

// Create ripple effect for skill bars
function createRippleEffect(element) {
  const ripple = document.createElement('div');
  ripple.className = 'skill-ripple';
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    // Basic validation
    if (!validateForm(formData)) {
      showMessage('Please fill in all fields correctly.', 'error');
      return;
    }

    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    // Simulate form submission (replace with actual backend endpoint)
    try {
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      showMessage('Thank you! Your message has been sent successfully.', 'success');
      form.reset();
    } catch (error) {
      showMessage('Sorry, something went wrong. Please try again later.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      data.name.trim().length > 0 &&
      emailRegex.test(data.email) &&
      data.subject.trim().length > 0 &&
      data.message.trim().length > 10
    );
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form__message ${type}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.className = 'form__message';
    }, 5000);
  }
}

// ===== FOOTER YEAR =====
function initFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ===== NAVIGATION ON SCROLL =====
function initNavScroll() {
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Hide nav on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    // Add shadow to nav when scrolled
    if (currentScroll > 50) {
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('.section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = nav.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== PERFORMANCE: LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Close mobile menu with Escape key
  if (e.key === 'Escape') {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navMenu && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// ===== THEME HELPERS =====
// Detect user's preferred color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  // User prefers light mode - but this portfolio is designed for dark theme
  console.log('Dark theme active');
}

// Log console message
console.log('%c🎨 Portfolio designed by theboredman', 'color: #c9a961; font-size: 14px; font-weight: bold;');
console.log('%c✨ Built with HTML, CSS, and Vanilla JavaScript', 'color: #5a9fa8; font-size: 12px;');

// ===== PARTICLE SYSTEM =====
function initParticleSystem() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  // Canvas setup
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#c9a961' : '#5a9fa8';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;

      // Subtle pulsing effect
      this.opacity += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.01;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize particles
  function createParticles() {
    const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 10000));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections between nearby particles
    drawConnections();

    animationId = requestAnimationFrame(animate);
  }

  // Draw lines between nearby particles
  function drawConnections() {
    ctx.strokeStyle = '#c9a961';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.1;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // Initialize and start
  resizeCanvas();
  createParticles();
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  // Pause animation when tab is not visible (performance optimization)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });
}

// ===== SECTION PARTICLES =====
function initSectionParticles() {
  const sectionParticles = document.querySelectorAll('.section-particles');

  sectionParticles.forEach(container => {
    const canvas = container.querySelector('.section-particles__canvas');
    const section = container.getAttribute('data-section');

    if (!canvas) return;

    createSectionParticleSystem(canvas, section, container);
  });
}

function createSectionParticleSystem(canvas, sectionType, container) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  // Section-specific configurations
  const configs = {
    hero: {
      particleCount: 30,
      colors: ['#c9a961', '#5a9fa8', '#ffffff'],
      speed: 0.3,
      size: { min: 1, max: 3 },
      connections: true
    },
    skills: {
      particleCount: 25,
      colors: ['#c9a961', '#5a9fa8'],
      speed: 0.2,
      size: { min: 0.5, max: 2 },
      connections: false,
      pattern: 'circuit'
    },
    projects: {
      particleCount: 35,
      colors: ['#5a9fa8', '#c9a961'],
      speed: 0.4,
      size: { min: 1, max: 2.5 },
      connections: true,
      pattern: 'flow'
    },
    contact: {
      particleCount: 20,
      colors: ['#c9a961', '#5a9fa8', '#ffffff'],
      speed: 0.25,
      size: { min: 1.5, max: 4 },
      connections: false,
      pattern: 'pulse'
    }
  };

  const config = configs[sectionType] || configs.hero;

  // Resize canvas
  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  // Section-specific particle class
  class SectionParticle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * (config.size.max - config.size.min) + config.size.min;
      this.speedX = (Math.random() - 0.5) * config.speed;
      this.speedY = (Math.random() - 0.5) * config.speed;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.angle = Math.random() * Math.PI * 2;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      // Different movement patterns based on section
      switch (config.pattern) {
        case 'circuit':
          this.x += Math.sin(this.angle) * config.speed;
          this.y += Math.cos(this.angle) * config.speed;
          this.angle += 0.01;
          break;
        case 'flow':
          this.x += this.speedX;
          this.y += this.speedY + Math.sin(this.x * 0.01) * 0.1;
          break;
        case 'pulse':
          this.x += this.speedX;
          this.y += this.speedY;
          this.pulse += 0.02;
          this.opacity = 0.3 + Math.sin(this.pulse) * 0.3;
          break;
        default:
          this.x += this.speedX;
          this.y += this.speedY;
      }

      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles
  function createParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new SectionParticle());
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections if enabled
    if (config.connections) {
      drawConnections();
    }

    animationId = requestAnimationFrame(animate);
  }

  // Draw connections between nearby particles
  function drawConnections() {
    ctx.strokeStyle = config.colors[0];
    ctx.lineWidth = 0.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const opacity = (80 - distance) / 80 * 0.15;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // Initialize
  resizeCanvas();
  createParticles();
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  // Pause when not visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate();
      } else {
        cancelAnimationFrame(animationId);
      }
    });
  });

  observer.observe(container);
}
