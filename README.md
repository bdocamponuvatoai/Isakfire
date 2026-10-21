# Isak Fire Protection — premium design preview

A complete, responsive marketing website built around Isak Fire's existing identity, nine service disciplines and six published locations. The design uses an open white canvas, navy and red, a photorealistic branded team-and-vehicle hero, product-focused equipment imagery, editorial architecture and service photography, and a guided quote planner.

## Run and edit

The site uses semantic HTML, CSS and JavaScript with a small Python build script. There are no third-party runtime scripts, package dependencies, external fonts or framework services.

```sh
python3 scripts/build.py
python3 scripts/check.py
node --check dist/app.js
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. `npm run build` and `npm run check` are aliases. The complete deployable website is in `dist/`. Edit `content.json` for services, locations, FAQ answers, journal entries and careers. Shared page templates are in `scripts/build.py`; presentation and interactions are in `dist/styles.css` and `dist/app.js`. The build regenerates HTML and preserves assets, CSS and JavaScript. Hosting identity lives in `.openai/hosting.json`.

## Included experience

- Homepage, service directory and nine individual service pages
- Company, locations, contact and careers pages
- Searchable, category-filtered FAQ with native accessible disclosures
- Filterable journal index linking to the company's original published articles
- Client and partner access information preserving the source site's coming-soon status
- Four-step quote planner with validation, query-string service/location preselection, review, copy, and an email-draft action
- Responsive mobile dialog navigation, keyboard-accessible service tabs, reduced-motion support and visible focus states
- Local fonts, compressed WebP assets, metadata, noindex/nofollow and a custom 404 page

The quote planner does not send email, submit leads, store personal entries or claim successful delivery. Visitors explicitly open a draft addressed to sales@isakfire.com and send it in their own email app. Attachments can be added there. Client/partner account backends are not connected. Payment links point to the existing company Stripe page; this website does not collect or process payment details.

## Content research and source decisions

Reviewed October 22, 2026 (Asia/Manila):

- https://isakfire.com/ — nine services, six locations, phone numbers, office address, email and hours.
- https://isakfire.com/faqs.html — company service process, inspection documentation, construction/retrofit work, recurring programs and portfolio support.
- https://isakfire.com/careers.html — the four listed field roles, published requirements and certification support.
- https://isakfire.com/news.html — all twelve published article topics and month/year labels. Entries are rewritten summaries; full articles remain on the current website.
- https://isakfire.com/quote.html — sales contact and the project's contact/property/service/review sequence.
- https://isakfire.com/portal.html and https://isakfire.com/partners.html — both describe portals as coming soon. No fictional login flow was created.
- https://buy.stripe.com/eVa4iy7Qqbsk5CUeUV — original Pay Now destination.
- https://www.nfpa.org/product/nfpa-25-standard-for-the-inspection-testing-and-maintenance-of-water-based-fire-protection-systems/p0025code — title and scope of NFPA 25.
- https://www.ul.com/services/fire-extinguishing-system-unit-testing — UL 300 scope.

Copy is restructured for clarity. Technical intervals, universal compliance promises, insurance-coverage claims and jurisdiction-specific code adoption dates from the source were not repeated as universal requirements. The user-facing FAQ directs property-specific requirements to the qualified team and local authority. Current job availability must be confirmed. The homepage reports the six listed locations rather than implying guaranteed service everywhere. No testimonials, certifications, project results or customer logos were invented.

## Original logo

`dist/assets/isak-logo.jpg` is the unchanged existing Isak Fire Protection badge, retrieved from the company's public profile at https://theorg.com/org/isak-fire-protection (asset: https://cdn.theorg.com/378c88a9-63f0-43bb-9ece-88fc4af0b4c5_thumb.jpg). Direct visual access to isakfire.com failed in this environment, while indexed public website content was available. The supplied public badge is 200 × 200; it is kept at small display sizes. The header and footer continue to use this original JPEG. The browser favicon uses a separate transparent derivative produced with built-in image editing and resized to PNG and ICO formats. A higher-resolution original can replace this file without changing layouts.

## Generated assets

Built-in image generation was used, then the images were compressed to WebP. All generated scenes are illustrative; they do not represent actual Isak equipment designs, projects or employees. The site identifies them as concepts and repeats this boundary in the preview footer.

| File | Prompt / art direction |
| --- | --- |
| `dist/assets/isak-office-field-hero.webp` | Edited version of the team hero with two field technicians, two office staff in white/light-blue shirts, and two staff in navy polos. Original faces, composition and branded van retained. Full prompt: `assets-update-prompts.txt`. |
| `dist/assets/isak-favicon-32.png`, `dist/assets/isak-favicon-96.png`, `dist/favicon.ico` | Transparent-background derivative of the original badge; internal white lettering retained. Full prompt: `assets-update-prompts.txt`. |
| `dist/assets/isak-team-hero.webp` | Six fire-protection technicians in navy uniforms bearing the existing Isak badge, with a white branded service van outside a commercial facility; natural late-afternoon photography and quiet space for the headline. Built-in image generation with the original badge as a reference. Full prompt: `assets-team-prompt.txt`. |
| `dist/assets/hero.webp` | Photorealistic studio concept of a red steel fire protection valve assembly, polished gauge, machined fittings, soft off-white seamless background, precise industrial product photography; no logos or text. |
| `dist/assets/facility.webp` | Editorial architecture photograph of a contemporary commercial atrium, pale stone and glass, morning light, calm empty plaza; no logos or real customer claim. |
| `dist/assets/technician.webp` | Illustrative technician with white hard hat, clear safety glasses and navy shirt reviewing a tablet beside red riser pipes, natural documentary light; no branding or real-employee claim. |

The Manrope and Inter font files are self-hosted under `dist/assets/`.

## Validation

The build, JavaScript syntax and local link/asset/anchor checks are available in the commands above. Browser QA covers desktop and mobile layout, service tabs and filters, FAQ search, navigation, careers disclosures and the full quote review flow without sending an inquiry or processing a payment.

The updated homepage hero uses the new 1672 × 941 team asset. Desktop uses a full-width photo with a readability gradient. Tablet and mobile bring the headline above the photograph and crop only the empty left side, preserving all six technicians and the vehicle badge. The original equipment asset remains on service detail pages.

The current homepage uses `isak-office-field-hero.webp`; the preceding all-navy-uniform concept remains available in assets. All pages use transparent PNG/ICO favicons.
