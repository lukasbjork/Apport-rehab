# Apport Rehab — webbplats

Ny webbplats för **Apport AB**, smärtspecialistklinik i Kristianstad.
Astro 7 + Tailwind v4, statiskt genererad.

**Live: https://apport-rehab.netlify.app**
(Netlify, team Vasa Digital — admin: https://app.netlify.com/projects/apport-rehab)

```bash
npm install
npm run dev        # utvecklingsserver
npm run build      # bygger till dist/
npm run bilder     # beskär/optimerar bilder i public/bilder → webp
npm run og         # genererar public/og/og-default.png
node scripts/verify.mjs   # kontrollerar dist/ (länkar, SEO, alt, platshållare)

npx netlify-cli deploy --prod --dir=dist   # manuell deploy
```

### Deploy

Deployas manuellt med Netlify CLI (kommandot ovan). Repot är **inte** kopplat
till automatisk deploy vid push — kör `npm run build`, `node scripts/verify.mjs`
och därefter deploy-kommandot.

`netlify.toml` sätter säkerhetsheaders, cache på `/bilder/*` och `/_astro/*`
samt 404-hanteringen. `vercel.json` ligger kvar och är korrekt konfigurerad
ifall sajten senare ska flyttas till Vercel i stället.

> **Slå inte på Netlifys "Pretty URLs"-optimering.** Den strippar avslutande
> snedstreck, vilket bryter varje canonical på sajten (Astro är konfigurerad
> med `trailingSlash: 'always'`).

---

## ⚠️ Måste göras innan lansering

### 0. Medicinsk granskning (viktigast)

Sajten innehåller nu betydligt mer medicinsk text än i version 1. Följande
fält är **allmän patientinformation som inte står ordagrant i klinikens
befintliga material** och måste läsas igenom och godkännas av Rolf:

| Var | Fält | Vad det är |
|---|---|---|
| `src/lib/besvar-data.ts` | `symptoms` | "Vanliga symtom" på varje besvärssida — 10 sidor |
| `src/lib/besvar-data.ts` | `causes` | "Möjliga orsaker" på varje besvärssida — 10 sidor |
| `src/lib/behandlingar-data.ts` | `notSuitable` | "När är det inte lämpligt?" — 8 sidor |

Texterna är medvetet försiktigt formulerade ("kan", "för vissa patienter",
"vi bedömer") och innehåller inga löften om bot eller resultat. Men de behöver
ändå en läkares ögon innan de publiceras.

**Särskilt om `notSuitable`:** fältet innehåller MEDVETET inga specifika
medicinska kontraindikationer för PRP, proloterapi eller pRF. Klinikens
befintliga material listar inga, och att hitta på dem vore direkt farligt.
Fältet beskriver i stället klinikens arbetssätt och de avgränsningar som
faktiskt står i källan. **Rolf behöver komplettera med de verkliga
kontraindikationerna.**

Allt annat medicinskt innehåll är spårbart till apport.rehab, 1177 eller
allabolag.

### 1. Verifiera dessa uppgifter med kliniken

Allt nedan är hämtat från nuvarande apport.rehab, 1177 eller allabolag —
men källorna motsäger varandra på tre punkter.

| Vad | Vad vi använder | Problemet |
|---|---|---|
| **Besöksadress** | Östra Storgatan 25 | allabolag anger **Östra Storgatan 30** som registrerad adress. Sajten och 1177 säger 25. Vilken är besöksadressen? |
| **SMS-nummer till Rolf** | *utelämnat* | Nuvarande sajt anger **0708-157882** på /kontakt/ men **0708-158278** på /apport-smarta/. Bekräfta rätt nummer, lägg sedan in i `DIRECT_CONTACTS` i `src/lib/site.ts`. |
| **Nummer för dataskyddsfrågor** | *utelämnat* | GDPR-sidan anger **044-590 99 94**, vilket skiljer sig från växeln 044-10 60 00. Bekräfta. |

Fysioterapins egenremiss gick tidigare till `kristin@apport.rehab`. Vi använder
`patient@apport.rehab` genomgående för att hålla kontaktvägarna enhetliga —
**bekräfta att det är rätt**, eller lägg tillbaka Kristins adress.

### 2. Foton

Sajten är byggd **utan stockbilder**. Kliniken har egna bilder som används skarpt,
och tre platser väntar på riktiga foton:

| Var | Vad som behövs | Format |
|---|---|---|
| `/om-apport/` + startsidan | Porträtt av **Rolf Jönsson** | Stående, ca 4:5 |
| `/om-apport/` + startsidan | Porträtt av **Helene Svärdström Jönsson** | Stående, ca 4:5 |
| `/om-apport/` | Miljöbild från kliniken eller husets fasad | Liggande, ca 4:3 |

Platshållarna är designade att se avsiktliga ut — ingen "bild saknas"-text syns
för besökaren. Sök efter `BildPlatshallare` i `src/` för att hitta dem, eller
`data-foto-saknas` i den byggda HTML:en.

**Så byter du in ett foto:** lägg originalet i `bilder-original/`, kör
`npm run bilder` (skriver optimerad webp till `public/bilder/`), och ersätt
`<BildPlatshallare ... />` med en `<img>` som pekar på `.webp`-filen.

> `bilder-original/` innehåller källbilderna och är versionshanterad, men
> **skeppas inte** — bara `public/bilder/*.webp` deployas. Det halverar
> deploystorleken (4,6 → 2,1 MB).
>
> Ultraljudsbilderna beskärs automatiskt så att maskinens meny, knappar och
> **studie-ID** faller bort — studie-ID hör inte hemma på en publik sajt.

### 3. Kontaktformuläret — SÄTT UPP E-POSTAVISERING

Formuläret på `/kontakt/` är **aktivt och testat**. Det körs på Netlify Forms,
inte Formspree — sajten hostas redan på Netlify, så inlämningarna går inte
via någon extra leverantör.

> ⚠️ **Inlämningar hamnar bara i Netlifys dashboard tills någon lägger till en
> e-postavisering.** Skickar en patient in formuläret i morgon ligger det
> osett tills någon loggar in och tittar. Det här är det enda som återstår
> för att formuläret ska vara helt klart.
>
> Så gör du: Netlify → Forms → *kontakt* → Settings → **Form notifications**
> → Add notification → Email notification → ange klinikens adress.
> Den är medvetet inte satt av oss, eftersom det hade börjat skicka mejl till
> kliniken innan de sett sajten.

Verifierat 2026-08-31: en testinlämning gick igenom hela kedjan (POST →
registrerad → synlig i dashboarden), honeypot-fältet kastade ett botförsök
tyst, och testdatan raderades efteråt.

**Två inställningar som måste vara rätt** (båda är satta):

| Inställning | Värde | Varför |
|---|---|---|
| `ignore_html_forms` | `false` | Netlify sätter `true` på nya sajter, och då registreras formulär **tyst inte alls**. Det var därför formuläret inte fungerade vid första deployen. |
| `data-netlify="true"` + dolt `form-name`-fält | finns i markupen | Utan dem kopplas inlämningen inte till rätt formulär. `npm run verify` kontrollerar att båda finns kvar. |

Fälten heter `namn`, `telefon`, `epost`, `arende`, `meddelande`, `samtycke`
plus honeypot-fältet `lamna-tom`. Formuläret ber aldrig om personnummer och
hänvisar egenremisser till mejl, eftersom ett webbformulär inte är rätt kanal
för hälsouppgifter.

Kvittenssidan ligger på `/tack/` och är `noindex`.

### 4. Patientreferenser

`src/components/Referenser.astro` är byggd men **listan är tom**, och komponenten
renderar ingenting så länge den är tom.

> Det är avsiktligt. Nuvarande apport.rehab har en referenssektion som ligger
> live med lorem ipsum och påhittade namn ("Tobias – CEO", "Jimmy", "Alice",
> "Adam"). Konstruktionen här gör att det inte kan upprepas.

Läs instruktionerna överst i filen innan du lägger in riktiga omdömen — kort
sagt: skriftligt samtycke, patientens egna ord, inga resultatlöften.

### 5. Växla domän

Sajten ligger på `apport-rehab.netlify.app`. När domänen ska pekas om från
nuvarande WordPress:

1. `astro.config.mjs` → `site: 'https://www.apport.rehab'`
2. `src/lib/site.ts` → `SITE.url: 'https://www.apport.rehab'`
3. `public/robots.txt` → uppdatera `Sitemap:`-raden
4. Lägg till domänen i Netlify (Domain management), peka DNS dit
5. Bygg om, deploya, skicka in ny sitemap i Search Console
6. Lägg 301-redirects från de gamla URL:erna (se tabellen nedan) i `netlify.toml`

> Alla tre värdena i steg 1–3 måste ändras tillsammans. Missas ett pekar
> canonical-taggarna på fel domän.

**301-redirects från gamla sajten**

| Gammal URL | Ny URL |
|---|---|
| `/om-oss/` | `/om-apport/` |
| `/kliniken/` | `/om-apport/` |
| `/utredning/` | `/behandlingar/utredning/` |
| `/behandling/` | `/behandlingar/` |
| `/diagnos/` | `/besvar/` |
| `/sjalvlakning/` | `/regenerativ-medicin/` |
| `/apport-smarta/` | `/sa-gar-det-till/` |
| `/apport-fysioterapi/` | `/behandlingar/fysioterapi/` |
| `/traningsvideo/` | `/behandlingar/fysioterapi/` |
| `/galleri/` | `/besvar/` |
| `/om-du-inte-ar-nojd/` | `/synpunkter/` |
| `/leder/` | `/integritetspolicy/` |
| `/kontakt/` | `/kontakt/` (oförändrad) |

---

## Innehållsmodell

All text och alla uppgifter ligger separerade från layouten:

| Fil | Innehåller |
|---|---|
| `src/lib/site.ts` | Kontaktuppgifter, adress, öppettider, avgifter, navigation, CTA |
| `src/lib/content.ts` | Team, besvär, behandlingar, processteg, FAQ, "vad vi inte tar emot" |
| `src/lib/schema.ts` | JSON-LD-byggare (MedicalClinic, Physician, FAQPage, brödsmulor m.m.) |

Lägg till ett nytt besvär eller en ny behandling genom att lägga till ett objekt
i `CONDITIONS` respektive `TREATMENTS` — sidan, korten, sitemap och interna
länkar genereras automatiskt.

### Regel för medicinsk text

Varje medicinskt påstående ska gå att spåra till nuvarande apport.rehab, 1177
eller allabolag. Inget hittas på. Formuleringar hålls försiktiga — "kan",
"för vissa patienter", "vi bedömer" — och sajten lovar aldrig bot eller resultat.

---

## Sidkarta

```
/                              Startsida
/besvar/                       Hubb — Kotpelaren / Leder / Muskler / Nerver
  ryggsmarta, nacksmarta, whiplash, backensmarta-si-led, artros,
  axelsmarta, muskelsmarta-triggerpunkter, nervsmarta, huvudvark, migran
/behandlingar/                 Hubb — "ingår i avtalet" / "utanför avtalet"
  utredning, smartspecialist, akupunktur, proloterapi, prp,
  pulsad-radiofrekvens, medicinsk-smartbehandling, fysioterapi
/regenerativ-medicin/          Pelarsida
/egenremiss/                   Konverteringssida — primär CTA pekar hit
/om-apport/                    Klinik, arbetssätt, teamet (#rolf-jonsson, #helene-...)
/som-patient/                  Första besöket, avgifter, återbud, FAQ
/kontakt/                      Uppgifter, formulär, karta
/synpunkter/                   Patientnämnden, IVO, journal
/integritetspolicy/            GDPR
/404
```

**29 sidor, 28 indexerbara.** Varje besvärs- och behandlingssida har egen FAQ
som också driver FAQPage-schema.

### Varför muskelsmärta och triggerpunkter delar sida

Källmaterialet säger: *"Den vanligaste orsaken till muskelsmärta är ensidig
belastning som orsakar triggerpunkter."* De är orsak och verkan av samma sak.
Två separata sidor hade blivit nära-dubbletter som konkurrerar med varandra i
sökresultatet. I stället är `/besvar/muskelsmarta/` och `/besvar/triggerpunkter/`
301-alias till den sammanhållna sidan — söktermen fångas, utan tunt innehåll.

Samma princip för `/behandlingar/prf/` → `pulsad-radiofrekvens` (ingen söker på
"prf" ensamt) och sju andra alias.

### Omdirigeringar

`public/_redirects` **genereras** av `scripts/generate-redirects.mjs` (körs
automatiskt via `prebuild`). Källan är alias-tabellerna `CONDITION_ALIASES` och
`TREATMENT_ALIASES` i innehållsmodellen plus listan över gamla WordPress-URL:er.
Redigera aldrig `_redirects` för hand — den skrivs över vid nästa bygge.

32 omdirigeringar totalt: 12 från gamla WordPress-sajten, 2 interna
sökvägsändringar och 18 söktermsalias.

## Design

Konceptet heter **"Precisionen"** och bygger på klinikens faktiska särdrag:
de tittar in i vävnaden med ultraljud innan de behandlar, och de säger nej
till det de inte kan hjälpa.

- **Färg** — kalkvit `#f5f2ec`, mossgrön `#34433a`, djup `#202b24`, tegel `#a8593a` som sparsam accent
- **Typsnitt** — Literata (rubriker) + Hanken Grotesk (brödtext), båda självhostade
- **Signaturelement** — "Siktet", ett hårfint hårkors med cirkel, hämtat från ultraljudsledd nålplacering
- **Kontrast** — samtliga 17 färgpar mätta mot WCAG 2.2 AA. `--color-salvia` är
  ljus och får **bara** användas mot mörk botten; använd `--color-salvia-text`
  mot kalk/papper.

## Verifiering

`node scripts/verify.mjs` körs mot `dist/` och kontrollerar:

- Interna länkar pekar på sidor som finns
- Refererade bilder finns på disk
- Ingen platshållartext har läckt till produktion
- Varje sida har title, meta description, canonical och exakt en `h1`
- Alla `<img>` har `alt`
- Titel-/description-längder (varning över 65 / 165 tecken)
- Ihopklistrade ord (Astros whitespace-fälla vid inline-element)

Kör den efter varje `npm run build` innan deploy.
