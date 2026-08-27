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
    // Render description as HTML so URLs become clickable links.
    // Escape first to avoid injection, then auto-link raw URLs.
    const esc = document.createElement('div');
    esc.textContent = desc || '';
    const html = (esc.innerHTML || '')
        .replace(/\n/g, '<br>')
        .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    descEl.innerHTML = html;
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

// ==========================================
// REVAMP: LAZY-LOAD VIDEO (show_video.html)
// Click poster -> swap to <video> and play
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cv-video-lazy').forEach(function(card) {
        card.addEventListener('click', function() {
            if (card.querySelector('video')) return; // already loaded
            const src = card.getAttribute('data-src');
            if (!src) return;
            const img = card.querySelector('img');
            const play = card.querySelector('.cv-play');
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.setAttribute('playsinline', '');
            if (img) img.replaceWith(video);
            if (play) play.remove();
            video.play().catch(function() {});
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const cvNavbar = document.getElementById('cvNavbar');
    const cvHamburger = document.getElementById('cvHamburger');
    const cvNavLinks = document.getElementById('cvNavLinks');

    // Navbar shadow on scroll
    if (cvNavbar) {
        const onScroll = () => {
            cvNavbar.classList.toggle('cv-scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Hamburger toggle (new ids)
    if (cvHamburger && cvNavLinks) {
        cvHamburger.addEventListener('click', function() {
            cvHamburger.classList.toggle('cv-active');
            cvNavLinks.classList.toggle('cv-active');
        });
        cvNavLinks.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                cvHamburger.classList.remove('cv-active');
                cvNavLinks.classList.remove('cv-active');
            });
        });
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const showAll = () => revealEls.forEach(el => el.classList.add('cv-visible'));
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cv-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
        revealEls.forEach(function(el) { io.observe(el); });
        // Safety: if anything is still hidden after 1.2s (e.g. observer missed
        // an in-viewport element on first tick), force-reveal everything.
        setTimeout(showAll, 1200);
    } else {
        showAll();
    }

    // ===== Project category tabs (Digital Marketing / IT) =====
    const projTabs = document.getElementById('cvProjTabs');
    const featured = document.getElementById('cvFeatured');
    if (projTabs && featured) {
        const cards = featured.querySelectorAll('.cv-feat');
        projTabs.addEventListener('click', function(e) {
            const btn = e.target.closest('.cv-tab');
            if (!btn) return;
            projTabs.querySelectorAll('.cv-tab').forEach(function(t) { t.classList.remove('active'); });
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            cards.forEach(function(card) {
                card.hidden = !(cat === 'all' || card.dataset.cat === cat);
            });
        });
    }
});