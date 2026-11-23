const TMDB_API_KEY = '4f7d36300e745a3e7cb6ff6f5078c29b';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function cargarSugerencias(movieId = 569094, tituloBase = '') {
    const contenedor = document.getElementById('tmdb-recommendations');
    const encabezado = document.getElementById('tmdb-heading');
    if (!contenedor) return;

    contenedor.innerHTML = '<p class="tmdb-status">Cargando sugerencias...</p>';

    try {
        const url = `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=es-MX&page=1`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            contenedor.innerHTML = '<p class="tmdb-status">No hay sugerencias disponibles para este título.</p>';
            return;
        }

        if (tituloBase && encabezado) {
            encabezado.textContent = `Porque viste "${tituloBase}"`;
        }

        contenedor.innerHTML = data.results.slice(0, 12).map(peli => {
            const poster = peli.poster_path
                ? `${TMDB_IMG_URL}${peli.poster_path}`
                : 'imagenes/movieposter.jpg';
            const tituloSeguro = (peli.title || 'Sin título').replace(/"/g, '&quot;');

            return `
                <article class="tmdb-card" tabindex="0" data-id="${peli.id}" data-title="${tituloSeguro}">
                    <img src="${poster}" alt="${tituloSeguro}" loading="lazy">
                    <h3>${peli.title}</h3>
                </article>
            `;
        }).join('');

        contenedor.querySelectorAll('.tmdb-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const titulo = card.dataset.title;
                reproducirTrailerTMDB(id);
                cargarSugerencias(id, titulo);
            });
        });

    } catch (error) {
        console.error('Error TMDB:', error);
        contenedor.innerHTML = `<p class="tmdb-status">Error al cargar recomendaciones (${error.message}).</p>`;
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
            iframe.src = `https://www.youtube.com/embed/${video.key}?autoplay=1`;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
        } else {
            alert('Este título no tiene tráiler disponible en YouTube.');
        }
    } catch (error) {
        console.error('Error al cargar el video:', error);
    }
}

// Botones de categoría con clase .is-active
const chips = document.querySelectorAll('.tmdb-chip');
chips.forEach(btn => {
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

// Cerrar el modal quitando la clase .is-open
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

// Marcar el primer filtro activo y cargar películas al abrir
if (chips.length > 0) chips[0].classList.add('is-active');
cargarSugerencias();
