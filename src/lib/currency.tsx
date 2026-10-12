import { useEffect, useRef, useState, type ReactNode } from "react";
import offers from "../../shared/offers.json";
import { isCurrency } from "../../shared/pricing.mjs";
import { CurrencyContext, type Currency, type RateSource } from "./currency-context";

const storageKey = "latamleap.currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // The first render matches the static HTML. Country detection updates the price after load.
  const [currency, setCurrency] = useState<Currency>("USD");
  const [arsPerUsd, setArsPerUsd] = useState(offers.fallbackArsPerUsd);
  const [rateSource, setRateSource] = useState<RateSource>("fallback");
  const manual = useRef(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (isCurrency(saved)) { manual.current = true; setCurrency(saved as Currency); }
    } catch { /* Storage may be unavailable. */ }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    fetch("/api/market", { signal: controller.signal, cache: "no-store" })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (controller.signal.aborted || !data) return;
        if (Number.isFinite(data.arsPerUsd) && data.arsPerUsd > 0) setArsPerUsd(data.arsPerUsd);
        if (data.rateSource === "live" || data.rateSource === "cache" || data.rateSource === "fallback") setRateSource(data.rateSource);
        if (!manual.current && isCurrency(data.currency)) setCurrency(data.currency);
      })
      .catch(() => { /* Keep USD and the fallback rate. The selector still works. */ })
      .finally(() => clearTimeout(timeout));
    return () => { controller.abort(); clearTimeout(timeout); };
  }, []);
  const selectCurrency = (value: Currency) => {
    manual.current = true; setCurrency(value);
    try { localStorage.setItem(storageKey, value); } catch { /* Selection works without persistence. */ }
  };
  return <CurrencyContext.Provider value={{ currency, selectCurrency, arsPerUsd, rateSource }}>{children}</CurrencyContext.Provider>;
}
