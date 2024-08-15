import { expect, describe, afterEach, vi, it, beforeEach } from "vitest";
import { getOrCreateUser } from "../../../repository/user";
import prisma from "../../../prisma/prisma-client";

const mocksGet = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
  set: vi.fn(),
}));
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mocksGet.get,
    set: mocksGet.set,
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

  it("Cookies is empty", async () => {
    const user = await getOrCreateUser();
    expect(user).not.toBeNull();
    expect(mocksGet.set).toHaveBeenCalledWith('user_id', user?.id);
  });

  it("The user in cookies", async () => {
    mocksGet.get.mockReturnValue({ value: userId });
    const user = await getOrCreateUser();
    expect(user?.id).equals(userId);
  });
});
