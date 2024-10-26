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
// Variables globales con mejor organización
const DOM = {
    preloader: document.getElementById('preloader'),
    navbar: document.getElementById('navbar'),
    menuToggle: document.getElementById('menu-toggle'),
    navLinks: document.querySelector('.nav-links'),
    carouselContainer: document.querySelector('.carousel-container'),
    contactForm: document.getElementById('contact-form'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightbox-img'),
    closeButton: document.querySelector('.close-lightbox')
};

const STATE = {
    currentSlide: 0,
    isAnimating: false,
    totalSlides: document.querySelectorAll('.carousel-item').length
};

// Clase para manejar el carrusel
class Carousel {
    constructor(container, totalSlides) {
        this.container = container;
        this.totalSlides = totalSlides;
        this.currentSlide = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        this.initializeControls();
        this.startAutoPlay();
        this.handleResize();
    }

    initializeControls() {
        document.querySelector('.prev').addEventListener('click', () => this.navigate(-1));
        document.querySelector('.next').addEventListener('click', () => this.navigate(1));
        
        // Touch events para móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', () => {
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 50) {
                this.navigate(difference > 0 ? 1 : -1);
            }
        });
    }

    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.currentSlide = (this.currentSlide + direction + this.totalSlides) % this.totalSlides;
        this.updateSlidePosition();

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateSlidePosition() {
        const slidePercentage = this.getSlidePercentage();
        this.container.style.transform = `translateX(-${this.currentSlide * slidePercentage}%)`;
    }

    getSlidePercentage() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) return 100;
        if (screenWidth <= 768) return 50;
        return 33.33;
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.navigate(1);
        }, 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.updateSlidePosition();
        });
    }
}

// Clase para manejar el lightbox
class Lightbox {
    constructor(lightboxElement, lightboxImg) {
        this.lightbox = lightboxElement;
        this.lightboxImg = lightboxImg;
        this.initializeEvents();
    }

    initializeEvents() {
        document.querySelectorAll('.carousel-item img').forEach(img => {
            img.addEventListener('click', () => this.open(img.src));
        });

        DOM.closeButton.addEventListener('click', () => this.close());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.close();
        });
    }

    open(imageSrc) {
        this.lightboxImg.src = imageSrc;
        this.lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Clase para manejar el formulario
class ContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.initializeEvents();
    }

    initializeEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Simulación de envío de formulario
            await this.simulateFormSubmission(data);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage(error);
        }
    }

    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 1000);
        });
    }

    showSuccessMessage() {
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    }

    showErrorMessage(error) {
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        console.error('Form submission error:', error);
    }
}

// Funciones de utilidad
const utils = {
    animateScroll(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    },

    handleNavbarScroll() {
        window.addEventListener('scroll', () => {
            DOM.navbar.style.backgroundColor = window.scrollY > 100 
                ? 'rgba(34, 34, 34, 1)' 
                : 'rgba(34, 34, 34, 0.9)';
        });
    },

    toggleMenu() {
        DOM.navLinks.classList.toggle('show');
        const bars = DOM.menuToggle.querySelectorAll('.bar');
        bars[0].style.transform = DOM.navLinks.classList.contains('show') 
            ? 'rotate(45deg) translate(5px, 6px)' 
            : '';
        bars[1].style.opacity = DOM.navLinks.classList.contains('show') 
            ? '0' 
            : '1';
        bars[2].style.transform = DOM.navLinks.classList.contains('show') 
            ? 'rotate(-45deg) translate(5px, -6px)' 
            : '';
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes
    const carousel = new Carousel(DOM.carouselContainer, STATE.totalSlides);
    const lightbox = new Lightbox(DOM.lightbox, DOM.lightboxImg);
    const contactForm = new ContactForm(DOM.contactForm);

    // Configurar eventos
    DOM.menuToggle.addEventListener('click', utils.toggleMenu);
    utils.handleNavbarScroll();

    // Cerrar menú móvil al hacer clic en un enlace
    DOM.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', utils.toggleMenu);
    });

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.preloader.style.opacity = '0';
            setTimeout(() => {
                DOM.preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}); 
