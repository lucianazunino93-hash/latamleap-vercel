import { useContext } from "react";
import { LanguageContext } from "@/lib/language-context";
import { useCurrency, type Currency } from "@/lib/currency-context";

export default function CurrencySelector() {
  const language = useContext(LanguageContext);
  const { currency, selectCurrency } = useCurrency();
  return <label className="text-xs font-bold">
    <span className="sr-only">{language === "es" ? "Moneda de los precios" : "Pricing currency"}</span>
    <select aria-label={language === "es" ? "Moneda de los precios" : "Pricing currency"} value={currency} onChange={event => selectCurrency(event.target.value as Currency)} className="bg-background text-foreground border border-border rounded px-1 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
      <option value="ARS">ARS</option><option value="USD">USD</option>
    </select>
  </label>;
}
