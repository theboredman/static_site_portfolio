/**
 * Advanced Animation System
 * Handles complex animations, scroll effects, and micro-interactions
 */

(function() {
    'use strict';

    // ==========================================================================
    // AOS (Animate On Scroll) Implementation
    // ==========================================================================

    function initAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-aos');
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        element.classList.add('aos-animate', `aos-${animationType}`);
                    }, parseInt(delay));
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        aosElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ==========================================================================
    // Parallax Effects
    // ==========================================================================

    function initParallax() {
        const parallaxElements = document.querySelectorAll('.hero-pattern, .hero-image-bg');
        
        if (parallaxElements.length === 0) return;

        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        };

        window.addEventListener('scroll', throttle(handleScroll, 16));
    }

    // ==========================================================================
    // Floating Animation for Cards
    // ==========================================================================

    function initFloatingCards() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            const floatIndex = card.getAttribute('data-float');
            const delay = floatIndex * 1000; // 1 second delay between cards
            
            card.style.animationDelay = `${delay}ms`;
            card.style.animationDuration = '3s';
            card.style.animationIterationCount = 'infinite';
            card.style.animationTimingFunction = 'ease-in-out';
        });
    }

    // ==========================================================================
    // Page Transition Effects
    // ==========================================================================

    function initPageTransitions() {
        const links = document.querySelectorAll('a[href^="/"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only apply to internal navigation, not form submissions or external links
                if (link.target === '_blank' || link.closest('form')) return;
                
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Add page exit animation
                document.body.style.opacity = '0.7';
                document.body.style.transform = 'translateY(20px)';
                document.body.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    // ==========================================================================
    // Typing Animation
    // ==========================================================================

    function initTypingAnimation() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.getAttribute('data-typing');
            const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
            
            element.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    element.classList.add('typing-complete');
                }
            };
            
            // Start typing when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // ==========================================================================
    // Hover Effects for Cards
    // ==========================================================================

    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-card, .service-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // ==========================================================================
    // Progress Bar Animations
    // ==========================================================================

    function initProgressBars() {
        const progressBars = document.querySelectorAll('.skill-bar[data-progress]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress');
                    const fill = bar.querySelector('.skill-fill') || bar;
                    
                    setTimeout(() => {
                        fill.style.width = progress + '%';
                    }, 200);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // ==========================================================================
    // Text Reveal Animation
    // ==========================================================================

    function initTextReveal() {
        const textElements = document.querySelectorAll('.reveal-text');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = text.split('').map(char => 
                `<span class="char" style="animation-delay: ${Math.random() * 0.5}s">${char}</span>`
            ).join('');
        });
    }

    // ==========================================================================
    // Mouse Cursor Effects
    // ==========================================================================

    function initCursorEffects() {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        
        animateFollower();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                cursorFollower.classList.add('hovering');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                cursorFollower.classList.remove('hovering');
            });
        });
    }

    // ==========================================================================
    // 3D Tilt Effect
    // ==========================================================================

    function init3DTilt() {
        const tiltElements = document.querySelectorAll('.project-card, .skill-card');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    // ==========================================================================
    // Stagger Animation
    // ==========================================================================

    function initStaggerAnimation() {
        const staggerGroups = document.querySelectorAll('[data-stagger]');
        
        staggerGroups.forEach(group => {
            const children = group.children;
            const delay = parseInt(group.getAttribute('data-stagger')) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * delay}ms`;
            });
        });
    }

    // ==========================================================================
    // Background Color Change on Scroll
    // ==========================================================================

    function initScrollColorChange() {
        const sections = document.querySelectorAll('section[data-bg-color]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bgColor = entry.target.getAttribute('data-bg-color');
                    document.body.style.backgroundColor = bgColor;
                }
            });
        }, { threshold: 0.6 });

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================================================
    // Initialize All Animations
    // ==========================================================================

    function initAnimations() {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        initAOS();
        initParallax();
        initFloatingCards();
        initPageTransitions();
        initTypingAnimation();
        initCardHoverEffects();
        initProgressBars();
        initTextReveal();
        initCursorEffects();
        init3DTilt();
        initStaggerAnimation();
        initScrollColorChange();
    }

    // ==========================================================================
    // Utility Functions
    // ==========================================================================

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================================================
    // CSS for Custom Animations
    // ==========================================================================

    const animationStyles = `
        <style>
        .aos-animate.aos-fade-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .aos-animate.aos-fade-left {
            animation: fadeInLeft 0.6s ease-out forwards;
        }
        
        .aos-animate.aos-fade-right {
            animation: fadeInRight 0.6s ease-out forwards;
        }
        
        .aos-animate.aos-zoom-in {
            animation: zoomIn 0.6s ease-out forwards;
        }
        
        .custom-cursor {
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        }
        
        .cursor-follower {
            position: fixed;
            width: 32px;
            height: 32px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
            transition: all 0.3s ease;
        }
        
        .custom-cursor.hovering {
            transform: scale(2);
        }
        
        .cursor-follower.hovering {
            transform: scale(1.5);
            opacity: 0.8;
        }
        
        .char {
            display: inline-block;
            animation: charReveal 0.6s ease-out forwards;
            opacity: 0;
        }
        
        @keyframes charReveal {
            from {
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
            }
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
        
        @media (max-width: 768px) {
            .custom-cursor,
            .cursor-follower {
                display: none;
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', animationStyles);

    // ==========================================================================
    // Initialize when DOM is ready
    // ==========================================================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    console.log('✨ Advanced animations initialized');

})();