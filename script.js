// ==========================================
// SLIDESHOW FUNCTIONALITY
// ==========================================
let slideIndex = 1;
let slideTimer;

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    
    if (n > slides.length) { slideIndex = 1 }    
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].classList.remove("active");
    }

    slides[slideIndex-1].style.display = "block";  
    slides[slideIndex-1].classList.add("active");
}

function startAutoplay() {
    clearInterval(slideTimer); 
    slideTimer = setInterval(function() {
        showSlides(slideIndex += 1);
    }, 4000);
}

// ==========================================
// MAIN INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slideshow
    let slides = document.getElementsByClassName("slide");
    if (slides.length > 0) {
        showSlides(slideIndex);
        startAutoplay();
    }

    // ==========================================
    // HAMBURGER MENU FUNCTIONALITY
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('li a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // MODAL FOR PORTFOLIO/GALLERY PREVIEW
    // ==========================================
    const portoOverlay = document.createElement('div');
    portoOverlay.id = 'porto-overlay';
    portoOverlay.innerHTML = `
        <div id="porto-modal">
            <button id="porto-close">✕</button>
            <img id="porto-modal-img" src="" alt="Preview">
            <p id="porto-modal-caption"></p>
            <p id="porto-modal-desc"></p>
        </div>
    `;
    document.body.appendChild(portoOverlay);

    portoOverlay.addEventListener('click', function(e){
        if (e.target.id === 'porto-overlay' || e.target.id === 'porto-close') {
            portoOverlay.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portoOverlay.style.display === 'flex') {
            portoOverlay.style.display = 'none';
        }
    });
});

// ==========================================
// HELPER FUNCTION FOR OPENING MODAL
// ==========================================
function openPortoModal(src, caption, desc) {
    const overlay = document.getElementById('porto-overlay');
    if (!overlay) return;
    const img = document.getElementById('porto-modal-img');
    const cap = document.getElementById('porto-modal-caption');
    const descEl = document.getElementById('porto-modal-desc');
    img.src = src;
    cap.textContent = caption || '';
    descEl.textContent = desc || '';
    overlay.style.display = 'flex';
}

// ==========================================
// CAROUSEL FUNCTIONALITY
// ==========================================
let currentSlide = 0;
let totalSlides = 6; // Jumlah items dalam carousel

function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!carouselTrack || !indicatorsContainer) return;
    
    // Create carousel indicators/dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', i);
        dot.addEventListener('click', function() {
            goToSlide(i);
        });
        indicatorsContainer.appendChild(dot);
    }
}

function slideCarousel(direction) {
    const carouselTrack = document.getElementById('carouselTrack');
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateCarouselPosition(carouselTrack);
}

function goToSlide(index) {
    currentSlide = index;
    const carouselTrack = document.getElementById('carouselTrack');
    updateCarouselPosition(carouselTrack);
}

function updateCarouselPosition(carouselTrack) {
    if (!carouselTrack) return;
    
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Update active indicator
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;
    
    // Check if carousel is visible
    const rect = carouselContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        if (e.key === 'ArrowLeft') {
            slideCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            slideCarousel(1);
        }
    }
});

// ==========================================
// ENHANCED MODAL FOR MEDIA (IMAGES & VIDEOS)
// ==========================================
function openMediaModal(type, src, caption) {
    const overlay = document.getElementById('porto-overlay');
    if (!overlay) return;
    
    if (type === 'img') {
        // Use existing image modal
        const img = document.getElementById('porto-modal-img');
        const cap = document.getElementById('porto-modal-caption');
        img.src = src;
        cap.textContent = caption || '';
        overlay.style.display = 'flex';
    } else if (type === 'video') {
        // For video, we could create a custom video player modal
        // For now, we'll create a simple overlay with video player
        const modal = overlay.querySelector('#porto-modal');
        const closeBtn = modal.querySelector('#porto-close');
        
        // Clear existing img if any
        const img = document.getElementById('porto-modal-img');
        if (img) img.style.display = 'none';
        
        // Create video element
        let video = modal.querySelector('video');
        if (!video) {
            video = document.createElement('video');
            video.style.width = '100%';
            video.style.height = 'auto';
            video.style.maxHeight = '65vh';
            video.style.borderRadius = '16px 16px 0 0';
            video.style.display = 'block';
            video.style.backgroundColor = '#f0f4f8';
            video.style.padding = '20px 20px 10px 20px';
            video.controls = true;
            video.autoplay = false;
            img.parentNode.insertBefore(video, img);
        }
        
        video.src = src;
        video.style.display = 'block';
        
        // Update caption
        const cap = document.getElementById('porto-modal-caption');
        cap.textContent = caption || '';
        
        overlay.style.display = 'flex';
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});