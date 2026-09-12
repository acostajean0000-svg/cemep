# farahrd.com — sitio estático para Vercel

Rediseño del sitio de **Farah Restaurant** (antes en GoDaddy Website Builder), en HTML + CSS
puro, sin build ni dependencias. Se despliega tal cual en Vercel.

## Estructura

```
/
├── index.html                       → https://farahrd.com/
├── menu-san-isidro.html             → /menu-san-isidro
├── menu-plaza-duarte.html           → /menu-plaza-duarte
├── restaurante-santo-domingo.html   → /restaurante-santo-domingo
├── restaurante-san-isidro.html      → /restaurante-san-isidro
├── restaurante-plaza-duarte.html    → /restaurante-plaza-duarte
├── comida-tipica-dominicana.html    → /comida-tipica-dominicana
├── eventos.html                     → /eventos  (salones, catering, decoración)
├── 404.html
├── vercel.json                      (cleanUrls, redirects, headers)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css                (toda la hoja de estilos)
    ├── js/main.js                   (menú móvil + navegación de secciones)
    └── img/                         (⚠️ pendiente: ver "Imágenes")
```

Las URLs se mantienen **idénticas** a las de GoDaddy, así que no se pierde el
posicionamiento en Google. `cleanUrls: true` en `vercel.json` hace que
`menu-san-isidro.html` se sirva como `/menu-san-isidro`.

## Cómo editar el contenido

Todo el texto está en los `.html`. No hay plantillas ni componentes: abres el
archivo, buscas el texto y lo cambias.

- **Teléfono / WhatsApp:** busca `18098567886` (aparece en `tel:`, `wa.me` y el pie).
- **Horario:** busca `8:30 am`.
- **Enlaces de reserva:** busca `reservaya.com.do`.
- **Colores y tipografías:** están en las variables `:root` al inicio de `assets/css/style.css`.
- **Cabecera y pie:** están repetidos en cada página (es HTML plano). Si cambias
  algo del menú de navegación, cámbialo en los 5 archivos.

### Añadir platos al menú

En `menu-san-isidro.html` / `menu-plaza-duarte.html`, dentro de cada
`<div class="menu-list">`, copia este bloque por cada plato:

```html
<article class="menu-item">
  <p class="menu-item__row">
    <span>Churrasco</span>
    <span class="dots"></span>
    <span class="menu-item__price">RD$ 850</span>
  </p>
  <p class="menu-item__desc">Corte a la parrilla con guarnición criolla.</p>
</article>
```

Para agrupar por categoría dentro de una sección, envuelve varios `.menu-item`
en un `<div class="menu-group"><h3>Entradas</h3><div class="menu-list">…</div></div>`.

Cuando una sección ya tenga sus platos, **borra el bloque `<div class="menu-empty">`**
correspondiente.

## Estado

- ✅ **Imágenes rescatadas del CDN de GoDaddy** y guardadas en `assets/img/`
  (optimizadas a WebP). El HTML ya apunta a rutas locales — el sitio ya no
  depende de GoDaddy para las imágenes.
- ✅ **Menús pasados a HTML** (texto real) en `menu-san-isidro.html` y
  `menu-plaza-duarte.html`. Ya no dependen de los PDFs de GoDaddy.

## ⚠️ Pendientes

### 1. Revisar precios de los menús

El contenido de los menús se extrajo automáticamente de los PDFs, así que
**algunos precios pueden traer errores de lectura**. Conviene repasarlos contra
la carta real. Todos los precios están en pesos dominicanos (RD$).
Para editar un plato, busca su nombre en el `.html` y cambia el número dentro de
`<span class="menu-item__price">`.

Puntos concretos detectados que conviene mirar primero:

- **Ron Brugal:** Triple Reserva (RD$350) sale más barata que Doble Reserva (RD$395).
- **Whiskey:** Chivas 18 (RD$820) sale más barato que Chivas 12 (RD$995), y
  Blue Label aparece en RD$900.
- **Guarniciones de "Raíces dominicanas"** (arroz blanco, tostones, yuca frita,
  papas salteadas, puré de yuca, maduro, vegetales, aguacate): no tienen precio.
- **Marquesa de Chocolate y Pistachos:** RD$450 en San Isidro, RD$550 en Plaza Duarte.

### 2. Reseñas reales

La sección de reseñas del inicio está montada pero vacía a propósito (hay una
plantilla en un comentario dentro de `index.html`). Falta pegar reseñas
verdaderas de clientes.

### 3. Activar Vercel Web Analytics

El script ya está en las páginas. Falta encenderlo en el panel:
proyecto → pestaña **Analytics** → Enable.

## ✅ Ya resuelto

- Imágenes locales en `assets/img/` (incluye `favicon.png` y `og-farah.jpg`).
- Dirección de San Isidro con Plus Code **F5P7+H4**, Santo Domingo Este, en las
  páginas y en los datos estructurados.
- Páginas propias por local: `/restaurante-san-isidro` y `/restaurante-plaza-duarte`.

## Despliegue en Vercel

1. Sube esta carpeta a un repositorio de GitHub (o arrástrala en vercel.com/new).
2. En Vercel: **New Project** → importar el repo.
   - Framework Preset: **Other**
   - Build Command: *(vacío)*
   - Output Directory: *(vacío / raíz)*
3. Deploy. Vercel te da una URL `*.vercel.app` para revisar antes de tocar el dominio.

## Cambio de DNS desde GoDaddy

Cuando la versión en `*.vercel.app` esté aprobada:

1. En Vercel → Project → **Settings → Domains** → añade `farahrd.com` y `www.farahrd.com`.
2. En GoDaddy → **Mis productos → DNS de farahrd.com**:
   - Registro **A** de `@` → `76.76.21.21`
   - Registro **CNAME** de `www` → `cname.vercel-dns.com`
   - Borra los registros A/CNAME viejos que apuntaban al Website Builder.
3. Espera la propagación (de minutos a unas horas) y confirma en Vercel que el
   dominio queda en *Valid Configuration*. El SSL lo emite Vercel automáticamente.
4. **No canceles el plan de GoDaddy hasta haber resuelto los pendientes 1 y 2**
   (imágenes y PDFs), porque están alojados ahí.
5. Después: en Google Search Console, envía `https://farahrd.com/sitemap.xml`.

## Notas técnicas

- Sin dependencias ni build. Tipografías desde Google Fonts.
- Datos estructurados `Restaurant` (schema.org) en `index.html` para los dos locales.
- Sin banner de cookies: el sitio ya no carga analítica ni cookies de terceros.
  Si añades Google Analytics o Meta Pixel, habrá que volver a poner el aviso.
- Botón flotante de WhatsApp en todas las páginas.

## Nivel enterprise (actualización)

- **Animaciones**: aparición al hacer scroll (reveal), header que se encoge, contadores,
  botón "volver arriba", lightbox en la galería, acordeón en FAQ. Respeta
  `prefers-reduced-motion`. Con un guard `.js`: si el JS no carga, todo el contenido
  se ve igual (no queda invisible).
- **Secciones nuevas en el inicio**: banda de credibilidad, "Nuestra historia",
  galería con lightbox, "Eventos & catering", FAQ y reseñas.
- **Reseñas**: la sección está lista para pegar reseñas REALES de clientes
  (hay una plantilla en un comentario dentro de `index.html`). No se incluyeron
  reseñas inventadas.
- **SEO**: datos estructurados ampliados (Restaurant + FAQPage), OG image
  (`assets/img/og-farah.jpg`), favicon propio, `preload` del hero, `width/height`
  en imágenes, `twitter:card`.
- **Analítica**: se incluyó el script de **Vercel Web Analytics** (sin cookies).
  Para que empiece a medir, actívalo en el panel de Vercel: proyecto → pestaña
  **Analytics** → Enable. No necesita aviso de cookies.

## Página de Eventos (/eventos)

Tres bloques en una sola página: **alquiler de salones**, **catering** (Farah +
Raíces Dominicanas) y **planes de decoración**.

- **Capacidades** (salón principal 70, privado 20, terraza 60): están en la banda
  de `.stats` y en los `.venue__cap` de cada tarjeta. Si cambia una, cámbiala en
  los dos sitios.
- **Precios de catering** (RD$1,150 / RD$1,595): en los bloques `.combo` y también
  en el JSON-LD del final de la página.
- **Precios de decoración** (RD$15,000 / 20,000 / 28,000 / 35,000): en los bloques
  `.plan` y también en el JSON-LD.
- **Catálogo de catering**: el texto se transcribió del catálogo de Raíces
  Dominicanas — conviene repasarlo. Está en el bloque `.cat-cols`.
- **Desayuno buffet** (RD$995 pp, impuestos no incluidos, mínimo 15 personas) y
  **workshops** (Pintura en lienzo, The Perfect Host, Cake Decor — 15 personas
  cada uno): secciones `#desayuno-buffet` y `#workshops`. Los workshops no traen
  precio en el arte, así que en la web solo se listan con su cupo.
- **Fotos**: `assets/img/evento-*.webp`. Las de salón privado y terraza traen el
  rótulo original encima ("Salon privado · 20 personas"), que se repite con la
  etiqueta dorada de la tarjeta. Si consigues las fotos sin rótulo, solo hay que
  reemplazar el `.webp` con el mismo nombre.

## Página de Ofertas (/ofertas)

Calendario semanal + las promos recurrentes. Es la página que más se actualiza:
cuando cambie el calendario del mes, se editan los bloques `.week__row`.

- **Calendario**: bloques `.week__row` en `#calendario`.
- **Menú de almuerzo**: `.menu-item` en `#almuerzo` (mismo formato que las páginas
  de menú).
- **Happy hour / karaoke**: listas en `.drink-cols` y los precios en `.promo-price`.
- **Flyers**: `assets/promos/oferta-*.webp`, en la galería con lightbox de
  `#promos`. Al cambiar la promo del mes, se reemplaza el `.webp` con el mismo
  nombre. Van en `assets/promos/` a propósito: esa carpeta tiene caché de 1 hora
  en `vercel.json`, mientras que `assets/img/` está cacheada un año. Si pones un
  flyer nuevo dentro de `assets/img/`, los visitantes seguirán viendo el viejo.

Ojo con tres datos que vienen de los flyers:

- **Pechuga grill** aparece sin precio en el arte, así que en la web dice
  "Consultar". Falta el número real.
- El flyer de brunch dice **"8:30 - 12 AM"**; en la web se escribió 8:30 am a
  12:00 m (mediodía), que es lo que tiene sentido con el horario del local.
- Los flyers de karaoke dicen **"7PM - 12PM"**; en la web se escribió
  7:00 pm – 12:00 am (medianoche).
