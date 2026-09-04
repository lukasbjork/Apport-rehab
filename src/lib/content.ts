/**
 * Innehållsmodell — nav.
 *
 * Team, process, avgränsningar och global FAQ bor här.
 * Besvär och behandlingar ligger i egna filer eftersom de är stora:
 *   src/lib/besvar-data.ts
 *   src/lib/behandlingar-data.ts
 * De återexporteras härifrån så att alla befintliga importer fortsätter fungera.
 *
 * REGEL: Varje medicinskt påstående ska gå att spåra till apport.rehab, 1177
 * eller allabolag. Inget hittas på. Formuleringar hålls försiktiga ("kan",
 * "för vissa", "vi bedömer") — inga löften om bot eller resultat.
 */

export interface Faq {
  q: string;
  a: string;
}

export type { Condition } from './besvar-data';
export { CONDITIONS, CONDITION_ALIASES, BEHANDLING_FORBEHALL } from './besvar-data';

export type { Treatment } from './behandlingar-data';
export { TREATMENTS, TREATMENT_ALIASES } from './behandlingar-data';

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Kort rad under namnet i kort och listor */
  short: string;
  /** Specialistkompetenser — visas som framhävda chips */
  specialties: string[];
  /** Meritlista, ordagrant grundad i /om-oss/ */
  credentials: string[];
  /** Personlig text — storytelling, inte CV */
  bio: string[];
  /** Bildfil i public/bilder/. Saknas den används BildPlatshallare. */
  image?: string;
  imageAlt: string;
}

export const TEAM: TeamMember[] = [
  {
    slug: 'rolf-jonsson',
    name: 'Rolf Jönsson',
    role: 'Leg. läkare, specialist i smärtlindring',
    short: 'Verksamhetschef. Specialist i smärtlindring, rehabiliteringsmedicin och allmänmedicin.',
    specialties: ['Smärtlindring', 'Rehabiliteringsmedicin', 'Allmänmedicin'],
    credentials: [
      'Leg. läkare sedan 1986',
      'Specialist i allmänmedicin 1991',
      'Specialist i rehabiliteringsmedicin 1997',
      'Specialist i smärtlindring 1998',
      'Specialiserad smärtrehabilitering vid CSK Kristianstad, Blekingesjukhuset Karlshamn och Capio Citykliniken',
      'Egen etablering sedan 2006',
      'Omfattande utbildning inom akupunktur och ortopedisk medicin',
      'Internationella kurser i ultraljudsledd smärtbehandling',
    ],
    bio: [
      'Rolf har arbetat med smärta sedan mitten av 80-talet. Först inom allmänmedicin, sedan inom rehabiliteringsmedicin och till sist som specialist i smärtlindring — tre specialistkompetenser som tillsammans täcker hela vägen från utredning till funktion.',
      'De senaste åren har han fokuserat på ultraljudsledda metoder. Att kunna se strukturen på skärmen medan nålen förs in gör det möjligt att blockera en struktur i taget och därmed pröva sig fram till var smärtan faktiskt kommer ifrån.',
      'Han är verksamhetschef på Apport och tar emot patienter med lokala och regionala smärttillstånd.',
    ],
    imageAlt:
      'Porträtt av Rolf Jönsson, leg. läkare och specialist i smärtlindring på Apport i Kristianstad',
  },
  {
    slug: 'helene-svardstrom-jonsson',
    name: 'Helene Svärdström Jönsson',
    role: 'Leg. fysioterapeut',
    short: 'Delägare. Triggerpunkts- och periostakupunktur, stabilitetsträning och långvarig smärta.',
    specialties: ['Långvarig smärta', 'Triggerpunktsakupunktur', 'Stabilitetsträning'],
    credentials: [
      'Leg. sjukgymnast/fysioterapeut sedan 1993',
      'Utbildning i långvarig smärta',
      'Akupunktur med fördjupning i triggerpunkts- och periostbehandling',
      'BK steg 2',
      'Kurser i manuell muskeltestning (MMT)',
      'Axelutbildning',
      'Multimodal rehabilitering vid långvarig smärta sedan 1996',
      'Egen etablering sedan 2006',
    ],
    bio: [
      'Helene har arbetat med långvarig smärta sedan hon tog examen 1993. Hon har sett hur mycket som avgörs av att man hittar rätt struktur — och hur ofta en muskel gör ont på ett ställe fast problemet sitter någon annanstans.',
      'På Apport arbetar hon med triggerpunkts- och periostakupunktur, stabilitetsträning och rehabilitering. Hon samarbetar med läkaren kring diagnostiken, så att bedömning och träning hänger ihop i stället för att bli två separata spår.',
      'Hon är delägare i kliniken och har varit verksam i den sedan starten 2010.',
    ],
    imageAlt: 'Porträtt av Helene Svärdström Jönsson, leg. fysioterapeut på Apport i Kristianstad',
  },
];

/** Verifierbara siffror för credential-blocket. Inga påhittade mått. */
export const CREDENTIALS = [
  { tal: '2010', etikett: 'Apport startades', text: 'Samma två personer har drivit kliniken sedan dess.' },
  { tal: '30+', etikett: 'Års erfarenhet hos läkaren', text: 'Rolf har arbetat med smärtproblematik sedan 1986.' },
  { tal: '3', etikett: 'Specialistkompetenser', text: 'Allmänmedicin, rehabiliteringsmedicin och smärtlindring.' },
  { tal: '2', etikett: 'Personer bakom kliniken', text: 'En läkare och en fysioterapeut, som arbetar tillsammans.' },
] as const;

/** Processen — "Så går det till". Fem steg; `number` måste hållas i synk med
 *  ordningen, eftersom ProcessTimeline renderar fältet medan Process räknar
 *  fram sitt eget index. */
export const PROCESS = [
  {
    number: '01',
    title: 'Du berättar',
    body: 'Du skriver några rader om dina besvär och mejlar dem till oss. Vi har inget remisstvång — du behöver alltså ingen remiss från vårdcentralen.',
  },
  {
    number: '02',
    title: 'Utredning',
    body: 'Smärtanalys, funktionsundersökning och ultraljud. Vid behov diagnostiska blockader, en struktur i taget. Räkna med 3–5 besök innan vi kan uttala oss om orsaken.',
  },
  {
    number: '03',
    title: 'Plan',
    body: 'När vi vet mer om var smärtan kommer ifrån går vi igenom vad som kan vara aktuellt — behandling, träning eller en kombination. Du får veta vad vi tror och varför.',
  },
  {
    number: '04',
    title: 'Genomförande',
    body: 'Vi genomför det vi kommit överens om — behandling, träning eller en kombination — enligt planen.',
  },
  {
    number: '05',
    title: 'Utvärdering och fortsatt genomförande',
    body: 'Vi följer upp hur kroppen svarar och justerar. Om något inte ger effekt säger vi det, och tar ställning till om vi ska fortsätta, justera eller pröva något annat.',
  },
] as const;

/**
 * Vad kliniken INTE tar emot. Ordagrant grundat i /apport-smarta/.
 * Klinikens tydligaste avgränsning och därför en av sajtens viktigaste texter.
 */
export const NOT_OFFERED = {
  conditions: [
    'Kroniska tillstånd utan utsikter till bot',
    'Generell värk',
    'Trötthetssyndrom',
    'Hypermobilitet',
  ],
  services: ['Sjukskrivningsintyg', 'Parkeringstillstånd', 'Förnyelse av recept'],
} as const;

/** Vad kliniken DÄREMOT arbetar med — används i "Är Apport rätt för mig?" */
export const IS_OFFERED = [
  'Lokala och regionala smärttillstånd — smärtan sitter på ett bestämt ställe',
  'Smärta från muskler, senor, senfästen, leder och nerver',
  'Besvär som funnits kvar trots tidigare utredning eller behandling',
  'Rehabilitering och träning kopplad till ett smärttillstånd',
] as const;

/** Global FAQ — används på /som-patient/ och driver FAQPage-schema där. */
export const FAQS: Faq[] = [
  {
    q: 'Behöver jag remiss för att komma till Apport?',
    a: 'Nej. Vi har inget remisstvång. Du skriver en kort egenremiss och mejlar den till patient@apport.rehab. Beskriv bakgrunden, dina nuvarande besvär och vilken vård du fått tidigare.',
  },
  {
    q: 'Vad kostar ett besök?',
    a: 'Patientavgiften är 200 kr och frikort gäller. Du kan betala med kontant, faktura eller Swish. PRP och pulsad radiofrekvens ingår inte i vårt avtal med Region Skåne och kostar 2 000–2 500 kr per behandling.',
  },
  {
    q: 'Hur lång tid tar en utredning?',
    a: 'Räkna med 3–5 besök innan det går att uttala sig om orsaken till smärtan och ställa en diagnos. En korrekt diagnos är grunden för en lyckad smärtbehandling, så vi lägger tid på den delen.',
  },
  {
    q: 'Hur långt är ett besök?',
    a: 'Ett besök är normalt cirka 20 minuter enligt vårt avtal med Region Skåne.',
  },
  {
    q: 'När kan jag ringa?',
    a: 'Telefontiden är måndagar 08.00–09.00 på 044-10 60 00. Övriga frågor, ändringar och återbud går bra att mejla till patient@apport.rehab.',
  },
  {
    q: 'Vad händer om jag inte kan komma på min tid?',
    a: 'Hör av dig så snart du vet. Återbud senare än 24 timmar före bokad tid, eller uteblivet besök, debiteras med dubbel patientavgift.',
  },
  {
    q: 'Vilka besvär tar ni inte emot?',
    a: 'Vi tar inte emot kroniska tillstånd utan utsikter till bot, generell värk, trötthetssyndrom eller hypermobilitet. Vi utfärdar inte heller sjukskrivningsintyg eller parkeringstillstånd och förnyar inte recept. Det gör vi för att kunna lägga tiden där vi faktiskt kan göra skillnad.',
  },
  {
    q: 'Vad händer om Apport inte är rätt för mig?',
    a: 'Då säger vi det, så tidigt vi kan. Vi försöker också peka dig i rätt riktning när vi kan. Att få veta att man ska söka någon annanstans är bättre än att vänta på en tid som inte leder någonstans.',
  },
  {
    q: 'Har ni avtal med Region Skåne?',
    a: 'Ja. Verksamheten arbetar på uppdrag av Region Skåne enligt nationella taxan. Det innebär att patientavgiften är densamma som i övrig offentligt finansierad vård och att frikort gäller.',
  },
  {
    q: 'Är kliniken tillgänglig med rullstol?',
    a: 'Ja. Kliniken ligger på andra våningen på Borgmästaregården vid Stora Torg, och det finns både hiss och handikapptoalett.',
  },
  {
    q: 'Gör blockaderna ont?',
    a: 'En blockad läggs med lokalbedövning och med ultraljud som vägledning, vilket gör att nålen kan placeras så exakt som möjligt. De flesta tycker att det är hanterbart, men upplevelsen varierar från person till person. Vi går igenom vad som ska hända innan vi börjar.',
  },
];
