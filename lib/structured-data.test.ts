import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { businessJsonLd, serializeJsonLd } from "./structured-data.ts";

describe("businessJsonLd", () => {
  const data = businessJsonLd("https://www.example.com");

  it("describes the business from the single source of truth", () => {
    assert.equal(data["@type"], "LocalBusiness");
    assert.equal(data.name, "Isak Fire Protection, Inc.");
    assert.equal(data.telephone, "+13124457787");
    assert.equal(data.url, "https://www.example.com");
    assert.equal(data.address.postalCode, "60610");
  });

  it("lists the five states and Ontario, and every service", () => {
    assert.deepEqual(
      data.areaServed.map((a) => a.name),
      ["Illinois", "Ontario", "Michigan", "Ohio", "Indiana", "Wisconsin"],
    );
    assert.equal(data.areaServed.find((a) => a.name === "Ontario")?.["@type"], "AdministrativeArea");
    assert.equal(data.makesOffer.length, 9);
  });
});

describe("serializeJsonLd", () => {
  it("escapes `<` so the script tag can't be closed early", () => {
    const html = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    assert.doesNotMatch(html, /</);
    assert.deepEqual(JSON.parse(html), { name: "</script><script>alert(1)</script>" });
  });
});
