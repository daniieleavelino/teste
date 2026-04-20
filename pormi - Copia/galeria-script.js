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