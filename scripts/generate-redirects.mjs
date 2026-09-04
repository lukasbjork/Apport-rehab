/**
 * Genererar public/_redirects från alias-tabellerna i innehållsmodellen
 * plus de gamla WordPress-URL:erna.
 *
 * Poängen med att generera i stället för att handskriva: alias-tabellerna
 * i src/lib/besvar-data.ts och behandlingar-data.ts är sanningen. Skriver
 * man redirects för hand glider de isär från datan förr eller senare.
 *
 * Netlify läser public/_redirects (som kopieras till dist/ vid bygge).
 * Kör: npm run redirects  — sker automatiskt via prebuild.
 */
import { writeFile, mkdir } from 'node:fs/promises';

// Läs alias direkt ur TS-filerna utan att kompilera dem.
// Filerna är rena datafiler, så en enkel regex räcker och undviker
// att bygga in en TS-runtime i byggkedjan.
import { readFile } from 'node:fs/promises';

async function lasAlias(fil, konstant) {
  const kall = await readFile(fil, 'utf8');
  const block = kall.match(
    new RegExp(`export const ${konstant}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`),
  );
  if (!block) throw new Error(`Hittade inte ${konstant} i ${fil}`);
  const par = [...block[1].matchAll(/^\s*'?([\w-]+)'?\s*:\s*'([\w-]+)'/gm)];
  return par.map((m) => [m[1], m[2]]);
}

const besvarAlias = await lasAlias('src/lib/besvar-data.ts', 'CONDITION_ALIASES');
const behandlingAlias = await lasAlias('src/lib/behandlingar-data.ts', 'TREATMENT_ALIASES');

/** Gamla WordPress-URL:er → nya sökvägar. */
const WP = [
  ['/om-oss/', '/om-apport/'],
  ['/kliniken/', '/om-apport/'],
  ['/utredning/', '/behandlingar/utredning/'],
  ['/behandling/', '/behandlingar/'],
  ['/diagnos/', '/besvar/'],
  ['/sjalvlakning/', '/regenerativ-medicin/'],
  ['/apport-smarta/', '/behandlingar/'],
  ['/apport-fysioterapi/', '/behandlingar/fysioterapi/'],
  ['/traningsvideo/', '/behandlingar/fysioterapi/'],
  ['/galleri/', '/besvar/'],
  ['/om-du-inte-ar-nojd/', '/synpunkter/'],
  ['/leder/', '/integritetspolicy/'],
];

/** Sökvägar som ändrats inom den nya sajten. */
const INTERNA = [
  ['/sa-gar-det-till/', '/som-patient/'],
  ['/besvar/huvudvark-migran/', '/besvar/huvudvark/'],
  // Smärtspecialist togs bort som behandlingstyp på kundens begäran.
  // Sidan och dess två alias 301:as till hubben i stället för att 404:a.
  ['/behandlingar/smartspecialist/', '/behandlingar/'],
  ['/behandlingar/smartlakare/', '/behandlingar/'],
  ['/behandlingar/smartspecialist-kristianstad/', '/behandlingar/'],
];

const rader = [
  '# Genererad av scripts/generate-redirects.mjs — redigera inte för hand.',
  '# Alias-tabellerna finns i src/lib/besvar-data.ts och behandlingar-data.ts.',
  '',
  '# ── Gamla WordPress-URL:er ──',
  ...WP.map(([fran, till]) => `${fran}  ${till}  301!`),
  '',
  '# ── Ändrade sökvägar inom nya sajten ──',
  ...INTERNA.map(([fran, till]) => `${fran}  ${till}  301!`),
  '',
  '# ── Besvär: söktermer som pekar på den kanoniska sidan ──',
  ...besvarAlias.map(([alias, kanonisk]) => `/besvar/${alias}/  /besvar/${kanonisk}/  301!`),
  '',
  '# ── Behandlingar ──',
  ...behandlingAlias.map(
    ([alias, kanonisk]) => `/behandlingar/${alias}/  /behandlingar/${kanonisk}/  301!`,
  ),
  '',
];

await mkdir('public', { recursive: true });
await writeFile('public/_redirects', rader.join('\n'), 'utf8');

const antal = WP.length + INTERNA.length + besvarAlias.length + behandlingAlias.length;
console.log(`public/_redirects skriven — ${antal} omdirigeringar`);
