/**
 * Artiklar (bloggen).
 *
 * ⚠️ MEDICINSK GRANSKNING
 * Artiklarna är skrivna genom att packa om klinikens EGET material till
 * längre, sökbara texter. Varje påstående går att spåra till apport.rehab
 * (/utredning/, /behandling/, /diagnos/, /sjalvlakning/, /kliniken/) eller
 * 1177 — men formuleringarna är nya och ska läsas igenom av Rolf innan de
 * publiceras. Se README → "Medicinsk granskning".
 *
 * REGEL: inga löften om bot eller resultat. Artiklarna förklarar hur och
 * varför, aldrig hur bra det går.
 *
 * Så lägger du till en ny artikel: lägg ett objekt först i listan. Sidan,
 * kortet på /artiklar/, sitemap och interna länkar genereras automatiskt.
 * Datum i formatet ÅÅÅÅ-MM-DD.
 */
import type { Faq } from './content';

export interface Avsnitt {
  /** H2 på artikelsidan */
  rubrik: string;
  /** Brödtextstycken */
  stycken: string[];
  /** Valfri punktlista efter styckena */
  lista?: string[];
}

export interface Artikel {
  slug: string;
  titel: string;
  /** <title> — håll under 60 tecken inkl. " | Apport" */
  metaTitle: string;
  metaDescription: string;
  /** Kort text på kortet i listan */
  ingress: string;
  /** ÅÅÅÅ-MM-DD */
  datum: string;
  /** Vem som står bakom texten — slug ur TEAM */
  forfattare: 'rolf-jonsson' | 'helene-svardstrom-jonsson';
  /** Ungefärlig lästid i minuter */
  lastid: number;
  /** Etikett för filtrering och kontext */
  amne: 'Utredning' | 'Behandling' | 'Träning' | 'Att söka vård';
  avsnitt: Avsnitt[];
  faqs: Faq[];
  /** Slugs ur CONDITIONS som artikeln hör ihop med */
  relateradeBesvar: string[];
  /** Slugs ur TREATMENTS */
  relateradeBehandlingar: string[];
  image?: { src: string; alt: string; caption: string };
}

export const ARTIKLAR: Artikel[] = [
  {
    slug: 'rontgen-visar-inget-men-det-gor-ont',
    titel: 'Röntgen visar inget — men det gör fortfarande ont',
    metaTitle: 'Röntgen visar inget men det gör ont — varför?',
    metaDescription:
      'Varför kan röntgen och magnetkamera se normala ut fast du har ont? Om skillnaden mellan hur kroppen ser ut och vad som gör ont, och hur vi tar reda på det.',
    ingress:
      'Det är ett av de vanligaste beskeden vi hör att patienter har fått. Här är varför det kan stämma — och varför det inte betyder att smärtan sitter i huvudet.',
    datum: '2026-08-31',
    forfattare: 'rolf-jonsson',
    lastid: 4,
    amne: 'Utredning',
    avsnitt: [
      {
        rubrik: 'Bilder visar hur kroppen ser ut, inte vad som gör ont',
        stycken: [
          'Röntgen och magnetkamera är utmärkta på att visa kroppens struktur. De visar kotor, leder, brosk och mjukdelar. Vad de inte gör är att peka ut vilken av alla dessa strukturer som skickar smärtsignaler just nu.',
          'Det låter som en teknisk detalj men är i praktiken hela problemet. Många människor har förändringar på bild utan att ha ont, och många har svår smärta trots att bilderna ser fina ut. Fyndet på bilden och upplevelsen i kroppen följs helt enkelt inte alltid åt.',
          'När du får beskedet att undersökningen ser normal ut betyder det alltså inte att det inte finns någon orsak. Det betyder att just den undersökningen inte hittade den.',
        ],
      },
      {
        rubrik: 'Därför blir behandling ofta en gissning',
        stycken: [
          'Om man inte vet vilken struktur som gör ont blir nästa steg ofta att prova något som brukar hjälpa. Ibland fungerar det. Men när det inte gör det vet man sällan varför — var det fel behandling, eller rätt behandling på fel ställe?',
          'Det är den här situationen de flesta av våra patienter befinner sig i när de kommer till oss. De har inte fått för lite vård. De har fått vård som inte utgått från en tillräckligt exakt diagnos.',
        ],
      },
      {
        rubrik: 'Ett annat sätt: pröva en struktur i taget',
        stycken: [
          'Vid en diagnostisk blockad bedövar vi en enda struktur med lokalbedövning, med ultraljud som vägledning så att nålen hamnar rätt. Sedan mäter vi vad som händer med smärtan på en skattningsskala.',
          'Minskar smärtan tydligt talar det för att just den strukturen bidrar. Händer ingenting har vi också lärt oss något, och kan gå vidare till nästa. Metoden bygger alltså inte på att tolka en bild, utan på att testa en hypotes.',
          'Det är långsammare än en röntgen. Räkna med 3–5 besök innan det går att uttala sig om orsaken. Men resultatet är ett besked som går att bygga en behandling på.',
        ],
      },
      {
        rubrik: 'Vad det betyder för dig',
        stycken: [
          'Om du har fått veta att allt ser normalt ut och ändå har ont är du inte ensam, och det är inte ett tecken på att besvären är inbillade.',
          'Det kan däremot vara ett tecken på att utredningen behöver göras på ett annat sätt än med bilddiagnostik.',
        ],
        lista: [
          'Bilddiagnostik som varit normal utesluter inte att en struktur går att peka ut',
          'Diagnostiska blockader testar en struktur i taget i stället för att tolka en bild',
          'En korrekt diagnos är grunden för en behandling som faktiskt riktas rätt',
        ],
      },
    ],
    faqs: [
      {
        q: 'Betyder normal röntgen att smärtan sitter i huvudet?',
        a: 'Nej. Bilddiagnostik visar kroppens struktur, inte vilken struktur som skickar smärtsignaler. Att undersökningen inte hittade något betyder att just den metoden inte hittade det — inte att orsaken saknas.',
      },
      {
        q: 'Behöver jag ta med gamla röntgenbilder?',
        a: 'Har du dem är de bra att ha med, men de är inget krav. Vi gör en egen undersökning med ultraljud.',
      },
      {
        q: 'Hur lång tid tar det att komma fram till en diagnos?',
        a: 'Räkna med 3–5 besök. Varje besök är cirka 20 minuter enligt vårt avtal med Region Skåne, och varje blockad prövar en struktur i taget.',
      },
    ],
    relateradeBesvar: ['ryggsmarta', 'nacksmarta', 'whiplash'],
    relateradeBehandlingar: ['utredning'],
    image: {
      src: '/bilder/ultraljud-l5-s1.webp',
      alt: 'Ultraljudsbild från Apport som visar vävnadslagren i nedre ländryggen med markörer vid de bedömda strukturerna',
      caption:
        'Ultraljudsbild från kliniken. Med ultraljud kan vävnaden bedömas i rörelse, och nålens läge följas medan den förs in.',
    },
  },

  {
    slug: 'vad-ar-en-diagnostisk-blockad',
    titel: 'Vad är en diagnostisk blockad?',
    metaTitle: 'Diagnostisk blockad — vad är det och hur går det till?',
    metaDescription:
      'En diagnostisk blockad bedövar en struktur i taget för att ta reda på var smärtan kommer ifrån. Så går den till, och så utvärderas resultatet.',
    ingress:
      'Metoden är inte i första hand en behandling utan ett sätt att ta reda på något. Här är vad som faktiskt händer vid besöket.',
    datum: '2026-08-31',
    forfattare: 'rolf-jonsson',
    lastid: 4,
    amne: 'Utredning',
    avsnitt: [
      {
        rubrik: 'Syftet är att få veta, inte enbart att lindra',
        stycken: [
          'En diagnostisk blockad innebär att en enskild struktur bedövas med lokalbedövning. Det kan vara en facettled mellan två kotor, en bäckenled, ett senfäste eller området kring en nervrot.',
          'Poängen är inte främst smärtlindringen i sig, utan vad reaktionen berättar. Om smärtan minskar tydligt när en viss struktur bedövas talar det för att den bidrar till besvären.',
        ],
      },
      {
        rubrik: 'Ultraljudet är det som gör det möjligt',
        stycken: [
          'Strukturerna i rygg och nacke ligger tätt. Utan vägledning blir en injektion ett ungefär, och då säger resultatet inte särskilt mycket — bedövade vi verkligen det vi trodde?',
          'Med ultraljud följer vi nålen på skärmen medan den förs in. Det gör att blockaden kan läggas mot en bestämd struktur, och att slutsatsen därmed blir användbar.',
        ],
      },
      {
        rubrik: 'Så går besöket till',
        stycken: [
          'Vi går igenom vad som ska hända innan vi börjar, och du får veta vad du kan förvänta dig efteråt.',
        ],
        lista: [
          'Området lokalbedövas',
          'Nålen förs in med ultraljud som vägledning',
          'Du skattar smärtan före och efter på en skala',
          'Effekten utvärderas, och vi bestämmer tillsammans nästa steg',
        ],
      },
      {
        rubrik: 'Om blockaden inte ger någon effekt',
        stycken: [
          'Det är ett resultat, inte ett misslyckande. Att en struktur kunnat uteslutas är precis lika användbart som att en kunnat pekas ut, eftersom det styr vart vi går härnäst.',
          'Ibland leder utredningen fram till att vi inte är rätt klinik för dina besvär. Då säger vi det, hellre tidigt än sent.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Gör en blockad ont?',
        a: 'Blockaden läggs med lokalbedövning och med ultraljud som vägledning, vilket gör att nålen kan placeras så exakt som möjligt. De flesta tycker att det är hanterbart, men upplevelsen varierar från person till person.',
      },
      {
        q: 'Hur länge sitter effekten i?',
        a: 'En diagnostisk blockad görs med lokalbedövning, så själva bedövningen är kortvarig. Syftet är att få information, inte långvarig lindring — men vad vi lär oss styr vilken behandling som sedan kan bli aktuell.',
      },
      {
        q: 'Ingår blockader i Region Skåne-avtalet?',
        a: 'Ja. Patientavgiften är 200 kr per besök och frikort gäller. Det är PRP och pulsad radiofrekvens som ligger utanför avtalet.',
      },
    ],
    relateradeBesvar: ['ryggsmarta', 'backensmarta-si-led', 'nacksmarta'],
    relateradeBehandlingar: ['utredning'],
    image: {
      src: '/bilder/blockad-backenled.webp',
      alt: 'Anatomisk modell av bäcken och ländrygg där en spruta visar nålens riktning vid en bäckenledsblockad',
      caption:
        'Demonstration på anatomisk modell: nålens riktning vid en bäckenledsblockad. På patient styrs placeringen med ultraljud.',
    },
  },

  {
    slug: 'varfor-gor-det-ondare-forst-vid-proloterapi',
    titel: 'Varför gör det ondare innan det blir bättre?',
    metaTitle: 'Proloterapi — varför gör det ondare dag 2–4?',
    metaDescription:
      'Vid proloterapi upplever många ökad smärta dag 2–4 efter behandlingen. Här är varför det är förväntat och vad som händer i vävnaden.',
    ingress:
      'Vid regenerativ behandling är en period av ökad smärta inte ett tecken på att något gått fel. Den är själva poängen med metoden.',
    datum: '2026-08-31',
    forfattare: 'rolf-jonsson',
    lastid: 3,
    amne: 'Behandling',
    avsnitt: [
      {
        rubrik: 'Vissa vävnader läker dåligt av sig själva',
        stycken: [
          'Senfästen och ligament har begränsad blodförsörjning. En skada där kan ligga kvar i åratal utan att kroppen kommer vidare i läkningsprocessen — inte för att den saknar förmåga, utan för att processen aldrig kommer igång ordentligt.',
          'Kroppens självläkningsförmåga är fantastisk, men ibland behöver den hjälp.',
        ],
      },
      {
        rubrik: 'Behandlingen startar en process med flit',
        stycken: [
          'Vid proloterapi injiceras ett retande ämne, oftast dextros, i eller intill den skadade vävnaden. Det aktiverar immunsystemet: först uppstår en inflammation, därefter frisätts bland annat tillväxt- och komplementfaktorer.',
          'En kedjereaktion startas med inflammation, vävnadsnybildning och omformning av vävnaden. Det är den inflammationen som gör att många upplever ökad smärta dag 2–4 efter behandlingen.',
          'Med andra ord: obehaget är kopplat till det som är avsett att hända, inte till en komplikation.',
        ],
      },
      {
        rubrik: 'Vad det innebär praktiskt',
        stycken: [
          'Behandlingen upprepas vanligen vid flera tillfällen. Vi går igenom vad du kan förvänta dig innan vi börjar, så att du vet vad de första dagarna kan innebära.',
          'Hur väl behandlingen fungerar varierar mellan patienter och beror på besvär, vävnad och förutsättningar. Vi gör en bedömning i varje enskilt fall, och avråder hellre än att genomföra en behandling vi inte tror på.',
        ],
        lista: [
          'Ökad smärta dag 2–4 är vanligt och förväntat',
          'Behandlingen ges efter utredning, inte som ett första steg',
          'Injektionen läggs med ultraljudsvägledning',
          'När både proloterapi och PRP är aktuella ges PRP vanligen en vecka senare',
        ],
      },
    ],
    faqs: [
      {
        q: 'Hur länge håller den ökade smärtan i sig?',
        a: 'Många upplever den dag 2–4 efter behandlingen. Förloppet varierar mellan patienter — vi går igenom vad du kan förvänta dig innan behandlingen ges.',
      },
      {
        q: 'Ingår proloterapi i Region Skåne-avtalet?',
        a: 'Ja. Det är PRP och pulsad radiofrekvens som ligger utanför avtalet och kostar 2 000–2 500 kr per behandling.',
      },
    ],
    relateradeBesvar: ['ryggsmarta', 'backensmarta-si-led', 'axelsmarta'],
    relateradeBehandlingar: ['proloterapi', 'prp'],
  },

  {
    slug: 'nar-ska-man-soka-hjalp-for-langvarig-smarta',
    titel: 'När är det läge att söka hjälp för långvarig smärta?',
    metaTitle: 'Långvarig smärta — när ska man söka hjälp?',
    metaDescription:
      'Har du haft ont i månader utan besked om orsaken? Om när det är läge att söka en mer specialiserad bedömning — och när någon annan passar bättre.',
    ingress:
      'Det finns ingen exakt gräns. Men det finns några mönster som brukar tala för att en mer specialiserad bedömning kan vara meningsfull.',
    datum: '2026-08-31',
    forfattare: 'helene-svardstrom-jonsson',
    lastid: 3,
    amne: 'Att söka vård',
    avsnitt: [
      {
        rubrik: 'Tiden i sig säger inte allt',
        stycken: [
          'Mycket smärta går över av sig själv, och då är det rätt att avvakta. Det som gör att man bör tänka om är inte enbart hur länge det gjort ont, utan om förloppet står stilla.',
          'Har besvären funnits i mer än några månader utan att du fått besked om vad som orsakar dem, är det ofta där problemet ligger — inte i att du fått för lite behandling.',
        ],
      },
      {
        rubrik: 'Mönster som brukar tala för en specialiserad bedömning',
        stycken: [
          'Det här är inte en checklista som avgör saken, utan de situationer vi oftast möter.',
        ],
        lista: [
          'Smärtan sitter på ett bestämt ställe snarare än överallt',
          'Du har redan provat behandling utan tydlig effekt',
          'Du har fått höra att undersökningarna ser normala ut',
          'Du har en skada som aldrig riktigt blev bra',
          'Du vill förstå vad som orsakar smärtan innan du provar ännu en behandling',
        ],
      },
      {
        rubrik: 'När någon annan passar bättre',
        stycken: [
          'Vi arbetar med lokala och regionala smärttillstånd. Vi tar inte emot kroniska tillstånd utan utsikter till bot, generell värk, trötthetssyndrom eller hypermobilitet, och vi utfärdar inte sjukskrivningsintyg eller parkeringstillstånd.',
          'Det är ingen värdering av de besvären — de är verkliga och svåra. Det är en bedömning av vad vår kompetens räcker till. Att säga nej till det vi inte är bäst på är förutsättningen för att kunna lägga ordentlig tid på det vi kan.',
          'Är du osäker på om du hör hemma hos oss? Skriv ändå. Vi läser allt och säger till om vi tror att någon annan kan hjälpa dig bättre.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Behöver jag remiss?',
        a: 'Nej. Vi har inget remisstvång. Du skriver några rader om dina besvär och mejlar dem till patient@apport.rehab.',
      },
      {
        q: 'Vad kostar det att komma?',
        a: 'Patientavgiften är 200 kr per besök och frikort gäller. Vi arbetar på uppdrag av Region Skåne enligt nationella taxan.',
      },
      {
        q: 'Vad händer om ni inte kan hjälpa mig?',
        a: 'Då säger vi det, så tidigt vi kan, och försöker peka dig i rätt riktning. Att få veta det direkt är bättre än att vänta på en tid som inte leder någonstans.',
      },
    ],
    relateradeBesvar: ['ryggsmarta', 'nacksmarta', 'muskelsmarta-triggerpunkter'],
    relateradeBehandlingar: ['utredning', 'smartspecialist'],
  },
];

/** Nyaste först. Datumen är ISO, så strängsortering räcker. */
export const ARTIKLAR_SORTERADE = [...ARTIKLAR].sort((a, b) => b.datum.localeCompare(a.datum));

export function formateraDatum(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
