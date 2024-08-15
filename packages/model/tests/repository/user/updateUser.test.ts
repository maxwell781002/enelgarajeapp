import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import prisma from "../../../prisma/prisma-client";
import { updateUser } from "../../../repository/user";

describe("updateUser", () => {
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

  it("updateUser", async () => {
    const userUpdated = await updateUser(userId, {
      name: "test2",
      phone: "test2",
    });
    expect(userUpdated.name).toBe("test2");
    expect(userUpdated.phone).toBe("test2");
  });
});
