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
| `src/pages/index.astro` | The one-page site: hero, services, finance, software, research, engineering, contact |
| `src/layouts/Base.astro` | `<head>`, top bar, footer, scroll effects |
| `src/styles/global.css` | All styles (contracts.a2cons.com landing palette: Archivo, A2 green `#006839`, ink, stone) |
| `src/components/` | `Window` / `Phone` device frames, `Icon`, the `Hourglass` (NDN) and `Blueprint` illustrations |
| `src/data/site.ts` | Name, email, phone, city, copyright year |
| `src/data/shots.ts` | Screenshot file names, sizes and alt text |
| `public/shots/` | Screenshots (WebP, plus smaller `-1280`/`-400` copies for `srcset`) |
| `public/img/` | Logo and backgrounds (AVIF + WebP made from the AI-generated `1.png`-`3.png`, which stay out of git) |
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
