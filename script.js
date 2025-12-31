// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Interactivity, Navigation, and Animations
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    observeAnimations();
    updateActiveNavLink();
    initializeCounterAnimation();
    initializeTypingAnimation();
    initializeCursorEffects();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            updateHamburgerIcon();
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            updateHamburgerIcon();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.nav-container');
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            updateHamburgerIcon();
        }
    });
}

function updateHamburgerIcon() {
    const hamburger = document.querySelector('.hamburger');
    const spans = hamburger.querySelectorAll('span');
    
    if (hamburger.parentElement.querySelector('.nav-menu').classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-8px, -8px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// ============================================
// UPDATE ACTIVE NAV LINK
// ============================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this);
    });
}

function handleFormSubmit(form) {
    const formMessage = document.getElementById('formMessage');
    
    // Get form values
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Validate form
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Validate email
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Disable form inputs
    disableFormInputs(form, true);
    
    // Submit to Formspree as JSON
    fetch(form.action, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            disableFormInputs(form, false);
        } else {
            return response.json().then(data => {
                throw new Error(data.errors ? Object.values(data.errors)[0] : 'Error sending message');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('There was an error sending your message. Please try again.', 'error');
        disableFormInputs(form, false);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function disableFormInputs(form, disabled) {
    const inputs = form.querySelectorAll('input, textarea, button');
    inputs.forEach(input => {
        input.disabled = disabled;
        if (disabled) {
            input.style.opacity = '0.6';
        } else {
            input.style.opacity = '1';
        }
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function observeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.featured-card, .project-card, .skill-item, .testimonial, .service, .pricing-card'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const abstractBg = document.querySelector('.abstract-bg');
    
    if (abstractBg) {
        abstractBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// ============================================
// ACTIVE SECTION TRACKING
// ============================================

window.addEventListener('scroll', () => {
    updateActiveNavLink();
});

// ============================================
// BUTTON CLICK ANIMATIONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.project-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// ============================================
// SCROLL-TO-TOP FUNCTIONALITY
// ============================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #16c784 0%, #00f2fe 100%);
        color: #0f0f1e;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(22, 199, 132, 0.3);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(22, 199, 132, 0.5)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(22, 199, 132, 0.3)';
    });
}

// Initialize scroll-to-top button
createScrollToTopButton();

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            updateHamburgerIcon();
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy loading images (future enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.experience-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                
                const increment = target / 50; // Divide into 50 steps
                const duration = 2000; // 2 seconds total
                const stepDuration = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        // Add suffix based on target
                        if (target === 5) {
                            counter.textContent = current + '+';
                        } else if (target === 100) {
                            counter.textContent = current + '%';
                        } else {
                            counter.textContent = current + '+';
                        }
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, stepDuration);
                
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// TYPING ANIMATION FOR TESTIMONIALS
// ============================================

function initializeTypingAnimation() {
    const testimonialTexts = document.querySelectorAll('.testimonial-text[data-text]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                const element = entry.target;
                const fullText = element.getAttribute('data-text');
                let charIndex = 0;
                
                element.textContent = '"';
                element.classList.add('typed');
                
                const typeInterval = setInterval(() => {
                    if (charIndex < fullText.length) {
                        element.textContent += fullText.charAt(charIndex);
                        charIndex++;
                    } else {
                        element.textContent += '"';
                        clearInterval(typeInterval);
                    }
                }, 30); // Typing speed - adjust for faster/slower
                
                typingObserver.unobserve(element);
            }
        });
    }, observerOptions);

    testimonialTexts.forEach(text => typingObserver.observe(text));
}

// ============================================
// CURSOR EFFECTS - Custom Cursor & Light Follow
// ============================================

function initializeCursorEffects() {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);

    const lightFollow = document.createElement('div');
    lightFollow.className = 'light-follow';
    document.body.appendChild(lightFollow);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let lightX = 0;
    let lightY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animation loop for smooth cursor follow
    function animateCursor() {
        // Smooth follow for cursor dot (fast)
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';

        // Smooth follow for cursor ring (medium) - same position as dot
        cursorRing.style.left = cursorX + 'px';
        cursorRing.style.top = cursorY + 'px';

        // Smooth follow for light (slower)
        lightX += (mouseX - lightX) * 0.08;
        lightY += (mouseY - lightY) * 0.08;
        lightFollow.style.left = lightX + 'px';
        lightFollow.style.top = lightY + 'px';

        requestAnimationFrame(animateCursor);
    }

    // Hide cursor and ring on page blur, show on focus
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        lightFollow.style.opacity = '0.7';
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        lightFollow.style.opacity = '0';
    });

    // Scale up cursor when hovering over interactive elements
    const interactiveElements = 'a, button, input, textarea, select, .nav-link, .btn';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.background = 'rgba(14, 165, 233, 0.6)';
            cursorDot.style.boxShadow = '0 0 15px rgba(14, 165, 233, 0.8)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'rgba(14, 165, 233, 0.8)';
            cursorDot.style.boxShadow = '0 0 10px rgba(14, 165, 233, 0.6)';
        }
    });

    // Hide default cursors on all elements to show custom cursor everywhere
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, input, textarea, select, .nav-link, .btn')) {
            e.target.style.cursor = 'none';
        }
    });

    animateCursor();
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👨‍💻 Welcome to my portfolio!', 'font-size: 20px; color: #16c784; font-weight: bold;');
console.log('%cLooking to hire? Reach out at: contact@example.com', 'font-size: 14px; color: #667eea;');
