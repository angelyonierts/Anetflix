const TMDB_API_KEY = '4f7d36300e745a3e7cb6ff6f5078c29b';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMG_URL = 'https://image.tmdb.org/t/p/w500';

const PELICULAS_YOUTUBE_EXTRA = [
    {
        id: 'yt-1',
        title: 'Tocó Fondo en Año Nuevo… y Decidió Recuperar a Su Hijo y Su Vida',
        youtubeId: '1ZV8npcsJ4I'
    },
    {
        id: 'yt-2',
        title: 'Prueba de Fuego',
        youtubeId: 'YrMiIC9OcZ0'
    },
    {
        id: 'yt-3',
        title: 'Huracán',
        youtubeId: 'Y_5dwSHQxBw'
    },
    {
        id: 'yt-4',
        title: 'Becas y Barba de Cristal',
        youtubeId: 'tT0nMugAUEg'
    },
    {
        id: 'yt-5',
        title: 'Salió del hospital y nadie fue por él',
        youtubeId: 'gI-kZ5q723U'
    },
    {
        id: 'yt-6',
        title: 'El Gángster, el Policía y el Diablo',
        youtubeId: 'L10tsbZpHVc'
    },
    {
        id: 'yt-7',
        title: 'Creyó Haber Encontrado Su Navidad Perfecta… Hasta Que Volvió la Ex',
        youtubeId: 'prLSLLGvi_8'
    },
    {
        id: 'yt-8',
        title: 'Hotel Transylvania 2',
        youtubeId: 'WeUclk49FXU'
    },
    {
        id: 'yt-9',
        title: 'La Princesa y el Guardaespaldas',
        youtubeId: 'A2_WB3VSVzM'
    },
    {
        id: 'yt-10',
        title: 'Gran Stan: A Prueba de Hombres',
        youtubeId: 'S8p3pEGqJIg'
    },
    {
        id: 'yt-11',
        title: 'Plan de Escape',
        youtubeId: 'a-o3suDHiE0'
    },
    {
        id: 'yt-12',
        title: 'Las nuevas desventuras de Cliff Booth (2026)',
        youtubeId: '_RleToK1lIM'
    },
    {
        id: 'yt-13',
        title: 'Hombres de Negro 2',
        youtubeId: 't6vaVHCRQnA'
    },
    {
        id: 'yt-14',
        title: 'Título pendiente (W-NXMoIRUGA)',
        youtubeId: 'W-NXMoIRUGA'
    },
    {
        id: 'yt-15',
        title: 'Título pendiente (OCibWJepHrI)',
        youtubeId: 'OCibWJepHrI'
    },
    {
        id: 'yt-16',
        title: 'Título pendiente (MPEhSmZnfoo)',
        youtubeId: 'MPEhSmZnfoo'
    },
    {
        id: 'yt-17',
        title: 'Título pendiente (lvcKJi3Mi_8)',
        youtubeId: 'lvcKJi3Mi_8'
    },
    {
        id: 'yt-18',
        title: 'Título pendiente (afRYDUKR7AE)',
        youtubeId: 'afRYDUKR7AE'
    },
    {
        id: 'yt-19',
        title: 'Título pendiente (rLGIf5cYcWE)',
        youtubeId: 'rLGIf5cYcWE'
    },
    {
        id: 'yt-20',
        title: 'Título pendiente (mD5AgooWe7U)',
        youtubeId: 'mD5AgooWe7U'
    },
    {
        id: 'yt-21',
        title: 'Título pendiente (H8OIE2YyD4U)',
        youtubeId: 'H8OIE2YyD4U'
    },
    {
        id: 'yt-22',
        title: 'Título pendiente (7gxbmKL4Ypg)',
        youtubeId: '7gxbmKL4Ypg'
    },
    {
        id: 'yt-23',
        title: 'Título pendiente (zUrtGzGO3ps)',
        youtubeId: 'zUrtGzGO3ps'
    },
    {
        id: 'yt-24',
        title: 'Título pendiente (rKjTf0GIEpk)',
        youtubeId: 'rKjTf0GIEpk'
    },
    {
        id: 'yt-25',
        title: 'Título pendiente (nSJ4nqRwuzM)',
        youtubeId: 'nSJ4nqRwuzM'
    },
    {
        id: 'yt-26',
        title: 'Título pendiente (dcubo6yl7h4)',
        youtubeId: 'dcubo6yl7h4'
    },
    {
        id: 'yt-27',
        title: 'Título pendiente (1b-4TF6CeIQ)',
        youtubeId: '1b-4TF6CeIQ'
    },
    {
        id: 'yt-28',
        title: 'Título pendiente (tJQQ2RExeDo)',
        youtubeId: 'tJQQ2RExeDo'
    },
    {
        id: 'yt-29',
        title: 'Título pendiente (sjNXv_Xgj0M)',
        youtubeId: 'sjNXv_Xgj0M'
    },
    {
        id: 'yt-30',
        title: 'Título pendiente (GkKRvE4JUSI)',
        youtubeId: 'GkKRvE4JUSI'
    },
    {
        id: 'yt-31',
        title: 'Título pendiente (CjsmAqunyuQ)',
        youtubeId: 'CjsmAqunyuQ'
    },
    {
        id: 'yt-32',
        title: 'Título pendiente (987HaZ_RduY)',
        youtubeId: '987HaZ_RduY'
    },
    {
        id: 'yt-33',
        title: 'Título pendiente (mclqwyG7PG8)',
        youtubeId: 'mclqwyG7PG8'
    },
    {
        id: 'yt-34',
        title: 'Título pendiente (7ky67_18XzQ)',
        youtubeId: '7ky67_18XzQ'
    },
    {
        id: 'yt-35',
        title: 'Título pendiente (aiQH-RcV1Do)',
        youtubeId: 'aiQH-RcV1Do'
    },
    {
        id: 'yt-36',
        title: 'Título pendiente (JPabu6MeClE)',
        youtubeId: 'JPabu6MeClE'
    },
    {
        id: 'yt-37',
        title: 'Título pendiente (HhzH9eald00)',
        youtubeId: 'HhzH9eald00'
    },
    {
        id: 'yt-38',
        title: 'Título pendiente (IRGnPiqRWVY)',
        youtubeId: 'IRGnPiqRWVY'
    },
    {
        id: 'yt-39',
        title: 'Título pendiente (-DUT11p9L_Y)',
        youtubeId: '-DUT11p9L_Y'
    },
    {
        id: 'yt-40',
        title: 'Título pendiente (YSERvOkHS1A)',
        youtubeId: 'YSERvOkHS1A'
    },
    {
        id: 'yt-41',
        title: 'Título pendiente (rjkoVvGFwfU)',
        youtubeId: 'rjkoVvGFwfU'
    },
    {
        id: 'yt-42',
        title: 'Título pendiente (bK76eHBb4I0)',
        youtubeId: 'bK76eHBb4I0'
    },
    {
        id: 'yt-43',
        title: 'Título pendiente (t71RmkWs76s)',
        youtubeId: 't71RmkWs76s'
    },
    {
        id: 'yt-44',
        title: 'Título pendiente (NvQqHzqClf0)',
        youtubeId: 'NvQqHzqClf0'
    },
    {
        id: 'yt-45',
        title: 'Título pendiente (xvquhFB2fFg)',
        youtubeId: 'xvquhFB2fFg'
    },
    {
        id: 'yt-46',
        title: 'Título pendiente (gUmntRUC7ZU)',
        youtubeId: 'gUmntRUC7ZU'
    }
];

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

    const extrasFormateados = PELICULAS_YOUTUBE_EXTRA.map((item) => ({
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
