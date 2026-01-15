// ===== MAIN APPLICATION =====
class FlyTravelsApp {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize all modules
        await this.initializeModules();
        this.bindEvents();
        
        // Show welcome toast
        setTimeout(() => this.showToast('✨ Welcome to FlyTravels! Start your journey today!'), 1000);
    }

    async initializeModules() {
        // Load data
        await this.loadData();
        
        // Initialize components
        this.initNavigation();
        this.initTheme();
        this.initBookingWidget();
        this.initSliders();
        this.initCounters();
        this.initBackToTop();
    }

    // ===== DATA LOADING =====
    async loadData() {
        try {
            // Load destinations, offers, testimonials from data.js
            this.destinations = window.travelData?.destinations || this.getFallbackDestinations();
            this.offers = window.travelData?.offers || this.getFallbackOffers();
            this.testimonials = window.travelData?.testimonials || this.getFallbackTestimonials();
            
            // Populate UI
            this.populateDestinations();
            this.populateOffers();
            this.populateTestimonials();
        } catch (error) {
            console.error('Error loading data:', error);
            // Load fallback data
            this.loadFallbackData();
        }
    }

    // ... (rest of the code remains the same until bindEvents)

    // ===== EVENT BINDING =====
    bindEvents() {
        // Newsletter subscription
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                if (emailInput) {
                    const email = emailInput.value;
                    if (email) {
                        this.subscribeNewsletter(email);
                    }
                }
            });
        }

        // Demo button
        const watchDemoBtn = document.getElementById('watch-demo');
        if (watchDemoBtn) {
            watchDemoBtn.addEventListener('click', () => {
                this.showToast('Video demo feature coming soon!', 'info');
            });
        }

        // Subscribe offers button
        const subscribeOffersBtn = document.getElementById('subscribe-offers');
        if (subscribeOffersBtn) {
            subscribeOffersBtn.addEventListener('click', () => {
                this.subscribeNewsletter('', true);
            });
        }

        // Service cards click
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.service-link')) {
                    const service = card.dataset.service;
                    this.showToast(`Exploring ${service} services`, 'info');
                }
            });
        });

        // Announcement close
        const announcementClose = document.querySelector('.announcement-close');
        if (announcementClose) {
            announcementClose.addEventListener('click', () => {
                const announcementBar = document.querySelector('.announcement-bar');
                if (announcementBar) {
                    announcementBar.style.display = 'none';
                }
            });
        }

        // FAB Chat button
        const fabChat = document.getElementById('fab-chat');
        if (fabChat) {
            fabChat.addEventListener('click', () => {
                this.showToast('Chat support coming soon! For now, please use our contact form.', 'info');
            });
        }
    }

    subscribeNewsletter(email, fromOffers = false) {
        let emailToUse = email;
        
        if (!email && fromOffers) {
            // If from offers button, prompt for email
            emailToUse = prompt('Please enter your email to subscribe:');
            if (!emailToUse) return;
        }
        
        if (!emailToUse || !emailToUse.includes('@')) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate API call
        this.showToast('Subscribing...', 'info');
        
        setTimeout(() => {
            this.showToast('🎉 Successfully subscribed to newsletter!', 'success');
            
            // Clear input if exists
            const emailInput = document.querySelector('.newsletter-form input[type="email"]');
            if (emailInput) emailInput.value = '';
        }, 1000);
    }

    // ===== NAVIGATION UTILITIES =====
    updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === 'index.html' && href === 'index.html') ||
                (currentPage === 'explore.html' && href === 'explore.html') ||
                (currentPage === 'contact.html' && href === 'contact.html')) {
                link.classList.add('active');
            }
        });
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    // Remove preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Start application
    try {
        window.app = new FlyTravelsApp();
        
        // Update active nav on page load
        setTimeout(() => {
            window.app.updateActiveNav();
        }, 100);
    } catch (error) {
        console.error('Failed to initialize app:', error);
        alert('Error loading website. Please refresh the page.');
    }
});

// Make app accessible globally
window.FlyTravelsApp = FlyTravelsApp;