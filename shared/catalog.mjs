import fs from "node:fs";

const offers = JSON.parse(fs.readFileSync(new URL("./offers.json", import.meta.url)));

export function buildCatalog(source = offers) {
  const depositArs = Math.round(source.ar.price / 2);
  const depositUsd = source.us.price / 2;
  const pesos = new Intl.NumberFormat("es-AR").format(source.ar.price);
  return [
    {
      id: "web-5-secciones-sena",
      name: "Web de 5 secciones · seña 50%",
      price: depositArs,
      priceUSD: depositUsd,
      description: `Seña del 50% de la web de 5 secciones (ARS ${pesos}). El saldo se paga al publicar.`,
      features: ["5 secciones", "Formulario que abre WhatsApp y avisa por email", "Dos rondas de cambios", "Publicación en tu dominio"],
    },
    {
      id: "web-5-secciones-saldo",
      name: "Web de 5 secciones · saldo 50%",
      price: depositArs,
      priceUSD: depositUsd,
      description: "Saldo del 50% al aprobar y publicar.",
      features: [],
    },
    {
      id: "custom",
      name: "Proyecto a medida",
      price: 0,
      priceUSD: 0,
      description: "Tiendas, sistemas y automatizaciones: se cotizan después de la charla.",
      features: [],
    },
  ];
}
