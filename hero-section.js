// DOM Elements
const header = document.getElementById('mainHeader');
const slides = document.querySelectorAll('.slide');
const progress = document.getElementById('slideProgress');
const currentSlideText = document.getElementById('currentSlide');
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
const submenuToggles = document.querySelectorAll('.submenu-toggle');
// Configuration
const slideIntervalTime = 6000; // 6 seconds per slide
let currentSlideIndex = 0;
let slideInterval;
// =========================================
// SCROLL HANDLING
// =========================================
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleScroll);
// =========================================
// SLIDER LOGIC
// =========================================
function updateSlider() {
    // 1. Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // 2. Add active class to current slide
    slides[currentSlideIndex].classList.add('active');
    // 3. Update Text Counter (pad with 0)
    currentSlideText.textContent = `0${currentSlideIndex + 1}`;
    // 4. Reset and Animate Progress Bar
    resetProgressBar();
}
function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    updateSlider();
}
function resetProgressBar() {
    progress.style.transition = 'none';
    progress.style.width = '0%';
    void progress.offsetWidth; // Force Reflow
    progress.style.transition = `width ${slideIntervalTime}ms linear`;
    progress.style.width = '100%';
}
function startSlider() {
    resetProgressBar();
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}
startSlider();
// =========================================
// MOBILE MENU
// =========================================
function toggleMenu() {
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
// Accordion for Submenus
submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const submenu = toggle.nextElementSibling;
        const icon = toggle.querySelector('i');
        submenu.classList.toggle('open');
        if (submenu.classList.contains('open')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});