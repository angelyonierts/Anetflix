const TMDB_API_KEY = '4f7d36300e745a3e7cb6ff6f5078c29b';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function cargarSugerencias(movieId = 569094, tituloBase = '') {
    const contenedor = document.getElementById('tmdb-recommendations');
    const encabezado = document.getElementById('tmdb-heading');
    if (!contenedor) return;

    contenedor.innerHTML = '<p style="color:#b3b3b3;">Cargando sugerencias...</p>';

    try {
        const url = `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=es-MX&page=1`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            contenedor.innerHTML = '<p style="color:#b3b3b3;">No se encontraron sugerencias para este título.</p>';
            return;
        }

        if (tituloBase && encabezado) {
            encabezado.textContent = `Porque viste "${tituloBase}"`;
        }

        contenedor.innerHTML = data.results.slice(0, 12).map(peli => {
            const poster = peli.poster_path
                ? `${TMDB_IMG_URL}${peli.poster_path}`
                : 'imagenes/movieposter.jpg';
            const anio = peli.release_date ? peli.release_date.slice(0, 4) : '2025';
            const tituloSeguro = (peli.title || 'Sin título').replace(/"/g, '&quot;');

            return `
                <article class="tmdb-card" data-id="${peli.id}" data-title="${tituloSeguro}"
                    style="min-width: 175px; max-width: 175px; background: #181818; border-radius: 6px; overflow: hidden; cursor: pointer; transition: transform .2s ease;">
                    <img src="${poster}" alt="${tituloSeguro}" loading="lazy"
                        style="width: 100%; height: 250px; object-fit: cover; display: block;">
                    <div style="padding: 10px;">
                        <h3 style="color: #fff; font-size: .92rem; margin: 0 0 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${peli.title}
                        </h3>
                        <div style="display: flex; justify-content: space-between; font-size: .78rem; color: #b3b3b3;">
                            <span style="color: #46d369; font-weight: bold;">⭐ ${Number(peli.vote_average || 0).toFixed(1)}</span>
                            <span>${anio}</span>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        contenedor.querySelectorAll('.tmdb-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.04)');
            card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');

            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const titulo = card.dataset.title;
                reproducirTrailerTMDB(id);
                cargarSugerencias(id, titulo);
            });
        });

    } catch (error) {
        console.error('Error detallado de TMDB:', error);
        contenedor.innerHTML = `<p style="color:#ff6b6b;">Error al cargar recomendaciones (${error.message}).</p>`;
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
            modal.style.display = 'flex';
        } else {
            alert('Este título no tiene tráiler disponible en YouTube.');
        }
    } catch (error) {
        console.error('Error al cargar el video:', error);
    }
}

document.querySelectorAll('.tmdb-chip').forEach(btn => {
    btn.addEventListener('click', () => {
        const encabezado = document.getElementById('tmdb-heading');
        if (encabezado) {
            encabezado.textContent = `Quizás te pueda gustar (${btn.textContent})`;
        }
        cargarSugerencias(btn.dataset.movie);
    });
});

document.getElementById('tmdb-close-modal')?.addEventListener('click', () => {
    const modal = document.getElementById('tmdb-video-modal');
    const iframe = document.getElementById('tmdb-video-frame');
    if (iframe) iframe.src = '';
    if (modal) modal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    cargarSugerencias();
});
