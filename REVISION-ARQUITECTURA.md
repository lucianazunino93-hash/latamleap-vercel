# Revisión de arquitectura — 5 de octubre de 2026

Revisión inicial del código local. No equivale a una auditoría completa de seguridad ni confirma que este código esté publicado.

## Conservar

- React y Vite son suficientes para este sitio comercial. No hay evidencia que justifique una migración de framework.
- El catálogo compartido mantiene los precios de la interfaz y del servidor en una misma fuente. El servidor ignora los precios enviados por el navegador.
- Las condiciones del cuidado mensual están centralizadas en shared/care.json.
- El checkout mantiene las credenciales privadas en el servidor y falla si no están configuradas.

## Consolidar antes de publicar

1. SEO: src/components/SEO.tsx y scripts/prerender.mjs mantienen mapas separados con títulos y descripciones diferentes. Extraer una configuración compartida de rutas y metadatos para que el HTML generado y la navegación usen los mismos datos. Las páginas de compra reciben inicialmente el HTML y metadatos de inicio por la reescritura; definir su noindex también en la respuesta inicial.
2. Renderizado: src/main.tsx monta con createRoot sobre HTML generado previamente. Revisar la compatibilidad del árbol y usar hidratación en páginas prerenderizadas, conservando montaje normal donde no exista HTML de la página. Verificar navegación, animaciones y formularios en navegador.
3. Oferta anterior: PlanesSection.tsx conserva precios/conversión de monedas del enfoque anterior y no aparece importado por el flujo actual. Inventariar los componentes sin uso y retirar únicamente los confirmados, evitando mantener dos propuestas en el repositorio.
4. Presentación: Purchase.tsx concentra formulario, petición, validación de redirección y textos en bloques extensos. Separar cliente de checkout, selector de servicio y resumen; reemplazar el precio fijo del mensaje de WhatsApp por care.price.
5. Tipos: tsconfig.app.json desactiva strict y noImplicitAny. Mejorar primero los límites del catálogo y del checkout; evaluar la activación gradual de comprobaciones estrictas con errores concretos, sin desactivar controles para ocultarlos.

## Antes de activar pagos reales

- Crear pedidos persistentes con identificador propio antes de enviar al proveedor y vincularlos a la preferencia.
- Implementar notificaciones verificadas y consultar el pago con credenciales del servidor. Comprobar pedido, moneda, importe y estado; procesar eventos duplicados sin repetir acciones.
- Mostrar el estado del pedido desde el servidor. La página de retorno actual exige verificación manual y no debe convertirse en confirmación usando parámetros de URL.
- Definir protección frente a abuso, reintentos y observabilidad del checkout. La comprobación de Origin no sustituye estos controles.
- Verificar origen permitido y URLs de retorno para producción y previews de Vercel; la configuración actual admite un origen principal.

## Orden de trabajo

Consolidar rutas/SEO y renderizado; limpiar módulos comerciales sin uso; separar checkout y tipos; comprobar el recorrido completo en preview; completar pedidos y verificación de pagos antes de habilitar cobros.

## Conexiones verificadas

GitHub permite consultar repositorios de lucianazunino93-hash. Vercel permite consultar el proyecto latamleap-vercel, con ambos dominios verificados y redirección del dominio raíz a www. El resultado disponible de Vercel no expone el enlace Git, por lo que todavía no se confirmó qué repositorio alimenta ese despliegue. No se publicó ningún cambio durante esta revisión.
