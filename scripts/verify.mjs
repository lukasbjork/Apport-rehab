/**
 * Kontrollerar den byggda sajten i dist/.
 *
 * Testar:
 *  1. Interna länkar pekar på sidor som faktiskt finns
 *  2. Refererade bilder finns på disk
 *  3. Ingen platshållartext har läckt till produktion
 *  4. Varje sida har title, meta description, canonical och exakt en h1
 *  5. Alla <img> har alt-attribut
 *  6. Inga uppenbart ihopklistrade ord (Astros whitespace-fälla)
 *
 * Kör: node scripts/verify.mjs
 */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const fel = [];
const varningar = [];

async function htmlFiler(dir) {
  const ut = [];
  for (const post of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, post.name);
    if (post.isDirectory()) ut.push(...(await htmlFiler(full)));
    else if (post.name.endsWith('.html')) ut.push(full);
  }
  return ut;
}

const finns = async (p) => access(p).then(() => true).catch(() => false);

/** dist-sökväg för en rot-relativ URL */
function urlTillFil(url) {
  const ren = url.split('#')[0].split('?')[0];
  if (ren.endsWith('.html')) return path.join(DIST, ren);
  return path.join(DIST, ren, 'index.html');
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

const filer = await htmlFiler(DIST);
console.log(`Kontrollerar ${filer.length} sidor i ${DIST}/\n`);

for (const fil of filer) {
  const html = await readFile(fil, 'utf8');
  const sida = '/' + path.relative(DIST, fil).replace(/\\/g, '/');

  // 1. Interna länkar
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

  // 2. Bilder
  const srcs = [...html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const src of new Set(srcs)) {
    if (!(await finns(path.join(DIST, src)))) fel.push(`${sida}: saknad bild ${src}`);
  }

  // 3. Platshållartext
  for (const m of PLATSHALLARE) {
    if (m.test(html)) fel.push(`${sida}: platshållartext matchar ${m}`);
  }

  // 4. SEO-grunder
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fel.push(`${sida}: saknar title`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html))
    fel.push(`${sida}: saknar/kort meta description`);
  if (!/<link rel="canonical"/.test(html)) fel.push(`${sida}: saknar canonical`);

  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 !== 1) fel.push(`${sida}: ${h1} st h1 (ska vara exakt 1)`);

  // Titellängd — varning, inte fel
  const titel = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (titel.length > 65) varningar.push(`${sida}: title ${titel.length} tecken (>65)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (desc.length > 165) varningar.push(`${sida}: description ${desc.length} tecken (>165)`);

  // 5. alt på alla img
  for (const tagg of html.match(/<img[^>]*>/g) ?? []) {
    if (!/\salt=/.test(tagg)) fel.push(`${sida}: <img> utan alt — ${tagg.slice(0, 90)}`);
  }

  // 6. Ihopklistrade ord: gemen följd av versal inuti ett ord i brödtext
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  for (const m of text.matchAll(/\b[a-zåäö]{3,}[A-ZÅÄÖ][a-zåäö]{2,}\b/g)) {
    varningar.push(`${sida}: möjligt ihopklistrat ord "${m[0]}"`);
  }
}

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

console.log(`✓ Inga fel. ${filer.length} sidor kontrollerade.`);
