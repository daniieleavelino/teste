const toggleButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (toggleButton && menu) {
  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('is-open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const contactForm = document.querySelector('.contato-form form');
const formFeedback = document.querySelector('#form-feedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formFeedback.textContent = 'Recebemos seu interesse! Em breve a equipe LinQ entrará em contato.';
    formFeedback.style.color = '#1F4E5F';
    contactForm.reset();
  });
}
