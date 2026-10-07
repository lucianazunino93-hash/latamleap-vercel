import { createHash } from 'node:crypto';
const solutions = ['Una landing', 'Una Web profesional', 'Una tienda online', 'Marketing o marca', 'Una solución a medida', 'Necesito orientación'];
const clean = (value, max) => typeof value === 'string' && value.trim().length <= max ? value.trim() : null;

export function createLeadHandler({ apiKey = process.env.RESEND_API_KEY, domain = process.env.RESEND_EMAIL_DOMAIN || 'latamleap.com', recipient = 'hola@latamleap.com', fetcher = fetch, now = Date.now } = {}) {
  // Burst limit is local to each serverless instance; the honeypot also filters basic bots.
  const attempts = new Map();
  return async (req, res) => {
    const send = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
    if (req.method !== 'POST') return send(405, { error: 'method_not_allowed' });
    if (!['https://www.latamleap.com', 'https://latamleap.com'].includes(req.headers.origin)) return send(403, { error: 'invalid_origin' });
    if (!req.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'json_required' });
    try {
      let data = req.body;
      if (data === undefined) {
        let raw = '';
        for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 12000) return send(413, { error: 'too_large' }); }
        data = raw;
      }
      if (Buffer.byteLength(typeof data === 'string' ? data : JSON.stringify(data) ?? '') > 12000) return send(413, { error: 'too_large' });
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch { return send(400, { error: 'invalid_json' }); } }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return send(400, { error: 'invalid_lead' });
      if (data.website) return send(200, { ok: true });
      const name = clean(data.name, 100), email = clean(data.email, 254), phone = clean(data.phone ?? '', 40), project = clean(data.project, 1500);
      if (!name || /[\r\n]/.test(name) || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email) || phone === null || (phone && !/^[+\d\s().-]{6,40}$/.test(phone)) || !project || !solutions.includes(data.solution) || !['es', 'en'].includes(data.language) || !/^[\da-f-]{36}$/i.test(data.submissionId ?? '')) return send(400, { error: 'invalid_lead' });
      if (!apiKey || domain !== 'latamleap.com') return send(503, { error: 'email_unavailable' });
      const time = now();
      for (const [key, value] of attempts) if (time - value.start > 60000) attempts.delete(key);
      const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0];
      const attempt = attempts.get(ip) || { start: time, count: 0 };
      if (attempt.count >= 5) return send(429, { error: 'too_many_requests' });
      attempt.count += 1; attempts.set(ip, attempt);
      const text = `Nueva consulta desde Latam Leap\n\nNombre: ${name}\nEmail: ${email}\nTeléfono / WhatsApp: ${phone || 'No indicado'}\nSolución: ${data.solution}\nIdioma: ${data.language}\n\nProyecto:\n${project}\n\nPodés responder este correo directamente para contactar al cliente.`;
      const digest = createHash('sha256').update(JSON.stringify([name, email, phone, data.solution, project, data.language, data.submissionId])).digest('hex');
      const result = await fetcher('https://api.resend.com/emails', {
        method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `lead-${digest}` }, signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ from: `Latam Leap <consultas@${domain}>`, to: [recipient], reply_to: email, subject: `Nueva consulta · ${data.solution} · ${name}`, text }),
      });
      if (!result.ok) { console.error('Lead email rejected', result.status); return send(502, { error: 'email_unavailable' }); }
      const delivery = await result.json();
      if (!delivery.id) return send(502, { error: 'email_unavailable' });
      return send(200, { ok: true });
    } catch { return send(502, { error: 'email_unavailable' }); }
  };
}
