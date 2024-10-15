// Variables globales
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-item').length;
const carouselContainer = document.querySelector('.carousel-container');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Función para el carrusel
function showSlide(index) {
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    carouselContainer.style.transform = `translateX(-${currentSlide * 100 / 3}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Función para el lightbox
function openLightbox(image) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = image.src;
    lightbox.classList.add('show');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
}

// Función para animar el desplazamiento en la página
function animateScroll() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// Función para manejar el menú móvil
function toggleMenu() {
    navLinks.classList.toggle('show');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1500);

    // Carrusel
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Lightbox
    document.querySelectorAll('.carousel-item img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    // Menú móvil
    menuToggle.addEventListener('click', toggleMenu);

    // Navbar scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(34, 34, 34, 1)';
        } else {
            navbar.style.backgroundColor = 'rgba(34, 34, 34, 0.9)';
        }
    });
});

// Ajuste automático del carrusel para diferentes tamaños de pantalla
window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    let slidePercentage;

    if (screenWidth <= 480) {
        slidePercentage = 100;
    } else if (screenWidth <= 768) {
        slidePercentage = 50;
    } else {
        slidePercentage = 33.33;
    }

    carouselContainer.style.transform = `translateX(-${currentSlide * slidePercentage}%)`;
});
