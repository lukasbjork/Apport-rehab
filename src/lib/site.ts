/**
 * Central plats för ALL företagsspecifik information.
 *
 * KÄLLOR (kontrollerat 2026-08-31):
 *  - apport.rehab (nuvarande sajt: /kliniken/, /om-oss/, /kontakt/,
 *    /apport-smarta/, /apport-fysioterapi/, /utredning/, /behandling/,
 *    /diagnos/, /sjalvlakning/, /om-du-inte-ar-nojd/, /leder/)
 *  - 1177.se vårdgivarkort "Jönsson Rolf, Kristianstad"
 *  - allabolag.se (Apport AB, org.nr 556813-7169)
 *
 * Allt markerat [ÄNDRA] eller [VERIFIERA] måste bekräftas av kliniken.
 * Se checklistan i README.md.
 */

export const SITE = {
  name: 'Apport',
  fullName: 'Apport AB',
  tagline: 'Smärtspecialistklinik i Kristianstad',

  /** [VID LANSERING] Byt till https://www.apport.rehab — ska matcha astro.config.mjs */
  url: 'https://apport-rehab.vercel.app',

  /** Växel. Verifierad mot 1177 och samtliga sidor på nuvarande sajt. */
  phone: '044-10 60 00',
  phoneHref: '+4644106000',

  /** Patientmejl för egenremiss och tidsfrågor. */
  email: 'patient@apport.rehab',
  /** Administrativ adress (GDPR-sidan på nuvarande sajt). */
  emailAdmin: 'info@apport.rehab',

  /**
   * Besöksadress. Verifierad mot 1177 OCH /kontakt/ på nuvarande sajt.
   * OBS: allabolag.se anger Östra Storgatan 30 som registrerad adress.
   * [VERIFIERA] Bekräfta med kliniken vilken som är korrekt besöksadress.
   */
  street: 'Östra Storgatan 25',
  postalCode: '291 32',
  city: 'Kristianstad',
  region: 'Skåne',
  country: 'SE',

  /** Borgmästaregården, 2:a våningen. Källa: /kliniken/ */
  addressNote: '2:a våningen på Borgmästaregården, vid Stora Torg',

  /** Koordinater för Stora Torg, Kristianstad. [VERIFIERA] exakt entré. */
  geo: { lat: 56.0294, lng: 14.1567 },

  orgNr: '556813-7169',
  founded: '2010',

  /** Källa: allabolag.se, SNI 86950 */
  sni: 'Fysioterapeutisk verksamhet',

  /** Verksamhetschef. Källa: /kliniken/ */
  medicalDirector: 'Rolf Jönsson',

  /** [ÄNDRA] Formspree-endpoint — skapa gratis på formspree.io och klistra in. */
  formEndpoint: '',

  /** [VERIFIERA] Facebook-länk finns på nuvarande sajt men URL:en är inte publik i markup. */
  facebook: '',
} as const;

/** Öppettider. Källa: 1177.se vårdgivarkort (kontrollerat 2026-08-31). */
export const OPENING_HOURS = [
  { day: 'Måndag', hours: '08.00–16.00', dayCode: 'Mo', opens: '08:00', closes: '16:00' },
  { day: 'Tisdag', hours: '08.30–17.00', dayCode: 'Tu', opens: '08:30', closes: '17:00' },
  { day: 'Onsdag', hours: '08.30–17.00', dayCode: 'We', opens: '08:30', closes: '17:00' },
  { day: 'Torsdag', hours: '08.30–17.00', dayCode: 'Th', opens: '08:30', closes: '17:00' },
  { day: 'Fredag', hours: '08.30–16.30', dayCode: 'Fr', opens: '08:30', closes: '16:30' },
] as const;

/** Telefontid. Källa: 1177.se + /apport-smarta/ */
export const PHONE_HOURS = 'Måndag 08.00–09.00';

/**
 * Direktnummer. Källa: /kontakt/ och /apport-smarta/.
 * OBS: nuvarande sajt anger 0708-157882 på /kontakt/ men 0708-158278 på
 * /apport-smarta/ för samma ändamål (SMS till Rolf).
 * [VERIFIERA] Vilket är rätt? Tills dess visas bara växel + Helenes nummer.
 */
export const DIRECT_CONTACTS = [
  {
    name: 'Helene Svärdström Jönsson',
    role: 'Fysioterapi',
    phone: '0707-26 46 88',
    phoneHref: '+46707264688',
    email: 'helene@apport.rehab',
  },
] as const;

/** Patientavgifter. Källa: /kliniken/, /apport-smarta/, /apport-fysioterapi/ */
export const FEES = {
  visit: '200 kr',
  visitNote: 'Frikort gäller. Betalning med kontant, faktura eller Swish.',
  visitLength: '20 minuter enligt avtalet med Region Skåne',
  outsideAgreement: '2 000–2 500 kr per behandling',
  outsideAgreementNote:
    'PRP och pulsad radiofrekvens (pRF) ingår inte i avtalet med Region Skåne och betalas av patienten själv.',
  lateCancellation:
    'Återbud senare än 24 timmar före bokad tid, eller uteblivet besök, debiteras med dubbel patientavgift.',
} as const;

/** Huvudnavigation. */
export const NAV = [
  { label: 'Besvär', href: '/besvar/' },
  { label: 'Behandlingar', href: '/behandlingar/' },
  { label: 'Om Apport', href: '/om-apport/' },
  { label: 'Som patient', href: '/sa-gar-det-till/' },
  { label: 'Kontakt', href: '/kontakt/' },
] as const;

/** Primär CTA genom hela sajten. Kliniken har INGET bokningssystem — därför egenremiss. */
export const CTA = {
  primary: { label: 'Skriv en egenremiss', href: '/sa-gar-det-till/#egenremiss' },
  secondary: { label: 'Så arbetar vi', href: '/om-apport/#arbetssatt' },
  phone: { label: `Ring ${SITE.phone}`, href: `tel:${SITE.phoneHref}` },
} as const;
