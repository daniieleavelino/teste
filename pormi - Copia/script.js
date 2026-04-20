// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    
    // Efeito de rolagem na Navbar
    const navbar = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("nav-scrolled");
            // Se estiver no mobile, os textos já são escuros no menu hambúrguer, 
            // mas no desktop garantimos que fiquem visíveis no fundo claro.
        } else {
            navbar.classList.remove("nav-scrolled");
        }
    });

    // Fechar o menu mobile ao clicar em um link
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});