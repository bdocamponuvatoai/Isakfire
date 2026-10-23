# Security

## Reporting a problem

Please don't open a public issue for a security problem. Report it privately through [GitHub private vulnerability reporting](https://github.com/bdocamponuvatoai/Isakfire/security/advisories/new).

## How the site is protected

The site is fully static: every route is prerendered at build time, with no API routes, server actions, database, sign-in or cookies. That removes most of the attack surface by design. What remains is covered as follows.

| Area              | Control                                                                                                                                                                                                                                                                | Where                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Response headers  | Strict CSP (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`), HSTS two years with preload, `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, COOP `same-origin`, restrictive Permissions-Policy, no `X-Powered-By` | `next.config.ts`; asserted by `e2e/site.spec.ts`                     |
| Inline scripts    | Only Next's bootstrap and one JSON-LD block. JSON-LD is built from static data, and `<` is escaped so it can't close the tag                                                                                                                                           | `lib/structured-data.ts` (unit-tested)                               |
| User input        | The quote planner never sends or stores anything. It builds a `mailto:` link in the browser. URL presets (`?service=`, `?region=`) are accepted only when they match a known option                                                                                    | `lib/quote.ts` (unit-tested)                                         |
| Third parties     | No analytics, trackers, embeds or third-party scripts. Fonts are self-hosted by `next/font`. External links open with `rel="noopener"`                                                                                                                                 | —                                                                    |
| Personal data     | None collected. See `/privacy`                                                                                                                                                                                                                                         | `app/privacy/page.tsx`                                               |
| Dependencies      | Exact pins for runtime and key tooling; weekly Dependabot; `npm audit --omit=dev` in CI                                                                                                                                                                                | `package.json`, `.github/dependabot.yml`, `.github/workflows/ci.yml` |
| CI supply chain   | Every action is pinned to a full commit SHA; workflows default to `contents: read`; checkout doesn't keep credentials                                                                                                                                                  | `.github/workflows/`                                                 |
| Code scanning     | CodeQL `security-extended` on the TypeScript and the workflows, on every PR, on pushes to `main` and weekly                                                                                                                                                            | `.github/workflows/codeql.yml`                                       |
| Branch protection | `main` requires a pull request, both CI checks from GitHub Actions, an up-to-date branch and linear history; force pushes and deletion are blocked                                                                                                                     | Repository ruleset                                                   |

## Rules for contributors

- **Never commit secrets.** The site needs none. `.env*` files are gitignored except `.env.example`, and only `NEXT_PUBLIC_*` values that are safe to expose belong there.
- **Adding a third-party service** (analytics, Formspree, maps, embeds) means extending the CSP in `next.config.ts` deliberately, in its own pull request. The e2e console check will fail otherwise.
- **Don't run `npm audit fix --force`.** The known `braces` advisory is dev-only and comes through `eslint-config-next`. See the README's known advisories.
- **Keep `rel="noopener"`** on every `target="_blank"` link.
