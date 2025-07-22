// Mobile menu toggle and responsive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(10px)';
                    }
                }
            });
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu if window is resized to desktop size
            if (mobileMenuToggle && navMenu) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });
});



// Animated counters for about section
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = Math.ceil(target / 100);
            if (count < target) {
                counter.innerText = count + increment;
                setTimeout(updateCount, 18);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Only animate when in view
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

window.addEventListener('scroll', function onScroll() {
    const aboutCounters = document.querySelector('.about-counters');
    if (aboutCounters && isInViewport(aboutCounters)) {
        animateCounters();
        window.removeEventListener('scroll', onScroll);
    }
});

// Read More toggle
const readMoreBtn = document.getElementById('readMoreBtn');
const readMoreText = document.getElementById('readMoreText');
if (readMoreBtn && readMoreText) {
    readMoreBtn.addEventListener('click', function() {
        readMoreText.classList.toggle('active');
        if (readMoreText.classList.contains('active')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Video Slider Functionality
    const videoSlider = {
        slides: document.querySelectorAll('.video-testimonial'),
        prevBtn: document.querySelector('.video-testimonial-slider .prev-arrow'),
        nextBtn: document.querySelector('.video-testimonial-slider .next-arrow'),
        currentIndex: 0,
        autoSlideInterval: null,
        autoSlideDelay: 6000, // 6 seconds
        
        init: function() {
            this.showSlide(this.currentIndex);
            this.setupEventListeners();
            this.startAutoSlide();
            
            // Initialize all videos
            this.slides.forEach((slide, index) => {
                const video = slide.querySelector('video');
                const playPauseBtn = slide.querySelector('.play-pause-btn');
                
                // Ensure all videos are paused initially except the first one
                if (index !== this.currentIndex) {
                    video.pause();
                } else {
                    // For the first video, set up the initial state
                    playPauseBtn.style.display = 'flex';
                    playPauseBtn.querySelector('i').classList.add('fa-play');
                }
                
                // Set up video event listeners
                video.addEventListener('play', () => {
                    playPauseBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
                    playPauseBtn.style.opacity = '0';
                });
                
                video.addEventListener('pause', () => {
                    playPauseBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
                    playPauseBtn.style.opacity = '1';
                });
                
                // Set up hover behavior for desktop
                const videoWrapper = slide.querySelector('.video-wrapper');
                
                videoWrapper.addEventListener('mouseenter', () => {
                    if (!video.paused) {
                        playPauseBtn.style.opacity = '1';
                    }
                });
                
                videoWrapper.addEventListener('mouseleave', () => {
                    if (!video.paused) {
                        playPauseBtn.style.opacity = '0';
                    }
                });
                
                // Set up tap behavior for mobile
                videoWrapper.addEventListener('click', () => {
                    if (!video.paused) {
                        playPauseBtn.style.opacity = playPauseBtn.style.opacity === '1' ? '0' : '1';
                    }
                });
                
                // Play/pause button click
                playPauseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            });
        },
        
        showSlide: function(index) {
            // Pause current video before switching
            const currentVideo = this.slides[this.currentIndex].querySelector('video');
            currentVideo.pause();
            currentVideo.currentTime = 0;
            
            // Reset play/pause button of current slide
            const currentPlayBtn = this.slides[this.currentIndex].querySelector('.play-pause-btn');
            currentPlayBtn.style.opacity = '1';
            currentPlayBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
            
            // Hide all slides
            this.slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.display = 'none';
            });
            
            // Show new slide
            this.currentIndex = (index + this.slides.length) % this.slides.length;
            const activeSlide = this.slides[this.currentIndex];
            activeSlide.classList.add('active');
            activeSlide.style.display = 'block';
            
            // Reset auto-slide timer
            this.resetAutoSlide();
        },
        
        nextSlide: function() {
            this.showSlide(this.currentIndex + 1);
        },
        
        prevSlide: function() {
            this.showSlide(this.currentIndex - 1);
        },
        
        setupEventListeners: function() {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
            
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
            
            // Pause auto-slide when hovering over slider
            const sliderContainer = document.querySelector('.video-slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                this.pauseAutoSlide();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        },
        
        startAutoSlide: function() {
            this.pauseAutoSlide(); // Clear any existing interval
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoSlideDelay);
        },
        
        pauseAutoSlide: function() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        },
        
        resetAutoSlide: function() {
            this.pauseAutoSlide();
            this.startAutoSlide();
        }
    };
    
    // Text Slider Functionality
    const textSlider = {
        slides: document.querySelectorAll('.text-testimonial'),
        dotsContainer: document.querySelector('.slider-dots'),
        currentIndex: 0,
        autoSlideInterval: null,
        autoSlideDelay: 8000, // 8 seconds
        
        init: function() {
            this.showSlide(this.currentIndex);
            this.createDots();
            this.setupEventListeners();
            this.startAutoSlide();
        },
        
        showSlide: function(index) {
            // Hide all slides
            this.slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.display = 'none';
            });
            
            // Show new slide
            this.currentIndex = (index + this.slides.length) % this.slides.length;
            const activeSlide = this.slides[this.currentIndex];
            activeSlide.classList.add('active');
            activeSlide.style.display = 'block';
            
            // Update dots
            this.updateDots();
            
            // Reset auto-slide timer
            this.resetAutoSlide();
        },
        
        nextSlide: function() {
            this.showSlide(this.currentIndex + 1);
        },
        
        prevSlide: function() {
            this.showSlide(this.currentIndex - 1);
        },
        
        createDots: function() {
            // Clear existing dots
            this.dotsContainer.innerHTML = '';
            
            // Create new dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === this.currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    this.showSlide(index);
                });
                this.dotsContainer.appendChild(dot);
            });
        },
        
        updateDots: function() {
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        },
        
        setupEventListeners: function() {
            // Pause auto-slide when hovering over slider
            const sliderContainer = document.querySelector('.text-slider-container');
            sliderContainer.addEventListener('mouseenter', () => {
                this.pauseAutoSlide();
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        },
        
        startAutoSlide: function() {
            this.pauseAutoSlide(); // Clear any existing interval
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoSlideDelay);
        },
        
        pauseAutoSlide: function() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
                this.autoSlideInterval = null;
            }
        },
        
        resetAutoSlide: function() {
            this.pauseAutoSlide();
            this.startAutoSlide();
        }
    };
    
    // Initialize both sliders
    videoSlider.init();
    textSlider.init();
    
    // Add smooth transitions when slides change
    const style = document.createElement('style');
    style.textContent = `
        .video-testimonial {
            transition: opacity 0.6s ease, transform 0.6s ease;
            opacity: 0;
            transform: scale(0.95);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        
        .video-testimonial.active {
            opacity: 1;
            transform: scale(1);
            position: relative;
        }
        
        .text-testimonial {
            transition: opacity 0.6s ease;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
        
        .text-testimonial.active {
            opacity: 1;
            position: relative;
        }
        
        .video-wrapper.reel-video .play-pause-btn {
            transition: opacity 0.3s ease, transform 0.3s ease;
            display: flex;
            opacity: 1;
        }
        
        /* Ensure proper stacking context */
        .video-slider-container, .text-slider-container {
            position: relative;
            min-height: 300px; /* Prevent layout shift during transitions */
        }
    `;
    document.head.appendChild(style);
    
    // Handle mobile touch events for better UX
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Only consider significant swipes
            if (difference > 50) {
                // Swipe left - next slide
                videoSlider.nextSlide();
                textSlider.nextSlide();
            } else if (difference < -50) {
                // Swipe right - prev slide
                videoSlider.prevSlide();
                textSlider.prevSlide();
            }
        }
    }
    
    // Add touch event listeners to both sliders
    document.querySelector('.video-slider-container').addEventListener('touchstart', handleTouchStart, { passive: true });
    document.querySelector('.video-slider-container').addEventListener('touchend', handleTouchEnd, { passive: true });
    document.querySelector('.text-slider-container').addEventListener('touchstart', handleTouchStart, { passive: true });
    document.querySelector('.text-slider-container').addEventListener('touchend', handleTouchEnd, { passive: true });
});


// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Footer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                // Here you would typically send the data to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label functionality
            if (input.type !== 'submit' && input.type !== 'button') {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            }
        });
        
        // Form submission handling
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Please fill in all required fields.';
                form.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);



//  cleand code sumit's logic

// document.addEventListener('DOMContentLoaded', () => {
//     // --- Mobile Menu & Responsive Functionality ---
//     const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
//     const navMenu = document.querySelector('.nav-menu');

//     const toggleMobileMenu = (forceClose = false) => {
//         if (!mobileMenuToggle || !navMenu) return;

//         if (forceClose || (window.innerWidth <= 768 && mobileMenuToggle.classList.contains('active'))) {
//             mobileMenuToggle.classList.remove('active');
//             navMenu.classList.remove('active');
//             document.body.classList.remove('no-scroll');
//         } else if (!forceClose) {
//             mobileMenuToggle.classList.toggle('active');
//             navMenu.classList.toggle('active');
//             document.body.classList.toggle('no-scroll');
//         }
//     };

//     if (mobileMenuToggle && navMenu) {
//         mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());
//         document.querySelectorAll('.nav-links a').forEach(link => {
//             link.addEventListener('click', () => toggleMobileMenu(true));
//         });
//     }

//     // Close dropdown when clicking outside (desktop only)
//     document.addEventListener('click', e => {
//         if (window.innerWidth > 768) {
//             document.querySelectorAll('.dropdown').forEach(dropdown => {
//                 if (!dropdown.contains(e.target)) {
//                     const menu = dropdown.querySelector('.dropdown-menu');
//                     if (menu) {
//                         Object.assign(menu.style, {
//                             opacity: '0',
//                             visibility: 'hidden',
//                             transform: 'translateY(10px)'
//                         });
//                     }
//                 }
//             });
//         }
//     });

//     // Reset mobile menu on window resize to desktop
//     window.addEventListener('resize', () => {
//         if (window.innerWidth > 768) {
//             toggleMobileMenu(true); // Force close the mobile menu
//         }
//     });

//     // --- Animated Counters ---
//     const animateCounters = () => {
//         document.querySelectorAll('.counter').forEach(counter => {
//             const updateCount = () => {
//                 const target = +counter.getAttribute('data-target');
//                 const count = +counter.innerText;
//                 const increment = Math.ceil(target / 100);

//                 if (count < target) {
//                     counter.innerText = count + increment;
//                     setTimeout(updateCount, 18);
//                 } else {
//                     counter.innerText = target;
//                 }
//             };
//             updateCount();
//         });
//     };

//     const isInViewport = element => {
//         if (!element) return false;
//         const rect = element.getBoundingClientRect();
//         return rect.top < window.innerHeight && rect.bottom > 0;
//     };

//     const aboutCounters = document.querySelector('.about-counters');
//     if (aboutCounters) {
//         const scrollObserver = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     animateCounters();
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, { threshold: 0.1 }); // Trigger when 10% of the element is visible
//         scrollObserver.observe(aboutCounters);
//     }

//     // --- Read More Toggle ---
//     const readMoreBtn = document.getElementById('readMoreBtn');
//     const readMoreText = document.getElementById('readMoreText');

//     if (readMoreBtn && readMoreText) {
//         readMoreBtn.addEventListener('click', () => {
//             readMoreText.classList.toggle('active');
//             readMoreBtn.textContent = readMoreText.classList.contains('active') ? 'Read Less' : 'Read More';
//         });
//     }

//     // --- Video & Text Sliders ---
//     class Slider {
//         constructor(containerSelector, slideSelector, options = {}) {
//             this.slides = document.querySelectorAll(slideSelector);
//             this.container = document.querySelector(containerSelector);
//             this.currentIndex = 0;
//             this.autoSlideInterval = null;
//             this.autoSlideDelay = options.autoSlideDelay || 6000;
//             this.prevBtn = options.prevBtnSelector ? document.querySelector(options.prevBtnSelector) : null;
//             this.nextBtn = options.nextBtnSelector ? document.querySelector(options.nextBtnSelector) : null;
//             this.dotsContainer = options.dotsContainerSelector ? document.querySelector(options.dotsContainerSelector) : null;

//             if (this.slides.length === 0 || !this.container) return; // Exit if no slides or container

//             this.init();
//         }

//         init() {
//             this.showSlide(this.currentIndex);
//             this.createDots();
//             this.setupEventListeners();
//             this.startAutoSlide();
//             this.initializeMedia(); // For video slider specific initialization
//         }

//         initializeMedia() {
//             // Placeholder for specific media initialization (e.g., video)
//             // This method will be overridden or extended by child classes if needed.
//         }

//         showSlide(index) {
//             // Pause any playing media in the current slide before switching
//             if (this.slides[this.currentIndex]) {
//                 const media = this.slides[this.currentIndex].querySelector('video, audio');
//                 if (media && typeof media.pause === 'function') {
//                     media.pause();
//                     media.currentTime = 0;
//                 }
//                 const playPauseBtn = this.slides[this.currentIndex].querySelector('.play-pause-btn');
//                 if (playPauseBtn) {
//                     Object.assign(playPauseBtn.style, { opacity: '1' });
//                     const icon = playPauseBtn.querySelector('i');
//                     if (icon) icon.classList.replace('fa-pause', 'fa-play');
//                 }
//             }

//             this.slides.forEach(slide => {
//                 Object.assign(slide.style, { opacity: '0', transform: 'scale(0.95)', display: 'none' });
//                 slide.classList.remove('active');
//             });

//             this.currentIndex = (index + this.slides.length) % this.slides.length;
//             const activeSlide = this.slides[this.currentIndex];
//             Object.assign(activeSlide.style, { opacity: '1', transform: 'scale(1)', display: 'block' });
//             activeSlide.classList.add('active');

//             this.updateDots();
//             this.resetAutoSlide();
//         }

//         nextSlide() {
//             this.showSlide(this.currentIndex + 1);
//         }

//         prevSlide() {
//             this.showSlide(this.currentIndex - 1);
//         }

//         createDots() {
//             if (!this.dotsContainer) return;
//             this.dotsContainer.innerHTML = '';
//             this.slides.forEach((_, index) => {
//                 const dot = document.createElement('div');
//                 dot.classList.add('dot');
//                 if (index === this.currentIndex) dot.classList.add('active');
//                 dot.addEventListener('click', () => this.showSlide(index));
//                 this.dotsContainer.appendChild(dot);
//             });
//         }

//         updateDots() {
//             if (!this.dotsContainer) return;
//             this.dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
//                 dot.classList.toggle('active', index === this.currentIndex);
//             });
//         }

//         setupEventListeners() {
//             if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
//             if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

//             if (this.container) {
//                 this.container.addEventListener('mouseenter', () => this.pauseAutoSlide());
//                 this.container.addEventListener('mouseleave', () => this.startAutoSlide());
//             }
//         }

//         startAutoSlide() {
//             this.pauseAutoSlide();
//             this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDelay);
//         }

//         pauseAutoSlide() {
//             if (this.autoSlideInterval) {
//                 clearInterval(this.autoSlideInterval);
//                 this.autoSlideInterval = null;
//             }
//         }

//         resetAutoSlide() {
//             this.pauseAutoSlide();
//             this.startAutoSlide();
//         }
//     }

//     class VideoSlider extends Slider {
//         constructor() {
//             super('.video-slider-container', '.video-testimonial', {
//                 autoSlideDelay: 6000,
//                 prevBtnSelector: '.video-testimonial-slider .prev-arrow',
//                 nextBtnSelector: '.video-testimonial-slider .next-arrow'
//             });
//         }

//         initializeMedia() {
//             this.slides.forEach((slide, index) => {
//                 const video = slide.querySelector('video');
//                 const playPauseBtn = slide.querySelector('.play-pause-btn');

//                 if (!video || !playPauseBtn) return;

//                 if (index !== this.currentIndex) video.pause();
//                 else {
//                     playPauseBtn.style.display = 'flex';
//                     playPauseBtn.querySelector('i').classList.add('fa-play');
//                 }

//                 video.addEventListener('play', () => {
//                     playPauseBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
//                     playPauseBtn.style.opacity = '0';
//                 });

//                 video.addEventListener('pause', () => {
//                     playPauseBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
//                     playPauseBtn.style.opacity = '1';
//                 });

//                 const videoWrapper = slide.querySelector('.video-wrapper');
//                 videoWrapper.addEventListener('mouseenter', () => { if (!video.paused) playPauseBtn.style.opacity = '1'; });
//                 videoWrapper.addEventListener('mouseleave', () => { if (!video.paused) playPauseBtn.style.opacity = '0'; });
//                 videoWrapper.addEventListener('click', () => { if (!video.paused) playPauseBtn.style.opacity = playPauseBtn.style.opacity === '1' ? '0' : '1'; });

//                 playPauseBtn.addEventListener('click', e => {
//                     e.stopPropagation();
//                     video.paused ? video.play() : video.pause();
//                 });
//             });
//         }
//     }

//     class TextSlider extends Slider {
//         constructor() {
//             super('.text-slider-container', '.text-testimonial', {
//                 autoSlideDelay: 8000,
//                 dotsContainerSelector: '.slider-dots'
//             });
//         }
//     }

//     new VideoSlider();
//     new TextSlider();

//     // Add smooth transitions dynamically (already in place, but ensure it's still there)
//     const style = document.createElement('style');
//     style.textContent = `
//         .video-testimonial {
//             transition: opacity 0.6s ease, transform 0.6s ease;
//             opacity: 0;
//             transform: scale(0.95);
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//         }

//         .video-testimonial.active {
//             opacity: 1;
//             transform: scale(1);
//             position: relative;
//         }

//         .text-testimonial {
//             transition: opacity 0.6s ease;
//             opacity: 0;
//             position: absolute;
//             top: 0;
//             left: 0;
//             right: 0;
//         }

//         .text-testimonial.active {
//             opacity: 1;
//             position: relative;
//         }

//         .video-wrapper.reel-video .play-pause-btn {
//             transition: opacity 0.3s ease, transform 0.3s ease;
//             display: flex;
//             opacity: 1;
//         }

//         /* Ensure proper stacking context */
//         .video-slider-container, .text-slider-container {
//             position: relative;
//             min-height: 300px; /* Prevent layout shift during transitions */
//         }
//     `;
//     document.head.appendChild(style);

//     // Handle mobile touch events for better UX
//     let touchStartX = 0;
//     const handleTouchStart = e => { touchStartX = e.changedTouches[0].screenX; };
//     const handleTouchEnd = e => {
//         const touchEndX = e.changedTouches[0].screenX;
//         const difference = touchStartX - touchEndX;
//         if (Math.abs(difference) > 50) {
//             if (document.querySelector('.video-slider-container.active')) { // Check if video slider is visible/active
//                 if (difference > 50) new VideoSlider().nextSlide(); // Create a new instance to access methods
//                 else new VideoSlider().prevSlide();
//             }
//             if (document.querySelector('.text-slider-container.active')) { // Check if text slider is visible/active
//                 if (difference > 50) new TextSlider().nextSlide();
//                 else new TextSlider().prevSlide();
//             }
//         }
//     };

//     document.querySelector('.video-slider-container')?.addEventListener('touchstart', handleTouchStart, { passive: true });
//     document.querySelector('.video-slider-container')?.addEventListener('touchend', handleTouchEnd, { passive: true });
//     document.querySelector('.text-slider-container')?.addEventListener('touchstart', handleTouchStart, { passive: true });
//     document.querySelector('.text-slider-container')?.addEventListener('touchend', handleTouchEnd, { passive: true });


//     // --- FAQ Accordion ---
//     document.querySelectorAll('.faq-item').forEach(item => {
//         const question = item.querySelector('.faq-question');
//         if (question) {
//             question.addEventListener('click', () => {
//                 document.querySelectorAll('.faq-item').forEach(otherItem => {
//                     if (otherItem !== item && otherItem.classList.contains('active')) {
//                         otherItem.classList.remove('active');
//                     }
//                 });
//                 item.classList.toggle('active');
//             });
//         }
//     });

//     // --- Footer Functionality ---
//     const yearElement = document.getElementById('current-year');
//     if (yearElement) yearElement.textContent = new Date().getFullYear();

//     const backToTopButton = document.getElementById('back-to-top');
//     if (backToTopButton) {
//         window.addEventListener('scroll', () => {
//             backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
//         });
//         backToTopButton.addEventListener('click', e => {
//             e.preventDefault();
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         });
//     }

//     const newsletterForm = document.querySelector('.newsletter-form');
//     if (newsletterForm) {
//         newsletterForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const emailInput = this.querySelector('input[type="email"]');
//             if (emailInput?.value && emailInput.value.includes('@')) {
//                 alert('Thank you for subscribing to our newsletter!');
//                 emailInput.value = '';
//             } else {
//                 alert('Please enter a valid email address.');
//             }
//         });
//     }

//     // --- Smooth Scrolling for Anchor Links ---
//     document.querySelectorAll('a[href^="#"]').forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const targetElement = document.querySelector(this.getAttribute('href'));
//             if (targetElement) {
//                 const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
//                 window.scrollTo({ top: offsetTop, behavior: 'smooth' });
//             }
//         });
//     });

//     // --- Lazy Loading for Images ---
//     const images = document.querySelectorAll('img[data-src]');
//     if ('IntersectionObserver' in window) {
//         const imageObserver = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     const img = entry.target;
//                     img.src = img.dataset.src;
//                     img.classList.remove('lazy');
//                     observer.unobserve(img);
//                 }
//             });
//         });
//         images.forEach(img => imageObserver.observe(img));
//     } else {
//         // Fallback for browsers that don't support Intersection Observer
//         images.forEach(img => { img.src = img.dataset.src; img.classList.remove('lazy'); });
//     }

//     // --- Form Validation and Enhancement ---
//     document.querySelectorAll('form').forEach(form => {
//         form.querySelectorAll('input, textarea, select').forEach(input => {
//             if (!['submit', 'button'].includes(input.type)) {
//                 input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
//                 input.addEventListener('blur', () => { if (!input.value) input.parentElement?.classList.remove('focused'); });
//                 if (input.value) input.parentElement?.classList.add('focused');
//             }
//         });

//         form.addEventListener('submit', function(e) {
//             let isValid = true;
//             this.querySelectorAll('[required]').forEach(field => {
//                 if (!field.value.trim()) {
//                     isValid = false;
//                     field.classList.add('error');
//                 } else {
//                     field.classList.remove('error');
//                 }
//             });

//             if (!isValid) {
//                 e.preventDefault();
//                 const errorMessage = Object.assign(document.createElement('div'), {
//                     className: 'form-error',
//                     textContent: 'Please fill in all required fields.'
//                 });
//                 this.appendChild(errorMessage);
//                 setTimeout(() => errorMessage.remove(), 3000);
//             }
//         });
//     });

//     // --- Performance Optimization: Debounce Scroll Events ---
//     const debounce = (func, wait) => {
//         let timeout;
//         return function executedFunction(...args) {
//             const later = () => {
//                 clearTimeout(timeout);
//                 func(...args);
//             };
//             clearTimeout(timeout);
//             timeout = setTimeout(later, wait);
//         };
//     };

//     const optimizedScrollHandler = debounce(() => {
//         const header = document.querySelector('.site-header');
//         if (header) header.classList.toggle('scrolled', window.scrollY > 100);
//     }, 10);

//     window.addEventListener('scroll', optimizedScrollHandler);
// });

