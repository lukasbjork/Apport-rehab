/**
 * Innehållsmodell: team, besvär, behandlingar, process och FAQ.
 *
 * REGEL: Varje medicinskt påstående här ska gå att spåra till nuvarande
 * apport.rehab, 1177 eller allabolag. Inget hittas på. Formuleringar hålls
 * försiktiga ("kan", "för vissa", "vi bedömer") — inga löften om bot.
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Kort rad under namnet i kort och listor */
  short: string;
  /** Meritlista, ordagrant grundad i /om-oss/ */
  credentials: string[];
  /** Personlig text — skriven, inte påhittad fakta */
  bio: string[];
  image: string;
  imageAlt: string;
  /** true = platshållarbild som ska bytas mot riktigt porträtt */
  imageIsPlaceholder: boolean;
}

export const TEAM: TeamMember[] = [
  {
    slug: 'rolf-jonsson',
    name: 'Rolf Jönsson',
    role: 'Leg. läkare, specialist i smärtlindring',
    short: 'Verksamhetschef. Specialist i smärtlindring, rehabiliteringsmedicin och allmänmedicin.',
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
    image: '/bilder/portratt-rolf.jpg',
    imageAlt: 'Porträtt av Rolf Jönsson, leg. läkare och specialist i smärtlindring på Apport i Kristianstad',
    imageIsPlaceholder: true,
  },
  {
    slug: 'helene-svardstrom-jonsson',
    name: 'Helene Svärdström Jönsson',
    role: 'Leg. fysioterapeut',
    short: 'Delägare. Triggerpunkts- och periostakupunktur, stabilitetsträning och långvarig smärta.',
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
    image: '/bilder/portratt-helene.jpg',
    imageAlt: 'Porträtt av Helene Svärdström Jönsson, leg. fysioterapeut på Apport i Kristianstad',
    imageIsPlaceholder: true,
  },
];

export interface Condition {
  slug: string;
  /** Kort namn för kort och navigation */
  name: string;
  /** H1 på undersidan */
  heading: string;
  /** Titel i <title>. Håll under 60 tecken inkl. " | Apport". */
  metaTitle: string;
  /** Meta description */
  metaDescription: string;
  /** Kort text på kortet i grid */
  teaser: string;
  /** Ingress överst på sidan */
  intro: string;
  /** "Känner du igen dig?" — patientens egna ord */
  recognise: string[];
  /** Hur Apport arbetar med just detta */
  approach: string[];
  /** När man bör söka vård */
  seekCare: string[];
  /** Slugs ur TREATMENTS */
  relatedTreatments: string[];
  /** Grupp för filtrering på hubbsidan */
  group: 'Kotpelaren' | 'Leder' | 'Muskler' | 'Nerver';
}

export const CONDITIONS: Condition[] = [
  {
    slug: 'ryggsmarta',
    name: 'Ryggsmärta och ländryggssmärta',
    heading: 'Ont i ryggen som inte ger med sig',
    metaTitle: 'Ryggsmärta och ländryggssmärta i Kristianstad',
    metaDescription:
      'Utredning och behandling av ryggsmärta och ländryggssmärta i Kristianstad. Ultraljudsledda blockader för att hitta orsaken. Avtal med Region Skåne.',
    teaser:
      'Ländrygg, facettleder och muskelfästen. Vi använder ultraljudsledda blockader för att pröva en struktur i taget.',
    intro:
      'Ländryggssmärta är ett av de vanligaste skälen till att man söker vård — och ett av de svåraste att sätta namn på. Röntgen och magnetkamera visar ofta förändringar som finns hos många utan besvär, samtidigt som de sällan pekar ut vilken struktur som gör ont just nu.',
    recognise: [
      'Du har haft ont i ländryggen i månader eller år',
      'Bilddiagnostik har visat "normala åldersförändringar" utan att förklara smärtan',
      'Smärtan strålar mot skinkan eller låret',
      'Du har svårt att sitta länge, eller att resa dig efter att ha suttit',
      'Du har provat behandling utan tydlig effekt och vill veta varför',
    ],
    approach: [
      'Vi börjar med en smärtanalys: var smärtan sitter, hur den startade, hur den utvecklats och vad som redan är gjort.',
      'Därefter görs en funktionsundersökning av muskulatur, skelett, leder, stödjevävnad och nerver, kompletterad med ultraljudsundersökning.',
      'Vid behov används diagnostiska blockader. Med ultraljud kan vi bedöva en struktur i taget — till exempel en facettled — och utvärdera effekten på en skattningsskala. Det ger besked om just den strukturen bidrar till smärtan.',
      'Först när vi har en rimlig bild av orsaken diskuterar vi behandling, träning eller en kombination.',
    ],
    seekCare: [
      'Smärtan har hållit i sig i mer än tre månader utan förklaring',
      'Du har utretts men inte fått besked om vad som orsakar smärtan',
      'Du vill kunna träna igen men vet inte vad som är säkert att göra',
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'proloterapi', 'pulsad-radiofrekvens', 'fysioterapi'],
    group: 'Kotpelaren',
  },
  {
    slug: 'nacksmarta',
    name: 'Nacksmärta och whiplash',
    heading: 'Nacksmärta, även långt efter en whiplashskada',
    metaTitle: 'Nacksmärta och whiplash i Kristianstad',
    metaDescription:
      'Utredning och behandling av nacksmärta och besvär efter whiplash i Kristianstad. Ultraljudsledda blockader i halsryggen. Avtal med Region Skåne.',
    teaser:
      'Halsrygg, facettleder och nackmuskulatur — inklusive besvär som blivit kvar efter whiplashvåld.',
    intro:
      'Nacken är liten, rörlig och full av strukturer som ligger tätt. Det gör den svår att utreda med bilddiagnostik allena. Vi har lång erfarenhet av smärttillstånd i nacken, inklusive besvär som funnits kvar långt efter ett whiplashvåld.',
    recognise: [
      'Du fick ont i nacken efter en olycka och besvären finns kvar',
      'Smärtan strålar upp mot bakhuvudet eller ut i axeln',
      'Du har stel nacke och begränsad vridning',
      'Du har fått höra att undersökningarna ser normala ut',
      'Huvudvärken hänger ihop med nacken',
    ],
    approach: [
      'Smärtanalys och funktionsundersökning av halsryggen, nackmuskulaturen och de nerver som passerar området.',
      'Ultraljudsundersökning av strukturerna i nacken.',
      'Vid behov diagnostiska blockader — facettledsblockad eller rotblockad i halsryggen — med ultraljud, en struktur i taget.',
      'Behandlingen anpassas efter vad utredningen visar och kan kombinera medicinsk behandling med rörlighets- och stabilitetsträning.',
    ],
    seekCare: [
      'Besvären efter en olycka har inte gått över på egen hand',
      'Nacksmärtan begränsar arbete, sömn eller bilkörning',
      'Du vill ha en mer specialiserad bedömning än den du redan fått',
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'pulsad-radiofrekvens', 'medicinsk-smartbehandling', 'fysioterapi'],
    group: 'Kotpelaren',
  },
  {
    slug: 'backensmarta-si-led',
    name: 'Bäckensmärta och SI-led',
    heading: 'Smärta i bäckenet och SI-leden',
    metaTitle: 'Bäckensmärta och SI-led i Kristianstad',
    metaDescription:
      'Utredning och behandling av bäckensmärta och SI-ledssmärta i Kristianstad. Ultraljudsledda bäckenledsblockader. Avtal med Region Skåne.',
    teaser:
      'Bäckenleden (SI-leden) med omgivande ligament, nerver och muskler — ofta förväxlad med ländryggssmärta.',
    intro:
      'Bäckenleden ligger djupt och ger ofta smärta som känns som ryggont eller höftont. Den är svår att bedöma med enbart bilddiagnostik, men går att pröva med riktade blockader.',
    recognise: [
      'Smärtan sitter lågt i ryggen, på ena sidan, ofta i en punkt du kan peka på',
      'Det gör ont att vända sig i sängen eller att stå på ett ben',
      'Besvären började i samband med graviditet, fall eller en period av hög belastning',
      'Du har behandlats för ländryggssmärta utan effekt',
    ],
    approach: [
      'Funktionsanalys av bäcken, ländrygg och höft för att skilja mellan närliggande orsaker.',
      'Bäckenledsblockad med ultraljud, där ligament, nerver och muskler kan testas var för sig.',
      'Utvärdering på skattningsskala före och efter blockaden.',
      'Därefter tas ställning till behandling, stabilitetsträning eller en kombination.',
    ],
    seekCare: [
      'Smärtan har suttit kvar långt efter graviditet eller skada',
      'Du har fått behandling riktad mot ryggen utan resultat',
      'Du vill veta om bäckenleden är inblandad innan du fortsätter med träning',
    ],
    relatedTreatments: ['utredning', 'proloterapi', 'akupunktur', 'fysioterapi'],
    group: 'Kotpelaren',
  },
  {
    slug: 'artros',
    name: 'Artros',
    heading: 'Artros i knä, höft, fingrar och rygg',
    metaTitle: 'Artros i knä, höft och fingrar — Kristianstad',
    metaDescription:
      'Behandling av artros i Kristianstad — knä, höft, fingrar, rygg och stortå. Ultraljudsledda ledinjektioner, träning och rehabilitering. Avtal med Region Skåne.',
    teaser:
      'Artros uppstår vid obalans mellan nedbrytning och uppbyggnad av brosk. Vanligast i knä, fingrar, höft, rygg och stortå.',
    intro:
      'Artros beror på en obalans mellan nedbrytning och uppbyggnad av ledbrosket. Det är ofta förenat med smärta, stelhet och nedsatt rörlighet, och drabbar oftast knä, fingrar, höft, rygg och stortå. Det är vanligast efter 50 års ålder, men kan komma tidigare efter en ledskada.',
    recognise: [
      'Leden är stel på morgonen och mjuknar när du rört på dig',
      'Det gör ont vid belastning och blir bättre av vila',
      'Du har fått diagnosen artros men ingen tydlig plan framåt',
      'Du undviker träning för att du är rädd att förvärra',
    ],
    approach: [
      'Bedömning av leden och den omgivande muskulaturen, med ultraljud där det tillför något.',
      'Ledinjektioner med ultraljud kan vara aktuella för axel, höft, knä, fot, handled och tumled.',
      'Anpassad träning är en central del. Målet är att belasta leden på ett sätt som kroppen tål och som förbättrar funktionen.',
      'Vid behov kombineras behandling och träning som samordnade insatser utifrån dina behov och mål.',
    ],
    seekCare: [
      'Smärtan begränsar det du vill kunna göra i vardagen',
      'Du är osäker på hur du ska träna med din artros',
      'Du vill veta vilka behandlingsalternativ som kan vara aktuella för dig',
    ],
    relatedTreatments: ['utredning', 'proloterapi', 'prp', 'akupunktur', 'fysioterapi'],
    group: 'Leder',
  },
  {
    slug: 'axelsmarta',
    name: 'Axelsmärta',
    heading: 'Axelsmärta och besvär i skuldran',
    metaTitle: 'Axelsmärta i Kristianstad',
    metaDescription:
      'Utredning och behandling av axelsmärta i Kristianstad. Ultraljudsundersökning av sena och senfäste, ledinjektioner och rehabilitering.',
    teaser:
      'Senor, senfästen och axelled — smärta som ofta stör sömnen och begränsar arbete över axelhöjd.',
    intro:
      'Axeln är en led med stort rörelseomfång och små marginaler. Smärtan kommer ofta från senor och senfästen snarare än från själva leden, vilket gör ultraljud särskilt användbart — vävnaden går att se i rörelse.',
    recognise: [
      'Du vaknar av smärtan när du ligger på axeln',
      'Det gör ont att lyfta armen över axelhöjd',
      'Du har svårt att nå bakom ryggen eller ta på dig en jacka',
      'Besvären började smygande utan tydlig skada',
    ],
    approach: [
      'Funktionsundersökning av axeln med tester för muskulatur, senor och ledrörlighet.',
      'Ultraljudsundersökning av senor och senfästen.',
      'Vid behov ultraljudsledd injektion i led eller runt senfäste.',
      'Rehabilitering med anpassad träning — vår fysioterapeut har särskild axelutbildning.',
    ],
    seekCare: [
      'Smärtan stör sömnen',
      'Du har haft besvär i mer än några månader utan förbättring',
      'Du vill veta vilken struktur i axeln som är inblandad',
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'proloterapi', 'prp', 'fysioterapi'],
    group: 'Leder',
  },
  {
    slug: 'muskelsmarta-triggerpunkter',
    name: 'Muskelsmärta och triggerpunkter',
    heading: 'Muskelsmärta och triggerpunkter',
    metaTitle: 'Triggerpunkter och muskelsmärta i Kristianstad',
    metaDescription:
      'Behandling av muskelsmärta och triggerpunkter i Kristianstad. Triggerpunkts- och periostakupunktur, rörelseanalys och anpassad träning.',
    teaser:
      'Den vanligaste orsaken till muskelsmärta är ensidig belastning som ger triggerpunkter — ömma punkter som kan ge smärta på annat håll.',
    intro:
      'Den vanligaste orsaken till muskelsmärta är ensidig belastning som orsakar triggerpunkter. En triggerpunkt är en öm punkt i muskeln som kan ge smärta även på ett helt annat ställe än där den sitter — vilket är en av anledningarna till att muskelsmärta ofta blir feltolkad.',
    recognise: [
      'Du har en öm punkt som gör ont när du trycker på den',
      'Smärtan strålar iväg från punkten till ett annat område',
      'Besvären hänger ihop med hur du sitter eller arbetar',
      'Massage hjälper en stund men besvären kommer tillbaka',
    ],
    approach: [
      'Rörelseanalys och genomgång av ergonomi — vad i vardagen som underhåller belastningen.',
      'Triggerpunktsbehandling, bland annat med triggerpunkts- och periostakupunktur.',
      'Anpassad träning som gör att muskulaturen tål belastningen bättre över tid.',
      'Övningarna spelas in på video och skickas till din mobil efter genomgången, så att du har dem med dig hemma.',
    ],
    seekCare: [
      'Besvären återkommer så fort du slutar med behandling',
      'Du vill förstå vad i belastningen som driver smärtan',
      'Du vill ha en plan som håller även efter avslutad behandling',
    ],
    relatedTreatments: ['akupunktur', 'fysioterapi', 'medicinsk-smartbehandling', 'utredning'],
    group: 'Muskler',
  },
  {
    slug: 'nervsmarta',
    name: 'Nervsmärta',
    heading: 'Nervsmärta och nervinklämning',
    metaTitle: 'Nervsmärta och nervinklämning i Kristianstad',
    metaDescription:
      'Utredning och behandling av nervsmärta och nervinklämning i Kristianstad. Ultraljudsledda rotblockader, Qutenza och neuromodulering.',
    teaser:
      'Både spända muskler och skador kring nerver kan orsaka nervinklämning med svåra smärtor.',
    intro:
      'Såväl spända muskler som skador kring nerver kan orsaka nervinklämning med svåra smärtor. Nervsmärta beskrivs ofta annorlunda än annan smärta — brännande, stickande eller som elektriska stötar — och svarar därför också på delvis andra behandlingar.',
    recognise: [
      'Smärtan känns brännande, stickande eller som elstötar',
      'Du har domningar eller stickningar i ett bestämt område',
      'Smärtan följer ett stråk ut i arm eller ben',
      'Vanliga smärtstillande gör liten skillnad',
    ],
    approach: [
      'Smärtanalys med särskild vikt vid hur smärtan beskrivs och var den strålar.',
      'Undersökning av nerver och den omgivande vävnaden, med ultraljud.',
      'Vid behov ultraljudsledd rotblockad för att avgöra vilken nervrot som är inblandad.',
      'Behandling kan innefatta neuromodulering, Qutenza eller pulsad radiofrekvens — vad som är aktuellt beror på besvär och förutsättningar.',
    ],
    seekCare: [
      'Du har brännande eller stickande smärta som inte ger med sig',
      'Domningarna påverkar styrka eller känsel',
      'Vanlig smärtbehandling har inte hjälpt',
    ],
    relatedTreatments: ['utredning', 'pulsad-radiofrekvens', 'medicinsk-smartbehandling', 'akupunktur'],
    group: 'Nerver',
  },
  {
    slug: 'huvudvark-migran',
    name: 'Huvudvärk och migrän',
    heading: 'Huvudvärk och migrän',
    metaTitle: 'Huvudvärk och migrän i Kristianstad',
    metaDescription:
      'Bedömning och behandling av huvudvärk och migrän i Kristianstad. Botulinumtoxin vid kronisk migrän, nackrelaterad huvudvärk och triggerpunkter.',
    teaser:
      'Huvudvärk som hänger ihop med nacken, och kronisk migrän där botulinumtoxin kan vara aktuellt.',
    intro:
      'Huvudvärk har många orsaker. En del av dem sitter inte i huvudet utan i nacken, i muskulaturen eller i nervernas retbarhet. Vi bedömer vilken typ av huvudvärk det rör sig om innan vi tar ställning till behandling.',
    recognise: [
      'Huvudvärken börjar i nacken och kryper uppåt',
      'Du har migrän så ofta att den påverkar vardagen',
      'Du har ömma punkter i nacke och skuldra som ger huvudvärk',
      'Du har provat flera läkemedel utan tillräcklig effekt',
    ],
    approach: [
      'Bedömning av huvudvärkens karaktär, mönster och samband med nacke och muskulatur.',
      'Undersökning av nacke, nackmuskulatur och triggerpunkter.',
      'Vid kronisk migrän kan behandling med botulinumtoxin vara aktuell. Effekten varar i ungefär tre månader.',
      'Vid nackrelaterad huvudvärk kan behandling riktad mot nacken vara mer relevant än läkemedel.',
    ],
    seekCare: [
      'Huvudvärken är återkommande och påverkar arbete eller sömn',
      'Du vill veta om nacken är inblandad',
      'Du har kronisk migrän och vill diskutera behandlingsalternativ',
    ],
    relatedTreatments: ['utredning', 'medicinsk-smartbehandling', 'akupunktur', 'fysioterapi'],
    group: 'Nerver',
  },
];

export interface Treatment {
  slug: string;
  name: string;
  heading: string;
  metaDescription: string;
  teaser: string;
  intro: string;
  /** Rubrik + brödtext, staplade sektioner */
  sections: { title: string; body: string[] }[];
  /** Punktlista "Bra att veta" */
  goodToKnow: string[];
  /** Ingår i Region Skåne-avtalet? */
  inAgreement: boolean;
  relatedConditions: string[];
  image?: { src: string; alt: string; caption: string };
  /** Är detta en regenerativ metod? Används för filtrering. */
  regenerative: boolean;
}

export const TREATMENTS: Treatment[] = [
  {
    slug: 'utredning',
    name: 'Utredning och ultraljudsledda blockader',
    heading: 'Utredning: att först ta reda på var smärtan kommer ifrån',
    metaDescription:
      'Smärtutredning i Kristianstad: smärtanalys, funktionsundersökning, ultraljud och diagnostiska blockader — en struktur i taget.',
    teaser:
      'Smärtanalys, funktionsundersökning, ultraljud och diagnostiska blockader. Grunden för allt annat vi gör.',
    intro:
      'En korrekt diagnos är grunden för en lyckad smärtbehandling. Därför lägger vi tid på utredningen innan vi tar ställning till behandling. Räkna med 3–5 besök innan det går att uttala sig om orsaken till smärtan och ställa en diagnos.',
    sections: [
      {
        title: 'Smärtanalys',
        body: [
          'Vi går igenom var smärtan sitter, hur den startade och hur den utvecklats — samt vilka utredningar och behandlingar du redan har genomgått.',
          'Den delen är sällan snabb, men den avgör ofta resten. Mycket av det som ser ut som en behandlingsfråga visar sig vara en diagnosfråga.',
        ],
      },
      {
        title: 'Status och funktionsanalys',
        body: [
          'Funktionsanalys och tester av muskulatur, skelett, leder och stödjevävnad samt nerver, kompletterat med ultraljudsundersökning.',
          'Ultraljud gör att vi kan se vävnaden i rörelse, vilket höjer kvaliteten på undersökningen och ibland ger snabbt svar på var problemet sitter.',
        ],
      },
      {
        title: 'Diagnostiska blockader',
        body: [
          'Med hjälp av ultraljud läggs specifika blockader i en struktur i taget med lokalbedövning. Effekten utvärderas på en skattningsskala.',
          'Om smärtan minskar tydligt när en viss struktur bedövas talar det för att just den strukturen bidrar. Om den inte gör det, har vi också lärt oss något och kan gå vidare.',
          'Vanliga blockader är facettledsblockad i ryggraden, bäckenledsblockad och ledinjektioner i axel, höft, knä, fot, handled och tumled.',
        ],
      },
    ],
    goodToKnow: [
      'Räkna med 3–5 besök innan orsak och diagnos går att uttala sig om',
      'Varje besök är cirka 20 minuter enligt avtalet med Region Skåne',
      'Ultraljud används både vid undersökning och vid blockader',
      'Blockaderna är diagnostiska — syftet är att ta reda på något, inte enbart att lindra',
    ],
    inAgreement: true,
    relatedConditions: ['ryggsmarta', 'nacksmarta', 'backensmarta-si-led', 'axelsmarta', 'nervsmarta'],
    image: {
      src: '/bilder/ultraljud-l5-s1.jpg',
      alt: 'Ultraljudsbild från Apport som visar strukturer i nedre ländryggen, med markeringar vid nivån L5–S1',
      caption:
        'Ultraljudsbild tagen på Apport. Markörerna pekar ut de strukturer som bedömts inför en blockad i nedre ländryggen.',
    },
    regenerative: false,
  },
  {
    slug: 'akupunktur',
    name: 'Akupunktur',
    heading: 'Akupunktur: triggerpunkter, periost och senfästen',
    metaDescription:
      'Akupunktur i Kristianstad — triggerpunkts- och periostakupunktur mot sena, muskelfäste, ligament och leder, ofta med ultraljud.',
    teaser:
      'Stimulering mot sena, muskelfäste, ligament eller leder — inklusive periost- och triggerpunktsakupunktur.',
    intro:
      'Akupunktur används hos oss som en riktad behandling mot en bestämd struktur: en sena, ett muskelfäste, ett ligament eller en led. Det är alltså inte i första hand en allmänt avslappnande behandling, utan ett sätt att arbeta mot det som undersökningen pekat ut.',
    sections: [
      {
        title: 'Triggerpunkts- och periostakupunktur',
        body: [
          'Triggerpunktsakupunktur riktas mot ömma punkter i muskulaturen som kan ge smärta även på annat håll i kroppen.',
          'Periostakupunktur riktas mot benhinnan vid muskel- och senfästen. Båda metoderna kräver god kännedom om anatomin i området.',
        ],
      },
      {
        title: 'Med ultraljud',
        body: [
          'Behandlingen utförs ofta med ultraljudsvägledning, vilket gör att nålen kan placeras mot rätt struktur.',
          'Det är särskilt värdefullt där strukturerna ligger tätt eller djupt.',
        ],
      },
      {
        title: 'Som del av regenerativ behandling',
        body: [
          'Vid dry needling används akupunkturnålar för att åstadkomma en begränsad skada i vävnaden. Det kan sätta igång en inflammation och en läkningsprocess.',
          'Det är samma grundprincip som ligger bakom proloterapi, fast utan att något injiceras.',
        ],
      },
    ],
    goodToKnow: [
      'Utförs ofta med ultraljudsvägledning',
      'Riktas mot en bestämd struktur som utredningen pekat ut',
      'Ingår i avtalet med Region Skåne',
      'Effekten varierar mellan patienter och besvär',
    ],
    inAgreement: true,
    relatedConditions: ['muskelsmarta-triggerpunkter', 'ryggsmarta', 'nacksmarta', 'axelsmarta'],
    regenerative: true,
  },
  {
    slug: 'proloterapi',
    name: 'Proloterapi',
    heading: 'Proloterapi',
    metaDescription:
      'Proloterapi i Kristianstad — injektion som kan aktivera kroppens egen läkningsprocess i skadad vävnad. Utförs med ultraljud.',
    teaser:
      'Injektion av ett retande ämne, oftast dextros, som kan starta en läkningsprocess i skadad vävnad.',
    intro:
      'Proloterapi innebär att ett retande ämne, oftast dextros, injiceras i eller intill skadad vävnad. Syftet är att aktivera immunsystemet så att en läkningsprocess kommer igång i vävnad som inte läkt av sig själv.',
    sections: [
      {
        title: 'Så fungerar det',
        body: [
          'Injektionen orsakar en aktivering av immunsystemet — initialt med inflammation, därefter frisättning av bland annat tillväxt- och komplementfaktorer.',
          'En kedjereaktion startas med inflammation, vävnadsnybildning (proliferation) och omformning av vävnaden.',
          'Behandlingen upprepas vanligen vid flera tillfällen.',
        ],
      },
      {
        title: 'Vad du kan förvänta dig',
        body: [
          'Många patienter upplever ökad smärta dag 2–4 efter behandlingen. Det hänger ihop med den inflammation som är avsedd att uppstå.',
          'Hur väl behandlingen fungerar varierar mellan patienter, och beror på besvär, vävnad och förutsättningar. Vi gör en bedömning i varje enskilt fall.',
        ],
      },
    ],
    goodToKnow: [
      'Ökad smärta dag 2–4 efter behandlingen är vanligt',
      'Behandlingen upprepas oftast vid flera tillfällen',
      'Utförs med ultraljudsvägledning',
      'PRP ges vanligen en vecka efter proloterapi när båda är aktuella',
    ],
    inAgreement: true,
    relatedConditions: ['ryggsmarta', 'backensmarta-si-led', 'artros', 'axelsmarta'],
    regenerative: true,
  },
  {
    slug: 'prp',
    name: 'PRP — Platelet Rich Plasma',
    heading: 'PRP — behandling med kroppens egna blodplättar',
    metaDescription:
      'PRP-behandling i Kristianstad. Eget blod centrifugeras och injiceras med ultraljud i skadad vävnad. Ingår ej i Region Skåne-avtalet.',
    teaser:
      'Ditt eget blod centrifugeras fram till en plasma rik på blodplättar och tillväxtfaktorer, som injiceras med ultraljud.',
    intro:
      'PRP står för Platelet Rich Plasma. Ditt eget blod tas och centrifugeras så att en plasma rik på blodplättar och tillväxtfaktorer kan tas till vara. Plasman injiceras därefter med ultraljudsvägledning i den skadade strukturen.',
    sections: [
      {
        title: 'Så går det till',
        body: [
          'Blod tas på kliniken och centrifugeras direkt.',
          'Den plasma som blir kvar innehåller en koncentration av blodplättar och tillväxtfaktorer.',
          'Plasman injiceras med ultraljud i den struktur som utredningen pekat ut.',
        ],
      },
      {
        title: 'Tidpunkten spelar roll',
        body: [
          'Metoden har bäst effekt om det redan pågår en inflammation i vävnaden.',
          'Därför ges PRP vanligen en vecka efter proloterapi, när den avsedda inflammationen kommit igång.',
        ],
      },
    ],
    goodToKnow: [
      'Ingår INTE i avtalet med Region Skåne',
      'Kostnad 2 000–2 500 kr per behandling',
      'Ges vanligen en vecka efter proloterapi',
      'Utförs med ultraljudsvägledning',
    ],
    inAgreement: false,
    relatedConditions: ['artros', 'axelsmarta'],
    regenerative: true,
  },
  {
    slug: 'pulsad-radiofrekvens',
    name: 'Pulsad radiofrekvens (pRF)',
    heading: 'Pulsad radiofrekvens (pRF)',
    metaDescription:
      'Pulsad radiofrekvens (pRF) i Kristianstad vid långvarig smärta och nervsmärta. Ingår ej i Region Skåne-avtalet.',
    teaser:
      'Behandling med pulsade radiofrekvenssignaler via särskilda nålar, placerade med ultraljud.',
    intro:
      'Pulsad radiofrekvens innebär att elektriska signaler förs in via särskilda nålar som placeras intill den struktur som ska behandlas. Nålarnas läge kontrolleras med ultraljud.',
    sections: [
      {
        title: 'Så går det till',
        body: [
          'Nålarna placeras med ultraljudsvägledning intill den struktur som utredningen pekat ut.',
          'Behandlingen ges under ett besök på kliniken.',
        ],
      },
      {
        title: 'När kan det vara aktuellt',
        body: [
          'pRF kan vara aktuellt vid vissa långvariga smärttillstånd, bland annat nervrelaterad smärta.',
          'Om metoden är lämplig för just dig avgörs av utredningen. Vi tar ställning till det tillsammans med dig.',
        ],
      },
    ],
    goodToKnow: [
      'Ingår INTE i avtalet med Region Skåne',
      'Kostnad 2 000–2 500 kr per behandling',
      'Nålarnas läge kontrolleras med ultraljud',
    ],
    inAgreement: false,
    relatedConditions: ['nervsmarta', 'ryggsmarta', 'nacksmarta'],
    image: {
      src: '/bilder/pulsad-rf-1.jpeg',
      alt: 'Två nålar för pulsad radiofrekvens placerade i ländryggen under behandling på Apport',
      caption: 'Pulsad radiofrekvens i ländryggen. Nålarnas läge kontrolleras med ultraljud före behandlingen.',
    },
    regenerative: false,
  },
  {
    slug: 'medicinsk-smartbehandling',
    name: 'Medicinsk smärtbehandling',
    heading: 'Medicinsk smärtbehandling',
    metaDescription:
      'Medicinsk smärtbehandling i Kristianstad: TENS, neuromodulering, Qutenza vid nervsmärta och botulinumtoxin vid kronisk migrän.',
    teaser:
      'TENS, neuromodulering, Qutenza och botulinumtoxin — metoder som väljs utifrån vilken typ av smärta det rör sig om.',
    intro:
      'Olika typer av smärta svarar på olika behandlingar. Nedan är de medicinska metoder vi arbetar med utöver injektionsbehandlingarna. Vilken som är aktuell beror på vad utredningen visat.',
    sections: [
      {
        title: 'TENS',
        body: [
          'TENS står för transkutan elektrisk nervstimulering. En elektrisk signal förs in i kroppen via huden med hjälp av elektroder.',
          'Både hög och låg frekvens används. Smärtlindringen förklaras dels av portteorin, dels av frisättning av kroppsegna endorfiner.',
        ],
      },
      {
        title: 'Neuromodulering',
        body: [
          'Vid neuromodulering används högre frekvenser, från omkring 200 Hz, riktade mot centrala nervsystemets egen smärtreglering.',
          'Signalen ges via särskilda nålar eller via TENS-apparat.',
        ],
      },
      {
        title: 'Qutenza',
        body: [
          'Qutenza är ett plåster med hög koncentration capsaicin som används vid nervsmärta.',
          'Effekten kan hålla i sig upp till tre månader.',
        ],
      },
      {
        title: 'Botulinumtoxin',
        body: [
          'Botulinumtoxin blockerar överföringen mellan nerv och muskel.',
          'Det används vid kronisk migrän, dystoni och svåra triggerpunktssyndrom. Effekten varar i ungefär tre månader.',
        ],
      },
    ],
    goodToKnow: [
      'Vilken metod som är aktuell beror på typ av smärta',
      'Qutenza och botulinumtoxin har effekt i ungefär tre månader',
      'TENS kan i vissa fall användas av dig själv hemma efter genomgång',
    ],
    inAgreement: true,
    relatedConditions: ['nervsmarta', 'huvudvark-migran', 'muskelsmarta-triggerpunkter'],
    regenerative: false,
  },
  {
    slug: 'fysioterapi',
    name: 'Fysioterapi, träning och rehabilitering',
    heading: 'Fysioterapi, träning och rehabilitering',
    metaDescription:
      'Fysioterapi i Kristianstad — stabilitetsträning vid ryggsmärta och ledbesvär, triggerpunktsakupunktur och videoinspelade övningar till mobilen.',
    teaser:
      'Stabilitetsträning, rörelseanalys och triggerpunktsbehandling — med övningarna inspelade på video till din mobil.',
    intro:
      'Vi bedriver en bred verksamhet med fokus på smärttillstånd, som innefattar såväl träning som behandling. Fysioterapin på Apport arbetar nära läkaren, så att diagnostiken och träningen hänger ihop.',
    sections: [
      {
        title: 'Stabilitetsträning',
        body: [
          'Rehabilitering med stabilitetsträning vid ryggsmärta och ledproblem är en av klinikens tyngdpunkter.',
          'Kompetensen omfattar långvarig smärta, MTT, ortopedisk medicin (OMT) och akupunktur — konventionell, triggerpunkts- och periostakupunktur.',
        ],
      },
      {
        title: 'Rörelseanalys och ergonomi',
        body: [
          'Vid muskelrelaterad smärta börjar vi ofta med rörelseanalys och en genomgång av ergonomin — vad i vardagen som underhåller belastningen.',
          'Därefter anpassas träningen efter vad du faktiskt tål, inte efter ett standardprogram.',
        ],
      },
      {
        title: 'Övningarna följer med hem',
        body: [
          'Vi har byggt upp ett bibliotek med videoinspelade övningar med tydliga instruktioner.',
          'Efter genomgången med fysioterapeut får du dem i din mobiltelefon, så att du kan se exakt hur en övning ska utföras även flera veckor senare.',
        ],
      },
    ],
    goodToKnow: [
      'Ingår i avtalet med Region Skåne',
      'Egenremiss för fysioterapi skickas till patient@apport.rehab',
      'Övningarna spelas in på video och skickas till din mobil',
      'Läkare finns som resurs i bedömningen',
    ],
    inAgreement: true,
    relatedConditions: ['ryggsmarta', 'artros', 'muskelsmarta-triggerpunkter', 'axelsmarta', 'backensmarta-si-led'],
    regenerative: false,
  },
];

/** Processen — "Så går det till" */
export const PROCESS = [
  {
    number: '01',
    title: 'Egenremiss',
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
    title: 'Uppföljning',
    body: 'Vi följer upp hur kroppen svarar och justerar. Om något inte ger effekt säger vi det, och tar ställning till om vi ska pröva något annat.',
  },
] as const;

/**
 * Vad kliniken INTE tar emot. Ordagrant grundat i /apport-smarta/.
 * Detta är klinikens tydligaste avgränsning och därför en av sajtens viktigaste texter.
 */
export const NOT_OFFERED = {
  conditions: [
    'Kroniska tillstånd utan utsikter till bot',
    'Generell värk',
    'Trötthetssyndrom',
    'Hypermobilitet',
  ],
  services: [
    'Sjukskrivningsintyg',
    'Parkeringstillstånd',
    'Förnyelse av recept',
  ],
} as const;

export interface Faq {
  q: string;
  a: string;
}

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
