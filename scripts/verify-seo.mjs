import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createSeoModel, getServiceCopy } from '../shared/seo-model.mjs';
import { isLaunchActive, sellingAmounts } from '../shared/geo.mjs';
const read = async file => JSON.parse(await fs.readFile(`shared/${file}.json`, 'utf8'));
const [seo, catalog, english, servicePages, offers] = await Promise.all(['seo', 'catalog', 'en', 'service-pages', 'offers'].map(read));
const model = createSeoModel({ seo, catalog, english, servicePages, offers });
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
  const types = value => Array.isArray(value) ? value : [value];
  assert.ok(graph.some(item => types(item['@type']).includes('ProfessionalService') && types(item['@type']).includes('LocalBusiness')), `${route}: local business`);
  assert.ok(document.querySelector('meta[property="og:image"]').content.endsWith('/og-latamleap.png'), `${route}: share image`);
  assert.equal(document.querySelector('meta[name="twitter:card"]').content, 'summary_large_image');
  assert.equal(document.querySelector('meta[name="google-site-verification"]'), null, `${route}: verification token stays empty`);
  assert.equal(document.getElementById('meta-pixel'), null, `${route}: pixel stays disabled`);
  for (const service of graph.filter(item => item['@type'] === 'Service')) {
    if (String(service['@id']).includes('#offer-')) {
      const tier = offers.tiers.find(item => service['@id'].endsWith(`offer-${item.id}`));
      assert.ok(tier, service['@id']);
      const active = isLaunchActive(offers.launch);
      assert.equal(service.offers.find(offer => offer.name === 'United States').price, sellingAmounts(tier.us, active).setup);
      assert.equal(service.offers.find(offer => offer.name === 'Argentina').price, sellingAmounts(tier.ar, active).setup);
      assert.ok(document.body.textContent.includes('USD'), `${route}: US price visible`);
      continue;
    }
    const plan = catalog.find(item => service['@id'].includes(servicePages.find(entry => entry.id === item.id).path));
    assert.equal(service.offers.find(offer => offer.priceCurrency === 'ARS').lowPrice, plan.price);
    assert.equal(service.offers.find(offer => offer.priceCurrency === 'USD').lowPrice, plan.priceUSD);
    assert.ok(document.body.textContent.includes('USD'), `${route}: international price visible in comparison`);
  }
  if (route === '/' || route === '/services' || route === '/en' || route === '/en/services') {
    assert.equal(graph.filter(item => item['@type'] === 'Service' && String(item['@id']).includes('#offer-')).length, 3, `${route}: three offers`);
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
