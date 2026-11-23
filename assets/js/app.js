(() => {
    const catalog = window.ANGEL_CATALOG || [];
    const banners = window.ANGEL_BANNERS || [];
    const header = document.querySelector('#site-header');
    const detailModal = document.querySelector('#detail-modal');
    const videoModal = document.querySelector('#video-modal');
    const videoFrame = document.querySelector('#video-frame');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    };

    const videoId = (url) => {
        try {
            const parsed = new URL(url);
            if (parsed.hostname.includes('youtu.be')) return parsed.pathname.slice(1);
            if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
            const parts = parsed.pathname.split('/');
            return parts[parts.length - 1] || '';
        } catch (error) {
            return '';
        }
    };

    const embedUrl = (url, preview = false) => {
        const id = videoId(url);
        if (!id) return url;
        const params = preview ? `autoplay=1&mute=1&controls=0&loop=1&playlist=${id}` : 'autoplay=1';
        return `https://www.youtube.com/embed/${id}?${params}`;
    };

    const cssImageUrl = (url) => url.startsWith('../imagenes/') ? url.replace('../imagenes/', '../../../imagenes/') : url;

    const openVideo = (url) => {
        if (!url || url === '#' || !videoFrame || !videoModal) return;
        videoFrame.src = embedUrl(url);
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden', 'false');
    };

    const openDetails = (card) => {
        document.querySelector('#modal-title').textContent = card.dataset.title;
        document.querySelector('#modal-description').textContent = card.dataset.description;
        document.querySelector('#modal-image').style.backgroundImage = `url("${card.dataset.image}")`;
        document.querySelector('#modal-play').dataset.video = card.dataset.video;
        detailModal.classList.add('is-open');
        detailModal.setAttribute('aria-hidden', 'false');
    };

    const createCard = (item, index) => {
        const card = document.createElement('article');
        card.className = 'media-card';
        card.tabIndex = 0;
        card.dataset.id = item.id;
        card.dataset.title = item.title;
        card.dataset.description = item.description;
        card.dataset.video = item.video;
        card.dataset.image = item.image;
        card.style.setProperty('--card-image', `url("${cssImageUrl(item.image)}")`);
        card.innerHTML = `<div class="ambient-light"></div><img src="${item.image}" alt="${item.title}" loading="lazy"><div class="card-preview" aria-hidden="true"></div><div class="card-overlay"><div class="card-badges"><span>${index === 0 ? 'Nuevo episodio' : 'Recién agregado'}</span>${index === 1 ? `<span class="rank-badge">#1 en ${item.category}</span>` : ''}</div><div class="card-actions"><button type="button" class="round-button card-play" aria-label="Reproducir">▶</button><button type="button" class="round-button card-list" aria-label="Añadir a Mi lista">＋</button><button type="button" class="round-button card-like" aria-label="Me gusta">♡</button><button type="button" class="round-button card-info" aria-label="Más información">⌄</button></div><h3>${item.title}</h3><p><span class="match">97% para ti</span><span>HD</span><span>2025</span></p><div class="progress-track"><span style="width: ${index === 0 ? '42' : '0'}%"></span></div></div>`;
        return card;
    };

    const renderCatalog = (items, query = '') => {
        const container = document.querySelector('#catalog');
        if (!container) return;
        container.replaceChildren();
        if (query) {
            const result = document.createElement('p');
            result.className = 'search-result';
            result.innerHTML = `Resultados para: <strong></strong>`;
            result.querySelector('strong').textContent = query;
            container.appendChild(result);
        }
        const categories = items.reduce((groups, item) => {
            (groups[item.category] ||= []).push(item);
            return groups;
        }, {});
        Object.entries(categories).forEach(([category, categoryItems]) => {
            const row = document.createElement('section');
            row.className = 'media-row';
            row.id = category.toLowerCase();
            row.innerHTML = `<div class="row-heading"><h2>${category}</h2><a href="#${row.id}">Explorar todo <span>›</span></a></div><div class="row-track"><button class="row-arrow row-arrow-left" type="button" aria-label="Anterior">‹</button><div class="cards"></div><button class="row-arrow row-arrow-right" type="button" aria-label="Siguiente">›</button></div>`;
            const cards = row.querySelector('.cards');
            categoryItems.forEach((item, index) => cards.appendChild(createCard(item, index)));
            container.appendChild(row);
        });
        bindCards();
        bindRowArrows();
    };

    const startPreview = (card) => {
        if (card.querySelector('.card-preview iframe') || reducedMotion) return;
        const frame = document.createElement('iframe');
        frame.src = embedUrl(card.dataset.video, true);
        frame.title = `Vista previa de ${card.dataset.title}`;
        frame.setAttribute('allow', 'autoplay');
        card.querySelector('.card-preview').appendChild(frame);
        card.classList.add('is-previewing');
    };

    const stopPreview = (card) => {
        const preview = card.querySelector('.card-preview');
        if (preview) preview.replaceChildren();
        card.classList.remove('is-previewing');
    };

    const toggleWatchlist = (card, button) => {
        const saved = JSON.parse(localStorage.getItem('angel-watchlist') || '[]');
        const id = Number(card.dataset.id);
        const index = saved.indexOf(id);
        if (index === -1) saved.push(id);
        else saved.splice(index, 1);
        localStorage.setItem('angel-watchlist', JSON.stringify(saved));
        button.textContent = index === -1 ? '✓' : '＋';
        button.setAttribute('aria-label', index === -1 ? 'Quitar de Mi lista' : 'Añadir a Mi lista');
    };

    const bindCards = () => document.querySelectorAll('.media-card').forEach((card) => {
        let previewTimer;
        card.addEventListener('mouseenter', () => { previewTimer = window.setTimeout(() => startPreview(card), 420); });
        card.addEventListener('mouseleave', () => { window.clearTimeout(previewTimer); stopPreview(card); });
        card.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (button?.classList.contains('card-play')) openVideo(card.dataset.video);
            else if (button?.classList.contains('card-info')) openDetails(card);
            else if (button?.classList.contains('card-list')) toggleWatchlist(card, button);
            else if (button?.classList.contains('card-like')) button.classList.toggle('is-liked');
            else openDetails(card);
        });
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetails(card); }
        });
    });

    const bindRowArrows = () => document.querySelectorAll('.media-row').forEach((row) => {
        const cards = row.querySelector('.cards');
        row.querySelector('.row-arrow-left')?.addEventListener('click', () => cards.scrollBy({ left: -cards.clientWidth * .82, behavior: reducedMotion ? 'auto' : 'smooth' }));
        row.querySelector('.row-arrow-right')?.addEventListener('click', () => cards.scrollBy({ left: cards.clientWidth * .82, behavior: reducedMotion ? 'auto' : 'smooth' }));
    });

    header && window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });
    renderCatalog(catalog);
    if (banners[0]) {
        const hero = document.querySelector('#hero');
        hero?.style.setProperty('--hero-image', `url("${cssImageUrl(banners[0].image)}")`);
        document.querySelector('#hero-play')?.setAttribute('data-video', banners[0].video);
        document.querySelector('#hero-info')?.setAttribute('data-video', banners[0].video);
        document.querySelector('#hero-info')?.setAttribute('data-title', banners[0].title);
        document.querySelector('#hero-info')?.setAttribute('data-description', banners[0].description);
        document.querySelector('#hero-info')?.setAttribute('data-image', banners[0].image);
    }

    let currentBanner = 0;
    window.setInterval(() => {
        const hero = document.querySelector('#hero');
        if (!banners.length || !hero) return;
        const banner = banners[currentBanner];
        hero.style.setProperty('--hero-image', `url("${cssImageUrl(banner.image)}")`);
        document.querySelector('#hero-title').textContent = banner.title;
        document.querySelector('#hero-description').textContent = banner.description;
        document.querySelector('#hero-play').dataset.video = banner.video;
        document.querySelector('#hero-info').dataset.title = banner.title;
        document.querySelector('#hero-info').dataset.description = banner.description;
        document.querySelector('#hero-info').dataset.image = banner.image;
        document.querySelector('#hero-info').dataset.video = banner.video;
        currentBanner = (currentBanner + 1) % banners.length;
    }, 4000);

    document.querySelector('#search-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.querySelector('#search-input').value.trim().toLowerCase();
        renderCatalog(catalog.filter((item) => [item.title, item.description, item.category].some((value) => value.toLowerCase().includes(query))), query);
    });
    document.querySelector('#hero-play')?.addEventListener('click', (event) => openVideo(event.currentTarget.dataset.video || banners[0]?.video));
    document.querySelector('#hero-info')?.addEventListener('click', (event) => openDetails({ dataset: event.currentTarget.dataset }));
    document.querySelector('#modal-play')?.addEventListener('click', (event) => openVideo(event.currentTarget.dataset.video));
    document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => { closeModal(detailModal); closeModal(videoModal); if (videoFrame) videoFrame.src = ''; }));
    [detailModal, videoModal].forEach((modal) => modal?.addEventListener('click', (event) => { if (event.target === modal) { closeModal(modal); if (modal === videoModal) videoFrame.src = ''; } }));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(detailModal); closeModal(videoModal); if (videoFrame) videoFrame.src = ''; } });
})();
