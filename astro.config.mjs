import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://labs.a2cons.com',
  trailingSlash: 'always',
  // One small stylesheet: inline it so the first paint needs no extra request.
  build: { inlineStylesheets: 'always' },
  image: { service: passthroughImageService() },
  integrations: [sitemap()],
});
