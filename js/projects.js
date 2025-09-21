/**
 * Projects Page Functionality
 * Handles project filtering, search, and interactions
 */

(function() {
    'use strict';

    // ==========================================================================
    // Project Filtering
    // ==========================================================================

    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        const noProjectsMessage = document.getElementById('no-projects');

        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                filterProjects(filter, projectCards, noProjectsMessage);
            });
        });
    }

    function filterProjects(filter, projectCards, noProjectsMessage) {
        let visibleCount = 0;
        
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no projects message
        if (noProjectsMessage) {
            if (visibleCount === 0) {
                noProjectsMessage.style.display = 'block';
                noProjectsMessage.style.animation = 'fadeInUp 0.5s ease-out forwards';
            } else {
                noProjectsMessage.style.display = 'none';
            }
        }
    }

    // ==========================================================================
    // Project Search (Future Enhancement)
    // ==========================================================================

    function initProjectSearch() {
        const searchInput = document.getElementById('project-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const technologies = Array.from(card.querySelectorAll('.tech-tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const matchesSearch = title.includes(searchTerm) || 
                                    description.includes(searchTerm) ||
                                    technologies.some(tech => tech.includes(searchTerm));
                
                if (matchesSearch) {
                    card.style.display = 'block';
                    card.classList.add('search-match');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('search-match');
                }
            });
        }, 300));
    }

    // ==========================================================================
    // Project Card Interactions
    // ==========================================================================

    function initProjectInteractions() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;
                
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = card.querySelector('.project-title a');
                    if (link) link.click();
                }
            });
        });
    }

    // ==========================================================================
    // Modal for Project Details (Future Enhancement)
    // ==========================================================================

    function initProjectModal() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const quickViewBtn = card.querySelector('[data-quick-view]');
            if (!quickViewBtn) return;
            
            quickViewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const projectId = card.getAttribute('data-project-id');
                openProjectModal(projectId);
            });
        });
    }

    function openProjectModal(projectId) {
        // This would open a modal with project details
        console.log('Opening modal for project:', projectId);
        
        // Modal implementation would go here
        // For now, we'll just navigate to the project page
        window.location.href = `/projects/${projectId}`;
    }

    // ==========================================================================
    // Global Functions
    // ==========================================================================

    window.showAllProjects = function() {
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            allButton.click();
        }
    };

    // ==========================================================================
    // Utility Functions
    // ==========================================================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================================================
    // CSS Injection for Effects
    // ==========================================================================

    const projectStyles = `
        <style>
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(37, 99, 235, 0.3);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .project-card {
            cursor: pointer;
            user-select: none;
        }
        
        .project-card:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
        
        .search-match {
            border: 2px solid var(--accent);
        }
        
        .filter-btn {
            background: var(--white);
            border: 2px solid var(--gray-200);
            color: var(--gray-700);
            padding: var(--space-2) var(--space-4);
            border-radius: var(--border-radius-full);
            font-weight: var(--font-weight-medium);
            cursor: pointer;
            transition: all var(--transition-normal);
            margin: var(--space-1);
        }
        
        .filter-btn:hover {
            border-color: var(--primary);
            color: var(--primary);
            transform: translateY(-1px);
        }
        
        .filter-btn.active {
            background: var(--primary);
            border-color: var(--primary);
            color: var(--white);
        }
        
        .projects-filters {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: var(--space-12);
            gap: var(--space-2);
        }
        
        .no-projects {
            text-align: center;
            padding: var(--space-16);
            color: var(--gray-500);
        }
        
        .no-projects-content {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .no-projects i {
            font-size: var(--font-size-5xl);
            margin-bottom: var(--space-4);
            color: var(--gray-400);
        }
        
        .no-projects h3 {
            font-size: var(--font-size-2xl);
            margin-bottom: var(--space-4);
            color: var(--gray-600);
        }
        
        @media (max-width: 768px) {
            .projects-filters {
                justify-content: flex-start;
                overflow-x: auto;
                padding-bottom: var(--space-2);
            }
            
            .filter-btn {
                white-space: nowrap;
                flex-shrink: 0;
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', projectStyles);

    // ==========================================================================
    // Initialize
    // ==========================================================================

    function init() {
        initProjectFiltering();
        initProjectSearch();
        initProjectInteractions();
        initProjectModal();
        
        console.log('📁 Projects functionality initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();