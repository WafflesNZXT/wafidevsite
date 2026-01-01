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
    initializeFAQ();
    initializeFAQControls();
    initializeFAQPagination();
    initializeCarousels();
    initializeAmbientBackground();
    initializeTiltedStacks();
    initializePlanQuiz();
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
    // Skip on touch devices to avoid overhead and odd UX
    if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) {
        return;
    }
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
    const interactiveElements = 'a, button, input, textarea, select, .nav-link, .btn, .stack-card';
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
        if (e.target.closest(interactiveElements)) {
            e.target.style.cursor = 'none';
        }
    });

    animateCursor();
}

// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// FAQ CONTROLS: Search + Expand/Collapse All
// ============================================

function initializeFAQControls() {
    const search = document.getElementById('faqSearch');
    const expandAllBtn = document.getElementById('faqExpandAll');
    const collapseAllBtn = document.getElementById('faqCollapseAll');
    const items = Array.from(document.querySelectorAll('.faq-item'));

    if (!items.length) return;

    // Cache original HTML for highlighting reset
    items.forEach(item => {
        const questionSpan = item.querySelector('.faq-question span');
        const answerP = item.querySelector('.faq-answer p');
        if (questionSpan && !questionSpan.dataset.orig) questionSpan.dataset.orig = questionSpan.innerHTML;
        if (answerP && !answerP.dataset.orig) answerP.dataset.orig = answerP.innerHTML;
    });

    function highlight(text, term) {
        if (!term) return text;
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escaped})`, 'ig');
        return text.replace(regex, '<mark class="faq-highlight">$1</mark>');
    }

    function filter(term) {
        const q = term.trim().toLowerCase();
        const tokens = q.split(/\s+/).filter(Boolean);
        items.forEach(item => {
            const questionSpan = item.querySelector('.faq-question span');
            const answerP = item.querySelector('.faq-answer p');
            const text = `${questionSpan ? questionSpan.textContent : ''} ${answerP ? answerP.textContent : ''}`.toLowerCase();
            const topics = (item.dataset.topics || '').toLowerCase();

            const textMatch = q !== '' && text.includes(q);
            const topicsMatch = q !== '' && (topics.includes(q) || tokens.some(t => topics.includes(t)));
            const match = textMatch || topicsMatch;

            // Only toggle visibility when searching; leave pagination in control when empty
            item.classList.toggle('hidden', q !== '' && !match);

            // Apply/reset highlight in visible text
            if (questionSpan && questionSpan.dataset.orig) {
                questionSpan.innerHTML = q ? highlight(questionSpan.dataset.orig, q) : questionSpan.dataset.orig;
            }
            if (answerP && answerP.dataset.orig) {
                answerP.innerHTML = q ? highlight(answerP.dataset.orig, q) : answerP.dataset.orig;
            }
        });
        // Notify pagination to update indicator state
        const indicator = document.getElementById('faqPageIndicator');
        if (indicator) {
            if (q) {
                const visible = items.filter(i => !i.classList.contains('hidden')).length;
                indicator.textContent = `Search results (${visible})`;
            }
        }
    }

    if (search) {
        search.addEventListener('input', e => filter(e.target.value));
    }

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => {
            items.forEach(item => item.classList.add('active'));
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', () => {
            items.forEach(item => item.classList.remove('active'));
        });
    }
}

// ============================================
// FAQ PAGINATION
// ============================================

function initializeFAQPagination() {
    const items = Array.from(document.querySelectorAll('.faq-item'));
    const prevBtn = document.getElementById('faqPrevPage');
    const nextBtn = document.getElementById('faqNextPage');
    const indicator = document.getElementById('faqPageIndicator');
    const search = document.getElementById('faqSearch');

    if (!items.length || !prevBtn || !nextBtn || !indicator) return;

    let currentPage = 1;
    const pageSize = window.innerWidth <= 768 ? 4 : 6;
    const totalPages = Math.ceil(items.length / pageSize);

    function showPage(page) {
        currentPage = Math.max(1, Math.min(totalPages, page));
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        items.forEach((item, idx) => {
            // Only control visibility if not in search mode
            const inSearch = search && search.value.trim() !== '';
            if (!inSearch) {
                item.classList.toggle('hidden', !(idx >= start && idx < end));
            }
        });
        updateIndicator();
        updateButtons();
    }

    function updateIndicator() {
        const inSearch = search && search.value.trim() !== '';
        if (!inSearch) {
            indicator.textContent = `Page ${currentPage} of ${totalPages}`;
        } else {
            const visible = items.filter(i => !i.classList.contains('hidden')).length;
            indicator.textContent = `Search results (${visible})`;
        }
    }

    function updateButtons() {
        const inSearch = search && search.value.trim() !== '';
        prevBtn.disabled = inSearch || currentPage === 1;
        nextBtn.disabled = inSearch || currentPage === totalPages;
    }

    prevBtn.addEventListener('click', () => showPage(currentPage - 1));
    nextBtn.addEventListener('click', () => showPage(currentPage + 1));
    window.addEventListener('resize', () => showPage(currentPage));
    if (search) search.addEventListener('input', () => {
        // When searching, indicator/buttons update; when cleared, return to current page
        updateIndicator();
        updateButtons();
        if (search.value.trim() === '') showPage(currentPage);
    });

    // Initialize
    showPage(1);
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

function initializeCarousels() {
    // Featured Works Carousel - 3 second interval
    initializeCarousel('.featured-carousel', '.carousel-prev', '.carousel-next', '.indicator', 2500);    
    // Projects Grid Carousel - 2.5 second interval
    initializeProjectsCarousel();
    // Testimonials carousel on about page
    initializeTestimonialsCarousel();
}

function initializeCarousel(carouselSelector, prevBtnSelector, nextBtnSelector, indicatorSelector, autoPlayInterval = 5000) {
    const carousel = document.querySelector(carouselSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const indicators = document.querySelectorAll(indicatorSelector);

    if (!carousel || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const totalSlides = indicators.length;

    function updateCarousel() {
        // Update carousel position - each slide is exactly 100% width
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    function autoPlay() {
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlay();
    }

    function pauseAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resumeAutoPlay() {
        autoPlay();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Pause on hover, resume on leave
    carousel.parentElement.addEventListener('mouseenter', pauseAutoPlay);
    carousel.parentElement.addEventListener('mouseleave', resumeAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Initialize carousel
    updateCarousel();
    autoPlay();
}

// ============================================
// TESTIMONIALS CAROUSEL (ABOUT PAGE)
// ============================================

function initializeTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials-track');
    const slides = Array.from(carousel.querySelectorAll('.testimonial-card'));
    const prevBtn = carousel.querySelector('.testimonial-prev');
    const nextBtn = carousel.querySelector('.testimonial-next');

    if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let autoTimer = null;

    function slideWidth() {
        return slides[0].getBoundingClientRect().width;
    }

    function getGap() {
        const styles = getComputedStyle(track);
        return parseFloat(styles.columnGap || styles.gap || '0');
    }

    function updateTransform() {
        const cardWidth = slideWidth();
        const gap = getGap();
        const offset = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateTransform();
        resetAutoPlay();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateTransform();
        resetAutoPlay();
    }

    function startAutoPlay() {
        clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 3500);
    }

    function resetAutoPlay() {
        startAutoPlay();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', updateTransform);

    updateTransform();
    startAutoPlay();
}

// ============================================
// PROJECTS CAROUSEL FUNCTIONALITY
// ============================================

function initializeProjectsCarousel() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    // Disable carousel on small screens; use stacked layout from CSS
    if (window.innerWidth <= 768) return;
    
    const cards = Array.from(projectsGrid.querySelectorAll('.project-card'));
    
    if (cards.length !== 8) return;
    
    // Slot positions for 8-card clockwise carousel (2 columns x 4 rows)
    const slots = [
        { top: '0px', left: '0%' },           // 0: Top Left
        { top: '0px', left: '50%' },          // 1: Top Right
        { top: '575px', left: '50%' },        // 2: Upper Mid Right
        { top: '1150px', left: '50%' },       // 3: Lower Mid Right
        { top: '1725px', left: '50%' },       // 4: Bottom Right
        { top: '1725px', left: '0%' },        // 5: Bottom Left
        { top: '1150px', left: '0%' },        // 6: Lower Mid Left
        { top: '575px', left: '0%' }          // 7: Upper Mid Left
    ];
    
    // Track which slot each card currently occupies
    let cardSlots = [0, 1, 2, 3, 4, 5, 6, 7];
    
    // Initialize positions immediately without transition
    function initializePositions() {
        cards.forEach((card, index) => {
            const slot = slots[cardSlots[index]];
            card.style.transition = 'none';
            card.style.top = slot.top;
            card.style.left = slot.left;
        });
        
        // Force reflow to ensure the browser registers the initial positions
        void projectsGrid.offsetHeight;
        
        // Re-enable transitions after initial positioning
        setTimeout(() => {
            cards.forEach(card => {
                card.style.transition = 'all 0.8s ease-in-out';
            });
        }, 50);
    }
    
    // Update card positions to new slots
    function updatePositions() {
        cards.forEach((card, index) => {
            const slot = slots[cardSlots[index]];
            card.style.top = slot.top;
            card.style.left = slot.left;
        });
    }
    
    // Rotate all cards to next slot
    function rotateClockwise() {
        cardSlots = cardSlots.map(slot => (slot + 1) % 8);
        updatePositions();
    }
    
    // Rotation timer controls
    let rotateTimer = null;
    function startRotation() {
        if (rotateTimer) clearInterval(rotateTimer);
        rotateTimer = setInterval(rotateClockwise, 3000);
    }
    function stopRotation() {
        if (rotateTimer) {
            clearInterval(rotateTimer);
            rotateTimer = null;
        }
    }

    // Pause rotation when hovering any project card; resume on leave
    cards.forEach(card => {
        card.addEventListener('mouseenter', stopRotation);
        card.addEventListener('mouseleave', startRotation);
    });

    // Initialize and start rotation
    initializePositions();
    startRotation();
}

// ============================================
// AMBIENT BACKGROUND (Gradient + Particles)
// ============================================

function initializeAmbientBackground() {
    // Create overlay container if not present
    let overlay = document.querySelector('.ambient-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'ambient-overlay';
        document.body.appendChild(overlay);
    }

    // Create canvas for particles
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    overlay.appendChild(canvas);

    let width = 0, height = 0, particles = [];
    const PARTICLE_COUNT = Math.min(24, Math.max(16, Math.floor(window.innerWidth / 80)));
    const MAX_SPEED = 0.08; // px per frame

    function resize() {
        width = overlay.clientWidth;
        height = overlay.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createParticles() {
        particles = new Array(PARTICLE_COUNT).fill(0).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 1.5 + Math.random() * 2.5,
            vx: (Math.random() - 0.5) * MAX_SPEED,
            vy: (Math.random() - 0.5) * MAX_SPEED,
            alpha: 0.08 + Math.random() * 0.07
        }));
    }

    function step() {
        // Clear with transparent
        ctx.clearRect(0, 0, width, height);

        // Draw particles
        ctx.globalCompositeOperation = 'lighter';
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            // Gentle wrap around edges
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            // Glow circle
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            grd.addColorStop(0, `rgba(14,165,233,${p.alpha})`);
            grd.addColorStop(1, 'rgba(14,165,233,0)');
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalCompositeOperation = 'source-over';
        rafId = requestAnimationFrame(step);
    }

    let rafId = null;
    function start() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(step);
    }

    function stop() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    // Initialize
    resize();
    createParticles();
    start();

    // Handle resize and visibility
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
    });
}

// ============================================
// TILTED STACKS INTERACTIONS
// ============================================

function initializeTiltedStacks() {
    const cards = document.querySelectorAll('.tilted-stack .stack-card');
    if (!cards.length) return;

    cards.forEach(card => {
        let rafId = null;
        let tiltX = 0, tiltY = 0;
        const maxTilt = 6; // degrees

        function onMouseMove(e) {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            tiltX = -y * maxTilt; // rotateX opposite Y movement
            tiltY = x * maxTilt;  // rotateY follows X movement

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
            });
        }

        function onMouseEnter() {
            card.classList.add('stack-hover');
        }

        function onMouseLeave() {
            card.classList.remove('stack-hover');
            card.style.transform = '';
        }

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseenter', onMouseEnter);
        card.addEventListener('mouseleave', onMouseLeave);
    });
}

// ============================================
// PLAN QUIZ (Pricing page)
// ============================================

function initializePlanQuiz() {
    const startBtn = document.getElementById('startPlanQuiz');
    const panel = document.getElementById('planQuizPanel');
    const form = document.getElementById('planQuizForm');
    const steps = form ? Array.from(form.querySelectorAll('.quiz-step')) : [];
    const submitBtn = document.getElementById('quizSubmit');
    const resetBtn = document.getElementById('quizReset');
    const cancelBtn = document.getElementById('quizCancel');
    const resultBox = document.getElementById('planQuizResult');
    const resultTitle = document.getElementById('planRecommendationTitle');
    const resultDesc = document.getElementById('planRecommendationDesc');
    const applyBtn = document.getElementById('applyRecommendation');

    if (!startBtn || !panel || !form || steps.length === 0) return;

    startBtn.addEventListener('click', () => {
        panel.hidden = false;
        // Show all steps at once
        steps.forEach(step => step.hidden = false);
        // Ensure buttons are in initial state
        if (submitBtn) submitBtn.hidden = false;
        if (resetBtn) resetBtn.hidden = true;
        resultBox.hidden = true;
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // No step navigation; all steps visible

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const pages = form.querySelector('input[name="pages"]:checked')?.value;
        const timeline = form.querySelector('input[name="timeline"]:checked')?.value;
        const budget = form.querySelector('input[name="budget"]:checked')?.value;
        const features = Array.from(form.querySelectorAll('input[name="features"]:checked')).map(i => i.value);

        const score = { basic: 0, advanced: 0, pro: 0 };
        // Pages
        if (pages === '1-3') score.basic += 2; else if (pages === '4-6') score.advanced += 2; else if (pages === '7-10') score.pro += 2;
        // Timeline
        if (timeline === 'urgent') { score.basic += 1; score.advanced += 1; }
        else if (timeline === 'standard') { score.advanced += 2; }
        else if (timeline === 'extended') { score.pro += 2; }
        // Features
        const fCount = features.length;
        if (fCount <= 1) score.basic += 1; else if (fCount <= 3) score.advanced += 2; else score.pro += 2;
        // Budget
        if (budget === 'low') score.basic += 3; else if (budget === 'mid') score.advanced += 3; else if (budget === 'high') score.pro += 3;

        // Pick highest with sensible tie-breaker (Advanced preferred)
        const entries = Object.entries(score).sort((a, b) => b[1] - a[1]);
        let recommendation = entries[0][0];
        if (entries.length > 1 && entries[0][1] === entries[1][1]) {
            recommendation = 'advanced';
        }

        // Compose message
        const labelMap = { basic: 'Basic', advanced: 'Advanced', pro: 'Pro' };
        resultTitle.textContent = `Recommended: ${labelMap[recommendation]}`;
        resultDesc.textContent = `Based on your pages, timeline, features, and budget, the ${labelMap[recommendation]} plan should fit well.`;
        resultBox.hidden = false;
        if (resetBtn) resetBtn.hidden = false;

        // Hint the recommended plan in the contact message placeholder
        const messageField = document.getElementById('message');
        if (messageField) {
            if (!messageField.dataset.origPlaceholder) {
                messageField.dataset.origPlaceholder = messageField.placeholder;
            }
            messageField.placeholder = `Tell me about your project and which plan you think fits best (Recommended: ${labelMap[recommendation]}).`;
        }

        // Highlight pricing card
        const cards = Array.from(document.querySelectorAll('.pricing-card'));
        cards.forEach(c => c.classList.remove('recommended'));
        const targetIndex = recommendation === 'basic' ? 0 : recommendation === 'advanced' ? 1 : 2;
        const targetCard = cards[targetIndex];
        if (targetCard) {
            targetCard.classList.add('recommended');
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        resultBox.hidden = true;
        const cards = Array.from(document.querySelectorAll('.pricing-card'));
        cards.forEach(c => c.classList.remove('recommended'));

        // Restore original contact message placeholder
        const messageField = document.getElementById('message');
        if (messageField && messageField.dataset.origPlaceholder) {
            messageField.placeholder = messageField.dataset.origPlaceholder;
        }
    });

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            form.reset();
            resultBox.hidden = true;
            panel.hidden = true;
            const cards = Array.from(document.querySelectorAll('.pricing-card'));
            cards.forEach(c => c.classList.remove('recommended'));

            // Restore original contact message placeholder
            const messageField = document.getElementById('message');
            if (messageField && messageField.dataset.origPlaceholder) {
                messageField.placeholder = messageField.dataset.origPlaceholder;
            }
        });
    }

    // If the optional apply button exists, wire it up; otherwise skip
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}
console.log('%c👨‍💻 Welcome to my portfolio!', 'font-size: 20px; color: #16c784; font-weight: bold;');
console.log('%cLooking to hire? Reach out at: contact@example.com', 'font-size: 14px; color: #667eea;');
