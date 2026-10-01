<?php
declare(strict_types=1);

final class Catalog
{
    public function __construct(private PDO $db)
    {
    }

    public function all(): array
    {
        $statement = $this->db->query('SELECT m.id, m.title, m.image, m.description, m.video_url, c.name AS category FROM media m JOIN categories c ON c.id = m.category_id ORDER BY c.name, m.id');
        return $statement->fetchAll();
    }

    public function search(string $query): array
    {
        $statement = $this->db->prepare('SELECT m.id, m.title, m.image, m.description, m.video_url, c.name AS category FROM media m JOIN categories c ON c.id = m.category_id WHERE m.title LIKE :query OR m.description LIKE :query OR c.name LIKE :query ORDER BY m.id');
        $statement->execute(['query' => '%' . $query . '%']);
        return $statement->fetchAll();
    }
}
