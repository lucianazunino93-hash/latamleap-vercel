import { currencyForCountry } from '../shared/pricing.mjs';

export default function market(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Vary', 'X-Vercel-IP-Country');
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  // Vercel supplies the country header; no external geolocation service is needed.
  return res.status(200).json({ currency: currencyForCountry(req.headers['x-vercel-ip-country']) });
}
