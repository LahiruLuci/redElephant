// document.addEventListener('DOMContentLoaded', function(){
//     const packageCards = document.querySelectorAll('.package-card');

//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver(function(entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//             }
//         });
//     }, observerOptions);

//     packageCards.forEach((card, index) => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(30px)';
//         card.style.transition = `all 0.6s ease ${index * 0.2}s`;
//         observer.observe(card);
//     })
// })

// document.addEventListener('DOMContentLoaded', function() {
//     const navbar = document.querySelector('.navbar');
//     const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
//     const navLinks = document.querySelector('.nav-links');
//     const packageCards = document.querySelectorAll('.package-card');

//     window.addEventListener('scroll', function() {
//         if (navbar) {
//             if (window.scrollY > 50) {
//                 navbar.classList.add('scrolled');
//             } else {
//                 navbar.classList.remove('scrolled');
//             }
//         }
//     });

//     if (mobileMenuBtn) {
//         mobileMenuBtn.addEventListener('click', function() {
//             if (navLinks) {
//                 navLinks.classList.toggle('active');
//             }

//             const spans = mobileMenuBtn.querySelectorAll('span');
//             spans.forEach((span, index) => {
//                 if (navLinks && navLinks.classList.contains('active')) {
//                 if (index === 0) {
//                     span.style.transform = 'rotate(45deg) translate(6px, 6px)';
//                 } else if (index === 1) {
//                     span.style.opacity = '0';
//                 } else if (index === 2) {
//                     span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
//                 }
//             } else {
//                 span.style.transform = 'none';
//                 span.style.opacity = '1';
//                 }
//             });
//         });
//     }

//     document.querySelectorAll('.nav-links a').forEach(link => {
//         link.addEventListener('click', function() {
//             if (window.innerWidth <= 768 && navLinks && mobileMenuBtn) {
//                 navLinks.classList.remove('active');
//                 const spans = mobileMenuBtn.querySelectorAll('span');
//                 spans.forEach(span => {
//                     span.style.transform = 'none';
//                     span.style.opacity = '1';
//                 });
//             }
//         });
//     });

//     packageCards.forEach(card => {
//         card.addEventListener('click', function(e) {
//             e.preventDefault();
//             const destination = this.dataset.destination;
//             const heading = this.querySelector('h3').textContent;

//             alert(`You selected: ${heading}\n\nThis would navigate to the ${destination} package details page.`);
//         });
//     });

//     const packagesGrid = document.querySelector('.packages-grid');
//     const prevBtn = document.querySelector('.slider-prev');
//     const nextBtn = document.querySelector('.slider-next');
//     const sliderDots = document.querySelectorAll('.slider-dot');
//     const totalCards = packageCards.length;
//     let currentIndex = 0;
//     let cardsToShow = 3;

//     function getCardsToShow() {
//         if (window.innerWidth <= 768) {
//             return 1;
//         } else if (window.innerWidth <= 992) {
//             return 2;
//         }
//         return 3;
//     }

//     function getMaxIndex() {
//         return Math.max(0, totalCards - cardsToShow);
//     }

//     function updateSlider() {
//         cardsToShow = getCardsToShow();
//         const maxIndex = getMaxIndex();

//         if (currentIndex > maxIndex) {
//             currentIndex = maxIndex;
//         }

//         const card = document.querySelector('.package-card');
//         const cardStyle = window.getComputedStyle(card);
//         const cardWidth = card.offsetWidth;
//         const gap = parseInt(window.getComputedStyle(packagesGrid).gap) || 32;

//         const translateX = currentIndex * (cardWidth + gap);
//         packagesGrid.style.transform = `translateX(-${translateX}px)`;

//         updateButtons();
//         updateDots();
//     }

//     function updateButtons() {
//         const maxIndex = getMaxIndex();

//         if (prevBtn) {
//             prevBtn.disabled = currentIndex === 0;
//         }
//         if (nextBtn) {
//             nextBtn.disabled = currentIndex >= maxIndex;
//         }
//     }

//     function updateDots() {
//         const maxIndex = getMaxIndex();
//         const totalDots = maxIndex + 1;

//         sliderDots.forEach((dot, index) => {
//             if (index < totalDots) {
//                 dot.style.display = 'block';
//                 dot.classList.toggle('active', index === currentIndex);
//             } else {
//                 dot.style.display = 'none';
//             }
//         });
//     }

//     function slideNext() {
//         const maxIndex = getMaxIndex();
//         if (currentIndex < maxIndex) {
//             currentIndex++;
//             updateSlider();
//         }
//     }

//     function slidePrev() {
//         if (currentIndex > 0) {
//             currentIndex--;
//             updateSlider();
//         }
//     }

//     function goToSlide(index) {
//         const maxIndex = getMaxIndex();
//         currentIndex = Math.min(Math.max(0, index), maxIndex);
//         updateSlider();
//     }

//     if (nextBtn) {
//         nextBtn.addEventListener('click', slideNext);
//     }

//     if (prevBtn) {
//         prevBtn.addEventListener('click', slidePrev);
//     }

//     sliderDots.forEach((dot, index) => {
//         dot.addEventListener('click', () => goToSlide(index));
//     });

//     let touchStartX = 0;
//     let touchEndX = 0;
//     const sliderWrapper = document.querySelector('.slider-wrapper');

//     if (sliderWrapper) {
//         sliderWrapper.addEventListener('touchstart', function(e) {
//             touchStartX = e.changedTouches[0].screenX;
//         }, { passive: true });

//         sliderWrapper.addEventListener('touchend', function(e) {
//             touchEndX = e.changedTouches[0].screenX;
//             handleSwipe();
//         }, { passive: true });
//     }

//     function handleSwipe() {
//         const swipeThreshold = 50;
//         const diff = touchStartX - touchEndX;

//         if (Math.abs(diff) > swipeThreshold) {
//             if (diff > 0) {
//                 slideNext();
//             } else {
//                 slidePrev();
//             }
//         }
//     }

//     let resizeTimer;
//     window.addEventListener('resize', function() {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(function() {
//             const newCardsToShow = getCardsToShow();
//             if (newCardsToShow !== cardsToShow) {
//                 cardsToShow = newCardsToShow;
//                 const maxIndex = getMaxIndex();
//                 if (currentIndex > maxIndex) {
//                     currentIndex = maxIndex;
//                 }
//             }
//             updateSlider();
//         }, 100);
//     });

//     updateSlider();

//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver(function(entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//             }
//         });
//     }, observerOptions);

//     packageCards.forEach((card, index) => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(30px)';
//         card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
//         observer.observe(card);
//     });
// });

// =========================
// SLIDER WITH AUTO LOOP
// =========================
// const packagesGrid = document.querySelector('.packages-grid');
// const prevBtn = document.querySelector('.slider-prev');
// const nextBtn = document.querySelector('.slider-next');
// const sliderDots = document.querySelectorAll('.slider-dot');
// let packageCards = document.querySelectorAll('.package-card');

// let currentIndex = 0;
// let cardsToShow = 3;
// let autoSlideInterval;
// let isTransitioning = false;

// // Guard slider code: only run if the slider container exists on the page
// if (packagesGrid) {

// // Responsive cards count
// function getCardsToShow() {
//     if (window.innerWidth <= 768) return 1;
//     if (window.innerWidth < 1440) return 2;
//     return 3;
// }

// // Clone cards for infinite loop
// function setupInfiniteLoop() {
//     const cards = document.querySelectorAll('.package-card');

//     // Remove old clones
//     document.querySelectorAll('.clone').forEach(el => el.remove());

//     cardsToShow = getCardsToShow();

//     // Clone last cards → prepend
//     for (let i = cards.length - cardsToShow; i < cards.length; i++) {
//         const clone = cards[i].cloneNode(true);
//         clone.classList.add('clone');
//         packagesGrid.prepend(clone);
//     }

//     // Clone first cards → append
//     for (let i = 0; i < cardsToShow; i++) {
//         const clone = cards[i].cloneNode(true);
//         clone.classList.add('clone');
//         packagesGrid.append(clone);
//     }

//     packageCards = document.querySelectorAll('.package-card');

//     currentIndex = cardsToShow;
//     moveSlider(false);
// }

// function getCardWidth() {
//     const card = document.querySelector('.package-card');
//     const gap = parseInt(window.getComputedStyle(packagesGrid).gap) || 32;
//     return card.offsetWidth + gap;
// }

// // Move slider
// function moveSlider(animate = true) {
//     const width = getCardWidth();

//     if (animate) {
//         packagesGrid.style.transition = 'transform 0.6s ease-in-out';
//     } else {
//         packagesGrid.style.transition = 'none';
//     }

//     packagesGrid.style.transform = `translateX(-${currentIndex * width}px)`;
// }

// // Next slide
// function slideNext() {
//     if (isTransitioning) return;
//     isTransitioning = true;

//     currentIndex++;
//     moveSlider(true);
// }

// // Prev slide
// function slidePrev() {
//     if (isTransitioning) return;
//     isTransitioning = true;

//     currentIndex--;
//     moveSlider(true);
// }

// // Fix jump after reaching clones
// packagesGrid.addEventListener('transitionend', () => {
//     const realCards = document.querySelectorAll('.package-card:not(.clone)').length;

//     if (currentIndex >= realCards + cardsToShow) {
//         currentIndex = cardsToShow;
//         moveSlider(false);
//     }

//     if (currentIndex <= 0) {
//         currentIndex = realCards;
//         moveSlider(false);
//     }

//     isTransitioning = false;
//     updateDots();
// });

// // Dots
// function updateDots() {
//     const realCount = document.querySelectorAll('.package-card:not(.clone)').length;
//     const maxIndex = realCount - cardsToShow;

//     let visibleIndex = currentIndex - cardsToShow;
//     if (visibleIndex < 0) visibleIndex = maxIndex;

//     sliderDots.forEach((dot, i) => {
//         dot.classList.toggle('active', i === visibleIndex);
//         dot.style.display = "block";
//     });
// }

// // Dots click
// sliderDots.forEach((dot, i) => {
//     dot.addEventListener('click', () => {
//         currentIndex = i + cardsToShow;
//         moveSlider(true);
//         restartAutoSlide();
//     });
// });

// // Buttons
// if (nextBtn) nextBtn.addEventListener('click', () => {
//     slideNext();
//     restartAutoSlide();
// });

// if (prevBtn) prevBtn.addEventListener('click', () => {
//     slidePrev();
//     restartAutoSlide();
// });

// // Auto slide
// function startAutoSlide() {
//     autoSlideInterval = setInterval(slideNext, 4000);
// }

// function restartAutoSlide() {
//     clearInterval(autoSlideInterval);
//     startAutoSlide();
// }

// // Touch swipe
// let touchStartX = 0;
// let touchEndX = 0;

// const sliderWrapper = document.querySelector('.slider-wrapper');

// if (sliderWrapper) {
//     sliderWrapper.addEventListener('touchstart', (e) => {
//         touchStartX = e.changedTouches[0].screenX;
//     });

//     sliderWrapper.addEventListener('touchend', (e) => {
//         touchEndX = e.changedTouches[0].screenX;
//         const diff = touchStartX - touchEndX;
//         if (Math.abs(diff) > 50) {
//             diff > 0 ? slideNext() : slidePrev();
//             restartAutoSlide();
//         }
//     });
// }

// // Resize
// window.addEventListener('resize', () => {
//     setupInfiniteLoop();
// });

// // Init
// window.addEventListener('load', () => {
//     setupInfiniteLoop();
//     startAutoSlide();
// });

// } // end if (packagesGrid)

// Initialize Swiper when DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Check if swiper container exists
//     const swiperContainer = document.querySelector('.tourSwiper');

//     if (swiperContainer) {
//         const swiper = new Swiper('.tourSwiper', {
//             // Enable loop mode for infinite scrolling
//             loop: true,

//             // Auto slide every 4 seconds
//             autoplay: {
//                 delay: 4000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//             },

//             // Smooth transition effect
//             effect: 'slide',
//             speed: 600,

//             // Space between slides (32px = 2rem)
//             spaceBetween: 32,

//             // Responsive breakpoints
//             slidesPerView: 1,
//             breakpoints: {
//                 // When window width is >= 769px
//                 769: {
//                     slidesPerView: 2,
//                     spaceBetween: 32,
//                 },
//                 // When window width is >= 1440px
//                 1440: {
//                     slidesPerView: 3,
//                     spaceBetween: 32,
//                 }
//             },

//             // Custom navigation buttons
//             navigation: {
//                 nextEl: '.slider-next',
//                 prevEl: '.slider-prev',
//             },

//             // Pagination dots
//             pagination: {
//                 el: '.slider-dots',
//                 clickable: true,
//                 dynamicBullets: false,
//             },

//             // Grab cursor on hover
//             grabCursor: true,

//             // Enable touch/swipe on mobile
//             touchRatio: 1,
//             touchAngle: 45,

//             // Prevent clicks during transition
//             preventClicks: true,
//             preventClicksPropagation: true,

//             // Smooth resistance
//             resistance: true,
//             resistanceRatio: 0.85,
//         });

//         console.log('Swiper initialized successfully!');
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const swiperContainer = document.querySelector('.tourSwiper');

    if (swiperContainer) {
        const swiper = new Swiper('.tourSwiper', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 600,
            // Default for mobile
            slidesPerView: 1,
            spaceBetween: 20,

            breakpoints: {
                // Tablet: 768px and up (Shows 2 cards)
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                // Large Desktop: 1200px and up (Shows 3 cards)
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                }
            },

            navigation: {
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
            },
            pagination: {
                el: '.slider-dots',
                clickable: true,
            },
            grabCursor: true,
            touchRatio: 1,
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const packageCards = document.querySelectorAll('.package-card');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');

        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navLinks.classList.contains('active')) {
                if (index === 0) {
                    span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                } else if (index === 1) {
                    span.style.opacity = '0';
                } else if (index === 2) {
                    span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                }
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });

    packageCards.forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            const destination = this.dataset.destination;
            const heading = this.querySelector('h3').textContent;

            alert(`You selected: ${heading}\n\nThis would navigate to the ${destination} package details page.`);
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    packageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
});

document.querySelectorAll('.tour-card-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.tour-card').forEach(card => {
    observer.observe(card);
});

// Add hover sound effect (optional - can be removed)
document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});


// =======================================Tour-package-timeline-start=======================================

const car = document.getElementById('car');

function toggleItem(badge) {
    if (window.innerWidth < 1024) {
        const item = badge.parentElement;
        item.classList.toggle('open');
    }
}

function handleScroll() {
    const scrollY = window.scrollY;
    const container = document.querySelector('.timeline-container');
    const containerHeight = container.offsetHeight;
    const containerTop = container.offsetTop;
    const windowHeight = window.innerHeight;

    // Calculate car position relative to the viewport center
    let scrollRelative = (scrollY + windowHeight / 2) - containerTop;

    // Base offset so the car starts at 40px from the top
    const baseTop = 40;
    // Limit the travel so the car stays within the container (leave baseTop margin at bottom)
    const maxTravel = Math.max(0, containerHeight - baseTop - 40);

    // If timeline is above the viewport center, keep car at baseTop
    if (scrollRelative <= 0) {
        car.style.top = `${baseTop}px`;
        return;
    }

    // If timeline has passed the bottom, pin car to the end position
    if (scrollRelative >= containerHeight) {
        car.style.top = `${baseTop + maxTravel}px`;
        return;
    }

    // Otherwise, interpolate within the container
    const progress = scrollRelative / containerHeight;
    const targetTop = baseTop + (progress * maxTravel);
    car.style.top = `${targetTop}px`;

    // Interaction for Day Badges
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const badge = item.querySelector('.day-badge');
        if (rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2) {
            badge.style.backgroundColor = 'var(--primary)';
            badge.style.color = 'white';
            badge.style.transform = (window.innerWidth >= 1024) ? 'translateX(-50%) scale(1.15)' : 'scale(1.1)';
        } else {
            badge.style.backgroundColor = 'white';
            badge.style.color = 'var(--primary)';
            badge.style.transform = (window.innerWidth >= 1024) ? 'translateX(-50%)' : 'none';
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
handleScroll();

function toggleMainTimeline() {
    const wrapper = document.querySelector('.itinerary-wrapper');
    const toggleText = document.getElementById('toggle-text');

    wrapper.classList.toggle('is-open');

    if (wrapper.classList.contains('is-open')) {
        toggleText.innerText = "Close Route";
        // Small timeout to allow the transition to start before recalculating scroll
        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 100);
    } else {
        toggleText.innerText = "View Full Route";
    }
}

// Keep your existing car scroll logic here, 
// but ensure it's wrapped in the window listener so it 
// recalculates when the container expands.
window.addEventListener('scroll', () => {
    const wrapper = document.querySelector('.itinerary-wrapper');
    if (!wrapper.classList.contains('is-open') && window.innerWidth >= 1024) return;

    // ... insert your car movement logic from the previous step here ...
});

// ===================why-choose-us-section===================
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const whyChooseObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

let hasAnimated = false;

const whyChooseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            const leftContent = document.querySelector('.why-choose-left-content');
            leftContent.classList.add('why-choose-animate');

            const cards = document.querySelectorAll('.why-choose-stat-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('why-choose-animate');

                    const numberElement = card.querySelector('.why-choose-stat-number');
                    const target = parseInt(card.dataset.number);
                    animateCounter(numberElement, target);
                }, index * 150);
            });
        }
    });
}, whyChooseObserverOptions);

const section = document.querySelector('.why-choose-section');
if (section) {
    whyChooseObserver.observe(section);
}

function handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Rotation Calculation
    const rotateX = (centerY - y) / 12;
    const rotateY = (x - centerX) / 12;

    // Apply tilt to the main card
    card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Background Image Parallax (Moves slightly with mouse)
    const img = card.querySelector('.card-img');
    img.style.transform = `scale(1.15) translateX(${-rotateY * 0.8}px) translateY(${rotateX * 0.8}px)`;

    // Number Float Animation (Higher multiplier for more depth)
    const num = card.querySelector('.card-number');
    num.style.transform = `translateZ(70px) translateX(${rotateY * 2}px) translateY(${-rotateX * 2}px)`;
}

// 2. Upper Circle Parallax
document.addEventListener('mousemove', (e) => {
    const circle = document.getElementById('floatingCircle');
    if (circle) {
        const moveX = (e.clientX * -0.01);
        const moveY = (e.clientY * -0.01);
        circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// 3. Smooth Reset when mouse leaves card
document.querySelectorAll('.wellness-card-wrapper').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg)`;

        const img = card.querySelector('.wellness-card-img');
        img.style.transform = `scale(1) translateX(0) translateY(0)`;

        const num = card.querySelector('.wellness-card-number');
        num.style.transform = `translateZ(0) translateX(0) translateY(0)`;
    });
});

document.querySelectorAll('.events-event-panel').forEach(panel => {
    panel.addEventListener('mouseenter', () => {
        // Optional: Add logic to play a subtle sound or video
    });

    // Touch support for mobile to trigger the "active" state
    panel.addEventListener('touchstart', function () {
        this.classList.toggle('active');
    });
});


/* ==============================================
   SPA & WELLNESS PAGE SCRIPTS
============================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for Hero Button
    const heroBtn = document.querySelector('.spa-page-btn-hero');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll Animation for Service Cards
    const serviceCards = document.querySelectorAll('.spa-page-service-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // Add staggered delay
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });
});

