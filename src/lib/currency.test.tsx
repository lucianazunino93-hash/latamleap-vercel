import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CurrencyProvider } from "./currency";
import CurrencySelector from "@/components/CurrencySelector";

beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
const mount = () => render(<CurrencyProvider><CurrencySelector /></CurrencyProvider>);

test("detects currency and lets the visitor override it", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => ({ currency: "USD" }) } as Response);
  mount();
  await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("USD"));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "ARS" } });
  expect(localStorage.getItem("latamleap.currency")).toBe("ARS");
  cleanup(); mount();
  expect(screen.getByRole("combobox")).toHaveValue("ARS");
  expect(fetch).toHaveBeenCalledTimes(1);
});
test("a late country response cannot replace the visitor choice", async () => {
  let resolve: (response: Response) => void;
  vi.spyOn(globalThis, "fetch").mockImplementation(() => new Promise<Response>(done => { resolve = done; }));
  mount();
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "ARS" } });
  await act(async () => resolve({ ok: true, json: async () => ({ currency: "USD" }) } as Response));
  expect(screen.getByRole("combobox")).toHaveValue("ARS");
});
test("country lookup failure does not break the manual selector", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
  mount();
  await act(async () => {});
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "USD" } });
  expect(screen.getByRole("combobox")).toHaveValue("USD");
});
