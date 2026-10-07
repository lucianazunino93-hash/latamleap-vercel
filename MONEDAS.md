# Precios por moneda

Argentina: ARS 349.000 / 789.000 / 1.299.000 y cuidado mensual ARS 49.000.
Internacional: USD 349 / 789 / 1.299 y cuidado mensual USD 49.

Son precios fijos, definidos en `shared/catalog.json` y `shared/care.json`; no se calculan con un tipo de cambio. `shared/pricing.mjs` comparte su lectura y formato.

La función `/api/market` sugiere ARS para Argentina y USD para otros países mediante el encabezado de país suministrado por Vercel. Si falta el país o falla la petición, se usa ARS y el selector sigue disponible. La respuesta es privada y no se almacena en caché. La detección no bloquea la carga inicial.

La elección manual se guarda en `latamleap.currency` y tiene prioridad sobre la detección, incluida una respuesta tardía. Idioma y moneda son independientes. El selector está disponible en escritorio y móvil.

Las tarjetas, cuidado mensual, preguntas frecuentes y páginas de servicio usan la misma moneda. Las consultas por WhatsApp y los correos de leads incluyen la moneda elegida. El correo acepta solo ARS y USD; consultas de clientes antiguos sin moneda mantienen ARS.

Las páginas prerenderizadas incluyen comparaciones desplegables con ambas tarifas y datos estructurados con ofertas ARS y USD. No se usa geolocalización para ocultar contenido a buscadores.

El checkout anterior continúa exclusivamente en ARS; si se visita con USD se ofrece coordinar la contratación. Esta actualización no habilita una pasarela internacional ni débitos de cuidado mensual.

Pruebas: precios de catálogo, países AR/CO/US, caché de geolocalización, detección, persistencia, prioridad de elección manual, fallo de detección, validación de moneda en correo y coherencia del HTML/SEO para 20 rutas.
