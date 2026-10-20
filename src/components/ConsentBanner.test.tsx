import { readFileSync } from "node:fs";
import path from "node:path";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import ConsentBanner from "./ConsentBanner";

vi.mock("@/lib/analytics", () => ({ activateAnalytics: vi.fn() }));
const { activateAnalytics } = await import("@/lib/analytics");
const script = readFileSync(path.join(process.cwd(), "public/consent-default.js"), "utf8");
const page = readFileSync(path.join(process.cwd(), "index.html"), "utf8");

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-consent");
  vi.mocked(activateAnalytics).mockClear();
});
afterEach(() => cleanup());

test("the early script marks a saved choice and the banner stays hidden", () => {
  expect(page.replace(/\s/g, "")).toContain("html[data-consent][data-consent-banner]{display:none}");
  localStorage.setItem("latamleap.consent", "granted");
  window.eval(script);
  expect(document.documentElement.getAttribute("data-consent")).toBe("granted");
  localStorage.setItem("latamleap.consent", "maybe");
  document.documentElement.removeAttribute("data-consent");
  window.eval(script);
  expect(document.documentElement.hasAttribute("data-consent")).toBe(false);
  const storage = Object.getOwnPropertyDescriptor(window, "localStorage");
  Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("blocked"); } });
  expect(() => window.eval(script)).not.toThrow();
  expect(document.documentElement.hasAttribute("data-consent")).toBe(false);
  if (storage) Object.defineProperty(window, "localStorage", storage);
});

test("a first visit shows the banner, including when storage throws", () => {
  render(<MemoryRouter><ConsentBanner /></MemoryRouter>);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  cleanup();
  const storage = Object.getOwnPropertyDescriptor(window, "localStorage");
  Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("blocked"); } });
  expect(() => render(<MemoryRouter><ConsentBanner /></MemoryRouter>)).not.toThrow();
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  if (storage) Object.defineProperty(window, "localStorage", storage);
});

test("a saved choice is absent on the first commit", async () => {
  for (const choice of ["granted", "denied"] as const) {
    localStorage.setItem("latamleap.consent", choice);
    const host = document.createElement("div");
    const root = createRoot(host);
    await act(async () => {
      flushSync(() => root.render(<MemoryRouter><ConsentBanner /></MemoryRouter>));
      expect(host.querySelector("[role='dialog']")).toBeNull();
    });
    expect(activateAnalytics).toHaveBeenCalledTimes(choice === "granted" ? 1 : 0);
    root.unmount();
    vi.mocked(activateAnalytics).mockClear();
  }
});

test("Cookies reopens the banner after a saved choice", () => {
  localStorage.setItem("latamleap.consent", "denied");
  document.documentElement.setAttribute("data-consent", "denied");
  render(<MemoryRouter><ConsentBanner /></MemoryRouter>);
  expect(screen.queryByRole("dialog")).toBeNull();
  fireEvent(window, new Event("latamleap:consent-open"));
  expect(document.documentElement.hasAttribute("data-consent")).toBe(false);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
