# Contributing

## Workflow

`main` is protected. Every change goes through a pull request:

1. Branch from an up-to-date `main`: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
2. Make the change, then run the checks below locally.
3. Commit with [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix(hero):`, `chore(deps):`, `docs:`, `test:`). In the body, say what changed, why, and how you verified it.
4. Open a pull request. The template asks what you verified.
5. Merge once both CI checks are green. Squash merge only; the branch must be up to date with `main`.

## Checks

```sh
npm run check                            # format, zero-warning lint, typecheck, unit tests
npm run build                            # production build; every route must stay static (○ or ●)
PW_CHANNEL=msedge npx playwright test    # e2e on Chromium, Firefox and WebKit, desktop and mobile
```

The e2e suite runs against the production build, so build first. It fails on any console error and runs axe WCAG 2.2 AA scans on every page.

## Where things live

| To change…                                                                   | Edit                                                       |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Phone numbers, emails, addresses, hours, offices, navigation, footer credits | `lib/site.ts`                                              |
| Services, FAQs, articles, careers, project lifecycle                         | `lib/content.ts`                                           |
| Quote planner rules (validation, presets, email text)                        | `lib/quote.ts`, with tests in `lib/quote.test.ts`          |
| Search-engine structured data                                                | `lib/structured-data.ts`                                   |
| Colours, type scale, motion                                                  | `app/globals.css` (`@theme` tokens and `@utility` classes) |
| Security headers                                                             | `next.config.ts`                                           |
| A homepage section                                                           | `components/sections/`                                     |

Components never hard-code a business fact. Import it from `lib/`.

## Content rules

- **Every business fact must come from the client's live site**, recorded in `docs/content-sources.md`. Unverified claims (certifications, response times, guarantees, ratings, brands) stay off the site until the owner confirms them.
- **Generated images carry a visible "Illustrative image" label.** Use `IllustrativeImage` from `components/ui.tsx`, and log the prompt in `docs/image-generation.md`.
- **Never claim "ADA compliant".** Say "passes automated WCAG 2.2 AA checks".
- **Text contrast is at least 4.5:1.** Use the design tokens; on dark surfaces use the `sky` tokens, not white at reduced opacity.

## Code style

- Server Components by default. Add `"use client"` only for browser state (menus, tabs, filters, the planner).
- Keep logic pure and in `lib/` so `node --test` can run it. Relative imports inside `lib/` keep the `.ts` extension.
- Prettier formats and sorts Tailwind classes (`npm run format`). ESLint allows zero warnings.
- Comments explain _why_, not _what_.
