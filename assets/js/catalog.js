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
            category: (item.category || 'Acción').trim(),
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
        description: 'Un hombre marcado por sus errores intenta rehacer su camino y ganarse el derecho de volver a estar con su hijo.',
        youtubeId: '1ZV8npcsJ4I'
    },
    {
        id: 2,
        title: 'Prueba de Fuego',
        category: 'Acción',
        description: 'Bomberos paracaidistas enfrentan incendios forestales extremos mientras luchan por salvar vidas y controlar el fuego.',
        youtubeId: 'YrMiIC9OcZ0'
    },
    {
        id: 3,
        title: 'Huracán',
        category: 'Drama',
        description: 'Inspirada en el boxeador Rubin "Hurricane" Carter, sigue su lucha contra una condena injusta por asesinato.',
        youtubeId: 'Y_5dwSHQxBw'
    },
    {
        id: 4,
        title: 'Becas y Barba de Cristal',
        category: 'Drama',
        description: 'Historia dramática protagonizada por Val Kilmer sobre decisiones familiares, orgullo y segundas oportunidades.',
        youtubeId: 'tT0nMugAUEg'
    },
    {
        id: 5,
        title: 'Salió del hospital y nadie fue por él',
        category: 'Drama',
        description: 'Un niño recibe el alta médica y enfrenta la incertidumbre de regresar a casa esperando reencontrarse con su madre.',
        youtubeId: 'gI-kZ5q723U'
    },
    {
        id: 6,
        title: 'El Gángster, el Policía y el Diablo',
        category: 'Acción',
        description: 'Un detective y el líder de una banda criminal se ven obligados a colaborar para cazar a un asesino serial.',
        youtubeId: 'L10tsbZpHVc'
    },
    {
        id: 7,
        title: 'Creyó Haber Encontrado Su Navidad Perfecta… Hasta Que Volvió la Ex',
        category: 'Romance',
        description: 'Una organizadora de fiestas navideñas se acerca a un padre viudo y su hijo, hasta que el regreso de la ex altera sus planes.',
        youtubeId: 'prLSLLGvi_8'
    },
    {
        id: 8,
        title: 'Hotel Transylvania 2',
        category: 'Animación',
        description: 'Drácula y su familia intentan despertar los poderes vampíricos del pequeño Dennis mientras lidian con la llegada de su abuelo.',
        youtubeId: 'WeUclk49FXU'
    },
    {
        id: 9,
        title: 'La Princesa y el Guardaespaldas',
        category: 'Romance',
        description: 'Una joven descubre su linaje real y queda bajo la protección de un guardaespaldas con quien surge un vínculo inesperado.',
        youtubeId: 'A2_WB3VSVzM'
    },
    {
        id: 10,
        title: 'Gran Stan: A Prueba de Hombres',
        category: 'Comedia',
        description: 'Un estafador condenado a prisión contrata a un maestro de artes marciales para aprender a defenderse antes de entrar.',
        youtubeId: 'S8p3pEGqJIg'
    },
    {
        id: 11,
        title: 'Plan de Escape',
        category: 'Acción',
        description: 'Un experto en seguridad carcelaria es encerrado en una prisión de alta seguridad y planea escapar junto a otro recluso.',
        youtubeId: 'a-o3suDHiE0'
    },
    {
        id: 12,
        title: 'Las nuevas desventuras de Cliff Booth (2026)',
        category: 'Acción',
        description: 'Análisis y revisión cinematográfica centrada en el personaje de Cliff Booth y su legado en pantalla.',
        youtubeId: '_RleToK1lIM'
    },
    {
        id: 13,
        title: 'Hombres de Negro 2',
        category: 'Ciencia Ficción',
        description: 'Los agentes J y K vuelven a unirse para detener a una amenaza extraterrestre disfrazada que pone en peligro la Tierra.',
        youtubeId: 't6vaVHCRQnA'
    },
    {
        id: 14,
        title: 'Misión Extrema',
        category: 'Acción',
        description: 'Una operación de alto riesgo pone a prueba la resistencia y lealtad del equipo en una misión contrarreloj.',
        youtubeId: 'W-NXMoIRUGA'
    },
    {
        id: 15,
        title: 'Un Periodista Escéptico Investiga a la Virgen de Guadalupe… y Todo Empieza a Cambiar',
        category: 'Drama',
        description: 'Un periodista ambicioso y escéptico investiga la historia de la Virgen de Guadalupe y sus convicciones empiezan a transformarse.',
        youtubeId: 'OCibWJepHrI'
    },
    {
        id: 16,
        title: 'Llegaron a la Isla por Vacaciones… y Encontraron las Pistas de una...',
        category: 'Suspenso',
        description: 'Un grupo viaja a una isla para descansar y termina descubriendo pistas vinculadas a una valiosa fortuna.',
        youtubeId: 'MPEhSmZnfoo'
    },
    {
        id: 17,
        title: 'Le Dieron el Antiguo Número de un Famoso… y Todas las Puertas Se Abrieron',
        category: 'Comedia',
        description: 'Un desconocido recibe el antiguo número telefónico de una celebridad y accede a un mundo de fiestas y lujos hasta que el dueño original lo descubre.',
        youtubeId: 'lvcKJi3Mi_8'
    },
    {
        id: 18,
        title: 'Alec Baldwin Sale de Prisión y Kim Basinger lo Acompaña en un Golpe Que Sale Mal',
        category: 'Acción',
        description: 'Tras salir de prisión, un ladrón se reúne con su cómplice para un golpe que se complica más de lo previsto.',
        youtubeId: 'afRYDUKR7AE'
    },
    {
        id: 19,
        title: 'Paul Bettany Descubre a Su Novia con Otro Hombre y Su Pasado Sale a la Luz',
        category: 'Drama',
        description: 'Una infidelidad desencadena una serie de revelaciones sobre el pasado que cambian la vida de los involucrados.',
        youtubeId: 'rLGIf5cYcWE'
    },
    {
        id: 20,
        title: 'Jude Law Cree Haber Encontrado a Su Alma Gemela… Pero Llegó Demasiado Tarde',
        category: 'Romance',
        description: 'Una historia romántica marcada por el destino, las dudas y la sensación de llegar a destiempo.',
        youtubeId: 'mD5AgooWe7U'
    },
    {
        id: 21,
        title: 'Alerta Máxima',
        category: 'Suspenso',
        description: 'Una amenaza inesperada desata la tensión y obliga a actuar rápido para evitar una tragedia.',
        youtubeId: 'H8OIE2YyD4U'
    },
    {
        id: 22,
        title: 'Michael Cudlitz Sigue los Pasos de Asesinos Seriales Hasta Que Algo Cambia en Él',
        category: 'Suspenso',
        description: 'Una investigación sobre asesinos seriales lleva al protagonista a confrontar sus propios límites psicológicos.',
        youtubeId: '7gxbmKL4Ypg'
    },
    {
        id: 23,
        title: 'Rescate Imposible',
        category: 'Acción',
        description: 'Un operativo de rescate enfrenta condiciones adversas y enemigos decididos a impedir que lleguen a salvo.',
        youtubeId: 'zUrtGzGO3ps'
    },
    {
        id: 24,
        title: 'El Último Testigo',
        category: 'Suspenso',
        description: 'Quien posee información clave sobre un crimen se convierte en el objetivo principal de quienes buscan ocultarlo.',
        youtubeId: 'rKjTf0GIEpk'
    },
    {
        id: 25,
        title: 'Viaja al Pasado Para Impedir Que un Político Cambie el Futuro',
        category: 'Ciencia Ficción',
        description: 'Un viaje en el tiempo busca evitar que las decisiones de un político alteren el curso del futuro.',
        youtubeId: 'nSJ4nqRwuzM'
    },
    {
        id: 26,
        title: 'Empezaron Jugando en Navidad… y Terminaron Atrapados Dentro del Juego',
        category: 'Fantasía',
        description: 'Una partida navideña se sale de control y deja a los jugadores atrapados dentro de una aventura fantástica.',
        youtubeId: 'dcubo6yl7h4'
    },
    {
        id: 27,
        title: 'Algo Está Ocurriendo en las Celdas de Alcatraz Después de Medianoche',
        category: 'Terror',
        description: 'Sucesos paranormales y peligrosos despiertan en las antiguas celdas de Alcatraz cuando cae la noche.',
        youtubeId: '1b-4TF6CeIQ'
    },
    {
        id: 28,
        title: 'Sombra en la Noche',
        category: 'Terror',
        description: 'Una presencia inquietante acecha en la oscuridad y pone a prueba los nervios de quienes la enfrentan.',
        youtubeId: 'tJQQ2RExeDo'
    },
    {
        id: 29,
        title: 'Era Cruel con Todos Hasta Que Despertó Enterrado Vivo',
        category: 'Suspenso',
        description: 'Peter, conocido por su crueldad hacia niños, animales y sirvientes, enfrenta una pesadilla al despertar enterrado vivo.',
        youtubeId: 'sjNXv_Xgj0M'
    },
    {
        id: 30,
        title: 'Su Ex Murió Pero Volvió de la Tumba Cuando Él Encontró Otra Mujer',
        category: 'Terror',
        description: 'Cuando él intenta rehacer su vida amorosa con otra mujer, el regreso sobrenatural de su ex desata el terror.',
        youtubeId: 'GkKRvE4JUSI'
    },
    {
        id: 31,
        title: 'En Navidad, Dos Mejores Amigas Compiten por el Mismo Hombre',
        category: 'Romance',
        description: 'Dos mejores amigas compiten por conquistar al mismo hombre durante las fiestas navideñas mientras redescubren el espíritu de la Navidad.',
        youtubeId: 'CjsmAqunyuQ'
    },
    {
        id: 32,
        title: 'Militares Renegados Secuestran un Avión Comercial en Pleno Vuelo',
        category: 'Acción',
        description: 'Un grupo de militares renegados toma el control de un avión comercial en pleno vuelo y desata una crisis en el aire.',
        youtubeId: '987HaZ_RduY'
    },
    {
        id: 33,
        title: 'Operación Nocturna',
        category: 'Acción',
        description: 'Una misión encubierta se desarrolla al amparo de la noche con altos riesgos y enfrentamientos directos.',
        youtubeId: 'mclqwyG7PG8'
    },
    {
        id: 34,
        title: 'Entró a Investigar un Hotel Donde Todos los Muertos Parecían Suicidarse',
        category: 'Suspenso',
        description: 'Una periodista se infiltra en el Hotel Imperial para investigar muertes sospechosas que parecen suicidios y descubre lo que ocurre tras sus puertas.',
        youtubeId: '7ky67_18XzQ'
    },
    {
        id: 35,
        title: 'Destino Oculto',
        category: 'Drama',
        description: 'Secretos guardados durante años salen a la superficie y obligan a los personajes a enfrentar su destino.',
        youtubeId: 'aiQH-RcV1Do'
    },
    {
        id: 36,
        title: 'Samuel L. Jackson Desaparece y John Travolta Debe Descubrir Qué Pasó',
        category: 'Acción',
        description: 'La desaparición repentina de su compañero impulsa una investigación cargada de acción y giros inesperados.',
        youtubeId: 'JPabu6MeClE'
    },
    {
        id: 37,
        title: 'Una Tormenta Encerró a Dos Ex en un Supermercado por Navidad',
        category: 'Romance',
        description: 'Una tormenta navideña deja atrapados a dos exparejas dentro de un supermercado, obligándolos a convivir y resolver asuntos pendientes.',
        youtubeId: 'HhzH9eald00'
    },
    {
        id: 38,
        title: 'Fueron Secuestrados por Alienígenas… Pero la Pesadilla Comenzó Después',
        category: 'Ciencia Ficción',
        description: 'Cuatro amigos pierden el conocimiento tras un secuestro extraterrestre y descubren que lo peor ocurre después.',
        youtubeId: 'IRGnPiqRWVY'
    },
    {
        id: 39,
        title: 'Dolph Lundgren Enfrenta a Terroristas con un Virus Letal Bajo el Mar',
        category: 'Acción',
        description: 'En un entorno submarino, el protagonista enfrenta a terroristas armados con un virus mortal antes de que se propague.',
        youtubeId: '-DUT11p9L_Y'
    },
    {
        id: 40,
        title: 'Construyen un Arca Antes de Que el Agua Cubra Todo el Planeta',
        category: 'Acción',
        description: 'Ante una inundación global catastrófica, se intenta construir un arca para preservar la vida antes de que el agua cubra la Tierra.',
        youtubeId: 'YSERvOkHS1A'
    },
    {
        id: 41,
        title: 'Intentaron Detener a un Monstruo Gigante… Hasta Que Apareció Algo Peor',
        category: 'Ciencia Ficción',
        description: 'Un Kaiju gigante amenaza con destruir todo a su paso, pero al intentar frenarlo surgen criaturas colosales aún más peligrosas.',
        youtubeId: 'rjkoVvGFwfU'
    },
    {
        id: 42,
        title: 'Doble Juego',
        category: 'Suspenso',
        description: 'Engaños, alianzas inciertas y dobles intenciones ponen en jaque a quienes participan en el juego.',
        youtubeId: 'bK76eHBb4I0'
    },
    {
        id: 43,
        title: 'Sebastián Badilla Busca el Amor Mientras un Asesino Acecha la Graduación',
        category: 'Comedia',
        description: 'Entre enredos románticos y humor, una celebración de graduación se ve amenazada por un asesino al acecho.',
        youtubeId: 't71RmkWs76s'
    },
    {
        id: 44,
        title: 'Riesgo Extremo',
        category: 'Acción',
        description: 'Una situación límite lleva a los protagonistas a tomar decisiones extremas para sobrevivir.',
        youtubeId: 'NvQqHzqClf0'
    },
    {
        id: 45,
        title: 'Fuego Cruzado',
        category: 'Acción',
        description: 'Atrapados en medio de un enfrentamiento peligroso, deben abrirse paso con estrategia y rapidez.',
        youtubeId: 'xvquhFB2fFg'
    },
    {
        id: 46,
        title: 'Enigma Final',
        category: 'Suspenso',
        description: 'Un misterio sin resolver exige descifrar las últimas pistas antes de que sea demasiado tarde.',
        youtubeId: 'gUmntRUC7ZU'
    }
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
        category: (nuevaPelicula.category || 'Acción').trim(),
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
