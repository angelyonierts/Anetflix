# Angel Netflix: estructura nueva

La aplicación fue reorganizada con una arquitectura MVC ligera en PHP 8+, PDO, sesiones nativas, MySQL y JavaScript/CSS sin framework pesado.

## 1. Árbol del proyecto

```text
netflix/
├── public/                         Única raíz pública del sitio
│   ├── index.php                   Front controller protegido
│   ├── login.php                   Pantalla y endpoint de login
│   ├── logout.php                  Cierre de sesión
│   ├── watchlist.php               Endpoint para Mi lista
│   ├── .htaccess                   Índice y headers básicos
│   └── assets/
│       ├── css/app.css             Diseño Netflix, login y responsive
│       └── js/app.js               Carruseles, modales y header dinámico
├── app/
│   ├── config/config.php           Configuración de aplicación y MySQL
│   ├── core/
│   │   ├── bootstrap.php           Carga de dependencias y helpers
│   │   ├── Database.php             Conexión PDO
│   │   └── Auth.php                 Sesiones, usuario y protección de rutas
│   ├── controllers/
│   │   ├── AuthController.php       Validación y autenticación
│   │   └── HomeController.php       Preparación del catálogo
│   ├── models/
│   │   ├── User.php                 Consulta de usuarios
│   │   ├── Catalog.php              Consulta y búsqueda de contenido
│   │   └── Watchlist.php            Mi lista por usuario
│   └── views/
│       ├── auth/login.php           Interfaz del login
│       └── home/index.php            Home Netflix y modales
├── database/
│   ├── schema.sql                   Tablas y datos iniciales mínimos
│   └── seeds.sql                    Catálogo original completo
├── imagenes/                        Recursos locales existentes
├── .env.example                     Variables de configuración
└── ESTRUCTURA.md                    Este documento
```

La copia anterior `php/netflix/` y los archivos monolíticos antiguos quedaron fuera de la arquitectura nueva. La URL principal es:

```text
http://localhost/netflix/public/login.php
```

## 2. Flujo de una visita

```text
Navegador
   |
   v
public/login.php
   |
   ├── bootstrap.php carga configuración, sesión y clases
   ├── AuthController valida correo y contraseña
   ├── User consulta MySQL con PDO
   ├── password_verify comprueba el hash
   └── Auth crea la sesión y redirige a public/index.php

public/index.php
   |
   ├── Auth::requireLogin protege la ruta
   ├── Catalog consulta categorías y media
   ├── HomeController agrupa el catálogo
   └── views/home/index.php renderiza la interfaz
```

Si no existe una sesión válida, la home siempre redirige a `login.php`.

## 3. Capa pública: `public/`

### `public/login.php`

Muestra el formulario de inicio de sesión y recibe el `POST`. Valida que:

- El correo tenga formato válido.
- La contraseña tenga al menos seis caracteres.
- El usuario exista.
- La contraseña coincida con `password_hash`.

### `public/index.php`

Es el punto de entrada de la home. No contiene el catálogo ni el HTML completo: coordina el núcleo, crea los modelos/controladores y carga la vista.

### `public/logout.php`

Elimina la sesión, regenera el estado de la cookie y redirige al login.

### `public/assets/`

Contiene solamente archivos que el navegador puede cargar directamente. Esto evita exponer `app/`, configuración o credenciales.

## 4. Núcleo de la aplicación: `app/core/`

### `bootstrap.php`

Carga configuración, modelos, controladores y la función `e()`, usada para escapar salida HTML con `htmlspecialchars`.

### `Database.php`

Crea una única conexión PDO con:

- `PDO::ERRMODE_EXCEPTION`.
- Consultas preparadas.
- Resultados asociativos.
- Codificación `utf8mb4`.

### `Auth.php`

Gestiona:

- Inicio seguro de sesión.
- Regeneración del ID después de login.
- Usuario actual.
- Comprobación de autenticación.
- Logout.
- Protección de rutas.

## 5. Modelos y controladores

### `models/User.php`

Busca usuarios por correo con una consulta preparada. Las contraseñas nunca se comparan como texto plano; se validan con `password_verify`.

### `models/Catalog.php`

Lee contenido desde `media` unido con `categories`. La búsqueda revisa título, descripción y género.

### `controllers/AuthController.php`

Recibe datos del formulario, valida la entrada y ejecuta el login.

### `controllers/HomeController.php`

Convierte los resultados planos de MySQL en filas agrupadas por categoría para la vista.

## 6. Home estilo Netflix

La vista `app/views/home/index.php` incluye:

- Header transparente que se vuelve negro al hacer scroll.
- Logo Angel Netflix.
- Navegación principal.
- Buscador expandible.
- Campana y avatar de perfil.
- Hero con imagen, metadatos, sinopsis y botones.
- Filas horizontales por categoría.
- Flechas de navegación.
- Tarjetas con expansión al pasar el cursor.
- Badges de coincidencia y calidad HD.
- Modal de información ampliada.
- Modal de reproducción con iframe.
- Footer tipo Netflix.

El archivo `public/assets/js/app.js` controla la interacción sin depender de jQuery:

- Header al hacer scroll.
- Apertura y cierre de modales.
- Reproducción de videos.
- Navegación horizontal de filas.
- Acceso por teclado en tarjetas.
- Respeto de `prefers-reduced-motion`.

El botón `+` de cada tarjeta llama a `public/watchlist.php` mediante `fetch`. El endpoint valida la sesión y alterna el registro del usuario en la tabla `watchlist`.

## 7. Login

La pantalla `app/views/auth/login.php` contiene:

- Fondo con imagen y overlay oscuro.
- Logo rojo.
- Tarjeta semitransparente.
- Correo electrónico y contraseña.
- Validación HTML5 y backend.
- Botón rojo `#e50914`.
- Checkbox “Recuérdame”.
- Enlaces de ayuda, registro, términos y privacidad.
- Footer legal.

La sesión utiliza cookies `HttpOnly`, `SameSite=Lax` y activa `Secure` cuando el sitio funciona sobre HTTPS.

## 8. Base de datos

Importa `database/schema.sql` desde phpMyAdmin. El esquema crea la base `angel_netflix` y estas tablas:

```text
users
├── id
├── email
├── password_hash
├── name
├── created_at
├── last_login
└── remember_token

categories
├── id
└── name

media
├── id
├── title
├── image
├── description
├── video_url
├── category_id
└── created_at

watchlist
├── user_id
├── media_id
└── created_at
```

Relación:

```text
categories 1 ---- muchos media
users      1 ---- muchos watchlist
media      1 ---- muchos watchlist
```

El usuario demo definido en el seed es:

```text
Correo:      demo@angelnetflix.test
Contraseña:  password
```

Cambia esta contraseña antes de usar la aplicación fuera de desarrollo.

## 9. Configuración y ejecución

1. Inicia Apache y MySQL en XAMPP.
2. Importa `database/schema.sql` en phpMyAdmin.
3. Copia `.env.example` como `.env` si vas a personalizar variables. En esta versión PHP también acepta los valores predeterminados de XAMPP.
4. Abre:

```text
http://localhost/netflix/public/login.php
```

Configuración predeterminada:

```text
Host:     127.0.0.1
Puerto:   3306
Base:     angel_netflix
Usuario:  root
Clave:    vacía
```

## 10. Agregar contenido

Inserta una categoría y después un registro en `media`:

```sql
INSERT INTO categories (name) VALUES ('Ciencia ficción');

INSERT INTO media (title, image, description, video_url, category_id)
VALUES (
    'Nueva película',
    'https://ejemplo.com/imagen.jpg',
    'Descripción del contenido.',
    'https://www.youtube.com/embed/VIDEO_ID',
    (SELECT id FROM categories WHERE name = 'Ciencia ficción')
);
```

La home lo mostrará automáticamente agrupado en una nueva fila.

## 11. Decisiones técnicas

- Se usa PHP nativo para conservar compatibilidad con XAMPP.
- Se separan acceso público, lógica, modelos y vistas para evitar archivos monolíticos.
- Se usa PDO y consultas preparadas contra inyección SQL.
- Se usa `htmlspecialchars` al renderizar datos.
- El catálogo completo se carga desde `database/seeds.sql`; así el contenido no queda hardcodeado en las vistas.
- No se agrega React, Vite ni Tailwind porque esta aplicación no necesita un build step para lograr el aspecto solicitado.
- Las imágenes externas de TMDB y YouTube siguen siendo URLs remotas; las imágenes locales siguen en `imagenes/` para conservar los recursos existentes.
