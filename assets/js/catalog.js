function urlEmbedYouTube(youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
}

function miniaturaYouTube(youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function normalizarCatalogoYT(items) {
    return items.map((item, index) => {
        const ytId = (item.youtubeId || '').trim();
        const videoDirecto = (item.videoUrl || item.video || '').trim();

        let videoFinal = '';
        if (ytId) {
            videoFinal = urlEmbedYouTube(ytId);
        } else if (videoDirecto) {
            videoFinal = videoDirecto;
        }

        const imagenFinal =
            (item.image || '').trim() ||
            (ytId ? miniaturaYouTube(ytId) : 'imagenes/movieposter.jpg');

        return {
            ...item,
            id: item.id ?? index + 1,
            category: (item.category || 'General').trim(),
            description: (item.description || '').trim(),
            youtubeId: ytId,
            videoUrl: videoDirecto && !ytId ? videoDirecto : '',
            esYouTube: Boolean(ytId),
            image: imagenFinal,
            video: videoFinal
        };
    });
}

const CATALOGO_BASE = [
    {
        id: 1,
        title: 'Tocó Fondo en Año Nuevo… y Decidió Recuperar a Su Hijo y Su Vida',
        category: 'Drama',
        description: 'Película completa de drama disponible en YouTube.',
        youtubeId: '1ZV8npcsJ4I'
    },
    {
        id: 2,
        title: 'Prueba de Fuego',
        category: 'Acción',
        description: 'Película de acción completa en español latino sobre bomberos paracaidistas enfrentando incendios forestales extremos.',
        youtubeId: 'YrMiIC9OcZ0'
    },
    {
        id: 3,
        title: 'Huracán',
        category: 'Drama',
        description: 'Una historia que atrapa hasta el final, basada en el boxeador Rubin Hurricane Carter y su lucha por la libertad.',
        youtubeId: 'Y_5dwSHQxBw'
    },
    {
        id: 4,
        title: 'Becas y Barba de Cristal',
        category: 'Drama',
        description: 'Película completa en español latino protagonizada por Val Kilmer.',
        youtubeId: 'tT0nMugAUEg'
    },
    {
        id: 5,
        title: 'Salió del hospital y nadie fue por él',
        category: 'Drama',
        description: 'Un drama sobre un niño que sale del hospital y espera poder volver con su mamá.',
        youtubeId: 'gI-kZ5q723U'
    },
    {
        id: 6,
        title: 'El Gángster, el Policía y el Diablo',
        category: 'Acción',
        description: 'Un detective y un jefe criminal forman una alianza para atrapar a un asesino serial.',
        youtubeId: 'L10tsbZpHVc'
    },
    {
        id: 7,
        title: 'Creyó Haber Encontrado Su Navidad Perfecta… Hasta Que Volvió la Ex',
        category: 'Romance',
        description: 'Una organizadora de eventos navideños conoce a un padre soltero y su hijo, pero todo se complica cuando regresa la madre del niño.',
        youtubeId: 'prLSLLGvi_8'
    },
    {
        id: 8,
        title: 'Hotel Transylvania 2',
        category: 'Animación',
        description: 'Película animada completa en español latino HD.',
        youtubeId: 'WeUclk49FXU'
    },
    {
        id: 9,
        title: 'La Princesa y el Guardaespaldas',
        category: 'Romance',
        description: 'Una mujer común descubre que es heredera real y recibe la protección de un guardaespaldas.',
        youtubeId: 'A2_WB3VSVzM'
    },
    {
        id: 10,
        title: 'Gran Stan: A Prueba de Hombres',
        category: 'Comedia',
        description: 'Comedia protagonizada por Rob Schneider sobre un estafador que entrena artes marciales antes de entrar a prisión.',
        youtubeId: 'S8p3pEGqJIg'
    },
    {
        id: 11,
        title: 'Plan de Escape',
        category: 'Acción',
        description: 'Película de acción con Sylvester Stallone y Arnold Schwarzenegger, doblada al español.',
        youtubeId: 'a-o3suDHiE0'
    },
    {
        id: 12,
        title: 'Las nuevas desventuras de Cliff Booth (2026)',
        category: 'Especial',
        description: 'Contenido de análisis/especial en español sobre la historia de Cliff Booth.',
        youtubeId: '_RleToK1lIM'
    },
    {
        id: 13,
        title: 'Hombres de Negro 2',
        category: 'Ciencia Ficción',
        description: 'Película completa en español latino de acción y ciencia ficción con aliens y agentes secretos.',
        youtubeId: 't6vaVHCRQnA'
    },
    { id: 14, title: 'Video YouTube (W-NXMoIRUGA)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'W-NXMoIRUGA' },
    { id: 15, title: 'Un Periodista Escéptico Investiga a la Virgen de Guadalupe… y Todo Empieza a Cambiar', category: 'Drama', description: 'Película o video agregado desde YouTube.', youtubeId: 'OCibWJepHrI' },
    { id: 16, title: 'Llegaron a la Isla por Vacaciones… y Encontraron las Pistas de una...', category: 'Suspenso', description: 'Película o video agregado desde YouTube.', youtubeId: 'MPEhSmZnfoo' },
    { id: 17, title: 'Le Dieron el Antiguo Número de un Famoso… y Todas las Puertas Se Abrieron', category: 'Comedia', description: 'Película o video agregado desde YouTube.', youtubeId: 'lvcKJi3Mi_8' },
    { id: 18, title: 'Alec Baldwin Sale de Prisión y Kim Basinger lo Acompaña en un Golpe Que Sale Mal', category: 'Acción', description: 'Película o video agregado desde YouTube.', youtubeId: 'afRYDUKR7AE' },
    { id: 19, title: 'Paul Bettany Descubre a Su Novia con Otro Hombre y Su Pasado Sale a la Luz', category: 'Drama', description: 'Película o video agregado desde YouTube.', youtubeId: 'rLGIf5cYcWE' },
    { id: 20, title: 'Jude Law Cree Haber Encontrado a Su Alma Gemela… Pero Llegó Demasiado Tarde', category: 'Romance', description: 'Película o video agregado desde YouTube.', youtubeId: 'mD5AgooWe7U' },
    { id: 21, title: 'Video YouTube (H8OIE2YyD4U)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'H8OIE2YyD4U' },
    { id: 22, title: 'Michael Cudlitz Sigue los Pasos de Asesinos Seriales Hasta Que Algo Cambia en Él', category: 'Suspenso', description: 'Película o video agregado desde YouTube.', youtubeId: '7gxbmKL4Ypg' },
    { id: 23, title: 'Video YouTube (zUrtGzGO3ps)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'zUrtGzGO3ps' },
    { id: 24, title: 'Video YouTube (rKjTf0GIEpk)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'rKjTf0GIEpk' },
    { id: 25, title: 'Viaja al Pasado Para Impedir Que un Político Cambie el Futuro', category: 'Ciencia Ficción', description: 'Película o video agregado desde YouTube.', youtubeId: 'nSJ4nqRwuzM' },
    { id: 26, title: 'Empezaron Jugando en Navidad… y Terminaron Atrapados Dentro del Juego', category: 'Fantasía', description: 'Película o video agregado desde YouTube.', youtubeId: 'dcubo6yl7h4' },
    { id: 27, title: 'Algo Está Ocurriendo en las Celdas de Alcatraz Después de Medianoche', category: 'Terror', description: 'Película o video agregado desde YouTube.', youtubeId: '1b-4TF6CeIQ' },
    { id: 28, title: 'Video YouTube (tJQQ2RExeDo)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'tJQQ2RExeDo' },
    { id: 29, title: 'Era Cruel con Todos Hasta Que Despertó Enterrado Vivo', category: 'Suspenso', description: 'Película o video agregado desde YouTube.', youtubeId: 'sjNXv_Xgj0M' },
    { id: 30, title: 'Su Ex Murió Pero Volvió de la Tumba Cuando Él Encontró Otra Mujer', category: 'Terror', description: 'Película o video agregado desde YouTube.', youtubeId: 'GkKRvE4JUSI' },
    { id: 31, title: 'En Navidad, Dos Mejores Amigas Compiten por el Mismo Hombre', category: 'Romance', description: 'Película o video agregado desde YouTube.', youtubeId: 'CjsmAqunyuQ' },
    { id: 32, title: 'Militares Renegados Secuestran un Avión Comercial en Pleno Vuelo', category: 'Acción', description: 'Película o video agregado desde YouTube.', youtubeId: '987HaZ_RduY' },
    { id: 33, title: 'Video YouTube (mclqwyG7PG8)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'mclqwyG7PG8' },
    { id: 34, title: 'Entró a Investigar un Hotel Donde Todos los Muertos Parecían Suicidarse', category: 'Suspenso', description: 'Película o video agregado desde YouTube.', youtubeId: '7ky67_18XzQ' },
    { id: 35, title: 'Video YouTube (aiQH-RcV1Do)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'aiQH-RcV1Do' },
    { id: 36, title: 'Samuel L. Jackson Desaparece y John Travolta Debe Descubrir Qué Pasó', category: 'Acción', description: 'Película o video agregado desde YouTube.', youtubeId: 'JPabu6MeClE' },
    { id: 37, title: 'Una Tormenta Encerró a Dos Ex en un Supermercado por Navidad', category: 'Romance', description: 'Película o video agregado desde YouTube.', youtubeId: 'HhzH9eald00' },
    { id: 38, title: 'Fueron Secuestrados por Alienígenas… Pero la Pesadilla Comenzó Después', category: 'Ciencia Ficción', description: 'Película o video agregado desde YouTube.', youtubeId: 'IRGnPiqRWVY' },
    { id: 39, title: 'Dolph Lundgren Enfrenta a Terroristas con un Virus Letal Bajo el Mar', category: 'Acción', description: 'Película o video agregado desde YouTube.', youtubeId: '-DUT11p9L_Y' },
    { id: 40, title: 'Construyen un Arca Antes de Que el Agua Cubra Todo el Planeta', category: 'Acción', description: 'Película o video agregado desde YouTube.', youtubeId: 'YSERvOkHS1A' },
    { id: 41, title: 'Intentaron Detener a un Monstruo Gigante… Hasta Que Apareció Algo Peor', category: 'Ciencia Ficción', description: 'Película o video agregado desde YouTube.', youtubeId: 'rjkoVvGFwfU' },
    { id: 42, title: 'Video YouTube (bK76eHBb4I0)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'bK76eHBb4I0' },
    { id: 43, title: 'Sebastián Badilla Busca el Amor Mientras un Asesino Acecha la Graduación', category: 'Comedia', description: 'Película o video agregado desde YouTube.', youtubeId: 't71RmkWs76s' },
    { id: 44, title: 'Video YouTube (NvQqHzqClf0)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'NvQqHzqClf0' },
    { id: 45, title: 'Video YouTube (xvquhFB2fFg)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'xvquhFB2fFg' },
    { id: 46, title: 'Video YouTube (gUmntRUC7ZU)', category: 'General', description: 'Película o video agregado desde YouTube.', youtubeId: 'gUmntRUC7ZU' }
];

const STORAGE_PELICULAS_KEY = 'angel_netflix_custom_movies';

function obtenerPeliculasGuardadas() {
    try {
        const raw = localStorage.getItem(STORAGE_PELICULAS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function refrescarCatalogos() {
    const extras = obtenerPeliculasGuardadas();
    const combinados = [...CATALOGO_BASE, ...extras];

    window.ANGEL_CATALOG = normalizarCatalogoYT(combinados);
    window.ANGEL_BANNERS = normalizarCatalogoYT([
        {
            id: 'banner-st',
            title: 'Stranger Things',
            category: 'Ciencia Ficción',
            description: 'Cuando un niño desaparece, un pueblo descubre secretos sobrenaturales.',
            image: 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
            youtubeId: 'soeHuQVpOOg'
        }
    ]).concat(window.ANGEL_CATALOG);

    return window.ANGEL_CATALOG;
}

function agregarPelicula(nuevaPelicula) {
    if (!nuevaPelicula || !nuevaPelicula.title || !nuevaPelicula.title.trim()) {
        throw new Error('El título de la película es obligatorio.');
    }

    const extras = obtenerPeliculasGuardadas();
    const maxId = [
        ...CATALOGO_BASE.map((p) => Number(p.id) || 0),
        ...extras.map((p) => Number(p.id) || 0)
    ].reduce((a, b) => Math.max(a, b), 0);

    const peliculaLista = {
        id: maxId + 1,
        title: nuevaPelicula.title.trim(),
        category: (nuevaPelicula.category || 'General').trim(),
        description: (nuevaPelicula.description || '').trim(),
        youtubeId: (nuevaPelicula.youtubeId || '').trim(),
        videoUrl: (nuevaPelicula.videoUrl || '').trim(),
        image: (nuevaPelicula.image || '').trim()
    };

    extras.push(peliculaLista);
    localStorage.setItem(STORAGE_PELICULAS_KEY, JSON.stringify(extras));
    refrescarCatalogos();

    return window.ANGEL_CATALOG[window.ANGEL_CATALOG.length - 1];
}

refrescarCatalogos();
window.agregarPelicula = agregarPelicula;
window.refrescarCatalogos = refrescarCatalogos;
