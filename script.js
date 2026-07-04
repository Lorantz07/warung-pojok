/* ======================================================
   WARUNG MINI - SCRIPT.JS
   Makanan Rumahan yang Enak, Murah dan Bersih
   ====================================================== */

'use strict';

// ======================================================
// DOM READY
// ======================================================
document.addEventListener('DOMContentLoaded', function () {

  // ====================================================
  // 1. LOADING SCREEN
  // ====================================================
  initLoadingScreen();

  // ====================================================
  // 2. TYPING EFFECT
  // ====================================================
  initTypingEffect();

  // ====================================================
  // 3. COUNTER ANIMATION
  // ====================================================
  initCounters();

  // ====================================================
  // 4. MOBILE HAMBURGER
  // ====================================================
  initHamburger();

  // ====================================================
  // 5. STICKY NAVBAR
  // ====================================================
  initStickyNavbar();

  // ====================================================
  // 6. ACTIVE NAV LINK
  // ====================================================
  initActiveNavLink();

  // ====================================================
  // 7. SCROLL REVEAL
  // ====================================================
  initScrollReveal();

  // ====================================================
  // 8. SCROLL PROGRESS BAR
  // ====================================================
  initScrollProgress();

  // ====================================================
  // 9. BACK TO TOP
  // ====================================================
  initBackToTop();

  // ====================================================
  // 10. BUTTON RIPPLE EFFECT
  // ====================================================
  initButtonRipple();

  // ====================================================
  // 11. SMOOTH SCROLL
  // ====================================================
  initSmoothScroll();

  // ====================================================
  // 12. GALLERY MODAL
  // ====================================================
  initGalleryModal();

  // ====================================================
  // 13. TESTIMONIAL SLIDER
  // ====================================================
  initTestimonialSlider();

});


// ======================================================
// 1. LOADING SCREEN
// ======================================================
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loaderBar = document.getElementById('loaderBar');
  let progress = 0;

  const interval = setInterval(function () {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    loaderBar.style.width = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(function () {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    }
  }, 150);

  document.body.style.overflow = 'hidden';
}


// ======================================================
// 2. TYPING EFFECT ON HERO
// ======================================================
function initTypingEffect() {
  const textElement = document.getElementById('typingText');
  const words = ['Warung Pojok', 'Selamat Datang'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (!currentWord) return;

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
  }

  setTimeout(type, 500);
}


// ======================================================
// 3. COUNTER ANIMATION
// ======================================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = Math.ceil(target / 60);
      let current = 0;

      function updateCounter() {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      }

      updateCounter();
    });
  }

  // Trigger on scroll
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
  }
}


// ======================================================
// 4. MOBILE HAMBURGER MENU
// ======================================================
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on click outside
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}


// ======================================================
// 5. STICKY NAVBAR
// ======================================================
function initStickyNavbar() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}


// ======================================================
// 6. ACTIVE NAV LINK ON SCROLL
// ======================================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}


// ======================================================
// 7. SCROLL REVEAL
// ======================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
}


// ======================================================
// 8. SCROLL PROGRESS BAR
// ======================================================
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-fill');

  function updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}


// ======================================================
// 9. BACK TO TOP BUTTON
// ======================================================
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');

  function toggleVisibility() {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// ======================================================
// 10. BUTTON RIPPLE EFFECT
// ======================================================
function initButtonRipple() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      btn.appendChild(ripple);

      setTimeout(function () {
        ripple.remove();
      }, 600);
    });
  });
}


// ======================================================
// 11. SMOOTH SCROLL
// ======================================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


// ======================================================
// 12. GALLERY MODAL
// ======================================================
function initGalleryModal() {
  const modal = document.getElementById('galleryModal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openModal(item) {
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';
    const img = item.querySelector('.gallery-img img');

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    if (img) {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      openModal(item);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}


// ======================================================
// 13. TESTIMONIAL SLIDER
// ======================================================
function initTestimonialSlider() {
  const track = document.getElementById('testimoniTrack');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  const dotsContainer = document.getElementById('testiDots');

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = track.querySelectorAll('.testimoni-card');
  let currentIndex = 0;
  let autoplayInterval;

  function createDots() {
    dotsContainer.innerHTML = '';
    cards.forEach(function (_, i) {
      const dot = document.createElement('span');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = cards.length - 1;
    if (currentIndex >= cards.length) currentIndex = 0;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

    document.querySelectorAll('.testi-dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  nextBtn.addEventListener('click', function () {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', function () {
    prevSlide();
    resetAutoplay();
  });

  createDots();
  startAutoplay();

  // Pause on hover
  track.addEventListener('mouseenter', function () {
    clearInterval(autoplayInterval);
  });

  track.addEventListener('mouseleave', function () {
    startAutoplay();
  });
}
