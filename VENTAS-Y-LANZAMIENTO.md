# Latam Leap: sitio para vender

El hosting confirmado es Vercel con GitHub. Para activar el checkout, seguir VERCEL-MERCADOPAGO.md; el servicio Node independiente descrito abajo es una alternativa para desarrollo local u otros hosts.

## Oferta aplicada

Argentina, pesos argentinos. Los precios publicados son **desde**:

| Paquete | Alcance base | Precio ARS |
| --- | --- | ---: |
| Landing | Una página, hasta 6 secciones | $349.000 |
| Sitio institucional | Hasta 5 páginas | $789.000 |
| Tienda online | Hasta 30 productos, carrito y pagos | $1.299.000 |

El checkout cobra el paquete base completo una sola vez. Los proyectos que excedan ese alcance se cotizan antes de comprar. No hay suscripción automática. Diseño adaptado a la marca y mensaje comercial están incluidos; identidad completa, marketing mensual y automatizaciones se presupuestan aparte. Dominio, hosting, plataformas, licencias y publicidad no están incluidos.

El catálogo compartido `shared/catalog.json` determina el precio tanto en el sitio como en el servidor. No se acepta un importe enviado por el navegador.

## Referencias de competencia consultadas el 4/10/2026

Son precios publicados por cada proveedor, con alcances diferentes; no son una media del mercado ni una garantía de rentabilidad.

| Proveedor | Landing | Sitio | Tienda | Fuente |
| --- | ---: | ---: | ---: | --- |
| Vant | $150.000 | $300.000 | $450.000 | https://vantweb.com/precios/ |
| Estudio Pixel Web | $290.000 | $470.000 | $690.000 | https://www.estudiopixelweb.com/ |
| Xulum | — | — | $1.190.000 (hasta 80 productos) | https://www.xulum.com/diseno-web/tienda-online |

Los valores finales fueron establecidos por el propietario. Sitio y tienda quedan por encima de las ofertas económicas comparadas. Conviene sostenerlos con proceso, entregables, calidad de diseño y proyectos comprobables, y revisar horas, costos y margen antes de ampliar lo incluido.

## Cambios realizados

- Mensaje centrado en landings, sitios, tiendas y soluciones a medida.
- Paquetes con alcance, precios de partida, exclusiones y compra del alcance base.
- Consulta guiada que prepara un mensaje de WhatsApp. No promete recepción hasta que la persona lo envía.
- Eliminación del webhook de prueba y de los mensajes de éxito falsos del formulario.
- Página de proyectos basada en los tres proyectos existentes, sin testimonios ni cifras de ejemplo.
- Títulos y descripciones por ruta, canonical, Open Graph, idioma español, sitemap y robots.
- Generación de HTML para las siete páginas públicas al compilar. El contenido existe antes de ejecutar JavaScript.
- Términos y privacidad en español adaptados al recorrido actual.
- Wordmark de texto: el ZIP referenciaba un logo a través de una ruta de Lovable que no existe en una publicación independiente. Recuperar el original antes de sustituir el wordmark.

## Mercado Pago: implementación y activación

Está implementada la creación de preferencias de Checkout Pro en un servicio Node separado. **Todavía no hay credenciales configuradas, cobros reales probados ni publicación en producción.** La compra muestra un error claro si el servidor no está disponible.

1. En Mercado Pago Developers, crear una aplicación desde **Tus integraciones**, con Checkout Pro y el sitio público. Revisar los requisitos de la cuenta de vendedor que indique Mercado Pago.
2. Obtener las credenciales del entorno de prueba. Configurar el Access Token únicamente en el servidor, como `MP_ACCESS_TOKEN`. Nunca colocarlo en código del frontend, variables `VITE_`, Git ni mensajes.
3. Copiar `.env.example` a `.env`, completar el token y ejecutar `npm run start:api`. La API escucha en `127.0.0.1:3001`.
4. En desarrollo, Vite reenvía `/api` a ese puerto. Para producción, configurar el proveedor o proxy HTTPS para servir `dist/` y reenviar `/api/checkout` al servicio. Usar `NODE_ENV=production` y `SITE_URL=https://www.latamleap.com`.
5. Probar aprobación, pendiente, rechazo y retorno con usuarios de prueba, conforme a la documentación del entorno de la aplicación. El código usa `sandbox_init_point` con tokens `TEST-`; validar el tipo de credencial entregado por Mercado Pago y el entorno antes de activar producción.
6. Solo después de comprobar esos recorridos, configurar el token de producción y verificar una operación autorizada.

**Verificación de pago actual: manual.** La página de retorno nunca declara un pago aprobado a partir de parámetros de URL. Verificar en la cuenta de Mercado Pago que la operación esté aprobada, el importe y el comprador antes de comenzar. Todavía no hay base de pedidos, conciliación, webhook, email automático ni reembolsos automáticos. No se expone un receptor de notificaciones que acepte pagos sin validarlos. Para automatizar la entrega, incorporar persistencia de pedidos, webhook autenticado y consulta del pago a la API.

Configurar limitación de solicitudes en el proxy de `/api/checkout`, supervisión del proceso, acceso restringido a credenciales y facturación desde el sistema del vendedor. Los pagos permanecen bajo el procesamiento y las condiciones de Mercado Pago.

Fuentes oficiales:
- https://www.mercadopago.com.ar/developers/es/docs/getting-started
- https://www.mercadopago.com.ar/developers/es/reference/online-payments/checkout-pro-preferences/overview
- https://www.mercadopago.com.ar/developers/es/docs/checkout-pro-orders/notifications?scope=prod

## Publicación y SEO

`npm install`, `npm run build`. Publicar **todo `dist/`**, incluyendo sus carpetas con HTML. El hosting debe servir cada `ruta/index.html` y usar fallback al HTML principal para `/comprar/*` y `/pago`. Mantener redirección de `latamleap.com` a `www.latamleap.com`, HTTPS y URL canónica única. No se ha modificado el DNS ni el sitio público.

Registrar y verificar la propiedad en Google Search Console, enviar `https://www.latamleap.com/sitemap.xml` y revisar indexación. No se agregaron identificadores inventados de Analytics ni píxeles. Para medición real, configurar la cuenta del propietario y los eventos de consulta, selección de paquete e inicio de checkout, respetando los permisos que correspondan.

Antes de activar ventas, completar la identidad del proveedor (nombre fiscal, CUIT y domicilio de contacto), confirmar acceso al correo y al WhatsApp publicados, aprobar las condiciones comerciales y definir la operación de cancelaciones. Revisar el mecanismo de arrepentimiento que corresponda a la venta y al destinatario; aún no existe un flujo automático de solicitudes. Referencia: https://www.argentina.gob.ar/normativa/nacional/disposici%C3%B3n-954-2025-417152/texto

La fábrica de contenido queda para la siguiente etapa: primero publicar la oferta y medir consultas; luego crear contenidos por servicio y problema real, evitando páginas genéricas que repitan palabras clave.

## Validación

- Compilación de producción y HTML de siete rutas.
- Comprobación TypeScript.
- Pruebas del checkout con proveedor simulado: falta de token, precio de servidor, moneda ARS, plan inválido y origen ajeno.
- Revisión visual del sitio y detalle de compra en móvil.

Estas pruebas no reemplazan una compra real en el entorno de Mercado Pago, pendiente de credenciales y hosting.

