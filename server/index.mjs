import { createCheckoutServer } from './checkout.mjs';
createCheckoutServer().listen(Number(process.env.PORT || 3001),'127.0.0.1',()=>console.log('Checkout API disponible en 127.0.0.1:3001'));
