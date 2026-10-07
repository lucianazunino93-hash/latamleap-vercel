# Consultas del sitio

El formulario público envía nombre, email, teléfono opcional, solución, proyecto e idioma a `POST /api/leads`. La función usa la integración Resend de Vercel para avisar a `hola@latamleap.com`, desde `consultas@latamleap.com`. Responder al aviso dirige la respuesta al email del cliente.

`RESEND_API_KEY` y `RESEND_EMAIL_DOMAIN` son variables exclusivamente del servidor. El dominio debe estar verificado en Resend. No se necesita activar la recepción de correo en Resend ni cambiar los MX de la casilla existente.

La confirmación aparece únicamente cuando Resend acepta el mensaje y devuelve su identificador. Si falla, se mantienen los datos para reintentar y se ofrece WhatsApp. Una aceptación del proveedor no garantiza entrega en la bandeja: revisar el estado en Resend Emails ante rebotes.

Se validan tamaño, campos, origen y formato en el servidor. Hay un campo trampa para bots, un límite de cinco intentos por minuto por IP y por instancia, y una clave de idempotencia para que un reintento idéntico no duplique correos. El límite no es global entre instancias; ante abuso sostenido, sumar una regla de rate limit en Vercel Firewall.

No se guardan leads en una base de datos ni se suscriben clientes a marketing. Los datos se conservan en el correo y en los registros de entrega del proveedor. La política de privacidad informa la transmisión a Resend.

Pruebas: `node --test server/leads.test.mjs`, `npx tsc --noEmit -p tsconfig.app.json` y `npm run build`.
