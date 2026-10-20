import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { formatAmount, isLaunchActive, languageForCountry, localizePath, quoteTier } from '../shared/geo.mjs';
import { clearRateCache, marketPayload } from '../shared/market-data.mjs';
import { trackingHead, analyticsHead } from '../shared/tracking.mjs';
import { isBonusActive } from '../shared/bonus.mjs';
import middleware from '../middleware.js';

const offers = JSON.parse(fs.readFileSync(new URL('../shared/offers.json', import.meta.url)));

test('retired payment URLs redirect to the offer', () => {
  const vercel = JSON.parse(fs.readFileSync(new URL('../vercel.json', import.meta.url)));
  const pago = vercel.redirects.find(rule => rule.source === '/pago');
  const english = vercel.redirects.find(rule => rule.source === '/en/pago');
  assert.equal(pago.destination, '/#oferta');
  assert.equal(pago.permanent, true);
  assert.equal(english.destination, '/en#oferta');
  assert.equal(english.permanent, true);
  assert.equal(vercel.rewrites, undefined);
});

test('the public offer is one fixed price in each market, with optional maintenance', () => {
  assert.equal(offers.us.price, 597);
  assert.equal(offers.us.regularPrice, undefined);
  assert.equal(offers.us.maintenance, 49);
  assert.equal(offers.us.currency, 'USD');
  assert.equal(offers.ar.price, 549000);
  assert.equal(offers.ar.maintenance, 49000);
  assert.equal(offers.ar.currency, 'ARS');
  assert.equal(offers.tiers, undefined);
  assert.equal(offers.launch, undefined);
  assert.equal(offers.us.spotsLeft, undefined);
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
  const located = value => new URL(value, 'https://www.latamleap.com');
  const unitedStates = await middleware(new Request('https://www.latamleap.com/services', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(unitedStates.status, 307);
  assert.equal(located(unitedStates.headers.get('location')).pathname, '/en/services');
  assert.equal(located(unitedStates.headers.get('location')).host, 'www.latamleap.com');
  const explicitEnglish = await middleware(new Request('https://www.latamleap.com/en', { headers: { 'x-vercel-ip-country': 'AR', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } }));
  assert.equal(explicitEnglish.headers.get('location'), null);
  assert.match(explicitEnglish.headers.get('set-cookie'), /latamleap\.lang=en/);
  assert.equal(middleware(new Request('https://www.latamleap.com/', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Googlebot' } })), undefined);
  assert.equal(middleware(new Request('https://www.latamleap.com/', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } })), undefined);
  const spanishChoice = await middleware(new Request('https://www.latamleap.com/es', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(spanishChoice.status, 307);
  assert.equal(located(spanishChoice.headers.get('location')).pathname, '/');
  assert.match(spanishChoice.headers.get('set-cookie'), /latamleap\.lang=es/);
  assert.match(spanishChoice.headers.get('set-cookie'), /Secure/);
  const argentinaPage = await middleware(new Request('https://www.latamleap.com/argentina', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0' } }));
  assert.equal(argentinaPage.status, 307);
  assert.equal(located(argentinaPage.headers.get('location')).pathname, '/argentina');
  assert.equal(located(argentinaPage.headers.get('location')).searchParams.get('lang'), 'es');
  assert.match(argentinaPage.headers.get('set-cookie'), /latamleap\.lang=es/);
  const argentinaClean = await middleware(new Request('https://www.latamleap.com/argentina?lang=es', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } }));
  assert.equal(located(argentinaClean.headers.get('location')).pathname, '/argentina');
  assert.equal(located(argentinaClean.headers.get('location')).search, '');
  assert.equal(middleware(new Request('https://www.latamleap.com/argentina', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=es' } })), undefined);
  const englishArgentina = await middleware(new Request('https://www.latamleap.com/en/argentina', { headers: { 'x-vercel-ip-country': 'US', 'user-agent': 'Mozilla/5.0', cookie: 'latamleap.lang=en' } }));
  assert.equal(located(englishArgentina.headers.get('location')).pathname, '/argentina');
});

test('search console, GA4 and the Meta pixel stay unloaded until configured and accepted', () => {
  assert.equal(trackingHead({ googleSiteVerification: '', metaPixelId: '', ga4MeasurementId: 'G-ABC123' }), '');
  assert.equal(trackingHead({ metaPixelId: '<script>', ga4MeasurementId: 'G-ABC123' }).includes('fbq'), false);
  assert.equal(trackingHead({ metaPixelId: '123456', ga4MeasurementId: 'G-ABC123' }).includes('googletagmanager'), false);
  const head = trackingHead({ googleSiteVerification: 'token-1', metaPixelId: '123456', ga4MeasurementId: 'G-ABC123' });
  assert.match(head, /name="google-site-verification" content="token-1"/);
  assert.equal(head.includes('fbq'), false);
  assert.equal(analyticsHead({ ga4MeasurementId: 'G-ABC123', metaPixelId: '123456', consent: 'denied' }), '');
  assert.equal(analyticsHead({ ga4MeasurementId: 'G-XXXXXXXXXX', metaPixelId: '123456', consent: 'granted' }).includes('googletagmanager'), false);
  assert.equal(analyticsHead({ ga4MeasurementId: '', metaPixelId: '<script>', consent: 'granted' }), '');
  const granted = analyticsHead({ ga4MeasurementId: 'G-ABC123', metaPixelId: '123456', consent: 'granted' });
  assert.match(granted, /src="\/measurement\.js"/);
  assert.match(granted, /data-ga-id="G-ABC123"/);
  assert.match(granted, /googletagmanager\.com\/gtag\/js\?id=G-ABC123/);
  assert.equal(granted.includes("fbq"), false);
  assert.equal(granted.includes("gtag("), false);
  const measurement = fs.readFileSync(new URL('../public/measurement.js', import.meta.url), 'utf8');
  assert.match(measurement, /analytics_storage: "granted"/);
  assert.match(measurement, /ad_storage: "denied"/);
});

test('the referral reward is one care month, capped, and credited on the deposit', () => {
  assert.deepEqual(offers.referral, {
    enabled: true,
    rewardMonths: 1,
    rewardUSD: 49,
    rewardARS: 49000,
    capPerYear: 6,
    holdMonths: 12,
    trigger: 'deposit_50',
    refereeGift: 'gbp_full_optimization',
  });
});

test('the time-bound bonus follows its date and stays a fixed add-on', () => {
  const bonus = { ...offers.us.bonus };
  assert.equal(bonus.option, 'A');
  assert.equal(bonus.endsOn, '2026-11-30');
  assert.equal(isBonusActive(bonus, new Date('2026-11-30T18:00:00Z')), true);
  assert.equal(isBonusActive(bonus, new Date('2026-12-01T05:30:00Z')), true);
  assert.equal(isBonusActive(bonus, new Date('2026-12-01T06:00:00Z')), false);
  assert.equal(isBonusActive({ ...bonus, enabled: false }, new Date('2026-11-01T00:00:00Z')), false);
});
