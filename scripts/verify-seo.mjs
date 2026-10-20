import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createSeoModel } from '../shared/seo-model.mjs';
const read = async file => JSON.parse(await fs.readFile(`shared/${file}.json`, 'utf8'));
const [seo, catalog, english, servicePages, offers, decisions] = await Promise.all(['seo', 'catalog', 'en', 'service-pages', 'offers', 'decisions'].map(read));
const model = createSeoModel({ seo, catalog, english, servicePages, offers, contactPhone: decisions.contactPhone });
const forbiddenOnUs = ['497', 'primeros 5', 'first 5', 'first five', 'regularPrice', 'ficticio', 'Fictional', 'fictional', 'no tengo oficina', "don't have an office", 'sin reseñas inventadas', 'invented reviews', 'Argentina', 'Córdoba', 'Zunino', 'office there'];
const guarded = new Set(['/', '/en', '/about', '/en/about', '/case-studies', '/en/case-studies']);
const sitemap = new JSDOM(await fs.readFile('dist/sitemap.xml', 'utf8'), { contentType: 'application/xml' }).window.document;
assert.equal(sitemap.getElementsByTagName('url').length, Object.keys(model.pages).filter(model.isIndexable).length);
for (const [route, [title, description]] of Object.entries(model.pages)) {
  const html = await fs.readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8');
  const document = new JSDOM(html).window.document;
  for (const image of document.querySelectorAll('img')) {
    const urls = [image.getAttribute('src'), ...image.srcset.split(',').map(entry => entry.trim().split(/\s+/)[0])].filter(Boolean);
    for (const url of urls) {
      assert.ok(!url.startsWith('/src/'), `${route}: no development asset URL`);
      if (url.startsWith('/')) await fs.access(`dist${url}`);
    }
  }
  assert.equal(document.title, title, `${route}: title`);
  assert.equal(document.querySelector('meta[name="description"]').content, description, `${route}: description`);
  assert.equal(document.documentElement.lang, model.language(route));
  assert.equal(document.querySelector('link[rel="canonical"]').href, `${model.origin}${route}`);
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: one H1`);
  assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 1, `${route}: one graph`);
  assert.equal(document.querySelector('meta[name="robots"]').content.startsWith('index,'), model.isIndexable(route));
  const graph = JSON.parse(document.getElementById('page-schema').textContent)['@graph'];
  assert.equal(graph.find(item => item['@type'] === 'Organization').telephone, decisions.contactPhone);
  for (const [lang, url] of Object.entries(model.alternates(route))) assert.equal(document.querySelector(`link[hreflang="${lang}"]`).href, url);
  const types = value => Array.isArray(value) ? value : [value];
  assert.ok(graph.some(item => types(item['@type']).includes('ProfessionalService') && types(item['@type']).includes('LocalBusiness')), `${route}: local business`);
  assert.ok(document.querySelector('meta[property="og:image"]').content.endsWith('/og-latamleap.png'), `${route}: share image`);
  assert.equal(document.querySelector('meta[name="twitter:card"]').content, 'summary_large_image');
  assert.equal(document.querySelector('meta[name="google-site-verification"]'), null, `${route}: verification token stays empty`);
  assert.equal(document.getElementById('meta-pixel'), null, `${route}: pixel stays disabled`);
  const alt = document.querySelector('meta[property="og:image:alt"]').content;
  assert.match(alt, model.language(route) === 'es' ? /pedidos por WhatsApp/ : /job requests on WhatsApp/);
  assert.match(document.querySelector('meta[name="twitter:image:alt"]').content, model.language(route) === 'es' ? /pedidos por WhatsApp/ : /job requests on WhatsApp/);
  assert.equal(document.body.textContent.includes(decisions.contactPhone.replace(/\D/g, '')), false, `${route}: phone number stays out of visible text`);
  if (guarded.has(route)) {
    for (const phrase of forbiddenOnUs) assert.equal(html.includes(phrase), false, `${route}: forbidden ${phrase}`);
  }
  if (route === '/' || route === '/en') {
    const service = graph.find(item => item['@id'] === `${model.origin}/#offer-bilingual`);
    assert.equal(service.offers.find(offer => offer.price === offers.us.price).priceCurrency, 'USD');
    assert.equal(service.offers.find(offer => offer.priceSpecification).priceSpecification.price, offers.us.maintenance);
    assert.equal(service.offers.length, 2, `${route}: fixed price plus care`);
    assert.equal(graph.filter(item => item['@type'] === 'Service').length, 1, `${route}: one offer`);
    assert.ok(document.body.textContent.includes(`USD ${offers.us.price}`), `${route}: fixed price visible`);
    assert.equal(offers.us.regularPrice, undefined);
    for (const phrase of ['maqueta gratis', '48 horas', '48 hours', 'Quedan 5', 'spots left', 'cloudenergy', 'TikTok']) {
      assert.equal(html.toLowerCase().includes(phrase.toLowerCase()), false, `${route}: leftover ${phrase}`);
    }
    assert.equal(html.includes('line-through'), false, `${route}: strikethrough price`);
    assert.equal(document.getElementById('ga4-src'), null, `${route}: GA4 stays unloaded until consent`);
  }
  if (route === '/argentina') {
    const service = graph.find(item => item['@id'] === `${model.origin}/#offer-argentina`);
    assert.equal(service.offers.find(offer => offer.price === offers.ar.price).priceCurrency, 'ARS');
    assert.equal(html.includes('admin-rifa.latamleap.com'), false, 'rifa login stays unlinked');
    assert.ok(document.body.textContent.includes('ARS'), `${route}: peso price visible`);
  }
  assert.ok(!html.includes('storage.googleapis.com/gpt-engineer-file-uploads'));
  assert.ok(!document.body.textContent.includes('{price}'), `${route}: expanded prices`);
  console.log(`${route}: OK`);
}
assert.equal(servicePages.length, 0, 'retired service pages stay out of the catalog loop');
const notFound = new JSDOM(await fs.readFile('dist/404.html', 'utf8')).window.document;
assert.equal(notFound.querySelector('meta[name="robots"]').content, 'noindex,follow');
console.log('Sitemap, HTML, language alternates, live catalog prices and structured data verified.');
