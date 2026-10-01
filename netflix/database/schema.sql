CREATE DATABASE IF NOT EXISTS angel_netflix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE angel_netflix;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(120) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    remember_token VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS media (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_media_category_title (category_id, title),
    CONSTRAINT fk_media_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS watchlist (
    user_id INT UNSIGNED NOT NULL,
    media_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, media_id),
    CONSTRAINT fk_watchlist_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_watchlist_media FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
);

INSERT IGNORE INTO users (email, password_hash, name) VALUES
('demo@angelnetflix.test', '$2y$10$te..DCCjCb5qRNTkReSmIurMD7ZPD3CxSFRPt0DV/dFWlswi9ETa.', 'Angel');

INSERT IGNORE INTO categories (name) VALUES ('Accion'), ('Narco'), ('Comedia'), ('Terror'), ('Romance'), ('Podcast'), ('Musica');

INSERT IGNORE INTO media (title, image, description, video_url, category_id) VALUES
('Mi Pelicula', '../imagenes/mi_pelicula.jpg', 'Una historia hecha para comenzar tu noche.', 'https://www.youtube.com/embed/0pdqf4P9MB8', (SELECT id FROM categories WHERE name = 'Accion')),
('John Wick', 'https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg', 'Un exasesino busca venganza.', 'https://www.youtube.com/embed/2AUmvWm5ZDQ', (SELECT id FROM categories WHERE name = 'Accion')),
('Mi Gallo', 'https://img.youtube.com/vi/ItxVaJ6-R5Y/hqdefault.jpg', 'Una historia de familia, lucha y decisiones difíciles.', 'https://www.youtube.com/embed/ItxVaJ6-R5Y', (SELECT id FROM categories WHERE name = 'Narco')),
('Superbad', 'https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', 'Dos amigos buscan la mejor fiesta.', 'https://www.youtube.com/embed/4eaZ_48ZYog', (SELECT id FROM categories WHERE name = 'Comedia')),
('The Mask', 'https://image.tmdb.org/t/p/w500/6Biy7R9LfumYshur3YKhpj56MpB.jpg', 'Un hombre comun encuentra una mascara magica.', 'https://www.youtube.com/embed/hOqVRwGVUkA', (SELECT id FROM categories WHERE name = 'Comedia')),
('El Conjuro', 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg', 'Basada en hechos reales de los Warren.', 'https://www.youtube.com/embed/k10ETZ41q5o', (SELECT id FROM categories WHERE name = 'Terror')),
('La La Land', 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', 'Un musical sobre sueños y amor.', 'https://www.youtube.com/embed/0pdqf4P9MB8', (SELECT id FROM categories WHERE name = 'Romance')),
('Luba Lubasha', 'https://img.youtube.com/vi/mRUkL_OQ2bg/hqdefault.jpg', 'Una historia impactante de vida.', 'https://www.youtube.com/embed/mRUkL_OQ2bg', (SELECT id FROM categories WHERE name = 'Podcast'));
