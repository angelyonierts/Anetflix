<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/core/bootstrap.php';

$loginUrl = $config['base_url'] . '/login.php';
Auth::requireLogin($loginUrl);

try {
    $database = Database::connection($config);
    $controller = new HomeController(new Catalog($database));
    $data = $controller->index(trim((string) ($_GET['search'] ?? '')));
} catch (Throwable $exception) {
    $data = ['query' => '', 'categories' => [], 'featured' => [
        'title' => 'Configura tu catalogo',
        'description' => 'Importa database/schema.sql para cargar tus peliculas.',
        'image' => 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
        'video_url' => '#',
    ]];
}

require __DIR__ . '/../app/views/home/index.php';
