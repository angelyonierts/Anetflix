<?php
declare(strict_types=1);

require_once __DIR__ . '/../app/core/bootstrap.php';
Auth::logout();
header('Location: ' . $config['base_url'] . '/login.php');
exit;
