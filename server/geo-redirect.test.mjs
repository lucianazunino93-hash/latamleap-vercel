import test from "node:test";
import assert from "node:assert/strict";
import { languageDecision, safeRedirect } from "../shared/geo.mjs";

test("a Spanish preference cannot turn /en/ into another host", () => {
  const base = "https://www.latamleap.com/en//example.invalid";
  const decision = languageDecision(base, { country: "AR" });
  assert.equal(decision.location.startsWith("//"), true);
  assert.equal(safeRedirect(decision.location, base), null);
  const kept = safeRedirect("/en/case-studies", base);
  assert.equal(kept, "/en/case-studies");
});
