// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Enhanced Banner Animations
    initEnhancedBannerAnimations();
    
    // Initialize Interactive Cursor Effects
    initInteractiveCursorEffects();
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Toggle functionality
    window.toggleFAQ = function(button) {
        const faqCard = button.closest('.faq-card');
        const faqContent = faqCard.querySelector('.faq-content');
        const faqIcon = faqCard.querySelector('.faq-icon-circle');
        
        if (faqCard.classList.contains('active')) {
            // Close FAQ
            faqCard.classList.remove('active');
            faqContent.style.maxHeight = '0';
            
            // Reset icon styles
            if (faqIcon) {
                faqIcon.style.transform = 'scale(1) rotate(0deg)';
                faqIcon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))';
                faqIcon.style.borderColor = 'hsl(var(--primary) / 0.3)';
            }
        } else {
            // Close all other FAQs first
            const allFaqCards = document.querySelectorAll('.faq-card');
            allFaqCards.forEach(card => {
                if (card !== faqCard) {
                    card.classList.remove('active');
                    const content = card.querySelector('.faq-content');
                    if (content) {
                        content.style.maxHeight = '0';
                    }
                    const icon = card.querySelector('.faq-icon-circle');
                    if (icon) {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                        icon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))';
                        icon.style.borderColor = 'hsl(var(--primary) / 0.3)';
                    }
                }
            });
            
            // Open current FAQ
            faqCard.classList.add('active');
            faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
            
            // Update icon styles
            if (faqIcon) {
                faqIcon.style.transform = 'scale(1.1) rotate(5deg)';
                faqIcon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.25))';
                faqIcon.style.borderColor = 'hsl(var(--primary) / 0.5)';
            }
        }
    };

    // Registration form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.department || !data.year) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Registering...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Registration submitted successfully! You will receive a confirmation email soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Idea Submission Countdown Timer
    function updateCountdown() {
        const targetDate = new Date('September 26, 2025 23:59:59').getTime();
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);


        } else {
            // Countdown finished
        }
    }

    // Function to check if registration is closed and update UI
    function updateRegistrationStatus() {
        // Always disable registration buttons regardless of date
        const registrationButtonIds = [
            'nav-register-btn',
            'mobile-register-btn', 
            'hero-register-btn'
        ];

        registrationButtonIds.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                // Force update button text and styling
                button.innerHTML = '<span class="btn-text">REGISTRATION CLOSED</span>';
                button.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
                button.style.cursor = 'not-allowed';
                button.style.opacity = '0.7';
                button.disabled = true;
                
                // Remove any existing onclick handlers and add new one
                button.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showRegistrationClosedMessage();
                    return false;
                };
                
                console.log(`Updated button ${buttonId} to REGISTRATION CLOSED`);
            } else {
                console.log(`Button ${buttonId} not found`);
            }
        });

        // Update countdown banner text
        const countdownBanner = document.querySelector('.countdown-banner-content');
        if (countdownBanner) {
            const bannerText = countdownBanner.querySelector('.countdown-banner-text');
            if (bannerText) {
                bannerText.textContent = 'Idea submission closes on 26 SEP 2025:';
            }
        }

        // Update extension banner
        const extensionBanner = document.querySelector('.registration-extension-banner');
        if (extensionBanner) {
            extensionBanner.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            const extensionText = extensionBanner.querySelector('.registration-extension-text');
            const extensionDetails = extensionBanner.querySelector('.registration-extension-details');
            if (extensionText) {
                extensionText.textContent = '🎉FINALS OF KIT-IDEA HACK 2025 🎉';
            }
            if (extensionDetails) {
                extensionDetails.textContent = 'Get ready to showcase your innovative ideas in the grand finale on 07 November 2025!';
            }
        }
    }

    // Function to show registration closed message
    function showRegistrationClosedMessage() {
        // Create a modal or alert to show registration is closed
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #1f2937, #374151);
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            color: white;
            max-width: 400px;
            margin: 1rem;
            border: 2px solid #dc2626;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🚫</div>
            <h2 style="color: #dc2626; margin-bottom: 1rem; font-size: 1.5rem;">Registration Closed</h2>
            <p style="margin-bottom: 1.5rem; color: #d1d5db;">
                Registration for KIT-Idea Hack 2025 has closed on September 22, 2025. 
                However, idea submission has been extended until September 26, 2025 for already registered participants.
            </p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, #dc2626, #b91c1c);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Check registration status immediately on page load
    updateRegistrationStatus();
    
    // Force update all registration buttons on page load
    setTimeout(() => {
        updateRegistrationStatus();
    }, 100);

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'hsl(var(--background) / 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'hsl(var(--background) / 0.8)';
            header.style.backdropFilter = 'blur(16px)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add animation on scroll
    // Scroll-triggered animations - DISABLED
    /* const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('section, .card, .group');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }); */

    // About section specific animations - DISABLED
    /* const aboutSection = document.querySelector('.about-section');
    const aboutObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to benefit cards
                const benefitCards = entry.target.querySelectorAll('.benefit-card');
                benefitCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                // Add staggered animation to stats
                const stats = entry.target.querySelectorAll('.about-stat');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.opacity = '1';
                        stat.style.transform = 'translateY(0)';
                    }, (index + 1) * 200);
                });
            }
        });
    }, aboutObserverOptions);

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    } */

    // Floating cards hover effects - DISABLED
    /* const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
        });
    }); */

    // Benefit cards enhanced interactions - DISABLED
    /* const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            }
        });
    }); */

    // Problem statements section animations - DISABLED
    /* const problemsSection = document.querySelector('.problems-section');
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
                    // On mobile, show all cards immediately without staggered animation
                    const problemCards = entry.target.querySelectorAll('.problem-card');
                    problemCards.forEach((card) => {
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                    });
                } else {
                    // On desktop, use staggered animation
                    const problemCards = entry.target.querySelectorAll('.problem-card');
                    problemCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 50); // Reduced delay for better performance
                    });
                }
            }
        });
    }, problemsObserverOptions);

    if (problemsSection) {
        problemsObserver.observe(problemsSection);
    }

    // Problem cards enhanced interactions (desktop only)
    const isMobileDevice = window.innerWidth <= 768;
    if (!isMobileDevice) {
        const problemCards = document.querySelectorAll('.problem-card');
        problemCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const category = card.querySelector('.problem-category');
                if (category) {
                    category.style.transform = 'scale(1.05)';
                    category.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const category = card.querySelector('.problem-category');
                if (category) {
                    category.style.transform = 'scale(1)';
                    category.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))';
                }
            });
        });
    } */

    // Instructions section specific animations - DISABLED
    /*
    const instructionsSection = document.querySelector('.instructions-section');
    const instructionsObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const instructionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to timeline steps
                const timelineSteps = entry.target.querySelectorAll('.timeline-step');
                timelineSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                // Add staggered animation to rule items
                const ruleItems = entry.target.querySelectorAll('.rule-item');
                ruleItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, (index + 6) * 100);
                });
            }
        });
    }, instructionsObserverOptions);

    if (instructionsSection) {
        instructionsObserver.observe(instructionsSection);
    } */

    // Timeline step hover effects - DISABLED
    /* const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach(step => {
        const stepIcon = step.querySelector('.step-icon');
        const stepContent = step.querySelector('.step-content');
        
        step.addEventListener('mouseenter', () => {
            if (stepIcon) {
                stepIcon.style.transform = 'scale(1.1) rotate(10deg)';
                stepIcon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))';
                stepIcon.style.borderColor = 'hsl(var(--primary) / 0.6)';
            }
            if (stepContent) {
                stepContent.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            if (stepIcon) {
                stepIcon.style.transform = 'scale(1) rotate(0deg)';
                stepIcon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))';
                stepIcon.style.borderColor = 'hsl(var(--primary) / 0.3)';
            }
            if (stepContent) {
                stepContent.style.transform = 'translateY(0) scale(1)';
            }
        });
    }); */

    // Rule items enhanced interactions - DISABLED
    /*
    const ruleItems = document.querySelectorAll('.rule-item');
    ruleItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.rule-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.rule-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = 'none';
            }
        });
    }); 
    */

    // Global function for inline onclick
    window.toggleMobileMenu = function() {
        console.log('toggleMobileMenu function called!');
        const mobileMenuButton = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                document.body.style.overflow = '';
                console.log('Menu closed');
            }
        } else {
            console.warn('Mobile menu elements not found!');
        }
    };

    // Floating Cards Cursor Interaction
    function initFloatingCards() {
        const cards = document.querySelectorAll('.side-card');
        
        cards.forEach(card => {
            // Mouse move effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    translateY(-15px) 
                    scale(1.08) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            });
            
            // Mouse leave effect
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 600);
            });
            
            // Mouse enter effect
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            // Click effect
            card.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Card bounce effect
                card.style.transform = 'translateY(-20px) scale(1.1) rotateY(10deg)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 200);
            });
        });
    }
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize floating cards
    initFloatingCards();
    
    
    // Initialize interactive banner elements
    initInteractiveBannerElements();
    
    // Initialize About button navigation
    initAboutButtonNavigation();
    
    // Initialize enhanced title interactions
    initEnhancedTitleEffects();
    
    // About Button Navigation System
    function initAboutButtonNavigation() {
        const aboutButton = document.querySelector('.hero-btn-tertiary');
        
        if (aboutButton) {
            aboutButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Smooth scroll to about section
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // If about section doesn't exist, scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                
                // Add click effect
                aboutButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    aboutButton.style.transform = '';
                }, 150);
            });
        }
    }
    
    
    
    // Interactive Banner Elements System
    function initInteractiveBannerElements() {
        let mouseX = 0;
        let mouseY = 0;
        
        // Track mouse movement for all elements
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update all interactive elements
            updateSpiderWebInteraction(mouseX, mouseY);
            updateParticlesInteraction(mouseX, mouseY);
            updateOrbsInteraction(mouseX, mouseY);
            updateShapesInteraction(mouseX, mouseY);
            updateRaysInteraction(mouseX, mouseY);
        });
        
        // Add hover effects to all elements
        addHoverEffects();
        
        // Create dynamic particles
        createDynamicParticles();
        
        // Create floating geometric shapes
        createFloatingShapes();
    }
    
    function updateSpiderWebInteraction(mouseX, mouseY) {
        const webLines = document.querySelectorAll('.web-line');
        const webNodes = document.querySelectorAll('.web-node');
        
        webLines.forEach((line, index) => {
            const rect = line.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 100) {
                const intensity = (100 - distance) / 100;
                line.style.stroke = `rgba(255, 255, 255, ${0.3 + intensity * 0.5})`;
                line.style.strokeWidth = 1 + intensity * 2;
            } else {
                line.style.stroke = 'rgba(255, 255, 255, 0.3)';
                line.style.strokeWidth = '1';
            }
        });
        
        webNodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 80) {
                const intensity = (80 - distance) / 80;
                node.style.fill = `rgba(255, 255, 255, ${0.4 + intensity * 0.6})`;
                node.setAttribute('r', 2 + intensity * 3);
            } else {
                node.style.fill = 'rgba(255, 255, 255, 0.4)';
                node.setAttribute('r', '2');
            }
        });
    }
    
    function updateParticlesInteraction(mouseX, mouseY) {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 120) {
                const intensity = (120 - distance) / 120;
                const moveX = (mouseX - (rect.left + rect.width / 2)) * intensity * 0.3;
                const moveY = (mouseY - (rect.top + rect.height / 2)) * intensity * 0.3;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 2})`;
                particle.style.opacity = 0.8 + intensity * 0.2;
            } else {
                particle.style.transform = '';
                particle.style.opacity = '0.8';
            }
        });
    }
    
    function updateOrbsInteraction(mouseX, mouseY) {
        const orbs = document.querySelectorAll('.orb');
        
        orbs.forEach((orb, index) => {
            const rect = orb.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 150) {
                const intensity = (150 - distance) / 150;
                const moveX = (mouseX - (rect.left + rect.width / 2)) * intensity * 0.2;
                const moveY = (mouseY - (rect.top + rect.height / 2)) * intensity * 0.2;
                
                orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.5})`;
                orb.style.background = `radial-gradient(circle, rgba(255, 255, 255, ${0.1 + intensity * 0.2}) 0%, transparent 70%)`;
            } else {
                orb.style.transform = '';
                orb.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)';
            }
        });
    }
    
    function updateShapesInteraction(mouseX, mouseY) {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const rect = shape.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 100) {
                const intensity = (100 - distance) / 100;
                const rotation = intensity * 180;
                
                shape.style.transform = `rotate(${rotation}deg) scale(${1 + intensity * 0.5})`;
                shape.style.borderColor = `rgba(255, 255, 255, ${0.1 + intensity * 0.4})`;
            } else {
                shape.style.transform = '';
                shape.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });
    }
    
    function updateRaysInteraction(mouseX, mouseY) {
        const rays = document.querySelectorAll('.ray');
        
        rays.forEach((ray, index) => {
            const rect = ray.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
                Math.pow(mouseY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 200) {
                const intensity = (200 - distance) / 200;
                ray.style.background = `linear-gradient(45deg, transparent, rgba(255, 255, 255, ${0.1 + intensity * 0.2}), transparent)`;
                ray.style.opacity = 0.5 + intensity * 0.5;
            } else {
                ray.style.background = 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)';
                ray.style.opacity = '0.5';
            }
        });
    }
    
    function addHoverEffects() {
        // Add click effects to all interactive elements
        const interactiveElements = document.querySelectorAll('.web-line, .web-node, .particle, .orb, .shape, .ray');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                createRippleEffect(element);
                
                // Add special effects based on element type
                if (element.classList.contains('web-line')) {
                    element.style.stroke = 'rgba(255, 255, 255, 1)';
                    element.style.strokeWidth = '3';
                    setTimeout(() => {
                        element.style.stroke = 'rgba(255, 255, 255, 0.3)';
                        element.style.strokeWidth = '1';
                    }, 1000);
                } else if (element.classList.contains('web-node')) {
                    element.style.fill = 'rgba(255, 255, 255, 1)';
                    element.setAttribute('r', '6');
                    setTimeout(() => {
                        element.style.fill = 'rgba(255, 255, 255, 0.4)';
                        element.setAttribute('r', '2');
                    }, 1000);
                }
            });
        });
    }
    
    function createDynamicParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        const numDynamicParticles = 10;
        
        for (let i = 0; i < numDynamicParticles; i++) {
            const particle = document.createElement('div');
            particle.className = `particle particle-dynamic-${i + 1}`;
            
            // Random properties
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomSize = Math.random() * 4 + 2;
            const randomDelay = Math.random() * 12;
            const randomDuration = Math.random() * 8 + 8;
            
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
            particle.style.width = randomSize + 'px';
            particle.style.height = randomSize + 'px';
            particle.style.animationDelay = randomDelay + 's';
            particle.style.animationDuration = randomDuration + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    function createFloatingShapes() {
        const shapesContainer = document.querySelector('.geometric-shapes');
        const numDynamicShapes = 8;
        
        for (let i = 0; i < numDynamicShapes; i++) {
            const shape = document.createElement('div');
            shape.className = `shape shape-dynamic-${i + 1}`;
            
            // Random properties
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomSize = Math.random() * 30 + 20;
            const randomDelay = Math.random() * 20;
            const randomDuration = Math.random() * 15 + 15;
            const shapes = ['circle', 'square', 'triangle', 'hexagon'];
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            
            shape.style.left = randomX + '%';
            shape.style.top = randomY + '%';
            shape.style.width = randomSize + 'px';
            shape.style.height = randomSize + 'px';
            shape.style.animationDelay = randomDelay + 's';
            shape.style.animationDuration = randomDuration + 's';
            
            // Apply random shape
            if (randomShape === 'circle') {
                shape.style.borderRadius = '50%';
            } else if (randomShape === 'triangle') {
                shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            } else if (randomShape === 'hexagon') {
                shape.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
            }
            
            shapesContainer.appendChild(shape);
        }
    }
    
    // Floating PNG Background System - REMOVED
    function initFloatingPNGs() {
        // Function removed - no floating PNG images
        return;
    }
    
    // Enhanced Title Effects System - DISABLED
    function initEnhancedTitleEffects() {
        // All title effects removed - static display only
        return;
    }
    
    // All title effect functions removed
    

    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('Mobile menu button:', mobileMenuButton);
    console.log('Mobile menu:', mobileMenu);
    
    // Check if elements exist before proceeding
    if (mobileMenuButton && mobileMenu) {
        // Click event
        mobileMenuButton.addEventListener('click', (e) => {
            console.log('Mobile menu button clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            mobileMenuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            console.log('Menu active:', mobileMenu.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Touch event for better mobile support
        mobileMenuButton.addEventListener('touchend', (e) => {
            console.log('Mobile menu button touched!');
            e.preventDefault();
            e.stopPropagation();
            
            mobileMenuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            console.log('Menu active:', mobileMenu.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Mobile menu elements not found!');
    }
    
    // Close mobile menu when clicking on links
    if (mobileMenu) {
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
                if (mobileMenuButton) mobileMenuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking on buttons
    const mobileButtons = mobileMenu.querySelectorAll('.mobile-cta-button, .mobile-login-button');
    mobileButtons.forEach(button => {
        button.addEventListener('click', () => {
                if (mobileMenuButton) mobileMenuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuButton && mobileMenu && 
            !mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Registration pop-up message
    function showRegistrationMessage() {
        const popup = document.getElementById('registration-popup');
        if (popup) {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
            startCountdown();
        }
    }

    // Close pop-up function
    function closeRegistrationPopup() {
        const popup = document.getElementById('registration-popup');
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Countdown timer function
    function startCountdown() {
        const targetDate = new Date('September 22, 2025 23:59:59').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                // Registration is open
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
        
        // Store interval ID to clear it when popup closes
        window.registrationCountdownInterval = countdownInterval;
    }

    // Pop-up event listeners
    const popupClose = document.getElementById('popup-close');
    const popupOk = document.getElementById('popup-ok');
    const popupOverlay = document.getElementById('registration-popup');
    
    if (popupClose) {
        popupClose.addEventListener('click', closeRegistrationPopup);
    }
    
    if (popupOk) {
        popupOk.addEventListener('click', closeRegistrationPopup);
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closeRegistrationPopup();
            }
        });
    }
    
    // Clear countdown when popup closes
    function clearCountdown() {
        if (window.registrationCountdownInterval) {
            clearInterval(window.registrationCountdownInterval);
            window.registrationCountdownInterval = null;
        }
    }
    
    // Override close function to clear countdown
    const originalCloseRegistrationPopup = closeRegistrationPopup;
    closeRegistrationPopup = function() {
        clearCountdown();
        originalCloseRegistrationPopup();
    };

    // Login and Register button functionality - Firebase Auth removed
    // Buttons are disabled elsewhere; no auth override needed
    
    // Handle problem statements button
    const heroProblemButton = document.querySelector('.hero-btn-secondary');
    if (heroProblemButton) {
        heroProblemButton.addEventListener('click', function() {
            // Navigate to problem statements page
            window.location.href = 'problem-statements.html';
        });
    }

    // Roadmap Timeline section specific animations
    const timelineSection = document.querySelector('.timeline-section');
    const timelineObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to roadmap nodes
                const roadmapNodes = entry.target.querySelectorAll('.roadmap-node');
                roadmapNodes.forEach((node, index) => {
                    setTimeout(() => {
                        node.classList.add('animate');
                    }, index * 200);
                });
            }
        });
    }, timelineObserverOptions);

    if (timelineSection) {
        timelineObserver.observe(timelineSection);
    }

    // Roadmap node hover effects
    const roadmapNodes = document.querySelectorAll('.roadmap-node');
    roadmapNodes.forEach(node => {
        const nodeContent = node.querySelector('.node-content');
        
        node.addEventListener('mouseenter', () => {
            if (nodeContent) {
                nodeContent.style.transform = 'translateY(-8px) scale(1.03)';
            }
        });

        node.addEventListener('mouseleave', () => {
            if (nodeContent) {
                nodeContent.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Benefits section specific animations
    const benefitsSection = document.querySelector('.benefits-section');
    const benefitsObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to benefit cards
                const benefitCards = entry.target.querySelectorAll('.benefit-card');
                benefitCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, benefitsObserverOptions);

    if (benefitsSection) {
        benefitsObserver.observe(benefitsSection);
    }

    // FAQ section specific animations
    const faqSection = document.querySelector('.faq-section');
    const faqObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation to FAQ items
                const faqItems = entry.target.querySelectorAll('.faq-item');
                faqItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, faqObserverOptions);

    if (faqSection) {
        faqObserver.observe(faqSection);
    }

    // FAQ card hover effects
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const faqIcon = card.querySelector('.faq-icon-circle');
        
        card.addEventListener('mouseenter', () => {
            if (faqIcon) {
                faqIcon.style.transform = 'scale(1.1) rotate(5deg)';
                faqIcon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))';
                faqIcon.style.borderColor = 'hsl(var(--primary) / 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (faqIcon && !card.classList.contains('active')) {
                faqIcon.style.transform = 'scale(1) rotate(0deg)';
                faqIcon.style.background = 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))';
                faqIcon.style.borderColor = 'hsl(var(--primary) / 0.3)';
            }
        });
    });

    // Set default light theme
    document.documentElement.setAttribute('data-theme', 'light');

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        // Force update registration buttons after page is fully loaded
        updateRegistrationStatus();
    });

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top when button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Utility functions
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.group, .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons - DISABLED
    /* const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }); */
});

// Enhanced Banner Animation Functions
function initEnhancedBannerAnimations() {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Simplified animations for mobile
        gsap.fromTo('.tech-icon', 
            { opacity: 0, scale: 0.8 },
            { opacity: 0.4, scale: 1, duration: 1, ease: "power2.out", stagger: 0.1, delay: 0.5 }
        );
        
        
        return; // Skip complex animations on mobile
    }
    // Animate tech icons with GSAP
    gsap.fromTo('.tech-icon', 
        { 
            opacity: 0, 
            scale: 0.5, 
            rotation: -180 
        },
        { 
            opacity: 0.6, 
            scale: 1, 
            rotation: 0, 
            duration: 1.5, 
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 0.5
        }
    );


    // Animate small particles with complex motion
    gsap.to('.particle:not(.particle-medium):not(.particle-large):not(.particle-xl)', {
        y: "random(-100, 100)",
        x: "random(-50, 50)",
        rotation: "random(-360, 360)",
        scale: "random(0.5, 1.5)",
        duration: "random(8, 15)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 2,
            from: "random"
        }
    });

    // Animate medium particles with more complex motion
    gsap.to('.particle-medium', {
        y: "random(-120, 120)",
        x: "random(-60, 60)",
        rotation: "random(-720, 720)",
        scale: "random(0.7, 1.8)",
        duration: "random(12, 20)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 3,
            from: "random"
        }
    });

    // Animate large particles with dramatic motion
    gsap.to('.particle-large', {
        y: "random(-150, 150)",
        x: "random(-80, 80)",
        rotation: "random(-1080, 1080)",
        scale: "random(0.8, 2.2)",
        duration: "random(15, 25)",
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 4,
            from: "random"
        }
    });

    // Animate extra large particles with epic motion
    gsap.to('.particle-xl', {
        y: "random(-200, 200)",
        x: "random(-100, 100)",
        rotation: "random(-1440, 1440)",
        scale: "random(1.0, 2.5)",
        duration: "random(20, 30)",
        ease: "power3.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 5,
            from: "random"
        }
    });

    // Animate floating orbs
    gsap.to('.orb', {
        y: "random(-80, 80)",
        x: "random(-40, 40)",
        rotation: "random(-180, 180)",
        scale: "random(0.8, 1.2)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 3,
            from: "random"
        }
    });

    // Animate geometric shapes
    gsap.to('.shape', {
        y: "random(-60, 60)",
        x: "random(-30, 30)",
        rotation: "random(-360, 360)",
        scale: "random(0.7, 1.3)",
        duration: "random(12, 18)",
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
            amount: 4,
            from: "random"
        }
    });

    // Animate light rays
    gsap.to('.ray', {
        x: "100vw",
        duration: 8,
        ease: "power2.inOut",
        repeat: -1,
        stagger: 2,
        delay: "random(0, 4)"
    });

    // Animate binary rain
    gsap.to('.binary-column', {
        y: "100vh",
        duration: 20,
        ease: "none",
        repeat: -1,
        stagger: 4
    });

    // Animate holographic overlay
    gsap.to('.holographic-overlay', {
        x: "100%",
        duration: 8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
    });

    // Animate circuit pattern
    gsap.to('.circuit-svg', {
        opacity: 0.2,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
    });

    // Enhanced title animations
    gsap.fromTo('.hero-title .enhanced-word', 
        { 
            opacity: 0, 
            y: 100, 
            scale: 0.5 
        },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.5, 
            ease: "back.out(1.7)",
            stagger: 0.3,
            delay: 0.2
        }
    );

    gsap.fromTo('.hero-year .enhanced-word', 
        { 
            opacity: 0, 
            y: 50, 
            scale: 0.8 
        },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2, 
            ease: "power2.out",
            delay: 1.5
        }
    );

    // Animate subtitle
    gsap.fromTo('.hero-subtitle', 
        { 
            opacity: 0, 
            y: 30 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out",
            delay: 2
        }
    );

    // Animate countdown section with floating effect
    gsap.fromTo('.countdown-section', 
        { 
            opacity: 0, 
            y: 40, 
            scale: 0.9 
        },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2, 
            ease: "back.out(1.7)",
            delay: 2.5
        }
    );

    // Add floating animation to countdown card
    gsap.to('.floating-countdown', {
        y: "random(-15, 15)",
        x: "random(-8, 8)",
        rotation: "random(-2, 2)",
        duration: "random(6, 10)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3
    });

    // Add entrance animation for floating countdown timer
    gsap.fromTo('.floating-countdown-timer', 
        { 
            opacity: 0, 
            x: 100, 
            y: -50,
            scale: 0.8 
        },
        { 
            opacity: 1, 
            x: 0, 
            y: 0,
            scale: 1, 
            duration: 1.5, 
            ease: "back.out(1.7)",
            delay: 2
        }
    );

    // Add entrance animation for hero feature stats
    gsap.fromTo('.hero-feature-stats', 
        { 
            opacity: 0, 
            x: -100, 
            y: -20,
            scale: 0.8 
        },
        { 
            opacity: 1, 
            x: 0, 
            y: 0,
            scale: 1, 
            duration: 1.5, 
            ease: "back.out(1.7)",
            delay: 2.5
        }
    );

    // Add floating animation for feature stats
    gsap.to('.hero-feature-stats', {
        y: -3,
        x: 2,
        rotation: 0.5,
        duration: 4,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3
    });

    // Add enhanced hover animations for feature stats
    const featureStats = document.querySelectorAll('.hero-feature-stats .about-stat');
    featureStats.forEach((stat, index) => {
        stat.addEventListener('mouseenter', () => {
            gsap.to(stat, {
                scale: 1.05,
                y: -8,
                rotation: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        stat.addEventListener('mouseleave', () => {
            gsap.to(stat, {
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // Animate buttons with floating effect
    gsap.fromTo('.hero-buttons .hero-btn-primary, .hero-buttons .hero-btn-secondary, .hero-buttons .hero-btn-tertiary', 
        { 
            opacity: 0, 
            y: 30, 
            scale: 0.8 
        },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1, 
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 3
        }
    );

    // Add floating animation to buttons
    gsap.to('.floating-btn', {
        y: "random(-10, 10)",
        x: "random(-5, 5)",
        rotation: "random(-1, 1)",
        duration: "random(4, 8)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        delay: 4
    });

    // Add hover animations for tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.3,
                rotation: 15,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });


    // Add playful hover effects for floating countdown
    const floatingCountdown = document.querySelector('.floating-countdown');
    if (floatingCountdown) {
        floatingCountdown.addEventListener('mouseenter', () => {
            gsap.to(floatingCountdown, {
                scale: 1.02,
                y: -10,
                rotation: 2,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        });
        
        floatingCountdown.addEventListener('mouseleave', () => {
            gsap.to(floatingCountdown, {
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }

    // Add playful hover effects for floating buttons
    const floatingButtons = document.querySelectorAll('.floating-btn');
    floatingButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                y: -5,
                rotation: 3,
                duration: 0.2,
                ease: "back.out(1.7)"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                y: 0,
                rotation: 0,
                duration: 0.2,
                ease: "power2.out"
            });
        });

        // Add click effect
        button.addEventListener('click', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        });
    });
}

// Interactive Cursor Effects
function initInteractiveCursorEffects() {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        return; // Skip cursor effects on mobile
    }
    
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let isMouseMoving = false;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        if (cursorTrail) {
            cursorTrail.classList.add('active');
        }
    });

    // Hide cursor when mouse stops moving
    let mouseTimeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            if (cursorTrail) {
                cursorTrail.classList.remove('active');
            }
        }, 100);
    });

    // Smooth cursor trail animation
    function animateCursor() {
        if (isMouseMoving) {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            if (cursorTrail) {
                cursorTrail.style.left = trailX - 10 + 'px';
                cursorTrail.style.top = trailY - 10 + 'px';
            }
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Interactive effects for floating elements
    const interactiveElements = document.querySelectorAll('.tech-icon, .particle, .orb, .shape');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            // Create ripple effect
            createRippleEffect(e.target, e.clientX, e.clientY);
            
            // Add glow effect
            gsap.to(element, {
                filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('click', (e) => {
            // Create explosion effect
            createExplosionEffect(e.target, e.clientX, e.clientY);
        });
    });
}

// Ripple Effect Function
function createRippleEffect(element, x, y) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x - rect.left - size / 2}px;
        top: ${y - rect.top - size / 2}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: ripple 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Explosion Effect Function
function createExplosionEffect(element, x, y) {
    const particles = [];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particleCount) * i;
        const velocity = Math.random() * 100 + 50;
        
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        gsap.to(particle, {
            x: Math.cos(angle * Math.PI / 180) * velocity,
            y: Math.sin(angle * Math.PI / 180) * velocity,
            opacity: 0,
            scale: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
