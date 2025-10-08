// Projects data
const projects = [
  {
    title: "SkinCheck",
    subtitle: "Mobile Edge AI for Skin Rash Detection",
    description: "Visual + Sonification architecture for multi-class skin rash detection with tone-aware training pipeline for fairness across diverse skin tones. TensorFlow Lite export (FP32 & INT8) optimized for mobile devices.",
    icon: "🔬",
    tech: ["TensorFlow", "Mobile AI", "Computer Vision", "Edge Computing"]
  },
  {
    title: "NSU Advising Assistant",
    subtitle: "Automated Course Registration Monitor",
    description: "Real-time alerts for seat availability with custom refresh intervals and live activity tracking. Smart notifications for quick registration.",
    icon: "🎓",
    tech: ["Python", "Automation", "Web Scraping", "Notifications"]
  },
  {
    title: "PAWsitive Care",
    subtitle: "Pet Clinic Management System",
    description: "Full-stack Django system with RBAC authentication, medical records, billing. Implemented clean architecture and design patterns for reliability.",
    icon: "🐾",
    tech: ["Django", "PostgreSQL", "RBAC", "Clean Architecture"]
  },
  {
    title: "SciBio GCSE (SRS)",
    subtitle: "Adaptive Learning Platform",
    description: "Adaptive learning platform for GCSE biology with modular microservices, secure authentication, and interactive quizzes.",
    icon: "🧬",
    tech: ["Microservices", "React", "Authentication", "Education"]
  },
  {
    title: "Third-Person Shooter Game",
    subtitle: "Multiplayer-Ready TPS",
    description: "Multiplayer-ready TPS with responsive mechanics and immersive design. Built with focus on performance and user experience.",
    icon: "🎮",
    tech: ["Game Development", "Multiplayer", "3D Graphics", "Performance"]
  }
];

// Skills data
const skillsData = [
  {
    category: "AI & Data Science",
    icon: "🤖",
    skills: ["Machine Learning", "Deep Learning (CNNs, GANs)", "TensorFlow/Keras", "Algorithmic Trading", "Data Analysis", "Computer Vision", "Edge AI"]
  },
  {
    category: "Full-Stack Development",
    icon: "💻",
    skills: ["Python", "Django", "Django REST Framework", "React.js", "Node.js", "Express.js", "MySQL", "SQLite", "Firebase", "PostgreSQL"]
  },
  {
    category: "System & Embedded Development",
    icon: "⚡",
    skills: ["C", "ARM Assembly", "STM32", "Linux", "Edge AI", "Embedded Systems", "Real-time Systems"]
  },
  {
    category: "Tools & Technologies",
    icon: "🔧",
    skills: ["Git", "LaTeX/Overleaf", "Flutter", "HTML/CSS/JavaScript", "UI Design", "Game Testing", "Docker", "Microservices"]
  }
];

// Typewriter effect
const typewriterText = [
  "I build intelligent systems that connect software, data, and the real world.",
  "I explore AI, machine learning, and embedded systems.",
  "I create technology that bridges creativity with automation.",
  "I make AI feel more human."
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function typewriter() {
  const typewriterElement = document.getElementById('typewriter');
  const currentText = typewriterText[currentTextIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typewriterSpeed = 50;
  } else {
    typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typewriterSpeed = 100;
  }

  if (!isDeleting && currentCharIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 2000);
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typewriterText.length;
  }

  setTimeout(typewriter, typewriterSpeed);
}

// Projects renderer
function renderProjects() {
  const projectsContainer = document.getElementById('projects-container');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = projects.map(project => `
    <div class="project-card section-fade">
      <div class="text-4xl mb-4">${project.icon}</div>
      <h3 class="text-xl font-semibold mb-2 text-blue-400">${project.title}</h3>
      <h4 class="text-sm font-medium mb-3 text-gray-300">${project.subtitle}</h4>
      <p class="text-gray-300 mb-4 leading-relaxed">${project.description}</p>
      <div class="flex flex-wrap gap-2">
        ${project.tech.map(tech => `<span class="skill-badge">${tech}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Skills renderer
function renderSkills() {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  skillsContainer.innerHTML = skillsData.map(category => `
    <div class="section-fade">
      <div class="flex items-center mb-4">
        <span class="text-3xl mr-3">${category.icon}</span>
        <h3 class="text-xl font-semibold text-blue-400">${category.category}</h3>
      </div>
      <div class="flex flex-wrap gap-3">
        ${category.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}

// Intersection Observer for animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with section-fade class
  document.querySelectorAll('.section-fade').forEach(el => {
    observer.observe(el);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Main portfolio JS loaded');

  // Render dynamic content
  renderProjects();
  renderSkills();

  // Setup interactivity
  setupSmoothScrolling();
  setupMobileMenu();

  // Setup scroll animations after content is rendered
  setTimeout(setupScrollAnimations, 100);

  // Start main typewriter effect after loading completes
  // The loadingComplete variable is now in the global scope from the inline script
  const checkLoadingComplete = setInterval(() => {
    if (window.loadingComplete) {
      clearInterval(checkLoadingComplete);
      setTimeout(typewriter, 500);
    }
  }, 100);

  // Add initial fade-in animation to hero section
  const heroSection = document.querySelector('.hero__content');
  if (heroSection) {
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroSection.style.transition = 'all 1s ease-out';
      heroSection.style.opacity = '1';
      heroSection.style.transform = 'translateY(0)';
    }, 300);
  }

  console.log('🚀 theboredman portfolio loaded successfully!');
});
