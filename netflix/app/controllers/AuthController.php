<?php
declare(strict_types=1);

final class AuthController
{
    public function __construct(private User $users, private string $homeUrl)
    {
    }

    public function login(array $input): array
    {
        $email = strtolower(trim((string) ($input['email'] ?? '')));
        $password = (string) ($input['password'] ?? '');
        $errors = [];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Escribe un correo valido.';
        }
        if (strlen($password) < 6) {
            $errors[] = 'La contrasena debe tener al menos 6 caracteres.';
        }

        if (!$errors) {
            $user = $this->users->findByEmail($email);
            if (!$user || !password_verify($password, $user['password_hash'])) {
                $errors[] = 'El correo o la contrasena no son correctos.';
            } else {
                Auth::login($user);
                header('Location: ' . $this->homeUrl);
                exit;
            }
        }

        return ['errors' => $errors, 'email' => $email];
    }
}
