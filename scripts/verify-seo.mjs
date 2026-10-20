import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createSeoModel, organizationAreaServed } from '../shared/seo-model.mjs';
const read = async file => JSON.parse(await fs.readFile(`shared/${file}.json`, 'utf8'));
const [seo, catalog, english, servicePages, offers, decisions] = await Promise.all(['seo', 'catalog', 'en', 'service-pages', 'offers', 'decisions'].map(read));
const model = createSeoModel({ seo, catalog, english, servicePages, offers, contactPhone: decisions.contactPhone });
const forbiddenOnUs = ['497', 'primeros 5', 'first 5', 'first five', 'regularPrice', 'ficticio', 'Fictional', 'fictional', 'no tengo oficina', "don't have an office", 'sin reseñas inventadas', 'invented reviews', 'Argentina', 'Córdoba', 'Zunino', 'office there'];
const guarded = new Set(['/', '/en', '/about', '/en/about', '/case-studies', '/en/case-studies']);
function assertCertifications(document, route) {
  const list = document.querySelector('[data-certifications]');
  assert.ok(list, `${route}: certifications strip`);
  assert.equal(list.querySelectorAll('a').length, 0, `${route}: badges stay text until a URL is set`);
  for (const label of ['Google Analytics', 'Google Ads Search', 'HubSpot Inbound', 'Semrush SEO']) {
    assert.ok(list.textContent.includes(label), `${route}: ${label}`);
  }
}
const sitemap = new JSDOM(await fs.readFile('dist/sitemap.xml', 'utf8'), { contentType: 'application/xml' }).window.document;
assert.equal(sitemap.getElementsByTagName('url').length, Object.keys(model.pages).filter(model.isIndexable).length);
for (const [route, [title, description]] of Object.entries(model.pages)) {
  const html = await fs.readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8');
  const document = new JSDOM(html).window.document;
  for (const image of document.querySelectorAll('img, source')) {
    const srcset = image.getAttribute('srcset') || '';
    const urls = [image.getAttribute('src'), ...srcset.split(',').map(entry => entry.trim().split(/\s+/)[0])].filter(Boolean);
    for (const url of urls) {
      assert.ok(!url.startsWith('/src/'), `${route}: no development asset URL`);
      if (url.startsWith('/')) await fs.access(`dist${url}`);
    }
  }
  assert.equal(document.title, title, `${route}: title`);
  assert.equal(document.querySelector('meta[name="description"]').content, description, `${route}: description`);
  assert.equal(document.documentElement.lang, model.htmlLang(route));
  assert.equal(document.querySelector('link[rel="canonical"]').href, `${model.origin}${route}`);
  assert.equal(document.querySelectorAll('h1').length, 1, `${route}: one H1`);
  assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 1, `${route}: one graph`);
  assert.equal(document.querySelector('meta[name="robots"]').content.startsWith('index,'), model.isIndexable(route));
  const graph = JSON.parse(document.getElementById('page-schema').textContent)['@graph'];
  const types = value => Array.isArray(value) ? value : [value];
  const organization = graph.find(item => item['@type'] === 'Organization');
  assert.equal(organization.telephone, decisions.contactPhone);
  assert.deepEqual(organization.areaServed, organizationAreaServed, `${route}: organization areaServed`);
  assert.equal(graph.some(item => types(item['@type']).includes('LocalBusiness') || types(item['@type']).includes('ProfessionalService')), false, `${route}: no addressless LocalBusiness`);
  assert.equal(organization.logo.url, `${model.origin}/og-latamleap.png`);
  assert.equal(organization.logo.width, 1200);
  assert.equal(organization.logo.height, 630);
  assert.deepEqual(organization.sameAs, ['https://www.instagram.com/latam.leap/']);
  const founder = graph.find(item => item['@type'] === 'Person');
  assert.equal(founder.name, 'Luciana');
  assert.equal(founder['@id'], `${model.origin}/#founder`);
  assert.equal(organization.founder['@id'], founder['@id']);
  assert.equal(graph.filter(item => item['@type'] === 'FAQPage').length, route === '/' || route === '/en' ? 1 : 0, `${route}: FAQPage only where the FAQ is visible`);
  if (route === '/' || route === '/en') {
    const faq = graph.find(item => item['@type'] === 'FAQPage');
    assert.ok(faq.mainEntity.length >= 8, `${route}: FAQ questions`);
    assert.ok(faq.mainEntity.every(item => item['@type'] === 'Question' && item.acceptedAnswer['@type'] === 'Answer' && item.acceptedAnswer.text), `${route}: FAQ answers`);
  }
  if (route !== '/' && route !== '/en') assert.ok(graph.some(item => item['@type'] === 'BreadcrumbList'), `${route}: breadcrumbs`);
  assert.equal(document.querySelector('meta[property="og:image:width"]').content, '1200');
  assert.equal(document.querySelector('meta[property="og:image:height"]').content, '630');
  assert.equal(document.querySelector('meta[property="og:url"]').content, `${model.origin}${route}`);
  for (const [lang, url] of Object.entries(model.alternates(route))) assert.equal(document.querySelector(`link[hreflang="${lang}"]`).href, url);
  assert.ok(graph.some(item => item['@type'] === 'WebSite'), `${route}: website`);
  assert.ok(document.querySelector('meta[property="og:image"]').content.endsWith('/og-latamleap.png'), `${route}: share image`);
  assert.equal(document.querySelector('meta[name="twitter:card"]').content, 'summary_large_image');
  const verification = String(seo.googleSiteVerification || "").trim();
  assert.equal(document.querySelector('meta[name="google-site-verification"]')?.getAttribute("content") || "", verification, `${route}: search console token matches config`);
  assert.equal(html.includes("googletagmanager.com"), false, `${route}: GA4 stays out of the HTML until consent`);
  assert.equal(document.getElementById('meta-pixel'), null, `${route}: pixel stays disabled`);
  const alt = document.querySelector('meta[property="og:image:alt"]').content;
  assert.match(alt, model.language(route) === 'es' ? /pedidos por WhatsApp/ : /job requests on WhatsApp/);
  assert.match(document.querySelector('meta[name="twitter:image:alt"]').content, model.language(route) === 'es' ? /pedidos por WhatsApp/ : /job requests on WhatsApp/);
  assert.equal(document.body.textContent.includes(decisions.contactPhone.replace(/\D/g, '')), false, `${route}: phone number stays out of visible text`);
  for (const phrase of ['Flagler', 'Miami, FL']) assert.equal(html.includes(phrase), false, `${route}: postal address stays off the site (${phrase})`);
  if (route === '/' || route === '/en' || route === '/argentina') assert.ok(document.getElementById('referidos'), `${route}: referral section`);
  if (route === '/') {
    const referral = document.getElementById('referidos').textContent;
    assert.match(referral, /Recomienda Latam Leap/);
    assert.equal(referral.includes('Recomendá'), false, '/: US Spanish stays in tú');
    assert.equal(referral.includes('tenés'), false, '/: US Spanish stays in tú');
  }
  if (route === '/argentina') {
    const referral = document.getElementById('referidos').textContent;
    const rewardArs = new Intl.NumberFormat('es-AR').format(offers.referral.rewardARS);
    assert.match(referral, /Recomendá Latam Leap/);
    assert.match(referral, new RegExp(`ARS ${rewardArs.replaceAll('.', '\\.')}`));
    assert.match(referral, /tenés/);
    assert.match(referral, /Compartí/);
    assert.equal(referral.includes('Recomienda Latam Leap'), false, '/argentina: referral copy stays in voseo');
    assert.equal(referral.includes('USD'), false, '/argentina: referral reward is in pesos');
  }
  if (route === '/case-studies') assert.match(document.body.textContent, /Otros proyectos/);
  if (route === '/en/case-studies') assert.match(document.body.textContent, /Other projects/);
  if (guarded.has(route)) {
    for (const phrase of forbiddenOnUs) assert.equal(html.includes(phrase), false, `${route}: forbidden ${phrase}`);
  }
  if (route === '/' || route === '/en') {
    assert.equal(document.querySelector('iframe'), null, `${route}: demo iframe stays unloaded`);
    assert.ok(html.includes('case-studies'), `${route}: projects page is linked`);
    const service = graph.find(item => item['@id'] === `${model.origin}/#offer-bilingual`);
    assert.equal(service.offers.find(offer => offer.price === offers.us.price).priceCurrency, 'USD');
    assert.equal(service.offers.find(offer => offer.priceSpecification).priceSpecification.price, offers.us.maintenance);
    assert.equal(service.offers.length, 2, `${route}: fixed price plus care`);
    assert.deepEqual(service.areaServed, organizationAreaServed, `${route}: offer areaServed`);
    assert.equal(graph.filter(item => item['@type'] === 'Service').length, 1, `${route}: one offer`);
    assert.ok(document.body.textContent.includes(`USD ${offers.us.price}`), `${route}: fixed price visible`);
    assert.equal(offers.us.regularPrice, undefined);
    for (const phrase of ['maqueta gratis', '48 horas', '48 hours', 'Quedan 5', 'spots left', 'cloudenergy', 'TikTok']) {
      assert.equal(html.toLowerCase().includes(phrase.toLowerCase()), false, `${route}: leftover ${phrase}`);
    }
    assert.equal(html.includes('line-through'), false, `${route}: strikethrough price`);
    assert.equal(document.getElementById('ga4-src'), null, `${route}: GA4 stays unloaded until consent`);
    const coverage = route === '/'
      ? 'Trabajamos con negocios de todo Estados Unidos y Latinoamérica.'
      : 'We work with businesses across the United States and Latin America.';
    assert.ok(document.body.textContent.includes(coverage), `${route}: coverage line`);
    const photo = document.querySelector('#equipo img');
    assert.equal(photo.getAttribute('alt'), route === '/' ? 'Luciana, fundadora de Latam Leap' : 'Luciana, founder of Latam Leap');
    assert.equal(photo.getAttribute('width'), '800');
    assert.equal(photo.getAttribute('height'), '800');
    assert.equal(html.includes('Foto pendiente'), false, `${route}: placeholder label`);
    assert.equal(html.includes('luciana-placeholder'), false, `${route}: placeholder file`);
    const chip = route === '/' ? 'Marketing digital y analítica web' : 'Digital marketing & web analytics';
    assert.ok(document.body.textContent.includes(chip), `${route}: analytics chip`);
    assert.equal(document.body.textContent.includes('cursos de Google'), false, `${route}: old Google courses chip`);
    assert.equal(document.body.textContent.includes('Google courses'), false, `${route}: old Google courses chip`);
    assertCertifications(document, route);
  }
  if (route === '/about' || route === '/en/about') {
    const coverage = route === '/about'
      ? 'Trabajamos con negocios de todo Estados Unidos y Latinoamérica.'
      : 'We work with businesses across the United States and Latin America.';
    assert.ok(document.body.textContent.includes(coverage), `${route}: coverage line`);
    const photo = document.querySelector('img[src="/luciana-800.webp"]');
    assert.equal(photo.getAttribute('alt'), route === '/about' ? 'Luciana, fundadora de Latam Leap' : 'Luciana, founder of Latam Leap');
    assert.equal(html.includes('Foto pendiente'), false, `${route}: placeholder label`);
    const chip = route === '/about' ? 'Marketing digital y analítica web' : 'Digital marketing & web analytics';
    assert.ok(document.body.textContent.includes(chip), `${route}: analytics chip`);
    assertCertifications(document, route);
  }
  if (route === '/argentina') {
    const service = graph.find(item => item['@id'] === `${model.origin}/#offer-argentina`);
    assert.equal(service.offers.find(offer => offer.price === offers.ar.price).priceCurrency, 'ARS');
    for (const image of document.querySelectorAll('#trabajos img')) {
      assert.match(image.getAttribute('srcset'), /800w/, `${route}: 800w image`);
      assert.equal(image.getAttribute('loading'), 'lazy');
      assert.match(image.getAttribute('sizes'), /calc\(100vw - 40px\)/);
    }
    assert.equal(html.includes('admin-rifa.latamleap.com'), false, 'rifa login stays unlinked');
    assert.ok(document.body.textContent.includes('ARS'), `${route}: peso price visible`);
  }
  assert.ok(!html.includes('storage.googleapis.com/gpt-engineer-file-uploads'));
  assert.ok(!document.body.textContent.includes('{price}'), `${route}: expanded prices`);
  console.log(`${route}: OK`);
}
assert.equal(offers.us.price, 597);
assert.equal(offers.us.maintenance, 49);
assert.equal(offers.ar.price, 549000);
assert.equal(offers.ar.maintenance, 49000);
assert.equal(servicePages.length, 0, 'retired service pages stay out of the catalog loop');
const sitemapXml = await fs.readFile('dist/sitemap.xml', 'utf8');
const robots = await fs.readFile('dist/robots.txt', 'utf8');
assert.match(robots, /Sitemap: https:\/\/www\.latamleap\.com\/sitemap\.xml/);
for (const route of Object.keys(model.pages).filter(model.isIndexable)) {
  assert.match(sitemapXml, new RegExp(`<loc>${model.origin}${route}</loc><lastmod>${seo.updated}</lastmod>`), `${route}: sitemap lastmod`);
  for (const [lang, href] of Object.entries(model.alternates(route))) {
    assert.ok(sitemapXml.includes(`hreflang="${lang}" href="${href}"`), `${route}: sitemap ${lang}`);
    const target = new URL(href).pathname;
    assert.ok(Object.values(model.alternates(target)).includes(`${model.origin}${route}`), `${route} ${lang} is not reciprocal`);
  }
  await fs.access(`dist${route === '/' ? '' : route}/index.html`);
}
for (const route of ['/privacy-policy', '/terms-of-service', '/data-deletion']) assert.equal(sitemapXml.includes(`${model.origin}${route}`), false, `${route}: noindex stays out of the sitemap`);
const notFoundHtml = await fs.readFile('dist/404.html', 'utf8');
const notFound = new JSDOM(notFoundHtml).window.document;
assert.equal(notFound.querySelector('meta[name="robots"]').content, 'noindex,follow');
for (const phrase of ['Flagler', 'Miami, FL']) assert.equal(notFoundHtml.includes(phrase), false, `404: postal address stays off the site (${phrase})`);
console.log('Sitemap, HTML, language alternates, live catalog prices and structured data verified.');
