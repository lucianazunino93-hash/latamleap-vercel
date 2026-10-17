export const CALENDAR_URL = "https://calendar.app.google/Zt3Lb8W5WCaJAdGT8";
export const EXAMPLE_URL = "https://demo-prime-home-solutions.vercel.app";
export const INSTAGRAM_URL = "https://www.instagram.com/latam.leap/";
export const EMAIL = "hola@latamleap.com";
export const WHATSAPP_PHONE = "5493512085644";

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
