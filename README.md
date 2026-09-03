# RankeaPro — Guía de instalación

Sitio estático (HTML/CSS/JS) + Supabase (cuentas de clientes, órdenes, reportes y evidencias).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Página pública (servicios, casos de éxito, contacto) |
| `cuenta.html` | Login / registro de clientes |
| `panel.html` | Panel del cliente: sus órdenes, gráficas y reportes |
| `admin.html` | Panel administrador: crear órdenes, actualizar progreso, publicar reportes con capturas |
| `reset.html` | Restablecer contraseña |
| `config.js` | **Pega aquí la URL y clave de Supabase** |
| `data.js` | Contacto, contadores del hero y casos de éxito públicos |
| `supabase/schema.sql` | Tablas, seguridad y bucket de archivos |

## Paso 1 — Supabase (5 minutos)

1. Entra en https://supabase.com → **New project** (elige región *East US*).
2. Menú **SQL Editor** → **New query** → pega todo el contenido de `supabase/schema.sql` → **Run**.
3. Menú **Project Settings → API**: copia **Project URL** y **anon public** key y pégalas en `config.js`.
4. Menú **Authentication → URL Configuration**: en *Site URL* pon la URL de tu sitio (ej. `https://rankeapro.com`) y agrega `https://rankeapro.com/reset.html` en *Redirect URLs*.
5. (Opcional) **Authentication → Providers → Email**: desactiva *Confirm email* si quieres que los clientes entren sin confirmar el correo.

## Paso 2 — Subir el sitio

Vercel: arrastra la carpeta en https://vercel.com/new (o `vercel deploy`). También funciona en Netlify, Hostinger, cPanel o cualquier hosting estático.

## Paso 3 — Hacerte administrador

1. Abre tu sitio → **mi cuenta** → **Crear cuenta** con tu correo.
2. En Supabase → SQL Editor ejecuta:
   ```sql
   update public.profiles set role = 'admin' where email = 'TU-CORREO@ejemplo.com';
   ```
3. Entra a `https://tu-sitio/admin.html`.

## Flujo de trabajo diario

1. **Admin → + nueva orden**: pones código (ej. `RP-2409-014`), servicio, meta, fechas. Guardas.
2. Le envías el código al cliente por WhatsApp.
3. El cliente crea su cuenta en el sitio y vincula el código → ve su orden.
4. Cada vez que avanzas: **editar orden** → progreso, actual, agregar punto al historial. El cliente lo ve al instante.
5. **Reportes → publicar**: título, texto y capturas (Analytics, Instagram Insights, rankings). Quedan visibles en el panel del cliente.

Link directo para un cliente: `https://tu-sitio/panel.html?orden=RP-2409-014`

## Seguridad

- Cada cliente solo ve sus órdenes y reportes (Row Level Security en Postgres).
- Solo el rol `admin` puede crear/editar órdenes, reportes y subir archivos.
- La clave *anon* de `config.js` es pública por diseño; la seguridad está en las políticas del SQL.
