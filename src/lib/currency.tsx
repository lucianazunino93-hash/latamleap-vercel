import { useEffect, useRef, useState, type ReactNode } from "react";
import { isCurrency } from "../../shared/pricing.mjs";
import { CurrencyContext, type Currency } from "./currency-context";

const storageKey = "latamleap.currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // The first render matches the static HTML; country detection does not block rendering.
  const [currency, setCurrency] = useState<Currency>("ARS");
  const manual = useRef(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (isCurrency(saved)) { manual.current = true; setCurrency(saved as Currency); return; }
    } catch { /* Storage may be unavailable. */ }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    fetch("/api/market", { signal: controller.signal, cache: "no-store" })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (!manual.current && !controller.signal.aborted && isCurrency(data?.currency)) setCurrency(data.currency); })
      .catch(() => { /* Retain ARS; the visible selector still works. */ })
      .finally(() => clearTimeout(timeout));
    return () => { controller.abort(); clearTimeout(timeout); };
  }, []);
  const selectCurrency = (value: Currency) => {
    manual.current = true; setCurrency(value);
    try { localStorage.setItem(storageKey, value); } catch { /* Selection works without persistence. */ }
  };
  return <CurrencyContext.Provider value={{ currency, selectCurrency }}>{children}</CurrencyContext.Provider>;
}
