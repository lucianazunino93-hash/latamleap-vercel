# Optimización de rendimiento — 7 octubre 2026

Informe móvil proporcionado por la titular: rendimiento 86, accesibilidad 94, buenas prácticas 100 y SEO 100. FCP 3 s, LCP 3 s, Speed Index 4,6 s, TBT 10 ms y CLS 0. Es una medición de laboratorio con 4G lenta; el informe no tiene datos de usuarios reales.

## Cambios

- Fuentes variables WOFF2 propias, precargadas desde el mismo dominio. Se elimina la hoja externa de Google Fonts; `font-display: optional` evita esperar por las fuentes y evita cambios tardíos de tipografía. Una primera visita en conexión muy lenta puede usar la fuente de respaldo. Se incluyen licencias OFL.
- Fotografías de proyectos en WebP, con variantes de 600 y 1200 px seleccionadas mediante `srcset` y `sizes`, carga diferida y decodificación asíncrona. Se conserva el espacio reservado de las tarjetas.
- Se eliminan los proveedores globales de consultas, tooltips y notificaciones que ninguna página utiliza. Los formularios ya tienen su propio estado y feedback.
- Se elimina Framer Motion del hero y de las secciones visibles: los elementos tenían `initial=false` y estado final sin desplazamiento. Las animaciones decorativas CSS existentes permanecen y respetan movimiento reducido.
- Separación del naranja de marca para fondos del naranja oscuro para texto sobre superficies claras; textos de botones oscuros y texto secundario más legible. Los fondos oscuros mantienen texto naranja claro.
- Se agrega semántica de grupo a idioma y diagrama y de imagen a los iconos de TikTok aún sin vínculo, para que sus nombres accesibles sean válidos.

## Evidencia

Bundle JavaScript anterior: aproximadamente 546 kB, 175 kB gzip. Nuevo: 299,61 kB, 94,26 kB gzip; reducción aproximada de 45 % y 46 % respectivamente.

Imágenes originales de los tres proyectos: 294.571 bytes en total. Variantes para móvil: 44.462 bytes aproximadamente, reducción de 85 %. Variantes grandes: 121.114 bytes aproximadamente. La descarga exacta depende del ancho y densidad de pantalla.

Compilación, TypeScript y validaciones de SEO para 20 rutas pasan. ESLint conserva siete advertencias existentes en componentes UI, sin errores. No se modifica la API de leads ni la configuración del correo.

La nueva puntuación de PageSpeed y los tiempos FCP/LCP deben medirse después del despliegue. No se debe confundir una reducción de bytes con una mejora ya medida de la puntuación ni con posicionamiento garantizado.

## Próximos contenidos SEO/GEO

Casos reales con problema, solución, alcance y resultados comprobables; testimonios autorizados; respuestas a preguntas de compra y comparaciones útiles. El puntaje técnico SEO de 100 no mide la autoridad, relevancia comercial o posicionamiento. No se necesitan testimonios inventados, marcado especial para IA ni promesas de aparecer en respuestas generativas.
