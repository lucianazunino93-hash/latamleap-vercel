import test from "node:test";
import assert from "node:assert/strict";
import { languageDecision, safeRedirect } from "../shared/geo.mjs";

test("an explicit /en URL stays English even when the cookie is Spanish", () => {
  const decision = languageDecision("https://www.latamleap.com/en", { cookie: "es", country: "AR" });
  assert.equal(decision.location, undefined);
  assert.equal(decision.setCookie, "en");
  assert.equal(languageDecision("https://www.latamleap.com/en/about", { cookie: "en", country: "AR" }), null);
  assert.equal(safeRedirect("//example.invalid", "https://www.latamleap.com"), null);
  assert.equal(safeRedirect("/en/case-studies", "https://www.latamleap.com"), "/en/case-studies");
});
