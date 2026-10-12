import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { formatAmount, isLaunchActive, languageForCountry, localizePath, quoteTier } from '../shared/geo.mjs';
import { clearRateCache, marketPayload } from '../shared/market-data.mjs';
import { trackingHead } from '../shared/tracking.mjs';
import middleware from '../middleware.js';

const offers = JSON.parse(fs.readFileSync(new URL('../shared/offers.json', import.meta.url)));
const tier = id => offers.tiers.find(item => item.id === id);

test('US prices stay in dollars and Argentina prices stay one third, converted to pesos', () => {
  assert.deepEqual(offers.tiers.map(item => item.us.setup), [497, 797, 1197]);
  assert.deepEqual(offers.tiers.map(item => item.us.regularSetup), [797, 1197, 1697]);
  assert.deepEqual(offers.tiers.map(item => item.us.monthly), [0, 147, 247]);
  assert.deepEqual(offers.tiers.map(item => item.ar.setup), [166, 266, 399]);
  assert.deepEqual(offers.tiers.map(item => item.ar.regularSetup), [266, 399, 566]);
  assert.deepEqual(offers.tiers.map(item => item.ar.monthly), [0, 49, 82]);
  assert.deepEqual(quoteTier(tier('presence'), 'USD', 9999, true), { setup: 497, monthly: 0, regular: 797 });
  assert.deepEqual(quoteTier(tier('presence'), 'USD', 9999, false), { setup: 797, monthly: 0, regular: null });
  assert.deepEqual(quoteTier(tier('leads'), 'USD', 1500, true), { setup: 797, monthly: 147, regular: 1197 });
  assert.deepEqual(quoteTier(tier('assistant'), 'USD', 1500, false), { setup: 1697, monthly: 247, regular: null });
  assert.deepEqual(quoteTier(tier('presence'), 'ARS', 1500, true), { setup: 249000, monthly: 0, regular: 399000 });
  assert.deepEqual(quoteTier(tier('assistant'), 'ARS', 1500, true), { setup: 598500, monthly: 123000, regular: 849000 });
  assert.equal(formatAmount(497, 'USD', 'en'), 'USD 497');
  assert.equal(formatAmount(450000, 'ARS', 'es'), 'ARS 450.000');
});

test('the launch offer is a fixed date and a manual spot count, not a resetting countdown', () => {
  const launch = { enabled: true, spotsLeft: 5, endsOn: '2026-12-31' };
  assert.equal(isLaunchActive(launch, new Date('2026-10-12T15:00:00Z')), true);
  assert.equal(isLaunchActive(launch, new Date('2026-12-31T23:00:00Z')), true);
  assert.equal(isLaunchActive(launch, new Date('2027-01-01T00:00:00Z')), false);
  assert.equal(isLaunchActive({ ...launch, enabled: false }, new Date('2026-10-12T15:00:00Z')), false);
  assert.equal(isLaunchActive({ ...launch, spotsLeft: 0 }, new Date('2026-10-12T15:00:00Z')), false);
  assert.equal(isLaunchActive(launch, new Date('2026-12-31T00:30:00Z')), isLaunchActive(launch, new Date('2026-12-31T20:30:00Z')));
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
