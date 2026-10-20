import { priceFor } from './pricing.mjs';

export function getServiceCopy(service, plan, lang, currency = 'ARS') {
  const price = new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US').format(priceFor(plan, currency));
  const replace = value => Array.isArray(value) ? value.map(replace) : typeof value === 'string' ? value.replaceAll('{price}', price).replaceAll('{currency}', currency) : value;
  return Object.fromEntries(Object.entries(service[lang]).map(([key, value]) => [key, replace(value)]));
}

export function shareImageAlt(lang) {
  return lang === 'es'
    ? 'Latam Leap: webs bilingües que reciben pedidos por WhatsApp.'
    : 'Latam Leap: bilingual websites that take job requests on WhatsApp.';
}

export function createSeoModel({ seo, catalog, english, servicePages, offers, contactPhone }) {
  const origin = seo.origin;
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const translate = (value, lang) => lang === 'en' ? english[value] || value : value;
  const localized = (path, lang) => lang === 'en' ? `/en${path === '/' ? '' : path}` : path;
  const absolute = path => `${origin}${path}`;
  const basePath = route => route === '/en' ? '/' : route.startsWith('/en/') ? route.slice(3) : route;
  const language = route => route === '/en' || route.startsWith('/en/') ? 'en' : 'es';
  const pages = { ...seo.pages };
  if (offers?.us?.price) {
    pages['/'] = [pages['/'][0], `Webs en español e inglés para plomeros, electricistas y HVAC. Tus clientes te mandan el pedido por WhatsApp. USD ${offers.us.price}, precio fijo.`];
    pages['/en'] = [pages['/en'][0], `English and Spanish websites for plumbers, electricians and HVAC pros. Customers send job requests to your WhatsApp. USD ${offers.us.price}, fixed price.`];
  }
  if (offers?.ar?.price && pages['/argentina']) {
    pages['/argentina'] = [pages['/argentina'][0], `Web de 5 secciones para negocios en Argentina. Precio cerrado ARS ${new Intl.NumberFormat('es-AR').format(offers.ar.price)}. Seña del 50% y saldo al publicar.`];
  }
  const isIndexable = route => Boolean(pages[route]) && !['/privacy-policy', '/terms-of-service', '/data-deletion'].includes(basePath(route));
  const alternates = route => {
    const path = basePath(route);
    if (path === '/argentina') return { es: absolute('/argentina'), 'x-default': absolute('/argentina') };
    return { es: absolute(path), en: absolute(localized(path, 'en')), 'x-default': absolute(path) };
  };
  function schema(route) {
    if (!pages[route]) return null;
    const lang = language(route), path = basePath(route), url = absolute(route);
    const phone = contactPhone || '';
    const served = path === '/argentina' ? ['Argentina'] : ['United States'];
    const nodes = [
      { '@type': 'Organization', '@id': organizationId, name: 'Latam Leap', url: `${origin}/`, email: 'hola@latamleap.com', telephone: phone, image: `${origin}/og-latamleap.png`, sameAs: ['https://www.instagram.com/latam.leap/'], areaServed: served, founder: { '@type': 'Person', name: 'Luciana' }, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: phone, email: 'hola@latamleap.com', availableLanguage: ['Spanish', 'English'] } },
      { '@type': ['ProfessionalService', 'LocalBusiness'], '@id': `${origin}/#local-business`, name: 'Latam Leap', url: `${origin}/`, image: `${origin}/og-latamleap.png`, email: 'hola@latamleap.com', telephone: phone, priceRange: '$$', currenciesAccepted: 'USD, ARS', areaServed: served, sameAs: ['https://www.instagram.com/latam.leap/'], founder: { '@type': 'Person', name: 'Luciana' } },
      { '@type': 'WebSite', '@id': websiteId, name: 'Latam Leap', url: `${origin}/`, publisher: { '@id': organizationId }, inLanguage: ['es-AR', 'en'] },
      { '@type': path === '/about' ? 'AboutPage' : path === '/case-studies' || path === '/services' ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url, name: pages[route][0], description: pages[route][1], inLanguage: lang === 'es' ? 'es-AR' : 'en', isPartOf: { '@id': websiteId }, about: { '@id': organizationId }, ...(path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumbs` } } : {}) },
    ];
    const servicePage = servicePages.find(service => service.path === path);
    if (path !== '/') {
      const crumbs = [{ '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: absolute(localized('/', lang)) }];
      if (servicePage) crumbs.push({ '@type': 'ListItem', position: 2, name: lang === 'es' ? 'Servicios' : 'Services', item: absolute(localized('/services', lang)) });
      crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1, name: servicePage ? translate(catalog.find(plan => plan.id === servicePage.id).name, lang) : pages[route][0].split(' | ')[0], item: url });
      nodes.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`, itemListElement: crumbs });
    }
    const plans = servicePage ? catalog.filter(plan => plan.id === servicePage.id) : [];
    if (offers?.us && path === '/') {
      const offerUrl = `${absolute(localized('/', lang))}#oferta`;
      const listed = [
        { '@type': 'Offer', name: offers.us.name[lang], price: offers.us.price, priceCurrency: 'USD', url: offerUrl },
        { '@type': 'Offer', name: lang === 'es' ? 'Plan de cuidado opcional' : 'Optional care plan', price: offers.us.maintenance, priceCurrency: 'USD', url: offerUrl, priceSpecification: { '@type': 'UnitPriceSpecification', price: offers.us.maintenance, priceCurrency: 'USD', unitText: 'MONTH' } },
      ];
      nodes.push({
        '@type': 'Service',
        '@id': `${origin}/#offer-bilingual`,
        name: offers.us.name[lang],
        description: pages[route][1],
        serviceType: offers.us.name.en,
        provider: { '@id': `${origin}/#local-business` },
        areaServed: 'United States',
        offers: listed,
      });
    }
    if (offers?.ar && path === '/argentina') {
      const offerUrl = `${absolute('/argentina')}#oferta`;
      nodes.push({
        '@type': 'Service',
        '@id': `${origin}/#offer-argentina`,
        name: offers.ar.name,
        description: pages[route][1],
        serviceType: 'Website',
        provider: { '@id': `${origin}/#local-business` },
        areaServed: 'Argentina',
        offers: [
          { '@type': 'Offer', name: 'Precio cerrado', price: offers.ar.price, priceCurrency: 'ARS', url: offerUrl },
          { '@type': 'Offer', name: 'Mantenimiento opcional', price: offers.ar.maintenance, priceCurrency: 'ARS', url: offerUrl, priceSpecification: { '@type': 'UnitPriceSpecification', price: offers.ar.maintenance, priceCurrency: 'ARS', unitText: 'MONTH' } },
        ],
      });
    }
    for (const plan of plans) {
      const service = servicePages.find(item => item.id === plan.id);
      const serviceUrl = absolute(localized(service.path, lang));
      nodes.push({ '@type': 'Service', '@id': `${serviceUrl}#service`, url: serviceUrl, name: translate(plan.name, lang), description: translate(plan.description, lang), serviceType: service[lang].title.split(' | ')[0], provider: { '@id': organizationId }, areaServed: 'Worldwide', offers: ['ARS', 'USD'].map(currency => ({ '@type': 'AggregateOffer', lowPrice: priceFor(plan, currency), priceCurrency: currency, offerCount: 1, url: serviceUrl })) });
    }
    if (plans.length > 1) nodes.push({ '@type': 'ItemList', '@id': `${url}#services`, itemListElement: plans.map((plan, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@id': `${absolute(localized(servicePages.find(item => item.id === plan.id).path, lang))}#service` } })) });
    return { '@context': 'https://schema.org', '@graph': nodes };
  }
  return { origin, pages, localized, basePath, language, isIndexable, alternates, schema };
}

export const serializeSchema = value => JSON.stringify(value).replaceAll('<', '\\u003c');
