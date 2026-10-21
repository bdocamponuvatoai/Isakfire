import { expect, test } from "./fixtures";

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile layout only");

  test("menu opens, closes with Escape, and links navigate", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const menu = page.getByRole("dialog", { name: "Menu" });

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await page.getByRole("button", { name: "Open menu" }).click();
    await menu.getByRole("link", { name: "Locations" }).click();
    await expect(page).toHaveURL(/\/locations$/);
    await expect(menu).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Six locations. One standard.");
  });

  test("action bar appears once the first screen is scrolled past", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const bar = page.getByTestId("mobile-action-bar");
    await expect(bar.getByRole("link", { name: "Call" })).toBeHidden();
    // mouse.wheel is unsupported in mobile WebKit; scroll the page directly.
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(bar.getByRole("link", { name: "Call" })).toBeVisible();
    await expect(bar.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:+13124457787");
    await expect(bar.getByRole("link", { name: "Request a quote" })).toHaveAttribute("href", "/quote");
  });

  test("action bar stays out of the way on the quote planner", async ({ page }) => {
    await page.goto("/quote");
    await page.waitForLoadState("networkidle");
    // mouse.wheel is unsupported in mobile WebKit; scroll the page directly.
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(600);
    await expect(page.getByTestId("mobile-action-bar").getByRole("link", { name: "Call" })).toBeHidden();
  });
});

test.describe("desktop", () => {
  test.skip(({ isMobile }) => isMobile, "desktop layout only");

  test("main navigation marks the current section", async ({ page }) => {
    await page.goto("/services/fire-pumps");
    await expect(
      page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Services" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("header gains its shadow after scrolling", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const header = page.getByRole("banner");
    await expect(header).not.toHaveAttribute("data-scrolled");
    await page.mouse.wheel(0, 600);
    await expect(header).toHaveAttribute("data-scrolled", "true");
  });

  test("skip link is the first tab stop and moves focus to main", async ({ page, browserName }) => {
    // WebKit only tabs to links when the "press Tab to highlight each item" preference is on.
    test.skip(browserName === "webkit", "WebKit skips links on Tab by default");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });
});
