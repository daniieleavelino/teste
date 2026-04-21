document.addEventListener('DOMContentLoaded', function() {
    /* Simple IntersectionObserver to reveal elements */
    const reveal = document.querySelectorAll('.py-5');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('reveal'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveal.forEach(r => io.observe(r));

    /* Depoimentos carousel */
    const track = document.querySelector('.depo-track');
    const prev = document.querySelector('.depo-prev');
    const next = document.querySelector('.depo-next');
    if (track && prev && next) {
        prev.removeAttribute('class');
        prev.className = 'depo-btn depo-prev btn btn-light rounded-circle border';
        prev.setAttribute('aria-label', 'Ver depoimento anterior');
        prev.innerHTML = '&#8249;';

        next.removeAttribute('class');
        next.className = 'depo-btn depo-next btn btn-light rounded-circle border';
        next.setAttribute('aria-label', 'Ver proximo depoimento');
        next.innerHTML = '&#8250;';

        if (!track.parentElement.classList.contains('depo-viewport')) {
            const viewportEl = document.createElement('div');
            viewportEl.className = 'depo-viewport';
            track.parentNode.insertBefore(viewportEl, track);
            viewportEl.appendChild(track);
        }

        const extraDepoimentos = [
            {
                image: 'img/aluno1.webp',
                alt: 'Aluno 4',
                quote: '"Ganhei confiança para ler artigos da minha área sem travar."',
                name: 'Fernanda'
            },
            {
                image: 'img/aluno2.webp',
                alt: 'Aluno 5',
                quote: '"As aulas me ajudaram a interpretar textos técnicos com muito mais rapidez."',
                name: 'Bruno'
            },
            {
                image: 'img/aluno3.webp',
                alt: 'Aluno 6',
                quote: '"Cheguei mais preparado para a prova e o resultado apareceu."',
                name: 'Camila'
            }
        ];

        extraDepoimentos.forEach((depoimento) => {
            const alreadyExists = Array.from(track.children).some((card) => {
                const label = card.querySelector('img');
                return label && label.getAttribute('alt') === depoimento.alt;
            });
            if (alreadyExists) return;

            const article = document.createElement('article');
            article.className = 'depo-card card border-0 shadow-sm p-3 d-flex gap-3 align-items-center';
            article.innerHTML = `
                <img src="${depoimento.image}" alt="${depoimento.alt}" class="depo-avatar rounded-circle">
                <div>
                    <p class="mb-1 fw-semibold">${depoimento.quote}</p>
                    <small class="text-secondary">- ${depoimento.name}</small>
                </div>
            `;
            track.appendChild(article);
        });

        const viewport = document.querySelector('.depo-viewport');
        const cards = Array.from(track.children);
        let index = 0;

        function computeVisible() {
            const visibleArea = viewport ? viewport.clientWidth : track.parentElement.clientWidth;
            const firstLeft = cards[0].offsetLeft;
            const last = cards[cards.length -1];
            const totalWidth = (last.offsetLeft + last.offsetWidth) - firstLeft;
            const maxOffset = Math.max(0, totalWidth - visibleArea);
            const offsets = cards.map(c => c.offsetLeft - firstLeft);
            let maxIndex = 0;
            for (let i = 0; i < offsets.length; i++) {
                if (offsets[i] <= maxOffset) maxIndex = i;
                else break;
            }
            return { offsets, maxIndex };
        }

        function update() {
            const { offsets, maxIndex } = computeVisible();
            index = Math.max(0, Math.min(index, maxIndex));
            const offset = offsets[index] || 0;
            track.style.transform = `translateX(${-offset}px)`;
            prev.disabled = index === 0;
            next.disabled = index === maxIndex || maxIndex === 0;
        }

        next.addEventListener('click', () => { index = Math.min(index + 1, 1000); update(); });
        prev.addEventListener('click', () => { index = Math.max(index - 1, 0); update(); });

        window.addEventListener('resize', () => { setTimeout(() => { index = 0; track.style.transform = 'translateX(0)'; update(); }, 80); });

        // initialize
        setTimeout(update, 120);
    }

        /* Metodo: interatividade dos cartÃµes (carol2) */
        const techCards = document.querySelectorAll('.tech-card');
        if (techCards.length) {
            techCards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.addEventListener('click', () => {
                    const isOpen = card.classList.contains('active');
                    techCards.forEach(c => c.classList.remove('active'));
                    if (!isOpen) card.classList.add('active');
                });
                card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
            });
        }
});
