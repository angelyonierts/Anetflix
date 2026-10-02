<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/core/bootstrap.php';
header('Content-Type: application/json; charset=utf-8');

if (!Auth::check() || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(401);
    echo json_encode(['ok' => false, 'message' => 'No autorizado']);
    exit;
}

try {
    $mediaId = filter_input(INPUT_POST, 'media_id', FILTER_VALIDATE_INT);
    if (!$mediaId) {
        throw new InvalidArgumentException('Contenido no valido.');
    }
    $db = Database::connection($config);
    $saved = (new Watchlist($db))->toggle((int) Auth::user()['id'], $mediaId);
    echo json_encode(['ok' => true, 'saved' => $saved]);
} catch (Throwable $exception) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'No se pudo actualizar Mi lista.']);
}
