import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { routes } from "./routes";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function audit(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
  expect(summary).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  // Measure final colours, not mid-fade ones.
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of routes) {
  test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    await audit(page);
  });
}

test("404 page has no WCAG 2.2 AA violations", async ({ page, pageErrors }) => {
  await page.goto("/no-such-page");
  await audit(page);
  pageErrors.splice(0, pageErrors.length, ...pageErrors.filter((e) => !/status of 404/.test(e)));
});

test("every quote planner step, including error states, has no violations", async ({ page }) => {
  await page.goto("/quote");
  await page.waitForLoadState("networkidle");
  const next = page.getByRole("button", { name: "Continue" });

  await next.click(); // step 1 with an error
  await audit(page);
  await page.getByRole("checkbox", { name: "Fire sprinklers" }).check();
  await next.click();

  await next.click(); // step 2 with errors
  await audit(page);
  await page.getByLabel("Property type").selectOption("Commercial");
  await page.getByLabel("State or province").selectOption("IL");
  await next.click();

  await next.click(); // step 3 with errors
  await audit(page);
  await page.getByLabel("First name").fill("Dana");
  await page.getByLabel("Last name").fill("Reyes");
  await page.getByLabel("Email").fill("dana@example.com");
  await page.getByLabel("Phone", { exact: true }).fill("(312) 555-0100");
  await next.click();

  await expect(page.getByRole("heading", { name: "Review your request." })).toBeVisible();
  await audit(page);
});

test("open mobile menu has no violations", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await audit(page);
});
