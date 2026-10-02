(() => {
    const SESSION_KEY = 'anetflix_demo_session';
    const WATCHLIST_KEY = 'anetflix_demo_watchlist';

    const catalog = [
        { id: 1, title: 'Mi Película', image: 'assets/images/mi_pelicula.jpg', description: 'Descripción de mi película personalizada.', video_url: 'https://www.youtube.com/embed/0pdqf4P9MB8', category: 'Acción' },
        { id: 2, title: 'Misión Imposible', image: 'https://img.youtube.com/vi/hL_nNEPIAcE/hqdefault.jpg', description: 'Ethan Hunt y su equipo enfrentan su misión más peligrosa.', video_url: 'https://www.youtube.com/watch?v=hL_nNEPIAcE', category: 'Acción' },
        { id: 3, title: 'John Wick', image: 'https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg', description: 'Un exasesino busca venganza.', video_url: 'https://www.youtube.com/embed/2AUmvWm5ZDQ', category: 'Acción' },
        { id: 4, title: 'Mi Gallo', image: 'https://img.youtube.com/vi/ItxVaJ6-R5Y/hqdefault.jpg', description: 'Un hombre humilde se enfrenta a problemas familiares tras el diagnóstico de cáncer de su esposa.', video_url: 'https://www.youtube.com/embed/ItxVaJ6-R5Y', category: 'Narco' },
        { id: 5, title: 'El Cartel de Tijuana 3', image: 'https://img.youtube.com/vi/zlGuUADQ8i4/hqdefault.jpg', description: 'Tras la captura de un importante mafioso, su socio retoma el poder junto con sus hermanos.', video_url: 'https://www.youtube.com/embed/zlGuUADQ8i4', category: 'Narco' },
        { id: 6, title: 'Superbad', image: 'https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', description: 'Dos amigos buscan la mejor fiesta.', video_url: 'https://www.youtube.com/embed/4eaZ_48ZYog', category: 'Comedia' },
        { id: 7, title: 'El Conjuro', image: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg', description: 'Basada en hechos reales de los Warren.', video_url: 'https://www.youtube.com/embed/k10ETZ41q5o', category: 'Terror' },
        { id: 8, title: 'La La Land', image: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', description: 'Un musical sobre sueños y amor.', video_url: 'https://www.youtube.com/embed/0pdqf4P9MB8', category: 'Romance' },
        { id: 9, title: 'Me dieron en Adopción Huérfana', image: 'https://img.youtube.com/vi/mRUkL_OQ2bg/hqdefault.jpg', description: 'Una historia impactante de vida.', video_url: 'https://www.youtube.com/embed/mRUkL_OQ2bg', category: 'Podcast' },
        { id: 10, title: 'Noche de 15 Años en el Amole Guasave', image: 'https://img.youtube.com/vi/mpKakwg1ASY/hqdefault.jpg', description: 'Una recopilación de los mejores éxitos del pop.', video_url: 'https://www.youtube.com/embed/mpKakwg1ASY', category: 'Música' }
    ];

    const featured = {
        title: 'Stranger Things',
        description: 'Cuando un niño desaparece, un pueblo descubre secretos sobrenaturales.',
        image: 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
        video_url: 'https://www.youtube.com/embed/soeHuQVpOOg'
    };

    const bannerItems = [featured, ...catalog];

    const readSession = () => {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    };

    const writeSession = (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    const clearSession = () => localStorage.removeItem(SESSION_KEY);

    const readWatchlist = () => {
        try {
            return new Set(JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]'));
        } catch (error) {
            return new Set();
        }
    };

    const writeWatchlist = (set) => localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...set]));

    const isLoginPage = document.body.classList.contains('auth-page');
    const isHomePage = document.body.classList.contains('app-page');

    if (isLoginPage) {
        const activeSession = readSession();
        if (activeSession) {
            window.location.href = 'home.html';
            return;
        }

        const form = document.querySelector('#login-form');
        const alert = document.querySelector('#login-alert');
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = (document.querySelector('#email')?.value || '').trim();
            const password = (document.querySelector('#password')?.value || '').trim();
            if (!email || !password || password.length < 6 || !email.includes('@')) {
                alert.textContent = 'Ingresa un correo válido y una contraseña de al menos 6 caracteres.';
                alert.hidden = false;
                return;
            }
            const inferredName = email.split('@')[0].replace(/[._-]/g, ' ');
            const name = inferredName ? inferredName.charAt(0).toUpperCase() + inferredName.slice(1) : 'Angel';
            writeSession({ email, name });
            window.location.href = 'home.html';
        });
        return;
    }

    if (!isHomePage) return;

    const session = readSession();
    if (!session) {
        window.location.href = 'index.html';
        return;
    }

    const profileName = document.querySelector('#profile-name');
    const avatar = document.querySelector('#profile-avatar');
    if (profileName) profileName.textContent = session.name || 'Angel';
    if (avatar) avatar.textContent = (session.name || 'A').charAt(0).toUpperCase();

    const groupedByCategory = (items) => items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const safeId = (value) => value.toLowerCase().normalize('NFD').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    const contentRows = document.querySelector('#content-rows');
    const searchResult = document.querySelector('#search-result');
    const searchInput = document.querySelector('#search-input');

    const currentQuery = new URLSearchParams(window.location.search).get('search') || '';
    if (searchInput) searchInput.value = currentQuery;

    const filteredItems = (query) => {
        if (!query) return catalog;
        const term = query.toLowerCase();
        return catalog.filter((item) => [item.title, item.description, item.category].some((value) => value.toLowerCase().includes(term)));
    };

    const renderRows = (items, query) => {
        if (!contentRows) return;
        contentRows.innerHTML = '';
        if (searchResult) {
            if (query) {
                searchResult.hidden = false;
                searchResult.textContent = 'Resultados para: ';
                const strong = document.createElement('strong');
                strong.textContent = query;
                searchResult.appendChild(strong);
            } else {
                searchResult.hidden = true;
                searchResult.textContent = '';
            }
        }

        if (!items.length) {
            contentRows.innerHTML = '<p class="empty-state">No encontramos contenido para tu búsqueda. Intenta con otro término.</p>';
            return;
        }

        const groups = groupedByCategory(items);
        const watchlist = readWatchlist();

        Object.entries(groups).forEach(([category, categoryItems]) => {
            const row = document.createElement('section');
            row.className = 'media-row';
            row.id = safeId(category);

            const cards = categoryItems.map((item, index) => {
                const inWatchlist = watchlist.has(item.id);
                return `<article class="media-card" tabindex="0" style="--card-image: url('${item.image}')" data-id="${item.id}" data-title="${item.title}" data-description="${item.description}" data-video="${item.video_url}" data-image="${item.image}">
                    <div class="ambient-light"></div><img src="${item.image}" alt="${item.title}" loading="lazy"><div class="card-preview" aria-hidden="true"></div>
                    <div class="card-overlay"><div class="card-badges"><span>${index === 0 ? 'Nuevo episodio' : 'Recién agregado'}</span>${index === 1 ? `<span class="rank-badge">#1 en ${category}</span>` : ''}</div><div class="card-actions"><button type="button" class="round-button card-play" aria-label="Reproducir">▶</button><button type="button" class="round-button card-list" aria-label="${inWatchlist ? 'Quitar de Mi lista' : 'Añadir a Mi lista'}">${inWatchlist ? '✓' : '＋'}</button><button type="button" class="round-button card-like" aria-label="Me gusta">♡</button><button type="button" class="round-button card-info" aria-label="Más información">⌄</button></div><h3>${item.title}</h3><p><span class="match">97% para ti</span><span>HD</span><span>2025</span></p><div class="progress-track"><span style="width: ${index === 0 ? '42' : '0'}%"></span></div></div>
                </article>`;
            }).join('');

            row.innerHTML = `<div class="row-heading"><h2>${category}</h2><a href="#${safeId(category)}">Explorar todo <span>›</span></a></div>
                <div class="row-track">
                    <button class="row-arrow row-arrow-left" type="button" aria-label="Anterior">‹</button>
                    <div class="cards">${cards}</div>
                    <button class="row-arrow row-arrow-right" type="button" aria-label="Siguiente">›</button>
                </div>`;

            contentRows.appendChild(row);
        });

        bindCardInteractions();
        bindRowArrows();
    };

    const hero = document.querySelector('#hero');
    const heroTitle = document.querySelector('#hero-title');
    const heroDescription = document.querySelector('#hero-description');
    const heroPlay = document.querySelector('#hero-play');
    const heroInfo = document.querySelector('#hero-info');
    const detailModal = document.querySelector('#detail-modal');
    const videoModal = document.querySelector('#video-modal');
    const videoFrame = document.querySelector('#video-frame');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentBanner = 0;

    const setHero = (item) => {
        if (!item || !hero || !heroTitle || !heroDescription || !heroPlay || !heroInfo) return;
        hero.style.setProperty('--hero-image', `url("${item.image}")`);
        heroTitle.textContent = item.title;
        heroDescription.textContent = item.description;
        heroPlay.dataset.video = item.video_url;
        heroInfo.dataset.title = item.title;
        heroInfo.dataset.description = item.description;
        heroInfo.dataset.image = item.image;
        heroInfo.dataset.video = item.video_url;
        document.title = `${item.title} | Angel Netflix`;
    };

    const rotateBanner = () => {
        setHero(bannerItems[currentBanner]);
        currentBanner = (currentBanner + 1) % bannerItems.length;
    };

    const closeModal = (modal) => {
        modal?.classList.remove('is-open');
        modal?.setAttribute('aria-hidden', 'true');
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

    const openVideo = (url) => {
        if (!url || url === '#') return;
        if (videoFrame) videoFrame.src = embedUrl(url);
        videoModal?.classList.add('is-open');
        videoModal?.setAttribute('aria-hidden', 'false');
    };

    const openDetails = (source) => {
        const data = source.dataset;
        const title = document.querySelector('#modal-title');
        const description = document.querySelector('#modal-description');
        const image = document.querySelector('#modal-image');
        const modalPlay = document.querySelector('#modal-play');
        if (title) title.textContent = data.title;
        if (description) description.textContent = data.description;
        if (image) image.style.backgroundImage = `url("${data.image}")`;
        if (modalPlay) modalPlay.dataset.video = data.video;
        detailModal?.classList.add('is-open');
        detailModal?.setAttribute('aria-hidden', 'false');
    };

    const toggleWatchlist = (card, button) => {
        const watchlist = readWatchlist();
        const mediaId = Number(card.dataset.id);
        if (watchlist.has(mediaId)) {
            watchlist.delete(mediaId);
            button.textContent = '＋';
            button.setAttribute('aria-label', 'Añadir a Mi lista');
        } else {
            watchlist.add(mediaId);
            button.textContent = '✓';
            button.setAttribute('aria-label', 'Quitar de Mi lista');
        }
        writeWatchlist(watchlist);
    };

    const bindCardInteractions = () => {
        document.querySelectorAll('.media-card').forEach((card) => {
            let previewTimer;
            const startPreview = () => {
                if (card.querySelector('.card-preview iframe') || reducedMotion) return;
                const frame = document.createElement('iframe');
                frame.src = embedUrl(card.dataset.video, true);
                frame.title = `Vista previa de ${card.dataset.title}`;
                frame.setAttribute('allow', 'autoplay');
                card.querySelector('.card-preview')?.appendChild(frame);
                card.classList.add('is-previewing');
            };
            const stopPreview = () => {
                card.querySelector('.card-preview')?.replaceChildren();
                card.classList.remove('is-previewing');
            };

            card.addEventListener('mouseenter', () => { previewTimer = window.setTimeout(startPreview, 420); });
            card.addEventListener('mouseleave', () => { window.clearTimeout(previewTimer); stopPreview(); });
            card.addEventListener('click', (event) => {
                const button = event.target.closest('button');
                if (button?.classList.contains('card-play')) openVideo(card.dataset.video);
                else if (button?.classList.contains('card-info')) openDetails(card);
                else if (button?.classList.contains('card-list')) toggleWatchlist(card, button);
                else if (button?.classList.contains('card-like')) button.classList.toggle('is-liked');
                else openDetails(card);
            });
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDetails(card);
                }
            });
        });
    };

    const bindRowArrows = () => {
        document.querySelectorAll('.media-row').forEach((row) => {
            const cards = row.querySelector('.cards');
            row.querySelector('.row-arrow-left')?.addEventListener('click', () => cards?.scrollBy({ left: -(cards.clientWidth * .82), behavior: reducedMotion ? 'auto' : 'smooth' }));
            row.querySelector('.row-arrow-right')?.addEventListener('click', () => cards?.scrollBy({ left: cards.clientWidth * .82, behavior: reducedMotion ? 'auto' : 'smooth' }));
        });
    };

    document.querySelector('#search-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = (searchInput?.value || '').trim();
        const params = new URLSearchParams(window.location.search);
        if (query) params.set('search', query);
        else params.delete('search');
        window.history.replaceState({}, '', `home.html${params.toString() ? `?${params.toString()}` : ''}`);
        renderRows(filteredItems(query), query);
    });

    document.querySelector('#logout-button')?.addEventListener('click', () => {
        clearSession();
        window.location.href = 'index.html';
    });

    document.querySelectorAll('.remember-button').forEach((button) => button.addEventListener('click', () => openVideo(button.dataset.video)));
    document.querySelector('.info-button')?.addEventListener('click', (event) => openDetails({ dataset: event.currentTarget.dataset }));
    document.querySelector('#modal-play')?.addEventListener('click', (event) => openVideo(event.currentTarget.dataset.video));
    document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => { closeModal(detailModal); closeModal(videoModal); if (videoFrame) videoFrame.src = ''; }));
    [detailModal, videoModal].forEach((modal) => modal?.addEventListener('click', (event) => { if (event.target === modal) { closeModal(modal); if (modal === videoModal && videoFrame) videoFrame.src = ''; } }));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(detailModal); closeModal(videoModal); if (videoFrame) videoFrame.src = ''; } });

    window.addEventListener('scroll', () => document.querySelector('#site-header')?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

    setHero(featured);
    if (bannerItems.length > 1) window.setInterval(rotateBanner, 4000);

    renderRows(filteredItems(currentQuery), currentQuery);
})();
