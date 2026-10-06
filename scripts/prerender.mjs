import { createServer } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
const seo = JSON.parse(await fs.readFile('shared/seo.json','utf8'));
const routes = seo.pages;
const english=JSON.parse(await fs.readFile("shared/en.json","utf8"));
const catalog = JSON.parse(await fs.readFile('shared/catalog.json','utf8'));
const vite=await createServer({server:{middlewareMode:true},appType:'custom',mode:'production'});
try {
 const {render}=await vite.ssrLoadModule('/src/entry-server.tsx');
 const template=await fs.readFile('dist/index.html','utf8');
 for(const [route,[title,description]] of Object.entries(routes)){
  let html=template.replace('<div id="root"></div>',`<div id="root">${render(route)}</div>`).replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/(<meta name="description" content=")[^"]*/,(_match,prefix)=>prefix+description).replace(/(<meta property="og:title" content=")[^"]*/,(_match,prefix)=>prefix+title).replace(/(<meta property="og:description" content=")[^"]*/,(_match,prefix)=>prefix+description).replace(/(<meta name="twitter:title" content=")[^"]*/,(_match,prefix)=>prefix+title).replace(/(<meta name="twitter:description" content=")[^"]*/,(_match,prefix)=>prefix+description).replace(/(<link rel="canonical" href=")[^"]*/,`$1https://www.latamleap.com${route}`).replace(/(<meta property="og:url" content=")[^"]*/,`$1https://www.latamleap.com${route}`);
  const isEnglish=route === "/en" || route.startsWith("/en/");
  const baseRoute=isEnglish ? route.slice(3) || "/" : route;
  const englishRoute=`/en${baseRoute === "/" ? "" : baseRoute}`;
  html=html.replace('<html lang="es">', `<html lang="${isEnglish ? "en" : "es"}">`).replace('content="es_AR"', `content="${isEnglish ? "en_US" : "es_AR"}"`);
  html=html.replace("</head>", `<link rel="alternate" hreflang="es" href="${seo.origin}${baseRoute}"/><link rel="alternate" hreflang="en" href="${seo.origin}${englishRoute}"/><link rel="alternate" hreflang="x-default" href="${seo.origin}${baseRoute}"/></head>`);
  html=html.replace(/(<meta name="robots" content=")[^"]*/, `$1${['/privacy-policy','/terms-of-service','/data-deletion'].includes(baseRoute)?'noindex,follow':'index,follow'}`);
  if(baseRoute==='/' || baseRoute==='/services') {
   const schema={'@context':'https://schema.org','@type':'ItemList',itemListElement:catalog.map((plan,i)=>({'@type':'ListItem',position:i+1,item:{'@type':'Service',name:isEnglish ? english[plan.name] || plan.name : plan.name,description:isEnglish ? english[plan.description] || plan.description : plan.description,provider:{'@type':'Organization',name:'Latam Leap',url:seo.origin},areaServed:{'@type':'Country',name:'Argentina'}}}))};
   html=html.replace('</head>', '<script id="page-schema" type="application/ld+json">'+JSON.stringify(schema).replaceAll('<','\\u003c')+'</script></head>');
  }
  const folder=path.join('dist',route);await fs.mkdir(folder,{recursive:true});await fs.writeFile(path.join(folder,'index.html'),html);
 }
 const urls=Object.keys(routes).filter(r=>!["/privacy-policy","/terms-of-service","/data-deletion"].some(p=>r.endsWith(p))).map(r=>`<url><loc>${seo.origin}${r}</loc></url>`).join("");
 await fs.writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
 console.log(`HTML generado para ${Object.keys(routes).length} páginas.`);
} finally {await vite.close();}

