export { currencyForCountry } from './geo.mjs';
export const isCurrency = value => value === 'ARS' || value === 'USD';
export const priceFor = (item, currency = 'ARS') => currency === 'USD' ? item.priceUSD : item.price;
export const formatPrice = (item, currency = 'ARS', language = 'es') => `${currency} ${new Intl.NumberFormat(language === 'es' ? 'es-AR' : 'en-US', { maximumFractionDigits: 0 }).format(priceFor(item, currency))}`;
