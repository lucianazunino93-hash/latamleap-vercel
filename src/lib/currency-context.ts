import { createContext, useContext } from "react";

export type Currency = "ARS" | "USD";
export const CurrencyContext = createContext<{ currency: Currency; selectCurrency: (value: Currency) => void }>({ currency: "ARS", selectCurrency: () => {} });
export const useCurrency = () => useContext(CurrencyContext);
