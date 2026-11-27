const TMDB_API_KEY = '4f7d36300e745a3e7cb6ff6f5078c29b';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const PELICULAS_YOUTUBE_EXTRA = (window.ANGEL_CATALOG || []).map((item) => ({
    id: `yt-${item.id}`,
    title: item.title,
    youtubeId: item.youtubeId,
    poster: item.image
}));

function reproducirYouTubeDirecto(youtubeId) {
    const modal = document.getElementById('tmdb-video-modal');
    const iframe = document.getElementById('tmdb-video-frame');
    if (!modal || !iframe || !youtubeId) return;

    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
}

async function cargarSugerencias(movieId = 569094, tituloBase = '') {
    const contenedor = document.getElementById('tmdb-recommendations');
    const encabezado = document.getElementById('tmdb-heading');
    if (!contenedor) return;

    contenedor.innerHTML = '<p class="tmdb-status">Cargando sugerencias...</p>';

    const catalogoActual = (window.ANGEL_CATALOG || []).map((item) => ({
        id: `yt-${item.id}`,
        title: item.title,
        youtubeId: item.youtubeId,
        poster: item.image
    }));

    const fuenteExtras = catalogoActual.length > 0 ? catalogoActual : PELICULAS_YOUTUBE_EXTRA;

    const extrasFormateados = fuenteExtras.map((item) => ({
        id: item.id,
        title: item.title,
        youtubeId: item.youtubeId,
        posterUrl: item.poster || `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`,
        esYouTube: true
    }));

    try {
        const url = `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=es-MX&page=1`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        const tmdbItems = (data.results || []).slice(0, 12).map((peli) => ({
            id: peli.id,
            title: peli.title || 'Sin título',
            youtubeId: '',
            posterUrl: peli.poster_path
                ? `${TMDB_IMG_URL}${peli.poster_path}`
                : 'imagenes/movieposter.jpg',
            esYouTube: false
        }));

        const combinados = [...extrasFormateados, ...tmdbItems];

        if (combinados.length === 0) {
            contenedor.innerHTML = '<p class="tmdb-status">No hay sugerencias disponibles para este título.</p>';
            return;
        }

        if (tituloBase && encabezado) {
            encabezado.textContent = `Porque viste "${tituloBase}"`;
        }

        contenedor.innerHTML = combinados.map((item) => {
            const tituloSeguro = item.title.replace(/"/g, '&quot;');
            return `
                <article
                    class="tmdb-card"
                    tabindex="0"
                    data-id="${item.id}"
                    data-title="${tituloSeguro}"
                    data-youtube-id="${item.youtubeId}"
                >
                    <img src="${item.posterUrl}" alt="${tituloSeguro}" loading="lazy">
                    <h3>${item.title}</h3>
                </article>
            `;
        }).join('');

        contenedor.querySelectorAll('.tmdb-card').forEach((card) => {
            card.addEventListener('click', () => {
                const ytId = card.dataset.youtubeId;
                const id = card.dataset.id;
                const titulo = card.dataset.title;

                if (ytId) {
                    reproducirYouTubeDirecto(ytId);
                } else {
                    reproducirTrailerTMDB(id);
                    cargarSugerencias(id, titulo);
                }
            });
        });

    } catch (error) {
        console.error('Error TMDB:', error);

        if (extrasFormateados.length > 0) {
            contenedor.innerHTML = extrasFormateados.map((item) => {
                const tituloSeguro = item.title.replace(/"/g, '&quot;');
                return `
                    <article
                        class="tmdb-card"
                        tabindex="0"
                        data-id="${item.id}"
                        data-title="${tituloSeguro}"
                        data-youtube-id="${item.youtubeId}"
                    >
                        <img src="${item.posterUrl}" alt="${tituloSeguro}" loading="lazy">
                        <h3>${item.title}</h3>
                    </article>
                `;
            }).join('');

            contenedor.querySelectorAll('.tmdb-card').forEach((card) => {
                card.addEventListener('click', () => {
                    reproducirYouTubeDirecto(card.dataset.youtubeId);
                });
            });
        } else {
            contenedor.innerHTML = `<p class="tmdb-status">Error al cargar recomendaciones (${error.message}).</p>`;
        }
    }
}

async function reproducirTrailerTMDB(movieId) {
    const modal = document.getElementById('tmdb-video-modal');
    const iframe = document.getElementById('tmdb-video-frame');
    if (!modal || !iframe) return;

    try {
        let res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=es-MX`);
        let data = await res.json();
        let video = (data.results || []).find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));

        if (!video) {
            res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
            data = await res.json();
            video = (data.results || []).find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
        }

        if (video) {
            reproducirYouTubeDirecto(video.key);
        } else {
            alert('Este título no tiene tráiler disponible en YouTube.');
        }
    } catch (error) {
        console.error('Error al cargar el video:', error);
    }
}

const chips = document.querySelectorAll('.tmdb-chip');
chips.forEach((btn) => {
    btn.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('is-active'));
        btn.classList.add('is-active');

        const encabezado = document.getElementById('tmdb-heading');
        if (encabezado) {
            encabezado.textContent = `Quizás te pueda gustar · ${btn.textContent}`;
        }

        cargarSugerencias(btn.dataset.movie);
    });
});

function cerrarModalTMDB() {
    const modal = document.getElementById('tmdb-video-modal');
    const iframe = document.getElementById('tmdb-video-frame');
    if (iframe) iframe.src = '';
    if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }
}

document.getElementById('tmdb-close-modal')?.addEventListener('click', cerrarModalTMDB);
document.getElementById('tmdb-video-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'tmdb-video-modal') cerrarModalTMDB();
});

if (chips.length > 0) chips[0].classList.add('is-active');
cargarSugerencias();
