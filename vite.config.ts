import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { languageForCountry, localizePath, pathLanguage } from "./shared/geo.mjs";
import { marketPayload } from "./shared/market-data.mjs";

const bots = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|preview|lighthouse/i;
function cookie(header = "", name: string) {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}
function geoPreview() {
  const handler = async (req: { url?: string; method?: string; headers: Record<string, string | string[] | undefined> }, res: { setHeader: (key: string, value: string) => void; end: (body?: string) => void; statusCode: number }, next: () => void) => {
    const url = req.url || "/";
    const header = req.headers["x-vercel-ip-country"];
    const country = Array.isArray(header) ? header[0] : header;
    if (url.startsWith("/api/market")) {
      const payload = await marketPayload(country);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "private, no-store");
      res.setHeader("Vary", "X-Vercel-IP-Country");
      res.end(JSON.stringify(payload));
      return;
    }
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const pathname = url.split("?")[0];
    if (pathname.startsWith("/api") || pathname.startsWith("/@") || pathname.startsWith("/src") || pathname.includes(".")) return next();
    const userAgent = String(req.headers["user-agent"] || "");
    if (bots.test(userAgent)) return next();
    const saved = cookie(String(req.headers.cookie || ""), "latamleap.lang");
    const preferred = saved === "es" || saved === "en" ? saved : languageForCountry(country);
    if (!preferred || pathLanguage(pathname) === preferred) return next();
    const search = url.includes("?") ? url.slice(url.indexOf("?")) : "";
    res.statusCode = 307;
    res.setHeader("Location", `${localizePath(pathname, preferred)}${search}`);
    res.setHeader("Set-Cookie", `latamleap.lang=${preferred}; Path=/; Max-Age=31536000; SameSite=Lax`);
    res.end();
  };
  return { name: "latamleap-geo", configureServer(server: { middlewares: { use: (fn: typeof handler) => void } }) { server.middlewares.use(handler); }, configurePreviewServer(server: { middlewares: { use: (fn: typeof handler) => void } }) { server.middlewares.use(handler); } };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: { manifest: true },
  server: {
    host: "::",
    port: 8080,
    proxy: { "/api": "http://127.0.0.1:3001" },
    hmr: {
      overlay: false,
    },
  },
  plugins: [geoPreview(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
