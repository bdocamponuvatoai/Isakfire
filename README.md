# Isak Fire Protection website

Marketing site for [Isak Fire Protection, Inc.](https://isakfire.com/): fire sprinklers, alarms, suppression, monitoring and inspection for commercial, industrial and residential buildings in Illinois, Michigan, Ohio, Indiana, Wisconsin and Ontario.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript. Every route is prerendered as static HTML. It started as a ChatGPT-generated static site; the original is preserved in the first commit (`chore: import original ChatGPT build`).

New to the codebase? Read [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and where things live, and [SECURITY.md](SECURITY.md) for the security model.

## Scripts

Requires Node 22.18 or later (`.nvmrc` pins 24).

| Command            | What it does                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `npm run dev`      | Development server on http://localhost:3000                                               |
| `npm run build`    | Production build                                                                          |
| `npm run start`    | Serve the production build                                                                |
| `npm run check`    | Format check, zero-warning lint, typecheck, unit tests (what CI runs)                     |
| `npm run format`   | Format with Prettier (sorts Tailwind classes)                                             |
| `npm test`         | Unit tests for `lib/` (quote logic, structured data) with `node --test`, no framework     |
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
app/                      routes, root layout, metadata routes (robots, sitemap, manifest, icons), 404, error boundaries
  services/[slug]/        nine service pages, generated at build time
  quote/                  quote planner page
components/
  sections/               homepage sections, one file each
  quote/                  planner: state (quote-planner), fields, step indicator, review step, options
  site-header.tsx         header and mobile menu (native <dialog>)
  site-footer.tsx         footer, Nuvato AI credit, Isak Global Ventures badge
  ui.tsx, icons.tsx       shared primitives (cx, buttonClass, IllustrativeImage, inline SVG icons)
  inspection-tag.tsx      the signature "service tag" illustration
  locations-map.tsx       offices plotted from real city coordinates
lib/                      pure, framework-free modules; the single source of truth
  site.ts                 business facts, offices, navigation, footer credits
  content.ts              services, FAQs, articles, roles, lifecycle
  quote.ts                planner logic: validation, URL presets, message, mailto
  structured-data.ts      schema.org JSON-LD and its safe serialisation
  *.test.ts               unit tests (node --test)
e2e/                      Playwright specs: pages, hero geometry, footer, quote planner, navigation, axe
assets/images/            images imported by next/image
source-assets/            original logo file, not deployed
docs/                     content provenance and image prompts
.github/                  CI, CodeQL, Dependabot, PR template, CODEOWNERS
```

## How the quote planner works

The planner collects services, property details and contact details, then opens a pre-filled email to sales@isakfire.com in the visitor's own email app. **Nothing is sent or stored by the site.** The review step says so, and the message never implies a booking (there's a unit test for that). `?service=<slug>` and `?region=<IL|MI|OH|IN|WI|ON>` preselect options, and unknown values are ignored.

The current isakfire.com form posts to Formspree. Switching to it is a launch decision; see [docs/content-sources.md](docs/content-sources.md).

## Design system

Tokens live in `app/globals.css` under `@theme`.

- **Colour:** navy `#00304a`, blue `#004880` and red `#b82020`, all sampled from the Isak badge, on a cool paper `#f6f6f3`. Tag yellow `#f4c430` appears only on the inspection tag. All text pairs meet 4.5:1. On dark surfaces, text uses the `sky` tokens rather than white at reduced opacity.
- **Type:** Big Shoulders for display (drawn for the City of Chicago, Isak's HQ; its condensed weight echoes the ISAK lettermark), Public Sans for body, IBM Plex Mono only for code references and record stamps.
- **Hero:** the team photo always keeps its 1672:941 shape, so it's never cropped. On desktop it sits bottom-right at 72% width, faded into the navy, and the hero is never shorter than the photo (`e2e/hero.spec.ts` checks this at 10 viewports).
- **Signature:** the punched inspection tag, the record left on every serviced system, with punches that land on reveal.
- **Logo:** the badge's navy "EST. 2014" disappears on navy, so the logo always sits on a light ground.
- **Images:** every generated image carries a visible "Illustrative image" label. See [docs/image-generation.md](docs/image-generation.md).
- **Motion:** progressive. With reduced motion or no JavaScript, everything is simply visible.

## Security

Production responses send a strict CSP, HSTS (two years, preload), `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy, COOP and a restrictive Permissions-Policy. An e2e test asserts them. There are no third-party scripts, cookies or analytics, and CodeQL scans every pull request. See [SECURITY.md](SECURITY.md) for the full model and the rules for contributors.

## Deployment

Deploy on Vercel; there's no server code, so any static-capable Node host works. Every pull request runs CI (`.github/workflows/ci.yml`): `npm run check`, build, `npm audit --omit=dev`, then the e2e suite against that exact build. `main` is protected: changes land by squash-merging a pull request with both checks green.

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
