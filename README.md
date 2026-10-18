# labs.a2cons.com

Website for **A2 Labs**: finance & accounting, software development, computer networking
research and engineering services. A sister company of A2 Construction (a2cons.com).

Built with [Astro](https://astro.build/) (static output, like `ndncomm-archive`), deployed to
GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. The custom domain comes from
`public/CNAME`; DNS needs a CNAME record `labs` -> `<owner>.github.io`. One-time setup in the repo:
**Settings -> Pages -> Source: GitHub Actions**, then set the custom domain and enforce HTTPS.

```
npm install
npm run dev      # http://localhost:4321/
npm run build    # static site in dist/
```

## Layout

| Path | What |
|------|------|
| `src/pages/index.astro` | Home: hero, services, product showcase, engineering/research/finance cards, contact |
| `src/pages/{software,engineering,research,finance}.astro` | One page per service line |
| `src/data/services.ts` | The four services in site order (menu, cards, footer, structured data) |
| `src/layouts/Base.astro` | `<head>`, top bar, footer, scroll effects |
| `src/styles/global.css` | All styles (contracts.a2cons.com landing palette: Archivo, A2 green `#006839`, ink, stone) |
| `src/components/` | `Window` / `Phone` frames, `Backdrop` / `PageHero` (AI backgrounds), `Showcase` (products), `ContactBlock` (Web3Forms form), `Icon`, `Hourglass`, `Blueprint` |
| `src/data/site.ts` | Name, email, phone, city, copyright year |
| `src/data/shots.ts` | Screenshot file names, sizes and alt text |
| `public/shots/` | Screenshots (WebP, plus smaller `-1280`/`-400` copies for `srcset`) |
| `art/` | AI-generated source backgrounds (PNG); not served |
| `public/img/` | Logo and web copies of the backgrounds (AVIF + WebP, from `art/`) |
| `tools/build-images.sh` | Regenerates the web copies of backgrounds and screenshots |

## Screenshots: demo data only

Every screenshot comes from demo data, never from a real company:

- **A2 Contracts**: the dev demo company "Harbor Point Builders" (`seed_guide_demo`; see
  `a2cons-contracts/tools/landing-shots/README.md`).
- **A2 QBO** and **BI Inventory**: throwaway local databases filled with an invented company.

## Copy rules

- Brand **A2 Labs** is a fictitious name (DBA) of **A2 Consulting LLC**, the legal name (footer,
  structured data). Don't go live before the Florida fictitious-name registration is filed.
- Engineering stays **generic** for A2 Consulting LLC: no "Professional Engineer", "PE",
  sealed drawings or discipline claims for this company. Professional engineering is credited to
  **A2 Construction, FL Eng. Reg. #40202** (footer and the note under Engineering), linking to
  a2cons.com.
- No invented numbers, clients or testimonials.

## SEO

Per-page title, description, canonical, Open Graph/Twitter card (`public/og/<page>.jpg`, captured
from each page's top at 1200x630), JSON-LD (`ProfessionalService` + `WebSite`, plus `Service` and
`BreadcrumbList` on service pages), `sitemap-index.xml` (@astrojs/sitemap), `robots.txt` that
explicitly welcomes AI crawlers, and `llms.txt` (a plain summary for AI assistants; keep it in
step with the pages). Retake the OG images after changing a page's top.
