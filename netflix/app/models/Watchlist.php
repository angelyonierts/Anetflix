<?php
declare(strict_types=1);

final class Watchlist
{
    public function __construct(private PDO $db)
    {
    }

    public function toggle(int $userId, int $mediaId): bool
    {
        $check = $this->db->prepare('SELECT 1 FROM watchlist WHERE user_id = :user_id AND media_id = :media_id');
        $check->execute(['user_id' => $userId, 'media_id' => $mediaId]);
        if ($check->fetchColumn()) {
            $delete = $this->db->prepare('DELETE FROM watchlist WHERE user_id = :user_id AND media_id = :media_id');
            $delete->execute(['user_id' => $userId, 'media_id' => $mediaId]);
            return false;
        }

        $insert = $this->db->prepare('INSERT INTO watchlist (user_id, media_id) VALUES (:user_id, :media_id)');
        $insert->execute(['user_id' => $userId, 'media_id' => $mediaId]);
        return true;
    }
}
