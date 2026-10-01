<?php
declare(strict_types=1);

return [
    'app_name' => 'Angel Netflix',
    'base_url' => rtrim((string) (getenv('APP_URL') ?: '/netflix/public'), '/'),
    'db' => [
        'host' => getenv('DB_HOST') ?: '127.0.0.1',
        'port' => getenv('DB_PORT') ?: '3306',
        'name' => getenv('DB_NAME') ?: 'angel_netflix',
        'user' => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASSWORD') ?: '',
        'charset' => 'utf8mb4',
    ],
];
