import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createSeoModel } from '../shared/seo-model.mjs';
const read = async file => JSON.parse(await fs.readFile(`shared/${file}.json`, 'utf8'));
const [seo, catalog, english, servicePages] = await Promise.all(['seo', 'catalog', 'en', 'service-pages'].map(read));
const model = createSeoModel({ seo, catalog, english, servicePages });
const results = await Promise.allSettled(Object.keys(model.pages).map(async route => {
  const response = await fetch(`${model.origin}${route}`, { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${route}: HTTP status`);
  const document = new JSDOM(await response.text()).window.document;
  assert.equal(document.title, model.pages[route][0], `${route}: published title`);
  assert.equal(document.querySelector('link[rel="canonical"]').href, `${model.origin}${route}`);
  assert.ok(document.getElementById('page-schema'), `${route}: schema`);
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: H1`);
  return `${route}: OK`;
}));
let failed = false;
for (const result of results) { if (result.status === 'fulfilled') console.log(result.value); else { failed = true; console.error(result.reason.message); } }
if (failed) process.exitCode = 1;
for (const route of ['/pago', '/api/leads', '/comprar/landing']) {
  const response = await fetch(`${model.origin}${route}`, { signal: AbortSignal.timeout(20000) });
  assert.ok(response.headers.get('x-robots-tag')?.includes('noindex'), `${route}: private pages excluded`);
}
const image = await fetch(`${model.origin}/og-latamleap.png`);
assert.equal(image.status, 200); assert.ok(image.headers.get('content-type').includes('image/png'));
const sitemap = await fetch(`${model.origin}/sitemap.xml`);
assert.equal(sitemap.status, 200); assert.ok((await sitemap.text()).includes('/services/online-stores'));
const missing = await fetch(`${model.origin}/pagina-inexistente-verificacion-seo`);
assert.equal(missing.status, 404, 'Unknown URL must return a real 404');
console.log('Production pages, headers, social image, sitemap and HTTP 404 verified.');
