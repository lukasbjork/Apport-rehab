// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  /*
   * [VID LANSERING] Byt till 'https://www.apport.rehab' när domänen pekas om
   * från nuvarande WordPress-sajt till Netlify. Samma värde måste ändras i
   * src/lib/site.ts (SITE.url). Se README.md → "Växla domän".
   */
  site: 'https://apport-rehab.netlify.app',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
