import { useContext } from "react";
import { LanguageContext } from "@/lib/language-context";
import { formatPrice } from "../../shared/pricing.mjs";

export default function PriceComparison({ item }: { item: { price: number; priceUSD: number } }) {
  const language = useContext(LanguageContext);
  return <details className="text-xs text-muted-foreground mb-5">
    <summary className="cursor-pointer underline">{language === "es" ? "Ver precios por moneda" : "View prices by currency"}</summary>
    <p className="mt-2">Argentina: {formatPrice(item, "ARS", language)} · {language === "es" ? "Internacional" : "International"}: {formatPrice(item, "USD", language)}</p>
  </details>;
}
