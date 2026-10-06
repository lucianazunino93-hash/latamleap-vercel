import http from 'node:http';
import fs from 'node:fs';
const catalog = JSON.parse(fs.readFileSync(new URL('../shared/catalog.json', import.meta.url)));
export function createCheckoutHandler({ token = process.env.MP_ACCESS_TOKEN, origin = process.env.SITE_URL || 'https://www.latamleap.com', fetcher = fetch } = {}) {
 return async (req,res) => {
  const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  if(req.url !== '/api/checkout') return send(404,{error:'not_found'});
  if(req.method !== 'POST') return send(405,{error:'method_not_allowed'});
  const allowedOrigins = [origin];
  if (process.env.NODE_ENV !== 'production') allowedOrigins.push('http://localhost:8080','http://127.0.0.1:8080','http://127.0.0.1:8081');
  if(req.headers.origin && !allowedOrigins.includes(req.headers.origin)) return send(403,{error:'invalid_origin'});
  if(!req.headers['content-type']?.startsWith('application/json')) return send(415,{error:'json_required'});
  if(!token) return send(503,{error:'checkout_unavailable'});
  try {
   let data=req.body;
   if(data === undefined){let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>4096)return send(413,{error:'too_large'});}try{data=JSON.parse(body);}catch{return send(400,{error:'invalid_json'});}}
   else {if(Buffer.byteLength(JSON.stringify(data))>4096)return send(413,{error:'too_large'});if(typeof data==='string'){try{data=JSON.parse(data);}catch{return send(400,{error:'invalid_json'});}}}
   if(!data || typeof data !== 'object') return send(400,{error:'invalid_purchase'});
   const plan=catalog.find(p=>p.id===data.planId);
   const serviceMode = data.serviceMode ?? 'independent';
   if(!['independent','care'].includes(serviceMode)) return send(400,{error:'invalid_service_mode'});
   if(!plan || typeof data.email!=='string' || data.email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))return send(400,{error:'invalid_purchase'});
   if(new URL(origin).protocol!=='https:')return send(503,{error:'https_required'});
   const result=await fetcher('https://api.mercadopago.com/checkout/preferences',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(15000),body:JSON.stringify({items:[{id:plan.id,title:`Latam Leap · ${plan.name} · ${serviceMode === 'care' ? 'con cuidado mensual posterior' : 'entrega independiente'}`,quantity:1,currency_id:'ARS',unit_price:plan.price}],payer:{email:data.email},back_urls:{success:`${origin}/pago`,pending:`${origin}/pago`,failure:`${origin}/pago`},auto_return:'approved',metadata:{plan_id:plan.id,service_mode:serviceMode},expires:true,expiration_date_to:new Date(Date.now()+3600000).toISOString()})});
   if(!result.ok)return send(502,{error:'provider_unavailable'});
   const preference=await result.json();const url=token.startsWith('TEST-')?preference.sandbox_init_point:preference.init_point;
   if(!url)return send(502,{error:'provider_unavailable'});send(200,{url});
  }catch{send(502,{error:'checkout_unavailable'});}
 };
}
export function createCheckoutServer(options) { return http.createServer(createCheckoutHandler(options)); }
