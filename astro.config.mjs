import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://labs.a2cons.com',
  trailingSlash: 'always',
  image: { service: passthroughImageService() },
  integrations: [sitemap()],
});
