# labs.a2cons.com

Website for **A2 Labs**: finance & accounting, software development, computer networking
research and engineering services. A sister company of A2 Construction (a2cons.com).

Built with [Astro](https://astro.build/) (static output, like `ndncomm-archive`), deployed by
`.github/workflows/deploy.yml` on every push to `main`: `npm ci && npm run build`, then
`easingthemes/ssh-deploy` rsyncs `dist/` to `/home/user-data/www/labs.a2cons.com` (same target
shape as a2cons.com). The repo needs the `DEPLOYMENT_HOST` variable and the
`DEPLOYMENT_PORT` / `DEPLOYMENT_USER` / `DEPLOYMENT_SSH_KEY` secrets.

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
| `public/shots/` | Screenshots (WebP) |

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
