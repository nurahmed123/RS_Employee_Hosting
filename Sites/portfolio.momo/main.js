// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const navThemeToggle = document.getElementById('nav-theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.dataset.theme = savedTheme;
}

function toggleTheme() {
  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
if (navThemeToggle) {
  navThemeToggle.addEventListener('click', toggleTheme);
}

// Mobile menu functionality
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener('click', () => {
    const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  });
}

// Typewriter effect for home page
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
  const phrases = [
    'Student Leader',
'Content Coordinator',
'Event Organizer',
'Public Speaking Enthusiast'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 700);
      } else {
        setTimeout(type, 40);
      }
    } else {
      charIndex++;
      typewriterElement.textContent = currentPhrase.substring(0, charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        setTimeout(type, 90);
      }
    }
  }
  type();
}

// Add fade-in-up animation to incoming elements
const fadeElements = document.querySelectorAll('section, .hero-text, .hero-image, .about-card, .feature-card, .project-card, .achievement-card, .resume-card, .contact-form, .footer-content, .hero-social, .hero-buttons, .nav-logo, .nav-menu, .nav-right');

fadeElements.forEach(el => {
  el.classList.add('fade-in-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  observer.observe(el);
});