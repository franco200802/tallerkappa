// Función para el lightbox
function openLightbox(image) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = image.src;
    lightbox.classList.add('show');
}

function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
}

// Funciones para el carrusel
let currentSlide = 0;

function nextSlide() {
    const container = document.querySelector('.carousel-container');
    const totalItems = document.querySelectorAll('.carousel-item').length;

    // Verificar que no se alcance el último producto
    if (currentSlide < totalItems - 1) {
        currentSlide++;
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function prevSlide() {
    const container = document.querySelector('.carousel-container');

    // Verificar que no se alcance el primer producto
    if (currentSlide > 0) {
        currentSlide--;
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Función para animar el desplazamiento en la página
function animateScroll() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}
