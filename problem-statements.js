// Problem Statements Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set default light theme
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Initialize all functionality
    initializeHeader();
    initializeProblemAnimations();
    initializeTableInteractions();
    initializeMobileMenu();
    initializeScrollEffects();
});

// Header functionality
function initializeHeader() {
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Mobile menu toggle
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Problem statements section animations
function initializeProblemAnimations() {
    const problemsSection = document.querySelector('.problems-section');
    
    if (!problemsSection) return;
    
    const problemsObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const problemsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Check if mobile device
                const isMobile = window.innerWidth <= 768;
                
                if (isMobile) {
                    // On mobile, show all elements immediately without staggered animation
                    const problemElements = entry.target.querySelectorAll('.problems-title, .problems-subtitle');
                    problemElements.forEach((element) => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    });
                } else {
                    // On desktop, use staggered animation
                    const problemElements = entry.target.querySelectorAll('.problems-title, .problems-subtitle');
                    problemElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, problemsObserverOptions);

    problemsObserver.observe(problemsSection);
}

// Table interactions
function initializeTableInteractions() {
    const tableRows = document.querySelectorAll('.problems-section tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'hsl(var(--muted) / 0.3)';
            this.style.transition = 'background-color 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
        
        // Click functionality removed - no popup on row click
    });
}

// Problem details function removed - no popup functionality

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        // Add active class styles
        const style = document.createElement('style');
        style.textContent = `
            .nav.active {
                display: flex !important;
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(25px);
                flex-direction: column;
                padding: 2rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                z-index: 40;
            }
            
            .nav.active .nav-list {
                flex-direction: column;
                width: 100%;
                gap: 1rem;
            }
            
            .nav.active .nav-link {
                width: 100%;
                text-align: center;
                padding: 1rem;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            @media (min-width: 769px) {
                .nav {
                    display: flex !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Utility functions
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

// Performance optimization
function optimizePerformance() {
    // Reduce animations on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          navigator.deviceMemory <= 4 ||
                          window.innerWidth <= 768;
    
    if (isLowEndDevice) {
        // Disable heavy animations
        const style = document.createElement('style');
        style.textContent = `
            .problem-shape {
                animation: none !important;
            }
            
            .problems-title-accent {
                animation: none !important;
            }
            
            * {
                transition-duration: 0.1s !important;
                animation-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizePerformance();

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reinitialize mobile menu on resize
    const nav = document.querySelector('.nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        if (nav) nav.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    }
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const nav = document.querySelector('.nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a simple loading animation
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Export functions for potential external use
window.ProblemStatementsPage = {
    initializeProblemAnimations,
    initializeTableInteractions
};
