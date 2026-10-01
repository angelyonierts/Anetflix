<?php
$baseUrl = $config['base_url'];
$user = Auth::user() ?? ['name' => 'Angel'];
$featured = $data['featured'];
$catalogJson = [];
foreach ($data['categories'] as $category => $items) {
    foreach ($items as $item) {
        $catalogJson[] = ['title' => $item['title'], 'description' => $item['description'], 'image' => $item['image'], 'video' => $item['video_url'], 'category' => $category];
    }
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Angel Netflix: películas, series, juegos, podcasts y música.">
    <title><?= e($featured['title']) ?> | Angel Netflix</title>
    <link rel="icon" href="<?= e($baseUrl) ?>/../imagenes/movieposter.jpg" type="image/jpeg">
    <link rel="stylesheet" href="<?= e($baseUrl) ?>/assets/css/app.css">
</head>
<body class="app-page">
    <header class="site-header" id="site-header">
        <div class="header-start">
            <a class="netflix-logo" href="<?= e($baseUrl) ?>/index.php" aria-label="Angel Netflix"><span>N</span><b>ANGEL NETFLIX</b></a>
            <form class="search-box" method="get" action="<?= e($baseUrl) ?>/index.php" role="search">
                <button type="submit" aria-label="Buscar">⌕</button><input type="search" name="search" value="<?= e($data['query']) ?>" placeholder="Títulos, personas, géneros">
            </form>
            <nav class="main-nav" aria-label="Navegación principal">
                <a class="active" href="#inicio">Inicio</a><a href="#series">Series</a><a href="#peliculas">Películas</a><a href="#juegos">Juegos</a><a href="#mi-netflix">Mi Netflix</a>
            </nav>
        </div>
        <div class="header-actions">
            <button class="header-icon" type="button" aria-label="Notificaciones">♢</button>
            <details class="profile-menu"><summary><span class="avatar">A</span><span class="profile-name"><?= e($user['name']) ?></span><span class="profile-chevron">⌄</span></summary><div class="profile-popover"><a href="#account">Cuenta</a><a href="<?= e($baseUrl) ?>/logout.php">Cerrar sesión</a></div></details>
        </div>
    </header>

    <main id="inicio">
        <section class="hero" id="hero" style="--hero-image: url('<?= e($featured['image']) ?>')">
            <div class="hero-shade"></div>
            <div class="hero-content">
                <div class="hero-brand"><span class="hero-n">N</span><span>ANGEL NETFLIX</span></div>
                <p class="hero-meta"><strong>SERIE</strong><span>Fantasía</span><span>2025</span><span>16+</span><span>HD</span></p>
                <h1 id="hero-title"><?= e($featured['title']) ?></h1>
                <p class="hero-description" id="hero-description"><?= e($featured['description']) ?></p>
                <div class="hero-actions"><button class="remember-button" id="hero-play" type="button" data-video="<?= e($featured['video_url']) ?>"><span class="button-icon">🔔</span> Recordarme</button><button class="info-button" id="hero-info" type="button" data-title="<?= e($featured['title']) ?>" data-description="<?= e($featured['description']) ?>" data-image="<?= e($featured['image']) ?>" data-video="<?= e($featured['video_url']) ?>"><span class="button-icon info-icon">i</span> Más información</button></div>
            </div>
            <div class="hero-age">16+</div>
        </section>

        <div class="content-shell">
            <?php if ($data['query'] !== ''): ?><p class="search-result">Resultados para: <strong><?= e($data['query']) ?></strong></p><?php endif; ?>
            <?php foreach ($data['categories'] as $category => $items): ?>
                <section class="media-row" id="<?= e(strtolower($category)) ?>">
                    <div class="row-heading"><h2><?= e($category) ?></h2><a href="#<?= e(strtolower($category)) ?>">Explorar todo <span>›</span></a></div>
                    <div class="row-track">
                        <button class="row-arrow row-arrow-left" type="button" aria-label="Anterior">‹</button>
                        <div class="cards">
                            <?php foreach ($items as $index => $item): ?>
                                <article class="media-card" tabindex="0" style="--card-image: url('<?= e($item['image']) ?>')" data-id="<?= e((string) $item['id']) ?>" data-title="<?= e($item['title']) ?>" data-description="<?= e($item['description']) ?>" data-video="<?= e($item['video_url']) ?>" data-image="<?= e($item['image']) ?>">
                                    <div class="ambient-light"></div><img src="<?= e($item['image']) ?>" alt="<?= e($item['title']) ?>" loading="lazy"><div class="card-preview" aria-hidden="true"></div>
                                    <div class="card-overlay"><div class="card-badges"><span><?= $index === 0 ? 'Nuevo episodio' : 'Recién agregado' ?></span><?php if ($index === 1): ?><span class="rank-badge">#1 en <?= e($category) ?></span><?php endif; ?></div><div class="card-actions"><button type="button" class="round-button card-play" aria-label="Reproducir">▶</button><button type="button" class="round-button card-list" aria-label="Añadir a Mi lista">＋</button><button type="button" class="round-button card-like" aria-label="Me gusta">♡</button><button type="button" class="round-button card-info" aria-label="Más información">⌄</button></div><h3><?= e($item['title']) ?></h3><p><span class="match">97% para ti</span><span>HD</span><span>2025</span></p><div class="progress-track"><span style="width: <?= $index === 0 ? '42' : '0' ?>%"></span></div></div>
                                </article>
                            <?php endforeach; ?>
                        </div>
                        <button class="row-arrow row-arrow-right" type="button" aria-label="Siguiente">›</button>
                    </div>
                </section>
            <?php endforeach; ?>
        </div>
    </main>

    <footer class="site-footer"><p>¿Preguntas? Visita nuestro centro de ayuda.</p><div class="footer-links"><a href="#faq">Preguntas frecuentes</a><a href="#help">Centro de ayuda</a><a href="#terms">Términos de uso</a><a href="#privacy">Privacidad</a><a href="#cookies">Preferencias de cookies</a></div><p class="copyright">© 2026 Angel Netflix</p></footer>
    <div class="detail-modal" id="detail-modal" aria-hidden="true"><div class="modal-panel"><button class="modal-close" type="button" aria-label="Cerrar">×</button><div class="modal-image" id="modal-image"></div><div class="modal-body"><p class="modal-kicker">ANGEL NETFLIX</p><h2 id="modal-title"></h2><p class="hero-meta"><strong>98% para ti</strong><span>2025</span><span>16+</span><span>HD</span></p><p id="modal-description"></p><button class="remember-button" id="modal-play" type="button"><span class="button-icon">▶</span> Reproducir</button></div></div></div>
    <div class="video-modal" id="video-modal" aria-hidden="true"><div class="video-panel"><button class="modal-close" type="button" aria-label="Cerrar">×</button><iframe id="video-frame" title="Reproductor" allow="autoplay; fullscreen" allowfullscreen></iframe></div></div>
    <script>window.ANGEL_CATALOG = <?= json_encode($catalogJson, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>; window.ANGEL_BANNERS = <?= json_encode($data['banners'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;</script><script src="<?= e($baseUrl) ?>/assets/js/app.js"></script>
</body>
</html>
