export const LATAM = new Set(["AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GT", "GY", "HN", "HT", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "UY", "VE"]);

export function normalizeCountry(value) {
  if (typeof value !== "string") return "";
  const code = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : "";
}

/** Argentina uses ARS. Every other country, including an unknown location, uses USD. */
export function currencyForCountry(country) {
  return normalizeCountry(country) === "AR" ? "ARS" : "USD";
}

/** Spanish for Argentina and LatAm. English for the United States and the rest of the world. Unknown country returns null so the URL is left alone. */
export function languageForCountry(country) {
  const code = normalizeCountry(country);
  if (!code) return null;
  return LATAM.has(code) ? "es" : "en";
}

export function pathLanguage(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function localizePath(pathname, language) {
  const english = pathLanguage(pathname) === "en";
  if (language === "en") return english ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;
  if (!english) return pathname;
  if (pathname === "/en") return "/";
  return pathname.slice(3) || "/";
}

export function quoteTier(tier, currency, rate) {
  const list = currency === "ARS" ? tier.ar : tier.us;
  const multiplier = currency === "ARS" ? rate : 1;
  return {
    setup: Math.round(list.setup * multiplier),
    monthly: Math.round(list.monthly * multiplier),
  };
}

export function formatAmount(amount, currency, language = "es") {
  const formatted = new Intl.NumberFormat(language === "es" ? "es-AR" : "en-US", { maximumFractionDigits: 0 }).format(amount);
  return `${currency} ${formatted}`;
}
