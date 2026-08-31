/**
 * Besvär/diagnoser — fullständiga landningssidor.
 *
 * ⚠️ MEDICINSK GRANSKNING
 * Fälten `symptoms` och `causes` innehåller allmän patientinformation som
 * INTE står ordagrant i klinikens befintliga material. De är formulerade
 * försiktigt och allmänt, men ska granskas och godkännas av Rolf innan
 * lansering. Se README → "Medicinsk granskning".
 *
 * Fälten `investigation`, `treatment` och `rehab` är däremot grundade i
 * apport.rehab (/utredning/, /behandling/, /diagnos/, /sjalvlakning/,
 * /apport-fysioterapi/) och 1177:s vårdgivarkort.
 *
 * REGEL: inga löften om bot eller resultat. Använd "kan", "kan vara aktuellt",
 * "vi bedömer", "för vissa patienter", "beroende på besvär och förutsättningar".
 */
import type { Faq } from './content';

export interface Condition {
  slug: string;
  /** Kort namn för kort och navigation */
  name: string;
  /** H1 */
  heading: string;
  /** <title>, håll under 60 tecken inkl. " | Apport" */
  metaTitle: string;
  metaDescription: string;
  /** Kort text på kortet i grid */
  teaser: string;
  /** Ingress överst på sidan */
  intro: string;
  /** "Känner du igen dig?" — patientens egna ord */
  recognise: string[];
  /** "Vanliga symtom" — ⚠️ kräver medicinsk granskning */
  symptoms: string[];
  /** "Möjliga orsaker" — ⚠️ kräver medicinsk granskning */
  causes: { title: string; body: string }[];
  /** "Hur vi utreder" — grundat i /utredning/ */
  investigation: string[];
  /** "Behandling" — grundat i /behandling/ */
  treatment: string[];
  /** "Träning och rehabilitering" — grundat i /apport-fysioterapi/ */
  rehab: string[];
  /** "När bör du söka hjälp?" */
  seekCare: string[];
  /** Sidspecifik FAQ — driver även FAQPage-schema */
  faqs: Faq[];
  /** Slugs ur TREATMENTS */
  relatedTreatments: string[];
  group: 'Kotpelaren' | 'Leder' | 'Muskler' | 'Nerver';
  /** Valfri bild ur public/bilder/ */
  image?: { src: string; alt: string; caption: string };
}

/** Gemensam brasklapp som ligger sist i behandlingsavsnittet på varje sida. */
export const BEHANDLING_FORBEHALL =
  'Vilken behandling som blir aktuell — och om någon av dem alls är det — avgörs av vad utredningen visar. Effekten varierar mellan patienter och beror på besvär, vävnad och förutsättningar.';

export const CONDITIONS: Condition[] = [
  {
    slug: 'ryggsmarta',
    name: 'Ryggsmärta och ländryggssmärta',
    heading: 'Ont i ryggen som inte ger med sig',
    metaTitle: 'Ryggsmärta i Kristianstad — utredning och behandling',
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
    symptoms: [
      'Värk eller stelhet i ländryggen, ofta värst på morgonen eller efter stillasittande',
      'Smärta som ökar vid böjning, lyft eller vridning',
      'Utstrålning mot skinka, ljumske eller baksida lår',
      'Svårt att hitta en bekväm ställning, även i vila',
      'Muskelspänning och ömma punkter längs ryggraden',
    ],
    causes: [
      {
        title: 'Facettlederna',
        body: 'De små lederna mellan kotorna kan ge lokal smärta som ofta ökar vid bakåtböjning och vridning. De går att pröva var för sig med en ultraljudsledd blockad.',
      },
      {
        title: 'Muskler och senfästen',
        body: 'Ensidig belastning kan ge triggerpunkter i ryggmuskulaturen, som i sin tur kan ge smärta även på andra ställen än där punkten sitter.',
      },
      {
        title: 'Bäckenleden',
        body: 'SI-leden ligger djupt och ger ofta smärta som upplevs som ryggont. Den är en vanlig anledning till att behandling riktad mot ländryggen inte ger effekt.',
      },
      {
        title: 'Nervpåverkan',
        body: 'Både spända muskler och förändringar kring nerverna kan ge smärta som strålar ut i benet. Karaktären på smärtan brukar då vara annorlunda — brännande eller stickande.',
      },
    ],
    investigation: [
      'Vi börjar med en smärtanalys: var smärtan sitter, hur den startade, hur den utvecklats och vad som redan är gjort.',
      'Därefter görs en funktionsundersökning av muskulatur, skelett, leder, stödjevävnad och nerver, kompletterad med ultraljudsundersökning.',
      'Vid behov används diagnostiska blockader. Med ultraljud kan vi bedöva en struktur i taget — till exempel en facettled — och utvärdera effekten på en skattningsskala. Det ger besked om just den strukturen bidrar till smärtan.',
      'Räkna med 3–5 besök innan det går att uttala sig om orsaken och ställa en diagnos.',
    ],
    treatment: [
      'När vi har en rimlig bild av var smärtan kommer ifrån tar vi ställning till vad som kan vara aktuellt.',
      'Vid smärta från muskler och senfästen kan triggerpunkts- eller periostakupunktur vara aktuell, ofta med ultraljud som vägledning.',
      'Vid smärta från senfästen och ligament kan proloterapi vara aktuell — en injektion som syftar till att starta kroppens egen läkningsprocess.',
      'Vid vissa långvariga tillstånd kan pulsad radiofrekvens vara aktuell. Den ingår inte i avtalet med Region Skåne.',
    ],
    rehab: [
      'Stabilitetsträning vid ryggsmärta är en av klinikens tyngdpunkter.',
      'Vi börjar med rörelseanalys och en genomgång av ergonomin — vad i din vardag som underhåller belastningen.',
      'Träningen anpassas efter vad du faktiskt tål, inte efter ett standardprogram.',
      'Övningarna spelas in på video och skickas till din mobil efter genomgången, så att du har dem med dig hemma.',
    ],
    seekCare: [
      'Smärtan har hållit i sig i mer än tre månader utan förklaring',
      'Du har utretts men inte fått besked om vad som orsakar smärtan',
      'Du vill kunna träna igen men vet inte vad som är säkert att göra',
    ],
    faqs: [
      {
        q: 'Behöver jag ha gjort röntgen eller magnetkamera först?',
        a: 'Nej. Vi gör en egen undersökning med ultraljud. Har du redan bilder tagna är de bra att ha med, men de är inget krav — och de säger sällan ensamma vilken struktur som gör ont.',
      },
      {
        q: 'Hur vet ni vilken struktur som orsakar min ryggsmärta?',
        a: 'Genom diagnostiska blockader. Vi bedövar en struktur i taget med ultraljud som vägledning och utvärderar effekten på en skattningsskala. Minskar smärtan tydligt talar det för att just den strukturen bidrar.',
      },
      {
        q: 'Kan jag träna trots att jag har ont i ryggen?',
        a: 'Ofta ja, men vad som är lämpligt beror på vad som orsakar smärtan. Det är en av anledningarna till att vi utreder först — träning som är rätt för ett tillstånd kan vara olämplig vid ett annat.',
      },
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'proloterapi', 'pulsad-radiofrekvens', 'fysioterapi'],
    group: 'Kotpelaren',
    image: {
      src: '/bilder/pulsad-rf-1.webp',
      alt: 'Två nålar placerade i ländryggen under behandling på Apport',
      caption:
        'Behandling i ländryggen på kliniken. Nålarnas läge kontrolleras med ultraljud innan behandlingen börjar.',
    },
  },

  {
    slug: 'nacksmarta',
    name: 'Nacksmärta',
    heading: 'Nacksmärta som blivit långvarig',
    metaTitle: 'Nacksmärta i Kristianstad — utredning och behandling',
    metaDescription:
      'Utredning och behandling av nacksmärta i Kristianstad. Ultraljudsledda blockader i halsryggen, triggerpunktsbehandling och rehabilitering.',
    teaser:
      'Halsrygg, facettleder och nackmuskulatur — smärta som ofta hänger ihop med huvudvärk och utstrålning mot axeln.',
    intro:
      'Nacken är liten, rörlig och full av strukturer som ligger tätt. Det gör den svår att utreda med bilddiagnostik allena. Vi har lång erfarenhet av smärttillstånd i nacken och använder ultraljud för att kunna bedöma en struktur i taget.',
    recognise: [
      'Du har haft ont i nacken i månader eller år',
      'Smärtan strålar upp mot bakhuvudet eller ut i axeln',
      'Du har stel nacke och begränsad vridning',
      'Du har fått höra att undersökningarna ser normala ut',
      'Huvudvärken verkar hänga ihop med nacken',
    ],
    symptoms: [
      'Värk och stelhet i nacke och skuldror',
      'Begränsad rörlighet, särskilt vid vridning åt ena hållet',
      'Huvudvärk som börjar i nacken och kryper uppåt',
      'Utstrålning mot axel, arm eller bakhuvud',
      'Ömma punkter i nack- och skuldermuskulaturen',
    ],
    causes: [
      {
        title: 'Facettlederna i halsryggen',
        body: 'De små lederna mellan halskotorna kan ge lokal nacksmärta och huvudvärk. De kan prövas var för sig med ultraljudsledd blockad.',
      },
      {
        title: 'Nackmuskulaturen',
        body: 'Ensidig belastning — arbete vid skärm, långvarigt stillasittande — kan ge triggerpunkter som ger smärta både lokalt och på annat håll.',
      },
      {
        title: 'Nervrötterna',
        body: 'Påverkan kring en nervrot i halsryggen kan ge utstrålning ner i armen med domningar eller stickningar. Rotblockad med ultraljud kan användas för att avgöra vilken nivå som är inblandad.',
      },
    ],
    investigation: [
      'Smärtanalys och funktionsundersökning av halsryggen, nackmuskulaturen och de nerver som passerar området.',
      'Ultraljudsundersökning av strukturerna i nacken.',
      'Vid behov diagnostiska blockader — facettledsblockad eller rotblockad i halsryggen — en struktur i taget.',
      'Effekten utvärderas på en skattningsskala före och efter.',
    ],
    treatment: [
      'Vid muskelrelaterad nacksmärta kan triggerpunkts- och periostakupunktur vara aktuell.',
      'Vid ledrelaterad smärta kan behandling riktad mot facettleden vara aktuell efter att en diagnostisk blockad visat att leden bidrar.',
      'Vid nervrelaterad smärta kan neuromodulering eller pulsad radiofrekvens vara aktuellt.',
      'Vid svåra triggerpunktssyndrom kan botulinumtoxin vara aktuellt. Effekten varar i ungefär tre månader.',
    ],
    rehab: [
      'Rörlighets- och stabilitetsträning för nacke och skuldergördel.',
      'Genomgång av arbetsställningar och ergonomi — nacken är särskilt känslig för hur du sitter under lång tid.',
      'Övningarna spelas in på video och skickas till din mobil.',
    ],
    seekCare: [
      'Nacksmärtan begränsar arbete, sömn eller bilkörning',
      'Du har domningar eller svaghet i armen',
      'Du vill ha en mer specialiserad bedömning än den du redan fått',
    ],
    faqs: [
      {
        q: 'Kan nacken orsaka min huvudvärk?',
        a: 'Det förekommer. En del huvudvärk hänger ihop med nacken, muskulaturen eller nervernas retbarhet. Vi bedömer vilken typ av huvudvärk det rör sig om innan vi tar ställning till behandling.',
      },
      {
        q: 'Är en blockad i nacken riskabel?',
        a: 'Blockaden läggs med lokalbedövning och med ultraljud som vägledning, vilket gör att nålens läge kan kontrolleras under hela momentet. Vi går igenom vad som ska hända, och vilka risker som finns, innan vi börjar.',
      },
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'pulsad-radiofrekvens', 'medicinsk-smartbehandling', 'fysioterapi'],
    group: 'Kotpelaren',
    image: {
      src: '/bilder/blockad-halsrygg.webp',
      alt: 'Anatomisk modell av halsryggen där en nål visar placeringen vid en blockad mellan kotorna',
      caption:
        'Demonstration på anatomisk modell: nålens väg in mot en facettled i halsryggen. På patient styrs placeringen med ultraljud.',
    },
  },

  {
    slug: 'whiplash',
    name: 'Besvär efter whiplash',
    heading: 'När besvären efter en whiplashskada inte gått över',
    metaTitle: 'Whiplash Kristianstad — utredning av kvarstående besvär',
    metaDescription:
      'Utredning och behandling av kvarstående besvär efter whiplashvåld i Kristianstad. Ultraljudsledda blockader i halsryggen. Avtal med Region Skåne.',
    teaser:
      'Besvär som blivit kvar långt efter olyckan. Vi har lång erfarenhet av smärttillstånd i nacke efter whiplashvåld.',
    intro:
      'De flesta blir bra efter ett whiplashvåld. En del gör det inte. Om besvären finns kvar månader eller år efteråt får man ofta höra att undersökningarna ser normala ut — vilket sällan hjälper när det fortfarande gör ont. Vi har lång erfarenhet och goda resultat avseende behandling av smärttillstånd i nacke, exempelvis efter whiplashvåld.',
    recognise: [
      'Du var med om en olycka och besvären finns kvar långt efteråt',
      'Röntgen och magnetkamera visade inget som förklarar smärtan',
      'Du har stel nacke, huvudvärk och trötthet som kommer och går',
      'Du har fått höra att det "bör läka ut" men det har inte gjort det',
      'Du vill veta om något faktiskt går att hitta',
    ],
    symptoms: [
      'Nacksmärta och stelhet som kvarstår efter olyckan',
      'Huvudvärk, ofta från nacken och uppåt',
      'Yrsel eller ostadighetskänsla',
      'Smärta som strålar mot skuldra och arm',
      'Ökad känslighet för belastning — besvären förvärras av arbete eller ansträngning',
    ],
    causes: [
      {
        title: 'Facettlederna',
        body: 'Vid ett whiplashvåld belastas de små lederna mellan halskotorna kraftigt. De kan bli en kvarstående smärtkälla utan att synas på bilddiagnostik. De går att pröva var för sig med blockad.',
      },
      {
        title: 'Ligament och senfästen',
        body: 'Stödjevävnad som blivit skadad läker ibland ofullständigt, bland annat för att blodförsörjningen där är begränsad.',
      },
      {
        title: 'Muskulaturen',
        body: 'Långvarig skyddsspänning kan ge triggerpunkter som underhåller smärtan även efter att den ursprungliga skadan läkt.',
      },
    ],
    investigation: [
      'Vi går igenom hela förloppet: hur olyckan gick till, hur besvären startade och hur de utvecklats sedan dess.',
      'Funktionsundersökning av halsrygg, nackmuskulatur och nerver, kompletterad med ultraljud.',
      'Diagnostiska blockader där vi bedövar en struktur i taget för att avgöra vilken som bidrar.',
      'Att bilddiagnostik varit normal utesluter inte att en struktur går att peka ut — det är just det blockaderna är till för.',
    ],
    treatment: [
      'Vad som blir aktuellt beror helt på vad utredningen visar.',
      'Vid ledrelaterad smärta kan behandling riktad mot facettleden vara aktuell.',
      'Vid skadad stödjevävnad kan proloterapi vara aktuell — en metod som syftar till att aktivera kroppens egen läkningsprocess.',
      'Vid muskelrelaterade besvär kan triggerpunkts- och periostakupunktur vara aktuell.',
    ],
    rehab: [
      'Rörlighets- och stabilitetsträning anpassad efter hur mycket nacken tål.',
      'Vid långvariga besvär börjar vi ofta försiktigt och ökar stegvis, eftersom för hög belastning tidigt kan förvärra.',
      'Övningarna spelas in på video så att du kan göra dem korrekt hemma.',
    ],
    seekCare: [
      'Besvären efter olyckan har inte gått över på egen hand',
      'Du har utretts utan att få besked om orsaken',
      'Besvären begränsar arbete, sömn eller vardag',
    ],
    faqs: [
      {
        q: 'Undersökningarna har varit normala. Är det någon idé att komma?',
        a: 'Det kan det vara. Bilddiagnostik visar hur kroppen ser ut, men säger sällan vilken struktur som gör ont. Diagnostiska blockader arbetar på ett annat sätt — vi bedövar en struktur i taget och ser vad som händer med smärtan.',
      },
      {
        q: 'Hur lång tid efter olyckan kan man komma?',
        a: 'Det finns ingen bortre gräns. Vi tar emot patienter med besvär som funnits kvar i flera år. Däremot blir utredningen ofta mer omfattande ju längre förloppet varit.',
      },
      {
        q: 'Kan ni skriva intyg till försäkringsbolaget?',
        a: 'Vi utfärdar inte sjukskrivningsintyg. Din journal hos oss dokumenterar utredning och behandling, och du har rätt att ta del av den.',
      },
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'proloterapi', 'pulsad-radiofrekvens', 'fysioterapi'],
    group: 'Kotpelaren',
    image: {
      src: '/bilder/rotblockad-halsrygg.webp',
      alt: 'Anatomisk modell av halsryggen där en nål visar vägen in mot en nervrot',
      caption:
        'Demonstration på anatomisk modell: hur en nål förs in mot en nervrot i halsryggen. På patient styrs placeringen med ultraljud, eftersom strukturerna ligger tätt.',
    },
  },

  {
    slug: 'backensmarta-si-led',
    name: 'Bäckensmärta och SI-led',
    heading: 'Smärta i bäckenet och SI-leden',
    metaTitle: 'Bäckensmärta och SI-led i Kristianstad — Apport',
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
    symptoms: [
      'Ensidig smärta lågt i ryggen, ofta väl avgränsad',
      'Smärta vid vändning i sängen, vid uppresning och vid ensidig belastning',
      'Utstrålning mot skinka, ljumske eller baksida lår',
      'Känsla av instabilitet i bäckenet',
    ],
    causes: [
      {
        title: 'Bäckenleden',
        body: 'Själva leden mellan korsbenet och tarmbenet kan bli en smärtkälla, bland annat efter graviditet, fall eller långvarig ensidig belastning.',
      },
      {
        title: 'Ligamenten runt leden',
        body: 'Stödjevävnaden kring bäckenleden kan vara smärtkällan även när leden i sig fungerar. Ligament och led kan testas var för sig.',
      },
      {
        title: 'Omgivande muskulatur',
        body: 'Muskler kring höft och bäcken kan ge smärta som upplevs som ledsmärta, ofta via triggerpunkter.',
      },
    ],
    investigation: [
      'Funktionsanalys av bäcken, ländrygg och höft för att skilja mellan närliggande orsaker.',
      'Bäckenledsblockad med ultraljud, där ligament, nerver och muskler kan testas var för sig.',
      'Utvärdering på skattningsskala före och efter blockaden.',
    ],
    treatment: [
      'Vid smärta från ligamenten kan proloterapi vara aktuell.',
      'Vid muskelrelaterade besvär kan triggerpunkts- och periostakupunktur vara aktuell.',
      'Ofta kombineras behandling med stabilitetsträning, eftersom bäckenet är beroende av muskulär stabilitet.',
    ],
    rehab: [
      'Stabilitetsträning riktad mot bäcken, höft och bål.',
      'Genomgång av belastning i vardagen — vad som provocerar och vad som avlastar.',
      'Övningarna spelas in på video och skickas till din mobil.',
    ],
    seekCare: [
      'Smärtan har suttit kvar långt efter graviditet eller skada',
      'Du har fått behandling riktad mot ryggen utan resultat',
      'Du vill veta om bäckenleden är inblandad innan du fortsätter med träning',
    ],
    faqs: [
      {
        q: 'Hur skiljer ni bäckensmärta från ryggsmärta?',
        a: 'Genom funktionstester och genom att bedöva strukturerna var för sig. Om smärtan minskar tydligt när bäckenleden bedövas talar det för att den bidrar — och då blir behandlingen en annan än vid ren ryggsmärta.',
      },
      {
        q: 'Jag fick besvären under graviditeten. Går det att göra något nu, flera år senare?',
        a: 'Det kan det. Vi utreder på samma sätt oavsett hur länge besvären funnits. Hur mycket som går att påverka beror på besvär och förutsättningar.',
      },
    ],
    relatedTreatments: ['utredning', 'proloterapi', 'akupunktur', 'fysioterapi'],
    group: 'Kotpelaren',
    image: {
      src: '/bilder/blockad-backenled.webp',
      alt: 'Anatomisk modell av bäcken och ländrygg där en spruta visar nålens riktning vid en bäckenledsblockad',
      caption:
        'Demonstration på anatomisk modell: nålens riktning vid en bäckenledsblockad. På patient styrs placeringen med ultraljud.',
    },
  },

  {
    slug: 'artros',
    name: 'Artros',
    heading: 'Artros i knä, höft, fingrar och rygg',
    metaTitle: 'Artros i Kristianstad — behandling och rehabilitering',
    metaDescription:
      'Behandling av artros i Kristianstad — knä, höft, fingrar, rygg och stortå. Ultraljudsledda ledinjektioner, träning och rehabilitering.',
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
    symptoms: [
      'Belastningssmärta som lindras av vila',
      'Morgonstelhet som släpper efter en stund i rörelse',
      'Nedsatt rörlighet i leden',
      'Svullnad eller värmeökning i perioder',
      'Knäppningar eller krepitationer vid rörelse',
    ],
    causes: [
      {
        title: 'Obalans i broskomsättningen',
        body: 'Artros uppstår när nedbrytningen av ledbrosk går snabbare än uppbyggnaden. Det är en process över tid, inte en enskild skada.',
      },
      {
        title: 'Tidigare ledskada',
        body: 'Artros kan komma tidigare än vanligt om leden varit utsatt för en skada, exempelvis inom idrott.',
      },
      {
        title: 'Belastningsmönster',
        body: 'Hur leden belastas i vardagen påverkar besvären. Det är en av anledningarna till att anpassad träning är en central del av behandlingen.',
      },
    ],
    investigation: [
      'Bedömning av leden och den omgivande muskulaturen.',
      'Ultraljudsundersökning där det tillför något — exempelvis för att bedöma senor och senfästen kring leden.',
      'Vi tar också ställning till om smärtan verkligen kommer från leden. Smärta kring en led kommer inte sällan från muskler och senfästen i närheten.',
    ],
    treatment: [
      'Ledinjektioner med ultraljud kan vara aktuella för axel, höft, knä, fot, handled och tumled.',
      'Vid smärta från senfästen kring leden kan proloterapi vara aktuell.',
      'PRP kan vara aktuellt för vissa patienter. Det ingår inte i avtalet med Region Skåne och kostar 2 000–2 500 kr per behandling.',
      'Anpassad träning är en central del oavsett vilken behandling som ges.',
    ],
    rehab: [
      'Målet är att belasta leden på ett sätt som kroppen tål och som förbättrar funktionen.',
      'Träningen anpassas efter din led, din smärta och vad du vill kunna göra.',
      'Behandling och träning kombineras som samordnade insatser utifrån dina behov och mål.',
      'Övningarna spelas in på video och skickas till din mobil.',
    ],
    seekCare: [
      'Smärtan begränsar det du vill kunna göra i vardagen',
      'Du är osäker på hur du ska träna med din artros',
      'Du vill veta vilka behandlingsalternativ som kan vara aktuella för dig',
    ],
    faqs: [
      {
        q: 'Kan artros botas?',
        a: 'Nej. Artros är en förändring i leden som inte går att göra ogjord. Det som går att påverka är smärta och funktion — hur mycket du kan göra och hur ont du har när du gör det.',
      },
      {
        q: 'Förvärras artrosen av att jag tränar?',
        a: 'Anpassad träning är en central del av behandlingen vid artros. Vad som är lämpligt beror på leden och på dina besvär — det är en av sakerna vi går igenom vid besöket.',
      },
      {
        q: 'Vad kostar en PRP-behandling?',
        a: 'PRP ingår inte i vårt avtal med Region Skåne och kostar 2 000–2 500 kr per behandling. Vi går alltid igenom kostnaden innan något bokas.',
      },
    ],
    relatedTreatments: ['utredning', 'proloterapi', 'prp', 'akupunktur', 'fysioterapi'],
    group: 'Leder',
  },

  {
    slug: 'axelsmarta',
    name: 'Axelsmärta',
    heading: 'Axelsmärta och besvär i skuldran',
    metaTitle: 'Axelsmärta i Kristianstad — utredning och behandling',
    metaDescription:
      'Utredning och behandling av axelsmärta i Kristianstad. Ultraljudsundersökning av senor och senfästen, ledinjektioner och rehabilitering.',
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
    symptoms: [
      'Smärta vid lyft över axelhöjd',
      'Nattlig smärta, särskilt när du ligger på den sida det gör ont',
      'Svårt att nå bakom ryggen',
      'Kraftnedsättning i armen vid vissa rörelser',
      'Smärta som strålar ner mot överarmen',
    ],
    causes: [
      {
        title: 'Senor och senfästen',
        body: 'Senorna kring axeln är en vanlig smärtkälla. De går att undersöka med ultraljud, vilket gör att vävnaden kan bedömas i rörelse.',
      },
      {
        title: 'Axelleden',
        body: 'Leden i sig kan vara inblandad, exempelvis vid artros. Ledinjektion med ultraljud kan användas både diagnostiskt och som behandling.',
      },
      {
        title: 'Nacken',
        body: 'Smärta som upplevs i axeln kommer ibland från halsryggen. Vi undersöker därför ofta nacke och axel tillsammans.',
      },
    ],
    investigation: [
      'Funktionsundersökning av axeln med tester för muskulatur, senor och ledrörlighet.',
      'Ultraljudsundersökning av senor och senfästen — här är ultraljud särskilt värdefullt eftersom strukturerna kan ses i rörelse.',
      'Bedömning av nacken, eftersom axelsmärta ibland har sitt ursprung där.',
    ],
    treatment: [
      'Ultraljudsledd injektion i led eller runt senfäste kan vara aktuell.',
      'Vid senfästesbesvär kan proloterapi vara aktuell.',
      'PRP kan vara aktuellt för vissa patienter, utanför avtalet med Region Skåne.',
      'Vid muskelrelaterade besvär kan triggerpunkts- och periostakupunktur vara aktuell.',
    ],
    rehab: [
      'Rehabilitering med anpassad träning är en central del vid axelbesvär.',
      'Vår fysioterapeut har särskild axelutbildning.',
      'Träningen byggs upp stegvis — axeln reagerar ofta illa på för snabb progression.',
      'Övningarna spelas in på video och skickas till din mobil.',
    ],
    seekCare: [
      'Smärtan stör sömnen',
      'Du har haft besvär i mer än några månader utan förbättring',
      'Du vill veta vilken struktur i axeln som är inblandad',
    ],
    faqs: [
      {
        q: 'Varför gör det mest ont på natten?',
        a: 'Nattlig smärta är vanligt vid axelbesvär, bland annat för att leden och senorna belastas annorlunda när du ligger. Det är ett av de symtom vi frågar om, eftersom det säger något om var problemet kan sitta.',
      },
      {
        q: 'Behöver jag magnetkamera?',
        a: 'Inte nödvändigtvis. Ultraljud har fördelen att vävnaden kan bedömas i rörelse, vilket är särskilt användbart i axeln. Vi tar ställning till om ytterligare bilddiagnostik behövs.',
      },
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
    symptoms: [
      'Väl avgränsade ömma punkter i muskulaturen',
      'Refererad smärta — det gör ont på ett annat ställe än där punkten sitter',
      'Spänningskänsla och nedsatt rörlighet',
      'Besvär som varierar med belastning och arbetsställning',
      'Kortvarig lindring av massage eller värme, men återkommande besvär',
    ],
    causes: [
      {
        title: 'Ensidig belastning',
        body: 'Den vanligaste orsaken. Samma rörelse eller ställning under lång tid — arbete vid skärm, repetitiva arbetsmoment, långvarigt stillasittande.',
      },
      {
        title: 'Kompensation',
        body: 'När en del av kroppen gör ont belastas andra delar annorlunda. Triggerpunkter uppstår ofta i muskler som tagit över arbete.',
      },
      {
        title: 'Kvarstående spänning efter skada',
        body: 'Skyddsspänning som blivit kvar efter att den ursprungliga skadan läkt kan underhålla smärtan.',
      },
    ],
    investigation: [
      'Rörelseanalys och genomgång av ergonomi — vad i vardagen som underhåller belastningen.',
      'Undersökning av muskulaturen med palpation för att lokalisera triggerpunkterna.',
      'Vi tar också ställning till om smärtan har en annan källa. En muskel kan göra ont för att den kompenserar för ett problem någon annanstans.',
    ],
    treatment: [
      'Triggerpunktsakupunktur riktad mot de ömma punkterna i muskulaturen.',
      'Periostakupunktur riktad mot benhinnan vid muskel- och senfästen.',
      'Vid svåra triggerpunktssyndrom kan botulinumtoxin vara aktuellt. Effekten varar i ungefär tre månader.',
      'TENS kan i vissa fall användas av dig själv hemma efter genomgång.',
    ],
    rehab: [
      'Anpassad träning som gör att muskulaturen tål belastningen bättre över tid.',
      'Ergonomiska förändringar — behandlingen håller sällan om belastningen som orsakade problemet är kvar.',
      'Övningarna spelas in på video och skickas till din mobil efter genomgången.',
    ],
    seekCare: [
      'Besvären återkommer så fort du slutar med behandling',
      'Du vill förstå vad i belastningen som driver smärtan',
      'Du vill ha en plan som håller även efter avslutad behandling',
    ],
    faqs: [
      {
        q: 'Vad är skillnaden mellan muskelsmärta och triggerpunkter?',
        a: 'De hänger ihop. Triggerpunkter är ömma punkter i muskeln och den vanligaste orsaken till långvarig muskelsmärta. En triggerpunkt kan ge smärta även på ett annat ställe än där den sitter.',
      },
      {
        q: 'Varför kommer besvären tillbaka efter massage?',
        a: 'Massage kan lindra tillfälligt, men om den belastning som orsakade triggerpunkten är kvar återkommer besvären ofta. Därför lägger vi tid på rörelseanalys och ergonomi, inte bara på behandlingen.',
      },
      {
        q: 'Gör triggerpunktsakupunktur ont?',
        a: 'Behandlingen kan vara obehaglig när nålen når punkten, och en del känner ömhet dagen efter. Upplevelsen varierar från person till person. Vi går igenom vad som ska hända innan vi börjar.',
      },
    ],
    relatedTreatments: ['akupunktur', 'fysioterapi', 'medicinsk-smartbehandling', 'utredning'],
    group: 'Muskler',
  },

  {
    slug: 'nervsmarta',
    name: 'Nervsmärta',
    heading: 'Nervsmärta och nervinklämning',
    metaTitle: 'Nervsmärta i Kristianstad — utredning och behandling',
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
    symptoms: [
      'Brännande, stickande eller huggande smärta',
      'Domningar eller stickningar i ett avgränsat område',
      'Smärta som följer ett nervstråk ut i arm eller ben',
      'Överkänslighet för beröring i det drabbade området',
      'Smärta som är värst i vila eller nattetid',
    ],
    causes: [
      {
        title: 'Tryck mot en nervrot',
        body: 'Förändringar i ryggraden kan ge tryck mot en nervrot, vilket kan ge utstrålande smärta. Rotblockad med ultraljud kan användas för att avgöra vilken nivå som är inblandad.',
      },
      {
        title: 'Spänd muskulatur',
        body: 'Spända muskler kan orsaka nervinklämning. Då är behandlingen en annan än vid tryck från ryggraden.',
      },
      {
        title: 'Skada kring nerven',
        body: 'Nerven kan påverkas av skada eller ärrbildning i vävnaden runt omkring.',
      },
    ],
    investigation: [
      'Smärtanalys med särskild vikt vid hur smärtan beskrivs och var den strålar — karaktären säger mycket vid nervsmärta.',
      'Undersökning av nerver och den omgivande vävnaden, med ultraljud.',
      'Vid behov ultraljudsledd rotblockad för att avgöra vilken nervrot som är inblandad.',
    ],
    treatment: [
      'Qutenza — ett plåster med hög koncentration capsaicin som används vid nervsmärta. Effekten kan hålla i sig upp till tre månader.',
      'Neuromodulering med högre frekvenser riktade mot centrala nervsystemets egen smärtreglering.',
      'Pulsad radiofrekvens kan vara aktuellt vid vissa nervrelaterade tillstånd. Den ingår inte i avtalet med Region Skåne.',
      'Vid muskelorsakad nervinklämning kan behandling riktad mot muskulaturen vara mer relevant.',
    ],
    rehab: [
      'Vid nervsmärta anpassas träningen särskilt noga — för hög belastning kan förvärra.',
      'Fokus ligger ofta på rörlighet och avlastning innan styrka byggs upp.',
      'Övningarna spelas in på video och skickas till din mobil.',
    ],
    seekCare: [
      'Du har brännande eller stickande smärta som inte ger med sig',
      'Domningarna påverkar styrka eller känsel',
      'Vanlig smärtbehandling har inte hjälpt',
    ],
    faqs: [
      {
        q: 'Varför hjälper inte vanliga smärtstillande?',
        a: 'Nervsmärta uppstår på ett annat sätt än exempelvis muskelsmärta, och svarar därför på delvis andra behandlingar. Det är en av anledningarna till att det är viktigt att avgöra vilken typ av smärta det rör sig om.',
      },
      {
        q: 'Vad är Qutenza?',
        a: 'Ett plåster med hög koncentration capsaicin som används vid nervsmärta. Effekten kan hålla i sig upp till tre månader. Om det är aktuellt för dig avgörs av utredningen.',
      },
    ],
    relatedTreatments: ['utredning', 'pulsad-radiofrekvens', 'medicinsk-smartbehandling', 'akupunktur'],
    group: 'Nerver',
    image: {
      src: '/bilder/pulsad-rf-3.webp',
      alt: 'Nålar för nervriktad behandling placerade i ryggen under ett besök på Apport',
      caption:
        'Nervriktad behandling på kliniken. Nålarnas läge kontrolleras med ultraljud, eftersom strukturerna ligger tätt.',
    },
  },

  {
    slug: 'huvudvark',
    name: 'Huvudvärk',
    heading: 'Huvudvärk som hänger ihop med nacken',
    metaTitle: 'Huvudvärk i Kristianstad — utredning och behandling',
    metaDescription:
      'Bedömning och behandling av huvudvärk i Kristianstad. Nackrelaterad huvudvärk, triggerpunkter och riktad behandling. Avtal med Region Skåne.',
    teaser:
      'Huvudvärk har många orsaker — en del av dem sitter inte i huvudet utan i nacken och muskulaturen.',
    intro:
      'Huvudvärk har många orsaker. En del av dem sitter inte i huvudet utan i nacken, i muskulaturen eller i nervernas retbarhet. Vi bedömer vilken typ av huvudvärk det rör sig om innan vi tar ställning till behandling.',
    recognise: [
      'Huvudvärken börjar i nacken och kryper uppåt',
      'Du har ömma punkter i nacke och skuldra som ger huvudvärk',
      'Besvären förvärras av arbetsställning eller stillasittande',
      'Du har provat läkemedel utan tillräcklig effekt',
    ],
    symptoms: [
      'Värk som börjar i nacken eller bakhuvudet',
      'Ensidig eller dubbelsidig huvudvärk med spänningskaraktär',
      'Ömhet i nack- och skuldermuskulatur',
      'Förvärring vid längre tids stillasittande eller skärmarbete',
      'Nedsatt nackrörlighet i kombination med huvudvärken',
    ],
    causes: [
      {
        title: 'Nacken',
        body: 'Facettlederna i halsryggen och nackmuskulaturen kan ge huvudvärk som upplevs sitta i huvudet. Detta är en av de vanligare orsakerna vi ser.',
      },
      {
        title: 'Triggerpunkter',
        body: 'Ömma punkter i nack- och skuldermuskulaturen kan ge refererad smärta upp mot huvudet.',
      },
      {
        title: 'Nervernas retbarhet',
        body: 'Ökad retbarhet i nervsystemet kan bidra till att huvudvärken blir återkommande.',
      },
    ],
    investigation: [
      'Bedömning av huvudvärkens karaktär, mönster och samband med nacke och muskulatur.',
      'Undersökning av nacke, nackmuskulatur och triggerpunkter.',
      'Vid misstanke om nackrelaterad huvudvärk kan diagnostisk blockad i halsryggen vara aktuell.',
    ],
    treatment: [
      'Vid nackrelaterad huvudvärk kan behandling riktad mot nacken vara mer relevant än läkemedel.',
      'Triggerpunkts- och periostakupunktur mot nack- och skuldermuskulatur.',
      'Vid svåra triggerpunktssyndrom kan botulinumtoxin vara aktuellt.',
    ],
    rehab: [
      'Rörlighets- och stabilitetsträning för nacke och skuldergördel.',
      'Genomgång av arbetsställningar — huvudvärk som hänger ihop med nacken påverkas ofta starkt av ergonomin.',
      'Övningarna spelas in på video och skickas till din mobil.',
    ],
    seekCare: [
      'Huvudvärken är återkommande och påverkar arbete eller sömn',
      'Du vill veta om nacken är inblandad',
      'Läkemedel har inte gett tillräcklig effekt',
    ],
    faqs: [
      {
        q: 'Hur vet jag om min huvudvärk kommer från nacken?',
        a: 'Vissa mönster talar för det — att värken börjar i nacken, förvärras av arbetsställning, och att det finns ömma punkter i nackmuskulaturen. Vi bedömer det vid besöket och kan vid behov använda en diagnostisk blockad.',
      },
      {
        q: 'Utreder ni all sorts huvudvärk?',
        a: 'Nej. Vi arbetar med huvudvärk som hänger ihop med nacke, muskulatur och nervernas retbarhet. Huvudvärk med andra orsaker hör hemma hos vårdcentral eller neurolog — vi säger till om vi tror det.',
      },
    ],
    relatedTreatments: ['utredning', 'akupunktur', 'medicinsk-smartbehandling', 'fysioterapi'],
    group: 'Nerver',
  },

  {
    slug: 'migran',
    name: 'Migrän',
    heading: 'Kronisk migrän',
    metaTitle: 'Migrän i Kristianstad — behandling med botulinumtoxin',
    metaDescription:
      'Behandling av kronisk migrän i Kristianstad. Botulinumtoxin kan vara aktuellt vid kronisk migrän. Bedömning av smärtspecialist.',
    teaser:
      'Vid kronisk migrän kan behandling med botulinumtoxin vara aktuell. Effekten varar i ungefär tre månader.',
    intro:
      'Migrän är inte samma sak som spänningshuvudvärk, och behandlas delvis annorlunda. Vid kronisk migrän — där anfallen är så täta att de präglar vardagen — kan behandling med botulinumtoxin vara aktuell. Om det är relevant för dig avgörs av en bedömning hos oss.',
    recognise: [
      'Du har migrän så ofta att den påverkar vardagen',
      'Anfallen kommer flera gånger i månaden',
      'Du har provat flera läkemedel utan tillräcklig effekt',
      'Du vill diskutera andra behandlingsalternativ',
    ],
    symptoms: [
      'Återkommande anfall av intensiv, ofta ensidig huvudvärk',
      'Illamående eller ljus- och ljudkänslighet under anfall',
      'Förvärring av fysisk aktivitet under anfallet',
      'Anfall som varar från några timmar till flera dygn',
      'Vid kronisk migrän: huvudvärk under merparten av månadens dagar',
    ],
    causes: [
      {
        title: 'Ökad retbarhet i nervsystemet',
        body: 'Migrän hänger ihop med hur nervsystemet reglerar smärta. Det är en del av förklaringen till att behandling som påverkar den regleringen kan vara aktuell.',
      },
      {
        title: 'Samverkan med nacke och muskulatur',
        body: 'Hos en del patienter finns ett samband mellan nacke, muskelspänning och migränanfall. Vi bedömer om det gäller dig.',
      },
    ],
    investigation: [
      'Genomgång av anfallens mönster, frekvens och karaktär.',
      'Bedömning av om nacke och muskulatur bidrar till besvären.',
      'Ställningstagande till om behandling med botulinumtoxin kan vara aktuell.',
    ],
    treatment: [
      'Vid kronisk migrän kan behandling med botulinumtoxin vara aktuell. Botulinumtoxin blockerar överföringen mellan nerv och muskel.',
      'Effekten varar i ungefär tre månader, varefter behandlingen kan upprepas.',
      'Om nacken bidrar till besvären kan behandling riktad mot nacken vara aktuell parallellt.',
    ],
    rehab: [
      'Vid samband mellan nacke och migrän kan rörlighets- och stabilitetsträning för nacke och skuldergördel vara aktuell.',
      'Genomgång av arbetsställningar och belastning i vardagen.',
    ],
    seekCare: [
      'Migränen är så frekvent att den präglar din vardag',
      'Förebyggande läkemedel har inte gett tillräcklig effekt',
      'Du vill diskutera om botulinumtoxin kan vara aktuellt för dig',
    ],
    faqs: [
      {
        q: 'Vem kan få behandling med botulinumtoxin mot migrän?',
        a: 'Det är aktuellt vid kronisk migrän, och förutsätter en bedömning hos oss. Vi tar ställning i varje enskilt fall — behandlingen är inte lämplig för alla med migrän.',
      },
      {
        q: 'Hur länge håller effekten?',
        a: 'Effekten varar i ungefär tre månader. Därefter kan behandlingen upprepas om den gett önskad effekt.',
      },
      {
        q: 'Ingår behandlingen i Region Skånes avtal?',
        a: 'Botulinumtoxin ges inom ramen för vår verksamhet med patientavgift 200 kr och frikort. PRP och pulsad radiofrekvens är de behandlingar som ligger utanför avtalet. Vi går alltid igenom vad som gäller innan behandling bokas.',
      },
    ],
    relatedTreatments: ['utredning', 'medicinsk-smartbehandling', 'akupunktur'],
    group: 'Nerver',
  },
];

/**
 * URL-alias → kanonisk slug. Renderas som 301-redirects i netlify.toml.
 *
 * Syftet är att fånga söktermer utan att skapa tunna dubblettsidor som
 * konkurrerar med varandra. Muskelsmärta och triggerpunkter är orsak och
 * verkan av samma sak — de hör hemma på en sida, inte två.
 */
export const CONDITION_ALIASES: Record<string, string> = {
  muskelsmarta: 'muskelsmarta-triggerpunkter',
  triggerpunkter: 'muskelsmarta-triggerpunkter',
  landryggssmarta: 'ryggsmarta',
  'ont-i-ryggen': 'ryggsmarta',
  'si-led': 'backensmarta-si-led',
  backensmarta: 'backensmarta-si-led',
  nackspark: 'whiplash',
  'huvudvark-migran': 'huvudvark',
  knaartros: 'artros',
  hoftartros: 'artros',
};
