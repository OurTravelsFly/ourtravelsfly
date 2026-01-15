// ===== ANIMATIONS CONTROLLER =====
class AnimationsController {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initParallax();
        this.initParticles();
        this.initCountUp();
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Add specific animations based on data attributes
                    const animationType = entry.target.dataset.animation;
                    if (animationType) {
                        this.triggerAnimation(entry.target, animationType);
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with reveal-on-scroll class
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
    }

    triggerAnimation(element, type) {
        switch (type) {
            case 'fadeIn':
                element.style.animation = 'fadeIn 0.8s ease-out';
                break;
            case 'fadeInUp':
                element.style.animation = 'fadeInUp 0.8s ease-out';
                break;
            case 'scaleIn':
                element.style.animation = 'scaleIn 0.6s ease-out';
                break;
            case 'slideInLeft':
                element.style.animation = 'slideInLeft 0.8s ease-out';
                break;
            case 'slideInRight':
                element.style.animation = 'slideInRight 0.8s ease-out';
                break;
        }
    }

    // ===== HOVER EFFECTS =====
    initHoverEffects() {
        // Card hover effects
        document.querySelectorAll('.service-card, .destination-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(card);
            });
        });

        // Button ripple effect
        document.querySelectorAll('.btn-ripple').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e, btn);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-10px)';
        element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        element.style.transition = 'all 0.3s ease';
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = '';
    }

    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===== PARALLAX EFFECTS =====
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = element.dataset.parallaxRate || 0.5;
                const offset = scrolled * rate;
                element.style.transform = `translateY(${offset}px)`;
            });
        });
    }

    // ===== PARTICLES BACKGROUND =====
    initParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        const color = `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                          ${Math.floor(Math.random() * 100 + 155)}, 
                          255, ${Math.random() * 0.3 + 0.1})`;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 10 + 10}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            this.createParticle(container);
        }, (Math.random() * 10 + 10) * 1000);
    }

    // ===== COUNT UP ANIMATIONS =====
    initCountUp() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCountUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCountUp(element) {
        const target = parseInt(element.dataset.count);
        const duration = element.dataset.duration || 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                if (element.dataset.plus) {
                    element.textContent += '+';
                }
            }
        };
        
        updateCounter();
    }

    // ===== TYPEWRITER EFFECT =====
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ===== PROGRESS BAR ANIMATION =====
    animateProgressBar(bar, percentage) {
        const fill = bar.querySelector('.progress-fill');
        if (!fill) return;
        
        fill.style.setProperty('--progress-width', `${percentage}%`);
        fill.classList.add('progress-fill');
    }

    // ===== LOADING ANIMATIONS =====
    showLoading(element) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-spinner';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(loadingDiv);
    }

    hideLoading(element) {
        const loading = element.querySelector('.loading-spinner');
        if (loading) {
            loading.remove();
        }
    }

    // ===== PAGE TRANSITIONS =====
    async pageTransition(fromPage, toPage, callback) {
        // Add transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary);
            z-index: 9999;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Start transition
        setTimeout(() => {
            overlay.style.transform = 'scaleX(1)';
        }, 10);
        
        // Execute callback
        setTimeout(async () => {
            if (callback) await callback();
            
            // End transition
            overlay.style.transformOrigin = 'right';
            overlay.style.transform = 'scaleX(0)';
            
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }, 500);
    }
}

// Initialize animations controller
document.addEventListener('DOMContentLoaded', () => {
    window.animations = new AnimationsController();
});

// ===== UTILITY ANIMATION FUNCTIONS =====
function shakeElement(element) {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function highlightElement(element, color = '#ffeb3b') {
    const originalColor = element.style.backgroundColor;
    element.style.backgroundColor = color;
    element.style.transition = 'background-color 0.3s';
    
    setTimeout(() => {
        element.style.backgroundColor = originalColor;
    }, 1000);
}

function pulseElement(element) {
    element.classList.add('animate-pulse');
    setTimeout(() => {
        element.classList.remove('animate-pulse');
    }, 1000);
}

function fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = '0';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, duration);
}

function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

// ===== CURSOR EFFECTS =====
class CursorEffects {
    constructor() {
        this.cursor = null;
        this.init();
    }

    init() {
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.1s, width 0.3s, height 0.3s;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(this.cursor);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        });

        // Hover effects
        document.querySelectorAll('a, button, .hover-effect').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.width = '40px';
                this.cursor.style.height = '40px';
                this.cursor.style.borderColor = 'var(--accent)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.width = '20px';
                this.cursor.style.height = '20px';
                this.cursor.style.borderColor = 'var(--primary)';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
    }
}

// Optional: Initialize cursor effects
// document.addEventListener('DOMContentLoaded', () => {
//     window.cursorEffects = new CursorEffects();
// });