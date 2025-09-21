/**
 * Skills Page Functionality
 * Handles skill animations, progress bars, and interactive elements
 */

(function() {
    'use strict';

    // ==========================================================================
    // Skill Bar Animations
    // ==========================================================================

    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar[data-progress]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    function animateSkillBar(skillBar) {
        const progress = parseInt(skillBar.getAttribute('data-progress'));
        const fill = skillBar.querySelector('.skill-fill');
        
        if (fill) {
            setTimeout(() => {
                fill.style.width = progress + '%';
                
                // Add a subtle glow effect
                fill.style.boxShadow = `0 0 10px rgba(37, 99, 235, 0.3)`;
            }, 200);
        }
    }

    // ==========================================================================
    // Skills Matrix Animation
    // ==========================================================================

    function initSkillsMatrix() {
        const matrixRows = document.querySelectorAll('.matrix-row');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateMatrixRow(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        matrixRows.forEach(row => observer.observe(row));
    }

    function animateMatrixRow(row) {
        const levelIndicators = row.querySelectorAll('.level-indicator');
        
        levelIndicators.forEach((indicator, index) => {
            if (indicator.classList.contains('active')) {
                setTimeout(() => {
                    indicator.style.transform = 'scale(1.2)';
                    indicator.style.background = 'var(--primary)';
                    
                    setTimeout(() => {
                        indicator.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            }
        });
    }

    // ==========================================================================
    // Certification Card Hover Effects
    // ==========================================================================

    function initCertificationEffects() {
        const certCards = document.querySelectorAll('.certification-card');
        
        certCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const badge = card.querySelector('.cert-badge');
                if (badge) {
                    badge.style.transform = 'rotate(360deg) scale(1.2)';
                    badge.style.color = 'var(--accent)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const badge = card.querySelector('.cert-badge');
                if (badge) {
                    badge.style.transform = 'rotate(0deg) scale(1)';
                    badge.style.color = '';
                }
            });
        });
    }

    // ==========================================================================
    // Service Cards Interactive Effects
    // ==========================================================================

    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.service-icon');
                const features = card.querySelectorAll('.service-features li');
                
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotateY(180deg)';
                }
                
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(10px)';
                        feature.style.color = 'var(--primary)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.service-icon');
                const features = card.querySelectorAll('.service-features li');
                
                if (icon) {
                    icon.style.transform = '';
                }
                
                features.forEach(feature => {
                    feature.style.transform = '';
                    feature.style.color = '';
                });
            });
        });
    }

    // ==========================================================================
    // Skill Level Visualization
    // ==========================================================================

    function initSkillVisualization() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const skillBar = item.querySelector('.skill-bar-container');
            const percentage = item.querySelector('.skill-percentage');
            
            if (skillBar && percentage) {
                const level = parseInt(percentage.textContent);
                
                // Add color coding based on skill level
                let colorClass = '';
                if (level >= 85) colorClass = 'expert';
                else if (level >= 70) colorClass = 'advanced';
                else if (level >= 50) colorClass = 'intermediate';
                else colorClass = 'beginner';
                
                skillBar.classList.add(`skill-level-${colorClass}`);
            }
        });
    }

    // ==========================================================================
    // Interactive Skill Tooltips
    // ==========================================================================

    function initSkillTooltips() {
        const skillNames = document.querySelectorAll('.skill-name');
        
        skillNames.forEach(skillName => {
            skillName.addEventListener('mouseenter', (e) => {
                const tooltip = createTooltip(getSkillInfo(skillName.textContent));
                document.body.appendChild(tooltip);
                
                positionTooltip(tooltip, e.target);
            });
            
            skillName.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.skill-tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    }

    function createTooltip(info) {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `
            <h4>${info.name}</h4>
            <p>${info.description}</p>
            <div class="tooltip-experience">Experience: ${info.experience}</div>
        `;
        return tooltip;
    }

    function positionTooltip(tooltip, target) {
        const rect = target.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.top = rect.bottom + 10 + 'px';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.zIndex = '1000';
    }

    function getSkillInfo(skillName) {
        // Mock skill information - in a real app, this would come from data
        const skillsData = {
            'Python': {
                name: 'Python',
                description: 'Primary language for AI/ML development and automation',
                experience: '3+ years'
            },
            'TensorFlow/Keras': {
                name: 'TensorFlow/Keras',
                description: 'Deep learning framework for building and training neural networks',
                experience: '2+ years'
            },
            'JavaScript': {
                name: 'JavaScript',
                description: 'Modern web development with ES6+ features and frameworks',
                experience: '3+ years'
            }
            // Add more skills as needed
        };
        
        return skillsData[skillName] || {
            name: skillName,
            description: 'Proficient in this technology',
            experience: '1+ years'
        };
    }

    // ==========================================================================
    // Skill Category Switching
    // ==========================================================================

    function initCategorySwitching() {
        const categoryHeaders = document.querySelectorAll('.category-header');
        
        categoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const category = header.closest('.skill-category');
                const skillsGrid = category.querySelector('.skills-grid');
                
                category.classList.toggle('collapsed');
                
                if (category.classList.contains('collapsed')) {
                    skillsGrid.style.maxHeight = '0';
                    skillsGrid.style.opacity = '0';
                } else {
                    skillsGrid.style.maxHeight = 'none';
                    skillsGrid.style.opacity = '1';
                }
            });
        });
    }

    // ==========================================================================
    // Skill Comparison Feature
    // ==========================================================================

    function initSkillComparison() {
        const skillItems = document.querySelectorAll('.skill-item');
        let selectedSkills = [];
        
        skillItems.forEach(item => {
            item.addEventListener('dblclick', () => {
                item.classList.toggle('selected');
                
                const skillName = item.querySelector('.skill-name').textContent;
                const skillLevel = parseInt(item.querySelector('.skill-percentage').textContent);
                
                if (item.classList.contains('selected')) {
                    selectedSkills.push({ name: skillName, level: skillLevel });
                } else {
                    selectedSkills = selectedSkills.filter(skill => skill.name !== skillName);
                }
                
                updateComparisonView();
            });
        });
    }

    function updateComparisonView() {
        // This would update a comparison panel
        console.log('Selected skills for comparison:', selectedSkills);
    }

    // ==========================================================================
    // Initialize
    // ==========================================================================

    function init() {
        initSkillBars();
        initSkillsMatrix();
        initCertificationEffects();
        initServiceCards();
        initSkillVisualization();
        initSkillTooltips();
        initCategorySwitching();
        initSkillComparison();
        
        console.log('🎯 Skills functionality initialized');
    }

    // ==========================================================================
    // CSS Injection
    // ==========================================================================

    const skillsStyles = `
        <style>
        .skill-level-expert .skill-fill {
            background: linear-gradient(135deg, var(--success), var(--accent));
        }
        
        .skill-level-advanced .skill-fill {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        
        .skill-level-intermediate .skill-fill {
            background: linear-gradient(135deg, var(--warning), #f97316);
        }
        
        .skill-level-beginner .skill-fill {
            background: linear-gradient(135deg, var(--gray-400), var(--gray-500));
        }
        
        .skill-tooltip {
            background: var(--gray-900);
            color: var(--white);
            padding: var(--space-3);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            font-size: var(--font-size-sm);
            max-width: 200px;
            animation: fadeInUp 0.3s ease-out;
        }
        
        .skill-tooltip h4 {
            margin-bottom: var(--space-2);
            color: var(--primary);
            font-size: var(--font-size-base);
        }
        
        .tooltip-experience {
            margin-top: var(--space-2);
            font-weight: var(--font-weight-medium);
            color: var(--accent);
        }
        
        .skill-category.collapsed .category-header {
            cursor: pointer;
        }
        
        .skill-category .skills-grid {
            transition: all var(--transition-normal);
            overflow: hidden;
        }
        
        .skill-item.selected {
            border: 2px solid var(--primary);
            transform: scale(1.02);
        }
        
        .cert-badge {
            transition: all var(--transition-normal);
        }
        
        .service-features li {
            transition: all var(--transition-fast);
            padding-left: var(--space-2);
        }
        
        .level-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--gray-300);
            transition: all var(--transition-normal);
        }
        
        .level-indicator.active {
            background: var(--primary);
            box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }
        
        .matrix-row {
            display: grid;
            grid-template-columns: 2fr repeat(4, 1fr);
            gap: var(--space-4);
            align-items: center;
            padding: var(--space-3);
            border-bottom: 1px solid var(--gray-200);
            transition: background-color var(--transition-fast);
        }
        
        .matrix-row:hover {
            background-color: var(--gray-50);
        }
        
        .skill-name-cell {
            font-weight: var(--font-weight-medium);
            color: var(--gray-900);
        }
        
        .level-cell {
            display: flex;
            justify-content: center;
        }
        
        .matrix-header {
            display: grid;
            grid-template-columns: 2fr repeat(4, 1fr);
            gap: var(--space-4);
            padding: var(--space-4);
            background: var(--gray-100);
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            font-weight: var(--font-weight-semibold);
            color: var(--gray-700);
            text-align: center;
        }
        
        .matrix-header .matrix-cell:first-child {
            text-align: left;
        }
        
        .matrix-container {
            background: var(--white);
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-md);
            margin-top: var(--space-8);
        }
        
        @media (max-width: 768px) {
            .matrix-grid {
                overflow-x: auto;
            }
            
            .matrix-row,
            .matrix-header {
                min-width: 500px;
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', skillsStyles);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initSkillBars();
        initSkillsMatrix();
        initCertificationEffects();
        initServiceCards();
        initSkillVisualization();
        initSkillTooltips();
        initCategorySwitching();
        initSkillComparison();
        
        console.log('🎯 Skills animations initialized');
    }

})();