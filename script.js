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

    // ===== CMS: render content from JSON + admin CRUD =====
    initCMS();
});

// ============================================================
// CMS MODULE — projects & certificates managed via JSON
// ============================================================
let CMS_DATA = { projects: [], certificates: [] };
const CMS_KEY = (window.PORTO_CONFIG && window.PORTO_CONFIG.STORAGE_KEY) || 'cv_cms_data';

async function initCMS() {
    let data = null;
    const local = localStorage.getItem(CMS_KEY);
    if (local) { try { data = JSON.parse(local); } catch (e) {} }
    if (!data) {
        try {
            const res = await fetch((window.PORTO_CONFIG.CONTENT_PATH || 'data/content.json') + '?cb=' + Date.now());
            data = await res.json();
        } catch (e) { console.error('CMS load failed', e); return; }
    }
    CMS_DATA = normalize(data);
    renderCMS();
    setupAdmin();
}

function normalize(d) {
    d = d || {};
    return { projects: d.projects || [], certificates: d.certificates || [] };
}

function renderCMS() {
    renderProjects(CMS_DATA.projects);
    renderCerts(CMS_DATA.certificates);
}

function renderProjects(list) {
    const el = document.getElementById('cvFeatured');
    if (!el) return;
    el.innerHTML = '';
    list.forEach(function(p, i) {
        const art = document.createElement('article');
        art.className = 'cv-feat';
        art.dataset.cat = p.cat || 'it';
        const tags = (p.tags || []).map(escapeHTML).map(function(t) { return `<span class="cv-tag">${t}</span>`; }).join('');
        const feats = (p.features || []).map(escapeHTML).map(function(f) { return `<li>${f}</li>`; }).join('');
        const link = p.link ? `<a class="cv-feat-link" href="${escapeAttr(p.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.link.replace('https://',''))} →</a>` : '';
        art.innerHTML = `
            <img class="cv-feat-img" src="${escapeAttr(p.img)}" alt="${escapeHTML(p.title)}">
            <div class="cv-feat-body">
                <div class="cv-feat-head">
                    <h4 class="cv-feat-title">${escapeHTML(p.title)}</h4>
                    <span class="cv-badge ${badgeClass(p.badge)}">${escapeHTML(p.badge)}</span>
                    <span class="cv-row-actions" data-i="${i}">
                        <button class="cv-mini edit" data-act="edit-proj" data-i="${i}" title="Edit">✎</button>
                        <button class="cv-mini del" data-act="del-proj" data-i="${i}" title="Hapus">🗑</button>
                    </span>
                </div>
                <p class="cv-feat-desc">${escapeHTML(p.desc)}</p>
                <div class="cv-feat-subs"><div><h5>What I built</h5><ul>${feats}</ul></div></div>
                <p class="cv-feat-benefit">${escapeHTML(p.benefit)}</p>
                <div class="cv-feat-tags">${tags}</div>
                ${link}
            </div>`;
        el.appendChild(art);
    });
    rebindTabs();
}

function renderCerts(list) {
    const el = document.getElementById('cvCert');
    if (!el) return;
    el.innerHTML = '';
    list.forEach(function(c, i) {
        const item = document.createElement('div');
        item.className = 'cv-gallery-item';
        item.setAttribute('onclick', `openPortoModal('${escapeAttr(c.src)}', '${escapeAttr(c.cap)}')`);
        item.innerHTML = `
            <img src="${escapeAttr(c.src)}" alt="${escapeHTML(c.alt)}">
            <span class="cv-gallery-cap">${escapeHTML(c.cap)}</span>
            <span class="cv-row-actions" data-i="${i}">
                <button class="cv-mini edit" data-act="edit-cert" data-i="${i}" title="Edit">✎</button>
                <button class="cv-mini del" data-act="del-cert" data-i="${i}" title="Hapus">🗑</button>
            </span>`;
        el.appendChild(item);
    });
}

function rebindTabs() {
    const projTabs = document.getElementById('cvProjTabs');
    const featured = document.getElementById('cvFeatured');
    if (!projTabs || !featured) return;
    const cards = featured.querySelectorAll('.cv-feat');
    projTabs.onclick = function(e) {
        const btn = e.target.closest('.cv-tab'); if (!btn) return;
        projTabs.querySelectorAll('.cv-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        cards.forEach(c => c.hidden = !(cat === 'all' || c.dataset.cat === cat));
    };
    // restore active tab visibility
    const active = projTabs.querySelector('.cv-tab.active');
    const cat = active ? active.dataset.cat : 'dm';
    cards.forEach(c => c.hidden = !(cat === 'all' || c.dataset.cat === cat));
}

// ---- Admin: login + toolbar + CRUD modal ----
let cmsAttempts = 0, cmsLock = 0;

function setupAdmin() {
    const cfg = window.PORTO_CONFIG || {};
    const HASH = cfg.ADMIN_HASH || '';
    const toolbar = document.getElementById('cvAdminToolbar');
    const btn = document.getElementById('cvAdminBtn');
    const overlay = document.getElementById('cvLoginOverlay');
    const pass = document.getElementById('cvPassInput');
    const err = document.getElementById('cvLoginErr');

    if (localStorage.getItem('cv_admin_ok') === '1') enableCMS(toolbar);

    btn.addEventListener('click', function() {
        if (Date.now() < cmsLock) { err.textContent = 'Terkunci, coba nanti.'; return; }
        overlay.hidden = false; pass.focus();
    });
    document.getElementById('cvLoginCancel').addEventListener('click', function() { overlay.hidden = true; err.textContent = ''; });
    document.getElementById('cvLoginBtn').addEventListener('click', doLogin);
    pass.addEventListener('keydown', function(e) { if (e.key === 'Enter') doLogin(); });

    function doLogin() {
        sha256(pass.value).then(function(h) {
            if (h === HASH) {
                localStorage.setItem('cv_admin_ok', '1');
                overlay.hidden = true; pass.value = ''; err.textContent = '';
                enableCMS(toolbar);
            } else {
                cmsAttempts++;
                if (cmsAttempts >= 5) { cmsLock = Date.now() + 30000; err.textContent = 'Terlalu banyak. Kunci 30s.'; }
                else err.textContent = 'Salah (' + cmsAttempts + '/5).';
            }
        });
    }

    document.getElementById('cvLogoutBtn').addEventListener('click', function() {
        localStorage.removeItem('cv_admin_ok');
        toolbar.hidden = true;
        document.getElementById('cvAddProj').hidden = true;
        document.getElementById('cvAddCert').hidden = true;
        document.querySelectorAll('.cv-row-actions').forEach(function(a){ a.style.display='none'; });
    });

    // export / import
    document.getElementById('cvExportBtn').addEventListener('click', function() {
        const blob = new Blob([JSON.stringify(CMS_DATA, null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = 'content.json'; a.click();
    });
    const imp = document.getElementById('cvImportFile');
    document.getElementById('cvImportBtn').addEventListener('click', function() { imp.click(); });
    imp.addEventListener('change', function(e) {
        const f = e.target.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = function() { try { CMS_DATA = normalize(JSON.parse(r.result)); persist(); renderCMS(); } catch (x) { alert('JSON rusak'); } };
        r.readAsText(f);
    });

    // add buttons
    document.getElementById('cvAddProj').addEventListener('click', function() { openCmsModal('proj', -1); });
    document.getElementById('cvAddCert').addEventListener('click', function() { openCmsModal('cert', -1); });

    // delegate edit/delete clicks
    document.addEventListener('click', function(e) {
        const b = e.target.closest('[data-act]'); if (!b) return;
        const i = parseInt(b.dataset.i, 10);
        if (b.dataset.act === 'edit-proj') openCmsModal('proj', i);
        else if (b.dataset.act === 'del-proj') { if (confirm('Hapus project ini?')) { CMS_DATA.projects.splice(i,1); persist(); renderCMS(); } }
        else if (b.dataset.act === 'edit-cert') openCmsModal('cert', i);
        else if (b.dataset.act === 'del-cert') { if (confirm('Hapus sertifikat ini?')) { CMS_DATA.certificates.splice(i,1); persist(); renderCMS(); } }
    });
}

function enableCMS(toolbar) {
    toolbar.hidden = false;
    document.getElementById('cvAddProj').hidden = false;
    document.getElementById('cvAddCert').hidden = false;
    document.querySelectorAll('.cv-row-actions').forEach(function(a){ a.style.display='inline-flex'; });
}

// ---- CMS edit modal ----
const PROJ_FIELDS = [
    { k: 'title', label: 'Judul', type: 'text' },
    { k: 'cat', label: 'Kategori', type: 'select', opts: ['dm','it'] },
    { k: 'badge', label: 'Badge', type: 'select', opts: ['Live','Active','Done'] },
    { k: 'img', label: 'Gambar (path)', type: 'text' },
    { k: 'desc', label: 'Deskripsi', type: 'textarea' },
    { k: 'benefit', label: 'Manfaat', type: 'textarea' },
    { k: 'features', label: 'Fitur (1 per baris)', type: 'list' },
    { k: 'tags', label: 'Tags (pisah koma)', type: 'csv' },
    { k: 'link', label: 'Link (opsional)', type: 'text' }
];
const CERT_FIELDS = [
    { k: 'src', label: 'Gambar (path)', type: 'text' },
    { k: 'alt', label: 'Alt text', type: 'text' },
    { k: 'cap', label: 'Caption', type: 'text' }
];

let cmsEditing = null; // {type, index}

function openCmsModal(type, index) {
    cmsEditing = { type: type, index: index };
    const isNew = index < 0;
    const data = isNew ? {} : (type === 'proj' ? CMS_DATA.projects[index] : CMS_DATA.certificates[index]);
    const fields = type === 'proj' ? PROJ_FIELDS : CERT_FIELDS;
    const wrap = document.getElementById('cvCmsFields');
    wrap.innerHTML = '';
    fields.forEach(function(f) {
        const lab = document.createElement('label');
        lab.className = 'cv-field';
        lab.innerHTML = `<span>${f.label}</span>`;
        let input;
        if (f.type === 'textarea') { input = document.createElement('textarea'); input.value = data[f.k] || ''; }
        else if (f.type === 'select') {
            input = document.createElement('select');
            f.opts.forEach(function(o) { const op = document.createElement('option'); op.value = o; op.textContent = o; if (data[f.k] === o) op.selected = true; input.appendChild(op); });
        }
        else if (f.type === 'list') { input = document.createElement('textarea'); input.value = (data[f.k] || []).join('\n'); }
        else if (f.type === 'csv') { input = document.createElement('input'); input.type = 'text'; input.value = (data[f.k] || []).join(', '); }
        else { input = document.createElement('input'); input.type = 'text'; input.value = data[f.k] || ''; }
        input.dataset.k = f.k; input.dataset.t = f.type;
        lab.appendChild(input);
        wrap.appendChild(lab);
    });
    document.getElementById('cvCmsTitle').textContent = (isNew ? 'Tambah ' : 'Edit ') + (type === 'proj' ? 'Project' : 'Sertifikat');
    document.getElementById('cvCmsErr').textContent = '';
    document.getElementById('cvCmsOverlay').hidden = false;
}

document.getElementById('cvCmsCancel').addEventListener('click', function() { document.getElementById('cvCmsOverlay').hidden = true; });
document.getElementById('cvCmsSave').addEventListener('click', function() {
    if (!cmsEditing) return;
    const fields = cmsEditing.type === 'proj' ? PROJ_FIELDS : CERT_FIELDS;
    const obj = {};
    fields.forEach(function(f) {
        const el = document.querySelector('#cvCmsFields [data-k="' + f.k + '"]');
        let v = el.value;
        if (f.type === 'list') v = v.split('\n').map(function(s){return s.trim();}).filter(Boolean);
        else if (f.type === 'csv') v = v.split(',').map(function(s){return s.trim();}).filter(Boolean);
        obj[f.k] = v;
    });
    if (cmsEditing.index < 0) {
        if (cmsEditing.type === 'proj') CMS_DATA.projects.push(obj);
        else CMS_DATA.certificates.push(obj);
    } else {
        if (cmsEditing.type === 'proj') CMS_DATA.projects[cmsEditing.index] = obj;
        else CMS_DATA.certificates[cmsEditing.index] = obj;
    }
    persist();
    renderCMS();
    if (localStorage.getItem('cv_admin_ok') === '1') { document.getElementById('cvAddProj').hidden=false; document.getElementById('cvAddCert').hidden=false; document.querySelectorAll('.cv-row-actions').forEach(function(a){a.style.display='inline-flex';}); }
    document.getElementById('cvCmsOverlay').hidden = true;
});

function persist() {
    localStorage.setItem(CMS_KEY, JSON.stringify(CMS_DATA));
}

function badgeClass(b) {
    b = (b || '').toLowerCase();
    if (b === 'live') return 'live';
    if (b === 'active') return 'active';
    return 'done';
}
function escapeHTML(s) { return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function escapeAttr(s) { return String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}