import { expect, describe, afterEach, vi, it } from "vitest";
import { getCurrentUser } from "../../../repository/user";
import prisma from "../../../prisma/prisma-client";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("User", () => {
  afterEach(async () => {
    vi.clearAllMocks();
    await prisma().user.deleteMany();
  });

  it("Cookies is empty", async () => {
    const user = await getCurrentUser();
    expect(user).toBeUndefined();
  });

  it("Has data", async () => {
    mocksAuth.auth.mockReturnValue({ user: { name: "test" } });
    const user = await getCurrentUser();
    expect(user).toEqual({ name: "test" });
  });
});
