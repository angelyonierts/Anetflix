<?php
$appName = $config['app_name'];
$baseUrl = $config['base_url'];
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Iniciar sesión | <?= e($appName) ?></title><link rel="icon" href="<?= e($baseUrl) ?>/imagenes/Login.jpg" type="image/jpeg"><link rel="stylesheet" href="<?= e($baseUrl) ?>/assets/css/app.css">
</head>
<body class="auth-page">
    <div class="auth-backdrop"></div>
    <header class="auth-header"><a class="netflix-logo" href="<?= e($baseUrl) ?>/login.php" aria-label="Angel Netflix"><span>N</span><b>ANGEL NETFLIX</b></a></header>
    <main class="auth-main"><form class="login-card" method="post" novalidate><h1>Iniciar sesión</h1>
        <?php if ($errors): ?><div class="form-alert" role="alert"><?= e(implode(' ', $errors)) ?></div><?php endif; ?>
        <label class="field"><span>Correo electrónico</span><input type="email" name="email" value="<?= e($email) ?>" placeholder="Correo electrónico" autocomplete="email" required autofocus></label>
        <label class="field"><span>Contraseña</span><input type="password" name="password" placeholder="Contraseña" autocomplete="current-password" minlength="6" required></label>
        <button class="primary-button" type="submit">Iniciar sesión</button>
        <div class="login-options"><label><input type="checkbox" name="remember"> <span>Recuérdame</span></label><a href="#help">¿Necesitas ayuda?</a></div>
        <p class="new-user">¿Primera vez en Angel Netflix? <a href="#signup">Suscríbete ahora.</a></p><p class="captcha-copy">Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.</p>
    </form></main>
    <footer class="auth-footer"><p>¿Preguntas? Llama al 800-000-0000</p><div class="footer-links"><a href="#faq">Preguntas frecuentes</a><a href="#terms">Términos de uso</a><a href="#privacy">Privacidad</a><a href="#cookies">Preferencias de cookies</a></div><button class="language-button" type="button">Español ▾</button></footer>
</body>
</html>
