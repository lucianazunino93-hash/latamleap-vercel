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

/** `/es` is an explicit Spanish choice. It is not a public page: callers redirect it to the unprefixed Spanish URL. */
export function unwrapSpanishAlias(pathname) {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3) || "/";
  return null;
}

/**
 * Geo redirect only when the visitor has not chosen a language.
 * `/es` and `/argentina` are explicit Spanish. `/en` stays English.
 * Returns a redirect, a cookie to set while continuing, or null.
 */
export function languageDecision(input, { cookie = "", country = "" } = {}) {
  const url = input instanceof URL ? new URL(input.href) : new URL(input, "https://www.latamleap.com");
  const pathname = url.pathname;
  const redirect = (nextPath, setCookie) => {
    url.pathname = nextPath;
    return { location: `${url.pathname}${url.search}`, setCookie };
  };
  if (pathname === "/en/argentina" || pathname.startsWith("/en/argentina/")) return redirect(pathname.slice(3) || "/argentina", "es");
  const alias = unwrapSpanishAlias(pathname);
  if (alias) return redirect(alias, "es");
  if (pathname === "/argentina" || pathname.startsWith("/argentina/")) {
    if (cookie === "es" && url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      const search = url.searchParams.toString();
      return { location: `${pathname}${search ? `?${search}` : ""}`, setCookie: "es" };
    }
    if (cookie === "es" || url.searchParams.get("lang") === "es") return null;
    url.searchParams.set("lang", "es");
    return { location: `${pathname}?${url.searchParams.toString()}`, setCookie: "es" };
  }
  const saved = cookie === "es" || cookie === "en" ? cookie : "";
  const preferred = saved || languageForCountry(country);
  if (!preferred || pathLanguage(pathname) === preferred) return null;
  const nextPath = localizePath(pathname, preferred);
  if (nextPath === pathname) return null;
  return redirect(nextPath, preferred);
}

/** Inclusive calendar date from config. No ticking countdown, and a past date turns the offer off. */
export function isLaunchActive(launch, now = new Date()) {
  if (!launch || launch.enabled !== true) return false;
  const spots = Number(launch.spotsLeft);
  if (!Number.isInteger(spots) || spots <= 0) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(launch.endsOn || ""))) return false;
  return now.toISOString().slice(0, 10) <= launch.endsOn;
}

export function sellingAmounts(list, launchActive) {
  const regular = Number(list.regularSetup);
  const discounted = launchActive && Number.isFinite(regular) && regular > Number(list.setup);
  return {
    setup: discounted || !Number.isFinite(regular) ? Number(list.setup) : regular,
    monthly: Number(list.monthly) || 0,
    regularSetup: discounted ? regular : null,
  };
}

export function quoteTier(tier, currency, rate, launchActive = false) {
  const list = currency === "ARS" ? tier.ar : tier.us;
  const amounts = sellingAmounts(list, launchActive);
  const multiplier = currency === "ARS" ? rate : 1;
  return {
    setup: Math.round(amounts.setup * multiplier),
    monthly: Math.round(amounts.monthly * multiplier),
    regular: amounts.regularSetup == null ? null : Math.round(amounts.regularSetup * multiplier),
  };
}

export function formatLaunchDate(endsOn, language = "es") {
  const [year, month, day] = String(endsOn).split("-").map(Number);
  return new Intl.DateTimeFormat(language === "es" ? "es-AR" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatAmount(amount, currency, language = "es") {
  const formatted = new Intl.NumberFormat(language === "es" ? "es-AR" : "en-US", { maximumFractionDigits: 0 }).format(amount);
  return `${currency} ${formatted}`;
}
