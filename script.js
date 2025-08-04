/* ================================
   Blog2025 Interactive JavaScript
   Modern, user-friendly interactions
================================ */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupForms();
    setupInteractiveElements();
    setupLoadMore();
    setupCounterAnimations();
    setupParallax();
}

/* ================================
   Navigation & Mobile Menu
================================ */
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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

/* ================================
   Smooth Scrolling Functions
================================ */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function setupScrollEffects() {
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            scrollToSection('blog');
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================
   Scroll Animations & Observers
================================ */
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation if it's a stat element
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.blog-card, .contact-item, .stat, .about-content, .hero-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .blog-card, .contact-item, .stat, .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .blog-card.animate-in, .contact-item.animate-in, .stat.animate-in, .about-content.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .blog-card:nth-child(2) { transition-delay: 0.1s; }
        .blog-card:nth-child(3) { transition-delay: 0.2s; }
        .blog-card:nth-child(4) { transition-delay: 0.3s; }
        
        .contact-item:nth-child(2) { transition-delay: 0.1s; }
        .contact-item:nth-child(3) { transition-delay: 0.2s; }
    `;
    document.head.appendChild(style);
}

/* ================================
   Counter Animations
================================ */
function setupCounterAnimations() {
    // This will be triggered by the intersection observer
}

function animateCounter(element) {
    if (!element || element.dataset.animated) return;
    
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    element.dataset.animated = 'true';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas for large numbers
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

/* ================================
   Form Handling
================================ */
function setupForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmit(this);
        });
    }
}

function handleNewsletterSubmit(form) {
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for subscribing! Welcome to Blog2025.', 'success');
        form.reset();
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
}

function handleContactSubmit(form) {
    const button = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

/* ================================
   Interactive Elements
================================ */
function setupInteractiveElements() {
    // Blog card hover effects
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

/* ================================
   Load More Functionality
================================ */
function setupLoadMore() {
    const loadMoreButton = document.getElementById('load-more');
    const blogGrid = document.getElementById('blog-grid');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            loadMorePosts();
        });
    }
}

function loadMorePosts() {
    const loadMoreButton = document.getElementById('load-more');
    const blogGrid = document.getElementById('blog-grid');
    
    // Show loading state
    const originalText = loadMoreButton.innerHTML;
    loadMoreButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadMoreButton.disabled = true;
    
    // Simulate loading more posts
    setTimeout(() => {
        const newPosts = createMoreBlogPosts();
        newPosts.forEach((post, index) => {
            post.style.opacity = '0';
            post.style.transform = 'translateY(30px)';
            blogGrid.appendChild(post);
            
            // Animate in with delay
            setTimeout(() => {
                post.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Reset button
        loadMoreButton.innerHTML = originalText;
        loadMoreButton.disabled = false;
        
        // Hide button after loading more (simulate end of content)
        if (blogGrid.children.length > 8) {
            loadMoreButton.style.display = 'none';
            showNotification('You\'ve reached the end of our latest posts!', 'info');
        }
    }, 1500);
}

function createMoreBlogPosts() {
    const posts = [
        {
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
            category: 'Design',
            date: 'January 5, 2025',
            readTime: '6 min read',
            title: 'The Art of Minimalist Web Design',
            excerpt: 'Exploring how less can be more in modern web design, focusing on clean layouts and user experience...',
            author: {
                name: 'Jessica Lee',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
            }
        },
        {
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
            category: 'Innovation',
            date: 'January 3, 2025',
            readTime: '4 min read',
            title: 'Building Sustainable Tech Solutions',
            excerpt: 'How modern technology can contribute to environmental sustainability and green computing practices...',
            author: {
                name: 'David Park',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face'
            }
        }
    ];
    
    return posts.map(post => createBlogCard(post));
}

function createBlogCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    article.innerHTML = `
        <div class="blog-image">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-category">${post.category}</div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${post.date}
                </span>
                <span class="blog-read-time">
                    <i class="fas fa-clock"></i>
                    ${post.readTime}
                </span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-footer">
                <div class="blog-author">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="author-avatar">
                    <span class="author-name">${post.author.name}</span>
                </div>
                <button class="btn btn-outline">Read More</button>
            </div>
        </div>
    `;
    
    return article;
}

/* ================================
   Parallax Effects
================================ */
function setupParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ================================
   Notification System
================================ */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        color: #374151;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-left: 4px solid ${getNotificationColor(type)};
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    return colors[type] || colors.info;
}

// Add notification animations CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: color 0.2s ease-out;
    }
    
    .notification-close:hover {
        color: #374151;
    }
`;
document.head.appendChild(notificationStyle);

/* ================================
   Utility Functions
================================ */

// Debounce function for scroll events
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

// Throttle function for performance
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-dependent functions here
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

/* ================================
   Error Handling & Analytics
================================ */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an analytics service
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    }, 0);
});

/* ================================
   Accessibility Enhancements
================================ */

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Focus management for modals and menus
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/* ================================
   Email Marketing Modal Functions
================================ */
function showEmailMarketingModal() {
    const modal = document.getElementById('email-marketing-modal');
    const modalBody = document.getElementById('email-marketing-content');
    
    // Load the README content
    modalBody.innerHTML = getEmailMarketingContent();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEmailMarketingModal();
        }
    });
}

function closeEmailMarketingModal() {
    const modal = document.getElementById('email-marketing-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function getEmailMarketingContent() {
    return `
        <div class="email-marketing-content">
            <h1>What is Email Advertising for Bloggers?</h1>
            <p>Email advertising enables bloggers to establish a direct, personal line of communication with their audience. Unlike social media, where algorithms can limit reach, email ensures your message lands directly in readers' inboxes, allowing for more consistent engagement and ownership of your audience.</p>
            
            <h2>Why is it Important?</h2>
            <ul>
                <li><strong>Ownership:</strong> You control your list—unlike social media followers, you can always reach your subscribers.</li>
                <li><strong>Monetization:</strong> Email marketing is crucial for launching products, affiliate marketing, and promoting services.</li>
                <li><strong>Loyalty & Community:</strong> Regular emails foster loyalty and a sense of community.</li>
                <li><strong>Traffic:</strong> Sending newsletters or post alerts increases blog traffic, often generating the highest return visits.</li>
            </ul>

            <h1>Email Marketing Fundamentals for Bloggers</h1>
            
            <h2>How to Choose an Email Service Provider</h2>
            <p>Key factors to evaluate:</p>
            <ul>
                <li><strong>Ease of Use:</strong> A clean interface with WYSIWYG (what you see is what you get) builders is ideal for beginners.</li>
                <li><strong>Automation:</strong> Ability to set up welcome series, birthday campaigns, and drip feeds.</li>
                <li><strong>Segmentation:</strong> Group subscribers by interest, engagement level, or location.</li>
                <li><strong>Integrations:</strong> Sync with WordPress, e-commerce plugins, or membership sites.</li>
                <li><strong>Pricing:</strong> Most tools offer starter tiers or free plans for small lists (Mailchimp, Sendinblue, ConvertKit, Moosend).</li>
                <li><strong>Support and Learning Resources:</strong> Good documentation and customer support are invaluable.</li>
            </ul>

            <h2>Setting Up Your List and Signup Forms</h2>
            <ul>
                <li>Create a dedicated landing page and embed signup forms on your site for easy access.</li>
                <li>Collect minimal information (typically just name and email for higher conversions).</li>
                <li>Use pop-ups, exit intent forms, sidebar forms, and in-content forms.</li>
            </ul>
            
            <h3>Best Practices:</h3>
            <ul>
                <li>Be transparent about what you'll send (e.g., frequency, content type).</li>
                <li>Set clear expectations to build trust.</li>
            </ul>

            <h1>Growing Your Email List</h1>
            
            <h2>Lead Magnets That Convert</h2>
            <ul>
                <li><strong>Ebooks, Checklists, Templates:</strong> Highly desirable, actionable, and easy to consume.</li>
                <li><strong>Exclusive Content:</strong> Early access to posts, private Q&A, behind-the-scenes updates.</li>
                <li><strong>Email Courses & Challenges:</strong> Five- or seven-day mini-courses via email are proven list builders.</li>
                <li><strong>Contests & Giveaways:</strong> Encourage sharing and grow your list but vet your entrants for genuine interest.</li>
            </ul>

            <h2>Multi-Channel Promotion</h2>
            <ul>
                <li>Use social media (Instagram, Twitter/X, Facebook) to promote your lead magnets.</li>
                <li>Add CTAs at the end of every blog post.</li>
                <li>Guest blog on related sites; link to your signup page as your author bio.</li>
                <li>Pitch your list in relevant online communities or forums.</li>
            </ul>

            <h1>Types of Email Campaigns for Bloggers</h1>
            
            <h2>Newsletter</h2>
            <ul>
                <li><strong>Frequency:</strong> Weekly or bi-weekly is standard, but consistency beats frequency.</li>
                <li><strong>Content:</strong> Roundup of new posts, personal updates, relevant curated content from around the web.</li>
                <li><strong>Benefits:</strong> Keeps your brand top-of-mind and establishes trust.</li>
            </ul>

            <h2>Automated Welcome Series</h2>
            <ul>
                <li>Introduce yourself and your mission.</li>
                <li>Highlight your best posts or resources.</li>
                <li>Invite replies or feedback to build connection.</li>
                <li>Gradually introduce any products, paid offers, or community groups.</li>
            </ul>

            <h2>Blog Post Alerts</h2>
            <ul>
                <li>Automated updates whenever a new post is published.</li>
                <li>Timely notifications drive blog traffic.</li>
            </ul>

            <h2>Educational or Value-Added Series</h2>
            <ul>
                <li>Free mini-courses, resource roundups, or niche-specific tips.</li>
                <li>Perfect for nurturing leads toward paid offers.</li>
            </ul>

            <h2>Promotions & Monetization</h2>
            <ul>
                <li>Special deals, affiliate promotions, or product launches.</li>
                <li>Limited-time offers create urgency and drive conversions.</li>
            </ul>

            <h2>Re-Engagement Campaigns</h2>
            <ul>
                <li>Win-back emails to inactive subscribers.</li>
                <li>Surveys to understand changing interests.</li>
            </ul>

            <h1>Advanced Strategies</h1>
            
            <h2>Segmentation</h2>
            <p>Segment by:</p>
            <ul>
                <li>How subscribers joined (which lead magnet, blog post, or referral).</li>
                <li>Engagement (active vs. inactive).</li>
                <li>Stated preferences (topics they want more or less of).</li>
            </ul>

            <h2>Personalization & Dynamic Content</h2>
            <ul>
                <li>Insert subscriber names, recommend articles related to their interests.</li>
                <li>Advanced platforms allow "if/then" content blocks for highly tailored messaging.</li>
            </ul>

            <h2>Automation</h2>
            <ul>
                <li>Birthday or anniversary emails.</li>
                <li>Drip campaigns for product onboarding or challenges.</li>
                <li>Event-triggered emails: clicks, downloads, or web page visits initiate specialized sequences.</li>
            </ul>

            <h2>A/B Testing & Analytics</h2>
            <ul>
                <li>Experiment with subject lines, sending times, and calls to action.</li>
                <li>Review open, click, and bounce rates regularly.</li>
            </ul>

            <h2>Maintain List Hygiene</h2>
            <ul>
                <li>Remove bounces and inactive subscribers to maintain deliverability.</li>
                <li>Periodic "do you still want to hear from us?" emails.</li>
            </ul>

            <h2>Compliance & Privacy</h2>
            <ul>
                <li>GDPR, CAN-SPAM, and other regulations: only send to opt-ins, always provide an unsubscribe link, don't share personal data without consent.</li>
            </ul>

            <h1>Content Creation Tips</h1>
            
            <h2>Great Subject Lines</h2>
            <ul>
                <li>Promise a clear benefit ("7 SEO Hacks for Bloggers").</li>
                <li>Use personalization ("Hey [Name], did you see this?").</li>
                <li>Tease curiosity ("You won't want to miss this…").</li>
            </ul>

            <h2>Engaging Email Copy</h2>
            <ul>
                <li>Write conversationally—pretend you're emailing one friend.</li>
                <li>Keep paragraphs short for mobile readers.</li>
                <li>Use images, buttons, and clear CTAs.</li>
            </ul>

            <h1>Case Studies: Blogs That Scaled With Smart Email Campaigns</h1>
            
            <h2>Case Study 1: Rapid List Growth with Content Upgrades (Personal Finance Blog)</h2>
            <ul>
                <li><strong>Scenario:</strong> Created downloadable spreadsheets for budgeting as content upgrades on high-traffic posts.</li>
                <li><strong>Execution:</strong> Automated welcome sequence on signup, introducing more advanced resources and exclusive webinars.</li>
                <li><strong>Results:</strong> 6,000+ new subscribers in 8 months. Webinar promotions and affiliate offers through emails generated $2,000–$6,000 per month in added income.</li>
            </ul>

            <h2>Case Study 2: Laser-Focused Segmentation (Travel Blog)</h2>
            <ul>
                <li><strong>Scenario:</strong> Used interest survey on signup—"Budget Trips," "Luxury Escapes," or "Family Travel."</li>
                <li><strong>Execution:</strong> Tailored weekly emails: budget travelers received hostel deals, luxury travelers received resort reviews, families got kid-friendly itineraries.</li>
                <li><strong>Results:</strong> Open rates >44%, click rates of 12–18%, sponsorships and exclusive partnerships from travel brands due to engaged audience.</li>
            </ul>

            <h2>Case Study 3: Product Launch Success via Email Automation (Fitness Blog)</h2>
            <ul>
                <li><strong>Scenario:</strong> Offered a "7-Day Home Workout" challenge by email.</li>
                <li><strong>Execution:</strong> Automated educational emails during challenge, then led to offer for full workout program.</li>
                <li><strong>Results:</strong> Used urgency ("offer ends soon!") for launch push. 700+ course sales ($10,000+) in 2 weeks, with 70% of sales from the email list alone.</li>
            </ul>

            <h2>Case Study 4: RSS-to-Email Grows Repeat Traffic (Tech Review Blog)</h2>
            <ul>
                <li><strong>Scenario:</strong> Set up RSS-to-email so every new review was sent to subscribers.</li>
                <li><strong>Execution:</strong> Added exclusive deals just for email readers (discounts, early access).</li>
                <li><strong>Results:</strong> Over 45% of weekly blog traffic driven by email. Community engagement led to reader-driven requests for product reviews, improving site authority and SEO.</li>
            </ul>

            <h2>Case Study 5: Community Building and Reader Generated Content (Parenting Blog)</h2>
            <ul>
                <li><strong>Scenario:</strong> Weekly "Letters from Our Readers"—featuring tips, stories, or questions from subscribers.</li>
                <li><strong>Execution:</strong> Invited feedback and submissions, highlighted best comments in each edition.</li>
                <li><strong>Results:</strong> Response rate skyrocketed. Blog owner invited to parent conferences, offered a book deal due to loyal and interactive community.</li>
            </ul>

            <h1>FAQs for Beginners</h1>
            
            <h2>1. How often should I email my list?</h2>
            <p>Start with once per week, then adjust based on subscriber feedback and engagement.</p>

            <h2>2. How do I avoid spam filters?</h2>
            <p>Send to engaged, opted-in subscribers, avoid spammy words, maintain list hygiene, and use reputable email services.</p>

            <h2>3. What should I write in my first email?</h2>
            <p>Introduce yourself, explain what readers will get, and link to your best or most popular blog content.</p>

            <h2>4. Is it worth it for a small blog?</h2>
            <p>Absolutely—early engagement leads to faster, more sustainable growth compared to building later.</p>

            <h1>Final Tips</h1>
            <ul>
                <li>Always test and evolve—what works for others may not work for your readers.</li>
                <li>Focus on building relationships, not just sales.</li>
                <li>Start simple, then add automation and segmentation as you grow.</li>
            </ul>
        </div>
    `;
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEmailMarketingModal();
    }
});

console.log('Blog2025 JavaScript loaded successfully! 🚀');