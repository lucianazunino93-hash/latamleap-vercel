import { afterEach, expect, test } from "vitest";
import { contactWhatsAppText, getRef, isRefCode, readRefFromUrl, shareMessage, shareUrl } from "./referral";

afterEach(() => localStorage.clear());

test("keeps a valid referral code for 90 days and drops anything else", () => {
  expect(isRefCode("R-101")).toBe(true);
  expect(isRefCode("ab")).toBe(false);
  expect(isRefCode("bad code")).toBe(false);
  expect(readRefFromUrl("?ref=no")).toBeNull();
  expect(localStorage.getItem("latamleap.ref")).toBeNull();
  expect(readRefFromUrl("?utm=cold&ref=R-101")).toBe("R-101");
  const stored = JSON.parse(localStorage.getItem("latamleap.ref") || "{}");
  expect(stored.code).toBe("R-101");
  expect(stored.expiresAt).toBeGreaterThan(Date.now() + 89 * 24 * 60 * 60 * 1000);
  expect(getRef()).toBe("R-101");
  localStorage.setItem("latamleap.ref", JSON.stringify({ code: "R-101", expiresAt: Date.now() - 1 }));
  expect(getRef()).toBe("");
  expect(localStorage.getItem("latamleap.ref")).toBeNull();
});

test("builds a public share link and asks for a name when there is no code", () => {
  expect(shareUrl("es", "R-101")).toBe("https://www.latamleap.com/?ref=R-101");
  expect(shareUrl("en", "R-101")).toBe("https://www.latamleap.com/en?ref=R-101");
  expect(shareUrl("es", "no")).toBe("https://www.latamleap.com/");
  expect(shareMessage("en", "")).toContain("https://www.latamleap.com/en");
  expect(shareMessage("en", "")).toContain("mention who sent you");
  expect(shareMessage("es", "R-101")).toContain("?ref=R-101");
  expect(shareMessage("es", "R-101")).not.toContain("menciona quién te envió");
  expect(contactWhatsAppText("es")).toBe("Hola, vi la web de LatamLeap y quiero agendar 10 minutos.");
  readRefFromUrl("?ref=R-101");
  expect(contactWhatsAppText("en")).toBe("Hi, I saw the LatamLeap site and I'd like to book 10 minutes. Referred by: R-101");
});
