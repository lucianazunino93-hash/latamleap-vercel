import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createMarketHandler } from '../api/market.js';
import { clearRateCache } from '../shared/market-data.mjs';
import { currencyForCountry, priceFor, formatPrice } from '../shared/pricing.mjs';
const catalog = JSON.parse(fs.readFileSync(new URL('../shared/catalog.json', import.meta.url)));
const care = JSON.parse(fs.readFileSync(new URL('../shared/care.json', import.meta.url)));

test('Argentina gets ARS and every other visitor gets USD', () => {
  assert.equal(currencyForCountry('AR'), 'ARS');
  assert.equal(currencyForCountry('ar'), 'ARS');
  for (const country of ['CO', 'US', 'UY']) assert.equal(currencyForCountry(country), 'USD');
  for (const country of [undefined, '', ['US'], 'unknown']) assert.equal(currencyForCountry(country), 'USD');
});
test('fixed international prices remain independent of language and Argentine prices', () => {
  assert.deepEqual(catalog.map(item => priceFor(item, 'USD')), [349, 879, 879, 1299]);
  assert.deepEqual(catalog.map(item => priceFor(item, 'ARS')), [349000, 879000, 879000, 1299000]);
  assert.equal(formatPrice(care, 'USD', 'es'), 'USD 49');
  assert.equal(formatPrice(care, 'ARS', 'en'), 'ARS 49,000');
});
test('country endpoint returns USD outside Argentina, ARS in Argentina, and never caches one visitor for another', async () => {
  clearRateCache();
  const fetcher = async () => ({ ok: true, json: async () => ({ rates: { ARS: 1516 } }) });
  const market = createMarketHandler({ fetcher });
  let body, status; const headers = {};
  const response = { setHeader(key, value) { headers[key] = value; }, status(code) { status = code; return this; }, json(value) { body = value; } };
  await market({ method: 'GET', headers: { 'x-vercel-ip-country': 'US' } }, response);
  assert.equal(status, 200); assert.equal(body.currency, 'USD'); assert.equal(body.language, 'en'); assert.equal(body.arsPerUsd, 1516); assert.equal(body.rateSource, 'live');
  assert.equal(headers['Cache-Control'], 'private, no-store');
  assert.equal(headers.Vary, 'X-Vercel-IP-Country');
  await market({ method: 'GET', headers: { 'x-vercel-ip-country': 'AR' } }, response);
  assert.equal(body.currency, 'ARS'); assert.equal(body.language, 'es'); assert.equal(body.rateSource, 'cache');
  await market({ method: 'GET', headers: {} }, response);
  assert.equal(body.currency, 'USD'); assert.equal(body.language, null);
  await market({ method: 'POST', headers: {} }, response);
  assert.equal(status, 405);
});
