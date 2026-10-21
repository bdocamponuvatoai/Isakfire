import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  emptyDraft,
  HELP_DECIDE,
  mailtoHref,
  presetsFromSearch,
  quoteMessage,
  reviewGroups,
  validateStep,
  type QuoteDraft,
  type QuoteOptions,
} from "./quote.ts";

const options: QuoteOptions = {
  services: [
    { slug: "fire-sprinklers", name: "Fire sprinklers" },
    { slug: "fire-pumps", name: "Fire pumps" },
  ],
  regions: [
    { abbr: "IL", region: "Illinois" },
    { abbr: "ON", region: "Ontario" },
  ],
};

function draft(overrides: Partial<QuoteDraft> = {}): QuoteDraft {
  return {
    ...emptyDraft(),
    services: ["fire-pumps"],
    propertyType: "Commercial",
    region: "IL",
    firstName: "Dana",
    lastName: "Reyes",
    email: "dana@example.com",
    phone: "(312) 555-0100",
    ...overrides,
  };
}

describe("validateStep", () => {
  it("requires at least one service on the project step", () => {
    assert.deepEqual(Object.keys(validateStep(0, draft({ services: [] }))), ["services"]);
    assert.deepEqual(validateStep(0, draft({ services: [HELP_DECIDE] })), {});
  });

  it("requires property type and location on the property step", () => {
    const errors = validateStep(1, draft({ propertyType: "", region: "  " }));
    assert.deepEqual(Object.keys(errors).sort(), ["propertyType", "region"]);
  });

  it("rejects a floor count that is not a whole number from 1 to 300", () => {
    for (const floors of ["0", "2.5", "301", "abc"]) {
      assert.ok(validateStep(1, draft({ floors })).floors, `floors=${floors}`);
    }
    assert.deepEqual(validateStep(1, draft({ floors: "12" })), {});
    assert.deepEqual(validateStep(1, draft({ floors: "" })), {});
  });

  it("requires name, a valid email and a plausible phone on the contact step", () => {
    const errors = validateStep(2, draft({ firstName: " ", lastName: "", email: "dana@", phone: "12-34" }));
    assert.deepEqual(Object.keys(errors).sort(), ["email", "firstName", "lastName", "phone"]);
    assert.match(errors.email ?? "", /valid email/i);
  });

  it("accepts international phone formats", () => {
    assert.deepEqual(validateStep(2, draft({ phone: "+1 437.295.7500" })), {});
  });

  it("has nothing to validate on the review step", () => {
    assert.deepEqual(validateStep(3, emptyDraft()), {});
  });
});

describe("presetsFromSearch", () => {
  it("preselects a known service and region", () => {
    const presets = presetsFromSearch(new URLSearchParams("service=fire-pumps&region=ON"), options);
    assert.deepEqual(presets, { services: ["fire-pumps"], region: "ON" });
  });

  it("ignores unknown values instead of trusting the URL", () => {
    const presets = presetsFromSearch(new URLSearchParams("service=<script>&region=TX"), options);
    assert.deepEqual(presets, {});
  });
});

describe("quoteMessage", () => {
  it("uses service and region names, and skips empty fields", () => {
    const message = quoteMessage(draft({ company: "", size: "48,000" }), options);
    assert.match(message, /Services: Fire pumps/);
    assert.match(message, /Location: Illinois/);
    assert.match(message, /Square footage: 48,000/);
    assert.doesNotMatch(message, /Company:/);
  });

  it("asks to discuss, and never claims a booking or confirmation", () => {
    const message = quoteMessage(draft({ services: [HELP_DECIDE] }), options);
    assert.match(message, /Services: Help me decide/);
    assert.match(message, /would like to discuss/i);
    assert.doesNotMatch(message, /\b(booked|booking|confirm(ed|ation)|appointment|scheduled)\b/i);
  });

  it("groups the review into project, property and contact sections", () => {
    assert.deepEqual(
      reviewGroups(draft(), options).map((group) => group.title),
      ["Your project", "Your property", "Your details"],
    );
  });
});

describe("mailtoHref", () => {
  it("addresses the sales team with an encoded subject and body", () => {
    const href = mailtoHref(draft({ company: "Lakeview & Co" }), options);
    assert.ok(href.startsWith("mailto:sales@isakfire.com?subject="));
    const url = new URL(href);
    assert.equal(url.searchParams.get("subject"), "Fire protection inquiry: Lakeview & Co");
    assert.match(url.searchParams.get("body") ?? "", /Name: Dana Reyes\r?\n/);
    assert.doesNotMatch(href, / /, "spaces must be percent-encoded");
  });

  it("falls back to the contact's name when there is no company", () => {
    const url = new URL(mailtoHref(draft(), options));
    assert.equal(url.searchParams.get("subject"), "Fire protection inquiry: Dana Reyes");
  });
});
