const TMDB_API_KEY = 'PEGA_AQUI_TU_API_KEY_DE_TMDB';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function cargarSugerencias(movieId = 569094, tituloBase = '') {
    const contenedor = document.querySelector('#tmdb-recommendations');
    const encabezado = document.querySelector('#tmdb-heading');

    if (!contenedor) return;

    if (encabezado) {
        encabezado.textContent = tituloBase
            ? `Porque viste "${tituloBase}"`
            : 'Quizás te pueda gustar';
    }

    contenedor.innerHTML = '<p class="tmdb-status">Cargando recomendaciones...</p>';

    try {
        const respuesta = await fetch(
            `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=es-MX&page=1`
        );

        if (!respuesta.ok) throw new Error(`TMDB respondió con ${respuesta.status}`);

        const datos = await respuesta.json();
        const peliculas = (datos.results || []).slice(0, 12);

        if (peliculas.length === 0) {
            contenedor.innerHTML = '<p class="tmdb-status">No encontramos recomendaciones disponibles.</p>';
            return;
        }

        contenedor.replaceChildren();

        peliculas.forEach((pelicula) => {
            const tarjeta = document.createElement('article');
            const poster = pelicula.poster_path
                ? `${TMDB_IMG_URL}${pelicula.poster_path}`
                : 'imagenes/movieposter.jpg';

            tarjeta.className = 'tmdb-card';
            tarjeta.tabIndex = 0;
            tarjeta.setAttribute('role', 'button');
            tarjeta.setAttribute('aria-label', `Ver recomendaciones de ${pelicula.title || 'esta película'}`);

            const imagen = document.createElement('img');
            imagen.src = poster;
            imagen.alt = pelicula.title || 'Película';
            imagen.loading = 'lazy';

            const titulo = document.createElement('h3');
            titulo.textContent = pelicula.title || 'Título no disponible';

            tarjeta.append(imagen, titulo);

            const seleccionar = () => {
                reproducirTrailerTMDB(pelicula.id);
                cargarSugerencias(pelicula.id, pelicula.title || tituloBase);
            };

            tarjeta.addEventListener('click', seleccionar);
            tarjeta.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    seleccionar();
                }
            });

            contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        contenedor.innerHTML = '<p class="tmdb-status">No se pudieron cargar las recomendaciones.</p>';
        console.error('Error al cargar recomendaciones TMDB:', error);
    }
}

async function buscarTrailerTMDB(movieId, language) {
    const respuesta = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=${language}`
    );

    if (!respuesta.ok) throw new Error(`TMDB respondió con ${respuesta.status}`);

    const datos = await respuesta.json();
    return (datos.results || []).find((video) =>
        video.site === 'YouTube' &&
        ['Trailer', 'Teaser'].includes(video.type)
    );
}

async function reproducirTrailerTMDB(movieId) {
    const modal = document.querySelector('#tmdb-video-modal');
    const frame = document.querySelector('#tmdb-video-frame');

    if (!modal || !frame) return;

    let video;

    try {
        video = await buscarTrailerTMDB(movieId, 'es-MX');
    } catch (error) {
        console.error('No se pudo consultar el trailer en español:', error);
    }

    if (!video) {
        try {
            video = await buscarTrailerTMDB(movieId, 'en-US');
        } catch (error) {
            console.error('No se pudo consultar el trailer en inglés:', error);
        }
    }

    if (!video) return;

    frame.src = `https://www.youtube.com/embed/${video.key}?autoplay=1`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
}

function inicializarTMDB() {
    document.querySelectorAll('.tmdb-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.tmdb-chip').forEach((item) => {
                item.classList.remove('is-active');
            });
            chip.classList.add('is-active');
            cargarSugerencias(Number(chip.dataset.movie), '');
        });
    });

    const cerrar = document.querySelector('#tmdb-close-modal');
    const modal = document.querySelector('#tmdb-video-modal');
    const frame = document.querySelector('#tmdb-video-frame');

    cerrar?.addEventListener('click', () => {
        if (frame) frame.src = '';
        if (modal) {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
            if (frame) frame.src = '';
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    cargarSugerencias();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarTMDB);
} else {
    inicializarTMDB();
}
