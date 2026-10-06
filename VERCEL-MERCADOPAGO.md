# Activar la versión en GitHub y Vercel

No hace falta cambiar de plataforma. El sitio sigue siendo React/Vite y Vercel ejecuta el checkout del lado del servidor. Lovable puede seguir editando el frontend, siempre que preserve el catálogo, la función API, el prerender y esta configuración.

## Configuración

1. Incorporar esta carpeta al repositorio que ya está conectado a Vercel. La raíz del proyecto debe contener `package.json`, `api/`, `server/`, `shared/` y `vercel.json`.
2. En Vercel, mantener Vite como framework, `npm run build` como compilación y `dist` como salida. La compilación genera HTML de cada página pública.
3. Crear la aplicación Checkout Pro en **Tus integraciones** de Mercado Pago. Consultar los requisitos de la cuenta que muestra el panel.
4. En Vercel → Project Settings → Environment Variables, agregar `MP_ACCESS_TOKEN` como secreto del servidor. No usar prefijo `VITE_`. Para pruebas, configurarlo solo en Preview con credenciales del entorno de prueba; nunca habilitar cobros reales por defecto en previews.
5. Agregar `SITE_URL` con la URL HTTPS exacta del despliegue correspondiente, sin barra final. Para producción: `https://www.latamleap.com`. En un preview debe coincidir con su dominio para que los retornos y la validación de origen funcionen.
6. Volver a desplegar después de modificar variables. Probar los tres paquetes y los resultados aprobado, pendiente y rechazado. Las pruebas incluidas usan un proveedor simulado y no cobran dinero.
7. Una vez verificado, configurar el token real únicamente en Production y volver a desplegar.

La función `api/checkout.js` procesa `/api/checkout`; `vercel.json` incluye el catálogo de precios en el paquete del servidor. Las rutas de compra y retorno usan el HTML principal; las rutas públicas conservan el HTML generado para SEO. Verificar que todas abran al ingresar su URL directamente.

No subir `.env` ni compartir credenciales en el chat. No hace falta un VPS ni ejecutar `start:api` en Vercel; ese comando sirve para desarrollo local u otros hosts.

## Operación inicial

Antes de empezar cada proyecto, verificar el pago aprobado en Mercado Pago y la identidad del comprador. La página de retorno no confirma el estado del pago. No hay entrega automática, webhook, base de pedidos ni reembolsos automáticos todavía.

Configurar protección y límites de solicitudes para `/api/checkout` en Vercel antes de abrir ventas. Confirmar datos fiscales del proveedor, facturación, correo, WhatsApp y proceso de cancelaciones.

Para una siguiente etapa: base persistente de pedidos, webhook con firma verificada, conciliación mediante API, notificación de compra y formulario de onboarding. El token del proveedor y los precios seguirán en el servidor.

Documentación oficial:
- [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Funciones Node.js](https://vercel.com/docs/functions/runtimes/node-js)
- [Archivos en funciones](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions)
- [Mercado Pago: primeros pasos](https://www.mercadopago.com.ar/developers/es/docs/getting-started)
