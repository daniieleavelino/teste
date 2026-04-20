document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Inicializa o Lightbox de Luxo (GLightbox)
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        descPosition: 'bottom', // Mostra a descrição da peça embaixo da foto
        openEffect: 'zoom',
        closeEffect: 'fade'
    });

    // 2. Sistema de Filtro de Categorias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            // Remove a classe 'active' de todos os botões e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Pega o valor do data-filter (ex: 'buques')
            const filterValue = this.getAttribute('data-filter');

            // Percorre as fotos para mostrar/esconder
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    // Pequeno atraso para a animação do CSS funcionar bem
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    // Aguarda a animação acabar para dar display:none
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 400); 
                }
            });
        });
    });
});

// =========================================
// LÓGICA DO BANNER DE COOKIES (LGPD)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        // Verifica no LocalStorage se a noiva já clicou em aceitar no passado
        if (!localStorage.getItem('cookiesAccepted_PormiArt')) {
            // Se não aceitou, mostramos o banner. 
            // O setTimeout de 1.5 segundos cria uma experiência de luxo: a noiva entra, 
            // vê a capa linda, e só depois o aviso desliza suavemente.
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1500);
        }

        // Quando ela clica no botão dourado
        acceptCookiesBtn.addEventListener('click', () => {
            // Salva a permissão no navegador dela
            localStorage.setItem('cookiesAccepted_PormiArt', 'true');
            // Remove a classe para esconder o banner suavemente
            cookieBanner.classList.remove('show');
        });
    }
});