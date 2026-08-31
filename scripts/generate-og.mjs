/**
 * Genererar OG-bild (1200×630) för delning i sociala medier och sökresultat.
 * Kör: npm run og
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#202b24"/>
      <stop offset="100%" stop-color="#34433a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Siktet, stort och dekorativt -->
  <g transform="translate(980 315)" opacity="0.16">
    <circle r="230" fill="none" stroke="#8a9b88" stroke-width="2" stroke-dasharray="5 8"/>
    <line x1="0" y1="-260" x2="0" y2="260" stroke="#8a9b88" stroke-width="2"/>
    <line x1="-260" y1="0" x2="260" y2="0" stroke="#8a9b88" stroke-width="2"/>
    <circle r="66" fill="none" stroke="#8a9b88" stroke-width="3"/>
  </g>

  <!-- Litet sikte vid etiketten -->
  <g transform="translate(90 108)" opacity="0.9">
    <line x1="0" y1="-9" x2="0" y2="9" stroke="#8a9b88" stroke-width="1.6"/>
    <line x1="-9" y1="0" x2="9" y2="0" stroke="#8a9b88" stroke-width="1.6"/>
    <circle r="4.5" fill="none" stroke="#8a9b88" stroke-width="1.8"/>
  </g>

  <text x="116" y="115" font-family="Hanken Grotesk, Segoe UI, sans-serif"
        font-size="21" font-weight="600" letter-spacing="3.4" fill="#8a9b88">
    SMÄRTSPECIALISTKLINIK I KRISTIANSTAD
  </text>

  <text x="88" y="248" font-family="Literata, Georgia, serif" font-size="76" fill="#f5f2ec">
    Alla säger att det
  </text>
  <text x="88" y="336" font-family="Literata, Georgia, serif" font-size="76" fill="#f5f2ec">
    ser normalt ut.
  </text>
  <text x="88" y="424" font-family="Literata, Georgia, serif" font-size="76" fill="#8a9b88">
    Ändå gör det ont.
  </text>

  <line x1="88" y1="492" x2="640" y2="492" stroke="#f5f2ec" stroke-width="1" opacity="0.22"/>

  <text x="88" y="540" font-family="Hanken Grotesk, Segoe UI, sans-serif"
        font-size="27" fill="#f5f2ec" opacity="0.72">
    Apport · Utredning med ultraljud · Avtal med Region Skåne
  </text>
</svg>`;

await mkdir('public/og', { recursive: true });
const info = await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile('public/og/og-default.png');
console.log(`og-default.png  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);
