// Inicializar Animações (AOS)
AOS.init({
    duration: 1000,
    once: true
});

// Efeito de mudar fundo da Navbar ao rolar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('#mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow');
        nav.style.background = '#ffffff';
    } else {
        nav.classList.remove('shadow');
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
    }
});

// Fechar menu mobile automaticamente ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});

navLinks.forEach((l) => {
    l.addEventListener('click', () => { 
        if(window.innerWidth < 992) {
            bsCollapse.hide();
        }
    });
});