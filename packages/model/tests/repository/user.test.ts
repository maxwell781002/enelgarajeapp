import { expect, describe, afterEach, vi, it, beforeEach } from "vitest";
import { getCurrentUser } from "../../repository/user";
import prisma from "../../prisma/prisma-client";

const mocksGet = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
}));
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mocksGet.get,
  }),
}));

describe("User", () => {
  let userId;

  beforeEach(async () => {
    userId = (
      await prisma.user.create({
        data: {
          name: "test",
          phone: "test",
        },
      })
    ).id;
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await prisma.user.deleteMany();
  });

  it("First test", async () => {
    const user = await getCurrentUser();
    expect(user).toBeNull();
  });

  it("The userId is not in the db", async () => {
    mocksGet.get.mockReturnValue({ value: "id-not-in-db" });
    const user = await getCurrentUser();
    expect(user).toBeNull();
  });

  it("The userId is in the db", async () => {
    mocksGet.get.mockReturnValue({ value: userId });
    const user = await getCurrentUser();
    expect(user?.id).equals(userId);
  });
});
