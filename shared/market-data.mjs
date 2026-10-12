import fs from "node:fs";
import { currencyForCountry, languageForCountry, normalizeCountry } from "./geo.mjs";

const offers = JSON.parse(fs.readFileSync(new URL("./offers.json", import.meta.url)));
let cached = { rate: 0, at: 0 };

export function clearRateCache() {
  cached = { rate: 0, at: 0 };
}

export async function resolveArsPerUsd(fetcher = fetch) {
  if (cached.rate > 0 && Date.now() - cached.at < 6 * 60 * 60 * 1000) return { rate: cached.rate, source: "cache" };
  try {
    const response = await fetcher(offers.rateUrl, { signal: AbortSignal.timeout(2500) });
    if (!response?.ok) throw new Error("rate_unavailable");
    const data = await response.json();
    const rate = Number(data?.rates?.ARS);
    if (!Number.isFinite(rate) || rate < 100 || rate > 100000) throw new Error("rate_invalid");
    cached = { rate, at: Date.now() };
    return { rate, source: "live" };
  } catch {
    return { rate: offers.fallbackArsPerUsd, source: "fallback" };
  }
}

export async function marketPayload(countryHeader, fetcher = fetch) {
  const country = normalizeCountry(countryHeader);
  const { rate, source } = await resolveArsPerUsd(fetcher);
  return {
    currency: currencyForCountry(countryHeader),
    country: country || null,
    language: languageForCountry(countryHeader),
    arsPerUsd: rate,
    rateSource: source,
  };
}
