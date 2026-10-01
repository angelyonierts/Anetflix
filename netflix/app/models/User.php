<?php
declare(strict_types=1);

final class User
{
    public function __construct(private PDO $db)
    {
    }

    public function findByEmail(string $email): ?array
    {
        $statement = $this->db->prepare('SELECT id, email, password_hash, name FROM users WHERE email = :email LIMIT 1');
        $statement->execute(['email' => strtolower(trim($email))]);
        $user = $statement->fetch();
        return $user ?: null;
    }
}
