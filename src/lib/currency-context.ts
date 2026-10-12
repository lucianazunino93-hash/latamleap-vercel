import { createContext, useContext } from "react";

export type Currency = "ARS" | "USD";
export type RateSource = "live" | "cache" | "fallback";
export const CurrencyContext = createContext<{ currency: Currency; selectCurrency: (value: Currency) => void; arsPerUsd: number; rateSource: RateSource }>({ currency: "USD", selectCurrency: () => {}, arsPerUsd: 1500, rateSource: "fallback" });
export const useCurrency = () => useContext(CurrencyContext);
