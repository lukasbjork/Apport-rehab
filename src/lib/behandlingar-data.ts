/**
 * Behandlingar — fullständiga landningssidor.
 *
 * ⚠️ MEDICINSK GRANSKNING
 * `notSuitable` innehåller MEDVETET inga specifika medicinska
 * kontraindikationer. Klinikens befintliga material listar inga, och att
 * hitta på dem vore direkt farligt. Fältet innehåller i stället klinikens
 * eget arbetssätt (att de bedömer i varje enskilt fall) plus de avgränsningar
 * som faktiskt står i källan. Rolf behöver komplettera med de verkliga
 * kontraindikationerna innan lansering — se README → "Medicinsk granskning".
 *
 * Allt övrigt är grundat i apport.rehab (/behandling/, /utredning/,
 * /sjalvlakning/, /apport-fysioterapi/, /apport-smarta/, /kliniken/) samt
 * 1177:s vårdgivarkort.
 */
import type { Faq } from './content';

export interface Treatment {
  slug: string;
  name: string;
  /** Kort namn för smala ytor (kort, sidospalt, footer) */
  shortName: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  teaser: string;
  /** "Vad är det?" */
  intro: string;
  /** "När kan det vara aktuellt?" */
  whenRelevant: string[];
  /** "Hur går det till?" — staplade avsnitt */
  sections: { title: string; body: string[] }[];
  /** "Hur arbetar Apport?" — det som skiljer kliniken */
  apportApproach: string[];
  /** "När är det inte lämpligt?" — ⚠️ kräver komplettering av kliniken */
  notSuitable: string[];
  /** Punktlista "Bra att veta" */
  goodToKnow: string[];
  /** Ingår i Region Skåne-avtalet? Styr priskort och märkning. */
  inAgreement: boolean;
  /** Fritext för kostnad, används på priskortet */
  cost: string;
  faqs: Faq[];
  relatedConditions: string[];
  image?: { src: string; alt: string; caption: string };
  regenerative: boolean;
}

export const TREATMENTS: Treatment[] = [
  {
    slug: 'utredning',
    name: 'Utredning och ultraljudsledda blockader',
    shortName: 'Utredning',
    heading: 'Utredning: att först ta reda på var smärtan kommer ifrån',
    metaTitle: 'Smärtutredning i Kristianstad — ultraljudsledda blockader',
    metaDescription:
      'Smärtutredning i Kristianstad: smärtanalys, funktionsundersökning, ultraljud och diagnostiska blockader — en struktur i taget.',
    teaser:
      'Smärtanalys, funktionsundersökning, ultraljud och diagnostiska blockader. Grunden för allt annat vi gör.',
    intro:
      'En korrekt diagnos är grunden för en lyckad smärtbehandling. Därför lägger vi tid på utredningen innan vi tar ställning till behandling. Utredningen består av tre delar: smärtanalys, funktionsundersökning med ultraljud, och vid behov diagnostiska blockader.',
    whenRelevant: [
      'Du har haft ont länge utan att få besked om orsaken',
      'Bilddiagnostik har varit normal men besvären finns kvar',
      'Tidigare behandling har inte gett effekt och du vill veta varför',
      'Du vill veta vilken struktur som faktiskt gör ont innan du fortsätter',
    ],
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
          'Vanliga blockader är facettledsblockad i ryggraden, bäckenledsblockad, rotblockad och ledinjektioner i axel, höft, knä, fot, handled och tumled.',
        ],
      },
    ],
    apportApproach: [
      'Vi gissar inte. Varje struktur prövas för sig och effekten mäts på en skattningsskala, så att slutsatsen bygger på något mätbart.',
      'Ultraljud används både vid undersökning och vid blockader. Att se strukturen medan nålen förs in är skillnaden mellan att träffa rätt och att hoppas.',
      'Vi säger till när vi inte hittar något. Att utredningen inte gav svar är också ett svar, och bättre än att fortsätta behandla i blindo.',
    ],
    notSuitable: [
      'Vi utreder inte kroniska tillstånd utan utsikter till bot, generell värk, trötthetssyndrom eller hypermobilitet.',
      'Vid misstanke om tillstånd som hör hemma inom annan specialitet hänvisar vi vidare i stället för att utreda själva.',
      'Enskilda blockader kan vara olämpliga av medicinska skäl. Det bedöms individuellt vid besöket.',
    ],
    goodToKnow: [
      'Räkna med 3–5 besök innan orsak och diagnos går att uttala sig om',
      'Varje besök är cirka 20 minuter enligt avtalet med Region Skåne',
      'Blockaderna är diagnostiska — syftet är att ta reda på något, inte enbart att lindra',
      'Du behöver ingen remiss',
    ],
    inAgreement: true,
    cost: 'Patientavgift 200 kr per besök. Frikort gäller.',
    faqs: [
      {
        q: 'Varför behövs 3–5 besök?',
        a: 'Varje besök är cirka 20 minuter enligt vårt avtal med Region Skåne, och varje diagnostisk blockad prövar en struktur i taget. Att göra det ordentligt tar tid — men en korrekt diagnos är grunden för en lyckad behandling.',
      },
      {
        q: 'Gör en blockad ont?',
        a: 'En blockad läggs med lokalbedövning och med ultraljud som vägledning, vilket gör att nålen kan placeras så exakt som möjligt. De flesta tycker att det är hanterbart, men upplevelsen varierar. Vi går igenom vad som ska hända innan vi börjar.',
      },
      {
        q: 'Vad händer om ni inte hittar orsaken?',
        a: 'Då säger vi det. Ibland leder utredningen fram till att vi inte är rätt klinik för dina besvär, och då är det bättre att du får veta det tidigt än att fortsätta med behandling som inte hjälper.',
      },
    ],
    relatedConditions: ['ryggsmarta', 'nacksmarta', 'whiplash', 'backensmarta-si-led', 'axelsmarta', 'nervsmarta'],
    image: {
      src: '/bilder/ultraljud-l5-s1.webp',
      alt: 'Ultraljudsbild från Apport som visar strukturer i nedre ländryggen med markeringar vid nivån L5–S1',
      caption:
        'Ultraljudsbild tagen på kliniken. Markörerna pekar ut de strukturer som bedömts inför en blockad i nedre ländryggen.',
    },
    regenerative: false,
  },

  {
    slug: 'smartspecialist',
    name: 'Smärtspecialist',
    shortName: 'Smärtspecialist',
    heading: 'Smärtspecialist i Kristianstad',
    metaTitle: 'Smärtspecialist i Kristianstad | Apport',
    metaDescription:
      'Apport är en smärtspecialistklinik i Kristianstad. Läkare med specialistkompetens i smärtlindring, rehabiliteringsmedicin och allmänmedicin. Inget remisstvång.',
    teaser:
      'Vad en smärtspecialist gör, hur bedömningen går till och när det är läge att söka sig hit.',
    intro:
      'En smärtspecialist är läkare med särskild kompetens inom smärttillstånd. På Apport är det Rolf Jönsson, som är specialist i smärtlindring, rehabiliteringsmedicin och allmänmedicin — tre kompetenser som tillsammans täcker vägen från utredning till funktion.',
    whenRelevant: [
      'Du har haft ont längre än några månader utan att få besked om orsaken',
      'Du har redan varit hos vårdcentral, fysioterapeut eller ortoped utan att det gett resultat',
      'Du har en lokal eller regional smärta — den sitter på ett bestämt ställe',
      'Du vill förstå vad som orsakar smärtan innan du provar ännu en behandling',
    ],
    sections: [
      {
        title: 'Vad en smärtspecialist gör',
        body: [
          'En smärtspecialist arbetar med att avgöra varifrån smärtan kommer och vad som kan göras åt den — inte enbart med att lindra den.',
          'Det innebär ofta en mer systematisk utredning än den man får i primärvården, där tiden per besök är kortare och möjligheterna till riktad diagnostik färre.',
        ],
      },
      {
        title: 'Hur bedömningen går till hos oss',
        body: [
          'Vi börjar med en smärtanalys: hur smärtan startade, hur den utvecklats, vad som redan är gjort.',
          'Därefter funktionsundersökning och ultraljud, och vid behov diagnostiska blockader där en struktur prövas i taget.',
          'Räkna med 3–5 besök innan vi kan uttala oss om orsaken.',
        ],
      },
      {
        title: 'Läkare och fysioterapeut tillsammans',
        body: [
          'Teamet består av läkare som är specialist i smärtlindring och fysioterapeut, som samarbetar kring diagnostik och behandling.',
          'Det gör att bedömning, medicinsk behandling och rehabilitering hänger ihop i stället för att bli separata spår hos olika vårdgivare.',
        ],
      },
    ],
    apportApproach: [
      'Rolf har arbetat med smärta sedan mitten av 80-talet och har tre specialistkompetenser: allmänmedicin (1991), rehabiliteringsmedicin (1997) och smärtlindring (1998).',
      'Han har erfarenhet från specialiserad smärtrehabilitering vid CSK Kristianstad, Blekingesjukhuset Karlshamn och Capio Citykliniken, samt egen verksamhet sedan 2006.',
      'Kliniken har internationell utbildning i ultraljudsledd smärtbehandling — det är den metoden som ligger till grund för utredningen.',
      'Vi arbetar på uppdrag av Region Skåne. Patientavgiften är densamma som i övrig offentligt finansierad vård och frikort gäller.',
    ],
    notSuitable: [
      'Vi tar inte emot kroniska tillstånd utan utsikter till bot, generell värk, trötthetssyndrom eller hypermobilitet.',
      'Vi utfärdar inte sjukskrivningsintyg eller parkeringstillstånd, och förnyar inte recept.',
      'Vid akuta tillstånd ska du vända dig till vårdcentral, akutmottagning eller 1177.',
    ],
    goodToKnow: [
      'Inget remisstvång — du skriver en egenremiss själv',
      'Patientavgift 200 kr, frikort gäller',
      'Besöket är cirka 20 minuter enligt avtalet med Region Skåne',
      'Telefontid måndag 08.00–09.00',
    ],
    inAgreement: true,
    cost: 'Patientavgift 200 kr per besök. Frikort gäller.',
    faqs: [
      {
        q: 'Vad är skillnaden mellan en smärtspecialist och en vårdcentralsläkare?',
        a: 'En smärtspecialist är läkare med särskild specialistkompetens inom smärttillstånd, och arbetar mer systematiskt med att avgöra varifrån smärtan kommer. Vi använder bland annat ultraljudsledda diagnostiska blockader, vilket inte är tillgängligt i primärvården.',
      },
      {
        q: 'Behöver jag remiss från vårdcentralen?',
        a: 'Nej. Vi har inget remisstvång. Du skriver några rader om dina besvär och mejlar dem till patient@apport.rehab.',
      },
      {
        q: 'Kostar det mer än ett vanligt vårdbesök?',
        a: 'Nej. Vi arbetar på uppdrag av Region Skåne enligt nationella taxan, vilket innebär att patientavgiften är 200 kr och att frikort gäller. Undantaget är PRP och pulsad radiofrekvens som ligger utanför avtalet.',
      },
    ],
    relatedConditions: ['ryggsmarta', 'nacksmarta', 'nervsmarta', 'artros', 'whiplash'],
    regenerative: false,
  },

  {
    slug: 'akupunktur',
    name: 'Akupunktur',
    shortName: 'Akupunktur',
    heading: 'Akupunktur: triggerpunkter, periost och senfästen',
    metaTitle: 'Akupunktur i Kristianstad — triggerpunkter och periost',
    metaDescription:
      'Akupunktur i Kristianstad — triggerpunkts- och periostakupunktur mot sena, muskelfäste, ligament och leder, ofta med ultraljud.',
    teaser:
      'Stimulering mot sena, muskelfäste, ligament eller leder — inklusive periost- och triggerpunktsakupunktur.',
    intro:
      'Akupunktur används hos oss som en riktad behandling mot en bestämd struktur: en sena, ett muskelfäste, ett ligament eller en led. Det är alltså inte i första hand en allmänt avslappnande behandling, utan ett sätt att arbeta mot det som undersökningen pekat ut.',
    whenRelevant: [
      'Utredningen har pekat ut en muskel, ett senfäste eller en led som smärtkälla',
      'Du har triggerpunkter som ger smärta även på andra ställen',
      'Du har muskelrelaterad smärta som återkommer trots massage eller egenvård',
    ],
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
        title: 'Dry needling som regenerativ metod',
        body: [
          'Vid dry needling används akupunkturnålar för att åstadkomma en begränsad skada i vävnaden. Det kan sätta igång en inflammation och en läkningsprocess.',
          'Det är samma grundprincip som ligger bakom proloterapi, fast utan att något injiceras.',
        ],
      },
    ],
    apportApproach: [
      'Vi använder akupunktur riktat, mot en struktur som utredningen pekat ut — inte som en generell behandling.',
      'Vår fysioterapeut har fördjupning i just triggerpunkts- och periostbehandling, och har arbetat med långvarig smärta sedan 1996.',
      'Behandlingen kombineras oftast med träning, eftersom besvären tenderar att återkomma om belastningen som orsakade dem är kvar.',
    ],
    notSuitable: [
      'Om utredningen inte pekar ut en muskel- eller senrelaterad smärtkälla är akupunktur sällan rätt behandling.',
      'Vi bedömer lämpligheten individuellt vid besöket.',
    ],
    goodToKnow: [
      'Utförs ofta med ultraljudsvägledning',
      'Riktas mot en bestämd struktur som utredningen pekat ut',
      'Ingår i avtalet med Region Skåne',
      'Effekten varierar mellan patienter och besvär',
    ],
    inAgreement: true,
    cost: 'Patientavgift 200 kr per besök. Frikort gäller.',
    faqs: [
      {
        q: 'Är det samma sak som traditionell kinesisk akupunktur?',
        a: 'Nej. Vi använder akupunktur anatomiskt — riktat mot en bestämd struktur som undersökningen pekat ut, ofta med ultraljud som vägledning.',
      },
      {
        q: 'Hur många behandlingar behövs?',
        a: 'Det varierar beroende på besvär och hur du svarar på behandlingen. Vi utvärderar efter hand och justerar.',
      },
    ],
    relatedConditions: ['muskelsmarta-triggerpunkter', 'ryggsmarta', 'nacksmarta', 'axelsmarta', 'huvudvark'],
    regenerative: true,
  },

  {
    slug: 'proloterapi',
    name: 'Proloterapi',
    shortName: 'Proloterapi',
    heading: 'Proloterapi',
    metaTitle: 'Proloterapi i Kristianstad | Apport',
    metaDescription:
      'Proloterapi i Kristianstad — injektion som kan aktivera kroppens egen läkningsprocess i skadad vävnad. Utförs med ultraljud.',
    teaser:
      'Injektion av ett retande ämne, oftast dextros, som kan starta en läkningsprocess i skadad vävnad.',
    intro:
      'Proloterapi innebär att ett retande ämne, oftast dextros, injiceras i eller intill skadad vävnad. Syftet är att aktivera immunsystemet så att en läkningsprocess kommer igång i vävnad som inte läkt av sig själv.',
    whenRelevant: [
      'Utredningen har pekat ut ett senfäste eller ett ligament som smärtkälla',
      'Vävnaden har inte läkt av sig själv trots lång tid',
      'Det rör sig om stödjevävnad med begränsad blodförsörjning, där läkningen ofta stannar av',
    ],
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
    apportApproach: [
      'Proloterapi ges först efter att utredningen pekat ut vilken struktur som är inblandad — inte som en generell behandling mot smärta.',
      'Injektionen läggs med ultraljudsvägledning så att den hamnar i rätt vävnad.',
      'När både proloterapi och PRP är aktuella ges PRP vanligen en vecka efter proloterapin, när den avsedda inflammationen kommit igång.',
    ],
    notSuitable: [
      'Om utredningen inte pekat ut skadad stödjevävnad som smärtkälla är proloterapi sällan aktuell.',
      'Behandlingen förutsätter att du kan hantera att smärtan ofta ökar under några dagar efteråt.',
      'Vi bedömer lämpligheten individuellt vid besöket.',
    ],
    goodToKnow: [
      'Ökad smärta dag 2–4 efter behandlingen är vanligt',
      'Behandlingen upprepas oftast vid flera tillfällen',
      'Utförs med ultraljudsvägledning',
      'PRP ges vanligen en vecka efter proloterapi när båda är aktuella',
    ],
    inAgreement: true,
    cost: 'Patientavgift 200 kr per besök. Frikort gäller.',
    faqs: [
      {
        q: 'Varför gör det ondare efteråt?',
        a: 'Behandlingen är avsedd att framkalla en inflammation — det är den som startar läkningsprocessen. Många upplever därför ökad smärta dag 2–4. Det är förväntat, inte ett tecken på att något gått fel.',
      },
      {
        q: 'Hur många behandlingar behövs?',
        a: 'Behandlingen upprepas vanligen vid flera tillfällen. Exakt hur många beror på besvär och hur du svarar på behandlingen.',
      },
      {
        q: 'Ingår proloterapi i Region Skånes avtal?',
        a: 'Ja. Det är PRP och pulsad radiofrekvens som ligger utanför avtalet och betalas separat.',
      },
    ],
    relatedConditions: ['ryggsmarta', 'backensmarta-si-led', 'artros', 'axelsmarta', 'whiplash'],
    regenerative: true,
  },

  {
    slug: 'prp',
    name: 'PRP — Platelet Rich Plasma',
    shortName: 'PRP',
    heading: 'PRP — behandling med kroppens egna blodplättar',
    metaTitle: 'PRP-behandling i Kristianstad | Apport',
    metaDescription:
      'PRP-behandling i Kristianstad. Eget blod centrifugeras och injiceras med ultraljud i skadad vävnad. 2 000–2 500 kr, ingår ej i Region Skåne-avtalet.',
    teaser:
      'Ditt eget blod centrifugeras fram till en plasma rik på blodplättar och tillväxtfaktorer, som injiceras med ultraljud.',
    intro:
      'PRP står för Platelet Rich Plasma. Ditt eget blod tas och centrifugeras så att en plasma rik på blodplättar och tillväxtfaktorer kan tas till vara. Plasman injiceras därefter med ultraljudsvägledning i den skadade strukturen.',
    whenRelevant: [
      'Utredningen har pekat ut en skadad struktur där regenerativ behandling kan vara aktuell',
      'Det pågår redan en inflammation i vävnaden — metoden har bäst effekt då',
      'Proloterapi har getts och nästa steg i behandlingskedjan är aktuellt',
    ],
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
    apportApproach: [
      'Vi ger PRP först efter utredning, och normalt som ett steg i en behandlingskedja — inte som en fristående behandling.',
      'Injektionen läggs med ultraljudsvägledning.',
      'Eftersom behandlingen betalas av dig själv går vi alltid igenom kostnaden och vad vi tror om utsikterna innan något bokas.',
    ],
    notSuitable: [
      'Om det inte finns en identifierad struktur att behandla är PRP inte aktuell.',
      'Vi bedömer lämpligheten individuellt vid besöket, och avråder hellre än att genomföra en behandling vi inte tror på.',
    ],
    goodToKnow: [
      'Ingår INTE i avtalet med Region Skåne',
      'Kostnad 2 000–2 500 kr per behandling',
      'Ges vanligen en vecka efter proloterapi',
      'Utförs med ultraljudsvägledning',
    ],
    inAgreement: false,
    cost: '2 000–2 500 kr per behandling. Betalas av dig själv — ingår inte i avtalet med Region Skåne.',
    faqs: [
      {
        q: 'Vad kostar PRP?',
        a: '2 000–2 500 kr per behandling. PRP ingår inte i vårt avtal med Region Skåne, så kostnaden betalas av dig själv. Vi går alltid igenom priset innan behandlingen bokas.',
      },
      {
        q: 'Varför ingår inte PRP i avtalet?',
        a: 'Vårt avtal med Region Skåne omfattar inte PRP och pulsad radiofrekvens. Övriga behandlingar hos oss ges med patientavgift 200 kr och frikort.',
      },
      {
        q: 'Kan jag boka PRP direkt utan utredning?',
        a: 'Nej. Vi ger PRP först efter en utredning som visat vilken struktur som är inblandad. Utan det vet vi inte var behandlingen ska läggas eller om den är rimlig.',
      },
    ],
    relatedConditions: ['artros', 'axelsmarta'],
    regenerative: true,
  },

  {
    slug: 'pulsad-radiofrekvens',
    name: 'Pulsad radiofrekvens (pRF)',
    shortName: 'Pulsad radiofrekvens',
    heading: 'Pulsad radiofrekvens (pRF)',
    metaTitle: 'Pulsad radiofrekvens (pRF) i Kristianstad | Apport',
    metaDescription:
      'Pulsad radiofrekvens (pRF) i Kristianstad vid långvarig smärta och nervsmärta. 2 000–2 500 kr, ingår ej i Region Skåne-avtalet.',
    teaser:
      'Behandling med pulsade radiofrekvenssignaler via särskilda nålar, placerade med ultraljud.',
    intro:
      'Pulsad radiofrekvens innebär att elektriska signaler förs in via särskilda nålar som placeras intill den struktur som ska behandlas. Nålarnas läge kontrolleras med ultraljud.',
    whenRelevant: [
      'Vid vissa långvariga smärttillstånd, bland annat nervrelaterad smärta',
      'När utredningen pekat ut en struktur men annan behandling inte gett tillräcklig effekt',
      'Om metoden är lämplig för just dig avgörs av utredningen',
    ],
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
    apportApproach: [
      'Nålarnas läge kontrolleras med ultraljud, vilket är förutsättningen för att signalen ska hamna rätt.',
      'Behandlingen ges efter utredning, inte som ett första steg.',
      'Eftersom den ligger utanför avtalet går vi alltid igenom kostnaden i förväg.',
    ],
    notSuitable: [
      'Utan en identifierad struktur från utredningen är pRF inte aktuell.',
      'Vi bedömer lämpligheten individuellt vid besöket.',
    ],
    goodToKnow: [
      'Ingår INTE i avtalet med Region Skåne',
      'Kostnad 2 000–2 500 kr per behandling',
      'Nålarnas läge kontrolleras med ultraljud',
      'Ges efter utredning, inte som första åtgärd',
    ],
    inAgreement: false,
    cost: '2 000–2 500 kr per behandling. Betalas av dig själv — ingår inte i avtalet med Region Skåne.',
    faqs: [
      {
        q: 'Vad kostar pulsad radiofrekvens?',
        a: '2 000–2 500 kr per behandling. Liksom PRP ingår pRF inte i vårt avtal med Region Skåne.',
      },
      {
        q: 'Är det samma sak som vanlig radiofrekvensbehandling?',
        a: 'Pulsad radiofrekvens innebär att signalen ges i pulser. Vi använder den vid vissa långvariga smärttillstånd, bland annat nervrelaterad smärta.',
      },
    ],
    relatedConditions: ['nervsmarta', 'ryggsmarta', 'nacksmarta', 'whiplash'],
    image: {
      src: '/bilder/pulsad-rf-1.webp',
      alt: 'Två nålar för pulsad radiofrekvens placerade i ländryggen under behandling på Apport',
      caption: 'Pulsad radiofrekvens i ländryggen. Nålarnas läge kontrolleras med ultraljud före behandlingen.',
    },
    regenerative: false,
  },

  {
    slug: 'medicinsk-smartbehandling',
    name: 'Medicinsk smärtbehandling',
    shortName: 'Medicinsk behandling',
    heading: 'Medicinsk smärtbehandling',
    metaTitle: 'Medicinsk smärtbehandling i Kristianstad | Apport',
    metaDescription:
      'Medicinsk smärtbehandling i Kristianstad: TENS, neuromodulering, Qutenza vid nervsmärta och botulinumtoxin vid kronisk migrän.',
    teaser:
      'TENS, neuromodulering, Qutenza och botulinumtoxin — metoder som väljs utifrån vilken typ av smärta det rör sig om.',
    intro:
      'Olika typer av smärta svarar på olika behandlingar. Nedan är de medicinska metoder vi arbetar med utöver injektionsbehandlingarna. Vilken som är aktuell beror på vad utredningen visat.',
    whenRelevant: [
      'Vid nervsmärta, där Qutenza eller neuromodulering kan vara aktuellt',
      'Vid kronisk migrän eller svåra triggerpunktssyndrom, där botulinumtoxin kan vara aktuellt',
      'När du vill ha ett verktyg att använda själv hemma — TENS kan i vissa fall vara det',
    ],
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
    apportApproach: [
      'Vilken metod som väljs styrs av vilken typ av smärta utredningen visat — nervsmärta och muskelsmärta svarar på olika saker.',
      'TENS kan i vissa fall lämnas över till dig att använda hemma efter genomgång, vilket ger dig ett verktyg mellan besöken.',
    ],
    notSuitable: [
      'Metoderna väljs efter smärttyp. Fel metod på fel smärta ger sällan effekt, vilket är en av anledningarna till att vi utreder först.',
      'Vi bedömer lämpligheten individuellt vid besöket.',
    ],
    goodToKnow: [
      'Vilken metod som är aktuell beror på typ av smärta',
      'Qutenza och botulinumtoxin har effekt i ungefär tre månader',
      'TENS kan i vissa fall användas av dig själv hemma efter genomgång',
      'Ingår i avtalet med Region Skåne',
    ],
    inAgreement: true,
    cost: 'Patientavgift 200 kr per besök. Frikort gäller.',
    faqs: [
      {
        q: 'Kan jag få en TENS-apparat att använda hemma?',
        a: 'TENS kan i vissa fall användas av dig själv hemma efter genomgång hos oss. Om det är aktuellt beror på dina besvär.',
      },
      {
        q: 'Hur länge håller effekten av botulinumtoxin?',
        a: 'Ungefär tre månader. Därefter kan behandlingen upprepas om den gett önskad effekt.',
      },
    ],
    relatedConditions: ['nervsmarta', 'migran', 'huvudvark', 'muskelsmarta-triggerpunkter'],
    regenerative: false,
  },

  {
    slug: 'fysioterapi',
    name: 'Fysioterapi, träning och rehabilitering',
    shortName: 'Fysioterapi',
    heading: 'Fysioterapi, träning och rehabilitering',
    metaTitle: 'Fysioterapi i Kristianstad — träning och rehabilitering',
    metaDescription:
      'Fysioterapi i Kristianstad — stabilitetsträning vid ryggsmärta och ledbesvär, triggerpunktsakupunktur och videoinspelade övningar till mobilen.',
    teaser:
      'Stabilitetsträning, rörelseanalys och triggerpunktsbehandling — med övningarna inspelade på video till din mobil.',
    intro:
      'Vi bedriver en bred verksamhet med fokus på smärttillstånd, som innefattar såväl träning som behandling. Fysioterapin på Apport arbetar nära läkaren, så att diagnostiken och träningen hänger ihop.',
    whenRelevant: [
      'Du har ryggsmärta eller ledbesvär där stabilitetsträning kan vara aktuell',
      'Du vill kunna träna igen men vet inte vad som är säkert att göra',
      'Du har fått behandling och behöver bygga upp funktionen efteråt',
      'Du har muskelrelaterad smärta som återkommer på grund av belastning',
    ],
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
    apportApproach: [
      'Fysioterapeuten samarbetar med läkaren kring diagnostiken, så att bedömning och träning hänger ihop i stället för att bli två separata spår.',
      'Helene har arbetat med långvarig smärta sedan 1993 och med multimodal rehabilitering sedan 1996.',
      'Träningen anpassas efter vad utredningen visat — det som är rätt vid ett tillstånd kan vara olämpligt vid ett annat.',
    ],
    notSuitable: [
      'Vid vissa tillstånd behöver utredning eller behandling komma före träning. Vi tar ställning till ordningen vid besöket.',
      'Vi tar inte emot generell värk, trötthetssyndrom eller hypermobilitet.',
    ],
    goodToKnow: [
      'Ingår i avtalet med Region Skåne',
      'Egenremiss skickas till patient@apport.rehab',
      'Övningarna spelas in på video och skickas till din mobil',
      'Läkare finns som resurs i bedömningen',
    ],
    inAgreement: true,
    cost: 'Patientavgift 200 kr per besök. Frikort gäller.',
    faqs: [
      {
        q: 'Hur fungerar träningsvideorna?',
        a: 'Vi har byggt upp ett bibliotek med videoinspelade övningar med tydliga instruktioner. Efter genomgången med fysioterapeut får du dem i din mobiltelefon, så att du kan se exakt hur en övning ska utföras även flera veckor senare.',
      },
      {
        q: 'Kan jag komma direkt till fysioterapeuten?',
        a: 'Ja. Du skriver en egenremiss och mejlar den till patient@apport.rehab. Läkaren finns som resurs i bedömningen om det behövs.',
      },
    ],
    relatedConditions: ['ryggsmarta', 'artros', 'muskelsmarta-triggerpunkter', 'axelsmarta', 'backensmarta-si-led'],
    regenerative: false,
  },
];

/**
 * URL-alias → kanonisk slug. Renderas som 301-redirects i netlify.toml.
 * "prf" och "prp-behandling" är söktermer, men "pulsad-radiofrekvens" är
 * den slug som faktiskt beskriver behandlingen och därför den kanoniska.
 */
export const TREATMENT_ALIASES: Record<string, string> = {
  prf: 'pulsad-radiofrekvens',
  'pulsad-rf': 'pulsad-radiofrekvens',
  'prp-behandling': 'prp',
  smartlakare: 'smartspecialist',
  'smartspecialist-kristianstad': 'smartspecialist',
  triggerpunktsakupunktur: 'akupunktur',
  traning: 'fysioterapi',
  rehabilitering: 'fysioterapi',
};
