import { marketPayload } from "../shared/market-data.mjs";

export function createMarketHandler({ fetcher } = {}) {
  return async function market(req, res) {
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Vary", "X-Vercel-IP-Country");
    res.setHeader("Content-Type", "application/json");
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "method_not_allowed" });
    }
    const payload = await marketPayload(req.headers["x-vercel-ip-country"], fetcher);
    return res.status(200).json(payload);
  };
}

const market = createMarketHandler();
export default market;
