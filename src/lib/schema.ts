/**
 * JSON-LD-byggare (schema.org). Används via SeoHead-komponentens `schema`-prop.
 * Alla uppgifter hämtas ur site.ts så att NAP blir konsekvent överallt.
 */
import { SITE, OPENING_HOURS, FEES } from './site';
import { TREATMENTS } from './content';
import type { Condition, Treatment, Faq } from './content';

export interface Crumb {
  name: string;
  url: string;
}

function abs(url: string): string {
  return url.startsWith('http') ? url : new URL(url, SITE.url).href;
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: SITE.street,
  postalCode: SITE.postalCode,
  addressLocality: SITE.city,
  addressRegion: SITE.region,
  addressCountry: SITE.country,
};

/** MedicalClinic — huvudentiteten, refereras från alla andra noder. */
export function clinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${SITE.url}/#klinik`,
    name: SITE.name,
    legalName: SITE.fullName,
    description:
      'Apport är en privat smärtspecialistklinik i Kristianstad med avtal med Region Skåne. Vi utreder och behandlar lokala och regionala smärttillstånd med ultraljudsledd diagnostik, medicinsk behandling och fysioterapi.',
    url: `${SITE.url}/`,
    telephone: SITE.phoneHref,
    email: SITE.email,
    address: ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    foundingDate: SITE.founded,
    vatID: SITE.orgNr,
    areaServed: [
      { '@type': 'City', name: 'Kristianstad' },
      { '@type': 'AdministrativeArea', name: 'Skåne' },
    ],
    openingHoursSpecification: OPENING_HOURS.map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${
        { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday' }[d.dayCode]
      }`,
      opens: d.opens,
      closes: d.closes,
    })),
    medicalSpecialty: ['PainMedicine', 'PhysicalTherapy', 'Rehabilitation'],
    availableService: [
      { '@type': 'MedicalTest', name: 'Smärtutredning med ultraljudsledda diagnostiska blockader' },
      { '@type': 'MedicalTherapy', name: 'Triggerpunkts- och periostakupunktur' },
      { '@type': 'MedicalTherapy', name: 'Proloterapi' },
      { '@type': 'MedicalTherapy', name: 'PRP — Platelet Rich Plasma' },
      { '@type': 'MedicalTherapy', name: 'Pulsad radiofrekvens (pRF)' },
      { '@type': 'MedicalTherapy', name: 'Fysioterapi och stabilitetsträning' },
    ],
    priceRange: `Patientavgift ${FEES.visit}, frikort gäller`,
    isAcceptingNewPatients: true,
    paymentAccepted: 'Kontant, faktura, Swish',
    currenciesAccepted: 'SEK',
  };
}

/** Physician-noder för de två klinikerna. */
export function physicianSchema(opts: {
  name: string;
  role: string;
  url: string;
  credentials: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': abs(opts.url) + '#person',
    name: opts.name,
    jobTitle: opts.role,
    url: abs(opts.url),
    worksFor: { '@id': `${SITE.url}/#klinik` },
    address: ADDRESS,
    telephone: SITE.phoneHref,
    knowsAbout: opts.credentials,
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** MedicalWebPage för besvärssidor — signalerar medicinskt granskat innehåll. */
export function conditionSchema(condition: Condition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${SITE.url}/besvar/${condition.slug}/#sida`,
    name: condition.heading,
    description: condition.metaDescription,
    url: `${SITE.url}/besvar/${condition.slug}/`,
    inLanguage: 'sv-SE',
    about: {
      '@type': 'MedicalCondition',
      name: condition.name,
      possibleTreatment: condition.relatedTreatments
        .map((slug) => TREATMENTS.find((t) => t.slug === slug))
        .filter((t): t is Treatment => Boolean(t))
        .map((t) => ({
          '@type': t.slug === 'utredning' ? 'MedicalTest' : 'MedicalTherapy',
          name: t.name,
          url: `${SITE.url}/behandlingar/${t.slug}/`,
        })),
    },
    provider: { '@id': `${SITE.url}/#klinik` },
    audience: { '@type': 'Patient' },
  };
}

export function treatmentSchema(treatment: Treatment) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${SITE.url}/behandlingar/${treatment.slug}/#sida`,
    name: treatment.heading,
    description: treatment.metaDescription,
    url: `${SITE.url}/behandlingar/${treatment.slug}/`,
    inLanguage: 'sv-SE',
    about: {
      '@type': treatment.slug === 'utredning' ? 'MedicalTest' : 'MedicalTherapy',
      name: treatment.name,
description: treatment.teaser,
    },
    provider: { '@id': `${SITE.url}/#klinik` },
    audience: { '@type': 'Patient' },
  };
}

/** WebSite-nod för startsidan. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#webbplats`,
    url: `${SITE.url}/`,
    name: `${SITE.name} — ${SITE.tagline}`,
    inLanguage: 'sv-SE',
    publisher: { '@id': `${SITE.url}/#klinik` },
  };
}
