/* =====================================================================
   RankeaPro — DATOS DEL SITIO
   Edita este archivo para actualizar órdenes y casos de éxito.
   Los datos de ejemplo son ILUSTRATIVOS: reemplázalos con tus resultados reales.
   ===================================================================== */

// Contacto
const CONTACTO = {
  whatsapp: "18095550000",          // solo dígitos, con código de país
  email: "hola@rankeapro.com",
  instagram: "https://instagram.com/rankeapro"
};

// Contadores globales del hero
const STATS = {
  visitas: 4280000,   // visitas entregadas
  seguidores: 312000, // seguidores generados
  clientes: 148,      // clientes atendidos
  paises: 6
};

// CASOS DE ÉXITO — antes / después
const CASOS = [
  {
    titulo: "E-commerce de moda",
    sector: "Retail online · RD",
    servicio: "Tráfico web + SEO",
    duracion: "90 días",
    metrica: "Visitas mensuales",
    antes: 2400,
    despues: 38700,
    extras: [["Ventas online", "+214%"], ["Palabras clave top 10", "3 → 41"], ["Tasa de rebote", "68% → 41%"]],
    serie: [2400, 5100, 9800, 16400, 24900, 31200, 38700],
    resumen: "Auditoría técnica, contenido optimizado y campaña de tráfico segmentada. El sitio pasó de invisible a primera página en 41 búsquedas comerciales."
  },
  {
    titulo: "Restaurante gourmet",
    sector: "Gastronomía · Santo Domingo",
    servicio: "Instagram + TikTok",
    duracion: "60 días",
    metrica: "Seguidores Instagram",
    antes: 1850,
    despues: 24300,
    extras: [["Alcance mensual", "+1,180%"], ["Reservas vía DM", "+96%"], ["Engagement", "1.4% → 6.8%"]],
    serie: [1850, 4200, 8100, 12600, 17900, 21400, 24300],
    resumen: "Estrategia de Reels, colaboraciones con creadores locales y calendario de contenido. La cuenta se convirtió en el principal canal de reservas."
  },
  {
    titulo: "Clínica dental",
    sector: "Salud · Santiago",
    servicio: "SEO local",
    duracion: "75 días",
    metrica: "Llamadas desde Google",
    antes: 14,
    despues: 137,
    extras: [["Posición Google Maps", "#27 → #2"], ["Reseñas", "9 → 84"], ["Nuevos pacientes/mes", "+310%"]],
    serie: [14, 22, 39, 61, 88, 112, 137],
    resumen: "Optimización de Google Business Profile, citas locales y campaña de reseñas. Hoy aparece en el Top 3 de Maps para sus 12 palabras clave principales."
  },
  {
    titulo: "Canal de YouTube",
    sector: "Educación financiera · Miami",
    servicio: "Crecimiento YouTube",
    duracion: "120 días",
    metrica: "Suscriptores",
    antes: 3200,
    despues: 47800,
    extras: [["Horas de visualización", "+890%"], ["Monetización", "Activada"], ["Vistas/mes", "18K → 610K"]],
    serie: [3200, 7900, 14100, 22600, 31400, 40100, 47800],
    resumen: "Optimización de títulos, miniaturas y Shorts diarios. El canal alcanzó los requisitos de monetización en la semana 7."
  }
];
