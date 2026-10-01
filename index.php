<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/core/bootstrap.php';

if (Auth::check()) {
    header('Location: ' . $config['base_url'] . '/index.php');
    exit;
}

$errors = [];
$email = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $database = Database::connection($config);
        $result = (new AuthController(new User($database), $config['base_url'] . '/index.php'))->login($_POST);
        $errors = $result['errors'];
        $email = $result['email'];
    } catch (Throwable $exception) {
        $errors[] = 'No se pudo conectar con el servicio. Importa la base de datos e intenta de nuevo.';
    }
}

require __DIR__ . '/../app/views/auth/login.php';
