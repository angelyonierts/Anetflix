# Anetflix

## Versión estática (GitHub Pages)

Este repositorio incluye una demo estática de Anetflix en la raíz del proyecto:

- `index.html` → login demo
- `home.html` → catálogo/home demo
- `assets/css`, `assets/js`, `assets/images` → recursos estáticos

> **Importante:** esta versión es solo demostración de frontend. No usa PHP ni MySQL. El inicio de sesión y "Mi lista" se guardan localmente en `localStorage` del navegador.

## Ejecutar localmente

Como es un sitio estático, puedes abrir `index.html` directamente o usar un servidor local simple.

Ejemplo con Python:

```bash
python -m http.server 8080
```

Luego abre:

```text
http://localhost:8080/
```

## Publicar con GitHub Pages

1. Sube los cambios a la rama principal.
2. En GitHub, ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama (`main`) y carpeta (`/ (root)`).
5. Guarda los cambios y espera el despliegue.

La URL final será similar a:

```text
https://angelyonierts.github.io/Anetflix/
```

## Implementación PHP original

La implementación PHP original se mantiene en `netflix/` como referencia/legado. Para autenticación real y base de datos real, sigue siendo necesario ejecutar esa parte con backend PHP + MySQL.
