import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { formatAmount, languageForCountry, localizePath, quoteTier } from '../shared/geo.mjs';
import { clearRateCache, marketPayload } from '../shared/market-data.mjs';
import { trackingHead } from '../shared/tracking.mjs';
import middleware from '../middleware.js';

const offers = JSON.parse(fs.readFileSync(new URL('../shared/offers.json', import.meta.url)));
const tier = id => offers.tiers.find(item => item.id === id);

test('US prices stay in dollars and Argentina prices convert from the editable dollar amounts', () => {
  assert.deepEqual(offers.tiers.map(item => item.us), [
    { setup: 900, monthly: 0 },
    { setup: 1800, monthly: 150 },
    { setup: 3000, monthly: 300 },
  ]);
  assert.deepEqual(offers.tiers.map(item => item.ar), [
    { setup: 300, monthly: 0 },
    { setup: 600, monthly: 50 },
    { setup: 1000, monthly: 100 },
  ]);
  assert.deepEqual(quoteTier(tier('presence'), 'USD', 9999), { setup: 900, monthly: 0 });
  assert.deepEqual(quoteTier(tier('presence'), 'ARS', 1500), { setup: 450000, monthly: 0 });
  assert.deepEqual(quoteTier(tier('assistant'), 'ARS', 1500), { setup: 1500000, monthly: 150000 });
  assert.equal(formatAmount(900, 'USD', 'en'), 'USD 900');
  assert.equal(formatAmount(450000, 'ARS', 'es'), 'ARS 450.000');
});

test('a failed public rate falls back to the configured pesos per dollar', async () => {
  clearRateCache();
  const payload = await marketPayload('AR', async () => { throw new Error('offline'); });
  assert.equal(payload.currency, 'ARS');
  assert.equal(payload.arsPerUsd, offers.fallbackArsPerUsd);
  assert.equal(payload.rateSource, 'fallback');
  clearRateCache();
  const invalid = await marketPayload('US', async () => ({ ok: true, json: async () => ({ rates: { ARS: 1 } }) }));
  assert.equal(invalid.rateSource, 'fallback');
  assert.equal(invalid.currency, 'USD');
});

test('language follows the country and an explicit choice is kept', async () => {
  assert.equal(languageForCountry('US'), 'en');
  assert.equal(languageForCountry('AR'), 'es');
  assert.equal(languageForCountry('MX'), 'es');
  assert.equal(languageForCountry(undefined), null);
  assert.equal(localizePath('/', 'en'), '/en');
  assert.equal(localizePath('/services', 'en'), '/en/services');
  assert.equal(localizePath('/en/about', 'es'), '/about');
  assert.equal(localizePath('/en', 'es'), '/');
  const unitedStates = await middleware(new Request('https://www.latamleap.com/services', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(unitedStates.status, 307);
  assert.equal(new URL(unitedStates.headers.get('location')).pathname, '/en/services');
  const argentina = await middleware(new Request('https://www.latamleap.com/en', { headers: { 'x-vercel-ip-country': 'AR', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(new URL(argentina.headers.get('location')).pathname, '/');
  assert.equal(middleware(new Request('https://www.latamleap.com/', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Googlebot' } })), undefined);
  assert.equal(middleware(new Request('https://www.latamleap.com/', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } })), undefined);
});

test('search console and the Meta pixel stay disabled until their config values are set', () => {
  assert.equal(trackingHead({ googleSiteVerification: '', metaPixelId: '' }), '');
  assert.equal(trackingHead({ metaPixelId: '<script>' }), '');
  const head = trackingHead({ googleSiteVerification: 'token-1', metaPixelId: '123456' });
  assert.match(head, /name="google-site-verification" content="token-1"/);
  assert.match(head, /fbq\('init','123456'\)/);
});
