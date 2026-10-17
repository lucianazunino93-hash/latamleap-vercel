import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { formatAmount, isLaunchActive, languageForCountry, localizePath, quoteTier } from '../shared/geo.mjs';
import { clearRateCache, marketPayload } from '../shared/market-data.mjs';
import { trackingHead } from '../shared/tracking.mjs';
import middleware from '../middleware.js';

const offers = JSON.parse(fs.readFileSync(new URL('../shared/offers.json', import.meta.url)));

test('the public offer is one fixed price in each market, with optional maintenance', () => {
  assert.equal(offers.us.price, 597);
  assert.equal(offers.us.maintenance, 49);
  assert.equal(offers.us.currency, 'USD');
  assert.equal(offers.ar.price, 549000);
  assert.equal(offers.ar.maintenance, 49000);
  assert.equal(offers.ar.currency, 'ARS');
  assert.equal(offers.tiers, undefined);
  assert.equal(offers.launch, undefined);
  assert.equal(formatAmount(597, 'USD', 'en'), 'USD 597');
  assert.equal(formatAmount(549000, 'ARS', 'es'), 'ARS 549.000');
  const sample = { us: { setup: 10, regularSetup: 20, monthly: 1 }, ar: { setup: 3, regularSetup: 6, monthly: 1 } };
  assert.deepEqual(quoteTier(sample, 'USD', 1500, false), { setup: 20, monthly: 1, regular: null });
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
  const spanishChoice = await middleware(new Request('https://www.latamleap.com/es', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(spanishChoice.status, 307);
  assert.equal(new URL(spanishChoice.headers.get('location')).pathname, '/');
  assert.match(spanishChoice.headers.get('set-cookie'), /latamleap\.lang=es/);
  const argentinaPage = await middleware(new Request('https://www.latamleap.com/argentina', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(argentinaPage.status, 307);
  assert.equal(new URL(argentinaPage.headers.get('location')).pathname, '/argentina');
  assert.equal(new URL(argentinaPage.headers.get('location')).searchParams.get('lang'), 'es');
  assert.match(argentinaPage.headers.get('set-cookie'), /latamleap\.lang=es/);
  const argentinaClean = await middleware(new Request('https://www.latamleap.com/argentina?lang=es', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } }));
  assert.equal(new URL(argentinaClean.headers.get('location')).pathname, '/argentina');
  assert.equal(new URL(argentinaClean.headers.get('location')).search, '');
  assert.equal(middleware(new Request('https://www.latamleap.com/argentina', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } })), undefined);
  const englishArgentina = await middleware(new Request('https://www.latamleap.com/en/argentina', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=en' } }));
  assert.equal(new URL(englishArgentina.headers.get('location')).pathname, '/argentina');
});

test('search console and the Meta pixel stay disabled until their config values are set', () => {
  assert.equal(trackingHead({ googleSiteVerification: '', metaPixelId: '' }), '');
  assert.equal(trackingHead({ metaPixelId: '<script>' }), '');
  const head = trackingHead({ googleSiteVerification: 'token-1', metaPixelId: '123456' });
  assert.match(head, /name="google-site-verification" content="token-1"/);
  assert.match(head, /fbq\('init','123456'\)/);
});
