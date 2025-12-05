import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://awesomeprompts.xyz',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [sitemap(), tailwind()],
});