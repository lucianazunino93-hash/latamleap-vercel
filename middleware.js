import { languageForCountry, localizePath, pathLanguage } from "./shared/geo.mjs";

const bots = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|lighthouse/i;

export const config = {
  matcher: ["/((?!api/|assets/|fonts/|.*\\..*).*)"],
};

function cookie(header, name) {
  const match = String(header || "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

export default function middleware(request) {
  const userAgent = request.headers.get("user-agent") || "";
  if (bots.test(userAgent)) return;
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/")) return;
  const saved = cookie(request.headers.get("cookie"), "latamleap.lang");
  const preferred = saved === "es" || saved === "en" ? saved : languageForCountry(request.headers.get("x-vercel-ip-country"));
  if (!preferred || pathLanguage(url.pathname) === preferred) return;
  const target = new URL(request.url);
  target.pathname = localizePath(url.pathname, preferred);
  if (target.pathname === url.pathname) return;
  return new Response(null, {
    status: 307,
    headers: {
      Location: target.href,
      "Set-Cookie": `latamleap.lang=${preferred}; Path=/; Max-Age=31536000; SameSite=Lax`,
      Vary: "X-Vercel-IP-Country",
    },
  });
}
