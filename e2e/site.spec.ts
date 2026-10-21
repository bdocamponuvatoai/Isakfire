import { expect, test } from "./fixtures";
import { routes } from "./routes";

test.describe("every page", () => {
  for (const route of routes) {
    test(`${route} renders one h1 with no horizontal overflow`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test("production responses carry the security headers", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response!.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("search indexing stays off until launch", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/services/fire-pumps");
});

test("structured data describes the business without a raw `<`", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  expect(json).not.toContain("<");
  const data = JSON.parse(json!);
  expect(data["@type"]).toBe("LocalBusiness");
  expect(data.telephone).toBe("+13124457787");
  expect(data.areaServed).toHaveLength(6);
});

test("with reduced motion, revealed content is visible immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hidden = await page
    .locator("[data-reveal]")
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
  expect(hidden).toBe(0);
});

test("generated images are labelled as illustrative", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Illustrative image · not Isak staff")).toBeVisible();
  await expect(page.getByText("Illustrative image", { exact: true }).first()).toBeAttached();
});

test("service tabs switch with the keyboard", async ({ page }) => {
  await page.goto("/");
  const suppression = page.getByRole("tab", { name: /Suppression/ });
  await suppression.focus();
  await page.keyboard.press("ArrowRight");
  const detection = page.getByRole("tab", { name: /Detection/ });
  await expect(detection).toBeFocused();
  await expect(detection).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Systems monitoring");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: /System care/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Fire pumps");
});

test("homepage FAQ opens", async ({ page }) => {
  await page.goto("/");
  const question = page.locator("#faq summary", { hasText: "Which areas do you serve?" });
  await question.click();
  await expect(
    page.locator("#faq").getByText(/Illinois, Michigan, Ohio, Indiana, Wisconsin and Ontario/),
  ).toBeVisible();
});

test("service directory filters by group", async ({ page }) => {
  await page.goto("/services");
  await page.getByRole("button", { name: "Detection" }).click();
  await expect(page.getByRole("button", { name: "Detection" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toHaveText("Showing 2 of 9 services");
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: /Fire alarms & detection/ })).toBeVisible();
  await expect(main.getByRole("link", { name: /Fire pumps/ })).toHaveCount(0);
});

test("FAQ search narrows results and reports an empty state", async ({ page }) => {
  await page.goto("/resources");
  const search = page.getByRole("searchbox", { name: "Search questions" });
  await search.fill("kitchen");
  await expect(page.getByRole("status")).toContainText("of 19 questions");
  await expect(page.getByText("Does moving or adding cooking equipment affect my system?")).toBeVisible();
  await search.fill("zzzz");
  await expect(page.getByText("No questions match.")).toBeVisible();
});

test("insights filter by category and link to the source articles", async ({ page }) => {
  await page.goto("/insights");
  await page.getByRole("button", { name: "Company news" }).click();
  await expect(page.getByRole("status")).toHaveText("Showing 1 of 12 articles");
  await expect(page.getByRole("link", { name: /Read on isakfire.com/ })).toHaveAttribute(
    "href",
    "https://isakfire.com/news.html",
  );
});

test("every phone number is a working tel: link", async ({ page }) => {
  await page.goto("/locations");
  for (const number of [
    "+13124457787",
    "+14372957500",
    "+13137268300",
    "+13802357200",
    "+14632133800",
    "+12622458600",
  ]) {
    await expect(page.locator(`main a[href="tel:${number}"]`).first()).toBeAttached();
  }
});

test("portals state they are coming soon and collect no credentials", async ({ page }) => {
  for (const route of ["/client-portal", "/partners"]) {
    await page.goto(route);
    // Let link prefetches finish: WebKit logs aborted fetches as console errors.
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Coming soon")).toBeVisible();
    await expect(page.locator('input[type="password"]')).toHaveCount(0);
  }
});

test("unknown pages return a branded 404", async ({ page, pageErrors }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page isn’t on the plans.");
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
  // The browser logs the 404 response itself; that one message is expected here.
  const expected = pageErrors.filter((e) => /status of 404/.test(e));
  pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !expected.includes(e)));
});

test("unknown service slugs are not generated", async ({ page, pageErrors }) => {
  const response = await page.goto("/services/not-a-service");
  expect(response?.status()).toBe(404);
  pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !/status of 404/.test(e)));
});
