import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../../../prisma/prisma-client";
import { updateUser } from "../../../repository/user";
import { UserRoles } from "../../../prisma/generated/client";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({ value: "" })),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("updateUser", () => {
  let userId;

  beforeEach(async () => {
    userId = (
      await prisma().user.create({
        data: {
          email: "test",
          name: "test",
          phone: "test",
        },
      })
    ).id;
  });

  afterEach(async () => {
    vi.clearAllMocks();
    await prisma().user.deleteMany();
  });

  it("updateUser", async () => {
    const userUpdated = await updateUser(userId, {
      name: "test2",
      phone: "test2",
      email: "test2",
      role: UserRoles.USER,
    });
    expect(userUpdated.name).toBe("test2");
    expect(userUpdated.phone).toBe("test2");
  });
});
