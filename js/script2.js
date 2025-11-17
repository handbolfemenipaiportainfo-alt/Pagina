/* SCRIPT GENERAL
   - Toggle menú móvil
   - Fade slider (auto)
   - Scroll reveal ligero
   - Pequeñas mejoras de accesibilidad
*/

/* ---------- Toggle menú móvil ---------- */
const navToggleButtons = document.querySelectorAll('.nav-toggle');
navToggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (nav) nav.style.display = expanded ? '' : 'block';
  });
});

/* ---------- Fade slider ---------- */
(function slider(){
  const slides = Array.from(document.querySelectorAll('.fade-slider .slide'));
  if (!slides.length) return;
  let idx = 0;

  function show(i){
    slides.forEach((s, k) => {
      s.classList.toggle('active', k === i);
    });
  }

  show(idx);
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, 4500);
})();

/* ---------- Scroll reveal (ligero) ---------- */
document.addEventListener('scroll', () => {
  const secs = document.querySelectorAll('section, .card');
  secs.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      sec.classList.add('visible');
    }
  });
});

/* ---------- Mejora: submit del formulario con feedback mínimo (no rompe Formspree) ---------- */
const contactoForm = document.querySelector('.formulario');
if (contactoForm) {
  contactoForm.addEventListener('submit', (e) => {
    // Dejar que Formspree procese la petición (no evitamos el submit),
    // pero damos feedback visual rápido desactivando el botón.
    const btn = contactoForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      const origText = btn.innerText;
      btn.innerText = 'Enviando...';
      setTimeout(() => {
        // Si la página no redirige, reactivar tras 6s (no bloquea)
        btn.disabled = false;
        btn.innerText = origText;
      }, 6000);
    }
  });
}

/* ---------- Accessibility: close mobile nav on resize to desktop ---------- */
window.addEventListener('resize', () => {
  if (window.innerWidth > 720) {
    const nav = document.querySelector('.nav');
    if (nav) nav.style.display = '';
    const toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
  }
});


// ======= BOTÓN VOLVER ARRIBA =======
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
