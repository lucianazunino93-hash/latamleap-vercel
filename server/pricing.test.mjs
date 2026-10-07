import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import market from '../api/market.js';
import { currencyForCountry, priceFor, formatPrice } from '../shared/pricing.mjs';
const catalog = JSON.parse(fs.readFileSync(new URL('../shared/catalog.json', import.meta.url)));
const care = JSON.parse(fs.readFileSync(new URL('../shared/care.json', import.meta.url)));

test('Argentina gets ARS, Colombia and United States get USD, missing country safely falls back', () => {
  assert.equal(currencyForCountry('AR'), 'ARS');
  for (const country of ['CO', 'US', 'UY']) assert.equal(currencyForCountry(country), 'USD');
  for (const country of [undefined, '', ['US'], 'unknown']) assert.equal(currencyForCountry(country), 'ARS');
});
test('fixed international prices remain independent of language and Argentine prices', () => {
  assert.deepEqual(catalog.map(item => priceFor(item, 'USD')), [349, 789, 1299]);
  assert.deepEqual(catalog.map(item => priceFor(item, 'ARS')), [349000, 789000, 1299000]);
  assert.equal(formatPrice(care, 'USD', 'es'), 'USD 49');
  assert.equal(formatPrice(care, 'ARS', 'en'), 'ARS 49,000');
});
test('country endpoint never caches one visitor currency for another', () => {
  let body, status; const headers = {};
  const response = { setHeader(key, value) { headers[key] = value; }, status(code) { status = code; return this; }, json(value) { body = value; } };
  market({ method: 'GET', headers: { 'x-vercel-ip-country': 'CO' } }, response);
  assert.equal(status, 200); assert.equal(body.currency, 'USD');
  assert.equal(headers['Cache-Control'], 'private, no-store');
  assert.equal(headers.Vary, 'X-Vercel-IP-Country');
  market({ method: 'POST', headers: {} }, response);
  assert.equal(status, 405);
});
