import { createServer } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createSeoModel, serializeSchema } from '../shared/seo-model.mjs';
const read = async file => JSON.parse(await fs.readFile(`shared/${file}.json`, 'utf8'));
const [seo, catalog, english, servicePages] = await Promise.all(['seo', 'catalog', 'en', 'service-pages'].map(read));
const model = createSeoModel({ seo, catalog, english, servicePages });
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const vite = await createServer({ server: { middlewareMode: true }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom', mode: 'production' });
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const template = await fs.readFile('dist/index.html', 'utf8');
  // Vite's SSR asset imports retain source URLs. Resolve them to the actual build files.
  const manifest = JSON.parse(await fs.readFile('dist/.vite/manifest.json', 'utf8'));
  const renderPage = route => Object.values(manifest).reduce((html, asset) =>
    asset.src ? html.replaceAll(`/${asset.src}`, `/${asset.file}`) : html, render(route));
  for (const [route, [title, description]] of Object.entries(model.pages)) {
    const language = model.language(route), url = `${model.origin}${route}`;
    let html = template.replace('<div id="root"></div>', `<div id="root">${renderPage(route)}</div>`).replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`).replace('<html lang="es">', `<html lang="${language}">`);
    const setMeta = (attribute, key, value) => {
      const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*"\\s*/?>`);
      const tag = `<meta ${attribute}="${key}" content="${escape(value)}" />`;
      html = pattern.test(html) ? html.replace(pattern, () => tag) : html.replace('</head>', `${tag}</head>`);
    };
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title); setMeta('property', 'og:description', description); setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', language === 'es' ? 'es_AR' : 'en_US');
    setMeta('property', 'og:image:alt', language === 'es' ? 'Latam Leap: soluciones digitales a medida para negocios en Argentina' : 'Latam Leap: custom digital solutions for businesses in Argentina');
    setMeta('name', 'twitter:title', title); setMeta('name', 'twitter:description', description);
    setMeta('name', 'robots', model.isIndexable(route) ? 'index,follow,max-image-preview:large' : 'noindex,follow');
    html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
    const links = Object.entries(model.alternates(route)).map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${href}" />`).join('');
    html = html.replace('</head>', `${links}<script id="page-schema" type="application/ld+json">${serializeSchema(model.schema(route))}</script></head>`);
    const folder = path.join('dist', route); await fs.mkdir(folder, { recursive: true }); await fs.writeFile(path.join(folder, 'index.html'), html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${Object.keys(model.pages).filter(model.isIndexable).map(route => `<url><loc>${model.origin}${route}</loc>${Object.entries(model.alternates(route)).map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`).join('')}</url>`).join('')}</urlset>`;
  await fs.writeFile('dist/sitemap.xml', sitemap);
  let notFound = template.replace('<div id="root"></div>', `<div id="root">${renderPage('/not-found')}</div>`).replace(/<title>.*?<\/title>/, '<title>Página no encontrada | Latam Leap</title>').replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex,follow" />').replace(/<link rel="canonical"[^>]*>/, '');
  await fs.writeFile('dist/404.html', notFound);
  console.log(`HTML generado para ${Object.keys(model.pages).length} páginas y una página 404.`);
} finally { await vite.close(); }
