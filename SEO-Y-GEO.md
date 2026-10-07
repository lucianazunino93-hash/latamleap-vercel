# SEO y visibilidad en respuestas de IA

## Implementado

- HTML prerenderizado para las páginas ES/EN: el contenido principal puede leerse sin ejecutar JavaScript.
- Páginas propias para landing pages, webs profesionales y tiendas online, con alcance, precios desde el catálogo, casos de uso y preguntas frecuentes visibles.
- Enlaces internos desde cada paquete, navegación entre servicios y acceso al formulario de consulta.
- Un modelo de metadatos y datos estructurados compartido por el build y la navegación React: Organization, WebSite, WebPage, Service, AggregateOffer y BreadcrumbList. No se inventan reseñas, resultados, direcciones ni estadísticas.
- Canonical, idioma, hreflang y sitemap con alternates bilingües. Solo se incluyen páginas indexables en el sitemap.
- Datos de contacto, país atendido, Instagram y moneda ARS consistentes.
- Imagen social propia, `og-latamleap.png`, de 1200 × 630 píxeles.
- `noindex` en páginas de contratación, retorno de pago, API y demo mediante cabeceras; páginas legales fuera del sitemap. `robots.txt` permite rastrear el contenido público.
- Página 404 estática marcada `noindex`.

## Verificación

`npm run build` y `node scripts/verify-seo.mjs` comprueban títulos, descripciones, una H1 por página, canonical, hreflang, JSON-LD, precios, sitemap y robots. TypeScript y ESLint verifican el código.

## Siguiente paso con las cuentas del negocio

1. Crear una propiedad de dominio `latamleap.com` en Google Search Console: https://search.google.com/search-console. Google entrega un TXT de verificación que debe agregarse al DNS. No reemplazar TXT existentes.
2. Enviar `https://www.latamleap.com/sitemap.xml` y revisar las URLs públicas mediante Inspección de URLs. Solicitar indexación de la home, servicios y tres páginas nuevas.
3. Agregar el sitio a Bing Webmaster Tools: https://www.bing.com/webmasters. Puede importarse desde Search Console cuando esté verificado. Enviar el mismo sitemap.
4. Revisar semanalmente páginas indexadas, impresiones, clics y consultas comerciales. En Bing, revisar AI Performance si está disponible en la cuenta. No confundir aceptación del sitemap con indexación efectiva.
5. Incorporar testimonios reales con autorización y casos de estudio con contexto, trabajo realizado y resultados verificables. Publicar nuevas páginas solo si aportan información propia; evitar duplicados por localidad.

## Alcance de GEO

La implementación facilita que buscadores y asistentes identifiquen la empresa, sus servicios, precios y condiciones. No garantiza posiciones, menciones ni citas. No hay una garantía de ranking asociada a `llms.txt`; la prioridad es contenido visible y útil, rastreo e indexación, enlaces y evidencia del trabajo.

Referencias oficiales:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
