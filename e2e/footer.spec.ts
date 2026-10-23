import { expect, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("credits Nuvato AI, linking only the studio name", async ({ page }) => {
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByText("Website design & development by")).toBeVisible();
  const credit = footer.getByRole("link", { name: "Nuvato AI (opens in a new tab)" });
  await expect(credit).toHaveAttribute("href", "https://nuvato.ai/");
  await expect(credit).toHaveAttribute("target", "_blank");
  await expect(credit).toHaveAttribute("rel", "noopener");
  expect((await credit.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});

test("shows the Isak Global Ventures badge as one link below the credit row", async ({ page }) => {
  const footer = page.getByRole("contentinfo");
  const badge = footer.getByRole("link", { name: /Proudly part of Isak Global Ventures/ });
  await expect(badge).toHaveAttribute("href", "https://isakglobalventures.com/");
  await expect(badge).toHaveAttribute("target", "_blank");
  await expect(badge).toHaveAttribute("rel", "noopener");
  await expect(badge).toHaveAccessibleName("Proudly part of Isak Global Ventures (opens in a new tab)");

  // The caption names the company, so the logo itself stays decorative.
  const logo = badge.locator("img");
  await expect(logo).toHaveAttribute("alt", "");
  await expect(logo).toBeVisible();
  expect(Math.round((await logo.boundingBox())!.height)).toBe(32);

  const badgeBox = (await badge.boundingBox())!;
  const creditBox = (await footer.getByRole("link", { name: /Nuvato AI/ }).boundingBox())!;
  expect(badgeBox.height).toBeGreaterThanOrEqual(44);
  expect(badgeBox.y).toBeGreaterThan(creditBox.y + creditBox.height);
});

test("keeps the illustrative-image notice in the footer", async ({ page }) => {
  await expect(
    page.getByRole("contentinfo").getByText(/not photographs of Isak staff, vehicles or projects/),
  ).toBeVisible();
});
