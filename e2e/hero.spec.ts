import { expect, test } from "./fixtures";

const RATIO = 1672 / 941;
// Share of the photo's width that is empty wall before the first person.
const EMPTY_LEFT = 0.34;

const viewports = [
  { width: 390, height: 844 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1867, height: 898 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
];

test.describe("hero photo", () => {
  // One engine is enough for geometry; the per-device projects cover the rest.
  test.skip(({ browserName, isMobile }) => browserName !== "chromium" || isMobile, "desktop chromium only");

  for (const viewport of viewports) {
    test(`is shown whole at ${viewport.width}×${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      const hero = page.locator("section[aria-labelledby='hero-title']");
      const photo = hero.locator("img").first();
      await expect(photo).toBeVisible();

      const img = (await photo.boundingBox())!;
      const box = (await hero.boundingBox())!;

      // Exact aspect ratio, so object-fit: cover crops nothing.
      expect(Math.abs(img.width / img.height - RATIO)).toBeLessThan(0.01);
      // Never clipped by the hero.
      expect(img.x).toBeGreaterThanOrEqual(box.x - 1);
      expect(img.x + img.width).toBeLessThanOrEqual(box.x + box.width + 1);
      expect(img.y).toBeGreaterThanOrEqual(box.y - 1);
      expect(img.y + img.height).toBeLessThanOrEqual(box.y + box.height + 1);

      // Photo and copy fit the first screen on common desktop sizes (the hero's
      // minimum height is exactly the space below the header).
      if (viewport.width >= 1366 && viewport.height >= 768) {
        const header = (await page.getByRole("banner").boundingBox())!;
        const stage = (await hero.locator(":scope > div").first().boundingBox())!;
        expect(stage.height, "hero taller than the first screen").toBeLessThanOrEqual(
          viewport.height - header.height + 1,
        );
      }

      if (viewport.width >= 1024) {
        // Copy sits on the photo's empty wall, never over the people.
        const peopleStart = img.x + img.width * EMPTY_LEFT;
        for (const el of [page.locator("#hero-title"), hero.locator("p.text-lede")]) {
          const b = (await el.boundingBox())!;
          expect(b.x + b.width, `${await el.evaluate((n) => n.tagName)} right edge`).toBeLessThanOrEqual(peopleStart);
        }
      }
    });
  }
});
