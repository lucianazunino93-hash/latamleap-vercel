import { languageDecision, safeRedirect } from "./shared/geo.mjs";

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
  const decision = languageDecision(url, {
    cookie: cookie(request.headers.get("cookie"), "latamleap.lang"),
    country: request.headers.get("x-vercel-ip-country"),
  });
  if (!decision) return;
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  const headers = {
    "Set-Cookie": `latamleap.lang=${decision.setCookie}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`,
    Vary: "X-Vercel-IP-Country",
  };
  if (!decision.location) return new Response(null, { headers: { ...headers, "x-middleware-next": "1" } });
  const location = safeRedirect(decision.location, request.url);
  if (!location) return new Response(null, { headers: { ...headers, "x-middleware-next": "1" } });
  return new Response(null, { status: 307, headers: { ...headers, Location: location } });
}
