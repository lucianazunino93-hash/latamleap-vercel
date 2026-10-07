import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createSeoModel, getServiceCopy } from '../shared/seo-model.mjs';
const read = async file => JSON.parse(await fs.readFile(`shared/${file}.json`, 'utf8'));
const [seo, catalog, english, servicePages] = await Promise.all(['seo', 'catalog', 'en', 'service-pages'].map(read));
const model = createSeoModel({ seo, catalog, english, servicePages });
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
  assert.equal(graph.find(item => item['@type'] === 'Organization').telephone, '+54 9 351 208 5644');
  for (const [lang, url] of Object.entries(model.alternates(route))) assert.equal(document.querySelector(`link[hreflang="${lang}"]`).href, url);
  for (const service of graph.filter(item => item['@type'] === 'Service')) {
    const plan = catalog.find(item => service['@id'].includes(servicePages.find(entry => entry.id === item.id).path));
    assert.equal(service.offers.find(offer => offer.priceCurrency === 'ARS').lowPrice, plan.price);
    assert.equal(service.offers.find(offer => offer.priceCurrency === 'USD').lowPrice, plan.priceUSD);
    assert.ok(document.body.textContent.includes('USD'), `${route}: international price visible in comparison`);
  }
  assert.ok(!html.includes('storage.googleapis.com/gpt-engineer-file-uploads'));
  assert.ok(!document.body.textContent.includes('{price}'), `${route}: expanded prices`);
  console.log(`${route}: OK`);
}
for (const service of servicePages) {
  const plan = catalog.find(item => item.id === service.id);
  const updated = { ...plan, price: 123456 };
  assert.ok(getServiceCopy(service, updated, 'es').questions[0][1].includes('123.456'), 'Questions use the current catalog price');
}
const notFound = new JSDOM(await fs.readFile('dist/404.html', 'utf8')).window.document;
assert.equal(notFound.querySelector('meta[name="robots"]').content, 'noindex,follow');
console.log('Sitemap, HTML, language alternates, live catalog prices and structured data verified.');
