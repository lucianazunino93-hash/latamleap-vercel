import { WHATSAPP_TEXT } from "./sales";

const STORAGE_KEY = "latamleap.ref";
const HOLD_MS = 90 * 24 * 60 * 60 * 1000;
const CODE = /^[A-Za-z0-9-]{3,24}$/;
const SITE = "https://www.latamleap.com";

export function isRefCode(value: string) {
  return CODE.test(value);
}

export function readRefFromUrl(search = typeof window === "undefined" ? "" : window.location.search) {
  const code = new URLSearchParams(search).get("ref") ?? "";
  if (!isRefCode(code)) return null;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, expiresAt: Date.now() + HOLD_MS }));
  } catch { /* private mode: the code still works for this page view */ }
  return code;
}

export function getRef() {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "";
    const stored = JSON.parse(raw) as { code?: unknown; expiresAt?: unknown };
    if (typeof stored.code !== "string" || !isRefCode(stored.code) || typeof stored.expiresAt !== "number" || stored.expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return "";
    }
    return stored.code;
  } catch {
    return "";
  }
}

export type ShareMarket = "es" | "en" | "ar";

export function shareUrl(market: ShareMarket, code = "") {
  const path = market === "en" ? "/en" : market === "ar" ? "/argentina" : "/";
  const url = new URL(`${SITE}${path}`);
  if (isRefCode(code)) url.searchParams.set("ref", code);
  return url.toString();
}

export function shareMessage(market: ShareMarket, code = "") {
  const link = shareUrl(market, code);
  const named = Boolean(code && isRefCode(code));
  if (market === "en") {
    const text = `I recommend Latam Leap for your website. You talk with them for 10 minutes and they show you how it could look: ${link}`;
    return named ? text : `${text} When you talk with them, mention who sent you.`;
  }
  if (market === "ar") {
    const text = `Te recomiendo Latam Leap para tu web. Hablás 10 minutos con ellos y te muestran cómo quedaría: ${link}`;
    return named ? text : `${text} Cuando hables con ellos, mencioná quién te envió.`;
  }
  const text = `Te recomiendo Latam Leap para tu web. Hablas 10 minutos con ellos y te muestran cómo quedaría: ${link}`;
  return named ? text : `${text} Cuando hables con ellos, menciona quién te envió.`;
}

export function shareWhatsAppUrl(market: ShareMarket, code = "") {
  return `https://wa.me/?text=${encodeURIComponent(shareMessage(market, code))}`;
}

/** Contact message to Latam Leap. The referral code is appended only when one is stored. */
export function contactWhatsAppText(language: "es" | "en") {
  const base = WHATSAPP_TEXT[language];
  const code = getRef();
  if (!code) return base;
  return `${base} ${language === "en" ? `Referred by: ${code}` : `Me recomendó: ${code}`}`;
}
