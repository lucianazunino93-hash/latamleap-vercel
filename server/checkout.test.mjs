import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCheckoutServer, createCheckoutHandler } from './checkout.mjs';
async function run(options,fn){const server=createCheckoutServer(options);await new Promise(r=>server.listen(0,'127.0.0.1',r));try{await fn(`http://127.0.0.1:${server.address().port}`);}finally{await new Promise(r=>server.close(r));}}
test('fails closed without credentials',()=>run({token:''},async url=>{assert.equal((await fetch(url+'/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,503);}));
test('ignores browser prices and uses ARS catalog',()=>run({token:'TEST-example',fetcher:async(_url,options)=>{const p=JSON.parse(options.body);assert.equal(p.items[0].unit_price,349000);assert.equal(p.items[0].currency_id,'ARS');return {ok:true,json:async()=>({sandbox_init_point:'https://sandbox.mercadopago.com.ar/checkout/test'})};}},async url=>{const r=await fetch(url+'/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({planId:'landing',email:'client@example.com',price:1})});assert.equal(r.status,200);assert.match((await r.json()).url,/sandbox/);}));
test('rejects unknown plans and foreign origins',()=>run({token:'TEST-example',fetcher:()=>{throw Error('must not call');}},async url=>{assert.equal((await fetch(url+'/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({planId:'fake',email:'client@example.com'})})).status,400);assert.equal((await fetch(url+'/api/checkout',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://other.example'},body:'{}'})).status,403);}));
test('supports Vercel parsed request bodies',async()=>{
 let status, payload;
 const handler=createCheckoutHandler({token:'TEST-example',fetcher:async(_url,options)=>{assert.equal(JSON.parse(options.body).items[0].unit_price,1299000);return {ok:true,json:async()=>({sandbox_init_point:'https://sandbox.mercadopago.com.ar/checkout/test'})};}});
 await handler({url:'/api/checkout',method:'POST',headers:{'content-type':'application/json'},body:{planId:'tienda',email:'test@example.com'}},{writeHead(code){status=code;},end(value){payload=JSON.parse(value);}});
 assert.equal(status,200);assert.match(payload.url,/sandbox/);
});
test('rejects null body and handles provider failure',async()=>{
 let status;
 const handler=createCheckoutHandler({token:'TEST-example',fetcher:async()=>({ok:false})});
 const response={writeHead(code){status=code;},end(){}};
 await handler({url:'/api/checkout',method:'POST',headers:{'content-type':'application/json'},body:null},response);assert.equal(status,400);
 await handler({url:'/api/checkout',method:'POST',headers:{'content-type':'application/json'},body:{planId:'landing',email:'test@example.com'}},response);assert.equal(status,502);
});
test('care selection records future service without charging monthly fees',async()=>{
 let status;
 const handler=createCheckoutHandler({token:'TEST-example',fetcher:async(_url,options)=>{
  const preference=JSON.parse(options.body);
  assert.equal(preference.items.length,1);
  assert.equal(preference.items[0].unit_price,789000);
  assert.equal(preference.metadata.service_mode,'care');
  assert.equal(preference.metadata.plan_id,'sitio');
  assert.match(preference.items[0].title,/Web profesional/);
  return {ok:true,json:async()=>({sandbox_init_point:'https://sandbox.mercadopago.com.ar/checkout/test'})};
 }});
 await handler({url:'/api/checkout',method:'POST',headers:{'content-type':'application/json'},body:{planId:'sitio',email:'test@example.com',serviceMode:'care',price:1}},{writeHead(code){status=code;},end(){}});
 assert.equal(status,200);
});
test('rejects invalid care mode before calling provider',async()=>{
 let status;
 const handler=createCheckoutHandler({token:'TEST-example',fetcher:()=>{throw Error('must not call');}});
 await handler({url:'/api/checkout',method:'POST',headers:{'content-type':'application/json'},body:{planId:'landing',email:'test@example.com',serviceMode:'free'}},{writeHead(code){status=code;},end(){}});
 assert.equal(status,400);
});
