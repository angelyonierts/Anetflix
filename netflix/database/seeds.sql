USE angel_netflix;

-- El seed reconstruye el catalogo original sin tocar los usuarios.
DELETE FROM watchlist;
DELETE FROM media;
DELETE FROM categories;

INSERT INTO categories (name) VALUES
('Acción'), ('Narco'), ('Comedia'), ('Terror'), ('Romance'), ('Podcast'), ('Música');

INSERT INTO media (title, image, description, video_url, category_id) VALUES
('Mi Película', '../imagenes/mi_pelicula.jpg', 'Descripción de mi película personalizada.', 'https://www.youtube.com/embed/0pdqf4P9MB8', (SELECT id FROM categories WHERE name = 'Acción')),
('Misión Imposible', '../imagenes/Imagen de WhatsApp 2025-06-25 a las 23.15.34_ec934f76.jpg', 'Ethan Hunt y su equipo enfrentan su misión más peligrosa.', 'https://www.youtube.com/watch?v=hL_nNEPIAcE', (SELECT id FROM categories WHERE name = 'Acción')),
('John Wick', 'https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg', 'Un exasesino busca venganza.', 'https://www.youtube.com/embed/2AUmvWm5ZDQ', (SELECT id FROM categories WHERE name = 'Acción')),

('Mi Gallo', 'https://img.youtube.com/vi/ItxVaJ6-R5Y/hqdefault.jpg', 'Un hombre humilde se enfrenta a problemas familiares tras el diagnóstico de cáncer de su esposa, llevándolo a las peleas de gallos clandestinas para pagar su tratamiento.', 'https://www.youtube.com/embed/ItxVaJ6-R5Y', (SELECT id FROM categories WHERE name = 'Narco')),
('El Cartel de Tijuana 3 |', 'https://img.youtube.com/vi/zlGuUADQ8i4/hqdefault.jpg', 'Tras la captura de un importante mafioso, su socio decide retomar el poder junto con sus hermanos, formando una de las más poderosas organizaciones del mundo del hampa.', 'https://www.youtube.com/embed/zlGuUADQ8i4', (SELECT id FROM categories WHERE name = 'Narco')),
('Los Dos Plebes', 'https://img.youtube.com/vi/jAvy_oDVTHA/hqdefault.jpg', 'Una película con las actuaciones de Oscar Lopez, John Solis, Fernando Saenz, Bernabe Melendrez y Alfonso Munguia.', 'https://www.youtube.com/embed/jAvy_oDVTHA', (SELECT id FROM categories WHERE name = 'Narco')),

('Superbad', 'https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', 'Dos amigos buscan la mejor fiesta.', 'https://www.youtube.com/embed/4eaZ_48ZYog', (SELECT id FROM categories WHERE name = 'Comedia')),
('The Mask', 'https://image.tmdb.org/t/p/w500/6Biy7R9LfumYshur3YKhpj56MpB.jpg', 'Un hombre común encuentra una máscara mágica.', 'https://www.youtube.com/embed/hOqVRwGVUkA', (SELECT id FROM categories WHERE name = 'Comedia')),

('El Conjuro', 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg', 'Basada en hechos reales de los Warren.', 'https://www.youtube.com/embed/k10ETZ41q5o', (SELECT id FROM categories WHERE name = 'Terror')),

('La La Land', 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', 'Un musical sobre sueños y amor.', 'https://www.youtube.com/embed/0pdqf4P9MB8', (SELECT id FROM categories WHERE name = 'Romance')),

('Me dieron en Adopción Huérfana y así terminé en México — Luba Lubasha', 'https://img.youtube.com/vi/mRUkL_OQ2bg/hqdefault.jpg', 'Una historia impactante de vida.', 'https://www.youtube.com/embed/mRUkL_OQ2bg', (SELECT id FROM categories WHERE name = 'Podcast')),
('SECRETOS DEL GYM Y SUS MUJERES | Hablamos Mal # 5', 'https://img.youtube.com/vi/d2yFzVUcIIo/hqdefault.jpg', 'Un podcast sobre la vida y sus desafíos.', 'https://www.youtube.com/embed/d2yFzVUcIIo', (SELECT id FROM categories WHERE name = 'Podcast')),
('Tommy Shelby: ¿un EJEMPLO a seguir… o una SEÑAL de alerta? | Peaky Blinders', 'https://img.youtube.com/vi/3KlmcX9rWoQ/hqdefault.jpg', 'Análisis profundo de un personaje icónico.', 'https://www.youtube.com/embed/3KlmcX9rWoQ', (SELECT id FROM categories WHERE name = 'Podcast')),
('OcraN Leaks: La GRAN ESTAFA, Palenque de Culiacán', 'https://img.youtube.com/vi/nnRpP5aHc4I/hqdefault.jpg', 'Podcast sobre corrupción y escándalos.', 'https://www.youtube.com/embed/nnRpP5aHc4I', (SELECT id FROM categories WHERE name = 'Podcast')),
('LAS VERDADES QUE MÉXICO NO QUIERE RECONOCER | Miguel Zunzunegui # 337', 'https://img.youtube.com/vi/SpJLD4nbRko/hqdefault.jpg', 'GusGri nos lleva por historias misteriosas y leyendas urbanas.', 'https://www.youtube.com/embed/u1ZFlk5x60I', (SELECT id FROM categories WHERE name = 'Podcast')),
('Esto ganan los Punteros $$$ Los Soldados me Saludan ft. Makako', 'https://img.youtube.com/vi/u1ZFlk5x60I/hqdefault.jpg', 'Un viaje al mundo de la mafia y sus secretos.', 'https://www.youtube.com/embed/DEF456UVW', (SELECT id FROM categories WHERE name = 'Podcast')),
('REPORTERO GROSERO // para quien trabajó ? Qué pasó con el churrumays? Episodio.6 DANY 24/7', 'https://img.youtube.com/vi/5vMiLpIf--c/hqdefault.jpg', 'Relatos paranormales reales.', 'https://www.youtube.com/embed/5vMiLpIf--c', (SELECT id FROM categories WHERE name = 'Podcast')),
('Paranormal sin Filtros', 'https://img.youtube.com/vi/-xc2QQRui9U/hqdefault.jpg', 'Testimonios de encuentros sobrenaturales.', 'https://www.youtube.com/embed/-xc2QQRui9U', (SELECT id FROM categories WHERE name = 'Podcast')),
('El Ozz: Conversaciones Nocturnas', 'https://img.youtube.com/vi/IkVYxdnO2HM/hqdefault.jpg', 'Charlas profundas con invitados especiales.', 'https://www.youtube.com/embed/IkVYxdnO2HM', (SELECT id FROM categories WHERE name = 'Podcast')),

('Noche de 15 Años en el Amole Guasave Ambiente del Grupo Versatil GsM', 'https://img.youtube.com/vi/mpKakwg1ASY/hqdefault.jpg', 'Una recopilación de los mejores éxitos del pop.', 'https://www.youtube.com/embed/mpKakwg1ASY', (SELECT id FROM categories WHERE name = 'Música')),
('Día del Estudiante Upes 2025', 'https://img.youtube.com/vi/OzK9o6yZnB0/hqdefault.jpg', 'Una mezcla de los mejores corridos tumbados.', 'https://www.youtube.com/embed/OzK9o6yZnB0', (SELECT id FROM categories WHERE name = 'Música')),
('Fragmento de 2 Grandes Temas Versátil GsM', 'https://img.youtube.com/vi/hL_nNEPIAcE/hqdefault.jpg', 'Una recopilación de los mejores éxitos del pop.', 'https://www.youtube.com/embed/hL_nNEPIAcE', (SELECT id FROM categories WHERE name = 'Música')),
('PIERRE-YVES PLAT plays ISN T SHE LOVELY ? (Stevie Wonder in CRAZY PIANO VERSION!)', 'https://img.youtube.com/vi/0sFB3vrOhko/hqdefault.jpg', 'Una mezcla de los mejores corridos tumbados.', 'https://www.youtube.com/embed/0sFB3vrOhko', (SELECT id FROM categories WHERE name = 'Música')),
('rigo tovar el sirenito.wmv', 'https://img.youtube.com/vi/gghZsSbwYYU/hqdefault.jpg', 'rigo tovar el sirenito.', 'https://www.youtube.com/embed/gghZsSbwYYU', (SELECT id FROM categories WHERE name = 'Música'));
