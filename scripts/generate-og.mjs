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

  <!-- Vävnadslagren, stort och dekorativt -->
  <g transform="translate(950 315) scale(11)" opacity="0.14" stroke="#8a9b88" stroke-linecap="round" fill="none">
    <path d="M-11 -4.2 Q0 -8.4 11 -4.2" stroke-width="0.5"/>
    <path d="M-12 1.2 Q0 -3.5 12 1.2" stroke-width="0.5"/>
    <path d="M-12 6.6 Q-7.4 4.1 -3.8 3.4" stroke-width="0.55"/>
    <path d="M6.6 4.1 Q9.2 5.1 11 6.6" stroke-width="0.55"/>
  </g>
  <circle cx="971" cy="345" r="30" fill="#8a9b88" opacity="0.2"/>

  <!-- Litet märke vid etiketten -->
  <g transform="translate(90 108) scale(0.62)" stroke="#8a9b88" stroke-linecap="round" fill="none">
    <path d="M-10 -4.4 Q0 -8.6 10 -4.4" stroke-width="1.6" opacity="0.4"/>
    <path d="M-11 1 Q0 -3.7 11 1" stroke-width="1.6" opacity="0.6"/>
    <path d="M-11 6.4 Q-6.4 3.9 -2.8 3.2" stroke-width="1.8"/>
    <path d="M6.6 3.9 Q9.2 4.9 11 6.4" stroke-width="1.8"/>
  </g>
  <circle cx="91" cy="110" r="3.4" fill="#8a9b88"/>

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
