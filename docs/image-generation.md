# Image generation

All images under `assets/images/` except `isak-logo.png` were generated with ChatGPT's built-in image tool during the original build (October 2026), then compressed to WebP. None of them shows real Isak employees, vehicles, equipment or projects. Every one is rendered through `IllustrativeImage` (or the hero's own label) with a visible **"Illustrative image"** caption, and the footer repeats the boundary.

Replace these with real job, team and fleet photos as the client supplies them. A real photo must not carry the label.

| File                                                   | Used on                                                | Notes                                                                                                                                                                                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/images/team-hero.webp` (1672 × 941)            | Home hero                                              | Six invented people in Isak-branded uniforms beside a branded van. The embroidered badges are garbled at full size. **Highest-risk image:** visitors may read it as Isak's real staff. Labelled "Illustrative image · not Isak staff". Flagged to the client. |
| `assets/images/technician.webp` (1024 × 1536)          | Home, careers, detection and system-care service pages | Unbranded technician beside red riser pipes.                                                                                                                                                                                                                  |
| `assets/images/riser-valve.webp` (1536 × 1024)         | Suppression service pages                              | Studio product shot of a red valve assembly. No logos.                                                                                                                                                                                                        |
| `assets/images/commercial-building.webp` (1536 × 1024) | About                                                  | Generic commercial building with a glass atrium. Not a client property.                                                                                                                                                                                       |
| `source-assets/team-hero-all-navy.webp`                | Not deployed                                           | Earlier all-navy-uniform version of the team hero.                                                                                                                                                                                                            |

`assets/images/isak-logo.png` is Isak's own badge (400 × 338, transparent), taken from isakfire.com on 2026-10-22. `app/icon.png`, `app/apple-icon.png` and `public/og.jpg` are generated from it with `sharp`. The badge's navy "EST. 2014" lettering disappears on navy, so the logo always sits on a light ground. `source-assets/isak-logo-theorg-200.jpg` is the low-resolution copy the ChatGPT build used. Ask the client for a vector (SVG or PDF) original.

`assets/images/igv-logo-on-ink.webp` (261 × 82, transparent) is the Isak Global Ventures parent-company logo, light version for dark backgrounds, used in the footer badge. Copied from the shared IGV asset used across IGV brand sites (taken from the Gold Coast Building repo, `public/assets/igv-logo-on-ink.webp`). Not generated.

## Prompts

### Team hero (`team-hero.webp`)

The final hero is an edit of a first team image, so both prompts are recorded.

**First image (all-navy uniforms):**

> Use case: photorealistic-natural. Asset type: premium fire-protection company website hero background, panoramic landscape 2400x1350. Input image 1: BRAND REFERENCE ONLY. It is the existing Isak Fire Protection badge to reproduce on clothing and vehicle, not an image to restyle. Primary request: a highly believable commercial team portrait of six adult fire-protection service technicians, four men and two women, with varied natural faces and ages, wearing matching neat navy work shirts and navy work trousers with work boots. Each navy shirt has the supplied Isak badge as a small real embroidered left-chest patch. A clean white full-size service van behind the team bears a large professionally printed exact Isak badge on the visible side panel and a subtle dark navy and red lower-body stripe. This is a fire sprinkler, alarm and suppression installation/service company, not emergency firefighters. Scene/backdrop: real modern commercial industrial facility forecourt, charcoal architectural metal, glass, tidy paved ground. Team standing in relaxed confident natural poses in a loose line, all six fully visible, friendly professional expressions looking at camera. Composition: wide editorial photograph, camera eye level, 40mm lens. The left 36 percent of the frame is quiet darker shaded architecture and forecourt with no people, reserved for webpage text. The six-person team occupies the right 58 percent. Lighting: soft warm late-afternoon sunlight from camera right. Constraints: actual-photography appearance, realistic proportions, distinct faces, anatomically correct hands, no CGI, no smoke or fire, no emergency sirens, no firefighting turnout suits, no promotional text overlays, no watermark.

**Edit (mixed office and field uniforms, the version in use):**

> Use case: identity-preserve. Image 1 is the EDIT TARGET: preserve this exact six-person team, faces, poses, building, sunlight, branded van, composition, and empty left area. Image 2 is the BRAND REFERENCE: exact existing Isak Fire Protection badge for uniform embroidery. Requested change: give this team a professional mix of field uniforms and office uniforms. (1) bearded man in cap: navy utility work shirt; (2) dark-haired woman: white long-sleeve office shirt, navy trousers; (3) grey-haired man: light blue Oxford shirt, charcoal trousers; (4) blonde woman holding white hard hat: navy polo, charcoal chinos; (5) man in cap: navy technician shirt; (6) dark-haired man at far right: navy polo, tan chinos. Each with a small accurate Isak badge on the left chest. Invariants: keep all six people in the existing positions and sizes; preserve faces, the branded van and large logo, the empty left third, framing, light and colour grade. No extra people, no new text, no watermarks, no CGI.

### Riser valve (`riser-valve.webp`)

> Photorealistic studio concept of a red steel fire protection valve assembly, polished gauge, machined fittings, soft off-white seamless background, precise industrial product photography; no logos or text.

### Commercial building (`commercial-building.webp`)

> Editorial architecture photograph of a contemporary commercial atrium, pale stone and glass, morning light, calm empty plaza; no logos or real customer claim.

### Technician (`technician.webp`)

> Illustrative technician with white hard hat, clear safety glasses and navy shirt reviewing a tablet beside red riser pipes, natural documentary light; no branding or real-employee claim.

### Favicon (original build, retired)

The ChatGPT build made a transparent favicon by removing the white background from the 200 px badge. It was replaced by icons generated from the transparent isakfire.com badge.
