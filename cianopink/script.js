/**
 * Script Principal CianoPink
 * Focado em UX e Performance
 */

document.addEventListener('DOMContentLoaded', () => { // Aguarda toda a página carregar antes de rodar o código.
    
    // --------- ATUALIZAÇÃO DO ANO NO FOOTER ---------
    const yearSpan = document.getElementById('current-year'); // Pega o elemento que mostra o ano no rodapé.
    if (yearSpan) { // Verifica se o elemento existe antes de alterar o texto.
        yearSpan.textContent = new Date().getFullYear(); // Coloca o ano atual automaticamente.
    }

    // --------- NAVEGAÇÃO E LINKS ATIVOS ---------
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(navItem => navItem.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });

    // --------- ROLAGEM SUAVE (SMOOTH SCROLL) ---------
    const smoothLinks = document.querySelectorAll('a[href^="#"]'); // Seleciona todos os links internos de âncora.
    smoothLinks.forEach(link => { // Percorre cada link para aplicar rolagem suave.
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href'); // Pega o alvo do link.
            if (targetId === '#') return; // Ignora links vazios.
            const targetElement = document.querySelector(targetId); // Encontra a seção de destino.
            if (targetElement) { // Se a seção existe, faz a rolagem suave.
                e.preventDefault(); // Previne o comportamento padrão do link.
                const navHeader = document.querySelector('nav.navbar') || document.getElementById('mainNav');
                const headerHeight = navHeader ? navHeader.offsetHeight : 0; // Altura da navbar fixa.
                const elementPosition = targetElement.getBoundingClientRect().top; // Distância até o topo da tela.
                const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 10); // Ajusta para não esconder atrás do topo.
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); // Faz a rolagem suave.

                const navbarCollapse = document.querySelector('.navbar-collapse'); // Pega o menu colapsável.
                const navbarToggler = document.querySelector('.navbar-toggler'); // Pega o botão do menu.
                if (navbarCollapse && navbarCollapse.classList.contains('show')) { // Se o menu estiver aberto.
                    navbarToggler.click(); // Fecha o menu automático no mobile.
                }
            }
        });
    });

    // --------- ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER) ---------
    const observerOptions = { threshold: 0.1 }; // Define quando a animação deve começar.
    const observer = new IntersectionObserver((entries) => { // Cria o observador de visibilidade.
        entries.forEach(entry => { // Verifica cada elemento observado.
            if (entry.isIntersecting) { // Quando o elemento aparece na tela.
                entry.target.style.opacity = '1'; // Deixa visível.
                entry.target.style.transform = 'translateY(0)'; // Posiciona no lugar certo.
            }
        });
    }, observerOptions);

    document.querySelectorAll('h2, .animate-on-scroll').forEach(el => { // Prepara títulos e blocos marcados para aparecerem com efeito.
        if (!el.classList.contains('animate-on-scroll')) {
            el.style.opacity = '0'; // Começa invisível.
            el.style.transform = 'translateY(20px)'; // Começa deslocado para baixo.
            el.style.transition = 'all 0.6s ease-out'; // Define a transição suave.
        }
        observer.observe(el); // Inicia a observação do elemento.
    });

    // ---- Animação de entrada do hero (texto) ----
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // força repaint/espera pequena antes de adicionar classe para transição suave
        setTimeout(() => heroTitle.classList.add('show'), 120);
    }

    // ---- Parallax simples para mockups e blob na hero ----
    const mockupContainer = document.querySelector('.hero-mockup-container');
    const mockupBack = document.querySelector('.mockup-back');
    const mockupFront = document.querySelector('.mockup-front');
    const mockupRight = document.querySelector('.mockup-right-phone');
    const blob = document.querySelector('.hero-blob-vibrante');

    if (mockupContainer && (mockupBack || mockupFront || mockupRight || blob)) {
        mockupContainer.addEventListener('mousemove', (e) => {
            const rect = mockupContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5

            if (mockupBack) {
                mockupBack.style.transform = `perspective(1000px) rotateY(${ -x * 8 }deg) rotateX(${ y * 4 }deg) translateX(${ x * 8 }px) translateY(${ y * -6 }px)`;
            }
            if (mockupFront) {
                mockupFront.style.transform = `perspective(2000px) translateX(${ x * 14 }px) translateY(${ y * 10 }px) rotateY(${ -x * 6 }deg) rotateZ(-3deg)`;
            }
            if (mockupRight) {
                mockupRight.style.transform = `perspective(2000px) translateX(${ x * 18 }px) translateY(${ y * 12 }px) rotateY(${ -x * 5 }deg) rotateZ(5deg)`;
            }
            if (blob) {
                blob.style.transform = `translate(${ x * 18 }px, ${ y * 14 }px) scale(1.02)`;
            }
        });

        mockupContainer.addEventListener('mouseleave', () => {
            if (mockupBack) mockupBack.style.transform = '';
            if (mockupFront) mockupFront.style.transform = '';
            if (mockupRight) mockupRight.style.transform = '';
            if (blob) blob.style.transform = '';
        });
    }
});

// --------- LGPD: AVISO DE COOKIES ---------
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Verifica se já existe o aceite no armazenamento local
    if (cookieBanner && acceptBtn) {
        if (!localStorage.getItem('cianopink_cookie_consent')) {
            // Se não tem, mostra o banner com um pequeno atraso para não assustar o usuário
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1500);
        }

        // Quando clica em aceitar
        acceptBtn.addEventListener('click', () => {
            // Salva no navegador do usuário por 365 dias
            localStorage.setItem('cianopink_cookie_consent', 'accepted');
            
            // Esconde o banner
            cookieBanner.classList.remove('show');
            
            // Remove do DOM após a animação de descida
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 600);
        });
    }