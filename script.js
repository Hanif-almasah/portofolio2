let slideIndex = 1;
let slideTimer;

// Fungsi inti untuk menampilkan slide tertentu
function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    
    // Logic untuk memutar balik index (loop)
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}

    // Sembunyikan semua slide
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].classList.remove("active");
    }

    // Tampilkan slide yang baru
    slides[slideIndex-1].style.display = "block";  
    slides[slideIndex-1].classList.add("active");
}

// Fungsi untuk mengontrol perputaran slide otomatis (Autoplay)
function startAutoplay() {
    // Hentikan timer sebelumnya 
    clearInterval(slideTimer); 
    
    // Atur timer baru untuk perputaran otomatis
    slideTimer = setInterval(function() {
        showSlides(slideIndex += 1); // Pindah ke slide berikutnya
    }, 4000); // Ganti setiap 4 detik
}


// Jalankan ketika dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    let slides = document.getElementsByClassName("slide");
    
    if (slides.length > 0) {
        showSlides(slideIndex); // Tampilkan slide pertama
        startAutoplay(); // MULAI fitur otomatis
    }
    
    // Smooth scrolling untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});