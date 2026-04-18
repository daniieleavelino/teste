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
                const headerHeight = document.getElementById('mainNav').offsetHeight; // Altura da navbar fixa.
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

    document.querySelectorAll('h2').forEach(el => { // Prepara títulos para aparecerem com efeito.
        el.style.opacity = '0'; // Começa invisível.
        el.style.transform = 'translateY(20px)'; // Começa deslocado para baixo.
        el.style.transition = 'all 0.6s ease-out'; // Define a transição suave.
        observer.observe(el); // Inicia a observação do elemento.
    });
});
