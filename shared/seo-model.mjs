export function getServiceCopy(service, plan, lang) {
  const price = new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US').format(plan.price);
  const replace = value => Array.isArray(value) ? value.map(replace) : typeof value === 'string' ? value.replaceAll('{price}', price) : value;
  return Object.fromEntries(Object.entries(service[lang]).map(([key, value]) => [key, replace(value)]));
}

export function createSeoModel({ seo, catalog, english, servicePages }) {
  const origin = seo.origin;
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const translate = (value, lang) => lang === 'en' ? english[value] || value : value;
  const localized = (path, lang) => lang === 'en' ? `/en${path === '/' ? '' : path}` : path;
  const absolute = path => `${origin}${path}`;
  const basePath = route => route === '/en' ? '/' : route.startsWith('/en/') ? route.slice(3) : route;
  const language = route => route === '/en' || route.startsWith('/en/') ? 'en' : 'es';
  const pages = { ...seo.pages };
  const amount = (id, lang) => new Intl.NumberFormat(lang === 'es' ? 'es-AR' : 'en-US').format(catalog.find(plan => plan.id === id).price);
  pages['/services'] = [pages['/services'][0], `Landings desde $${amount('landing', 'es')}, webs profesionales desde $${amount('sitio', 'es')} y tiendas online desde $${amount('tienda', 'es')} ARS. Alcance claro y cuidado mensual opcional.`];
  pages['/en/services'] = [pages['/en/services'][0], `Landing pages from ARS ${amount('landing', 'en')}, business websites from ARS ${amount('sitio', 'en')} and online stores from ARS ${amount('tienda', 'en')}. Clear scope and optional monthly care.`];
  for (const service of servicePages) for (const lang of ['es', 'en']) {
    const copy = getServiceCopy(service, catalog.find(plan => plan.id === service.id), lang);
    pages[localized(service.path, lang)] = [copy.title, copy.description];
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
      { '@type': 'Organization', '@id': organizationId, name: 'Latam Leap', url: `${origin}/`, email: 'hola@latamleap.com', telephone: '+54 9 351 208 5644', sameAs: ['https://www.instagram.com/latam.leap/'], areaServed: { '@type': 'Country', name: 'Argentina' }, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+54 9 351 208 5644', email: 'hola@latamleap.com', availableLanguage: ['Spanish', 'English'] } },
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
    const plans = servicePage ? catalog.filter(plan => plan.id === servicePage.id) : ['/', '/services'].includes(path) ? catalog : [];
    for (const plan of plans) {
      const service = servicePages.find(item => item.id === plan.id);
      const serviceUrl = absolute(localized(service.path, lang));
      nodes.push({ '@type': 'Service', '@id': `${serviceUrl}#service`, url: serviceUrl, name: translate(plan.name, lang), description: translate(plan.description, lang), serviceType: service[lang].title.split(' | ')[0], provider: { '@id': organizationId }, areaServed: { '@type': 'Country', name: 'Argentina' }, offers: { '@type': 'AggregateOffer', lowPrice: plan.price, priceCurrency: 'ARS', offerCount: 1, url: serviceUrl } });
    }
    if (plans.length > 1) nodes.push({ '@type': 'ItemList', '@id': `${url}#services`, itemListElement: plans.map((plan, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@id': `${absolute(localized(servicePages.find(item => item.id === plan.id).path, lang))}#service` } })) });
    return { '@context': 'https://schema.org', '@graph': nodes };
  }
  return { origin, pages, localized, basePath, language, isIndexable, alternates, schema };
}

export const serializeSchema = value => JSON.stringify(value).replaceAll('<', '\\u003c');
