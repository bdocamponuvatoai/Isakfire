# Isak Fire Protection website

Marketing site for [Isak Fire Protection, Inc.](https://isakfire.com/): fire sprinklers, alarms, suppression, monitoring and inspection for commercial, industrial and residential buildings in Illinois, Michigan, Ohio, Indiana, Wisconsin and Ontario.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript. Every route is prerendered as static HTML. It started as a ChatGPT-generated static site; the original is preserved in the first commit (`chore: import original ChatGPT build`).

## Scripts

Requires Node 22.18 or later (`.nvmrc` pins 24).

| Command            | What it does                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `npm run dev`      | Development server on http://localhost:3000                                               |
| `npm run build`    | Production build                                                                          |
| `npm run start`    | Serve the production build                                                                |
| `npm run check`    | Format check, zero-warning lint, typecheck, unit tests (what CI runs)                     |
| `npm run format`   | Format with Prettier (sorts Tailwind classes)                                             |
| `npm test`         | Unit tests for the quote planner logic (`node --test`, no framework)                      |
| `npm run test:e2e` | Playwright against the production build: Chromium, Firefox and WebKit, desktop and mobile |

To run e2e locally, build first, then reuse an installed Edge or Chrome for the Chromium projects:

```sh
npm run build
npx playwright install firefox webkit   # once
PW_CHANNEL=msedge npx playwright test
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable                     | Default                                             | Purpose                                                                                                                |
| ---------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Vercel production URL, else `http://localhost:3000` | Canonical origin for metadata, sitemap and structured data                                                             |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false`                                             | Set to `true` only after the owner approves launch. Until then every page is `noindex` and `robots.txt` disallows all. |

## Structure

```text
app/                    routes, layout, metadata routes (robots, sitemap, manifest, icons), 404 and error boundaries
  services/[slug]/      nine service pages, generated at build time
  quote/                four-step quote planner
components/
  sections/             homepage sections
  quote/quote-planner   planner UI (client component)
  inspection-tag.tsx    the signature "service tag" illustration
  locations-map.tsx     offices plotted from real city coordinates
lib/
  site.ts               business facts, offices, navigation: the single source of truth
  content.ts            services, FAQs, articles, roles, lifecycle
  quote.ts              pure planner logic (validation, presets, message, mailto), unit-tested
e2e/                    Playwright specs, including axe WCAG 2.2 AA scans
assets/images/          images imported by next/image
source-assets/          originals and retired images, not deployed
docs/                   content provenance and image prompts
```

## How the quote planner works

The planner collects services, property details and contact details, then opens a pre-filled email to sales@isakfire.com in the visitor's own email app. **Nothing is sent or stored by the site.** The review step says so, and the message never implies a booking (there's a unit test for that). `?service=<slug>` and `?region=<IL|MI|OH|IN|WI|ON>` preselect options, and unknown values are ignored.

The current isakfire.com form posts to Formspree. Switching to it is a launch decision; see [docs/content-sources.md](docs/content-sources.md).

## Design system

Tokens live in `app/globals.css` under `@theme`.

- **Colour:** navy `#00304a`, blue `#004880` and red `#b82020`, all sampled from the Isak badge, on a cool paper `#f6f6f3`. Tag yellow `#f4c430` appears only on the inspection tag. All text pairs meet 4.5:1. On dark surfaces, text uses the `sky` tokens rather than white at reduced opacity.
- **Type:** Big Shoulders for display (drawn for the City of Chicago, Isak's HQ; its condensed weight echoes the ISAK lettermark), Public Sans for body, IBM Plex Mono only for code references and record stamps.
- **Signature:** the punched inspection tag, the record left on every serviced system, with punches that land on reveal.
- **Logo:** the badge's navy "EST. 2014" disappears on navy, so the logo always sits on a light ground.
- **Images:** every generated image carries a visible "Illustrative image" label. See [docs/image-generation.md](docs/image-generation.md).
- **Motion:** progressive. With reduced motion or no JavaScript, everything is simply visible.

## Security

Production responses send a strict CSP, HSTS (two years, preload), `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy, COOP and a restrictive Permissions-Policy. An e2e test asserts them. There are no third-party scripts, cookies or analytics. Adding any (analytics, embeds, Formspree) means extending the CSP in `next.config.ts`, or the e2e console check will fail.

## Deployment

Deploy on Vercel; there's no server code, so any static-capable Node host works. Every pull request runs CI (`.github/workflows/ci.yml`): `npm run check`, build, `npm audit --omit=dev`, then the e2e suite against that exact build.

## Known advisories

- `npm audit` reports high-severity `braces` advisories through `eslint-config-next`. They're dev-only (`npm audit --omit=dev` is clean, and CI checks it). Don't run `npm audit fix --force`: it downgrades Next's ESLint config.
- Turbopack logs "Failed to find font override values for font `Big Shoulders`". Next has no fallback metrics for this face; `adjustFontFallback` is off and the CSS stack falls back to Arial Narrow. It's harmless.
- Locally, Playwright runs three workers. Headless Firefox throttles animation frames under heavy CPU load, which stalls Playwright's stability checks.

## Before launch

- [ ] Client confirms every item in [docs/content-sources.md § Claims left off](docs/content-sources.md#claims-on-the-live-site-that-we-left-off)
- [ ] Replace the generated team hero with a real team or fleet photo, or get explicit approval to keep it labelled
- [ ] Get a vector logo from the client
- [ ] Decide email draft vs Formspree for the quote planner
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain and `NEXT_PUBLIC_ALLOW_INDEXING=true`
- [ ] Test the call buttons and a real quote email on the owner's phone
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Re-run Lighthouse on the live domain before quoting any score
