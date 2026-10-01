<?php
declare(strict_types=1);

$config = require __DIR__ . '/../config/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Auth.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../models/Catalog.php';
require_once __DIR__ . '/../models/Watchlist.php';
require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/HomeController.php';

Auth::start();

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
