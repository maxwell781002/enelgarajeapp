import { vi, describe, it, expect, afterAll } from "vitest";
import { getRedirect } from "../middleware";
import { NextRequest } from "next/server";
import { UserRoles } from "@repo/model/repositories/user";

const auth = vi.hoisted(() => ({
  auth: vi.fn(),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: auth.auth,
}));

describe("Middleware", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  it("Not session", async () => {
    const url = await getRedirect(new NextRequest("http://localhost"), null);
    expect(url).toBe("/login");
  });

  it("Admin USER", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/admin"), {
      user: {
        role: UserRoles.USER,
      },
    });
    expect(url).toBe("/errors/403");
  });

  it("homepage ADMIN", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/"), {
      user: {
        role: UserRoles.ADMIN,
      },
    });
    expect(url).toBe("/admin/dashboard");
  });

  it("homepage USER no business", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/"), {
      user: {
        role: UserRoles.USER,
      },
    });
    expect(url).toBe("/request-shop");
  });

  it("homepage USER", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/"), {
      user: {
        role: UserRoles.USER,
        businessIds: ["aaa"],
      },
    });
    expect(url).toBe("/aaa");
  });

  it("USER no access to business", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/aaa"), {
      user: {
        role: UserRoles.USER,
        businessIds: ["bbb"],
      },
    });
    expect(url).toBe("/errors/403");
  });

  it("USER access to business", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/aaa/ddd"), {
      user: {
        role: UserRoles.USER,
        businessIds: ["aaa"],
      },
    });
    expect(url).toBeUndefined();
  });

  it("ADMIN access to business", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/aaa/ddd"), {
      user: {
        role: UserRoles.ADMIN,
      },
    });
    expect(url).toBeUndefined();
  });

  it("ADMIN access to admin", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/admin"), {
      user: {
        role: UserRoles.ADMIN,
      },
    });
    expect(url).toBeUndefined();
  });
});
