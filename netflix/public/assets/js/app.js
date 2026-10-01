(() => {
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
        } catch (error) { return ''; }
    };

    const embedUrl = (url, preview = false) => {
        const id = videoId(url);
        if (!id) return url;
        const params = preview ? 'autoplay=1&mute=1&controls=0&loop=1&playlist=' + id : 'autoplay=1';
        return `https://www.youtube.com/embed/${id}?${params}`;
    };

    const openVideo = (url) => {
        if (!url || url === '#') return;
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

    // El header cambia de estado como en Netflix al abandonar el billboard.
    window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

    // El billboard recupera el comportamiento original: cambia cada cuatro segundos.
    let currentBanner = 0;
    const rotateBanner = () => {
        const banners = window.ANGEL_BANNERS || [];
        const hero = document.querySelector('#hero');
        const title = document.querySelector('#hero-title');
        const description = document.querySelector('#hero-description');
        const play = document.querySelector('#hero-play');
        const info = document.querySelector('#hero-info');
        if (!banners.length || !hero || !title || !description || !play || !info) return;

        const banner = banners[currentBanner];
        hero.style.setProperty('--hero-image', `url("${banner.image}")`);
        title.textContent = banner.title;
        description.textContent = banner.description;
        play.dataset.video = banner.video_url;
        info.dataset.title = banner.title;
        info.dataset.description = banner.description;
        info.dataset.image = banner.image;
        info.dataset.video = banner.video_url;
        currentBanner = (currentBanner + 1) % banners.length;
    };

    window.setInterval(rotateBanner, 4000);

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

    document.querySelectorAll('.media-card').forEach((card) => {
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
        card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetails(card); } });
    });

    const toggleWatchlist = async (card, button) => {
        const response = await fetch('watchlist.php', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ media_id: card.dataset.id }) });
        const result = await response.json();
        if (result.ok) { button.textContent = result.saved ? '✓' : '＋'; button.setAttribute('aria-label', result.saved ? 'Quitar de Mi lista' : 'Añadir a Mi lista'); }
    };

    document.querySelectorAll('.remember-button').forEach((button) => button.addEventListener('click', () => openVideo(button.dataset.video)));
    document.querySelector('.info-button')?.addEventListener('click', (event) => openDetails({ dataset: event.currentTarget.dataset }));
    document.querySelector('#modal-play')?.addEventListener('click', (event) => openVideo(event.currentTarget.dataset.video));
    document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => { closeModal(detailModal); closeModal(videoModal); if (videoFrame) videoFrame.src = ''; }));
    [detailModal, videoModal].forEach((modal) => modal?.addEventListener('click', (event) => { if (event.target === modal) { closeModal(modal); if (modal === videoModal) videoFrame.src = ''; } }));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(detailModal); closeModal(videoModal); if (videoFrame) videoFrame.src = ''; } });

    document.querySelectorAll('.media-row').forEach((row) => {
        const cards = row.querySelector('.cards');
        row.querySelector('.row-arrow-left')?.addEventListener('click', () => cards.scrollBy({ left: -cards.clientWidth * .82, behavior: reducedMotion ? 'auto' : 'smooth' }));
        row.querySelector('.row-arrow-right')?.addEventListener('click', () => cards.scrollBy({ left: cards.clientWidth * .82, behavior: reducedMotion ? 'auto' : 'smooth' }));
    });
})();
