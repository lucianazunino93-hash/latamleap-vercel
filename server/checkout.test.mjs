import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCheckoutServer, createCheckoutHandler } from './checkout.mjs';
async function run(options, fn) {
  const server = createCheckoutServer(options);
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  try { await fn(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise(r => server.close(r)); }
}
const gone = async response => {
  assert.equal(response.status, 410);
  assert.deepEqual(await response.json(), { error: 'checkout_retired' });
};
test('checkout is gone and does not call Mercado Pago', () => run({ token: '', fetcher: () => { throw new Error('must not call'); } }, async url => {
  await gone(await fetch(url + '/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }));
  await gone(await fetch(url + '/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId: 'web-5-secciones-sena', email: 'client@example.com', price: 1 }) }));
  await gone(await fetch(url + '/api/checkout', { method: 'GET' }));
  assert.equal((await fetch(url + '/api/other', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })).status, 404);
}));
test('a checkout that is turned back on still requires Origin', async () => {
  let status;
  const handler = createCheckoutHandler({ token: '', retired: false, fetcher: () => { throw new Error('must not call'); } });
  const respond = () => ({ writeHead(code) { status = code; }, end() {} });
  await handler({ url: '/api/checkout', method: 'POST', headers: { 'content-type': 'application/json' }, body: { planId: 'web-5-secciones-sena', email: 'client@example.com' } }, respond());
  assert.equal(status, 403);
  await handler({ url: '/api/checkout', method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://evil.example' }, body: { planId: 'web-5-secciones-sena', email: 'client@example.com' } }, respond());
  assert.equal(status, 403);
  await handler({ url: '/api/checkout', method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://www.latamleap.com' }, body: { planId: 'web-5-secciones-sena', email: 'client@example.com' } }, respond());
  assert.equal(status, 503);
});
test('a parsed Vercel body is still retired before any charge', async () => {
  let status, payload;
  const handler = createCheckoutHandler({ token: 'TEST-example', fetcher: () => { throw new Error('must not call'); } });
  await handler({ url: '/api/checkout', method: 'POST', headers: { 'content-type': 'application/json' }, body: { planId: 'web-5-secciones-sena', email: 'test@example.com' } }, { writeHead(code) { status = code; }, end(value) { payload = JSON.parse(value); } });
  assert.equal(status, 410);
  assert.equal(payload.error, 'checkout_retired');
});
