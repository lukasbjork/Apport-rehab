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

/**
 * Personnod för teamet.
 *
 * VIKTIGT: bara Rolf är läkare. Schema.org-typen Physician får inte användas
 * för Helene, som är legitimerad fysioterapeut — det vore en felaktig uppgift
 * om en namngiven persons yrkesbehörighet. Hon får därför Person med
 * jobTitle och hasCredential i stället.
 */
export function personSchema(opts: {
  name: string;
  role: string;
  url: string;
  credentials: string[];
  /** true endast för legitimerad läkare */
  isPhysician: boolean;
  specialties: string[];
}) {
  const nod: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.isPhysician ? 'Physician' : 'Person',
    '@id': abs(opts.url) + '#person',
    name: opts.name,
    jobTitle: opts.role,
    url: abs(opts.url),
    worksFor: { '@id': `${SITE.url}/#klinik` },
    knowsAbout: opts.credentials,
    hasCredential: opts.credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
  };

  // medicalSpecialty hör bara hemma på en Physician-nod
  if (opts.isPhysician) {
    nod.medicalSpecialty = opts.specialties;
    nod.address = ADDRESS;
    nod.telephone = SITE.phoneHref;
  }

  return nod;
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

/**
 * Article för bloggartiklar.
 *
 * Typen MedicalWebPage vore fel här: artiklarna är redaktionellt innehåll
 * som förklarar hur kliniken arbetar, inte sidor som beskriver ett tillstånd
 * eller en behandling. Article med författare och datum är det korrekta.
 */
export function articleSchema(opts: {
  slug: string;
  titel: string;
  beskrivning: string;
  datum: string;
  forfattarNamn: string;
  forfattarUrl: string;
  bild?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE.url}/artiklar/${opts.slug}/#artikel`,
    headline: opts.titel,
    description: opts.beskrivning,
    url: `${SITE.url}/artiklar/${opts.slug}/`,
    inLanguage: 'sv-SE',
    datePublished: opts.datum,
    dateModified: opts.datum,
    author: {
      '@type': 'Person',
      name: opts.forfattarNamn,
      url: abs(opts.forfattarUrl),
    },
    publisher: { '@id': `${SITE.url}/#klinik` },
    ...(opts.bild ? { image: abs(opts.bild) } : {}),
    isPartOf: { '@id': `${SITE.url}/#webbplats` },
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
