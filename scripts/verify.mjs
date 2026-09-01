/**
 * Kontrollerar den byggda sajten i dist/ plus källkoden i src/.
 *
 * Testar:
 *  1. Astros whitespace-fälla i källkoden (se kollaKallkod nedan)
 *  2. Interna länkar pekar på sidor som faktiskt finns
 *  3. Refererade bilder finns på disk
 *  4. Ingen platshållartext har läckt till produktion
 *  5. Varje sida har title, meta description, canonical och exakt en h1
 *  6. Alla <img> har alt-attribut
 *  7. Netlify Forms-markup är intakt på kontaktsidan
 *
 * Kör: npm run verify
 */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const fel = [];
const varningar = [];

const finns = (p) => access(p).then(() => true).catch(() => false);

async function filerMedSuffix(dir, suffix) {
  const ut = [];
  for (const post of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, post.name);
    if (post.isDirectory()) ut.push(...(await filerMedSuffix(full, suffix)));
    else if (post.name.endsWith(suffix)) ut.push(full);
  }
  return ut;
}

/** dist-sökväg för en rot-relativ URL */
function urlTillFil(url) {
  const ren = url.split('#')[0].split('?')[0];
  if (ren.endsWith('.html')) return path.join(DIST, ren);
  return path.join(DIST, ren, 'index.html');
}

/**
 * Astros whitespace-fälla.
 *
 * En radbrytning direkt före ett inline-element eller {uttryck} äter
 * mellanslaget, så "Läs mer om" + <a> renderas som "Läs mer omhur".
 *
 * Buggen måste fångas i KÄLLKODEN. I den byggda texten går den inte att
 * upptäcka automatiskt när båda orden är gemena — "omhur" ser ut som vilket
 * ord som helst för en regex. Den har slunkit igenom två gånger i det här
 * projektet, båda gångerna upptäckt först på en skärmdump.
 */
async function kollaKallkod() {
  const slutarPaOrd = /[A-Za-zÅÄÖåäö0-9]\s*$/;
  const borjarPaInline = /^\s*(<(a|em|strong|code|span|abbr|b|i)\b|\{)/;

  for (const fil of await filerMedSuffix('src', '.astro')) {
    const rader = (await readFile(fil, 'utf8')).split('\n');
    for (let i = 0; i < rader.length - 1; i++) {
      const nuv = rader[i];
      const nasta = rader[i + 1];
      if (!slutarPaOrd.test(nuv)) continue;
      if (nuv.trimEnd().endsWith('>')) continue;
      if (!borjarPaInline.test(nasta)) continue;
      fel.push(
        `${fil}:${i + 1}: uppäten space — radbrytning före inline-element ` +
          `("...${nuv.trim().slice(-32)}" + "${nasta.trim().slice(0, 32)}...")`,
      );
    }
  }
}

const PLATSHALLARE = [
  /\[ÄNDRA/i,
  /\[VERIFIERA/i,
  /\[PLATSHÅLLARE/i,
  /lorem ipsum/i,
  /dolor sit amet/i,
  /\bTODO\b/,
  /XXXXXX-XXXX/,
  /DITT-FORMULAR-ID/,
  /Elementum ut sagittis/i,
];

await kollaKallkod();

const filer = await filerMedSuffix(DIST, '.html');
console.log(`Kontrollerar ${filer.length} sidor i ${DIST}/ och all .astro-källkod\n`);

for (const fil of filer) {
  const html = await readFile(fil, 'utf8');
  const sida = '/' + path.relative(DIST, fil).replace(/\\/g, '/');
  const utanKommentarer = html.replace(/<!--[\s\S]*?-->/g, ' ');

  // Interna länkar
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  for (const href of new Set(hrefs)) {
    if (href.startsWith('//')) continue;
    if (/\.(xml|txt|svg|png|jpe?g|webp|ico|css|js|json)$/i.test(href.split('?')[0])) {
      if (!(await finns(path.join(DIST, href.split('?')[0]))))
        fel.push(`${sida}: saknad fil ${href}`);
      continue;
    }
    if (!(await finns(urlTillFil(href)))) fel.push(`${sida}: trasig länk ${href}`);
  }

  // Bilder
  for (const src of new Set([...html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)].map((m) => m[1]))) {
    if (!(await finns(path.join(DIST, src)))) fel.push(`${sida}: saknad bild ${src}`);
  }

  // Platshållartext
  for (const m of PLATSHALLARE) {
    if (m.test(html)) fel.push(`${sida}: platshållartext matchar ${m}`);
  }

  // SEO-grunder
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fel.push(`${sida}: saknar title`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html))
    fel.push(`${sida}: saknar/kort meta description`);
  if (!/<link rel="canonical"/.test(html)) fel.push(`${sida}: saknar canonical`);

  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) fel.push(`${sida}: ${h1} st h1 (ska vara exakt 1)`);

  const titel = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (titel.length > 65) varningar.push(`${sida}: title ${titel.length} tecken (>65)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (desc.length > 165) varningar.push(`${sida}: description ${desc.length} tecken (>165)`);

  // alt på alla img
  for (const tagg of utanKommentarer.match(/<img[^>]*>/g) ?? []) {
    if (!/\salt=/.test(tagg)) fel.push(`${sida}: <img> utan alt — ${tagg.slice(0, 90)}`);
  }

  // Ihopklistrade ord: gemen följd av versal inuti ett ord
  const text = utanKommentarer
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  for (const m of text.matchAll(/\b[a-zåäö]{3,}[A-ZÅÄÖ][a-zåäö]{2,}\b/g)) {
    varningar.push(`${sida}: möjligt ihopklistrat ord "${m[0]}"`);
  }
}

// Netlify Forms — två saker som är lätta att råka ta bort, båda krävs
for (const [sida, formNamn] of [
  ['kontakt', 'kontakt'],
  ['egenremiss', 'egenremiss'],
]) {
  const html = await readFile(path.join(DIST, sida, 'index.html'), 'utf8');
  for (const [krav, m] of [
    ['data-netlify="true"', /data-netlify="true"/],
    ['dolt form-name-fält', new RegExp(`name="form-name" value="${formNamn}"`)],
  ]) {
    if (!m.test(html)) fel.push(`/${sida}/: Netlify Forms saknar ${krav}`);
  }

  // Honungsfällan är BORTTAGEN med flit och får inte läggas tillbaka.
  // Verifierat mot skarpa sajten 2026-09-01: så länge ett fält som pekas ut
  // av netlify-honeypot ligger med i POST-kroppen kastar Netlify inlämningen
  // tyst, även när fältet är tomt. Varje riktig inlämning försvann.
  if (/netlify-honeypot="/.test(html))
    fel.push(`/${sida}/: honungsfälla återinförd — Netlify kastar då varje inlämning tyst`);
}

if (!(await finns(path.join(DIST, 'tack', 'index.html'))))
  fel.push('formulärens action pekar på /tack/ som inte finns');

if (varningar.length) {
  console.log(`⚠  ${varningar.length} varning(ar):`);
  for (const v of varningar) console.log('   ' + v);
  console.log();
}

if (fel.length) {
  console.log(`✖ ${fel.length} fel:`);
  for (const f of fel) console.log('   ' + f);
  process.exit(1);
}

console.log(`✓ Inga fel. ${filer.length} sidor och all .astro-källkod kontrollerad.`);
