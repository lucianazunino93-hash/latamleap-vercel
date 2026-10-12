import { priceFor } from './pricing.mjs';

export function getServiceCopy(service, plan, lang, currency = 'ARS') {
  const price = new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US').format(priceFor(plan, currency));
  const replace = value => Array.isArray(value) ? value.map(replace) : typeof value === 'string' ? value.replaceAll('{price}', price).replaceAll('{currency}', currency) : value;
  return Object.fromEntries(Object.entries(service[lang]).map(([key, value]) => [key, replace(value)]));
}

export function createSeoModel({ seo, catalog, english, servicePages, offers }) {
  const origin = seo.origin;
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const translate = (value, lang) => lang === 'en' ? english[value] || value : value;
  const localized = (path, lang) => lang === 'en' ? `/en${path === '/' ? '' : path}` : path;
  const absolute = path => `${origin}${path}`;
  const basePath = route => route === '/en' ? '/' : route.startsWith('/en/') ? route.slice(3) : route;
  const language = route => route === '/en' || route.startsWith('/en/') ? 'en' : 'es';
  const pages = { ...seo.pages };
  const amount = (id, lang, currency = 'ARS') => new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US').format(priceFor(catalog.find(plan => plan.id === id), currency));
  if (offers?.tiers?.length) {
    const tier = id => offers.tiers.find(item => item.id === id);
    const presence = tier('presence'), leads = tier('leads'), assistant = tier('assistant');
    pages['/'] = [pages['/'][0], `Para clínicas, veterinarias, estudios de yoga, cafés y oficios. Presencia desde USD ${presence.us.setup}, captación automática desde USD ${leads.us.setup} y asistente con IA desde USD ${assistant.us.setup}. En Argentina, Presencia desde USD ${presence.ar.setup}.`];
    pages['/en'] = [pages['/en'][0], `For clinics, vet practices, yoga studios, cafés and trades. Presence from USD ${presence.us.setup}, automated lead capture from USD ${leads.us.setup} and an AI assistant from USD ${assistant.us.setup}. In Argentina, Presence from USD ${presence.ar.setup}.`];
    pages['/services'] = [pages['/services'][0], pages['/'][1]];
    pages['/en/services'] = [pages['/en/services'][0], pages['/en'][1]];
  }
  for (const service of servicePages) for (const lang of ['es', 'en']) {
    const copy = getServiceCopy(service, catalog.find(plan => plan.id === service.id), lang);
    const usd = getServiceCopy(service, catalog.find(plan => plan.id === service.id), lang, 'USD');
    const priceNote = lang === 'es' ? ` Internacional: USD ${amount(service.id, lang, 'USD')}.` : ` Argentina: ARS ${amount(service.id, lang)}.`;
    pages[localized(service.path, lang)] = [copy.title, (lang === 'es' ? copy.description : usd.description) + priceNote];
  }
  const isIndexable = route => Boolean(pages[route]) && !['/privacy-policy', '/terms-of-service', '/data-deletion'].includes(basePath(route));
  const alternates = route => {
    const path = basePath(route);
    return { es: absolute(path), en: absolute(localized(path, 'en')), 'x-default': absolute(path) };
  };
  function schema(route) {
    if (!pages[route]) return null;
    const lang = language(route), path = basePath(route), url = absolute(route);
    const nodes = [
      { '@type': 'Organization', '@id': organizationId, name: 'Latam Leap', url: `${origin}/`, email: 'hola@latamleap.com', telephone: '+54 9 351 208 5644', image: `${origin}/og-latamleap.png`, sameAs: ['https://www.instagram.com/latam.leap/'], areaServed: ['United States', 'Argentina'], founder: { '@type': 'Person', name: 'Luciana Zunino' }, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+54 9 351 208 5644', email: 'hola@latamleap.com', availableLanguage: ['Spanish', 'English'] } },
      { '@type': ['ProfessionalService', 'LocalBusiness'], '@id': `${origin}/#local-business`, name: 'Latam Leap', url: `${origin}/`, image: `${origin}/og-latamleap.png`, email: 'hola@latamleap.com', telephone: '+54 9 351 208 5644', priceRange: '$$', currenciesAccepted: 'USD, ARS', address: { '@type': 'PostalAddress', addressCountry: 'AR' }, areaServed: ['United States', 'Argentina'], sameAs: ['https://www.instagram.com/latam.leap/'], founder: { '@type': 'Person', name: 'Luciana Zunino' } },
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
    if (offers?.tiers && ['/', '/services'].includes(path)) {
      for (const tier of offers.tiers) {
        const offerFor = (list, name) => ({ '@type': 'Offer', name, price: list.setup, priceCurrency: 'USD', url: `${absolute(localized('/', lang))}#precios`, ...(list.monthly ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: list.monthly, priceCurrency: 'USD', unitText: 'MONTH' } } : {}) });
        nodes.push({ '@type': 'Service', '@id': `${origin}/#offer-${tier.id}`, name: tier.name[lang], description: tier.summary[lang], serviceType: tier.name.en, provider: { '@id': `${origin}/#local-business` }, areaServed: ['United States', 'Argentina'], offers: [offerFor(tier.us, 'United States'), offerFor(tier.ar, 'Argentina')] });
      }
      nodes.push({ '@type': 'ItemList', '@id': `${url}#offers`, itemListElement: offers.tiers.map((tier, index) => ({ '@type': 'ListItem', position: index + 1, name: tier.name[lang], item: { '@id': `${origin}/#offer-${tier.id}` } })) });
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
