import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLeadHandler } from './leads.mjs';
const lead = { name: 'Cliente de prueba', email: 'client@example.com', phone: '+54 9 351 208 5644', solution: 'Una landing', project: 'Necesito presentar mis servicios.', language: 'es', submissionId: 'a24b4f64-a625-445d-9f97-5a8b405330a1' };
async function run(handler, body = lead, headers = {}, method = 'POST') {
  let status, data;
  await handler({ method, headers: { origin: 'https://www.latamleap.com', 'content-type': 'application/json', ...headers }, body }, { writeHead(code) { status = code; }, end(value) { data = JSON.parse(value); } });
  return { status, data };
}
test('sends to the configured inbox with reply-to and stable retry key', async () => {
  const calls = [];
  const handler = createLeadHandler({ apiKey: 'test-secret', fetcher: async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => ({ id: 'email-id' }) }; } });
  assert.equal((await run(handler)).status, 200);
  assert.equal((await run(handler, JSON.stringify(lead))).status, 200);
  const email = JSON.parse(calls[0].options.body);
  assert.deepEqual(email.to, ['hola@latamleap.com']);
  assert.equal(email.reply_to, lead.email);
  assert.equal(email.from, 'Latam Leap <consultas@latamleap.com>');
  assert.match(email.text, /Necesito presentar mis servicios/);
  assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
});
test('rejects malformed data, oversized bodies and external origins without sending', async () => {
  const handler = createLeadHandler({ apiKey: 'test', fetcher: () => { throw Error('must not send'); } });
  for (const body of [null, [], '{broken', { ...lead, email: 'invalid' }, { ...lead, name: 'bad\r\nheader' }, { ...lead, solution: 'unknown' }]) assert.equal((await run(handler, body)).status, 400);
  assert.equal((await run(handler, { ...lead, project: 'a'.repeat(13000) })).status, 413);
  assert.equal((await run(handler, lead, { origin: 'https://other.example' })).status, 403);
  assert.equal((await run(handler, lead, {}, 'GET')).status, 405);
});
test('filters honeypot and reports missing credentials or provider failure honestly', async () => {
  assert.equal((await run(createLeadHandler({ apiKey: '' }), { ...lead, website: 'bot' })).status, 200);
  assert.equal((await run(createLeadHandler({ apiKey: '' }))).status, 503);
  assert.equal((await run(createLeadHandler({ apiKey: 'test', fetcher: async () => ({ ok: false, status: 403 }) }))).status, 502);
  assert.equal((await run(createLeadHandler({ apiKey: 'test', fetcher: async () => ({ ok: true, json: async () => ({}) }) }))).status, 502);
});
test('limits bursts and permits requests after the window expires', async () => {
  let time = 0;
  const handler = createLeadHandler({ apiKey: 'test', now: () => time, fetcher: async () => ({ ok: true, json: async () => ({ id: 'sent' }) }) });
  for (let i = 0; i < 5; i++) assert.equal((await run(handler)).status, 200);
  assert.equal((await run(handler)).status, 429);
  time = 60001;
  assert.equal((await run(handler)).status, 200);
});

test('includes the selected currency in the email and rejects unsupported currencies', async () => {
  let text;
  const handler = createLeadHandler({ apiKey: 'test', fetcher: async (_, options) => { text = JSON.parse(options.body).text; return { ok: true, json: async () => ({ id: 'sent' }) }; } });
  assert.equal((await run(handler, { ...lead, currency: 'USD' })).status, 200);
  assert.match(text, /Moneda de referencia: USD/);
  assert.equal((await run(handler, { ...lead, currency: 'EUR' })).status, 400);
});
