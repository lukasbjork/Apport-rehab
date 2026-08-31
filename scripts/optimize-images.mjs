/**
 * Bildbearbetning.
 *
 * 1. Beskär bort ultraljudsmaskinens gränssnitt (menyer, knappar, studie-ID)
 *    så att bara själva vävnadsbilden blir kvar. Studie-ID:t är dessutom en
 *    uppgift som inte hör hemma på en publik sajt.
 * 2. Konverterar allt till webp i rimliga bredder.
 *
 * Källbilder ligger i bilder-original/ (versionshanterade men skeppas INTE).
 * Resultatet hamnar i public/bilder/ och är det enda som deployas.
 *
 * Kör: npm run bilder
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const KALLA = 'bilder-original';
const MAL = 'public/bilder';

/**
 * Ultraljudsbilderna är 800×600 från en Wisonic Clover 60.
 * Vänsterspalten (0–150 px) är maskinens meny, översta 60 px är
 * studie-ID + datum, nedersta ~90 px är knappraden. Vi behåller
 * själva sektorbilden.
 */
const ULTRALJUD_CROP = { left: 152, top: 62, width: 640, height: 430 };

const ULTRALJUD = ['ultraljud-c4-c5.png', 'ultraljud-l5-s1.jpg'];

async function main() {
  await mkdir(MAL, { recursive: true });
  const filer = await readdir(KALLA);

  for (const fil of filer) {
    const ext = path.extname(fil).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const bas = path.basename(fil, ext);
    const kalla = path.join(KALLA, fil);

    let bild = sharp(kalla);
    const meta = await bild.metadata();

    if (ULTRALJUD.includes(fil)) {
      // Beskär bara om bilden är tillräckligt stor för den tänkta ytan
      if ((meta.width ?? 0) >= 792 && (meta.height ?? 0) >= 492) {
        bild = bild.extract(ULTRALJUD_CROP);
      }
    }

    const utfil = path.join(MAL, `${bas}.webp`);
    const info = await bild
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(utfil);

    console.log(`${fil} → ${path.basename(utfil)}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
