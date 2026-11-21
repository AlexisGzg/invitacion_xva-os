# Plantilla de invitación para XV años

Invitación web responsive para XV años creada con React, Vite, Tailwind CSS y Framer Motion. Incluye portada animada, cuenta regresiva, calendario, galería, lugares, itinerario, mesa de regalos, música y confirmación por WhatsApp.

Este repositorio es una plantilla: puede reutilizarse para otra celebración cambiando los textos, la fecha, las imágenes, los enlaces y el número de confirmación.

> El diseño actual muestra como ejemplo los datos de Johana Estefania Ojeda Gregorio.

## Vista previa

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite en la terminal, normalmente `http://localhost:5173`.

## Requisitos

- Node.js 20 o una versión compatible
- npm o Bun

También puedes utilizar Bun con el archivo `bun.lock` existente:

```bash
bun install
bun run dev
```

## Scripts

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el servidor local con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Previsualiza la compilación de producción |
| `npm run lint` | Ejecuta ESLint |

## Personalización rápida

La mayoría de los datos de ejemplo están en `src/App.jsx`.

### Nombre y fecha

Busca y reemplaza:

- `Johana Estefania`
- `Ojeda Gregorio`
- `Sábado, 26 de Diciembre de 2026`
- `Mis XV Años`
- El mensaje personal de la sección “Un Día Inolvidable”

### Cuenta regresiva y calendario

En `src/App.jsx`:

```js
const EVENT_DATE = new Date(2026, 11, 26, 14, 0, 0);
```

La fecha usa el formato de JavaScript `new Date(año, mes, día, hora, minutos, segundos)`. El mes es base cero: enero es `0`, diciembre es `11`.

También actualiza el calendario dentro de `EventCalendar`:

```js
const year = 2026;
const month = 11;
const eventDay = 26;
```

El texto visible del mes se encuentra en esta línea:

```jsx
<span className="calendar-month">Diciembre 2026</span>
```

### Confirmación por WhatsApp

Cambia el número y el mensaje predeterminado al inicio de `src/App.jsx`:

```js
const WHATSAPP_NUMBER = '525532307675';
const RSVP_MESSAGE = 'Hola, confirmo mi asistencia para los XV de Johana Estefania.';
```

`WHATSAPP_NUMBER` debe incluir únicamente dígitos y usar el formato internacional sin `+`, espacios ni guiones. Por ejemplo, un número mexicano quedaría como `5215512345678`.

### Lugares e itinerario

En `src/App.jsx` reemplaza:

- `Parroquia de San Lorenzo`
- `Recepción / Salón de Eventos`
- Los horarios `2:00 PM`, `4:00 PM`, `6:00 PM`, `8:00 PM` y `10:00 PM`
- Las etiquetas `Ceremonia Religiosa`, `Recepción`, `Cena`, `Vals Principal` y `Apertura de Pista`

Para cada ubicación cambia también su enlace de Google Maps:

```jsx
href="https://maps.app.goo.gl/..."
```

## Galería de fotos

Las imágenes principales están en `src/assets/img/` y se importan al inicio de `src/App.jsx`.

Los textos y archivos que aparecen en el carrusel se configuran con `GALLERY_SLIDES`:

```js
const GALLERY_SLIDES = [
  { title: 'Mis Recuerdos', subtitle: 'Un instante que vive para siempre', image: fotoPeque1 },
];
```

Para cambiar una fotografía:

1. Guarda la nueva imagen dentro de `src/assets/img/`.
2. Agrega su importación al inicio de `src/App.jsx`.
3. Usa ese import en `GALLERY_SLIDES`.

Formato recomendado:

- Fotos verticales u orientadas al retrato
- JPEG o WebP
- Optimizadas, idealmente entre 500 KB y 1.5 MB por imagen

## Música

La canción actual es `src/assets/cancion.mp3`.

Para cambiarla, reemplaza ese archivo conservando el mismo nombre o modifica al inicio de `src/App.jsx`:

```js
import audioSong from './assets/cancion.mp3';
```

La reproducción comienza después de abrir la invitación, cuando el navegador permite reproducir audio iniciado por una interacción del usuario.

## Imagen de portada y decoraciones

Los elementos visuales están en `src/assets/`.

| Elemento | Archivo principal |
| --- | --- |
| Sobre de portada | `sobre.jpg` |
| Corona | `coronaReal1.png` |
| Marco ovalado | `ovalMraco.png` |
| Imágenes del itinerario | `itinerario_1.png` a `itinerario_5.png` |
| Mesa de regalos | `extra_5.png` |
| Flores y mariposas | Archivos `flor*.png` y `mariposa*.png` |

Al reemplazar un archivo, conserva su nombre para que no sea necesario editar los imports. Si cambias el nombre o la ubicación, actualiza el import correspondiente en `src/App.jsx`.

Los PNG transparentes funcionan mejor para corona, flores, mariposas y iconos.

## Colores y estilos

Los colores principales están escritos directamente como clases de Tailwind en `src/App.jsx`, por ejemplo:

- Morado: `#b695c0`
- Morado oscuro: `#4a3e4d`
- Dorado: `#d4af37`
- Texto secundario: `#6b5b72`

También puedes revisar:

- `src/index.css`: estilos globales y variables
- `src/App.css`: estilos adicionales
- `tailwind.config.js`: configuración de Tailwind

## Producción

Compila el proyecto antes de publicar:

```bash
npm run build
npm run preview
```

El resultado listo para subir a un hosting está en la carpeta `dist/`.

Puede publicarse en Vercel, Netlify, GitHub Pages u otro alojamiento que sirva archivos estáticos. Para un dominio o subdirectorio personalizado, revisa la configuración `base` de `vite.config.js`.

En Vercel, `vercel.json` configura caché de un año para los archivos con nombre versionado que Vite genera en `dist/assets/`; el HTML se revalida para que cada publicación muestre la versión nueva.
