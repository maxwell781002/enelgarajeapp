import { vi, describe, it, expect, afterAll } from "vitest";
import { isDomainToRedirect } from "../../lib/redirect-login";

describe("Middleware", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("is in the list", () => {
    expect(isDomainToRedirect("http://aaa.enelgaraje.com")).toBe(true);
  });

  it("is not in the list", () => {
    expect(isDomainToRedirect("http://otherdomain.com")).toBe(false);
  });
});
