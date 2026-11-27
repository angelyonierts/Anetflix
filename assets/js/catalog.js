function urlEmbedYouTube(youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
}

function miniaturaYouTube(youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

function normalizarCatalogoYT(items) {
    return items.map((item) => {
        const ytId = item.youtubeId || '';
        return {
            ...item,
            youtubeId: ytId,
            image: item.image || (ytId ? miniaturaYouTube(ytId) : 'imagenes/movieposter.jpg'),
            video: ytId ? urlEmbedYouTube(ytId) : item.video
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
        description: 'Contenido de análisis/especial en español sobre la historia de Cliff Booth. Verifica que sea el contenido que quieres mostrar como película.',
        youtubeId: '_RleToK1lIM'
    },
    {
        id: 13,
        title: 'Hombres de Negro 2',
        category: 'Ciencia Ficción',
        description: 'Película completa en español latino de acción y ciencia ficción con aliens y agentes secretos.',
        youtubeId: 't6vaVHCRQnA'
    }
];

window.ANGEL_CATALOG = normalizarCatalogoYT(CATALOGO_BASE);

window.ANGEL_BANNERS = normalizarCatalogoYT([
    {
        title: 'Stranger Things',
        description: 'Cuando un niño desaparece, un pueblo descubre secretos sobrenaturales.',
        image: 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
        youtubeId: 'soeHuQVpOOg'
    }
]).concat(window.ANGEL_CATALOG);
