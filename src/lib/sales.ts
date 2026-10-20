import decisions from "../../shared/decisions.json";

export const CALENDAR_URL = "https://calendar.app.google/Zt3Lb8W5WCaJAdGT8";
// demo.latamleap.com did not resolve on 2026-10-20 (curl exit 6). Stay on the verified demo until HTTPS returns 200.
export const DEMO_URL = "https://demo-prime-home-solutions.vercel.app";
export const EXAMPLE_URL = DEMO_URL;
export const INSTAGRAM_URL = "https://www.instagram.com/latam.leap/";
export const EMAIL = "hola@latamleap.com";

/** Single public phone. Edit shared/decisions.json contactPhone to swap it (for example, a US number). */
export const CONTACT_PHONE = decisions.contactPhone;
export const WHATSAPP_PHONE = decisions.contactPhone.replace(/\D/g, "");

export const WHATSAPP_TEXT = {
  es: "Hola, vi la web de LatamLeap y quiero agendar 10 minutos.",
  en: "Hi, I saw the LatamLeap site and I'd like to book 10 minutes.",
} as const;

export function whatsAppUrl(language: "es" | "en") {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_TEXT[language])}`;
}

export function rememberLanguage(value: "es" | "en") {
  document.cookie = `latamleap.lang=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
