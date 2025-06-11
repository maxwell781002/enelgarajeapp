import { describe, it, expect, beforeAll, vi } from "vitest";
import { userFactory } from "../../model/tests/factories";
import app from "@repo/api/routes";
import { clearBd } from "../../model/tests/factories";
import { generateExternalSection } from "@repo/model/repository/external-section";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
  getToken: vi.fn(() => "token"),
}));

describe("get-token", () => {
  let user;

  beforeAll(async () => {
    user = await userFactory();
  });

  beforeAll(async () => {
    await clearBd();
  });

  it("should return the token", async () => {
    const res = await app.request("/api/security/token/ddd");
    expect(res.status).toBe(404);
  });

  it("should return the token", async () => {
    mocksAuth.auth.mockReturnValue({ user });
    const result = await generateExternalSection();
    const res = await app.request(`/api/security/token/${result.token}`);
    expect(res.status).toBe(200);
    const { token, user: userResponse } = await res.json();
    expect(token).toBe("token");
    expect(userResponse.id).toBe(user.id);
  });
});
