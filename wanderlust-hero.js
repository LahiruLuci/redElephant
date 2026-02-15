// DOM Elements
const wlHeader = document.querySelector('.wl-main-header');
const wlSlides = document.querySelectorAll('.wl-slide');
const wlProgress = document.getElementById('wlSlideProgress');
const wlCurrentSlideText = document.getElementById('wlCurrentSlide');
const wlMenuToggle = document.getElementById('wlMenuToggle');
const wlCloseMenu = document.getElementById('wlCloseMenu');
const wlMobileNav = document.getElementById('wlMobileNav');
const wlSubmenuToggles = document.querySelectorAll('.wl-submenu-toggle');

// Configuration
const wlSlideIntervalTime = 6000; // 6 seconds per slide
let wlCurrentSlideIndex = 0;
let wlSlideInterval;

// =========================================
// SCROLL HANDLING
// =========================================
function wlHandleScroll() {
    if (window.scrollY > 50) {
        wlHeader.classList.add('scrolled');
    } else {
        wlHeader.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', wlHandleScroll);

// =========================================
// SLIDER LOGIC
// =========================================
function wlUpdateSlider() {
    if (!wlSlides.length) return;

    // 1. Remove active class from all slides
    wlSlides.forEach(slide => slide.classList.remove('active'));

    // 2. Add active class to current slide
    if (wlSlides[wlCurrentSlideIndex]) {
        wlSlides[wlCurrentSlideIndex].classList.add('active');
    }

    // 3. Update Text Counter (pad with 0)
    if (wlCurrentSlideText) {
        wlCurrentSlideText.textContent = `0${wlCurrentSlideIndex + 1}`;
    }

    // 4. Reset and Animate Progress Bar
    wlResetProgressBar();
}

function wlNextSlide() {
    wlCurrentSlideIndex++;
    if (wlCurrentSlideIndex >= wlSlides.length) {
        wlCurrentSlideIndex = 0;
    }
    wlUpdateSlider();
}

function wlResetProgressBar() {
    if (!wlProgress) return;

    wlProgress.style.transition = 'none';
    wlProgress.style.width = '0%';
    void wlProgress.offsetWidth; // Force Reflow
    wlProgress.style.transition = `width ${wlSlideIntervalTime}ms linear`;
    wlProgress.style.width = '100%';
}

function wlStartSlider() {
    wlResetProgressBar();
    // Clear existing interval if any to prevent duplicates
    if (wlSlideInterval) clearInterval(wlSlideInterval);
    wlSlideInterval = setInterval(wlNextSlide, wlSlideIntervalTime);
}

// Start slider if slides exist
if (wlSlides.length > 0) {
    wlStartSlider();
}

// =========================================
// MOBILE MENU
// =========================================
function wlToggleMenu() {
    if (wlMobileNav.classList.contains('active')) {
        wlMobileNav.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        wlMobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

if (wlMenuToggle) wlMenuToggle.addEventListener('click', wlToggleMenu);
if (wlCloseMenu) wlCloseMenu.addEventListener('click', wlToggleMenu);

// Accordion for Submenus
if (wlSubmenuToggles) {
    wlSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const submenu = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            if (submenu) {
                submenu.classList.toggle('open');
                if (submenu.classList.contains('open')) {
                    if (icon) icon.style.transform = 'rotate(180deg)';
                } else {
                    if (icon) icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}
