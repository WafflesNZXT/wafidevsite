// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Interactivity, Navigation, and Animations
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
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
    initializeMicroInteractions();
    initializeBuildEstimator();
    renderProjectDetailPage();
    initializeThemeToggle();
});

// ============================================
// LOADER OVERLAY
// ============================================
function initializeLoader() {
    const overlay = document.getElementById('loader');
    if (!overlay) return;
    // Only show on first visit. Persist across refreshes and navigation.
    const LOADER_KEY = 'wafi_loader_shown';
    const hasShown = sessionStorage.getItem(LOADER_KEY) === '1';
    if (hasShown) {
        // Remove overlay immediately if already shown
        overlay.remove();
        document.body.style.cursor = '';
        return;
    }

    const progressEl = overlay.querySelector('.loader-progress');
    const percentEl = overlay.querySelector('.loader-percent');
    const statusEl = overlay.querySelector('.loader-status');
    const minDuration = 6000; // minimum time the loader should be visible (ms)
    const startTime = Date.now();
    let rafId = null;

    // Mark as shown at start to avoid showing again on immediate navigation
    try { sessionStorage.setItem(LOADER_KEY, '1'); } catch (_) {}

    // Fun cycling messages
    const statuses = [
        'Loading images…',
        'Warming up code…',
        'Loading Wafi…',
        'Sharpening pixels…',
        'Compiling awesomeness…',
        'Fetching vibes…',
        'Tuning animations…',
        'Optimizing rockets…'
    ];
    let statusIndex = 0;
    statusEl.textContent = statuses[0];
    const cycleTimer = setInterval(() => {
        statusIndex = (statusIndex + 1) % statuses.length;
        statusEl.textContent = statuses[statusIndex];
    }, 1200);

    // Progress based on images + DOM ready
    const images = Array.from(document.images);
    let loaded = 0;
    const total = images.length + 1; // +1 for DOM ready step

    function gatedPercent() {
        const elapsed = Date.now() - startTime;
        const timeGate = Math.min(0.95, (elapsed / minDuration) * 0.95); // max 95% until minDuration
        const actual = total > 0 ? (loaded / total) : 1;
        const display = Math.min(actual, timeGate);
        return Math.round(display * 100);
    }

    function updateProgress() {
        const pct = gatedPercent();
        progressEl.style.width = pct + '%';
        percentEl.textContent = pct + '%';
    }

    function tick() {
        updateProgress();
        rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // Mark DOM ready
    loaded += 1;
    updateProgress();

    images.forEach(img => {
        if (img.complete) {
            loaded += 1;
            updateProgress();
        } else {
            img.addEventListener('load', () => { loaded += 1; updateProgress(); });
            img.addEventListener('error', () => { loaded += 1; updateProgress(); });
        }
    });

    function finish() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);
        setTimeout(() => {
            clearInterval(cycleTimer);
            if (rafId) cancelAnimationFrame(rafId);
            progressEl.style.width = '100%';
            percentEl.textContent = '100%';
            setTimeout(() => {
                overlay.classList.add('fade-out');
                setTimeout(() => { overlay.remove(); }, 500);
                document.body.style.cursor = '';
            }, 250);
        }, remaining);
    }

    // Ensure finalization when page fully loaded
    window.addEventListener('load', finish);

    // Safety timeout in case some assets never report
    setTimeout(() => {
        if (!overlay.classList.contains('fade-out')) finish();
    }, 15000);
}

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
        const isProjectsDetail = currentPage === 'project.html' && href === 'projects.html';
        if (href === currentPage || isProjectsDetail || (currentPage === '' && href === 'index.html')) {
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
        const href = this.getAttribute('href') || '';
        // Only handle in-page anchors at click time; skip external links
        if (!href.startsWith('#') || href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Move keyboard focus when skipping to main content
            if (href === '#main-content') {
                if (!target.hasAttribute('tabindex')) {
                    target.setAttribute('tabindex', '-1');
                }
                target.focus({ preventScroll: true });
            }
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
        // Create ripple effect element and auto-remove
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.width = ripple.style.height = Math.max(40, size * 0.3) + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
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
        bottom: calc(24px + env(safe-area-inset-bottom));
        right: calc(16px + env(safe-area-inset-right));
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
        z-index: 1000;
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

    function adjustForViewport() {
        const isMobile = window.innerWidth <= 480;
        if (isMobile) {
            button.style.width = '44px';
            button.style.height = '44px';
            button.style.fontSize = '1.2rem';
            button.style.bottom = 'calc(16px + env(safe-area-inset-bottom))';
            button.style.right = 'calc(12px + env(safe-area-inset-right))';
        } else {
            button.style.width = '50px';
            button.style.height = '50px';
            button.style.fontSize = '1.5rem';
            button.style.bottom = 'calc(24px + env(safe-area-inset-bottom))';
            button.style.right = 'calc(16px + env(safe-area-inset-right))';
        }
    }

    adjustForViewport();
    window.addEventListener('resize', adjustForViewport);

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
// MICRO INTERACTIONS: Reveal on scroll
// ============================================

function initializeMicroInteractions() {
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (!revealEls.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
}

// ============================================
// BUILD ESTIMATOR
// ============================================

function initializeBuildEstimator() {
    const form = document.getElementById('buildEstimatorForm');
    const pagesInput = document.getElementById('pagesCount');
    const pagesLabel = document.getElementById('pagesCountLabel');
    const complexity = document.getElementById('complexity');
    const featureInputs = Array.from(document.querySelectorAll('input[name="feature"]'));
    const designInputs = Array.from(document.querySelectorAll('input[name="design"]'));
    const speedInputs = Array.from(document.querySelectorAll('input[name="speed"]'));
    const maintenanceInput = document.getElementById('maintenance');
    const costEl = document.getElementById('estimateCost');
    const timeEl = document.getElementById('estimateTime');
    const planEl = document.getElementById('estimatePlan');
    const breakdownEl = document.getElementById('estimateBreakdown');
    const resetBtn = document.getElementById('resetEstimator');

    if (!form || !pagesInput || !complexity || !costEl || !timeEl || !planEl) return;

    const basePricing = {
        basic: { price: 399, days: 6, includedPages: 3, extraPerPage: 60 },
        advanced: { price: 599, days: 12, includedPages: 6, extraPerPage: 50 },
        pro: { price: 1199, days: 18, includedPages: 10, extraPerPage: 40 }
    };

    const featureCosts = {
        auth: 120,
        payments: 180,
        blog: 120,
        cms: 160,
        analytics: 60,
        ecommerce: 220
    };

    const designMultiplier = { minimal: 1.0, standard: 1.1, polished: 1.25 };
    const speedMultiplier = { flexible: 0.95, standard: 1.0, rush: 1.2 };
    const maintenanceMonthly = { basic: 25, advanced: 50, pro: 75 };

    function compute() {
        const pages = parseInt(pagesInput.value, 10) || 1;
        pagesLabel.textContent = pages;
        const tier = complexity.value;
        const base = basePricing[tier];
        const selectedFeatures = featureInputs.filter(i => i.checked).map(i => i.value);
        const design = (designInputs.find(i => i.checked) || { value: 'standard' }).value;
        const speed = (speedInputs.find(i => i.checked) || { value: 'standard' }).value;
        const maintenance = !!maintenanceInput?.checked;

        // Base cost
        let cost = base.price;
        const extraPages = Math.max(0, pages - base.includedPages);
        cost += extraPages * base.extraPerPage;
        let featureCost = 0;
        selectedFeatures.forEach(f => { featureCost += (featureCosts[f] || 0); });
        cost += featureCost;
        cost *= designMultiplier[design];
        cost *= speedMultiplier[speed];

        // Round to nearest dollar
        cost = Math.round(cost);

        // Time estimate: base days + small increments
        let days = base.days;
        days += Math.ceil(extraPages * 0.8);
        days += Math.ceil(selectedFeatures.length * 0.7);
        // Adjust for speed (rush compresses timeline, flexible adds buffer)
        if (speed === 'rush') days = Math.max(5, Math.round(days * 0.85));
        if (speed === 'flexible') days = Math.round(days * 1.1);

        // Suggested plan by rough thresholds
        const plan = cost < 500 ? 'Basic' : cost <= 1000 ? 'Advanced' : 'Pro';

        // Maintenance note
        const monthly = maintenance ? maintenanceMonthly[tier] : 0;

        // Render
        costEl.textContent = `$${cost.toLocaleString()}`;
        timeEl.textContent = `${days} days`;
        planEl.textContent = plan;
        breakdownEl.innerHTML = `
            <strong>Details:</strong>
            ${pages} pages (${base.includedPages} included, ${extraPages} extra),
            features: ${selectedFeatures.length ? selectedFeatures.join(', ') : 'none'},
            design: ${design}, speed: ${speed}${maintenance ? `, maintenance: $${monthly}/mo` : ''}.
        `;

        // Highlight corresponding pricing card and add a "Recommended" label
        const cards = Array.from(document.querySelectorAll('.pricing-card'));
        cards.forEach(c => {
            c.classList.remove('recommended');
            const existing = c.querySelector('.reco-label');
            if (existing) existing.remove();
        });
        const indexMap = { 'Basic': 0, 'Advanced': 1, 'Pro': 2 };
        const targetIndex = indexMap[plan];
        const targetCard = cards[targetIndex];
        if (targetCard) {
            targetCard.classList.add('recommended');
            if (!targetCard.querySelector('.reco-label')) {
                const label = document.createElement('span');
                label.className = 'reco-label';
                label.textContent = 'Recommended';
                targetCard.appendChild(label);
            }
        }
    }

    // Bind changes
    [pagesInput, complexity, maintenanceInput, ...featureInputs, ...designInputs, ...speedInputs]
        .filter(Boolean)
        .forEach(el => el.addEventListener('input', compute));

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            pagesLabel.textContent = pagesInput.value;
            compute();
        });
    }

    // Initial compute
    compute();
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
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ((navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || reduceMotion) {
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
                    const otherBtn = otherItem.querySelector('.faq-question');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            const nowActive = !item.classList.contains('active');
            item.classList.toggle('active', nowActive);
            // Reflect expanded state for accessibility
            question.setAttribute('aria-expanded', nowActive ? 'true' : 'false');
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

    // Live region for screen readers
    let statusEl = carousel.parentElement.querySelector('.carousel-status');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.className = 'sr-only carousel-status';
        statusEl.setAttribute('aria-live', 'polite');
        statusEl.setAttribute('aria-atomic', 'true');
        carousel.parentElement.appendChild(statusEl);
    }

    function updateCarousel() {
        // Update carousel position - each slide is exactly 100% width
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
            indicator.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });

        // Announce slide change
        statusEl.textContent = `Slide ${currentIndex + 1} of ${totalSlides}`;
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
        if (!indicator.getAttribute('aria-label')) {
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        }
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
// PROJECT DETAIL RENDERING
// ============================================

function renderProjectDetailPage() {
    if (!document.body || document.body.getAttribute('data-page') !== 'project-detail') return;

    const params = new URLSearchParams(window.location.search);
    const id = (params.get('id') || '').toLowerCase();
    const data = PROJECTS_DATA[id];

    const titleEl = document.getElementById('projectTitle');
    const subtitleEl = document.getElementById('projectSubtitle');
    const imgEl = document.getElementById('projectImage');
    const descEl = document.getElementById('projectDescription');
    const tagsEl = document.getElementById('projectTags');
    const liveEl = document.getElementById('projectLiveLink');
    const timelineEl = document.getElementById('projectTimeline');

    if (!data) {
        titleEl.textContent = 'Project Not Found';
        subtitleEl.textContent = 'Please return to the projects page.';
        if (imgEl) imgEl.style.display = 'none';
        descEl.textContent = 'We couldn\'t find this project. It may have been moved or renamed.';
        tagsEl.innerHTML = '';
        liveEl.style.display = 'none';
        timelineEl.innerHTML = '';
        return;
    }

    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle || 'Details and timeline';
    imgEl.src = data.image;
    imgEl.alt = data.title;
    descEl.textContent = data.description;
    tagsEl.innerHTML = (data.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    liveEl.href = data.link;
    timelineEl.innerHTML = (data.timeline || []).map(step => `
        <li class="timeline-item">
            <span class="time">${step.date}</span>
            <div class="title">${step.title}</div>
            <div class="desc">${step.desc}</div>
        </li>
    `).join('');
}

// Centralized project data used by project.html
const PROJECTS_DATA = {
    'haider-cricket': {
        title: 'Haider Cricket',
        subtitle: 'E-commerce platform for cricket gear',
        image: 'images/haider-cricket.jpeg',
        description: 'Professional cricket gear store with custom jersey designer, premium equipment, and fast delivery for teams. Showcase of bats, gloves, protection gear, and footwear.',
        tags: ['E-Commerce', 'Custom Design', 'Responsive'],
        link: 'https://wafflesnzxt.github.io/HaiderCricket/',
        timeline: [
            { date: 'Week 1', title: 'Discovery & Scope', desc: 'Aligned requirements, product catalog, and brand direction.' },
            { date: 'Week 2', title: 'Storefront Build', desc: 'Implemented product listings and responsive layouts.' },
            { date: 'Week 3', title: 'Customizer & QA', desc: 'Added jersey designer and performed quality assurance.' }
        ]
    },
    'inobex': {
        title: 'INOBEX',
        subtitle: 'AI-powered business intelligence',
        image: 'images/inobex.jpeg',
        description: 'Predictive analytics platform with scalable cloud infrastructure and real-time dashboards for data-driven decision making.',
        tags: ['AI/ML', 'Dashboard', 'Enterprise'],
        link: 'http://inobex.com/',
        timeline: [
            { date: 'Phase 1', title: 'Data Modeling', desc: 'Defined metrics and ingestion pipelines.' },
            { date: 'Phase 2', title: 'Dashboard UX', desc: 'Built interactive visualizations and filters.' },
            { date: 'Phase 3', title: 'Performance & Launch', desc: 'Optimized queries and deployed to production.' }
        ]
    },
    'brain-rot-dictionary': {
        title: 'Brain-Rot Dictionary',
        subtitle: 'Interactive modern slang dictionary',
        image: 'images/brain-rot-dictionary.jpeg',
        description: 'Educational platform decoding modern slang and internet terminology with searchable categories from TikTok, gaming, memes, and more.',
        tags: ['Interactive', 'Educational', 'Search'],
        link: 'https://wafflesnzxt.github.io/Brain-Rot-Dictionary/',
        timeline: [
            { date: 'Sprint 1', title: 'Schema & Terms', desc: 'Curated categories and term metadata.' },
            { date: 'Sprint 2', title: 'Search & Filters', desc: 'Implemented fast client-side search and tagging.' },
            { date: 'Sprint 3', title: 'Polish', desc: 'Refined UX and accessibility.' }
        ]
    },
    'bassl': {
        title: 'BASSL',
        subtitle: 'Modern web platform',
        image: 'images/bassl.jpeg',
        description: 'Comprehensive web platform featuring modern design, seamless user experience, and professional branding.',
        tags: ['Web App', 'Design', 'UX'],
        link: 'https://wafflesnzxt.github.io/BASSL/',
        timeline: [
            { date: 'Design', title: 'Brand & UI', desc: 'Established visual language and components.' },
            { date: 'Build', title: 'Implementation', desc: 'Developed responsive views and navigation.' },
            { date: 'QA', title: 'Refinement', desc: 'Fixed edge cases and improved performance.' }
        ]
    },
    'profilelift': {
        title: 'ProfileLift',
        subtitle: 'GBP optimization service',
        image: 'images/profilelift.jpeg',
        description: 'Google Business Profile optimization with photo management, content enhancement, and performance tracking.',
        tags: ['SaaS', 'Service', 'Marketing'],
        link: 'https://wafflesnzxt.github.io/ProfileLift/',
        timeline: [
            { date: 'Kickoff', title: 'Goals & KPIs', desc: 'Defined optimization targets and metrics.' },
            { date: 'Build', title: 'Service Site', desc: 'Implemented offerings, testimonials, and contact.' },
            { date: 'Iterate', title: 'Analytics', desc: 'Added tracking and iteration loop.' }
        ]
    },
    'zen-habit': {
        title: 'Zen Habit',
        subtitle: 'Mindfulness habit app',
        image: 'images/zen-habit.jpeg',
        description: 'Mindfulness and wellness app with daily micro-challenges, guided meditation, habit tracking, and progress streaks.',
        tags: ['Wellness', 'Habits', 'Tracking'],
        link: 'https://wafflesnzxt.github.io/Zen-Habit/',
        timeline: [
            { date: 'Week 1', title: 'Core Flows', desc: 'Built habit tracking and streak logic.' },
            { date: 'Week 2', title: 'Content', desc: 'Added guided meditation and prompts.' },
            { date: 'Week 3', title: 'UX Polish', desc: 'Improved mobile experience and animations.' }
        ]
    },
    'imam-hussain': {
        title: 'Imam Hussain (as)',
        subtitle: 'Educational memorial website',
        image: 'images/imam-hussain.jpeg',
        description: 'Memorial site honoring the legacy of Imam Hussain with historical timeline, Karbala narrative, quotes, and teachings.',
        tags: ['Educational', 'History', 'Heritage'],
        link: 'https://wafflesnzxt.github.io/ImamHussain.as/',
        timeline: [
            { date: 'Research', title: 'Content Gathering', desc: 'Curated historical sources and quotes.' },
            { date: 'Build', title: 'Layout & Narrative', desc: 'Structured timeline and story flow.' },
            { date: 'Finalize', title: 'Accessibility', desc: 'Improved readability and contrast.' }
        ]
    },
    'car-search-engine': {
        title: 'Car Search Engine',
        subtitle: 'Advanced vehicle finder',
        image: 'images/Screenshot_30-12-2025_121048_wafflesnzxt.github.io.jpeg',
        description: 'Search engine for auto vehicles with comprehensive filtering by price, size, seats, color, and more.',
        tags: ['Search Engine', 'Automotive', 'Filters'],
        link: 'https://wafflesnzxt.github.io/CarSearchEngine/',
        timeline: [
            { date: 'Planning', title: 'Filter Design', desc: 'Defined attributes and UI for filters.' },
            { date: 'Build', title: 'Search Engine', desc: 'Implemented indexing and filtering.' },
            { date: 'Polish', title: 'Performance', desc: 'Optimized data and results rendering.' }
        ]
    }
};

console.log('%c👨‍💻 Welcome to my portfolio!', 'font-size: 20px; color: #16c784; font-weight: bold;');
console.log('%cLooking to hire? Reach out at: contact@example.com', 'font-size: 14px; color: #667eea;');

// ============================================
// THEME TOGGLE (Light/Dark)
// ============================================
function initializeThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = safeGet('wafi_theme');
    const initial = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(initial);

    btn.setAttribute('aria-pressed', initial === 'dark');
    updateThemeIcon(btn, initial);

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || initial;
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        safeSet('wafi_theme', next);
        btn.setAttribute('aria-pressed', next === 'dark');
        updateThemeIcon(btn, next);
    });

    // Respond to OS scheme changes if no user choice stored
    if (!saved && window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', (e) => {
            const next = e.matches ? 'dark' : 'light';
            applyTheme(next);
            btn.setAttribute('aria-pressed', next === 'dark');
            updateThemeIcon(btn, next);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('.theme-icon');
    if (!icon) return;
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
}
