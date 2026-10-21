import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const continueButton = (page: Page) => page.getByRole("button", { name: "Continue" });

async function completeToReview(page: Page) {
  await page.getByRole("checkbox", { name: "Fire pumps" }).check();
  await continueButton(page).click();
  await page.getByLabel("Property type").selectOption("Industrial");
  await page.getByLabel("State or province").selectOption("IN");
  await page.getByLabel(/Number of floors/).fill("3");
  await continueButton(page).click();
  await page.getByLabel("First name").fill("Dana");
  await page.getByLabel("Last name").fill("Reyes");
  await page.getByLabel(/Company or organisation/).fill("Lakeview Logistics");
  await page.getByLabel("Email").fill("dana@example.com");
  await page.getByLabel("Phone", { exact: true }).fill("(463) 555-0100");
  await continueButton(page).click();
  await expect(page.getByRole("heading", { name: "Review your request." })).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  // Hydration must finish before the planner reacts to clicks.
  await page.goto("/quote");
  await page.waitForLoadState("networkidle");
});

test("requires a service before continuing, and focuses the first checkbox", async ({ page }) => {
  await continueButton(page).click();
  await expect(page.getByText("Select at least one service")).toBeVisible();
  await expect(page.getByRole("checkbox").first()).toBeFocused();
  await expect(page.getByRole("checkbox").first()).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("heading", { name: "What can we help with?" })).toBeVisible();
});

test("shows inline errors tied to their fields", async ({ page }) => {
  await page.getByRole("checkbox", { name: "Help me decide" }).check();
  await continueButton(page).click();
  await continueButton(page).click();
  const type = page.getByLabel("Property type");
  await expect(type).toBeFocused();
  await expect(type).toHaveAttribute("aria-invalid", "true");
  await expect(type).toHaveAccessibleDescription("Select a property type.");
  await expect(page.getByLabel("State or province")).toHaveAccessibleDescription("Select the state or province.");
  await type.selectOption("Commercial");
  await expect(type).not.toHaveAttribute("aria-invalid");
});

test("rejects an invalid email address", async ({ page }) => {
  await page.getByRole("checkbox", { name: "Fire sprinklers" }).check();
  await continueButton(page).click();
  await page.getByLabel("Property type").selectOption("Commercial");
  await page.getByLabel("State or province").selectOption("IL");
  await continueButton(page).click();
  await page.getByLabel("First name").fill("Dana");
  await page.getByLabel("Last name").fill("Reyes");
  await page.getByLabel("Email").fill("dana@");
  await page.getByLabel("Phone", { exact: true }).fill("(312) 555-0100");
  await continueButton(page).click();
  await expect(page.getByLabel("Email")).toBeFocused();
  await expect(page.getByLabel("Email")).toHaveAccessibleDescription(/valid email/);
});

test("moves focus to each step's heading", async ({ page }) => {
  await page.getByRole("checkbox", { name: "Fire sprinklers" }).check();
  await continueButton(page).click();
  await expect(page.getByRole("heading", { name: "Tell us about the property." })).toBeFocused();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByRole("heading", { name: "What can we help with?" })).toBeFocused();
  await expect(page.getByRole("checkbox", { name: "Fire sprinklers" })).toBeChecked();
});

test("builds an email draft to sales without claiming anything was sent", async ({ page }) => {
  await completeToReview(page);
  await expect(page.getByText("Nothing has been sent yet.")).toBeVisible();
  await expect(page.getByText("Lakeview Logistics")).toBeVisible();
  await expect(page.getByText("Indiana", { exact: true })).toBeVisible();

  const href = await page.getByRole("link", { name: "Open email draft" }).getAttribute("href");
  const url = new URL(href!);
  expect(url.protocol).toBe("mailto:");
  expect(url.pathname).toBe("sales@isakfire.com");
  expect(url.searchParams.get("subject")).toBe("Fire protection inquiry: Lakeview Logistics");
  const body = url.searchParams.get("body")!;
  expect(body).toContain("Services: Fire pumps");
  expect(body).toContain("Location: Indiana");
  expect(body).toContain("Floors: 3");
  expect(body).not.toMatch(/\b(booked|confirmed|appointment|scheduled)\b/i);
});

test.describe("presets from the URL", () => {
  test("a service page link preselects that service", async ({ page }) => {
    await page.goto("/services/kitchen-suppression");
    await page.getByRole("main").getByRole("link", { name: "Request a quote" }).click();
    await expect(page).toHaveURL(/\/quote\?service=kitchen-suppression/);
    await expect(page.getByRole("checkbox", { name: "Kitchen suppression" })).toBeChecked();
  });

  test("a location link preselects the region; unknown values are ignored", async ({ page }) => {
    await page.goto("/quote?service=bogus&region=WI");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("checkbox", { checked: true })).toHaveCount(0);
    await page.getByRole("checkbox", { name: "Fire alarms & detection" }).check();
    await continueButton(page).click();
    await expect(page.getByLabel("State or province")).toHaveValue("WI");
  });
});

test.describe("before the planner hydrates", () => {
  test.use({ javaScriptEnabled: false });

  test("offers phone and email, not a dead form that would submit natively", async ({ page, request }) => {
    await page.goto("/quote");
    await expect(page.getByRole("button", { name: "Continue" })).toHaveCount(0);
    await expect(page.locator("form")).toHaveCount(0);
    // Playwright disables script execution but still parses <noscript> as hidden,
    // so check the markup a no-JavaScript browser would render.
    const html = await (await request.get("/quote")).text();
    expect(html).toMatch(/<noscript>.*The planner needs JavaScript\..*tel:\+13124457787/s);
  });
});
