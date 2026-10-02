# Anetflix (PHP + MySQL)

Este repositorio ya está preparado para desplegarse en hosting con **PHP 8+** y **MySQL/MariaDB**.  
No está pensado para GitHub Pages (GitHub Pages no ejecuta PHP).

## Punto de entrada correcto

- Entrada pública de la app: `netflix/public/login.php`
- Inicio raíz del repositorio: `index.php` (redirige a `netflix/public/login.php`)

## Estructura relevante

```text
netflix/
├── app/                 # lógica PHP (no pública)
├── database/
│   ├── schema.sql       # esquema + datos mínimos
│   └── seeds.sql        # catálogo adicional (opcional)
└── public/              # document root recomendado
    ├── index.php
    ├── login.php
    ├── logout.php
    ├── watchlist.php
    ├── assets/
    └── imagenes/
```

## Configuración de entorno

1. Copia `netflix/.env.example` a `netflix/.env`.
2. Completa tus valores:

```env
APP_URL=
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=angel_netflix
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

### Valor de `APP_URL`

- Si el dominio apunta directamente a `netflix/public` (document root): `APP_URL=`
- Si la app queda bajo subcarpeta visible, por ejemplo `/netflix/public`: `APP_URL=/netflix/public`

## Base de datos

1. Crea una base de datos MySQL/MariaDB.
2. Importa `netflix/database/schema.sql`.
3. (Opcional) Importa `netflix/database/seeds.sql` para más contenido.

Usuario demo del esquema:

- Email: `demo@angelnetflix.test`
- Password: `password`

## Despliegue en hosting PHP/MySQL

### Opción A (recomendada): document root = `netflix/public`

- Sube todo el repositorio (o al menos la carpeta `netflix` completa).
- En el panel del hosting, configura el dominio para que apunte a `netflix/public`.

### Opción B: `public_html` tradicional

- Sube **el contenido de `netflix/public/`** dentro de `public_html/`.
- Sube `netflix/app` en un nivel superior de `public_html` (por ejemplo `../app` respecto a `public_html`).
- Sube `netflix/.env` al mismo nivel que `app`.
- Sube `netflix/database` fuera de la carpeta pública (recomendado).

> Las rutas de la app están preparadas para que `login.php` e `index.php` funcionen correctamente en ambos escenarios.

## Verificación rápida después del despliegue

1. Abre `https://tu-dominio/.../login.php` (según tu `APP_URL`).
2. Inicia sesión con el usuario demo.
3. Verifica que carga la home y que los recursos (`assets`, `imagenes`) se muestran bien.

Si al abrir una URL ves código PHP en texto, el servidor no está ejecutando PHP correctamente o el archivo no está siendo servido con extensión `.php`.